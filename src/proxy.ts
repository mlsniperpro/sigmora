import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclude static assets, api, and internal bundles from being rewritten
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
