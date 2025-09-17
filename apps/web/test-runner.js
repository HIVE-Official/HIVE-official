#!/usr/bin/env node

const { execSync } = require('child_process');

const commands = {
  auth: 'npx playwright test auth-flow.spec.ts',
  onboarding: 'npx playwright test onboarding-flow.spec.ts', 
  smoke: 'npx playwright test smoke-tests.spec.ts',
  all: 'npx playwright test',
  ui: 'npx playwright test --ui',
  headed: 'npx playwright test --headed',
  debug: 'npx playwright test --debug',
  mobile: 'npx playwright test --project="Mobile Chrome" --project="Mobile Safari"',
  cross: 'npx playwright test --project=chromium --project=firefox --project=webkit',
  report: 'npx playwright show-report'
};

function showHelp() {
  console.log(`
HIVE E2E Test Runner

Usage: node test-runner.js [command]

Commands:
  auth        - Run authentication flow tests
  onboarding  - Run onboarding flow tests  
  smoke       - Run smoke tests (critical paths)
  all         - Run all E2E tests
  ui          - Run tests with interactive UI
  headed      - Run tests with browser window visible
  debug       - Run tests with debugging enabled
  mobile      - Run tests on mobile devices only
  cross       - Run tests across all browsers
  report      - Show HTML test report

Examples:
  node test-runner.js auth
  node test-runner.js ui
  node test-runner.js smoke --headed
`);
}

function runCommand(cmd, args = []) {
  try {
    console.log(`🎭 Running: ${cmd} ${args.join(' ')}`);
    execSync(`${cmd} ${args.join(' ')}`, {
      stdio: 'inherit',
      cwd: process.cwd()
    });
  } catch (error) {
    console.error(`❌ Command failed with exit code ${error.status}`);
    process.exit(error.status || 1);
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    return;
  }

  const command = args[0];
  const extraArgs = args.slice(1);

  if (!commands[command]) {
    console.error(`❌ Unknown command: ${command}`);
    console.log('Run "node test-runner.js --help" for available commands');
    process.exit(1);
  }

  // Special handling for report command
  if (command === 'report') {
    runCommand(commands[command], extraArgs);
    return;
  }

  // Check if dev server needs to be started
  console.log('🚀 Starting HIVE E2E tests...');
  
  // Run the test command
  runCommand(commands[command], extraArgs);
}

if (require.main === module) {
  main();
}