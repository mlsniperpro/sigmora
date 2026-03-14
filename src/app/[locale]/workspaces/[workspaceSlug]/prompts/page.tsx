import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { CollectionTable } from '@/components/collection-table';
import { createPromptTemplateAction } from '../actions';
import { hasAdminConfig } from '@/lib/firebase-admin';
import { getPromptTemplates, getWorkspaceBySlug } from '@/lib/repositories';
import { workspacePromptPath } from '@/lib/workspace-routing';

type PromptParams = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function WorkspacePromptsPage({ params }: PromptParams) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const promptTemplates = await getPromptTemplates(workspace.id);
  const action = createPromptTemplateAction.bind(null, workspace.slug);

  return (
    <AppShell
      workspace={workspace}
      title="Prompt management"
      description="Versioned prompt templates with run history and outcome tracking. Create, test, and iterate on generation formulas."
    >
      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Create prompt template</h2>
            <p>Define a reusable generation formula. Use {'{{variable}}'} syntax for dynamic inputs.</p>
          </div>
          {!hasAdminConfig ? <p className="warning-inline">Create actions require Admin SDK configuration.</p> : null}
        </div>

        <form action={action} className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <label>
            <span>Title</span>
            <input name="title" placeholder="Hook remix prompt" required />
          </label>
          <label>
            <span>Objective</span>
            <input name="objective" placeholder="Generate 3 high-tension openings for a SaaS demo ad" required />
          </label>
          <label className="form-span-full">
            <span>Prompt body</span>
            <textarea
              name="body"
              rows={4}
              placeholder="Enter the prompt template with {{variables}} for dynamic inputs..."
              style={{
                width: '100%',
                padding: '0.95rem 1rem',
                borderRadius: '1rem',
                border: '1px solid var(--panel-border)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: 'var(--color-paper-100)',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                resize: 'vertical',
              }}
            />
          </label>
          <label className="form-span-full">
            <span>Tags (comma-separated)</span>
            <input name="tags" placeholder="hooks, variants, generation" />
          </label>
          <button type="submit" className="button" disabled={!hasAdminConfig}>
            Create prompt template
          </button>
        </form>
      </section>

      <CollectionTable
        title="Prompt inventory"
        description="Click a prompt to see its full template, run history, and performance analytics."
        items={promptTemplates}
        columns={[
          {
            key: 'title',
            header: 'Prompt',
            render: (prompt) => (
              <Link href={workspacePromptPath(workspace.slug, prompt.id)} className="inline-link">
                {prompt.title}
              </Link>
            ),
          },
          { key: 'objective', header: 'Objective', render: (prompt) => prompt.objective },
          { key: 'version', header: 'Version', render: (prompt) => `v${prompt.version}` },
          { key: 'outcome', header: 'Outcome', render: (prompt) => prompt.lastOutcome },
        ]}
      />
    </AppShell>
  );
}
