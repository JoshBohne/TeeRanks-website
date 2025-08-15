import { test, expect } from '@playwright/test';
import { testData } from '../fixtures/test-data';

test.describe('Navigation and Scrolling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display header with logo and navigation', async ({ page }) => {
    // Check that header is visible
    await expect(page.locator('header')).toBeVisible();
    
    // Check logo is present
    await expect(page.locator('img[alt*="TeeRank"]')).toBeVisible();
    
    // Check main navigation button
    await expect(page.locator('text=Join Waitlist')).toBeVisible();
  });

  test('should scroll to each section when navigation links are clicked', async ({ page }) => {
    for (const section of testData.navigationSections) {
      // Click navigation link (if it exists in header or elsewhere)
      const navLink = page.locator(`a[href="${section.id}"]`);
      
      if (await navLink.count() > 0) {
        await navLink.first().click();
        
        // Wait for scroll animation to complete
        await page.waitForTimeout(1000);
        
        // Check that the section is now visible in viewport
        const sectionElement = page.locator(section.id);
        await expect(sectionElement).toBeInViewport();
      }
    }
  });

  test('should have smooth scrolling behavior', async ({ page }) => {
    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    // Click a navigation link that should scroll
    const waitlistLink = page.locator('a[href="#waitlist"]');
    if (await waitlistLink.count() > 0) {
      await waitlistLink.first().click();
      
      // Wait for scroll to complete
      await page.waitForTimeout(1500);
      
      // Check that we've scrolled
      const newScrollY = await page.evaluate(() => window.scrollY);
      expect(newScrollY).toBeGreaterThan(initialScrollY);
    }
  });

  test('should navigate through all main sections', async ({ page }) => {
    // Hero section should be visible initially
    await expect(page.locator('h1')).toBeVisible();
    
    // Scroll through each section
    const sections = ['#gallery', '#features', '#why-teerank', '#waitlist'];
    
    for (const sectionId of sections) {
      await page.locator(`a[href="${sectionId}"]`).first().click();
      await page.waitForTimeout(1000);
      
      // Check that section is in viewport
      const section = page.locator(sectionId);
      await expect(section).toBeInViewport();
    }
  });

  test('should handle header behavior on scroll', async ({ page }) => {
    const header = page.locator('header');
    
    // Header should be visible at top
    await expect(header).toBeVisible();
    
    // Scroll down significantly
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    // Header should still be visible (assuming it's fixed/sticky)
    await expect(header).toBeVisible();
    
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // Header should still be visible
    await expect(header).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus on the first interactive element
    const joinWaitlistButton = page.locator('text=Join Waitlist').first();
    await joinWaitlistButton.focus();
    await expect(joinWaitlistButton).toBeFocused();
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Should be able to navigate with keyboard
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should maintain navigation functionality on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize(testData.viewports.mobile);
    
    // Header should still be visible
    await expect(page.locator('header')).toBeVisible();
    
    // Navigation should still work
    const waitlistLink = page.locator('a[href="#waitlist"]');
    if (await waitlistLink.count() > 0) {
      await waitlistLink.first().click();
      await page.waitForTimeout(1000);
      
      // Should scroll to waitlist section
      await expect(page.locator('#waitlist')).toBeInViewport();
    }
  });

  test('should handle rapid navigation clicks', async ({ page }) => {
    const sections = ['#gallery', '#features', '#waitlist', '#hero'];
    
    // Rapidly click through sections
    for (const sectionId of sections) {
      const link = page.locator(`a[href="${sectionId}"]`);
      if (await link.count() > 0) {
        await link.first().click();
        await page.waitForTimeout(200); // Short wait
      }
    }
    
    // Page should still be functional
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should maintain scroll position correctly', async ({ page }) => {
    // Scroll to middle of page
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(400);
    
    // Interact with page (but don't navigate)
    await page.locator('h1').click();
    await page.waitForTimeout(200);
    
    // Scroll position should be maintained (unless click triggered navigation)
    const newScrollY = await page.evaluate(() => window.scrollY);
    // Allow some tolerance for browser behavior
    expect(Math.abs(newScrollY - scrollY)).toBeLessThan(100);
  });

  test('should handle edge cases in navigation', async ({ page }) => {
    // Test clicking non-existent anchor
    await page.evaluate(() => {
      const link = document.createElement('a');
      link.href = '#non-existent';
      link.textContent = 'Test Link';
      document.body.appendChild(link);
      link.click();
    });
    
    // Page should still be functional
    await expect(page.locator('header')).toBeVisible();
    
    // Test empty href
    await page.evaluate(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = 'Empty Link';
      document.body.appendChild(link);
      link.click();
    });
    
    // Page should still be functional
    await expect(page.locator('header')).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    // Check that navigation links have proper accessibility
    const navLinks = page.locator('a[href^="#"]');
    const linkCount = await navLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      
      // Link should be focusable
      await link.focus();
      await expect(link).toBeFocused();
      
      // Should have meaningful text content
      const textContent = await link.textContent();
      expect(textContent).toBeTruthy();
      expect(textContent!.trim().length).toBeGreaterThan(0);
    }
  });

  test('should handle browser back/forward with smooth scrolling', async ({ page }) => {
    // Navigate to a section
    const waitlistLink = page.locator('a[href="#waitlist"]');
    if (await waitlistLink.count() > 0) {
      await waitlistLink.first().click();
      await page.waitForTimeout(1000);
      
      // Navigate to another section
      const featuresLink = page.locator('a[href="#features"]');
      if (await featuresLink.count() > 0) {
        await featuresLink.first().click();
        await page.waitForTimeout(1000);
        
        // Use browser back
        await page.goBack();
        await page.waitForTimeout(1000);
        
        // Should still be on the same page
        await expect(page.locator('header')).toBeVisible();
      }
    }
  });
});