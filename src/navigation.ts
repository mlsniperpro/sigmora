import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es', 'hi'] as const;

export const { Link, redirect, usePathname, useRouter } =
  createNavigation({ locales });
