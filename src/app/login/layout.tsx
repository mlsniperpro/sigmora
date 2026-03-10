import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
    title: 'Log In',
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
