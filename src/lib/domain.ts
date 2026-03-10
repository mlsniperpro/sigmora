export const collections = {
  users: 'users',
  workspaces: 'workspaces',
  assets: 'assets',
  benchmarkCollections: 'benchmarkCollections',
  promptTemplates: 'promptTemplates',
  promptRuns: 'promptRuns',
  analysisJobs: 'analysisJobs',
  analysisResults: 'analysisResults',
  remixJobs: 'remixJobs',
  remixOutputs: 'remixOutputs',
  trendSnapshots: 'trendSnapshots',
  competitorAccounts: 'competitorAccounts',
  playbooks: 'playbooks',
  connectedAccounts: 'connectedAccounts',
  campaigns: 'campaigns',
  publishingQueue: 'publishingQueue',
  watchlistAccounts: 'watchlistAccounts',
  approvalRecords: 'approvalRecords',
  cmsConnections: 'cmsConnections',
  blogDrafts: 'blogDrafts',
  assetFolders: 'assetFolders',
  paymentCustomers: 'paymentCustomers',
  paymentAttempts: 'paymentAttempts',
  subscriptions: 'subscriptions',
  activationEvents: 'activationEvents',
} as const;

export type CollectionName = (typeof collections)[keyof typeof collections];

export type WorkspacePlan = 'solo' | 'pro' | 'team' | 'enterprise';
export type WorkspaceRole = 'owner' | 'editor' | 'viewer';
export type AssetSource = 'upload' | 'import' | 'saved-benchmark';
export type AssetStatus = 'draft' | 'processing' | 'ready' | 'archived';
export type AnalysisStatus = 'queued' | 'running' | 'completed' | 'failed';
export type RemixStatus = 'draft' | 'ready' | 'approved';
export type BillingState = 'trialing' | 'active' | 'past_due' | 'canceled';
export type StorageProvider = 'firebase' | 'content-engine';
export type ContentAccessMode = 'presigned' | 'public' | 'private';
export type ContentSyncStatus = 'not-requested' | 'pending' | 'active' | 'failed';
export type PaymentProvider = 'paystack' | 'polar';
export type PaymentInterval = 'month' | 'year';
export type PaymentAttemptStatus =
  | 'initialized'
  | 'redirect_pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'canceled';
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete';
export type ActivationStage = 'started' | 'asset' | 'analysis' | 'remix' | 'activated';
export type ActivationEventType = 'activation_page_viewed' | 'asset_created' | 'analysis_completed' | 'remix_created';
export type TrendCategory = 'hook-format' | 'audio-trend' | 'visual-style' | 'narrative-pattern' | 'cta-technique';
export type PlatformType = 'tiktok' | 'instagram' | 'youtube' | 'x' | 'linkedin' | 'threads';

export type BaseRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type SigmoraUser = BaseRecord & {
  email: string;
  displayName: string;
  defaultWorkspaceId: string;
};

export type WorkspaceMember = {
  userId: string;
  role: WorkspaceRole;
};

export type Workspace = BaseRecord & {
  name: string;
  slug: string;
  plan: WorkspacePlan;
  members: WorkspaceMember[];
  billingProvider: 'stripe';
  billingCustomerId: string | null;
  billingState: BillingState;
};

export type AssetTag = 'hook' | 'demo' | 'testimonial' | 'problem' | 'cta' | 'trend';

export type Asset = BaseRecord & {
  workspaceId: string;
  title: string;
  platform: 'tiktok' | 'instagram' | 'youtube';
  source: AssetSource;
  status: AssetStatus;
  durationSeconds: number;
  tags: AssetTag[];
  transcriptReady: boolean;
  benchmarkEligible: boolean;
  storageProvider: StorageProvider;
  contentEngineContentId: string | null;
  contentAccessMode: ContentAccessMode | null;
  contentSyncStatus: ContentSyncStatus;
  transcript?: TranscriptSegment[];
  notes?: string;
  sourceUrl?: string;
};

