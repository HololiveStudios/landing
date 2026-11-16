const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

async function samplePoint(imagePath, x, y) {
  const { data, info } = await sharp(imagePath)
    .extract({ left: Math.floor(x), top: Math.floor(y), width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return {
    r: data[0],
    g: data[1],
    b: data[2],
    hex: rgbToHex(data[0], data[1], data[2])
  };
}

async function run() {
  const p1 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-01.png';
  const p2 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-02.png';
  const p3 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-03.png';
  const p4 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-04.png';
  const p8 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-08.png';
  const p10 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-10.png';

  console.log('Sampling colors from pages...');
  
  // Page 2 Background Dark Blue (left side)
  const bgDarkBlue = await samplePoint(p2, 200, 400);
  console.log('Page 2 bgDarkBlue:', bgDarkBlue);

  // Page 2 Title "QUEM SOMOS"
  const titleBlue = await samplePoint(p2, 100, 185);
  console.log('Page 2 titleBlue ("QUEM SOMOS"):', titleBlue);

  // Page 3 Title "NOSSO TIME TÉCNICO"
  const titleBlueP3 = await samplePoint(p3, 1400, 180);
  console.log('Page 3 titleBlue:', titleBlueP3);

  // Page 3 Body Text
  const bodyTextP3 = await samplePoint(p3, 1400, 370);
  console.log('Page 3 bodyText:', bodyTextP3);

  // Page 1 Orange stripe
  const orangeStripeP1 = await samplePoint(p1, 500, 1370);
  console.log('Page 1 orangeStripe:', orangeStripeP1);

  // Page 1 Green stripe
  const greenStripeP1 = await samplePoint(p1, 1600, 1370);
  console.log('Page 1 greenStripe:', greenStripeP1);

  // Page 1 Blue stripe
  const blueStripeP1 = await samplePoint(p1, 2100, 1370);
  console.log('Page 1 blueStripe:', blueStripeP1);

  // Page 2 Thin orange divider line (approx x=1200, y=700)
  // Let's scan a horizontal line on Page 2 around x=1150-1250, y=700 to find the orange peak
  const p2LineBuffer = await sharp(p2)
    .extract({ left: 1100, top: 700, width: 200, height: 1 })
    .raw()
    .toBuffer();
  
  let brightestOrange = null;
  let maxScore = -999;
  for (let i = 0; i < 200; i++) {
    const r = p2LineBuffer[i * 3];
    const g = p2LineBuffer[i * 3 + 1];
    const b = p2LineBuffer[i * 3 + 2];
    // Orange has high R, medium G, low B
    const score = r * 2 - g - b * 3;
    if (score > maxScore) {
      maxScore = score;
      brightestOrange = { x: 1100 + i, r, g, b, hex: rgbToHex(r, g, b) };
    }
  }
  console.log('Divider line orange peak:', brightestOrange);

  // Save results
  const results = {
    bgDarkBlue,
    titleBlue,
    titleBlueP3,
    bodyTextP3,
    orangeStripeP1,
    greenStripeP1,
    blueStripeP1,
    dividerOrange: brightestOrange
  };
  fs.writeFileSync('ns-engenharia/color_samples.json', JSON.stringify(results, null, 2));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
