'use client';

import Link from 'next/link';

export function PricingSection() {
    return (
        <section className="section-block animate-fade-in-up" id="pricing" style={{ paddingTop: '4rem' }}>
            <div className="section-heading" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
                <p className="eyebrow">Pricing</p>
                <h2 style={{ fontSize: '2.5rem' }}>Start free. Pay once the loop works.</h2>
                <p>Sigmora should prove value before it asks for commitment. Light users can stay flexible. Heavy users get better economics with a plan.</p>
            </div>

            <div className="pricing-grid">
                <div className="panel module-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Activation</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px' }}>Best for first-time users proving the workflow with one asset, one analysis, and one remix.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>$0</span>
                        <span style={{ color: 'rgba(245, 241, 232, 0.6)' }}>/to start</span>
                    </div>
                    <Link href="/signup" className="button" style={{ width: '100%', marginBottom: '2rem', textAlign: 'center' }}>Reach first value</Link>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What you unlock</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.8)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Import or upload one real video</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Run structured retention analysis</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Generate one script or scene plan</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Keep your workspace and outputs</li>
                        </ul>
                    </div>
                </div>

                {/* Starter Plan */}
                <div className="panel module-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Credit Packs</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px' }}>Best for occasional operators who want control without a recurring commitment.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Flexible</span>
                        <span style={{ color: 'rgba(245, 241, 232, 0.6)' }}>/one-time</span>
                    </div>
                    <Link href="/signup" className="button button-secondary" style={{ width: '100%', marginBottom: '2rem', textAlign: 'center' }}>Start with usage</Link>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What&apos;s included</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.8)' }}>
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
                        <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Growth</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px' }}>For teams that already use Sigmora repeatedly and want better unit economics.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>$149</span>
                        <span style={{ color: 'rgba(245, 241, 232, 0.6)' }}>/month</span>
                    </div>
                    <Link href="/signup" className="button" style={{ width: '100%', marginBottom: '2rem', textAlign: 'center' }}>Unlock better economics</Link>

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
                <div className="panel module-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Enterprise</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px' }}>For large organizations requiring custom scale and tailored solutions.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Custom</span>
                    </div>
                    <Link href="mailto:sales@sigmora.ai" className="button button-secondary" style={{ width: '100%', marginBottom: '2rem', textAlign: 'center' }}>Contact Sales</Link>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What&apos;s included</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.8)' }}>
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
