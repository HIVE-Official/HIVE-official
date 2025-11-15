#!/usr/bin/env node
/* eslint-env node */
// Lightweight cache cleaner for Storybook/Vite/Turbo across the monorepo.
const fs = require('fs');
const path = require('path');

const here = (...p) => path.resolve(process.cwd(), ...p);
const rm = (p) => {
  try {
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true });
      console.log(`[clean] removed ${p}`);
    }
  } catch (e) {
    console.warn(`[clean] failed to remove ${p}:`, e?.message || e);
  }
};

const targets = [
  // Root-level caches
  here('.turbo'),
  here('node_modules/.cache/storybook'),
  here('node_modules/.vite'),
  here('storybook-static'),

  // UI package caches / outputs
  here('packages/ui/node_modules/.cache/storybook'),
  here('packages/ui/node_modules/.vite'),
  here('packages/ui/storybook-static'),

  // App-level Vite/Next caches (best-effort, may not exist)
  here('apps/web/node_modules/.vite'),
  here('apps/web/.next/cache'),
  here('apps/e2e/node_modules/.vite'),
];

targets.forEach(rm);
console.log('[clean] cache clear complete');

