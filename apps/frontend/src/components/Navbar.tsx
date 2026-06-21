'use client';

import { useState, useRef } from 'react';
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
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
      setSearchOpen(false);
      setSearchQuery('');
    }
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
          <svg width={size === 'lg' ? 28 : 24} height={size === 'lg' ? 28 : 24} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2C7.03 2 3 5.58 3 10c0 2.53 1.5 4.78 3.9 6.19L7 20l4-1.7c.9.3 1.8.5 2.9.5 4.97 0 9-3.58 9-8s-4.03-8-9-8zm-3.5 9a1.5 1.5 0 11.001-3.001A1.5 1.5 0 018.5 11zm7 0a1.5 1.5 0 11.001-3.001A1.5 1.5 0 0115.5 11z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <nav className={clsx('fixed top-0 left-0 right-0 z-50', className)} style={{ height: '170px', fontFamily: 'IBM Plex Mono', backgroundColor: '#292F36' }}>
        <div className="h-full px-8 lg:px-16 flex items-center justify-between py-6">
          {/* Left: Brand */}
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 32, fontWeight: 700 }}>
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
                  className="font-medium text-white hover:text-cyan-400 transition-colors duration-200"
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: 24 }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Search Box - White Background */}
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
              <input
                ref={searchInputRef}
                type="text"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(e as unknown as React.FormEvent);
                  }
                }}
                className="bg-transparent text-slate-900 focus:outline-none text-sm w-56"
                style={{ fontFamily: 'IBM Plex Mono' }}
              />
              <button
                onClick={handleSearchToggle}
                className="text-slate-900 hover:text-slate-700 transition-colors"
                aria-label="Toggle search"
                title="Search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>

            {/* Social Links with Names */}
            <div className="flex items-center gap-4 lg:gap-6">
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
                    <span className="text-white font-medium capitalize" style={{ fontSize: 16 }}>{link.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom HR Line */}
        <hr className="border-t m-0" style={{ borderTopColor: '#43454D' }} />
      </nav>

      {/* Spacer for fixed navbar */}
      <div style={{ height: '170px' }} />
    </>
  );
}
