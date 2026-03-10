'use server';

import { revalidatePath } from 'next/cache';
import {
  createAnalysisJob,
  createAnalysisResult,
  createAsset,
  createBenchmarkCollection,
  createCompetitorAccount,
  createPlaybook,
  createPromptRun,
  createPromptTemplate,
  createRemixJob,
  createRemixOutput,
  createTrendSnapshot,
  getAssetById,
  getAnalysisResultByAssetId,
  getPromptTemplateById,
  updateAnalysisResult,
  updatePromptRun,
  updatePromptTemplate,
  updateRemixJob,
} from '@/lib/repositories';
import type { AnalysisResult, PlatformType, TrendCategory } from '@/lib/domain';
import { workspacePath } from '@/lib/workspace-routing';

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getTags(formData: FormData, key: string) {
  return getString(formData, key)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

// ── Asset actions ──

export async function createAssetAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');

  await createAsset({
    workspaceId,
    title: getString(formData, 'title'),
    platform: getString(formData, 'platform') as 'tiktok' | 'instagram' | 'youtube',
    source: getString(formData, 'source') as 'upload' | 'import' | 'saved-benchmark',
    durationSeconds: Number(getString(formData, 'durationSeconds') || '0'),
    tags: getTags(formData, 'tags') as Array<'hook' | 'demo' | 'testimonial' | 'problem' | 'cta' | 'trend'>,
  });

  revalidatePath(workspacePath(workspaceSlug, 'dashboard'));
  revalidatePath(workspacePath(workspaceSlug, 'library'));
}

export async function importAssetFromUrlAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');
  const sourceUrl = getString(formData, 'sourceUrl');

  await createAsset({
    workspaceId,
    title: getString(formData, 'title'),
    platform: getString(formData, 'platform') as 'tiktok' | 'instagram' | 'youtube',
    source: 'import',
    durationSeconds: 30,
    tags: [],
    status: 'processing',
  });

  // In production this would trigger a background job to fetch metadata from the URL
  // and update the asset with duration, transcript, etc.
  void sourceUrl;

  revalidatePath(workspacePath(workspaceSlug, 'dashboard'));
  revalidatePath(workspacePath(workspaceSlug, 'library'));
}

// ── Benchmark actions ──

export async function createBenchmarkCollectionAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');
  const assetIds = getTags(formData, 'assetIds');

  await createBenchmarkCollection({
    workspaceId,
    title: getString(formData, 'title'),
    description: getString(formData, 'description'),
    assetIds,
    focus: getString(formData, 'focus') as 'hooks' | 'pacing' | 'proof' | 'cta' | 'trend',
  });

  revalidatePath(workspacePath(workspaceSlug, 'dashboard'));
  revalidatePath(workspacePath(workspaceSlug, 'benchmarks'));
}

// ── Prompt actions ──

export async function createPromptTemplateAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');

  await createPromptTemplate({
    workspaceId,
    title: getString(formData, 'title'),
    objective: getString(formData, 'objective'),
    body: getString(formData, 'body'),
    tags: getTags(formData, 'tags'),
  });

  revalidatePath(workspacePath(workspaceSlug, 'dashboard'));
  revalidatePath(workspacePath(workspaceSlug, 'prompts'));
}

export async function updatePromptTemplateAction(workspaceSlug: string, formData: FormData) {
  const promptId = getString(formData, 'promptId');
  const prompt = await getPromptTemplateById(getString(formData, 'workspaceId'), promptId);

  if (!prompt) {
    throw new Error('Prompt not found.');
  }

  await updatePromptTemplate(promptId, {
    title: getString(formData, 'title') || prompt.title,
    objective: getString(formData, 'objective') || prompt.objective,
    body: getString(formData, 'body') || prompt.body,
    version: prompt.version + 1,
    updatedAt: new Date().toISOString(),
  });

  revalidatePath(workspacePath(workspaceSlug, 'prompts'));
  revalidatePath(`${workspacePath(workspaceSlug, 'prompts')}/${promptId}`);
}

