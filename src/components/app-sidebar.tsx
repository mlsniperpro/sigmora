"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserButton } from '@/components/user-button';
import type { Workspace } from '@/lib/domain';
import { appNavigation } from '@/lib/navigation';
import { workspacePath } from '@/lib/workspace-routing';

type AppSidebarProps = {
    workspace: Workspace;
};

export function AppSidebar({ workspace }: AppSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const pathname = usePathname();

    return (
        <aside
            className="workspace-sidebar panel animate-fade-in-up delay-100"
            style={{
                background: 'rgba(10, 12, 16, 0.4)',
                borderColor: 'rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                width: isCollapsed ? '80px' : '320px',
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: isCollapsed ? '1rem 0.5rem' : '1.5rem',
                alignItems: isCollapsed ? 'center' : 'stretch',
                overflowX: 'hidden'
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: isCollapsed ? 'center' : 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                {!isCollapsed && (
                    <Link href={workspacePath(workspace.slug, 'dashboard')} className="brand-mark">
                        <img src="/logo.png" alt="Sigmora Logo" className="logo" />
                    </Link>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--color-paper-200)',
                        transition: 'all 0.2s'
                    }}
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
                    )}
                </button>
            </div>

            {!isCollapsed && (
                <div className="sidebar-header" style={{ marginBottom: '1.5rem' }}>
                    <p className="sidebar-copy" style={{ fontSize: '0.8rem' }}>Analyze, benchmark, and remix short-form video performance.</p>
                    <div className="workspace-badge" style={{ marginTop: '0.5rem' }}>
                        <span>{workspace.name}</span>
                        <p>{workspace.plan} workspace</p>
                    </div>
                </div>
            )}

            <nav className="nav-list" aria-label="Product Navigation" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {appNavigation.map((item) => {
                    const fullHref = workspacePath(workspace.slug, item.href.replace('/', ''));
                    const isActive = pathname === fullHref || pathname.startsWith(fullHref + '/');

                    return (
                        <Link
                            key={item.href}
                            href={fullHref}
                            className="nav-card"
                            style={{
                                padding: isCollapsed ? '0.75rem' : '0.85rem 1rem',
                                borderRadius: '0.75rem',
                                transition: 'all 0.2s',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: isCollapsed ? 'center' : 'flex-start',
                                textAlign: isCollapsed ? 'center' : 'left',
                                background: isActive ? 'rgba(214,100,40,0.1)' : 'transparent',
                                border: `1px solid ${isActive ? 'rgba(214,100,40,0.2)' : 'transparent'}`,
                                color: isActive ? 'var(--color-paper-100)' : 'var(--color-paper-200)'
                            }}
                            title={isCollapsed ? item.label : ""}
                        >
                            {isCollapsed ? (
                                <span style={{ fontSize: '1.2rem', color: isActive ? 'var(--color-accent-400)' : 'inherit' }}>{item.label[0]}</span>
                            ) : (
                                <>
                                    <span style={{ fontSize: '0.95rem', color: isActive ? 'var(--color-accent-400)' : 'inherit' }}>{item.label}</span>
                                    <p style={{ fontSize: '0.75rem', marginTop: '0.2rem', opacity: isActive ? 0.9 : 0.7 }}>{item.description}</p>
                                </>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                <UserButton />
            </div>
        </aside>
    );
}
