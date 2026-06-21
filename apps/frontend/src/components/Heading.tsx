'use client';

import React from 'react';
import clsx from 'clsx';

/*
 * Heading Component
 * Flexible heading component with semantic HTML and consistent styling
 */

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  asChild?: React.ElementType;
}

export function Heading({ level, children, className, asChild: Component }: HeadingProps) {
  const HeadingTag = Component || (`h${level}` as keyof JSX.IntrinsicElements);

  const sizeMap = {
    1: 'text-h1-u',
    2: 'text-h2-u',
    3: 'text-h3-u',
    4: 'text-h4-u',
    5: 'text-lg',
    6: 'text-base',
  };

  return React.createElement(
    HeadingTag,
    { className: clsx('font-semibold text-neutral-white', sizeMap[level], className) },
    children
  );
}
