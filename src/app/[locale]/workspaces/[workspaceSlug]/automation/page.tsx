import { AppShell } from '@/components/app-shell';
import { CollectionTable } from '@/components/collection-table';
import { MetricCard } from '@/components/metric-card';
import { AutomationPanel } from '@/components/automation-panel';
import { getWatchlistAccounts, getWorkspaceBySlug } from '@/lib/repositories';

type Params = { params: Promise<{ workspaceSlug: string }> };

export default async function AutomationPage({ params }: Params) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const watchlist = await getWatchlistAccounts(workspace.id);

  const active = watchlist.filter((w) => w.status === 'active');
  const totalScanned = watchlist.reduce((sum, w) => sum + w.postsScanned, 0);
  const totalGenerated = watchlist.reduce((sum, w) => sum + w.contentsGenerated, 0);

  return (
    <AppShell workspace={workspace} title="Automation" description="Manage inspiration account watchlists, recurring research jobs, and autopilot content generation. Monitor accounts for patterns and automatically generate content plans.">
      <section className="metric-grid">
        <MetricCard label="Watchlist accounts" value={String(watchlist.length)} detail="Inspiration accounts tracked." />
        <MetricCard label="Active" value={String(active.length)} detail="Currently researching." />
        <MetricCard label="Posts scanned" value={String(totalScanned)} detail="Total across all accounts." />
        <MetricCard label="Contents generated" value={String(totalGenerated)} detail="From extracted patterns." />
      </section>

      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Add to watchlist</h2>
            <p>Monitor a creator or brand account for recurring research and pattern extraction.</p>
          </div>
        </div>
        <form className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <label><span>Handle</span><input name="handle" placeholder="@creatorname" required /></label>
          <label><span>Display name</span><input name="displayName" placeholder="Creator Name" required /></label>
          <label>
            <span>Platform</span>
            <select name="platform" defaultValue="tiktok">
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
            </select>
          </label>
          <label>
            <span>Automation mode</span>
            <select name="automationMode" defaultValue="review-first">
              <option value="manual">Manual — research only, no generation</option>
              <option value="review-first">Review first — generate, then review before publishing</option>
              <option value="fire-and-forget">Fire and forget — auto-generate and queue</option>
            </select>
          </label>
          <label>
            <span>Research frequency</span>
            <select name="researchFrequency" defaultValue="weekly">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
            </select>
          </label>
          <button type="submit" className="button" disabled>Add to watchlist</button>
        </form>
      </section>

      <AutomationPanel />

      <CollectionTable
        title="Inspiration watchlist"
        description="Accounts being monitored for content patterns and trend signals."
        items={watchlist}
        columns={[
          { key: 'account', header: 'Account', render: (w) => `${w.displayName} (${w.handle})` },
          { key: 'platform', header: 'Platform', render: (w) => w.platform },
          { key: 'mode', header: 'Mode', render: (w) => w.automationMode },
          { key: 'status', header: 'Status', render: (w) => w.status },
        ]}
      />

      {watchlist.length > 0 && (
        <section className="panel">
          <div className="table-header"><div><h2>Watchlist detail</h2><p>Research activity and generation stats per account.</p></div></div>
          <div className="recommendation-list">
            {watchlist.map((w) => (
              <article key={w.id} className="recommendation-card">
                <div className="tag-row">
                  <span className={`status-pill ${w.status === 'active' ? 'status-foundation' : 'status-later'}`}>{w.status}</span>
                  <span className="status-pill status-later">{w.platform}</span>
                  <span className="status-pill status-later">{w.automationMode}</span>
                  <span className="status-pill status-later">{w.researchFrequency}</span>
                </div>
                <h3 style={{ marginTop: '0.5rem' }}>{w.displayName} ({w.handle})</h3>
                <div className="detail-pairs" style={{ marginTop: '0.75rem' }}>
                  <div><span>Posts scanned</span><strong>{w.postsScanned}</strong></div>
                  <div><span>Patterns extracted</span><strong>{w.patternsExtracted}</strong></div>
                  <div><span>Contents generated</span><strong>{w.contentsGenerated}</strong></div>
                  <div><span>Last research</span><strong>{w.lastResearchAt ? new Date(w.lastResearchAt).toLocaleDateString() : 'Never'}</strong></div>
                  <div><span>Next research</span><strong>{w.nextResearchAt ? new Date(w.nextResearchAt).toLocaleDateString() : 'Not scheduled'}</strong></div>
                  <div><span>Frequency</span><strong>{w.researchFrequency}</strong></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
}
