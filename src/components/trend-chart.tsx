"use client";

import { useEffect, useState } from "react";

export function TrendChart() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="panel" style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.25rem' }}>Trend Velocity</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-paper-200)' }}>Aggregated momentum of tracked hooks across TikTok and Reels over the last 14 days.</p>
            </div>

            <div style={{ height: '300px', width: '100%', position: 'relative', background: 'radial-gradient(circle at 10% 90%, rgba(24,138,132,0.1), transparent)' }}>
                {/* Grid Lines */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '10% 20%' }} />

                {/* Rising Trend Wave (Orange) */}
                <svg preserveAspectRatio="none" viewBox="0 0 100 100" style={{ position: 'absolute', bottom: 0, width: '100%', height: '80%' }}>
                    <defs>
                        <linearGradient id="risingGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-accent-400)" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="var(--color-accent-400)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d="M0,100 L0,90 Q10,80 20,75 T40,60 T60,40 T80,10 L100,5 L100,100 Z" fill="url(#risingGrad)" className="animate-fade-in-up" />
                    <path d="M0,90 Q10,80 20,75 T40,60 T60,40 T80,10 L100,5" fill="none" stroke="var(--color-accent-400)" strokeWidth="3" className="animate-fade-in-up" style={{ filter: 'drop-shadow(0 0 8px rgba(234,133,81,0.6))' }} />

                    {/* Data Points */}
                    <circle cx="20" cy="75" r="1.5" fill="white" className="animate-fade-in-up delay-100" />
                    <circle cx="40" cy="60" r="1.5" fill="white" className="animate-fade-in-up delay-200" />
                    <circle cx="60" cy="40" r="1.5" fill="white" className="animate-fade-in-up delay-300" />
                    <circle cx="80" cy="10" r="1.5" fill="white" className="animate-fade-in-up delay-400" />
                </svg>

                {/* Declining Trend Wave (Teal) */}
                <svg preserveAspectRatio="none" viewBox="0 0 100 100" style={{ position: 'absolute', bottom: 0, width: '100%', height: '60%' }}>
                    <defs>
                        <linearGradient id="decliningGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-teal-400)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--color-teal-400)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d="M0,100 L0,10 Q20,15 40,40 T80,85 L100,95 L100,100 Z" fill="url(#decliningGrad)" className="animate-fade-in-up delay-200" />
                    <path d="M0,10 Q20,15 40,40 T80,85 L100,95" fill="none" stroke="var(--color-teal-400)" strokeWidth="2" strokeDasharray="4 4" className="animate-fade-in-up delay-200" />
                </svg>

                {/* Floating Tooltip Mock */}
                <div className="animate-float delay-500" style={{ position: 'absolute', top: '20%', right: '15%', background: 'rgba(10,12,16,0.8)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', display: 'grid', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent-400)' }} />
                        <span style={{ color: 'var(--color-paper-200)' }}>"Whisper to Shout"</span>
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>+420%</span>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(245,241,232,0.5)' }}>Velocity over 7d</span>
                </div>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--color-paper-200)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '12px', height: '2px', background: 'var(--color-accent-400)', boxShadow: '0 0 4px var(--color-accent-400)' }} />
                    Rising specific hooks
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '12px', height: '2px', background: 'var(--color-teal-400)', borderStyle: 'dashed', borderWidth: '0 0 2px 0' }} />
                    Saturating formats
                </div>
            </div>
        </div>
    );
}
