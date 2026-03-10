import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { VideoPlayer } from '@/components/video-player';
import { RetentionTimeline } from '@/components/retention-timeline';
import { getRemixJobs, getRemixOutputsByJobId, getWorkspaceBySlug, getBenchmarkCollectionById } from '@/lib/repositories';
import { workspaceBenchmarkPath, workspacePath } from '@/lib/workspace-routing';

const storyboardColors: Record<string, string> = {
  hook: '#3b9c97',
  pattern: '#3b9c97',
  problem: '#c46832',
  proof: '#7a6bbf',
  demo: '#5a8f3f',
  cta: '#cf4f4f',
  authority: '#c46832',
};

type JobDetailParams = {
  params: Promise<{ workspaceSlug: string; jobId: string }>;
};

export default async function JobDetailPage({ params }: JobDetailParams) {
  const { workspaceSlug, jobId } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const remixJobs = await getRemixJobs(workspace.id);
  const job = remixJobs.find((j) => j.id === jobId);

  if (!job) {
    notFound();
  }

  const [outputs, benchmark] = await Promise.all([
    getRemixOutputsByJobId(workspace.id, jobId),
    getBenchmarkCollectionById(workspace.id, job.benchmarkCollectionId),
  ]);

  return (
    <AppShell
      workspace={workspace}
      title={`Remix: ${job.targetOffer}`}
      description={`${job.outputType} output generated from benchmark collection. Status: ${job.status}.`}
    >
      <section className="panel detail-grid">
        <div>
          <div className="tag-row">
            <span className={`status-pill ${job.status === 'ready' ? 'status-foundation' : job.status === 'approved' ? 'status-next' : 'status-later'}`}>
              {job.status}
            </span>
            <span className="status-pill status-later">{job.outputType}</span>
          </div>
          <h2>{job.targetOffer}</h2>
        </div>
        <div className="detail-pairs">
          <div><span>Output type</span><strong>{job.outputType}</strong></div>
          <div><span>Status</span><strong>{job.status}</strong></div>
          <div>
            <span>Benchmark</span>
            <strong>
              {benchmark ? (
                <Link href={workspaceBenchmarkPath(workspace.slug, benchmark.id)} className="inline-link">
                  {benchmark.title}
                </Link>
              ) : job.benchmarkCollectionId}
            </strong>
          </div>
        </div>
      </section>

      {outputs.map((output) => (
        <section key={output.id} className="panel">
          <div className="table-header">
            <div>
              <h2>{output.title}</h2>
              <p>{output.outputType} generated on {new Date(output.createdAt).toLocaleDateString()}</p>
            </div>
            <Link href={`/workspaces/${workspaceSlug}/compare?type=remix&a=${output.id}`} className="button button-secondary">
              Compare variant
            </Link>
          </div>

          {output.scenes && output.scenes.length > 0 ? (
            <>
              {/* Rich Video Player & Timeline Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 400px)', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'start' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <VideoPlayer
                    title={output.title}
                    duration={output.scenes.reduce((acc, s) => {
                      const match = s.duration.match(/(\d+)/g);
                      return match ? acc + parseInt(match.pop() || '0') : acc;
                    }, 0) + 's'}
                  />
                  <RetentionTimeline />
                </div>

                {/* Scene Script List Next to Player */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '600px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                  {output.scenes.map((scene) => {
                    const purposeKey = scene.purpose.split(' ')[0].toLowerCase();
                    const color = storyboardColors[purposeKey] ?? '#666';
                    return (
                      <div
                        key={scene.sceneNumber}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '0.75rem',
                          background: `linear-gradient(180deg, ${color}10, rgba(255,255,255,0.01))`,
                          border: `1px solid ${color}20`,
                          display: 'grid',
                          gap: '0.25rem',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {scene.purpose}
                          </span>
                          <span style={{ fontSize: '0.65rem', color: 'rgba(245,241,232,0.5)', fontFamily: 'monospace' }}>{scene.duration}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-paper-100)', marginTop: '0.25rem' }}>"{scene.text}"</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed breakdown */}
              <div className="recommendation-list" style={{ marginTop: '0.5rem' }}>
                {output.scenes.map((scene) => (
                  <article key={scene.sceneNumber} className="recommendation-card">
                    <h3>Scene {scene.sceneNumber} — {scene.duration}</h3>
                    <div className="detail-pairs">
                      <div><span>Purpose</span><strong>{scene.purpose}</strong></div>
                      <div><span>Visual</span><strong>{scene.visual}</strong></div>
                      <div><span>Audio</span><strong>{scene.audio}</strong></div>
                    </div>
                    <p style={{ marginTop: '0.75rem' }}>{scene.text}</p>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="recommendation-card">
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{output.content}</pre>
            </div>
          )}
        </section>
      ))}

      {outputs.length === 0 && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>No output yet</h2>
              <p>This remix job has not generated any outputs. It may still be processing.</p>
            </div>
          </div>
        </section>
      )}

      <section className="panel">
        <div className="table-header">
          <div />
          <Link href={workspacePath(workspace.slug, 'jobs')} className="button button-secondary">
            Back to jobs
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
