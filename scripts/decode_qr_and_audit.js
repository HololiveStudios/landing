const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const jsQR = require('jsqr');

async function decodeQR() {
  const p10Path = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-10.png';
  console.log('Inspecting Page 10 for QR codes...');
  
  // The bottom area of page 10 has the QR codes
  // Let's inspect coordinates around y: 1000-1418, x: 200-1800
  const meta = await sharp(p10Path).metadata();
  console.log('Page 10 dimensions:', meta.width, 'x', meta.height);
  
  // We can extract a few candidate regions or scan slices
  // Let's extract the lower area: left: 0, top: 900, width: 2339, height: 518
  const { data, info } = await sharp(p10Path)
    .extract({ left: 0, top: 900, width: meta.width, height: 518 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const clampedData = new Uint8ClampedArray(data);
  const code = jsQR(clampedData, info.width, info.height);
  if (code) {
    console.log('Found QR code directly in bottom strip:', code.data);
  } else {
    console.log('Direct scan of entire bottom strip did not find QR, scanning sub-boxes...');
  }

  // Scan smaller windows across the bottom area: x from 200 to 1800 in steps, y from 900 to 1350
  // Let's save a crop of bottom area to inspect visually if needed
  await sharp(p10Path)
    .extract({ left: 300, top: 1000, width: 1400, height: 400 })
    .png()
    .toFile('ns-engenharia/qr_crop_debug.png');
  console.log('Saved qr_crop_debug.png');

  // Let's test specific regions in qr_crop
  const cropBoxes = [
    { name: 'QR Left', left: 300, top: 1000, width: 450, height: 400 },
    { name: 'QR Mid-Left', left: 700, top: 1000, width: 450, height: 400 },
    { name: 'QR Mid-Right', left: 1100, top: 1000, width: 450, height: 400 },
    { name: 'QR Right', left: 1400, top: 1000, width: 450, height: 400 }
  ];

  const qrResults = [];
  for (const box of cropBoxes) {
    const { data: d, info: i } = await sharp(p10Path)
      .extract(box)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const res = jsQR(new Uint8ClampedArray(d), i.width, i.height);
    if (res) {
      console.log(`[${box.name}] QR Code found:`, res.data);
      qrResults.push({ box: box.name, data: res.data });
    }
  }

  fs.writeFileSync('ns-engenharia/qr_decoded.json', JSON.stringify(qrResults, null, 2));
}

decodeQR().catch(err => {
  console.error(err);
});
