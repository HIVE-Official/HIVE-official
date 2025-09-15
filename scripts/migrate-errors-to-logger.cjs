#!/usr/bin/env node

/**
 * Console.error to Logger Migration Script
 * Intelligently replaces console.error with proper logger calls
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Statistics tracking
let stats = {
  filesProcessed: 0,
  errorsReplaced: 0,
  filesModified: 0,
  filesSkipped: 0,
  importAdded: 0
};

// Pattern to match console.error statements
const CONSOLE_ERROR_PATTERNS = [
  // Simple console.error
  /console\.error\(([^)]+)\)/g,
  // Multi-line console.error
  /console\.error\(([^)]*\n[^)]*)\)/g,
];

// Check if file already imports logger
function hasLoggerImport(content) {
  return content.includes("from '@hive/core/utils/logger'") ||
         content.includes('from "@hive/core/utils/logger"') ||
         content.includes("from '../utils/logger'") ||
         content.includes("from './logger'") ||
         content.includes("{ logger }");
}

// Add logger import to file
function addLoggerImport(content, filePath) {
  // Determine the correct import path based on file location
  let importPath = '@hive/core/utils/logger';
  
  if (filePath.includes('packages/core/src')) {
    // Within core package, use relative import
    const depth = filePath.split('packages/core/src')[1].split('/').length - 2;
    importPath = depth > 0 ? '../'.repeat(depth) + 'utils/logger' : './utils/logger';
  }
  
  const importStatement = `import { logger } from '${importPath}';\n`;
  
  // Find where to insert the import (after other imports)
  const importMatch = content.match(/^import[^;]+;$/m);
  if (importMatch) {
    const lastImportIndex = content.lastIndexOf(importMatch[0]) + importMatch[0].length;
    return content.slice(0, lastImportIndex) + '\n' + importStatement + content.slice(lastImportIndex);
  }
  
  // If no imports, add at the beginning
  return importStatement + '\n' + content;
}

// Transform console.error to logger.error
function transformConsoleError(content) {
  let transformed = content;
  let replacements = 0;
  
  // Pattern 1: console.error('message', error)
  transformed = transformed.replace(
    /console\.error\(\s*['"`]([^'"`]+)['"`]\s*,\s*([^)]+)\s*\)/g,
    (match, message, errorVar) => {
      replacements++;
      return `logger.error('${message}', ${errorVar.trim()})`;
    }
  );
  
  // Pattern 2: console.error(error)
  transformed = transformed.replace(
    /console\.error\(\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\)/g,
    (match, errorVar) => {
      replacements++;
      return `logger.error('An error occurred', ${errorVar})`;
    }
  );
  
  // Pattern 3: console.error('message')
  transformed = transformed.replace(
    /console\.error\(\s*['"`]([^'"`]+)['"`]\s*\)/g,
    (match, message) => {
      replacements++;
      return `logger.error('${message}')`;
    }
  );
  
  // Pattern 4: console.error with template literals
  transformed = transformed.replace(
    /console\.error\(\s*`([^`]+)`\s*\)/g,
    (match, message) => {
      replacements++;
      // Try to extract variable references
      if (message.includes('${')) {
        return `logger.error(\`${message}\`)`;
      }
      return `logger.error('${message}')`;
    }
  );
  
  // Pattern 5: console.error with multiple arguments
  transformed = transformed.replace(
    /console\.error\(\s*['"`]([^'"`]+)['"`]\s*,\s*([^,)]+)\s*,\s*([^)]+)\s*\)/g,
    (match, message, arg1, arg2) => {
      replacements++;
      return `logger.error('${message}', ${arg1.trim()}, { metadata: ${arg2.trim()} })`;
    }
  );
  
  return { transformed, replacements };
}

function processFile(filePath) {
  // Skip test files and scripts
  if (filePath.includes('.test.') || 
      filePath.includes('.spec.') || 
      filePath.includes('/test/') ||
      filePath.includes('/scripts/')) {
    stats.filesSkipped++;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  let changesMade = false;
  
  // Check if file has console.error
  if (!content.includes('console.error')) {
    stats.filesProcessed++;
    return;
  }
  
  // Transform console.error to logger.error
  const { transformed, replacements } = transformConsoleError(modified);
  
  if (replacements > 0) {
    modified = transformed;
    stats.errorsReplaced += replacements;
    changesMade = true;
    
    // Add logger import if needed
    if (!hasLoggerImport(modified)) {
      modified = addLoggerImport(modified, filePath);
      stats.importAdded++;
    }
  }
  
  if (changesMade) {
    fs.writeFileSync(filePath, modified, 'utf8');
    stats.filesModified++;
    console.log(`✓ Migrated ${replacements} errors in ${filePath}`);
  }
  
  stats.filesProcessed++;
}

function migrateDirectory(directory) {
  console.log(`\n🔄 Migrating console.error in ${directory}...\n`);
  
  // Find all TypeScript and JavaScript files
  const files = glob.sync(`${directory}/**/*.{ts,tsx,js,jsx}`, {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/coverage/**',
      '**/scripts/**'
    ]
  });
  
  console.log(`Found ${files.length} files to process\n`);
  
  files.forEach(file => {
    processFile(file);
  });
}

// Main execution
function main() {
  console.log('════════════════════════════════════════════');
  console.log('     Console.error to Logger Migration');
  console.log('════════════════════════════════════════════');
  
  // Process main source directories
  const directories = [
    'apps/web/src',
    'apps/admin/src',
    'packages/ui/src',
    'packages/core/src',
    'packages/hooks/src',
    'packages/api-client/src',
    'packages/auth-logic/src'
  ];
  
  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      migrateDirectory(dir);
    }
  });
  
  // Print summary
  console.log('\n════════════════════════════════════════════');
  console.log('                 SUMMARY');
  console.log('════════════════════════════════════════════');
  console.log(`✓ Files processed: ${stats.filesProcessed}`);
  console.log(`✓ Files modified: ${stats.filesModified}`);
  console.log(`✓ Files skipped: ${stats.filesSkipped}`);
  console.log(`✓ console.error replaced: ${stats.errorsReplaced}`);
  console.log(`✓ Logger imports added: ${stats.importAdded}`);
  console.log('════════════════════════════════════════════\n');
  
  if (stats.errorsReplaced > 0) {
    console.log('✅ Successfully migrated console.error statements to logger!');
    console.log('📝 Note: Review the changes to ensure proper error handling.');
    console.log('   Some complex error patterns may need manual adjustment.\n');
  } else {
    console.log('ℹ️ No console.error statements found to migrate.\n');
  }
}

// Run the migration
main();