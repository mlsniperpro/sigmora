import type {
  ActivationEvent,
  ActivationStage,
  Asset,
  AnalysisResult,
  RemixJob,
  SigmoraUser,
} from '@/lib/domain';

export type ActivationStep = {
  id: 'asset' | 'analysis' | 'remix';
  label: string;
  description: string;
  completed: boolean;
};

export type ActivationSnapshot = {
  steps: ActivationStep[];
  completedSteps: number;
  totalSteps: number;
  progressPercent: number;
  isActivated: boolean;
};

export type ActivationContactStatus = {
  key: string;
  userId: string | null;
  name: string;
  email: string | null;
  stage: ActivationStage;
  lastEventType: ActivationEvent['eventType'] | 'no_activity';
  lastSeenAt: string | null;
  needsOutreach: boolean;
  outreachReason: string;
};

export function getActivationSnapshot(input: {
  assets: Asset[];
  analysisResults: AnalysisResult[];
  remixJobs: RemixJob[];
}): ActivationSnapshot {
  const hasAsset = input.assets.length > 0;
  const hasAnalysis = input.analysisResults.length > 0;
  const hasRemix = input.remixJobs.length > 0;

  const steps: ActivationStep[] = [
    {
      id: 'asset',
      label: 'Bring in one video',
      description: 'Import a TikTok, Instagram, or YouTube reference or upload your own asset.',
      completed: hasAsset,
    },
    {
      id: 'analysis',
      label: 'Run one analysis',
      description: 'Generate hook, pacing, proof, CTA, and retention-risk output on a real asset.',
      completed: hasAnalysis,
    },
    {
      id: 'remix',
      label: 'Create one remix output',
      description: 'Turn what the system learned into a script, scene plan, or creative brief.',
      completed: hasRemix,
    },
  ];

  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  return {
    steps,
    completedSteps,
    totalSteps,
    progressPercent,
    isActivated: steps.every((step) => step.completed),
  };
}

const STALE_HOURS = 48;

const stageLabel: Record<ActivationStage, string> = {
  started: 'activation started',
  asset: 'asset creation',
  analysis: 'analysis',
  remix: 'remix generation',
  activated: 'activation complete',
};

function hoursSince(timestamp: string) {
  return (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60);
}

export function getActivationContactStatuses(input: {
  users: SigmoraUser[];
  events: ActivationEvent[];
}): ActivationContactStatus[] {
  const latestEventByKey = new Map<string, ActivationEvent>();

  input.events.forEach((event) => {
    const key = event.userEmail || event.userId || `event:${event.id}`;
    const existing = latestEventByKey.get(key);

    if (!existing || existing.createdAt < event.createdAt) {
      latestEventByKey.set(key, event);
    }
  });

  const rows = input.users.map<ActivationContactStatus>((user) => {
    const event = latestEventByKey.get(user.email) ?? latestEventByKey.get(user.id);

    if (!event) {
      return {
        key: user.email || user.id,
        userId: user.id,
        name: user.displayName,
        email: user.email,
        stage: 'started',
        lastEventType: 'no_activity',
        lastSeenAt: null,
        needsOutreach: false,
        outreachReason: 'No activation activity recorded yet.',
      };
    }

    const stale = event.stage !== 'activated' && hoursSince(event.createdAt) >= STALE_HOURS;

    return {
      key: user.email || user.id,
      userId: user.id,
      name: event.userName || user.displayName,
      email: event.userEmail || user.email,
      stage: event.stage,
      lastEventType: event.eventType,
      lastSeenAt: event.createdAt,
      needsOutreach: stale,
      outreachReason: stale
        ? `Dropped after ${stageLabel[event.stage]}.`
        : event.stage === 'activated'
          ? 'Completed the activation loop.'
          : 'Still within the follow-up window.',
    };
  });

  return rows.sort((a, b) => {
    if (a.needsOutreach !== b.needsOutreach) {
      return a.needsOutreach ? -1 : 1;
    }

    if (!a.lastSeenAt) {
      return 1;
    }

    if (!b.lastSeenAt) {
      return -1;
    }

    return a.lastSeenAt < b.lastSeenAt ? -1 : 1;
  });
}
