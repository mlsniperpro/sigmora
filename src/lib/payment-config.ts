export const PAYMENT_API_BASE_URL = process.env.PAYMENT_API_BASE_URL || 'http://157.90.158.61';

export const billingPlans = {
  starter_monthly: {
    key: 'starter_monthly',
    label: 'Starter Monthly',
    amount: 49,
    currency: 'USD',
    interval: 'month',
  },
  growth_monthly: {
    key: 'growth_monthly',
    label: 'Growth Monthly',
    amount: 149,
    currency: 'USD',
    interval: 'month',
  },
  growth_yearly: {
    key: 'growth_yearly',
    label: 'Growth Yearly',
    amount: 1490,
    currency: 'USD',
    interval: 'year',
  },
} as const;

export type BillingPlanKey = keyof typeof billingPlans;

export function getBillingPlan(planKey: BillingPlanKey) {
  return billingPlans[planKey];
}

export function shouldUsePaystack(currency: string) {
  return ['NGN', 'GHS', 'ZAR', 'KES', 'USD'].includes(currency.toUpperCase());
}
