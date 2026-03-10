"use client";

import { useState } from "react";

type Platform = 'tiktok' | 'instagram' | 'youtube' | 'x' | 'linkedin';

export function AutomationPanel() {
    const [activePlatform, setActivePlatform] = useState<Platform>('tiktok');
    const [automationMode, setAutomationMode] = useState<'manual' | 'review' | 'autopilot'>('review');

    const platforms: { id: Platform; label: string; maxPosts: number; autopilotEnabled: boolean }[] = [
        { id: 'tiktok', label: 'TikTok', maxPosts: 3, autopilotEnabled: true },
        { id: 'instagram', label: 'Instagram Reels', maxPosts: 2, autopilotEnabled: false },
        { id: 'youtube', label: 'YouTube Shorts', maxPosts: 1, autopilotEnabled: true },
        { id: 'linkedin', label: 'LinkedIn', maxPosts: 1, autopilotEnabled: false },
        { id: 'x', label: 'X (Twitter)', maxPosts: 5, autopilotEnabled: true },
    ];

    const currentPlatform = platforms.find(p => p.id === activePlatform)!;

    return (
        <div className="panel form-panel">
            <div className="table-header">
                <div>
                    <h2>Automation & Autopilot Rules</h2>
                    <p>Configure how research and generated content behaves for different platforms.</p>
                </div>
            </div>

            {/* Platform Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
                {platforms.map(p => (
                    <button
                        key={p.id}
                        onClick={() => {
                            setActivePlatform(p.id);
                            if (!p.autopilotEnabled && automationMode === 'autopilot') setAutomationMode('review');
                        }}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '999px',
                            border: `1px solid ${activePlatform === p.id ? 'rgba(214,100,40,0.4)' : 'transparent'}`,
                            background: activePlatform === p.id ? 'linear-gradient(135deg, rgba(214,100,40,0.1), transparent)' : 'transparent',
                            color: activePlatform === p.id ? '#fff' : 'var(--color-paper-200)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: activePlatform === p.id ? 600 : 400,
                            transition: 'all 0.2s'
                        }}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '0.5rem' }}>

                {/* Operating Mode */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Operating Mode</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-paper-200)' }}>How should new content be processed?</p>
                    </div>

                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', border: `1px solid ${automationMode === 'manual' ? 'var(--color-teal-400)' : 'rgba(255,255,255,0.08)'}`, background: automationMode === 'manual' ? 'rgba(24,138,132,0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
                            <input type="radio" name="mode" checked={automationMode === 'manual'} onChange={() => setAutomationMode('manual')} style={{ marginTop: '0.1rem' }} />
                            <div>
                                <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.15rem' }}>Manual</strong>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-paper-200)' }}>Drafts are saved. You must manually schedule or publish them.</span>
                            </div>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', border: `1px solid ${automationMode === 'review' ? 'var(--color-teal-400)' : 'rgba(255,255,255,0.08)'}`, background: automationMode === 'review' ? 'rgba(24,138,132,0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
                            <input type="radio" name="mode" checked={automationMode === 'review'} onChange={() => setAutomationMode('review')} style={{ marginTop: '0.1rem' }} />
                            <div>
                                <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.15rem' }}>Review-First Automation</strong>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-paper-200)' }}>Content is added to the queue automatically, but requires user approval before going live.</span>
                            </div>
                        </label>

                        <label style={{ opacity: currentPlatform.autopilotEnabled ? 1 : 0.5, display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', border: `1px solid ${automationMode === 'autopilot' ? 'var(--color-accent-400)' : 'rgba(255,255,255,0.08)'}`, background: automationMode === 'autopilot' ? 'rgba(214,100,40,0.1)' : 'rgba(255,255,255,0.02)', cursor: currentPlatform.autopilotEnabled ? 'pointer' : 'not-allowed' }}>
                            <input type="radio" name="mode" disabled={!currentPlatform.autopilotEnabled} checked={automationMode === 'autopilot'} onChange={() => setAutomationMode('autopilot')} style={{ marginTop: '0.1rem' }} />
                            <div>
                                <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.15rem', color: automationMode === 'autopilot' ? 'var(--color-accent-400)' : 'inherit' }}>Fire-and-Forget (Autopilot)</strong>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-paper-200)' }}>
                                    {currentPlatform.autopilotEnabled
                                        ? 'Content is generated, scheduled, and published automatically without human review.'
                                        : 'Not supported for this platform due to API risk.'}
                                </span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Schedule & Limits */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Schedule Limits</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-paper-200)' }}>Cap the daily generation and publishing volume.</p>
                    </div>

                    <div className="entity-form" style={{ gridTemplateColumns: '1fr' }}>
                        <label>
                            <span>Max Posts Per Day</span>
                            <input type="number" defaultValue={currentPlatform.maxPosts} min={1} max={10} />
                        </label>
                        <label>
                            <span>Generation Trigger</span>
                            <select defaultValue="weekly">
                                <option value="daily">Daily at 9:00 AM</option>
                                <option value="weekly">Weekly on Mondays</option>
                                <option value="trend">When new highly-rated trend detected</option>
                            </select>
                        </label>
                        <label>
                            <span>Target Benchmark Similarity</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                <input type="range" min="50" max="95" defaultValue="80" style={{ flex: 1, accentColor: 'var(--color-accent-400)' }} />
                                <span style={{ fontSize: '0.85rem', width: '3ch' }}>80%</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button className="button" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>Save Rules</button>
            </div>
        </div>
    );
}
