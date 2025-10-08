#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Change to apps/web directory
const webDir = path.join(__dirname, '..', 'apps', 'web');
process.chdir(webDir);

console.log('🔧 Running ESLint with --fix in apps/web...\n');

try {
  // Run eslint with --fix
  const output = execSync('npx eslint . --fix --max-warnings 1000', {
    encoding: 'utf8',
    stdio: 'pipe',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' }
  });

  console.log(output);

  // Count warnings after fix
  console.log('\n📊 Counting remaining warnings...\n');
  const countOutput = execSync('npx eslint . --max-warnings 1000 2>&1 || true', {
    encoding: 'utf8',
    stdio: 'pipe',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' }
  });

  const warningMatch = countOutput.match(/(\d+)\s+problems?\s+\(0 errors, (\d+) warnings?\)/);
  if (warningMatch) {
    const warnings = parseInt(warningMatch[2], 10);
    console.log(`✅ Remaining warnings: ${warnings}`);

    if (warnings > 200) {
      console.log(`⚠️  Still exceeds max of 200 warnings by ${warnings - 200}`);
    } else {
      console.log(`✨ Within acceptable limit!`);
    }
  } else {
    console.log(countOutput);
  }

} catch (error) {
  console.error('Error running eslint:', error.message);
  if (error.stdout) console.log(error.stdout);
  if (error.stderr) console.error(error.stderr);
  process.exit(1);
}
