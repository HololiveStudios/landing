const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const rootDir = path.resolve('ns-engenharia');
const port = 8089;

// Simple static server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(rootDir, decodeURIComponent(reqPath));
  
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
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

server.listen(port, async () => {
  console.log(`Test server running at http://localhost:${port}`);
  const widths = [360, 390, 430, 768, 1024, 1280, 1440, 1920];
  const outDir = path.resolve('ns-engenharia', 'tests', 'screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const results = [];

  for (const w of widths) {
    const shotPath = path.join(outDir, `shot_${w}px.png`);
    const cmd = `"${edgePath}" --headless --disable-gpu --window-size=${w},1080 --screenshot="${shotPath}" http://localhost:${port}/index.html`;
    console.log(`Capturing screenshot at ${w}px width...`);
    try {
      execSync(cmd, { stdio: 'pipe', timeout: 20000 });
      const stats = fs.statSync(shotPath);
      results.push({
        width: w,
        success: true,
        sizeKB: (stats.size / 1024).toFixed(1),
        path: shotPath
      });
      console.log(`Saved screenshot at ${w}px (${(stats.size/1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`Error capturing at ${w}px:`, e.message);
      results.push({ width: w, success: false, error: e.message });
    }
  }

  fs.writeFileSync('ns-engenharia/tests/responsive_test_results.json', JSON.stringify(results, null, 2));
  console.log('All responsive tests completed!');
  server.close();
  process.exit(0);
});
