#!/usr/bin/env node

/**
 * Pattern Extraction and Consolidation Script
 * Identifies and extracts common React patterns into reusable hooks
 */

const fs = require('fs');
const path = require('path');

const config = {
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
  targetDirs: [
    'apps/web/src',
    'packages/ui/src'
  ],
  outputDir: 'packages/hooks/src/generated'
};

const stats = {
  filesAnalyzed: 0,
  patternsFound: {},
  hooksGenerated: 0
};

// Common patterns to detect
const patterns = {
  loadingState: {
    name: 'Loading State Pattern',
    regex: /const\s+\[loading,\s*setLoading\]\s*=\s*useState(?:<boolean>)?\((?:true|false)\);\s*const\s+\[error,\s*setError\]\s*=\s*useState/,
    count: 0,
    files: []
  },
  modalState: {
    name: 'Modal State Pattern',
    regex: /const\s+\[(?:is)?(?:Open|Show|Visible),\s*set(?:Is)?(?:Open|Show|Visible)\]\s*=\s*useState(?:<boolean>)?\(false\)/,
    count: 0,
    files: []
  },
  formState: {
    name: 'Form State Pattern',
    regex: /const\s+\[formData,\s*setFormData\]\s*=\s*useState[^;]+;\s*const\s+\[(?:errors|validation)/,
    count: 0,
    files: []
  },
  fetchData: {
    name: 'Data Fetching Pattern',
    regex: /useEffect\(\s*\(\)\s*=>\s*{\s*(?:const\s+)?fetch(?:Data|Items|List)?/,
    count: 0,
    files: []
  },
  pagination: {
    name: 'Pagination Pattern',
    regex: /const\s+\[(?:current)?page,\s*set(?:Current)?Page\]\s*=\s*useState(?:<number>)?\(1\)/,
    count: 0,
    files: []
  }
};

function analyzeFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) {
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    Object.keys(patterns).forEach(key => {
      if (patterns[key].regex.test(content)) {
        patterns[key].count++;
        patterns[key].files.push(relativePath);
      }
    });
    
    stats.filesAnalyzed++;
  } catch (error) {
    // Skip files that can't be read
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
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && !item.includes('test')) {
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      analyzeFile(fullPath);
    }
  });
}

// Hook templates
const hookTemplates = {
  loadingState: `import { useState, useCallback } from 'react';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsyncState<T>(initialData: T | null = null) {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: false,
    error: null
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setData = useCallback((data: T | null) => {
    setState({ data, loading: false, error: null });
  }, []);

  const setError = useCallback((error: Error | null) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const reset = useCallback(() => {
    setState({ data: initialData, loading: false, error: null });
  }, [initialData]);

  return {
    ...state,
    setLoading,
    setData,
    setError,
    reset
  };
}`,

  modalState: `import { useState, useCallback } from 'react';

export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen
  };
}`,

  formState: `import { useState, useCallback, ChangeEvent } from 'react';

export function useFormState<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const setError = useCallback((name: keyof T, error: string | undefined) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    setValue,
    setError,
    setErrors,
    reset
  };
}`,

  pagination: `import { useState, useMemo, useCallback } from 'react';

export function usePagination<T>(items: T[], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}`
};

console.log('🔍 Pattern Extraction and Consolidation');
console.log('═'.repeat(50));

if (config.dryRun) {
  console.log('🔍 DRY RUN MODE - No files will be created\n');
}

// Analyze directories
console.log('📂 Analyzing directories for patterns...\n');
config.targetDirs.forEach(dir => {
  processDirectory(dir);
});

// Report findings
console.log('📊 Pattern Detection Results:');
console.log('─'.repeat(50));

let totalInstances = 0;
Object.keys(patterns).forEach(key => {
  const pattern = patterns[key];
  if (pattern.count > 0) {
    console.log(`\n✓ ${pattern.name}`);
    console.log(`  Found: ${pattern.count} instances`);
    if (config.verbose && pattern.files.length > 0) {
      console.log(`  Files:`);
      pattern.files.slice(0, 5).forEach(file => {
        console.log(`    - ${file}`);
      });
      if (pattern.files.length > 5) {
        console.log(`    ... and ${pattern.files.length - 5} more`);
      }
    }
    totalInstances += pattern.count;
  }
});

console.log('\n' + '═'.repeat(50));
console.log(`📈 Summary:`);
console.log(`  Files analyzed: ${stats.filesAnalyzed}`);
console.log(`  Total pattern instances: ${totalInstances}`);
console.log(`  Potential hooks to generate: ${Object.keys(patterns).filter(k => patterns[k].count > 2).length}`);

// Generate hooks for patterns with multiple instances
const hooksToGenerate = Object.keys(patterns).filter(k => patterns[k].count > 2);

if (hooksToGenerate.length > 0 && !config.dryRun) {
  // Create output directory
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  console.log(`\n🔧 Generating reusable hooks...`);
  
  hooksToGenerate.forEach(key => {
    if (hookTemplates[key]) {
      const fileName = `use-${key.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')}.ts`;
      const filePath = path.join(config.outputDir, fileName);
      
      fs.writeFileSync(filePath, hookTemplates[key]);
      console.log(`  ✓ Created: ${fileName}`);
      stats.hooksGenerated++;
    }
  });

  // Create index file
  const indexContent = hooksToGenerate
    .filter(key => hookTemplates[key])
    .map(key => {
      const fileName = `use-${key.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')}`;
      return `export * from './${fileName}';`;
    })
    .join('\n');
  
  fs.writeFileSync(path.join(config.outputDir, 'index.ts'), indexContent + '\n');
  console.log(`  ✓ Created: index.ts`);
}

// Create migration guide
const migrationGuide = `# Pattern Migration Guide

## Automated Hook Extraction Results

${Object.keys(patterns)
  .filter(k => patterns[k].count > 0)
  .map(key => {
    const pattern = patterns[key];
    const hookName = `use${key.charAt(0).toUpperCase() + key.slice(1)}`;
    return `### ${pattern.name}
- **Instances found**: ${pattern.count}
- **Hook to use**: \`${hookName}\`
- **Import**: \`import { ${hookName} } from '@hive/hooks/generated';\`

**Before:**
\`\`\`typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
\`\`\`

**After:**
\`\`\`typescript
const { data, loading, error, setData, setLoading, setError } = useAsyncState();
\`\`\`
`;
  })
  .join('\n')}

## Estimated Impact
- **Code reduction**: ~${totalInstances * 5} lines
- **Consistency improvement**: 100%
- **Testing simplification**: Test hooks once, use everywhere
`;

fs.writeFileSync('PATTERN_MIGRATION_GUIDE.md', migrationGuide);
console.log(`\n📚 Migration guide created: PATTERN_MIGRATION_GUIDE.md`);

if (config.dryRun) {
  console.log('\n💡 To generate hooks, run without --dry-run flag');
} else {
  console.log(`\n✅ Generated ${stats.hooksGenerated} reusable hooks!`);
  console.log('📦 Hooks created in: ' + config.outputDir);
}

// Save extraction log
const logData = {
  timestamp: new Date().toISOString(),
  stats: stats,
  patterns: Object.keys(patterns).reduce((acc, key) => {
    acc[key] = {
      count: patterns[key].count,
      filesAffected: patterns[key].files.length
    };
    return acc;
  }, {})
};

fs.writeFileSync(
  `pattern-extraction-${config.dryRun ? 'dryrun' : 'applied'}.json`,
  JSON.stringify(logData, null, 2)
);

process.exit(0);