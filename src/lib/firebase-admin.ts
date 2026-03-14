import * as admin from 'firebase-admin';

const hasAdminConfig =
  !!process.env.FIREBASE_PROJECT_ID &&
  !!process.env.FIREBASE_CLIENT_EMAIL &&
  !!process.env.FIREBASE_PRIVATE_KEY;

let adminApp: admin.app.App | null = null;

if (hasAdminConfig) {
  try {
    adminApp =
      admin.apps[0] ??
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
  } catch (error) {
    console.warn('Firebase admin initialization failed. Falling back to mock modes.', error);
  }
} else if (process.env.NODE_ENV !== 'production') {
  console.warn('Firebase admin config is incomplete. Server-side admin features are disabled.');
}

const adminDb = adminApp ? admin.firestore(adminApp) : null;
const adminAuth = adminApp ? admin.auth(adminApp) : null;

export { adminApp, adminAuth, adminDb, hasAdminConfig };
