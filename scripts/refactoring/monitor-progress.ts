#!/usr/bin/env ts-node

/**
 * Refactoring Progress Monitor
 * Real-time dashboard for tracking technical debt reduction
 * Provides metrics, visualizations, and progress tracking
 */

import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import Table from 'cli-table3';
import ora from 'ora';
import blessed from 'blessed';
import contrib from 'blessed-contrib';

const execAsync = promisify(exec);

interface Metrics {
  timestamp: Date;
  filesTotal: number;
  filesWithTests: number;
  testCoverage: number;
  anyTypes: number;
  consoleStatements: number;
  largeFiles: number;
  duplicatePatterns: number;
  bundleSize: number;
  buildTime: number;
  lintErrors: number;
  lintWarnings: number;
  typeErrors: number;
}

interface ProgressData {
  phase: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  metrics: Partial<Metrics>;
  tasks: Array<{
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    progress: number;
  }>;
}

class RefactoringMonitor {
  private screen: any;
  private grid: any;
  private widgets: {
    overview?: any;
    progress?: any;
    metrics?: any;
    tasks?: any;
    logs?: any;
    chart?: any;
  } = {};
  
  private baselineMetrics: Metrics | null = null;
  private currentMetrics: Metrics | null = null;
  private progressData: ProgressData[] = [];
  private logMessages: string[] = [];
  
  constructor() {
    if (process.argv.includes('--dashboard')) {
      this.initDashboard();
    }
  }

