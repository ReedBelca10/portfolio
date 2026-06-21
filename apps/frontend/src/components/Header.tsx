'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

/*
 * Header Component
 * Fully responsive navigation header with desktop, tablet, and mobile layouts
 * Desktop: Logo + horizontal nav links
 * Tablet: Adjusted spacing
 * Mobile: Logo + hamburger menu with drawer
 */

interface HeaderLink {
  label: string;
  href: string;
}

interface HeaderProps {
  logo?: string;
  links?: HeaderLink[];
  className?: string;
}

export function Header({ logo = 'Portfolio', links, className }: HeaderProps) {
  const t = useTranslations('common.nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultLinks: HeaderLink[] = links || [
    { label: t('home'), href: '#home' },
    { label: t('about'), href: '#about' },
    { label: t('projects'), href: '#projects' },
    { label: t('skills'), href: '#skills' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <header
      className={clsx(
        'sticky top-0 z-sticky bg-bg-secondary border-b border-neutral-grey/20 shadow-sm',
        className
      )}
    >
      <div className="container-custom py-4 md:py-5">
        {/* Desktop and Tablet Layout */}
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-logo-m font-semibold text-brand-primary font-monospace">
              {logo}
            </h1>
          </div>

          {/* Desktop Navigation (hidden on mobile, visible on md and up) */}
          <ul className="hidden md:flex gap-8 lg:gap-12">
            {defaultLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-article-u text-neutral-white hover:text-brand-primary transition-colors duration-base font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-bg-primary rounded-md transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={clsx(
                'w-6 h-0.5 bg-neutral-white transition-all duration-300',
                mobileMenuOpen && 'rotate-45 translate-y-2'
              )}
            />
            <span
              className={clsx(
                'w-6 h-0.5 bg-neutral-white transition-all duration-300',
                mobileMenuOpen && 'opacity-0'
              )}
            />
            <span
              className={clsx(
                'w-6 h-0.5 bg-neutral-white transition-all duration-300',
                mobileMenuOpen && '-rotate-45 -translate-y-2'
              )}
            />
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-neutral-grey/20 animate-slide-in-down">
            <ul className="flex flex-col gap-4">
              {defaultLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-article-u text-neutral-white hover:text-brand-primary transition-colors duration-base font-medium block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
