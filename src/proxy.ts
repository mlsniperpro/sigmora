import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'hi'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Exclude static assets, api, and internal bundles from being rewritten
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
