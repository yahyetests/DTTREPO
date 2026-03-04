// audit.js - Simple site link auditor
// Uses axios to fetch pages and cheerio to parse HTML.
// Scans the homepage and all internal links (starting with '/') for broken pages.
// Outputs a JSON summary to console.

const axios = require('axios');
const cheerio = require('cheerio');
const baseUrl = 'http://localhost:5174'; // dev server URL

async function fetchPage(path) {
    try {
        const url = `${baseUrl}${path}`;
        const response = await axios.get(url);
        return { url, status: response.status, data: response.data };
    } catch (err) {
        if (err.response) {
            return { url: `${baseUrl}${path}`, status: err.response.status, data: err.response.data };
        }
        return { url: `${baseUrl}${path}`, status: null, error: err.message };
    }
}

function extractLinks(html) {
    const $ = cheerio.load(html);
    const links = new Set();
    $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
            // Remove any hash or query params for simplicity
            const clean = href.split('#')[0].split('?')[0];
            links.add(clean);
        }
    });
    return Array.from(links);
}

async function audit() {
    const brokenLinks = [];
    const consoleErrors = [];
    const visited = new Set();
    const queue = ['/'];

    while (queue.length) {
        const path = queue.shift();
        if (visited.has(path)) continue;
        visited.add(path);
        const result = await fetchPage(path);
        if (!result.status || result.status >= 400 || /404|Not Found|Page not found/i.test(result.data || '')) {
            brokenLinks.push(result.url);
            continue;
        }
        // Extract internal links
        const links = extractLinks(result.data);
        for (const link of links) {
            if (!visited.has(link) && !queue.includes(link)) {
                queue.push(link);
            }
        }
    }

    console.log(JSON.stringify({ brokenLinks, consoleErrors }, null, 2));
}

audit();
