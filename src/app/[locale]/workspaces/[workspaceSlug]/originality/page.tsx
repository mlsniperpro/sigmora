import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';
import { getPlaybooks, getRemixOutputs, getWorkspaceBySlug } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

type OriginalityParams = {
  params: Promise<{ workspaceSlug: string }>;
  searchParams: Promise<{ outputId?: string; playbookId?: string }>;
};

function checkGuardrails(content: string, guardrails: string[]) {
  return guardrails.map((rule) => {
    const lower = content.toLowerCase();
    const ruleWords = rule.toLowerCase().split(' ').filter((w) => w.length > 3);
    const triggered = ruleWords.some((word) => lower.includes(word));
    return {
      rule,
      status: triggered ? 'review' as const : 'pass' as const,
      detail: triggered
        ? 'Content may reference concepts related to this guardrail. Review before publishing.'
        : 'No concerns detected for this rule.',
    };
  });
}

function calculateOriginalityScore(content: string) {
  const genericPhrases = [
    'link in bio', 'follow for more', 'stop scrolling', 'you won\'t believe',
    'game changer', 'life hack', 'must watch', 'don\'t miss this',
    'share this', 'tag a friend', 'limited time', 'act now',
  ];
  const lower = content.toLowerCase();
  const matches = genericPhrases.filter((p) => lower.includes(p));
  const phraseScore = Math.max(0, 100 - matches.length * 15);
  const lengthVariance = Math.min(100, 40 + content.length / 5);
  return {
    score: Math.round((phraseScore * 0.6 + lengthVariance * 0.4)),
    genericPhrases: matches,
    uniqueFactors: [
      content.includes('data') || content.includes('tested') ? 'Uses specific data claims' : null,
      content.includes('framework') || content.includes('system') ? 'References systematic approach' : null,
      content.length > 300 ? 'Sufficient content depth' : 'Content may be too thin',
    ].filter(Boolean) as string[],
  };
}

