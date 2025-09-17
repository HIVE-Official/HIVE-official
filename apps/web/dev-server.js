#!/usr/bin/env node

/**
 * Custom development server for HIVE web app
 * Bypasses Windows permission issues with Next.js tracing
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting HIVE Web App Development Server...\n');

// Ensure .next directory exists but no trace file
const nextDir = path.join(__dirname, '.next');
if (!fs.existsSync(nextDir)) {
  fs.mkdirSync(nextDir, { recursive: true });
}

// Remove trace file if it exists and watch for it
const traceFile = path.join(nextDir, 'trace');
function removeTraceFile() {
  try {
    if (fs.existsSync(traceFile)) {
      fs.unlinkSync(traceFile);
      console.log('✅ Removed problematic trace file');
    }
  } catch (error) {
    // Ignore errors, file might be locked
  }
}

// Remove initially
removeTraceFile();

// Keep removing the trace file periodically during startup
const traceWatcher = setInterval(removeTraceFile, 100);
setTimeout(() => clearInterval(traceWatcher), 10000); // Stop after 10 seconds

// Start Next.js with custom configuration  
const env = {
  ...process.env,
  NEXT_TELEMETRY_DISABLED: '1',
  NODE_ENV: 'development',
  SKIP_ENV_VALIDATION: 'true',
  // Disable tracing completely
  NEXT_PRIVATE_DEBUG_CACHE: '1',
  NEXT_PRIVATE_LOCAL_WEBPACK: '1',
  NEXT_SKIP_TRACE: '1',
};

console.log('📡 Starting Next.js development server...');

const nextProcess = spawn('npx', ['next', 'dev', '--port', '3002'], {
  env,
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

nextProcess.on('error', (error) => {
  console.error('❌ Dev server error:', error);
  process.exit(1);
});

nextProcess.on('exit', (code) => {
  console.log(`\n📡 Dev server exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down dev server...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Terminating dev server...');
  nextProcess.kill('SIGTERM');
});