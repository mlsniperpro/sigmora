"use client";

import { useState } from "react";

type VideoPlayerProps = {
    src?: string;
    poster?: string;
    duration?: string;
    title: string;
};

export function VideoPlayer({ src, poster, duration, title }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(33); // Mock progress

    return (
        <div className="panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Video Content Area (Mock) */}
            <div
                style={{
                    aspectRatio: '9/16',
                    maxHeight: '400px',
                    background: poster ? `url(${poster}) center/cover` : '#0a0c10',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.7) 100%)'
                    }}
                />

                {/* Play Button Overlay */}
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'transform 0.2s',
                        transform: isPlaying ? 'scale(0.9)' : 'scale(1)',
                    }}
                >
                    {isPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
                            <path d="M5 3l14 9-14 9V3z" />
                        </svg>
                    )}
                </button>

                {/* Top Info */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
                    <span className="status-pill status-later" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>{title}</span>
                </div>
            </div>

            {/* Controls Area */}
            <div style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        style={{
                            background: 'transparent', border: 'none', color: 'var(--color-paper-100)', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        {isPlaying ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5 3l14 9-14 9V3z" />
                            </svg>
                        )}
                    </button>

                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative', cursor: 'pointer' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${progress}%`, background: 'var(--color-accent-400)', borderRadius: '2px' }} />
                        <div style={{ position: 'absolute', left: `${progress}%`, top: '-4px', width: '12px', height: '12px', borderRadius: '50%', background: 'white', transform: 'translateX(-50%)', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }} />
                    </div>

                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-paper-200)' }}>
                        0:05 / {duration || '0:15'}
                    </span>
                </div>
            </div>
        </div>
    );
}
