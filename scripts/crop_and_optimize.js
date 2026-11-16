const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const pdfDir = 'ns-engenharia/Portfolio NS Engenharia';
const outOrigDir = 'ns-engenharia/assets/img/_originais';
const outWebpDir = 'ns-engenharia/assets/img';

if (!fs.existsSync(outOrigDir)) {
  fs.mkdirSync(outOrigDir, { recursive: true });
}

// Bounding boxes definitions (x, y, width, height)
// Page is 2339 x 1418
const crops = [
  // S1 Hero: Clean hand + tech network from page 10 (or page 1)
  {
    id: 's1-hero-network',
    page: 10,
    crop: { left: 1450, top: 0, width: 2339 - 1450, height: 1418 },
    widths: [480, 960, 1600]
  },
  // S2 Quem Somos: Professionals with hardhats in wind park
  {
    id: 's2-equipe-parque-eolico',
    page: 2,
    crop: { left: 1180, top: 0, width: 2339 - 1180, height: 1418 },
    widths: [480, 960, 1600]
  },
  // S3 Nosso Time Técnico: Designer at laptop with PCB background
  {
    id: 's3-projetista-notebook',
    page: 3,
    crop: { left: 0, top: 0, width: 1250, height: 1418 },
    widths: [480, 960, 1600]
  },
  // S4 Diferenciais: Electrical panel with multimeter
  {
    id: 's4-painel-multimetro',
    page: 4,
    crop: { left: 1550, top: 0, width: 2339 - 1550, height: 1418 },
    widths: [480, 960, 1600]
  },
  // S5 Escopo 1: Projetos Elétricos - CAD escuro
  {
    id: 's5-prancha-cad-eletrico',
    page: 5,
    crop: { left: 1250, top: 0, width: 2339 - 1250, height: 720 },
    widths: [480, 960]
  },
  // S5 Escopo 2: Subestação abrigada
  {
    id: 's5-prancha-subestacao-abrigada',
    page: 5,
    crop: { left: 1200, top: 720, width: 2339 - 1200, height: 1418 - 720 },
    widths: [480, 960]
  },
  // S5 Escopo 3: Redes e iluminação - loteamento
  {
    id: 's5-prancha-loteamento',
    page: 6,
    crop: { left: 1350, top: 0, width: 2339 - 1350, height: 600 },
    widths: [480, 960]
  },
  // S5 Escopo 4: Subestação aérea - unifilar
  {
    id: 's5-prancha-subestacao-aerea',
    page: 6,
    crop: { left: 1250, top: 600, width: 2339 - 1250, height: 1418 - 600 },
    widths: [480, 960]
  },
  // S5 Escopo 5: Fotovoltaico planta com módulos
  {
    id: 's5-prancha-fotovoltaico',
    page: 7,
    crop: { left: 1320, top: 0, width: 2339 - 1320, height: 750 },
    widths: [480, 960]
  },
  // S5 Escopo 6: EMUC condomínios
  {
    id: 's5-prancha-emuc',
    page: 7,
    crop: { left: 1250, top: 750, width: 2339 - 1250, height: 1418 - 750 },
    widths: [480, 960]
  },
  // S6 Homologações: Rede de nós azul
  {
    id: 's6-rede-homologacoes',
    page: 8,
    crop: { left: 1500, top: 0, width: 2339 - 1500, height: 1418 },
    widths: [480, 960]
  },
  // S7 Outros Serviços: Rede de nós azul (enquadramento pág 9)
  {
    id: 's7-rede-outros-servicos',
    page: 9,
    crop: { left: 1500, top: 0, width: 2339 - 1500, height: 1418 },
    widths: [480, 960]
  },
  // S8 Contato: Mão com ponteira + rede
  {
    id: 's8-contato-mao-rede',
    page: 10,
    crop: { left: 1550, top: 0, width: 2339 - 1550, height: 1418 },
    widths: [480, 960]
  }
];