  /**
   * Initialize blessed dashboard
   */
  private initDashboard(): void {
    this.screen = blessed.screen({
      smartCSR: true,
      title: 'HIVE Refactoring Monitor'
    });

    this.grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen });

    // Overview widget (top left)
    this.widgets.overview = this.grid.set(0, 0, 3, 6, blessed.box, {
      label: ' Overview ',
      border: { type: 'line' },
      style: { border: { fg: 'cyan' } }
    });

    // Progress bars (top right)
    this.widgets.progress = this.grid.set(0, 6, 3, 6, contrib.gauge, {
      label: ' Overall Progress ',
      stroke: 'green',
      fill: 'white',
      percent: 0
    });

    // Metrics table (middle left)
    this.widgets.metrics = this.grid.set(3, 0, 4, 6, contrib.table, {
      label: ' Metrics ',
      columnSpacing: 2,
      columnWidth: [20, 10, 10, 10],
      style: { border: { fg: 'blue' } }
    });

    // Task list (middle right)
    this.widgets.tasks = this.grid.set(3, 6, 4, 6, blessed.list, {
      label: ' Active Tasks ',
      border: { type: 'line' },
      style: { 
        border: { fg: 'yellow' },
        selected: { bg: 'blue' }
      },
      mouse: true,
      keys: true
    });

    // Chart (bottom left)
    this.widgets.chart = this.grid.set(7, 0, 5, 8, contrib.line, {
      label: ' Progress Over Time ',
      showLegend: true,
      wholeNumbersOnly: false,
      style: { line: 'yellow', text: 'green', baseline: 'black' }
    });

    // Logs (bottom right)
    this.widgets.logs = this.grid.set(7, 8, 5, 4, blessed.log, {
      label: ' Logs ',
      border: { type: 'line' },
      style: { border: { fg: 'green' } },
      scrollable: true,
      mouse: true
    });

    // Quit on q, ESC, or Ctrl-C
    this.screen.key(['q', 'C-c', 'escape'], () => {
      this.screen.destroy();
      process.exit(0);
    });

    this.screen.render();
  }

  /**
   * Collect current metrics
   */
  async collectMetrics(): Promise<Metrics> {
    const spinner = ora('Collecting metrics...').start();
    
    const metrics: Metrics = {
      timestamp: new Date(),
      filesTotal: 0,
      filesWithTests: 0,
      testCoverage: 0,
      anyTypes: 0,
      consoleStatements: 0,
      largeFiles: 0,
      duplicatePatterns: 0,
      bundleSize: 0,
      buildTime: 0,
      lintErrors: 0,
      lintWarnings: 0,
      typeErrors: 0
    };

    try {
      // Count TypeScript files
      const tsFiles = glob.sync('**/*.{ts,tsx}', {
        ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**']
      });
      metrics.filesTotal = tsFiles.length;

      // Count test files
      const testFiles = glob.sync('**/*.{test,spec}.{ts,tsx}', {
        ignore: ['**/node_modules/**']
      });
      metrics.filesWithTests = testFiles.length;

      // Count 'any' types
      for (const file of tsFiles.slice(0, 100)) { // Sample for performance
        const content = fs.readFileSync(file, 'utf8');
        const anyMatches = content.match(/: any/g);
        if (anyMatches) {
          metrics.anyTypes += anyMatches.length;
        }
      }

      // Count console statements
      for (const file of tsFiles.slice(0, 100)) {
        const content = fs.readFileSync(file, 'utf8');
        const consoleMatches = content.match(/console\.(log|error|warn|info)/g);
        if (consoleMatches) {
          metrics.consoleStatements += consoleMatches.length;
        }
      }

      // Count large files
      metrics.largeFiles = tsFiles.filter(file => {
        const stats = fs.statSync(file);
        return stats.size > 50000; // >50KB
      }).length;

      // Get test coverage (if available)
      try {
        const coverageFile = 'coverage/coverage-summary.json';
        if (fs.existsSync(coverageFile)) {
          const coverage = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));
          metrics.testCoverage = coverage.total?.lines?.pct || 0;
        }
      } catch (e) {
        // Coverage not available
      }

      // Get bundle size (if built)
      try {
        const buildDir = '.next';
        if (fs.existsSync(buildDir)) {
          const { stdout } = await execAsync(`du -sb ${buildDir}`);
          metrics.bundleSize = parseInt(stdout.split('\t')[0]) / 1024 / 1024; // MB
        }
      } catch (e) {
        // Build not available
      }

      // Get lint results
      try {
        const { stdout } = await execAsync('npm run lint --silent', { 
          timeout: 30000 
        });
        const errorMatch = stdout.match(/(\d+) errors?/);
        const warningMatch = stdout.match(/(\d+) warnings?/);
        metrics.lintErrors = errorMatch ? parseInt(errorMatch[1]) : 0;
        metrics.lintWarnings = warningMatch ? parseInt(warningMatch[1]) : 0;
      } catch (e) {
        // Lint failed
      }

      spinner.succeed('Metrics collected');
    } catch (error) {
      spinner.fail('Failed to collect some metrics');
    }

    return metrics;
  }

  /**
   * Compare metrics and show progress
   */
  compareMetrics(baseline: Metrics, current: Metrics): void {
    const table = new Table({
      head: ['Metric', 'Baseline', 'Current', 'Change', 'Status'],
      colWidths: [25, 15, 15, 15, 10]
    });

    const getStatus = (improved: boolean) => improved ? chalk.green('✓') : chalk.red('✗');
    const formatChange = (value: number, improved: boolean) => {
      const sign = value > 0 ? '+' : '';
      const color = improved ? chalk.green : chalk.red;
      return color(`${sign}${value.toFixed(1)}`);
    };

    // Files with tests
    const testChange = current.filesWithTests - baseline.filesWithTests;
    table.push([
      'Files with tests',
      baseline.filesWithTests.toString(),
      current.filesWithTests.toString(),
      formatChange(testChange, testChange > 0),
      getStatus(testChange > 0)
    ]);

    // Test coverage
    const coverageChange = current.testCoverage - baseline.testCoverage;
    table.push([
      'Test coverage (%)',
      `${baseline.testCoverage.toFixed(1)}%`,
      `${current.testCoverage.toFixed(1)}%`,
      formatChange(coverageChange, coverageChange > 0),
      getStatus(coverageChange > 0)
    ]);

    // Any types
    const anyChange = current.anyTypes - baseline.anyTypes;
    table.push([
      'TypeScript "any" usage',
      baseline.anyTypes.toString(),
      current.anyTypes.toString(),
      formatChange(anyChange, anyChange < 0),
      getStatus(anyChange < 0)
    ]);

    // Console statements
    const consoleChange = current.consoleStatements - baseline.consoleStatements;
    table.push([
      'Console statements',
      baseline.consoleStatements.toString(),
      current.consoleStatements.toString(),
      formatChange(consoleChange, consoleChange < 0),
      getStatus(consoleChange < 0)
    ]);

    // Large files
    const largeChange = current.largeFiles - baseline.largeFiles;
    table.push([
      'Large files (>50KB)',
      baseline.largeFiles.toString(),
      current.largeFiles.toString(),
      formatChange(largeChange, largeChange < 0),
      getStatus(largeChange < 0)
    ]);

    // Bundle size
    if (current.bundleSize > 0) {
      const bundleChange = current.bundleSize - baseline.bundleSize;
      table.push([
        'Bundle size (MB)',
        `${baseline.bundleSize.toFixed(1)} MB`,
        `${current.bundleSize.toFixed(1)} MB`,
        formatChange(bundleChange, bundleChange < 0),
        getStatus(bundleChange < 0)
      ]);
    }

    // Lint errors
    const lintErrorChange = current.lintErrors - baseline.lintErrors;
    table.push([
      'Lint errors',
      baseline.lintErrors.toString(),
      current.lintErrors.toString(),
      formatChange(lintErrorChange, lintErrorChange < 0),
      getStatus(lintErrorChange < 0)
    ]);

    // Lint warnings
    const lintWarningChange = current.lintWarnings - baseline.lintWarnings;
    table.push([
      'Lint warnings',
      baseline.lintWarnings.toString(),
      current.lintWarnings.toString(),
      formatChange(lintWarningChange, lintWarningChange < 0),
      getStatus(lintWarningChange < 0)
    ]);

    console.log('\n' + table.toString());
  }

  /**
   * Update dashboard widgets
   */
  private updateDashboard(): void {
    if (!this.screen) return;

    // Update overview
    if (this.widgets.overview && this.currentMetrics) {
      const content = [
        `Total Files: ${this.currentMetrics.filesTotal}`,
        `Test Coverage: ${this.currentMetrics.testCoverage.toFixed(1)}%`,
        `Any Types: ${this.currentMetrics.anyTypes}`,
        `Console Logs: ${this.currentMetrics.consoleStatements}`,
        `Large Files: ${this.currentMetrics.largeFiles}`
      ].join('\n');
      this.widgets.overview.setContent(content);
    }

    // Update progress
    if (this.widgets.progress) {
      const completed = this.progressData.filter(p => p.status === 'completed').length;
      const total = this.progressData.length;
      const percent = total > 0 ? (completed / total) * 100 : 0;
      this.widgets.progress.setPercent(percent);
    }

    // Update metrics table
    if (this.widgets.metrics && this.baselineMetrics && this.currentMetrics) {
      const data = [
        ['Metric', 'Before', 'After', 'Change'],
        ['Test Coverage', 
         `${this.baselineMetrics.testCoverage}%`, 
         `${this.currentMetrics.testCoverage}%`,
         `${(this.currentMetrics.testCoverage - this.baselineMetrics.testCoverage).toFixed(1)}%`],
        ['Any Types', 
         this.baselineMetrics.anyTypes.toString(), 
         this.currentMetrics.anyTypes.toString(),
         (this.currentMetrics.anyTypes - this.baselineMetrics.anyTypes).toString()],
        ['Console Logs', 
         this.baselineMetrics.consoleStatements.toString(), 
         this.currentMetrics.consoleStatements.toString(),
         (this.currentMetrics.consoleStatements - this.baselineMetrics.consoleStatements).toString()]
      ];
      this.widgets.metrics.setData({ headers: data[0], data: data.slice(1) });
    }

    // Update task list
    if (this.widgets.tasks) {
      const tasks = this.progressData
        .filter(p => p.status === 'in-progress')
        .flatMap(p => p.tasks)
        .map(t => `${t.status === 'running' ? '▶' : t.status === 'completed' ? '✓' : '○'} ${t.name} (${t.progress}%)`);
      this.widgets.tasks.setItems(tasks);
    }

    // Update logs
    if (this.widgets.logs) {
      this.logMessages.slice(-20).forEach(msg => {
        this.widgets.logs.log(msg);
      });
    }

    this.screen.render();
  }

  /**
   * Monitor file system changes
   */
  watchChanges(): void {
    const chokidar = require('chokidar');
    
    const watcher = chokidar.watch(['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}'], {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: true
    });

    watcher
      .on('add', (path: string) => this.log(`File added: ${path}`, 'info'))
      .on('change', (path: string) => this.log(`File changed: ${path}`, 'info'))
      .on('unlink', (path: string) => this.log(`File deleted: ${path}`, 'warning'));
  }

  /**
   * Track refactoring phase
   */
  startPhase(phaseName: string): void {
    const phase: ProgressData = {
      phase: phaseName,
      status: 'in-progress',
      startTime: new Date(),
      metrics: {},
      tasks: []
    };
    
    this.progressData.push(phase);
    this.log(`Started phase: ${phaseName}`, 'info');
    this.updateDashboard();
  }

  /**
   * Complete refactoring phase
   */
  completePhase(phaseName: string, metrics?: Partial<Metrics>): void {
    const phase = this.progressData.find(p => p.phase === phaseName);
    if (phase) {
      phase.status = 'completed';
      phase.endTime = new Date();
      if (metrics) {
        phase.metrics = metrics;
      }
    }
    
    this.log(`Completed phase: ${phaseName}`, 'success');
    this.updateDashboard();
  }

  /**
   * Add task to current phase
   */
  addTask(phaseName: string, taskName: string): void {
    const phase = this.progressData.find(p => p.phase === phaseName);
    if (phase) {
      phase.tasks.push({
        name: taskName,
        status: 'running',
        progress: 0
      });
    }
    
    this.updateDashboard();
  }

  /**
   * Update task progress
   */
  updateTask(phaseName: string, taskName: string, progress: number): void {
    const phase = this.progressData.find(p => p.phase === phaseName);
    if (phase) {
      const task = phase.tasks.find(t => t.name === taskName);
      if (task) {
        task.progress = progress;
        if (progress >= 100) {
          task.status = 'completed';
        }
      }
    }
    
    this.updateDashboard();
  }

  /**
   * Log message
   */
  private log(message: string, level: 'info' | 'warning' | 'error' | 'success' = 'info'): void {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}`;
    
    this.logMessages.push(formattedMessage);
    
    // Console output
    switch (level) {
      case 'error':
        console.error(chalk.red(message));
        break;
      case 'warning':
        console.warn(chalk.yellow(message));
        break;
      case 'success':
        console.log(chalk.green(message));
        break;
      default:
        console.log(chalk.blue(message));
    }
    
    this.updateDashboard();
  }

  /**
   * Generate final report
   */
  generateReport(): void {
    if (!this.baselineMetrics || !this.currentMetrics) {
      console.error('No metrics available for report');
      return;
    }

    const report = `# Refactoring Progress Report
