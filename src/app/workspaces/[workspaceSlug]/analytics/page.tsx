import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';
import {
  getAnalysisResults,
  getAssets,
  getCompetitorAccounts,
  getPromptRuns,
  getRemixJobs,
  getTrendSnapshots,
  getWorkspaceBySlug,
} from '@/lib/repositories';

type AnalyticsParams = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function AnalyticsPage({ params }: AnalyticsParams) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [assets, analysisResults, promptRuns, remixJobs, trends, competitors] = await Promise.all([
    getAssets(workspace.id),
    getAnalysisResults(workspace.id),
    getPromptRuns(workspace.id),
    getRemixJobs(workspace.id),
    getTrendSnapshots(workspace.id),
    getCompetitorAccounts(workspace.id),
  ]);

  const readyAssets = assets.filter((a) => a.status === 'ready');
  const analyzedAssets = analysisResults.length;
  const avgHookScore = analysisResults.length > 0
    ? Math.round(analysisResults.reduce((sum, r) => sum + r.hookScore, 0) / analysisResults.length)
    : 0;
  const avgPacingScore = analysisResults.length > 0
    ? Math.round(analysisResults.reduce((sum, r) => sum + r.pacingScore, 0) / analysisResults.length)
    : 0;
  const avgProofScore = analysisResults.length > 0
    ? Math.round(analysisResults.reduce((sum, r) => sum + r.proofScore, 0) / analysisResults.length)
    : 0;
  const avgCtaScore = analysisResults.length > 0
    ? Math.round(analysisResults.reduce((sum, r) => sum + r.ctaScore, 0) / analysisResults.length)
    : 0;

  const strongRuns = promptRuns.filter((r) => r.outcome === 'strong').length;
  const mixedRuns = promptRuns.filter((r) => r.outcome === 'mixed').length;
  const weakRuns = promptRuns.filter((r) => r.outcome === 'weak').length;
  const completedRemixes = remixJobs.filter((j) => j.status === 'ready' || j.status === 'approved').length;
  const risingTrends = trends.filter((t) => t.velocity === 'rising').length;
  const lowRetention = analysisResults.filter((r) => r.retentionRisk === 'low').length;
  const highRetention = analysisResults.filter((r) => r.retentionRisk === 'high').length;

  return (
    <AppShell
      workspace={workspace}
      title="Creative analytics"
      description="Aggregate performance data across assets, analysis, prompts, and remix outputs. Use these metrics to understand what patterns produce the strongest results."
    >
      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Asset coverage</h2>
            <p>How much of your library has been analyzed.</p>
          </div>
        </div>
        <div className="metric-grid">
          <MetricCard label="Total assets" value={String(assets.length)} detail="Across all sources." />
          <MetricCard label="Ready" value={String(readyAssets.length)} detail="Available for analysis." />
          <MetricCard label="Analyzed" value={String(analyzedAssets)} detail="With structured results." />
          <MetricCard
            label="Coverage"
            value={readyAssets.length > 0 ? `${Math.round((analyzedAssets / readyAssets.length) * 100)}%` : '0%'}
            detail="Of ready assets analyzed."
          />
        </div>
      </section>

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Average scores</h2>
            <p>Aggregated across all analysis results. Higher is better.</p>
          </div>
        </div>
        <div className="metric-grid">
          <MetricCard label="Hook" value={String(avgHookScore)} detail="Average hook score." />
          <MetricCard label="Pacing" value={String(avgPacingScore)} detail="Average pacing score." />
          <MetricCard label="Proof" value={String(avgProofScore)} detail="Average proof score." />
          <MetricCard label="CTA" value={String(avgCtaScore)} detail="Average CTA score." />
        </div>
      </section>

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Retention risk distribution</h2>
            <p>How analyzed assets break down by predicted retention risk.</p>
          </div>
        </div>
        <div className="detail-pairs">
          <div><span>Low risk</span><strong>{lowRetention} assets</strong></div>
          <div><span>Medium risk</span><strong>{analysisResults.length - lowRetention - highRetention} assets</strong></div>
          <div><span>High risk</span><strong>{highRetention} assets</strong></div>
        </div>
      </section>

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Prompt performance</h2>
            <p>Outcome distribution across all prompt runs.</p>
          </div>
        </div>
        <div className="metric-grid">
          <MetricCard label="Total runs" value={String(promptRuns.length)} detail="Across all prompts." />
          <MetricCard label="Strong" value={String(strongRuns)} detail="Runs rated strong." />
          <MetricCard label="Mixed" value={String(mixedRuns)} detail="Runs rated mixed." />
          <MetricCard label="Weak" value={String(weakRuns)} detail="Runs rated weak." />
        </div>
      </section>

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Workspace activity</h2>
            <p>Overall creative pipeline throughput.</p>
          </div>
        </div>
        <div className="metric-grid">
          <MetricCard label="Completed remixes" value={String(completedRemixes)} detail="Ready or approved outputs." />
          <MetricCard label="Rising trends" value={String(risingTrends)} detail="Active opportunities." />
          <MetricCard label="Competitors tracked" value={String(competitors.length)} detail="Across all platforms." />
          <MetricCard
            label="Prompt success rate"
            value={promptRuns.length > 0 ? `${Math.round((strongRuns / promptRuns.length) * 100)}%` : '0%'}
            detail="Runs rated strong."
          />
        </div>
      </section>
    </AppShell>
  );
}
