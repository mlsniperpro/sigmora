import { AppShell } from '@/components/app-shell';
import { createTrendSnapshotAction } from '@/app/workspaces/[workspaceSlug]/actions';
import { hasAdminConfig } from '@/lib/firebase-admin';
import { getTrendSnapshots, getWorkspaceBySlug } from '@/lib/repositories';

type TrendsParams = {
  params: Promise<{ workspaceSlug: string }>;
};

function velocityLabel(velocity: string) {
  if (velocity === 'rising') return 'status-foundation';
  if (velocity === 'stable') return 'status-next';
  return 'status-later';
}

function saturationLabel(saturation: string) {
  if (saturation === 'low') return 'status-foundation';
  if (saturation === 'medium') return 'status-next';
  return 'status-later';
}

export default async function TrendsPage({ params }: TrendsParams) {
  const { workspaceSlug } = await params;
  const workspace = await getWorkspaceBySlug(workspaceSlug);
  const trends = await getTrendSnapshots(workspace.id);
  const action = createTrendSnapshotAction.bind(null, workspace.slug);

  const risingTrends = trends.filter((t) => t.velocity === 'rising');
  const stableTrends = trends.filter((t) => t.velocity === 'stable');
  const decliningTrends = trends.filter((t) => t.velocity === 'declining');

  return (
    <AppShell
      workspace={workspace}
      title="Trend intelligence"
      description="Emerging formats, hook styles, audio patterns, and narrative structures detected across platforms. Use these signals to time content before saturation."
    >
      <section className="metric-grid">
        <div className="panel metric-card">
          <p className="metric-label">Rising trends</p>
          <h2>{risingTrends.length}</h2>
          <p>Low saturation opportunities to adopt early.</p>
        </div>
        <div className="panel metric-card">
          <p className="metric-label">Stable trends</p>
          <h2>{stableTrends.length}</h2>
          <p>Active patterns still delivering results.</p>
        </div>
        <div className="panel metric-card">
          <p className="metric-label">Declining trends</p>
          <h2>{decliningTrends.length}</h2>
          <p>Saturating patterns to phase out.</p>
        </div>
        <div className="panel metric-card">
          <p className="metric-label">Total signals</p>
          <h2>{trends.length}</h2>
          <p>Tracked across all platforms.</p>
        </div>
      </section>

      <section className="panel form-panel">
        <div className="table-header">
          <div>
            <h2>Log new trend</h2>
            <p>Manually capture an emerging pattern you have spotted.</p>
          </div>
        </div>
        <form action={action} className="entity-form">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <label>
            <span>Title</span>
            <input name="title" placeholder="Whisper-to-Shout Hook" required />
          </label>
          <label>
            <span>Category</span>
            <select name="category" defaultValue="hook-format">
              <option value="hook-format">Hook format</option>
              <option value="audio-trend">Audio trend</option>
              <option value="visual-style">Visual style</option>
              <option value="narrative-pattern">Narrative pattern</option>
              <option value="cta-technique">CTA technique</option>
            </select>
          </label>
          <label>
            <span>Platform</span>
            <select name="platform" defaultValue="tiktok">
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="x">X</option>
              <option value="linkedin">LinkedIn</option>
              <option value="threads">Threads</option>
            </select>
          </label>
          <label>
            <span>Velocity</span>
            <select name="velocity" defaultValue="rising">
              <option value="rising">Rising</option>
              <option value="stable">Stable</option>
              <option value="declining">Declining</option>
            </select>
          </label>
          <label>
            <span>Saturation</span>
            <select name="saturation" defaultValue="low">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            <span>Example count</span>
            <input name="exampleCount" type="number" min="0" defaultValue="0" />
          </label>
          <label className="form-span-full">
            <span>Description</span>
            <input name="description" placeholder="Describe the pattern and why it matters." required />
          </label>
          <label className="form-span-full">
            <span>Recommended action</span>
            <input name="recommendedAction" placeholder="What should the team do with this signal?" required />
          </label>
          <button type="submit" className="button" disabled={!hasAdminConfig}>
            Log trend
          </button>
        </form>
      </section>

      {trends.map((trend) => (
        <section key={trend.id} className="panel detail-grid">
          <div>
            <div className="tag-row">
              <span className={`status-pill ${velocityLabel(trend.velocity)}`}>{trend.velocity}</span>
              <span className={`status-pill ${saturationLabel(trend.saturation)}`}>saturation: {trend.saturation}</span>
              <span className="status-pill status-later">{trend.category}</span>
              <span className="status-pill status-later">{trend.platform}</span>
            </div>
            <h2>{trend.title}</h2>
          </div>
          <p>{trend.description}</p>
          <div className="detail-pairs">
            <div><span>Examples found</span><strong>{trend.exampleCount.toLocaleString()}</strong></div>
            <div><span>Velocity</span><strong>{trend.velocity}</strong></div>
            <div><span>Detected</span><strong>{new Date(trend.detectedAt).toLocaleDateString()}</strong></div>
          </div>
          <div className="recommendation-card">
            <h3>Recommended action</h3>
            <p>{trend.recommendedAction}</p>
          </div>
        </section>
      ))}
    </AppShell>
  );
}
