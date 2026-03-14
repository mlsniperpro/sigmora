import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { CollectionTable } from '@/components/collection-table';
import { createPlaybookAction } from '../actions';
import { hasAdminConfig } from '@/lib/firebase-admin';
import { getBenchmarkCollections, getPlaybooks, getPromptTemplates, getWorkspaceBySlug } from '@/lib/repositories';
import { workspacePlaybookPath } from '@/lib/workspace-routing';

type PlaybooksParams = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function PlaybooksPage({ params }: PlaybooksParams) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [playbooks, benchmarks, prompts] = await Promise.all([
    getPlaybooks(workspace.id),
    getBenchmarkCollections(workspace.id),
    getPromptTemplates(workspace.id),
  ]);
  const action = createPlaybookAction.bind(null, workspace.slug);

  return (
    <AppShell
      workspace={workspace}
      title="Playbooks"
      description="Saved workflows that combine benchmark collections, prompt templates, brand guardrails, and platform targeting into reusable creative strategies."
    >
      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Create playbook</h2>
            <p>Assemble benchmarks, prompts, guardrails, and target platforms into a repeatable workflow.</p>
          </div>
        </div>
        <form action={action} className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <label>
            <span>Title</span>
            <input name="title" placeholder="Ecommerce Product Launch" required />
          </label>
          <label>
            <span>Niche</span>
            <input name="niche" placeholder="Ecommerce / DTC" required />
          </label>
          <label className="form-span-full">
            <span>Description</span>
            <input name="description" placeholder="End-to-end playbook for launching products with short-form video." required />
          </label>
          <label>
            <span>Benchmark collection IDs</span>
            <input name="benchmarkCollectionIds" placeholder={benchmarks.map((b) => b.id).join(', ')} />
          </label>
          <label>
            <span>Prompt template IDs</span>
            <input name="promptTemplateIds" placeholder={prompts.map((p) => p.id).join(', ')} />
          </label>
          <label className="form-span-full">
            <span>Brand guardrails (comma-separated)</span>
            <input name="brandGuardrails" placeholder="No false scarcity, All testimonials must be real" />
          </label>
          <label className="form-span-full">
            <span>Target platforms (comma-separated)</span>
            <input name="targetPlatforms" placeholder="tiktok, instagram" />
          </label>
          <button type="submit" className="button" disabled={!hasAdminConfig}>
            Create playbook
          </button>
        </form>
      </section>

      <CollectionTable
        title="Saved playbooks"
        description="Each playbook bundles a complete creative strategy for a niche or campaign type."
        items={playbooks}
        columns={[
          {
            key: 'title',
            header: 'Playbook',
            render: (p) => (
              <Link href={workspacePlaybookPath(workspace.slug, p.id)} className="inline-link">
                {p.title}
              </Link>
            ),
          },
          { key: 'niche', header: 'Niche', render: (p) => p.niche },
          { key: 'platforms', header: 'Platforms', render: (p) => p.targetPlatforms.join(', ') },
          { key: 'status', header: 'Status', render: (p) => p.status },
        ]}
      />
    </AppShell>
  );
}
