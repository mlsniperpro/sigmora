import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getCurrentWorkspace } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';
import { FAQSection } from '@/components/faq-section';
import { PricingSection } from '@/components/pricing-section';
import { Navbar } from '@/components/navbar';
import { JsonLd } from '@/components/json-ld';
import { homeDescription, homeTitle } from '@/lib/marketing-content';

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sigmora | Analyze retention and remix what works',
    description: homeDescription,
    url: '/',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sigmora retention analysis and video remixing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sigmora | Analyze retention and remix what works',
    description: homeDescription,
    images: ['/twitter-image'],
  },
};

export default async function Home() {
  let workspace = null;

  try {
    workspace = await getCurrentWorkspace();
  } catch {
    // Allow the public landing page to render without workspace context.
  }

  return (
    <main className="sigmora-shell" style={{ padding: '0 0 6rem' }}>
      <JsonLd />
      <Navbar />
      {/* 1. Enhanced Hero Section */}
      <section className="hero" style={{ paddingTop: '6rem', paddingBottom: '4rem', alignItems: 'center' }}>
        <div className="hero-copy" style={{ maxWidth: '680px' }}>
          <p className="eyebrow animate-fade-in-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 16px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ width: '8px', height: '8px', background: '#37b5ae', borderRadius: '50%', boxShadow: '0 0 10px #37b5ae' }}></span>
            Retention analysis and remixing for short-form teams
          </p>
          <h1 className="animate-fade-in-up delay-100" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', maxWidth: 'none', lineHeight: 1.1, marginTop: '1rem' }}>
            Turn winning videos into{' '}
            <span style={{ background: 'linear-gradient(to right, #ea8551, #d66428)', WebkitBackgroundClip: 'text', color: 'transparent' }}>repeatable creative decisions.</span>
          </h1>
          <h2 className="hero-summary animate-fade-in-up delay-200" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '1rem 0 2rem', fontWeight: 400 }}>
            Import one video, inspect the retention structure, and generate your next script or scene plan before you spend on a subscription.
          </h2>

          <div className="hero-actions animate-fade-in-up delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/signup" className="button" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Start Free Activation
            </Link>
            <Link href="/#how-it-works" className="button button-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              See How It Works
            </Link>
          </div>
          <div className="animate-fade-in-up delay-400" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(245, 241, 232, 0.7)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem' }}>Start with one asset, one analysis, and one remix.</span>
            <span style={{ fontSize: '0.85rem' }}>Upgrade only after the workflow sticks.</span>
          </div>
          <p className="animate-fade-in-up delay-500" style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'rgba(245, 241, 232, 0.52)' }}>
            Study proven posts, extract the hook, and move faster from inspiration to production.
          </p>
          {workspace ? (
            <p className="animate-fade-in-up delay-500" style={{ marginTop: '0.35rem', fontSize: '0.82rem', color: 'rgba(245, 241, 232, 0.42)' }}>
              Returning user?{' '}
              <Link href={workspacePath(workspace.slug, 'activate')} style={{ color: '#ea8551', textDecoration: 'none' }}>
                Open your workspace
              </Link>
              .
            </p>
          ) : null}
        </div>

        <div className="panel animate-fade-in-up delay-300" style={{ padding: '0.75rem', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '0.75rem 0.75rem 0 0.75rem', flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.35rem' }}>Product Preview</p>
              <h3 style={{ fontSize: '1.25rem' }}>See the Sigmora workflow before you commit</h3>
            </div>
            <div className="status-pill status-next">Activation Flow</div>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Image
              src="/hero-visual.png"
              alt="Sigmora workspace showing short-form video analysis and creative planning"
              width={1600}
              height={1200}
              priority
              className="hero-visual"
              style={{ aspectRatio: '4 / 3', height: 'auto', border: 0, borderRadius: '1rem' }}
            />
          </div>
          <div style={{ display: 'grid', gap: '0.65rem', padding: '0 0.75rem 0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <span className="eyebrow" style={{ color: '#fff' }}>1. Import a winner</span>
              <span className="eyebrow" style={{ color: '#fff' }}>2. Analyze retention</span>
              <span className="eyebrow" style={{ color: '#fff' }}>3. Remix into a script</span>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'rgba(245, 241, 232, 0.68)' }}>
              Visitors now get the product context in the first screen instead of only reading headline copy.
            </p>
          </div>
        </div>
      </section>

      {/* 2. How it works (Feature Deep Dive) */}
      <section className="section-block animate-fade-in-up delay-500" id="how-it-works" style={{ marginTop: '4rem' }}>
        <div className="section-heading" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="eyebrow">How Sigmora Works</p>
          <h2 style={{ fontSize: '2.8rem' }}>From reference to publishable concept</h2>
        </div>

        <div style={{ display: 'grid', gap: '6rem' }}>
          {/* Feature 1 */}
          <div className="feature-split">
            <div>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>AI Content Remixer</h3>
              <p style={{ color: 'rgba(245, 241, 232, 0.72)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Start with a real reference, not a blank canvas. Upload any video or pull one from the database, then let Sigmora explain the structure and turn it into a usable execution asset.
              </p>
              <Link href="/signup" className="button button-secondary">Try the first loop</Link>
            </div>
            <div className="panel" style={{ height: '400px', background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden', padding: 0 }}>
              <Image
                src="/ai-remixer-preview.png"
                alt="AI Remixer UI Preview"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover', opacity: 0.9 }}
              />
            </div>
          </div>

          {/* Feature 2 (Reversed) */}
          <div className="feature-split reversed">
            <div>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Viral UGC Database</h3>
              <p style={{ color: 'rgba(245, 241, 232, 0.72)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                The database is useful because it shortens time to value. Browse high-performing posts, pull one into your workspace, and move directly into analysis instead of just collecting inspiration.
              </p>
              <Link href="/signup" className="button button-secondary">Import a reference</Link>
            </div>
            <div className="panel" style={{ height: '400px', background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden', padding: 0 }}>
              <Image
                src="/viral-database-preview.png"
                alt="Viral Database UI Preview"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover', opacity: 0.9 }}
              />
            </div>
          </div>

          {/* Background block */}
          <div className="panel" style={{ textAlign: 'center', padding: '4rem 2rem', background: 'radial-gradient(ellipse at top, rgba(214, 100, 40, 0.15), transparent 70%)' }}>
            <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>Built by the Team Behind Hundreds of Millions of Viral Views</h3>
            <p style={{ color: 'rgba(245, 241, 232, 0.72)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              Before building Sigmora, we spent years behind the curtain helping brands generate hundreds of millions of impressions across TikTok, Instagram, and YouTube. Every insight in our viral database and AI remixer tool comes from real campaign insights — not guesswork.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block animate-fade-in-up" style={{ marginTop: '6rem' }}>
        <div className="section-heading" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p className="eyebrow">Explore Use Cases</p>
          <h2 style={{ fontSize: '2.4rem' }}>Built around three search intents</h2>
          <p>Explore the public pages targeting the core ways teams evaluate Sigmora.</p>
        </div>

        <div className="module-grid">
          <Link href="/retention-analysis" className="panel module-card" style={{ textDecoration: 'none' }}>
            <p className="eyebrow">Use Case</p>
            <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>Video Retention Analysis</h3>
            <p>Understand where attention drops and what to keep in the hook, proof, and CTA structure.</p>
          </Link>
          <Link href="/video-remixer" className="panel module-card" style={{ textDecoration: 'none' }}>
            <p className="eyebrow">Use Case</p>
            <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>AI Video Remixer</h3>
            <p>Turn a winning reference into a new script or scene plan without starting from a blank page.</p>
          </Link>
          <Link href="/viral-database" className="panel module-card" style={{ textDecoration: 'none' }}>
            <p className="eyebrow">Use Case</p>
            <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>Viral Video Database</h3>
            <p>Research proven short-form content patterns and move directly into analysis and execution.</p>
          </Link>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="section-block animate-fade-in-up" style={{ marginTop: '8rem' }}>
        <div className="stats-grid">
          <div className="panel" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: '#d66428', marginBottom: '0.5rem' }}>300M+</h3>
            <p className="eyebrow" style={{ color: '#fff' }}>Organic Impressions</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'rgba(245, 241, 232, 0.6)' }}>generated for brands</p>
          </div>
          <div className="panel" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: '#37b5ae', marginBottom: '0.5rem' }}>30x</h3>
            <p className="eyebrow" style={{ color: '#fff' }}>Avg MRR Increase</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'rgba(245, 241, 232, 0.6)' }}>delivered for clients</p>
          </div>
          <div className="panel" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: '#ea8551', marginBottom: '0.5rem' }}>7M+</h3>
            <p className="eyebrow" style={{ color: '#fff' }}>Total Likes</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'rgba(245, 241, 232, 0.6)' }}>across portfolios</p>
          </div>
          <div className="panel" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: '#188a84', marginBottom: '0.5rem' }}>Top 5%</h3>
            <p className="eyebrow" style={{ color: '#fff' }}>Content Expertise</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'rgba(245, 241, 232, 0.6)' }}>elite vetted network</p>
          </div>
        </div>
      </section>

      {/* 4. Wall of Love / Testimonials */}
      <section className="section-block animate-fade-in-up" style={{ marginTop: '8rem' }}>
        <div className="section-heading" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="eyebrow">Wall of Love</p>
          <h2 style={{ fontSize: '2.5rem' }}>What teams say about Sigmora</h2>
        </div>

        <div className="testimonials-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="panel">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#fff' }}>Marketing Manager</h4>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(245, 241, 232, 0.5)' }}>Tech Startup</p>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(245, 241, 232, 0.8)' }}>
                “Highly recommend this platform. The team is very familiar in short-form content & is thus able to produce viral content consistently.”
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Pricing */}
      <PricingSection />

      {/* 6. FAQ */}
      <div style={{ marginTop: '8rem' }}>
        <h2 style={{ display: 'none' }}>Sigmora FAQ: Scaling Your Content Systems</h2>
        <FAQSection />
      </div>

    </main>
  );
}
