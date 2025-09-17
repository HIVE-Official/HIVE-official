#!/usr/bin/env ts-node

/**
 * Large File Splitter Script
 * Intelligently splits large TypeScript/React files into smaller, focused components
 * Uses AST analysis to identify logical boundaries and extract components
 */

import * as fs from 'fs';
import * as path from 'path';
import { Project, SourceFile, Node, SyntaxKind, FunctionDeclaration, ArrowFunction, VariableStatement } from 'ts-morph';
import * as glob from 'glob';
import chalk from 'chalk';

interface ComponentExtraction {
  name: string;
  code: string;
  imports: Set<string>;
  exports: string[];
  type: 'component' | 'hook' | 'utility' | 'type';
  lines: number;
}

interface SplitConfig {
  maxLines: number;
  targetFile?: string;
  pattern?: string;
  outputDir?: string;
  dryRun: boolean;
  verbose: boolean;
  all: boolean;
}

interface FileAnalysis {
  filePath: string;
  totalLines: number;
  components: ComponentExtraction[];
  hooks: ComponentExtraction[];
  utilities: ComponentExtraction[];
  types: ComponentExtraction[];
  complexity: number;
  suggestions: string[];
}

const config: SplitConfig = {
  maxLines: parseInt(process.argv.find(arg => arg.startsWith('--max-lines='))?.split('=')[1] || '500'),
  targetFile: process.argv.find(arg => arg.startsWith('--file='))?.split('=')[1],
  pattern: process.argv.find(arg => arg.startsWith('--pattern='))?.split('=')[1],
  outputDir: process.argv.find(arg => arg.startsWith('--output='))?.split('=')[1],
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
  all: process.argv.includes('--all')
};

class FileSplitter {
  private project: Project;
  private stats = {
    filesAnalyzed: 0,
    filesSplit: 0,
    componentsExtracted: 0,
    hooksExtracted: 0,
    utilitiesExtracted: 0,
    linesReduced: 0
  };

  constructor() {
    this.project = new Project({
      tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
      skipAddingFilesFromTsConfig: false
    });
  }

  /**
   * Analyze a TypeScript/React file and identify extraction opportunities
   */
  async analyzeFile(filePath: string): Promise<FileAnalysis> {
    const sourceFile = this.project.getSourceFile(filePath);
    if (!sourceFile) {
      throw new Error(`Could not load file: ${filePath}`);
    }

    const analysis: FileAnalysis = {
      filePath,
      totalLines: sourceFile.getEndLineNumber(),
      components: [],
      hooks: [],
      utilities: [],
      types: [],
      complexity: 0,
      suggestions: []
    };

    // Find all function declarations and arrow functions
    this.extractComponents(sourceFile, analysis);
    this.extractHooks(sourceFile, analysis);
    this.extractUtilities(sourceFile, analysis);
    this.extractTypes(sourceFile, analysis);
    
    // Calculate complexity
    analysis.complexity = this.calculateComplexity(sourceFile);
    
    // Generate suggestions
    this.generateSuggestions(analysis);

    return analysis;
  }

  /**
   * Extract React components from the file
   */
  private extractComponents(sourceFile: SourceFile, analysis: FileAnalysis): void {
    // Find all JSX-returning functions
    sourceFile.forEachDescendant((node) => {
      if (Node.isFunctionDeclaration(node) || Node.isVariableStatement(node)) {
        const name = this.getFunctionName(node);
        if (name && /^[A-Z]/.test(name)) { // React components start with capital letter
          const hasJSX = this.containsJSX(node);
          if (hasJSX) {
            const extraction = this.extractNode(node, name, 'component');
            if (extraction && extraction.lines > 50) { // Only extract if component is substantial
              analysis.components.push(extraction);
            }
          }
        }
      }
    });
  }

  /**
   * Extract custom hooks from the file
   */
  private extractHooks(sourceFile: SourceFile, analysis: FileAnalysis): void {
    sourceFile.forEachDescendant((node) => {
      if (Node.isFunctionDeclaration(node) || Node.isVariableStatement(node)) {
        const name = this.getFunctionName(node);
        if (name && name.startsWith('use')) { // React hooks start with 'use'
          const extraction = this.extractNode(node, name, 'hook');
          if (extraction && extraction.lines > 20) {
            analysis.hooks.push(extraction);
          }
        }
      }
    });
  }

  /**
   * Extract utility functions
   */
  private extractUtilities(sourceFile: SourceFile, analysis: FileAnalysis): void {
    sourceFile.forEachDescendant((node) => {
      if (Node.isFunctionDeclaration(node) || Node.isVariableStatement(node)) {
        const name = this.getFunctionName(node);
        if (name && !name.startsWith('use') && !/^[A-Z]/.test(name)) {
          const extraction = this.extractNode(node, name, 'utility');
          if (extraction && extraction.lines > 10) {
            analysis.utilities.push(extraction);
          }
        }
      }
    });
  }

