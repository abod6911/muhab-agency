import { test, expect } from '@playwright/test';

test.describe('Awwwards Interactive Agency Landing Page', () => {
  test('renders all 6 interactive sections, scroll-driven diamond mask, team cards, and particle canvas', async ({ page }) => {
    await page.goto('http://localhost:5173/?view=agency');

    // 1. Verify Hero Section HUD, Headline, and Diamond Mask
    const heroHeadline = page.getByRole('heading', { level: 1, name: /BESPOKE DIGITAL/i });
    await expect(heroHeadline).toBeVisible();

    await expect(page.getByText(/SYS.STATUS \/\/ LATENCY/i)).toBeVisible();
    await expect(page.getByText(/21°32'36"N 39°10'22"E/i)).toBeVisible();

    // Verify Central Diamond Mask Container & Image
    const diamondImg = page.locator('img[alt="Taqyeemi Luxury Hardware & Dashboard Suite"]');
    await expect(diamondImg).toBeVisible();

    // Take screenshot of initial hero state
    await page.screenshot({ path: 'agency-hero-resting.png' });

    // 2. Scroll down to mid-range to trigger expanding diamond mask
    await page.evaluate(() => window.scrollTo(0, 350));
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'agency-hero-expanded-mask.png' });

    // 3. Verify Editorial Typography & Micro-Narrative Grid
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(600);
    await expect(page.getByText(/01 \/ SUB-SECOND PERFORMANCE/i)).toBeVisible();
    await expect(page.getByText(/02 \/ ARCHITECTURAL IMMERSION/i)).toBeVisible();
    await expect(page.getByText(/LIGHTHOUSE SPEED/i)).toBeVisible();

    // 4. Verify Rotating Emblem
    await page.evaluate(() => window.scrollTo(0, 2100));
    await page.waitForTimeout(600);
    await expect(page.getByText(/ARCHITECTURAL DIGITAL EXCELLENCE/i)).toBeVisible();

    // 5. Verify "Meet The Team" Overlapping Skewed Cards Carousel
    await page.evaluate(() => window.scrollTo(0, 2700));
    await page.waitForTimeout(600);
    await expect(page.getByText(/04 \/ LEADERSHIP & VISION/i)).toBeVisible();
    await expect(page.getByText('Muhab Al-Ghamdi')).toBeVisible();
    await expect(page.getByText('Dr. Tariq Zahid')).toBeVisible();
    await expect(page.getByText('Nouf Al-Otaibi')).toBeVisible();

    // Hover over a team card to test 3D perspective tilt
    const teamCard = page.locator('text=Muhab Al-Ghamdi').first();
    await teamCard.hover({ force: true });
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'agency-team-tilted.png' });

    // 6. Verify Brands & Partners Masonry Brick Wall
    await page.evaluate(() => window.scrollTo(0, 3400));
    await page.waitForTimeout(600);
    await expect(page.getByText(/05 \/ CLIENT & ECOSYSTEM WALL/i)).toBeVisible();
    await expect(page.getByText('Taqyeemi NFC')).toBeVisible();
    await expect(page.getByText('PointPass Wallet')).toBeVisible();

    // 7. Verify Footer CTA and Interactive Particle Wave Canvas
    await page.evaluate(() => window.scrollTo(0, 4200));
    await page.waitForTimeout(600);
    await expect(page.getByRole('heading', { level: 2, name: /YOUR NEXT BIG THING STARTS HERE/i })).toBeVisible();
    await expect(page.getByText(/WE ARE LISTENING/i)).toBeVisible();

    const canvas = page.locator('footer canvas');
    await expect(canvas).toBeVisible();

    // Trigger mousemove on canvas to verify interaction
    await canvas.hover({ position: { x: 200, y: 150 }, force: true });
    await page.waitForTimeout(400);

    // Capture footer with interactive particle canvas
    await page.screenshot({ path: 'agency-footer-particles.png' });
  });
});
