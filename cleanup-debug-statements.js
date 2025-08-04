#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

/**
 * Debug Statement Cleanup Script
 * Removes console.log, console.error, debugger statements for production
 */

const DEBUG_PATTERNS = [
  /console\.log\s*\([^)]*\);?/g,
  /console\.error\s*\([^)]*\);?/g,
  /console\.warn\s*\([^)]*\);?/g,
  /console\.debug\s*\([^)]*\);?/g,
  /console\.info\s*\([^)]*\);?/g,
  /debugger;?/g,
];

const EXCLUDE_PATTERNS = [
  'node_modules',
  '.next',
  'dist',
  '.git',
  'coverage'
];

const INCLUDE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

function shouldProcessFile(filePath) {
  // Check if file has valid extension
  const ext = path.extname(filePath);
  if (!INCLUDE_EXTENSIONS.includes(ext)) return false;
  
  // Check if file is in excluded directory
  for (const exclude of EXCLUDE_PATTERNS) {
    if (filePath.includes(exclude)) return false;
  }
  
  return true;
}

function cleanupDebugStatements(content) {
  let cleaned = content;
  let totalRemovals = 0;
  
  for (const pattern of DEBUG_PATTERNS) {
    const matches = cleaned.match(pattern);
    if (matches) {
      totalRemovals += matches.length;
      cleaned = cleaned.replace(pattern, '');
    }
  }
  
  // Clean up empty lines and extra whitespace
  cleaned = cleaned.replace(/^\s*[\r\n]/gm, '');
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return { cleaned, removals: totalRemovals };
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { cleaned, removals } = cleanupDebugStatements(content);
    
    if (removals > 0) {
      fs.writeFileSync(filePath, cleaned, 'utf8');
      console.log(`✅ ${filePath}: Removed ${removals} debug statements`);
      return removals;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

async function main() {
  console.log('🧹 Starting debug statement cleanup...\n');
  
  const searchPaths = [
    'apps/web/src/**/*.ts',
    'apps/web/src/**/*.tsx',
    'apps/web/src/**/*.js',
    'apps/web/src/**/*.jsx',
    'apps/admin/src/**/*.ts',
    'apps/admin/src/**/*.tsx',
    'apps/admin/src/**/*.js',
    'apps/admin/src/**/*.jsx',
    'packages/*/src/**/*.ts',
    'packages/*/src/**/*.tsx',
    'packages/*/src/**/*.js',
    'packages/*/src/**/*.jsx'
  ];
  
  let totalFiles = 0;
  let totalRemovals = 0;
  
  for (const searchPath of searchPaths) {
    console.log(`🔍 Searching: ${searchPath}`);
    const files = await glob(searchPath);
    console.log(`📂 Found ${files.length} files`);
    
    for (const filePath of files) {
      if (shouldProcessFile(filePath)) {
        const removals = processFile(filePath);
        if (removals > 0) {
          totalFiles++;
          totalRemovals += removals;
        }
      }
    }
  }
  
  console.log(`\n🎉 Cleanup complete!`);
  console.log(`📁 Files processed: ${totalFiles}`);
  console.log(`🗑️  Debug statements removed: ${totalRemovals}`);
  
  if (totalRemovals > 0) {
    console.log('\n⚠️  Remember to test your application after removing debug statements!');
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { cleanupDebugStatements, processFile };