import fs from 'fs';

const filePath = 'content/subjects.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Find all valid Unsplash URLs in the file to reuse
const workingUrls = [...new Set(content.match(/https:\/\/images\.unsplash\.com\/[^"]+/g) || [])];

let replaced = 0;

function getRandomIcon() {
  const icons = ["Calculator", "BookOpen", "Sigma", "PenTool", "Brain", "CheckCircle", "Activity", "TrendingUp", "Target"];
  return icons[Math.floor(Math.random() * icons.length)];
}

function getRandomUrl() {
  return workingUrls[Math.floor(Math.random() * workingUrls.length)];
}

// Target the lines using a regex
content = content.replace(/curriculum:\s*(\[.*?\])(?=,?\n|})/g, (match, jsonArrayStr) => {
  try {
    // Only process if it's one of the minified arrays (which won't have line breaks)
    if (jsonArrayStr.includes('\n')) return match;

    // Evaluate the array format
    let items = eval(jsonArrayStr);

    // Add missing fields
    items = items.map(item => {
      if (!item.icon) item.icon = getRandomIcon();
      if (!item.image) item.image = getRandomUrl();
      return item;
    });

    // Format nicely
    const formatted = '[\n    ' + items.map(item => {
      return `{ title: ${JSON.stringify(item.title)}, description: ${JSON.stringify(item.description)}, icon: "${item.icon}", image: "${item.image}" }`;
    }).join(',\n    ') + '\n  ]';

    replaced++;
    return `curriculum: ${formatted}`;
  } catch (e) {
    console.warn("Could not parse array: ", e.message);
    return match;
  }
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Updated ${replaced} minified curriculum arrays with images/icons.`);
