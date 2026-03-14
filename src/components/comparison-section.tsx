'use client';

import React from 'react';
import Link from 'next/link';
import { useMessages, useTranslations } from 'next-intl';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#37b5ae' }}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CrossIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export function ComparisonSection() {
  const messages = useMessages() as any;
  const t = useTranslations('Comparison');
  const comparisonData = messages.Comparison?.items || [];

  const renderCell = (val: any) => {
    if (val === 'true' || val === true) return <CheckIcon />;
    if (val === 'false' || val === false) return <CrossIcon />;
    return <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{val}</span>;
  };

  return (
    <section className="section-block animate-fade-in-up" id="comparison" style={{ marginTop: '8rem' }}>
      <div className="section-heading" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
        <p className="eyebrow">{t('heading.eyebrow')}</p>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('heading.title')}</h2>
        <p style={{ fontSize: '1.2rem' }}>{t('heading.description')}</p>
      </div>

      <div className="panel" style={{ padding: '0', overflow: 'hidden', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '940px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--panel-border)' }}>
                <th style={{ padding: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('headers.capabilities')}</th>
                <th style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{t('headers.sigmora')}</span>
                    <span className="status-pill status-foundation" style={{ fontSize: '0.6rem', marginTop: '0.5rem' }}>Full Stack</span>
                  </div>
                </th>
                <th style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{t('headers.tubemagic')}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Strategic</span>
                  </div>
                </th>
                <th style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{t('headers.clipping')}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Opus/Submagic</span>
                  </div>
                </th>
                <th style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{t('headers.traditional')}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Text Focus</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item: any, idx: number) => (
                <tr key={idx} style={{ 
                  borderBottom: idx === comparisonData.length - 1 ? 'none' : '1px solid var(--panel-border)',
                  transition: 'background 0.2s ease'
                }} className="table-row-hover">
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>{item.feature}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.description}</span>
                    </div>
                  </td>
                  <td style={{ 
                    padding: '1.5rem 2rem', 
                    textAlign: 'center', 
                    background: 'linear-gradient(to bottom, rgba(214, 100, 40, 0.05), rgba(214, 100, 40, 0.02))',
                    borderLeft: '1px solid rgba(214, 100, 40, 0.1)',
                    borderRight: '1px solid rgba(214, 100, 40, 0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'center', transform: 'scale(1.1)' }}>
                      {renderCell(item.sigmora)}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.7 }}>
                      {renderCell(item.tubemagic)}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.7 }}>
                      {renderCell(item.clipping)}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.7 }}>
                      {renderCell(item.traditional)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel" style={{ marginTop: '2rem', padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', background: 'linear-gradient(135deg, rgba(214, 100, 40, 0.1), rgba(24, 138, 132, 0.05))', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: '600px' }}>
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>{t('footer.title')}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{t('footer.description')}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/signup" className="button">{t('footer.getStarted')}</Link>
          <Link href="/retention-analysis" className="button button-secondary">{t('footer.learnMore')}</Link>
        </div>
      </div>
    </section>
  );
}
