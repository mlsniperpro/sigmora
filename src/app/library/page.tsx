import { redirect } from 'next/navigation';
import { getCurrentWorkspace } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

export default async function LibraryRedirectPage() {
  const workspace = await getCurrentWorkspace();
  redirect(workspacePath(workspace.slug, 'library'));
}
