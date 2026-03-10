'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getClientAuthHeaders } from '@/lib/client-auth';
import type { ActivationEventType, ActivationStage } from '@/lib/domain';

type ActivationTrackerProps = {
  workspaceSlug: string;
  eventType: ActivationEventType;
  stage: ActivationStage;
  sourcePath: string;
  metadata?: Record<string, string>;
};

export function ActivationTracker({
  workspaceSlug,
  eventType,
  stage,
  sourcePath,
  metadata = {},
}: ActivationTrackerProps) {
  const { user } = useAuth();
  const metadataJson = JSON.stringify(metadata);

  useEffect(() => {
    const controller = new AbortController();

    void (async () => {
      const authHeaders = await getClientAuthHeaders();

      await fetch(`/api/workspaces/${workspaceSlug}/activation-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({
          eventType,
          stage,
          sourcePath,
          metadata: JSON.parse(metadataJson) as Record<string, string>,
        }),
        signal: controller.signal,
      });
    })().catch(() => {
      // Fire-and-forget telemetry. UI should not fail if tracking does.
    });

    return () => controller.abort();
  }, [eventType, metadataJson, sourcePath, stage, user?.uid, workspaceSlug]);

  return null;
}
