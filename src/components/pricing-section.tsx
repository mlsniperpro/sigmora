'use client';

import Link from 'next/link';
import { startGuestCheckoutAction } from '@/app/actions/checkout';

export function PricingSection() {
    return (
        <section className="section-block animate-fade-in-up" id="pricing" style={{ paddingTop: '4rem' }}>
            <div className="section-heading" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
                <p className="eyebrow">Pricing</p>
                <h2 style={{ fontSize: '2.5rem' }}>Start free. Pay once the loop works.</h2>
                <p>Sigmora should prove value before it asks for commitment. Light users can stay flexible. Heavy users get better economics with a plan.</p>
            </div>

            <div className="pricing-grid">
                <div className="panel module-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Activation</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px', color: 'var(--text-secondary)' }}>Perfect for creators to find their hook and script their next winning post for free.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>$0</span>
                        <span style={{ color: 'var(--text-muted)' }}>/forever</span>
                    </div>
                    <Link href="/signup" className="button" style={{ width: '100%', marginBottom: '2rem', textAlign: 'center' }}>Start Scripting Free</Link>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>The Hook Layer</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Unlimited Script Generations</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Unlimited Scene Planning</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> 3 Deep Retention Breakdowns</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> 1 Premium Video Remix (Trial)</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Full Viral Database Access</li>
                        </ul>
                    </div>
                </div>

                {/* Starter Plan */}
                <div className="panel module-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Credit Packs</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px', color: 'var(--text-secondary)' }}>Best for occasional operators who want control without a recurring commitment.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>Flexible</span>
                        <span style={{ color: 'var(--text-muted)' }}>/one-time</span>
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
                          Start with usage
                        </button>
                      </div>
                    </form>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What&apos;s included</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Buy credits only when you need more volume</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Keep occasional research and remix workflows alive</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Avoid paying for idle months</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Ideal for sporadic creator and operator use</li>
                        </ul>
                    </div>
                </div>

                {/* Growth Plan (Best Value) */}
                <div className="panel module-card pricing-card best-value" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, var(--color-accent-500), var(--color-accent-400))', color: '#fff', padding: '0.25rem 1rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Recommended
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Growth</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px', color: 'var(--text-secondary)' }}>For teams that already use Sigmora repeatedly and want better unit economics.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>$149</span>
                        <span style={{ color: 'var(--text-muted)' }}>/month</span>
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
                          Unlock better economics
                        </button>
                      </div>
                    </form>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What&apos;s included</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.9)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> 50,000 AI credits each month</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Lower effective cost than repeated credit packs</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Priority analysis and remix throughput</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Team collaboration for five seats</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Billing only makes sense once the habit exists</li>
                        </ul>
                    </div>
                </div>

                {/* Enterprise Plan */}
                <div className="panel module-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Enterprise</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px', color: 'var(--text-secondary)' }}>For large organizations requiring custom scale and tailored solutions.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>Custom</span>
                    </div>
                    <Link href="mailto:sales@sigmora.ai" className="button button-secondary" style={{ width: '100%', marginBottom: '2rem', textAlign: 'center' }}>Contact Sales</Link>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What&apos;s included</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Custom Credit Volume</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Unlimited Team Members</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Dedicated Account Manager</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Custom Contracts & Invoicing</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> SLA & Priority Support</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