  /**
   * Extract type definitions
   */
  private extractTypes(sourceFile: SourceFile, analysis: FileAnalysis): void {
    // Extract interfaces
    sourceFile.getInterfaces().forEach(interfaceDecl => {
      const extraction: ComponentExtraction = {
        name: interfaceDecl.getName(),
        code: interfaceDecl.getFullText(),
        imports: new Set(),
        exports: ['export'],
        type: 'type',
        lines: interfaceDecl.getEndLineNumber() - interfaceDecl.getStartLineNumber()
      };
      analysis.types.push(extraction);
    });

    // Extract type aliases
    sourceFile.getTypeAliases().forEach(typeAlias => {
      const extraction: ComponentExtraction = {
        name: typeAlias.getName(),
        code: typeAlias.getFullText(),
        imports: new Set(),
        exports: ['export'],
        type: 'type',
        lines: typeAlias.getEndLineNumber() - typeAlias.getStartLineNumber()
      };
      analysis.types.push(extraction);
    });
  }

  /**
   * Extract a node (function/component) with its dependencies
   */
  private extractNode(node: Node, name: string, type: ComponentExtraction['type']): ComponentExtraction | null {
    try {
      const startLine = node.getStartLineNumber();
      const endLine = node.getEndLineNumber();
      const lines = endLine - startLine;

      // Get the full text of the node
      const code = node.getFullText();

      // Find imports used by this node
      const imports = this.findRequiredImports(node);

      return {
        name,
        code,
        imports,
        exports: ['export default', 'export'],
        type,
        lines
      };
    } catch (error) {
      if (config.verbose) {
        console.error(`Error extracting ${name}:`, error);
      }
      return null;
    }
  }

  /**
   * Find all imports required by a node
   */
  private findRequiredImports(node: Node): Set<string> {
    const imports = new Set<string>();
    
    // Find all identifiers used in the node
    node.forEachDescendant((child) => {
      if (Node.isIdentifier(child)) {
        const symbol = child.getSymbol();
        if (symbol) {
          const declarations = symbol.getDeclarations();
          declarations.forEach(decl => {
            const sourceFile = decl.getSourceFile();
            if (sourceFile !== node.getSourceFile()) {
              // This symbol is imported
              const importDecl = decl.getFirstAncestorByKind(SyntaxKind.ImportDeclaration);
              if (importDecl && Node.isImportDeclaration(importDecl)) {
                imports.add(importDecl.getFullText());
              }
            }
          });
        }
      }
    });

    return imports;
  }

  /**
   * Check if a node contains JSX
   */
  private containsJSX(node: Node): boolean {
    let hasJSX = false;
    node.forEachDescendant((child) => {
      if (Node.isJsxElement(child) || Node.isJsxSelfClosingElement(child) || Node.isJsxFragment(child)) {
        hasJSX = true;
        return true; // Stop searching
      }
    });
    return hasJSX;
  }

  /**
   * Get the name of a function/variable
   */
  private getFunctionName(node: Node): string | null {
    if (Node.isFunctionDeclaration(node)) {
      return node.getName() || null;
    }
    if (Node.isVariableStatement(node)) {
      const declaration = node.getDeclarations()[0];
      if (declaration) {
        return declaration.getName();
      }
    }
    return null;
  }

  /**
   * Calculate cyclomatic complexity
   */
  private calculateComplexity(sourceFile: SourceFile): number {
    let complexity = 1; // Base complexity

    sourceFile.forEachDescendant((node) => {
      // Count decision points
      if (
        Node.isIfStatement(node) ||
        Node.isConditionalExpression(node) ||
        Node.isSwitchStatement(node) ||
        Node.isForStatement(node) ||
        Node.isWhileStatement(node) ||
        Node.isDoStatement(node) ||
        Node.isCatchClause(node)
      ) {
        complexity++;
      }

      // Count case clauses
      if (Node.isCaseClause(node)) {
        complexity++;
      }

      // Count logical operators
      if (Node.isBinaryExpression(node)) {
        const operator = node.getOperatorToken().getText();
        if (operator === '&&' || operator === '||') {
          complexity++;
        }
      }
    });

    return complexity;
  }

