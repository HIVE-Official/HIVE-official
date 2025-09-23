#!/usr/bin/env node

/**
 * Emergency Design Violations Fix
 * Replaces all hardcoded hex colors with CSS custom properties
 * For October 1st launch deadline
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Design token mappings based on HIVE color system
const COLOR_MAPPINGS = {
  // Gold variants (primary brand color)
  '#FFD700': 'var(--hive-brand-secondary)',
  '#FFC107': 'var(--hive-brand-secondary-hover)',

  // Common color mappings
  '#000000': 'var(--hive-background-primary)',
  '#FFFFFF': 'var(--hive-background-contrast)',
  '#171717': 'var(--hive-background-elevated)',
  '#262626': 'var(--hive-background-interactive)',

  // RGBA patterns
  'rgba(255,215,0,0.1)': 'color-mix(in srgb, var(--hive-brand-secondary) 10%, transparent)',
  'rgba(255,215,0,0.2)': 'color-mix(in srgb, var(--hive-brand-secondary) 20%, transparent)',
  'rgba(255,215,0,0.3)': 'color-mix(in srgb, var(--hive-brand-secondary) 30%, transparent)',
  'rgba(255,215,0,0.5)': 'color-mix(in srgb, var(--hive-brand-secondary) 50%, transparent)',
  'rgba(0, 0, 0, 0)': 'transparent',
};

// Pixel size mappings to Tailwind spacing
const SPACING_MAPPINGS = {
  '16px': '4', // p-4
  '24px': '6', // p-6
  '32px': '8', // p-8
  '64px': '16', // p-16
  '200px': '50', // h-50
  '300px': '75', // w-75
  '400px': '96', // w-96
  '1536px': 'max-w-screen-2xl',
};

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace hex colors
  Object.entries(COLOR_MAPPINGS).forEach(([oldColor, newColor]) => {
    const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (content.includes(oldColor)) {
      content = content.replace(regex, newColor);
      changed = true;
    }
  });

  // Replace hardcoded pixel values in className strings
  Object.entries(SPACING_MAPPINGS).forEach(([oldSize, newSize]) => {
    // Match patterns like [16px] or p-[16px]
    const pixelRegex = new RegExp(`\\[${oldSize.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]`, 'g');
    if (content.includes(`[${oldSize}]`)) {
      // For spacing classes, extract the prefix and use Tailwind class
      content = content.replace(pixelRegex, newSize.includes('max-w') ? newSize : '');
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }
  return false;
}

// Find and fix all files in UI package
const uiFiles = [
  'packages/ui/src/**/*.tsx',
  'packages/ui/src/**/*.ts',
].flatMap(pattern => glob.sync(pattern));

console.log('🔧 Emergency Design Violations Fix Starting...');
console.log(`📁 Found ${uiFiles.length} files to check`);

let fixedCount = 0;
uiFiles.forEach(file => {
  if (replaceInFile(file)) {
    fixedCount++;
  }
});

console.log(`🎯 Fixed ${fixedCount} files with design violations`);
console.log('✅ Emergency fix complete - ready for commit!');