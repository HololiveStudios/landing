const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.padStart(2, '0');
  }).join('').toUpperCase();
}

async function getPixel(file, x, y) {
  const { data } = await sharp(file)
    .extract({ left: Math.floor(x), top: Math.floor(y), width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { r: data[0], g: data[1], b: data[2], hex: rgbToHex(data[0], data[1], data[2]) };
}

async function run() {
  const p1 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-01.png';
  const p2 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-02.png';
  const p3 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-03.png';
  const p4 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-04.png';
  const p5 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-05.png';
  const p8 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-08.png';
  const p10 = 'ns-engenharia/Portfolio NS Engenharia/Portfolio NS Engenharia-10.png';

  const report = {};
  
  // Background P1 and P2
  report.p1_bg_dark = await getPixel(p1, 2000, 500);
  report.p2_bg_dark = await getPixel(p2, 300, 500);
  
  // Title colors
  // Page 2 title is white
  report.p2_title = await getPixel(p2, 100, 185);
  // Page 3 title "NOSSO TIME TÉCNICO" is blue on white bg
  // Let's sample a region around x=1400, y=140..170 to find the darkest blue title pixel
  const p3TitleBuf = await sharp(p3).extract({ left: 1300, top: 120, width: 300, height: 60 }).raw().toBuffer();
  let darkestBlueP3 = null;
  let minLum = 999;
  for (let i = 0; i < 300 * 60; i++) {
    const r = p3TitleBuf[i * 3];
    const g = p3TitleBuf[i * 3 + 1];
    const b = p3TitleBuf[i * 3 + 2];
    // check if it's blue (b > r && b > g) and dark
    if (b > r && b > 50 && r < 50) {
      const lum = r * 0.299 + g * 0.587 + b * 0.114;
      if (lum < minLum) {
        minLum = lum;
        darkestBlueP3 = { r, g, b, hex: rgbToHex(r, g, b) };
      }
    }
  }
  report.title_blue = darkestBlueP3;

  // Let's sample the orange divider line across page 3 (it has a diagonal cut around x=1150..1250)
  const p3LineBuf = await sharp(p3).extract({ left: 1100, top: 700, width: 200, height: 1 }).raw().toBuffer();
  let p3Orange = null;
  let maxScore = -999;
  for (let i = 0; i < 200; i++) {
    const r = p3LineBuf[i * 3];
    const g = p3LineBuf[i * 3 + 1];
    const b = p3LineBuf[i * 3 + 2];
    const score = r * 2 - g - b * 3;
    if (score > maxScore) {
      maxScore = score;
      p3Orange = { r, g, b, hex: rgbToHex(r, g, b) };
    }
  }
  report.divider_orange = p3Orange;

  // Dots color (Halftone) on Page 4 or 5 (upper left or lower left)
  // Let's find light blue dots on white
  const p4DotsBuf = await sharp(p4).extract({ left: 40, top: 40, width: 200, height: 200 }).raw().toBuffer();
  let dotColor = null;
  let dotScore = -999;
  for (let i = 0; i < 200 * 200; i++) {
    const r = p4DotsBuf[i * 3];
    const g = p4DotsBuf[i * 3 + 1];
    const b = p4DotsBuf[i * 3 + 2];
    // Light blue: b > r + 30, g > 150, b > 180, r < 180
    if (b > r + 40 && b > 180 && r < 160) {
      const score = b - r;
      if (score > dotScore) {
        dotScore = score;
        dotColor = { r, g, b, hex: rgbToHex(r, g, b) };
      }
    }
  }
  report.halftone_dots = dotColor;

  // Gradient green stripe
  const p1GreenBuf = await sharp(p1).extract({ left: 1300, top: 1350, width: 400, height: 40 }).raw().toBuffer();
  let greenPeak = null;
  let greenMax = -999;
  for (let i = 0; i < 400 * 40; i++) {
    const r = p1GreenBuf[i * 3];
    const g = p1GreenBuf[i * 3 + 1];
    const b = p1GreenBuf[i * 3 + 2];
    if (g > r + 40 && g > b + 40) {
      const score = g * 2 - r - b;
      if (score > greenMax) {
        greenMax = score;
        greenPeak = { r, g, b, hex: rgbToHex(r, g, b) };
      }
    }
  }
  report.green_stripe = greenPeak;

  // Gradient orange stripe
  const p1OrangeBuf = await sharp(p1).extract({ left: 0, top: 1350, width: 500, height: 50 }).raw().toBuffer();
  let orangePeak = null;
  let orangeMax = -999;
  for (let i = 0; i < 500 * 50; i++) {
    const r = p1OrangeBuf[i * 3];
    const g = p1OrangeBuf[i * 3 + 1];
    const b = p1OrangeBuf[i * 3 + 2];
    if (r > 200 && g > 100 && b < 50) {
      const score = r * 2 - b * 3;
      if (score > orangeMax) {
        orangeMax = score;
        orangePeak = { r, g, b, hex: rgbToHex(r, g, b) };
      }
    }
  }
  report.orange_stripe = orangePeak;

  console.log('Visual Measurements:');
  console.log(JSON.stringify(report, null, 2));
  fs.writeFileSync('ns-engenharia/measured_brand_tokens.json', JSON.stringify(report, null, 2));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
