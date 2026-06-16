import { routing } from './i18n';
import { createMiddleware } from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|fr)/:path*'],
};
