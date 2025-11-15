#!/usr/bin/env node

// HIVE Design System - Hardcoded Value Detection Script
// Scans codebase for hardcoded colors, spacing, and legacy tokens

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  srcDir: './packages/ui/src',
  filePatterns: ['**/*.tsx', '**/*.ts'],
  excludePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/*.stories.*',
    '**/*.test.*',
    '**/tokens/**',
  ],
};

// Detection patterns
const PATTERNS = {
  hexColors: {
    regex: /#[0-9A-Fa-f]{3,6}/g,
    message: 'Hardcoded hex color detected',
    severity: 'error',
  },
  rgbColors: {
    regex: /rgba?\([^)]+\)/g,
    message: 'Hardcoded RGB/RGBA color detected',
    severity: 'error',
  },
  pixelValues: {
    regex: /\b(?!0px|1px)\d+px\b/g,
    message: 'Hardcoded pixel value detected',
    severity: 'warning',
  },
  remValues: {
    regex: /\b(?!0rem|0\.125rem|0\.25rem)\d*\.?\d+rem\b/g,
    message: 'Hardcoded rem value detected',
    severity: 'warning',
  },
  legacyTokens: {
    regex: /hive-(obsidian|charcoal|platinum|champagne|bronze|mercury|pewter)/g,
    message: 'Legacy luxury token detected - migrate to PRD tokens',
    severity: 'error',
  },
};

// Results tracking
const results = {
  files: 0,
  errors: 0,
  warnings: 0,
  issues: [],
};

// Utility functions
function isExcluded(filePath) {
  return CONFIG.excludePatterns.some(pattern => {
    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
    return regex.test(filePath);
  });
}

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativeFilePath = path.relative(process.cwd(), filePath);
    const fileIssues = [];

    // Skip if excluded
    if (isExcluded(relativeFilePath)) {
      return;
    }

    // Scan for each pattern
    Object.entries(PATTERNS).forEach(([patternName, pattern]) => {
      const matches = content.matchAll(pattern.regex);
      
      for (const match of matches) {
        const lineNumber = content.substring(0, match.index).split('\n').length;
        const issue = {
          file: relativeFilePath,
          line: lineNumber,
          column: match.index - content.lastIndexOf('\n', match.index - 1),
          pattern: patternName,
          value: match[0],
          message: pattern.message,
          severity: pattern.severity,
        };
        
        fileIssues.push(issue);
        results.issues.push(issue);
        
        if (pattern.severity === 'error') {
          results.errors++;
        } else {
          results.warnings++;
        }
      }
    });

    if (fileIssues.length > 0) {
      results.files++;
    }

  } catch (error) {
    console.error(`Error scanning file ${filePath}:`, error.message);
  }
}

function walkDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDirectory(filePath);
      } else if (filePath.match(/\.(tsx?|jsx?)$/)) {
        scanFile(filePath);
      }
    });
  } catch (error) {
    console.error(`Error walking directory ${dir}:`, error.message);
  }
}

function generateReport() {
  console.log('\n🔍 HIVE Design System - Hardcoded Value Detection Report');
  console.log('======================================================\n');
  
  // Summary
  console.log(`📊 Summary:`);
  console.log(`   Files scanned: ${results.files}`);
  console.log(`   Errors: ${results.errors}`);
  console.log(`   Warnings: ${results.warnings}`);
  console.log(`   Total issues: ${results.issues.length}\n`);
  
  if (results.issues.length === 0) {
    console.log('✅ No hardcoded values detected! Design system compliance achieved.\n');
    return;
  }
  
  // Group issues by severity
  const errorIssues = results.issues.filter(i => i.severity === 'error');
  const warningIssues = results.issues.filter(i => i.severity === 'warning');
  
  // Display errors
  if (errorIssues.length > 0) {
    console.log(`🚨 ERRORS (${errorIssues.length}):`);
    errorIssues.forEach(issue => {
      console.log(`   ${issue.file}:${issue.line}:${issue.column}`);
      console.log(`   └─ ${issue.message}: "${issue.value}"`);
    });
    console.log('');
  }
  
  // Display warnings
  if (warningIssues.length > 0) {
    console.log(`⚠️  WARNINGS (${warningIssues.length}):`);
    warningIssues.forEach(issue => {
      console.log(`   ${issue.file}:${issue.line}:${issue.column}`);
      console.log(`   └─ ${issue.message}: "${issue.value}"`);
    });
    console.log('');
  }
  
  // Migration suggestions
  console.log('💡 Migration Suggestions:');
  console.log('   • Replace hex colors with semantic tokens (e.g., bg-black, text-white)');  
  console.log('   • Use spacing tokens instead of hardcoded px/rem values');
  console.log('   • Migrate legacy luxury tokens to PRD-aligned equivalents');
  console.log('   • Reference: packages/tokens/src/colors-prd-aligned.ts\n');
  
  // Pattern breakdown
  const patternCounts = {};
  results.issues.forEach(issue => {
    patternCounts[issue.pattern] = (patternCounts[issue.pattern] || 0) + 1;
  });
  
  console.log('📈 Issue Breakdown by Pattern:');
  Object.entries(patternCounts).forEach(([pattern, count]) => {
    console.log(`   ${pattern}: ${count} occurrences`);
  });
  console.log('');
}

function generateJSONReport() {
  const reportPath = './hardcoded-values-report.json';
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      filesScanned: results.files,
      errors: results.errors,
      warnings: results.warnings,
      totalIssues: results.issues.length,
    },
    issues: results.issues,
    config: CONFIG,
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Detailed JSON report saved to: ${reportPath}\n`);
}

// Main execution
function main() {
  console.log('🚀 Starting hardcoded value detection...\n');
  
  // Check if source directory exists
  if (!fs.existsSync(CONFIG.srcDir)) {
    console.error(`❌ Source directory not found: ${CONFIG.srcDir}`);
    process.exit(1);
  }
  
  // Walk directory and scan files
  walkDirectory(CONFIG.srcDir);
  
  // Generate reports
  generateReport();
  generateJSONReport();
  
  // Exit with appropriate code
  if (results.errors > 0) {
    console.log('❌ Detection complete with errors. Please fix hardcoded values before continuing.\n');
    process.exit(1);
  } else if (results.warnings > 0) {
    console.log('⚠️  Detection complete with warnings. Consider addressing these issues.\n');
    process.exit(0);
  } else {
    console.log('✅ Detection complete. No issues found!\n');
    process.exit(0);
  }
}

// Handle CLI arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
HIVE Design System - Hardcoded Value Detection

Usage: node scripts/detect-hardcoded-values.js [options]

Options:
  --help, -h     Show this help message
  --json-only    Only generate JSON report (no console output)
  --src <path>   Specify source directory (default: ./packages/ui/src)

Examples:
  node scripts/detect-hardcoded-values.js
  node scripts/detect-hardcoded-values.js --src ./apps/web/src
  node scripts/detect-hardcoded-values.js --json-only
`);
  process.exit(0);
}

if (process.argv.includes('--json-only')) {
  // Suppress console output, only generate JSON
  console.log = () => {};
}

const srcIndex = process.argv.indexOf('--src');
if (srcIndex !== -1 && process.argv[srcIndex + 1]) {
  CONFIG.srcDir = process.argv[srcIndex + 1];
}

// Run the detection
main();