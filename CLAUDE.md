# CLAUDE.md

This file provides guidance to Claude Code when working with the TeeRank website codebase.

## Project Overview

TeeRank Website is a Next.js 15 landing page for the TeeRank mobile app - "The Letterboxd for golf". It serves as the primary marketing site featuring a dark-themed design with smooth animations, showcasing iconic golf holes, app features, and collecting waitlist signups for the upcoming mobile app launch.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# E2E Testing with Playwright
npm run test:e2e              # Run all E2E tests
npm run test:e2e:ui           # Run tests with interactive UI
npm run test:e2e:debug        # Run tests in debug mode
npm run test:e2e:headed       # Run tests with visible browser
npm run test:e2e:report       # View test results report
```

## Tech Stack

### Core Framework
- **Next.js 15** with App Router and TypeScript
- **React 19** with client-side components
- **TypeScript 5** for type safety

### Styling & UI
- **Tailwind CSS 4** for utility-first styling
- **Framer Motion 12** for smooth animations and page transitions
- **Lucide React** for consistent iconography
- **Swiper 11** for interactive golf course gallery

### Forms & Validation
- **React Hook Form 7** for form state management
- **Zod 4** for schema validation and type inference
- **@hookform/resolvers** for Zod integration

### Build & Development
- **ESLint 9** with Next.js configuration
- **PostCSS** for Tailwind CSS processing
- **TypeScript** strict mode enabled

### Testing
- **Playwright 1.54** for E2E testing across browsers
- **Cross-browser testing**: Chromium, Firefox, WebKit
- **Mobile testing**: iPhone 12 and Pixel 5 viewports
- **Test coverage**: Forms, navigation, gallery, responsive design

## Architecture Overview

### App Router Structure
```
src/app/
├── api/
│   └── waitlist/
│       └── route.ts          # Waitlist signup API endpoint
├── privacy/
│   └── page.tsx              # Privacy policy page
├── terms/
│   └── page.tsx              # Terms of service page
├── favicon.ico               # App favicon
├── globals.css              # Global styles and Tailwind imports
├── layout.tsx               # Root layout with SEO meta tags
└── page.tsx                 # Main landing page component

tests/
├── e2e/                     # End-to-end test suites
│   ├── waitlist.spec.ts     # Waitlist form validation and submission
│   ├── gallery.spec.ts      # Swiper gallery interactions
│   ├── navigation.spec.ts   # Page navigation and scrolling
│   └── responsive.spec.ts   # Responsive design across viewports
├── fixtures/
│   └── test-data.ts         # Reusable test data and constants
└── playwright.config.ts     # Playwright configuration
```

### Public Assets Structure
```
public/
├── images/                   # Golf course hero images
│   ├── Augusta_12.png       # Augusta National 12th hole
│   ├── PacificDunes_13.png  # Pacific Dunes 13th hole
│   ├── PebbleBeach_7.png    # Pebble Beach 7th hole
│   ├── PineValley_5.png     # Pine Valley 5th hole
│   ├── Sawgrass_17.png      # TPC Sawgrass 17th hole
│   └── StAndrews_18.png     # St Andrews 18th hole
├── icons/                   # UI icons
│   ├── bucket-fill.svg      # Filled bucket icon
│   └── bucket.svg           # Outline bucket icon
├── teerank-logo.png         # Main logo
└── favicon.png              # Browser favicon
```

## Key Components & Sections

### Main Landing Page (`src/app/page.tsx`)
Single-page application with multiple sections using client-side rendering:

#### Navigation Header
- Fixed header with TeeRank logo
- "Join Waitlist" CTA button
- Smooth scroll to waitlist section

#### Hero Section
- Large headline with green accent color (#10B981)
- "The Letterboxd for golf" tagline
- Primary and secondary call-to-action buttons
- Compelling value proposition

#### Golf Course Gallery
- **Swiper Component**: Interactive carousel showcasing iconic holes
- **Effect Coverflow**: 3D carousel effect with smooth transitions
- **Navigation**: Custom arrow controls with hover states
- **Responsive Design**: Adapts from single card mobile to multi-card desktop
- **Featured Courses**: Augusta, Pebble Beach, St Andrews, etc.
- **Coming Soon Badges**: Overlay badges indicating future availability

#### Features Section
- Four core features with animated icons:
  - **Rate & Review**: Star rating system
  - **Bucket List**: Custom bucket icon
  - **Rankings**: Trophy leaderboards
  - **Social**: Community features
- **Animation**: Staggered entrance animations on scroll

#### Why TeeRank Section
- Benefits and value proposition
- Mock app interface preview
- Feature checklist with checkmarks
- Comparison to existing platforms

#### Waitlist Section
- **Form Validation**: React Hook Form + Zod schema
- **Fields**: Email and first name only (simplified conversion)
- **Success State**: Animated confirmation with CheckCircle icon
- **Error Handling**: Field-level validation with user-friendly messages
- **API Integration**: POST to `/api/waitlist` endpoint

#### Footer
- Logo and branding
- Navigation links (Privacy, Terms)
- Social media placeholders
- Contact information
- Copyright notice

### BucketIcon Component (`src/components/BucketIcon.tsx`)
- Custom SVG icon component
- Supports both filled and outline variants
- Consistent with app's bucket list feature
- Proper TypeScript props interface

### API Route (`src/app/api/waitlist/route.ts`)
- **Validation**: Zod schema for email and firstName
- **Error Handling**: Proper HTTP status codes and error messages
- **Integration Ready**: TODO comments for email service integration
- **Security**: Input sanitization and validation
- **Response Format**: Consistent JSON structure

## Key Technical Patterns

### Form Management Pattern
```typescript
// Schema definition with Zod
const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
});

