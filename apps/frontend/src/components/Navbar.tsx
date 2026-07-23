'use client';

import { useState, useRef, useEffect } from 'react';
import { Link, usePathname } from '@/i18n';
import { useDebounce } from '../hooks/useDebounce';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { GitHubIcon, LinkedInIcon, DiscordIcon, GitLabIcon, LeetCodeIcon } from './Icon';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarLink {
  label: string;
  href: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'leetcode' | 'discord' | 'gitlab';
}

interface NavbarProps {
  links?: NavbarLink[];
  socialLinks?: SocialLink[];
  onSearch?: (query: string) => void;
  className?: string;
}

interface SearchResults {
  blogs: { id: number; title: string; publishedDate: string }[];
  skills: { id: number; name: string; stack: string; subcategory: string }[];
  sections: { id: string; label: string }[];
}

export function Navbar({
  links,
  socialLinks = [
    { name: 'leetcode', url: 'https://leetcode.com/reedbelca10', icon: 'leetcode' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/caleb-adjeoda-410b34415', icon: 'linkedin' },
    { name: 'discord', url: 'https://discord.com/users/1425091386709115007', icon: 'discord' },
    { name: 'gitlab', url: 'https://gitlab.com/ReedBelca10', icon: 'gitlab' },
    { name: 'github', url: 'https://github.com/ReedBelca10', icon: 'github' },
  ],
  onSearch,
  className,
}: NavbarProps) {
  const t = useTranslations('common.nav');
  const defaultLinks = links || [
    { label: t('home'), href: '/' },
    { label: t('blog'), href: '/blog' },
  ];

  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setSearchResults(null);
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

  useEffect(() => {
    if (debouncedSearchQuery.trim().length === 0) {
      setSearchResults(null);
      return;
    }

    const fetchResults = async () => {
      setIsSearching(true);
      try {
        const lang = document.documentElement.lang || 'en';
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedSearchQuery)}&locale=${lang}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (err) {
        console.error('Failed to search', err);
      } finally {
        setIsSearching(false);
      }
    };

    fetchResults();
  }, [debouncedSearchQuery]);

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

  

  const renderSocialIcon = (icon: 'github' | 'linkedin' | 'discord' | 'gitlab' | 'leetcode') => {
    switch (icon) {
      case 'github':
        return <GitHubIcon size="md" />;
      case 'linkedin':
        return <LinkedInIcon size="md" />;
      case 'discord':
        return <DiscordIcon size="md" />;
      case 'gitlab':
        return <GitLabIcon size="md" />;
      case 'leetcode':
        return <LeetCodeIcon size="md" />;
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
            <Link href="/" className="font-bold md:font-medium text-[#00D9FF] no-underline hover:opacity-80 transition-opacity" style={{ fontSize: 'clamp(22px, 2vw, 32px)', textDecoration: 'none' }}>
              &lt;ca/&gt;
            </Link>
          </div>

          {/* Right: Nav links, Search, Socials */}
          <div className="flex items-center gap-6 md:gap-10">
            
            {/* Links + Search Toggle Container */}
            <div className="relative flex flex-col items-end">
              <div className="flex items-center gap-5 md:gap-8">
                {defaultLinks.map((link) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/' || pathname === ''
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        'font-semibold transition-colors duration-200',
                        isActive ? 'text-[#00D9FF]' : 'text-gray-300 hover:text-[#00D9FF]'
                      )}
                      style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', textDecoration: 'none' }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                
                {/* Language Switcher */}
                <LanguageSwitcher />

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
                <div className="flex items-center justify-between bg-white rounded-full px-4 py-1.5 md:py-2 shadow-lg relative z-10">
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
                    placeholder="Search articles, skills, sections..."
                  />
                  <button onClick={() => handleSearchSubmit()} className="ml-2 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </button>
                </div>

                {/* Search Results Dropdown */}
                {searchQuery.trim().length > 0 && searchResults && (
                  <div className="absolute top-full right-0 mt-2 w-full bg-[#1e2328] border border-[#3d444a] shadow-xl rounded-lg overflow-hidden flex flex-col max-h-[60vh] overflow-y-auto z-20">
                    {isSearching ? (
                      <div className="p-4 text-center text-gray-400 text-sm">Searching...</div>
                    ) : (
                      <>
                        {searchResults.sections.length > 0 && (
                          <div className="p-2">
                            <div className="px-2 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider">Sections</div>
                            {searchResults.sections.map(sec => (
                              <a 
                                key={sec.id} 
                                href={`/#${sec.id}`}
                                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                                className="block px-3 py-2 mt-1 rounded-md hover:bg-[#292F36] text-gray-200 text-sm no-underline"
                              >
                                {sec.label}
                              </a>
                            ))}
                          </div>
                        )}
                        {searchResults.blogs.length > 0 && (
                          <div className="p-2 border-t border-[#3d444a]">
                            <div className="px-2 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider">Articles</div>
                            {searchResults.blogs.map(blog => (
                              <Link 
                                key={blog.id} 
                                href={`/blog/${blog.id}`}
                                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                                className="block px-3 py-2 mt-1 rounded-md hover:bg-[#292F36] text-gray-200 text-sm no-underline"
                              >
                                {blog.title}
                              </Link>
                            ))}
                          </div>
                        )}
                        {searchResults.skills.length > 0 && (
                          <div className="p-2 border-t border-[#3d444a]">
                            <div className="px-2 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider">Skills</div>
                            {searchResults.skills.map(skill => (
                              <a 
                                key={skill.id} 
                                href={`/#skills`}
                                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                                className="block px-3 py-2 mt-1 rounded-md hover:bg-[#292F36] text-gray-200 text-sm no-underline flex flex-col"
                              >
                                <span>{skill.name}</span>
                                <span className="text-xs text-gray-500">{skill.stack} - {skill.subcategory}</span>
                              </a>
                            ))}
                          </div>
                        )}
                        {searchResults.sections.length === 0 && searchResults.blogs.length === 0 && searchResults.skills.length === 0 && (
                          <div className="p-4 text-center text-gray-400 text-sm">No results found</div>
                        )}
                      </>
                    )}
                  </div>
                )}
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
