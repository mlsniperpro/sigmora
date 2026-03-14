import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { getBlogDraftsByConnection, getCmsConnectionById, getWorkspaceBySlug } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

type Params = { params: Promise<{ workspaceSlug: string; connectionId: string }> };

export default async function CmsConnectionDetailPage({ params }: Params) {
  const { workspaceSlug, connectionId } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const connection = await getCmsConnectionById(workspace.id, connectionId);
  if (!connection) notFound();

  const drafts = await getBlogDraftsByConnection(workspace.id, connectionId);
  const published = drafts.filter((d) => d.status === 'published');
  const pending = drafts.filter((d) => d.status === 'draft');

  return (
    <AppShell workspace={workspace} title={connection.name} description={`${connection.provider} connection at ${connection.baseUrl}`}>
      <section className="panel detail-grid">
        <div>
          <div className="tag-row">
            <span className={`status-pill ${connection.status === 'connected' ? 'status-foundation' : 'status-later'}`}>{connection.status}</span>
            <span className="status-pill status-later">{connection.provider}</span>
          </div>
          <h2>{connection.baseUrl}</h2>
        </div>
        <div className="detail-pairs">
          <div><span>Provider</span><strong>{connection.provider}</strong></div>
          <div><span>Status</span><strong>{connection.status}</strong></div>
          <div><span>Last sync</span><strong>{connection.lastSyncAt ? new Date(connection.lastSyncAt).toLocaleString() : 'Never'}</strong></div>
          <div><span>Capabilities</span><strong>{connection.capabilities.join(', ')}</strong></div>
          <div><span>Published articles</span><strong>{published.length}</strong></div>
          <div><span>Pending drafts</span><strong>{pending.length}</strong></div>
        </div>
      </section>

      <section className="panel">
        <div className="table-header">
          <div><h2>Articles</h2><p>Content published or drafted for this destination.</p></div>
          <Link href={workspacePath(workspace.slug, 'cms')} className="button button-secondary">Back to CMS</Link>
        </div>
        {drafts.length > 0 ? (
          <div className="recommendation-list">
            {drafts.map((draft) => (
              <article key={draft.id} className="recommendation-card">
                <div className="tag-row">
                  <span className={`status-pill ${draft.status === 'published' ? 'status-foundation' : 'status-later'}`}>{draft.status}</span>
                  <span className="status-pill status-later">{draft.sourceType}</span>
                </div>
                <h3 style={{ marginTop: '0.5rem' }}>{draft.title}</h3>
                <p>{draft.body.slice(0, 300)}{draft.body.length > 300 ? '...' : ''}</p>
                {draft.publishedUrl && <p style={{ marginTop: '0.5rem' }}><a href={draft.publishedUrl} className="inline-link" target="_blank" rel="noreferrer">View published article</a></p>}
                {draft.publishedAt && <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Published: {new Date(draft.publishedAt).toLocaleString()}</p>}
              </article>
            ))}
          </div>
        ) : <p>No articles for this destination yet.</p>}
      </section>
    </AppShell>
  );
}
