import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';
import { getConnectedAccounts, getPublishingQueue, getWorkspaceBySlug } from '@/lib/repositories';
import { platformCapabilities } from '@/lib/platform-capabilities';

type Params = { params: Promise<{ workspaceSlug: string }> };

export default async function PublishingPage({ params }: Params) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [queue, accounts] = await Promise.all([
    getPublishingQueue(workspace.id),
    getConnectedAccounts(workspace.id),
  ]);

  const published = queue.filter((q) => q.status === 'published');
  const scheduled = queue.filter((q) => q.status === 'scheduled');
  const reviewRequired = queue.filter((q) => q.status === 'review-required');
  const failed = queue.filter((q) => q.status === 'failed');
  const socialCaps = platformCapabilities.filter((p) => p.type === 'social');

  return (
    <AppShell workspace={workspace} title="Publishing" description="Manage the publishing queue, schedule posts to connected accounts, and track delivery status across platforms.">
      <section className="metric-grid">
        <MetricCard label="Queued" value={String(queue.filter((q) => q.status === 'queued').length)} detail="Waiting to be scheduled." />
        <MetricCard label="Scheduled" value={String(scheduled.length)} detail="Ready for publishing." />
        <MetricCard label="Review required" value={String(reviewRequired.length)} detail="Need approval before publishing." />
        <MetricCard label="Published" value={String(published.length)} detail="Successfully delivered." />
      </section>

      {reviewRequired.length > 0 && (
        <section className="panel">
          <div className="table-header"><div><h2>Needs review</h2><p>These items require approval before publishing.</p></div></div>
          <div className="recommendation-list">
            {reviewRequired.map((item) => {
              const account = accounts.find((a) => a.id === item.connectedAccountId);
              return (
                <article key={item.id} className="recommendation-card">
                  <div className="tag-row">
                    <span className="status-pill status-next">review required</span>
                    <span className="status-pill status-later">{item.platform}</span>
                  </div>
                  <h3 style={{ marginTop: '0.5rem' }}>{item.title}</h3>
                  <p>{item.content.slice(0, 200)}{item.content.length > 200 ? '...' : ''}</p>
                  <div className="detail-pairs" style={{ marginTop: '0.75rem' }}>
                    <div><span>Account</span><strong>{account?.displayName ?? item.connectedAccountId}</strong></div>
                    <div><span>Scheduled</span><strong>{item.scheduledAt ? new Date(item.scheduledAt).toLocaleString() : '—'}</strong></div>
                    <div><span>Platform</span><strong>{item.platform}</strong></div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section className="panel">
        <div className="table-header"><div><h2>Full queue</h2><p>All publishing items across campaigns and standalone posts.</p></div></div>
        <div className="data-table">
          <div className="data-table-row data-table-head"><span>Title</span><span>Platform</span><span>Status</span><span>Scheduled</span></div>
          {queue.map((item) => (
            <div key={item.id} className="data-table-row">
              <span>{item.title}</span>
              <span>{item.platform}</span>
              <span>
                <span className={`status-pill ${item.status === 'published' ? 'status-foundation' : item.status === 'failed' ? 'status-later' : item.status === 'review-required' ? 'status-next' : 'status-later'}`}>{item.status}</span>
              </span>
              <span>{item.scheduledAt ? new Date(item.scheduledAt).toLocaleString() : '—'}</span>
            </div>
          ))}
        </div>
      </section>

      {failed.length > 0 && (
        <section className="panel">
          <div className="table-header"><div><h2>Failed items</h2><p>Items that failed to publish. Review errors and retry.</p></div></div>
          <div className="recommendation-list">
            {failed.map((item) => (
              <article key={item.id} className="recommendation-card">
                <h3>{item.title}</h3>
                <p>Error: {item.errorMessage ?? 'Unknown error'}</p>
                <p>Retries: {item.retryCount}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="panel">
        <div className="table-header"><div><h2>Platform capabilities</h2><p>What each platform supports for automated publishing.</p></div></div>
        <div className="data-table">
          <div className="data-table-row data-table-head"><span>Platform</span><span>Publish</span><span>Schedule</span><span>Auto-publish</span></div>
          {socialCaps.map((cap) => (
            <div key={cap.platform} className="data-table-row">
              <span>{cap.platform}</span>
              <span>{cap.creationSupport ? 'Yes' : 'No'}</span>
              <span>{cap.schedulingSupport ? 'Yes' : 'No'}</span>
              <span>
                {cap.fireAndForgetSupport ? (
                  <span className="status-pill status-foundation">supported</span>
                ) : cap.reviewFirstRecommended ? (
                  <span className="status-pill status-next">review first</span>
                ) : (
                  <span className="status-pill status-later">not supported</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
