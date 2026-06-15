'use client';

import React from 'react';
import clsx from 'clsx';

/*
 * Section Component
 * Container component for page sections with consistent spacing
 */

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'accent' | 'subtle';
  fullWidth?: boolean;
  className?: string;
}

export function Section({
  children,
  padding = 'lg',
  variant = 'default',
  fullWidth = false,
  className,
  ...props
}: SectionProps) {
  const paddingMap = {
    xs: 'py-4 px-4',
    sm: 'py-8 px-4',
    md: 'py-12 px-4',
    lg: 'py-16 px-4',
    xl: 'py-24 px-4',
  };

  const variantStyles = {
    default: 'bg-bg-secondary',
    accent: 'bg-brand-primary/10 border-y border-brand-primary/20',
    subtle: 'bg-bg-primary/50',
  };

  const containerClass = fullWidth ? 'w-full' : 'container-custom';

  return (
    <section className={clsx(variantStyles[variant], paddingMap[padding], className)} {...props}>
      <div className={containerClass}>{children}</div>
    </section>
  );
}
