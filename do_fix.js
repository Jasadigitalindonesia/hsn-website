const fs = require('fs');
const pages = [
  'page.tsx', 
  'produk/page.tsx', 
  'katalog/page.tsx', 
  'profil/page.tsx', 
  'artikel/page.tsx', 
  'kontak/page.tsx'
];

pages.forEach(p => {
  const filePath = 'src/app/[lang]/' + p;
  if (!fs.existsSync(filePath)) return;
  
  let c = fs.readFileSync(filePath, 'utf8');
  
  // Remove the hardcoded dict require
  c = c.replace(/const dict = require\("@\/i18n\/dictionaries\/id\.json"\);/g, '');
  
  // Replace the hardcoded lang variable with dynamic param and dictionary fetch
  const replaceStr = `const lang = (await Promise.resolve(params))?.lang || "id";\n  const dict = await (require("@/i18n/getDictionary").getDictionary(lang as any));`;
  c = c.replace(/const lang: string = "";/g, replaceStr);
  
  // Change the function signature to accept params
  c = c.replace(/export default async function \w+\(\) \{/, 'export default async function Page({ params }: { params: any }) {');
  
  fs.writeFileSync(filePath, c);
  console.log('Fixed ' + filePath);
});
