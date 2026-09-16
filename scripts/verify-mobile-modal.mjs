import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:5173');
  const enterBtn = page.getByRole('button', { name: /ادخل التحفة الرقمية|تخطي الدخول/i });
  await enterBtn.click({ force: true }).catch(() => {});
  await page.waitForTimeout(1000);

  // Click CTA on mobile
  await page.locator('#hero-cta-contact').click();
  await page.waitForTimeout(600);

  await page.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/b323507e-591d-4129-a0ff-400c459f9c5c/modal-mobile-verified.png'
  });
  console.log('Mobile screenshot saved!');
  await browser.close();
})();
