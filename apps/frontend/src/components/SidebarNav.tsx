'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

/*
 * SidebarNav Component
 * Fixed sidebar navigation with:
 * - Icon-based navigation
 * - Hover tooltips (2 second delay, except first icon)
 * - Scroll detection to highlight active section
 * - Click to navigate to sections
 */

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  sectionId: string;
}

export interface SidebarNavProps {
  items?: NavItem[];
  className?: string;
  onNavigate?: (sectionId: string) => void;
}

export function SidebarNav({ items, className, onNavigate }: SidebarNavProps) {
  const t = useTranslations('common.nav');
  const [activeSection, setActiveSection] = useState<string>('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const defaultItems: NavItem[] = items || [
    {
      id: 'home',
      label: t('home') || 'Home',
      icon: <HomeIcon />,
      sectionId: 'home',
    },
    {
      id: 'about',
      label: t('about') || 'About Me',
      icon: <UserIcon />,
      sectionId: 'about',
    },
    {
      id: 'projects',
      label: t('projects') || 'Works',
      icon: <ProjectsIcon />,
      sectionId: 'projects',
    },
    {
      id: 'skills',
      label: t('skills') || 'Skills',
      icon: <SkillsIcon />,
      sectionId: 'skills',
    },
    {
      id: 'blog',
      label: t('blog') || 'Blogs',
      icon: <BlogIcon />,
      sectionId: 'blog',
    },
    {
      id: 'contact',
      label: t('contact') || 'Contact',
      icon: <ContactIcon />,
      sectionId: 'contact',
    },
  ];

  // Handle scroll detection to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = '';

      for (const item of defaultItems) {
        const element = document.getElementById(item.sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (top 25% of screen)
          if (rect.top <= window.innerHeight * 0.25) {
            currentSection = item.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hover with 2 second delay (except first icon)
  const handleMouseEnter = (id: string, index: number) => {
    setHoveredId(id);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Skip tooltip delay for first icon (home)
    if (index === 0) {
      setShowTooltip(id);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowTooltip(id);
      }, 2000);
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setShowTooltip(null);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  // Handle click to navigate
  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (onNavigate) {
        onNavigate(sectionId);
      }
    }
  };

  return (
    <nav
      className={clsx(
        'fixed left-0 top-1/2 transform -translate-y-1/2 z-dropdown',
        'flex flex-col items-center gap-8 py-8',
        'hidden lg:flex',
        className
      )}
      role="navigation"
      aria-label="Section navigation"
    >
      {defaultItems.map((item, index) => (
        <div key={item.id} className="relative group">
          {/* Navigation Icon */}
          <button
            onClick={() => handleClick(item.sectionId)}
            onMouseEnter={() => handleMouseEnter(item.id, index)}
            onMouseLeave={handleMouseLeave}
            className={clsx(
              'relative flex items-center justify-center',
              'w-12 h-12 rounded-full',
              'transition-all duration-300',
              'focus:outline-none focus-ring',
              'border-2',
              activeSection === item.id
                ? 'border-brand-primary bg-brand-primary/10'
                : 'border-neutral-grey/30 hover:border-brand-primary/50 bg-bg-primary',
              hoveredId === item.id && 'border-brand-primary/50'
            )}
            aria-label={item.label}
            aria-current={activeSection === item.id ? 'page' : undefined}
            title={item.label}
          >
            <div
              className={clsx(
                'w-6 h-6 flex items-center justify-center',
                'transition-colors duration-300',
                activeSection === item.id
                  ? 'text-brand-primary'
                  : 'text-neutral-grey hover:text-brand-primary'
              )}
            >
              {item.icon}
            </div>
          </button>

          {/* Tooltip (appears after 2 seconds on hover, or immediately for first icon) */}
          {showTooltip === item.id && (
            <div
              className={clsx(
                'absolute left-16 top-1/2 transform -translate-y-1/2',
                'px-3 py-2 rounded-lg',
                'bg-neutral-white text-bg-secondary',
                'text-label-u font-semibold',
                'whitespace-nowrap',
                'shadow-md',
                'animate-fade-in',
                'pointer-events-none'
              )}
            >
              {item.label}
              {/* Tooltip Arrow */}
              <div
                className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-neutral-white rounded-sm rotate-45"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
              />
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

// Icon Components
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function SkillsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
      <line x1="12" y1="12" x2="20" y2="7.5" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <line x1="12" y1="12" x2="4" y2="7.5" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="16" y2="11" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
