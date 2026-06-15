'use client';

import React from 'react';
import clsx from 'clsx';

/*
 * SkillBadge Component
 * Specialized badge component for displaying programming skills and technologies
 * with appropriate color coding based on technology type
 */

interface SkillBadgeProps {
  name: string;
  category?: 'html' | 'css' | 'javascript' | 'react' | 'programming' | 'design' | 'tool' | 'other';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  showLevel?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const categoryColorMap = {
  html: 'bg-tech-html/15 text-tech-html border-tech-html/30',
  css: 'bg-tech-css/15 text-tech-css border-tech-css/30',
  javascript: 'bg-tech-javascript/15 text-tech-javascript border-tech-javascript/30',
  react: 'bg-tech-react/15 text-tech-react border-tech-react/30',
  programming: 'bg-brand-primary/15 text-brand-primary border-brand-primary/30',
  design: 'bg-brand-secondary/15 text-brand-secondary border-brand-secondary/30',
  tool: 'bg-neutral-grey/15 text-neutral-grey border-neutral-grey/30',
  other: 'bg-brand-primary/15 text-brand-primary border-brand-primary/30',
};

const levelStyles = {
  beginner: 'text-xs',
  intermediate: 'text-xs',
  advanced: 'text-xs font-semibold',
  expert: 'text-xs font-bold',
};

const sizeStyles = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3.5 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base',
};

export function SkillBadge({
  name,
  category = 'programming',
  level,
  showLevel = false,
  className,
  size = 'md',
}: SkillBadgeProps) {
  const displayText = showLevel && level ? `${name} (${level})` : name;

  return (
    <span
      className={clsx(
        'inline-flex items-center border rounded-md font-medium transition-all duration-base hover:shadow-md',
        categoryColorMap[category],
        sizeStyles[size],
        level && showLevel && levelStyles[level],
        className
      )}
    >
      {displayText}
    </span>
  );
}
