import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
    title: 'Sign Up',
    robots: {
        index: false,
        follow: false,
    },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
