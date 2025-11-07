#!/usr/bin/env node
/* eslint-env node */
/* global __dirname, console */

const fs = require('fs');
const path = require('path');

const cacheDir = path.resolve(__dirname, '../node_modules/.cache/storybook');

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log(`[storybook] Cleared cache at ${cacheDir}`);
} else {
  console.log('[storybook] No cache directory to clear');
}
