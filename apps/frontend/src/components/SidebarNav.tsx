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
      id: 'modules',
      label: t('modules') || 'Modules',
      icon: <ProjectsIcon />,
      sectionId: 'modules',
    },
    {
      id: 'about',
      label: t('about') || 'About Me',
      icon: <UserIcon />,
      sectionId: 'about',
    },
    {
      id: 'skills',
      label: t('skills') || 'Skills',
      icon: <SkillsIcon />,
      sectionId: 'skills',
    },
    {
      id: 'works',
      label: t('works') || 'Works',
      icon: <MonitorIcon />,
      sectionId: 'projects',
    },
    {
      id: 'blog',
      label: t('blog') || 'Blogs',
      icon: <EditIcon />,
      sectionId: 'blog',
    },
    {
      id: 'contact',
      label: t('contact') || 'Contact',
      icon: <ContactIcon />,
      sectionId: 'contact',
    },
  ];

  // Use IntersectionObserver to highlight the active section
  useEffect(() => {
    const sections = defaultItems
      .map((it) => document.getElementById(it.sectionId))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return undefined;

    let current = '';

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersectionRatio
        let maxEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!maxEntry || entry.intersectionRatio > maxEntry.intersectionRatio) {
            maxEntry = entry;
          }
        }

        if (maxEntry && maxEntry.isIntersecting) {
          const id = defaultItems.find((it) => it.sectionId === (maxEntry!.target as HTMLElement).id)?.id;
          if (id && id !== current) {
            current = id;
            setActiveSection(id);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((el) => observer.observe(el));

    // initial check
    sections.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0) {
        const id = defaultItems.find((it) => it.sectionId === el.id)?.id;
        if (id) setActiveSection(id);
      }
    });

    return () => observer.disconnect();
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // update hash to position anchor at the module title
      try {
        history.replaceState(null, '', `#${sectionId}`);
      } catch (e) {
        // ignore
      }
      if (onNavigate) {
        onNavigate(sectionId);
      }
    }
  };

  return (
    <nav
      className={clsx(
        'fixed left-2 top-[78px] md:top-[190px] z-50',
        'hidden lg:block',
        className
      )}
      role="navigation"
      aria-label="Section navigation"
    >
      <div className="rounded-full bg-[#2f3438] border border-white/30 shadow-lg p-3">
        <div className="flex flex-col items-center gap-4 py-3 px-1 w-14">
          {defaultItems.map((item, index) => (
            <div key={item.id} className="relative group">
              <button
                onClick={() => handleClick(item.sectionId)}
                onMouseEnter={() => handleMouseEnter(item.id, index)}
                onMouseLeave={handleMouseLeave}
                className={clsx(
                  'relative flex items-center justify-center',
                  'w-10 h-10 rounded-full',
                  'transition-all duration-300',
                  'focus:outline-none focus-ring',
                  'border-2',
                  activeSection === item.id
                    ? 'border-white bg-white/5'
                    : 'border-white/50 hover:border-white/70 bg-transparent',
                  hoveredId === item.id && 'ring-1 ring-white/30'
                )}
                aria-label={item.label}
                aria-current={activeSection === item.id ? 'page' : undefined}
                title={item.label}
              >
                <div
                  className={clsx(
                    'w-5 h-5 flex items-center justify-center',
                    'transition-colors duration-300',
                    activeSection === item.id
                      ? 'text-cyan-400'
                      : 'text-white group-hover:text-cyan-300'
                  )}
                >
                  {item.icon}
                </div>
              </button>

              {showTooltip === item.id && (
                <div
                  className={clsx(
                    'absolute left-16 top-1/2 transform -translate-y-1/2',
                    'px-3 py-2 rounded-lg',
                    'bg-white text-gray-800',
                    'text-sm font-semibold',
                    'whitespace-nowrap',
                    'shadow-md',
                    'pointer-events-none'
                  )}
                >
                  {item.label}
                  <div
                    className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-sm rotate-45"
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Icon Components

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


function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
      <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}
