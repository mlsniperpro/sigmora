import type { Metadata } from 'next';
import { AppSidebar } from '@/components/app-sidebar';
import { RequireAuth } from '@/components/require-auth';
import { getWorkspaceBySlug } from '@/lib/repositories';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

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
            <RequireAuth>
                <AppSidebar workspace={workspace} />
                <section className="workspace-main animate-fade-in-up delay-200" style={{ paddingBottom: '4rem' }}>
                    {children}
                </section>
            </RequireAuth>
        </main>
    );
}
