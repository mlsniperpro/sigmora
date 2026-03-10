import { redirect } from 'next/navigation';
import { workspacePath } from '@/lib/workspace-routing';

type WorkspaceEntryParams = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function WorkspaceEntryPage({ params }: WorkspaceEntryParams) {
  const { workspaceSlug } = await params;
  redirect(workspacePath(workspaceSlug, 'dashboard'));
}
