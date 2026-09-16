const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  
  const result = await page.evaluate(async () => {
    const img = document.querySelector('img[src="/muhab-logo.webp"]');
    if (!img) return { error: 'Image not found' };
    
    // Wait for image to load
    if (!img.complete) {
      await new Promise((resolve) => { img.onload = resolve; });
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    const w = canvas.width;
    const h = canvas.height;
    
    const topLeft = Array.from(ctx.getImageData(0, 0, 1, 1).data);
    const topRight = Array.from(ctx.getImageData(w - 1, 0, 1, 1).data);
    const bottomLeft = Array.from(ctx.getImageData(0, h - 1, 1, 1).data);
    const bottomRight = Array.from(ctx.getImageData(w - 1, h - 1, 1, 1).data);
    
    // Check background style on the container
    return { w, h, topLeft, topRight, bottomLeft, bottomRight };
  });
  
  console.log('Result:', result);
  await browser.close();
})();
