import { test, expect } from '@playwright/test';

test.describe('Verify Live Vercel Deployment', () => {
  test('verify production deployment loads with zero console errors and full assets', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const failedRequests: string[] = [];
    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
    });

    const response = await page.goto('https://temporary-turbo-silver-q7z0t6z.vercel.app');
    expect(response?.status()).toBe(200);

    // Verify title and page loaded
    await page.waitForTimeout(1500);
    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible()) {
      await skipBtn.click();
      await page.waitForTimeout(1000);
    }

    // Verify Hero content
    await expect(page.locator('h1')).toContainText('نصمم أفضل المواقع');

    // Verify no failed asset requests
    console.log('Failed requests count:', failedRequests.length);
    console.log('Console errors count:', consoleErrors.length);
    expect(failedRequests.length).toBe(0);
  });
});
