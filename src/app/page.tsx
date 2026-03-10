import Link from 'next/link';
import { getCurrentWorkspace } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';
import { FAQSection } from '@/components/faq-section';
import { PricingSection } from '@/components/pricing-section';
import { Navbar } from '@/components/navbar';

export default async function Home() {
  const workspace = await getCurrentWorkspace();

  return (
    <main className="sigmora-shell" style={{ padding: '0 0 6rem' }}>
      <Navbar />
      {/* 1. Enhanced Hero Section */}
      <section className="hero" style={{ paddingTop: '6rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div className="hero-copy" style={{ maxWidth: '800px', alignItems: 'center' }}>
          <p className="eyebrow animate-fade-in-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 16px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ width: '8px', height: '8px', background: '#37b5ae', borderRadius: '50%', boxShadow: '0 0 10px #37b5ae' }}></span>
            Your Shortcut to Content that Performs
          </p>
          <h1 className="animate-fade-in-up delay-100" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', maxWidth: 'none', lineHeight: 1.1, marginTop: '1rem' }}>
            Make viral videos a system, <br />
            <span style={{ background: 'linear-gradient(to right, #ea8551, #d66428)', WebkitBackgroundClip: 'text', color: 'transparent' }}>not a guess.</span>
          </h1>
          <p className="hero-summary animate-fade-in-up delay-200" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto 2rem' }}>
            Create high-performing content with our AI content scriptwriter and viral database — built for creators, social media managers, growth marketers, and agencies.
          </p>

          <div className="hero-actions animate-fade-in-up delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/signup" className="button" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Get Started Today
            </Link>
            <Link href={workspacePath(workspace.slug, 'dashboard')} className="button button-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Go to Workspace
            </Link>
          </div>
          <p className="animate-fade-in-up delay-400" style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'rgba(245, 241, 232, 0.5)' }}>
            300M+ impressions generated for creators and brands
          </p>
        </div>
      </section>

      {/* 2. How it works (Feature Deep Dive) */}
      <section className="section-block animate-fade-in-up delay-500" style={{ marginTop: '4rem' }}>
        <div className="section-heading" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="eyebrow">How Sigmora Works</p>
          <h2 style={{ fontSize: '2.8rem' }}>Everything you need to go viral</h2>
        </div>

        <div style={{ display: 'grid', gap: '6rem' }}>
          {/* Feature 1 */}
          <div className="feature-split">
            <div>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>AI Content Remixer</h3>
              <p style={{ color: 'rgba(245, 241, 232, 0.72)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Never spend time writing your own viral scripts again. Upload any video or use any viral video from our database. Our AI will analyze why it went viral, and generate a customized content script tailored to your target audience.
              </p>
              <Link href="/signup" className="button button-secondary">Try the Remixer</Link>
            </div>
            <div className="panel" style={{ height: '350px', background: 'linear-gradient(135deg, rgba(214, 100, 40, 0.1), rgba(255,255,255,0.02))', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '-10%', background: '#0a0c10', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p className="eyebrow">Remixer UI Simulation</p>
              </div>
            </div>
          </div>

          {/* Feature 2 (Reversed) */}
          <div className="feature-split reversed">
            <div>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Viral UGC Database</h3>
              <p style={{ color: 'rgba(245, 241, 232, 0.72)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Discover what's working right now on social. Browse hundreds of high-performing posts from software brands — organized by platform, format, and niche. Updated weekly to help you spot trends before they peak.
              </p>
              <Link href="/signup" className="button button-secondary">Explore Database</Link>
            </div>
            <div className="panel" style={{ height: '350px', background: 'linear-gradient(135deg, rgba(24, 138, 132, 0.1), rgba(255,255,255,0.02))', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '-10%', background: '#0a0c10', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p className="eyebrow">Database UI Simulation</p>
              </div>
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
          <h2 style={{ fontSize: '2.5rem' }}>See what our users are saying</h2>
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
        <FAQSection />
      </div>

    </main>
  );
}
