# SearchHeader Component

Interactive search-enabled header with toggle functionality and smooth animations.

## Overview

The `SearchHeader` component combines navigation with integrated search functionality. It displays a search icon that toggles an animated search bar where users can enter search queries.

## Features

- **Search Toggle:** Click search icon to reveal search input
- **Smooth Animations:** Search bar slides in from top with `animate-slide-in-down`
- **Close Button:** X icon to dismiss search and clear input
- **Responsive Design:** 
  - Desktop: Logo + horizontal nav + search icon
  - Tablet: Same layout with adjusted spacing
  - Mobile: Logo + hamburger menu + search icon
- **Search Submission:** Custom handler for search queries
- **Keyboard Focus:** Auto-focuses search input when opened
- **Conflict Prevention:** Hides mobile menu when search is open

## Usage

### Basic Implementation

```tsx
import { SearchHeader } from '@/components';

export default function Page() {
  const handleSearch = (query: string) => {
    console.log('Search for:', query);
    // Navigate to search results, filter content, etc.
  };

  return (
    <>
      <SearchHeader 
        logo="MyPortfolio"
        onSearch={handleSearch}
      />
      {/* Page content */}
    </>
  );
}
```

### With Custom Links

```tsx
<SearchHeader 
  logo="Portfolio"
  links={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]}
  onSearch={(query) => {
    // Handle search - e.g., filter projects, navigate to search page
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }}
/>
```

## Props

### `SearchHeaderProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | string | `"Portfolio"` | Logo/brand text displayed on left |
| `links` | SearchHeaderLink[] | Default nav items | Array of navigation links with label and href |
| `onSearch` | (query: string) => void | undefined | Callback when user submits search |
| `className` | string | undefined | Additional Tailwind classes |

### `SearchHeaderLink`

```tsx
interface SearchHeaderLink {
  label: string;  // Link text
  href: string;   // Link URL or anchor
}
```

## Layout Breakdown

### Desktop (md+)
```
[Logo]  ← → [Home | About | Projects | Skills | Contact] ← → [Search Icon]
[Search Input] (when active)
```

### Tablet (sm-md)
```
Same as desktop with adjusted spacing
```

### Mobile (< sm)
```
[Logo]  ← → [Search Icon] [Hamburger]
[Mobile Menu] OR [Search Input] (mutually exclusive)
```

## Search Interaction Flow

1. **User clicks search icon** → Search bar slides in, input auto-focuses
2. **User types query** → Input value updates in real-time
3. **User submits search** → `onSearch` callback triggered, search closes
4. **User closes search** → Search bar slides out, input clears

## Animation Details

- **Search bar appearance:** `animate-slide-in-down` (slides from top)
- **Transitions:** 300ms cubic-bezier for smooth interactions
- **Icon hover:** Color transitions from neutral-grey to brand-primary

## Styling

All styling uses design system tokens:
- Colors: `bg-secondary`, `neutral-white`, `brand-primary`, `neutral-grey`
- Typography: `text-article-u` for normal text, `text-logo-m` for logo
- Spacing: 8px grid system via Tailwind classes
- Border radius: Inherited from `rounded-lg`

## Keyboard Interactions

- **Search icon:** Tab navigation, Enter to open search
- **Search input:** Type to search, Enter to submit, Escape to close (can be added)
- **Close button:** Tab navigation, Enter/Space to close

## Mobile Behavior

- Search and mobile menu are mutually exclusive (only one can be open)
- Search input takes full width of header minus close button
- Touch-friendly button sizes (min 44x44px)

## Example: With API Search

```tsx
'use client';

import { useState } from 'react';
import { SearchHeader } from '@/components';

export function PageWithSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      // Call your API
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <SearchHeader 
        onSearch={handleSearch}
      />
      
      {isSearching && <p>Searching...</p>}
      {results.length > 0 && (
        <div>
          {/* Display search results */}
        </div>
      )}
    </>
  );
}
```

## Accessibility

- Search icon has `aria-label="Toggle search"`
- Close button has `aria-label="Close search"`
- Hamburger menu has `aria-expanded` attribute
- All buttons are keyboard accessible
- Search input receives focus automatically when opened
- Semantic HTML structure

## TypeScript Support

```tsx
import type { SearchHeaderProps, SearchHeaderLink } from '@/types/components';

const config: SearchHeaderProps = {
  logo: 'Portfolio',
  links: [{ label: 'Home', href: '/' }],
  onSearch: (query) => console.log(query),
};
```

## Comparison with Header Component

| Feature | Header | SearchHeader |
|---------|--------|-------------|
| Navigation | Yes | Yes |
| Search | No | Yes |
| Search Toggle | N/A | Yes |
| Search Callback | N/A | Yes |
| Mobile Menu | Yes | Yes |
| Animations | Basic | Enhanced (slide-in) |

## Notes

- SearchHeader automatically uses default navigation links if none provided
- Integrates with `next-intl` for multilingual support
- Search state is local (doesn't persist between page navigations)
- For persistent search history, implement in the `onSearch` callback
- Close button clears search input for clean state
