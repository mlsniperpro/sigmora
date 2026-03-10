import Link from 'next/link';
import { ActivationChecklist } from '@/components/activation-checklist';
import { AppShell } from '@/components/app-shell';
import { CollectionTable } from '@/components/collection-table';
import { MetricCard } from '@/components/metric-card';
import { getActivationSnapshot } from '@/lib/activation';
import { getAnalysisResults, getDashboardSnapshotBySlug } from '@/lib/repositories';
import { workspaceAssetPath, workspacePath, workspacePromptPath } from '@/lib/workspace-routing';

type DashboardParams = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function WorkspaceDashboardPage({ params }: DashboardParams) {
  const { workspaceSlug } = await params;
  const snapshot = await getDashboardSnapshotBySlug(workspaceSlug);
  const analysisResults = await getAnalysisResults(snapshot.workspace.id);
  const activation = getActivationSnapshot({
    assets: snapshot.assets,
    analysisResults,
    remixJobs: snapshot.remixJobs,
  });
  const readyAssets = snapshot.assets.filter((asset) => asset.status === 'ready').length;
  const liveJobs = snapshot.analysisJobs.filter((job) => job.status === 'running' || job.status === 'queued').length;
  const risingTrends = snapshot.trendSnapshots.filter((t) => t.velocity === 'rising').length;
  const primaryAsset = snapshot.assets.find((asset) => asset.status === 'ready') ?? snapshot.assets[0];
  const primaryBenchmark = snapshot.benchmarkCollections[0];

  return (
    <AppShell
      workspace={snapshot.workspace}
      title="Workspace dashboard"
      description="Operating surface for the active workspace. Reach first value fast, then monitor asset throughput, reference database coverage, and generation performance."
    >
      {!activation.isActivated ? (
        <ActivationChecklist
          title="Complete the first value loop"
          description="Retention starts when a workspace imports one asset, runs one analysis, and turns that learning into one remix output."
          snapshot={activation}
          workspaceSlug={snapshot.workspace.slug}
          primaryAssetId={primaryAsset?.id}
          benchmarkCollectionId={primaryBenchmark?.id}
        />
      ) : null}

      <section className="metric-grid animate-fade-in-up delay-300">
        <MetricCard
          label="Workspace"
          value={snapshot.workspace.name}
          detail={`${snapshot.workspace.members.length} members on the ${snapshot.workspace.plan} plan.`}
        />
        <MetricCard
          label="Ready assets"
          value={String(readyAssets)}
          detail="Available for benchmarking or remix."
        />
        <MetricCard
          label="Viral Database"
          value={String(snapshot.benchmarkCollections.length)}
          detail="Curated reference sets."
        />
        <MetricCard
          label="Live jobs"
          value={String(liveJobs)}
          detail="Currently queued or processing."
        />
      </section>

      <section className="metric-grid animate-fade-in-up delay-400">
        <MetricCard
          label="Rising trends"
          value={String(risingTrends)}
          detail="Active opportunities to adopt."
        />
        <MetricCard
          label="Competitors"
          value={String(snapshot.competitorAccounts.length)}
          detail="Accounts being monitored."
        />
        <MetricCard
          label="Prompts"
          value={String(snapshot.promptTemplates.length)}
          detail="Reusable generation templates."
        />
        <MetricCard
          label="Remix jobs"
          value={String(snapshot.remixJobs.length)}
          detail="Generated content outputs."
        />
      </section>

      {risingTrends > 0 && (
        <section className="panel animate-fade-in-up delay-500" style={{ padding: '2rem' }}>
          <div className="table-header" style={{ marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Rising trends</h2>
              <p style={{ fontSize: '0.95rem' }}>Emerging patterns with low saturation. Act on these before they peak.</p>
            </div>
            <Link href={workspacePath(snapshot.workspace.slug, 'trends')} className="button button-secondary">
              View all trends
            </Link>
          </div>
          <div className="recommendation-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {snapshot.trendSnapshots
              .filter((t) => t.velocity === 'rising')
              .slice(0, 3)
              .map((trend) => (
                <article key={trend.id} className="recommendation-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div className="tag-row" style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span className="status-pill status-foundation" style={{ background: 'rgba(24, 138, 132, 0.2)', border: '1px solid rgba(24, 138, 132, 0.4)' }}>{trend.velocity}</span>
                    <span className="status-pill status-later" style={{ background: 'rgba(255,255,255,0.05)' }}>{trend.platform}</span>
                    <span className="status-pill status-later" style={{ background: 'rgba(255,255,255,0.05)' }}>{trend.category}</span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.75rem' }}>{trend.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.8)', flex: 1 }}>{trend.recommendedAction}</p>
                </article>
              ))}
          </div>
        </section>
      )}

      <div className="animate-fade-in-up delay-[600ms]">
        <CollectionTable
          title="Recent assets"
          description="Latest assets in the library. Click to view detail, transcript, and analysis."
          items={snapshot.assets}
          columns={[
            {
              key: 'title',
              header: 'Asset',
              render: (asset) => (
                <Link href={workspaceAssetPath(snapshot.workspace.slug, asset.id)} className="inline-link" style={{ fontWeight: 500 }}>
                  {asset.title}
                </Link>
              ),
            },
            { key: 'platform', header: 'Platform', render: (asset) => <span style={{ color: 'rgba(245, 241, 232, 0.7)' }}>{asset.platform}</span> },
            { key: 'status', header: 'Status', render: (asset) => <span className={`status-pill status-${asset.status}`}>{asset.status}</span> },
            { key: 'duration', header: 'Duration', render: (asset) => <span style={{ fontFamily: 'var(--font-mono)' }}>{asset.durationSeconds}s</span> },
          ]}
        />
      </div>

      <div className="animate-fade-in-up delay-[700ms]">
        <CollectionTable
          title="Prompt templates"
          description="Generation formulas with version tracking and outcome analytics."
          items={snapshot.promptTemplates}
          columns={[
            {
              key: 'title',
              header: 'Prompt',
              render: (prompt) => (
                <Link href={workspacePromptPath(snapshot.workspace.slug, prompt.id)} className="inline-link" style={{ fontWeight: 500 }}>
                  {prompt.title}
                </Link>
              ),
            },
            { key: 'objective', header: 'Objective', render: (prompt) => <span style={{ color: 'rgba(245, 241, 232, 0.7)' }}>{prompt.objective}</span> },
            { key: 'version', header: 'Version', render: (prompt) => <span style={{ fontFamily: 'var(--font-mono)' }}>v{prompt.version}</span> },
            { key: 'outcome', header: 'Last Outcome', render: (prompt) => <span>{prompt.lastOutcome}</span> },
          ]}
        />
      </div>
    </AppShell>
  );
}
