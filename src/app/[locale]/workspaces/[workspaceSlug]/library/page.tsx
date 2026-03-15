import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { AssetUploadPanel } from '@/components/asset-upload-panel';
import { CollectionTable } from '@/components/collection-table';
import { MetricCard } from '@/components/metric-card';
import { createAssetAction, importAssetFromUrlAction } from '../actions';
import { getAssets, getAssetFolders, getWorkspaceBySlug } from '@/lib/repositories';
import { hasAdminConfig } from '@/lib/firebase-admin';
import { workspaceAssetPath } from '@/lib/workspace-routing';

type LibraryParams = {
  params: Promise<{ workspaceSlug: string }>;
  searchParams: Promise<{ platform?: string; status?: string; tag?: string; folder?: string }>;
};

export default async function WorkspaceLibraryPage({ params, searchParams }: LibraryParams) {
  const { workspaceSlug } = await params;
  const filters = await searchParams;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [allAssets, folders] = await Promise.all([
    getAssets(workspace.id),
    getAssetFolders(workspace.id),
  ]);
  const action = createAssetAction.bind(null, workspace.slug);
  const importAction = importAssetFromUrlAction.bind(null, workspace.slug);

  let assets = allAssets;

  if (filters.platform) {
    assets = assets.filter((a) => a.platform === filters.platform);
  }
  if (filters.status) {
    assets = assets.filter((a) => a.status === filters.status);
  }
  if (filters.tag) {
    assets = assets.filter((a) => a.tags.includes(filters.tag as typeof a.tags[number]));
  }
  if (filters.folder) {
    const folder = folders.find((f) => f.id === filters.folder);
    if (folder) {
      const folderAssetSet = new Set(folder.assetIds);
      assets = assets.filter((a) => folderAssetSet.has(a.id));
    }
  }

  const topLevelFolders = folders.filter((f) => !f.parentId);
  const subFolders = (parentId: string) => folders.filter((f) => f.parentId === parentId);

  const readyCount = allAssets.filter((a) => a.status === 'ready').length;
  const withTranscript = allAssets.filter((a) => a.transcriptReady).length;
  const benchmarkEligible = allAssets.filter((a) => a.benchmarkEligible).length;

  return (
    <AppShell
      workspace={workspace}
      title="Asset library"
      description="All uploads, imports, and saved references. Filter by platform, status, or tag. Click an asset for transcript, analysis, and recommendations."
    >
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '2rem' }}>
        {[
          { id: 'all', label: 'Library' },
          { id: 'spy', label: 'Content Spy' },
          { id: 'liked', label: 'Liked Posts' },
          { id: 'collections', label: 'Collections' }
        ].map((tab) => {
          const isActive = (filters as any).tab === tab.id || (!(filters as any).tab && tab.id === 'all');
          return (
            <Link
              key={tab.id}
              href={`/workspaces/${workspaceSlug}/library?tab=${tab.id}`}
              style={{
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 450,
                color: isActive ? 'var(--color-paper-100)' : 'var(--color-paper-200)',
                textDecoration: 'none',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {(filters as any).tab === 'spy' ? (
        <section className="panel" style={{ padding: '3rem', textAlign: 'center', background: 'linear-gradient(rgba(20,20,25,0.8), rgba(10,10,15,0.9)), url(/hero-visual.png)', backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgba(214,100,40,0.15)', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', minHeight: '400px' }}>
          <span style={{ fontSize: '3rem' }}>🔒</span>
          <div>
            <span style={{ fontSize: '0.65rem', fontWeight: 'bold', background: 'rgba(214,100,40,0.2)', color: 'var(--color-accent-400)', padding: '0.25rem 0.75rem', borderRadius: '99px', letterSpacing: '0.05em' }}>PRO FEATURE</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>Track Your Competitors</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-paper-200)', maxWidth: '400px', margin: '0 auto' }}>Get insights into what's working for top creators in your niche and steal winning content strategies.</p>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--color-paper-100)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>✅ Spy on your competitors</li>
            <li>✅ Steal winning content strategies</li>
            <li>✅ Get alerted when your competitors go viral</li>
            <li>✅ Remix their hits into your own content</li>
          </ul>
          <button className="button" style={{ padding: '0.75rem 2rem', fontSize: '0.9rem' }}>Upgrade to Pro</button>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>7-day refund policy, no questions asked • Secure payment via Stripe</p>
        </section>
      ) : (filters as any).tab === 'liked' || (filters as any).tab === 'collections' ? (
        <section className="panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>No {(filters as any).tab} found. Add items to see them here.</p>
        </section>
      ) : (
        <>
          <section className="metric-grid">
        <MetricCard label="Total assets" value={String(allAssets.length)} detail="Across all sources." />
        <MetricCard label="Ready" value={String(readyCount)} detail="Available for analysis." />
        <MetricCard label="With transcript" value={String(withTranscript)} detail="Transcript extracted." />
        <MetricCard label="Viral database ready" value={String(benchmarkEligible)} detail="Can be added to collections." />
      </section>

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Filter assets</h2>
            <p>Narrow the library view by platform, status, or tag.</p>
          </div>
        </div>
        <div className="tag-row">
          <Link
            href={`/workspaces/${workspaceSlug}/library`}
            className={`button-secondary ${!filters.platform && !filters.status && !filters.tag ? 'button' : ''}`}
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none', display: 'inline-block' }}
          >
            All
          </Link>
          {['tiktok', 'instagram', 'youtube'].map((p) => (
            <Link
              key={p}
              href={`/workspaces/${workspaceSlug}/library?platform=${p}`}
              className={`button-secondary ${filters.platform === p ? 'button' : ''}`}
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none', display: 'inline-block' }}
            >
              {p}
            </Link>
          ))}
          {['ready', 'processing', 'draft'].map((s) => (
            <Link
              key={s}
              href={`/workspaces/${workspaceSlug}/library?status=${s}`}
              className={`button-secondary ${filters.status === s ? 'button' : ''}`}
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none', display: 'inline-block' }}
            >
              {s}
            </Link>
          ))}
          {['hook', 'demo', 'cta', 'problem', 'testimonial', 'trend'].map((t) => (
            <Link
              key={t}
              href={`/workspaces/${workspaceSlug}/library?tag=${t}`}
              className={`button-secondary ${filters.tag === t ? 'button' : ''}`}
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none', display: 'inline-block' }}
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      {topLevelFolders.length > 0 && (
        <section className="panel">
          <div className="table-header">
            <div>
              <h2>Folders</h2>
              <p>Organize assets into folders for faster navigation.</p>
            </div>
          </div>
          <div className="tag-row">
            {topLevelFolders.map((folder) => (
              <Link
                key={folder.id}
                href={`/workspaces/${workspaceSlug}/library?folder=${folder.id}`}
                className={`button-secondary ${filters.folder === folder.id ? 'button' : ''}`}
                style={{ padding: '0.65rem 1rem', fontSize: '0.85rem', borderRadius: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: folder.color, display: 'inline-block' }} />
                {folder.name}
                <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>({folder.assetIds.length})</span>
              </Link>
            ))}
          </div>
          {filters.folder && (() => {
            const activeFolder = folders.find((f) => f.id === filters.folder);
            const children = activeFolder ? subFolders(activeFolder.id) : [];
            return children.length > 0 ? (
              <div className="tag-row" style={{ paddingLeft: '1rem' }}>
                {children.map((child) => (
                  <Link
                    key={child.id}
                    href={`/workspaces/${workspaceSlug}/library?folder=${child.id}`}
                    className="button-secondary"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: child.color, display: 'inline-block' }} />
                    {child.name}
                  </Link>
                ))}
              </div>
            ) : null;
          })()}
        </section>
      )}

      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Import from URL</h2>
            <p>Paste a TikTok, Instagram, or YouTube URL to import a video as an asset.</p>
          </div>
        </div>
        <form action={importAction} className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <label className="form-span-full">
            <span>Video URL</span>
            <input name="sourceUrl" type="url" placeholder="https://tiktok.com/@creator/video/1234567890" required />
          </label>
          <label>
            <span>Title</span>
            <input name="title" placeholder="Creator hook breakdown" required />
          </label>
          <label>
            <span>Platform</span>
            <select name="platform" defaultValue="tiktok">
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
            </select>
          </label>
          <button type="submit" className="button" disabled={!hasAdminConfig}>
            Import from URL
          </button>
        </form>
      </section>

      <AssetUploadPanel workspaceSlug={workspace.slug} />

      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Create asset record</h2>
            <p>Manually create an asset record without uploading a file.</p>
          </div>
          {!hasAdminConfig ? (
            <p className="warning-inline">Admin SDK is not configured, so create actions are disabled until env vars are added.</p>
          ) : null}
        </div>

        <form action={action} className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <label>
            <span>Title</span>
            <input name="title" placeholder="New viral candidate" required />
          </label>
          <label>
            <span>Platform</span>
            <select name="platform" defaultValue="tiktok">
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
            </select>
          </label>
          <label>
            <span>Source</span>
            <select name="source" defaultValue="upload">
              <option value="upload">Upload</option>
              <option value="import">Import</option>
              <option value="saved-benchmark">Viral Database Reference</option>
            </select>
          </label>
          <label>
            <span>Duration seconds</span>
            <input name="durationSeconds" type="number" min="1" defaultValue="30" required />
          </label>
          <label className="form-span-full">
            <span>Tags</span>
            <input name="tags" placeholder="hook, demo, cta" />
          </label>
          <button type="submit" className="button" disabled={!hasAdminConfig}>
            Create asset
          </button>
        </form>
      </section>

      <CollectionTable
        title={`Library assets${assets.length !== allAssets.length ? ` (${assets.length} of ${allAssets.length})` : ''}`}
        description="Click an asset to view transcript, scene analysis, and edit recommendations."
        items={assets}
        columns={[
          {
            key: 'title',
            header: 'Asset',
            render: (asset) => (
              <Link href={workspaceAssetPath(workspace.slug, asset.id)} className="inline-link">
                {asset.title}
              </Link>
            ),
          },
          { key: 'platform', header: 'Platform', render: (asset) => asset.platform },
          { key: 'status', header: 'Status', render: (asset) => asset.status },
          { key: 'duration', header: 'Duration', render: (asset) => `${asset.durationSeconds}s` },
        ]}
      />
        </>
      )}
    </AppShell>
  );
}