export async function createPromptRunAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');
  const promptId = getString(formData, 'promptId');
  const prompt = await getPromptTemplateById(workspaceId, promptId);

  if (!prompt) {
    throw new Error('Prompt not found.');
  }

  await createPromptRun({
    workspaceId,
    promptId,
    promptVersion: prompt.version,
    input: getString(formData, 'input'),
    output: getString(formData, 'output'),
    outcome: (getString(formData, 'outcome') || 'pending') as 'strong' | 'mixed' | 'weak' | 'pending',
    benchmarkCollectionId: getString(formData, 'benchmarkCollectionId') || undefined,
    assetId: getString(formData, 'assetId') || undefined,
  });

  revalidatePath(`${workspacePath(workspaceSlug, 'prompts')}/${promptId}`);
}

export async function ratePromptRunAction(workspaceSlug: string, formData: FormData) {
  const runId = getString(formData, 'runId');
  const outcome = getString(formData, 'outcome') as 'strong' | 'mixed' | 'weak';
  const promptId = getString(formData, 'promptId');

  await updatePromptRun(runId, {
    outcome,
    updatedAt: new Date().toISOString(),
  });

  revalidatePath(`${workspacePath(workspaceSlug, 'prompts')}/${promptId}`);
}

// ── Analysis actions ──

export async function createAnalysisJobAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');

  await createAnalysisJob({
    workspaceId,
    assetId: getString(formData, 'assetId'),
    jobType: getString(formData, 'jobType') as 'benchmark-analysis' | 'library-analysis' | 'competitor-scan',
  });

  revalidatePath(workspacePath(workspaceSlug, 'dashboard'));
  revalidatePath(workspacePath(workspaceSlug, 'jobs'));
}

function buildScenes(durationSeconds: number) {
  const hookEnd = Math.max(2, Math.min(4, Math.round(durationSeconds * 0.12)));
  const proofStart = Math.max(hookEnd + 2, Math.round(durationSeconds * 0.33));
  const ctaStart = Math.max(proofStart + 4, Math.round(durationSeconds * 0.72));

  return [
    { label: 'Hook', startSecond: 0, endSecond: hookEnd, purpose: 'hook' as const },
    { label: 'Problem framing', startSecond: hookEnd, endSecond: proofStart, purpose: 'problem' as const },
    { label: 'Proof / demo', startSecond: proofStart, endSecond: ctaStart, purpose: 'proof' as const },
    { label: 'CTA close', startSecond: ctaStart, endSecond: durationSeconds, purpose: 'cta' as const },
  ];
}

