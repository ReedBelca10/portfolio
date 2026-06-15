/*
 * Design System Tokens
 * Centralized design token definitions for consistent UI implementation
 */

export const ColorTokens = {
  /* Background Colors */
  background: {
    primary: '#1F2937',    /* BG 1 - Primary background */
    secondary: '#111827',  /* BG 2 - Secondary/darker background */
  },

  /* Brand Colors */
  brand: {
    primary: '#00D9FF',    /* Brand 1 - Primary brand cyan */
    secondary: '#A0F0FF',  /* Brand 2 - Light cyan accent */
  },

  /* Neutral Colors */
  neutral: {
    grey: '#374151',       /* Grey - Medium neutral grey */
    white: '#FFFFFF',      /* White - Light neutral */
  },

  /* Technology/Stack Colors */
  tech: {
    html: '#FF6B35',       /* HTML - Orange */
    css: '#0052CC',        /* CSS - Blue */
    javascript: '#F7B801', /* JavaScript - Yellow */
    react: '#0EA5E9',      /* React - Light blue */
  },
} as const;

export const TypographyTokens = {
  /* Font Families */
  fonts: {
    primary: '"Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    monospace: '"IBM Plex Mono", "Courier New", monospace',
  },

  /* Font Sizes - Ubuntu */
  sizes: {
    /* Heading Styles */
    h1: {
      size: '117px',
      lineHeight: '134px',
      weight: 'regular',
      name: 'BG Text-U',
    },
    h2: {
      size: '64px',
      lineHeight: '72px',
      weight: 'regular',
      name: 'H1-U',
    },
    h3: {
      size: '32px',
      lineHeight: '36px',
      weight: 'regular',
      name: 'H2-U',
    },
    h4: {
      size: '20px',
      lineHeight: '24px',
      weight: 'regular',
      name: 'Button-U',
    },

    /* Body Text Styles */
    body: {
      size: '16px',
      lineHeight: '32px',
      weight: 'light',
      name: 'Article-U',
    },
    bodySmall: {
      size: '14px',
      lineHeight: '32px',
      weight: 'light',
      name: 'Label-U/L',
    },
    label: {
      size: '14px',
      lineHeight: '16px',
      weight: 'medium',
      name: 'Label-U/M',
    },
  },

  /* Monospace Font Sizes - IBM Plex Mono */
  monospace: {
    number: {
      size: '48px',
      lineHeight: '52px',
      weight: 'medium',
      name: 'Number-M',
    },
    h2: {
      size: '32px',
      lineHeight: '42px',
      weight: 'medium',
      name: 'H2-M',
    },
    logo: {
      size: '32px',
      lineHeight: '42px',
      weight: 'medium',
      name: 'Logo-M',
    },
    menu: {
      size: '24px',
      lineHeight: '32px',
      weight: 'regular',
      name: 'Menu-M',
    },
    media: {
      size: '16px',
      lineHeight: '29px',
      weight: 'regular',
      name: 'Media-M',
    },
    paragraph: {
      size: '16px',
      lineHeight: '29px',
      weight: 'regular',
      name: 'Paragraph-M',
    },
    code: {
      size: '14px',
      lineHeight: '18px',
      weight: 'regular',
      name: 'Code-M',
    },
  },
} as const;

/*
 * Icon Set: Feather-style icons (200+ glyphs)
 * Used for UI elements, technology badges, and interactive components
 */
export const IconsInfo = {
  total: 200,
  category: 'Feather',
  sizes: ['16px', '24px', '32px'],
  usage: {
    navigation: 'Primary UI navigation icons',
    technology: 'Tech stack visual indicators',
    interactive: 'CTA and button icons',
    status: 'Status and alert icons',
  },
} as const;

/*
 * Spacing Scale (8px grid system)
 */
export const SpacingTokens = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

/*
 * Border Radius
 */
export const BorderRadiusTokens = {
  none: '0px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
} as const;

/*
 * Shadows
 */
export const ShadowTokens = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

/*
 * Z-Index Scale
 */
export const ZIndexTokens = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  fixed: 20,
  overlay: 30,
  dropdown: 40,
  sticky: 50,
  popover: 60,
  modal: 70,
  tooltip: 80,
  notification: 90,
  max: 999,
} as const;

/*
 * Transition / Animation Tokens
 */
export const TransitionTokens = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  verySlow: '500ms',

  timing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
