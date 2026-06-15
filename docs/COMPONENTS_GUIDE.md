# Component Usage Guide

Quick reference for using components in the portfolio project.

## Import Components

```tsx
import {
  Button,
  Badge,
  Card,
  Icon,
  Navigation,
  Heading,
  Section,
  SkillBadge,
  ChevronRightIcon,
  GitHubIcon,
} from '@/components';
```

## Button Component

### Basic Usage
```tsx
<Button>Click me</Button>
```

### Variants
```tsx
// Primary (default)
<Button variant="primary">Primary</Button>

// Secondary
<Button variant="secondary">Secondary</Button>

// Outline
<Button variant="outline">Outline</Button>

// Ghost
<Button variant="ghost">Ghost</Button>
```

### Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
```

### With Icons
```tsx
<Button leftIcon={<GitHubIcon />}>GitHub</Button>
<Button rightIcon={<ChevronRightIcon />}>Next</Button>
```

### Loading State
```tsx
<Button isLoading={true}>Processing...</Button>
```

## Badge Component

### Basic Usage
```tsx
<Badge label="React" />
```

### Technology Variants
```tsx
<Badge label="HTML" variant="html" />
<Badge label="CSS" variant="css" />
<Badge label="JavaScript" variant="javascript" />
<Badge label="React" variant="react" />
```

### Sizes
```tsx
<Badge label="Small" size="sm" />
<Badge label="Medium" size="md" />
<Badge label="Large" size="lg" />
```

## Card Component

### Basic Usage
```tsx
<Card>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

### Variants
```tsx
// Elevated (default with shadow)
<Card variant="elevated">Content</Card>

// Outlined (border only)
<Card variant="outlined">Content</Card>

// Ghost (subtle background)
<Card variant="ghost">Content</Card>
```

### Padding
```tsx
<Card padding="sm">Compact</Card>
<Card padding="md">Medium (default)</Card>
<Card padding="lg">Spacious</Card>
```

### With Tailwind Classes
```tsx
<Card className="hover:shadow-xl cursor-pointer">
  Interactive card
</Card>
```

## Icon Component

### Predefined Icons
```tsx
import { GitHubIcon, LinkedInIcon, TwitterIcon, ExternalLinkIcon, ChevronRightIcon } from '@/components';

<GitHubIcon size="md" />
<LinkedInIcon size="lg" />
<TwitterIcon size="sm" />
<ExternalLinkIcon />
<ChevronRightIcon size="xl" />
```

### Custom Icon
```tsx
<Icon size="md" title="Custom">
  <svg viewBox="0 0 24 24">
    {/* SVG path */}
  </svg>
</Icon>
```

### Icon Sizes
```tsx
<GitHubIcon size="xs" />   {/* 16px */}
<GitHubIcon size="sm" />   {/* 20px */}
<GitHubIcon size="md" />   {/* 24px (default) */}
<GitHubIcon size="lg" />   {/* 32px */}
<GitHubIcon size="xl" />   {/* 48px */}
```

## Heading Component

### Basic Usage
```tsx
<Heading level={1}>Main Title</Heading>
<Heading level={2}>Subtitle</Heading>
<Heading level={3}>Section</Heading>
```

### With Styling
```tsx
<Heading level={1} className="text-brand-primary">
  Primary Color Title
</Heading>
```

### As Different HTML Tag
```tsx
<Heading level={1} asChild="div">
  Styled as h1 but renders as div
</Heading>
```

## Section Component

### Basic Usage
```tsx
<Section>
  <Heading level={2}>Section Title</Heading>
  <p>Content goes here</p>
</Section>
```

### Variants
```tsx
// Default (bg-bg-secondary)
<Section variant="default">Default</Section>

// Accent (brand color background)
<Section variant="accent">Accent</Section>

// Subtle (subtle background)
<Section variant="subtle">Subtle</Section>
```

### Padding
```tsx
<Section padding="xs">Extra small padding</Section>
<Section padding="sm">Small padding</Section>
<Section padding="md">Medium padding (default)</Section>
<Section padding="lg">Large padding</Section>
<Section padding="xl">Extra large padding</Section>
```

