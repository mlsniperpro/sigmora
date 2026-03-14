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
    </AppShell>
  );
}
