const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src-backup');
const destDir = path.join(__dirname, 'frontend/src');

function transformFile(content, isComponent) {
  let newContent = content;

  // Remove Next.js directives
  newContent = newContent.replace(/"use client";?\n?/g, '');
  
  // Replace next/link
  newContent = newContent.replace(/import Link from ["']next\/link["'];?/g, "import { Link } from 'react-router-dom';");
  
  // Replace next/navigation
  newContent = newContent.replace(/import {([^}]+)} from ["']next\/navigation["'];?/g, (match, imports) => {
    let replaced = imports;
    if (replaced.includes('useRouter')) {
      replaced = replaced.replace('useRouter', 'useNavigate');
    }
    if (replaced.includes('useSearchParams')) {
      replaced += ", useLocation"; // naive but helps
    }
    return `import { ${replaced} } from 'react-router-dom';`;
  });
  newContent = newContent.replace(/useRouter\(\)/g, "useNavigate()");
  newContent = newContent.replace(/router\.push/g, "navigate");

  // Replace next-auth
  newContent = newContent.replace(/import { useSession } from ["']next-auth\/react["'];?/g, "import { useAuth } from '@/context/AuthContext';");
  newContent = newContent.replace(/const { data: session, status } = useSession\(\);?/g, "const { user, loading: statusLoading } = useAuth();\n  const session = { user };\n  const status = statusLoading ? 'loading' : user ? 'authenticated' : 'unauthenticated';");
  
  // Fix weird AuthProvider usage in prior code
  newContent = newContent.replace(/import { useAuth } from ["'][./]+AuthProvider["'];?/g, "import { useAuth } from '@/context/AuthContext';");

  return newContent;
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// 1. Copy UI Components
const uiDest = path.join(destDir, 'components/ui');
if (!fs.existsSync(uiDest)) {
  fs.mkdirSync(uiDest, { recursive: true });
}
walkDir(path.join(srcDir, 'components/ui'), (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const dPath = path.join(uiDest, path.basename(filePath));
  fs.writeFileSync(dPath, transformFile(content, true));
});

// 2. Copy standard components
walkDir(path.join(srcDir, 'components'), (filePath) => {
  if (filePath.includes('ui\\') || filePath.includes('ui/')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  if (['Navbar.tsx', 'ThemeToggle.tsx', 'LivePreview.tsx', 'MiniLivePreview.tsx'].includes(path.basename(filePath))) {
      fs.writeFileSync(path.join(destDir, 'components', path.basename(filePath)), transformFile(content, true));
  }
});

// 3. Process Pages
const pagesDest = path.join(destDir, 'pages');
if (!fs.existsSync(pagesDest)) { fs.mkdirSync(pagesDest, { recursive: true }); }

walkDir(path.join(srcDir, 'app'), (filePath) => {
  if (path.basename(filePath) === 'page.tsx') {
    const relativePath = path.relative(path.join(srcDir, 'app'), filePath);
    const dirName = path.dirname(relativePath);
    let newName = 'Home.tsx';
    if (dirName !== '.') {
      const parts = dirName.split(path.sep);
      // Ex: admin -> Admin.tsx, edit/[id] -> EditComponent.tsx
      if (parts[0] === 'edit') newName = 'EditComponent.tsx';
      else newName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + '.tsx';
    }
    
    // Read and transform
    let content = fs.readFileSync(filePath, 'utf8');
    content = transformFile(content, false);
    
    // Fix metadata exports which React doesn't support
    content = content.replace(/export const metadata.*?};\n?/gs, '');
    
    fs.writeFileSync(path.join(pagesDest, newName), content);
  }
});

console.log("Migration script complete");
