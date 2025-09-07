#!/usr/bin/env node

/**
 * AI Context Analyzer
 * Provides comprehensive platform state awareness for autonomous AI development
 */

import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AIContextAnalyzer {
  constructor() {
    this.rootDir = path.resolve(__dirname, '..');
    this.todoPath = path.join(this.rootDir, 'todo.md');
    this.results = {
      timestamp: new Date().toISOString(),
      infrastructure: {},
      currentPhase: '',
      sliceProgress: {},
      recommendations: [],
      blockers: [],
      nextTasks: []
    };
  }

  async analyze() {
    console.log('🧠 AI Context Analyzer - Platform State Assessment\n');
    
    await this.checkInfrastructure();
    await this.analyzeCurrentPhase();
    await this.calculateSliceProgress();
    await this.identifyBlockers();
    await this.generateRecommendations();
    await this.suggestNextTasks();
    
    return this.results;
  }

  async checkInfrastructure() {
    console.log('🔧 Checking Infrastructure Health...');
    
    const checks = [
      { name: 'ESLint', command: 'pnpm lint --silent', critical: true },
      { name: 'TypeScript', command: 'pnpm typecheck --silent', critical: true },
      { name: 'Build', command: 'pnpm build --dry-run', critical: true },
      { name: 'Tests', command: 'pnpm test --silent', critical: false }
    ];

    for (const check of checks) {
      try {
        execSync(check.command, { 
          cwd: this.rootDir, 
          stdio: 'pipe',
          encoding: 'utf8'
        });
        this.results.infrastructure[check.name.toLowerCase()] = {
          status: 'passing',
          critical: check.critical
        };
        console.log(`  ✅ ${check.name}: Passing`);
      } catch (error) {
        this.results.infrastructure[check.name.toLowerCase()] = {
          status: 'failing',
          critical: check.critical,
          error: error.message?.split('\n')[0]
        };
        console.log(`  ❌ ${check.name}: Failing${check.critical ? ' (CRITICAL)' : ''}`);
        
        if (check.critical) {
          this.results.blockers.push({
            type: 'infrastructure',
            severity: 'critical',
            component: check.name,
            action: `Fix ${check.name} issues with: ${check.command.replace(' --silent', '')}`
          });
        }
      }
    }
  }

  async analyzeCurrentPhase() {
    console.log('\n📋 Analyzing Current Development Phase...');
    
    try {
      const todoContent = await fs.readFile(this.todoPath, 'utf8');
      const phaseMatch = todoContent.match(/\*\*Current Phase\*\*:\s*(.+)/);
      
      if (phaseMatch) {
        this.results.currentPhase = phaseMatch[1].trim();
        console.log(`  📍 Current Phase: ${this.results.currentPhase}`);
        
        // Determine if feature work is allowed
        const featureWorkAllowed = !this.results.currentPhase.toLowerCase().includes('infrastructure');
        this.results.featureWorkAllowed = featureWorkAllowed;
        
        if (!featureWorkAllowed) {
          console.log('  ⚠️  Feature work blocked - Infrastructure fixes required');
        }
      }
    } catch (error) {
      console.log('  ❌ Could not read todo.md');
    }
  }

  async calculateSliceProgress() {
    console.log('\n📊 Calculating Feature Slice Progress...');
    
    const slices = {
      'AUTH/ONBOARDING': { complete: 95, status: 'Polish needed' },
      'PROFILE': { complete: 100, status: 'Production ready' },
      'SPACES': { complete: 85, status: 'Real-time features needed' },
      'TOOLS': { complete: 70, status: 'Connect functionality' },
      'RITUALS/FEED': { complete: 40, status: 'Build ritual mechanics' },
      'ANALYTICS': { complete: 20, status: 'Build from scratch' }
    };

    for (const [slice, data] of Object.entries(slices)) {
      this.results.sliceProgress[slice] = data;
      const emoji = data.complete === 100 ? '✅' : 
                   data.complete >= 80 ? '🟡' : 
                   data.complete >= 50 ? '🟠' : '🔴';
      console.log(`  ${emoji} ${slice}: ${data.complete}% - ${data.status}`);
    }
  }

  identifyBlockers() {
    console.log('\n🚧 Identifying Blockers...');
    
    // Check for critical infrastructure failures
    const criticalFailures = Object.entries(this.results.infrastructure)
      .filter(([_, data]) => data.critical && data.status === 'failing');
    
    if (criticalFailures.length > 0) {
      console.log('  ❌ Critical infrastructure failures detected');
    } else {
      console.log('  ✅ No critical blockers found');
    }
    
    // Check for security vulnerabilities
    try {
      const auditResult = execSync('pnpm audit --json', { 
        cwd: this.rootDir,
        stdio: 'pipe',
        encoding: 'utf8'
      });
      const audit = JSON.parse(auditResult);
      
      if (audit.metadata && audit.metadata.vulnerabilities) {
        const vulns = audit.metadata.vulnerabilities;
        if (vulns.critical > 0 || vulns.high > 0) {
          this.results.blockers.push({
            type: 'security',
            severity: 'critical',
            component: 'Dependencies',
            action: 'Run: pnpm audit fix'
          });
          console.log(`  ⚠️  Security vulnerabilities: ${vulns.critical} critical, ${vulns.high} high`);
        }
      }
    } catch (error) {
      // Audit might fail or return non-zero, that's okay
    }
  }

  generateRecommendations() {
    console.log('\n💡 Generating AI Recommendations...');
    
    // Infrastructure recommendations
    if (this.results.blockers.some(b => b.type === 'infrastructure')) {
      this.results.recommendations.push({
        priority: 'immediate',
        category: 'infrastructure',
        action: 'Fix all infrastructure issues before proceeding with features',
        reason: 'Infrastructure stability is required for reliable development'
      });
      console.log('  🔧 Fix infrastructure issues first');
    }
    
    // Feature development recommendations
    const lowProgressSlices = Object.entries(this.results.sliceProgress)
      .filter(([_, data]) => data.complete < 50)
      .sort((a, b) => a[1].complete - b[1].complete);
    
    if (lowProgressSlices.length > 0 && this.results.featureWorkAllowed) {
      const [sliceName, sliceData] = lowProgressSlices[0];
      this.results.recommendations.push({
        priority: 'high',
        category: 'feature',
        action: `Focus on ${sliceName} slice (${sliceData.complete}% complete)`,
        reason: sliceData.status
      });
      console.log(`  🎯 Focus on ${sliceName} development`);
    }
    
    // Quality recommendations
    if (!this.results.infrastructure.tests || this.results.infrastructure.tests.status === 'failing') {
      this.results.recommendations.push({
        priority: 'medium',
        category: 'quality',
        action: 'Improve test coverage and fix failing tests',
        reason: 'Tests ensure code reliability and prevent regressions'
      });
      console.log('  🧪 Improve test coverage');
    }
  }

  async suggestNextTasks() {
    console.log('\n🎯 Suggesting Next Optimal Tasks...');
    
    // Priority scoring for different task types
    const taskPriorities = [];
    
    // If infrastructure is broken, that's top priority
    if (this.results.blockers.some(b => b.type === 'infrastructure')) {
      taskPriorities.push({
        task: 'Fix infrastructure issues',
        score: 100,
        reasoning: 'Blocking all other development',
        autonomy: 'full',
        estimatedHours: 2
      });
    }
    
    // If infrastructure is healthy, suggest feature work
    if (this.results.featureWorkAllowed && this.results.blockers.length === 0) {
      // TOOLS slice needs attention (70% complete)
      if (this.results.sliceProgress['TOOLS'].complete < 80) {
        taskPriorities.push({
          task: 'Connect Tool Builder functionality',
          score: 85,
          reasoning: 'High user value, clear requirements in todo.md',
          autonomy: 'guided',
          estimatedHours: 4
        });
      }
      
      // FEED slice needs development (40% complete)
      if (this.results.sliceProgress['RITUALS/FEED'].complete < 60) {
        taskPriorities.push({
          task: 'Implement real-time activity feed',
          score: 80,
          reasoning: 'Core platform feature, follows existing patterns',
          autonomy: 'guided',
          estimatedHours: 6
        });
      }
      
      // SPACES real-time features (85% complete but needs real-time)
      taskPriorities.push({
        task: 'Add real-time presence to Spaces',
        score: 75,
        reasoning: 'Enhances existing feature, clear technical path',
        autonomy: 'full',
        estimatedHours: 3
      });
    }
    
    // Always suggest quality improvements
    taskPriorities.push({
      task: 'Improve test coverage for critical paths',
      score: 60,
      reasoning: 'Ensures reliability, can be done autonomously',
      autonomy: 'full',
      estimatedHours: 2
    });
    
    // Sort by priority score
    taskPriorities.sort((a, b) => b.score - a.score);
    this.results.nextTasks = taskPriorities.slice(0, 3);
    
    console.log('\n📝 Top 3 Recommended Tasks:');
    this.results.nextTasks.forEach((task, index) => {
      const autonomyEmoji = task.autonomy === 'full' ? '🤖' : '👥';
      console.log(`  ${index + 1}. ${autonomyEmoji} ${task.task}`);
      console.log(`     Priority: ${task.score}/100 | Time: ~${task.estimatedHours}h | ${task.reasoning}`);
    });
  }

  async generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 AI CONTEXT ANALYSIS COMPLETE');
    console.log('='.repeat(80));
    
    // Overall health score
    const healthScore = this.calculateHealthScore();
    const healthEmoji = healthScore >= 80 ? '✅' : 
                       healthScore >= 60 ? '🟡' : 
                       healthScore >= 40 ? '🟠' : '🔴';
    
    console.log(`\n${healthEmoji} Platform Health Score: ${healthScore}/100`);
    
    // Autonomy assessment
    const canWorkAutonomously = this.results.blockers.filter(b => b.severity === 'critical').length === 0;
    console.log(`\n🤖 AI Autonomy Status: ${canWorkAutonomously ? '✅ ENABLED' : '❌ BLOCKED'}`);
    
    if (!canWorkAutonomously) {
      console.log('   Resolve critical blockers to enable autonomous development');
    }
    
    // Quick actions
    console.log('\n⚡ Quick Actions:');
    if (this.results.blockers.length > 0) {
      this.results.blockers.slice(0, 3).forEach(blocker => {
        console.log(`  • ${blocker.action}`);
      });
    } else {
      console.log('  • No immediate actions required');
      console.log('  • Proceed with feature development');
    }
    
    // Save detailed report
    const reportPath = path.join(this.rootDir, 'ai-context-report.json');
    await fs.writeFile(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Detailed report saved to: ai-context-report.json`);
    
    return this.results;
  }

  calculateHealthScore() {
    let score = 100;
    
    // Deduct for infrastructure issues
    Object.values(this.results.infrastructure).forEach(check => {
      if (check.status === 'failing') {
        score -= check.critical ? 20 : 10;
      }
    });
    
    // Deduct for blockers
    this.results.blockers.forEach(blocker => {
      score -= blocker.severity === 'critical' ? 15 : 5;
    });
    
    // Bonus for high completion slices
    const avgCompletion = Object.values(this.results.sliceProgress)
      .reduce((sum, s) => sum + s.complete, 0) / 
      Object.keys(this.results.sliceProgress).length;
    
    if (avgCompletion > 70) score += 10;
    
    return Math.max(0, Math.min(100, score));
  }
}

// Execute if run directly
const analyzer = new AIContextAnalyzer();
analyzer.analyze()
  .then(() => analyzer.generateReport())
  .catch(error => {
    console.error('❌ Analysis failed:', error.message);
    process.exit(1);
  });

export default AIContextAnalyzer;