  /**
   * Generate suggestions for file splitting
   */
  private generateSuggestions(analysis: FileAnalysis): void {
    // Suggest extraction based on file size
    if (analysis.totalLines > config.maxLines) {
      analysis.suggestions.push(
        `File exceeds ${config.maxLines} lines. Consider splitting into multiple files.`
      );
    }

    // Suggest extracting large components
    analysis.components.forEach(comp => {
      if (comp.lines > 200) {
        analysis.suggestions.push(
          `Component '${comp.name}' has ${comp.lines} lines. Extract to separate file.`
        );
      }
    });

    // Suggest consolidating small utilities
    if (analysis.utilities.length > 10) {
      analysis.suggestions.push(
        `File has ${analysis.utilities.length} utility functions. Consider creating a utilities module.`
      );
    }

    // Suggest extracting types
    if (analysis.types.length > 5) {
      analysis.suggestions.push(
        `File has ${analysis.types.length} type definitions. Extract to types.ts file.`
      );
    }

    // Complexity warning
    if (analysis.complexity > 20) {
      analysis.suggestions.push(
        `High cyclomatic complexity (${analysis.complexity}). Refactor to reduce complexity.`
      );
    }
  }

  /**
   * Split a file based on analysis
   */
  async splitFile(analysis: FileAnalysis): Promise<void> {
    if (config.dryRun) {
      console.log(chalk.yellow(`\n[DRY RUN] Would split: ${analysis.filePath}`));
      this.printSplitPlan(analysis);
      return;
    }

    const baseDir = path.dirname(analysis.filePath);
    const baseName = path.basename(analysis.filePath, path.extname(analysis.filePath));
    const outputDir = config.outputDir || path.join(baseDir, baseName);

    // Create output directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Extract components
    for (const component of analysis.components) {
      if (component.lines > 50) {
        const fileName = `${this.toKebabCase(component.name)}.tsx`;
        const filePath = path.join(outputDir, fileName);
        this.writeExtractedFile(filePath, component);
        this.stats.componentsExtracted++;
        console.log(chalk.green(`  ✓ Extracted component: ${fileName}`));
      }
    }

    // Extract hooks
    for (const hook of analysis.hooks) {
      if (hook.lines > 20) {
        const fileName = `${this.toKebabCase(hook.name)}.ts`;
        const filePath = path.join(outputDir, 'hooks', fileName);
        this.writeExtractedFile(filePath, hook);
        this.stats.hooksExtracted++;
        console.log(chalk.green(`  ✓ Extracted hook: ${fileName}`));
      }
    }

    // Extract utilities
    if (analysis.utilities.length > 0) {
      const utilsFile = path.join(outputDir, 'utils.ts');
      const utilsContent = this.combineExtractions(analysis.utilities);
      this.writeFile(utilsFile, utilsContent);
      this.stats.utilitiesExtracted += analysis.utilities.length;
      console.log(chalk.green(`  ✓ Extracted ${analysis.utilities.length} utilities to utils.ts`));
    }

    // Extract types
    if (analysis.types.length > 0) {
      const typesFile = path.join(outputDir, 'types.ts');
      const typesContent = this.combineExtractions(analysis.types);
      this.writeFile(typesFile, typesContent);
      console.log(chalk.green(`  ✓ Extracted ${analysis.types.length} types to types.ts`));
    }

    // Create index file that re-exports everything
    this.createIndexFile(outputDir, analysis);

    this.stats.filesSplit++;
    this.stats.linesReduced += analysis.totalLines;
  }

  /**
   * Write an extracted component/hook to a file
   */
  private writeExtractedFile(filePath: string, extraction: ComponentExtraction): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const content = `${Array.from(extraction.imports).join('\n')}

${extraction.code}
`;

