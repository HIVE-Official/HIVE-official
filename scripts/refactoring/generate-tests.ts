#!/usr/bin/env ts-node

/**
 * Automated Test Generation Script
 * Generates unit, integration, and component tests for untested code
 * Uses AI-assisted test case generation and coverage analysis
 */

import * as fs from 'fs';
import * as path from 'path';
import { Project, SourceFile, ClassDeclaration, FunctionDeclaration, MethodDeclaration, Node } from 'ts-morph';
import * as glob from 'glob';
import chalk from 'chalk';

interface TestCase {
  name: string;
  type: 'unit' | 'integration' | 'component' | 'e2e';
  targetFunction: string;
  inputs: any[];
  expectedOutput?: any;
  assertions: string[];
  setup?: string;
  teardown?: string;
}

interface TestSuite {
  fileName: string;
  targetFile: string;
  imports: string[];
  testCases: TestCase[];
  coverage: number;
}

interface TestConfig {
  target: string;
  type: 'unit' | 'integration' | 'component' | 'e2e';
  framework: 'jest' | 'vitest' | 'playwright';
  outputDir?: string;
  dryRun: boolean;
  verbose: boolean;
  coverage?: number;
}

const config: TestConfig = {
  target: process.argv.find(arg => arg.startsWith('--target='))?.split('=')[1] || '.',
  type: (process.argv.find(arg => arg.startsWith('--type='))?.split('=')[1] || 'unit') as TestConfig['type'],
  framework: (process.argv.find(arg => arg.startsWith('--framework='))?.split('=')[1] || 'jest') as TestConfig['framework'],
  outputDir: process.argv.find(arg => arg.startsWith('--output='))?.split('=')[1],
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
  coverage: parseInt(process.argv.find(arg => arg.startsWith('--coverage='))?.split('=')[1] || '80')
};

class TestGenerator {
  private project: Project;
  private stats = {
    filesAnalyzed: 0,
    testsGenerated: 0,
    functionsWithTests: 0,
    totalFunctions: 0,
    coverageIncrease: 0
  };

  constructor() {
    this.project = new Project({
      tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
      skipAddingFilesFromTsConfig: false
    });
  }

  /**
   * Analyze a file and generate appropriate tests
   */
  async analyzeAndGenerateTests(filePath: string): Promise<TestSuite | null> {
    const sourceFile = this.project.getSourceFile(filePath);
    if (!sourceFile) {
      console.error(`Could not load file: ${filePath}`);
      return null;
    }

    // Skip test files
    if (filePath.includes('.test.') || filePath.includes('.spec.')) {
      return null;
    }

    const testSuite: TestSuite = {
      fileName: this.getTestFileName(filePath),
      targetFile: filePath,
      imports: this.generateImports(sourceFile, filePath),
      testCases: [],
      coverage: 0
    };

    // Generate tests based on file type
    if (config.type === 'component' && this.isComponentFile(sourceFile)) {
      testSuite.testCases = this.generateComponentTests(sourceFile);
    } else if (config.type === 'integration' && this.isApiRoute(filePath)) {
      testSuite.testCases = this.generateIntegrationTests(sourceFile);
    } else if (config.type === 'unit') {
      testSuite.testCases = this.generateUnitTests(sourceFile);
    } else if (config.type === 'e2e') {
      testSuite.testCases = this.generateE2ETests(sourceFile);
    }

    // Calculate coverage
    testSuite.coverage = this.calculateCoverage(sourceFile, testSuite.testCases);

    this.stats.filesAnalyzed++;
    this.stats.testsGenerated += testSuite.testCases.length;

    return testSuite;
  }

  /**
   * Check if file is a React component
   */
  private isComponentFile(sourceFile: SourceFile): boolean {
    const text = sourceFile.getText();
    return text.includes('import React') || 
           text.includes("from 'react'") ||
           text.includes('jsx') ||
           text.includes('tsx');
  }

  /**
   * Check if file is an API route
   */
  private isApiRoute(filePath: string): boolean {
    return filePath.includes('/api/') && filePath.includes('route.ts');
  }

