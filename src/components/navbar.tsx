import Link from 'next/link';
import { getCurrentWorkspace } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

export async function Navbar() {
    let workspace = null;
    try {
        workspace = await getCurrentWorkspace();
    } catch (error) {
        // Graceful fallback if no workspace is available for the user
    }

    return (
        <header style={{
            position: 'absolute', // Absolute instead of fixed so it scrolls naturally with the landing page hero, or change to fixed if preferred, but absolute prevents layout thrashing
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 min(5%, 2rem)',
            zIndex: 100,
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'transparent'
        }} className="sigmora-shell-nav">
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                <Link href="/" className="brand-mark">
                    <img src="/logo.png" alt="Sigmora Logo" className="logo" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff' }}>Sigmora</span>
                </Link>
                <nav style={{ display: 'flex', gap: '2rem' }} className="nav-links">
                    <Link href="/#pricing" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>Pricing</Link>
                    <Link href="/about" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>About</Link>
                    <Link href="/#faq" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>FAQ</Link>
                </nav>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <select
                        style={{
                            appearance: 'none',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: 'rgba(245, 241, 232, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            padding: '0.4rem 2rem 0.4rem 1rem',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                        defaultValue="en"
                    >
                        <option value="en" style={{ background: '#0a0c10' }}>🇺🇸 English</option>
                        <option value="ko" style={{ background: '#0a0c10' }}>🇰🇷 한국어</option>
                        <option value="hi" style={{ background: '#0a0c10' }}>🇮🇳 हिन्दी</option>
                        <option value="de" style={{ background: '#0a0c10' }}>🇩🇪 Deutsch</option>
                    </select>
                    <svg style={{ position: 'absolute', right: '0.6rem', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <Link href="/login" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.9)', textDecoration: 'none', fontWeight: 500 }}>Log in</Link>
                <Link href={workspace ? workspacePath(workspace.slug, 'dashboard') : '/signup'} className="button" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>
                    {workspace ? 'Dashboard' : 'Get Started'}
                </Link>
            </div>
        </header>
    );
}
