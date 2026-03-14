"use client";

import { useState } from "react";

type CmsProvider = 'wordpress' | 'webflow' | 'shopify' | 'ghost';

export function CmsConnector() {
    const [activeConnection, setActiveConnection] = useState<CmsProvider | null>(null);

    const providers: { id: CmsProvider; name: string; iconUri: string; status: 'connected' | 'disconnected', themeColor: string }[] = [
        { id: 'webflow', name: 'Webflow', iconUri: 'W', status: 'connected', themeColor: '#4353ff' },
        { id: 'wordpress', name: 'WordPress', iconUri: 'W', status: 'disconnected', themeColor: '#21759b' },
        { id: 'shopify', name: 'Shopify', iconUri: 'S', status: 'disconnected', themeColor: '#96bf48' },
        { id: 'ghost', name: 'Ghost', iconUri: 'G', status: 'disconnected', themeColor: '#15171a' },
    ];

    return (
        <div className="panel">
            <div className="table-header">
                <div>
                    <h2>CMS Integrations</h2>
                    <p>Connect your owned-media platforms to automatically publish generated blog drafts and articles.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {providers.map(provider => (
                    <div
                        key={provider.id}
                        className="recommendation-card"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem',
                            border: provider.id === activeConnection ? `1px solid ${provider.themeColor}` : undefined,
                            background: provider.id === activeConnection ? `linear-gradient(180deg, ${provider.themeColor}15, rgba(255,255,255,0.02))` : undefined,
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: provider.themeColor, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    {provider.iconUri}
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{provider.name}</h3>
                                    <span className={`status-pill ${provider.status === 'connected' ? 'status-foundation' : 'status-later'}`} style={{ display: 'inline-block', marginTop: '0.25rem', padding: '0.2rem 0.5rem', fontSize: '0.65rem' }}>
                                        {provider.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {provider.status === 'disconnected' ? (
                            <button
                                onClick={() => setActiveConnection(activeConnection === provider.id ? null : provider.id)}
                                className="button-secondary"
                                style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}
                            >
                                {activeConnection === provider.id ? 'Cancel' : 'Connect API'}
                            </button>
                        ) : (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                Syncing enabled. 12 drafts published this month.
                                <button className="text-button" style={{ display: 'block', marginTop: '0.5rem', textDecoration: 'underline' }}>Configure mapping</button>
                            </div>
                        )}

                        {/* Connection Form Expansion */}
                        {activeConnection === provider.id && provider.status === 'disconnected' && (
                            <div className="entity-form" style={{ marginTop: '0.5rem', animation: 'fadeInUp 0.3s ease' }}>
                                <label style={{ gridColumn: '1 / -1' }}>
                                    <span style={{ fontSize: '0.7rem' }}>API Endpoint</span>
                                    <input type="url" placeholder={`https://api.${provider.id}.com/v1`} style={{ padding: '0.6rem 0.75rem', fontSize: '0.85rem' }} />
                                </label>
                                <label style={{ gridColumn: '1 / -1' }}>
                                    <span style={{ fontSize: '0.7rem' }}>Access Token</span>
                                    <input type="password" placeholder="sk_live_..." style={{ padding: '0.6rem 0.75rem', fontSize: '0.85rem' }} />
                                </label>
                                <button className="button" style={{ gridColumn: '1 / -1', padding: '0.6rem', fontSize: '0.85rem' }}>Verify & Connect</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