    this.writeFile(filePath, content);
  }

  /**
   * Combine multiple extractions into a single file
   */
  private combineExtractions(extractions: ComponentExtraction[]): string {
    const imports = new Set<string>();
    const bodies: string[] = [];

    extractions.forEach(ext => {
      ext.imports.forEach(imp => imports.add(imp));
      bodies.push(ext.code);
    });

    return `${Array.from(imports).join('\n')}

${bodies.join('\n\n')}
`;
  }

  /**
   * Create an index file that re-exports all split modules
   */
  private createIndexFile(outputDir: string, analysis: FileAnalysis): void {
    const exports: string[] = [];

    // Export components
    analysis.components.forEach(comp => {
      if (comp.lines > 50) {
        const fileName = this.toKebabCase(comp.name);
        exports.push(`export { default as ${comp.name} } from './${fileName}';`);
      }
    });

    // Export hooks
    analysis.hooks.forEach(hook => {
      if (hook.lines > 20) {
        const fileName = this.toKebabCase(hook.name);
        exports.push(`export { ${hook.name} } from './hooks/${fileName}';`);
      }
    });

    // Export utilities and types
    if (analysis.utilities.length > 0) {
      exports.push(`export * from './utils';`);
    }
    if (analysis.types.length > 0) {
      exports.push(`export * from './types';`);
    }

    const indexContent = exports.join('\n') + '\n';
    this.writeFile(path.join(outputDir, 'index.ts'), indexContent);
  }

  /**
   * Write content to a file
   */
  private writeFile(filePath: string, content: string): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf8');
  }

  /**
   * Convert PascalCase/camelCase to kebab-case
   */
  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();
  }

  /**
   * Print the split plan for dry run
   */
  private printSplitPlan(analysis: FileAnalysis): void {
    console.log(chalk.cyan('\nSplit Plan:'));
    console.log(chalk.gray('─'.repeat(50)));

    if (analysis.components.length > 0) {
      console.log(chalk.yellow('\nComponents to extract:'));
      analysis.components.forEach(comp => {
        if (comp.lines > 50) {
          console.log(`  - ${comp.name} (${comp.lines} lines)`);
        }
      });
    }

    if (analysis.hooks.length > 0) {
      console.log(chalk.yellow('\nHooks to extract:'));
      analysis.hooks.forEach(hook => {
        if (hook.lines > 20) {
          console.log(`  - ${hook.name} (${hook.lines} lines)`);
        }
      });
    }

    if (analysis.utilities.length > 0) {
      console.log(chalk.yellow(`\nUtilities to consolidate: ${analysis.utilities.length} functions`));
    }

    if (analysis.types.length > 0) {
      console.log(chalk.yellow(`\nTypes to extract: ${analysis.types.length} definitions`));
    }

    console.log(chalk.cyan('\nSuggestions:'));
    analysis.suggestions.forEach(suggestion => {
      console.log(`  💡 ${suggestion}`);
    });
  }

  /**
   * Process all large files in the codebase
   */
  async processAllLargeFiles(): Promise<void> {
    const files = glob.sync('**/*.{ts,tsx}', {
      ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/build/**']
    });

    const largeFiles: FileAnalysis[] = [];

    for (const file of files) {
      try {
        const analysis = await this.analyzeFile(file);
        if (analysis.totalLines > config.maxLines) {
          largeFiles.push(analysis);
        }
        this.stats.filesAnalyzed++;
      } catch (error) {
        if (config.verbose) {
          console.error(`Error analyzing ${file}:`, error);
        }
      }
    }

    console.log(chalk.cyan(`\nFound ${largeFiles.length} files exceeding ${config.maxLines} lines\n`));

    // Sort by size descending
    largeFiles.sort((a, b) => b.totalLines - a.totalLines);

    // Process each large file
    for (const analysis of largeFiles) {
      console.log(chalk.blue(`\nProcessing: ${analysis.filePath} (${analysis.totalLines} lines)`));
      await this.splitFile(analysis);
    }
  }

  /**
   * Print final statistics
   */
  printStats(): void {
    console.log(chalk.cyan('\n📊 Splitting Statistics'));
    console.log(chalk.gray('='.repeat(50)));
    console.log(`Files analyzed: ${this.stats.filesAnalyzed}`);
    console.log(`Files split: ${this.stats.filesSplit}`);
    console.log(`Components extracted: ${this.stats.componentsExtracted}`);
    console.log(`Hooks extracted: ${this.stats.hooksExtracted}`);
    console.log(`Utilities extracted: ${this.stats.utilitiesExtracted}`);
    console.log(`Total lines reduced: ${this.stats.linesReduced}`);
    
    if (config.dryRun) {
      console.log(chalk.yellow('\n⚠️  DRY RUN - No files were modified'));
    }
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log(chalk.blue('🔪 Large File Splitter'));
  console.log(chalk.gray('='.repeat(50)));

  if (config.dryRun) {
    console.log(chalk.yellow('🔍 DRY RUN MODE - No files will be modified\n'));
  }

  const splitter = new FileSplitter();

  try {
    if (config.targetFile) {
      // Process specific file
      console.log(chalk.cyan(`Analyzing: ${config.targetFile}\n`));
      const analysis = await splitter.analyzeFile(config.targetFile);
      await splitter.splitFile(analysis);
    } else if (config.all) {
      // Process all large files
      await splitter.processAllLargeFiles();
    } else {
      console.log(chalk.red('Please specify --file=<path> or --all'));
      console.log('\nUsage:');
      console.log('  npx ts-node split-large-files.ts --file=<path> [options]');
      console.log('  npx ts-node split-large-files.ts --all [options]');
      console.log('\nOptions:');
      console.log('  --max-lines=<number>  Maximum lines per file (default: 500)');
      console.log('  --output=<dir>        Output directory for split files');
      console.log('  --pattern=<pattern>   Pattern for splitting (e.g., "surface")');
      console.log('  --dry-run             Preview changes without modifying files');
      console.log('  --verbose             Show detailed output');
      process.exit(1);
    }

    splitter.printStats();

  } catch (error) {
    console.error(chalk.red('Error:'), error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}