# Design System Documentation

Portfolio design system provides consistent, cohesive styling across all frontend applications.

## Color Palette

### Background Colors
- **BG Primary** `#1F2937` - Main background for dark sections
- **BG Secondary** `#111827` - Darker accent background

### Brand Colors
- **Brand Primary** `#00D9FF` - Primary interaction color (Cyan)
- **Brand Secondary** `#A0F0FF` - Secondary accent (Light Cyan)

### Neutral Colors
- **Grey** `#374151` - Neutral medium tone
- **White** `#FFFFFF` - Light/neutral tone

### Technology Colors
- **HTML** `#FF6B35` - Orange for HTML/Markup
- **CSS** `#0052CC` - Blue for CSS/Styling
- **JavaScript** `#F7B801` - Yellow for JavaScript/Logic
- **React** `#0EA5E9` - Light Blue for React/Components

## Typography

### Primary Font: Ubuntu
Humanist sans-serif for all body text and headings

**Sizes:**
- **BG Text-U**: 117px / 134px line-height (Largest heading)
- **H1-U**: 64px / 72px line-height
- **H2-U**: 32px / 36px line-height
- **H3-U**: 20px / 24px line-height (Buttons)
- **Article-U**: 16px / 32px line-height (Body text, light weight)
- **Label-U**: 14px / 16px line-height (Medium weight)

### Monospace Font: IBM Plex Mono
Used for code, numbers, and technical content

**Sizes:**
- **Number-M**: 48px / 52px line-height (Medium weight)
- **H2-M**: 32px / 42px line-height
- **Logo-M**: 32px / 42px line-height
- **Menu-M**: 24px / 32px line-height
- **Media-M**: 16px / 29px line-height
- **Code-M**: 14px / 18px line-height

## Spacing

8px grid-based spacing system:
- `4px` (0.5 unit)
- `8px` (1 unit)
- `12px` (1.5 units)
- `16px` (2 units)
- `24px` (3 units)
- `32px` (4 units)
- `48px` (6 units)
- `64px` (8 units)

## Components

### Button
```tsx
import { Button } from '@/components';

// Primary variant (default)
<Button variant="primary" size="md">
  Click Me
</Button>

// Secondary variant
<Button variant="secondary">Secondary</Button>

// Outline variant
<Button variant="outline">Outline</Button>

// Ghost variant
<Button variant="ghost">Ghost</Button>

// Sizes: sm | md | lg
```

### Badge
```tsx
import { Badge } from '@/components';

<Badge label="React" variant="react" size="md" />
<Badge label="TypeScript" variant="javascript" />
```

### SkillBadge
```tsx
import { SkillBadge } from '@/components';

<SkillBadge 
  name="React" 
  category="react" 
  level="expert" 
  showLevel={true}
  size="md"
/>
```

### Card
```tsx
import { Card } from '@/components';

<Card variant="elevated" padding="md">
  Content goes here
</Card>

// Variants: elevated | outlined | ghost
// Padding: sm | md | lg
```

### Heading
```tsx
import { Heading } from '@/components';

<Heading level={1}>Main Title</Heading>
<Heading level={2} className="text-brand-primary">
  Subtitle
</Heading>
```

### Section
```tsx
import { Section } from '@/components';

<Section padding="lg" variant="default">
  <h1>Section Title</h1>
</Section>

// Variants: default | accent | subtle
// Padding: xs | sm | md | lg | xl
```

### Icon
```tsx
import { Icon, GitHubIcon, ChevronRightIcon } from '@/components';

// Predefined icons
<GitHubIcon size="md" />
<ChevronRightIcon size="lg" />

// Custom icon wrapper
<Icon size="md" title="Custom Icon">
  <svg>...</svg>
</Icon>
```

## Tailwind Utilities

Custom color utility classes:

```tsx
// Background colors
<div className="bg-bg-primary">Primary background</div>
<div className="bg-brand-primary">Brand primary</div>
<div className="bg-tech-html">HTML technology</div>

// Text colors
<p className="text-brand-primary">Primary text</p>
<p className="text-tech-css">CSS text</p>

// Border colors
<div className="border-2 border-brand-primary">Bordered</div>
```

## Animations

Built-in animation utilities:

```tsx
// Fade in animation
<div className="animate-fade-in">Fades in</div>

// Slide up animation
<div className="animate-slide-in-up">Slides up</div>

// Pulse animation
<div className="animate-pulse-subtle">Pulses subtly</div>
```

## Responsive Design

All components support responsive variants using Tailwind breakpoints:

```tsx
<Button size="sm" className="md:size-md lg:size-lg">
  Responsive Button
</Button>
```

## Accessibility

All components include:
- Semantic HTML structure
- ARIA attributes where appropriate
- Focus states and keyboard navigation
- Color contrast compliance
- Screen reader support

## Usage Guidelines

1. **Use semantic components** - Prefer `<Heading>`, `<Section>`, `<Card>` over raw HTML
2. **Maintain color consistency** - Use defined color tokens rather than arbitrary values
3. **Respect spacing scale** - Use 8px grid-based spacing
4. **Prioritize accessibility** - Include alt text, ARIA labels, semantic HTML
5. **Mobile-first approach** - Design mobile layouts first, enhance for larger screens
6. **Dark mode ready** - Design accounts for dark background usage

## Customization

To customize the design system:

1. Edit `packages/config/src/design-tokens.ts` for token values
2. Update `apps/frontend/tailwind.config.js` for Tailwind configuration
3. Modify `apps/frontend/src/app/globals.css` for global styles
4. Component changes go in `apps/frontend/src/components/`

## Performance

- All components use CSS classes (no inline styles)
- Animations use GPU-accelerated properties (transform, opacity)
- Components support React Server Components
- Minimal JavaScript for better performance

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- ES2020+ JavaScript features
- CSS Grid and Flexbox support required
