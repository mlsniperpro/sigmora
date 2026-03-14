import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Video Retention Analysis Software',
  description:
    'Analyze short-form video retention, understand hook drop-off, and turn performance patterns into better scripts with Sigmora.',
  alternates: {
    canonical: '/retention-analysis',
  },
};

export default function RetentionAnalysisPage() {
  return (
    <main className="sigmora-shell" style={{ paddingBottom: '6rem' }}>
      <Navbar />
      <section className="section-block" style={{ paddingTop: '7rem', maxWidth: '860px' }}>
        <p className="eyebrow">Retention Analysis</p>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.8rem)' }}>Video retention analysis for short-form teams</h1>
        <p className="hero-summary" style={{ fontSize: '1.15rem', maxWidth: '720px' }}>
          Sigmora helps creators and growth teams inspect where attention drops, understand why a video holds, and convert those findings into the next script or scene plan.
        </p>
        <div className="hero-actions">
          <Link href="/signup" className="button">Start free</Link>
          <Link href="/resources" className="button button-secondary">Read resources</Link>
        </div>
      </section>

      <section className="section-block">
        <div className="principles-grid">
          <div className="panel">
            <h2>What Sigmora surfaces</h2>
            <p>Hook strength, pacing risk, proof timing, and CTA placement in a structure that is usable by operators, not just analysts.</p>
          </div>
          <div className="panel">
            <h2>Why teams use it</h2>
            <p>It shortens the gap between noticing a good video and shipping a better version of the underlying pattern.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
