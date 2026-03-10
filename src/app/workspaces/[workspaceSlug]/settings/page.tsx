import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';
import { getApprovalRecords, getConnectedAccounts, getWorkspaceBySlug, getWorkspaceUsers } from '@/lib/repositories';
import { getPlatformStatus } from '@/lib/platform-status';
import { platformCapabilities } from '@/lib/platform-capabilities';

type Params = { params: Promise<{ workspaceSlug: string }> };

export default async function SettingsPage({ params }: Params) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [connectedAccounts, users, approvals] = await Promise.all([
    getConnectedAccounts(workspace.id),
    getWorkspaceUsers(workspace.id),
    getApprovalRecords(workspace.id),
  ]);
  const platformStatus = getPlatformStatus();
  const activeAccounts = connectedAccounts.filter((a) => a.status === 'connected');
  const pendingApprovals = approvals.filter((a) => a.state === 'pending');

  return (
    <AppShell workspace={workspace} title="Workspace settings" description="Manage team members, connected accounts, approvals, platform integrations, and workspace configuration.">
      <section className="panel detail-grid">
        <div><p className="eyebrow">Workspace</p><h2>{workspace.name}</h2></div>
        <div className="detail-pairs">
          <div><span>Plan</span><strong>{workspace.plan}</strong></div>
          <div><span>Members</span><strong>{workspace.members.length}</strong></div>
          <div><span>Billing state</span><strong>{workspace.billingState}</strong></div>
          <div><span>Slug</span><strong>{workspace.slug}</strong></div>
          <div><span>Created</span><strong>{new Date(workspace.createdAt).toLocaleDateString()}</strong></div>
          <div><span>Billing provider</span><strong>{workspace.billingProvider}</strong></div>
        </div>
      </section>

      <section className="panel">
        <div className="table-header"><div><h2>Team members</h2><p>Users with access to this workspace.</p></div></div>
        <div className="data-table">
          <div className="data-table-row data-table-head"><span>Name</span><span>Email</span><span>Role</span><span>Joined</span></div>
          {users.map((user) => {
            const member = workspace.members.find((m) => m.userId === user.id);
            return (
              <div key={user.id} className="data-table-row">
                <span>{user.displayName}</span><span>{user.email}</span><span>{member?.role ?? 'viewer'}</span><span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <div className="table-header"><div><h2>Connected accounts</h2><p>Social and publishing accounts linked to this workspace.</p></div></div>
        <div className="metric-grid">
          <MetricCard label="Connected" value={String(activeAccounts.length)} detail="Active connections." />
          <MetricCard label="Expired" value={String(connectedAccounts.filter((a) => a.status === 'expired').length)} detail="Need re-authentication." />
          <MetricCard label="Total" value={String(connectedAccounts.length)} detail="Across all platforms." />
          <MetricCard label="Platforms" value={String(new Set(connectedAccounts.map((a) => a.platform)).size)} detail="Distinct platforms." />
        </div>
        <div className="data-table">
          <div className="data-table-row data-table-head"><span>Account</span><span>Platform</span><span>Status</span><span>Capabilities</span></div>
          {connectedAccounts.map((account) => (
            <div key={account.id} className="data-table-row">
              <span>{account.displayName} ({account.handle})</span>
              <span>{account.platform}</span>
              <span><span className={`status-pill ${account.status === 'connected' ? 'status-foundation' : 'status-later'}`}>{account.status}</span></span>
              <span>{account.capabilities.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="table-header"><div><h2>Approval workflow</h2><p>Pending approvals and recent decisions.</p></div></div>
        <div className="metric-grid">
          <MetricCard label="Pending" value={String(pendingApprovals.length)} detail="Waiting for review." />
          <MetricCard label="Approved" value={String(approvals.filter((a) => a.state === 'approved').length)} detail="Recently approved." />
          <MetricCard label="Rejected" value={String(approvals.filter((a) => a.state === 'rejected').length)} detail="Recently rejected." />
          <MetricCard label="Revision requested" value={String(approvals.filter((a) => a.state === 'revision-requested').length)} detail="Needs changes." />
        </div>
        {approvals.length > 0 && (
          <div className="recommendation-list">
            {approvals.map((a) => (
              <article key={a.id} className="recommendation-card">
                <div className="tag-row">
                  <span className={`status-pill ${a.state === 'approved' ? 'status-foundation' : a.state === 'pending' ? 'status-next' : 'status-later'}`}>{a.state}</span>
                  <span className="status-pill status-later">{a.entityType}</span>
                </div>
                <p style={{ marginTop: '0.5rem' }}>{a.comment || 'No comment.'}</p>
                {a.decidedAt && <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Decided: {new Date(a.decidedAt).toLocaleString()}</p>}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="panel">
        <div className="table-header"><div><h2>Platform capability registry</h2><p>What each platform supports for publishing and automation.</p></div></div>
        <div className="data-table">
          <div className="data-table-row data-table-head"><span>Platform</span><span>Type</span><span>Publish</span><span>Auto-publish</span></div>
          {platformCapabilities.map((cap) => (
            <div key={`${cap.platform}-${cap.type}`} className="data-table-row">
              <span>{cap.platform}</span>
              <span>{cap.type}</span>
              <span>{cap.creationSupport ? 'Yes' : 'No'}</span>
              <span>{cap.fireAndForgetSupport ? <span className="status-pill status-foundation">yes</span> : cap.reviewFirstRecommended ? <span className="status-pill status-next">review first</span> : <span className="status-pill status-later">no</span>}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="table-header"><div><h2>Platform integrations</h2><p>Infrastructure services powering this workspace.</p></div></div>
        <div className="detail-pairs">
          <div><span>Firebase Auth</span><strong>{platformStatus.firebase.authConfigured ? 'Configured' : 'Not configured'}</strong></div>
          <div><span>Firebase Admin</span><strong>{platformStatus.firebase.adminConfigured ? 'Configured' : 'Not configured'}</strong></div>
          <div><span>Content Engine</span><strong>{platformStatus.contentEngine.configured ? 'Configured' : 'Not configured'}</strong></div>
        </div>
      </section>
    </AppShell>
  );
}
