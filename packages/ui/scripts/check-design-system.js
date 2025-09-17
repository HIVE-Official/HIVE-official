#!/usr/bin/env node

/**
 * HIVE Design System Compliance Checker
 * Enforces design system rules across the codebase
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const COLORS_TO_CHECK = {
  // Hardcoded colors that should use tokens
  hardcoded: [
    /#[0-9a-fA-F]{6}/g,           // Hex colors
    /#[0-9a-fA-F]{3}(?![0-9a-fA-F])/g,  // Short hex
    /rgba?\([^)]+\)/g,            // RGB/RGBA
  ],
  
  // Forbidden direct color references
  forbidden: [
    /colors\.(gold|champagne|amber|bronze)(?![\w])/g,  // Direct luxury colors
    /prdColors\./g,                                     // Direct PRD colors
    /'#FFD700'/g,                                       // Hardcoded gold
  ],
  
  // Required token patterns
  required: [
    /semantic\./,
    /overlay\./,
    /border\./,
    /shadows\./,
  ]
};

// File patterns to check
const FILE_PATTERNS = [
  'apps/**/*.{ts,tsx}',
  'packages/ui/src/**/*.{ts,tsx}',
  '!**/*.stories.tsx',
  '!**/*.test.{ts,tsx}',
  '!**/node_modules/**',
  '!**/dist/**',
  '!**/.next/**',
];

class DesignSystemChecker {
  constructor() {
    this.violations = [];
    this.warnings = [];
    this.checkedFiles = 0;
  }

  checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Skip comments and imports
      if (line.trim().startsWith('//') || line.trim().startsWith('import')) {
        return;
      }
      
      // Check for hardcoded colors
      COLORS_TO_CHECK.hardcoded.forEach(pattern => {
        const matches = line.match(pattern);
        if (matches) {
          matches.forEach(match => {
            // Allow exceptions for design token files
            if (!filePath.includes('/tokens/') && !filePath.includes('colors.ts')) {
              this.violations.push({
                file: filePath,
                line: lineNumber,
                type: 'HARDCODED_COLOR',
                value: match,
                message: `Hardcoded color "${match}" found. Use semantic tokens instead.`
              });
            }
          });
        }
      });
      
      // Check for forbidden patterns
      COLORS_TO_CHECK.forbidden.forEach(pattern => {
        const matches = line.match(pattern);
        if (matches) {
          matches.forEach(match => {
            this.violations.push({
              file: filePath,
              line: lineNumber,
              type: 'FORBIDDEN_PATTERN',
              value: match,
              message: `Direct color reference "${match}" found. Use semantic tokens instead.`
            });
          });
        }
      });
      
      // Check for missing Storybook stories
      if (filePath.endsWith('.tsx') && !filePath.includes('.stories') && !filePath.includes('/pages/')) {
        const componentName = path.basename(filePath, '.tsx');
        const storyPath = filePath.replace('.tsx', '.stories.tsx');
        
        if (!fs.existsSync(storyPath) && this.looksLikeComponent(content)) {
          this.warnings.push({
            file: filePath,
            type: 'MISSING_STORY',
            message: `Component "${componentName}" is missing Storybook stories`
          });
        }
      }
    });
    
    this.checkedFiles++;
  }
  
  looksLikeComponent(content) {
    // Simple heuristic: exported function/const that returns JSX
    return content.includes('export') && 
           (content.includes('return (') || content.includes('=> (')) &&
           content.includes('</');
  }
  
  checkComponentUsage(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for duplicate component patterns
    const duplicatePatterns = [
      { pattern: /<button(?:\s|>)/gi, replacement: '<Button' },
      { pattern: /<input(?:\s|>)/gi, replacement: '<Input' },
      { pattern: /<select(?:\s|>)/gi, replacement: '<Select' },
      { pattern: /<textarea(?:\s|>)/gi, replacement: '<Textarea' },
    ];
    
    duplicatePatterns.forEach(({ pattern, replacement }) => {
      if (pattern.test(content)) {
        this.warnings.push({
          file: filePath,
          type: 'NATIVE_ELEMENT',
          message: `Using native HTML element. Consider using ${replacement} from @hive/ui`
        });
      }
    });
  }
  
  run() {
    console.log('🔍 Checking HIVE Design System compliance...\n');
    
    FILE_PATTERNS.forEach(pattern => {
      const files = glob.sync(pattern, {
        ignore: pattern.startsWith('!') ? [] : undefined
      });
      
      files.forEach(file => {
        this.checkFile(file);
        this.checkComponentUsage(file);
      });
    });
    
    // Report results
    this.report();
    
    // Exit with error if violations found
    if (this.violations.length > 0) {
      process.exit(1);
    }
  }
  
  report() {
    console.log(`📊 Checked ${this.checkedFiles} files\n`);
    
    if (this.violations.length === 0 && this.warnings.length === 0) {
      console.log('✅ All files comply with design system rules!\n');
      return;
    }
    
    // Group violations by type
    if (this.violations.length > 0) {
      console.log(`❌ Found ${this.violations.length} violations:\n`);
      
      const violationsByType = {};
      this.violations.forEach(v => {
        if (!violationsByType[v.type]) {
          violationsByType[v.type] = [];
        }
        violationsByType[v.type].push(v);
      });
      
      Object.entries(violationsByType).forEach(([type, violations]) => {
        console.log(`\n${type} (${violations.length}):`);
        violations.slice(0, 5).forEach(v => {
          console.log(`  ${v.file}:${v.line || 0}`);
          console.log(`    ${v.message}`);
        });
        if (violations.length > 5) {
          console.log(`  ... and ${violations.length - 5} more`);
        }
      });
    }
    
    // Show warnings
    if (this.warnings.length > 0) {
      console.log(`\n⚠️  Found ${this.warnings.length} warnings:\n`);
      
      const warningsByType = {};
      this.warnings.forEach(w => {
        if (!warningsByType[w.type]) {
          warningsByType[w.type] = [];
        }
        warningsByType[w.type].push(w);
      });
      
      Object.entries(warningsByType).forEach(([type, warnings]) => {
        console.log(`\n${type} (${warnings.length}):`);
        warnings.slice(0, 5).forEach(w => {
          console.log(`  ${w.file}`);
          console.log(`    ${w.message}`);
        });
        if (warnings.length > 5) {
          console.log(`  ... and ${warnings.length - 5} more`);
        }
      });
    }
    
    // Provide fix suggestions
    if (this.violations.length > 0) {
      console.log('\n💡 To fix violations:');
      console.log('1. Replace hardcoded colors with semantic tokens from packages/tokens/src/colors.ts');
      console.log('2. Use components from @hive/ui instead of native HTML elements');
      console.log('3. Run: pnpm --filter @hive/ui add-component to create new components properly');
    }
  }
}

// Run the checker
const checker = new DesignSystemChecker();
checker.run();