// React Hook Form integration
const { register, handleSubmit, formState: { errors } } = useForm<WaitlistForm>({
  resolver: zodResolver(waitlistSchema),
});
```

### Animation Patterns
**Framer Motion** used throughout for smooth UX:
- **Stagger Animations**: Feature cards animate in sequence
- **Scroll Triggers**: Elements animate as they enter viewport
- **State Transitions**: Form success states with smooth transitions
- **Page Transitions**: Smooth navigation between sections

### Responsive Design System
- **Mobile-First**: Tailwind CSS mobile-first breakpoints
- **Container Sizing**: Max-width containers with responsive padding
- **Typography Scale**: Responsive text sizing across devices
- **Grid Systems**: CSS Grid and Flexbox for layout
- **Image Optimization**: Next.js Image component with proper sizing

### Dark Theme Design
- **Primary Background**: Dark gray (#111827)
- **Text Hierarchy**: White primary, gray secondary text
- **Accent Color**: Green (#10B981) for CTAs and highlights
- **Card Styling**: Dark cards with subtle borders
- **Hover States**: Consistent interaction feedback

## Deployment Configuration

### Replit Deployment
- **Custom Domain**: teeranks.com configuration
- **Build Process**: `npm run build && npm start`
- **Environment**: Node.js with npm
- **Headers**: CORS configuration for development

### Next.js Configuration (`next.config.ts`)
- **Turbo Resolver**: Symlink handling for Replit
- **CORS Headers**: Development environment support
- **Experimental Features**: Turbo mode enabled

### Environment Variables (Future)
```env
# Email service integration
CONVERTKIT_API_KEY=your_api_key
MAILCHIMP_API_KEY=your_api_key

# Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
```

## Content Strategy

### SEO Optimization
- **Meta Tags**: Proper title, description, and OG tags
- **Structured Data**: Golf and app-related schema markup
- **Image Alt Text**: Descriptive alt text for golf course images
- **URL Structure**: Clean, semantic URLs

### Golf Course Selection
**Iconic Holes Featured**:
- Augusta National 12th (Golden Bell)
- Pebble Beach 7th (shortest par 3)
- St Andrews 18th (Road Hole)
- TPC Sawgrass 17th (Island Green)
- Pacific Dunes 13th
- Pine Valley 5th

### Messaging Hierarchy
1. **Primary Value**: "The Letterboxd for golf"
2. **Core Benefits**: Rate, track, discover golf holes
3. **Social Proof**: Community-driven rankings
4. **Urgency**: Waitlist for early access

## Development Guidelines

### Code Organization
1. **Component Structure**: Single main page component with clear sections
2. **Asset Management**: Organized public folder with descriptive names
3. **Type Safety**: Strict TypeScript with proper interfaces
4. **Validation**: Zod schemas for all forms and API endpoints

### Performance Best Practices
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: App Router automatic code splitting
- **Animation Performance**: Framer Motion with proper will-change properties
- **Bundle Optimization**: Tree shaking and dynamic imports

### Design Consistency
- **Color System**: Consistent use of Tailwind color palette
- **Typography**: Proper heading hierarchy and text sizing
- **Spacing**: Consistent padding and margin using Tailwind scale
- **Interactive States**: Hover and focus states for all interactive elements

### API Development
- **Error Handling**: Comprehensive error responses with proper status codes
- **Validation**: Input validation on both client and server
- **Security**: Rate limiting and input sanitization (future enhancement)
- **Documentation**: Clear TODO comments for integration points

## Future Enhancements Roadmap

### Email Integration
- [ ] ConvertKit or Mailchimp API integration
- [ ] Automated welcome email sequence
- [ ] Waitlist management dashboard
- [ ] Email template system

### Analytics & Optimization
- [ ] Google Analytics 4 integration
- [ ] Conversion tracking and A/B testing
- [ ] Performance monitoring
- [ ] User behavior analytics

### Content Expansion
- [ ] Blog section for golf content
- [ ] Course database preview
- [ ] Featured hole spotlights
- [ ] Golf news integration

### Social Features
- [ ] Social media integration
- [ ] Share functionality
- [ ] Community testimonials
- [ ] User-generated content

## Essential Development Rules

### Quality Assurance
- Run `npm run lint` before committing changes
- **Run E2E tests**: `npm run test:e2e` before major releases
- Test waitlist form functionality in both success and error states
- Verify responsive design across mobile, tablet, and desktop
- Check animation performance and accessibility
- **Cross-browser testing**: Verify functionality in Chrome, Firefox, Safari
- **Mobile testing**: Test on actual devices when possible

### Content Management
- Maintain high-quality golf course images with consistent aspect ratios
- Use descriptive alt text for all images
- Keep messaging concise and conversion-focused
- Update "Coming Soon" dates as launch approaches

### Technical Standards
- Follow Next.js App Router conventions
- Use TypeScript strictly with proper type definitions
- Implement proper error boundaries and loading states
- Maintain consistent code formatting with ESLint rules

### SEO & Performance
- Optimize Core Web Vitals (LCP, FID, CLS)
- Maintain fast page load times
- Use semantic HTML structure
- Implement proper meta tag management

## E2E Testing with Playwright

### Test Structure
The test suite covers four critical areas:

#### 1. Waitlist Form Testing (`waitlist.spec.ts`)
- **Form validation**: Email and name field validation
- **Submission flow**: Success and error state handling
- **User experience**: Form clearing and error recovery
- **Accessibility**: Keyboard navigation and focus management

#### 2. Gallery Testing (`gallery.spec.ts`)
- **Swiper functionality**: Navigation arrows and slide transitions
- **Image loading**: Proper src attributes and alt text
- **Responsive behavior**: Gallery adaptation across viewports
- **Performance**: Rapid navigation and animation handling

#### 3. Navigation Testing (`navigation.spec.ts`)
- **Smooth scrolling**: Section-to-section navigation
- **Header behavior**: Fixed/sticky header functionality
- **Keyboard navigation**: Tab order and focus management
- **URL handling**: Anchor links and browser history

#### 4. Responsive Design Testing (`responsive.spec.ts`)
- **Multi-viewport testing**: Mobile (375px), Tablet (768px), Desktop (1920px)
- **Layout adaptation**: Content reflow and component sizing
- **Touch interactions**: Mobile tap and swipe gestures
- **Cross-viewport consistency**: Feature preservation across sizes

### Running Tests

```bash
# Run all tests headlessly
npm run test:e2e

# Interactive test runner with browser UI
npm run test:e2e:ui

# Debug mode with step-by-step execution
npm run test:e2e:debug

# Run with visible browser (non-headless)
npm run test:e2e:headed

# View detailed test report
npm run test:e2e:report
```

### Test Configuration
- **Auto-start dev server**: Tests automatically start `npm run dev`
- **Multi-browser**: Tests run on Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Screenshots**: Captured on test failures
- **Video recording**: Available for debugging failed tests
- **Parallel execution**: Tests run in parallel for faster feedback

### Best Practices for Test Maintenance
1. **Update test data**: Modify `tests/fixtures/test-data.ts` when UI changes
2. **Add tests for new features**: Extend existing spec files or create new ones
3. **Verify after changes**: Run tests before merging significant UI updates
4. **Check all browsers**: Use `npm run test:e2e` to test cross-browser compatibility
5. **Debug failures**: Use `npm run test:e2e:debug` to step through failing tests