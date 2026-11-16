const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function makeFavicons() {
  const symbolPath = 'ns-engenharia/assets/img/test-extracted-symbol.png';
  if (!fs.existsSync(symbolPath)) {
    throw new Error('Symbol not found');
  }

  // 1. Create a 512x512 high-res centered master symbol
  const symbolBuf = await sharp(symbolPath).toBuffer();
  const meta = await sharp(symbolBuf).metadata();
  
  // Fit symbol inside 512x512 with 90% dimension
  const targetW = 480;
  const targetH = Math.round(targetW * (meta.height / meta.width));

  const resizedSymbol = await sharp(symbolBuf)
    .resize(targetW, targetH, { fit: 'contain' })
    .toBuffer();

  const padY = Math.round((512 - targetH) / 2);
  const padX = Math.round((512 - targetW) / 2);

  const master512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: resizedSymbol, top: padY, left: padX }
  ])
  .png()
  .toBuffer();

  // Save 512 master
  fs.writeFileSync('ns-engenharia/assets/img/logo-icon.png', master512);
  console.log('Created logo-icon.png (512x512)');

  // 2. Apple Touch Icon (180x180)
  await sharp(master512)
    .resize(180, 180)
    .png()
    .toFile('ns-engenharia/apple-touch-icon.png');
  console.log('Created apple-touch-icon.png (180x180)');

  // 3. Favicon 64x64
  await sharp(master512)
    .resize(64, 64)
    .png()
    .toFile('ns-engenharia/favicon.png');
  console.log('Created favicon.png (64x64)');

  // 4. Favicon 32x32
  await sharp(master512)
    .resize(32, 32)
    .png()
    .toFile('ns-engenharia/favicon-32.png');
  console.log('Created favicon-32.png (32x32)');

  // 5. Favicon 16x16
  await sharp(master512)
    .resize(16, 16)
    .png()
    .toFile('ns-engenharia/favicon-16.png');
  console.log('Created favicon-16.png (16x16)');

  // Clean up test files
  if (fs.existsSync('ns-engenharia/assets/img/test-extracted-symbol.png')) {
    // keep for future reference or leave
  }
}

makeFavicons().catch(console.error);
