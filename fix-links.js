const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'frontend/src'), (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace <Link href="..." with <Link to="..."
    let newContent = content.replace(/<Link([^>]*?)href=(["'{])/g, '<Link$1to=$2');

    // Remove lucide-react Github import specifically
    newContent = newContent.replace(/,\s*Github\s*}/g, ' }');
    newContent = newContent.replace(/{\s*Github\s*,\s*/g, '{ ');
    newContent = newContent.replace(/{\s*Github\s*}/g, '{}');
    
    // Replace <Github /> tag
    newContent = newContent.replace(/<Github[^>]*\/>/g, '<span>GitHub</span>');

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent);
    }
  }
});
console.log('Fixed links safely');
