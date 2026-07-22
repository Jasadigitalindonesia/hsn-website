const fs = require('fs');
let c = fs.readFileSync('src/app/[lang]/page.tsx', 'utf8');
c = c.replace(/"\{t\.([a-zA-Z0-9_]+)\}"/g, 't.$1');
fs.writeFileSync('src/app/[lang]/page.tsx', c);
console.log('Fixed quotes!');
