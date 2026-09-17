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

  // Initial scroll position
  const initialScroll = await page.evaluate(() => window.scrollY);
  console.log('Initial scroll:', initialScroll);

  // Open ContactModal
  await page.locator('#hero-cta-contact').click();
  await page.waitForTimeout(600);

  // Try scrolling with mouse wheel over backdrop
  await page.mouse.move(100, 100);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(400);

  // Try scrolling with mouse wheel over modal
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(400);

  const scrollAfterWheels = await page.evaluate(() => window.scrollY);
  console.log('Scroll after mouse wheels with modal open:', scrollAfterWheels);

  if (scrollAfterWheels !== 0) {
    console.error('FAIL: Background moved while modal was open!');
  } else {
    console.log('SUCCESS: Background stayed completely still (0px)!');
  }

  // Close modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // Now scroll should be unlocked
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(400);
  const scrollAfterClose = await page.evaluate(() => window.scrollY);
  console.log('Scroll after modal closed:', scrollAfterClose);

  await browser.close();
})();
