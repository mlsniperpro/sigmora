import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { getCompetitorAccountById, getWorkspaceBySlug } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

type CompetitorDetailParams = {
  params: Promise<{ workspaceSlug: string; competitorId: string }>;
};

export default async function CompetitorDetailPage({ params }: CompetitorDetailParams) {
  const { workspaceSlug, competitorId } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const competitor = await getCompetitorAccountById(workspace.id, competitorId);

  if (!competitor) {
    notFound();
  }

  return (
    <AppShell
      workspace={workspace}
      title={competitor.displayName}
      description={`Intelligence report for ${competitor.handle} on ${competitor.platform}. Last scanned ${new Date(competitor.lastScannedAt).toLocaleDateString()}.`}
    >
      <section className="panel detail-grid">
        <div>
          <div className="tag-row">
            <span className={`status-pill ${competitor.watchlistPriority === 'high' ? 'status-foundation' : competitor.watchlistPriority === 'medium' ? 'status-next' : 'status-later'}`}>
              {competitor.watchlistPriority} priority
            </span>
            <span className="status-pill status-later">{competitor.platform}</span>
          </div>
          <h2>{competitor.handle}</h2>
        </div>
        <div className="detail-pairs">
          <div><span>Followers</span><strong>{competitor.followerCount.toLocaleString()}</strong></div>
          <div><span>Avg views</span><strong>{competitor.avgViews.toLocaleString()}</strong></div>
          <div><span>Engagement rate</span><strong>{competitor.avgEngagementRate}%</strong></div>
          <div><span>Posting frequency</span><strong>{competitor.postingFrequency}</strong></div>
          <div><span>Top hook style</span><strong>{competitor.topHookStyle}</strong></div>
          <div><span>Last scanned</span><strong>{new Date(competitor.lastScannedAt).toLocaleDateString()}</strong></div>
        </div>
      </section>

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Analyst notes</h2>
            <p>Observations and strategic insights about this account.</p>
          </div>
          <Link href={workspacePath(workspace.slug, 'competitors')} className="button button-secondary">
            Back to watchlist
          </Link>
        </div>
        <div className="recommendation-card">
          <p>{competitor.notes || 'No notes recorded yet.'}</p>
        </div>
      </section>

      <section className="panel">
        <div className="table-header">
          <div>
            <h2>Content patterns</h2>
            <p>Structural analysis of this account&apos;s top-performing content.</p>
          </div>
        </div>
        <div className="recommendation-list">
          <article className="recommendation-card">
            <h3>Hook strategy</h3>
            <p>{competitor.topHookStyle}. This account consistently opens with high-tension pattern interrupts that create immediate curiosity gaps.</p>
          </article>
          <article className="recommendation-card">
            <h3>Posting cadence</h3>
            <p>Posts {competitor.postingFrequency}. With {competitor.avgViews.toLocaleString()} average views, this frequency suggests strong content-market fit and established audience expectation.</p>
          </article>
          <article className="recommendation-card">
            <h3>Engagement analysis</h3>
            <p>At {competitor.avgEngagementRate}% engagement rate with {competitor.followerCount.toLocaleString()} followers, this account {competitor.avgEngagementRate > 4 ? 'exceeds' : competitor.avgEngagementRate > 2 ? 'meets' : 'falls below'} the platform average for accounts of this size.</p>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
