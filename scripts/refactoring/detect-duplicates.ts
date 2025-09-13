#!/usr/bin/env ts-node

/**
 * Duplicate Code Detection and Consolidation Script
 * Identifies duplicate code patterns across the codebase and generates consolidated versions
 * Uses AST fingerprinting and similarity scoring
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { Project, SourceFile, Node, SyntaxKind } from 'ts-morph';
import * as glob from 'glob';
import chalk from 'chalk';

interface CodePattern {
  id: string;
  hash: string;
  pattern: string;
  category: 'component' | 'hook' | 'utility' | 'api-handler' | 'state-management';
  instances: Array<{
    file: string;
    line: number;
    code: string;
    variables: string[];
  }>;
  similarity: number;
  consolidationStrategy?: string;
}

interface DuplicateGroup {
  patterns: CodePattern[];
  totalInstances: number;
  filesAffected: string[];
  linesOfCode: number;
  savingsEstimate: number;
}

interface DetectionConfig {
  target: string;
  minSimilarity: number;
  minInstances: number;
  categories?: string[];
  outputDir: string;
  dryRun: boolean;
  verbose: boolean;
  autoFix: boolean;
}

const config: DetectionConfig = {
  target: process.argv.find(arg => arg.startsWith('--target='))?.split('=')[1] || '.',
  minSimilarity: parseInt(process.argv.find(arg => arg.startsWith('--similarity='))?.split('=')[1] || '85'),
  minInstances: parseInt(process.argv.find(arg => arg.startsWith('--min-instances='))?.split('=')[1] || '3'),
  categories: process.argv.find(arg => arg.startsWith('--categories='))?.split('=')[1]?.split(','),
  outputDir: process.argv.find(arg => arg.startsWith('--output='))?.split('=')[1] || 'packages/shared',
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
  autoFix: process.argv.includes('--auto-fix')
};

class DuplicateDetector {
  private project: Project;
  private patterns: Map<string, CodePattern> = new Map();
  private duplicateGroups: DuplicateGroup[] = [];
  private stats = {
    filesAnalyzed: 0,
    patternsFound: 0,
    duplicatesFound: 0,
    linesOfCodeDuplicated: 0,
    potentialSavings: 0
  };

  constructor() {
    this.project = new Project({
      tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
      skipAddingFilesFromTsConfig: false
    });
  }

  /**
   * Common duplicate patterns to detect
   */
  private readonly COMMON_PATTERNS = [
    {
      name: 'Loading State Pattern',
      regex: /const\s+\[loading,\s*setLoading\]\s*=\s*useState\((?:true|false)\);?\s*const\s+\[error,\s*setError\]\s*=\s*useState/,
      category: 'state-management' as const,
      consolidation: 'useAsyncState'
    },
    {
      name: 'Form State Pattern',
      regex: /const\s+\[formData,\s*setFormData\]\s*=\s*useState\([^)]+\);?\s*const\s+\[errors,\s*setErrors\]\s*=\s*useState/,
      category: 'state-management' as const,
      consolidation: 'useFormState'
    },
    {
      name: 'API Call Pattern',
      regex: /try\s*{\s*const\s+response\s*=\s*await\s+fetch\([^)]+\);?\s*if\s*\(!response\.ok\)/,
      category: 'api-handler' as const,
      consolidation: 'apiClient'
    },
    {
      name: 'Error Boundary Pattern',
      regex: /class\s+\w+\s+extends\s+(?:React\.)?Component\s*{[^}]*componentDidCatch/,
      category: 'component' as const,
      consolidation: 'ErrorBoundary'
    },
    {
      name: 'Modal State Pattern',
      regex: /const\s+\[isOpen,\s*setIsOpen\]\s*=\s*useState\(false\);?\s*const\s+open\w*\s*=\s*\(\)/,
      category: 'state-management' as const,
      consolidation: 'useModal'
    },
    {
      name: 'Pagination Pattern',
      regex: /const\s+\[page,\s*setPage\]\s*=\s*useState\(1\);?\s*const\s+\[pageSize,\s*setPageSize\]/,
      category: 'state-management' as const,
      consolidation: 'usePagination'
    },
    {
      name: 'Debounce Pattern',
      regex: /useEffect\(\(\)\s*=>\s*{\s*const\s+timer\s*=\s*setTimeout/,
      category: 'hook' as const,
      consolidation: 'useDebounce'
    },
    {
      name: 'Local Storage Pattern',
      regex: /localStorage\.getItem\([^)]+\).*localStorage\.setItem/s,
      category: 'utility' as const,
      consolidation: 'useLocalStorage'
    },
    {
      name: 'Authentication Check',
      regex: /if\s*\(!(?:user|session|auth)\)\s*{\s*(?:router\.push|redirect|navigate)\(['"]\//,
      category: 'utility' as const,
      consolidation: 'requireAuth'
    },
    {
      name: 'Firebase Query Pattern',
      regex: /const\s+\w+Ref\s*=\s*collection\(db,\s*['"][^'"]+['"]\);?\s*const\s+q\s*=\s*query/,
      category: 'api-handler' as const,
      consolidation: 'useFirestoreQuery'
    }
  ];

  /**
   * Analyze file for duplicate patterns
   */
  async analyzeFile(filePath: string): Promise<void> {
    const sourceFile = this.project.getSourceFile(filePath);
    if (!sourceFile) return;

    const content = sourceFile.getText();
    const relativePath = path.relative(process.cwd(), filePath);

    // Check for common patterns
    this.COMMON_PATTERNS.forEach(pattern => {
      if (!config.categories || config.categories.includes(pattern.category)) {
        const matches = content.matchAll(new RegExp(pattern.regex, 'g'));
        
        for (const match of matches) {
          if (match.index !== undefined) {
            const hash = this.hashPattern(match[0]);
            const lineNumber = content.substring(0, match.index).split('\n').length;
            
            this.addPattern({
              id: `${pattern.name}-${hash.substring(0, 8)}`,
              hash,
              pattern: pattern.name,
              category: pattern.category,
              instances: [{
                file: relativePath,
                line: lineNumber,
                code: match[0],
                variables: this.extractVariables(match[0])
              }],
              similarity: 100,
              consolidationStrategy: pattern.consolidation
            });
          }
        }
      }
    });

    // Deep AST analysis for complex duplicates
    this.analyzeASTPatterns(sourceFile, relativePath);
    
    this.stats.filesAnalyzed++;
  }

  /**
   * Analyze AST for structural duplicates
   */
  private analyzeASTPatterns(sourceFile: SourceFile, filePath: string): void {
    // Find all functions
    sourceFile.getFunctions().forEach(func => {
      const fingerprint = this.generateASTFingerprint(func);
      this.checkAndAddASTPattern(fingerprint, func, filePath, 'utility');
    });

    // Find all React components
    sourceFile.forEachDescendant(node => {
      if (Node.isFunctionDeclaration(node) || Node.isVariableStatement(node)) {
        const name = this.getNodeName(node);
        if (name && /^[A-Z]/.test(name)) {
          const fingerprint = this.generateASTFingerprint(node);
          this.checkAndAddASTPattern(fingerprint, node, filePath, 'component');
        }
      }
    });

    // Find all hooks
    sourceFile.forEachDescendant(node => {
      if (Node.isFunctionDeclaration(node) || Node.isVariableStatement(node)) {
        const name = this.getNodeName(node);
        if (name && name.startsWith('use')) {
          const fingerprint = this.generateASTFingerprint(node);
          this.checkAndAddASTPattern(fingerprint, node, filePath, 'hook');
        }
      }
    });
  }

  /**
   * Generate AST fingerprint for similarity matching
   */
  private generateASTFingerprint(node: Node): string {
    const parts: string[] = [];
    
    node.forEachDescendant(child => {
      // Include structural elements but ignore variable names
      if (Node.isIdentifier(child)) {
        // Replace identifiers with placeholders
        parts.push('ID');
      } else if (Node.isStringLiteral(child)) {
        parts.push('STR');
      } else if (Node.isNumericLiteral(child)) {
        parts.push('NUM');
      } else {
        parts.push(child.getKindName());
      }
    });
    
    return parts.join('-');
  }

  /**
   * Check and add AST pattern
   */
  private checkAndAddASTPattern(
    fingerprint: string,
    node: Node,
    filePath: string,
    category: CodePattern['category']
  ): void {
    const hash = this.hashPattern(fingerprint);
    const existingPattern = Array.from(this.patterns.values()).find(p => {
      const similarity = this.calculateSimilarity(p.hash, hash);
      return similarity >= config.minSimilarity;
    });

    const code = node.getText().substring(0, 200) + '...';
    const lineNumber = node.getStartLineNumber();

    if (existingPattern) {
      existingPattern.instances.push({
        file: filePath,
        line: lineNumber,
        code,
        variables: this.extractVariables(code)
      });
    } else {
      const pattern: CodePattern = {
        id: `ast-${hash.substring(0, 8)}`,
        hash,
        pattern: `AST Pattern (${category})`,
        category,
        instances: [{
          file: filePath,
          line: lineNumber,
          code,
          variables: this.extractVariables(code)
        }],
        similarity: 100
      };
      this.patterns.set(hash, pattern);
    }
  }

  /**
   * Add or update pattern
   */
  private addPattern(pattern: CodePattern): void {
    const existing = this.patterns.get(pattern.hash);
    
    if (existing) {
      // Merge instances
      existing.instances.push(...pattern.instances);
    } else {
      this.patterns.set(pattern.hash, pattern);
    }
  }

  /**
   * Calculate similarity between two hashes
   */
  private calculateSimilarity(hash1: string, hash2: string): number {
    if (hash1 === hash2) return 100;
    
    // Simple character-based similarity
    let matches = 0;
    const minLength = Math.min(hash1.length, hash2.length);
    
    for (let i = 0; i < minLength; i++) {
      if (hash1[i] === hash2[i]) matches++;
    }
    
    return Math.round((matches / minLength) * 100);
  }

  /**
   * Group similar patterns
   */
  private groupDuplicates(): void {
    const groups: Map<string, DuplicateGroup> = new Map();

    this.patterns.forEach(pattern => {
      if (pattern.instances.length >= config.minInstances) {
        const groupKey = pattern.consolidationStrategy || pattern.pattern;
        
        if (!groups.has(groupKey)) {
          groups.set(groupKey, {
            patterns: [],
            totalInstances: 0,
            filesAffected: [],
            linesOfCode: 0,
            savingsEstimate: 0
          });
        }
        
        const group = groups.get(groupKey)!;
        group.patterns.push(pattern);
        group.totalInstances += pattern.instances.length;
        
        pattern.instances.forEach(instance => {
          if (!group.filesAffected.includes(instance.file)) {
            group.filesAffected.push(instance.file);
          }
          group.linesOfCode += instance.code.split('\n').length;
        });
        
        // Estimate savings (lines of code that can be removed)
        group.savingsEstimate = group.linesOfCode - 50; // Assume 50 lines for consolidated version
      }
    });

    this.duplicateGroups = Array.from(groups.values())
      .sort((a, b) => b.savingsEstimate - a.savingsEstimate);

    // Update statistics
    this.duplicateGroups.forEach(group => {
      this.stats.duplicatesFound += group.patterns.length;
      this.stats.linesOfCodeDuplicated += group.linesOfCode;
      this.stats.potentialSavings += group.savingsEstimate;
    });
  }

  /**
   * Generate consolidated code for a pattern
   */
  private generateConsolidatedCode(group: DuplicateGroup): string {
    const firstPattern = group.patterns[0];
    const strategy = firstPattern.consolidationStrategy;

    // Generate based on consolidation strategy
    switch (strategy) {
      case 'useAsyncState':
        return this.generateAsyncStateHook();
      
      case 'useFormState':
        return this.generateFormStateHook();
      
      case 'apiClient':
        return this.generateApiClient();
      
      case 'useModal':
        return this.generateModalHook();
      
      case 'usePagination':
        return this.generatePaginationHook();
      
      case 'useDebounce':
        return this.generateDebounceHook();
      
      case 'useLocalStorage':
        return this.generateLocalStorageHook();
      
      case 'requireAuth':
        return this.generateAuthGuard();
      
      case 'useFirestoreQuery':
        return this.generateFirestoreHook();
      
      default:
        return this.generateGenericConsolidation(group);
    }
  }

  /**
   * Generate async state hook
   */
  private generateAsyncStateHook(): string {
    return `import { useState, useEffect, useCallback } from 'react';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsyncState<T>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList = []
): AsyncState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error : new Error(String(error))
      });
    }
  }, [asyncFunction]);

  useEffect(() => {
    execute();
  }, dependencies);

  return { ...state, refetch: execute };
}`;
  }

  /**
   * Generate form state hook
   */
  private generateFormStateHook(): string {
    return `import { useState, useCallback, ChangeEvent } from 'react';

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

export function useFormState<T extends Record<string, any>>(
  initialValues: T,
  validate?: (values: T) => Partial<Record<keyof T, string>>
) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false
  });

  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      touched: { ...prev.touched, [name]: true }
    }));
    
    if (validate) {
      const errors = validate({ ...state.values, [name]: value });
      setState(prev => ({ ...prev, errors }));
    }
  }, [state.values, validate]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void>
  ) => {
    setState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      if (validate) {
        const errors = validate(state.values);
        if (Object.keys(errors).length > 0) {
          setState(prev => ({ ...prev, errors, isSubmitting: false }));
          return;
        }
      }
      
      await onSubmit(state.values);
      setState(prev => ({ ...prev, isSubmitting: false }));
    } catch (error) {
      setState(prev => ({ ...prev, isSubmitting: false }));
      throw error;
    }
  }, [state.values, validate]);

  const reset = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false
    });
  }, [initialValues]);

  return {
    ...state,
    handleChange,
    handleSubmit,
    reset
  };
}`;
  }

  /**
   * Generate API client
   */
  private generateApiClient(): string {
    return `class ApiClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(baseUrl: string = '/api', headers: HeadersInit = {}) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      ...headers
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();`;
  }

  /**
   * Generate modal hook
   */
  private generateModalHook(): string {
    return `import { useState, useCallback } from 'react';

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
}`;
  }

  /**
   * Generate pagination hook
   */
  private generatePaginationHook(): string {
    return `import { useState, useMemo, useCallback } from 'react';

export function usePagination<T>(
  data: T[],
  itemsPerPage = 10
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  const totalPages = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data.length, pageSize]
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, currentPage, pageSize]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const previousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    setPageSize,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
}`;
  }

  /**
   * Generate debounce hook
   */
  private generateDebounceHook(): string {
    return `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay = 500): T {
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
}`;
  }

  /**
   * Generate local storage hook
   */
  private generateLocalStorageHook(): string {
    return `import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(\`Error removing localStorage key "\${key}":\`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}`;
  }

  /**
   * Generate auth guard
   */
  private generateAuthGuard(): string {
    return `import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export function requireAuth(WrappedComponent: React.ComponentType) {
  return function AuthGuard(props: any) {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/auth/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}`;
  }

  /**
   * Generate Firestore hook
   */
  private generateFirestoreHook(): string {
    return `import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  QueryConstraint,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useFirestoreQuery<T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, ...constraints]);

  return { data, loading, error };
}`;
  }

  /**
   * Generate generic consolidation
   */
  private generateGenericConsolidation(group: DuplicateGroup): string {
    const firstInstance = group.patterns[0].instances[0];
    const variables = firstInstance.variables;
    
    return `// Consolidated from ${group.totalInstances} duplicate instances
// Files affected: ${group.filesAffected.length}
// Estimated savings: ${group.savingsEstimate} lines

export function consolidatedFunction(${variables.map(v => `${v}: any`).join(', ')}) {
  ${firstInstance.code}
}
`;
  }

  /**
   * Helper methods
   */
  private hashPattern(pattern: string): string {
    return crypto.createHash('md5').update(pattern).digest('hex');
  }

  private extractVariables(code: string): string[] {
    const variables: string[] = [];
    const varPattern = /(?:const|let|var)\s+(\w+)/g;
    let match;
    
    while ((match = varPattern.exec(code)) !== null) {
      if (match[1] && !variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    
    return variables;
  }

  private getNodeName(node: Node): string | null {
    if (Node.isFunctionDeclaration(node)) {
      return node.getName() || null;
    }
    if (Node.isVariableStatement(node)) {
      const declaration = node.getDeclarations()[0];
      return declaration?.getName() || null;
    }
    return null;
  }

  /**
   * Write consolidated files
   */
  async writeConsolidatedFiles(): Promise<void> {
    if (config.dryRun) {
      console.log(chalk.yellow('\n[DRY RUN] Would create consolidated files:'));
      this.duplicateGroups.forEach(group => {
        const fileName = group.patterns[0].consolidationStrategy || 'consolidated';
        console.log(`  - ${config.outputDir}/${fileName}.ts`);
      });
      return;
    }

    // Create output directory
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true });
    }

    // Write consolidated files
    for (const group of this.duplicateGroups) {
      const fileName = group.patterns[0].consolidationStrategy || 'consolidated';
      const filePath = path.join(config.outputDir, `${fileName}.ts`);
      const content = this.generateConsolidatedCode(group);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(chalk.green(`✓ Created: ${filePath}`));
    }

    // Create index file
    this.createIndexFile();
  }

  /**
   * Create index file for consolidated modules
   */
  private createIndexFile(): void {
    const exports = this.duplicateGroups.map(group => {
      const name = group.patterns[0].consolidationStrategy || 'consolidated';
      return `export * from './${name}';`;
    });

    const indexContent = exports.join('\n') + '\n';
    const indexPath = path.join(config.outputDir, 'index.ts');
    
    if (!config.dryRun) {
      fs.writeFileSync(indexPath, indexContent, 'utf8');
      console.log(chalk.green(`✓ Created index: ${indexPath}`));
    }
  }

  /**
   * Generate report
   */
  generateReport(): string {
    let report = `# Duplicate Code Detection Report
Generated: ${new Date().toISOString()}

## Summary
- Files analyzed: ${this.stats.filesAnalyzed}
- Duplicate patterns found: ${this.stats.duplicatesFound}
- Total duplicate instances: ${this.patterns.size}
- Lines of duplicated code: ${this.stats.linesOfCodeDuplicated}
- Potential savings: ${this.stats.potentialSavings} lines

## Top Duplicate Patterns
`;

    this.duplicateGroups.slice(0, 10).forEach((group, index) => {
      report += `
### ${index + 1}. ${group.patterns[0].pattern || 'Pattern ' + (index + 1)}
- **Instances**: ${group.totalInstances}
- **Files affected**: ${group.filesAffected.length}
- **Lines of code**: ${group.linesOfCode}
- **Potential savings**: ${group.savingsEstimate} lines
- **Consolidation strategy**: ${group.patterns[0].consolidationStrategy || 'Manual refactoring needed'}

**Affected files**:
${group.filesAffected.slice(0, 5).map(f => `- ${f}`).join('\n')}
${group.filesAffected.length > 5 ? `... and ${group.filesAffected.length - 5} more` : ''}
`;
    });

    report += `
## Recommended Actions

1. **Immediate consolidation** (High impact, low effort):
   - Loading state patterns → useAsyncState hook
   - Form state patterns → useFormState hook
   - API call patterns → apiClient utility

2. **Component extraction** (Medium impact, medium effort):
   - Error boundaries → Shared ErrorBoundary component
   - Modal patterns → useModal hook
   - Pagination patterns → usePagination hook

3. **Utility consolidation** (Low impact, low effort):
   - Debounce patterns → useDebounce hook
   - Local storage patterns → useLocalStorage hook
   - Auth checks → requireAuth HOC

## Migration Guide

1. Install consolidated utilities:
   \`\`\`bash
   npm install ${config.outputDir}
   \`\`\`

2. Update imports in affected files:
   \`\`\`typescript
   // Before
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   
   // After
   import { useAsyncState } from '${config.outputDir}';
   const { loading, error, data } = useAsyncState(fetchData);
   \`\`\`

3. Run tests to ensure functionality:
   \`\`\`bash
   npm test
   \`\`\`

## ROI Calculation
- Time to consolidate: ~${Math.round(this.duplicateGroups.length * 2)} hours
- Maintenance time saved: ~${Math.round(this.stats.potentialSavings / 100)} hours/year
- Code reduction: ${Math.round((this.stats.potentialSavings / this.stats.linesOfCodeDuplicated) * 100)}%
`;

    return report;
  }

  /**
   * Process all files
   */
  async processAllFiles(): Promise<void> {
    const pattern = path.join(config.target, '**/*.{ts,tsx,js,jsx}');
    const files = glob.sync(pattern, {
      ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/build/**']
    });

    console.log(chalk.cyan(`Analyzing ${files.length} files for duplicates...\n`));

    for (const file of files) {
      await this.analyzeFile(file);
      
      if (this.stats.filesAnalyzed % 100 === 0) {
        console.log(`  Processed ${this.stats.filesAnalyzed} files...`);
      }
    }

    // Group duplicates
    this.groupDuplicates();
  }

  /**
   * Print statistics
   */
  printStats(): void {
    console.log(chalk.cyan('\n📊 Duplicate Detection Statistics'));
    console.log(chalk.gray('='.repeat(50)));
    console.log(`Files analyzed: ${this.stats.filesAnalyzed}`);
    console.log(`Patterns found: ${this.patterns.size}`);
    console.log(`Duplicate groups: ${this.duplicateGroups.length}`);
    console.log(`Lines of duplicated code: ${this.stats.linesOfCodeDuplicated}`);
    console.log(`Potential savings: ${this.stats.potentialSavings} lines`);
    
    if (this.duplicateGroups.length > 0) {
      console.log(chalk.yellow(`\nTop duplicates:`));
      this.duplicateGroups.slice(0, 5).forEach(group => {
        console.log(`  - ${group.patterns[0].pattern}: ${group.totalInstances} instances`);
      });
    }
    
    if (config.dryRun) {
      console.log(chalk.yellow('\n⚠️  DRY RUN - No files were created'));
    }
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log(chalk.blue('🔍 Duplicate Code Detector'));
  console.log(chalk.gray('='.repeat(50)));
  console.log(`Target: ${config.target}`);
  console.log(`Min similarity: ${config.minSimilarity}%`);
  console.log(`Min instances: ${config.minInstances}\n`);

  if (config.dryRun) {
    console.log(chalk.yellow('🔍 DRY RUN MODE - No files will be created\n'));
  }

  const detector = new DuplicateDetector();

  try {
    await detector.processAllFiles();
    
    if (config.autoFix) {
      await detector.writeConsolidatedFiles();
    }
    
    // Generate report
    const report = detector.generateReport();
    fs.writeFileSync('DUPLICATE_CODE_REPORT.md', report, 'utf8');
    console.log(chalk.green('\n✓ Report generated: DUPLICATE_CODE_REPORT.md'));
    
    detector.printStats();
    
  } catch (error) {
    console.error(chalk.red('Error:'), error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}