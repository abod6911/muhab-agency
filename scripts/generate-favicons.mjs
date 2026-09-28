import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

async function generate() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const emblemBuffer = fs.readFileSync('public/muhab-emblem.png');
  const emblemBase64 = `data:image/png;base64,${emblemBuffer.toString('base64')}`;

  const sizes = [
    { name: 'public/favicon-32x32.png', size: 32 },
    { name: 'public/favicon-16x16.png', size: 16 },
    { name: 'public/apple-touch-icon.png', size: 180 },
    { name: 'public/icon-192.png', size: 192 },
    { name: 'public/icon-512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: ${size}px;
            height: ${size}px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            overflow: hidden;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <img src="${emblemBase64}" />
      </body>
      </html>
    `;
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(html);
    await page.screenshot({ path: name, omitBackground: true });
    console.log(`Generated: ${name} (${size}x${size})`);
  }

  // Generate valid ICO containing 32x32 PNG
  const png32 = fs.readFileSync('public/favicon-32x32.png');
  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // type 1 = ICO
  icoHeader.writeUInt16LE(1, 4); // 1 image

  // Dir entry
  icoHeader.writeUInt8(32, 6); // width 32 (0 means 256)
  icoHeader.writeUInt8(32, 7); // height 32
  icoHeader.writeUInt8(0, 8); // color palette
  icoHeader.writeUInt8(0, 9); // reserved
  icoHeader.writeUInt16LE(1, 10); // color planes
  icoHeader.writeUInt16LE(32, 12); // bits per pixel
  icoHeader.writeUInt32LE(png32.length, 14); // image size in bytes
  icoHeader.writeUInt32LE(22, 18); // offset where image data starts

  const icoBuffer = Buffer.concat([icoHeader, png32]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log(`Generated: public/favicon.ico (${icoBuffer.length} bytes)`);

  await browser.close();
}

generate().catch(console.error);
