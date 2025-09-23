#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const stepsDir = '/Users/laneyfraass/hive_ui/apps/web/src/app/onboarding/components/steps';

// Fix common issues in all step files
const files = readdirSync(stepsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = join(stepsDir, file);
  let content = readFileSync(filePath, 'utf-8');
  let modified = false;

  // Fix AnimatePresence import
  if (content.includes('AnimatePresence') && !content.includes('AnimatePresence } from "framer-motion"')) {
    content = content.replace(
      /import \{ motion[^}]*\} from ["']framer-motion["'];?/,
      (match) => {
        if (match.includes('AnimatePresence')) return match;
        return match.replace('} from', ', AnimatePresence } from');
      }
    );
    modified = true;
  }

  // Fix event.target.value issues - need to cast
  content = content.replace(
    /onChange=\{[^}]*e\.target\.value/g,
    (match) => {
      return match.replace('e.target.value', '(e.target as HTMLInputElement).value');
    }
  );

  // Fix variant issues
  content = content.replace(/variant=["']premium["']/g, 'variant="brand"');
  content = content.replace(/variant=\{["']premium["']\}/g, 'variant="brand"');
  content = content.replace(/variant=["']selected["']/g, 'variant="brand"');
  content = content.replace(/variant=["']online["']/g, 'variant="brand"');
  content = content.replace(/variant=["']error["']/g, 'variant="destructive"');

  // Fix Card variant issues (selected and online are not valid)
  content = content.replace(
    /variant=\{[^}]*\? ["']selected["'] : ["']elevated["']\}/g,
    'variant={$1 ? "brand" : "elevated"}'
  );
  content = content.replace(
    /variant=\{[^}]*\? ["']online["'] : ["']elevated["']\}/g,
    'variant={$1 ? "brand" : "elevated"}'
  );

  if (content.includes('e.target.value') || modified) {
    writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  }
}

console.log('Done!');