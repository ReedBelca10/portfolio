# SidebarNav Component

Fixed sidebar navigation with scroll detection, hover tooltips, and click-to-navigate functionality.

## Overview

The `SidebarNav` component provides an icon-based navigation sidebar that:
- Displays 6 navigation items as circular icon buttons
- Shows tooltips on hover (2 second delay, except first icon)
- Highlights the current section based on scroll position
- Allows clicking icons to smooth-scroll to sections
- Hides on mobile, visible on desktop (lg+)

## Features

- **Scroll Detection:** Automatically highlights icon when section enters viewport
- **Hover Tooltips:** Labels appear after 2 second hover (immediate for first icon)
- **Click Navigation:** Click icon to smooth-scroll to corresponding section
- **Active Highlighting:** Current section highlighted with brand color and border
- **Responsive:** Hidden on small screens, visible on lg+ breakpoints
- **Accessible:** Full keyboard navigation and ARIA labels
- **RTL Ready:** Fixed positioning adapts to content direction

## Usage

### Basic Implementation

```tsx
import { SidebarNav } from '@/components';

export default function Page() {
  return (
    <>
      <SidebarNav />
      
      {/* Page sections with matching IDs */}
      <section id="home">Home Section</section>
      <section id="about">About Section</section>
      <section id="projects">Projects Section</section>
      <section id="skills">Skills Section</section>
      <section id="blog">Blog Section</section>
      <section id="contact">Contact Section</section>
    </>
  );
}
```

### With Custom Items

```tsx
<SidebarNav 
  items={[
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: <MyPortfolioIcon />,
      sectionId: 'portfolio-section',
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: <TestimonialIcon />,
      sectionId: 'testimonials-section',
    },
  ]}
  onNavigate={(sectionId) => console.log('Navigated to:', sectionId)}
/>
```

## Props

### `SidebarNavProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | NavItem[] | 6 default items | Custom navigation items |
| `onNavigate` | (sectionId: string) => void | undefined | Callback when user navigates |
| `className` | string | undefined | Additional Tailwind classes |

### `NavItem`

```tsx
interface NavItem {
  id: string;              // Unique identifier
  label: string;           // Tooltip label
  icon: React.ReactNode;   // SVG or icon component
  sectionId: string;       // Element ID to scroll to
}
```

## Default Navigation Items

1. **Home** - home section
2. **About Me** - about section
3. **Works** - projects section
4. **Skills** - skills section
5. **Blogs** - blog section
6. **Contact** - contact section

## Layout & Positioning

```
Fixed left sidebar:
┌─────────────┐
│    Home     │  ← Icon (12x12, centered)
│  About Me   │
│   Works     │
│   Skills    │
│   Blogs     │
│  Contact    │
└─────────────┘
```

- **Position:** Fixed on left side, vertically centered
- **Width:** 48px (icon button)
- **Spacing:** 32px gap between items
- **Z-index:** dropdown (30)
- **Visibility:** Hidden on sm/md, visible on lg+

## Interaction Flow

### Hover Behavior
1. **User hovers icon** → Border color changes to brand-primary/50
2. **After 2 seconds** → Tooltip appears with label and arrow
3. **User leaves icon** → Tooltip disappears, tooltip timer cleared

### First Icon Exception
- Home icon shows tooltip immediately on hover (no 2 second delay)
- Used for quick access feedback

### Click Navigation
1. **User clicks icon** → Smooth scroll to section
2. **onNavigate callback** → Triggered with sectionId
3. **Active state updated** → Icon highlights when section enters viewport

### Scroll Detection
- Checks section position every time user scrolls
- Detects section when top reaches 25% of viewport
- Updates active icon to match current section
- Smooth color transition (300ms) between states

## Styling Details

### Icon Button States

**Default:**
- Border: neutral-grey/30
- Background: bg-primary
- Icon color: neutral-grey

**Hover:**
- Border: brand-primary/50
- Background: bg-primary
- Icon color: brand-primary

**Active (Current Section):**
- Border: brand-primary
- Background: brand-primary/10
- Icon color: brand-primary

**Focus:**
- All states + focus-ring outline

### Tooltip Styling

