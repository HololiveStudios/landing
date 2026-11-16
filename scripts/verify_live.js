const https = require('https');

https.get('https://nsengenharia.web.app', (res) => {
  console.log('HTTP Status:', res.statusCode);
  console.log('Cache-Control:', res.headers['cache-control']);
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Has inlined style:', data.includes('<style>'));
    console.log('Has external CSS links (.css):', data.includes('.css'));
    console.log('Has external JS script files (src="js/):', data.includes('src="js/'));
    console.log('Has inlined interactive JS:', data.includes('openLightbox'));
    console.log('Has responsive logo (logo-horizontal-white-180.webp):', data.includes('logo-horizontal-white-180.webp'));
    console.log('Has real concessionaria logos:', data.includes('logo-real-equatorial.webp'));
  });
});
