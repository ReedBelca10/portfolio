module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* Color palette from design system */
      colors: {
        /* Background colors */
        bg: {
          primary: '#1F2937',
          secondary: '#111827',
        },
        /* Brand colors */
        brand: {
          primary: '#00D9FF',
          secondary: '#A0F0FF',
        },
        /* Neutral colors */
        neutral: {
          grey: '#374151',
          white: '#FFFFFF',
        },
        /* Technology stack colors */
        tech: {
          html: '#FF6B35',
          css: '#0052CC',
          javascript: '#F7B801',
          react: '#0EA5E9',
        },
      },

      /* Typography configuration */
      fontFamily: {
        primary: '"Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        monospace: '"IBM Plex Mono", "Courier New", monospace',
      },

      fontSize: {
        /* Ubuntu typography scale */
        'h1-u': ['117px', { lineHeight: '134px', fontWeight: '400' }],
        'h2-u': ['64px', { lineHeight: '72px', fontWeight: '400' }],
        'h3-u': ['32px', { lineHeight: '36px', fontWeight: '400' }],
        'h4-u': ['20px', { lineHeight: '24px', fontWeight: '400' }],
        'body-u': ['16px', { lineHeight: '32px', fontWeight: '300' }],
        'label-u': ['14px', { lineHeight: '16px', fontWeight: '500' }],

        /* IBM Plex Mono typography scale */
        'number-m': ['48px', { lineHeight: '52px', fontWeight: '500' }],
        'h2-m': ['32px', { lineHeight: '42px', fontWeight: '500' }],
        'logo-m': ['32px', { lineHeight: '42px', fontWeight: '500' }],
        'menu-m': ['24px', { lineHeight: '32px', fontWeight: '400' }],
        'media-m': ['16px', { lineHeight: '29px', fontWeight: '400' }],
        'code-m': ['14px', { lineHeight: '18px', fontWeight: '400' }],
      },

      /* Spacing configuration - 8px grid system */
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },

      /* Border radius configuration */
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },

      /* Shadow configuration */
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },

      /* Transition timing configuration */
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
        'very-slow': '500ms',
      },

      /* Z-index scale */
      zIndex: {
        'auto': 'auto',
        'base': '0',
        'docked': '10',
        'fixed': '20',
        'overlay': '30',
        'dropdown': '40',
        'sticky': '50',
        'popover': '60',
        'modal': '70',
        'tooltip': '80',
        'notification': '90',
      },
    },
  },
  plugins: [],
};
