#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const issues = {
  missingCommentPrefix: [],
  propertiesOnSameLine: [],
  commentMixedWithCode: [],
  unclosedStructures: []
};

function analyzeFile(filePath) {
  if (!filePath.match(/\.(ts|tsx|js|jsx)$/)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Pattern 1: Two properties on same line (after our previous fixes)
    // Look for: property1,    property2
    if (line.match(/,\s{2,}\w+:/)) {
      issues.propertiesOnSameLine.push({
        file: filePath,
        line: index + 1,
        content: line.trim().substring(0, 100)
      });
    }

    // Pattern 2: Property followed by comment and more properties
    // Look for: property) // comment property2:
    if (line.match(/\)\s*\/\/.*\s+\w+:/)) {
      issues.commentMixedWithCode.push({
        file: filePath,
        line: index + 1,
        content: line.trim().substring(0, 100)
      });
    }

    // Pattern 3: Comment-like text without // prefix
    // But exclude JSX content and string literals
    const trimmed = line.trim();
    if (trimmed.match(/^(let|const|var|function|class|import|export)\s+[A-Z][a-z]+\s+[a-z]+/) &&
        !trimmed.includes('//') &&
        !trimmed.includes('/*') &&
        !trimmed.endsWith(';') &&
        !trimmed.endsWith('{') &&
        !trimmed.endsWith(',')) {
      issues.missingCommentPrefix.push({
        file: filePath,
        line: index + 1,
        content: trimmed.substring(0, 100)
      });
    }
  });
}

function scanDirectory(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);

    if ([
      'node_modules',
      '.next',
      '.turbo',
      'dist',
      'build',
      '.git',
      'coverage',
      'storybook-static'
    ].includes(item)) {
      continue;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (stat.isFile()) {
      try {
        analyzeFile(fullPath);
      } catch (error) {
        // Skip files that can't be read
      }
    }
  }
}

console.log('🔍 Finding all remaining syntax errors...\n');

// Scan the apps and packages directories
if (fs.existsSync('apps')) {
  scanDirectory('apps');
}
if (fs.existsSync('packages')) {
  scanDirectory('packages');
}

// Report findings
console.log('📊 SYNTAX ERROR REPORT\n');
console.log('=' .repeat(80));

console.log('\n1. PROPERTIES STILL ON SAME LINE (after comma):');
console.log(`   Total: ${issues.propertiesOnSameLine.length} instances`);
if (issues.propertiesOnSameLine.length > 0) {
  console.log('   First 10 locations:');
  issues.propertiesOnSameLine.slice(0, 10).forEach(p => {
    console.log(`   - ${p.file}:${p.line}`);
    console.log(`     "${p.content}"`);
  });
}

console.log('\n2. COMMENTS MIXED WITH CODE:');
console.log(`   Total: ${issues.commentMixedWithCode.length} instances`);
if (issues.commentMixedWithCode.length > 0) {
  console.log('   First 10 locations:');
  issues.commentMixedWithCode.slice(0, 10).forEach(p => {
    console.log(`   - ${p.file}:${p.line}`);
    console.log(`     "${p.content}"`);
  });
}

console.log('\n3. MISSING COMMENT PREFIX:');
console.log(`   Total: ${issues.missingCommentPrefix.length} instances`);
if (issues.missingCommentPrefix.length > 0) {
  console.log('   First 10 locations:');
  issues.missingCommentPrefix.slice(0, 10).forEach(p => {
    console.log(`   - ${p.file}:${p.line}`);
    console.log(`     "${p.content}"`);
  });
}

console.log('\n' + '=' .repeat(80));
console.log('\n⚠️  This is ANALYSIS ONLY - no files were modified');