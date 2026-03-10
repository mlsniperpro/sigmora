import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { CollectionTable } from '@/components/collection-table';
import { MetricCard } from '@/components/metric-card';
import { getDashboardSnapshotBySlug } from '@/lib/repositories';
import { workspaceAssetPath, workspacePath, workspacePromptPath } from '@/lib/workspace-routing';

type DashboardParams = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function WorkspaceDashboardPage({ params }: DashboardParams) {
  const { workspaceSlug } = await params;
  const snapshot = await getDashboardSnapshotBySlug(workspaceSlug);
  const readyAssets = snapshot.assets.filter((asset) => asset.status === 'ready').length;
  const liveJobs = snapshot.analysisJobs.filter((job) => job.status === 'running' || job.status === 'queued').length;
  const risingTrends = snapshot.trendSnapshots.filter((t) => t.velocity === 'rising').length;

  return (
    <AppShell
      workspace={snapshot.workspace}
      title="Workspace dashboard"
      description="Operating surface for the active workspace. Monitor asset throughput, benchmark coverage, prompt inventory, trend signals, and job execution."
    >
      <section className="metric-grid">
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
          label="Benchmarks"
          value={String(snapshot.benchmarkCollections.length)}
          detail="Curated reference sets."
        />
        <MetricCard
          label="Live jobs"
          value={String(liveJobs)}
          detail="Currently queued or processing."
        />
      </section>

      <section className="metric-grid">
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
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Rising trends</h2>
              <p>Emerging patterns with low saturation. Act on these before they peak.</p>
            </div>
            <Link href={workspacePath(snapshot.workspace.slug, 'trends')} className="button button-secondary">
              View all trends
            </Link>
          </div>
          <div className="recommendation-list">
            {snapshot.trendSnapshots
              .filter((t) => t.velocity === 'rising')
              .slice(0, 3)
              .map((trend) => (
                <article key={trend.id} className="recommendation-card">
                  <div className="tag-row">
                    <span className="status-pill status-foundation">rising</span>
                    <span className="status-pill status-later">{trend.platform}</span>
                    <span className="status-pill status-later">{trend.category}</span>
                  </div>
                  <h3 style={{ marginTop: '0.5rem' }}>{trend.title}</h3>
                  <p>{trend.recommendedAction}</p>
                </article>
              ))}
          </div>
        </section>
      )}

      <CollectionTable
        title="Recent assets"
        description="Latest assets in the library. Click to view detail, transcript, and analysis."
        items={snapshot.assets}
        columns={[
          {
            key: 'title',
            header: 'Asset',
            render: (asset) => (
              <Link href={workspaceAssetPath(snapshot.workspace.slug, asset.id)} className="inline-link">
                {asset.title}
              </Link>
            ),
          },
          { key: 'platform', header: 'Platform', render: (asset) => asset.platform },
          { key: 'status', header: 'Status', render: (asset) => asset.status },
          { key: 'duration', header: 'Duration', render: (asset) => `${asset.durationSeconds}s` },
        ]}
      />

      <CollectionTable
        title="Prompt templates"
        description="Generation formulas with version tracking and outcome analytics."
        items={snapshot.promptTemplates}
        columns={[
          {
            key: 'title',
            header: 'Prompt',
            render: (prompt) => (
              <Link href={workspacePromptPath(snapshot.workspace.slug, prompt.id)} className="inline-link">
                {prompt.title}
              </Link>
            ),
          },
          { key: 'objective', header: 'Objective', render: (prompt) => prompt.objective },
          { key: 'version', header: 'Version', render: (prompt) => `v${prompt.version}` },
          { key: 'outcome', header: 'Last Outcome', render: (prompt) => prompt.lastOutcome },
        ]}
      />
    </AppShell>
  );
}
