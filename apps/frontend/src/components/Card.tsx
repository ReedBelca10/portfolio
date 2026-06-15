'use client';

import React from 'react';
import clsx from 'clsx';

/*
 * Card Component
 * Container for grouping related content with visual separation
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'ghost';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Card({ children, variant = 'elevated', padding = 'md', className, ...props }: CardProps) {
  const variantStyles = {
    elevated: 'bg-neutral-white shadow-lg border border-neutral-grey/10',
    outlined: 'bg-neutral-white border-2 border-neutral-grey',
    ghost: 'bg-bg-primary/5 border border-bg-primary/20',
  };

  const paddingStyles = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={clsx('rounded-lg transition-all duration-base', variantStyles[variant], paddingStyles[padding], className)} {...props}>
      {children}
    </div>
  );
}
