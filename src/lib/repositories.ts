import { cache } from 'react';
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import {
  collections,
  type AnalysisJob,
  type AnalysisResult,
  type ApprovalRecord,
  type ActivationEvent,
  type Asset,
  type AssetFolder,
  type BenchmarkCollection,
  type BlogDraft,
  type Campaign,
  type CmsConnection,
  type CompetitorAccount,
  type ConnectedAccount,
  type Playbook,
  type PromptRun,
  type PromptTemplate,
  type PublishingQueueItem,
  type RemixJob,
  type RemixOutput,
  type SigmoraUser,
  type TrendSnapshot,
  type WatchlistAccount,
  type Workspace,
} from '@/lib/domain';
import { adminDb, hasAdminConfig } from '@/lib/firebase-admin';
import {
  demoWorkspace,
  mockDatabase,
} from '@/lib/mock-data';

type RepositoryCollectionMap = {
  [collections.users]: SigmoraUser;
  [collections.workspaces]: Workspace;
  [collections.assets]: Asset;
  [collections.benchmarkCollections]: BenchmarkCollection;
  [collections.promptTemplates]: PromptTemplate;
  [collections.promptRuns]: PromptRun;
  [collections.analysisJobs]: AnalysisJob;
  [collections.analysisResults]: AnalysisResult;
  [collections.remixJobs]: RemixJob;
  [collections.remixOutputs]: RemixOutput;
  [collections.trendSnapshots]: TrendSnapshot;
  [collections.competitorAccounts]: CompetitorAccount;
  [collections.playbooks]: Playbook;
  [collections.connectedAccounts]: ConnectedAccount;
  [collections.campaigns]: Campaign;
  [collections.publishingQueue]: PublishingQueueItem;
  [collections.watchlistAccounts]: WatchlistAccount;
  [collections.approvalRecords]: ApprovalRecord;
  [collections.cmsConnections]: CmsConnection;
  [collections.blogDrafts]: BlogDraft;
  [collections.assetFolders]: AssetFolder;
  [collections.activationEvents]: ActivationEvent;
};

type EntityWithWorkspace = {
  workspaceId: string;
};

function toRecord<T>(snapshot: QueryDocumentSnapshot): T {
  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<T, 'id'>),
  } as T;
}

async function getCollectionRecords<K extends keyof RepositoryCollectionMap>(
  collectionName: K,
): Promise<RepositoryCollectionMap[K][]> {
  if (hasAdminConfig && adminDb) {
    const snapshot = await adminDb.collection(collectionName).get();
    return snapshot.docs.map((doc) => toRecord<RepositoryCollectionMap[K]>(doc));
  }

  return (mockDatabase[collectionName] ?? []) as RepositoryCollectionMap[K][];
}

