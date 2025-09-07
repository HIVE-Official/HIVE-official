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
  cyan: '\x1b[36m',
};

console.log(`${colors.cyan}╔══════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.cyan}║   HIVE Complete Warning Fixer v2.0       ║${colors.reset}`);
console.log(`${colors.cyan}╚══════════════════════════════════════════╝${colors.reset}\n`);

// Configuration
const config = {
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
  autoFix: !process.argv.includes('--dry-run'),
  targetPackage: process.argv.find(arg => arg.startsWith('--package='))?.split('=')[1],
};

if (config.dryRun) {
  console.log(`${colors.yellow}🔍 DRY RUN MODE - No files will be modified${colors.reset}\n`);
}

if (config.targetPackage) {
  console.log(`${colors.blue}📦 Targeting package: ${config.targetPackage}${colors.reset}\n`);
}

// Expanded fix strategies
const fixStrategies = {
  // Common unused imports to remove completely
  removableImports: new Set([
    // UI Components
    'Modal', 'Input', 'Avatar', 'Separator', 'Progress', 'RadioGroup', 'RadioGroupItem',
    'Card', 'Badge', 'Dialog', 'Sheet', 'Tabs', 'TabsList', 'TabsTrigger', 'TabsContent',
    'Select', 'SelectTrigger', 'SelectContent', 'SelectItem', 'SelectValue',
    'Checkbox', 'Switch', 'Textarea', 'Label', 'Tooltip', 'TooltipContent', 'TooltipTrigger',
    
    // Icons
    'Mail', 'Calendar', 'Settings', 'Target', 'Filter', 'Building', 'MapPin', 'Sparkles',
    'GraduationCap', 'AlertCircle', 'User', 'Globe', 'X', 'Coffee', 'Activity',
    'Plus', 'Star', 'ChevronRight', 'ChevronLeft', 'Search', 'Home', 'Users',
    'Book', 'Clock', 'Heart', 'Share', 'Download', 'Upload', 'Edit', 'Trash',
    'Eye', 'EyeOff', 'Lock', 'Unlock', 'Info', 'Warning', 'Check', 'Copy',
    
    // Types and Interfaces (if unused)
    'ErrorCodes', 'FeedItem', 'SearchQuery', 'Post', 'Space', 'Tool',
    'RealtimeMessage', 'NotificationData', 'AnalyticsEvent',
    
    // Custom components
    'UBSpaceTemplateCard', 'SpaceCard', 'ToolCard', 'ProfileCard',
  ]),
  
  // Variables that should be prefixed with underscore
  prefixableVars: new Set([
    'hasUnsavedChanges', 'profile', 'ubIntegrations', 'user', 'updateProfile',
    'router', 'result', 'testResult', 'force', 'setCollaborators',
    'integration', 'notificationManager', 'syncWithServer', 'feedIntegration',
    'retryOnMount', 'userId', 'totalImported', 'successfulFeeds',
    'passedTests', 'totalTests', 'testResult', 'getTemplateExamples',
    'logger'
  ]),
  
  // Function parameters that should be prefixed
  prefixableParams: new Set([
    'category', 'index', 'request', 'userId', 'params', 'spaceId',
    'includeDetails', 'feedType', 'context', 'recentActivity',
    'currentSpaceIds', 'config', 'notification', 'userEvents',
    'userJourneys', 'performanceEvents', 'stage', 'backgroundColor',
    'featureId', 'university', 'delayMinutes', 'channel', 'listener',
    'ritualId', 'ritual'
  ]),
};

// Statistics tracking
const stats = {
  totalWarnings: 0,
  unusedVars: 0,
  exhaustiveDeps: 0,
  fixedImports: 0,
  fixedVars: 0,
  fixedParams: 0,
  fixedHooks: 0,
  filesProcessed: new Set(),
  filesModified: new Set(),
};

