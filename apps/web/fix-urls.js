import fs from 'fs';
import https from 'https';

const filePath = 'content/subjects.ts';
let content = fs.readFileSync(filePath, 'utf-8');
const allUrls = [...new Set(content.match(/https:\/\/images\.unsplash\.com\/[^"]+/g) || [])];

console.log(`Found ${allUrls.length} total URLs.`);

// Check all URLs to partition them into working and broken
let brokenUrls = [];
let workingUrls = [];
let checked = 0;

allUrls.forEach(url => {
    https.get(url, (res) => {
        if (res.statusCode >= 400) {
            brokenUrls.push(url);
        } else {
            workingUrls.push(url);
        }
        checkDone();
    }).on('error', () => {
        brokenUrls.push(url);
        checkDone();
    });
});

function checkDone() {
    checked++;
    if (checked === allUrls.length) {
        if (workingUrls.length === 0) {
            console.error('No working URLs found to use as replacements!');
            process.exit(1);
        }

        console.log(`Found ${brokenUrls.length} broken URLs and ${workingUrls.length} working URLs.`);

        let replaceCount = 0;
        brokenUrls.forEach(brokenUrl => {
            // Pick a random working URL
            const replacement = workingUrls[Math.floor(Math.random() * workingUrls.length)];

            // Replace all occurrences in content
            const regex = new RegExp(brokenUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            const matches = content.match(regex);
            if (matches) {
                replaceCount += matches.length;
                content = content.replace(regex, replacement);
            }
        });

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Successfully replaced ${replaceCount} occurrences of broken URLs.`);
    }
}
