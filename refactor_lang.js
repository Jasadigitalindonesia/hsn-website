const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, 'src', 'app');
const langDir = path.join(srcAppDir, '[lang]');

// Recursive function to move files
function moveFiles(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const items = fs.readdirSync(srcDir);
  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);

    if (fs.statSync(srcPath).isDirectory()) {
      moveFiles(srcPath, destPath);
    } else {
      // Overwrite if exists
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      fs.renameSync(srcPath, destPath);
    }
  }
}

// Move files
console.log('Moving files out of [lang]...');
moveFiles(langDir, srcAppDir);

// Delete [lang] folder
fs.rmSync(langDir, { recursive: true, force: true });
console.log('[lang] directory removed.');
