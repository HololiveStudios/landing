const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../ns-engenharia/assets/img');

async function optimizeAll() {
  console.log('Optimizing images in:', imgDir);

  // 1. Logos
  const logoWhite = path.join(imgDir, 'logo-horizontal-white.png');
  const logoColor = path.join(imgDir, 'logo-horizontal.png');

  if (fs.existsSync(logoWhite)) {
    // 320w (retina 2x for 160-180px display)
    await sharp(logoWhite)
      .resize(320, 67, { fit: 'inside' })
      .webp({ quality: 80, alphaQuality: 85, effort: 6 })
      .toFile(path.join(imgDir, 'logo-horizontal-white.webp'));
    
    // 180w (1x display)
    await sharp(logoWhite)
      .resize(180, 38, { fit: 'inside' })
      .webp({ quality: 80, alphaQuality: 85, effort: 6 })
      .toFile(path.join(imgDir, 'logo-horizontal-white-180.webp'));
    console.log('Optimized logo-horizontal-white');
  }

  if (fs.existsSync(logoColor)) {
    // 320w
    await sharp(logoColor)
      .resize(320, 79, { fit: 'inside' })
      .webp({ quality: 80, alphaQuality: 85, effort: 6 })
      .toFile(path.join(imgDir, 'logo-horizontal.webp'));

    // 180w
    await sharp(logoColor)
      .resize(180, 45, { fit: 'inside' })
      .webp({ quality: 80, alphaQuality: 85, effort: 6 })
      .toFile(path.join(imgDir, 'logo-horizontal-180.webp'));
    console.log('Optimized logo-horizontal');
  }

  // 2. Base photos - Hero, Quem Somos, Time Técnico, Painel, Rede
  const photoConfigs = [
    {
      src: 'hero-clean.webp',
      out480: 'hero-clean-480.webp',
      out960: 'hero-clean-960.webp',
      w480: 480, h480: 268,
      w960: 960, h960: 536,
      q480: 65, q960: 72
    },
    {
      src: 'quem-somos-clean.webp',
      out480: 'quem-somos-clean-480.webp',
      out960: 'quem-somos-clean-960.webp',
      w480: 480, h480: 643,
      w960: 896, h960: 1200,
      q480: 65, q960: 72
    },
    {
      src: 'time-tecnico-clean.webp',
      out480: 'time-tecnico-clean-480.webp',
      out960: 'time-tecnico-clean-960.webp',
      w480: 480, h480: 643,
      w960: 896, h960: 1200,
      q480: 65, q960: 72
    },
    {
      src: 'painel-multimetro-clean.webp',
      out480: 'painel-multimetro-clean-480.webp',
      out960: 'painel-multimetro-clean-960.webp',
      w480: 480, h480: 643,
      w960: 896, h960: 1200,
      q480: 65, q960: 72
    },
    {
      src: 'rede-tech-clean.webp',
      out480: 'rede-tech-clean-480.webp',
      out960: 'rede-tech-clean-960.webp',
      w480: 480, h480: 643,
      w960: 896, h960: 1200,
      q480: 65, q960: 72
    }
  ];

  for (const c of photoConfigs) {
    const fullSrc = path.join(imgDir, c.src);
    if (!fs.existsSync(fullSrc)) continue;

    const baseBuf = fs.readFileSync(fullSrc);

    // 480
    await sharp(baseBuf)
      .resize(c.w480, c.h480, { fit: 'cover' })
      .webp({ quality: c.q480, effort: 6 })
      .toFile(path.join(imgDir, c.out480));

    // 960
    await sharp(baseBuf)
      .resize(c.w960, c.h960, { fit: 'cover' })
      .webp({ quality: c.q960, effort: 6 })
      .toFile(path.join(imgDir, c.out960));

    console.log(`Optimized ${c.src} -> ${c.out480} & ${c.out960}`);
  }

  // 3. Concessionária logos
  const concLogos = [
    'logo-real-equatorial',
    'logo-real-cpfl',
    'logo-real-enel',
    'logo-real-neoenergia'
  ];

  for (const name of concLogos) {
    const pngPath = path.join(imgDir, `${name}.png`);
    if (fs.existsSync(pngPath)) {
      await sharp(pngPath)
        .resize({ height: 48, fit: 'inside' })
        .webp({ quality: 85, effort: 6 })
        .toFile(path.join(imgDir, `${name}.webp`));
      console.log(`Optimized ${name}.webp`);
    }
  }

  console.log('All image optimizations completed!');
}

optimizeAll().catch(console.error);
