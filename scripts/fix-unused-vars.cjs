#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

console.log(`${colors.blue}=== HIVE Unused Variables Fixer ===${colors.reset}\n`);

// Configuration
const config = {
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
  autoFix: process.argv.includes('--auto-fix'),
};

if (config.dryRun) {
  console.log(`${colors.yellow}Running in DRY RUN mode - no files will be modified${colors.reset}\n`);
}

// Categories of unused variables to fix
const fixStrategies = {
  // Imports that can be safely removed
  removableImports: [
    'ErrorCodes',
    'Modal', 'Input', 'Avatar', 'Separator', 'Progress', 'RadioGroup', 'RadioGroupItem',
    'Mail', 'Calendar', 'Settings', 'Target', 'Filter', 'Building', 'MapPin', 'Sparkles',
    'GraduationCap', 'AlertCircle', 'User', 'Globe', 'X', 'Coffee', 'Activity',
    'Plus', 'Star', 'UBSpaceTemplateCard', 'Space', 'TabsContent', 'Post'
  ],
  
  // Variables that should be prefixed with underscore
  prefixWithUnderscore: [
    'hasUnsavedChanges', 'profile', 'ubIntegrations', 'user', 'updateProfile',
    'router', 'result', 'testResult', 'force'
  ],
  
  // Function parameters that should be prefixed with underscore
  unusedParams: [
    'category', 'index', 'request', 'userId', 'params', 'spaceId', 
    'includeDetails', 'feedType', 'context', 'recentActivity',
    'currentSpaceIds', 'config'
  ]
};

// Parse ESLint output to find unused variable warnings
function parseEslintOutput() {
  console.log(`${colors.blue}Gathering lint warnings...${colors.reset}`);
  
  let eslintOutput;
  try {
    // Run ESLint and capture output (it will exit with code 1 due to warnings)
    eslintOutput = execSync('pnpm lint 2>&1', { 
      encoding: 'utf8',
      cwd: path.join(__dirname, '..')
    });
  } catch (error) {
    eslintOutput = error.stdout || error.output?.join('') || '';
  }
  
  const warnings = [];
  const lines = eslintOutput.split('\n');
  
  for (const line of lines) {
    if (line.includes('@typescript-eslint/no-unused-vars')) {
      // Match pattern like: "  27:10  warning  'hasUnsavedChanges' is assigned..."
      const match = line.match(/^\s*(\d+):(\d+)\s+warning\s+'([^']+)'.+no-unused-vars/);
      if (match) {
        const [, lineNum, colNum, varName] = match;
        // Get the file path from previous lines (look for pattern like "web:lint: /path/to/file.tsx")
        let filePath = null;
        for (let i = lines.indexOf(line) - 1; i >= 0 && i > lines.indexOf(line) - 10; i--) {
          const fileLine = lines[i];
          if (fileLine.includes(':lint:') && fileLine.includes('/')) {
            filePath = fileLine.split(':lint:')[1]?.trim();
            break;
          }
        }
        
        if (filePath) {
          warnings.push({
            file: filePath,
            line: parseInt(lineNum),
            column: parseInt(colNum),
            variable: varName,
            fullLine: line
          });
        }
      }
    }
  }
  
  console.log(`Found ${colors.yellow}${warnings.length}${colors.reset} unused variable warnings\n`);
  return warnings;
}

// Fix unused imports by removing them
function fixUnusedImports(filePath, unusedVars) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let modified = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is an import line
    if (line.includes('import') && line.includes('from')) {
      for (const varName of unusedVars) {
        if (fixStrategies.removableImports.includes(varName)) {
          // Handle named imports
          const namedImportRegex = new RegExp(`\\b${varName}\\b\\s*,?\\s*`, 'g');
          if (line.match(namedImportRegex)) {
            let newLine = line.replace(namedImportRegex, '');
            
            // Clean up empty imports
            newLine = newLine.replace(/import\s*{\s*}\s*from\s*['"][^'"]+['"];?/, '');
            newLine = newLine.replace(/,\s*,/g, ','); // Remove double commas
            newLine = newLine.replace(/{\s*,/g, '{'); // Remove leading comma
            newLine = newLine.replace(/,\s*}/g, '}'); // Remove trailing comma
            
            if (newLine.trim() !== line.trim()) {
              lines[i] = newLine;
              modified = true;
              console.log(`  ${colors.green}✓${colors.reset} Removed import: ${varName}`);
            }
          }
        }
      }
    }
  }
  
  if (modified && !config.dryRun) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  }
  
  return modified;
}

