const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'src', 'app');

function walkDir(d) {
  let results = [];
  const list = fs.readdirSync(d);
  list.forEach(file => {
    const filePath = path.join(d, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (file.endsWith('.tsx')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walkDir(dir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('href={``}')) {
    content = content.replace(/href=\{``\}/g, 'href={`/`}');
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});
