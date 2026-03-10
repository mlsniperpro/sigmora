import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { CollectionTable } from '@/components/collection-table';
import { MetricCard } from '@/components/metric-card';
import { CmsConnector } from '@/components/cms-connector';
import { getBlogDrafts, getCmsConnections, getWorkspaceBySlug } from '@/lib/repositories';
import { platformCapabilities } from '@/lib/platform-capabilities';
import { workspacePath } from '@/lib/workspace-routing';

type Params = { params: Promise<{ workspaceSlug: string }> };

export default async function CmsPage({ params }: Params) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [connections, drafts] = await Promise.all([
    getCmsConnections(workspace.id),
    getBlogDrafts(workspace.id),
  ]);

  const cmsCaps = platformCapabilities.filter((p) => p.type === 'cms');
  const publishedDrafts = drafts.filter((d) => d.status === 'published');
  const pendingDrafts = drafts.filter((d) => d.status === 'draft');

  return (
    <AppShell workspace={workspace} title="CMS & Blog publishing" description="Connect CMS and blog platforms, generate articles from video content, and publish to owned-media destinations.">
      <section className="metric-grid">
        <MetricCard label="CMS connections" value={String(connections.length)} detail="Blog and website destinations." />
        <MetricCard label="Active" value={String(connections.filter((c) => c.status === 'connected').length)} detail="Ready to publish." />
        <MetricCard label="Blog drafts" value={String(pendingDrafts.length)} detail="Waiting to be published." />
        <MetricCard label="Published" value={String(publishedDrafts.length)} detail="Articles live." />
      </section>

      <CmsConnector />

      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Create blog draft</h2>
            <p>Generate an article from video content, remix outputs, or write manually.</p>
          </div>
        </div>
        <form className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <label><span>Title</span><input name="title" placeholder="How to Structure a Product Demo Video" required /></label>
          <label>
            <span>Destination</span>
            <select name="cmsConnectionId" defaultValue={connections[0]?.id}>
              {connections.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.provider})</option>)}
            </select>
          </label>
          <label>
            <span>Source type</span>
            <select name="sourceType" defaultValue="manual">
              <option value="manual">Manual</option>
              <option value="video">From video asset</option>
              <option value="remix">From remix output</option>
              <option value="campaign">From campaign</option>
            </select>
          </label>
          <label className="form-span-full">
            <span>Body</span>
            <textarea name="body" rows={6} placeholder="Write or paste article content..." style={{ width: '100%', padding: '0.95rem 1rem', borderRadius: '1rem', border: '1px solid rgba(245, 241, 232, 0.12)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--color-paper-100)', fontFamily: 'inherit', fontSize: 'inherit', resize: 'vertical' }} />
          </label>
          <button type="submit" className="button" disabled>Create draft</button>
        </form>
      </section>

      <CollectionTable
        title="Blog drafts"
        description="Articles created from video analysis, remixes, or manual writing."
        items={drafts}
        columns={[
          { key: 'title', header: 'Title', render: (d) => d.title },
          { key: 'destination', header: 'Destination', render: (d) => { const c = connections.find((conn) => conn.id === d.cmsConnectionId); return c ? `${c.name} (${c.provider})` : d.cmsConnectionId; } },
          { key: 'status', header: 'Status', render: (d) => d.status },
          { key: 'published', header: 'Published', render: (d) => d.publishedUrl ? <a href={d.publishedUrl} className="inline-link" target="_blank" rel="noreferrer">View</a> : '—' },
        ]}
      />

      <section className="panel">
        <div className="table-header"><div><h2>CMS platform capabilities</h2><p>What each CMS provider supports.</p></div></div>
        <div className="data-table">
          <div className="data-table-row data-table-head"><span>Platform</span><span>Create</span><span>Schedule</span><span>Auto-publish</span></div>
          {cmsCaps.map((cap) => (
            <div key={cap.platform} className="data-table-row">
              <span>{cap.platform}</span>
              <span>{cap.creationSupport ? 'Yes' : 'No'}</span>
              <span>{cap.schedulingSupport ? 'Yes' : 'No'}</span>
              <span>{cap.fireAndForgetSupport ? <span className="status-pill status-foundation">supported</span> : <span className="status-pill status-next">review first</span>}</span>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
