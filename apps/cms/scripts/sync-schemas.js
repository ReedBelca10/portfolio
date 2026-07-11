const fs = require('fs');
const path = require('path');

function copyJsonFiles(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  
  const items = fs.readdirSync(srcDir);
  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyJsonFiles(srcPath, destPath);
    } else if (item.endsWith('.json')) {
      if (!fs.existsSync(destPath) || fs.statSync(srcPath).mtimeMs > fs.statSync(destPath).mtimeMs) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`[sync-schemas] Copied ${item} to dist`);
      }
    }
  }
}

const srcPath = path.join(__dirname, '../src');
const destPath = path.join(__dirname, '../dist/src');

// Initial copy
copyJsonFiles(srcPath, destPath);

// Watch for changes if --watch flag is passed
if (process.argv.includes('--watch')) {
  console.log('[sync-schemas] Watching for schema changes...');
  // Poll every 2 seconds to ensure files are copied even if 'dist' is wiped by Strapi
  setInterval(() => {
    copyJsonFiles(srcPath, destPath);
  }, 2000);
}
