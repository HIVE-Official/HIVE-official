#!/usr/bin/env node

/**
 * Console Statement Removal Script
 * Safely removes console.* statements from TypeScript/JavaScript files
 * Preserves console statements in test files and specific exceptions
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  // Patterns to search for files
  filePatterns: [
    'apps/**/*.{ts,tsx,js,jsx}',
    'packages/**/*.{ts,tsx,js,jsx}'
  ],
  
  // Directories to exclude
  excludeDirs: [
    'node_modules',
    'dist',
    '.next',
    'coverage',
    'build'
  ],
  
  // File patterns to preserve console statements
  preservePatterns: [
    '*.test.ts',
    '*.test.tsx',
    '*.spec.ts',
    '*.spec.tsx',
    '*.stories.tsx',
    'scripts/**/*',
    '**/debug/**/*'
  ],
  
  // Specific console methods to remove
  consoleMethods: [
    'log',
    'error',
    'warn',
    'info',
    'debug',
    'trace',
    'group',
    'groupEnd',
    'time',
    'timeEnd',
    'assert',
    'table'
  ],
  
  // Backup directory
  backupDir: '.refactoring-backup',
  
  // Dry run mode (doesn't modify files)
  dryRun: process.argv.includes('--dry-run'),
  
  // Verbose output
  verbose: process.argv.includes('--verbose'),
  
  // Statistics tracking
  stats: {
    filesProcessed: 0,
    filesModified: 0,
    statementsRemoved: 0,
    errors: []
  }
};

/**
 * Create backup of a file before modification
 */
function backupFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  const backupPath = path.join(config.backupDir, relativePath);
  const backupDir = path.dirname(backupPath);
  
  // Create backup directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // Copy file to backup location
  fs.copyFileSync(filePath, backupPath);
  
  if (config.verbose) {
    console.log(`  Backed up: ${relativePath}`);
  }
}

/**
 * Check if file should be preserved (not modified)
 */
function shouldPreserveFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  
  return config.preservePatterns.some(pattern => {
    if (pattern.includes('*')) {
      // Convert glob pattern to regex
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(relativePath);
    }
    return relativePath.includes(pattern);
  });
}

/**
 * Remove console statements from file content
 */
function removeConsoleStatements(content, filePath) {
  let modifiedContent = content;
  let removalCount = 0;
  
  // Pattern 1: Simple console.method() statements on single line
  const simplePattern = new RegExp(
    `^\\s*console\\.(${config.consoleMethods.join('|')})\\([^;]*\\);?\\s*$`,
    'gm'
  );
  
  // Pattern 2: Multi-line console statements
  const multilinePattern = new RegExp(
    `console\\.(${config.consoleMethods.join('|')})\\([^)]*\\)[;,]?`,
    'gs'
  );
  
  // Pattern 3: Console statements in conditionals
  const conditionalPattern = new RegExp(
    `(if\\s*\\([^)]*\\)\\s*)console\\.(${config.consoleMethods.join('|')})\\([^;]*\\);?`,
    'g'
  );
  
  // Count removals for statistics
  const matches = modifiedContent.match(simplePattern) || [];
  removalCount += matches.length;
  
  // Remove simple console statements
  modifiedContent = modifiedContent.replace(simplePattern, '');
  
  // Remove console statements in conditionals but preserve the condition
  modifiedContent = modifiedContent.replace(conditionalPattern, '$1{}');
  
  // Handle console statements that might be assigned to variables
  modifiedContent = modifiedContent.replace(
    /const\s+\w+\s*=\s*console\.(log|error|warn|info|debug)\s*;?/g,
    ''
  );
  
  // Remove empty lines left after removal
  modifiedContent = modifiedContent.replace(/^\s*[\r\n]/gm, '');
  
  // Special handling for console statements in JSX
  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    modifiedContent = modifiedContent.replace(
      /\{console\.(${config.consoleMethods.join('|')})\([^}]*\)\}/g,
      '{/* console statement removed */}'
    );
  }
  
  return { modifiedContent, removalCount };
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    // Check if file should be preserved
    if (shouldPreserveFile(filePath)) {
      if (config.verbose) {
        console.log(`  Skipping (preserved): ${filePath}`);
      }
      return;
    }
    
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remove console statements
    const { modifiedContent, removalCount } = removeConsoleStatements(content, filePath);
    
    // Check if file was modified
    if (content !== modifiedContent) {
      config.stats.filesModified++;
      config.stats.statementsRemoved += removalCount;
      
      if (!config.dryRun) {
        // Backup original file
        backupFile(filePath);
        
        // Write modified content
        fs.writeFileSync(filePath, modifiedContent, 'utf8');
      }
      
      console.log(`✓ Modified: ${path.relative(process.cwd(), filePath)} (removed ${removalCount} statements)`);
    } else if (config.verbose) {
      console.log(`  No changes: ${path.relative(process.cwd(), filePath)}`);
    }
    
    config.stats.filesProcessed++;
    
  } catch (error) {
    config.stats.errors.push({ file: filePath, error: error.message });
    console.error(`✗ Error processing ${filePath}: ${error.message}`);
  }
}

/**
 * Main execution function
 */
function main() {
  console.log('🧹 Console Statement Removal Script');
  console.log('====================================');
  
  if (config.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }
  
  // Find all files matching patterns
  const files = [];
  config.filePatterns.forEach(pattern => {
    const matchedFiles = glob.sync(pattern, {
      ignore: config.excludeDirs.map(dir => `**/${dir}/**`)
    });
    files.push(...matchedFiles);
  });
  
  console.log(`Found ${files.length} files to process\n`);
  
  // Process each file
  files.forEach(file => processFile(file));
  
  // Print statistics
  console.log('\n📊 Statistics');
  console.log('=============');
  console.log(`Files processed: ${config.stats.filesProcessed}`);
  console.log(`Files modified: ${config.stats.filesModified}`);
  console.log(`Console statements removed: ${config.stats.statementsRemoved}`);
  
  if (config.stats.errors.length > 0) {
    console.log(`\n⚠️  Errors: ${config.stats.errors.length}`);
    config.stats.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
  
  if (!config.dryRun && config.stats.filesModified > 0) {
    console.log(`\n✅ Backup created in: ${config.backupDir}`);
    console.log('   Run "npm run refactor:restore" to restore original files');
  }
  
  // Create restore script if files were modified
  if (!config.dryRun && config.stats.filesModified > 0) {
    createRestoreScript();
  }
}

/**
 * Create a restore script to revert changes
 */
function createRestoreScript() {
  const restoreScript = `#!/usr/bin/env node
// Auto-generated restore script
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const backupDir = '${config.backupDir}';
const files = glob.sync(backupDir + '/**/*', { nodir: true });

console.log('Restoring ' + files.length + ' files from backup...');

files.forEach(backupFile => {
  const relativePath = path.relative(backupDir, backupFile);
  const originalPath = path.join(process.cwd(), relativePath);
  
  fs.copyFileSync(backupFile, originalPath);
  console.log('Restored: ' + relativePath);
});

console.log('✅ Restore complete');
`;
  
  fs.writeFileSync('restore-console-statements.js', restoreScript, 'utf8');
  fs.chmodSync('restore-console-statements.js', '755');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { removeConsoleStatements, shouldPreserveFile };