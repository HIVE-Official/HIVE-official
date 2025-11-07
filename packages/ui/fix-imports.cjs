#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function addJsExtensions(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      addJsExtensions(fullPath);
    } else if (file.name.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix relative imports without extensions (starts with . or ..)
      content = content.replace(/from\s+['"](\.[^'"]*?)['"];/g, (match, importPath) => {
        // Skip if already has .js extension
        if (importPath.endsWith('.js')) return match;
        
        // Check if the import is a directory with index.js
        const absolutePath = path.resolve(path.dirname(fullPath), importPath);
        const indexPath = path.join(absolutePath, 'index.js');
        
        if (fs.existsSync(indexPath)) {
          return match.replace(importPath, importPath + '/index.js');
        } else if (fs.existsSync(absolutePath + '.js')) {
          return match.replace(importPath, importPath + '.js');
        }
        
        return match;
      });
      
      fs.writeFileSync(fullPath, content);
      console.log(`Fixed: ${fullPath}`);
    }
  }
}

console.log('Fixing import paths...');
// Fix imports in ui/src directory
const distSrcPath = path.join(__dirname, 'dist/ui/src');
if (fs.existsSync(distSrcPath)) {
  addJsExtensions(distSrcPath);
}

// Also fix the main index.js files
const mainIndexPaths = [
  path.join(__dirname, 'dist/ui/index.js'),
  path.join(__dirname, 'dist/index.js'),
];
for (const mainIndexPath of mainIndexPaths) {
  if (fs.existsSync(mainIndexPath)) {
    let content = fs.readFileSync(mainIndexPath, 'utf8');

    // Fix relative imports without extensions
    content = content.replace(/from\s+['"](\.[^'"]*?)['"];/g, (match, importPath) => {
      if (importPath.endsWith('.js')) return match;
      const absolutePath = path.resolve(path.dirname(mainIndexPath), importPath);
      const indexPath = path.join(absolutePath, 'index.js');
      if (fs.existsSync(indexPath)) {
        return match.replace(importPath, importPath + '/index.js');
      } else if (fs.existsSync(absolutePath + '.js')) {
        return match.replace(importPath, importPath + '.js');
      }
      return match;
    });

    // Also fix export * from patterns
    content = content.replace(/export\s+\*\s+from\s+['"](\.[^'"]*?)['"];/g, (match, importPath) => {
      if (importPath.endsWith('.js')) return match;
      const absolutePath = path.resolve(path.dirname(mainIndexPath), importPath);
      const indexPath = path.join(absolutePath, 'index.js');
      if (fs.existsSync(indexPath)) {
        return match.replace(importPath, importPath + '/index.js');
      } else if (fs.existsSync(absolutePath + '.js')) {
        return match.replace(importPath, importPath + '.js');
      }
      return match;
    });

    fs.writeFileSync(mainIndexPath, content);
    console.log(`Fixed main index: ${mainIndexPath}`);
  }
}

console.log('Done!');
