import type { Workspace } from '@/lib/domain';

type AppShellProps = {
  workspace?: Workspace;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
  return (
    <>
      <header className="workspace-header" style={{ marginBottom: '2rem' }}>
        <p className="eyebrow">Sigmora Workspace</p>
        <h1>{title}</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px' }}>{description}</p>
      </header>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {children}
      </div>
    </>
  );
}
