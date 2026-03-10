import { NextResponse } from 'next/server';
import { createContentUpload } from '@/lib/content-engine';
import { createAsset } from '@/lib/repositories';
import { requireWorkspaceMember } from '@/lib/server-auth';

export async function POST(
  request: Request,
  context: { params: Promise<{ workspaceSlug: string }> },
) {
  const { workspaceSlug } = await context.params;
  const access = await requireWorkspaceMember(request, workspaceSlug);

  if (access instanceof NextResponse) {
    return access;
  }

  const { workspace } = access;
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ success: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const {
    fileName,
    mimeType,
    size,
    title,
    platform,
    tags,
    accessMode,
    durationSeconds,
  } = body as {
    fileName?: string;
    mimeType?: string;
    size?: number;
    title?: string;
    platform?: 'tiktok' | 'instagram' | 'youtube';
    tags?: string[];
    accessMode?: 'presigned' | 'public' | 'private';
    durationSeconds?: number;
  };

  if (!fileName || !mimeType || !size || !title || !platform) {
    return NextResponse.json({ success: false, error: 'Missing required upload fields.' }, { status: 400 });
  }

  const upload = await createContentUpload({
    name: fileName,
    mimeType,
    size,
    accessMode: accessMode ?? 'private',
    folder: `/workspaces/${workspace.id}/assets`,
    tags,
    metadata: {
      workspaceId: workspace.id,
      title,
      platform,
    },
  });

  const asset = await createAsset({
    workspaceId: workspace.id,
    title,
    platform,
    source: 'upload',
    durationSeconds: durationSeconds ?? 0,
    tags: (tags ?? []) as Array<'hook' | 'demo' | 'testimonial' | 'problem' | 'cta' | 'trend'>,
    contentEngineContentId: upload.id,
    contentAccessMode: upload.accessMode,
    contentSyncStatus: 'pending',
    status: 'processing',
  });

  return NextResponse.json({
    success: true,
    data: {
      asset,
      upload,
    },
  });
}
