import fs from 'fs';
import https from 'https';

const content = fs.readFileSync('content/subjects.ts', 'utf-8');
const urls = [...new Set(content.match(/https:\/\/images\.unsplash\.com\/[^"]+/g) || [])];

console.log(`Checking ${urls.length} unique URLs...`);

let broken = [];
let checked = 0;

urls.forEach(url => {
  https.get(url, (res) => {
    // Unsplash sometimes uses redirects, so accept 3xx as valid unless it goes to a 404 page.
    // For simplicity, anything 400 or above is broken.
    if (res.statusCode >= 400) {
      broken.push({ url, status: res.statusCode });
    }
    checked++;
    if (checked === urls.length) {
      console.log('Broken URLs:');
      console.log(JSON.stringify(broken, null, 2));
    }
  }).on('error', (e) => {
    broken.push({ url, error: e.message });
    checked++;
    if (checked === urls.length) {
      console.log('Broken URLs:');
      console.log(JSON.stringify(broken, null, 2));
    }
  });
});
