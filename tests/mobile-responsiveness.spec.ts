import { test, expect } from '@playwright/test';
import path from 'path';

const artifactDir = 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449';

test.describe('Mobile 100% Responsiveness & Ergonomics Suite', () => {
  
  test('iPhone 15 Pro (393x852) - Comprehensive Layout, Menu, & Modals', async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('http://localhost:5173');

    // Check intro splash screen
    await page.waitForTimeout(500);
    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible()) {
      // Ensure magnetic button is NOT visible during splash
      const floatingMagnetic = page.getByTestId('floating-magnetic-menu');
      const isMagneticVisibleDuringSplash = await floatingMagnetic.isVisible().catch(() => false);
      expect(isMagneticVisibleDuringSplash).toBeFalsy();

      await skipBtn.click();
    }
    await page.waitForTimeout(1000);

    // 1. Check Horizontal Overflow on iPhone 15 Pro
    const overflowCheck = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        innerWidth: window.innerWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    expect(overflowCheck.hasOverflow).toBe(false);

    // Capture Hero on iPhone 15 Pro
    await page.screenshot({ path: path.join(artifactDir, 'mobile-v2-iphone15-hero.png') });

    // Verify Mobile Quick Action Bar is visible
    const quickBar = page.getByRole('button', { name: /طلب استشارة VIP|Book VIP Call/i });
    await expect(quickBar).toBeVisible();

    // 2. Test Mobile Menu Drawer
    const navMenuBtn = page.locator('header button[aria-label="Open Navigation Menu"]');
    await expect(navMenuBtn).toBeVisible();
    await navMenuBtn.click();
    await page.waitForTimeout(700);

    // Verify drawer opened and capture
    const drawerDialog = page.locator('div[role="dialog"][aria-label="Navigation Menu"]');
    await expect(drawerDialog).toBeVisible();
    await page.screenshot({ path: path.join(artifactDir, 'mobile-v2-drawer-open.png') });

    // Close drawer
    const closeDrawerBtn = page.locator('button[aria-label="Close Navigation Menu"]');
    if (await closeDrawerBtn.isVisible()) {
      await closeDrawerBtn.click();
      await page.waitForTimeout(500);
    }

    // 3. Test Opening Contact Modal via Mobile Quick Action Bar
    await quickBar.click();
    await page.waitForTimeout(600);

    // Verify Contact Modal is opened and capture
    const contactDialog = page.locator('h3').filter({ hasText: /ابدأ مشروعك|Start Your/i });
    await expect(contactDialog).toBeVisible();
    await page.screenshot({ path: path.join(artifactDir, 'mobile-v2-contact-modal.png') });

    // Close Contact Modal
    const closeModalBtn = page.locator('button[aria-label="Close modal"]');
    await closeModalBtn.click();
    await page.waitForTimeout(500);

    // 4. Scroll to Portfolio and test Live Preview Modal
    const portfolioLink = page.locator('#portfolio');
    await portfolioLink.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'mobile-v2-portfolio.png') });

    const livePreviewBtn = page.locator('button:has-text("معاينة الموقع مباشرة")').first();
    if (await livePreviewBtn.isVisible()) {
      await livePreviewBtn.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-v2-live-preview-modal.png') });

      const closePreview = page.locator('button[aria-label="إغلاق المعاينة"], button[aria-label="Close modal preview"], button[aria-label="Close"]').or(page.locator('button svg.lucide-x').locator('..')).first();
      if (await closePreview.isVisible()) {
        await closePreview.click();
        await page.waitForTimeout(400);
      }
    }

    // 5. Scroll to Footer and verify clearance
    const footer = page.locator('footer#contact');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'mobile-v2-footer.png') });
  });

  test('iPhone SE (375x667) - Compact Screen Fit & Zero Overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:5173');

    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible({ timeout: 2500 })) {
      await skipBtn.click();
    }
    await page.waitForTimeout(1000);

    // Verify zero overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(overflow).toBe(false);

    // Capture iPhone SE hero
    await page.screenshot({ path: path.join(artifactDir, 'mobile-v2-iphonese-hero.png') });

    // Check Drawer fits on 667px height
    const navMenuBtn = page.locator('header button[aria-label="Open Navigation Menu"]');
    await navMenuBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, 'mobile-v2-iphonese-drawer.png') });
  });

  test('Android Standard (360x800) - Narrow Viewport Verification', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('http://localhost:5173');

    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible({ timeout: 2500 })) {
      await skipBtn.click();
    }
    await page.waitForTimeout(1000);

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);

    await page.screenshot({ path: path.join(artifactDir, 'mobile-v2-android360-hero.png') });
  });
});