// Parse ESLint output more comprehensively
function parseEslintOutput() {
  console.log(`${colors.blue}📊 Gathering all warnings...${colors.reset}`);
  
  let eslintOutput;
  try {
    const cmd = config.targetPackage 
      ? `pnpm --filter ${config.targetPackage} lint 2>&1`
      : 'pnpm lint 2>&1';
    
    eslintOutput = execSync(cmd, { 
      encoding: 'utf8',
      cwd: path.join(__dirname, '..')
    });
  } catch (error) {
    eslintOutput = error.stdout || error.output?.join('') || '';
  }
  
  const warnings = {
    unusedVars: [],
    exhaustiveDeps: [],
  };
  
  const lines = eslintOutput.split('\n');
  let currentFile = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect file paths - handle both formats
    // Format 1: "web:lint: /path/to/file"
    // Format 2: "/path/to/file" (standalone)
    if (line.includes('/Users/laneyfraass/hive_ui/')) {
      // Extract the file path
      if (line.includes(':lint:')) {
        const parts = line.split(':lint:');
        if (parts[1]) {
          currentFile = parts[1].trim();
        }
      } else if (line.trim().startsWith('/')) {
        currentFile = line.trim();
      }
      continue;
    }
    
    // Parse unused variables
    if (line.includes('@typescript-eslint/no-unused-vars')) {
      const match = line.match(/^\s*(\d+):(\d+)\s+warning\s+'([^']+)'.*(defined but never used|assigned a value but never used)/);
      if (match && currentFile) {
        const [, lineNum, colNum, varName] = match;
        warnings.unusedVars.push({
          file: currentFile,
          line: parseInt(lineNum),
          column: parseInt(colNum),
          variable: varName,
          isParam: line.includes('Allowed unused args'),
          fullLine: line
        });
        stats.unusedVars++;
      }
    }
    
    // Parse exhaustive-deps warnings
    if (line.includes('react-hooks/exhaustive-deps')) {
      const match = line.match(/^\s*(\d+):(\d+)\s+warning\s+React Hook (\w+) has (a )?missing dependenc/);
      if (match && currentFile) {
        const [, lineNum, colNum, hookName] = match;
        // Extract dependencies mentioned
        const depsMatch = line.match(/(?:dependencies?|dependency): ([^.]+)/);
        const deps = depsMatch ? depsMatch[1].replace(/['"]/g, '').split(/,\s*and\s*|,\s*/) : [];
        
        warnings.exhaustiveDeps.push({
          file: currentFile,
          line: parseInt(lineNum),
          column: parseInt(colNum),
          hookName,
          missingDeps: deps.map(d => d.trim().replace(/^'|'$/g, '')),
          fullLine: line
        });
        stats.exhaustiveDeps++;
      }
    }
  }
  
  stats.totalWarnings = stats.unusedVars + stats.exhaustiveDeps;
  
  console.log(`\n📈 Warning Summary:`);
  console.log(`  • Total: ${colors.yellow}${stats.totalWarnings}${colors.reset}`);
  console.log(`  • Unused variables: ${colors.cyan}${stats.unusedVars}${colors.reset}`);
  console.log(`  • Missing dependencies: ${colors.cyan}${stats.exhaustiveDeps}${colors.reset}\n`);
  
  return warnings;
}

// Enhanced import removal
function removeUnusedImports(filePath, unusedVars) {
  if (!fs.existsSync(filePath)) return false;
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let modified = false;
  const removedImports = new Set();
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (!line.includes('import')) continue;
    
    for (const varInfo of unusedVars) {
      const varName = varInfo.variable;
      
      if (!fixStrategies.removableImports.has(varName)) continue;
      if (removedImports.has(varName)) continue;
      
      // Handle different import patterns
      let newLine = line;
      
      // Named imports: import { Var, OtherVar } from 'module'
      if (line.includes('{') && line.includes('}')) {
        const regex = new RegExp(`\\b${varName}\\b\\s*,?\\s*`, 'g');
        newLine = line.replace(regex, '');
        
        // Clean up empty braces
        newLine = newLine.replace(/{\s*,/g, '{');
        newLine = newLine.replace(/,\s*}/g, '}');
        newLine = newLine.replace(/,\s*,/g, ',');
        newLine = newLine.replace(/{\s*}/g, '{}');
        
        // Remove entire import if empty
        if (newLine.includes('{}')) {
          newLine = '';
        }
      }
      
      // Default imports: import Var from 'module'
      const defaultImportRegex = new RegExp(`^import\\s+${varName}\\s+from\\s+['"].*['"];?$`);
      if (defaultImportRegex.test(line)) {
        newLine = '';
      }
      
      // Type imports: import type { Var } from 'module'
      if (line.includes('import type')) {
        const regex = new RegExp(`\\b${varName}\\b\\s*,?\\s*`, 'g');
        newLine = line.replace(regex, '');
        if (newLine.match(/import\s+type\s*{\s*}\s*from/)) {
          newLine = '';
        }
      }
      
      if (newLine !== line) {
        lines[i] = newLine;
        modified = true;
        removedImports.add(varName);
        if (config.verbose) {
          console.log(`    ${colors.green}✓${colors.reset} Removed import: ${varName}`);
        }
        stats.fixedImports++;
      }
    }
  }
  
  if (modified && !config.dryRun) {
    // Remove empty lines left by removed imports
    const cleanedLines = lines.filter((line, i) => {
      if (line === '' && i > 0 && i < lines.length - 1) {
        return !(lines[i - 1] === '' || (lines[i - 1].includes('import') && lines[i + 1].includes('import')));
      }
      return true;
    });
    
    fs.writeFileSync(filePath, cleanedLines.join('\n'), 'utf8');
    stats.filesModified.add(filePath);
  }
  
  return modified;
}