Generated: ${new Date().toISOString()}

## Overall Progress
${this.progressData.map(p => `- ${p.phase}: ${p.status}`).join('\n')}

## Metrics Improvement

### Code Quality
- TypeScript 'any' usage: ${this.baselineMetrics.anyTypes} → ${this.currentMetrics.anyTypes} (${((this.baselineMetrics.anyTypes - this.currentMetrics.anyTypes) / this.baselineMetrics.anyTypes * 100).toFixed(1)}% reduction)
- Console statements: ${this.baselineMetrics.consoleStatements} → ${this.currentMetrics.consoleStatements}
- Large files: ${this.baselineMetrics.largeFiles} → ${this.currentMetrics.largeFiles}

### Testing
- Test coverage: ${this.baselineMetrics.testCoverage}% → ${this.currentMetrics.testCoverage}%
- Files with tests: ${this.baselineMetrics.filesWithTests} → ${this.currentMetrics.filesWithTests}

### Build & Lint
- Lint errors: ${this.baselineMetrics.lintErrors} → ${this.currentMetrics.lintErrors}
- Lint warnings: ${this.baselineMetrics.lintWarnings} → ${this.currentMetrics.lintWarnings}
- Bundle size: ${this.baselineMetrics.bundleSize.toFixed(1)}MB → ${this.currentMetrics.bundleSize.toFixed(1)}MB

