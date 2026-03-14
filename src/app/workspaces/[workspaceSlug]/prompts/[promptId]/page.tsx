import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import {
  createPromptRunAction,
  ratePromptRunAction,
  updatePromptTemplateAction,
} from '@/app/workspaces/[workspaceSlug]/actions';
import { hasAdminConfig } from '@/lib/firebase-admin';
import { getPromptRunsByPromptId, getPromptTemplateById, getWorkspaceBySlug } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

type PromptDetailParams = {
  params: Promise<{ workspaceSlug: string; promptId: string }>;
};

export default async function PromptDetailPage({ params }: PromptDetailParams) {
  const { workspaceSlug, promptId } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const prompt = await getPromptTemplateById(workspace.id, promptId);

  if (!prompt) {
    notFound();
  }

  const runs = await getPromptRunsByPromptId(workspace.id, promptId);
  const strongRuns = runs.filter((r) => r.outcome === 'strong').length;
  const mixedRuns = runs.filter((r) => r.outcome === 'mixed').length;
  const weakRuns = runs.filter((r) => r.outcome === 'weak').length;

  const updateAction = updatePromptTemplateAction.bind(null, workspace.slug);
  const runAction = createPromptRunAction.bind(null, workspace.slug);

  return (
    <AppShell
      workspace={workspace}
      title={prompt.title}
      description={prompt.objective}
    >
      <section className="panel detail-grid">
        <div>
          <div className="tag-row">
            <span className={`status-pill ${prompt.lastOutcome === 'strong' ? 'status-foundation' : prompt.lastOutcome === 'mixed' ? 'status-next' : 'status-later'}`}>
              {prompt.lastOutcome}
            </span>
            <span className="status-pill status-later">v{prompt.version}</span>
            {prompt.tags.map((tag) => (
              <span key={tag} className="status-pill status-later">{tag}</span>
            ))}
          </div>
          <h2>{prompt.objective}</h2>
        </div>
        <div className="detail-pairs">
          <div><span>Version</span><strong>v{prompt.version}</strong></div>
          <div><span>Total runs</span><strong>{runs.length}</strong></div>
          <div><span>Last outcome</span><strong>{prompt.lastOutcome}</strong></div>
        </div>
      </section>

      {prompt.body && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Prompt template</h2>
              <p>The current prompt body. Variables use {'{{variable}}'} syntax.</p>
            </div>
          </div>
          <div className="recommendation-card">
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{prompt.body}</pre>
          </div>
        </section>
      )}

      {runs.length > 0 && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Performance summary</h2>
              <p>Outcome distribution across {runs.length} runs.</p>
            </div>
          </div>
          <div className="metric-grid">
            <div className="panel metric-card">
              <p className="metric-label">Strong</p>
              <h2>{strongRuns}</h2>
              <p>{runs.length > 0 ? `${Math.round((strongRuns / runs.length) * 100)}%` : '0%'} of runs</p>
            </div>
            <div className="panel metric-card">
              <p className="metric-label">Mixed</p>
              <h2>{mixedRuns}</h2>
              <p>{runs.length > 0 ? `${Math.round((mixedRuns / runs.length) * 100)}%` : '0%'} of runs</p>
            </div>
            <div className="panel metric-card">
              <p className="metric-label">Weak</p>
              <h2>{weakRuns}</h2>
              <p>{runs.length > 0 ? `${Math.round((weakRuns / runs.length) * 100)}%` : '0%'} of runs</p>
            </div>
            <div className="panel metric-card">
              <p className="metric-label">Success rate</p>
              <h2>{runs.length > 0 ? `${Math.round((strongRuns / runs.length) * 100)}%` : '0%'}</h2>
              <p>Strong outcome rate</p>
            </div>
          </div>
        </section>
      )}

      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Update prompt</h2>
            <p>Edit the template to create a new version. Leave fields blank to keep current values.</p>
          </div>
        </div>
        <form action={updateAction} className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <input type="hidden" name="promptId" value={prompt.id} />
          <label>
            <span>Title</span>
            <input name="title" placeholder={prompt.title} />
          </label>
          <label>
            <span>Objective</span>
            <input name="objective" placeholder={prompt.objective} />
          </label>
          <label className="form-span-full">
            <span>Prompt body</span>
            <textarea
              name="body"
              rows={6}
              placeholder={prompt.body || 'Enter the prompt template...'}
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
          <button type="submit" className="button" disabled={!hasAdminConfig}>
            Save new version (v{prompt.version + 1})
          </button>
        </form>
      </section>

      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Log a run</h2>
            <p>Record an execution of this prompt with its input and output.</p>
          </div>
        </div>
        <form action={runAction} className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <input type="hidden" name="promptId" value={prompt.id} />
          <label className="form-span-full">
            <span>Input</span>
            <input name="input" placeholder="The variables and context passed to the prompt" required />
          </label>
          <label className="form-span-full">
            <span>Output</span>
            <textarea
              name="output"
              rows={4}
              placeholder="The generated output from this run"
              required
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
          <label>
            <span>Outcome</span>
            <select name="outcome" defaultValue="pending">
              <option value="pending">Pending review</option>
              <option value="strong">Strong</option>
              <option value="mixed">Mixed</option>
              <option value="weak">Weak</option>
            </select>
          </label>
          <button type="submit" className="button" disabled={!hasAdminConfig}>
            Log run
          </button>
        </form>
      </section>

      {runs.length > 0 && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Run history</h2>
              <p>All executions of this prompt, most recent first.</p>
            </div>
            <Link href={workspacePath(workspace.slug, 'prompts')} className="button button-secondary">
              Back to prompts
            </Link>
          </div>
          <div className="recommendation-list">
            {[...runs].reverse().map((run) => {
              const rateAction = ratePromptRunAction.bind(null, workspace.slug);
              return (
                <article key={run.id} className="recommendation-card">
                  <div className="tag-row">
                    <span className={`status-pill ${run.outcome === 'strong' ? 'status-foundation' : run.outcome === 'mixed' ? 'status-next' : run.outcome === 'weak' ? 'status-later' : 'status-later'}`}>
                      {run.outcome}
                    </span>
                    <span className="status-pill status-later">v{run.promptVersion}</span>
                    <span className="status-pill status-later">{new Date(run.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 style={{ marginTop: '0.5rem' }}>Input</h3>
                  <p>{run.input}</p>
                  <h3 style={{ marginTop: '0.75rem' }}>Output</h3>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, color: 'var(--text-secondary)' }}>
                    {run.output}
                  </pre>
                  {run.outcome === 'pending' && (
                    <div className="tag-row" style={{ marginTop: '0.75rem' }}>
                      <form action={rateAction} style={{ display: 'inline' }}>
                        <input type="hidden" name="runId" value={run.id} />
                        <input type="hidden" name="promptId" value={prompt.id} />
                        <input type="hidden" name="outcome" value="strong" />
                        <button type="submit" className="button" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
                          Rate: Strong
                        </button>
                      </form>
                      <form action={rateAction} style={{ display: 'inline' }}>
                        <input type="hidden" name="runId" value={run.id} />
                        <input type="hidden" name="promptId" value={prompt.id} />
                        <input type="hidden" name="outcome" value="mixed" />
                        <button type="submit" className="button-secondary" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
                          Rate: Mixed
                        </button>
                      </form>
                      <form action={rateAction} style={{ display: 'inline' }}>
                        <input type="hidden" name="runId" value={run.id} />
                        <input type="hidden" name="promptId" value={prompt.id} />
                        <input type="hidden" name="outcome" value="weak" />
                        <button type="submit" className="button-secondary" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
                          Rate: Weak
                        </button>
                      </form>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}
    </AppShell>
  );
}
