#!/usr/bin/env ts-node

/**
 * Import Path Fixer and Type Safety Analyzer
 * Fixes relative import paths and identifies TypeScript 'any' usage
 */

import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import { Project, SourceFile, Node, TypeAliasDeclaration, VariableDeclaration, ParameterDeclaration, PropertySignature } from 'ts-morph';

interface ImportFix {
  file: string;
  oldImport: string;
  newImport: string;
  line: number;
}

interface AnyTypeUsage {
  file: string;
  line: number;
  column: number;
  context: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  suggestion?: string;
}

interface Config {
  projectRoot: string;
  tsConfigPath: string;
  aliasMap: Record<string, string>;
  dryRun: boolean;
  verbose: boolean;
  generateReport: boolean;
}

const config: Config = {
  projectRoot: process.cwd(),
  tsConfigPath: './tsconfig.json',
  aliasMap: {
    '@': 'apps/web/src',
    '@hive/ui': 'packages/ui/src',
    '@hive/core': 'packages/core/src',
    '@hive/hooks': 'packages/hooks/src',
    '@components': 'apps/web/src/components',
    '@lib': 'apps/web/src/lib',
    '@hooks': 'apps/web/src/hooks',
    '@utils': 'apps/web/src/utils',
    '@constants': 'apps/web/src/constants',
    '@types': 'apps/web/src/types'
  },
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
  generateReport: process.argv.includes('--report')
};

class RefactoringAnalyzer {
  private project: Project;
  private importFixes: ImportFix[] = [];
  private anyTypeUsages: AnyTypeUsage[] = [];
  private stats = {
    filesAnalyzed: 0,
    importsFixed: 0,
    anyTypesFound: 0,
    criticalAnyTypes: 0
  };

  constructor() {
    this.project = new Project({
      tsConfigFilePath: config.tsConfigPath,
      skipAddingFilesFromTsConfig: false,
    });
  }

  /**
   * Analyze all TypeScript files in the project
   */
  async analyze(): Promise<void> {
    console.log('🔍 Analyzing TypeScript files...');
    
    const sourceFiles = this.project.getSourceFiles();
    console.log(`Found ${sourceFiles.length} TypeScript files\\n`);

    for (const sourceFile of sourceFiles) {
      await this.analyzeFile(sourceFile);
      this.stats.filesAnalyzed++;
      
      if (this.stats.filesAnalyzed % 100 === 0) {
        console.log(`  Processed ${this.stats.filesAnalyzed} files...`);
      }
    }
  }

  /**
   * Analyze a single TypeScript file
   */
  private async analyzeFile(sourceFile: SourceFile): Promise<void> {
    const filePath = sourceFile.getFilePath();
    
    // Skip node_modules and build directories
    if (filePath.includes('node_modules') || filePath.includes('dist') || filePath.includes('.next')) {
      return;
    }

    // Analyze imports
    this.analyzeImports(sourceFile);
    
    // Analyze 'any' types
    this.analyzeAnyTypes(sourceFile);
  }

  /**
   * Analyze and fix import statements
   */
  private analyzeImports(sourceFile: SourceFile): void {
    const importDeclarations = sourceFile.getImportDeclarations();
    
    for (const importDecl of importDeclarations) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();
      const sourceFilePath = sourceFile.getFilePath();
      
      // Check for deep relative imports (../../../)
      if (moduleSpecifier.match(/^\.\.\/\.\.\/\.\.\//)) {
        const fix = this.calculateImportFix(sourceFilePath, moduleSpecifier);
        
        if (fix) {
          this.importFixes.push({
            file: path.relative(config.projectRoot, sourceFilePath),
            oldImport: moduleSpecifier,
            newImport: fix,
            line: importDecl.getStartLineNumber()
          });
          
          if (!config.dryRun) {
            importDecl.setModuleSpecifier(fix);
          }
          
          this.stats.importsFixed++;
        }
      }
      
      // Check for inconsistent @hive imports
      if (moduleSpecifier.startsWith('@hive/')) {
        const packageName = moduleSpecifier.split('/')[1];
        
        // Verify the import actually exists
        const expectedPath = path.join(config.projectRoot, 'packages', packageName);
        if (!fs.existsSync(expectedPath)) {
          console.warn(`⚠️  Invalid @hive import: ${moduleSpecifier} in ${sourceFilePath}`);
        }
      }
    }
  }

