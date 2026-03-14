import Image from 'next/image';
import Link from 'next/link';
import { getCurrentWorkspace } from '@/lib/repositories';
import { workspacePath } from '@/lib/workspace-routing';

export async function Navbar() {
    let workspace = null;
    try {
        workspace = await getCurrentWorkspace();
    } catch {
        // Graceful fallback if no workspace is available for the user
    }

    return (
        <header style={{
            position: 'fixed',
            top: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(1240px, calc(100% - 2rem))',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            zIndex: 1000,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '99px',
            background: 'rgba(10, 12, 16, 0.6)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }} className="sigmora-shell-nav floating-nav">
            <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                <Link href="/" className="brand-mark">
                    <Image src="/logo.png" alt="Sigmora Logo" width={28} height={28} className="logo" style={{ borderRadius: '6px' }} />
                    <span style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', fontFamily: 'var(--font-display)' }}>Sigmora</span>
                </Link>
                <nav style={{ display: 'flex', gap: '1.5rem' }} className="nav-links hide-on-mobile">
                    <Link href="/retention-analysis" style={{ fontSize: '0.85rem', color: 'rgba(245, 241, 232, 0.7)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Analysis</Link>
                    <Link href="/#how-it-works" style={{ fontSize: '0.85rem', color: 'rgba(245, 241, 232, 0.7)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Process</Link>
                    <Link href="/#pricing" style={{ fontSize: '0.85rem', color: 'rgba(245, 241, 232, 0.7)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Pricing</Link>
                </nav>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/login" style={{ fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
                <Link href={workspace ? workspacePath(workspace.slug, 'activate') : '/signup'} className="button" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                    {workspace ? 'Open Workspace' : 'Start Free'}
                </Link>
            </div>
        </header>
    );
}
