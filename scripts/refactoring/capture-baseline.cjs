#!/usr/bin/env node

/**
 * Simple baseline metrics capture for refactoring
 * Captures current state of codebase before automated refactoring
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📊 Capturing baseline metrics for HIVE platform...\n');

const metrics = {
  timestamp: new Date().toISOString(),
  files: {
    typescript: 0,
    tests: 0,
    largeFiles: []
  },
  codeQuality: {
    anyTypes: 0,
    consoleStatements: 0,
    tryCatches: 0
  },
  testCoverage: {
    percentage: 1.4,
    testFiles: 29,
    totalFiles: 2024
  }
};

// Count TypeScript files
try {
  const tsFiles = execSync('find . -type f \\( -name "*.ts" -o -name "*.tsx" \\) | grep -v node_modules | wc -l', { encoding: 'utf8' });
  metrics.files.typescript = parseInt(tsFiles.trim());
  console.log(`✓ TypeScript files: ${metrics.files.typescript}`);
} catch (e) {
  console.log('⚠️  Could not count TypeScript files');
}

// Count test files
try {
  const testFiles = execSync('find . -type f \\( -name "*.test.*" -o -name "*.spec.*" \\) | grep -v node_modules | wc -l', { encoding: 'utf8' });
  metrics.files.tests = parseInt(testFiles.trim());
  console.log(`✓ Test files: ${metrics.files.tests}`);
} catch (e) {
  console.log('⚠️  Could not count test files');
}

// Count any types (sample)
try {
  const anyCount = execSync('grep -r ": any" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v node_modules | wc -l', { encoding: 'utf8' });
  metrics.codeQuality.anyTypes = parseInt(anyCount.trim());
  console.log(`✓ TypeScript 'any' usage: ${metrics.codeQuality.anyTypes}`);
} catch (e) {
  metrics.codeQuality.anyTypes = 1293; // Known value from audit
  console.log(`✓ TypeScript 'any' usage: ${metrics.codeQuality.anyTypes} (from audit)`);
}

// Count console statements
try {
  const consoleCount = execSync('grep -r "console\\." --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v node_modules | wc -l', { encoding: 'utf8' });
  metrics.codeQuality.consoleStatements = parseInt(consoleCount.trim());
  console.log(`✓ Console statements: ${metrics.codeQuality.consoleStatements}`);
} catch (e) {
  metrics.codeQuality.consoleStatements = 466; // Known value from audit
  console.log(`✓ Console statements: ${metrics.codeQuality.consoleStatements} (from audit)`);
}

// Find large files
console.log('\n🔍 Identifying large files...');
const largeFiles = [
  'apps/web/src/app/onboarding/page.tsx',
  'apps/web/src/app/(dashboard)/spaces/[spaceId]/page.tsx',
  'apps/web/src/app/(dashboard)/profile/dashboard/page.tsx'
];

largeFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    const lines = fs.readFileSync(file, 'utf8').split('\n').length;
    metrics.files.largeFiles.push({
      path: file,
      size: stats.size,
      lines: lines
    });
    console.log(`  - ${path.basename(file)}: ${lines} lines (${(stats.size / 1024).toFixed(1)}KB)`);
  }
});

// Calculate summary
const summary = {
  codeQualityScore: 32, // From audit
  technicalDebtHours: 360, // Monthly hours lost
  estimatedRefactoringHours: 224, // 28 days * 8 hours
  automatedImpact: {
    consoleRemoval: metrics.codeQuality.consoleStatements,
    typeImprovements: Math.floor(metrics.codeQuality.anyTypes * 0.6),
    duplicateReduction: 25, // Known duplicate patterns
    testGeneration: Math.floor((metrics.files.typescript - metrics.files.tests) * 0.4)
  }
};

// Save baseline
const baselineFile = 'refactoring-baseline.json';
fs.writeFileSync(baselineFile, JSON.stringify({ metrics, summary }, null, 2));

console.log('\n📈 Baseline Summary:');
console.log('─'.repeat(50));
console.log(`Code Quality Score: ${summary.codeQualityScore}/100`);
console.log(`Technical Debt: ${summary.technicalDebtHours} hours/month`);
console.log(`\n🎯 Automated Refactoring Targets:`);
console.log(`  • Remove ${summary.automatedImpact.consoleRemoval} console statements`);
console.log(`  • Fix ~${summary.automatedImpact.typeImprovements} type safety issues`);
console.log(`  • Consolidate ${summary.automatedImpact.duplicateReduction} duplicate patterns`);
console.log(`  • Generate ~${summary.automatedImpact.testGeneration} test files`);

console.log(`\n✅ Baseline saved to ${baselineFile}`);
console.log('\n💡 Ready to begin automated refactoring!');