import { test, expect } from '@playwright/test';
import { testData } from '../fixtures/test-data';

test.describe('Golf Course Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to gallery section
    await page.locator('a[href="#gallery"]').click();
    await page.waitForSelector('#gallery', { state: 'visible' });
  });

  test('should display gallery section correctly', async ({ page }) => {
    // Check gallery container is visible
    await expect(page.locator('.swiper')).toBeVisible();
    
    // Check that golf course slides are present
    const slides = page.locator('.swiper-slide');
    await expect(slides).toHaveCount(6); // All 6 golf courses
    
    // Check navigation arrows are present
    await expect(page.locator('.swiper-button-next')).toBeVisible();
    await expect(page.locator('.swiper-button-prev')).toBeVisible();
  });

  test('should display all golf course images', async ({ page }) => {
    // Check that all expected golf course images are present
    for (const course of Object.values(testData.golfCourses)) {
      const image = page.locator(`img[alt*="${course.name}"]`);
      await expect(image).toBeVisible();
    }
  });

  test('should navigate through gallery with next/prev buttons', async ({ page }) => {
    const nextButton = page.locator('.swiper-button-next');
    const prevButton = page.locator('.swiper-button-prev');
    
    // Initially, prev button might be disabled (depending on implementation)
    await expect(nextButton).toBeVisible();
    await expect(prevButton).toBeVisible();
    
    // Click next button several times
    for (let i = 0; i < 3; i++) {
      await nextButton.click();
      await page.waitForTimeout(500); // Wait for animation
    }
    
    // Click prev button to go back
    for (let i = 0; i < 2; i++) {
      await prevButton.click();
      await page.waitForTimeout(500); // Wait for animation
    }
    
    // Should still be able to see the gallery
    await expect(page.locator('.swiper')).toBeVisible();
  });

  test('should show coming soon badges on course cards', async ({ page }) => {
    // Check that coming soon badges are present
    const comingSoonBadges = page.locator('text=Coming Soon');
    const badgeCount = await comingSoonBadges.count();
    
    // Should have coming soon badges (exact number may vary)
    expect(badgeCount).toBeGreaterThan(0);
  });

  test('should have proper image loading and alt text', async ({ page }) => {
    // Check that all images have proper alt text
    const images = page.locator('.swiper-slide img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const altText = await image.getAttribute('alt');
      
      // Alt text should not be empty
      expect(altText).toBeTruthy();
      expect(altText!.length).toBeGreaterThan(0);
    }
  });

  test('should handle gallery on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize(testData.viewports.mobile);
    
    // Gallery should still be visible and functional
    await expect(page.locator('.swiper')).toBeVisible();
    
    // Navigation buttons should be present (may be styled differently)
    await expect(page.locator('.swiper-button-next')).toBeVisible();
    await expect(page.locator('.swiper-button-prev')).toBeVisible();
    
    // Should be able to navigate
    await page.locator('.swiper-button-next').click();
    await page.waitForTimeout(500);
    
    // Gallery should still be functional
    await expect(page.locator('.swiper')).toBeVisible();
  });

  test('should handle gallery on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize(testData.viewports.tablet);
    
    // Gallery should adapt to tablet size
    await expect(page.locator('.swiper')).toBeVisible();
    
    // Test navigation
    const nextButton = page.locator('.swiper-button-next');
    await nextButton.click();
    await page.waitForTimeout(500);
    
    // Should still show golf course content
    const slides = page.locator('.swiper-slide');
    await expect(slides.first()).toBeVisible();
  });

  test('should maintain gallery functionality during rapid navigation', async ({ page }) => {
    const nextButton = page.locator('.swiper-button-next');
    const prevButton = page.locator('.swiper-button-prev');
    
    // Rapidly click next button
    for (let i = 0; i < 5; i++) {
      await nextButton.click();
      await page.waitForTimeout(100); // Short wait
    }
    
    // Rapidly click prev button
    for (let i = 0; i < 3; i++) {
      await prevButton.click();
      await page.waitForTimeout(100); // Short wait
    }
    
    // Gallery should still be functional
    await expect(page.locator('.swiper')).toBeVisible();
    await expect(page.locator('.swiper-slide')).toHaveCount(6);
  });

  test('should have accessible navigation controls', async ({ page }) => {
    const nextButton = page.locator('.swiper-button-next');
    const prevButton = page.locator('.swiper-button-prev');
    
    // Buttons should be focusable
    await nextButton.focus();
    await expect(nextButton).toBeFocused();
    
    await prevButton.focus();
    await expect(prevButton).toBeFocused();
    
    // Should be able to navigate with keyboard
    await nextButton.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    // Gallery should still be functional after keyboard navigation
    await expect(page.locator('.swiper')).toBeVisible();
  });

  test('should load images efficiently', async ({ page }) => {
    // Check that images are loading
    const images = page.locator('.swiper-slide img');
    
    // Wait for at least the first image to load
    await images.first().waitFor({ state: 'visible' });
    
    // Check that images have proper src attributes
    const firstImage = images.first();
    const src = await firstImage.getAttribute('src');
    
    expect(src).toBeTruthy();
    expect(src).toContain('.png'); // All our test images are PNG
  });
});