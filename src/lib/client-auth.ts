'use client';

import { auth, isConfigValid } from '@/lib/firebase';

export async function getClientAuthHeaders() {
  if (!isConfigValid || !auth?.currentUser) {
    throw new Error('You must be logged in to continue.');
  }

  const token = await auth.currentUser.getIdToken();

  return {
    Authorization: `Bearer ${token}`,
  };
}
