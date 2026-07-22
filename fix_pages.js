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

      // Common patterns to replace
      
      // 1. Remove getDictionary and i18n imports
      content = content.replace(/import\s*\{\s*getDictionary\s*\}\s*from\s*'[^']+';?\r?\n?/g, '');
      content = content.replace(/import\s*\{\s*Locale\s*\}\s*from\s*'[^']+';?\r?\n?/g, '');
      
      // 2. Fix Layout props
      content = content.replace(/Readonly<\{\s*children:\s*React\.ReactNode;\s*params:\s*Promise<\{\s*lang:\s*Locale\s*\}>\s*\}>/g, 
                                '{ children: React.ReactNode }');
      content = content.replace(/export\s+default\s+async\s+function\s+RootLayout\(\{\s*children,\s*params,\s*\}\s*:\s*\{[^}]+\}\)\s*\{/g, 
                                'export default async function RootLayout({ children }: { children: React.ReactNode }) {');
      
      // 3. Fix Page props
      content = content.replace(/\{ params \}: \{ params: Promise<\{ lang: Locale \}> \}/g, '()');
      content = content.replace(/\{\s*params,\s*searchParams\s*\}:\s*\{\s*params:\s*Promise<\{\s*lang:\s*Locale\s*\}>,\s*searchParams/g, 
                                '{ searchParams }: { searchParams');
      content = content.replace(/const\s*\{\s*lang\s*\}\s*=\s*await\s*params;\r?\n?/g, '');
      
      // 4. Remove getDictionary calls (We'll hardcode dictionary for ID for now, actually better to just require the ID dictionary directly)
      // Since we don't want to rewrite all texts, let's just import the ID dictionary statically!
      content = content.replace(/const\s+dict\s*=\s*await\s+getDictionary\(lang\);/g, 'const dict = require("@/i18n/dictionaries/id.json"); const lang = "id";');
      
      // 5. Replace links href={`/${lang}/...`} with href={`/...`}
      // Wait, if we keep `const lang = "id"`, the links will still be `/id/...` !
      // We must replace href={`/${lang} to href={`
      content = content.replace(/href=\{`\/\$\{lang\}/g, 'href={`');
      content = content.replace(/href=\{`\/\$\{lang\}\/([^`]+)`\}/g, 'href={`/$1`}');
      
      // Wait, let's just make `lang` an empty string!
      // const lang = "";
      // Then `/${lang}/produk` becomes `//produk`, Next.js normalizes it to `/produk`.
      
      content = content.replace(/const\s+dict\s*=\s*await\s+getDictionary\(lang\);/g, 'const dict = require("@/i18n/dictionaries/id.json"); const lang = "";');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

console.log('Fixing pages...');
processDir(dir);
console.log('Done!');
