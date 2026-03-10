import { AppShell } from '@/components/app-shell';
import { billingPlans } from '@/lib/payment-config';
import { getWorkspaceBySlug } from '@/lib/repositories';
import { startCheckoutAction } from '@/app/workspaces/[workspaceSlug]/billing/actions';

type BillingParams = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function BillingPage({ params }: BillingParams) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const action = startCheckoutAction.bind(null, workspace.slug);

  return (
    <AppShell
      workspace={workspace}
      title="Billing"
      description="Firebase stores billing state and ownership. Checkout orchestration runs server-side with Paystack as primary and Polar as fallback."
    >
      <section className="module-grid">
        {Object.values(billingPlans).map((plan) => (
          <article key={plan.key} className="panel module-card">
            <span className="status-pill status-foundation">{plan.interval}</span>
            <h3>{plan.label}</h3>
            <p>
              {plan.currency} {plan.amount}
            </p>
            <form action={action} className="entity-form">
              <input type="hidden" name="planKey" value={plan.key} />
              <button type="submit" className="button">
                Start checkout
              </button>
            </form>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
