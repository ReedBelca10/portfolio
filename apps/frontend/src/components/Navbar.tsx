'use client';

import { useState, useRef } from 'react';
import clsx from 'clsx';
import { GitHubIcon, LinkedInIcon } from './Icon';

/*
 * Navbar Component
 * Premium navbar design for large screens with logo, navigation, search, and social links
 * Features dark background with accent colors
 * Responsive with optimized 170px height for desktop
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
          <svg width={size === 'lg' ? 28 : 24} height={size === 'lg' ? 28 : 24} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.3671a19.8062 19.8062 0 00-4.8851-1.5152.074.074 0 00-.0782.0336c-.211.3667-.4429.8465-.6056 1.2251-.9493-.1423-1.8915-.1423-2.8134 0-.1624-.3837-.3954-.8584-.6069-1.2251a.077.077 0 00-.0785-.0336 19.7354 19.7354 0 00-4.8852 1.515.07.07 0 00-.0529.0273C.5817 9.0739-.0208 13.5sweep 0 17.9692a.083.083 0 00.0315.0686c2.0447 1.3084 4.0181 2.1004 5.9645 2.6289a.076.076 0 00.0822-.0288c.4671-.6374.8823-1.3106 1.2381-2.0028a.075.075 0 00-.0041-.0852c-.3933-.1487-.7667-.3279-1.1156-.5139a.075.075 0 01-.0074-.1257c.7487.5591 1.5616 1.0787 2.4147 1.4618a.074.074 0 00.0784.0105c2.2196-.9626 4.6348-.9626 6.8437 0a.075.075 0 00.0787-.0107c.8529-.3837 1.6655-.9027 2.4139-1.4618a.075.075 0 01-.0073.1256c-.3487.1861-.7221.3667-1.1147.5139a.075.075 0 00-.0037.0852c.3566.6922.7708 1.3654 1.2373 2.0028a.076.076 0 00.0824.0288 19.504 19.504 0 005.9645-2.6289.083.083 0 00.0317-.0686c.3804-4.2137-.6404-7.9296-2.7101-11.5968a.06.06 0 00-.0531-.0274zM8.02 15.3312c-.9692 0-1.7669-.8889-1.7669-1.9779 0-1.0889.7768-1.9779 1.7669-1.9779.9987 0 1.7782.8889 1.7669 1.9779 0 1.089-.7768 1.9779-1.7669 1.9779zm7.9601 0c-.9692 0-1.767-.8889-1.767-1.9779 0-1.0889.7768-1.9779 1.767-1.9779.9987 0 1.7783.8889 1.767 1.9779 0 1.089-.768 1.9779-1.767 1.9779z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800/50',
        'shadow-xl shadow-slate-950/50',
        className
      )}
    >
      <div className="h-[170px] px-8 lg:px-12 flex flex-col justify-between py-6">
        {/* Top Row: Brand + Right Actions */}
        <div className="flex items-center justify-between">
          {/* Brand Name */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold font-monospace bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {brandName}
            </h1>
          </div>

          {/* Right Side: Search + Social Icons */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Search Button */}
            <button
              onClick={handleSearchToggle}
              className="p-2 hover:bg-slate-800 rounded-lg transition-all duration-200 text-cyan-400 hover:text-cyan-300"
              aria-label="Toggle search"
              title="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Social Links */}
            {socialLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleSocialClick(link.url)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-all duration-200 text-slate-300 hover:text-cyan-400"
                aria-label={link.name}
                title={link.name}
              >
                <div className="text-slate-300 hover:text-cyan-400 transition-colors">
                  {renderSocialIcon(link.icon)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Row: Navigation Links */}
        <div className="flex items-center gap-8 lg:gap-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
      </div>

      {/* Search Bar (slides in when active) */}
      {searchOpen && (
        <div className="border-t border-slate-800/50 px-8 lg:px-12 py-4 bg-slate-900/50 backdrop-blur-sm">
          <form onSubmit={handleSearchSubmit} className="flex gap-3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-200"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
