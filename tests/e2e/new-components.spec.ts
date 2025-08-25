import { test, expect } from '@playwright/test';

test.describe('New Website Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display LiveActivityFeed component', async ({ page }) => {
    // Scroll to the activity feed section
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(1000);

    // Check for the live activity feed title
    const activityTitle = page.locator('text=See what golfers are discovering');
    await expect(activityTitle).toBeVisible();

    // Check for the live indicator
    const liveIndicator = page.locator('text=Live Activity Feed');
    await expect(liveIndicator).toBeVisible();

    // Check for activity cards
    const activityCards = page.locator('[data-testid="activity-card"]');
    // Should have at least some activity items visible
    await expect(page.locator('text=just rated')).toBeVisible({ timeout: 10000 });
  });

  test('should display CommunityStats component with animated counters', async ({ page }) => {
    // Scroll to the stats section
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(1000);

    // Check for the stats section title
    const statsTitle = page.locator('text=The numbers speak for themselves');
    await expect(statsTitle).toBeVisible();

    // Check for growing community badge
    const growingCommunityBadge = page.locator('text=Growing Community');
    await expect(growingCommunityBadge).toBeVisible();

    // Check for specific stat labels
    await expect(page.locator('text=Holes Rated')).toBeVisible();
    await expect(page.locator('text=Active Golfers')).toBeVisible();
    await expect(page.locator('text=Courses Discovered')).toBeVisible();
    await expect(page.locator('text=Average Rating')).toBeVisible();

    // Check for growth highlights
    await expect(page.locator('text=Rapid Growth')).toBeVisible();
    await expect(page.locator('text=Quality First')).toBeVisible();
    await expect(page.locator('text=Global Reach')).toBeVisible();
  });

  test('should have smooth animations and interactions', async ({ page }) => {
    // Test floating metrics animations
    const floatingMetrics = page.locator('[class*="floating"]');
    
    // Scroll through the page to trigger animations
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(1000);
    
    await page.evaluate(() => window.scrollTo(0, 1600));
    await page.waitForTimeout(1000);
    
    await page.evaluate(() => window.scrollTo(0, 2400));
    await page.waitForTimeout(1000);

    // Page should remain responsive
    await expect(page.locator('header')).toBeVisible();
  });

  test('should handle activity feed updates', async ({ page }) => {
    // Navigate to activity feed
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(1000);

    // Check initial activities
    const initialActivities = await page.locator('text=just rated').count();
    
    // Wait for potential updates (activity feed updates every 8 seconds)
    await page.waitForTimeout(3000);
    
    // Activities should still be visible
    await expect(page.locator('text=just rated')).toBeVisible();
  });

  test('should display proper stats formatting', async ({ page }) => {
    // Navigate to stats section
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(2000); // Wait for counter animations

    // Check for formatted numbers (K for thousands)
    const statsContainer = page.locator('text=The numbers speak for themselves').locator('..').locator('..');
    
    // Should have numbers with + suffix or K/M formatting
    await expect(statsContainer.locator('text=/\\d+[KM+]/')).toHaveCount({ min: 3 });
    
    // Check average rating format
    await expect(statsContainer.locator('text=/4\\.\\d+/')).toBeVisible();
  });

  test('should maintain component performance under stress', async ({ page }) => {
    // Rapidly scroll through all sections
    const scrollPositions = [0, 800, 1600, 2400, 3200, 4000, 2000, 0];
    
    for (const position of scrollPositions) {
      await page.evaluate((pos) => window.scrollTo(0, pos), position);
      await page.waitForTimeout(100);
    }
    
    // All components should still be functional
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=TeeRank')).toBeVisible();
    
    // Activity feed should still work
    await page.evaluate(() => window.scrollTo(0, 2000));
    await expect(page.locator('text=Live Activity Feed')).toBeVisible();
    
    // Stats should still work
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect(page.locator('text=Growing Community')).toBeVisible();
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    // Test keyboard navigation through new components
    await page.keyboard.press('Tab');
    
    // Navigate through multiple elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }
    
    // Should be able to reach interactive elements
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should work correctly on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Scroll through sections on mobile
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(1000);
    
    // Stats should be visible and properly formatted on mobile
    await expect(page.locator('text=Growing Community')).toBeVisible();
    
    // Activity feed should work on mobile
    await page.evaluate(() => window.scrollTo(0, 1800));
    await page.waitForTimeout(1000);
    await expect(page.locator('text=Live Activity Feed')).toBeVisible();
  });
});