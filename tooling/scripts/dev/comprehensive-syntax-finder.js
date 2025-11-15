#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const issues = {
  missingCommas: [],
  splitComments: [],
  mergedLines: [],
  extraSpacesBeforeComma: [],
  unclosedBlocks: []
};

function analyzeFile(filePath) {
  if (!filePath.match(/\.(ts|tsx|js|jsx)$/)) return;
  if (filePath.includes('storybook-static') || filePath.includes('.next')) return;

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Pattern 1: Properties without comma between them
      // Look for: property1: value property2:
      if (line.match(/:\s*[^,\s]+\s+\w+:/)) {
        issues.missingCommas.push({
          file: filePath,
          line: index + 1,
          content: line.trim()
        });
      }

      // Pattern 2: Extra spaces before comma
      // Look for: value       ,
      if (line.match(/\S\s{2,},/)) {
        issues.extraSpacesBeforeComma.push({
          file: filePath,
          line: index + 1,
          content: line.trim()
        });
      }

      // Pattern 3: Comment followed by code on same line
      // Look for: // comment text code
      if (line.match(/\/\/.*\s+\w+:\s*[^/]/)) {
        issues.mergedLines.push({
          file: filePath,
          line: index + 1,
          content: line.trim()
        });
      }

      // Pattern 4: Line ending with comment start but no text
      if (line.match(/\/\/\s*$/)) {
        // Check if next line looks like it should be part of comment
        if (index + 1 < lines.length) {
          const nextLine = lines[index + 1];
          if (nextLine.match(/^[a-z]/) && !nextLine.match(/^(import|export|const|let|var|function|class)/)) {
            issues.splitComments.push({
              file: filePath,
              line: index + 1,
              content: line.trim() + ' | ' + nextLine.trim()
            });
          }
        }
      }

      // Pattern 5: Unclosed blocks - count braces
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      const openParens = (line.match(/\(/g) || []).length;
      const closeParens = (line.match(/\)/g) || []).length;

      if (openBraces !== closeBraces || openParens !== closeParens) {
        // This is just informational, not necessarily an error
      }
    });
  } catch (error) {
    // Skip files that can't be read
  }
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
      analyzeFile(fullPath);
    }
  }
}

console.log('🔍 Comprehensive Syntax Analysis...\n');

// Scan the apps and packages directories
if (fs.existsSync('apps')) {
  scanDirectory('apps');
}
if (fs.existsSync('packages')) {
  scanDirectory('packages');
}

// Report findings
console.log('📊 COMPREHENSIVE SYNTAX REPORT\n');
console.log('=' .repeat(80));

let totalIssues = 0;

console.log('\n1. MISSING COMMAS between properties:');
console.log(`   Total: ${issues.missingCommas.length} instances`);
totalIssues += issues.missingCommas.length;
if (issues.missingCommas.length > 0) {
  console.log('   First 5:');
  issues.missingCommas.slice(0, 5).forEach(p => {
    console.log(`   - ${p.file}:${p.line}`);
  });
}

console.log('\n2. EXTRA SPACES before comma:');
console.log(`   Total: ${issues.extraSpacesBeforeComma.length} instances`);
totalIssues += issues.extraSpacesBeforeComma.length;
if (issues.extraSpacesBeforeComma.length > 0) {
  console.log('   First 5:');
  issues.extraSpacesBeforeComma.slice(0, 5).forEach(p => {
    console.log(`   - ${p.file}:${p.line}`);
  });
}

console.log('\n3. MERGED LINES (comment + code):');
console.log(`   Total: ${issues.mergedLines.length} instances`);
totalIssues += issues.mergedLines.length;
if (issues.mergedLines.length > 0) {
  console.log('   First 5:');
  issues.mergedLines.slice(0, 5).forEach(p => {
    console.log(`   - ${p.file}:${p.line}`);
  });
}

console.log('\n4. SPLIT COMMENTS:');
console.log(`   Total: ${issues.splitComments.length} instances`);
totalIssues += issues.splitComments.length;
if (issues.splitComments.length > 0) {
  console.log('   First 5:');
  issues.splitComments.slice(0, 5).forEach(p => {
    console.log(`   - ${p.file}:${p.line}`);
  });
}

console.log('\n' + '=' .repeat(80));
console.log(`\n📈 TOTAL ISSUES FOUND: ${totalIssues}`);
console.log('\n⚠️  This is ANALYSIS ONLY - no files were modified');

// Save detailed report
const report = {
  timestamp: new Date().toISOString(),
  totalIssues,
  issues
};

fs.writeFileSync('syntax-issues-report.json', JSON.stringify(report, null, 2));
console.log('\n📁 Detailed report saved to: syntax-issues-report.json');