'use client';

import { useState } from 'react';
import { useMessages, useTranslations } from 'next-intl';

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const messages = useMessages() as any;
    const t = useTranslations('FAQ');
    
    // Fallback to empty array if not defined yet in loaded JSON
    const faqItems = messages.FAQ?.items || [];

    return (
        <section className="section-block animate-fade-in-up" id="faq" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div className="section-heading" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2>{t('heading.title')}</h2>
                <p>{t('heading.description')}</p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {faqItems.map((faq: any, idx: number) => (
                    <div
                        key={idx}
                        className="panel"
                        style={{ padding: '1.25rem 1.5rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>{faq.q}</h3>
                            <svg
                                style={{
                                    transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease'
                                }}
                                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>

                        <div
                            style={{
                                maxHeight: openIndex === idx ? '200px' : '0px',
                                opacity: openIndex === idx ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                marginTop: openIndex === idx ? '1rem' : '0'
                            }}
                        >
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{faq.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
