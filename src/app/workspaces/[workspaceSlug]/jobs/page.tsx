import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { CollectionTable } from '@/components/collection-table';
import {
  createAnalysisJobAction,
  createRemixJobAction,
} from '@/app/workspaces/[workspaceSlug]/actions';
import { hasAdminConfig } from '@/lib/firebase-admin';
import {
  getAnalysisJobs,
  getAssets,
  getBenchmarkCollections,
  getPromptTemplates,
  getRemixJobs,
  getWorkspaceBySlug,
} from '@/lib/repositories';
import { workspaceRemixJobPath } from '@/lib/workspace-routing';

type JobsParams = {
  params: Promise<{ workspaceSlug: string }>;
  searchParams: Promise<{ benchmarkCollectionId?: string }>;
};

export default async function WorkspaceJobsPage({ params, searchParams }: JobsParams) {
  const { workspaceSlug } = await params;
  const { benchmarkCollectionId } = await searchParams;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [analysisJobs, remixJobs, assets, benchmarkCollections, prompts] = await Promise.all([
    getAnalysisJobs(workspace.id),
    getRemixJobs(workspace.id),
    getAssets(workspace.id),
    getBenchmarkCollections(workspace.id),
    getPromptTemplates(workspace.id),
  ]);
  const analysisAction = createAnalysisJobAction.bind(null, workspace.slug);
  const remixAction = createRemixJobAction.bind(null, workspace.slug);

  return (
    <AppShell
      workspace={workspace}
      title="Execution jobs"
      description="Analysis and remix execution queues. Create jobs to process assets and generate content outputs."
    >
      <section className="jobs-form-grid">
        <section className="panel form-panel">
          <div className="table-header">
            <div>
              <h2>Queue analysis job</h2>
              <p>Run transcript extraction, scene segmentation, and scoring on an asset.</p>
            </div>
            {!hasAdminConfig ? <p className="warning-inline">Create actions require Admin SDK configuration.</p> : null}
          </div>

          <form action={analysisAction} className="entity-form">
            <input type="hidden" name="workspaceId" value={workspace.id} />
            <label>
              <span>Asset</span>
              <select name="assetId" defaultValue={assets[0]?.id}>
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Job type</span>
              <select name="jobType" defaultValue="library-analysis">
                <option value="library-analysis">Library analysis</option>
                <option value="benchmark-analysis">Viral Reference Analysis</option>
                <option value="competitor-scan">Competitor scan</option>
              </select>
            </label>
            <button type="submit" className="button" disabled={!hasAdminConfig || assets.length === 0}>
              Queue analysis
            </button>
          </form>
        </section>

        <section className="panel form-panel">
          <div className="table-header">
            <div>
              <h2>Create remix job</h2>
              <p>Generate scripts, scene plans, or creative briefs from viral reference patterns.</p>
            </div>
            {!hasAdminConfig ? <p className="warning-inline">Create actions require Admin SDK configuration.</p> : null}
          </div>

          <form action={remixAction} className="entity-form">
            <input type="hidden" name="workspaceId" value={workspace.id} />
            <label>
              <span>Reference collection</span>
              <select name="benchmarkCollectionId" defaultValue={benchmarkCollectionId || benchmarkCollections[0]?.id}>
                {benchmarkCollections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Output type</span>
              <select name="outputType" defaultValue="script">
                <option value="script">Script</option>
                <option value="scene-plan">Scene plan</option>
                <option value="creative-brief">Creative brief</option>
              </select>
            </label>
            <label>
              <span>Prompt template (optional)</span>
              <select name="promptId" defaultValue="">
                <option value="">No prompt</option>
                {prompts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-span-full">
              <span>Target offer</span>
              <input name="targetOffer" placeholder="Short-form concept for a B2B AI product" required />
            </label>
            <button
              type="submit"
              className="button"
              disabled={!hasAdminConfig || benchmarkCollections.length === 0}
            >
              Create remix job
            </button>
          </form>
        </section>
      </section>

      <CollectionTable
        title="Analysis Jobs"
        description="Transcript, scene segmentation, and scoring results for processed assets."
        items={analysisJobs}
        columns={[
          { key: 'type', header: 'Type', render: (job) => job.jobType },
          { key: 'status', header: 'Status', render: (job) => <span className={`status-pill status-${job.status}`}>{job.status}</span> },
          { key: 'asset', header: 'Asset', render: (job) => job.assetId },
          {
            key: 'summary',
            header: 'Output',
            render: (job) => (
              <Link href={workspaceRemixJobPath(workspace.slug, job.id)} className="inline-link">
                {job.outputSummary || 'View Analysis'}
              </Link>
            )
          },
        ]}
      />

      <CollectionTable
        title="Remix Jobs"
        description="Generated scripts, scene plans, and creative briefs. Click to view full output."
        items={remixJobs}
        columns={[
          {
            key: 'offer',
            header: 'Target Offer',
            render: (job) => (
              <Link href={workspaceRemixJobPath(workspace.slug, job.id)} className="inline-link">
                {job.targetOffer}
              </Link>
            ),
          },
          { key: 'status', header: 'Status', render: (job) => <span className={`status-pill status-${job.status}`}>{job.status}</span> },
          { key: 'type', header: 'Output Type', render: (job) => job.outputType },
          { key: 'benchmark', header: 'Reference', render: (job) => job.benchmarkCollectionId },
        ]}
      />
    </AppShell>
  );
}
