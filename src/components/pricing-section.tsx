'use client';

import Link from 'next/link';

export function PricingSection() {
    return (
        <section className="section-block animate-fade-in-up" id="pricing" style={{ paddingTop: '4rem' }}>
            <div className="section-heading" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
                <p className="eyebrow">Pricing</p>
                <h2 style={{ fontSize: '2.5rem' }}>Simple, transparent pricing</h2>
                <p>Choose the automated content engine that fits your needs. Scale as you grow.</p>
            </div>

            <div className="pricing-grid">
                {/* Solo Plan */}
                <div className="panel module-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Solo Plan</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px' }}>Perfect for individual creators and marketers starting out.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>$33</span>
                        <span style={{ color: 'rgba(245, 241, 232, 0.6)' }}>/month</span>
                        <div style={{ fontSize: '0.8rem', color: '#37b5ae', marginTop: '0.5rem' }}>Billed $400 yearly (Save 2 months)</div>
                    </div>
                    <Link href="/signup" className="button button-secondary" style={{ width: '100%', marginBottom: '2rem' }}>Get Started</Link>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What's included</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.8)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> 24,000 Credits / Year</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> 1 User Seat</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Access to Viral Content Database</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> AI Content Remixing</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Competitor Account Spy</li>
                        </ul>
                    </div>
                </div>

                {/* Team Plan (Best Value) */}
                <div className="panel module-card pricing-card best-value" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, var(--color-accent-500), var(--color-accent-400))', color: '#fff', padding: '0.25rem 1rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Best Value
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Team Plan</h3>
                        <p style={{ fontSize: '0.9rem', minHeight: '40px' }}>Built for growing teams and agencies scaling content ops.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>$50</span>
                        <span style={{ color: 'rgba(245, 241, 232, 0.6)' }}>/month</span>
                        <div style={{ fontSize: '0.8rem', color: '#ea8551', marginTop: '0.5rem' }}>Billed $600 yearly (Save 2 months)</div>
                    </div>
                    <Link href="/signup" className="button" style={{ width: '100%', marginBottom: '2rem', textAlign: 'center' }}>Get Started</Link>

                    <div style={{ flex: 1 }}>
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What's included</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.9)' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> <b>60,000 Credits / Year</b></li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> <b>Up to 10 Team Members</b></li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Everything in Solo</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Collaborative Workspace</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Dedicated Slack Support</li>
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
                        <p className="eyebrow" style={{ marginBottom: '1rem' }}>What's included</p>
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