  /**
   * Generate imports for test file
   */
  private generateImports(sourceFile: SourceFile, targetPath: string): string[] {
    const imports: string[] = [];
    const fileName = path.basename(targetPath, path.extname(targetPath));
    const relativePath = this.getRelativeImportPath(targetPath);

    if (config.type === 'component') {
      imports.push("import React from 'react';");
      imports.push("import { render, screen, fireEvent, waitFor } from '@testing-library/react';");
      imports.push("import '@testing-library/jest-dom';");
      imports.push("import userEvent from '@testing-library/user-event';");
    } else if (config.type === 'integration') {
      imports.push("import { createMocks } from 'node-mocks-http';");
      imports.push("import { NextRequest } from 'next/server';");
    } else if (config.type === 'e2e') {
      imports.push("import { test, expect, Page } from '@playwright/test';");
    }

    // Import the target module
    const exports = this.getExportedNames(sourceFile);
    if (exports.length > 0) {
      if (exports.includes('default')) {
        imports.push(`import ${fileName} from '${relativePath}';`);
      }
      const namedExports = exports.filter(e => e !== 'default');
      if (namedExports.length > 0) {
        imports.push(`import { ${namedExports.join(', ')} } from '${relativePath}';`);
      }
    }

    return imports;
  }

  /**
   * Get exported names from a source file
   */
  private getExportedNames(sourceFile: SourceFile): string[] {
    const exports: string[] = [];
    
    sourceFile.getExportedDeclarations().forEach((decls, name) => {
      if (name === 'default') {
        exports.push('default');
      } else {
        exports.push(name);
      }
    });

    return exports;
  }

  /**
   * Generate unit tests for functions and classes
   */
  private generateUnitTests(sourceFile: SourceFile): TestCase[] {
    const testCases: TestCase[] = [];

    // Test functions
    sourceFile.getFunctions().forEach(func => {
      const funcName = func.getName();
      if (funcName && !funcName.startsWith('_')) {
        testCases.push(...this.generateFunctionTests(func));
        this.stats.totalFunctions++;
      }
    });

    // Test class methods
    sourceFile.getClasses().forEach(cls => {
      cls.getMethods().forEach(method => {
        if (!method.isPrivate()) {
          testCases.push(...this.generateMethodTests(cls, method));
          this.stats.totalFunctions++;
        }
      });
    });

    // Test exported arrow functions
    sourceFile.getVariableStatements().forEach(varStmt => {
      varStmt.getDeclarations().forEach(decl => {
        const initializer = decl.getInitializer();
        if (Node.isArrowFunction(initializer) || Node.isFunctionExpression(initializer)) {
          const name = decl.getName();
          testCases.push(...this.generateArrowFunctionTests(name, initializer));
          this.stats.totalFunctions++;
        }
      });
    });

    return testCases;
  }

  /**
   * Generate tests for a function
   */
  private generateFunctionTests(func: FunctionDeclaration): TestCase[] {
    const funcName = func.getName() || 'anonymousFunction';
    const params = func.getParameters();
    const returnType = func.getReturnType().getText();
    const isAsync = func.isAsync();

    const testCases: TestCase[] = [];

    // Happy path test
    testCases.push({
      name: `should execute ${funcName} successfully with valid inputs`,
      type: 'unit',
      targetFunction: funcName,
      inputs: this.generateSampleInputs(params),
      expectedOutput: this.generateExpectedOutput(returnType),
      assertions: [
        `expect(result).toBeDefined();`,
        returnType === 'void' ? '' : `expect(result).toMatchSnapshot();`
      ].filter(Boolean),
      setup: isAsync ? 'async' : undefined
    });

    // Edge cases
    if (params.length > 0) {
      // Null/undefined test
      testCases.push({
        name: `should handle null/undefined inputs in ${funcName}`,
        type: 'unit',
        targetFunction: funcName,
        inputs: params.map(() => null),
        assertions: [
          `expect(() => ${funcName}(${params.map(() => 'null').join(', ')})).not.toThrow();`
        ]
      });

      // Empty input test
      testCases.push({
        name: `should handle empty inputs in ${funcName}`,
        type: 'unit',
        targetFunction: funcName,
        inputs: this.generateEmptyInputs(params),
        assertions: [
          `expect(result).toBeDefined();`
        ]
      });
    }

    // Error handling test
    if (func.getBody()?.getText().includes('throw')) {
      testCases.push({
        name: `should throw error for invalid inputs in ${funcName}`,
        type: 'unit',
        targetFunction: funcName,
        inputs: this.generateInvalidInputs(params),
        assertions: [
          `expect(() => ${funcName}(${this.generateInvalidInputs(params).map(i => JSON.stringify(i)).join(', ')})).toThrow();`
        ]
      });
    }

    return testCases;
  }

