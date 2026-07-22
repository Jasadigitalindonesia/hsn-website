const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app');

function processDir(currentDir) {
  const items = fs.readdirSync(currentDir);
  for (const item of items) {
    const fullPath = path.join(currentDir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (item !== 'admin' && item !== 'api') {
        processDir(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Change `const lang = "";` to `const lang: string = "";` to avoid literal overlap type errors
      content = content.replace(/const\s+lang\s*=\s*"";/g, 'const lang: string = "";');

      fs.writeFileSync(fullPath, content);
    }
  }
}

console.log('Fixing pages pass 3...');
processDir(dir);
console.log('Done!');
