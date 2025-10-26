#!/usr/bin/env node
const requiredMajor = 20;
const v = process.versions.node || process.version;
const major = Number(v.split('.')[0].replace('v',''));
if (Number.isNaN(major) || major < requiredMajor || major >= 21) {
  console.error(`\n[Node version mismatch]\n- Detected: ${v}\n- Required: >=20 <21\n\nUse:\n  nvm use 20   # or: nvm install 20 && nvm use 20\n`);
  process.exit(1);
}
process.exit(0);

