import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import {
  getAnalysisResultByAssetId,
  getAssetById,
  getBenchmarkCollectionById,
  getWorkspaceBySlug,
} from '@/lib/repositories';
import { workspaceAssetPath, workspacePath } from '@/lib/workspace-routing';

type BenchmarkDetailParams = {
  params: Promise<{ workspaceSlug: string; benchmarkId: string }>;
};

export default async function BenchmarkDetailPage({ params }: BenchmarkDetailParams) {
  const { workspaceSlug, benchmarkId } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const benchmark = await getBenchmarkCollectionById(workspace.id, benchmarkId);

  if (!benchmark) {
    notFound();
  }

  const assetsWithAnalysis = await Promise.all(
    benchmark.assetIds.map(async (assetId) => {
      const asset = await getAssetById(workspace.id, assetId);
      const analysis = await getAnalysisResultByAssetId(workspace.id, assetId);
      return { asset, analysis };
    }),
  );

  const analyzedAssets = assetsWithAnalysis.filter((a) => a.analysis);
  const avgHook = analyzedAssets.length > 0
    ? Math.round(analyzedAssets.reduce((sum, a) => sum + (a.analysis?.hookScore ?? 0), 0) / analyzedAssets.length)
    : 0;
  const avgPacing = analyzedAssets.length > 0
    ? Math.round(analyzedAssets.reduce((sum, a) => sum + (a.analysis?.pacingScore ?? 0), 0) / analyzedAssets.length)
    : 0;
  const avgProof = analyzedAssets.length > 0
    ? Math.round(analyzedAssets.reduce((sum, a) => sum + (a.analysis?.proofScore ?? 0), 0) / analyzedAssets.length)
    : 0;
  const avgCta = analyzedAssets.length > 0
    ? Math.round(analyzedAssets.reduce((sum, a) => sum + (a.analysis?.ctaScore ?? 0), 0) / analyzedAssets.length)
    : 0;

  return (
    <AppShell
      workspace={workspace}
      title={benchmark.title}
      description={benchmark.description}
    >
      <section className="panel detail-grid">
        <div>
          <div className="tag-row">
            <span className="status-pill status-foundation">{benchmark.focus}</span>
            <span className="status-pill status-later">{benchmark.assetIds.length} assets</span>
          </div>
          <h2>Collection overview</h2>
        </div>
        <p>{benchmark.description}</p>
      </section>

      {analyzedAssets.length > 0 && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Benchmark averages</h2>
              <p>Aggregated scores across {analyzedAssets.length} analyzed asset{analyzedAssets.length > 1 ? 's' : ''} in this collection.</p>
            </div>
          </div>
          <div className="metric-grid">
            <div className="panel metric-card">
              <p className="metric-label">Hook</p>
              <h2>{avgHook}</h2>
              <p>Avg hook score</p>
            </div>
            <div className="panel metric-card">
              <p className="metric-label">Pacing</p>
              <h2>{avgPacing}</h2>
              <p>Avg pacing score</p>
            </div>
            <div className="panel metric-card">
              <p className="metric-label">Proof</p>
              <h2>{avgProof}</h2>
              <p>Avg proof score</p>
            </div>
            <div className="panel metric-card">
              <p className="metric-label">CTA</p>
              <h2>{avgCta}</h2>
              <p>Avg CTA score</p>
            </div>
          </div>
        </section>
      )}

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Assets in collection</h2>
            <p>Individual assets with their analysis data. Click to see full detail.</p>
          </div>
          <Link href={workspacePath(workspace.slug, 'benchmarks')} className="button button-secondary">
            Back to benchmarks
          </Link>
        </div>
        <div className="recommendation-list">
          {assetsWithAnalysis.map(({ asset, analysis }) => (
            <article key={asset?.id ?? 'unknown'} className="recommendation-card">
              {asset ? (
                <>
                  <h3>
                    <Link href={workspaceAssetPath(workspace.slug, asset.id)} className="inline-link">
                      {asset.title}
                    </Link>
                  </h3>
                  <div className="tag-row" style={{ marginTop: '0.5rem' }}>
                    <span className="status-pill status-later">{asset.platform}</span>
                    <span className="status-pill status-later">{asset.durationSeconds}s</span>
                    {asset.tags.map((tag) => (
                      <span key={tag} className="status-pill status-later">{tag}</span>
                    ))}
                  </div>
                  {analysis ? (
                    <div className="detail-pairs" style={{ marginTop: '0.75rem' }}>
                      <div><span>Hook</span><strong>{analysis.hookScore}</strong></div>
                      <div><span>Pacing</span><strong>{analysis.pacingScore}</strong></div>
                      <div><span>Proof</span><strong>{analysis.proofScore}</strong></div>
                      <div><span>CTA</span><strong>{analysis.ctaScore}</strong></div>
                      <div><span>Risk</span><strong>{analysis.retentionRisk}</strong></div>
                      <div><span>Scenes</span><strong>{analysis.scenes.length}</strong></div>
                    </div>
                  ) : (
                    <p style={{ marginTop: '0.5rem' }}>Not yet analyzed. Run analysis from the asset detail page.</p>
                  )}
                </>
              ) : (
                <p>Asset not found in library.</p>
              )}
            </article>
          ))}
        </div>
      </section>

      {analyzedAssets.length > 0 && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Common patterns</h2>
              <p>Structural patterns observed across analyzed assets in this collection.</p>
            </div>
          </div>
          <div className="recommendation-list">
            <article className="recommendation-card">
              <h3>Hook timing</h3>
              <p>
                Average recommended hook window: {Math.round(analyzedAssets.reduce((sum, a) => sum + (a.analysis?.recommendedHookWindowSeconds ?? 0), 0) / analyzedAssets.length)}s.
                {avgHook >= 80 ? ' Strong opener patterns across this collection.' : avgHook >= 65 ? ' Moderate hook strength. Consider testing faster openers.' : ' Hooks need strengthening across this collection.'}
              </p>
            </article>
            <article className="recommendation-card">
              <h3>Proof density</h3>
              <p>
                Average proof score: {avgProof}/100.
                {avgProof >= 75 ? ' Good proof density. Assets in this collection demonstrate strong evidence moments.' : ' Proof sections could be stronger. Consider earlier or more visual proof elements.'}
              </p>
            </article>
            <article className="recommendation-card">
              <h3>CTA structure</h3>
              <p>
                Average CTA score: {avgCta}/100. Average CTA window starts at {Math.round(analyzedAssets.reduce((sum, a) => sum + (a.analysis?.recommendedCtaWindowSeconds ?? 0), 0) / analyzedAssets.length)}s.
                {avgCta >= 70 ? ' CTAs in this collection are well-structured.' : ' CTA timing or intensity could be improved across this collection.'}
              </p>
            </article>
          </div>
        </section>
      )}
    </AppShell>
  );
}
