#!/usr/bin/env tsx

// Generate CSS variables from TypeScript design tokens
// This ensures single source of truth

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateCompleteCSS } from '../src/css-variables-generator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputPath = join(__dirname, '../hive-tokens-generated.css');
const sourceOutputPath = join(__dirname, '../src/hive-tokens-generated.css');

try {
  const css = generateCompleteCSS();

  writeFileSync(outputPath, css, 'utf-8');
  writeFileSync(sourceOutputPath, css, 'utf-8');

  console.log('✅ Generated CSS variables from TypeScript tokens');
  console.log(`📄 Output: ${outputPath}`);
  console.log(`📄 Mirrored: ${sourceOutputPath}`);
  console.log(`📊 Generated ${css.split('\n').length} lines of CSS`);
} catch (error) {
  console.error('❌ Failed to generate CSS:', error);
  process.exit(1);
}
