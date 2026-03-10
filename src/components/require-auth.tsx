'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : '';
      router.replace(`/login${next}`);
    }
  }, [loading, pathname, router, user]);

  if (loading) {
    return (
      <div
        className="panel"
        style={{
          minHeight: '40vh',
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
        }}
      >
        <div className="auth-loading">
          <div className="spinner" />
          <span>Checking session</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
