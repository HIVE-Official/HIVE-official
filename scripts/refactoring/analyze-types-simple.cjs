#!/usr/bin/env node

/**
 * TypeScript Type Safety Analyzer
 * Identifies 'any' usage and provides actionable fixes
 */

const fs = require('fs');
const path = require('path');

const config = {
  verbose: process.argv.includes('--verbose'),
  fix: process.argv.includes('--fix'),
  targetDirs: [
    'apps/web/src',
    'apps/admin/src',
    'packages/ui/src',
    'packages/core/src'
  ]
};

const stats = {
  filesAnalyzed: 0,
  filesWithAny: 0,
  totalAnyUsage: 0,
  byCategory: {
    functionParams: [],
    returnTypes: [],
    variables: [],
    props: [],
    state: [],
    other: []
  }
};

// Patterns to detect different types of 'any' usage
const anyPatterns = {
  functionParams: /\(([^)]*:\s*any[^)]*)\)/g,
  returnTypes: /\):\s*any(?:\s|$|{)/g,
  variables: /(?:const|let|var)\s+\w+:\s*any/g,
  props: /(?:props|Props):\s*any/g,
  state: /useState<any>/g,
  imports: /import\s+(?:type\s+)?{[^}]*any[^}]*}/g,
  arrays: /:\s*any\[\]/g,
  objects: /:\s*{\s*\[key:\s*string\]:\s*any\s*}/g
};

function categorizeAnyUsage(line, lineNum, filePath) {
  const result = [];
  
  // Check function parameters
  if (anyPatterns.functionParams.test(line)) {
    result.push({
      category: 'functionParams',
      line: lineNum,
      code: line.trim(),
      file: filePath,
      severity: 'high',
      suggestion: 'Define specific parameter types or use generics'
    });
  }
  
  // Check return types
  if (anyPatterns.returnTypes.test(line)) {
    result.push({
      category: 'returnTypes',
      line: lineNum,
      code: line.trim(),
      file: filePath,
      severity: 'high',
      suggestion: 'Infer return type or explicitly define it'
    });
  }
  
  // Check variables
  if (anyPatterns.variables.test(line)) {
    result.push({
      category: 'variables',
      line: lineNum,
      code: line.trim(),
      file: filePath,
      severity: 'medium',
      suggestion: 'Let TypeScript infer the type or define explicitly'
    });
  }
  
  // Check props
  if (anyPatterns.props.test(line)) {
    result.push({
      category: 'props',
      line: lineNum,
      code: line.trim(),
      file: filePath,
      severity: 'critical',
      suggestion: 'Define proper prop types interface'
    });
  }
  
  // Check state
  if (anyPatterns.state.test(line)) {
    result.push({
      category: 'state',
      line: lineNum,
      code: line.trim(),
      file: filePath,
      severity: 'high',
      suggestion: 'Use proper type for useState generic'
    });
  }
  
  // Generic any check
  if (line.includes(': any') && result.length === 0) {
    result.push({
      category: 'other',
      line: lineNum,
      code: line.trim(),
      file: filePath,
      severity: 'low',
      suggestion: 'Review and replace with specific type'
    });
  }
  
  return result;
}

