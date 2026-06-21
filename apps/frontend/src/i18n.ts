import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
