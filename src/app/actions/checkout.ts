'use server';

import { redirect } from 'next/navigation';
import { createCheckoutSession } from '@/lib/billing';
import type { BillingPlanKey } from '@/lib/payment-config';

export async function startGuestCheckoutAction(formData: FormData) {
  const planKey = (formData.get('planKey') as string) as BillingPlanKey;
  const email = (formData.get('email') as string) || '';

  if (!email) {
    throw new Error('Email is required for guest checkout.');
  }

  const checkout = await createCheckoutSession({
    email,
    planKey,
    // workspaceId, userId, and workspaceSlug will use ghost placeholders
  });

  if (!checkout.checkoutUrl) {
    throw new Error('Payment provider did not return a checkout URL.');
  }

  redirect(checkout.checkoutUrl);
}
