import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { CollectionTable } from '@/components/collection-table';
import { MetricCard } from '@/components/metric-card';
import { getCampaigns, getConnectedAccounts, getPlaybooks, getWorkspaceBySlug } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

type CampaignsParams = { params: Promise<{ workspaceSlug: string }> };

export default async function CampaignsPage({ params }: CampaignsParams) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [campaigns, accounts, playbooks] = await Promise.all([
    getCampaigns(workspace.id),
    getConnectedAccounts(workspace.id),
    getPlaybooks(workspace.id),
  ]);

  const active = campaigns.filter((c) => c.status === 'active').length;
  const scheduled = campaigns.filter((c) => c.status === 'scheduled').length;

  return (
    <AppShell workspace={workspace} title="Campaigns" description="Create and manage multi-platform publishing campaigns. Map creative plans to connected accounts with scheduling and automation controls.">
      <section className="metric-grid">
        <MetricCard label="Total campaigns" value={String(campaigns.length)} detail="All campaigns." />
        <MetricCard label="Active" value={String(active)} detail="Currently running." />
        <MetricCard label="Scheduled" value={String(scheduled)} detail="Waiting to launch." />
        <MetricCard label="Connected accounts" value={String(accounts.filter((a) => a.status === 'connected').length)} detail="Available for publishing." />
      </section>

      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Create campaign</h2>
            <p>Assemble connected accounts, remix outputs, and scheduling into a multi-platform campaign.</p>
          </div>
        </div>
        <form action={`/workspaces/${workspaceSlug}/campaigns`} className="entity-form">
          <label><span>Title</span><input name="title" placeholder="Q2 Product Launch" required /></label>
          <label>
            <span>Automation mode</span>
            <select name="automationMode" defaultValue="review-first">
              <option value="manual">Manual</option>
              <option value="review-first">Review first</option>
              <option value="fire-and-forget">Fire and forget</option>
            </select>
          </label>
          <label className="form-span-full"><span>Description</span><input name="description" placeholder="Multi-platform campaign for..." required /></label>
          <label><span>Platforms (comma-separated)</span><input name="platforms" placeholder="tiktok, instagram" /></label>
          <label>
            <span>Playbook (optional)</span>
            <select name="playbookId" defaultValue="">
              <option value="">None</option>
              {playbooks.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </label>
          <label><span>Schedule date</span><input name="scheduledAt" type="datetime-local" /></label>
          <button type="submit" className="button" disabled>Create campaign</button>
        </form>
      </section>

      <CollectionTable
        title="All campaigns"
        description="Click a campaign to view connected accounts, queue items, and delivery status."
        items={campaigns}
        columns={[
          { key: 'title', header: 'Campaign', render: (c) => <Link href={`${workspacePath(workspace.slug, 'campaigns')}/${c.id}`} className="inline-link">{c.title}</Link> },
          { key: 'platforms', header: 'Platforms', render: (c) => c.platforms.join(', ') },
          { key: 'mode', header: 'Mode', render: (c) => c.automationMode },
          { key: 'status', header: 'Status', render: (c) => c.status },
        ]}
      />
    </AppShell>
  );
}
