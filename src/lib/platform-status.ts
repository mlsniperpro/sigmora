import { hasAdminConfig } from '@/lib/firebase-admin';
import { getContentEngineConfig } from '@/lib/content-engine';

export function getPlatformStatus() {
  const contentEngine = getContentEngineConfig();

  return {
    firebase: {
      authConfigured: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      firestoreConfigured: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      adminConfigured: hasAdminConfig,
      role: 'Identity, workspaces, billing metadata, app state',
    },
    contentEngine: {
      configured: contentEngine.configured,
      baseUrl: contentEngine.baseUrl,
      role: 'Media storage, upload orchestration, large content operations',
    },
    billing: {
      role: 'Firestore should store customer and subscription state, but payment processing still belongs to Stripe or another billing provider.',
    },
  };
}
