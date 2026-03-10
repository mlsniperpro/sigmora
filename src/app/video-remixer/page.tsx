import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'AI Video Remixer for Short-Form Content',
  description:
    'Use Sigmora as an AI video remixer to turn winning short-form references into scripts, scene plans, and repeatable creative systems.',
  alternates: {
    canonical: '/video-remixer',
  },
};

export default function VideoRemixerPage() {
  return (
    <main className="sigmora-shell" style={{ paddingBottom: '6rem' }}>
      <Navbar />
      <section className="section-block" style={{ paddingTop: '7rem', maxWidth: '860px' }}>
        <p className="eyebrow">AI Video Remixer</p>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.8rem)' }}>Use an AI video remixer that starts from real references</h1>
        <p className="hero-summary" style={{ fontSize: '1.15rem', maxWidth: '720px' }}>
          Instead of generating generic scripts from prompts alone, Sigmora lets you import a real video, analyze what works, and remix that structure into a new execution asset.
        </p>
        <div className="hero-actions">
          <Link href="/signup" className="button">Try the first remix</Link>
          <Link href="/retention-analysis" className="button button-secondary">See analysis workflow</Link>
        </div>
      </section>

      <section className="section-block">
        <div className="principles-grid">
          <div className="panel">
            <h2>Reference-first workflow</h2>
            <p>Start with a winner from your own library or a proven post from the database instead of inventing structure from scratch.</p>
          </div>
          <div className="panel">
            <h2>Execution output</h2>
            <p>Generate a usable script or scene plan you can hand to a creator, editor, or content operator immediately.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
