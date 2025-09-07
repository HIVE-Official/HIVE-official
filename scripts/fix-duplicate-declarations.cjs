#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns to fix
const patterns = [
  // Remove duplicate router declarations
  {
    pattern: /const router = useRouter\(\);\s*\n\s*const _router = useRouter\(\);/g,
    replacement: 'const router = useRouter();'
  },
  // Fix duplicate destructuring with colon syntax errors
  {
    pattern: /_data:\s+\w+,\s+isLoading:\s+\w+,\s+error:\s+\w+,\s+refetch:\s+\w+:\s+__data:/g,
    replacement: 'data:'
  },
  {
    pattern: /_data:\s+(\w+):\s+__data:\s+\1/g,
    replacement: 'data: $1'
  },
  {
    pattern: /_user:\s+\w+,([^}]+):\s+__user:\s+\w+,/g,
    replacement: ''
  },
  // Fix simple duplicate variable patterns
  {
    pattern: /const\s+{\s*_(\w+),\s*\1\s*}/g,
    replacement: 'const { $1 }'
  },
  // Fix duplicate imports
  {
    pattern: /import\s+{\s*useRouter\s*}\s+from\s+['"]next\/navigation['"];\s*\n\s*import\s+{\s*useRouter\s+as\s+_useRouter\s*}\s+from\s+['"]next\/navigation['"];/g,
    replacement: "import { useRouter } from 'next/navigation';"
  }
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  patterns.forEach(({ pattern, replacement }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
    return true;
  }
  
  return false;
}

// Get all TypeScript files
const files = glob.sync('apps/web/src/**/*.{ts,tsx}', {
  cwd: path.resolve(__dirname, '..'),
  absolute: true,
  ignore: [
    '**/node_modules/**',
    '**/.next/**',
    '**/dist/**',
    '**/*.test.*',
    '**/*.spec.*'
  ]
});

console.log(`Checking ${files.length} files for duplicate declarations...`);

let fixedCount = 0;
files.forEach(file => {
  if (fixFile(file)) {
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files with duplicate declarations.`);