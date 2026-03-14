import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getCurrentWorkspace } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';
import { FAQSection } from '@/components/faq-section';
import { PricingSection } from '@/components/pricing-section';
import { Navbar } from '@/components/navbar';
import { JsonLd } from '@/components/json-ld';
import { ComparisonSection } from '@/components/comparison-section';
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
    <>
      <JsonLd />
      
      {/* Premium Background Elements - Full Screen */}
      <div className="mesh-gradient">
        <div className="bg-grid" />
      </div>

      <Navbar />

      <main className="sigmora-shell" style={{ padding: '0 0 6rem', position: 'relative' }}>

      {/* 1. Enhanced Hero Section */}
      <section className="hero" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="hero-copy">
          <div className="animate-fade-in-up" style={{ marginBottom: '1.5rem' }}>
            <p className="eyebrow" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: 'var(--glass-bg)', 
              padding: '8px 20px', 
              borderRadius: '99px', 
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px var(--glass-shadow)'
            }}>
              <span className="animate-pulse" style={{ width: '8px', height: '8px', background: '#37b5ae', borderRadius: '50%', boxShadow: '0 0 12px #37b5ae' }}></span>
              <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>Retention Intelligence for Short-Form</span>
            </p>
          </div>
          
          <h1 className="animate-fade-in-up delay-100" style={{ 
            fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
            maxWidth: 'none', 
            lineHeight: 1.05, 
            marginTop: '0.5rem',
            letterSpacing: '-0.04em'
          }}>
            Turn winning videos into<br />
            <span style={{ 
              background: 'linear-gradient(135deg, #ea8551 0%, #d66428 100%)', 
              WebkitBackgroundClip: 'text', 
              color: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(214, 100, 40, 0.2))'
            }}>predictable outcomes.</span>
          </h1>
          
          <h2 className="hero-summary animate-fade-in-up delay-200" style={{ 
            fontSize: '1.2rem', 
            maxWidth: '540px', 
            margin: '1.5rem 0 2.5rem', 
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--text-secondary)'
          }}>
            Import one video, inspect the retention structure, and go from scripting to video generation before you spend on a subscription.
          </h2>

          <div className="hero-actions animate-fade-in-up delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/signup" className="button" style={{ padding: '1rem 2.2rem', fontSize: '1.05rem' }}>
              Start Scripting Free
            </Link>
            <Link href="/#how-it-works" className="button button-secondary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              Watch Demo
            </Link>
          </div>
          
          <div className="animate-fade-in-up delay-400" style={{ 
            marginTop: '2rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            color: 'var(--text-muted)', 
            flexWrap: 'wrap',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#37b5ae' }}>⚡</span>
              <span>Unlimited scripts free.</span>
            </div>
            <div style={{ width: '1px', height: '14px', background: 'var(--panel-border)' }} className="hide-on-mobile" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#ea8551' }}>✨</span>
              <span>Instant video remixing.</span>
            </div>
          </div>
        </div>

        <div className="panel animate-fade-in-up delay-300" style={{ 
          padding: '0.5rem', 
          background: 'var(--panel-bg)',
          border: '1px solid var(--panel-border)',
          boxShadow: '0 40px 100px -20px var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          position: 'relative',
          overflow: 'visible',
          width: '100%'
        }}>
          {/* Decorative Glow */}
          <div style={{ 
            position: 'absolute', 
            top: '-20px', 
            right: '-20px', 
            width: '100px', 
            height: '100px', 
            background: 'var(--color-accent-500)', 
            filter: 'blur(60px)', 
            opacity: 0.15,
            zIndex: -1 
          }} />

          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1.1rem', border: '1px solid var(--glass-border)' }}>
            <Image
              src="/hero-visual.png"
              alt="Sigmora workspace showing short-form video analysis and creative planning"
              width={1600}
              height={1200}
              priority
              className="hero-visual"
              style={{ aspectRatio: '4 / 3', height: 'auto', border: 0, borderRadius: '1.1rem', filter: 'brightness(1.1)' }}
            />
            {/* Overlay Gradient */}
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              background: 'linear-gradient(to top, var(--bg-html) 0%, transparent 50%)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
          </div>

          <div style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="eyebrow" style={{ color: 'var(--text-primary)' }}>Interactive Analysis</span>
              <div className="status-pill status-foundation" style={{ fontSize: '0.65rem' }}>Active Engine</div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              The Sigmora engine deconstructs retention signals and generates video variants in one unified loop.
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
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Deconstruct retention signals and generate unlimited scripts from any reference video—completely free. Once your script is ready, use our premium engine to generate the high-retention video variant in seconds.
              </p>
              <Link href="/signup" className="button button-secondary">Start Scripting Free</Link>
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
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
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
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
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
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                “Highly recommend this platform. The team is very familiar in short-form content & is thus able to produce viral content consistently.”
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4.5. Comparison Section */}
      <ComparisonSection />

      {/* 5. Pricing */}
      <PricingSection />

      {/* 6. FAQ */}
      <div style={{ marginTop: '8rem' }}>
        <h2 style={{ display: 'none' }}>Sigmora FAQ: Scaling Your Content Systems</h2>
        <FAQSection />
      </div>

    </main>
    </>
  );
}
