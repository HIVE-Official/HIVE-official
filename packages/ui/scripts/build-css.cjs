#!/usr/bin/env node

/* eslint-env node */
/* global __dirname, process, console */

/**
 * Build HIVE UI CSS bundle via Tailwind + PostCSS so downstream apps
 * can import @hive/ui/styles.css without running Tailwind themselves.
 */
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

async function buildCss() {
  const inputPath = path.resolve(__dirname, '../src/styles.css');
  const outputPath = path.resolve(__dirname, '../dist/styles.css');
  const tokensInputPath = path.resolve(__dirname, '../src/tokens.css');
  const tokensOutputPath = path.resolve(__dirname, '../dist/tokens.css');

  const css = await fs.promises.readFile(inputPath, 'utf8');

  const result = await postcss([
    tailwindcss({
      config: path.resolve(__dirname, '../tailwind.config.ts'),
    }),
    autoprefixer,
  ])
    .process(css, {
      from: inputPath,
      to: outputPath,
      map: false,
    });

  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.promises.writeFile(outputPath, result.css, 'utf8');

  // Ensure downstream apps can resolve @import "./tokens.css";
  await fs.promises.copyFile(tokensInputPath, tokensOutputPath);

  console.log(`✅ Built HIVE UI CSS → ${path.relative(process.cwd(), outputPath)}`);
  console.log(`   Size: ${(result.css.length / 1024).toFixed(1)} kB`);
}

buildCss().catch((error) => {
  console.error('❌ Failed to build HIVE UI CSS');
  console.error(error);
  process.exit(1);
});