- Background: neutral-white
- Text: bg-secondary
- Font: label-u (semi-bold)
- Shadow: shadow-md
- Arrow: 45° rotated square with drop shadow
- Animation: fade-in (appears smoothly)

## Scroll Detection Algorithm

```
For each scroll event:
  1. Iterate through all nav items
  2. Get element with section ID
  3. Check if element's top edge <= 25% of viewport height
  4. If true, set as active section
  5. Update highlighting with smooth transition
```

This ensures the active icon switches before section fully enters viewport.

## Accessibility

- **Keyboard Navigation:** Tab through icons, Enter/Space to activate
- **ARIA Labels:** `aria-label` on all buttons
- **Current Section:** `aria-current="page"` on active icon
- **Semantic HTML:** `<nav>` with `role="navigation"`
- **Focus Visible:** Focus ring on keyboard navigation
- **Screen Readers:** All icons have descriptive labels

## TypeScript Support

```tsx
import type { SidebarNavProps, NavItem } from '@/types/components';

const items: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeIcon />,
    sectionId: 'home',
  },
];

const navProps: SidebarNavProps = {
  items,
  onNavigate: (id) => console.log(id),
};
```

## CSS Classes Used

- `.fixed` - Fixed positioning
- `.left-0` - Align to left edge
- `.top-1/2` - Vertical centering
- `.-translate-y-1/2` - Center transform
- `.z-dropdown` - Stacking context (30)
- `.hidden.lg:flex` - Mobile hidden, desktop visible
- `.rounded-full` - Circular buttons
- `.animate-fade-in` - Tooltip appearance
- `.transition-all.duration-300` - Smooth state changes

## Mobile Behavior

The SidebarNav is completely hidden on mobile and tablet devices (< lg breakpoint, 1024px). For mobile navigation, use `Header` or `SearchHeader` component instead.

## Example: Complete Page Layout

```tsx
'use client';

import { SidebarNav, SearchHeader } from '@/components';

export default function PortfolioPage() {
  return (
    <>
      <SearchHeader />
      <SidebarNav />
      
      <main>
        <section id="home" className="min-h-screen bg-bg-primary">
          {/* Hero section */}
        </section>
        
        <section id="about" className="min-h-screen bg-bg-secondary">
          {/* About section */}
        </section>
        
        <section id="projects" className="min-h-screen">
          {/* Projects section */}
        </section>
        
        <section id="skills" className="min-h-screen bg-bg-secondary">
          {/* Skills section */}
        </section>
        
        <section id="blog" className="min-h-screen">
          {/* Blog section */}
        </section>
        
        <section id="contact" className="min-h-screen bg-bg-secondary">
          {/* Contact section */}
        </section>
      </main>
    </>
  );
}
```

## Event Listeners

### Scroll Listener
- Added on mount, removed on unmount
- Throttled by browser's requestAnimationFrame
- Detects section changes and updates active state

### Hover Timer
- `hoverTimeoutRef` manages the 2-second delay
- Cleared when user leaves icon or page unmounts
- Reset on each new hover

## Performance Considerations

- **Scroll Detection:** Runs on every scroll (browser optimized)
- **DOM Queries:** Performed on scroll, could cache for better performance
- **Re-renders:** Only when `activeSection` or `hoveredId` changes
- **Memory:** Hover timer properly cleaned up on unmount

## Customization Examples

### Custom Icons

```tsx
const customItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg>
        <rect x="3" y="3" width="7" height="7" />
      </svg>
    ),
    sectionId: 'dashboard',
  },
];

<SidebarNav items={customItems} />
```

### With Navigation Callback

```tsx
<SidebarNav 
  onNavigate={(sectionId) => {
    // Track analytics
    analytics.track('section_navigated', { section: sectionId });
  }}
/>
```

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Scroll behavior smooth scrolling (graceful degradation on older browsers)
- CSS Grid/Flexbox for layout
- SVG icons (inline)

## Notes

- Section IDs must exist in DOM for scroll detection to work
- Tooltip arrow requires SVG filter support (all modern browsers)
- Positioned relative to viewport, not document
- Works with any page height (no maximum constraints)
