'use client';

import React from 'react';

/*
 * Icon Component Wrapper
 * Base wrapper for icon usage with consistent sizing and styling
 * Supports Feather icon set and custom SVG icons
 */

interface IconProps {
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

const sizeMap = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

export function Icon({ name, size = 'md', className, children, title }: IconProps) {
  const sizeValue = sizeMap[size];

  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 ${className || ''}`}
      role="img"
      aria-label={title || name}
      title={title}
    >
      {children || (
        <svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1" />
        </svg>
      )}
    </span>
  );
}

/*
 * Predefined Icon Components for common use cases
 */

export function ChevronRightIcon({ size = 'md' }: Omit<IconProps, 'children'>) {
  const sizeValue = sizeMap[size];
  return (
    <Icon size={size} title="chevron right">
      <svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </Icon>
  );
}

export function ExternalLinkIcon({ size = 'md' }: Omit<IconProps, 'children'>) {
  const sizeValue = sizeMap[size];
  return (
    <Icon size={size} title="external link">
      <svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </Icon>
  );
}

export function GitHubIcon({ size = 'md' }: Omit<IconProps, 'children'>) {
  const sizeValue = sizeMap[size];
  return (
    <Icon size={size} title="github">
      <svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    </Icon>
  );
}

export function LinkedInIcon({ size = 'md' }: Omit<IconProps, 'children'>) {
  const sizeValue = sizeMap[size];
  return (
    <Icon size={size} title="linkedin">
      <svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.366c.43-.664 1.199-1.608 2.928-1.608 2.136 0 3.745 1.395 3.745 4.393v5.495zM5.337 9.432c-1.144 0-1.915-.758-1.915-1.708 0-.951.77-1.708 1.958-1.708 1.188 0 1.915.757 1.915 1.708 0 .95-.726 1.708-1.958 1.708zm1.582 11.02H3.755V9.906h3.164v10.546zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    </Icon>
  );
}

export function TwitterIcon({ size = 'md' }: Omit<IconProps, 'children'>) {
  const sizeValue = sizeMap[size];
  return (
    <Icon size={size} title="twitter">
      <svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
      </svg>
    </Icon>
  );
}
