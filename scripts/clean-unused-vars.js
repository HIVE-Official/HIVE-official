#!/usr/bin/env node

import fs from 'fs';
import { glob } from 'glob';

// Pattern to remove unused variable declarations
const patterns = [
  // Remove unused destructuring assignments
  /const\s+\{[^}]*,?\s*(\w+)\s*,?[^}]*\}\s*=\s*[^;]+;\s*\/\/\s*\1\s+is\s+never\s+used/g,
  
  // Remove simple unused const declarations
  /const\s+(\w+)\s*=\s*[^;]+;\s*\/\/\s*\1\s+is\s+never\s+used\s*/g,
  
  // Remove unused function parameters (comment them out)
  /\(([^)]*)\)\s*=>\s*{/g,
];

async function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Remove lines with unused variable declarations
  const lines = content.split('\n');
  const cleanedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line contains unused variable pattern
    if (line.includes('is declared but its value is never read')) {
      // Skip this line and check if previous line is the declaration
      if (i > 0) {
        const prevLine = lines[i - 1];
        // Check if previous line is a const/let/var declaration
        if (prevLine.trim().startsWith('const ') || 
            prevLine.trim().startsWith('let ') || 
            prevLine.trim().startsWith('var ')) {
          // Comment out the declaration instead of removing
          cleanedLines[cleanedLines.length - 1] = '// ' + prevLine + ' // AUTO-COMMENTED: unused variable';
          modified = true;
        }
      }
      continue;
    }
    
    cleanedLines.push(line);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, cleanedLines.join('\n'), 'utf8');
    console.log(`Cleaned: ${filePath}`);
    return true;
  }
  
  return false;
}

// Find files with most unused variables
async function findFilesWithUnusedVars() {
  const files = await glob('apps/web/src/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**', '**/*.d.ts', '**/.next/**']
  });
  
  const filesWithIssues = [];
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const unusedCount = (content.match(/is declared but its value is never read/g) || []).length;
    if (unusedCount > 0) {
      filesWithIssues.push({ file, count: unusedCount });
    }
  }
  
  // Sort by count
  filesWithIssues.sort((a, b) => b.count - a.count);
  
  return filesWithIssues;
}

// Main execution
console.log('Finding files with unused variables...');
const filesWithIssues = await findFilesWithUnusedVars();

console.log(`\nFound ${filesWithIssues.length} files with unused variables`);
console.log('\nTop 10 files with most unused variables:');
filesWithIssues.slice(0, 10).forEach(({ file, count }) => {
  console.log(`  ${count} issues: ${file}`);
});

// Clean the worst offenders first
console.log('\nCleaning files with 5+ unused variables...');
let cleanedCount = 0;
for (const { file, count } of filesWithIssues) {
  if (count >= 5) {
    if (await cleanFile(file)) {
      cleanedCount++;
    }
  }
}

console.log(`\n✅ Cleaned ${cleanedCount} files with excessive unused variables`);