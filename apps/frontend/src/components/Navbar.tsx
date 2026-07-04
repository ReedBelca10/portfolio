'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { GitHubIcon, LinkedInIcon } from './Icon';

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
  links?: NavbarLink[];
  socialLinks?: SocialLink[];
  onSearch?: (query: string) => void;
  className?: string;
}

export function Navbar({
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
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  };

  useEffect(() => {
    if (searchOpen) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSearchOpen(false);
      };
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('keydown', onKey);
      };
    }
    return;
  }, [searchOpen]);

  const handleSearchSubmit = (e?: React.FormEvent | null) => {
    e?.preventDefault?.();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  const renderSocialIcon = (icon: 'github' | 'linkedin' | 'discord') => {
    switch (icon) {
      case 'github':
        return <GitHubIcon size="md" />;
      case 'linkedin':
        return <LinkedInIcon size="md" />;
      case 'discord':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 h-[65px] md:h-[118px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-[8%]',
          className
        )}
        style={{ fontFamily: 'IBM Plex Mono', backgroundColor: '#292F36' }}
      >
        <div className="h-full flex items-center justify-between">
          
          {/* Left: Brand logo <ca/> */}
          <div className={clsx("relative flex items-center transition-opacity duration-300", searchOpen && "opacity-40")}>
            <span className="font-bold md:font-medium text-[#00D9FF]" style={{ fontSize: 'clamp(22px, 2vw, 32px)' }}>
              &lt;ca/&gt;
            </span>
          </div>

          {/* Right: Nav links, Search, Socials */}
          <div className="flex items-center gap-6 md:gap-10">
            
            {/* Links + Search Toggle Container */}
            <div className="relative flex flex-col items-end">
              <div className="flex items-center gap-5 md:gap-8">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "font-semibold transition-colors duration-200",
                      link.label === 'Home' ? "text-[#00D9FF]" : "text-gray-300 hover:text-[#00D9FF]"
                    )}
                    style={{ fontSize: 'clamp(13px, 1.1vw, 15px)' }}
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Search Toggle Button */}
                <button
                  onClick={handleSearchToggle}
                  className="transition-colors ml-1"
                  aria-label={searchOpen ? 'Close search' : 'Open search'}
                >
                  {searchOpen ? (
                    <div className="bg-white rounded-full p-[4px] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Expanding Search Bar (Absolute positioned below) */}
              <div 
                className={clsx(
                  "absolute top-full right-0 mt-4 w-[130%] min-w-[220px] transition-all duration-300 transform origin-top-right",
                  searchOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                )}
              >
                <div className="flex items-center justify-between bg-white rounded-full px-4 py-1.5 md:py-2 shadow-lg">
                  <input
                    ref={searchInputRef}
                    type="text"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearchSubmit();
                    }}
                    className="bg-transparent text-slate-900 focus:outline-none text-sm w-full"
                    placeholder=""
                  />
                  <button onClick={() => handleSearchSubmit()} className="ml-2 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Social links hidden on mobile */}
            <div className="hidden md:flex items-center gap-5">
              {socialLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleSocialClick(link.url)}
                  className="flex items-center justify-center text-[#00D9FF] hover:opacity-80 transition-opacity"
                  aria-label={link.name}
                >
                  {renderSocialIcon(link.icon)}
                </button>
              ))}
            </div>

          </div>
        </div>
        <div className="w-full max-w-[1600px] mx-auto">
          <hr className="border-t m-0" style={{ borderTopColor: '#3d444a' }} />
        </div>
      </nav>

      {/* Spacer matching navbar height */}
      <div className="h-[65px] md:h-[118px]" />
    </>
  );
}
