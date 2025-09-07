#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixDuplicateImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Track imports we've seen
    const seenImports = new Set();
    const newLines = [];
    let hasChanges = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // If this is an import line
      if (line.trim().startsWith('import ') && !line.includes('type ')) {
        // Extract what's being imported
        const importMatch = line.match(/import\s+({[^}]+}|\w+|[^'"`]+)\s+from\s+['"`]([^'"`]+)['"`]/);
        
        if (importMatch) {
          const [, importItems, fromModule] = importMatch;
          const importKey = `${importItems}:::${fromModule}`;
          
          if (seenImports.has(importKey)) {
            // Skip this duplicate import
            hasChanges = true;
            continue;
          } else {
            seenImports.add(importKey);
          }
        }
      }
      
      newLines.push(line);
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, newLines.join('\n'));
      return true;
    }

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
  
  return false;
}

// Process all TypeScript and JavaScript files in the web app
const patterns = [
  'apps/web/src/**/*.{ts,tsx,js,jsx}'
];

let totalFiles = 0;
let fixedFiles = 0;

patterns.forEach(pattern => {
  const files = glob.sync(pattern);
  
  files.forEach(file => {
    totalFiles++;
    if (fixDuplicateImports(file)) {
      console.log(`Fixed duplicate imports in: ${file}`);
      fixedFiles++;
    }
  });
});

console.log(`\nProcessed ${totalFiles} files`);
console.log(`Fixed ${fixedFiles} files with duplicate imports`);