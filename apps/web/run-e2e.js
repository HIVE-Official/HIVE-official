#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Run a specific test file
const testFile = process.argv[2] || 'entry-auth-onboarding-complete.spec.ts';
const testPath = path.join(__dirname, 'src', 'test', 'e2e', testFile);

console.log(`🎭 Running E2E test: ${testFile}`);

const playwright = spawn('npx', [
  'playwright',
  'test',
  testPath,
  '--config=playwright.config.ts',
  '--project=chromium',
  '--reporter=list',
  ...(process.argv.includes('--headed') ? ['--headed'] : [])
], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

playwright.on('close', (code) => {
  console.log(`✅ Test completed with code ${code}`);
  process.exit(code);
});

playwright.on('error', (err) => {
  console.error('❌ Failed to start test:', err);
  process.exit(1);
});