async function createFirestoreRecord<K extends keyof RepositoryCollectionMap>(
  collectionName: K,
  data: Omit<RepositoryCollectionMap[K], 'id'>,
) {
  if (!hasAdminConfig || !adminDb) {
    const record = {
      id: `${collectionName}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      ...data,
    } as RepositoryCollectionMap[K];
    (mockDatabase[collectionName] as RepositoryCollectionMap[K][]).push(record);
    return record;
  }

  const docRef = await adminDb.collection(collectionName).add(data);
  return { id: docRef.id, ...data } as RepositoryCollectionMap[K];
}

async function updateFirestoreRecord<K extends keyof RepositoryCollectionMap>(
  collectionName: K,
  id: string,
  patch: Partial<Omit<RepositoryCollectionMap[K], 'id'>>,
) {
  if (!hasAdminConfig || !adminDb) {
    const records = mockDatabase[collectionName] as RepositoryCollectionMap[K][];
    const index = records.findIndex((record) => record.id === id);

    if (index === -1) {
      return null;
    }

    records[index] = {
      ...records[index],
      ...patch,
    };
    return records[index];
  }

  await adminDb.collection(collectionName).doc(id).set(patch, { merge: true });
  const snapshot = await adminDb.collection(collectionName).doc(id).get();

  if (!snapshot.exists) {
    return null;
  }

  return toRecord<RepositoryCollectionMap[K]>(snapshot as QueryDocumentSnapshot);
}

function byWorkspace<T extends EntityWithWorkspace>(items: T[], workspaceId: string) {
  return items.filter((item) => item.workspaceId === workspaceId);
}

// ── Workspace queries ──

export const getCurrentWorkspace = cache(async (): Promise<Workspace> => {
  const workspaces = await getCollectionRecords(collections.workspaces);
  return workspaces[0] ?? demoWorkspace;
});

export const getWorkspaces = cache(async (): Promise<Workspace[]> => {
  const workspaces = await getCollectionRecords(collections.workspaces);
  return workspaces.length > 0 ? workspaces : [demoWorkspace];
});

export const getWorkspaceBySlug = cache(async (workspaceSlug: string): Promise<Workspace> => {
  const workspaces = await getCollectionRecords(collections.workspaces);
  return workspaces.find((workspace) => workspace.slug === workspaceSlug) ?? demoWorkspace;
});

export const getWorkspaceUsers = cache(async (workspaceId: string): Promise<SigmoraUser[]> => {
  const users = await getCollectionRecords(collections.users);
  const workspaces = await getCollectionRecords(collections.workspaces);
  const workspace = workspaces.find((item) => item.id === workspaceId) ?? demoWorkspace;
  const memberIds = new Set(workspace.members.map((member) => member.userId));
  return users.filter((user) => memberIds.has(user.id) && user.defaultWorkspaceId === workspaceId);
});

// ── Asset queries ──

export const getAssets = cache(async (workspaceId: string): Promise<Asset[]> => {
  const assets = await getCollectionRecords(collections.assets);
  return byWorkspace(assets, workspaceId);
});

export const getAssetById = cache(async (workspaceId: string, assetId: string): Promise<Asset | null> => {
  const assets = await getAssets(workspaceId);
  return assets.find((asset) => asset.id === assetId) ?? null;
});

export const getAssetByContentId = cache(async (workspaceId: string, contentId: string): Promise<Asset | null> => {
  const assets = await getAssets(workspaceId);
  return assets.find((asset) => asset.contentEngineContentId === contentId) ?? null;
});

// ── Benchmark queries ──

export const getBenchmarkCollections = cache(async (workspaceId: string): Promise<BenchmarkCollection[]> => {
  const benchmarkCollections = await getCollectionRecords(collections.benchmarkCollections);
  return byWorkspace(benchmarkCollections, workspaceId);
});

export const getBenchmarkCollectionById = cache(
  async (workspaceId: string, benchmarkId: string): Promise<BenchmarkCollection | null> => {
    const benchmarkCollections = await getBenchmarkCollections(workspaceId);
    return benchmarkCollections.find((collection) => collection.id === benchmarkId) ?? null;
  },
);

// ── Prompt queries ──

export const getPromptTemplates = cache(async (workspaceId: string): Promise<PromptTemplate[]> => {
  const promptTemplates = await getCollectionRecords(collections.promptTemplates);
  return byWorkspace(promptTemplates, workspaceId);
});

export const getPromptTemplateById = cache(async (workspaceId: string, promptId: string): Promise<PromptTemplate | null> => {
  const promptTemplates = await getPromptTemplates(workspaceId);
  return promptTemplates.find((template) => template.id === promptId) ?? null;
});

export const getPromptRuns = cache(async (workspaceId: string): Promise<PromptRun[]> => {
  const runs = await getCollectionRecords(collections.promptRuns);
  return byWorkspace(runs, workspaceId);
});

export const getPromptRunsByPromptId = cache(async (workspaceId: string, promptId: string): Promise<PromptRun[]> => {
  const runs = await getPromptRuns(workspaceId);
  return runs.filter((run) => run.promptId === promptId);
});

// ── Analysis queries ──

export const getAnalysisJobs = cache(async (workspaceId: string): Promise<AnalysisJob[]> => {
  const analysisJobs = await getCollectionRecords(collections.analysisJobs);
  return byWorkspace(analysisJobs, workspaceId);
});

export const getRemixJobs = cache(async (workspaceId: string): Promise<RemixJob[]> => {
  const remixJobs = await getCollectionRecords(collections.remixJobs);
  return byWorkspace(remixJobs, workspaceId);
});

export const getAnalysisResults = cache(async (workspaceId: string): Promise<AnalysisResult[]> => {
  const results = await getCollectionRecords(collections.analysisResults);
  return byWorkspace(results, workspaceId);
});

export const getAnalysisResultByAssetId = cache(async (workspaceId: string, assetId: string): Promise<AnalysisResult | null> => {
  const results = await getAnalysisResults(workspaceId);
  return results.find((result) => result.assetId === assetId) ?? null;
});

// ── Remix output queries ──

export const getRemixOutputs = cache(async (workspaceId: string): Promise<RemixOutput[]> => {
  const outputs = await getCollectionRecords(collections.remixOutputs);
  return byWorkspace(outputs, workspaceId);
});

export const getRemixOutputsByJobId = cache(async (workspaceId: string, jobId: string): Promise<RemixOutput[]> => {
  const outputs = await getRemixOutputs(workspaceId);
  return outputs.filter((output) => output.remixJobId === jobId);
});

// ── Trend queries ──

export const getTrendSnapshots = cache(async (workspaceId: string): Promise<TrendSnapshot[]> => {
  const trends = await getCollectionRecords(collections.trendSnapshots);
  return byWorkspace(trends, workspaceId);
});

// ── Competitor queries ──

export const getCompetitorAccounts = cache(async (workspaceId: string): Promise<CompetitorAccount[]> => {
  const accounts = await getCollectionRecords(collections.competitorAccounts);
  return byWorkspace(accounts, workspaceId);
});

export const getCompetitorAccountById = cache(async (workspaceId: string, accountId: string): Promise<CompetitorAccount | null> => {
  const accounts = await getCompetitorAccounts(workspaceId);
  return accounts.find((account) => account.id === accountId) ?? null;
});

// ── Playbook queries ──

export const getPlaybooks = cache(async (workspaceId: string): Promise<Playbook[]> => {
  const playbooks = await getCollectionRecords(collections.playbooks);
  return byWorkspace(playbooks, workspaceId);
});

export const getPlaybookById = cache(async (workspaceId: string, playbookId: string): Promise<Playbook | null> => {
  const playbooks = await getPlaybooks(workspaceId);
  return playbooks.find((playbook) => playbook.id === playbookId) ?? null;
});

// ── Connected account queries ──

export const getConnectedAccounts = cache(async (workspaceId: string): Promise<ConnectedAccount[]> => {
  const accounts = await getCollectionRecords(collections.connectedAccounts);
  return byWorkspace(accounts, workspaceId);
});

// ── Campaign queries ──

export const getCampaigns = cache(async (workspaceId: string): Promise<Campaign[]> => {
  const campaigns = await getCollectionRecords(collections.campaigns);
  return byWorkspace(campaigns, workspaceId);
});

export const getCampaignById = cache(async (workspaceId: string, campaignId: string): Promise<Campaign | null> => {
  const campaigns = await getCampaigns(workspaceId);
  return campaigns.find((c) => c.id === campaignId) ?? null;
});

// ── Publishing queue queries ──

export const getPublishingQueue = cache(async (workspaceId: string): Promise<PublishingQueueItem[]> => {
  const items = await getCollectionRecords(collections.publishingQueue);
  return byWorkspace(items, workspaceId);
});

export const getPublishingQueueByCampaign = cache(async (workspaceId: string, campaignId: string): Promise<PublishingQueueItem[]> => {
  const items = await getPublishingQueue(workspaceId);
  return items.filter((item) => item.campaignId === campaignId);
});

// ── Watchlist queries ──

export const getWatchlistAccounts = cache(async (workspaceId: string): Promise<WatchlistAccount[]> => {
  const accounts = await getCollectionRecords(collections.watchlistAccounts);
  return byWorkspace(accounts, workspaceId);
});

// ── Approval queries ──

export const getApprovalRecords = cache(async (workspaceId: string): Promise<ApprovalRecord[]> => {
  const records = await getCollectionRecords(collections.approvalRecords);
  return byWorkspace(records, workspaceId);
});

export const getApprovalsByEntity = cache(async (workspaceId: string, entityId: string): Promise<ApprovalRecord[]> => {
  const records = await getApprovalRecords(workspaceId);
  return records.filter((r) => r.entityId === entityId);
});

// ── CMS queries ──

export const getCmsConnections = cache(async (workspaceId: string): Promise<CmsConnection[]> => {
  const connections = await getCollectionRecords(collections.cmsConnections);
  return byWorkspace(connections, workspaceId);
});

export const getCmsConnectionById = cache(async (workspaceId: string, connectionId: string): Promise<CmsConnection | null> => {
  const connections = await getCmsConnections(workspaceId);
  return connections.find((c) => c.id === connectionId) ?? null;
});

export const getBlogDrafts = cache(async (workspaceId: string): Promise<BlogDraft[]> => {
  const drafts = await getCollectionRecords(collections.blogDrafts);
  return byWorkspace(drafts, workspaceId);
});

export const getBlogDraftsByConnection = cache(async (workspaceId: string, connectionId: string): Promise<BlogDraft[]> => {
  const drafts = await getBlogDrafts(workspaceId);
  return drafts.filter((d) => d.cmsConnectionId === connectionId);
});

// ── Asset folder queries ──

export const getAssetFolders = cache(async (workspaceId: string): Promise<AssetFolder[]> => {
  const folders = await getCollectionRecords(collections.assetFolders);
  return byWorkspace(folders, workspaceId);
});

// ── Activation queries ──

export const getActivationEvents = cache(async (workspaceId: string): Promise<ActivationEvent[]> => {
  const events = await getCollectionRecords(collections.activationEvents);
  return byWorkspace(events, workspaceId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
});

// ── Dashboard ──

export const getDashboardSnapshot = cache(async () => {
  const workspace = await getCurrentWorkspace();

  const [users, assets, benchmarkCollections, promptTemplates, analysisJobs, remixJobs, trendSnapshots, competitorAccounts] = await Promise.all([
    getWorkspaceUsers(workspace.id),
    getAssets(workspace.id),
    getBenchmarkCollections(workspace.id),
    getPromptTemplates(workspace.id),
    getAnalysisJobs(workspace.id),
    getRemixJobs(workspace.id),
    getTrendSnapshots(workspace.id),
    getCompetitorAccounts(workspace.id),
  ]);

  return {
    workspace,
    users,
    assets,
    benchmarkCollections,
    promptTemplates,
    analysisJobs,
    remixJobs,
    trendSnapshots,
    competitorAccounts,
  };
});

export const getDashboardSnapshotBySlug = cache(async (workspaceSlug: string) => {
  const workspace = await getWorkspaceBySlug(workspaceSlug);

  const [users, assets, benchmarkCollections, promptTemplates, analysisJobs, remixJobs, trendSnapshots, competitorAccounts] = await Promise.all([
    getWorkspaceUsers(workspace.id),
    getAssets(workspace.id),
    getBenchmarkCollections(workspace.id),
    getPromptTemplates(workspace.id),
    getAnalysisJobs(workspace.id),
    getRemixJobs(workspace.id),
    getTrendSnapshots(workspace.id),
    getCompetitorAccounts(workspace.id),
  ]);

  return {
    workspace,
    users,
    assets,
    benchmarkCollections,
    promptTemplates,
    analysisJobs,
    remixJobs,
    trendSnapshots,
    competitorAccounts,
  };
});

// ── Create functions ──

export async function createAsset(input: {
  workspaceId: string;
  title: string;
  platform: Asset['platform'];
  source: Asset['source'];
  durationSeconds: number;
  tags: Asset['tags'];
  contentEngineContentId?: string | null;
  contentAccessMode?: Asset['contentAccessMode'];
  contentSyncStatus?: Asset['contentSyncStatus'];
  status?: Asset['status'];
}) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.assets, {
    workspaceId: input.workspaceId,
    title: input.title,
    platform: input.platform,
    source: input.source,
    status: input.status ?? 'draft',
    durationSeconds: input.durationSeconds,
    tags: input.tags,
    transcriptReady: false,
    benchmarkEligible: false,
    storageProvider: 'content-engine',
    contentEngineContentId: input.contentEngineContentId ?? null,
    contentAccessMode: input.contentAccessMode ?? 'private',
    contentSyncStatus: input.contentSyncStatus ?? 'not-requested',
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function updateAsset(
  assetId: string,
  patch: Partial<Omit<Asset, 'id' | 'createdAt'>>,
) {
  return updateFirestoreRecord(collections.assets, assetId, patch);
}

export async function createBenchmarkCollection(input: {
  workspaceId: string;
  title: string;
  description: string;
  assetIds: string[];
  focus: BenchmarkCollection['focus'];
}) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.benchmarkCollections, {
    workspaceId: input.workspaceId,
    title: input.title,
    description: input.description,
    assetIds: input.assetIds,
    focus: input.focus,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function createPromptTemplate(input: {
  workspaceId: string;
  title: string;
  objective: string;
  body?: string;
  tags?: string[];
}) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.promptTemplates, {
    workspaceId: input.workspaceId,
    title: input.title,
    objective: input.objective,
    body: input.body ?? '',
    version: 1,
    lastOutcome: 'untested',
    tags: input.tags ?? [],
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function createPromptRun(input: {
  workspaceId: string;
  promptId: string;
  promptVersion: number;
  input: string;
  output: string;
  outcome?: PromptRun['outcome'];
  benchmarkCollectionId?: string;
  assetId?: string;
}) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.promptRuns, {
    workspaceId: input.workspaceId,
    promptId: input.promptId,
    promptVersion: input.promptVersion,
    input: input.input,
    output: input.output,
    outcome: input.outcome ?? 'pending',
    benchmarkCollectionId: input.benchmarkCollectionId,
    assetId: input.assetId,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function updatePromptRun(
  runId: string,
  patch: Partial<Omit<PromptRun, 'id' | 'createdAt'>>,
) {
  return updateFirestoreRecord(collections.promptRuns, runId, patch);
}

export async function updatePromptTemplate(
  promptId: string,
  patch: Partial<Omit<PromptTemplate, 'id' | 'createdAt'>>,
) {
  return updateFirestoreRecord(collections.promptTemplates, promptId, patch);
}

export async function createAnalysisJob(input: {
  workspaceId: string;
  assetId: string;
  jobType: AnalysisJob['jobType'];
  status?: AnalysisJob['status'];
  outputSummary?: string;
}) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.analysisJobs, {
    workspaceId: input.workspaceId,
    assetId: input.assetId,
    status: input.status ?? 'queued',
    jobType: input.jobType,
    outputSummary: input.outputSummary ?? 'Queued for processing.',
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function createAnalysisResult(input: Omit<AnalysisResult, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.analysisResults, {
    ...input,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function updateAnalysisResult(
  resultId: string,
  patch: Partial<Omit<AnalysisResult, 'id' | 'createdAt'>>,
) {
  return updateFirestoreRecord(collections.analysisResults, resultId, patch);
}

export async function createRemixJob(input: {
  workspaceId: string;
  benchmarkCollectionId: string;
  targetOffer: string;
  outputType: RemixJob['outputType'];
  promptId?: string;
}) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.remixJobs, {
    workspaceId: input.workspaceId,
    benchmarkCollectionId: input.benchmarkCollectionId,
    status: 'draft',
    targetOffer: input.targetOffer,
    outputType: input.outputType,
    promptId: input.promptId,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function createRemixOutput(input: Omit<RemixOutput, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.remixOutputs, {
    ...input,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function createTrendSnapshot(input: Omit<TrendSnapshot, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.trendSnapshots, {
    ...input,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function createCompetitorAccount(input: Omit<CompetitorAccount, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.competitorAccounts, {
    ...input,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function createPlaybook(input: Omit<Playbook, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.playbooks, {
    ...input,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function createConnectedAccount(input: Omit<ConnectedAccount, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();

  return createFirestoreRecord(collections.connectedAccounts, {
    ...input,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function updatePlaybook(
  playbookId: string,
  patch: Partial<Omit<Playbook, 'id' | 'createdAt'>>,
) {
  return updateFirestoreRecord(collections.playbooks, playbookId, patch);
}

export async function updateRemixJob(
  jobId: string,
  patch: Partial<Omit<RemixJob, 'id' | 'createdAt'>>,
) {
  return updateFirestoreRecord(collections.remixJobs, jobId, patch);
}

export async function createCampaign(input: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();
  return createFirestoreRecord(collections.campaigns, { ...input, createdAt: timestamp, updatedAt: timestamp });
}

export async function updateCampaign(id: string, patch: Partial<Omit<Campaign, 'id' | 'createdAt'>>) {
  return updateFirestoreRecord(collections.campaigns, id, patch);
}

export async function createPublishingQueueItem(input: Omit<PublishingQueueItem, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();
  return createFirestoreRecord(collections.publishingQueue, { ...input, createdAt: timestamp, updatedAt: timestamp });
}

export async function updatePublishingQueueItem(id: string, patch: Partial<Omit<PublishingQueueItem, 'id' | 'createdAt'>>) {
  return updateFirestoreRecord(collections.publishingQueue, id, patch);
}

export async function createWatchlistAccount(input: Omit<WatchlistAccount, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();
  return createFirestoreRecord(collections.watchlistAccounts, { ...input, createdAt: timestamp, updatedAt: timestamp });
}

export async function updateWatchlistAccount(id: string, patch: Partial<Omit<WatchlistAccount, 'id' | 'createdAt'>>) {
  return updateFirestoreRecord(collections.watchlistAccounts, id, patch);
}

export async function createApprovalRecord(input: Omit<ApprovalRecord, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();
  return createFirestoreRecord(collections.approvalRecords, { ...input, createdAt: timestamp, updatedAt: timestamp });
}

export async function updateApprovalRecord(id: string, patch: Partial<Omit<ApprovalRecord, 'id' | 'createdAt'>>) {
  return updateFirestoreRecord(collections.approvalRecords, id, patch);
}

export async function createCmsConnection(input: Omit<CmsConnection, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();
  return createFirestoreRecord(collections.cmsConnections, { ...input, createdAt: timestamp, updatedAt: timestamp });
}

export async function createBlogDraft(input: Omit<BlogDraft, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();
  return createFirestoreRecord(collections.blogDrafts, { ...input, createdAt: timestamp, updatedAt: timestamp });
}

export async function updateBlogDraft(id: string, patch: Partial<Omit<BlogDraft, 'id' | 'createdAt'>>) {
  return updateFirestoreRecord(collections.blogDrafts, id, patch);
}

export async function createAssetFolder(input: Omit<AssetFolder, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();
  return createFirestoreRecord(collections.assetFolders, { ...input, createdAt: timestamp, updatedAt: timestamp });
}

export async function createActivationEvent(input: Omit<ActivationEvent, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();
  return createFirestoreRecord(collections.activationEvents, { ...input, createdAt: timestamp, updatedAt: timestamp });
}
