import { Navbar } from '@/components/navbar';

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
