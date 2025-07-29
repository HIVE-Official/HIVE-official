#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// Patterns to detect hardcoded values
const patterns = {
  hexColors: /#[0-9a-fA-F]{3,6}\b/g,
  rgbColors: /rgba?\([^)]+\)/g,
  pixelValues: /\b\d+px\b/g,
  remValues: /\b\d+(\.\d+)?rem\b/g,
  legacyTokens: /\bhive-(obsidian|charcoal|graphite|slate|steel|platinum|silver|mercury|pewter|smoke|gold|champagne|amber|bronze|emerald|ruby|sapphire|citrine)\b/g
};

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return output
      .split('\n')
      .filter(Boolean)
      .filter(file => /\.(tsx?|jsx?)$/.test(file))
      .filter(file => file.startsWith('packages/ui/src/'));
  } catch (error) {
    console.error('❌ Error getting staged files:', error.message);
    return [];
  }
}

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    const lines = content.split('\n');
    
    lines.forEach((line, lineIndex) => {
      Object.entries(patterns).forEach(([patternName, pattern]) => {
        let match;
        while ((match = pattern.exec(line)) !== null) {
          // Skip certain allowed patterns
          if (shouldSkip(match[0], patternName, line)) {
            continue;
          }
          
          issues.push({
            file: filePath,
            line: lineIndex + 1,
            column: match.index + 1,
            pattern: patternName,
            value: match[0],
            message: getPatternMessage(patternName)
          });
        }
        pattern.lastIndex = 0; // Reset regex
      });
    });
    
    return issues;
  } catch (error) {
    console.error(`❌ Error reading file ${filePath}:`, error.message);
    return [];
  }
}

function shouldSkip(value, patternName, line) {
  // Skip if already using CSS custom properties
  if (line.includes('var(--hive-')) {
    return false; // Still check for hardcoded values mixed with tokens
  }
  
  // Skip color-mix functions (these are acceptable)
  if (patternName === 'rgbColors' && line.includes('color-mix(')) {
    return true;
  }
  
  // Skip imports and type definitions
  if (line.trim().startsWith('import ') || line.trim().startsWith('export ') || line.includes('@import')) {
    return true;
  }
  
  // Skip comments
  if (line.trim().startsWith('//') || line.trim().startsWith('/*')) {
    return true;
  }
  
  return false;
}

function getPatternMessage(patternName) {
  const messages = {
    hexColors: 'Hardcoded hex color detected - use semantic tokens',
    rgbColors: 'Hardcoded RGB/RGBA color detected - use semantic tokens',
    pixelValues: 'Hardcoded pixel value detected - use spacing tokens', 
    remValues: 'Hardcoded rem value detected - use spacing tokens',
    legacyTokens: 'Legacy luxury token detected - migrate to PRD tokens'
  };
  return messages[patternName] || 'Hardcoded value detected';
}

function main() {
  const stagedFiles = getStagedFiles();
  
  if (stagedFiles.length === 0) {
    console.log('✅ No TypeScript/JavaScript files staged in packages/ui/src');
    process.exit(0);
  }
  
  console.log(`🔍 Checking ${stagedFiles.length} staged files for hardcoded values...\n`);
  
  let totalIssues = 0;
  const allIssues = [];
  
  stagedFiles.forEach(file => {
    const issues = checkFile(file);
    if (issues.length > 0) {
      totalIssues += issues.length;
      allIssues.push(...issues);
    }
  });
  
  if (totalIssues === 0) {
    console.log('✅ No hardcoded values detected in staged files');
    process.exit(0);
  }
  
  // Report issues
  console.log(`❌ Found ${totalIssues} hardcoded values in staged files:\n`);
  
  allIssues.forEach(issue => {
    console.log(`   ${issue.file}:${issue.line}:${issue.column}`);
    console.log(`   └─ ${issue.message}: "${issue.value}"`);
  });
  
  console.log('\n💡 How to fix:');
  console.log('   1. Use semantic tokens: bg-[var(--hive-background-primary)]');
  console.log('   2. Use spacing tokens: p-4 instead of p-[16px]');
  console.log('   3. Auto-fix: node migrate-tokens.js packages/ui/src');
  console.log('\n📖 Reference: packages/tokens/src/colors-prd-aligned.ts\n');
  
  process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { checkFile, getStagedFiles };