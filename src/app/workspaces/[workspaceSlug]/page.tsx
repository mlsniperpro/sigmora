import { redirect } from 'next/navigation';
import {
  getAnalysisResults,
  getAssets,
  getRemixJobs,
  getWorkspaceBySlug,
} from '@/lib/repositories';
import { getActivationSnapshot } from '@/lib/activation';
import { workspacePath } from '@/lib/workspace-routing';

type WorkspaceEntryParams = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function WorkspaceEntryPage({ params }: WorkspaceEntryParams) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [assets, analysisResults, remixJobs] = await Promise.all([
    getAssets(workspace.id),
    getAnalysisResults(workspace.id),
    getRemixJobs(workspace.id),
  ]);
  const activation = getActivationSnapshot({ assets, analysisResults, remixJobs });

  redirect(workspacePath(workspaceSlug, activation.isActivated ? 'dashboard' : 'activate'));
}
