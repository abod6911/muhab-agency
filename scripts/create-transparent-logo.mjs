import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  const base64Png = await page.evaluate(async () => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/muhab-logo.webp';
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    const cx = w / 2;
    const cy = h / 2;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];

        // 1. Calculate elliptical distance from center
        const nx = (x - cx) / (w * 0.48);
        const ny = (y - cy) / (h * 0.48);
        const dist = Math.sqrt(nx * nx + ny * ny);

        // Radial falloff multiplier
        let radialAlpha = 1;
        if (dist >= 1.0) {
          radialAlpha = 0;
        } else if (dist > 0.6) {
          const t = (dist - 0.6) / 0.4;
          radialAlpha = 0.5 + 0.5 * Math.cos(t * Math.PI);
        }

        // 2. Luminance thresholding for dark background
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        const maxVal = Math.max(r, g, b);

        let lumAlpha = 1;
        if (luminance < 15 && maxVal < 20) {
          lumAlpha = 0;
        } else if (luminance < 50) {
          // Smooth blend for subtle aura/smoke
          lumAlpha = (luminance - 15) / 35;
        }

        // Final alpha
        const finalAlpha = Math.min(radialAlpha, lumAlpha > 0.85 ? radialAlpha : lumAlpha * radialAlpha);
        d[i + 3] = Math.round(255 * finalAlpha);
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
  });

  const base64Data = base64Png.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('public/muhab-logo.png', base64Data, 'base64');
  console.log('Successfully written public/muhab-logo.png!');
  await browser.close();
})();
