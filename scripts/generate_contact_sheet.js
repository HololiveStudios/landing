const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function makeContactSheet() {
  const raw = JSON.parse(fs.readFileSync('ns-engenharia/inventory-raw.json', 'utf8'));
  
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Folha de Contato - NS Engenharia</title>
  <style>
    body { font-family: sans-serif; background: #121212; color: #eee; padding: 24px; margin: 0; }
    h1 { color: #fff; margin-bottom: 8px; }
    p { color: #aaa; margin-top: 0; margin-bottom: 24px; }
    .section-title { font-size: 18px; margin: 24px 0 12px; color: #f58220; border-bottom: 1px solid #333; padding-bottom: 6px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .card { background: #1e1e1e; border: 1px solid #333; border-radius: 8px; overflow: hidden; padding: 12px; font-size: 12px; }
    .card img { width: 100%; height: 160px; object-fit: contain; background: #0a0a0a; display: block; border-radius: 4px; }
    .card h4 { margin: 8px 0 4px; font-size: 13px; word-break: break-all; color: #4fc3f7; }
    .meta { color: #888; margin-top: 4px; line-height: 1.4; }
    .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-top: 6px; }
    .badge-pdf { background: #0b4278; color: #fff; }
    .badge-asset { background: #37474f; color: #cfd8dc; }
  </style>
</head>
<body>
  <h1>Folha de Contato Visual — Auditoria de Ativos</h1>
  <p>Total de imagens analisadas: ${raw.length}</p>

  <div class="section-title">Páginas do Portfólio PDF (Fonte da Verdade)</div>
  <div class="grid">
    ${raw.filter(r => r.path.includes('Portfolio NS Engenharia-')).map(img => `
      <div class="card">
        <img src="${path.relative('ns-engenharia', img.path).replace(/\\/g, '/')}" loading="lazy">
        <h4>${img.name}</h4>
        <div class="meta">${img.width} × ${img.height} px | ${img.sizeKB} KB (${img.format.toUpperCase()})</div>
        <span class="badge badge-pdf">PORTFÓLIO PDF</span>
      </div>
    `).join('')}
  </div>

  <div class="section-title">Ativos Existentes em assets/img (HTML Atual)</div>
  <div class="grid">
    ${raw.filter(r => !r.path.includes('Portfolio NS Engenharia-')).map(img => `
      <div class="card">
        <img src="${path.relative('ns-engenharia', img.path).replace(/\\/g, '/')}" loading="lazy">
        <h4>${img.name}</h4>
        <div class="meta">${img.width} × ${img.height} px | ${img.sizeKB} KB (${img.format.toUpperCase()})</div>
        <span class="badge badge-asset">assets/img</span>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

  fs.writeFileSync('ns-engenharia/contact_sheet.html', html, 'utf8');
  console.log('Created ns-engenharia/contact_sheet.html');

  // Contact sheet image of the 10 PDF pages
  const pdfPages = raw.filter(r => r.path.includes('Portfolio NS Engenharia-')).sort((a,b) => a.name.localeCompare(b.name));
  const thumbs = [];
  for (const p of pdfPages) {
    const thumbBuf = await sharp(p.path).resize(400, 242, { fit: 'contain', background: '#ffffff' }).toBuffer();
    thumbs.push(thumbBuf);
  }
  
  const composites = [];
  for (let i = 0; i < thumbs.length; i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);
    composites.push({
      input: thumbs[i],
      left: col * 400,
      top: row * 242
    });
  }
  await sharp({
    create: {
      width: 2000,
      height: 484,
      channels: 3,
      background: { r: 240, g: 240, b: 240 }
    }
  }).composite(composites).jpeg({ quality: 90 }).toFile('ns-engenharia/contact_sheet_pdf_pages.jpg');
  console.log('Created ns-engenharia/contact_sheet_pdf_pages.jpg');
}

makeContactSheet().catch(err => {
  console.error(err);
  process.exit(1);
});
