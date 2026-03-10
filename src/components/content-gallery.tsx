"use client";

import Link from 'next/link';
import type { BenchmarkCollection } from '@/lib/domain';
import { workspaceBenchmarkPath } from '@/lib/workspace-routing';

type ContentGalleryProps = {
    collections: BenchmarkCollection[];
    workspaceSlug: string;
};

export function ContentGallery({ collections, workspaceSlug }: ContentGalleryProps) {
    return (
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
            {collections.map((collection) => (
                <article
                    key={collection.id}
                    className="panel module-card animate-fade-in-up"
                    style={{
                        padding: '0',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer'
                    }}
                >
                    <Link href={workspaceBenchmarkPath(workspaceSlug, collection.id)} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {/* Fake Visual Preview */}
                        <div style={{
                            height: '180px',
                            background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(/hero-visual.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '99px',
                                background: 'rgba(24, 138, 132, 0.8)',
                                backdropFilter: 'blur(4px)',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                color: '#fff'
                            }}>
                                {String(collection.assetIds.length)} ASSETS
                            </div>
                            <span style={{ fontSize: '3rem', opacity: 0.5 }}>🎬</span>
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div className="tag-row" style={{ marginBottom: '0.75rem' }}>
                                <span className="status-pill status-foundation" style={{ fontSize: '0.7rem' }}>{collection.focus.toUpperCase()}</span>
                                <span className="status-pill status-next" style={{ fontSize: '0.7rem', background: 'rgba(55, 181, 174, 0.1)', color: '#37b5ae' }}>TRENDING</span>
                            </div>

                            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>{collection.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-paper-200)', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>
                                {collection.description}
                            </p>

                            <div style={{
                                marginTop: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: '1rem',
                                borderTop: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Updated 2h ago</span>
                                <span className="button button-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>View Gallery</span>
                            </div>
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    );
}
