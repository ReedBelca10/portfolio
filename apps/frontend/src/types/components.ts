/**
 * Component Types and Interfaces
 * Type definitions for all UI components
 */

import React from 'react';

/**
 * Button Component Props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Badge Component Props
 */
export interface BadgeProps {
  label: string;
  variant?: 'html' | 'css' | 'javascript' | 'react' | 'brand' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Card Component Props
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'ghost';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Icon Component Props
 */
export interface IconProps {
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

/**
 * Heading Component Props
 */
export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  asChild?: React.ElementType;
}

/**
 * Section Component Props
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'accent' | 'subtle';
  fullWidth?: boolean;
  className?: string;
}

/**
 * SkillBadge Component Props
 */
export interface SkillBadgeProps {
  name: string;
  category?: 'html' | 'css' | 'javascript' | 'react' | 'programming' | 'design' | 'tool' | 'other';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  showLevel?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Navigation Component Props
 */
export interface NavigationProps {
  className?: string;
}
