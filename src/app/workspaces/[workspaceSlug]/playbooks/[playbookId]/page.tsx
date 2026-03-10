import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import {
  getBenchmarkCollections,
  getPlaybookById,
  getPromptTemplates,
  getWorkspaceBySlug,
} from '@/lib/repositories';
import { workspaceBenchmarkPath, workspacePath, workspacePromptPath } from '@/lib/workspace-routing';

type PlaybookDetailParams = {
  params: Promise<{ workspaceSlug: string; playbookId: string }>;
};

export default async function PlaybookDetailPage({ params }: PlaybookDetailParams) {
  const { workspaceSlug, playbookId } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const playbook = await getPlaybookById(workspace.id, playbookId);

  if (!playbook) {
    notFound();
  }

  const [benchmarks, prompts] = await Promise.all([
    getBenchmarkCollections(workspace.id),
    getPromptTemplates(workspace.id),
  ]);

  const linkedBenchmarks = benchmarks.filter((b) => playbook.benchmarkCollectionIds.includes(b.id));
  const linkedPrompts = prompts.filter((p) => playbook.promptTemplateIds.includes(p.id));

  return (
    <AppShell
      workspace={workspace}
      title={playbook.title}
      description={playbook.description}
    >
      <section className="panel detail-grid">
        <div>
          <div className="tag-row">
            <span className={`status-pill ${playbook.status === 'active' ? 'status-foundation' : 'status-later'}`}>
              {playbook.status}
            </span>
            {playbook.targetPlatforms.map((p) => (
              <span key={p} className="status-pill status-next">{p}</span>
            ))}
          </div>
          <h2>{playbook.niche}</h2>
        </div>
        <div className="detail-pairs">
          <div><span>Benchmarks linked</span><strong>{linkedBenchmarks.length}</strong></div>
          <div><span>Prompts linked</span><strong>{linkedPrompts.length}</strong></div>
          <div><span>Guardrails</span><strong>{playbook.brandGuardrails.length} rules</strong></div>
        </div>
      </section>

      {linkedBenchmarks.length > 0 && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Benchmark collections</h2>
              <p>Reference sets that feed this playbook&apos;s creative strategy.</p>
            </div>
          </div>
          <div className="recommendation-list">
            {linkedBenchmarks.map((b) => (
              <article key={b.id} className="recommendation-card">
                <h3>
                  <Link href={workspaceBenchmarkPath(workspace.slug, b.id)} className="inline-link">
                    {b.title}
                  </Link>
                </h3>
                <p>{b.description} — Focus: {b.focus}. {b.assetIds.length} assets.</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {linkedPrompts.length > 0 && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Prompt templates</h2>
              <p>Generation formulas used in this playbook.</p>
            </div>
          </div>
          <div className="recommendation-list">
            {linkedPrompts.map((p) => (
              <article key={p.id} className="recommendation-card">
                <h3>
                  <Link href={workspacePromptPath(workspace.slug, p.id)} className="inline-link">
                    {p.title}
                  </Link>
                </h3>
                <p>{p.objective} — v{p.version}, last outcome: {p.lastOutcome}.</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Brand guardrails</h2>
            <p>Rules and constraints applied to all content generated through this playbook.</p>
          </div>
          <Link href={workspacePath(workspace.slug, 'playbooks')} className="button button-secondary">
            Back to playbooks
          </Link>
        </div>
        {playbook.brandGuardrails.length > 0 ? (
          <div className="recommendation-list">
            {playbook.brandGuardrails.map((guardrail, i) => (
              <article key={i} className="recommendation-card">
                <p>{guardrail}</p>
              </article>
            ))}
          </div>
        ) : (
          <p>No guardrails defined yet.</p>
        )}
      </section>
    </AppShell>
  );
}
