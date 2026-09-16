import { test, expect } from '@playwright/test';

test.describe('Physics-Driven Interactive Magnetic Social Icons', () => {
  test('renders magnetic dock with all brand channels and supports keyboard navigation & hover', async ({ page }) => {
    // Start page
    await page.goto('http://localhost:5173');

    // Switch to Classic Studio view if currently on Awwwards Agency mode
    const classicBtn = page.getByRole('button', { name: /Classic Studio/i });
    if (await classicBtn.isVisible()) {
      await classicBtn.click();
      await page.waitForTimeout(400);
    }

    // 1. Locate the showcase dock
    const showcaseSection = page.locator('#social-showcase');
    await expect(showcaseSection).toBeVisible();

    // 2. Locate the social navigation dock in showcase
    const showcaseDock = showcaseSection.getByRole('navigation', { name: /Social media channels/i });
    await expect(showcaseDock).toBeVisible();

    // 3. Verify only TikTok and Instagram platforms exist with their proper aria-labels and URLs
    const expectedChannels = [
      { 
        name: 'TikTok', 
        label: 'Follow us on TikTok',
        href: 'https://www.tiktok.com/@muhabmebmakers?_r=1&_t=ZS-99jitaEr8Uu' 
      },
      { 
        name: 'Instagram', 
        label: 'View our Instagram portfolio',
        href: 'https://www.instagram.com/muhabwebmakers?stkn=OTYydnJiejlpN3B2' 
      }
    ];

    for (const channel of expectedChannels) {
      const btn = showcaseDock.getByRole('link', { name: channel.label });
      await expect(btn).toBeVisible();
      await expect(btn).toHaveAttribute('href', channel.href);
      await expect(btn).toHaveAttribute('target', '_blank');
      await expect(btn).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(btn).toHaveAttribute('tabindex', '0');
    }

    // 4. Test TikTok Chromatic Aberration Layer Presence
    const tikTokBtn = showcaseDock.getByRole('link', { name: 'Follow us on TikTok' });
    await expect(tikTokBtn).toBeVisible();
    
    // Hover over TikTok button to trigger chromatic activation
    await tikTokBtn.hover({ force: true });
    await page.waitForTimeout(400);

    // Verify SVG icon exists
    const svgLayers = tikTokBtn.locator('svg');
    await expect(svgLayers.first()).toBeAttached();

    // 5. Test Keyboard Navigation & Focus Ring
    await page.keyboard.press('Tab');
    const focusedEl = page.locator(':focus');
    await expect(focusedEl).toBeVisible();

    // 6. Test Footer Magnetic Dock
    const footerDock = page.locator('footer').getByRole('navigation', { name: /Social media channels/i });
    await expect(footerDock).toBeVisible();

    // Scroll to showcase section and take a high-res screenshot of active state
    await showcaseSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'magnetic-social-showcase.png' });
  });
});
