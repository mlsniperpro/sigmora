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
      title="Billing & Subscription"
      description="Manage your workspace subscription and payment methods. We use a dual-gateway system (Paystack + Polar) for maximum reliability."
    >
      <div className="section-heading" style={{ marginBottom: '3rem' }}>
        <p className="eyebrow">Workspace: {workspace.name}</p>
        <h2 style={{ fontSize: '2rem' }}>Current subscription: <span className="status-pill status-foundation" style={{ fontSize: '1.2rem', padding: '0.4rem 1rem' }}>{workspace.plan.toUpperCase()}</span></h2>
      </div>

      <section className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {Object.values(billingPlans).map((plan) => (
          <article key={plan.key} className="panel module-card" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="status-pill status-foundation" style={{ marginBottom: '1rem' }}>{plan.interval.toUpperCase()}</span>
              <h3 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>{plan.label}</h3>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                {plan.currency === 'USD' ? '$' : plan.currency}{plan.amount}
              </span>
              <span style={{ opacity: 0.6, fontSize: '1rem' }}>/{plan.interval}</span>
            </div>

            <div style={{ flex: 1, marginBottom: '2.5rem' }}>
              <p className="eyebrow" style={{ color: 'var(--color-paper-300)', marginBottom: '1rem' }}>Plan features</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.85rem', fontSize: '0.95rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-accent-400)' }}>✓</span>
                  {plan.amount > 100 ? '50,000' : '10,000'} AI Remix Credits
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-accent-400)' }}>✓</span>
                  Viral Database Access
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-accent-400)' }}>✓</span>
                  Priority Analysis Queue
                </li>
              </ul>
            </div>

            <form action={action} className="entity-form">
              <input type="hidden" name="planKey" value={plan.key} />
              <button
                type="submit"
                className={`button ${workspace.plan.toLowerCase() === plan.key.split('_')[0] ? 'button-secondary' : ''}`}
                style={{ width: '100%' }}
                disabled={workspace.plan.toLowerCase() === plan.key.split('_')[0]}
              >
                {workspace.plan.toLowerCase() === plan.key.split('_')[0] ? 'Current Plan' : 'Switch to this plan'}
              </button>
            </form>
          </article>
        ))}
      </section>

      <div className="panel" style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h4 style={{ marginBottom: '1rem' }}>Security & Compliance</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-paper-300)', lineHeight: '1.6' }}>
          For maximum security, your payment information is never stored on our servers.
          All transactions are handled securely by **Paystack** and **Polar** (Merchant of Record).
          Tax compliance, invoicing, and cross-border security are handled automatically.
        </p>
      </div>
    </AppShell>
  );
}
