import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import {
  getApprovalsByEntity,
  getCampaignById,
  getConnectedAccounts,
  getPlaybookById,
  getPublishingQueueByCampaign,
  getWorkspaceBySlug,
} from '@/lib/repositories';
import { workspacePath, workspacePlaybookPath } from '@/lib/workspace-routing';

type Params = { params: Promise<{ workspaceSlug: string; campaignId: string }> };

export default async function CampaignDetailPage({ params }: Params) {
  const { workspaceSlug, campaignId } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const campaign = await getCampaignById(workspace.id, campaignId);
  if (!campaign) notFound();

  const [queueItems, accounts, playbook, approvals] = await Promise.all([
    getPublishingQueueByCampaign(workspace.id, campaignId),
    getConnectedAccounts(workspace.id),
    campaign.playbookId ? getPlaybookById(workspace.id, campaign.playbookId) : Promise.resolve(null),
    getApprovalsByEntity(workspace.id, campaignId),
  ]);

  const linkedAccounts = accounts.filter((a) => campaign.connectedAccountIds.includes(a.id));
  const published = queueItems.filter((q) => q.status === 'published').length;
  const pending = queueItems.filter((q) => q.status === 'review-required' || q.status === 'queued').length;

  return (
    <AppShell workspace={workspace} title={campaign.title} description={campaign.description}>
      <section className="panel detail-grid">
        <div>
          <div className="tag-row">
            <span className={`status-pill ${campaign.status === 'active' ? 'status-foundation' : campaign.status === 'scheduled' ? 'status-next' : 'status-later'}`}>{campaign.status}</span>
            <span className="status-pill status-later">{campaign.automationMode}</span>
            {campaign.platforms.map((p) => <span key={p} className="status-pill status-later">{p}</span>)}
          </div>
          <h2>Campaign overview</h2>
        </div>
        <div className="detail-pairs">
          <div><span>Mode</span><strong>{campaign.automationMode}</strong></div>
          <div><span>Scheduled</span><strong>{campaign.scheduledAt ? new Date(campaign.scheduledAt).toLocaleString() : 'Not scheduled'}</strong></div>
          <div><span>Queue items</span><strong>{queueItems.length}</strong></div>
          <div><span>Published</span><strong>{published}</strong></div>
          <div><span>Pending review</span><strong>{pending}</strong></div>
          <div><span>Playbook</span><strong>{playbook ? <Link href={workspacePlaybookPath(workspace.slug, playbook.id)} className="inline-link">{playbook.title}</Link> : 'None'}</strong></div>
        </div>
      </section>

      <section className="panel">
        <div className="table-header"><div><h2>Connected accounts</h2><p>Accounts assigned to this campaign.</p></div></div>
        <div className="recommendation-list">
          {linkedAccounts.map((a) => (
            <article key={a.id} className="recommendation-card">
              <div className="tag-row">
                <span className={`status-pill ${a.status === 'connected' ? 'status-foundation' : 'status-later'}`}>{a.status}</span>
                <span className="status-pill status-later">{a.platform}</span>
              </div>
              <h3 style={{ marginTop: '0.5rem' }}>{a.displayName} ({a.handle})</h3>
              <p>Capabilities: {a.capabilities.join(', ')}</p>
            </article>
          ))}
          {linkedAccounts.length === 0 && <p>No connected accounts assigned.</p>}
        </div>
      </section>

      <section className="panel">
        <div className="table-header"><div><h2>Publishing queue</h2><p>Items queued or published for this campaign.</p></div></div>
        {queueItems.length > 0 ? (
          <div className="data-table">
            <div className="data-table-row data-table-head"><span>Title</span><span>Platform</span><span>Status</span><span>Scheduled</span></div>
            {queueItems.map((item) => (
              <div key={item.id} className="data-table-row">
                <span>{item.title}</span>
                <span>{item.platform}</span>
                <span><span className={`status-pill ${item.status === 'published' ? 'status-foundation' : item.status === 'review-required' ? 'status-next' : 'status-later'}`}>{item.status}</span></span>
                <span>{item.scheduledAt ? new Date(item.scheduledAt).toLocaleString() : '—'}</span>
              </div>
            ))}
          </div>
        ) : <p>No queue items yet.</p>}
      </section>

      {approvals.length > 0 && (
        <section className="panel">
          <div className="table-header"><div><h2>Approval history</h2></div></div>
          <div className="recommendation-list">
            {approvals.map((a) => (
              <article key={a.id} className="recommendation-card">
                <div className="tag-row">
                  <span className={`status-pill ${a.state === 'approved' ? 'status-foundation' : a.state === 'rejected' ? 'status-later' : 'status-next'}`}>{a.state}</span>
                </div>
                {a.comment && <p style={{ marginTop: '0.5rem' }}>{a.comment}</p>}
                {a.decidedAt && <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', opacity: 0.7 }}>Decided: {new Date(a.decidedAt).toLocaleString()}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="panel">
        <div className="table-header"><div /><Link href={workspacePath(workspace.slug, 'campaigns')} className="button button-secondary">Back to campaigns</Link></div>
      </section>
    </AppShell>
  );
}
