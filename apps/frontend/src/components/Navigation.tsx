'use client';

import { useTranslations } from 'next-intl';

/*
 * Navigation Component
 * Main navigation bar with design system styling
 */

export function Navigation() {
  const t = useTranslations('common.nav');

  const navItems = [
    { label: t('home'), href: '#home' },
    { label: t('about'), href: '#about' },
    { label: t('projects'), href: '#projects' },
    { label: t('skills'), href: '#skills' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-sticky bg-bg-secondary border-b border-neutral-grey/20 shadow-sm">
      <div className="container-custom py-4 flex justify-between items-center">
        <h1 className="text-logo-m font-semibold text-brand-primary font-monospace">
          Portfolio
        </h1>

        <ul className="flex gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-neutral-white hover:text-brand-primary transition-colors duration-base font-medium"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

