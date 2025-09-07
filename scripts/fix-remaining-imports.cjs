#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Import mapping for common undefined components
const COMPONENT_IMPORTS = {
  'Button': "import { Button } from '@hive/ui';",
  'Card': "import { Card } from '@hive/ui';", 
  'Badge': "import { Badge } from '@hive/ui';",
  'PageContainer': "import { PageContainer } from '@hive/ui';",
  'ErrorBoundary': "import { ErrorBoundary } from 'react-error-boundary';",
  'Typography': "import { Typography } from '@hive/ui';",
  'motion': "import { motion } from 'framer-motion';",
  'useRouter': "import { useRouter } from 'next/navigation';",
  'useSession': "import { useSession } from '../../../hooks/use-session';",
  'FeedDisplay': "import { FeedDisplay } from '@/components/social/feed-display';"
};

// Files that need specific hook imports
const HOOK_IMPORTS = {
  'useUnifiedAuth': "import { useUnifiedAuth } from '@hive/ui';"
};

function addMissingImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Track what imports we need to add
    const neededImports = new Set();
    const existingImports = new Set();
    
    // Find existing imports
    lines.forEach(line => {
      if (line.trim().startsWith('import')) {
        Object.keys(COMPONENT_IMPORTS).forEach(component => {
          if (line.includes(component)) {
            existingImports.add(component);
          }
        });
        Object.keys(HOOK_IMPORTS).forEach(hook => {
          if (line.includes(hook)) {
            existingImports.add(hook);
          }
        });
      }
    });
    
    // Find undefined components/hooks that need imports
    const contentText = content.toLowerCase();
    Object.keys(COMPONENT_IMPORTS).forEach(component => {
      const componentRegex = new RegExp(`[^a-zA-Z]${component.toLowerCase()}[^a-zA-Z]`, 'g');
      if (contentText.match(componentRegex) && !existingImports.has(component)) {
        neededImports.add(component);
      }
    });
    
    Object.keys(HOOK_IMPORTS).forEach(hook => {
      const hookRegex = new RegExp(`[^a-zA-Z]${hook.toLowerCase()}[^a-zA-Z]`, 'g');  
      if (contentText.match(hookRegex) && !existingImports.has(hook)) {
        neededImports.add(hook);
      }
    });
    
    // Add missing imports at the top after existing imports
    if (neededImports.size > 0) {
      let hasChanges = false;
      
      // Find the last import line
      let lastImportIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('import') && !lines[i].includes('type')) {
          lastImportIndex = i;
        }
      }
      
      // Add missing imports after the last import line
      const importLines = [];
      neededImports.forEach(component => {
        if (COMPONENT_IMPORTS[component]) {
          importLines.push(COMPONENT_IMPORTS[component]);
          hasChanges = true;
        } else if (HOOK_IMPORTS[component]) {
          importLines.push(HOOK_IMPORTS[component]);
          hasChanges = true;
        }
      });
      
      if (hasChanges && lastImportIndex >= 0) {
        lines.splice(lastImportIndex + 1, 0, ...importLines);
        fs.writeFileSync(filePath, lines.join('\n'));
        return true;
      }
    }
    
    return false;
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Process files with known issues
const problematicFiles = [
  'apps/web/src/app/(dashboard)/components/dashboard-main.tsx',
  'apps/web/src/app/(dashboard)/events/page.tsx'
];

let fixedCount = 0;

problematicFiles.forEach(filePath => {
  const fullPath = `/Users/laneyfraass/hive_ui/${filePath}`;
  if (fs.existsSync(fullPath)) {
    if (addMissingImports(fullPath)) {
      console.log(`Fixed imports in: ${filePath}`);
      fixedCount++;
    }
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});

console.log(`\nFixed imports in ${fixedCount} files`);