export async function runAssetAnalysisAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');
  const assetId = getString(formData, 'assetId');
  const asset = await getAssetById(workspaceId, assetId);

  if (!asset) {
    throw new Error('Asset not found.');
  }

  const hookScore = Math.min(95, 55 + (asset.tags.includes('hook') ? 18 : 0) + (asset.durationSeconds <= 35 ? 10 : 0));
  const proofScore = Math.min(92, 48 + (asset.tags.includes('demo') || asset.tags.includes('testimonial') ? 22 : 8));
  const ctaScore = Math.min(88, 45 + (asset.tags.includes('cta') ? 20 : 6));
  const pacingScore = Math.min(90, 50 + (asset.durationSeconds <= 40 ? 18 : 8) + (asset.tags.length >= 2 ? 10 : 4));
  const retentionRisk =
    hookScore >= 75 && pacingScore >= 72 ? 'low' : hookScore >= 60 && pacingScore >= 60 ? 'medium' : 'high';
  const scenes = buildScenes(asset.durationSeconds);
  const resultPayload: Omit<AnalysisResult, 'id' | 'createdAt' | 'updatedAt'> = {
    workspaceId,
    assetId,
    hookScore,
    pacingScore,
    proofScore,
    ctaScore,
    retentionRisk,
    recommendedHookWindowSeconds: scenes[0].endSecond,
    recommendedCtaWindowSeconds: scenes[3].startSecond,
    scenes,
    recommendations: [
      {
        title: hookScore < 70 ? 'Strengthen the opener' : 'Preserve the current opener',
        rationale:
          hookScore < 70
            ? 'This asset needs a faster pattern interrupt or more explicit curiosity in the first three seconds.'
            : 'The first seconds are comparatively strong; keep the interrupt and test alternative phrasing only.',
      },
      {
        title: proofScore < 70 ? 'Move proof earlier' : 'Keep proof compact',
        rationale:
          proofScore < 70
            ? 'The likely proof moment lands too late or feels too weak relative to the hook.'
            : 'Proof density is reasonably strong, but it should stay inside the middle third of the video.',
      },
      {
        title: ctaScore < 65 ? 'Rebuild the CTA close' : 'Tighten the CTA framing',
        rationale:
          ctaScore < 65
            ? 'The ending likely loses momentum before conversion intent peaks.'
            : 'The CTA is serviceable, but stronger specificity would improve conversion clarity.',
      },
    ],
    summary: `Hook ${hookScore}/100, pacing ${pacingScore}/100, proof ${proofScore}/100, CTA ${ctaScore}/100. Retention risk is ${retentionRisk}.`,
  };

  const existing = await getAnalysisResultByAssetId(workspaceId, assetId);

  if (existing) {
    await updateAnalysisResult(existing.id, resultPayload);
  } else {
    await createAnalysisResult(resultPayload);
  }

  await createAnalysisJob({
    workspaceId,
    assetId,
    jobType: 'library-analysis',
    status: 'completed',
    outputSummary: resultPayload.summary,
  });

  revalidatePath(workspacePath(workspaceSlug, 'dashboard'));
  revalidatePath(workspacePath(workspaceSlug, 'jobs'));
  revalidatePath(`${workspacePath(workspaceSlug, 'library')}/${assetId}`);
}

// ── Remix actions ──

export async function createRemixJobAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');

  const job = await createRemixJob({
    workspaceId,
    benchmarkCollectionId: getString(formData, 'benchmarkCollectionId'),
    targetOffer: getString(formData, 'targetOffer'),
    outputType: getString(formData, 'outputType') as 'script' | 'scene-plan' | 'creative-brief',
    promptId: getString(formData, 'promptId') || undefined,
  });

  const outputType = job.outputType;
  const targetOffer = job.targetOffer;

  const generatedContent = generateRemixContent(outputType, targetOffer);

  await createRemixOutput({
    workspaceId,
    remixJobId: job.id,
    outputType,
    title: `${targetOffer} — ${outputType} v1`,
    content: generatedContent.content,
    scenes: generatedContent.scenes,
  });

  await updateRemixJob(job.id, {
    status: 'ready',
    updatedAt: new Date().toISOString(),
  });

  revalidatePath(workspacePath(workspaceSlug, 'dashboard'));
  revalidatePath(workspacePath(workspaceSlug, 'jobs'));
}

