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

      // Fix `export default async function Page(()) {` to `export default async function Page() {`
      content = content.replace(/function\s+(\w+)\(\(\)\)/g, 'function $1()');
      
      // Fix `import "../globals.css";` to `import "./globals.css";` in layout.tsx
      if (item === 'layout.tsx') {
        content = content.replace(/import\s+"\.\.\/globals\.css";/, 'import "./globals.css";');
      }
      
      // Fix `kategori/[slug]/page.tsx` double `lang` definition
      // Remove `const { lang } = await params;` or remove the hardcoded `const lang = "id";`
      content = content.replace(/const\s+dict\s*=\s*require\("@\/i18n\/dictionaries\/id\.json"\);\s*const\s+lang\s*=\s*"";\s*const\s+lang\s*=\s*"";/g, 
                                'const dict = require("@/i18n/dictionaries/id.json"); const lang = "";');
      content = content.replace(/const\s+dict\s*=\s*require\("@\/i18n\/dictionaries\/id\.json"\);\s*const\s+lang\s*=\s*"id";/g, 
                                'const dict = require("@/i18n/dictionaries/id.json"); const lang = "";');
                                
      // Replace `({ params }: { params: Promise<{ lang: Locale, slug: string }> })` with `({ params }: { params: Promise<{ slug: string }> })`
      content = content.replace(/\{\s*lang:\s*Locale,\s*slug:\s*string\s*\}/g, '{ slug: string }');
      content = content.replace(/const\s*\{\s*lang,\s*slug\s*\}\s*=\s*await\s*params;/g, 'const { slug } = await params;');
      content = content.replace(/const\s*\{\s*slug,\s*lang\s*\}\s*=\s*await\s*params;/g, 'const { slug } = await params;');

      // Replace duplicate const lang = ""
      content = content.replace(/const\s+lang\s*=\s*"";\s*const\s+lang\s*=\s*"";/g, 'const lang = "";');

      fs.writeFileSync(fullPath, content);
    }
  }
}

console.log('Fixing pages pass 2...');
processDir(dir);
console.log('Done!');
