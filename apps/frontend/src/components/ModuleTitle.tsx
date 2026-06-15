'use client';

import React from 'react';
import clsx from 'clsx';

/*
 * ModuleTitle Component
 * Centered section header with badge, title with accent underline, and description
 */

interface ModuleTitleProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

export function ModuleTitle({ badge, title, description, className }: ModuleTitleProps) {
  return (
    <div className={clsx('flex flex-col items-center justify-center text-center', className)}>
      {badge && (
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-brand-primary bg-brand-primary/15 rounded-full border border-brand-primary/30">
          {badge}
        </span>
      )}

      <div className="relative mb-4">
        <h2 className="text-h2-u font-semibold text-neutral-white">
          {title}
        </h2>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-3" />
      </div>

      {description && (
        <p className="text-article-u text-neutral-grey max-w-2xl mt-6">
          {description}
        </p>
      )}
    </div>
  );
}
