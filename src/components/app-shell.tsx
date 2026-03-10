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
    <main className="app-shell animate-fade-in-up">
      <aside className="workspace-sidebar panel animate-fade-in-up delay-100" style={{ background: 'rgba(10, 12, 16, 0.4)', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="sidebar-header">
          <Link href={workspacePath(workspace.slug, 'dashboard')} className="brand-mark">
            <img src="/logo.png" alt="Sigmora Logo" className="logo" />
          </Link>
          <p className="sidebar-copy">Analyze, benchmark, and remix short-form video performance.</p>
          <div className="workspace-badge" style={{ marginTop: '0.5rem' }}>
            <span>{workspace.name}</span>
            <p>{workspace.plan} workspace</p>
          </div>
        </div>

        <nav className="nav-list" aria-label="Product Navigation" style={{ marginTop: '1rem' }}>
          {appNavigation.map((item) => (
            <Link key={item.href} href={workspacePath(workspace.slug, item.href.replace('/', ''))} className="nav-card" style={{ padding: '0.85rem 1rem', borderRadius: '0.75rem', transition: 'background 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
              <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{item.description}</p>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <AuthPanel />
        </div>
      </aside>


      <section className="workspace-main animate-fade-in-up delay-200">
        <header className="workspace-header" style={{ marginBottom: '2rem' }}>
          <p className="eyebrow">Sigmora Workspace</p>
          <h1>{title}</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '800px' }}>{description}</p>
        </header>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {children}
        </div>
      </section>
    </main>
  );
}