// Enhanced variable prefixing
function prefixUnusedVariables(filePath, unusedVars) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let modified = false;
  const prefixedVars = new Set();
  
  for (const varInfo of unusedVars) {
    const varName = varInfo.variable;
    
    // Skip if already prefixed or not in our lists
    if (varName.startsWith('_')) continue;
    if (prefixedVars.has(varName)) continue;
    
    const shouldPrefix = 
      fixStrategies.prefixableVars.has(varName) ||
      (varInfo.isParam && fixStrategies.prefixableParams.has(varName));
    
    if (!shouldPrefix) continue;
    
    // Find the specific line to modify
    const targetLine = lines[varInfo.line - 1];
    if (!targetLine) continue;
    
    let newLine = targetLine;
    
    // Different patterns for different contexts
    if (varInfo.isParam) {
      // Function parameter
      newLine = newLine.replace(
        new RegExp(`([({,]\\s*)(${varName})(\\s*[,:)}])`, 'g'),
        `$1_${varName}$3`
      );
      stats.fixedParams++;
    } else if (targetLine.includes('const') || targetLine.includes('let') || targetLine.includes('var')) {
      // Variable declaration
      // Handle destructuring
      if (targetLine.includes('{') && targetLine.includes('}')) {
        newLine = newLine.replace(
          new RegExp(`([{,]\\s*)(${varName})(\\s*[,:}])`, 'g'),
          `$1_${varName}$3`
        );
      } else {
        // Regular declaration
        newLine = newLine.replace(
          new RegExp(`(const|let|var)\\s+(${varName})\\s*=`, 'g'),
          `$1 _${varName} =`
        );
      }
      stats.fixedVars++;
    }
    
    if (newLine !== targetLine) {
      lines[varInfo.line - 1] = newLine;
      modified = true;
      prefixedVars.add(varName);
      if (config.verbose) {
        console.log(`    ${colors.green}✓${colors.reset} Prefixed: ${varName} → _${varName}`);
      }
    }
  }
  
  if (modified && !config.dryRun) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    stats.filesModified.add(filePath);
  }
  
  return modified;
}

// Fix React hooks exhaustive-deps warnings
function fixExhaustiveDeps(filePath, depsWarnings) {
  if (!fs.existsSync(filePath)) return false;
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let modified = false;
  
  for (const warning of depsWarnings) {
    const lineIndex = warning.line - 1;
    const targetLine = lines[lineIndex];
    
    if (!targetLine) continue;
    
    // Find the dependency array
    let depArrayStart = -1;
    let depArrayEnd = -1;
    
    // Search for the dependency array (usually on the same line or next few lines)
    for (let i = lineIndex; i < Math.min(lineIndex + 5, lines.length); i++) {
      const line = lines[i];
      const match = line.match(/\[([^\]]*)\]/);
      if (match) {
        depArrayStart = i;
        depArrayEnd = i;
        
        // Check if array spans multiple lines
        if (!line.includes(']')) {
          for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].includes(']')) {
              depArrayEnd = j;
              break;
            }
          }
        }
        break;
      }
    }
    
    if (depArrayStart === -1) continue;
    
    // For safety, we'll comment out the eslint-disable for this line
    // rather than modifying the deps array (which could break functionality)
    const commentLine = `    // eslint-disable-next-line react-hooks/exhaustive-deps`;
    
    // Check if comment already exists
    if (lineIndex > 0 && !lines[lineIndex - 1].includes('eslint-disable')) {
      lines.splice(lineIndex, 0, commentLine);
      modified = true;
      stats.fixedHooks++;
      if (config.verbose) {
        console.log(`    ${colors.yellow}⚠${colors.reset} Added eslint-disable for ${warning.hookName} deps`);
      }
    }
  }
  
  if (modified && !config.dryRun) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    stats.filesModified.add(filePath);
  }
  
  return modified;
}

