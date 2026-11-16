const fs = require('fs');
const path = require('path');

const cssDir = 'ns-engenharia/css';
const files = ['tokens.css', 'base.css', 'layout.css', 'layers.css', 'sections.css'];

let combined = '';
for (const f of files) {
  combined += fs.readFileSync(path.join(cssDir, f), 'utf8') + '\n';
}

const lightboxCSS = `
/* Modal Lightbox de Alta Resolução para Pranchas CAD */
.cad-lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(10, 25, 45, 0.94);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.cad-lightbox-overlay.is-active {
  opacity: 1;
  pointer-events: auto;
}
.cad-lightbox-content {
  position: relative;
  max-width: 95vw;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cad-lightbox-content img {
  max-width: 100%;
  max-height: 84vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6);
  border: 1px solid rgba(255,255,255,0.2);
}
.cad-lightbox-close {
  position: absolute;
  top: -46px;
  right: 0;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  border-radius: 6px;
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}
.cad-lightbox-caption {
  color: #DDE8F4;
  margin-top: 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
}
.btn-zoom-cad {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.65rem;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
  color: #DDE8F4;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.4rem 0.85rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-zoom-cad:hover {
  background: var(--color-divider-orange);
  color: #fff;
  border-color: var(--color-divider-orange);
}
`;

combined += lightboxCSS;

// Minify
const minified = combined
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*([:;{},])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

fs.writeFileSync('ns-engenharia/css/compiled.min.css', minified);
console.log('Compiled CSS size:', (minified.length / 1024).toFixed(1), 'KB');