  /**
   * Calculate the fixed import path using aliases
   */
  private calculateImportFix(sourceFilePath: string, importPath: string): string | null {
    // Convert relative import to absolute path
    const sourceDirPath = path.dirname(sourceFilePath);
    const absoluteImportPath = path.resolve(sourceDirPath, importPath);
    const relativeToRoot = path.relative(config.projectRoot, absoluteImportPath).replace(/\\\\/g, '/');
    
    // Try to match with alias paths
    for (const [alias, aliasPath] of Object.entries(config.aliasMap)) {
      if (relativeToRoot.startsWith(aliasPath)) {
        const remainingPath = relativeToRoot.substring(aliasPath.length);
        return alias + (remainingPath ? remainingPath : '');
      }
    }
    
    // If in packages, use @hive convention
    if (relativeToRoot.startsWith('packages/')) {
      const parts = relativeToRoot.split('/');
      if (parts.length >= 2) {
        const packageName = parts[1];
        const remainingPath = parts.slice(3).join('/'); // Skip 'src'
        return `@hive/${packageName}${remainingPath ? '/' + remainingPath : ''}`;
      }
    }
    
    return null;
  }

  /**
   * Analyze 'any' type usage in the file
   */
  private analyzeAnyTypes(sourceFile: SourceFile): void {
    // Find all 'any' type references
    sourceFile.forEachDescendant((node) => {
      const nodeText = node.getText();
      
      // Check for explicit 'any' type annotations
      if (nodeText.includes(': any')) {
        const usage = this.categorizeAnyUsage(node, sourceFile);
        if (usage) {
          this.anyTypeUsages.push(usage);
          this.stats.anyTypesFound++;
          
          if (usage.severity === 'critical') {
            this.stats.criticalAnyTypes++;
          }
        }
      }
      
      // Check for 'as any' type assertions
      if (nodeText.includes('as any')) {
        this.anyTypeUsages.push({
          file: path.relative(config.projectRoot, sourceFile.getFilePath()),
          line: node.getStartLineNumber(),
          column: node.getStartLinePos(),
          context: nodeText.substring(0, 100),
          severity: 'high',
          suggestion: 'Use proper type assertion or unknown type'
        });
        this.stats.anyTypesFound++;
      }
    });
  }

  /**
   * Categorize the severity and provide suggestions for 'any' usage
   */
  private categorizeAnyUsage(node: Node, sourceFile: SourceFile): AnyTypeUsage | null {
    const nodeText = node.getText();
    const filePath = path.relative(config.projectRoot, sourceFile.getFilePath());
    
    // Critical: Function parameters with 'any'
    if (Node.isParameter(node)) {
      return {
        file: filePath,
        line: node.getStartLineNumber(),
        column: node.getStartLinePos(),
        context: nodeText,
        severity: 'critical',
        suggestion: 'Define proper parameter type or use generics'
      };
    }
    
    // High: Return types with 'any'
    if (Node.isFunctionDeclaration(node) || Node.isMethodDeclaration(node)) {
      const returnType = node.getReturnType().getText();
      if (returnType === 'any') {
        return {
          file: filePath,
          line: node.getStartLineNumber(),
          column: node.getStartLinePos(),
          context: node.getName() + ': any',
          severity: 'high',
          suggestion: 'Define proper return type'
        };
      }
    }
    
    // Medium: State variables with 'any'
    if (nodeText.includes('useState') && nodeText.includes('any')) {
      return {
        file: filePath,
        line: node.getStartLineNumber(),
        column: node.getStartLinePos(),
        context: nodeText.substring(0, 100),
        severity: 'medium',
        suggestion: 'Use generic useState<Type> syntax'
      };
    }
    
    // Low: Local variables with 'any'
    if (Node.isVariableDeclaration(node)) {
      return {
        file: filePath,
        line: node.getStartLineNumber(),
        column: node.getStartLinePos(),
        context: nodeText.substring(0, 100),
        severity: 'low',
        suggestion: 'Infer type from assignment or define explicitly'
      };
    }
    
    return null;
  }

