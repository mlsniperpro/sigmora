import Link from 'next/link';
import { ActivationChecklist } from '@/components/activation-checklist';
import { ActivationTracker } from '@/components/activation-tracker';
import { AppShell } from '@/components/app-shell';
import { getActivationSnapshot } from '@/lib/activation';
import {
  getAnalysisResults,
  getAssets,
  getBenchmarkCollections,
  getRemixJobs,
  getWorkspaceBySlug,
} from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

type ActivationPageParams = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function WorkspaceActivationPage({ params }: ActivationPageParams) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [assets, analysisResults, remixJobs, benchmarkCollections] = await Promise.all([
    getAssets(workspace.id),
    getAnalysisResults(workspace.id),
    getRemixJobs(workspace.id),
    getBenchmarkCollections(workspace.id),
  ]);

  const activation = getActivationSnapshot({ assets, analysisResults, remixJobs });
  const primaryAsset = assets.find((asset) => asset.status === 'ready') ?? assets[0];
  const primaryBenchmark = benchmarkCollections[0];

  return (
    <AppShell
      workspace={workspace}
      title="Get to first value"
      description="Do one fast pass through the core loop: bring in a video, analyze what makes it work, then generate a new execution asset from that signal."
    >
      <ActivationTracker
        workspaceSlug={workspace.slug}
        eventType="activation_page_viewed"
        stage="started"
        sourcePath={workspacePath(workspace.slug, 'activate')}
      />

      <ActivationChecklist
        title="Your first retention loop"
        description="This studio should feel useful before it asks for more commitment. Finish these three steps to turn Sigmora from a concept into an active workflow."
        snapshot={activation}
        workspaceSlug={workspace.slug}
        primaryAssetId={primaryAsset?.id}
        benchmarkCollectionId={primaryBenchmark?.id}
        showLaunchLink
      />

      <section className="panel" style={{ padding: '2rem' }}>
        <div className="table-header" style={{ marginBottom: '1.5rem' }}>
          <div>
            <p className="eyebrow">Why This Order</p>
            <h2 style={{ fontSize: '1.5rem' }}>Value first. Billing later.</h2>
          </div>
        </div>
        <div className="recommendation-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <article className="recommendation-card">
            <h3>1. Ingest a real input</h3>
            <p>Users retain when they see their own workflow reflected back, not when they browse a static product tour.</p>
          </article>
          <article className="recommendation-card">
            <h3>2. Produce an immediate insight</h3>
            <p>The analysis output needs to answer what to change in the next video within minutes, not after a long setup process.</p>
          </article>
          <article className="recommendation-card">
            <h3>3. Turn insight into action</h3>
            <p>A generated script or scene plan creates stored work product, which is what gives the studio return value.</p>
          </article>
        </div>
      </section>

      <section className="panel" style={{ padding: '2rem' }}>
        <div className="table-header" style={{ marginBottom: '1.5rem' }}>
          <div>
            <p className="eyebrow">Fast Paths</p>
            <h2 style={{ fontSize: '1.5rem' }}>Jump into the next useful action</h2>
          </div>
        </div>
        <div className="tag-row" style={{ gap: '0.75rem' }}>
          <Link href={workspacePath(workspace.slug, 'library')} className="button">
            Import or upload a video
          </Link>
          <Link
            href={primaryAsset ? `${workspacePath(workspace.slug, 'library')}/${primaryAsset.id}` : workspacePath(workspace.slug, 'library')}
            className="button button-secondary"
          >
            Run analysis
          </Link>
          <Link
            href={primaryBenchmark ? `${workspacePath(workspace.slug, 'jobs')}?benchmarkCollectionId=${primaryBenchmark.id}` : workspacePath(workspace.slug, 'jobs')}
            className="button button-secondary"
          >
            Generate a remix
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