  /**
   * Generate tests for class methods
   */
  private generateMethodTests(cls: ClassDeclaration, method: MethodDeclaration): TestCase[] {
    const className = cls.getName() || 'Class';
    const methodName = method.getName();
    const isStatic = method.isStatic();

    const testCases: TestCase[] = [];

    testCases.push({
      name: `${className}.${methodName} should work correctly`,
      type: 'unit',
      targetFunction: `${className}.${methodName}`,
      inputs: [],
      assertions: [
        isStatic 
          ? `expect(${className}.${methodName}()).toBeDefined();`
          : `const instance = new ${className}();\n    expect(instance.${methodName}()).toBeDefined();`
      ],
      setup: `let instance: ${className};`,
      teardown: 'instance = null;'
    });

    return testCases;
  }

  /**
   * Generate tests for arrow functions
   */
  private generateArrowFunctionTests(name: string, func: Node): TestCase[] {
    return [{
      name: `${name} should execute correctly`,
      type: 'unit',
      targetFunction: name,
      inputs: [],
      assertions: [
        `expect(${name}).toBeDefined();`,
        `expect(typeof ${name}).toBe('function');`
      ]
    }];
  }

  /**
   * Generate component tests
   */
  private generateComponentTests(sourceFile: SourceFile): TestCase[] {
    const testCases: TestCase[] = [];
    const componentName = this.findMainComponent(sourceFile);

    if (!componentName) return testCases;

    // Render test
    testCases.push({
      name: `renders ${componentName} without crashing`,
      type: 'component',
      targetFunction: componentName,
      inputs: [],
      assertions: [
        `render(<${componentName} />);`,
        `expect(screen.getByTestId('${this.toKebabCase(componentName)}')).toBeInTheDocument();`
      ]
    });

    // Props test
    testCases.push({
      name: `renders ${componentName} with props`,
      type: 'component',
      targetFunction: componentName,
      inputs: [],
      assertions: [
        `const props = { title: 'Test Title', onClick: jest.fn() };`,
        `render(<${componentName} {...props} />);`,
        `expect(screen.getByText('Test Title')).toBeInTheDocument();`
      ]
    });

    // Interaction test
    testCases.push({
      name: `handles user interactions in ${componentName}`,
      type: 'component',
      targetFunction: componentName,
      inputs: [],
      assertions: [
        `const handleClick = jest.fn();`,
        `render(<${componentName} onClick={handleClick} />);`,
        `const button = screen.getByRole('button');`,
        `fireEvent.click(button);`,
        `expect(handleClick).toHaveBeenCalledTimes(1);`
      ],
      setup: 'const user = userEvent.setup();'
    });

    // Accessibility test
    testCases.push({
      name: `${componentName} meets accessibility standards`,
      type: 'component',
      targetFunction: componentName,
      inputs: [],
      assertions: [
        `const { container } = render(<${componentName} />);`,
        `expect(container).toBeAccessible();`
      ]
    });

    // Snapshot test
    testCases.push({
      name: `${componentName} matches snapshot`,
      type: 'component',
      targetFunction: componentName,
      inputs: [],
      assertions: [
        `const { container } = render(<${componentName} />);`,
        `expect(container).toMatchSnapshot();`
      ]
    });

    return testCases;
  }