export type TranscriptSegment = {
  text: string;
  startSecond: number;
  endSecond: number;
  speaker?: string;
};

export type BenchmarkCollection = BaseRecord & {
  workspaceId: string;
  title: string;
  description: string;
  assetIds: string[];
  focus: 'hooks' | 'pacing' | 'proof' | 'cta' | 'trend';
};

export type PromptTemplate = BaseRecord & {
  workspaceId: string;
  title: string;
  objective: string;
  body: string;
  version: number;
  lastOutcome: 'strong' | 'mixed' | 'untested';
  tags: string[];
};

export type PromptRun = BaseRecord & {
  workspaceId: string;
  promptId: string;
  promptVersion: number;
  input: string;
  output: string;
  outcome: 'strong' | 'mixed' | 'weak' | 'pending';
  benchmarkCollectionId?: string;
  assetId?: string;
};

export type AnalysisJob = BaseRecord & {
  workspaceId: string;
  assetId: string;
  status: AnalysisStatus;
  jobType: 'benchmark-analysis' | 'library-analysis' | 'competitor-scan';
  outputSummary: string;
};

export type AnalysisScene = {
  label: string;
  startSecond: number;
  endSecond: number;
  purpose: 'hook' | 'problem' | 'proof' | 'demo' | 'cta';
};

export type AnalysisRecommendation = {
  title: string;
  rationale: string;
};

export type AnalysisResult = BaseRecord & {
  workspaceId: string;
  assetId: string;
  hookScore: number;
  pacingScore: number;
  proofScore: number;
  ctaScore: number;
  retentionRisk: 'low' | 'medium' | 'high';
  recommendedHookWindowSeconds: number;
  recommendedCtaWindowSeconds: number;
  scenes: AnalysisScene[];
  recommendations: AnalysisRecommendation[];
  summary: string;
};

export type RemixJob = BaseRecord & {
  workspaceId: string;
  benchmarkCollectionId: string;
  promptId?: string;
  status: RemixStatus;
  targetOffer: string;
  outputType: 'script' | 'scene-plan' | 'creative-brief';
};

export type RemixOutput = BaseRecord & {
  workspaceId: string;
  remixJobId: string;
  outputType: 'script' | 'scene-plan' | 'creative-brief';
  title: string;
  content: string;
  scenes?: RemixScene[];
};

export type RemixScene = {
  sceneNumber: number;
  duration: string;
  visual: string;
  audio: string;
  text: string;
  purpose: string;
};

export type TrendSnapshot = BaseRecord & {
  workspaceId: string;
  title: string;
  category: TrendCategory;
  platform: PlatformType;
  description: string;
  exampleCount: number;
  velocity: 'rising' | 'stable' | 'declining';
  saturation: 'low' | 'medium' | 'high';
  recommendedAction: string;
  detectedAt: string;
};

export type CompetitorAccount = BaseRecord & {
  workspaceId: string;
  handle: string;
  platform: PlatformType;
  displayName: string;
  followerCount: number;
  avgViews: number;
  avgEngagementRate: number;
  topHookStyle: string;
  postingFrequency: string;
  lastScannedAt: string;
  notes: string;
  watchlistPriority: 'high' | 'medium' | 'low';
};

export type Playbook = BaseRecord & {
  workspaceId: string;
  title: string;
  description: string;
  niche: string;
  benchmarkCollectionIds: string[];
  promptTemplateIds: string[];
  brandGuardrails: string[];
  targetPlatforms: PlatformType[];
  status: 'active' | 'draft' | 'archived';
};

export type ConnectedAccount = BaseRecord & {
  workspaceId: string;
  platform: PlatformType;
  handle: string;
  displayName: string;
  status: 'connected' | 'expired' | 'revoked';
  capabilities: string[];
  lastSyncAt: string;
};

