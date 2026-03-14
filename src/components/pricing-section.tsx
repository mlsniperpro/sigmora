'use client';

import Link from 'next/link';
import { startGuestCheckoutAction } from '@/app/actions/checkout';
import { useTranslations } from 'next-intl';

export function PricingSection() {
    const t = useTranslations('Pricing');
    
    return (
        <section className="section-block animate-fade-in-up" id="pricing" style={{ paddingTop: '4rem' }}>
            <div className="section-heading" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
                <p className="eyebrow">{t('heading.eyebrow')}</p>
                <h2 style={{ fontSize: '2.5rem' }}>{t('heading.title')}</h2>
                <p>{t('heading.description')}</p>
            </div>

            <div className="pricing-grid">
                <div className="panel module-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{t('tiers.activation.name')}</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px', color: 'var(--text-secondary)' }}>{t('tiers.activation.detail')}</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>{t('tiers.activation.price')}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{t('tiers.activation.period')}</span>
                    </div>
                    <Link href="/signup" className="button" style={{ width: '100%', marginBottom: '2rem', textAlign: 'center' }}>
                        {t('tiers.activation.button')}
                    </Link>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>The Hook Layer</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.activation.features.0')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.activation.features.1')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.activation.features.2')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.activation.features.3')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.activation.features.4')}</li>
                        </ul>
                    </div>
                </div>

                {/* Starter Plan */}
                <div className="panel module-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{t('tiers.credits.name')}</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px', color: 'var(--text-secondary)' }}>{t('tiers.credits.detail')}</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>{t('tiers.credits.price')}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{t('tiers.credits.period')}</span>
                    </div>
                    
                    <form action={startGuestCheckoutAction} className="auth-form" style={{ marginBottom: '2rem' }}>
                      <input type="hidden" name="planKey" value="credits_pack" />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="your@email.com" 
                          required 
                          style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                        />
                        <button type="submit" className="button button-secondary" style={{ width: '100%', textAlign: 'center' }}>
                          {t('tiers.credits.button')}
                        </button>
                      </div>
                    </form>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What&apos;s included</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.credits.features.0')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.credits.features.1')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.credits.features.2')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.credits.features.3')}</li>
                        </ul>
                    </div>
                </div>

                {/* Growth Plan (Best Value) */}
                <div className="panel module-card pricing-card best-value" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, var(--color-accent-500), var(--color-accent-400))', color: '#fff', padding: '0.25rem 1rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Recommended
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{t('tiers.growth.name')}</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px', color: 'var(--text-secondary)' }}>{t('tiers.growth.detail')}</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>{t('tiers.growth.price')}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{t('tiers.growth.period')}</span>
                    </div>
                    
                    <form action={startGuestCheckoutAction} className="auth-form" style={{ marginBottom: '2rem' }}>
                      <input type="hidden" name="planKey" value="growth_monthly" />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="your@email.com" 
                          required 
                          style={{ 
                            padding: '0.75rem 1rem', 
                            fontSize: '0.9rem',
                            border: '1px solid rgba(214, 100, 40, 0.2)',
                            background: 'rgba(214, 100, 40, 0.05)'
                          }}
                        />
                        <button type="submit" className="button" style={{ width: '100%', textAlign: 'center' }}>
                          {t('tiers.growth.button')}
                        </button>
                      </div>
                    </form>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What&apos;s included</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.growth.features.0')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.growth.features.1')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.growth.features.2')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.growth.features.3')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.growth.features.4')}</li>
                        </ul>
                    </div>
                </div>

                {/* Enterprise Plan */}
                <div className="panel module-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{t('tiers.enterprise.name')}</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px', color: 'var(--text-secondary)' }}>{t('tiers.enterprise.detail')}</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>{t('tiers.enterprise.price')}</span>
                    </div>
                    <Link href="mailto:sales@sigmora.ai" className="button button-secondary" style={{ width: '100%', marginBottom: '2rem', textAlign: 'center' }}>
                        {t('tiers.enterprise.button')}
                    </Link>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What&apos;s included</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.enterprise.features.0')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.enterprise.features.1')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.enterprise.features.2')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.enterprise.features.3')}</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> {t('tiers.enterprise.features.4')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
