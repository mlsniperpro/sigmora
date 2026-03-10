'use client';

import { useState, startTransition } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { auth, isConfigValid } from '@/lib/firebase';

type AuthMode = 'login' | 'register';

export function AuthPanel() {
  const { user, loading, logout } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const resetTransientState = () => {
    startTransition(() => {
      setErrorMessage(null);
    });
  };

  const runAuthTask = async (task: () => Promise<void>) => {
    if (!auth || !isConfigValid) {
      setErrorMessage('Firebase environment variables are missing. Add them before using authentication.');
      return;
    }

    setPending(true);
    resetTransientState();

    try {
      await task();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed.';
      setErrorMessage(message);
    } finally {
      setPending(false);
    }
  };

  const handleEmailAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await runAuthTask(() =>
      mode === 'login'
        ? signInWithEmailAndPassword(auth!, email, password).then(() => undefined)
        : createUserWithEmailAndPassword(auth!, email, password).then(() => undefined),
    );
  };

  const handleGoogleSignIn = async () => {
    await runAuthTask(async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth!, provider);
    });
  };

  return (
    <section className="auth-module">
      {!isConfigValid && (
        <div className="callout warning small">
          Config needed
        </div>
      )}


      {loading ? (
        <div className="auth-loading">
          <div className="spinner" />
          <span>Loading session</span>
        </div>
      ) : user ? (
        <div className="auth-state">
          <div className="identity-card">
            <div>
              <p className="identity-label">Signed in</p>
              <h3>{user.displayName || user.email || 'Sigmora operator'}</h3>
            </div>
            <p className="identity-copy">
              This should become the entry point for workspace selection, recent assets, and pending analysis jobs.
            </p>
          </div>

          <button type="button" className="button button-secondary" onClick={() => void logout()}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="auth-state">
          <form className="auth-form" onSubmit={handleEmailAuth}>
            <label>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="operator@sigmora.ai"
                autoComplete="email"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </label>

            <button type="submit" className="button" disabled={pending}>
              {pending ? 'Working...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <button type="button" className="button button-secondary" onClick={() => void handleGoogleSignIn()} disabled={pending}>
            Continue with Google
          </button>

          <button
            type="button"
            className="text-button"
            onClick={() => {
              resetTransientState();
              setMode((current) => (current === 'login' ? 'register' : 'login'));
            }}
          >
            {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      )}

      {errorMessage ? <p className="error-text">{errorMessage}</p> : null}
    </section>
  );
}
