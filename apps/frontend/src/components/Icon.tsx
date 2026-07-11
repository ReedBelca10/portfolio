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

export function DiscordIcon({ size = 'md' }: Omit<IconProps, 'children'>) {
  const sizeValue = sizeMap[size];
  return (
    <Icon size={size} title="discord">
      <svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    </Icon>
  );
}

export function GitLabIcon({ size = 'md' }: Omit<IconProps, 'children'>) {
  const sizeValue = sizeMap[size];
  return (
    <Icon size={size} title="gitlab">
      <svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.65 14.39L12 22.17 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 5.1 2h.02a.43.43 0 0 1 .4.27l2.95 9.11h6.98l2.95-9.11a.42.42 0 0 1 .41-.27h.01a.42.42 0 0 1 .4.27l2.44 7.51 1.22 3.78a.84.84 0 0 1-.23.93z" />
      </svg>
    </Icon>
  );
}
