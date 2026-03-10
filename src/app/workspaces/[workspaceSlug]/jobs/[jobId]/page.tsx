import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
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
              {/* Visual storyboard timeline */}
              <div style={{ display: 'flex', borderRadius: '0.75rem', overflow: 'hidden', height: '3.5rem', marginBottom: '0.5rem' }}>
                {output.scenes.map((scene) => {
                  const purposeKey = scene.purpose.split(' ')[0].toLowerCase();
                  const color = storyboardColors[purposeKey] ?? '#666';
                  return (
                    <div
                      key={scene.sceneNumber}
                      title={`Scene ${scene.sceneNumber}: ${scene.purpose} (${scene.duration})`}
                      style={{
                        flex: 1,
                        background: `linear-gradient(180deg, ${color}55, ${color}22)`,
                        borderRight: '1px solid rgba(0,0,0,0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.15rem',
                        padding: '0.25rem',
                      }}
                    >
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {purposeKey}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(245,241,232,0.6)' }}>
                        {scene.duration}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Storyboard cards */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${output.scenes.length}, minmax(0, 1fr))`, gap: '0.75rem' }}>
                {output.scenes.map((scene) => {
                  const purposeKey = scene.purpose.split(' ')[0].toLowerCase();
                  const color = storyboardColors[purposeKey] ?? '#666';
                  return (
                    <div
                      key={scene.sceneNumber}
                      style={{
                        padding: '1rem',
                        borderRadius: '1rem',
                        background: `linear-gradient(180deg, ${color}18, rgba(255,255,255,0.02))`,
                        border: `1px solid ${color}33`,
                        display: 'grid',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          Scene {scene.sceneNumber}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'rgba(245,241,232,0.5)' }}>{scene.duration}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--color-paper-100)' }}>{scene.text}</p>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(245,241,232,0.6)', display: 'grid', gap: '0.25rem' }}>
                        <span>Visual: {scene.visual}</span>
                        <span>Audio: {scene.audio}</span>
                      </div>
                    </div>
                  );
                })}
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
