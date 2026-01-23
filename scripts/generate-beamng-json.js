const fs = require('fs');
const path = require('path');

// Paths
const beamngFolder = path.join(__dirname, '../beamng');
const outputFile = path.join(__dirname, '../assets/search.json');

// Helper to read front-matter title
function getTitle(content, filename) {
  const match = content.match(/---\s*title:\s*(.+?)\s*---/s);
  if (match) return match[1].trim();
  return filename.replace('.md', '');
}

// Read all .md files recursively (subfolders included)
function readMarkdownFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(readMarkdownFiles(fullPath));
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const title = getTitle(content, file);

      // Build relative URL for GitHub Pages
      const relativePath = path.relative(beamngFolder, fullPath).replace(/\\/g, '/');
      const url = `/beamng/${relativePath.replace('.md', '.html')}`;

      results.push({
        title,
        content,
        url
      });
    }
  });

  return results;
}

// Generate JSON
const data = readMarkdownFiles(beamngFolder);

// Ensure assets folder exists
const assetsFolder = path.dirname(outputFile);
if (!fs.existsSync(assetsFolder)) {
  fs.mkdirSync(assetsFolder, { recursive: true });
}

// Write JSON file
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Generated ${outputFile} with ${data.length} entries.`);
