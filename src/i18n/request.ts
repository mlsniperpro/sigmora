import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const activeLocale = locale || 'en';
  // Validate that the request locale is supported
  if (!routing.locales.includes(activeLocale as any)) notFound();

  return {
    locale: activeLocale,
    messages: (await import(`../../messages/${activeLocale}.json`)).default
  };
});
