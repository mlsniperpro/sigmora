import Link from 'next/link';
import { AuthPanel } from '@/components/auth-panel';

import type { Workspace } from '@/lib/domain';

import { appNavigation } from '@/lib/navigation';
import { workspacePath } from '@/lib/workspace-routing';

type AppShellProps = {
  workspace: Workspace;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AppShell({ workspace, title, description, children }: AppShellProps) {
  return (
    <main className="app-shell">
      <aside className="workspace-sidebar panel">
        <div className="sidebar-header">
          <Link href={workspacePath(workspace.slug, 'dashboard')} className="brand-mark">
            <img src="/logo.png" alt="Sigmora Logo" className="logo" />
          </Link>
          <p className="sidebar-copy">Analyze, benchmark, and remix short-form video performance.</p>
          <div className="workspace-badge">
            <span>{workspace.name}</span>
            <p>{workspace.plan} workspace</p>
          </div>
        </div>

        <nav className="nav-list" aria-label="Product Navigation">
          {appNavigation.map((item) => (
            <Link key={item.href} href={workspacePath(workspace.slug, item.href.replace('/', ''))} className="nav-card">
              <span>{item.label}</span>
              <p>{item.description}</p>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <AuthPanel />
        </div>
      </aside>


      <section className="workspace-main">
        <header className="workspace-header">
          <p className="eyebrow">Sigmora Workspace</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        {children}
      </section>
    </main>
  );
}
