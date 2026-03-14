import { redirect } from 'next/navigation';
import { getActivationSnapshot } from '@/lib/activation';
import { getAnalysisResults, getCurrentWorkspace, getRemixJobs, getAssets } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

export default async function DashboardRedirectPage() {
  const workspace = await getCurrentWorkspace();
  const [assets, analysisResults, remixJobs] = await Promise.all([
    getAssets(workspace.id),
    getAnalysisResults(workspace.id),
    getRemixJobs(workspace.id),
  ]);
  const activation = getActivationSnapshot({
    assets,
    analysisResults,
    remixJobs,
  });

  redirect(workspacePath(workspace.slug, activation.isActivated ? 'dashboard' : 'activate'));
}
