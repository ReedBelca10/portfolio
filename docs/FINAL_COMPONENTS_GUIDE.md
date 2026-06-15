# Final Key Components - Quick Reference

## 1. ModuleTitle Component

**Purpose:** Section header with badge, title accent, and description

```tsx
import { ModuleTitle } from '@/components';

<ModuleTitle 
  badge="Featured"
  title="My Latest Work"
  description="A collection of my recent projects and achievements"
/>
```

**Props:**
- `badge?` (string) - Optional badge text above title
- `title` (string) - Main section title
- `description?` (string) - Subtitle/description text
- `className?` (string) - Additional Tailwind classes

**Features:**
- Centered layout with gradient underline accent
- Optional badge with design system styling
- Responsive typography using design tokens

---

## 2. BlogColumn Component

**Purpose:** Responsive blog/article card with full metadata

```tsx
import { BlogColumn } from '@/components';

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <BlogColumn
    image="/blog-image.jpg"
    imageAlt="Article preview"
    title="Getting Started with React"
    excerpt="Learn the fundamentals of React and build your first component..."
    date="2026-06-15"
    readingTime="5"
    author="John Doe"
    tags={["React", "JavaScript", "Tutorial"]}
    link="https://blog.example.com/react-intro"
    featured={false}
  />
</div>
```

**Props:**
- `image` (string) - Article image URL
- `imageAlt` (string) - Image alt text for accessibility
- `title` (string) - Article title
- `excerpt` (string) - Article preview text
- `date` (string) - Publication date (ISO format)
- `readingTime` (string) - Estimated reading time in minutes
- `author` (string) - Author name
- `tags` (string[]) - Array of technology/topic tags
- `link?` (string) - Link to full article
- `featured?` (boolean) - Span 2 columns on md+ screens
- `className?` (string) - Additional Tailwind classes

**Features:**
- Image hover zoom effect
- Featured variant for grid spanning
- Technology tags with color coding
- Automatic date formatting
- Responsive image sizing

---

## 3. Header Component

**Purpose:** Fully responsive navigation header

```tsx
import { Header } from '@/components';

<Header 
  logo="MyPortfolio"
  links={[
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]}
/>
```

**Props:**
- `logo?` (string) - Logo/brand text (default: "Portfolio")
- `links?` (HeaderLink[]) - Navigation links with label and href
- `className?` (string) - Additional Tailwind classes

**Responsive Behavior:**
- **Desktop (md+):** Horizontal logo + nav links
- **Tablet (sm):** Same as desktop with adjusted spacing
- **Mobile (< sm):** Logo + animated hamburger menu with drawer

**Features:**
- Sticky positioning with z-index management
- Animated hamburger menu with 3-line icon transform
- Mobile drawer slides in from top
- Integrates with next-intl for multilingual support
- Smooth transitions on menu toggle

---

## 4. Footer Component

**Purpose:** Fully responsive footer with three layouts

```tsx
import { Footer } from '@/components';

<Footer
  copyrightText="© 2026 My Portfolio. All rights reserved."
  legalLinks={[
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
  ]}
  socialLinks={{
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/username',
  }}
/>
```

**Props:**
- `copyrightText?` (string) - Copyright notice (auto-generates year if not provided)
- `legalLinks?` (FooterLink[]) - Array of legal links
- `socialLinks?` (FooterSocialLinks) - Social media URLs (github, linkedin, twitter)
- `className?` (string) - Additional Tailwind classes

**Responsive Layouts:**

**Desktop (md+):**
```
[Copyright] ← → [Legal Links] ← → [Social Icons]
(space-between alignment)
```

**Tablet (sm-md):**
```
    [Social Icons]
[Copyright] [Legal Links]
(centered stacked)
```

**Mobile (< sm):**
```
[Social Icons]
[Copyright]
[Legal Links]
(fully vertical, centered)
```

**Features:**
- Circular social icon buttons with hover effects
- Responsive layout switching
- Click handlers for social links (opens in new tab)
- Smooth color transitions
- Full accessibility support

---

## Usage Examples

### Complete Page with All Components

```tsx
import { Header, ModuleTitle, Section, BlogColumn, Footer } from '@/components';

export default function Blog() {
  return (
    <>
      <Header />
      
      <Section padding="lg">
        <ModuleTitle
          badge="Blog"
          title="Latest Articles"
          description="Insights, tutorials, and thoughts on web development"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* BlogColumn components */}
        </div>
      </Section>
      
      <Footer />
    </>
  );
}
```

---

## Component Integration

All components integrate seamlessly:
- Use **Header** + **Footer** as layout wrappers
- Use **ModuleTitle** to introduce each section
- Use **BlogColumn** inside grids for content display
- All inherit design system colors and typography
- Fully responsive without additional configuration

---

## TypeScript Support

All components are fully typed with exported interfaces:

```tsx
import type {
  ModuleTitleProps,
  BlogColumnProps,
  HeaderProps,
  HeaderLink,
  FooterProps,
  FooterLink,
  FooterSocialLinks,
} from '@/types/components';
```

---

## Accessibility Features

- **Header:** Hamburger menu with ARIA labels, keyboard navigation
- **Footer:** Semantic footer element, button labels for social icons
- **BlogColumn:** Image alt text, semantic article markup
- **ModuleTitle:** Semantic heading hierarchy with h2

---

## Git Commit

**Commit 12:** `feat: add final key components - ModuleTitle, BlogColumn, Header, Footer`
- 7 files changed, 555 insertions
- 4 new components + type definitions + exports
