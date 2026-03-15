import type { Metadata } from 'next';
import '../globals.css';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.layout' });

  return {
    metadataBase: new URL('https://sigmora.com'),
    title: {
      default: t('title.default'),
      template: t('title.template')
    },
    description: t('description'),
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
      title: t('title.default'),
      description: t('description'),
      url: 'https://sigmora.com',
      siteName: 'Sigmora',
      images: [
        {
          url: '/hero-visual.png',
          width: 1200,
          height: 630,
          alt: 'Sigmora Product Preview',
        },
      ],
      locale: locale === 'hi' ? 'hi_IN' : locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title.default'),
      description: t('description'),
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
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

