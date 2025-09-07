#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Fix unused variable names in function parameters
    const lines = content.split('\n');
    const fixedLines = lines.map((line, index) => {
      // Fix function parameters with unused variables
      if (line.includes('(') && (line.includes('userData') || line.includes('userId') || line.includes('spaceData') || line.includes('spaceId') || line.includes('updates') || line.includes('flag'))) {
        const fixes = {
          'userData': '_userData',
          'userId': '_userId', 
          'updates': '_updates',
          'spaceData': '_spaceData',
          'spaceId': '_spaceId',
          'flag': '_flag'
        };
        
        let fixedLine = line;
        Object.entries(fixes).forEach(([old, new_]) => {
          const regex = new RegExp(`\\b${old}\\b(?=\\s*[,:]|\\s*\\))`, 'g');
          if (regex.test(fixedLine)) {
            fixedLine = fixedLine.replace(regex, new_);
            hasChanges = true;
          }
        });
        
        return fixedLine;
      }

      // Fix unused React imports
      if (line.includes('import') && (line.includes('useState') || line.includes('useEffect') || line.includes('useMemo'))) {
        const unusedImports = ['useState', 'useEffect', 'useMemo'];
        let fixedLine = line;
        
        unusedImports.forEach(importName => {
          // Check if import is used elsewhere in file
          const importUsageRegex = new RegExp(`\\b${importName}\\s*\\(`, 'g');
          if (line.includes(importName) && !content.match(importUsageRegex)) {
            // Remove unused import
            fixedLine = fixedLine.replace(new RegExp(`,?\\s*${importName}\\s*,?`, 'g'), '');
            fixedLine = fixedLine.replace(/,\s*,/g, ','); // Clean up double commas
            fixedLine = fixedLine.replace(/{\s*,/g, '{'); // Clean up leading comma
            fixedLine = fixedLine.replace(/,\s*}/g, '}'); // Clean up trailing comma
            hasChanges = true;
          }
        });
        
        return fixedLine;
      }

      return line;
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, fixedLines.join('\n'));
      return true;
    }

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
  
  return false;
}

// Process TypeScript and JavaScript files
const patterns = [
  'apps/web/src/**/*.{ts,tsx,js,jsx}',
  'apps/admin/src/**/*.{ts,tsx,js,jsx}',
  'packages/*/src/**/*.{ts,tsx,js,jsx}'
];

let totalFiles = 0;
let fixedFiles = 0;

patterns.forEach(pattern => {
  const files = glob.sync(pattern);
  
  files.forEach(file => {
    totalFiles++;
    if (fixFile(file)) {
      fixedFiles++;
      console.log(`Fixed: ${file}`);
    }
  });
});

console.log(`\nProcessed ${totalFiles} files`);
console.log(`Fixed ${fixedFiles} files with unused variable issues`);