export type AutomationMode = 'manual' | 'review-first' | 'fire-and-forget';
export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
export type PublishingStatus = 'queued' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'review-required';
export type ApprovalState = 'pending' | 'approved' | 'rejected' | 'revision-requested';
export type CmsProvider = 'wordpress' | 'webflow' | 'ghost' | 'shopify' | 'notion' | 'sanity' | 'contentful' | 'custom';

export type Campaign = BaseRecord & {
  workspaceId: string;
  title: string;
  description: string;
  connectedAccountIds: string[];
  platforms: PlatformType[];
  automationMode: AutomationMode;
  status: CampaignStatus;
  scheduledAt: string | null;
  remixJobIds: string[];
  playbookId: string | null;
};

export type PublishingQueueItem = BaseRecord & {
  workspaceId: string;
  campaignId: string | null;
  connectedAccountId: string;
  platform: PlatformType;
  title: string;
  content: string;
  status: PublishingStatus;
  scheduledAt: string | null;
  publishedAt: string | null;
  retryCount: number;
  errorMessage: string | null;
};

export type WatchlistAccount = BaseRecord & {
  workspaceId: string;
  handle: string;
  platform: PlatformType;
  displayName: string;
  automationMode: AutomationMode;
  researchFrequency: 'daily' | 'weekly' | 'biweekly';
  lastResearchAt: string | null;
  nextResearchAt: string | null;
  postsScanned: number;
  patternsExtracted: number;
  contentsGenerated: number;
  status: 'active' | 'paused';
};

export type ApprovalRecord = BaseRecord & {
  workspaceId: string;
  entityType: 'remix-output' | 'publishing-item' | 'campaign' | 'blog-draft';
  entityId: string;
  state: ApprovalState;
  reviewerUserId: string | null;
  comment: string;
  decidedAt: string | null;
};

export type CmsConnection = BaseRecord & {
  workspaceId: string;
  provider: CmsProvider;
  name: string;
  baseUrl: string;
  status: 'connected' | 'disconnected' | 'error';
  capabilities: string[];
  lastSyncAt: string | null;
};

export type BlogDraft = BaseRecord & {
  workspaceId: string;
  cmsConnectionId: string;
  title: string;
  body: string;
  sourceType: 'video' | 'remix' | 'campaign' | 'manual';
  sourceId: string | null;
  status: 'draft' | 'scheduled' | 'published';
  scheduledAt: string | null;
  publishedAt: string | null;
  publishedUrl: string | null;
};

export type PlatformCapability = {
  platform: PlatformType | CmsProvider;
  type: 'social' | 'cms';
  connectedAccountSupport: boolean;
  creationSupport: boolean;
  schedulingSupport: boolean;
  fireAndForgetSupport: boolean;
  reviewFirstRecommended: boolean;
  rateLimitSensitivity: 'low' | 'medium' | 'high';
  riskLevel: 'low' | 'medium' | 'high';
};

export type AssetFolder = BaseRecord & {
  workspaceId: string;
  name: string;
  parentId: string | null;
  assetIds: string[];
  color: string;
};

export type PaymentCustomer = BaseRecord & {
  workspaceId: string;
  userId: string;
  email: string;
  provider: PaymentProvider;
  providerCustomerId: string;
};

export type PaymentAttempt = BaseRecord & {
  workspaceId: string;
  userId: string;
  provider: PaymentProvider;
  txRef: string;
  amount: number;
  currency: string;
  status: PaymentAttemptStatus;
  checkoutUrl: string | null;
  providerReference: string | null;
  fallbackUsed: boolean;
  planKey: string;
};

export type SubscriptionRecord = BaseRecord & {
  workspaceId: string;
  userId: string;
  provider: PaymentProvider;
  providerSubscriptionId: string;
  providerCustomerId: string;
  planKey: string;
  status: SubscriptionStatus;
  interval: PaymentInterval;
  amount: number;
  currency: string;
};

export type ActivationEvent = BaseRecord & {
  workspaceId: string;
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  eventType: ActivationEventType;
  stage: ActivationStage;
  sourcePath: string;
  metadata: Record<string, string>;
};