export default async function OriginalityPage({ params, searchParams }: OriginalityParams) {
  const { workspaceSlug } = await params;
  const filters = await searchParams;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [outputs, playbooks] = await Promise.all([
    getRemixOutputs(workspace.id),
    getPlaybooks(workspace.id),
  ]);

  const selectedOutput = filters.outputId ? outputs.find((o) => o.id === filters.outputId) : null;
  const selectedPlaybook = filters.playbookId ? playbooks.find((p) => p.id === filters.playbookId) : null;

  const originality = selectedOutput ? calculateOriginalityScore(selectedOutput.content + (selectedOutput.scenes?.map((s) => s.text).join(' ') ?? '')) : null;
  const guardrailResults = selectedOutput && selectedPlaybook
    ? checkGuardrails(selectedOutput.content + (selectedOutput.scenes?.map((s) => s.text).join(' ') ?? ''), selectedPlaybook.brandGuardrails)
    : null;

  const passCount = guardrailResults?.filter((r) => r.status === 'pass').length ?? 0;
  const reviewCount = guardrailResults?.filter((r) => r.status === 'review').length ?? 0;

  return (
    <AppShell
      workspace={workspace}
      title="Originality & brand-fit check"
      description="Check remix outputs against brand guardrails and originality heuristics before publishing. Catch generic phrasing, guardrail violations, and low-differentiation content."
    >
      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Select content to check</h2>
            <p>Choose a remix output and a playbook (for brand guardrails) to run the check.</p>
          </div>
        </div>
        <form style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr auto', alignItems: 'end' }}>
          <label style={{ display: 'grid', gap: '0.4rem' }}>
            <span style={{ color: 'var(--color-paper-200)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.74rem' }}>Remix output</span>
            <select name="outputId" defaultValue={filters.outputId} style={{ padding: '0.75rem 1rem', borderRadius: '1rem', border: '1px solid rgba(245,241,232,0.12)', background: 'rgba(255,255,255,0.04)', color: 'var(--color-paper-100)', fontFamily: 'inherit' }}>
              <option value="">Select output...</option>
              {outputs.map((o) => <option key={o.id} value={o.id}>{o.title}</option>)}
            </select>
          </label>
          <label style={{ display: 'grid', gap: '0.4rem' }}>
            <span style={{ color: 'var(--color-paper-200)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.74rem' }}>Playbook (guardrails)</span>
            <select name="playbookId" defaultValue={filters.playbookId} style={{ padding: '0.75rem 1rem', borderRadius: '1rem', border: '1px solid rgba(245,241,232,0.12)', background: 'rgba(255,255,255,0.04)', color: 'var(--color-paper-100)', fontFamily: 'inherit' }}>
              <option value="">No playbook (skip guardrails)</option>
              {playbooks.map((p) => <option key={p.id} value={p.id}>{p.title} ({p.brandGuardrails.length} rules)</option>)}
            </select>
          </label>
          <button type="submit" className="button" style={{ padding: '0.75rem 1.25rem' }}>
            Run check
          </button>
        </form>
      </section>

      {selectedOutput && originality && (
        <>
          <section className="metric-grid">
            <MetricCard
              label="Originality score"
              value={`${originality.score}/100`}
              detail={originality.score >= 75 ? 'Good differentiation.' : originality.score >= 50 ? 'Moderate — consider revising.' : 'Low — significant revision needed.'}
            />
            <MetricCard label="Generic phrases" value={String(originality.genericPhrases.length)} detail={originality.genericPhrases.length === 0 ? 'No cliches detected.' : 'Found overused phrases.'} />
            {guardrailResults && (
              <>
                <MetricCard label="Guardrails passed" value={String(passCount)} detail={`Out of ${guardrailResults.length} rules.`} />
                <MetricCard label="Needs review" value={String(reviewCount)} detail={reviewCount === 0 ? 'All clear.' : 'Check flagged rules.'} />
              </>
            )}
          </section>

          <section className="panel">
            <div className="table-header">
              <div>
                <h2>Originality analysis</h2>
                <p>Content: {selectedOutput.title}</p>
              </div>
            </div>

            {originality.genericPhrases.length > 0 && (
              <div className="callout warning">
                <strong>Generic phrases detected:</strong> {originality.genericPhrases.map((p) => `"${p}"`).join(', ')}. These are overused across the platform and reduce differentiation.
              </div>
            )}

            <div className="recommendation-list">
              {originality.uniqueFactors.map((factor) => (
                <article key={factor} className="recommendation-card">
                  <div className="tag-row">
                    <span className={`status-pill ${factor.startsWith('Content may') ? 'status-next' : 'status-foundation'}`}>
                      {factor.startsWith('Content may') ? 'warning' : 'strength'}
                    </span>
                  </div>
                  <p style={{ marginTop: '0.5rem' }}>{factor}</p>
                </article>
              ))}
            </div>
          </section>

          {guardrailResults && selectedPlaybook && (
            <section className="panel">
              <div className="table-header">
                <div>
                  <h2>Brand guardrail check</h2>
                  <p>Playbook: {selectedPlaybook.title}</p>
                </div>
              </div>
              <div className="recommendation-list">
                {guardrailResults.map((result) => (
                  <article key={result.rule} className="recommendation-card">
                    <div className="tag-row">
                      <span className={`status-pill ${result.status === 'pass' ? 'status-foundation' : 'status-next'}`}>
                        {result.status}
                      </span>
                    </div>
                    <h3 style={{ marginTop: '0.5rem' }}>{result.rule}</h3>
                    <p>{result.detail}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="panel">
            <div className="table-header">
              <div>
                <h2>Content preview</h2>
                <p>The full content that was checked.</p>
              </div>
              <Link href={workspacePath(workspace.slug, 'jobs')} className="button button-secondary">
                Back to jobs
              </Link>
            </div>
            <div className="recommendation-card">
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
                {selectedOutput.scenes
                  ? selectedOutput.scenes.map((s) => `[Scene ${s.sceneNumber} — ${s.purpose}]\n${s.text}\nVisual: ${s.visual}\nAudio: ${s.audio}`).join('\n\n')
                  : selectedOutput.content}
              </pre>
            </div>
          </section>
        </>
      )}

      {!selectedOutput && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>No content selected</h2>
              <p>Select a remix output above to check originality and brand fit.</p>
            </div>
          </div>
        </section>
      )}
    </AppShell>
  );
}
