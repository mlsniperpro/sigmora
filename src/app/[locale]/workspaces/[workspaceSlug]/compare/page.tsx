import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { getRemixOutputs, getPromptRuns, getWorkspaceBySlug } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

type CompareParams = {
  params: Promise<{ workspaceSlug: string }>;
  searchParams: Promise<{ type?: string; a?: string; b?: string }>;
};

const purposeColors: Record<string, string> = {
  hook: '#3b9c97',
  problem: '#c46832',
  proof: '#7a6bbf',
  demo: '#5a8f3f',
  cta: '#cf4f4f',
};

export default async function ComparePage({ params, searchParams }: CompareParams) {
  const { workspaceSlug } = await params;
  const filters = await searchParams;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [outputs, runs] = await Promise.all([
    getRemixOutputs(workspace.id),
    getPromptRuns(workspace.id),
  ]);

  const compareType = filters.type ?? 'remix';
  const idA = filters.a;
  const idB = filters.b;

  const outputA = compareType === 'remix' ? outputs.find((o) => o.id === idA) : null;
  const outputB = compareType === 'remix' ? outputs.find((o) => o.id === idB) : null;
  const runA = compareType === 'prompt' ? runs.find((r) => r.id === idA) : null;
  const runB = compareType === 'prompt' ? runs.find((r) => r.id === idB) : null;

  return (
    <AppShell
      workspace={workspace}
      title="Side-by-side comparison"
      description="Compare remix outputs or prompt run variants side by side to evaluate structural differences, scene plans, and quality."
    >
      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Select variants to compare</h2>
            <p>Choose a comparison type and pick two items.</p>
          </div>
        </div>
        <div className="tag-row">
          <Link
            href={`/workspaces/${workspaceSlug}/compare?type=remix`}
            className={`button-secondary ${compareType === 'remix' ? 'button' : ''}`}
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none' }}
          >
            Remix outputs
          </Link>
          <Link
            href={`/workspaces/${workspaceSlug}/compare?type=prompt`}
            className={`button-secondary ${compareType === 'prompt' ? 'button' : ''}`}
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none' }}
          >
            Prompt runs
          </Link>
        </div>

        {compareType === 'remix' && (
          <form style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr auto', alignItems: 'end' }}>
            <input type="hidden" name="type" value="remix" />
            <label style={{ display: 'grid', gap: '0.4rem' }}>
              <span style={{ color: 'var(--color-paper-200)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.74rem' }}>Variant A</span>
              <select name="a" defaultValue={idA} style={{ padding: '0.75rem 1rem', borderRadius: '1rem', border: '1px solid rgba(245,241,232,0.12)', background: 'rgba(255,255,255,0.04)', color: 'var(--color-paper-100)', fontFamily: 'inherit' }}>
                <option value="">Select output...</option>
                {outputs.map((o) => <option key={o.id} value={o.id}>{o.title}</option>)}
              </select>
            </label>
            <label style={{ display: 'grid', gap: '0.4rem' }}>
              <span style={{ color: 'var(--color-paper-200)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.74rem' }}>Variant B</span>
              <select name="b" defaultValue={idB} style={{ padding: '0.75rem 1rem', borderRadius: '1rem', border: '1px solid rgba(245,241,232,0.12)', background: 'rgba(255,255,255,0.04)', color: 'var(--color-paper-100)', fontFamily: 'inherit' }}>
                <option value="">Select output...</option>
                {outputs.map((o) => <option key={o.id} value={o.id}>{o.title}</option>)}
              </select>
            </label>
            <button type="submit" className="button" style={{ padding: '0.75rem 1.25rem' }}>Compare</button>
          </form>
        )}

        {compareType === 'prompt' && (
          <form style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr auto', alignItems: 'end' }}>
            <input type="hidden" name="type" value="prompt" />
            <label style={{ display: 'grid', gap: '0.4rem' }}>
              <span style={{ color: 'var(--color-paper-200)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.74rem' }}>Run A</span>
              <select name="a" defaultValue={idA} style={{ padding: '0.75rem 1rem', borderRadius: '1rem', border: '1px solid rgba(245,241,232,0.12)', background: 'rgba(255,255,255,0.04)', color: 'var(--color-paper-100)', fontFamily: 'inherit' }}>
                <option value="">Select run...</option>
                {runs.map((r) => <option key={r.id} value={r.id}>v{r.promptVersion} — {r.outcome} ({r.input.slice(0, 40)}...)</option>)}
              </select>
            </label>
            <label style={{ display: 'grid', gap: '0.4rem' }}>
              <span style={{ color: 'var(--color-paper-200)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.74rem' }}>Run B</span>
              <select name="b" defaultValue={idB} style={{ padding: '0.75rem 1rem', borderRadius: '1rem', border: '1px solid rgba(245,241,232,0.12)', background: 'rgba(255,255,255,0.04)', color: 'var(--color-paper-100)', fontFamily: 'inherit' }}>
                <option value="">Select run...</option>
                {runs.map((r) => <option key={r.id} value={r.id}>v{r.promptVersion} — {r.outcome} ({r.input.slice(0, 40)}...)</option>)}
              </select>
            </label>
            <button type="submit" className="button" style={{ padding: '0.75rem 1.25rem' }}>Compare</button>
          </form>
        )}
      </section>

      {compareType === 'remix' && outputA && outputB && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {[outputA, outputB].map((output, idx) => (
            <section key={output.id} className="panel">
              <div className="table-header">
                <div>
                  <p className="eyebrow">Variant {idx === 0 ? 'A' : 'B'}</p>
                  <h2>{output.title}</h2>
                  <p>{output.outputType}</p>
                </div>
              </div>

              {output.scenes && output.scenes.length > 0 ? (
                <>
                  <div style={{ display: 'flex', borderRadius: '0.75rem', overflow: 'hidden', height: '2.5rem' }}>
                    {output.scenes.map((scene) => {
                      const color = purposeColors[scene.purpose.split(' ')[0].toLowerCase()] ?? '#666';
                      return (
                        <div
                          key={scene.sceneNumber}
                          style={{
                            flex: 1,
                            background: `${color}44`,
                            borderRight: '1px solid rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.65rem',
                            color,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                          }}
                        >
                          S{scene.sceneNumber}
                        </div>
                      );
                    })}
                  </div>
                  <div className="recommendation-list">
                    {output.scenes.map((scene) => (
                      <article key={scene.sceneNumber} className="recommendation-card">
                        <h3>Scene {scene.sceneNumber} — {scene.duration}</h3>
                        <div className="detail-pairs">
                          <div><span>Purpose</span><strong>{scene.purpose}</strong></div>
                          <div><span>Visual</span><strong>{scene.visual}</strong></div>
                          <div><span>Audio</span><strong>{scene.audio}</strong></div>
                        </div>
                        <p style={{ marginTop: '0.5rem' }}>{scene.text}</p>
                      </article>
                    ))}
                  </div>
                </>
              ) : (
                <div className="recommendation-card">
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{output.content}</pre>
                </div>
              )}
            </section>
          ))}
        </div>
      )}

      {compareType === 'prompt' && runA && runB && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {[runA, runB].map((run, idx) => (
            <section key={run.id} className="panel">
              <div className="table-header">
                <div>
                  <p className="eyebrow">Run {idx === 0 ? 'A' : 'B'}</p>
                  <h2>Version {run.promptVersion}</h2>
                  <p>
                    <span className={`status-pill ${run.outcome === 'strong' ? 'status-foundation' : run.outcome === 'weak' ? 'status-later' : 'status-next'}`}>
                      {run.outcome}
                    </span>
                  </p>
                </div>
              </div>
              <div className="recommendation-card">
                <h3>Input</h3>
                <p>{run.input}</p>
              </div>
              <div className="recommendation-card">
                <h3>Output</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{run.output}</pre>
              </div>
            </section>
          ))}
        </div>
      )}

      {!((compareType === 'remix' && outputA && outputB) || (compareType === 'prompt' && runA && runB)) && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>No comparison selected</h2>
              <p>Select two {compareType === 'remix' ? 'remix outputs' : 'prompt runs'} above and click Compare to view them side by side.</p>
            </div>
            <Link href={workspacePath(workspace.slug, compareType === 'remix' ? 'jobs' : 'prompts')} className="button button-secondary">
              {compareType === 'remix' ? 'View remix jobs' : 'View prompts'}
            </Link>
          </div>
        </section>
      )}
    </AppShell>
  );
}