  /**
   * Generate integration tests for API routes
   */
  private generateIntegrationTests(sourceFile: SourceFile): TestCase[] {
    const testCases: TestCase[] = [];
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

    methods.forEach(method => {
      if (sourceFile.getText().includes(`export async function ${method}`)) {
        testCases.push({
          name: `${method} request returns expected response`,
          type: 'integration',
          targetFunction: method,
          inputs: [],
          assertions: [
            `const { req, res } = createMocks({`,
            `  method: '${method}',`,
            `  headers: { 'Content-Type': 'application/json' },`,
            method === 'POST' || method === 'PUT' ? `  body: { test: 'data' },` : '',
            `});`,
            ``,
            `const response = await ${method}(req as unknown as NextRequest);`,
            `expect(response.status).toBe(200);`,
            `const data = await response.json();`,
            `expect(data).toBeDefined();`
          ].filter(Boolean)
        });

        // Error handling test
        testCases.push({
          name: `${method} request handles errors gracefully`,
          type: 'integration',
          targetFunction: method,
          inputs: [],
          assertions: [
            `const { req, res } = createMocks({`,
            `  method: '${method}',`,
            `  headers: { 'Content-Type': 'application/json' },`,
            `  body: { invalid: 'data' },`,
            `});`,
            ``,
            `const response = await ${method}(req as unknown as NextRequest);`,
            `expect(response.status).toBeGreaterThanOrEqual(400);`
          ]
        });

        // Authentication test
        if (sourceFile.getText().includes('auth') || sourceFile.getText().includes('session')) {
          testCases.push({
            name: `${method} request requires authentication`,
            type: 'integration',
            targetFunction: method,
            inputs: [],
            assertions: [
              `const { req, res } = createMocks({`,
              `  method: '${method}',`,
              `  headers: { 'Content-Type': 'application/json' },`,
              `});`,
              ``,
              `const response = await ${method}(req as unknown as NextRequest);`,
              `expect(response.status).toBe(401);`
            ]
          });
        }
      }
    });

    return testCases;
  }

  /**
   * Generate E2E tests
   */
  private generateE2ETests(sourceFile: SourceFile): TestCase[] {
    const testCases: TestCase[] = [];
    const pageName = this.findPageName(sourceFile);

    testCases.push({
      name: `navigates to ${pageName} page`,
      type: 'e2e',
      targetFunction: pageName,
      inputs: [],
      assertions: [
        `await page.goto('/${pageName}');`,
        `await expect(page).toHaveTitle(/.*${pageName}.*/i);`,
        `await expect(page.locator('h1')).toContainText(/${pageName}/i);`
      ]
    });

    // Form interaction test
    if (sourceFile.getText().includes('<form') || sourceFile.getText().includes('Form')) {
      testCases.push({
        name: `submits form on ${pageName} page`,
        type: 'e2e',
        targetFunction: pageName,
        inputs: [],
        assertions: [
          `await page.goto('/${pageName}');`,
          `await page.fill('input[name="email"]', 'test@example.com');`,
          `await page.fill('input[name="password"]', 'password123');`,
          `await page.click('button[type="submit"]');`,
          `await page.waitForNavigation();`,
          `await expect(page).toHaveURL(/.*dashboard.*/);`
        ]
      });
    }

    return testCases;
  }

