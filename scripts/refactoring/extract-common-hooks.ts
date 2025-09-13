#!/usr/bin/env ts-node

/**
 * Common Hooks Extraction Script
 * Identifies duplicate React hook patterns and generates standardized versions
 * Creates new hook files with proper TypeScript types
 */

import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import * as parser from '@typescript-eslint/parser';
import { ESLintUtils } from '@typescript-eslint/utils';

interface HookPattern {
  name: string;
  pattern: RegExp;
  instances: Array<{
    file: string;
    line: number;
    code: string;
  }>;
  generatedHook?: string;
}

interface Config {
  targetDir: string;
  hooksOutputDir: string;
  minOccurrences: number;
  dryRun: boolean;
  verbose: boolean;
}

const config: Config = {
  targetDir: process.argv[2] || 'apps/web/src',
  hooksOutputDir: 'packages/hooks/src/generated',
  minOccurrences: 3, // Only extract patterns that occur 3+ times
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose')
};

/**
 * Common hook patterns to detect and extract
 */
const hookPatterns: HookPattern[] = [
  {
    name: 'useAsyncData',
    pattern: /const\s+\[loading,\s*setLoading\]\s*=\s*useState\(true\)[\s\S]*?const\s+\[error,\s*setError\]\s*=\s*useState[\s\S]*?const\s+\[data,\s*setData\]\s*=\s*useState/g,
    instances: [],
    generatedHook: `import { useState, useEffect, useCallback } from 'react';

export interface UseAsyncDataOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  retryCount?: number;
  retryDelay?: number;
}

export interface UseAsyncDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  setData: (data: T | null) => void;
  reset: () => void;
}

/**
 * Hook for managing async data fetching with loading and error states
 * Eliminates boilerplate for data fetching patterns
 */
export function useAsyncData<T>(
  fetchFn: () => Promise<T>,
  dependencies: React.DependencyList = [],
  options: UseAsyncDataOptions<T> = {}
): UseAsyncDataResult<T> {
  const {
    initialData = null,
    onSuccess,
    onError,
    retryCount = 0,
    retryDelay = 1000
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryAttempt, setRetryAttempt] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchFn();
      setData(result);
      setRetryAttempt(0);
      
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      
      // Retry logic
      if (retryAttempt < retryCount) {
        setTimeout(() => {
          setRetryAttempt(prev => prev + 1);
          fetchData();
        }, retryDelay * Math.pow(2, retryAttempt)); // Exponential backoff
      } else if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn, retryAttempt, retryCount, retryDelay, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setLoading(false);
    setRetryAttempt(0);
  }, [initialData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData,
    reset
  };
}
`
  },
  {
    name: 'useFormState',
    pattern: /const\s+\[formData,\s*setFormData\]\s*=\s*useState[\s\S]*?const\s+\[errors,\s*setErrors\]\s*=\s*useState[\s\S]*?const\s+\[isSubmitting,\s*setIsSubmitting\]\s*=\s*useState/g,
    instances: [],
    generatedHook: `import { useState, useCallback, useMemo } from 'react';

export interface UseFormStateOptions<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit?: (values: T) => Promise<void>;
}

export interface UseFormStateResult<T> {
  values: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setValues: (values: Partial<T>) => void;
  setError: (field: string, error: string) => void;
  clearErrors: () => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
}

/**
 * Hook for managing form state with validation and submission
 * Provides a consistent interface for all forms
 */
export function useFormState<T extends Record<string, any>>(
  options: UseFormStateOptions<T>
): UseFormStateResult<T> {
  const { initialValues, validate, onSubmit } = options;
  
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  const isValid = useMemo(() => {
    if (!validate) return true;
    const validationErrors = validate(values);
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValuesState(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Clear error for this field when it changes
    if (errors[field as string]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    }
  }, [errors]);

  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(prev => ({ ...prev, ...newValues }));
  }, []);

  const setError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validate if validation function provided
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
        // Reset form on successful submission
        reset();
      } catch (error) {
        console.error('Form submission error:', error);
        // You might want to set a general error here
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValuesState(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    isValid,
    setValue,
    setValues,
    setError,
    clearErrors,
    handleSubmit,
    reset
  };
}
`
  },
  {
    name: 'useDebounce',
    pattern: /useEffect\(\(\)\s*=>\s*{\s*const\s+timer\s*=\s*setTimeout[\s\S]*?clearTimeout\(timer\)/g,
    instances: [],
    generatedHook: `import { useState, useEffect } from 'react';

/**
 * Hook that debounces a value
 * Useful for search inputs and other rate-limited operations
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook that debounces a callback function
 * Returns a debounced version of the callback
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500
): T {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = ((...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimer(newTimer);
  }) as T;

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return debouncedCallback;
}
`
  }
];

/**
 * Analyze a file for hook patterns
 */
function analyzeFile(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if not a React component file
    if (!content.includes('import React') && !content.includes('from \'react\'')) {
      return;
    }

    hookPatterns.forEach(hookPattern => {
      const matches = content.matchAll(hookPattern.pattern);
      
      for (const match of matches) {
        const lines = content.substring(0, match.index).split('\n');
        const lineNumber = lines.length;
        
        hookPattern.instances.push({
          file: path.relative(process.cwd(), filePath),
          line: lineNumber,
          code: match[0].substring(0, 200) + '...' // First 200 chars for context
        });
      }
    });
    
  } catch (error) {
    if (config.verbose) {
      console.error(`Error analyzing ${filePath}:`, error);
    }
  }
}

/**
 * Generate hook files for patterns with enough instances
 */
function generateHooks(): void {
  console.log('\\n📝 Generating Common Hooks');
  console.log('===========================\\n');

  hookPatterns.forEach(pattern => {
    if (pattern.instances.length >= config.minOccurrences) {
      console.log(`✅ ${pattern.name}: Found ${pattern.instances.length} instances`);
      
      if (config.verbose) {
        pattern.instances.slice(0, 5).forEach(instance => {
          console.log(`   - ${instance.file}:${instance.line}`);
        });
        if (pattern.instances.length > 5) {
          console.log(`   ... and ${pattern.instances.length - 5} more`);
        }
      }

      if (!config.dryRun && pattern.generatedHook) {
        const hookFileName = `${pattern.name}.ts`;
        const hookFilePath = path.join(config.hooksOutputDir, hookFileName);
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(config.hooksOutputDir)) {
          fs.mkdirSync(config.hooksOutputDir, { recursive: true });
        }
        
        // Write hook file
        fs.writeFileSync(hookFilePath, pattern.generatedHook, 'utf8');
        console.log(`   Generated: ${hookFilePath}`);
      }
    } else if (pattern.instances.length > 0) {
      console.log(`⚠️  ${pattern.name}: Only ${pattern.instances.length} instances (minimum: ${config.minOccurrences})`);
    }
  });
}

