'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

/*
 * SearchHeader Component
 * Header with integrated search functionality
 * Supports toggle between normal header and search mode
 * Responsive design for desktop/tablet/mobile
 */

interface SearchHeaderLink {
  label: string;
  href: string;
}

interface SearchHeaderProps {
  logo?: string;
  links?: SearchHeaderLink[];
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchHeader({ logo = 'Portfolio', links, onSearch, className }: SearchHeaderProps) {
  const t = useTranslations('common.nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const defaultLinks: SearchHeaderLink[] = links || [
    { label: t('home'), href: '#home' },
    { label: t('about'), href: '#about' },
    { label: t('projects'), href: '#projects' },
    { label: t('skills'), href: '#skills' },
    { label: t('contact'), href: '#contact' },
  ];

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      }
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-sticky bg-bg-secondary border-b border-neutral-grey/20 shadow-sm',
        className
      )}
    >
      <div className="container-custom py-4 md:py-5">
        {/* Main Navigation Row */}
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

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={handleSearchToggle}
              className="p-2.5 hover:bg-bg-primary rounded-lg transition-colors duration-base text-brand-primary hover:text-brand-secondary"
              aria-label="Toggle search"
              title="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

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
          </div>
        </nav>

        {/* Search Bar Row (slides in when active) */}
        {searchOpen && (
          <div className="mt-4 pt-4 border-t border-neutral-grey/20 animate-slide-in-down">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border-2 border-neutral-grey focus:border-brand-primary text-neutral-white placeholder-neutral-grey/60 focus:outline-none transition-all duration-base"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-primary hover:text-brand-secondary transition-colors"
                  aria-label="Search"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleSearchClose}
                className="p-2 hover:bg-bg-primary rounded-full transition-colors duration-base text-neutral-grey hover:text-brand-primary"
                aria-label="Close search"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && !searchOpen && (
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
