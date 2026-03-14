import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Viral Video Database for Short-Form Research',
  description:
    'Browse a viral video database for TikTok, Reels, and Shorts, then bring winning references directly into Sigmora for analysis and remixing.',
  alternates: {
    canonical: '/viral-database',
  },
};

export default function ViralDatabasePage() {
  return (
    <main className="sigmora-shell" style={{ paddingBottom: '6rem' }}>
      <Navbar />
      <section className="section-block" style={{ paddingTop: '7rem', maxWidth: '860px' }}>
        <p className="eyebrow">Viral Database</p>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.8rem)' }}>A viral video database built for action, not inspiration hoarding</h1>
        <p className="hero-summary" style={{ fontSize: '1.15rem', maxWidth: '720px' }}>
          Sigmora helps teams research TikTok, Instagram Reels, and YouTube Shorts, then move directly from reference discovery into retention analysis and remix execution.
        </p>
        <div className="hero-actions">
          <Link href="/signup" className="button">Start with a reference</Link>
          <Link href="/resources" className="button button-secondary">Read guides</Link>
        </div>
      </section>

      <section className="section-block">
        <div className="principles-grid">
          <div className="panel">
            <h2>Research faster</h2>
            <p>Track winning patterns across short-form platforms without losing the thread between research and execution.</p>
          </div>
          <div className="panel">
            <h2>Use the reference immediately</h2>
            <p>Bring a post into your workspace, inspect its structure, and convert it into an operational creative asset.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
