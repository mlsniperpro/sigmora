import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { verifyCheckoutResult } from '@/lib/billing';
import { getWorkspaceBySlug } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

type BillingCallbackProps = {
  params: Promise<{ workspaceSlug: string }>;
  searchParams: Promise<{
    provider?: string;
    reference?: string;
    trxref?: string;
    checkoutId?: string;
    checkout_id?: string;
    id?: string;
  }>;
};

export default async function BillingCallbackPage({ params, searchParams }: BillingCallbackProps) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const query = await searchParams;
  const provider = query.provider === 'polar' ? 'polar' : 'paystack';
  const reference =
    query.reference ||
    query.trxref ||
    query.checkoutId ||
    query.checkout_id ||
    query.id;

  const result = reference
    ? await verifyCheckoutResult({
        provider,
        reference,
      }).catch((error) => ({
        verified: false,
        status: error instanceof Error ? error.message : 'Verification failed',
        attempt: null,
      }))
    : null;

  return (
    <AppShell
      workspace={workspace}
      title="Billing callback"
      description="The checkout returned to the application. Verification now runs server-side and updates attempt state before webhook reconciliation finishes the record."
    >
      <section className="panel detail-grid">
        <div>
          <p className="eyebrow">Provider</p>
          <h2>{provider}</h2>
        </div>
        <div className="detail-pairs">
          <div><span>Reference</span><strong>{reference ?? 'Missing'}</strong></div>
          <div><span>Verified</span><strong>{result ? (result.verified ? 'Yes' : 'No') : 'Pending'}</strong></div>
          <div><span>Status</span><strong>{result?.status ?? 'Awaiting reference'}</strong></div>
        </div>
        {result?.attempt ? (
          <p>
            Payment attempt `{result.attempt.txRef}` is now marked as `{result.attempt.status}` and can be reconciled further by webhook events.
          </p>
        ) : (
          <p>
            No verifiable payment reference was found in the callback URL. Provider webhooks may still reconcile the attempt later.
          </p>
        )}
        <Link href={workspacePath(workspace.slug, 'dashboard')} className="button button-secondary">
          Return to dashboard
        </Link>
      </section>
    </AppShell>
  );
}
