import { NextResponse } from 'next/server';
import { createActivationEvent } from '@/lib/repositories';
import type { ActivationEventType, ActivationStage } from '@/lib/domain';
import { requireWorkspaceMember } from '@/lib/server-auth';

type ActivationEventBody = {
  eventType?: ActivationEventType;
  stage?: ActivationStage;
  sourcePath?: string;
  metadata?: Record<string, string>;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ workspaceSlug: string }> },
) {
  const body = (await request.json()) as ActivationEventBody;
  const { workspaceSlug } = await params;
  const access = await requireWorkspaceMember(request, workspaceSlug);

  if (access instanceof NextResponse) {
    return access;
  }

  const { matchedUser, token, workspace } = access;

  if (!body.eventType || !body.stage || !body.sourcePath) {
    return NextResponse.json({ success: false, error: 'Missing required activation event fields.' }, { status: 400 });
  }

  await createActivationEvent({
    workspaceId: workspace.id,
    userId: matchedUser?.id ?? null,
    userEmail: matchedUser?.email ?? token.email ?? null,
    userName: matchedUser?.displayName ?? token.name ?? null,
    eventType: body.eventType,
    stage: body.stage,
    sourcePath: body.sourcePath,
    metadata: body.metadata ?? {},
  });

  return NextResponse.json({ success: true });
}