/**
 * Generate migration guide
 */
function generateMigrationGuide(): void {
  const guide = `# Hook Migration Guide

## Automated Hook Extraction Results

${hookPatterns.map(pattern => {
  if (pattern.instances.length >= config.minOccurrences) {
    return `### ${pattern.name}
- **Instances found**: ${pattern.instances.length}
- **Files affected**: 
${pattern.instances.slice(0, 10).map(i => `  - ${i.file}:${i.line}`).join('\\n')}
${pattern.instances.length > 10 ? `  ... and ${pattern.instances.length - 10} more files` : ''}

**Migration Example**:
\`\`\`typescript
// Before
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [data, setData] = useState(null);

useEffect(() => {
  fetchData().then(setData).catch(setError).finally(() => setLoading(false));
}, []);

// After
import { useAsyncData } from '@hive/hooks';

const { data, loading, error, refetch } = useAsyncData(
  () => fetchData(),
  []
);
\`\`\`
`;
  }
  return '';
}).filter(Boolean).join('\\n')}

## Migration Steps

1. Install the new hooks package:
   \`\`\`bash
   npm install @hive/hooks
   \`\`\`

2. Update imports in affected files:
   \`\`\`bash
   npm run refactor:migrate-hooks
   \`\`\`

3. Run tests to ensure functionality:
   \`\`\`bash
   npm test
   \`\`\`

## Benefits

- **Code Reduction**: ~${hookPatterns.reduce((acc, p) => acc + p.instances.length * 15, 0)} lines removed
- **Consistency**: All components now use the same patterns
- **Type Safety**: Full TypeScript support with generics
- **Testing**: Centralized testing for common patterns
`;

  if (!config.dryRun) {
    fs.writeFileSync('HOOK_MIGRATION_GUIDE.md', guide, 'utf8');
    console.log('\\n📖 Migration guide written to HOOK_MIGRATION_GUIDE.md');
  }
}

/**
 * Main execution
 */
function main(): void {
  console.log('🔍 Common Hooks Extraction Script');
  console.log('==================================');
  
  if (config.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be created\\n');
  }

  // Find all TypeScript/React files
  const files = glob.sync(`${config.targetDir}/**/*.{ts,tsx}`, {
    ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**']
  });

  console.log(`Analyzing ${files.length} files for hook patterns...\\n`);

  // Analyze each file
  files.forEach(file => analyzeFile(file));

  // Generate hooks for patterns with enough instances
  generateHooks();

  // Generate migration guide
  generateMigrationGuide();

  // Print summary
  console.log('\\n📊 Summary');
  console.log('==========');
  hookPatterns.forEach(pattern => {
    console.log(`${pattern.name}: ${pattern.instances.length} instances found`);
  });

  const totalInstances = hookPatterns.reduce((acc, p) => acc + p.instances.length, 0);
  const eligiblePatterns = hookPatterns.filter(p => p.instances.length >= config.minOccurrences);
  
  console.log(`\\nTotal duplicate patterns: ${totalInstances}`);
  console.log(`Hooks to generate: ${eligiblePatterns.length}`);
  console.log(`Estimated lines saved: ~${totalInstances * 15}`);
}

// Run the script
if (require.main === module) {
  main();
}