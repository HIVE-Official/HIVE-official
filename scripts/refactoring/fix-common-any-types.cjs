#!/usr/bin/env node

/**
 * Automated TypeScript 'any' Type Fixer
 * Fixes common 'any' patterns with proper types
 */

const fs = require('fs');
const path = require('path');

const config = {
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
  targetDirs: [
    'apps/web/src',
    'apps/admin/src',
    'packages/ui/src'
  ]
};

const stats = {
  filesProcessed: 0,
  filesModified: 0,
  replacementsMade: 0,
  errors: []
};

// Common replacements with proper types
const replacements = [
  // React event handlers
  {
    pattern: /\(e(?:vent)?:\s*any\)/g,
    replacement: '(event: React.ChangeEvent<HTMLInputElement>)',
    context: 'onChange|handleChange'
  },
  {
    pattern: /\(e(?:vent)?:\s*any\)/g,
    replacement: '(event: React.MouseEvent<HTMLButtonElement>)',
    context: 'onClick|handleClick'
  },
  {
    pattern: /\(e(?:vent)?:\s*any\)/g,
    replacement: '(event: React.FormEvent<HTMLFormElement>)',
    context: 'onSubmit|handleSubmit'
  },
  
  // Common data types
  {
    pattern: /:\s*any\[\]/g,
    replacement: ': unknown[]',
    context: 'data|items|list|results'
  },
  {
    pattern: /useState<any>/g,
    replacement: 'useState<unknown>',
    context: null
  },
  {
    pattern: /:\s*any\s*=\s*{}/g,
    replacement: ': Record<string, unknown> = {}',
    context: null
  },
  
  // Error handling
  {
    pattern: /catch\s*\(\s*(?:error|err|e):\s*any\s*\)/g,
    replacement: 'catch (error: unknown)',
    context: null
  },
  {
    pattern: /\(error:\s*any\)/g,
    replacement: '(error: Error | unknown)',
    context: 'handleError|onError'
  },
  
  // API responses
  {
    pattern: /:\s*any\s*=\s*await\s+fetch/g,
    replacement: ': Response = await fetch',
    context: null
  },
  {
    pattern: /const\s+response:\s*any/g,
    replacement: 'const response: Response',
    context: null
  },
  {
    pattern: /const\s+data:\s*any/g,
    replacement: 'const data: unknown',
    context: null
  },
  
  // Props and children
  {
    pattern: /children:\s*any/g,
    replacement: 'children: React.ReactNode',
    context: null
  },
  {
    pattern: /props:\s*any/g,
    replacement: 'props: Record<string, unknown>',
    context: null
  },
  
  // User and auth types
  {
    pattern: /user:\s*any/g,
    replacement: 'user: { id: string; email: string; [key: string]: unknown }',
    context: null
  },
  {
    pattern: /session:\s*any/g,
    replacement: 'session: { user?: { id: string; email: string }; [key: string]: unknown }',
    context: null
  }
];

// Add import for types if needed
const typeImports = {
  '@hive/types': "import type { User, Space, Tool, Event, Post, ApiResponse } from '@hive/types';",
  'react': "import type { ReactNode, ChangeEvent, MouseEvent, FormEvent } from 'react';"
};

function processFile(filePath) {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) {
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let replacementCount = 0;
    
    // Skip test files and stories
    if (filePath.includes('.test.') || filePath.includes('.spec.') || filePath.includes('.stories.')) {
      return;
    }
    
    // Apply replacements
    replacements.forEach(({ pattern, replacement, context }) => {
      if (!context || content.includes(context)) {
        const matches = content.match(pattern);
        if (matches) {
          content = content.replace(pattern, replacement);
          replacementCount += matches.length;
        }
      }
    });
    
    // Add type imports if needed and not already present
    if (replacementCount > 0) {
      // Check if we need React types
      if (content.includes('React.ChangeEvent') || content.includes('React.MouseEvent')) {
        if (!content.includes("from 'react'") && !content.includes('from "react"')) {
          content = "import React from 'react';\n" + content;
        }
      }
      
      // Check if we need @hive/types
      if (content.includes('User |') || content.includes('Space |')) {
        if (!content.includes('@hive/types')) {
          const importStatement = typeImports['@hive/types'];
          // Add after first import or at top
          const firstImportIndex = content.indexOf('import ');
          if (firstImportIndex !== -1) {
            const endOfFirstImport = content.indexOf('\n', firstImportIndex);
            content = content.slice(0, endOfFirstImport + 1) + importStatement + '\n' + content.slice(endOfFirstImport + 1);
          } else {
            content = importStatement + '\n\n' + content;
          }
        }
      }
    }
    
    if (content !== originalContent) {
      if (!config.dryRun) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
      stats.filesModified++;
      stats.replacementsMade += replacementCount;
      
      if (config.verbose) {
        console.log(`  ✓ ${path.relative(process.cwd(), filePath)}: ${replacementCount} replacements`);
      }
    }
    
    stats.filesProcessed++;
  } catch (error) {
    stats.errors.push({ file: filePath, error: error.message });
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      processFile(fullPath);
    }
  });
}

console.log('🔧 TypeScript Any Type Fixer');
console.log('═'.repeat(50));

if (config.dryRun) {
  console.log('🔍 DRY RUN MODE - No files will be modified\n');
}

console.log('📂 Processing directories...\n');

// Process each target directory
config.targetDirs.forEach(dir => {
  processDirectory(dir);
});

// Print summary
console.log('\n' + '═'.repeat(50));
console.log('📊 Summary:');
console.log(`  Files processed: ${stats.filesProcessed}`);
console.log(`  Files modified: ${stats.filesModified}`);
console.log(`  Replacements made: ${stats.replacementsMade}`);

if (stats.errors.length > 0) {
  console.log(`\n⚠️  Errors encountered: ${stats.errors.length}`);
  stats.errors.slice(0, 5).forEach(err => {
    console.log(`  - ${err.file}: ${err.error}`);
  });
}

if (config.dryRun) {
  console.log('\n💡 To apply changes, run without --dry-run flag');
} else {
  console.log('\n✅ Common any types fixed successfully!');
  console.log('\n📋 Next steps:');
  console.log('  1. Run TypeScript compiler to check for errors: npx tsc --noEmit');
  console.log('  2. Fix any remaining complex any types manually');
  console.log('  3. Enable strict mode in tsconfig.json');
  
  // Create restore script
  const restoreScript = `#!/bin/bash
# Restore script - run this if type fixes cause issues
git checkout -- ${config.targetDirs.join(' ')}
echo "✅ Files restored to previous state"
`;
  
  fs.writeFileSync('.refactoring-restore-types.sh', restoreScript);
  console.log('\n💾 Restore script created: .refactoring-restore-types.sh');
}

// Save fix log
const logData = {
  timestamp: new Date().toISOString(),
  dryRun: config.dryRun,
  stats: stats
};

fs.writeFileSync(
  `type-fixes-${config.dryRun ? 'dryrun' : 'applied'}.json`,
  JSON.stringify(logData, null, 2)
);

process.exit(stats.errors.length > 0 ? 1 : 0);