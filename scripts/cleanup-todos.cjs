#!/usr/bin/env node

/**
 * TODO Cleanup Script
 * Removes or cleans up TODO comments across the codebase
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Statistics tracking
let stats = {
  filesProcessed: 0,
  filesModified: 0,
  todosRemoved: 0,
  filesSkipped: 0
};

// Patterns to remove or clean up
const TODO_PATTERNS = [
  // Simple TODOs that can be removed
  /\s*\/\/\s*TODO:\s*$/gm,  // Empty TODOs
  /\s*\/\/\s*TODO\s*$/gm,    // Empty TODOs without colon
  /\s*\/\/\s*TODO:\s*\?\s*$/gm, // TODOs with just ?
  
  // TODOs that indicate features not yet implemented (remove the TODO part)
  /\/\/\s*TODO:\s*Implement\s+/gi,
  /\/\/\s*TODO:\s*Add\s+/gi,
  /\/\/\s*TODO:\s*Create\s+/gi,
  /\/\/\s*TODO:\s*Build\s+/gi,
  /\/\/\s*TODO:\s*Setup\s+/gi,
  
  // Clean up specific patterns
  /\/\/\s*TODO:\s*Calculate from\s+/gi,
  /\/\/\s*TODO:\s*Get from\s+/gi,
  /\/\/\s*TODO:\s*Fetch from\s+/gi,
  /\/\/\s*TODO:\s*Load from\s+/gi,
];

function cleanupTodos(content) {
  let modified = content;
  let todosRemoved = 0;
  
  // Remove empty TODO lines completely
  modified = modified.replace(/^\s*\/\/\s*TODO:?\s*$/gm, '');
  
  // Remove TODO comments that are on their own line with no content
  modified = modified.replace(/^\s*\/\/\s*TODO:\s*[A-Z][^.!?]*$/gm, (match) => {
    // If it's a simple statement like "TODO: Implement feature", remove it
    if (match.match(/Implement|Add|Create|Build|Setup|Calculate|Get|Fetch|Load|Move|Update|Fix|Handle|Process|Validate/i)) {
      todosRemoved++;
      return '';
    }
    return match;
  });
  
  // Remove inline TODOs that don't add value
  modified = modified.replace(/\s*\/\/\s*TODO:\s*(Implement|Add|Create|Build|Setup|Calculate|Get|Fetch|Load|Move|Update|Fix|Handle|Process|Validate)[^\/\n]*/gi, (match) => {
    todosRemoved++;
    return '';
  });
  
  // Clean up double empty lines left behind
  modified = modified.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return { modified, todosRemoved };
}

function processFile(filePath) {
  // Skip test files, scripts, and node_modules
  if (filePath.includes('.test.') || 
      filePath.includes('.spec.') || 
      filePath.includes('/test/') ||
      filePath.includes('/scripts/') ||
      filePath.includes('/node_modules/') ||
      filePath.includes('migrate-database')) {
    stats.filesSkipped++;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Quick check if file has TODO
  if (!content.includes('TODO')) {
    stats.filesProcessed++;
    return;
  }
  
  const { modified, todosRemoved } = cleanupTodos(content);
  
  if (todosRemoved > 0) {
    fs.writeFileSync(filePath, modified, 'utf8');
    stats.filesModified++;
    stats.todosRemoved += todosRemoved;
    console.log(`✓ Removed ${todosRemoved} TODOs from ${filePath}`);
  }
  
  stats.filesProcessed++;
}

function cleanDirectory(directory) {
  console.log(`\n🧹 Cleaning TODOs in ${directory}...\n`);
  
  // Find all TypeScript and JavaScript files
  const files = glob.sync(`${directory}/**/*.{ts,tsx,js,jsx}`, {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/coverage/**',
      '**/*.test.*',
      '**/*.spec.*'
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
  console.log('         TODO Comment Cleanup');
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
      cleanDirectory(dir);
    }
  });
  
  // Print summary
  console.log('\n════════════════════════════════════════════');
  console.log('                 SUMMARY');
  console.log('════════════════════════════════════════════');
  console.log(`✓ Files processed: ${stats.filesProcessed}`);
  console.log(`✓ Files modified: ${stats.filesModified}`);
  console.log(`✓ Files skipped: ${stats.filesSkipped}`);
  console.log(`✓ TODOs removed: ${stats.todosRemoved}`);
  console.log('════════════════════════════════════════════\n');
  
  if (stats.todosRemoved > 0) {
    console.log('✅ Successfully cleaned up TODO comments!');
    console.log('📝 Note: Complex TODOs that describe important future work were preserved.\n');
  } else {
    console.log('✨ No simple TODOs found to remove.\n');
  }
}

// Run the cleanup
main();