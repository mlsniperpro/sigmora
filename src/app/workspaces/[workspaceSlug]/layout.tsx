import { AppSidebar } from '@/components/app-sidebar';
import { getWorkspaceBySlug } from '@/lib/repositories';

export default async function WorkspaceLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ workspaceSlug: string }>;
}) {
    const { workspaceSlug } = await params;
    const workspace = await getWorkspaceBySlug(workspaceSlug);

    return (
        <main className="app-shell animate-fade-in-up">
            <AppSidebar workspace={workspace} />
            <section className="workspace-main animate-fade-in-up delay-200" style={{ paddingBottom: '4rem' }}>
                {children}
            </section>
        </main>
    );
}
