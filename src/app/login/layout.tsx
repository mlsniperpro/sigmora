import { Navbar } from '@/components/navbar';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
