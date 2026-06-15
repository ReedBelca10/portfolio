'use client';

import React from 'react';
import clsx from 'clsx';

/*
 * Container Component
 * Wrapper for consistent max-width and horizontal padding
 */

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={clsx('container-custom', className)} {...props}>
      {children}
    </div>
  );
}
