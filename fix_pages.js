const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('page.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('c:/Users/USER/Desktop/hsn-website/src/app/[lang]');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Match both Home and Page
  if (content.includes('{ params: { lang } }: { params: { lang: Locale } }')) {
    content = content.replace(/export default async function (Home|Page)\(\{ params: \{ lang \} \}: \{ params: \{ lang: Locale \} \}\) \{/, 
      "export default async function $1({ params }: { params: Promise<{ lang: Locale }> }) {\n  const { lang } = await params;");
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed:', file);
  }
});
