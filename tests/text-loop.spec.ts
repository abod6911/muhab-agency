import { test, expect } from '@playwright/test';

test.describe('React Bits TextLoop Component Integration', () => {
  test('renders wave ribbon and animated text with zero console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('http://localhost:5173/#text-loop-wave');

    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible()) {
      await skipBtn.click({ force: true });
      await page.waitForTimeout(800);
    }

    const waveSection = page.locator('#text-loop-wave');
    await expect(waveSection).toBeVisible();

    // Verify SVG and text elements
    const svg = waveSection.locator('.text-loop-svg');
    await expect(svg).toBeVisible();

    const path = svg.locator('path');
    await expect(path).toBeVisible();

    // Verify text content exists inside textPath
    const textPath = svg.locator('textPath').first();
    await expect(textPath).toBeVisible();
    await expect(textPath).toContainText('المواقع السعودية');

    // Filter out expected autoplay audio warnings
    const realErrors = consoleErrors.filter(e => !e.includes('AudioContext'));
    expect(realErrors.length).toBe(0);
  });

  test('responsive on mobile viewport (iPhone 14)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5173/#text-loop-wave');

    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible()) {
      await skipBtn.click({ force: true });
      await page.waitForTimeout(800);
    }

    const waveSection = page.locator('#text-loop-wave');
    await expect(waveSection).toBeVisible();

    const badge = waveSection.locator('text=موجة الانسيابية الرقمية');
    await expect(badge).toBeVisible();

    const svg = waveSection.locator('.text-loop-svg');
    await expect(svg).toBeVisible();
  });
});
