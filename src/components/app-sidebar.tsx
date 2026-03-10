"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserButton } from '@/components/user-button';
import type { Workspace } from '@/lib/domain';
import { groupedNavigation } from '@/lib/navigation';
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

            {groupedNavigation.map((group, gIdx) => (
                <div key={group.title} style={{ marginBottom: gIdx === groupedNavigation.length - 1 ? 0 : '1.25rem' }}>
                    {!isCollapsed && (
                        <p style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            letterSpacing: '0.11em',
                            color: 'rgba(245, 241, 232, 0.25)',
                            textTransform: 'uppercase',
                            marginBottom: '0.75rem',
                            paddingLeft: '1rem'
                        }}>
                            {group.title}
                        </p>
                    )}
                    <nav className="nav-list" aria-label={`Navigation group: ${group.title}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {group.items.map((item) => {
                            const fullHref = workspacePath(workspace.slug, item.href.replace('/', ''));
                            const isActive = pathname === fullHref || pathname.startsWith(fullHref + '/');

                            return (
                                <Link
                                    key={item.href}
                                    href={fullHref}
                                    className="nav-link"
                                    style={{
                                        padding: isCollapsed ? '0.75rem' : '0.6rem 0.85rem',
                                        borderRadius: '0.6rem',
                                        transition: 'all 0.15s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        background: isActive ? 'rgba(214,100,40,0.08)' : 'transparent',
                                        border: `1px solid ${isActive ? 'rgba(214,100,40,0.15)' : 'transparent'}`,
                                        color: isActive ? 'var(--color-paper-100)' : 'var(--color-paper-200)',
                                        textDecoration: 'none'
                                    }}
                                    title={isCollapsed ? item.label : ""}
                                >
                                    <span style={{
                                        display: 'flex',
                                        color: isActive ? 'var(--color-accent-400)' : 'inherit',
                                        opacity: isActive ? 1 : 0.6
                                    }}>
                                        <NavIcon name={item.icon} size={isCollapsed ? 20 : 18} />
                                    </span>

                                    {!isCollapsed && (
                                        <span style={{
                                            fontSize: '0.875rem',
                                            fontWeight: isActive ? 600 : 450,
                                            letterSpacing: '-0.01em'
                                        }}>
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            ))}

            <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                <UserButton />
            </div>
        </aside>
    );
}

function NavIcon({ name, size = 18 }: { name: string; size?: number }) {
    const icons: Record<string, React.ReactNode> = {
        home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
        library: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"></path><path d="M12 6v14"></path><path d="M8 8v12"></path><path d="M4 4v16"></path></svg>,
        database: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>,
        trending: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>,
        users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
        message: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
        book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
        cpu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>,
        layers: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
        shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
        rocket: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3l1 1"></path><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5l-1-1"></path><line x1="11.5" y1="15.5" x2="15.5" y2="11.5"></line></svg>,
        share: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>,
        globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
        'bar-chart': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>,
        settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    };

    return icons[name] || icons.home;
}