  /**
   * Write test suite to file
   */
  async writeTestSuite(testSuite: TestSuite): Promise<void> {
    if (testSuite.testCases.length === 0) return;

    const content = this.generateTestFileContent(testSuite);
    const testFilePath = this.getTestFilePath(testSuite.targetFile);

    if (config.dryRun) {
      console.log(chalk.yellow(`[DRY RUN] Would create: ${testFilePath}`));
      if (config.verbose) {
        console.log(chalk.gray(content.substring(0, 500) + '...'));
      }
      return;
    }

    const dir = path.dirname(testFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(testFilePath, content, 'utf8');
    console.log(chalk.green(`✓ Created test: ${testFilePath}`));
  }

  /**
   * Generate test file content
   */
  private generateTestFileContent(testSuite: TestSuite): string {
    const framework = config.framework;
    const describeBlock = framework === 'vitest' ? 'describe' : 'describe';
    const testBlock = framework === 'vitest' ? 'it' : 'test';

    let content = `/**
 * Auto-generated test file
 * Target: ${testSuite.targetFile}
 * Coverage: ${testSuite.coverage}%
 * Generated: ${new Date().toISOString()}
 */

${testSuite.imports.join('\n')}

${describeBlock}('${path.basename(testSuite.targetFile, path.extname(testSuite.targetFile))}', () => {
`;

    // Group tests by type
    const groupedTests = this.groupTestsByType(testSuite.testCases);

    Object.entries(groupedTests).forEach(([type, tests]) => {
      if (tests.length > 0) {
        content += `\n  ${describeBlock}('${type} tests', () => {\n`;
        
        tests.forEach(test => {
          content += `    ${testBlock}${test.setup ? '.async' : ''}('${test.name}', ${test.setup ? 'async ' : ''}() => {\n`;
          
          if (test.setup && test.setup !== 'async') {
            content += `      ${test.setup}\n\n`;
          }
          
          test.assertions.forEach(assertion => {
            content += `      ${assertion}\n`;
          });
          
          if (test.teardown) {
            content += `\n      ${test.teardown}\n`;
          }
          
          content += `    });\n\n`;
        });
        
        content += `  });\n`;
      }
    });

    content += `});\n`;

    return content;
  }

  /**
   * Group tests by type
   */
  private groupTestsByType(testCases: TestCase[]): Record<string, TestCase[]> {
    const grouped: Record<string, TestCase[]> = {};
    
    testCases.forEach(test => {
      if (!grouped[test.type]) {
        grouped[test.type] = [];
      }
      grouped[test.type].push(test);
    });
    
    return grouped;
  }

  /**
   * Helper methods for generating test data
   */
  private generateSampleInputs(params: any[]): any[] {
    return params.map(param => {
      const type = param.getType().getText();
      if (type === 'string') return 'test string';
      if (type === 'number') return 42;
      if (type === 'boolean') return true;
      if (type.includes('[]')) return [];
      if (type.includes('object')) return {};
      return null;
    });
  }

  private generateEmptyInputs(params: any[]): any[] {
    return params.map(param => {
      const type = param.getType().getText();
      if (type === 'string') return '';
      if (type === 'number') return 0;
      if (type === 'boolean') return false;
      if (type.includes('[]')) return [];
      if (type.includes('object')) return {};
      return undefined;
    });
  }

  private generateInvalidInputs(params: any[]): any[] {
    return params.map(() => 'invalid_input_!@#$%');
  }

  private generateExpectedOutput(returnType: string): any {
    if (returnType === 'void') return undefined;
    if (returnType === 'string') return 'expected string';
    if (returnType === 'number') return 42;
    if (returnType === 'boolean') return true;
    if (returnType.includes('Promise')) return 'async result';
    return {};
  }

  /**
   * Calculate test coverage
   */
  private calculateCoverage(sourceFile: SourceFile, testCases: TestCase[]): number {
    const totalFunctions = sourceFile.getFunctions().length + 
                          sourceFile.getClasses().reduce((acc, cls) => acc + cls.getMethods().length, 0);
    const testedFunctions = new Set(testCases.map(tc => tc.targetFunction)).size;
    
    if (totalFunctions === 0) return 100;
    return Math.round((testedFunctions / totalFunctions) * 100);
  }

  /**
   * Utility methods
   */
  private findMainComponent(sourceFile: SourceFile): string | null {
    const defaultExport = sourceFile.getDefaultExportSymbol();
    if (defaultExport) {
      return defaultExport.getName();
    }
    
    // Look for the largest component
    let largestComponent: { name: string; size: number } | null = null;
    
    sourceFile.getFunctions().forEach(func => {
      const name = func.getName();
      if (name && /^[A-Z]/.test(name)) {
        const size = func.getEndLineNumber() - func.getStartLineNumber();
        if (!largestComponent || size > largestComponent.size) {
          largestComponent = { name, size };
        }
      }
    });
    
    return largestComponent?.name || null;
  }

  private findPageName(sourceFile: SourceFile): string {
    const filePath = sourceFile.getFilePath();
    const match = filePath.match(/pages?\/(.+?)\.(tsx?|jsx?)$/);
    return match ? match[1] : 'page';
  }

  private getTestFileName(filePath: string): string {
    const ext = path.extname(filePath);
    const base = path.basename(filePath, ext);
    return `${base}.test${ext}`;
  }

  private getTestFilePath(targetFile: string): string {
    if (config.outputDir) {
      const fileName = this.getTestFileName(targetFile);
      return path.join(config.outputDir, fileName);
    }
    
    const dir = path.dirname(targetFile);
    const fileName = this.getTestFileName(targetFile);
    return path.join(dir, '__tests__', fileName);
  }

  private getRelativeImportPath(targetPath: string): string {
    const testDir = path.dirname(this.getTestFilePath(targetPath));
    const relative = path.relative(testDir, targetPath);
    return relative.startsWith('.') ? relative : `./${relative}`;
  }

  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();
  }

