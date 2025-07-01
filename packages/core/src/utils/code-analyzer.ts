import { parse } from '@typescript-eslint/parser';
import type { TSESTree } from '@typescript-eslint/types';

interface ComplexityMetrics {
  cyclomaticComplexity?: number;
  cognitiveComplexity?: number;
  maintainabilityIndex?: number;
  numberOfParameters?: number;
  lineCount?: number;
  dependencies?: string[];
  potentialIssues: string[];
}

interface FunctionMetrics extends ComplexityMetrics {
  name?: string;
  async?: boolean;
  returnType?: string;
}

interface ComponentMetrics extends ComplexityMetrics {
  name?: string;
  propsCount?: number;
  stateCount?: number;
  effectCount?: number;
  renderCount?: number;
}

export class CodeAnalyzer {
  private static COMPLEXITY_THRESHOLDS = {
    CYCLOMATIC: 10,
    COGNITIVE: 15,
    MAINTAINABILITY: 65,
    PARAMS: 4,
    LINES: 50,
    DEPENDENCIES: 10,
    PROPS: 8,
    STATE_VARS: 5,
    EFFECTS: 3,
  };

  /**
   * Analyzes a TypeScript/JavaScript function or component
   */
  static analyzeCode(code: string): ComplexityMetrics {
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    });

    return {
      ...this.calculateComplexityMetrics(ast),
      ...this.analyzeDependencies(ast),
      potentialIssues: this.identifyPotentialIssues(ast),
    };
  }

  /**
   * Analyzes a React component specifically
   */
  static analyzeComponent(code: string): ComponentMetrics {
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    });

    const baseMetrics = this.calculateComplexityMetrics(ast);
    const componentMetrics = this.analyzeReactMetrics(ast);

    const potentialIssues = [
      ...this.identifyPotentialIssues(ast),
      ...this.identifyReactSpecificIssues(componentMetrics),
    ];

    return {
      ...baseMetrics,
      ...componentMetrics,
      potentialIssues,
    };
  }

  private static calculateComplexityMetrics(ast: TSESTree.Program): Partial<ComplexityMetrics> {
    let cyclomaticComplexity = 1;
    let cognitiveComplexity = 0;
    let lineCount = 0;

    const visitor = (node: TSESTree.Node) => {
      // Increase cyclomatic complexity for control flow statements
      switch (node.type) {
        case 'IfStatement':
        case 'WhileStatement':
        case 'DoWhileStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'ForOfStatement':
        case 'ConditionalExpression':
          cyclomaticComplexity++;
          cognitiveComplexity += 1;
          break;
        case 'SwitchCase':
          if (node.test) cyclomaticComplexity++;
          break;
        case 'LogicalExpression':
          cognitiveComplexity += 1;
          break;
        case 'TryStatement':
          cognitiveComplexity += 1;
          break;
      }

      // Count lines
      if (node.loc) {
        lineCount = Math.max(lineCount, node.loc.end.line);
      }
    };

    this.traverseAST(ast, visitor);

    // Calculate maintainability index
    const maintainabilityIndex = Math.max(
      0,
      171 - 
      (5.2 * Math.log(cyclomaticComplexity)) - 
      (0.23 * cognitiveComplexity) -
      (16.2 * Math.log(lineCount))
    );

    return {
      cyclomaticComplexity,
      cognitiveComplexity,
      maintainabilityIndex,
      lineCount,
    };
  }

  private static analyzeReactMetrics(ast: TSESTree.Program): Partial<ComponentMetrics> {
    let propsCount = 0;
    let stateCount = 0;
    let effectCount = 0;
    let renderCount = 0;
    let name = '';

    const visitor = (node: TSESTree.Node) => {
      // Count useState hooks
      if (
        node.type === 'CallExpression' &&
        node.callee.type === 'Identifier' &&
        node.callee.name === 'useState'
      ) {
        stateCount++;
      }

      // Count useEffect hooks
      if (
        node.type === 'CallExpression' &&
        node.callee.type === 'Identifier' &&
        node.callee.name === 'useEffect'
      ) {
        effectCount++;
      }

      // Count render methods/returns
      if (node.type === 'ReturnStatement' && node.argument?.type === 'JSXElement') {
        renderCount++;
      }

      // Get component name
      if (
        node.type === 'FunctionDeclaration' ||
        node.type === 'VariableDeclarator'
      ) {
        if ('id' in node && node.id?.type === 'Identifier') {
          name = node.id.name;
        }
      }

      // Count props
      if (
        node.type === 'Property' &&
        node.parent?.type === 'ObjectPattern' &&
        node.parent.parent?.type === 'VariableDeclarator'
      ) {
        propsCount++;
      }
    };

    this.traverseAST(ast, visitor);

    return {
      name,
      propsCount,
      stateCount,
      effectCount,
      renderCount,
    };
  }

  private static analyzeDependencies(ast: TSESTree.Program): Pick<ComplexityMetrics, 'dependencies'> {
    const dependencies: Set<string> = new Set();

    const visitor = (node: TSESTree.Node) => {
      if (
        node.type === 'ImportDeclaration' &&
        typeof node.source.value === 'string'
      ) {
        dependencies.add(node.source.value);
      }
    };

    this.traverseAST(ast, visitor);

    return {
      dependencies: Array.from(dependencies),
    };
  }

  private static identifyPotentialIssues(ast: TSESTree.Program): string[] {
    const issues: string[] = [];

    const visitor = (node: TSESTree.Node) => {
      // Check for console.log statements
      if (
        node.type === 'CallExpression' &&
        node.callee.type === 'MemberExpression' &&
        node.callee.object.type === 'Identifier' &&
        node.callee.object.name === 'console'
      ) {
        issues.push('Contains console statement');
      }


      // Check for any type usage
      if (
        node.type === 'TSAnyKeyword'
      ) {
        issues.push('Uses "any" type');
      }

      // Check for nested ternary expressions
      if (
        node.type === 'ConditionalExpression' &&
        (node.consequent.type === 'ConditionalExpression' ||
         node.alternate.type === 'ConditionalExpression')
      ) {
        issues.push('Contains nested ternary expression');
      }
    };

    this.traverseAST(ast, visitor);

    return issues;
  }

  private static identifyReactSpecificIssues(metrics: Partial<ComponentMetrics>): string[] {
    const issues: string[] = [];

    if ((metrics.propsCount ?? 0) > this.COMPLEXITY_THRESHOLDS.PROPS) {
      issues.push(`High prop count (${metrics.propsCount})`);
    }

    if ((metrics.stateCount ?? 0) > this.COMPLEXITY_THRESHOLDS.STATE_VARS) {
      issues.push(`High state variable count (${metrics.stateCount})`);
    }

    if ((metrics.effectCount ?? 0) > this.COMPLEXITY_THRESHOLDS.EFFECTS) {
      issues.push(`High useEffect count (${metrics.effectCount})`);
    }

    return issues;
  }

  private static traverseAST(ast: TSESTree.Program, visitor: (node: TSESTree.Node) => void) {
    function traverse(node: TSESTree.Node) {
      visitor(node);
      for (const key in node) {
        const child = (node as any)[key];
        if (child && typeof child === 'object') {
          if (Array.isArray(child)) {
            child.forEach(item => {
              if (item && typeof item === 'object') {
                traverse(item);
              }
            });
          } else if ('type' in child) {
            traverse(child);
          }
        }
      }
    }
    traverse(ast);
  }
} 