'use client';

import React from 'react';
import Link from 'next/link';

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

const comparisonData = [
  {
    feature: 'End-to-End Generation',
    sigmora: 'Script to Video',
    tubemagic: 'Script Only',
    clipping: 'Clipping Only',
    traditional: 'Text Only',
    description: 'Go from initial reference directly to a generated video variant.'
  },
  {
    feature: 'Scene-by-scene Retention Analysis',
    sigmora: true,
    tubemagic: false,
    clipping: false,
    traditional: false,
    description: 'Deconstruct why videos hold attention at every second.'
  },
  {
    feature: 'UGC-Specific Benchmark Database',
    sigmora: true,
    tubemagic: 'Limited',
    clipping: false,
    traditional: false,
    description: 'Analyze real winning patterns from top performance agencies.'
  },
  {
    feature: 'Multimodal Signal Extraction',
    sigmora: true,
    tubemagic: false,
    clipping: 'Partial',
    traditional: false,
    description: 'Extracts visual cues, audio energy, and pacing—not just text.'
  },
  {
    feature: 'Data-Driven Creative Remixing',
    sigmora: true,
    tubemagic: true,
    clipping: 'Clipping Only',
    traditional: 'Basic',
    description: 'Turn successful benchmarks into usable scripts and scene plans.'
  },
  {
    feature: 'Team Playbooks & Guardrails',
    sigmora: true,
    tubemagic: false,
    clipping: 'Limited',
    traditional: false,
    description: 'Enforce brand standards and workflow patterns across large teams.'
  }
];

export function ComparisonSection() {
  return (
    <section className="section-block animate-fade-in-up" id="comparison" style={{ marginTop: '8rem' }}>
      <div className="section-heading" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
        <p className="eyebrow">The Competitive Edge</p>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Sigmora vs. The Competition</h2>
        <p style={{ fontSize: '1.2rem' }}>
          Stop guessing why videos work. Sigmora provides the quantitative layer that TubeMagic, clipping tools, and traditional AI generators miss.
        </p>
      </div>

      <div className="panel" style={{ padding: '0', overflow: 'hidden', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '940px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--panel-border)' }}>
                <th style={{ padding: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core Capabilities</th>
                <th style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Sigmora</span>
                    <span className="status-pill status-foundation" style={{ fontSize: '0.6rem', marginTop: '0.5rem' }}>Full Stack</span>
                  </div>
                </th>
                <th style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>TubeMagic</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Strategic</span>
                  </div>
                </th>
                <th style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Clipping Tools</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Opus/Submagic</span>
                  </div>
                </th>
                <th style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Trad. AI</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Text Focus</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, idx) => (
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
                      {typeof item.sigmora === 'boolean' ? (item.sigmora ? <CheckIcon /> : <CrossIcon />) : <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#37b5ae' }}>{item.sigmora}</span>}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.7 }}>
                      {typeof item.tubemagic === 'boolean' ? (item.tubemagic ? <CheckIcon /> : <CrossIcon />) : <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.tubemagic}</span>}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.7 }}>
                      {typeof item.clipping === 'boolean' ? (item.clipping ? <CheckIcon /> : <CrossIcon />) : <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.clipping}</span>}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.7 }}>
                      {typeof item.traditional === 'boolean' ? (item.traditional ? <CheckIcon /> : <CrossIcon />) : <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.traditional}</span>}
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
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>Ready to build a better content engine?</h3>
          <p style={{ color: 'var(--text-secondary)' }}>TubeMagic helps you start. Sigmora helps you scale with quantitative precision.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/signup" className="button">Get Started Free</Link>
          <Link href="/retention-analysis" className="button button-secondary">Learn More</Link>
        </div>
      </div>
    </section>
  );
}