function analyzeFile(filePath) {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) {
    return;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const relativePath = path.relative(process.cwd(), filePath);
    let fileHasAny = false;
    
    lines.forEach((line, index) => {
      const anyUsages = categorizeAnyUsage(line, index + 1, relativePath);
      
      if (anyUsages.length > 0) {
        fileHasAny = true;
        anyUsages.forEach(usage => {
          stats.byCategory[usage.category].push(usage);
          stats.totalAnyUsage++;
        });
      }
    });
    
    if (fileHasAny) {
      stats.filesWithAny++;
    }
    
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

// Common type replacements
const typeReplacements = {
  'event: any': 'event: React.ChangeEvent<HTMLInputElement>',
  'error: any': 'error: Error | null',
  'data: any': 'data: unknown',
  'response: any': 'response: Response',
  'props: any': 'props: Record<string, unknown>',
  'children: any': 'children: React.ReactNode',
  'value: any': 'value: string | number | boolean',
  'item: any': 'item: unknown',
  'user: any': 'user: { id: string; email: string; [key: string]: unknown }',
  'config: any': 'config: Record<string, unknown>'
};

console.log('🔍 TypeScript Type Safety Analyzer');
console.log('═'.repeat(50));

// Analyze directories
console.log('\n📂 Analyzing TypeScript files...\n');
config.targetDirs.forEach(dir => {
  processDirectory(dir);
});

// Generate report
console.log('📊 Type Safety Analysis Results:');
console.log('─'.repeat(50));
console.log(`Files analyzed: ${stats.filesAnalyzed}`);
console.log(`Files with 'any': ${stats.filesWithAny}`);
console.log(`Total 'any' usage: ${stats.totalAnyUsage}`);

console.log('\n🎯 By Category:');
const categories = [
  { name: 'Function Parameters', key: 'functionParams', icon: '⚠️' },
  { name: 'Return Types', key: 'returnTypes', icon: '⚠️' },
  { name: 'Props', key: 'props', icon: '🔴' },
  { name: 'State', key: 'state', icon: '⚠️' },
  { name: 'Variables', key: 'variables', icon: '🟡' },
  { name: 'Other', key: 'other', icon: '🟢' }
];

categories.forEach(cat => {
  const count = stats.byCategory[cat.key].length;
  if (count > 0) {
    console.log(`${cat.icon} ${cat.name}: ${count}`);
    
    if (config.verbose) {
      // Show top 3 examples
      stats.byCategory[cat.key].slice(0, 3).forEach(item => {
        console.log(`    ${item.file}:${item.line}`);
        console.log(`      ${item.code}`);
        console.log(`      💡 ${item.suggestion}`);
      });
    }
  }
});

// Priority fixes
console.log('\n🚨 Priority Fixes (Critical & High Severity):');
const priorityFixes = [];
Object.keys(stats.byCategory).forEach(category => {
  stats.byCategory[category].forEach(item => {
    if (item.severity === 'critical' || item.severity === 'high') {
      priorityFixes.push(item);
    }
  });
});

// Group by file for easier fixing
const fixesByFile = {};
priorityFixes.forEach(fix => {
  if (!fixesByFile[fix.file]) {
    fixesByFile[fix.file] = [];
  }
  fixesByFile[fix.file].push(fix);
});

// Show top files needing fixes
const filesNeedingFixes = Object.keys(fixesByFile)
  .sort((a, b) => fixesByFile[b].length - fixesByFile[a].length)
  .slice(0, 10);

filesNeedingFixes.forEach(file => {
  console.log(`\n📄 ${file} (${fixesByFile[file].length} issues)`);
  fixesByFile[file].slice(0, 3).forEach(fix => {
    console.log(`  Line ${fix.line}: ${fix.code.substring(0, 60)}...`);
    console.log(`    → ${fix.suggestion}`);
  });
});

// Generate TypeScript config recommendations
const tsConfigRecommendations = `
## TypeScript Configuration Recommendations

Add these to your tsconfig.json to prevent new 'any' usage:

\`\`\`json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
\`\`\`

Or simply use:
\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`
`;

// Generate fix guide
const fixGuide = `# TypeScript 'any' Fix Guide

## Statistics
- **Total 'any' usage**: ${stats.totalAnyUsage}
- **Files affected**: ${stats.filesWithAny}
- **Critical issues**: ${priorityFixes.filter(f => f.severity === 'critical').length}
- **High priority**: ${priorityFixes.filter(f => f.severity === 'high').length}

## Common Replacements

${Object.entries(typeReplacements).map(([from, to]) => 
  `- \`${from}\` → \`${to}\``
).join('\n')}

## Fix Priority

### 1. Critical (Props)
${stats.byCategory.props.slice(0, 5).map(item => 
  `- ${item.file}:${item.line}`
).join('\n')}

### 2. High (Function Parameters & Return Types)
${[...stats.byCategory.functionParams, ...stats.byCategory.returnTypes].slice(0, 5).map(item =>
  `- ${item.file}:${item.line}`
).join('\n')}

### 3. Medium (State & Variables)
${[...stats.byCategory.state, ...stats.byCategory.variables].slice(0, 5).map(item =>
  `- ${item.file}:${item.line}`
).join('\n')}

${tsConfigRecommendations}

## Next Steps
1. Fix critical prop type issues first
2. Update function signatures
3. Enable strict mode in tsconfig.json
4. Run \`npx tsc --noEmit\` to verify fixes
`;

fs.writeFileSync('TYPESCRIPT_ANY_FIX_GUIDE.md', fixGuide);
console.log('\n📚 Fix guide created: TYPESCRIPT_ANY_FIX_GUIDE.md');

// Create type definition stubs for common patterns
if (config.fix) {
  const typeDefsContent = `// Common type definitions for HIVE platform
// Add to a global.d.ts or types file

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: 'student' | 'faculty' | 'admin';
  schoolId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Space {
  id: string;
  name: string;
  description?: string;
  type: 'academic' | 'social' | 'professional' | 'creative';
  memberCount: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface Tool {
  id: string;
  name: string;
  description?: string;
  category: string;
  config: Record<string, unknown>;
  createdBy: string;
  isPublished: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

// React prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

// Form types
export interface FormData {
  [key: string]: string | number | boolean | File | null;
}

export interface ValidationError {
  field: string;
  message: string;
}
`;

  fs.writeFileSync('packages/types/common.d.ts', typeDefsContent);
  console.log('✓ Created common type definitions: packages/types/common.d.ts');
}

// Save analysis results
const analysisData = {
  timestamp: new Date().toISOString(),
  stats: stats,
  topFiles: filesNeedingFixes.map(file => ({
    file,
    issues: fixesByFile[file].length
  }))
};

fs.writeFileSync(
  'typescript-any-analysis.json',
  JSON.stringify(analysisData, null, 2)
);

console.log('\n✅ Analysis complete!');
console.log(`📊 ${stats.totalAnyUsage} 'any' types need fixing`);
console.log('📋 Review TYPESCRIPT_ANY_FIX_GUIDE.md for detailed fixes');

process.exit(0);