## Time Tracking
${this.progressData.filter(p => p.startTime && p.endTime).map(p => {
  const duration = (p.endTime!.getTime() - p.startTime!.getTime()) / 1000 / 60;
  return `- ${p.phase}: ${duration.toFixed(1)} minutes`;
}).join('\n')}

## Recommendations
1. Continue monitoring metrics weekly
2. Set up automated checks in CI/CD
3. Document refactoring patterns for team
`;

    fs.writeFileSync('REFACTORING_PROGRESS_REPORT.md', report, 'utf8');
    console.log(chalk.green('\n✓ Report generated: REFACTORING_PROGRESS_REPORT.md'));
  }
}

/**
 * CLI commands
 */
async function main(): Promise<void> {
  const command = process.argv[2];
  const monitor = new RefactoringMonitor();

  switch (command) {
    case 'baseline':
      // Capture baseline metrics
      console.log(chalk.blue('📊 Capturing baseline metrics...'));
      const baseline = await monitor.collectMetrics();
      fs.writeFileSync('refactoring-baseline.json', JSON.stringify(baseline, null, 2));
      console.log(chalk.green('✓ Baseline saved to refactoring-baseline.json'));
      break;

    case 'check':
      // Check current progress
      console.log(chalk.blue('📊 Checking refactoring progress...'));
      
      // Load baseline
      if (!fs.existsSync('refactoring-baseline.json')) {
        console.error(chalk.red('No baseline found. Run "monitor baseline" first.'));
        process.exit(1);
      }
      
      const baselineData = JSON.parse(fs.readFileSync('refactoring-baseline.json', 'utf8'));
      const current = await monitor.collectMetrics();
      
      // Compare and show progress
      monitor.compareMetrics(baselineData, current);
      
      // Save current metrics
      fs.writeFileSync('refactoring-current.json', JSON.stringify(current, null, 2));
      break;

    case 'dashboard':
      // Launch interactive dashboard
      console.log(chalk.blue('🖥️  Launching dashboard...'));
      console.log(chalk.gray('Press q or ESC to quit'));
      
      // Dashboard is initialized in constructor with --dashboard flag
      monitor.watchChanges();
      
      // Keep process alive
      setInterval(() => {
        monitor.collectMetrics().then(metrics => {
          monitor['currentMetrics'] = metrics;
          monitor['updateDashboard']();
        });
      }, 30000); // Update every 30 seconds
      break;

    case 'watch':
      // Watch for changes
      console.log(chalk.blue('👁️  Watching for changes...'));
      monitor.watchChanges();
      break;

    case 'report':
      // Generate report
      if (!fs.existsSync('refactoring-baseline.json') || !fs.existsSync('refactoring-current.json')) {
        console.error(chalk.red('Metrics not available. Run "monitor baseline" and "monitor check" first.'));
        process.exit(1);
      }
      
      monitor['baselineMetrics'] = JSON.parse(fs.readFileSync('refactoring-baseline.json', 'utf8'));
      monitor['currentMetrics'] = JSON.parse(fs.readFileSync('refactoring-current.json', 'utf8'));
      monitor.generateReport();
      break;

    default:
      console.log(chalk.yellow('Usage: npx ts-node monitor-progress.ts [command]'));
      console.log('\nCommands:');
      console.log('  baseline   - Capture baseline metrics before refactoring');
      console.log('  check      - Check current progress against baseline');
      console.log('  dashboard  - Launch interactive monitoring dashboard');
      console.log('  watch      - Watch for file changes');
      console.log('  report     - Generate progress report');
      break;
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { RefactoringMonitor, Metrics, ProgressData };