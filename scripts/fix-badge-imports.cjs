#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Find all files with duplicate Badge imports
const files = glob.sync('apps/web/src/**/*.{ts,tsx}', {
  cwd: path.resolve(__dirname, '..'),
  absolute: true
});

let fixedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // Check if file imports Badge from both @hive/ui and lucide-react
  const hasHiveUIBadge = content.includes("import { Badge") || content.includes("import {Badge") ||
                          content.includes(", Badge") || content.includes(",Badge");
  const hasLucideBadge = /import\s*{[^}]*Badge[^}]*}\s*from\s*['"]lucide-react['"]/.test(content);
  
  if (hasHiveUIBadge && hasLucideBadge) {
    // Remove Badge from lucide-react imports
    content = content.replace(
      /import\s*{([^}]*)}\s*from\s*['"]lucide-react['"]/g,
      (match, imports) => {
        const importList = imports.split(',').map(s => s.trim());
        const filtered = importList.filter(imp => imp !== 'Badge');
        if (filtered.length === 0) {
          return ''; // Remove entire import if empty
        }
        return `import {${filtered.join(', ')}} from 'lucide-react'`;
      }
    );
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${path.relative(process.cwd(), file)}`);
    fixedCount++;
  }
});

console.log(`\n✨ Fixed ${fixedCount} files with duplicate Badge imports`);