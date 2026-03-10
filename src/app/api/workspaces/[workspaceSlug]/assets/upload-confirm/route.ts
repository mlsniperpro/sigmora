import { NextResponse } from 'next/server';
import { confirmContentUpload } from '@/lib/content-engine';
import { getAssetByContentId, getWorkspaceBySlug, updateAsset } from '@/lib/repositories';

export async function POST(
  request: Request,
  context: { params: Promise<{ workspaceSlug: string }> },
) {
  const { workspaceSlug } = await context.params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const body = await request.json().catch(() => null);

  if (!body || typeof body.contentId !== 'string') {
    return NextResponse.json({ success: false, error: 'Missing contentId.' }, { status: 400 });
  }

  const confirmation = await confirmContentUpload(body.contentId);
  const asset = await getAssetByContentId(workspace.id, body.contentId);

  if (!asset) {
    return NextResponse.json({ success: false, error: 'Asset not found for content id.' }, { status: 404 });
  }

  const updated = await updateAsset(asset.id, {
    contentSyncStatus: confirmation.status === 'active' ? 'active' : 'pending',
    status: confirmation.status === 'active' ? 'ready' : 'processing',
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    data: {
      asset: updated,
      content: confirmation,
    },
  });
}
