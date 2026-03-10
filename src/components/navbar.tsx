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
                    <Image src="/logo.png" alt="Sigmora Logo" width={32} height={32} className="logo" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff' }}>Sigmora</span>
                </Link>
                <nav style={{ display: 'flex', gap: '2rem' }} className="nav-links">
                    <Link href="/retention-analysis" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>Retention Analysis</Link>
                    <Link href="/blog" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>Blog</Link>
                    <Link href="/resources" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>Resources</Link>
                    <Link href="/#how-it-works" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>How It Works</Link>
                    <Link href="/#pricing" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>Pricing</Link>
                    <Link href="/#faq" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>FAQ</Link>
                </nav>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link href="/login" style={{ fontSize: '0.95rem', color: 'rgba(245, 241, 232, 0.9)', textDecoration: 'none', fontWeight: 500 }}>Log in</Link>
                <Link href={workspace ? workspacePath(workspace.slug, 'activate') : '/signup'} className="button" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>
                    {workspace ? 'Resume Activation' : 'Start Free'}
                </Link>
            </div>
        </header>
    );
}
