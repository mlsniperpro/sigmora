"use client";

import { useEffect, useState } from "react";

type Marker = {
    timePercentage: number;
    label: string;
    color: string;
};

type RetentionTimelineProps = {
    markers?: Marker[];
};

export function RetentionTimeline({ markers = [] }: RetentionTimelineProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const defaultMarkers: Marker[] = [
        { timePercentage: 10, label: 'Hook', color: '#188a84' },
        { timePercentage: 35, label: 'Problem', color: '#ea8551' },
        { timePercentage: 60, label: 'Proof', color: '#37b5ae' },
        { timePercentage: 85, label: 'CTA', color: '#d66428' },
    ];

    const displayMarkers = markers.length > 0 ? markers : defaultMarkers;

    if (!mounted) return null; // Avoid hydration mismatch for animations

    return (
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Multimodal Retention Timeline</h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--color-paper-200)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ea8551' }} />
                        Retention Risk
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#188a84' }} />
                        Audio Energy
                    </span>
                </div>
            </div>

            {/* Complex Visualization Graph */}
            <div style={{ position: 'relative', height: '120px', width: '100%', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

                {/* Mock Retention Risk Shadow (Red/Orange gradient wave) */}
                <svg preserveAspectRatio="none" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.4 }}>
                    <defs>
                        <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ea8551" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#ea8551" stopOpacity="0.0" />
                        </linearGradient>
                    </defs>
                    <path d="M0,100 L0,80 Q20,20 40,70 T80,40 L100,50 L100,100 Z" fill="url(#riskGrad)" className="animate-fade-in-up" />
                    <path d="M0,80 Q20,20 40,70 T80,40 L100,50" fill="none" stroke="#ea8551" strokeWidth="2" className="animate-fade-in-up" />
                </svg>

                {/* Mock Audio Energy Wave (Teal line) */}
                <svg preserveAspectRatio="none" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.6 }}>
                    <path d="M0,90 Q5,60 10,80 T20,30 T30,85 T40,50 T50,90 T60,20 T70,80 T80,40 T90,85 T100,60" fill="none" stroke="#37b5ae" strokeWidth="1.5" className="animate-fade-in-up delay-100" />
                </svg>

                {/* Playhead indicator */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '33%', width: '2px', background: 'rgba(255,255,255,0.6)', zIndex: 10 }}>
                    <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '10px', height: '10px', borderRadius: '50%', background: 'white', border: '2px solid var(--color-ink-950)' }} />
                </div>

                {/* Structural Markers */}
                {displayMarkers.map((marker, idx) => (
                    <div
                        key={idx}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: `${marker.timePercentage}%`,
                            height: '100%',
                            borderLeft: `1px dashed ${marker.color}80`,
                            paddingLeft: '0.4rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            paddingBottom: '0.5rem'
                        }}
                    >
                        <span style={{
                            fontSize: '0.65rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 700,
                            color: marker.color,
                            background: 'rgba(10,12,16,0.6)',
                            padding: '0.1rem 0.3rem',
                            borderRadius: '4px',
                            border: `1px solid ${marker.color}40`,
                            whiteSpace: 'nowrap'
                        }}>
                            {marker.label}
                        </span>
                    </div>
                ))}
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-paper-200)', margin: 0 }}>
                High retention risk identified between 0:08 and 0:11. Consider increasing visual cut density during the Problem segment to re-engage viewers.
            </p>
        </div>
    );
}
