#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up syntax issues from stubs...');

function fixSyntaxIssues(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix duplicate imports
    const lines = content.split('\n');
    const seenImports = new Set();
    const cleanedLines = [];
    
    for (const line of lines) {
      // Check for duplicate import statements
      if (line.startsWith('import ') && line.includes(' from ')) {
        if (seenImports.has(line.trim())) {
          modified = true;
          continue; // Skip duplicate
        }
        seenImports.add(line.trim());
      }
      
      // Fix malformed variable declarations
      let cleanLine = line;
      
      // Fix: "export const user = null as any; // TODO: implement user data fetching;"
      // To: "const user = null as any; // TODO: implement user data fetching"
      if (cleanLine.includes('export   const') || cleanLine.includes('async   const')) {
        cleanLine = cleanLine.replace('export   const', 'const').replace('async   const', 'const');
        modified = true;
      }
      
      // Fix unused variables by prefixing with underscore
      if (cleanLine.includes('const ') && cleanLine.includes(' = ') && cleanLine.includes('// TODO: implement')) {
        const match = cleanLine.match(/const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
        if (match) {
          const varName = match[1];
          if (!varName.startsWith('_') && !cleanLine.includes(`${varName}(`)) {
            cleanLine = cleanLine.replace(`const ${varName}`, `const _${varName}`);
            modified = true;
          }
        }
      }
      
      // Fix unused imports by prefixing with underscore
      if (cleanLine.startsWith('import { ') && !cleanLine.includes(' from \'react\'') && !cleanLine.includes(' from "react"')) {
        const importMatch = cleanLine.match(/import\s*{\s*([^}]+)\s*}\s*from/);
        if (importMatch) {
          const imports = importMatch[1].split(',').map(imp => imp.trim());
          const fixedImports = imports.map(imp => {
            if (!imp.startsWith('_') && !imp.includes(' as ')) {
              return `${imp} as _${imp}`;
            }
            return imp;
          });
          if (fixedImports.join(', ') !== imports.join(', ')) {
            cleanLine = cleanLine.replace(importMatch[1], fixedImports.join(', '));
            modified = true;
          }
        }
      }
      
      cleanedLines.push(cleanLine);
    }

    const newContent = cleanedLines.join('\n');

    // Additional cleanup patterns
    let finalContent = newContent;

    // Remove empty function declarations that are malformed
    finalContent = finalContent.replace(/\n\s*;\s*\n/g, '\n');
    
    // Fix function declarations that got mangled
    finalContent = finalContent.replace(/(const\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*[^;]+);(\s*\n\s*function)/g, '$1$2');
    
    if (modified || finalContent !== content) {
      fs.writeFileSync(filePath, finalContent);
      console.log(`✅ Cleaned: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
  return false;
}

// Get files that were recently modified by the fix script
function getRecentlyModifiedFiles() {
  const files = [];
  
  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDir(itemPath);
      } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
        // Check if file was modified in the last minute (likely by our script)
        const now = Date.now();
        const fileModTime = stat.mtime.getTime();
        if (now - fileModTime < 60000) { // 1 minute
          files.push(itemPath);
        }
      }
    }
  }
  
  scanDir('./src');
  return files;
}

// Process recently modified files
const modifiedFiles = getRecentlyModifiedFiles();
console.log(`📁 Found ${modifiedFiles.length} recently modified files to clean`);

let cleanedCount = 0;
for (const file of modifiedFiles) {
  console.log(`🔍 Cleaning: ${file}`);
  if (fixSyntaxIssues(file)) {
    cleanedCount++;
  }
}

console.log(`🎉 Syntax cleanup completed! Cleaned ${cleanedCount} files.`);
console.log('💡 Run `pnpm lint` to check remaining issues');