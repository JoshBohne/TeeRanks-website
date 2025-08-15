import { test, expect } from '@playwright/test';
import { testData } from '../fixtures/test-data';

test.describe('Responsive Design', () => {
  test.describe('Mobile Viewport (375x667)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(testData.viewports.mobile);
      await page.goto('/');
    });

    test('should display mobile layout correctly', async ({ page }) => {
      // Header should be visible and appropriately sized
      await expect(page.locator('header')).toBeVisible();
      
      // Main content should be visible
      await expect(page.locator('h1')).toBeVisible();
      
      // Check that content doesn't overflow horizontally
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(testData.viewports.mobile.width + 50); // Some tolerance
    });

    test('should handle mobile navigation', async ({ page }) => {
      // Navigation should work on mobile
      const waitlistLink = page.locator('a[href="#waitlist"]');
      if (await waitlistLink.count() > 0) {
        await waitlistLink.first().click();
        await page.waitForTimeout(1000);
        
        await expect(page.locator('#waitlist')).toBeInViewport();
      }
    });

    test('should display mobile-optimized gallery', async ({ page }) => {
      // Navigate to gallery
      await page.locator('a[href="#gallery"]').click();
      await page.waitForTimeout(500);
      
      // Gallery should be visible and functional
      await expect(page.locator('.swiper')).toBeVisible();
      
      // Should be able to navigate gallery
      const nextButton = page.locator('.swiper-button-next');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(500);
      }
    });

    test('should display mobile-optimized waitlist form', async ({ page }) => {
      // Navigate to waitlist
      await page.locator('a[href="#waitlist"]').click();
      await page.waitForTimeout(500);
      
      // Form should be visible and usable
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[name="firstName"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
      
      // Form should fit within viewport
      const form = page.locator('form');
      const formBox = await form.boundingBox();
      if (formBox) {
        expect(formBox.width).toBeLessThanOrEqual(testData.viewports.mobile.width);
      }
    });

    test('should handle touch interactions', async ({ page }) => {
      // Test tap interactions work
      await page.locator('h1').tap();
      
      // Navigation should work with tap
      const waitlistButton = page.locator('text=Join Waitlist').first();
      await waitlistButton.tap();
      await page.waitForTimeout(1000);
      
      // Should navigate to waitlist
      await expect(page.locator('#waitlist')).toBeInViewport();
    });
  });

  test.describe('Tablet Viewport (768x1024)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(testData.viewports.tablet);
      await page.goto('/');
    });

    test('should display tablet layout correctly', async ({ page }) => {
      // Content should be appropriately sized for tablet
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      
      // Check content doesn't overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(testData.viewports.tablet.width + 50);
    });

    test('should display tablet-optimized gallery', async ({ page }) => {
      await page.locator('a[href="#gallery"]').click();
      await page.waitForTimeout(500);
      
      // Gallery should show more content on tablet
      await expect(page.locator('.swiper')).toBeVisible();
      
      // Navigation should work
      const nextButton = page.locator('.swiper-button-next');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(500);
      }
    });

    test('should handle tablet form layout', async ({ page }) => {
      await page.locator('a[href="#waitlist"]').click();
      await page.waitForTimeout(500);
      
      // Form should be well-positioned on tablet
      const form = page.locator('form');
      await expect(form).toBeVisible();
      
      // Form elements should be appropriately sized
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[name="firstName"]')).toBeVisible();
    });
  });

  test.describe('Desktop Viewport (1920x1080)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(testData.viewports.desktop);
      await page.goto('/');
    });

    test('should display desktop layout correctly', async ({ page }) => {
      // Desktop should show full layout
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      
      // Content should be properly centered/contained
      const container = page.locator('main, .container').first();
      if (await container.count() > 0) {
        await expect(container).toBeVisible();
      }
    });

    test('should display desktop gallery with multiple items', async ({ page }) => {
      await page.locator('a[href="#gallery"]').click();
      await page.waitForTimeout(500);
      
      // Desktop gallery should show multiple slides
      await expect(page.locator('.swiper')).toBeVisible();
      
      // Should have proper navigation
      await expect(page.locator('.swiper-button-next')).toBeVisible();
      await expect(page.locator('.swiper-button-prev')).toBeVisible();
    });

    test('should handle desktop form layout', async ({ page }) => {
      await page.locator('a[href="#waitlist"]').click();
      await page.waitForTimeout(500);
      
      // Desktop form should be well-positioned
      await expect(page.locator('form')).toBeVisible();
      
      // Form should not be too wide on desktop
      const form = page.locator('form');
      const formBox = await form.boundingBox();
      if (formBox) {
        // Form should not take up entire width on desktop
        expect(formBox.width).toBeLessThan(testData.viewports.desktop.width * 0.8);
      }
    });

    test('should handle hover interactions', async ({ page }) => {
      // Test hover states on desktop
      const hoverElements = page.locator('button, a').first();
      await hoverElements.hover();
      
      // Element should still be visible after hover
      await expect(hoverElements).toBeVisible();
    });
  });

  test.describe('Cross-Viewport Functionality', () => {
    test('should maintain functionality across viewport changes', async ({ page }) => {
      // Start with desktop
      await page.setViewportSize(testData.viewports.desktop);
      await page.goto('/');
      
      // Navigate to waitlist
      await page.locator('a[href="#waitlist"]').click();
      await page.waitForTimeout(500);
      
      // Change to mobile
      await page.setViewportSize(testData.viewports.mobile);
      await page.waitForTimeout(500);
      
      // Waitlist should still be visible and functional
      await expect(page.locator('#waitlist')).toBeVisible();
      await expect(page.locator('input[type="email"]')).toBeVisible();
      
      // Form should still work
      await page.fill('input[type="email"]', testData.validWaitlistUser.email);
      await page.fill('input[name="firstName"]', testData.validWaitlistUser.firstName);
      
      // Change to tablet
      await page.setViewportSize(testData.viewports.tablet);
      await page.waitForTimeout(500);
      
      // Form values should be preserved
      const emailValue = await page.inputValue('input[type="email"]');
      const nameValue = await page.inputValue('input[name="firstName"]');
      
      expect(emailValue).toBe(testData.validWaitlistUser.email);
      expect(nameValue).toBe(testData.validWaitlistUser.firstName);
    });

    test('should handle orientation changes', async ({ page }) => {
      // Portrait mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await expect(page.locator('h1')).toBeVisible();
      
      // Landscape mobile (swap dimensions)
      await page.setViewportSize({ width: 667, height: 375 });
      await page.waitForTimeout(500);
      
      // Content should still be visible
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should maintain text readability across viewports', async ({ page }) => {
      const viewports = [
        testData.viewports.mobile,
        testData.viewports.tablet,
        testData.viewports.desktop
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.goto('/');
        
        // Text should be readable (not too small)
        const heading = page.locator('h1').first();
        const headingStyles = await heading.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            fontSize: parseInt(styles.fontSize),
            lineHeight: styles.lineHeight
          };
        });
        
        // Font size should be reasonable (at least 16px)
        expect(headingStyles.fontSize).toBeGreaterThanOrEqual(16);
      }
    });

    test('should handle very small viewports gracefully', async ({ page }) => {
      // Very small viewport
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto('/');
      
      // Basic functionality should still work
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      
      // Should not have horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(320 + 20); // Small tolerance
    });

    test('should handle very large viewports gracefully', async ({ page }) => {
      // Ultra-wide viewport
      await page.setViewportSize({ width: 2560, height: 1440 });
      await page.goto('/');
      
      // Content should be properly contained/centered
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      
      // Content shouldn't be stretched too wide
      const container = page.locator('main, .container, section').first();
      if (await container.count() > 0) {
        const containerBox = await container.boundingBox();
        if (containerBox) {
          // Content should have reasonable max-width
          expect(containerBox.width).toBeLessThan(1800); // Reasonable max-width
        }
      }
    });
  });
});