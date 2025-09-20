#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANALYSIS ONLY - NO MODIFICATIONS
const patterns = {
  missingCommentPrefix: [],
  propertiesOnSameLine: [],
  unclosedBlocks: [],
  other: []
};

function analyzeFile(filePath) {
  if (!filePath.match(/\.(ts|tsx|js|jsx)$/)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Pattern 1: Line that looks like a comment but missing //
    // Look for lines that are clearly comments based on context
    if (line.match(/^\s*(function|import|export|interface|type|class|const|let|var)\s+to\s+/)) {
      patterns.missingCommentPrefix.push({
        file: filePath,
        line: index + 1,
        content: line.trim().substring(0, 80)
      });
    }

    // Pattern 2: Multiple property definitions on one line (missing comma)
    // Look for pattern: propertyName: type/value    propertyName2: type/value
    const multiPropMatch = line.match(/(\w+:\s*[^,\s]+)\s{2,}(\w+:\s*)/);
    if (multiPropMatch && !line.includes('//')) {
      patterns.propertiesOnSameLine.push({
        file: filePath,
        line: index + 1,
        content: line.trim().substring(0, 80)
      });
    }

    // Pattern 3: Lines that are sentence-like without // prefix
    // Common patterns from build tools, documentation, etc.
    if (line.match(/^\s*[A-Z][a-z]+\s+[a-z]+\s+[a-z]+/) &&
        !line.match(/^\s*(import|export|const|let|var|function|class|interface|type|return|if|else|for|while)/) &&
        !line.includes('//') &&
        !line.includes('/*') &&
        !line.trim().endsWith(';') &&
        !line.trim().endsWith(',') &&
        !line.trim().endsWith('{') &&
        !line.trim().endsWith('}') &&
        line.trim().length > 10) {
      patterns.missingCommentPrefix.push({
        file: filePath,
        line: index + 1,
        content: line.trim().substring(0, 80)
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
      'coverage'
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

// Scan the apps and packages directories
console.log('🔍 Analyzing syntax patterns (READ-ONLY)...\n');

if (fs.existsSync('apps')) {
  scanDirectory('apps');
}
if (fs.existsSync('packages')) {
  scanDirectory('packages');
}

// Report findings
console.log('📊 SYNTAX PATTERN ANALYSIS REPORT\n');
console.log('=' .repeat(80));

console.log('\n1. MISSING COMMENT PREFIX (lines that look like comments):');
console.log(`   Total: ${patterns.missingCommentPrefix.length} instances`);
if (patterns.missingCommentPrefix.length > 0) {
  console.log('   Sample locations:');
  patterns.missingCommentPrefix.slice(0, 5).forEach(p => {
    console.log(`   - ${p.file}:${p.line}`);
    console.log(`     "${p.content}"`);
  });
}

console.log('\n2. MULTIPLE PROPERTIES ON SAME LINE (missing comma):');
console.log(`   Total: ${patterns.propertiesOnSameLine.length} instances`);
if (patterns.propertiesOnSameLine.length > 0) {
  console.log('   Sample locations:');
  patterns.propertiesOnSameLine.slice(0, 5).forEach(p => {
    console.log(`   - ${p.file}:${p.line}`);
    console.log(`     "${p.content}"`);
  });
}

console.log('\n' + '=' .repeat(80));
console.log('\n⚠️  This is ANALYSIS ONLY - no files were modified');
console.log('Review these patterns carefully before creating any fixes\n');