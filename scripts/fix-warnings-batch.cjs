#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

console.log(`${colors.cyan}HIVE Warning Batch Fixer${colors.reset}\n`);

// Parse command line arguments
const args = process.argv.slice(2);
const targetPackage = args[0] || 'web';
const isDryRun = args.includes('--dry-run');

console.log(`Target: ${colors.blue}${targetPackage}${colors.reset}`);
if (isDryRun) console.log(`${colors.yellow}DRY RUN MODE${colors.reset}\n`);

// Common unused imports that can be safely removed
const REMOVABLE_IMPORTS = new Set([
  // Icons
  'Activity', 'AlertCircle', 'User', 'Globe', 'X', 'Coffee', 
  'Plus', 'Star', 'ChevronRight', 'ChevronLeft', 'Search', 'Home', 'Users',
  'Book', 'Clock', 'Heart', 'Share', 'Download', 'Upload', 'Edit', 'Trash',
  'Eye', 'EyeOff', 'Lock', 'Unlock', 'Info', 'Warning', 'Check', 'Copy',
  'Mail', 'Calendar', 'Settings', 'Target', 'Filter', 'Building', 'MapPin', 
  'Sparkles', 'GraduationCap', 'Bell', 'ArrowRight', 'AlertTriangle',
  'BookOpen', 'Award', 'BookmarkPlus', 'MessageSquare', 'Briefcase',
  'Code', 'Zap', 'Shield', 'ExternalLink', 'FileText', 'Loader2',
  'PlusCircle', 'UserPlus', 'TrendingUp', 'BarChart', 'Trophy',
  'Flag', 'Hash', 'Grid', 'Layers', 'Play', 'Pause', 'Send',
  'CheckCircle', 'XCircle', 'AlertOctagon', 'HelpCircle',
  
  // UI Components that are commonly unused
  'AlertDescription', 'AlertDialog', 'AlertDialogAction', 'AlertDialogCancel',
  'AlertDialogContent', 'AlertDialogDescription', 'AlertDialogFooter',
  'AlertDialogHeader', 'AlertDialogTitle', 'AlertDialogTrigger',
  'AnimatePresence', 'motion', 'Badge', 'Separator', 'Progress',
  'RadioGroup', 'RadioGroupItem', 'TabsContent', 'TabsList', 'TabsTrigger',
  'SelectTrigger', 'SelectContent', 'SelectItem', 'SelectValue',
  'TooltipContent', 'TooltipTrigger', 'TooltipProvider',
  'DialogContent', 'DialogDescription', 'DialogFooter', 'DialogHeader',
  'DialogTitle', 'DialogTrigger', 'SheetContent', 'SheetDescription',
  'SheetFooter', 'SheetHeader', 'SheetTitle', 'SheetTrigger',
  'DropdownMenuContent', 'DropdownMenuItem', 'DropdownMenuLabel',
  'DropdownMenuSeparator', 'DropdownMenuTrigger',
  
  // Types/Interfaces commonly unused
  'AdminUser', 'ApiResponse', 'ErrorCodes', 'FeedItem', 'SearchQuery',
  'RealtimeMessage', 'NotificationData', 'AnalyticsEvent',
  'SpaceCategory', 'SpacePrivacy', 'UserRole', 'ToolType',
  
  // Custom components
  'UBSpaceTemplateCard', 'SpaceCard', 'ToolCard', 'ProfileCard',
  'AlumniComingSoonStep', 'LoadingState', 'ErrorState',
]);

// Get all TypeScript/React files
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and build directories
      if (!file.includes('node_modules') && !file.includes('dist') && !file.includes('.next')) {
        getAllFiles(filePath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Remove unused imports from a file
function removeUnusedImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let removedCount = 0;
  
  // Process each removable import
  for (const importName of REMOVABLE_IMPORTS) {
    // Match various import patterns
    const patterns = [
      // Named import: import { Name } from
      new RegExp(`import\\s*{([^}]*\\b${importName}\\b[^}]*)}\\s*from\\s*['"][^'"]+['"]`, 'gm'),
      // Default import: import Name from
      new RegExp(`import\\s+${importName}\\s+from\\s*['"][^'"]+['"]`, 'gm'),
      // Type import: import type { Name } from
      new RegExp(`import\\s+type\\s*{([^}]*\\b${importName}\\b[^}]*)}\\s*from\\s*['"][^'"]+['"]`, 'gm'),
    ];
    
    for (const pattern of patterns) {
      const matches = content.match(pattern);
      if (matches) {
        for (const match of matches) {
          // Check if this import is actually used in the file
          // (excluding the import line itself)
          const tempContent = content.replace(match, '');
          const usagePattern = new RegExp(`\\b${importName}\\b`, 'g');
          
          if (!usagePattern.test(tempContent)) {
            // Import is not used, remove it
            if (match.includes('{') && match.includes('}')) {
              // For named imports, remove just the specific import
              const bracketContent = match.match(/{([^}]*)}/)?.[1] || '';
              const items = bracketContent.split(',').map(s => s.trim());
              const filteredItems = items.filter(item => !item.includes(importName));
              
              if (filteredItems.length === 0) {
                // Remove entire import statement
                content = content.replace(match + ';', '');
                content = content.replace(match, '');
              } else {
                // Keep other imports
                const newBracketContent = filteredItems.join(', ');
                const newImport = match.replace(bracketContent, newBracketContent);
                content = content.replace(match, newImport);
              }
            } else {
              // Remove entire import statement
              content = content.replace(match + ';', '');
              content = content.replace(match, '');
            }
            removedCount++;
          }
        }
      }
    }
  }
  
  // Clean up multiple blank lines
  content = content.replace(/\n\n\n+/g, '\n\n');
  
  if (content !== originalContent) {
    if (!isDryRun) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
    return removedCount;
  }
  
  return 0;
}

