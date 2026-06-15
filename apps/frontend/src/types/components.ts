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
 * ModuleTitle Component Props
 */
export interface ModuleTitleProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * BlogColumn Component Props
 */
export interface BlogColumnProps {
  image: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  author: string;
  tags: string[];
  link?: string;
  featured?: boolean;
  className?: string;
}

/**
 * Header Component Props
 */
export interface HeaderLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  logo?: string;
  links?: HeaderLink[];
  className?: string;
}

/**
 * SearchHeader Component Props
 */
export interface SearchHeaderLink {
  label: string;
  href: string;
}

export interface SearchHeaderProps {
  logo?: string;
  links?: SearchHeaderLink[];
  onSearch?: (query: string) => void;
  className?: string;
}

/**
 * SidebarNav Component Props
 */
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  sectionId: string;
}

export interface SidebarNavProps {
  items?: NavItem[];
  className?: string;
  onNavigate?: (sectionId: string) => void;
}

/**
 * Footer Component Props
 */
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface FooterProps {
  copyrightText?: string;
  legalLinks?: FooterLink[];
  socialLinks?: FooterSocialLinks;
  className?: string;
}
