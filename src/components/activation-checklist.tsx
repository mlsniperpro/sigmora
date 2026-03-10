import Link from 'next/link';
import type { ActivationSnapshot } from '@/lib/activation';

type ActivationChecklistProps = {
  title: string;
  description: string;
  snapshot: ActivationSnapshot;
  workspaceSlug: string;
  primaryAssetId?: string;
  benchmarkCollectionId?: string;
  showLaunchLink?: boolean;
};

export function ActivationChecklist({
  title,
  description,
  snapshot,
  workspaceSlug,
  primaryAssetId,
  benchmarkCollectionId,
  showLaunchLink = false,
}: ActivationChecklistProps) {
  const ctaByStep = {
    asset: `/workspaces/${workspaceSlug}/library`,
    analysis: primaryAssetId ? `/workspaces/${workspaceSlug}/library/${primaryAssetId}` : `/workspaces/${workspaceSlug}/library`,
    remix: benchmarkCollectionId
      ? `/workspaces/${workspaceSlug}/jobs?benchmarkCollectionId=${benchmarkCollectionId}`
      : `/workspaces/${workspaceSlug}/jobs`,
  } as const;

  return (
    <section className="panel" style={{ padding: '2rem' }}>
      <div
        className="table-header"
        style={{ marginBottom: '1.5rem', alignItems: 'flex-start', gap: '1.5rem' }}
      >
        <div>
          <p className="eyebrow">Activation</p>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{title}</h2>
          <p style={{ maxWidth: '48rem' }}>{description}</p>
        </div>
        <div style={{ minWidth: '11rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-paper-300)', marginBottom: '0.5rem' }}>
            {snapshot.completedSteps} of {snapshot.totalSteps} complete
          </p>
          <div
            style={{
              height: '0.65rem',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${snapshot.progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--color-accent-500), var(--color-accent-300))',
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {snapshot.steps.map((step, index) => (
          <article
            key={step.id}
            className="recommendation-card"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.4rem' }}>
                Step {index + 1}
              </p>
              <h3 style={{ marginBottom: '0.4rem' }}>{step.label}</h3>
              <p style={{ color: 'var(--color-paper-200)' }}>{step.description}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <span className={`status-pill ${step.completed ? 'status-foundation' : 'status-later'}`}>
                {step.completed ? 'Complete' : 'Next'}
              </span>
              {!step.completed && (
                <Link href={ctaByStep[step.id]} className="button button-secondary">
                  Open
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {snapshot.isActivated && showLaunchLink ? (
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <p style={{ color: 'var(--color-paper-200)', maxWidth: '40rem' }}>
            The core loop is complete. Billing should now support repeated usage rather than blocking first value.
          </p>
          <Link href={`/workspaces/${workspaceSlug}/dashboard`} className="button">
            Open dashboard
          </Link>
        </div>
      ) : null}
    </section>
  );
}
