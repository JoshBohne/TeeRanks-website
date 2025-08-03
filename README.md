# TeeRank Website

The official landing page for TeeRank - Rate the World's Greatest Golf Holes.

## Overview

TeeRank is the "Letterboxd for golf" - a platform where golfers can discover, rate, and track famous golf holes and courses worldwide. This website serves as the primary marketing site and waitlist signup for the upcoming mobile app.

## Features

- **Hero Section**: Compelling headline and call-to-action
- **Golf Course Gallery**: Showcasing iconic holes coming to TeeRank
- **Feature Showcase**: App capabilities and benefits
- **Waitlist Signup**: Email capture with form validation
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags and social sharing
- **Smooth Animations**: Framer Motion animations throughout

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form** with Zod validation
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── waitlist/          # Waitlist API endpoint
│   ├── privacy/               # Privacy policy page
│   ├── terms/                 # Terms of service page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with SEO
│   └── page.tsx              # Main landing page
public/
├── images/                   # Golf course images
├── teerank-logo.png         # Logo
└── favicon.png              # Favicon
```

## Key Sections

### Navigation
- Fixed header with logo and CTA button
- Smooth scrolling to waitlist section

### Hero Section
- Large headline with green accent
- Compelling subheading
- Primary and secondary CTAs
- "Letterboxd for golf" positioning

### Golf Course Gallery
- Grid of iconic golf holes
- Hover effects and animations
- "Coming Soon" badges

### Features Section
- Four key features with icons
- Rate & Review, Bucket List, Rankings, Social
- Animated on scroll

### Why TeeRank Section
- Benefits and value proposition
- Mock app interface preview
- Checklist of key benefits

### Waitlist Section
- Form with validation
- Email, name, and optional handicap
- Success state animation
- API integration ready

### Footer
- Logo and navigation links
- Social media icons (placeholder)
- Privacy policy and terms links
- Contact information

## Deployment

### Replit Deployment

1. Import project to Replit
2. Set up custom domain (teeranks.com)
3. Configure environment variables if needed
4. Deploy with `npm run build && npm start`

### Environment Variables (Future)

```env
# Email service integration
CONVERTKIT_API_KEY=your_api_key
MAILCHIMP_API_KEY=your_api_key

# Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
```

## Future Enhancements

- [ ] Email service integration (ConvertKit/Mailchimp)
- [ ] Google Analytics integration
- [ ] Blog section for golf content
- [ ] Social media integration
- [ ] A/B testing for conversion optimization
- [ ] User dashboard for waitlist members

## Email Service Integration

The waitlist form is ready for email service integration. To connect:

1. Choose service (ConvertKit, Mailchimp, etc.)
2. Add API credentials to environment variables
3. Update `/api/waitlist/route.ts` with service calls
4. Set up automated welcome email sequence

## Contact

- Email: hello@teeranks.com
- Website: https://teeranks.com

## License

© 2025 TeeRank. All rights reserved.
