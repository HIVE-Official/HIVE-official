const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Analyzing ESLint violations...\n');

// Run ESLint and capture JSON output
try {
  const output = execSync('NODE_OPTIONS="--max-old-space-size=4096" npx eslint . --format=json --max-warnings 50000', {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 50 // 50MB buffer
  });

  const results = JSON.parse(output);

  // Aggregate violations by rule
  const violations = {};
  let totalErrors = 0;
  let totalWarnings = 0;
  let filesWithIssues = 0;

  results.forEach(file => {
    if (file.messages && file.messages.length > 0) {
      filesWithIssues++;
      file.messages.forEach(msg => {
        const rule = msg.ruleId || 'parsing-error';
        if (!violations[rule]) {
          violations[rule] = { count: 0, severity: msg.severity === 2 ? 'error' : 'warning' };
        }
        violations[rule].count++;

        if (msg.severity === 2) totalErrors++;
        else totalWarnings++;
      });
    }
  });

  // Sort violations by count
  const sortedViolations = Object.entries(violations)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 20); // Top 20 issues

  console.log('📊 ESLint Violation Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Total Errors: ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);
  console.log(`Files with Issues: ${filesWithIssues}`);
  console.log(`\n📈 Top 20 Violation Types:`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  sortedViolations.forEach(([rule, data], index) => {
    const emoji = data.severity === 'error' ? '❌' : '⚠️';
    console.log(`${(index + 1).toString().padStart(2)}. ${emoji} ${rule.padEnd(45)} ${data.count.toString().padStart(5)} violations`);
  });

  // Identify priority fixes
  console.log('\n🎯 Priority Fix Categories:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const categories = {
    'TypeScript Issues': ['@typescript-eslint/no-explicit-any', '@typescript-eslint/no-unsafe-', '@typescript-eslint/ban-ts-comment'],
    'Unused Code': ['@typescript-eslint/no-unused-vars', 'no-unused-vars'],
    'React Issues': ['react-hooks/exhaustive-deps', 'react-hooks/rules-of-hooks', 'react/display-name'],
    'Code Quality': ['no-console', 'prefer-const', 'no-empty', 'no-debugger']
  };

  Object.entries(categories).forEach(([category, rules]) => {
    const count = rules.reduce((sum, rule) => {
      return sum + (violations[rule]?.count || 0);
    }, 0);
    if (count > 0) {
      console.log(`• ${category}: ${count} violations`);
    }
  });

  // Save detailed report
  const report = {
    summary: {
      totalErrors,
      totalWarnings,
      filesWithIssues,
      totalViolations: totalErrors + totalWarnings
    },
    topViolations: sortedViolations.map(([rule, data]) => ({
      rule,
      count: data.count,
      severity: data.severity
    })),
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync('eslint-report.json', JSON.stringify(report, null, 2));
  console.log('\n✅ Detailed report saved to eslint-report.json');

} catch (error) {
  // ESLint exits with non-zero when there are violations
  if (error.stdout) {
    // Process the output even if ESLint "failed"
    const output = error.stdout.toString();
    try {
      const results = JSON.parse(output);

      // Same processing as above
      const violations = {};
      let totalErrors = 0;
      let totalWarnings = 0;
      let filesWithIssues = 0;

      results.forEach(file => {
        if (file.messages && file.messages.length > 0) {
          filesWithIssues++;
          file.messages.forEach(msg => {
            const rule = msg.ruleId || 'parsing-error';
            if (!violations[rule]) {
              violations[rule] = { count: 0, severity: msg.severity === 2 ? 'error' : 'warning' };
            }
            violations[rule].count++;

            if (msg.severity === 2) totalErrors++;
            else totalWarnings++;
          });
        }
      });

      const sortedViolations = Object.entries(violations)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, 20);

      console.log('📊 ESLint Violation Summary');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`Total Errors: ${totalErrors}`);
      console.log(`Total Warnings: ${totalWarnings}`);
      console.log(`Files with Issues: ${filesWithIssues}`);
      console.log(`\n📈 Top 20 Violation Types:`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      sortedViolations.forEach(([rule, data], index) => {
        const emoji = data.severity === 'error' ? '❌' : '⚠️';
        console.log(`${(index + 1).toString().padStart(2)}. ${emoji} ${rule.padEnd(45)} ${data.count.toString().padStart(5)} violations`);
      });

    } catch (parseError) {
      console.error('Failed to parse ESLint output:', parseError.message);
    }
  } else {
    console.error('Error running ESLint:', error.message);
  }
}