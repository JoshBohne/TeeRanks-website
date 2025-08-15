import { test, expect } from '@playwright/test';
import { testData } from '../fixtures/test-data';

test.describe('Waitlist Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to waitlist section
    await page.locator('a[href="#waitlist"]').click();
    await page.waitForSelector('#waitlist', { state: 'visible' });
  });

  test('should display waitlist form correctly', async ({ page }) => {
    // Check form elements are present
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Check form labels
    await expect(page.locator('text=Email Address')).toBeVisible();
    await expect(page.locator('text=First Name')).toBeVisible();
  });

  test('should submit valid waitlist form successfully', async ({ page }) => {
    // Fill out the form with valid data
    await page.fill('input[type="email"]', testData.validWaitlistUser.email);
    await page.fill('input[name="firstName"]', testData.validWaitlistUser.firstName);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for success message to appear
    await expect(page.locator('text=Thank you for joining the waitlist!')).toBeVisible();
    await expect(page.locator('svg')).toBeVisible(); // CheckCircle icon
    
    // Form should be hidden after successful submission
    await expect(page.locator('input[type="email"]')).not.toBeVisible();
  });

  test('should show validation errors for invalid email', async ({ page }) => {
    for (const invalidEmail of testData.invalidEmails) {
      // Clear form first
      await page.fill('input[type="email"]', '');
      await page.fill('input[name="firstName"]', '');
      
      // Fill with invalid email
      await page.fill('input[type="email"]', invalidEmail);
      await page.fill('input[name="firstName"]', testData.validWaitlistUser.firstName);
      
      // Try to submit
      await page.click('button[type="submit"]');
      
      // Should show email validation error
      await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
      
      // Success message should not appear
      await expect(page.locator('text=Thank you for joining the waitlist!')).not.toBeVisible();
    }
  });

  test('should show validation errors for invalid first name', async ({ page }) => {
    for (const invalidName of testData.invalidNames) {
      // Clear form first
      await page.fill('input[type="email"]', '');
      await page.fill('input[name="firstName"]', '');
      
      // Fill with valid email but invalid name
      await page.fill('input[type="email"]', testData.validWaitlistUser.email);
      await page.fill('input[name="firstName"]', invalidName);
      
      // Try to submit
      await page.click('button[type="submit"]');
      
      // Should show name validation error
      await expect(page.locator('text=First name must be at least 2 characters')).toBeVisible();
      
      // Success message should not appear
      await expect(page.locator('text=Thank you for joining the waitlist!')).not.toBeVisible();
    }
  });

  test('should show both validation errors when both fields are invalid', async ({ page }) => {
    // Fill with invalid data
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[name="firstName"]', 'A');
    
    // Try to submit
    await page.click('button[type="submit"]');
    
    // Should show both validation errors
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
    await expect(page.locator('text=First name must be at least 2 characters')).toBeVisible();
  });

  test('should clear validation errors when user fixes input', async ({ page }) => {
    // First trigger validation errors
    await page.fill('input[type="email"]', 'invalid');
    await page.fill('input[name="firstName"]', 'A');
    await page.click('button[type="submit"]');
    
    // Verify errors are shown
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
    await expect(page.locator('text=First name must be at least 2 characters')).toBeVisible();
    
    // Fix the inputs
    await page.fill('input[type="email"]', testData.validWaitlistUser.email);
    await page.fill('input[name="firstName"]', testData.validWaitlistUser.firstName);
    
    // Submit again
    await page.click('button[type="submit"]');
    
    // Should now show success
    await expect(page.locator('text=Thank you for joining the waitlist!')).toBeVisible();
    
    // Error messages should be gone
    await expect(page.locator('text=Please enter a valid email address')).not.toBeVisible();
    await expect(page.locator('text=First name must be at least 2 characters')).not.toBeVisible();
  });

  test('should have proper form accessibility', async ({ page }) => {
    // Check that form has proper labels
    const emailInput = page.locator('input[type="email"]');
    const nameInput = page.locator('input[name="firstName"]');
    const submitButton = page.locator('button[type="submit"]');
    
    // Inputs should have proper accessibility attributes
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(nameInput).toHaveAttribute('type', 'text');
    await expect(submitButton).toHaveAttribute('type', 'submit');
    
    // Check that form can be navigated with keyboard
    await emailInput.focus();
    await expect(emailInput).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(nameInput).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(submitButton).toBeFocused();
  });
});