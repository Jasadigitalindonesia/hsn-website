const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/Navbar.tsx',
  'src/components/Footer.tsx',
  'src/components/HeroSlider.tsx'
];

filesToFix.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace /${lang}/ with /
    content = content.replace(/\/\$\{lang\}\//g, '/');
    // For href={`/${lang}`} which might just become href={`/`}
    content = content.replace(/\/\$\{lang\}/g, '');
    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
  }
});