// Fix unused variables by prefixing with underscore
function fixUnusedVariables(filePath, unusedVars) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  for (const varName of unusedVars) {
    if (fixStrategies.prefixWithUnderscore.includes(varName) || 
        fixStrategies.unusedParams.includes(varName)) {
      // Create regex patterns for different contexts
      const patterns = [
        // Destructuring assignment: const { varName } = 
        new RegExp(`(const|let|var)\\s*{([^}]*\\b)(${varName})(\\b[^}]*)}`, 'g'),
        // Regular assignment: const varName = 
        new RegExp(`(const|let|var)\\s+(${varName})\\s*=`, 'g'),
        // Function parameters: function(varName) or (varName) =>
        new RegExp(`\\((.*?\\b)(${varName})(\\b.*?)\\)`, 'g'),
        // Object destructuring in parameters: ({ varName })
        new RegExp(`\\({([^}]*\\b)(${varName})(\\b[^}]*)}\\)`, 'g'),
      ];
      
      for (const pattern of patterns) {
        const matches = content.match(pattern);
        if (matches) {
          content = content.replace(pattern, (match, ...groups) => {
            // Replace varName with _varName
            const updatedMatch = match.replace(
              new RegExp(`\\b${varName}\\b`),
              `_${varName}`
            );
            modified = true;
            console.log(`  ${colors.green}✓${colors.reset} Prefixed with underscore: ${varName} → _${varName}`);
            return updatedMatch;
          });
          break; // Only apply one pattern per variable
        }
      }
    }
  }
  
  if (modified && !config.dryRun) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  
  return modified;
}

// Main execution
async function main() {
  const warnings = parseEslintOutput();
  
  // Group warnings by file
  const warningsByFile = {};
  for (const warning of warnings) {
    const file = warning.file;
    if (!warningsByFile[file]) {
      warningsByFile[file] = [];
    }
    warningsByFile[file].push(warning.variable);
  }
  
  console.log(`Processing ${colors.blue}${Object.keys(warningsByFile).length}${colors.reset} files...\n`);
  
  let totalFixed = 0;
  
  for (const [file, variables] of Object.entries(warningsByFile)) {
    // Skip non-existent files or those outside our project
    if (!file.includes('/hive_ui/') || !fs.existsSync(file)) {
      continue;
    }
    
    console.log(`\nProcessing: ${colors.blue}${path.basename(file)}${colors.reset}`);
    
    // First, try to remove unused imports
    const importsFixed = fixUnusedImports(file, variables);
    
    // Then, prefix remaining unused variables with underscore
    const varsFixed = fixUnusedVariables(file, variables);
    
    if (importsFixed || varsFixed) {
      totalFixed++;
    }
  }
  
  console.log(`\n${colors.green}Summary:${colors.reset}`);
  console.log(`  Files processed: ${Object.keys(warningsByFile).length}`);
  console.log(`  Files modified: ${totalFixed}`);
  
  if (config.dryRun) {
    console.log(`\n${colors.yellow}This was a DRY RUN - no files were actually modified${colors.reset}`);
    console.log(`Run with --auto-fix to apply changes`);
  } else if (totalFixed > 0) {
    console.log(`\n${colors.green}✓ Fixed ${totalFixed} files${colors.reset}`);
    console.log(`Run 'pnpm lint' to verify the fixes`);
  }
}

// Run the script
main().catch(error => {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
});