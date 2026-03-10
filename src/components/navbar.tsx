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
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 5%',
            zIndex: 100,
            background: 'rgba(10, 12, 16, 0.6)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link href="/" className="brand-mark" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#fff' }}>
                    {/* A simple glowing orb as a placeholder premium logo icon */}
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-accent-500), var(--color-teal-500))', boxShadow: '0 0 12px rgba(214, 100, 40, 0.6)' }} />
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Sigmora</span>
                </Link>
                <nav style={{ display: 'flex', gap: '1.5rem' }} className="nav-links">
                    <Link href="/#pricing" style={{ fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>Pricing</Link>
                    <Link href="/about" style={{ fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>About</Link>
                    <Link href="/#faq" style={{ fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>FAQ</Link>
                </nav>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/login" style={{ fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.8)', textDecoration: 'none' }}>Log in</Link>
                <Link href={workspace ? workspacePath(workspace.slug, 'dashboard') : '/signup'} className="button" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                    {workspace ? 'Dashboard' : 'Get Started'}
                </Link>
            </div>
        </header>
    );
}
