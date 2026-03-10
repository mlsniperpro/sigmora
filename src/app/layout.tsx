import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Sigmora | Quantitative UGC Engine',
  description:
    'Sigmora is a benchmark, analysis, and remix platform for short-form video teams building measurable creative systems.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
