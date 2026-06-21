'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { GitHubIcon, LinkedInIcon } from './Icon';

/*
 * Navbar Component
 * Premium navbar design: 170px height, IBM Plex Mono typography
 * Left: <C/> logo + CalebAdjeoda name
 * Right: Navigation + Search bar + Social icons with names
 * Bottom: hr line separator
 */

interface NavbarLink {
  label: string;
  href: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'discord';
}

interface NavbarProps {
  brandName?: string;
  links?: NavbarLink[];
  socialLinks?: SocialLink[];
  onSearch?: (query: string) => void;
  className?: string;
}

export function Navbar({
  brandName = 'CalebAdjeoda',
  links = [
    { label: 'Home', href: '#home' },
    { label: 'Blogs', href: '#blog' },
  ],
  socialLinks = [
    { name: 'linkedin', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'discord', url: 'https://discord.com', icon: 'discord' },
    { name: 'github', url: 'https://github.com', icon: 'github' },
  ],
  onSearch,
  className,
}: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const popupInputRef = useRef<HTMLInputElement>(null);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      // will focus via effect either on popup input (mobile) or inline input (desktop)
      setTimeout(() => {
        searchInputRef.current?.focus();
        popupInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  };

  // Focus popup input when opened on small screens and handle Escape to close
  useEffect(() => {
    if (searchOpen) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSearchOpen(false);
      };
      document.addEventListener('keydown', onKey);
      // prevent background scrolling
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // focus popup if present
      setTimeout(() => popupInputRef.current?.focus(), 80);
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [searchOpen]);

  const handleSearchSubmit = (e?: React.FormEvent | null) => {
    e?.preventDefault?.();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
    }
    // Always close the popup and clear the query after submit (even if no onSearch provided)
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  const renderSocialIcon = (icon: 'github' | 'linkedin' | 'discord', size: 'md' | 'lg' = 'md') => {
    switch (icon) {
      case 'github':
        return <GitHubIcon size={size} />;
      case 'linkedin':
        return <LinkedInIcon size={size} />;
      case 'discord':
        return (
          <svg width={size === 'lg' ? 28 : 24} height={size === 'lg' ? 28 : 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2" y="3" width="20" height="14" rx="3" stroke="currentColor" fill="none" />
            <path d="M7 14c.8-.6 1.4-1.8 1.4-3" stroke="currentColor" />
            <path d="M17 14c-.8-.6-1.4-1.8-1.4-3" stroke="currentColor" />
            <circle cx="9" cy="9" r="1" fill="currentColor" />
            <circle cx="15" cy="9" r="1" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <nav className={clsx('fixed top-0 left-0 right-0 z-50 h-[68px] md:h-[170px] px-[30px] md:px-[120px]', className)} style={{ fontFamily: 'IBM Plex Mono', backgroundColor: '#292F36' }}>
        <div className="h-full flex items-center justify-between py-4 md:py-6">
          {/* Left: Brand */}
          <div className="flex items-center gap-2">
            <span className="font-bold md:font-normal lg:font-medium text-[18px]" style={{ fontFamily: 'IBM Plex Mono' }}>
              <span className="text-cyan-400">&lt;C/&gt;</span>
              <span className="text-white ml-2">{brandName}</span>
            </span>
          </div>

          {/* Right: Nav links, Search, Socials (single line at wide screens) */}
          <div className="flex items-center gap-8 lg:gap-12">
            {/* Navigation Links - placed left of search */}
            <div className="flex items-center gap-8 lg:gap-12">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-medium text-white hover:text-cyan-400 transition-colors duration-200 text-[16px] xl:text-[16px] lg:text-[15px] md:text-[14px]"
                  style={{ fontFamily: 'IBM Plex Mono' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Search Box - White Background. On small screens show only icon */}
            <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 md:px-4 md:py-2">
              <input
                ref={searchInputRef}
                type="text"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
                className="hidden md:block bg-transparent text-slate-900 focus:outline-none text-sm w-56 xl:w-56 lg:w-44 md:w-40"
                style={{ fontFamily: 'IBM Plex Mono' }}
              />
              <button
                onClick={handleSearchToggle}
                className="text-slate-900 hover:text-slate-700 transition-colors p-1 md:p-0"
                aria-label={searchOpen ? 'Close search' : 'Open search'}
                title={searchOpen ? 'Close' : 'Search'}
              >
                {searchOpen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                )}
              </button>
            </div>

            {/* Social Links with Names (hidden on small/mobile screens) */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {socialLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleSocialClick(link.url)}
                  className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                  aria-label={link.name}
                  title={link.name}
                  style={{ fontFamily: 'IBM Plex Mono' }}
                >
                    <span className="text-cyan-400 flex items-center">{renderSocialIcon(link.icon, 'md')}</span>
                    <span className="text-white font-medium capitalize text-[16px] show-at-1920">{link.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1600px] mx-auto">
          <hr className="border-t m-0" style={{ borderTopColor: '#43454D' }} />
        </div>
      </nav>

      {/* Mobile-only search popup with backdrop blur */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-60 flex items-start justify-center pt-20 md:hidden"
          onClick={() => setSearchOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative z-70 w-[min(720px,90%)] px-4">
            <div
              className="bg-white rounded-full px-4 py-2 flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={popupInputRef}
                type="text"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                className="bg-transparent text-slate-900 focus:outline-none text-sm w-full"
                style={{ fontFamily: 'IBM Plex Mono' }}
              />
              <button
                onClick={() => handleSearchSubmit()}
                className="text-slate-900 hover:text-slate-700 transition-colors p-1"
                aria-label="Execute search"
                title="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer matching navbar height (68px mobile, 170px desktop) */}
      <div className="h-[68px] md:h-[170px]" />
    </>
  );
}