### Full Width
```tsx
<Section fullWidth={true}>
  Full width background, centered content
</Section>
```

## SkillBadge Component

### Basic Usage
```tsx
<SkillBadge name="React" />
```

### With Category Color
```tsx
<SkillBadge name="HTML" category="html" />
<SkillBadge name="React" category="react" />
<SkillBadge name="JavaScript" category="javascript" />
<SkillBadge name="Python" category="programming" />
```

### With Level Display
```tsx
<SkillBadge 
  name="React" 
  category="react"
  level="expert"
  showLevel={true}
/>
```

### Sizes
```tsx
<SkillBadge name="Small" size="sm" />
<SkillBadge name="Medium" size="md" />
<SkillBadge name="Large" size="lg" />
```

## Navigation Component

### Basic Usage
```tsx
<Navigation />
```

Automatically:
- Displays navigation links using translation keys
- Applies design system styling
- Supports locale switching (English/French)

## Practical Examples

### Hero Section
```tsx
<Section padding="xl" variant="accent" fullWidth>
  <Heading level={1}>Welcome to My Portfolio</Heading>
  <p className="text-lg mt-4">I build amazing web experiences</p>
  <Button variant="primary" size="lg" className="mt-8">
    View My Work
  </Button>
</Section>
```

### Project Card
```tsx
<Card variant="elevated" padding="md">
  <Heading level={3}>Project Name</Heading>
  <p className="mt-2 text-neutral-grey">Project description</p>
  <div className="flex gap-2 mt-4">
    <SkillBadge name="React" category="react" size="sm" />
    <SkillBadge name="TypeScript" category="javascript" size="sm" />
  </div>
  <Button 
    variant="outline" 
    rightIcon={<ExternalLinkIcon />}
    className="mt-6 w-full"
  >
    View Project
  </Button>
</Card>
```

### Skills Grid
```tsx
<Section>
  <Heading level={2}>Skills</Heading>
  <div className="flex flex-wrap gap-3 mt-6">
    <SkillBadge name="React" category="react" level="expert" showLevel />
    <SkillBadge name="TypeScript" category="javascript" level="advanced" showLevel />
    <SkillBadge name="Tailwind CSS" category="css" level="expert" showLevel />
    <SkillBadge name="Node.js" category="programming" level="advanced" showLevel />
  </div>
</Section>
```

### Social Links
```tsx
<div className="flex gap-4">
  <a href="https://github.com" aria-label="GitHub">
    <GitHubIcon size="lg" className="text-neutral-grey hover:text-brand-primary transition-colors" />
  </a>
  <a href="https://linkedin.com" aria-label="LinkedIn">
    <LinkedInIcon size="lg" className="text-neutral-grey hover:text-brand-primary transition-colors" />
  </a>
  <a href="https://twitter.com" aria-label="Twitter">
    <TwitterIcon size="lg" className="text-neutral-grey hover:text-brand-primary transition-colors" />
  </a>
</div>
```

## Best Practices

1. **Use semantic components** - Prefer components over raw HTML
2. **Maintain consistency** - Use defined sizes and variants
3. **Plan spacing** - Use the 8px grid system via Tailwind classes
4. **Test accessibility** - Ensure keyboard navigation and screen reader compatibility
5. **Keep code DRY** - Extract repeated patterns into components
6. **Use TypeScript** - Leverage component prop types for better development experience

## Troubleshooting

### Components not styled properly
- Ensure Tailwind CSS is properly configured
- Check that design tokens are imported in `tailwind.config.js`
- Verify `globals.css` is imported in your layout

### Icon not displaying
- Ensure icon name/size is correct
- Check SVG viewBox attribute matches icon dimensions
- Use `title` prop for accessibility

### Colors not matching design
- Verify color class names use design token names (e.g., `bg-brand-primary`)
- Check `design-tokens.ts` for correct color values
- Ensure Tailwind config includes color extensions
