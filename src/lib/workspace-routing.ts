export function workspacePath(workspaceSlug: string, section: string) {
  return `/workspaces/${workspaceSlug}/${section}`;
}

export function workspaceAssetPath(workspaceSlug: string, assetId: string) {
  return `${workspacePath(workspaceSlug, 'library')}/${assetId}`;
}

export function workspaceBenchmarkPath(workspaceSlug: string, benchmarkId: string) {
  return `${workspacePath(workspaceSlug, 'benchmarks')}/${benchmarkId}`;
}

export function workspacePromptPath(workspaceSlug: string, promptId: string) {
  return `${workspacePath(workspaceSlug, 'prompts')}/${promptId}`;
}

export function workspacePlaybookPath(workspaceSlug: string, playbookId: string) {
  return `${workspacePath(workspaceSlug, 'playbooks')}/${playbookId}`;
}

export function workspaceCompetitorPath(workspaceSlug: string, competitorId: string) {
  return `${workspacePath(workspaceSlug, 'competitors')}/${competitorId}`;
}

export function workspaceRemixJobPath(workspaceSlug: string, jobId: string) {
  return `${workspacePath(workspaceSlug, 'jobs')}/${jobId}`;
}
