import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://sigmora.com'),
  title: {
    default: 'Sigmora | Retention Analysis and Video Remixing for Short-Form Teams',
    template: '%s | Sigmora'
  },
  description:
    'Import a winning short-form video, inspect why it retains attention, and turn the pattern into your next script or scene plan with Sigmora.',
  keywords: ['retention analysis', 'short-form video', 'content remixer', 'viral database', 'video scripting', 'social media growth'],
  authors: [{ name: 'Sigmora Team' }],
  creator: 'Sigmora',
  publisher: 'Sigmora',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sigmora | Retention Analysis and Video Remixing',
    description: 'Turn winning videos into repeatable creative decisions. Analyze retention and remix content with AI.',
    url: 'https://sigmora.com',
    siteName: 'Sigmora',
    images: [
      {
        url: '/hero-visual.png', // Fallback to hero visual if og-image isn't ready
        width: 1200,
        height: 630,
        alt: 'Sigmora Product Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sigmora | Retention Analysis and Video Remixing',
    description: 'Analyze retention and remix content with AI. Turn winners into scripts.',
    images: ['/hero-visual.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [{ url: '/icon.png', type: 'image/png' }],
    shortcut: ['/icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
