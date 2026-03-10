import Link from 'next/link';
import { AuthPanel } from '@/components/auth-panel';
import { getCurrentWorkspace } from '@/lib/repositories';
import { productModules, featureHighlights } from '@/lib/product-definition';
import { workspacePath } from '@/lib/workspace-routing';

export default async function Home() {
  const workspace = await getCurrentWorkspace();

  return (
    <main className="sigmora-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Quantitative UGC Engine</p>
          <h1>Make viral videos a system, not a guess.</h1>
          <p className="hero-summary">
            Sigmora analyzes what makes short-form video perform, extracts the structural patterns behind retention,
            and turns those insights into scripts, scene plans, and creative briefs your team can execute on.
          </p>

          <div className="hero-actions">
            <Link href={workspacePath(workspace.slug, 'dashboard')} className="button">
              Open workspace
            </Link>
            <Link href={workspacePath(workspace.slug, 'library')} className="button button-secondary">
              Browse library
            </Link>
          </div>

          <div className="principles-grid">
            {featureHighlights.map((highlight) => (
              <article key={highlight.title} className="principle-card">
                <h3 style={{ marginBottom: '0.35rem', fontSize: '0.95rem' }}>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-visual-container">
          <img src="/hero-visual.png" alt="Sigmora Intelligence Dashboard" className="hero-visual" />
        </div>
      </section>


      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Platform</p>
          <h2>Everything your team needs to produce better short-form video</h2>
        </div>

        <div className="module-grid">
          {productModules.map((module) => (
            <article key={module.name} className="panel module-card">
              <h3>{module.name}</h3>
              <p>{module.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main >
  );
}
