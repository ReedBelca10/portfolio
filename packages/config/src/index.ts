import type { Skill, Project, Portfolio, Service, Testimonial } from '@shared/types';

/**
 * Configuration centralisée
 */

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337',
  timeout: 10000,
  retries: 3,
};

export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
};

export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
  namespaces: ['common', 'home', 'about', 'projects', 'contact'],
};

export const SITE_CONFIG = {
  name: 'My Portfolio',
  description: 'Professional portfolio website',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: 'Your Name',
  email: 'your.email@example.com',
};

/**
 * Catégories et énumérations
 */
export const SKILL_CATEGORIES = {
  programming: 'Programming',
  design: 'Design',
  tool: 'Tool',
  'soft-skill': 'Soft Skill',
} as const;

export const SKILL_LEVELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
} as const;

/**
 * Constantes d'application
 */
export const CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  PAGINATION_LIMIT: 20,
  CACHE_TTL: 3600, // 1 hour
};

/**
 * Design System Exports
 */
export {
  ColorTokens,
  TypographyTokens,
  IconsInfo,
  SpacingTokens,
  BorderRadiusTokens,
  ShadowTokens,
  ZIndexTokens,
  TransitionTokens,
} from './design-tokens';
