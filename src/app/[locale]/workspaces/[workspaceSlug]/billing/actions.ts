'use server';

import { redirect } from 'next/navigation';
import { createCheckoutSession, getBillingContext } from '@/lib/billing';
import type { BillingPlanKey } from '@/lib/payment-config';

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

export async function startCheckoutAction(workspaceSlug: string, formData: FormData) {
  const planKey = getString(formData, 'planKey') as BillingPlanKey;
  const context = await getBillingContext();

  const checkout = await createCheckoutSession({
    workspaceId: context.workspace.id,
    userId: context.user.id,
    email: context.user.email,
    userName: context.user.displayName,
    planKey,
    workspaceSlug,
  });

  if (!checkout.checkoutUrl) {
    throw new Error('Payment provider did not return a checkout URL.');
  }

  redirect(checkout.checkoutUrl);
}
