const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, '../beamng');
const output = [];

fs.readdirSync(folder).forEach(file => {
  if (file.endsWith('.md')) {
    const content = fs.readFileSync(path.join(folder, file), 'utf-8');

    // Extract front-matter title
    const match = content.match(/---\s*title:\s*(.+?)\s*---/s);
    const title = match ? match[1].trim() : file.replace('.md', '');

    output.push({
      title,
      content,
      url: `/beamng/${file.replace('.md', '.html')}`
    });
  }
});

// Write JSON to repo
fs.writeFileSync(path.join(__dirname, '../beamng.json'), JSON.stringify(output, null, 2));
console.log('beamng.json generated!');