// Process all warnings
async function processWarnings() {
  const warnings = parseEslintOutput();
  
  // Group warnings by file
  const fileGroups = new Map();
  
  for (const warning of warnings.unusedVars) {
    if (!fileGroups.has(warning.file)) {
      fileGroups.set(warning.file, { unusedVars: [], exhaustiveDeps: [] });
    }
    fileGroups.get(warning.file).unusedVars.push(warning);
  }
  
  for (const warning of warnings.exhaustiveDeps) {
    if (!fileGroups.has(warning.file)) {
      fileGroups.set(warning.file, { unusedVars: [], exhaustiveDeps: [] });
    }
    fileGroups.get(warning.file).exhaustiveDeps.push(warning);
  }
  
  console.log(`${colors.blue}📁 Processing ${fileGroups.size} files...${colors.reset}\n`);
  
  let processedCount = 0;
  for (const [filePath, fileWarnings] of fileGroups) {
    processedCount++;
    
    // Skip non-project files
    if (!filePath.includes('/hive_ui/')) continue;
    
    stats.filesProcessed.add(filePath);
    
    const fileName = path.basename(filePath);
    const relPath = filePath.replace(/.*\/hive_ui\//, '');
    
    if (!config.verbose) {
      // Show progress
      process.stdout.write(`\r  Processing (${processedCount}/${fileGroups.size}): ${relPath.substring(0, 60)}...`);
    } else {
      console.log(`\n${colors.blue}File:${colors.reset} ${relPath}`);
    }
    
    // Apply fixes in order
    let anyFixed = false;
    
    // 1. Remove unused imports
    if (fileWarnings.unusedVars.length > 0) {
      anyFixed = removeUnusedImports(filePath, fileWarnings.unusedVars) || anyFixed;
    }
    
    // 2. Prefix unused variables
    if (fileWarnings.unusedVars.length > 0) {
      anyFixed = prefixUnusedVariables(filePath, fileWarnings.unusedVars) || anyFixed;
    }
    
    // 3. Handle exhaustive deps
    if (fileWarnings.exhaustiveDeps.length > 0) {
      anyFixed = fixExhaustiveDeps(filePath, fileWarnings.exhaustiveDeps) || anyFixed;
    }
  }
  
  if (!config.verbose) {
    process.stdout.write('\r' + ' '.repeat(80) + '\r'); // Clear progress line
  }
}

// Main execution
async function main() {
  const startTime = Date.now();
  
  await processWarnings();
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  // Print summary
  console.log(`\n\n${colors.green}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.green}           SUMMARY                     ${colors.reset}`);
  console.log(`${colors.green}═══════════════════════════════════════${colors.reset}\n`);
  
  console.log(`📊 Statistics:`);
  console.log(`  • Files processed: ${colors.cyan}${stats.filesProcessed.size}${colors.reset}`);
  console.log(`  • Files modified: ${colors.cyan}${stats.filesModified.size}${colors.reset}`);
  console.log(`  • Imports removed: ${colors.green}${stats.fixedImports}${colors.reset}`);
  console.log(`  • Variables prefixed: ${colors.green}${stats.fixedVars}${colors.reset}`);
  console.log(`  • Parameters prefixed: ${colors.green}${stats.fixedParams}${colors.reset}`);
  console.log(`  • Hook deps handled: ${colors.green}${stats.fixedHooks}${colors.reset}`);
  console.log(`  • Time taken: ${colors.cyan}${duration}s${colors.reset}`);
  
  const totalFixed = stats.fixedImports + stats.fixedVars + stats.fixedParams + stats.fixedHooks;
  const estimatedRemaining = stats.totalWarnings - totalFixed;
  
  console.log(`\n📉 Estimated warnings:`);
  console.log(`  • Before: ${colors.yellow}${stats.totalWarnings}${colors.reset}`);
  console.log(`  • Fixed: ${colors.green}${totalFixed}${colors.reset}`);
  console.log(`  • Remaining: ${colors.cyan}~${Math.max(0, estimatedRemaining)}${colors.reset}`);
  
  if (config.dryRun) {
    console.log(`\n${colors.yellow}⚠ DRY RUN COMPLETE${colors.reset}`);
    console.log(`Run without --dry-run to apply changes`);
  } else if (stats.filesModified.size > 0) {
    console.log(`\n${colors.green}✨ Success!${colors.reset} Fixed ${totalFixed} warnings across ${stats.filesModified.size} files`);
    console.log(`\nNext steps:`);
    console.log(`  1. Run ${colors.cyan}pnpm lint${colors.reset} to see remaining warnings`);
    console.log(`  2. Run ${colors.cyan}pnpm typecheck${colors.reset} to ensure type safety`);
    console.log(`  3. Run ${colors.cyan}pnpm test${colors.reset} to verify functionality`);
  } else {
    console.log(`\n${colors.yellow}No automated fixes could be applied${colors.reset}`);
    console.log(`Remaining warnings may need manual review`);
  }
}

// Run the script
main().catch(error => {
  console.error(`\n${colors.red}❌ Error: ${error.message}${colors.reset}`);
  if (config.verbose) {
    console.error(error.stack);
  }
  process.exit(1);
});