import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'es', 'hi'];

export default getRequestConfig(async ({ locale }) => {
  const activeLocale = locale || 'en';
  // Validate that the request locale is supported
  if (!locales.includes(activeLocale)) notFound();

  return {
    locale: activeLocale,
    messages: (await import(`../../messages/${activeLocale}.json`)).default
  };
});
