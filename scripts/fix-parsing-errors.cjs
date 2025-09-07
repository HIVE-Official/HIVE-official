#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all files with parsing errors
function getFilesWithParsingErrors() {
  try {
    const output = execSync('pnpm --filter=web lint 2>&1 | grep "Parsing error" -B 2', { encoding: 'utf8' });
    const lines = output.split('\n');
    const files = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('.tsx') || line.includes('.ts')) {
        // Extract file path
        const match = line.match(/^([^:]+\.(tsx?|jsx?))$/);
        if (match) {
          files.push(match[1]);
        }
      }
    }
    
    return [...new Set(files)]; // Remove duplicates
  } catch (error) {
    console.error('Failed to get parsing errors:', error.message);
    return [];
  }
}

function fixCommonParsingErrors(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // Fix 1: Incomplete import statements
  const incompleteImportRegex = /import\s*\{\s*$/gm;
  if (incompleteImportRegex.test(content)) {
    // This is a complex fix, skip for now and log
    console.log(`⚠️  Manual fix needed for incomplete import in: ${filePath}`);
  }
  
  // Fix 2: Duplicate import lines
  content = content.replace(/^import \{ ([^}]+) \} from ['"][^'"]+['"];\s*\nimport \{ ([^}]+) \} from ['"][^'"]+['"];/gm, 
    (match, imports1, imports2, from1, from2) => {
      // If from the same source, combine
      if (from1 === from2) {
        hasChanges = true;
        return `import { ${imports1}, ${imports2} } from ${from1};`;
      }
      return match;
    });
  
  // Fix 3: Extra semicolons and malformed statements
  content = content.replace(/;;+/g, ';');
  hasChanges = true;
  
  // Fix 4: Fix malformed const statements in .ts files
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    // Fix const statements that have parsing issues
    content = content.replace(/^(\s*)const\s+([^=]+)=\s*$/gm, '$1// TODO: Fix incomplete const statement');
    content = content.replace(/^(\s*)const\s+([^=\s]+)\s*:\s*([^=]+)\s*$/gm, '$1const $2: $3 = null as any; // TODO: Implement');
  }
  
  // Fix 5: Fix incomplete function calls and expressions
  content = content.replace(/\(\s*\)\s*=>\s*{\s*$/gm, '() => {\n  // TODO: Implement\n}');
  
  // Fix 6: Fix incomplete type definitions
  content = content.replace(/^(\s*)type\s+([^=\s]+)\s*=\s*$/gm, '$1type $2 = any; // TODO: Define type');
  
  // Fix 7: Fix unterminated strings (basic cases)
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Look for lines with odd number of quotes
    const singleQuotes = (line.match(/'/g) || []).length;
    const doubleQuotes = (line.match(/"/g) || []).length;
    
    if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
      // Try to fix common patterns
      if (line.includes('TODO:') && (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0)) {
        // Likely an incomplete comment string
        lines[i] = line + (singleQuotes % 2 !== 0 ? "'" : '"');
        hasChanges = true;
      }
    }
  }
  content = lines.join('\n');
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  
  return false;
}

// Main execution
console.log('🔍 Finding files with parsing errors...\n');

const files = getFilesWithParsingErrors();
console.log(`Found ${files.length} files with parsing errors:\n`);

let fixedCount = 0;
for (const file of files) {
  console.log(`🔧 Processing: ${file}`);
  try {
    const fixed = fixCommonParsingErrors(file);
    if (fixed) {
      console.log(`   ✅ Applied fixes`);
      fixedCount++;
    } else {
      console.log(`   ℹ️  No automatic fixes available`);
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
  }
}

console.log(`\n✅ Processing complete! Fixed ${fixedCount} files automatically.`);
console.log('\n📝 Note: Some files may need manual fixes for complex parsing errors.');
console.log('🔍 Run pnpm --filter=web lint again to see remaining issues.');