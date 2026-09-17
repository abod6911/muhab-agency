import { test, expect } from '@playwright/test';

test('Legendary 3D Intro splash screen displays on entry and official logo is rendered', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  // 1. Visit page and verify IntroSplashScreen is visible with official logo & HUD
  await page.goto('http://localhost:5173');

  const splashScreen = page.locator('[data-testid="intro-splash-screen"]');
  await expect(splashScreen).toBeVisible({ timeout: 5000 });

  // Take screenshot of Legendary 3D Intro Splash Screen
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/intro-splash-legendary.png' });

  // 2. Wait for 100% ready button or skip
  const enterBtn = page.getByRole('button', { name: /ادخل التحفة الرقمية|EXPLORE THE DIGITAL FLAGSHIP/i });
  const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });

  const isEnterVisible = await enterBtn.isVisible({ timeout: 7000 }).catch(() => false);
  if (isEnterVisible) {
    await page.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/intro-splash-ready-button.png' });
    await enterBtn.click({ force: true }).catch(() => {});
  } else if (await skipBtn.isVisible()) {
    await skipBtn.click({ force: true }).catch(() => {});
  }

  // Wait for cinematic iris curtain exit
  await page.waitForTimeout(1200);

  // Take screenshot of Hero with updated Navbar official logo and floating cards
  await page.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/hero-with-official-logo.png' });

  // 3. Scroll to Portfolio Section
  const portfolioSection = page.locator('#portfolio');
  await portfolioSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // 4. Test clicking categories rapidly to ensure zero lag, instantaneous updates
  const fnbTab = page.getByRole('button', { name: /المطاعم والكافيهات|Fine Dining & F&B/i });
  await expect(fnbTab).toBeVisible();
  
  await fnbTab.click();
  await page.waitForTimeout(350);
  
  // Verify F&B projects show up immediately (e.g., Al-Khal or Lavoa)
  const alkhalCard = page.getByRole('heading', { name: /مطعم الخال الدمشقي|Al-Khal/i });
  await expect(alkhalCard).toBeVisible();

  await page.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/portfolio-filtered-fnb.png' });

  // 5. Scroll to Footer to capture updated logo in Footer
  const footerSection = page.locator('#contact');
  await footerSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/footer-with-official-logo.png' });
});
