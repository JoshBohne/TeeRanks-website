# CLAUDE.md

This file provides guidance to Claude Code when working with the TeeRank website codebase.

## Project Overview

TeeRank Website is a Next.js 15 landing page for the TeeRank mobile app - "The Letterboxd for golf". It serves as the primary marketing site featuring a dark-themed design with smooth animations, showcasing iconic golf holes, app features, and collecting waitlist signups.

## Development Commands

```bash
# Core Development
npm install              # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Lint code - ALWAYS run before committing

# E2E Testing with Playwright
npm run test:e2e              # Run all E2E tests
npm run test:e2e:ui           # Run tests with interactive UI
npm run test:e2e:debug        # Run tests in debug mode
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

### Testing
- **Playwright 1.54** for E2E testing across browsers
- **Cross-browser testing**: Chromium, Firefox, WebKit
- **Mobile testing**: iPhone 12 and Pixel 5 viewports

## Common Issues & Solutions

### Build & Development Errors
- **Build Errors**: `rm -rf .next && npm run build` → clear Next.js cache
- **Type Errors**: Check TypeScript configuration and imports
- **Styling Issues**: `npm run dev` → verify Tailwind CSS compilation
- **Package Issues**: Delete `node_modules` and `npm install`

### Deployment Issues
- **Replit Deployment**: Ensure `npm run build && npm start` works locally
- **CORS Issues**: Check `next.config.ts` headers configuration
- **Domain Issues**: Verify custom domain configuration in Replit

### Form & API Issues
- **Waitlist Form**: Test with valid/invalid emails in `/api/waitlist`
- **Validation Errors**: Check Zod schema in API route
- **Success State**: Verify form reset after successful submission

## Architecture Overview

### App Router Structure
```
src/app/
├── api/waitlist/route.ts    # Waitlist signup API endpoint
├── privacy/page.tsx         # Privacy policy page
├── terms/page.tsx          # Terms of service page
├── globals.css             # Global styles and Tailwind imports
├── layout.tsx              # Root layout with SEO meta tags
└── page.tsx                # Main landing page component
```

### Key File Locations
- **Components**: `/src/components/` (BucketIcon, etc.)
- **API Routes**: `/src/app/api/` (waitlist endpoint)
- **Assets**: `/public/images/` (golf course images)
- **Tests**: `/tests/e2e/` (Playwright test suites)
- **Configuration**: `next.config.ts`, `tailwind.config.ts`

## Core Components & Sections

### Main Landing Page (`src/app/page.tsx`)
Single-page application with multiple sections:

#### Golf Course Gallery
- **Swiper Component**: Interactive carousel showcasing iconic holes
- **Effect Coverflow**: 3D carousel effect with smooth transitions
- **Featured Courses**: Augusta, Pebble Beach, St Andrews, etc.
- **Responsive Design**: Adapts from single card mobile to multi-card desktop

#### Waitlist Section
- **Form Validation**: React Hook Form + Zod schema
- **Fields**: Email and first name only (simplified conversion)
- **Success State**: Animated confirmation with CheckCircle icon
- **API Integration**: POST to `/api/waitlist` endpoint

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

### API Route (`src/app/api/waitlist/route.ts`)
- **Validation**: Zod schema for email and firstName
- **Error Handling**: Proper HTTP status codes and error messages
- **Security**: Input sanitization and validation
- **Integration Ready**: TODO comments for email service integration

## Design System

### Dark Theme Design
- **Primary Background**: Dark gray (#111827)
- **Text Hierarchy**: White primary, gray secondary text
- **Accent Color**: Green (#10B981) for CTAs and highlights
- **Card Styling**: Dark cards with subtle borders

### Animation Patterns
**Framer Motion** used throughout for smooth UX:
- **Stagger Animations**: Feature cards animate in sequence
- **Scroll Triggers**: Elements animate as they enter viewport
- **State Transitions**: Form success states with smooth transitions

### Responsive Design System
- **Mobile-First**: Tailwind CSS mobile-first breakpoints
- **Container Sizing**: Max-width containers with responsive padding
- **Typography Scale**: Responsive text sizing across devices

## E2E Testing with Playwright

### Test Coverage
1. **Waitlist Form Testing** (`waitlist.spec.ts`): Form validation and submission
2. **Gallery Testing** (`gallery.spec.ts`): Swiper functionality and navigation
3. **Navigation Testing** (`navigation.spec.ts`): Smooth scrolling and header behavior
4. **Responsive Testing** (`responsive.spec.ts`): Multi-viewport layout adaptation

### Test Commands
```bash
npm run test:e2e              # Run all tests headlessly
npm run test:e2e:ui           # Interactive test runner
npm run test:e2e:debug        # Debug mode with step-by-step execution
npm run test:e2e:headed       # Run with visible browser
npm run test:e2e:report       # View detailed test report
```

## Performance Optimization

### Next.js Optimizations
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: App Router automatic code splitting
- **Bundle Optimization**: Tree shaking and dynamic imports

### Animation Performance
- **Framer Motion**: Proper will-change properties
- **GPU Acceleration**: Transform-based animations
- **Scroll Performance**: IntersectionObserver for scroll triggers

### Core Web Vitals Checklist
- [ ] **LCP** < 2.5s (Largest Contentful Paint)
- [ ] **FID** < 100ms (First Input Delay)
- [ ] **CLS** < 0.1 (Cumulative Layout Shift)
- [ ] Test with Lighthouse in production

## Deployment Configuration

### Replit Deployment
- **Custom Domain**: teeranks.com configuration
- **Build Process**: `npm run build && npm start`
- **Environment**: Node.js with npm

### Next.js Configuration (`next.config.ts`)
- **Turbo Resolver**: Symlink handling for Replit
- **CORS Headers**: Development environment support
- **Experimental Features**: Turbo mode enabled

## Content & SEO

### Featured Golf Courses
- Augusta National 12th (Golden Bell)
- Pebble Beach 7th (shortest par 3)
- St Andrews 18th (Road Hole)
- TPC Sawgrass 17th (Island Green)
- Pacific Dunes 13th
- Pine Valley 5th

### SEO Optimization
- **Meta Tags**: Proper title, description, and OG tags
- **Image Alt Text**: Descriptive alt text for golf course images
- **URL Structure**: Clean, semantic URLs
- **Structured Data**: Golf and app-related schema markup

## Development Guidelines

### Quality Assurance Checklist
- [ ] Run `npm run lint` before committing changes
- [ ] Run E2E tests: `npm run test:e2e` before releases
- [ ] Test waitlist form in both success and error states
- [ ] Verify responsive design across mobile, tablet, and desktop
- [ ] Check animation performance and accessibility
- [ ] Cross-browser testing in Chrome, Firefox, Safari

### Code Standards
- Follow Next.js App Router conventions
- Use TypeScript strictly with proper type definitions
- Implement proper error boundaries and loading states
- Maintain consistent code formatting with ESLint rules

### Content Management
- Maintain high-quality golf course images with consistent aspect ratios
- Use descriptive alt text for all images
- Keep messaging concise and conversion-focused
- Update "Coming Soon" dates as launch approaches

## Future Enhancements

### Email Integration
- [ ] ConvertKit or Mailchimp API integration
- [ ] Automated welcome email sequence
- [ ] Waitlist management dashboard

### Analytics & Optimization
- [ ] Google Analytics 4 integration
- [ ] Conversion tracking and A/B testing
- [ ] Performance monitoring

### Content Expansion
- [ ] Blog section for golf content
- [ ] Course database preview
- [ ] Featured hole spotlights

## Environment Variables

```env
# Email service integration (future)
CONVERTKIT_API_KEY=your_api_key
MAILCHIMP_API_KEY=your_api_key

# Analytics (future)
GOOGLE_ANALYTICS_ID=your_ga_id
```