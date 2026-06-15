'use client';

import { useTranslations } from 'next-intl';

export function Navigation() {
  const t = useTranslations('common.nav');

  return (
    <nav className="bg-white shadow">
      <div className="container-custom py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <ul className="flex gap-8">
          <li>
            <a href="#" className="hover:text-blue-600 transition">
              {t('home')}
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition">
              {t('about')}
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition">
              {t('projects')}
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition">
              {t('skills')}
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition">
              {t('contact')}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