  /**
   * Generate detailed reports
   */
  generateReports(): void {
    // Import fixes report
    if (this.importFixes.length > 0) {
      const importReport = `# Import Path Fixes Report

## Summary
- **Files with import issues**: ${new Set(this.importFixes.map(f => f.file)).size}
- **Total imports to fix**: ${this.importFixes.length}

## Fixes by File

${this.groupByFile(this.importFixes).map(([file, fixes]) => `
### ${file}
${fixes.map(fix => `- Line ${fix.line}: \`${fix.oldImport}\` → \`${fix.newImport}\``).join('\\n')}
`).join('\\n')}

## Automated Fix Command
\`\`\`bash
npm run refactor:fix-imports${config.dryRun ? '' : ' --apply'}
\`\`\`
`;
      
      fs.writeFileSync('IMPORT_FIXES_REPORT.md', importReport, 'utf8');
      console.log('📝 Import fixes report: IMPORT_FIXES_REPORT.md');
    }
    
    // TypeScript 'any' usage report
    if (this.anyTypeUsages.length > 0) {
      const anyReport = `# TypeScript 'any' Usage Report

## Summary
- **Total 'any' usages**: ${this.anyTypeUsages.length}
- **Critical issues**: ${this.anyTypeUsages.filter(u => u.severity === 'critical').length}
- **High priority**: ${this.anyTypeUsages.filter(u => u.severity === 'high').length}
- **Medium priority**: ${this.anyTypeUsages.filter(u => u.severity === 'medium').length}
- **Low priority**: ${this.anyTypeUsages.filter(u => u.severity === 'low').length}

## Critical Issues (Fix Immediately)
${this.anyTypeUsages.filter(u => u.severity === 'critical').slice(0, 20).map(usage => `
### ${usage.file}:${usage.line}
- **Context**: \`${usage.context}\`
- **Suggestion**: ${usage.suggestion}
`).join('\\n')}

## High Priority Issues
${this.anyTypeUsages.filter(u => u.severity === 'high').slice(0, 20).map(usage => `
- ${usage.file}:${usage.line} - ${usage.suggestion}
`).join('\\n')}

## Files with Most 'any' Types
${this.getTopFilesWithAny().map(([file, count]) => `- ${file}: ${count} occurrences`).join('\\n')}

## Recommendations

1. **Enable strict mode** in tsconfig.json:
   \`\`\`json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true
     }
   }
   \`\`\`

2. **Use unknown instead of any** for truly unknown types
3. **Define proper interfaces** for API responses
4. **Use generics** for reusable components

## Migration Priority

1. Fix all critical issues (function parameters)
2. Address high priority issues (return types)
3. Update useState calls with proper types
4. Gradually eliminate remaining 'any' uses
`;
      
      fs.writeFileSync('ANY_TYPE_REPORT.md', anyReport, 'utf8');
      console.log('📝 TypeScript any usage report: ANY_TYPE_REPORT.md');
    }
  }

  /**
   * Group fixes by file
   */
  private groupByFile<T extends { file: string }>(items: T[]): Array<[string, T[]]> {
    const grouped = new Map<string, T[]>();
    
    for (const item of items) {
      if (!grouped.has(item.file)) {
        grouped.set(item.file, []);
      }
      grouped.get(item.file)!.push(item);
    }
    
    return Array.from(grouped.entries()).sort((a, b) => b[1].length - a[1].length);
  }

  /**
   * Get files with most 'any' types
   */
  private getTopFilesWithAny(): Array<[string, number]> {
    const fileCounts = new Map<string, number>();
    
    for (const usage of this.anyTypeUsages) {
      fileCounts.set(usage.file, (fileCounts.get(usage.file) || 0) + 1);
    }
    
    return Array.from(fileCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }

  /**
   * Apply fixes if not in dry-run mode
   */
  async applyFixes(): Promise<void> {
    if (!config.dryRun && this.importFixes.length > 0) {
      console.log('\\n✏️  Applying fixes...');
      await this.project.save();
      console.log(`✅ Fixed ${this.stats.importsFixed} imports`);
    }
  }

  /**
   * Print summary statistics
   */
  printSummary(): void {
    console.log('\\n📊 Analysis Summary');
    console.log('===================');
    console.log(`Files analyzed: ${this.stats.filesAnalyzed}`);
    console.log(`Import issues found: ${this.importFixes.length}`);
    console.log(`'any' types found: ${this.stats.anyTypesFound}`);
    console.log(`Critical 'any' types: ${this.stats.criticalAnyTypes}`);
    
    if (config.dryRun) {
      console.log('\\n⚠️  DRY RUN - No changes were made');
      console.log('Run without --dry-run to apply fixes');
    }
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log('🔧 Import Path Fixer & Type Safety Analyzer');
  console.log('============================================\\n');
  
  const analyzer = new RefactoringAnalyzer();
  
  // Analyze all files
  await analyzer.analyze();
  
  // Generate reports if requested
  if (config.generateReport) {
    analyzer.generateReports();
  }
  
  // Apply fixes if not in dry-run mode
  await analyzer.applyFixes();
  
  // Print summary
  analyzer.printSummary();
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}