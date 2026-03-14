'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, isConfigValid } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
    const router = useRouter();
    const { user, loading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [pending, setPending] = useState(false);

    // If already logged in, redirect to workspace path or dashboard
    if (!loading && user) {
        router.push('/dashboard');
        return null;
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth || !isConfigValid) {
            setErrorMsg('Firebase environment variables are missing.');
            return;
        }
        setPending(true);
        setErrorMsg('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (err: unknown) {
            setErrorMsg(err instanceof Error ? err.message : 'Signup failed.');
        } finally {
            setPending(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!auth || !isConfigValid) {
            setErrorMsg('Firebase environment variables are missing.');
            return;
        }
        setPending(true);
        setErrorMsg('');
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/dashboard');
        } catch (err: unknown) {
            setErrorMsg(err instanceof Error ? err.message : 'Google sign-in failed.');
        } finally {
            setPending(false);
        }
    };

    return (
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div className="panel animate-fade-in-up" style={{ width: '100%', maxWidth: '440px', padding: '3rem 2.5rem', position: 'relative' }}>

                <div style={{ position: 'absolute', top: '50%', right: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(24, 138, 132, 0.08) 0%, transparent 60%)', zIndex: -1, pointerEvents: 'none', transform: 'translateY(-50%)' }} />

                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Create an account</h1>
                    <p style={{ color: 'rgba(245, 241, 232, 0.72)' }}>Start free with one asset, one analysis, and one remix before you decide how deeply to use Sigmora.</p>
                </div>

                {errorMsg && <div className="callout warning small" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{errorMsg}</div>}

                <form className="auth-form" onSubmit={handleSignup} style={{ display: 'grid', gap: '1.25rem' }}>
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a strong password"
                            required
                            minLength={6}
                        />
                    </label>
                    <button type="submit" className="button" disabled={pending} style={{ marginTop: '0.5rem', padding: '1rem' }}>
                        {pending ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0', color: 'rgba(245, 241, 232, 0.4)' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
                    <span style={{ padding: '0 1rem', fontSize: '0.85rem' }}>or</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
                </div>

                <button type="button" className="button button-secondary" style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', alignItems: 'center' }} onClick={handleGoogleSignIn} disabled={pending}>
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Sign up with Google
                </button>

                <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.72)' }}>
                    Already have an account? <Link href="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
                </p>
            </div>
        </main>
    );
}
