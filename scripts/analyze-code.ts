import { glob } from 'glob';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

interface AnalysisResult {
  file: string;
  metrics: {
    lineCount: number;
    complexity: number;
    issues: string[];
  };
  issues: string[];
}

interface SimpleMetrics {
  lineCount: number;
  complexity: number;
  issues: string[];
}

// Simple code analyzer without external dependencies
function analyzeCodeSimple(content: string): SimpleMetrics {
  const lines = content.split('\n');
  const lineCount = lines.length;
  
  let complexity = 1; // Base complexity
  const issues: string[] = [];
  
  // Count complexity indicators
  const complexityPatterns = [
    /\bif\s*\(/g,
    /\belse\b/g,
    /\bwhile\s*\(/g,
    /\bfor\s*\(/g,
    /\bswitch\s*\(/g,
    /\bcase\s+/g,
    /\bcatch\s*\(/g,
    /\?\s*.*?\s*:/g, // Ternary operators
  ];
  
  complexityPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      complexity += matches.length;
    }
  });
  
  // Check for issues
  if (content.includes('console.log')) {
    issues.push('Contains console.log statements');
  }
  
  if (content.includes('any')) {
    issues.push('Uses "any" type');
  }
  
  if (content.includes('TODO')) {
    issues.push('Contains TODO comments');
  }
  
  if (lineCount > 300) {
    issues.push('File too large');
  }
  
  if (complexity > 15) {
    issues.push('High complexity');
  }
  
  // Count React-specific patterns
  const useStateCount = (content.match(/useState\s*\(/g) || []).length;
  const useEffectCount = (content.match(/useEffect\s*\(/g) || []).length;
  const propsCount = (content.match(/interface\s+\w+Props\s*{[^}]+}/g) || []).length;
  
  if (useStateCount > 5) {
    issues.push(`High useState count (${useStateCount})`);
  }
  
  if (useEffectCount > 3) {
    issues.push(`High useEffect count (${useEffectCount})`);
  }
  
  if (propsCount > 8) {
    issues.push(`High props count (${propsCount})`);
  }
  
  return {
    lineCount,
    complexity,
    issues,
  };
}

async function analyzeCodebase(): Promise<void> {
  console.log(chalk.blue('🔍 Starting code analysis...'));

  // Find all TypeScript/React files
  const files = await glob('**/*.{ts,tsx}', {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
    ],
  });

  const results: AnalysisResult[] = [];
  let totalIssues = 0;
  let complexComponents = 0;
  let highRiskFiles = 0;

  // Analyze each file
  for (const file of files) {
    const content = readFileSync(resolve(file), 'utf-8');
    const metrics = analyzeCodeSimple(content);

    const allIssues = [
      ...metrics.issues,
      ...(metrics.complexity > 10 ? ['High complexity'] : []),
      ...(metrics.lineCount > 200 ? ['File too large'] : []),
    ];

    if (allIssues.length > 0) {
      totalIssues += allIssues.length;
      results.push({ 
        file, 
        metrics: {
          ...metrics,
          issues: allIssues
        },
        issues: allIssues 
      });

      if (file.endsWith('.tsx') && (
        metrics.issues.includes('High useState count') ||
        metrics.issues.includes('High useEffect count') ||
        metrics.issues.includes('High props count')
      )) {
        complexComponents++;
      }

      if (metrics.complexity > 15 || metrics.lineCount > 300) {
        highRiskFiles++;
      }
    }
  }

  // Print results
  console.log('\n' + chalk.blue('📊 Analysis Results:'));
  console.log(chalk.white(`Total files analyzed: ${files.length}`));
  console.log(chalk.yellow(`Total issues found: ${totalIssues}`));
  console.log(chalk.yellow(`Complex components: ${complexComponents}`));
  console.log(chalk.red(`High risk files: ${highRiskFiles}`));

  // Print detailed issues
  if (results.length > 0) {
    console.log('\n' + chalk.red('🚨 Issues found:'));
    results.forEach(({ file, metrics }) => {
      console.log('\n' + chalk.white(file));
      console.log(chalk.gray('Metrics:'));
      console.log(chalk.gray(`  Complexity: ${metrics.complexity}`));
      console.log(chalk.gray(`  Line Count: ${metrics.lineCount}`));

      console.log(chalk.yellow('Issues:'));
      metrics.issues.forEach(issue => console.log(chalk.yellow(`  - ${issue}`)));
    });
  }

  // Exit with error if there are high risk files
  if (highRiskFiles > 0) {
    console.log('\n' + chalk.red('❌ High risk files detected. Please review and refactor.'));
    process.exit(1);
  }

  console.log('\n' + chalk.green('✅ Code analysis complete!'));
}

analyzeCodebase().catch(error => {
  console.error(chalk.red('Error during analysis:'), error);
  process.exit(1);
}); 