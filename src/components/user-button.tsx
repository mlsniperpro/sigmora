'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type UserButtonProps = {
    collapsed?: boolean;
};

export function UserButton({ collapsed = false }: UserButtonProps) {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    if (!user) {
        return (
            <Link
                href="/login"
                className="button button-secondary"
                style={{
                    width: '100%',
                    minHeight: '44px',
                    padding: collapsed ? '0.75rem' : '0.85rem 1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                title={collapsed ? 'Log in' : undefined}
                aria-label="Log in"
            >
                {collapsed ? 'In' : 'Log in'}
            </Link>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'space-between',
                padding: '0.85rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                marginTop: 'auto',
                gap: '0.75rem',
                width: '100%'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden', minWidth: 0 }}>
                <div
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-accent-500), var(--color-teal-500))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#fff',
                        flexShrink: 0
                    }}
                >
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                {!collapsed ? (
                    <div style={{ overflow: 'hidden', minWidth: 0 }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(245, 241, 232, 0.9)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {user.displayName || 'Operator'}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(245, 241, 232, 0.5)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {user.email}
                        </p>
                    </div>
                ) : null}
            </div>

            <button
                onClick={() => void handleLogout()}
                style={{
                    background: collapsed ? 'transparent' : 'rgba(255, 255, 255, 0.06)',
                    border: collapsed ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: collapsed ? 'rgba(245, 241, 232, 0.6)' : 'rgba(245, 241, 232, 0.92)',
                    cursor: 'pointer',
                    padding: collapsed ? '0.5rem' : '0.6rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s, background 0.2s, border-color 0.2s',
                    borderRadius: '0.7rem',
                    gap: '0.5rem',
                    minHeight: '40px',
                    flexShrink: 0
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.color = 'var(--color-accent-400)';
                    if (!collapsed) {
                        e.currentTarget.style.background = 'rgba(214, 100, 40, 0.12)';
                        e.currentTarget.style.borderColor = 'rgba(214, 100, 40, 0.22)';
                    }
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.color = collapsed ? 'rgba(245, 241, 232, 0.6)' : 'rgba(245, 241, 232, 0.92)';
                    if (!collapsed) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    }
                }}
                title="Sign Out"
                aria-label="Sign out"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                {!collapsed ? <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Sign out</span> : null}
            </button>
        </div>
    );
}
