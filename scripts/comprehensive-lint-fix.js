#!/usr/bin/env node
/**
 * HIVE Comprehensive ESLint Fix Script
 * Systematically fixes common ESLint issues across the codebase
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class HiveLintFixer {
  constructor() {
    this.results = {
      unusedVars: 0,
      unusedImports: 0,
      consoleLogs: 0,
      undefinedVars: 0,
      filesProcessed: 0,
      errors: []
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = {
      info: '🔧',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }[type];
    console.log(`${timestamp} ${prefix} ${message}`);
  }

  // Find all TypeScript/JavaScript files in web and admin apps
  findSourceFiles() {
    const patterns = [
      'apps/web/src/**/*.{ts,tsx,js,jsx}',
      'apps/admin/src/**/*.{ts,tsx,js,jsx}',
      '!**/node_modules/**',
      '!**/.next/**',
      '!**/dist/**',
      '!**/*.test.{ts,tsx}',
      '!**/*.spec.{ts,tsx}'
    ];

    this.log('Finding source files to process...');
    
    const files = [];
    
    // Recursively find files
    const findInDir = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !['node_modules', '.next', 'dist', '__tests__'].includes(item)) {
          findInDir(fullPath);
        } else if (stat.isFile() && /\.(ts|tsx|js|jsx)$/.test(item)) {
          files.push(fullPath);
        }
      });
    };

    findInDir('apps/web/src');
    findInDir('apps/admin/src');
    
    this.log(`Found ${files.length} files to process`);
    return files;
  }

  // Fix unused imports
  fixUnusedImports(content, filePath) {
    let fixed = content;
    let count = 0;

    // Remove unused named imports
    const importRegex = /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"][^'"]+['"];?\s*\n/g;
    
    fixed = fixed.replace(importRegex, (match, imports) => {
      const importList = imports.split(',').map(imp => imp.trim()).filter(Boolean);
      const usedImports = [];
      
      importList.forEach(imp => {
        const varName = imp.includes(' as ') ? imp.split(' as ')[1].trim() : imp.trim();
        // Check if variable is used in the file
        const useRegex = new RegExp(`\\b${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        const matches = (content.match(useRegex) || []).length;
        
        if (matches > 1) { // More than 1 match means it's used (1 is the import itself)
          usedImports.push(imp);
        } else {
          count++;
        }
      });
      
      if (usedImports.length === 0) {
        return ''; // Remove entire import line
      } else if (usedImports.length < importList.length) {
        return match.replace(`{ ${imports} }`, `{ ${usedImports.join(', ')} }`);
      }
      
      return match;
    });

    // Remove completely unused default imports
    const defaultImportRegex = /import\s+(\w+)\s+from\s+['"][^'"]+['"];?\s*\n/g;
    
    fixed = fixed.replace(defaultImportRegex, (match, importName) => {
      const useRegex = new RegExp(`\\b${importName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      const matches = (content.match(useRegex) || []).length;
      
      if (matches <= 1) { // Only the import declaration
        count++;
        return '';
      }
      return match;
    });

    if (count > 0) {
      this.log(`Removed ${count} unused imports from ${path.relative(process.cwd(), filePath)}`);
      this.results.unusedImports += count;
    }

    return fixed;
  }

  // Fix unused variables by prefixing with underscore
  fixUnusedVariables(content, filePath) {
    let fixed = content;
    let count = 0;

    // Fix unused function parameters
    const functionParamRegex = /(?:function\s+\w+|const\s+\w+\s*=\s*(?:async\s+)?\(|^\s*(?:async\s+)?(?:export\s+)?(?:const|let)\s+\w+\s*=\s*(?:async\s+)?\(|=>\s*\(|,\s*\()\s*([^)]+)\s*\)/gm;
    
    // Fix unused variable declarations
    const varRegex = /(?:const|let|var)\s+(\w+)(?:\s*:\s*[^=]+)?(?:\s*=\s*[^;,\n}]+)?[;,]?/g;
    
    // This is a simplified approach - would need more sophisticated parsing for production
    if (content.includes('is assigned a value but never used')) {
      // For now, log files that need manual attention
      this.log(`Manual attention needed for unused variables: ${path.relative(process.cwd(), filePath)}`, 'warning');
    }

    return fixed;
  }

  // Remove console.log statements
  removeConsoleLogs(content, filePath) {
    let fixed = content;
    let count = 0;

    // Remove console.log, console.error, console.warn, etc.
    const consoleRegex = /^\s*console\.(log|error|warn|info|debug|trace)\([^)]*\);?\s*\n?/gm;
    
    fixed = fixed.replace(consoleRegex, (match) => {
      count++;
      return '';
    });

    // Remove console statements in expressions
    const inlineConsoleRegex = /console\.(log|error|warn|info|debug|trace)\([^)]*\),?\s*/g;
    
    fixed = fixed.replace(inlineConsoleRegex, (match) => {
      count++;
      return '';
    });

    if (count > 0) {
      this.log(`Removed ${count} console statements from ${path.relative(process.cwd(), filePath)}`);
      this.results.consoleLogs += count;
    }

    return fixed;
  }

  // Fix common undefined variable issues
  fixUndefinedVariables(content, filePath) {
    let fixed = content;
    let count = 0;

    // Common fixes for missing imports
    const fixes = [
      // React hooks
      {
        regex: /\buseState\b/g,
        missing: 'useState',
        import: "import { useState } from 'react';"
      },
      {
        regex: /\buseEffect\b/g,
        missing: 'useEffect',
        import: "import { useEffect } from 'react';"
      },
      {
        regex: /\buseCallback\b/g,
        missing: 'useCallback', 
        import: "import { useCallback } from 'react';"
      },
      {
        regex: /\buseMemo\b/g,
        missing: 'useMemo',
        import: "import { useMemo } from 'react';"
      },
      // Common UI components
      {
        regex: /\bBadge\b/g,
        missing: 'Badge',
        import: "import { Badge } from '@hive/ui';"
      }
    ];

    // Check for missing React import
    if ((fixed.includes('useState') || fixed.includes('useEffect') || fixed.includes('useCallback') || fixed.includes('useMemo')) 
        && !fixed.includes("from 'react'")) {
      
      const reactImports = [];
      if (fixed.includes('useState')) reactImports.push('useState');
      if (fixed.includes('useEffect')) reactImports.push('useEffect');
      if (fixed.includes('useCallback')) reactImports.push('useCallback');
      if (fixed.includes('useMemo')) reactImports.push('useMemo');
      
      if (reactImports.length > 0) {
        const importStatement = `import React, { ${reactImports.join(', ')} } from 'react';\n`;
        fixed = importStatement + fixed;
        count++;
      }
    }

    // Fix underscore prefix issues (_variable not defined -> variable)
    const underscoreRegex = /'(\w+)' is not defined.*?no-undef/g;
    const underscoreMatches = content.match(underscoreRegex);
    
    if (underscoreMatches) {
      underscoreMatches.forEach(match => {
        const varMatch = match.match(/'(\w+)'/);
        if (varMatch) {
          const varName = varMatch[1];
          if (varName.startsWith('_')) {
            const originalVar = varName.substring(1);
            // Replace _variable with variable throughout file
            const replaceRegex = new RegExp(`\\b${varName}\\b`, 'g');
            fixed = fixed.replace(replaceRegex, originalVar);
            count++;
          }
        }
      });
    }

    if (count > 0) {
      this.log(`Fixed ${count} undefined variable issues in ${path.relative(process.cwd(), filePath)}`);
      this.results.undefinedVars += count;
    }

    return fixed;
  }

  // Process a single file
  processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let fixed = content;

      // Apply all fixes
      fixed = this.removeConsoleLogs(fixed, filePath);
      fixed = this.fixUnusedImports(fixed, filePath);
      fixed = this.fixUndefinedVariables(fixed, filePath);
      
      // Write back if changed
      if (fixed !== content) {
        fs.writeFileSync(filePath, fixed);
        this.results.filesProcessed++;
      }

    } catch (error) {
      this.log(`Error processing ${filePath}: ${error.message}`, 'error');
      this.results.errors.push(`${filePath}: ${error.message}`);
    }
  }

  // Run ESLint auto-fix
  runEslintFix() {
    this.log('Running ESLint auto-fix...');
    
    try {
      execSync('pnpm lint --fix', { stdio: 'pipe' });
      this.log('ESLint auto-fix completed successfully', 'success');
    } catch (error) {
      this.log('ESLint auto-fix completed with errors (expected)', 'warning');
    }
  }

  // Main execution
  async run() {
    this.log('🚀 Starting HIVE Comprehensive Lint Fix', 'info');
    
    const files = this.findSourceFiles();
    
    this.log(`Processing ${files.length} files...`);
    
    // Process each file
    for (const file of files) {
      this.processFile(file);
    }

    // Run ESLint auto-fix
    this.runEslintFix();

    // Print summary
    this.printSummary();
  }

  printSummary() {
    this.log('', 'info');
    this.log('📊 CLEANUP SUMMARY', 'success');
    this.log(`Files processed: ${this.results.filesProcessed}`, 'info');
    this.log(`Unused imports removed: ${this.results.unusedImports}`, 'info');
    this.log(`Console statements removed: ${this.results.consoleLogs}`, 'info');
    this.log(`Undefined variables fixed: ${this.results.undefinedVars}`, 'info');
    
    if (this.results.errors.length > 0) {
      this.log(`Errors encountered: ${this.results.errors.length}`, 'warning');
      this.results.errors.forEach(error => this.log(error, 'error'));
    }
    
    this.log('', 'info');
    this.log('Next steps:', 'info');
    this.log('1. Run "pnpm lint" to check remaining issues', 'info');
    this.log('2. Fix critical no-undef errors manually', 'info'); 
    this.log('3. Address React hooks missing dependencies', 'info');
  }
}

// Run the script
const fixer = new HiveLintFixer();
fixer.run().catch(console.error);