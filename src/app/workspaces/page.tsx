import Link from 'next/link';
import { getWorkspaces } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

export default async function WorkspacesIndexPage() {
  const workspaces = await getWorkspaces();

  return (
    <main className="sigmora-shell">
      <section className="section-block">
        <div className="section-heading">
          <h2>Select a studio</h2>
          <p>Each studio isolates assets, viral references, prompts, collaborators, and billing.</p>
        </div>

        <div className="module-grid">
          {workspaces.map((workspace) => (
            <article key={workspace.id} className="panel module-card">
              <span className="status-pill status-foundation">{workspace.plan}</span>
              <h3>{workspace.name}</h3>
              <p>{workspace.members.length} collaborators</p>
              <Link href={workspacePath(workspace.slug, 'dashboard')} className="button">
                Open studio
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
