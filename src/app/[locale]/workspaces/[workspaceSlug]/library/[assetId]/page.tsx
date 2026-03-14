import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { runAssetAnalysisAction } from '../../actions';
import { getAnalysisResultByAssetId, getAssetById, getWorkspaceBySlug } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

type AssetDetailParams = {
  params: Promise<{ workspaceSlug: string; assetId: string }>;
};

const purposeColors: Record<string, string> = {
  hook: '#3b9c97',
  problem: '#c46832',
  proof: '#7a6bbf',
  demo: '#5a8f3f',
  cta: '#cf4f4f',
};

export default async function AssetDetailPage({ params }: AssetDetailParams) {
  const { workspaceSlug, assetId } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const asset = await getAssetById(workspace.id, assetId);
  const analysis = await getAnalysisResultByAssetId(workspace.id, assetId);

  if (!asset) {
    notFound();
  }

  const action = runAssetAnalysisAction.bind(null, workspace.slug);

  return (
    <AppShell
      workspace={workspace}
      title={asset.title}
      description="Asset detail with metadata, transcript, scene segmentation, pacing diagnostics, and edit recommendations."
    >
      <section className="panel detail-grid">
        <div>
          <div className="tag-row">
            <span className={`status-pill ${asset.status === 'ready' ? 'status-foundation' : asset.status === 'processing' ? 'status-next' : 'status-later'}`}>
              {asset.status}
            </span>
            <span className="status-pill status-later">{asset.platform}</span>
            <span className="status-pill status-later">{asset.source}</span>
          </div>
          <h2>Metadata</h2>
        </div>
        <div className="detail-pairs">
          <div><span>Platform</span><strong>{asset.platform}</strong></div>
          <div><span>Status</span><strong>{asset.status}</strong></div>
          <div><span>Duration</span><strong>{asset.durationSeconds}s</strong></div>
          <div><span>Source</span><strong>{asset.source}</strong></div>
          <div><span>Storage</span><strong>{asset.storageProvider}</strong></div>
          <div><span>Transcript</span><strong>{asset.transcriptReady ? 'Ready' : 'Pending'}</strong></div>
          <div><span>Benchmark eligible</span><strong>{asset.benchmarkEligible ? 'Yes' : 'No'}</strong></div>
          <div><span>Content sync</span><strong>{asset.contentSyncStatus}</strong></div>
          <div><span>Content ID</span><strong>{asset.contentEngineContentId ?? 'Not linked'}</strong></div>
        </div>
        {asset.sourceUrl && (
          <div className="detail-pairs">
            <div><span>Source URL</span><strong>{asset.sourceUrl}</strong></div>
          </div>
        )}
      </section>

      {asset.notes && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Notes</h2>
              <p>Analyst observations about this asset.</p>
            </div>
          </div>
          <div className="recommendation-card">
            <p>{asset.notes}</p>
          </div>
        </section>
      )}

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Asset analysis</h2>
            <p>Run structured analysis to generate hook, pacing, proof, CTA, scene windows, and retention-risk output.</p>
          </div>
          <form action={action}>
            <input type="hidden" name="workspaceId" value={workspace.id} />
            <input type="hidden" name="assetId" value={asset.id} />
            <button type="submit" className="button">
              {analysis ? 'Re-run analysis' : 'Run analysis'}
            </button>
          </form>
        </div>
        <div className="tag-row">
          {asset.tags.map((tag) => (
            <span key={tag} className="status-pill status-later">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {asset.transcript && asset.transcript.length > 0 && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Transcript</h2>
              <p>Time-stamped transcript segments from this asset.</p>
            </div>
          </div>
          <div className="data-table">
            <div className="data-table-row data-table-head">
              <span>Time</span>
              <span>Text</span>
              <span>Duration</span>
              <span>Scene</span>
            </div>
            {asset.transcript.map((segment, i) => {
              const matchingScene = analysis?.scenes.find(
                (scene) => segment.startSecond >= scene.startSecond && segment.startSecond < scene.endSecond,
              );
              return (
                <div key={i} className="data-table-row">
                  <span>{segment.startSecond}s–{segment.endSecond}s</span>
                  <span>{segment.text}</span>
                  <span>{segment.endSecond - segment.startSecond}s</span>
                  <span>
                    {matchingScene && (
                      <span
                        className="status-pill"
                        style={{ background: `${purposeColors[matchingScene.purpose] ?? '#666'}33`, color: purposeColors[matchingScene.purpose] ?? '#ccc' }}
                      >
                        {matchingScene.purpose}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {analysis ? (
        <>
          <section className="panel">
            <div className="table-header">
              <div>
                <h2>Analysis scores</h2>
                <p>{analysis.summary}</p>
              </div>
            </div>
            <div className="metric-grid">
              <div className="panel metric-card">
                <p className="metric-label">Hook</p>
                <h2>{analysis.hookScore}</h2>
                <p>/100</p>
              </div>
              <div className="panel metric-card">
                <p className="metric-label">Pacing</p>
                <h2>{analysis.pacingScore}</h2>
                <p>/100</p>
              </div>
              <div className="panel metric-card">
                <p className="metric-label">Proof</p>
                <h2>{analysis.proofScore}</h2>
                <p>/100</p>
              </div>
              <div className="panel metric-card">
                <p className="metric-label">CTA</p>
                <h2>{analysis.ctaScore}</h2>
                <p>/100</p>
              </div>
            </div>
            <div className="detail-pairs">
              <div><span>Retention risk</span><strong>{analysis.retentionRisk}</strong></div>
              <div><span>Hook window</span><strong>{analysis.recommendedHookWindowSeconds}s</strong></div>
              <div><span>CTA window</span><strong>from {analysis.recommendedCtaWindowSeconds}s</strong></div>
            </div>
          </section>

          <section className="panel">
            <div className="table-header">
              <div>
                <h2>Timeline</h2>
                <p>Visual scene map showing structure and timing.</p>
              </div>
            </div>
            <div style={{ display: 'flex', borderRadius: '0.75rem', overflow: 'hidden', height: '3rem' }}>
              {analysis.scenes.map((scene) => {
                const width = ((scene.endSecond - scene.startSecond) / asset.durationSeconds) * 100;
                const color = purposeColors[scene.purpose] ?? '#666';
                return (
                  <div
                    key={`${scene.label}-${scene.startSecond}`}
                    title={`${scene.label} (${scene.startSecond}s–${scene.endSecond}s)`}
                    style={{
                      width: `${width}%`,
                      background: `${color}44`,
                      borderRight: '1px solid rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: color,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {scene.purpose}
                  </div>
                );
              })}
            </div>
            <div className="data-table">
              <div className="data-table-row data-table-head">
                <span>Scene</span>
                <span>Purpose</span>
                <span>Start</span>
                <span>End</span>
              </div>
              {analysis.scenes.map((scene) => (
                <div key={`${scene.label}-${scene.startSecond}`} className="data-table-row">
                  <span>{scene.label}</span>
                  <span>
                    <span
                      className="status-pill"
                      style={{ background: `${purposeColors[scene.purpose] ?? '#666'}33`, color: purposeColors[scene.purpose] ?? '#ccc' }}
                    >
                      {scene.purpose}
                    </span>
                  </span>
                  <span>{scene.startSecond}s</span>
                  <span>{scene.endSecond}s</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="table-header">
              <div>
                <h2>Edit recommendations</h2>
                <p>Actionable suggestions based on the structural analysis.</p>
              </div>
              <Link href={workspacePath(workspace.slug, 'library')} className="button button-secondary">
                Back to library
              </Link>
            </div>
            <div className="recommendation-list">
              {analysis.recommendations.map((rec) => (
                <article key={rec.title} className="recommendation-card">
                  <h3>{rec.title}</h3>
                  <p>{rec.rationale}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>No analysis yet</h2>
              <p>Run analysis above to generate scores, scene maps, and recommendations.</p>
            </div>
            <Link href={workspacePath(workspace.slug, 'library')} className="button button-secondary">
              Back to library
            </Link>
          </div>
        </section>
      )}
    </AppShell>
  );
}