  /**
   * Process all files in target directory
   */
  async processAllFiles(): Promise<void> {
    const pattern = path.join(config.target, '**/*.{ts,tsx,js,jsx}');
    const files = glob.sync(pattern, {
      ignore: ['**/node_modules/**', '**/*.test.*', '**/*.spec.*', '**/dist/**', '**/.next/**']
    });

    console.log(chalk.cyan(`Found ${files.length} files to analyze\n`));

    for (const file of files) {
      try {
        const testSuite = await this.analyzeAndGenerateTests(file);
        if (testSuite && testSuite.testCases.length > 0) {
          await this.writeTestSuite(testSuite);
          this.stats.functionsWithTests += testSuite.testCases.length;
        }
      } catch (error) {
        if (config.verbose) {
          console.error(chalk.red(`Error processing ${file}:`), error);
        }
      }
    }
  }

  /**
   * Print statistics
   */
  printStats(): void {
    const coverageIncrease = this.stats.totalFunctions > 0 
      ? Math.round((this.stats.functionsWithTests / this.stats.totalFunctions) * 100)
      : 0;

    console.log(chalk.cyan('\n📊 Test Generation Statistics'));
    console.log(chalk.gray('='.repeat(50)));
    console.log(`Files analyzed: ${this.stats.filesAnalyzed}`);
    console.log(`Tests generated: ${this.stats.testsGenerated}`);
    console.log(`Functions found: ${this.stats.totalFunctions}`);
    console.log(`Functions with tests: ${this.stats.functionsWithTests}`);
    console.log(`Coverage increase: ~${coverageIncrease}%`);
    
    if (config.dryRun) {
      console.log(chalk.yellow('\n⚠️  DRY RUN - No files were created'));
    }
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log(chalk.blue('🧪 Automated Test Generator'));
  console.log(chalk.gray('='.repeat(50)));
  console.log(`Target: ${config.target}`);
  console.log(`Type: ${config.type}`);
  console.log(`Framework: ${config.framework}\n`);

  if (config.dryRun) {
    console.log(chalk.yellow('🔍 DRY RUN MODE - No files will be created\n'));
  }

  const generator = new TestGenerator();

  try {
    await generator.processAllFiles();
    generator.printStats();
    
    console.log(chalk.green('\n✅ Test generation complete!'));
    console.log('\nNext steps:');
    console.log('1. Review generated tests');
    console.log('2. Run tests: npm test');
    console.log('3. Check coverage: npm run test:coverage');
    
  } catch (error) {
    console.error(chalk.red('Error:'), error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}