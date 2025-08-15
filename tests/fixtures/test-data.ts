export const testData = {
  validWaitlistUser: {
    email: 'test@example.com',
    firstName: 'John',
  },
  
  invalidEmails: [
    'invalid-email',
    'test@',
    '@example.com',
    'test.example.com',
    '',
  ],
  
  invalidNames: [
    '',
    'A', // Too short
  ],
  
  golfCourses: {
    augusta: {
      name: 'Augusta National 12th',
      filename: 'Augusta_12.png',
    },
    pebbleBeach: {
      name: 'Pebble Beach 7th',
      filename: 'PebbleBeach_7.png',
    },
    stAndrews: {
      name: 'St Andrews 18th',
      filename: 'StAndrews_18.png',
    },
    sawgrass: {
      name: 'TPC Sawgrass 17th',
      filename: 'Sawgrass_17.png',
    },
    pacificDunes: {
      name: 'Pacific Dunes 13th',
      filename: 'PacificDunes_13.png',
    },
    pineValley: {
      name: 'Pine Valley 5th',
      filename: 'PineValley_5.png',
    },
  },
  
  navigationSections: [
    { name: 'Hero', id: '#hero' },
    { name: 'Gallery', id: '#gallery' },
    { name: 'Features', id: '#features' },
    { name: 'Why TeeRank', id: '#why-teerank' },
    { name: 'Waitlist', id: '#waitlist' },
  ],
  
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
  },
};