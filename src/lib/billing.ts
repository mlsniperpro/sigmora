import { cache } from 'react';
import { adminDb, hasAdminConfig } from '@/lib/firebase-admin';
import type { PaymentAttempt, PaymentCustomer, SubscriptionRecord, Workspace, SigmoraUser } from '@/lib/domain';
import { collections } from '@/lib/domain';
import { getBillingPlan, shouldUsePaystack, type BillingPlanKey } from '@/lib/payment-config';
import {
  createPaystackCheckout,
  createPolarCheckout,
  verifyPaystackPayment,
  verifyPolarCheckout,
} from '@/lib/payment-gateway';
import { demoUsers, demoWorkspace, mockDatabase } from '@/lib/mock-data';

function timestamp() {
  return new Date().toISOString();
}

function paymentAttemptId() {
  return `pay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

async function writeDocument<T extends { id: string }>(collectionName: string, payload: T) {
  if (!hasAdminConfig || !adminDb) {
    return payload;
  }

  await adminDb.collection(collectionName).doc(payload.id).set(payload);
  return payload;
}

async function readCollection<T>(collectionName: string): Promise<T[]> {
  if (!hasAdminConfig || !adminDb) {
    return (mockDatabase[collectionName as keyof typeof mockDatabase] ?? []) as T[];
  }

  const snapshot = await adminDb.collection(collectionName).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<T, 'id'>) } as T));
}

export const getBillingContext = cache(async (): Promise<{ workspace: Workspace; user: SigmoraUser }> => {
  return {
    workspace: demoWorkspace,
    user: demoUsers[0],
  };
});

export async function createCheckoutSession(input: {
  workspaceId: string;
  userId: string;
  email: string;
  planKey: BillingPlanKey;
  workspaceSlug: string;
  userName?: string;
}) {
  const plan = getBillingPlan(input.planKey);
  const txRef = paymentAttemptId();
  const createdAt = timestamp();
  const callbackBase = getBaseUrl();
  const paystackPreferred = shouldUsePaystack(plan.currency);

  const paymentAttemptBase: PaymentAttempt = {
    id: txRef,
    createdAt,
    updatedAt: createdAt,
    workspaceId: input.workspaceId,
    userId: input.userId,
    provider: paystackPreferred ? 'paystack' : 'polar',
    txRef,
    amount: plan.amount,
    currency: plan.currency,
    status: 'initialized',
    checkoutUrl: null,
    providerReference: null,
    fallbackUsed: false,
    planKey: input.planKey,
  };

  try {
    if (paystackPreferred) {
      const paystack = await createPaystackCheckout({
        email: input.email,
        amount: plan.amount,
        currency: plan.currency,
        txRef,
        callbackUrl: `${callbackBase}/workspaces/${input.workspaceSlug}/billing/callback?provider=paystack`,
        metadata: {
          workspaceId: input.workspaceId,
          userId: input.userId,
          planKey: input.planKey,
        },
      });

      const attempt = await writeDocument(collections.paymentAttempts, {
        ...paymentAttemptBase,
        provider: 'paystack',
        status: 'redirect_pending',
        checkoutUrl: paystack.authorization_url ?? null,
        providerReference: paystack.reference ?? txRef,
      });

      return {
        provider: 'paystack' as const,
        attempt,
        checkoutUrl: paystack.authorization_url ?? null,
      };
    }
  } catch {
    const polarProductId = process.env.POLAR_DEFAULT_PRODUCT_ID;

    if (!polarProductId) {
      throw new Error('Paystack checkout failed and POLAR_DEFAULT_PRODUCT_ID is not configured for fallback.');
    }

    const polar = await createPolarCheckout({
      clientReference: txRef,
      productId: polarProductId,
      successUrl: `${callbackBase}/workspaces/${input.workspaceSlug}/billing/callback?provider=polar`,
      customerEmail: input.email,
      customerName: input.userName,
      metadata: {
        workspaceId: input.workspaceId,
        userId: input.userId,
        planKey: input.planKey,
      },
    });

    const attempt = await writeDocument(collections.paymentAttempts, {
      ...paymentAttemptBase,
      provider: 'polar',
      status: 'redirect_pending',
      checkoutUrl: polar.url ?? null,
      providerReference: polar.id,
      fallbackUsed: true,
    });

    return {
      provider: 'polar' as const,
      attempt,
      checkoutUrl: polar.url ?? null,
    };
  }

  const polarProductId = process.env.POLAR_DEFAULT_PRODUCT_ID;

  if (!polarProductId) {
    throw new Error('Polar fallback requires POLAR_DEFAULT_PRODUCT_ID.');
  }

  const polar = await createPolarCheckout({
    clientReference: txRef,
    productId: polarProductId,
    successUrl: `${callbackBase}/workspaces/${input.workspaceSlug}/billing/callback?provider=polar`,
    customerEmail: input.email,
    customerName: input.userName,
    metadata: {
      workspaceId: input.workspaceId,
      userId: input.userId,
      planKey: input.planKey,
    },
  });

  const attempt = await writeDocument(collections.paymentAttempts, {
    ...paymentAttemptBase,
    provider: 'polar',
    status: 'redirect_pending',
    checkoutUrl: polar.url ?? null,
    providerReference: polar.id,
    fallbackUsed: true,
  });

  return {
    provider: 'polar' as const,
    attempt,
    checkoutUrl: polar.url ?? null,
  };
}

export async function createOrUpdatePaymentCustomer(input: PaymentCustomer) {
  return writeDocument(collections.paymentCustomers, input);
}

export async function createOrUpdateSubscription(input: SubscriptionRecord) {
  return writeDocument(collections.subscriptions, input);
}

export async function getPaymentAttemptByTxRef(txRef: string): Promise<PaymentAttempt | null> {
  const attempts = await readCollection<PaymentAttempt>(collections.paymentAttempts);
  return attempts.find((attempt) => attempt.txRef === txRef || attempt.providerReference === txRef || attempt.id === txRef) ?? null;
}

export async function updatePaymentAttempt(
  attemptId: string,
  patch: Partial<Omit<PaymentAttempt, 'id' | 'createdAt'>>,
): Promise<PaymentAttempt | null> {
  const existing = await getPaymentAttemptByTxRef(attemptId);

  if (!existing) {
    return null;
  }

  const updated: PaymentAttempt = {
    ...existing,
    ...patch,
    updatedAt: timestamp(),
  };

  await writeDocument(collections.paymentAttempts, updated);
  return updated;
}

export async function updateWorkspaceBillingState(workspaceId: string, state: Workspace['billingState']) {
  const workspace = demoWorkspace.id === workspaceId ? demoWorkspace : null;

  if (hasAdminConfig && adminDb) {
    await adminDb.collection(collections.workspaces).doc(workspaceId).set(
      {
        billingState: state,
        updatedAt: timestamp(),
      },
      { merge: true },
    );
  }

  if (workspace) {
    workspace.billingState = state;
  }
}

export async function reconcileSubscriptionFromAttempt(
  attempt: PaymentAttempt,
  providerCustomerId: string,
  providerSubscriptionId: string,
) {
  const plan = getBillingPlan(attempt.planKey as BillingPlanKey);
  const subscription: SubscriptionRecord = {
    id: `sub_${attempt.txRef}`,
    createdAt: timestamp(),
    updatedAt: timestamp(),
    workspaceId: attempt.workspaceId,
    userId: attempt.userId,
    provider: attempt.provider,
    providerSubscriptionId,
    providerCustomerId,
    planKey: attempt.planKey,
    status: 'active',
    interval: plan.interval,
    amount: plan.amount,
    currency: plan.currency,
  };

  await createOrUpdateSubscription(subscription);
  await updateWorkspaceBillingState(attempt.workspaceId, 'active');
  return subscription;
}

function getProviderCustomerId(provider: PaymentAttempt['provider']) {
  return provider === 'paystack' ? 'CUS_paystack_placeholder' : 'polar_customer_placeholder';
}

function getProviderSubscriptionId(provider: PaymentAttempt['provider'], txRef: string) {
  return provider === 'paystack' ? `SUB_${txRef}` : `polar_sub_${txRef}`;
}

export async function verifyCheckoutResult(input: {
  provider: 'paystack' | 'polar';
  reference: string;
}) {
  const attempt = await getPaymentAttemptByTxRef(input.reference);

  if (!attempt) {
    throw new Error(`No payment attempt found for reference ${input.reference}.`);
  }

  const verification =
    input.provider === 'paystack'
      ? await verifyPaystackPayment(input.reference, attempt.amount)
      : await verifyPolarCheckout(input.reference, attempt.amount);

  const succeeded =
    verification.verified &&
    ['success', 'successful', 'succeeded', 'completed', 'active', 'paid'].includes(
      verification.status.toLowerCase(),
    );

  const updatedAttempt = await updatePaymentAttempt(attempt.txRef, {
    status: succeeded ? 'succeeded' : 'failed',
    providerReference: input.reference,
  });

  if (!updatedAttempt) {
    throw new Error(`Failed to update payment attempt ${attempt.txRef}.`);
  }

  if (succeeded) {
    const providerCustomerId = getProviderCustomerId(attempt.provider);
    const providerSubscriptionId = getProviderSubscriptionId(attempt.provider, attempt.txRef);

    const paymentCustomer: PaymentCustomer = {
      id: `${attempt.provider}_${attempt.userId}`,
      createdAt: timestamp(),
      updatedAt: timestamp(),
      workspaceId: attempt.workspaceId,
      userId: attempt.userId,
      email: demoUsers.find((user) => user.id === attempt.userId)?.email || 'unknown@example.com',
      provider: attempt.provider,
      providerCustomerId,
    };

    await createOrUpdatePaymentCustomer(paymentCustomer);
    const subscription = await reconcileSubscriptionFromAttempt(
      updatedAttempt,
      providerCustomerId,
      providerSubscriptionId,
    );

    return {
      verified: true,
      attempt: updatedAttempt,
      subscription,
      status: verification.status,
    };
  }

  return {
    verified: false,
    attempt: updatedAttempt,
    status: verification.status,
  };
}

export async function processWebhookEvent(input: {
  provider: 'paystack' | 'polar';
  reference: string;
  status: string;
}) {
  const attempt = await getPaymentAttemptByTxRef(input.reference);

  if (!attempt) {
    return { updated: false, reason: 'attempt_not_found' };
  }

  const normalizedStatus = input.status.toLowerCase();
  const succeeded = ['success', 'successful', 'succeeded', 'completed', 'active', 'paid'].includes(normalizedStatus);

  const updatedAttempt = await updatePaymentAttempt(attempt.txRef, {
    status: succeeded ? 'succeeded' : 'failed',
    providerReference: input.reference,
  });

  if (succeeded && updatedAttempt) {
    const providerCustomerId = getProviderCustomerId(attempt.provider);
    const providerSubscriptionId = getProviderSubscriptionId(attempt.provider, attempt.txRef);

    await createOrUpdatePaymentCustomer({
      id: `${attempt.provider}_${attempt.userId}`,
      createdAt: timestamp(),
      updatedAt: timestamp(),
      workspaceId: attempt.workspaceId,
      userId: attempt.userId,
      email: demoUsers.find((user) => user.id === attempt.userId)?.email || 'unknown@example.com',
      provider: attempt.provider,
      providerCustomerId,
    });

    await reconcileSubscriptionFromAttempt(updatedAttempt, providerCustomerId, providerSubscriptionId);
  }

  return { updated: true, status: normalizedStatus };
}
