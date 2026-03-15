import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getCurrentWorkspace } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';
import { FAQSection } from '@/components/faq-section';
import { PricingSection } from '@/components/pricing-section';
import { Navbar } from '@/components/navbar';
import { JsonLd } from '@/components/json-ld';
import { ComparisonSection } from '@/components/comparison-section';
import { homeDescription, homeTitle } from '@/lib/marketing-content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.homepage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
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
      title: t('title'),
      description: t('description'),
      images: ['/twitter-image'],
    },
  };
}

import { getMessages } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('HomePage');
  const messages = (await getMessages()) as any;
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
              <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>{t('hero.eyebrow')}</span>
            </p>
          </div>
          
          <h1 className="animate-fade-in-up delay-100" style={{ 
            fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
            maxWidth: 'none', 
            lineHeight: 1.05, 
            marginTop: '0.5rem',
            letterSpacing: '-0.04em'
          }}>
            {t('title')}
          </h1>
          
          <h2 className="hero-summary animate-fade-in-up delay-200" style={{ 
            fontSize: '1.2rem', 
            maxWidth: '540px', 
            margin: '1.5rem 0 2.5rem', 
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--text-secondary)'
          }}>
            {t('description')}
          </h2>

          <div className="hero-actions animate-fade-in-up delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/signup" className="button" style={{ padding: '1rem 2.2rem', fontSize: '1.05rem' }}>
              {t('buttons.start')}
            </Link>
            <Link href="/#how-it-works" className="button button-secondary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              {t('buttons.watch')}
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
              <span>{t('hero.benefits.scripts')}</span>
            </div>
            <div style={{ width: '1px', height: '14px', background: 'var(--panel-border)' }} className="hide-on-mobile" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#ea8551' }}>✨</span>
              <span>{t('hero.benefits.remixing')}</span>
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
              <span className="eyebrow" style={{ color: 'var(--text-primary)' }}>{t('hero.analysis.title')}</span>
              <div className="status-pill status-foundation" style={{ fontSize: '0.65rem' }}>{t('hero.analysis.badge')}</div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t('hero.analysis.description')}
            </p>
          </div>
        </div>
      </section>

      {/* 2. How it works (Feature Deep Dive) */}
      <section className="section-block animate-fade-in-up delay-500" id="how-it-works" style={{ marginTop: '4rem' }}>
        <div className="section-heading" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="eyebrow">{t('howItWorks.heading.eyebrow')}</p>
          <h2 style={{ fontSize: '2.8rem' }}>{t('howItWorks.heading.title')}</h2>
        </div>

        <div style={{ display: 'grid', gap: '6rem' }}>
          {/* Feature 1 */}
          <div className="feature-split">
            <div>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>{t('howItWorks.features.remixer.title')}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                {t('howItWorks.features.remixer.description')}
              </p>
              <Link href="/signup" className="button button-secondary">{t('howItWorks.features.remixer.button')}</Link>
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
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>{t('howItWorks.features.database.title')}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                {t('howItWorks.features.database.description')}
              </p>
              <Link href="/signup" className="button button-secondary">{t('howItWorks.features.database.button')}</Link>
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
            <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>{t('howItWorks.features.background.title')}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              {t('howItWorks.features.background.description')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-block animate-fade-in-up" style={{ marginTop: '6rem' }}>
        <div className="section-heading" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p className="eyebrow">{t('useCases.heading.eyebrow')}</p>
          <h2 style={{ fontSize: '2.4rem' }}>{t('useCases.heading.title')}</h2>
          <p>{t('useCases.heading.description')}</p>
        </div>

        <div className="module-grid">
          {(messages.HomePage?.useCases?.cards || []).map((card: any, idx: number) => (
            <Link key={idx} href={idx === 0 ? "/retention-analysis" : idx === 1 ? "/video-remixer" : "/viral-database"} className="panel module-card" style={{ textDecoration: 'none' }}>
              <p className="eyebrow">{card.eyebrow}</p>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{card.title}</h3>
              <p>{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="section-block animate-fade-in-up" style={{ marginTop: '8rem' }}>
        <div className="stats-grid">
          {(messages.HomePage?.stats || []).map((stat: any, idx: number) => (
            <div key={idx} className="panel" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: idx === 0 ? '#d66428' : idx === 1 ? '#37b5ae' : idx === 2 ? '#ea8551' : '#188a84', marginBottom: '0.5rem' }}>{stat.value}</h3>
              <p className="eyebrow" style={{ color: 'var(--text-primary)' }}>{stat.label}</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>{stat.subtext}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Wall of Love / Testimonials */}
      <section className="section-block animate-fade-in-up" style={{ marginTop: '8rem' }}>
        <div className="section-heading" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="eyebrow">{t('testimonials.heading.eyebrow')}</p>
          <h2 style={{ fontSize: '2.5rem' }}>{t('testimonials.heading.title')}</h2>
        </div>

        <div className="testimonials-grid">
          {(messages.HomePage?.testimonials?.items || []).map((item: any, i: number) => (
            <div key={i} className="panel">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.role}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.company}</p>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {item.text}
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
