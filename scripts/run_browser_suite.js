const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const rootDir = path.resolve('ns-engenharia');
const port = 8092;

// Servidor Estático
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      const filePath = path.join(rootDir, decodeURIComponent(reqPath));
      
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found: ' + reqPath);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.png': 'image/png',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.jpg': 'image/jpeg'
      };

      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      resolve(server);
    });
  });
}

async function runTests() {
  const server = await startServer();
  const widths = [360, 390, 430, 768, 1024, 1280, 1440, 1920];
  const outDir = path.resolve('ns-engenharia', 'tests', 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Launching Edge via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  const matrixResults = [];

  for (const w of widths) {
    console.log(`Testing viewport ${w} × 900...`);
    await page.setViewport({ width: w, height: 900 });
    await page.goto(`http://localhost:${port}/index.html`, { waitUntil: 'networkidle0' });

    // Verificar overflow horizontal
    const overflowCheck = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const bodyW = document.body.scrollWidth;
      const winW = window.innerWidth;
      const hasOverflow = docW > winW || bodyW > winW;
      
      // Procura elementos que ultrapassem a largura da janela
      const overflowingElements = [];
      document.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > winW + 1) {
          overflowingElements.push({
            tag: el.tagName,
            class: el.className,
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          });
        }
      });

      return {
        hasOverflow,
        docW,
        winW,
        overflowingElements: overflowingElements.slice(0, 5)
      };
    });

    const shotPath = path.join(outDir, `viewport_${w}px.png`);
    await page.screenshot({ path: shotPath, fullPage: true });

    matrixResults.push({
      width: w,
      overflow: overflowCheck.hasOverflow,
      docWidth: overflowCheck.docW,
      windowWidth: overflowCheck.winW,
      overflowingElements: overflowCheck.overflowingElements,
      screenshot: path.relative('ns-engenharia', shotPath).replace(/\\/g, '/')
    });

    console.log(`[${w}px] Overflow: ${overflowCheck.hasOverflow ? 'FAIL' : 'PASS'} | docW: ${overflowCheck.docW}px | winW: ${overflowCheck.winW}px`);
  }

  // Testar funcionalidade das abas do Escopo
  console.log('Testing Scope Tabs interactions...');
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`http://localhost:${port}/index.html`, { waitUntil: 'networkidle0' });

  const tabSolar = await page.$('#btn-tab-solar');
  if (tabSolar) {
    await tabSolar.click();
    const panelSolarVisible = await page.evaluate(() => {
      const panel = document.getElementById('tab-solar');
      return panel && panel.classList.contains('is-active');
    });
    console.log('Tab Solar activation:', panelSolarVisible ? 'PASS' : 'FAIL');
  }

  await browser.close();
  server.close();

  const finalReport = {
    date: new Date().toISOString(),
    consoleErrors,
    matrixResults
  };

  fs.writeFileSync('ns-engenharia/tests/test_report.json', JSON.stringify(finalReport, null, 2));
  console.log('Complete Browser Test Suite finished successfully!');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
