import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';

import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
    title: 'Log In',
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <Navbar />
            {children}
        </AuthProvider>
    );
}
