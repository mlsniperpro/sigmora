import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { CollectionTable } from '@/components/collection-table';
import { createCompetitorAccountAction } from '@/app/workspaces/[workspaceSlug]/actions';
import { hasAdminConfig } from '@/lib/firebase-admin';
import { getCompetitorAccounts, getWorkspaceBySlug } from '@/lib/repositories';
import { workspaceCompetitorPath } from '@/lib/workspace-routing';

type CompetitorsParams = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function CompetitorsPage({ params }: CompetitorsParams) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const competitors = await getCompetitorAccounts(workspace.id);
  const action = createCompetitorAccountAction.bind(null, workspace.slug);

  const highPriority = competitors.filter((c) => c.watchlistPriority === 'high');

  return (
    <AppShell
      workspace={workspace}
      title="Competitor intelligence"
      description="Monitor competitor accounts, track their content patterns, hook styles, and engagement rates. Use insights to inform your own creative strategy."
    >
      <section className="metric-grid">
        <div className="panel metric-card">
          <p className="metric-label">Tracked accounts</p>
          <h2>{competitors.length}</h2>
          <p>Across all platforms.</p>
        </div>
        <div className="panel metric-card">
          <p className="metric-label">High priority</p>
          <h2>{highPriority.length}</h2>
          <p>Accounts marked for close monitoring.</p>
        </div>
        <div className="panel metric-card">
          <p className="metric-label">Avg engagement</p>
          <h2>
            {competitors.length > 0
              ? (competitors.reduce((sum, c) => sum + c.avgEngagementRate, 0) / competitors.length).toFixed(1)
              : '0'}%
          </h2>
          <p>Across tracked accounts.</p>
        </div>
        <div className="panel metric-card">
          <p className="metric-label">Platforms</p>
          <h2>{new Set(competitors.map((c) => c.platform)).size}</h2>
          <p>Distinct platforms covered.</p>
        </div>
      </section>

      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Add competitor account</h2>
            <p>Start tracking a new creator or brand account.</p>
          </div>
        </div>
        <form action={action} className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <label>
            <span>Handle</span>
            <input name="handle" placeholder="@competitor" required />
          </label>
          <label>
            <span>Display name</span>
            <input name="displayName" placeholder="Competitor Name" required />
          </label>
          <label>
            <span>Platform</span>
            <select name="platform" defaultValue="tiktok">
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="x">X</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </label>
          <label>
            <span>Priority</span>
            <select name="watchlistPriority" defaultValue="medium">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label>
            <span>Follower count</span>
            <input name="followerCount" type="number" min="0" defaultValue="0" />
          </label>
          <label>
            <span>Avg views</span>
            <input name="avgViews" type="number" min="0" defaultValue="0" />
          </label>
          <label>
            <span>Engagement rate (%)</span>
            <input name="avgEngagementRate" type="number" min="0" step="0.1" defaultValue="0" />
          </label>
          <label>
            <span>Posting frequency</span>
            <input name="postingFrequency" placeholder="2x daily" />
          </label>
          <label className="form-span-full">
            <span>Top hook style</span>
            <input name="topHookStyle" placeholder="Pattern interrupt with text overlay" />
          </label>
          <label className="form-span-full">
            <span>Notes</span>
            <input name="notes" placeholder="Key observations about this account" />
          </label>
          <button type="submit" className="button" disabled={!hasAdminConfig}>
            Add account
          </button>
        </form>
      </section>

      <CollectionTable
        title="Watchlist"
        description="Tracked accounts sorted by watchlist priority. Click to see detailed intelligence."
        items={competitors}
        columns={[
          {
            key: 'account',
            header: 'Account',
            render: (c) => (
              <Link href={workspaceCompetitorPath(workspace.slug, c.id)} className="inline-link">
                {c.displayName} ({c.handle})
              </Link>
            ),
          },
          { key: 'platform', header: 'Platform', render: (c) => c.platform },
          { key: 'engagement', header: 'Engagement', render: (c) => `${c.avgEngagementRate}%` },
          { key: 'priority', header: 'Priority', render: (c) => c.watchlistPriority },
        ]}
      />
    </AppShell>
  );
}
