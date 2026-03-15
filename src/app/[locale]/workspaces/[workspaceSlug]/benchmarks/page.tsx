import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { CollectionTable } from '@/components/collection-table';
import { MetricCard } from '@/components/metric-card';
import { ContentGallery } from '@/components/content-gallery';
import { createBenchmarkCollectionAction } from '../actions';
import { hasAdminConfig } from '@/lib/firebase-admin';
import { getAssets, getBenchmarkCollections, getAnalysisResults, getWorkspaceBySlug } from '@/lib/repositories';
import { workspaceBenchmarkPath } from '@/lib/workspace-routing';

type BenchmarkParams = {
  params: Promise<{ workspaceSlug: string }>;
  searchParams: Promise<{ focus?: string; platform?: string; q?: string }>;
};

export default async function WorkspaceBenchmarksPage({ params, searchParams }: BenchmarkParams) {
  const { workspaceSlug } = await params;
  const filters = await searchParams;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const [allCollections, assets, analysisResults] = await Promise.all([
    getBenchmarkCollections(workspace.id),
    getAssets(workspace.id),
    getAnalysisResults(workspace.id),
  ]);
  const action = createBenchmarkCollectionAction.bind(null, workspace.slug);

  let collections = allCollections;

  if (filters.focus) {
    collections = collections.filter((c) => c.focus === filters.focus);
  }
  if (filters.platform) {
    const platformAssetIds = new Set(assets.filter((a) => a.platform === filters.platform).map((a) => a.id));
    collections = collections.filter((c) => c.assetIds.some((id) => platformAssetIds.has(id)));
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    collections = collections.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
    );
  }

  const analyzedAssetIds = new Set(analysisResults.map((r) => r.assetId));
  const totalAnalyzed = allCollections.reduce(
    (sum, c) => sum + c.assetIds.filter((id) => analyzedAssetIds.has(id)).length,
    0,
  );

  return (
    <AppShell
      workspace={workspace}
      title="Viral Content Database"
      subtitle="Content References"
      description="Curated high-performing references and breakout hook patterns. Use these collections to accelerate your creative research and remix viral structures."
    >
      <section className="metric-grid">
        <MetricCard label="Collections" value={String(allCollections.length)} detail="Total reference sets." />
        <MetricCard label="Total assets" value={String(allCollections.reduce((s, c) => s + c.assetIds.length, 0))} detail="Across all collections." />
        <MetricCard label="Analyzed" value={String(totalAnalyzed)} detail="Assets with analysis data." />
        <MetricCard label="Focus areas" value={String(new Set(allCollections.map((c) => c.focus)).size)} detail="Distinct focuses." />
      </section>

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Filter references</h2>
            <p>Narrow by focus area, platform, or search by keyword.</p>
          </div>
        </div>
        <div className="tag-row">
          <Link
            href={`/workspaces/${workspaceSlug}/benchmarks`}
            className={`button-secondary ${!filters.focus && !filters.platform && !filters.q ? 'button' : ''}`}
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none', display: 'inline-block' }}
          >
            All
          </Link>
          {['hooks', 'pacing', 'proof', 'cta', 'trend'].map((f) => (
            <Link
              key={f}
              href={`/workspaces/${workspaceSlug}/benchmarks?focus=${f}`}
              className={`button-secondary ${filters.focus === f ? 'button' : ''}`}
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none', display: 'inline-block' }}
            >
              {f}
            </Link>
          ))}
        </div>
        <div className="tag-row">
          {['tiktok', 'instagram', 'youtube'].map((p) => (
            <Link
              key={p}
              href={`/workspaces/${workspaceSlug}/benchmarks?platform=${p}`}
              className={`button-secondary ${filters.platform === p ? 'button' : ''}`}
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none', display: 'inline-block' }}
            >
              {p}
            </Link>
          ))}
        </div>
        <form style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input
            name="q"
            type="search"
            placeholder="Search by name or description..."
            defaultValue={filters.q}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              border: '1px solid var(--panel-border)',
              background: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--color-paper-100)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              outline: 'none',
            }}
          />
          <button type="submit" className="button" style={{ padding: '0.75rem 1.25rem' }}>
            Search
          </button>
        </form>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Try:</span>
          {[
            'TikTok talking head', 
            'Videos with 100k+ views', 
            'Beauty niche trending', 
            'Instagram carousel recipes'
          ].map((suggestion) => (
            <Link 
              key={suggestion}
              href={`/workspaces/${workspaceSlug}/benchmarks?q=${encodeURIComponent(suggestion)}`}
              style={{
                fontSize: '0.7rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '99px',
                padding: '0.35rem 0.75rem',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              className="hover:bg-white/10 hover:text-white"
            >
              {suggestion}
            </Link>
          ))}
        </div>
      </section>

      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Create database collection</h2>
            <p>Use asset ids from the current library to seed a reference set for analysis and remix work.</p>
          </div>
          {!hasAdminConfig ? <p className="warning-inline">Create actions require Admin SDK configuration.</p> : null}
        </div>

        <form action={action} className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <label>
            <span>Title</span>
            <input name="title" placeholder="High-conviction hooks" required />
          </label>
          <label>
            <span>Focus</span>
            <select name="focus" defaultValue="hooks">
              <option value="hooks">Hooks</option>
              <option value="pacing">Pacing</option>
              <option value="proof">Proof</option>
              <option value="cta">CTA</option>
              <option value="trend">Trend</option>
            </select>
          </label>
          <label className="form-span-full">
            <span>Description</span>
            <input name="description" placeholder="Why these references belong together" required />
          </label>
          <label className="form-span-full">
            <span>Asset IDs</span>
            <input
              name="assetIds"
              placeholder={assets.map((asset) => asset.id).join(', ')}
            />
          </label>
          <button type="submit" className="button" disabled={!hasAdminConfig}>
            Create database collection
          </button>
        </form>
      </section>

      <section>
        <div className="table-header" style={{ marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem' }}>Saved collections</h2>
            <p>Collection detail pages act as the anchor for comparison, analysis, and remixing viral patterns.</p>
          </div>
        </div>
        <ContentGallery collections={collections} workspaceSlug={workspaceSlug} />
      </section>

      <section style={{ marginTop: '4rem' }}>
        <div className="table-header" style={{ marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem' }}>{filters.q ? 'Search results' : 'Popular content'}</h2>
            <p>{filters.q ? `Showing content matching "${filters.q}"` : 'High-engagement breakout videos from around the web. Search with natural language above to find answers.'}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {(() => {
            const allVideos = [
              {
                desc: 'MISS JENNIE KIM YOU NEVER MISS 🌹 @JENNIE Beats Solo 4 by @Beats by Dre unboxing! Available September 5th at Apple.com and select Apple stores. #jennieblackpink #jennierubyjane',
                stats: { views: '856.9K', likes: '77.8K', comments: '483' },
                tags: ['Gadgets', 'Talking Head', 'Product Placement'],
                platform: 'TikTok'
              },
              {
                desc: 'Such a cool toy! Amazing gift you can buy on amazon https://amzn.to/3MRnQPI #asmr #toy #amaxing #fyp #gifted',
                stats: { views: '1.3M', likes: '76.3K', comments: '261' },
                tags: ['Toys & Games', 'Hook + Demo', 'Product Placement'],
                platform: 'TikTok'
              },
              {
                desc: 'New skincare routine dropping tonight! Use code SIGMORA for 20% off. #skincare #beauty #morningroutine',
                stats: { views: '93.6K', likes: '12.4K', comments: '740' },
                tags: ['Fashion/Beauty/Skincare', 'Talking Head'],
                platform: 'Instagram'
              },
              {
                desc: 'TikTok fitness motivation: 5am workout routine for maximum energy. #gym #fitness #workout',
                stats: { views: '450K', likes: '45K', comments: '1.2K' },
                tags: ['Health and Fitness', 'Vlog'],
                platform: 'TikTok'
              },
              {
                desc: 'Amazing travel vlog to Switzerland, full guide to scenic routes. #travel #vlog #swiss',
                stats: { views: '220K', likes: '18K', comments: '330' },
                tags: ['Travel', 'Cinematic'],
                platform: 'YouTube'
              }
            ];

            const query = filters.q?.toLowerCase();

            const filtered = query 
              ? allVideos.filter(v => v.desc.toLowerCase().includes(query) || v.tags.some(t => t.toLowerCase().includes(query)))
              : allVideos.slice(0, 2); // Show only 2 initially

            if (filtered.length === 0) {
              return <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No matching videos found.</p>;
            }

            return filtered.map((video, idx) => (
              <div key={idx} className="panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-paper-100)', lineHeight: '1.4', flex: 1 }}>{video.desc}</p>
                
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--color-paper-200)' }}>
                  <span>👁️ {video.stats.views}</span>
                  <span>❤️ {video.stats.likes}</span>
                  <span>💬 {video.stats.comments}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {video.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>{tag}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <Link href={`/workspaces/${workspaceSlug}/studio`} className="button button-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem', textAlign: 'center', textDecoration: 'none' }}>Content Studio</Link>
                  <Link href="#" className="button" style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem', textAlign: 'center', textDecoration: 'none' }}>View on {video.platform}</Link>
                </div>
              </div>
            ));
          })()}
        </div>
      </section>
    </AppShell>
  );
}
