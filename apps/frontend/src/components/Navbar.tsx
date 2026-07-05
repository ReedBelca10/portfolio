'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { GitHubIcon, LinkedInIcon, DiscordIcon } from './Icon';

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

  // Client-side navigation handler for links that require locale-aware routing
    const pathname = usePathname();
    const router = useRouter();

    const navigateToBlog = () => {
      const segs = (pathname || '').split('/').filter(Boolean);
      const locale = segs[0] || 'en';
      router.push(`/${locale}/blog`);
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
        return <DiscordIcon size="md" />;
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
                  {links.map((link) => {
                    if (link.href === '#blog') {
                      return (
                        <button
                          key={link.href}
                          onClick={navigateToBlog}
                          className={clsx(
                            "font-semibold transition-colors duration-200",
                            link.label === 'Home' ? "text-[#00D9FF]" : "text-gray-300 hover:text-[#00D9FF]"
                          )}
                          style={{ fontSize: 'clamp(13px, 1.1vw, 15px)' }}
                          aria-label={link.label}
                        >
                          {link.label}
                        </button>
                      );
                    }

                    return (
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
                    );
                  })}
                
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
