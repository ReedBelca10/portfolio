'use client';

import React from 'react';
import clsx from 'clsx';

/*
 * Badge Component
 * Display technology tags with appropriate color coding
 */

interface BadgeProps {
  label: string;
  variant?: 'html' | 'css' | 'javascript' | 'react' | 'brand' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ label, variant = 'brand', size = 'md', className }: BadgeProps) {
  const variantStyles = {
    html: 'bg-tech-html/20 text-tech-html border border-tech-html/40',
    css: 'bg-tech-css/20 text-tech-css border border-tech-css/40',
    javascript: 'bg-tech-javascript/20 text-tech-javascript border border-tech-javascript/40',
    react: 'bg-tech-react/20 text-tech-react border border-tech-react/40',
    brand: 'bg-brand-primary/20 text-brand-primary border border-brand-primary/40',
    neutral: 'bg-neutral-grey/20 text-neutral-grey border border-neutral-grey/40',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={clsx('inline-block rounded-md font-medium', variantStyles[variant], sizeStyles[size], className)}>
      {label}
    </span>
  );
}
