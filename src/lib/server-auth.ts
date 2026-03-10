import { NextResponse } from 'next/server';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { adminAuth } from '@/lib/firebase-admin';
import { getWorkspaceBySlug, getWorkspaceUsers } from '@/lib/repositories';

type AuthorizedWorkspaceMember = {
  token: DecodedIdToken;
  workspace: Awaited<ReturnType<typeof getWorkspaceBySlug>>;
  matchedUser: Awaited<ReturnType<typeof getWorkspaceUsers>>[number];
};

function unauthorized(message: string, status = 401) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return null;
  }

  return authorization.slice('Bearer '.length).trim();
}

export async function requireWorkspaceMember(
  request: Request,
  workspaceSlug: string,
): Promise<AuthorizedWorkspaceMember | NextResponse> {
  if (!adminAuth) {
    return unauthorized('Server authentication is not configured.', 503);
  }

  const idToken = getBearerToken(request);

  if (!idToken) {
    return unauthorized('Missing bearer token.');
  }

  let token: DecodedIdToken;

  try {
    token = await adminAuth.verifyIdToken(idToken);
  } catch {
    return unauthorized('Invalid or expired authentication token.');
  }

  if (!token.email) {
    return unauthorized('Authenticated user is missing an email address.', 403);
  }

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const workspaceUsers = await getWorkspaceUsers(workspace.id);
  const matchedUser = workspaceUsers.find((user) => user.email.toLowerCase() === token.email?.toLowerCase());

  if (!matchedUser) {
    return unauthorized('You do not have access to this workspace.', 403);
  }

  return {
    token,
    workspace,
    matchedUser,
  };
}