// Prefix unused variables with underscore
function prefixUnusedVariables(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let prefixedCount = 0;
  
  // Common patterns for unused variables
  const patterns = [
    // Unused destructured variables
    { pattern: /const\s*{\s*([^}]+)\s*}\s*=/, prefix: ['profile', 'user', 'router', 'updateProfile'] },
    { pattern: /let\s*{\s*([^}]+)\s*}\s*=/, prefix: ['state', 'setState'] },
    
    // Unused regular variables
    { pattern: /const\s+(\w+)\s*=/, prefix: ['result', 'testResult', 'hasUnsavedChanges', 'force'] },
    { pattern: /let\s+(\w+)\s*=/, prefix: ['totalImported', 'successfulFeeds', 'passedTests', 'totalTests'] },
    
    // Unused function parameters
    { pattern: /function\s+\w+\s*\(([^)]+)\)/, prefix: ['context', 'config', 'params'] },
    { pattern: /\(([^)]+)\)\s*=>/, prefix: ['userId', 'spaceId', 'index', 'category'] },
  ];
  
  for (const { pattern, prefix } of patterns) {
    for (const varName of prefix) {
      // Check if variable exists and is unused
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      const matches = content.match(regex);
      
      if (matches && matches.length === 1) {
        // Variable appears only once (in declaration), so it's unused
        content = content.replace(
          new RegExp(`\\b${varName}\\b`),
          `_${varName}`
        );
        prefixedCount++;
      }
    }
  }
  
  if (content !== originalContent) {
    if (!isDryRun) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
    return prefixedCount;
  }
  
  return 0;
}

// Main execution
async function main() {
  const targetDir = targetPackage === 'web' 
    ? path.join(__dirname, '..', 'apps', 'web', 'src')
    : targetPackage === 'admin'
    ? path.join(__dirname, '..', 'apps', 'admin', 'src')
    : path.join(__dirname, '..', 'packages', targetPackage, 'src');
  
  if (!fs.existsSync(targetDir)) {
    console.error(`${colors.red}Directory not found: ${targetDir}${colors.reset}`);
    process.exit(1);
  }
  
  console.log(`Scanning: ${colors.blue}${targetDir}${colors.reset}\n`);
  
  const files = getAllFiles(targetDir);
  console.log(`Found ${colors.cyan}${files.length}${colors.reset} TypeScript files\n`);
  
  let totalImportsRemoved = 0;
  let totalVarsPrefixed = 0;
  let filesModified = 0;
  
  for (const file of files) {
    const relPath = path.relative(targetDir, file);
    process.stdout.write(`Processing: ${relPath.padEnd(60)}\r`);
    
    const importsRemoved = removeUnusedImports(file);
    const varsPrefixed = prefixUnusedVariables(file);
    
    if (importsRemoved > 0 || varsPrefixed > 0) {
      filesModified++;
      totalImportsRemoved += importsRemoved;
      totalVarsPrefixed += varsPrefixed;
      
      console.log(`\n  ${colors.green}✓${colors.reset} ${relPath}`);
      if (importsRemoved > 0) {
        console.log(`    Removed ${colors.cyan}${importsRemoved}${colors.reset} imports`);
      }
      if (varsPrefixed > 0) {
        console.log(`    Prefixed ${colors.cyan}${varsPrefixed}${colors.reset} variables`);
      }
    }
  }
  
  console.log(`\n${colors.green}═══════════════════════════════${colors.reset}`);
  console.log(`${colors.green}         SUMMARY                ${colors.reset}`);
  console.log(`${colors.green}═══════════════════════════════${colors.reset}\n`);
  
  console.log(`Files processed: ${colors.cyan}${files.length}${colors.reset}`);
  console.log(`Files modified: ${colors.cyan}${filesModified}${colors.reset}`);
  console.log(`Imports removed: ${colors.green}${totalImportsRemoved}${colors.reset}`);
  console.log(`Variables prefixed: ${colors.green}${totalVarsPrefixed}${colors.reset}`);
  
  if (isDryRun) {
    console.log(`\n${colors.yellow}DRY RUN COMPLETE - No files were modified${colors.reset}`);
  } else {
    console.log(`\n${colors.green}✨ Changes applied!${colors.reset}`);
    console.log(`Run ${colors.cyan}pnpm lint${colors.reset} to check remaining warnings`);
  }
}

main().catch(error => {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
});