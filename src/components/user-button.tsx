'use client';

import { useAuth } from '@/context/AuthContext';

export function UserButton() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                marginTop: 'auto'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
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
                <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(245, 241, 232, 0.9)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {user.displayName || 'Operator'}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(245, 241, 232, 0.5)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {user.email}
                    </p>
                </div>
            </div>

            <button
                onClick={() => void logout()}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(245, 241, 232, 0.5)',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent-400)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(245, 241, 232, 0.5)'}
                title="Sign Out"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
            </button>
        </div>
    );
}