// Concessionárias logos from page 8:
// Let's also crop individual concessionária logos
const concessionarias = [
  { id: 'logo-concessionaria-equatorial', page: 8, crop: { left: 120, top: 630, width: 440, height: 160 } },
  { id: 'logo-concessionaria-cpfl', page: 8, crop: { left: 640, top: 630, width: 440, height: 160 } },
  { id: 'logo-concessionaria-enel', page: 8, crop: { left: 120, top: 850, width: 440, height: 160 } },
  { id: 'logo-concessionaria-neoenergia', page: 8, crop: { left: 640, top: 850, width: 440, height: 160 } }
];

async function run() {
  console.log('Starting image extraction and responsive generation...');
  const results = [];

  for (const item of crops) {
    const pageFile = path.join(pdfDir, `Portfolio NS Engenharia-${String(item.page).padStart(2, '0')}.png`);
    const origPng = path.join(outOrigDir, `${item.id}.png`);
    
    // Save original PNG crop
    await sharp(pageFile)
      .extract(item.crop)
      .png({ quality: 95 })
      .toFile(origPng);

    const origStats = fs.statSync(origPng);
    console.log(`Extracted ${item.id}: ${item.crop.width}x${item.crop.height} (${(origStats.size/1024).toFixed(1)} KB)`);

    // Generate responsive WebP variants
    const variants = [];
    for (const w of item.widths) {
      if (w > item.crop.width * 1.25) continue; // don't upscale too much
      const targetW = Math.min(w, item.crop.width);
      const targetH = Math.round((targetW / item.crop.width) * item.crop.height);
      const webpFile = path.join(outWebpDir, `${item.id}-${w}.webp`);
      
      await sharp(origPng)
        .resize(targetW, targetH, { fit: 'cover' })
        .webp({ quality: 82, effort: 6 })
        .toFile(webpFile);

      const webpStats = fs.statSync(webpFile);
      variants.push({
        width: targetW,
        height: targetH,
        file: `${item.id}-${w}.webp`,
        sizeKB: (webpStats.size / 1024).toFixed(1)
      });
    }

    // Also generate standard fallback webp (default width or max)
    const defW = item.widths[1] || item.widths[0];
    const defFile = path.join(outWebpDir, `${item.id}.webp`);
    await sharp(origPng)
      .resize(Math.min(defW, item.crop.width), null)
      .webp({ quality: 84, effort: 6 })
      .toFile(defFile);
    const defStats = fs.statSync(defFile);

    results.push({
      id: item.id,
      page: item.page,
      crop: item.crop,
      origKB: (origStats.size/1024).toFixed(1),
      defaultKB: (defStats.size/1024).toFixed(1),
      variants
    });
  }

  // Extract Concessionárias logos
  console.log('Extracting Concessionarias logos...');
  for (const c of concessionarias) {
    const pageFile = path.join(pdfDir, `Portfolio NS Engenharia-${String(c.page).padStart(2, '0')}.png`);
    const origPng = path.join(outOrigDir, `${c.id}.png`);
    await sharp(pageFile)
      .extract(c.crop)
      .trim()
      .png({ quality: 95 })
      .toFile(origPng);
    
    // Save webp
    const webpFile = path.join(outWebpDir, `${c.id}.webp`);
    await sharp(origPng)
      .webp({ quality: 90, effort: 6 })
      .toFile(webpFile);
    console.log(`Saved logo ${c.id}`);
  }

  // Extract Logo NS Engenharia & Energia from Page 1 and Page 10
  console.log('Extracting official NS Engenharia logo...');
  // Page 1 has the full logo at top/center
  // Let's inspect coordinates on Page 1
  const logoP1Crop = { left: 240, top: 400, width: 800, height: 350 };
  const logoPng = path.join(outOrigDir, 'logo-ns-engenharia-energia.png');
  await sharp(path.join(pdfDir, 'Portfolio NS Engenharia-01.png'))
    .extract(logoP1Crop)
    .trim()
    .png()
    .toFile(logoPng);
  await sharp(logoPng).webp({ quality: 95 }).toFile(path.join(outWebpDir, 'logo-ns-engenharia-energia.webp'));

  fs.writeFileSync('ns-engenharia/crops_manifest.json', JSON.stringify(results, null, 2));
  console.log('All crops and responsive webp created successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
