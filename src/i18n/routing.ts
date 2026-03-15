import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es', 'hi'],

  // Used when no locale matches
  defaultLocale: 'en',
  
  // Enforce locale prefix in URL paths for absolute routing consistency
  localePrefix: 'always'
});
