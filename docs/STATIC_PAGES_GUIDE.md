# Static Pages Implementation

Complete implementation of static portfolio pages with SearchHeader, SidebarNav, and modular sections.

## Pages Overview

The portfolio consists of 6 main sections integrated into a single scrollable page:

### 1. Hero Section (Home)
- Large headline with brand color
- Subtitle describing the portfolio
- Two CTA buttons: "View My Work" and "Get in Touch"
- Full viewport height with gradient background
- Smooth scroll anchor: `#home`

### 2. About Section
- ModuleTitle with badge "About"
- Two-column layout (desktop)
- Left: Multiple paragraph descriptions
- Right: Key highlights box with 4 bullet points
- Full viewport height
- Alternating background colors
- Scroll anchor: `#about`

### 3. Projects Section (Works)
- ModuleTitle with badge "Portfolio"
- 3-column grid layout (responsive: 1 mobile, 2 tablet, 3 desktop)
- 6 project cards with:
  - Placeholder image area (aspect video)
  - Project title and description
  - "View Project" button
  - Hover effects (shadow, color transitions)
- Scroll anchor: `#projects`

### 4. Skills Section
- ModuleTitle with badge "Expertise"
- 4-column grid layout (responsive)
- 8 skill category cards (Frontend, Backend, Design, Database, Tools, DevOps, Testing, Other)
- Each card lists 4 example technologies
- Scroll anchor: `#skills`

### 5. Blog Section
- ModuleTitle with badge "Articles"
- 3-column grid layout (responsive)
- 6 blog post cards with:
  - Placeholder image area
  - Publication date
  - Post title
  - Excerpt with line-clamp-2
  - "Read More" button
  - Hover effects
- Scroll anchor: `#blog`

### 6. Contact Section
- ModuleTitle with badge "Get in Touch"
- Contact form with:
  - Name input
  - Email input
  - Message textarea (5 rows)
  - Submit button
- Contact information cards (Email, Location)
- Full viewport height
- Scroll anchor: `#contact`

## Layout Architecture

### Page Structure
```
Header (SearchHeader - sticky)
└── Sidebar (SidebarNav - fixed left)
    └── Main Content (6 sections)
        ├── Hero (#home)
        ├── About (#about)
        ├── Projects (#projects)
        ├── Skills (#skills)
        ├── Blog (#blog)
        └── Contact (#contact)
    └── Footer (added separately when needed)
```

### Responsive Breakpoints
- **Mobile** (< 640px): Single column, stacked layout
- **Tablet** (640px - 1024px): 2 columns where applicable
- **Desktop** (> 1024px): Full 3-4 column grids, sidebar visible

### Color Alternation
- Hero: `bg-bg-secondary` (dark)
- About: `bg-bg-primary` (darker)
- Projects: `bg-bg-secondary` (dark)
- Skills: `bg-bg-primary` (darker)
- Blog: `bg-bg-secondary` (dark)
- Contact: `bg-bg-primary` (darker)

## Component Integration

### SearchHeader
- Fixed at top of page
- Provides search functionality
- Logo and navigation on desktop, hamburger on mobile

### SidebarNav
- Fixed on left side (desktop only, lg+)
- 6 navigation icons with tooltips
- Auto-highlights current section on scroll
- Click to smooth-scroll to section

### ModuleTitle
- Consistent section header component
- Badge (optional category tag)
- Main title (h2)
- Description (subtitle)
- Gradient accent underline

### Button
- Multiple variants used throughout
- Primary, outline, ghost variants
- Various sizes (sm, md, lg)

### Container
- Max-width wrapper (max-w-6xl)
- Consistent horizontal padding

### Heading
- Semantic h1-h6 tags
- Design system typography (h1-u, h2-u, etc.)

## Styling Details

### Section Spacing
- Vertical padding: `py-24` (96px) on most sections
- Hero section: `min-h-screen` with centering
- Contact section: `min-h-screen`

### Grid Layouts
- Projects: `grid md:grid-cols-2 lg:grid-cols-3 gap-8`
- Skills: `grid md:grid-cols-2 lg:grid-cols-4 gap-6`
- Blog: `grid md:grid-cols-2 lg:grid-cols-3 gap-8`

### Card Styling
- Border radius: `rounded-xl`
- Background: `bg-bg-primary` or `bg-bg-secondary`
- Hover effects: `hover:shadow-lg transition-all duration-300`
- Padding: `p-6`