function generateRemixContent(outputType: string, targetOffer: string) {
  if (outputType === 'scene-plan') {
    return {
      content: `Scene plan for: ${targetOffer}\n\nThis plan follows the benchmark pattern of hook → problem → proof → CTA with optimized timing windows.`,
      scenes: [
        {
          sceneNumber: 1,
          duration: '0-3s',
          visual: 'Close-up with quick zoom. High visual energy.',
          audio: 'Silence or a single sharp sound effect.',
          text: `"Stop what you are doing if you care about ${targetOffer}."`,
          purpose: 'Pattern interrupt hook',
        },
        {
          sceneNumber: 2,
          duration: '3-9s',
          visual: 'Creator talking to camera. Problem-focused B-roll.',
          audio: 'Low background music starts.',
          text: '"Here is the mistake most people make..."',
          purpose: 'Problem framing',
        },
        {
          sceneNumber: 3,
          duration: '9-22s',
          visual: 'Screen recording, demo, or before/after comparison.',
          audio: 'Music builds. Quick cuts every 2-3 seconds.',
          text: '"Watch what happens when you do this instead..."',
          purpose: 'Proof with demonstration',
        },
        {
          sceneNumber: 4,
          duration: '22-30s',
          visual: 'Creator back on camera with results displayed.',
          audio: 'Music resolves.',
          text: '"Link in bio. Free trial. Start today."',
          purpose: 'CTA with urgency',
        },
      ],
    };
  }

  if (outputType === 'script') {
    return {
      content: `SCRIPT: ${targetOffer}\n\n[HOOK — 0-3s]\n"You are losing money every day you ignore this."\n\n[PROBLEM — 3-8s]\n"Most people in ${targetOffer} think they need more content. They don't. They need better structure."\n\n[PROOF — 8-20s]\n"I tested this framework with 12 different accounts last month. Every single one saw results within the first week. Here is exactly what we changed..."\n\n[DEMO — 20-25s]\n"Watch this before and after. Same product. Same audience. The only difference is the structure."\n\n[CTA — 25-30s]\n"Link in bio to get the framework. Follow for more breakdowns like this."`,
      scenes: undefined,
    };
  }

  return {
    content: `CREATIVE BRIEF: ${targetOffer}\n\nObjective: Generate short-form video content that converts for ${targetOffer}.\n\nTarget Audience: Decision-makers and practitioners who are actively looking for better results.\n\nKey Message: There is a systematic approach to ${targetOffer} that outperforms guesswork.\n\nProof Points:\n- Data from benchmark analysis\n- Before/after demonstrations\n- Specific metrics and timeframes\n\nTone: Confident, specific, non-hype. Show, don't just tell.\n\nPlatform Strategy:\n- TikTok: 30s with voiceover, pattern interrupt hook\n- Instagram Reels: 25s with text overlays, visual-first\n- YouTube Shorts: 40s educational format with data visuals\n\nCTA Strategy: Single specific CTA with link destination. Avoid multi-CTA stacking.`,
    scenes: undefined,
  };
}

// ── Trend actions ──

export async function createTrendSnapshotAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');

  await createTrendSnapshot({
    workspaceId,
    title: getString(formData, 'title'),
    category: getString(formData, 'category') as TrendCategory,
    platform: getString(formData, 'platform') as PlatformType,
    description: getString(formData, 'description'),
    exampleCount: Number(getString(formData, 'exampleCount') || '0'),
    velocity: getString(formData, 'velocity') as 'rising' | 'stable' | 'declining',
    saturation: getString(formData, 'saturation') as 'low' | 'medium' | 'high',
    recommendedAction: getString(formData, 'recommendedAction'),
    detectedAt: new Date().toISOString(),
  });

  revalidatePath(workspacePath(workspaceSlug, 'trends'));
}

// ── Competitor actions ──

export async function createCompetitorAccountAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');

  await createCompetitorAccount({
    workspaceId,
    handle: getString(formData, 'handle'),
    platform: getString(formData, 'platform') as PlatformType,
    displayName: getString(formData, 'displayName'),
    followerCount: Number(getString(formData, 'followerCount') || '0'),
    avgViews: Number(getString(formData, 'avgViews') || '0'),
    avgEngagementRate: Number(getString(formData, 'avgEngagementRate') || '0'),
    topHookStyle: getString(formData, 'topHookStyle'),
    postingFrequency: getString(formData, 'postingFrequency'),
    lastScannedAt: new Date().toISOString(),
    notes: getString(formData, 'notes'),
    watchlistPriority: (getString(formData, 'watchlistPriority') || 'medium') as 'high' | 'medium' | 'low',
  });

  revalidatePath(workspacePath(workspaceSlug, 'competitors'));
}

// ── Playbook actions ──

export async function createPlaybookAction(workspaceSlug: string, formData: FormData) {
  const workspaceId = getString(formData, 'workspaceId');

  await createPlaybook({
    workspaceId,
    title: getString(formData, 'title'),
    description: getString(formData, 'description'),
    niche: getString(formData, 'niche'),
    benchmarkCollectionIds: getTags(formData, 'benchmarkCollectionIds'),
    promptTemplateIds: getTags(formData, 'promptTemplateIds'),
    brandGuardrails: getTags(formData, 'brandGuardrails'),
    targetPlatforms: getTags(formData, 'targetPlatforms') as PlatformType[],
    status: 'active',
  });

  revalidatePath(workspacePath(workspaceSlug, 'playbooks'));
}
