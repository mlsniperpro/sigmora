'use client';

import { useState } from 'react';

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "Who is Sigmora for?",
            a: "Sigmora is built for creators, social media managers, growth marketers, and agencies who want to scale their viral short-form organic content systems."
        },
        {
            q: "Which platforms does the Viral Database cover?",
            a: "Currently, our engine pulls daily analytics directly from TikTok, Instagram Reels, and YouTube Shorts."
        },
        {
            q: "How does the AI Content Remixer work?",
            a: "Upload any video or select a proven winner from our database. Our proprietary AI analyzes its retention hooks and pacing, then generates a customized content script structurally matched to your target niche."
        },
        {
            q: "Do I need to be a professional creator or marketer?",
            a: "No! Sigmora turns the dark art of virality into a step-by-step quantitative process, making it accessible for absolute beginners and powerful enough for enterprise growth teams."
        },
        {
            q: "What is included in the Enterprise Custom Plan?",
            a: "Custom credit volume, dedicated Slack support, endless team seats, API access for integrations, and an assigned account manager analyzing trends specifically for your vertical."
        }
    ];

    return (
        <section className="section-block animate-fade-in-up" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div className="section-heading" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2>Frequently Asked Questions</h2>
                <p>Everything you need to know about scaling your content with Sigmora.</p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {faqs.map((faq, idx) => (
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
                            <p style={{ color: 'rgba(245, 241, 232, 0.72)', fontSize: '0.95rem', lineHeight: 1.6 }}>{faq.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