### Form Styling
- Input/textarea: `px-4 py-3 rounded-lg`
- Border: `border-2 border-neutral-grey`
- Focus state: `focus:border-brand-primary`
- Full width: `w-full`

## Internationalization

### Translation Structure
All text is externalized to `messages/en.json` and `messages/fr.json`:

```
pages.home.hero.title
pages.home.hero.subtitle
pages.home.hero.cta
pages.home.about.*
pages.home.projects.*
pages.home.skills.*
pages.home.blog.*
pages.home.contact.*
```

### Language Files
- English: `messages/en.json`
- French: `messages/fr.json`

## Navigation Flow

### Scroll Detection (SidebarNav)
1. User scrolls page
2. SidebarNav checks which section is visible
3. Corresponding icon highlights
4. On hover: tooltip appears with section label

### Click Navigation (SidebarNav)
1. User clicks icon in sidebar
2. Page smooth-scrolls to section
3. Section ID in URL (can be implemented)
4. Icon highlights when section reaches viewport

### Header Navigation (SearchHeader)
1. Desktop: Click nav links in header
2. Mobile: Click hamburger, then nav link
3. Search functionality available on all devices

## Form Handling

### Contact Form
Currently uses standard HTML form elements:
- Name input (text)
- Email input (email)
- Message textarea
- Submit button

Future implementation needed:
- Form validation
- Submit handler
- API integration with Strapi CMS
- Success/error messages

## Placeholder Content

All text content is sourced from translations:
- 6 project cards with titles and descriptions
- 8 skill categories
- 6 blog posts with titles and excerpts
- Contact information (email, location)

To customize:
1. Edit `messages/en.json` for English content
2. Edit `messages/fr.json` for French content
3. Update translation keys in page component

## Performance Considerations

### Viewport Height Calculations
- 6 full-viewport sections = minimum 6000px page height
- SidebarNav performs scroll detection on each scroll event
- Optimized with scroll event listener cleanup

### Responsive Images
- Placeholder areas using gradient backgrounds
- Ready for Cloudinary integration
- Aspect ratio containers for consistent sizing

### Scroll Behavior
- Smooth scroll on navigation: `scroll-behavior: smooth` (in globals.css)
- No lazy loading on initial render (all sections in viewport)

## Future Enhancements

### Content Integration
- Connect to Strapi CMS for dynamic project/blog data
- Replace placeholder content with real data
- Implement image upload and display

### Form Submission
- Add form validation (client-side)
- Implement server-side submission handler
- Store messages in database
- Email notifications

### Advanced Features
- Scroll spy for active section tracking (already in SidebarNav)
- Parallax effects on hero section
- Image galleries for projects
- Blog post detail pages
- Filter/search for projects and blog posts

### Optimization
- Image lazy loading
- Code splitting for sections
- Dynamic imports for heavy components
- Caching strategies

## File Organization

```
apps/frontend/src/
├── app/[locale]/
│   └── page.tsx          (Main portfolio page)
├── components/
│   ├── SearchHeader.tsx
│   ├── SidebarNav.tsx
│   ├── ModuleTitle.tsx
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── Heading.tsx
│   └── ...
└── messages/
    ├── en.json          (English translations)
    └── fr.json          (French translations)
```

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- Mobile-first responsive design
- Touch-friendly interface

## Accessibility Features

- Semantic HTML structure (section, form elements)
- ARIA labels on interactive elements
- Proper heading hierarchy (h1 → h6)
- Keyboard navigation support
- Focus states for form inputs
- Color contrast compliance

## Testing Checklist

- [ ] All 6 sections render correctly
- [ ] SidebarNav highlights correct section on scroll
- [ ] Click navigation smooth-scrolls to sections
- [ ] Hover tooltips appear after 2 seconds (except Home)
- [ ] Form inputs accept text
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Translations display correctly (English/French)
- [ ] Header search functionality works
- [ ] Mobile menu opens/closes properly
- [ ] All links are accessible via keyboard

## Notes

- Page uses single scrollable layout rather than separate pages
- All navigation is anchor-based (#section-id)
- SearchHeader and SidebarNav persist across sections
- Background colors alternate for visual separation
- Modular design allows easy section reordering
- All components are reusable and documented
