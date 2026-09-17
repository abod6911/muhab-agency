import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:5173');

  // Skip intro
  const enterBtn = page.getByRole('button', { name: /ادخل التحفة الرقمية|تخطي الدخول/i });
  await enterBtn.click({ force: true }).catch(() => {});
  await page.waitForTimeout(1000);

  // Click "ابدأ مشروعك الآن" button to open ContactModal
  const ctaBtn = page.locator('#hero-cta-contact');
  await ctaBtn.click();
  await page.waitForTimeout(600);

  // Take full page screenshot while modal is open
  await page.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/b323507e-591d-4129-a0ff-400c459f9c5c/modal-repro-1280x800.png'
  });

  // Check if body scroll is locked or if scroll works
  const scrollInfo = await page.evaluate(() => {
    const bodyOverflow = window.getComputedStyle(document.body).overflow;
    const htmlOverflow = window.getComputedStyle(document.documentElement).overflow;
    const scrollYBefore = window.scrollY;
    window.scrollBy(0, 300);
    const scrollYAfter = window.scrollY;
    return { bodyOverflow, htmlOverflow, scrollYBefore, scrollYAfter };
  });
  console.log('Scroll info:', scrollInfo);

  // Also test a smaller height screen (like typical laptop: 1366x768 or 1280x720)
  const laptopContext = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const laptopPage = await laptopContext.newPage();
  await laptopPage.goto('http://127.0.0.1:5173');
  const laptopEnter = laptopPage.getByRole('button', { name: /ادخل التحفة الرقمية|تخطي الدخول/i });
  await laptopEnter.click({ force: true }).catch(() => {});
  await laptopPage.waitForTimeout(1000);
  await laptopPage.locator('#hero-cta-contact').click();
  await laptopPage.waitForTimeout(600);

  await laptopPage.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/b323507e-591d-4129-a0ff-400c459f9c5c/modal-repro-1366x768.png'
  });

  await browser.close();
  console.log('Reproduction done!');
})();
