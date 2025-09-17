#!/usr/bin/env node

/**
 * AI Task Prioritizer
 * Intelligent task selection and prioritization for autonomous development
 */

import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AITaskPrioritizer {
  constructor() {
    this.rootDir = path.resolve(__dirname, '..');
    this.todoPath = path.join(this.rootDir, 'todo.md');
    this.tasks = [];
    this.prioritizedTasks = [];
  }

  async analyze() {
    console.log('🎯 AI Task Prioritizer - Intelligent Task Selection\n');
    
    await this.parseTodoFile();
    await this.analyzeDependencies();
    this.calculatePriorities();
    this.generateExecutionPlan();
    
    return this.prioritizedTasks;
  }

  async parseTodoFile() {
    console.log('📋 Parsing todo.md for tasks...');
    
    try {
      const content = await fs.readFile(this.todoPath, 'utf8');
      const lines = content.split('\n');
      
      let currentSlice = '';
      let currentPhase = '';
      
      for (const line of lines) {
        // Detect slice headers
        if (line.includes('SLICE -')) {
          const sliceMatch = line.match(/\*\*(.+?)\s+SLICE/);
          if (sliceMatch) {
            currentSlice = sliceMatch[1].trim();
          }
        }
        
        // Detect phase headers
        if (line.includes('Phase ')) {
          const phaseMatch = line.match(/Phase (\d+):/);
          if (phaseMatch) {
            currentPhase = `Phase ${phaseMatch[1]}`;
          }
        }
        
        // Parse task items
        if (line.match(/^- \[[ x]\]/)) {
          const completed = line.includes('[x]');
          const taskText = line.replace(/^- \[[ x]\]\s+/, '').trim();
          
          // Extract task details
          const task = {
            id: `${currentSlice}-${this.tasks.length}`,
            slice: currentSlice,
            phase: currentPhase,
            description: taskText,
            completed: completed,
            priority: this.inferPriority(taskText, currentSlice, currentPhase),
            autonomyLevel: this.determineAutonomyLevel(taskText),
            estimatedHours: this.estimateEffort(taskText),
            dependencies: [],
            businessValue: this.assessBusinessValue(taskText, currentSlice),
            technicalComplexity: this.assessComplexity(taskText)
          };
          
          if (!completed) {
            this.tasks.push(task);
          }
        }
      }
      
      console.log(`  📝 Found ${this.tasks.length} pending tasks`);
    } catch (error) {
      console.error('  ❌ Failed to parse todo.md:', error.message);
    }
  }

  inferPriority(taskText, slice, phase) {
    let priority = 50; // Base priority
    
    // Phase 1 tasks get higher priority
    if (phase === 'Phase 1') priority += 20;
    
    // Critical keywords boost priority
    const criticalKeywords = ['critical', 'urgent', 'blocker', 'security', 'fix', 'bug'];
    criticalKeywords.forEach(keyword => {
      if (taskText.toLowerCase().includes(keyword)) priority += 15;
    });
    
    // Slice priorities based on completion rates
    const slicePriorities = {
      'TOOLS': 85,         // 70% complete, high user value
      'RITUALS/FEED': 80,  // 40% complete, needs development
      'AUTH/ONBOARDING': 70, // 95% complete, just polish
      'SPACES': 65,        // 85% complete
      'ANALYTICS': 60,     // 20% complete but not critical
      'PROFILE': 30        // 100% complete
    };
    
    if (slicePriorities[slice]) {
      priority = Math.max(priority, slicePriorities[slice]);
    }
    
    return Math.min(100, priority);
  }

  determineAutonomyLevel(taskText) {
    const text = taskText.toLowerCase();
    
    // Full autonomy tasks
    const fullAutonomyPatterns = [
      'fix', 'test', 'optimize', 'refactor', 'clean', 'document',
      'validation', 'error handling', 'performance', 'lint'
    ];
    
    // Guided autonomy tasks
    const guidedAutonomyPatterns = [
      'implement', 'create', 'build', 'add', 'integrate', 'connect'
    ];
    
    // Consultation required
    const consultationPatterns = [
      'design', 'architecture', 'ux', 'user experience', 'flow',
      'payment', 'security', 'authentication', 'database', 'schema'
    ];
    
    for (const pattern of consultationPatterns) {
      if (text.includes(pattern)) return 'consultation';
    }
    
    for (const pattern of fullAutonomyPatterns) {
      if (text.includes(pattern)) return 'full';
    }
    
    for (const pattern of guidedAutonomyPatterns) {
      if (text.includes(pattern)) return 'guided';
    }
    
    return 'guided'; // Default
  }

  estimateEffort(taskText) {
    const text = taskText.toLowerCase();
    
    // Quick tasks (1-2 hours)
    if (text.includes('fix') || text.includes('update') || text.includes('document')) {
      return 1.5;
    }
    
    // Medium tasks (3-4 hours)
    if (text.includes('implement') || text.includes('add') || text.includes('create')) {
      return 3.5;
    }
    
    // Complex tasks (5-8 hours)
    if (text.includes('system') || text.includes('integration') || text.includes('refactor')) {
      return 6;
    }
    
    return 3; // Default
  }

  assessBusinessValue(taskText, slice) {
    let value = 50; // Base value
    
    // High-value keywords
    const highValuePatterns = [
      'user', 'ux', 'experience', 'core', 'critical', 'essential',
      'launch', 'production', 'security', 'performance'
    ];
    
    highValuePatterns.forEach(pattern => {
      if (taskText.toLowerCase().includes(pattern)) value += 10;
    });
    
    // Slice-based value adjustments
    const sliceValues = {
      'TOOLS': 90,         // Direct user value
      'RITUALS/FEED': 85,  // Core social features
      'SPACES': 80,        // Community features
      'AUTH/ONBOARDING': 75, // Entry point
      'PROFILE': 70,       // Personal features
      'ANALYTICS': 50      // Internal value
    };
    
    if (sliceValues[slice]) {
      value = Math.max(value, sliceValues[slice]);
    }
    
    return Math.min(100, value);
  }

  assessComplexity(taskText) {
    const text = taskText.toLowerCase();
    
    // Simple tasks
    if (text.includes('fix') || text.includes('update') || text.includes('document')) {
      return 'simple';
    }
    
    // Complex tasks
    if (text.includes('system') || text.includes('architecture') || text.includes('integration')) {
      return 'complex';
    }
    
    return 'moderate';
  }

  async analyzeDependencies() {
    console.log('\n🔗 Analyzing task dependencies...');
    
    // Simple dependency detection based on task descriptions
    for (const task of this.tasks) {
      // Firebase/auth dependencies
      if (task.description.includes('Firebase') || task.description.includes('auth')) {
        const authTasks = this.tasks.filter(t => 
          t.slice === 'AUTH/ONBOARDING' && 
          t.phase === 'Phase 1' &&
          !t.completed
        );
        task.dependencies = authTasks.map(t => t.id);
      }
      
      // Data model dependencies
      if (task.description.includes('data') || task.description.includes('model')) {
        const modelTasks = this.tasks.filter(t => 
          t.description.includes('TypeScript interfaces') ||
          t.description.includes('schemas') &&
          !t.completed
        );
        task.dependencies = modelTasks.map(t => t.id);
      }
    }
    
    const tasksWithDeps = this.tasks.filter(t => t.dependencies.length > 0);
    console.log(`  🔗 ${tasksWithDeps.length} tasks have dependencies`);
  }

  calculatePriorities() {
    console.log('\n📊 Calculating task priorities...');
    
    for (const task of this.tasks) {
      // Calculate composite priority score
      const scores = {
        base: task.priority,
        businessValue: task.businessValue * 0.4,
        urgency: task.phase === 'Phase 1' ? 30 : 10,
        effort: (10 - Math.min(task.estimatedHours, 10)) * 2,
        autonomy: task.autonomyLevel === 'full' ? 20 : 
                 task.autonomyLevel === 'guided' ? 10 : 0,
        dependencies: task.dependencies.length === 0 ? 10 : -10
      };
      
      task.compositeScore = Object.values(scores).reduce((a, b) => a + b, 0);
      task.scoreBreakdown = scores;
      
      // Determine recommendation
      if (task.compositeScore > 150) {
        task.recommendation = 'immediate';
      } else if (task.compositeScore > 120) {
        task.recommendation = 'high';
      } else if (task.compositeScore > 80) {
        task.recommendation = 'medium';
      } else {
        task.recommendation = 'low';
      }
    }
    
    // Sort by composite score
    this.prioritizedTasks = [...this.tasks].sort((a, b) => b.compositeScore - a.compositeScore);
    
    console.log(`  ✅ Prioritized ${this.prioritizedTasks.length} tasks`);
  }

  generateExecutionPlan() {
    console.log('\n📋 Generating AI Execution Plan...\n');
    console.log('=' . repeat(80));
    console.log('🤖 AI AUTONOMOUS EXECUTION PLAN');
    console.log('=' . repeat(80));
    
    // Group tasks by autonomy level
    const fullAutonomy = this.prioritizedTasks.filter(t => t.autonomyLevel === 'full');
    const guidedAutonomy = this.prioritizedTasks.filter(t => t.autonomyLevel === 'guided');
    const consultation = this.prioritizedTasks.filter(t => t.autonomyLevel === 'consultation');
    
    console.log('\n🟢 TASKS AI CAN DO NOW (Full Autonomy):');
    console.log('-'.repeat(40));
    fullAutonomy.slice(0, 5).forEach((task, index) => {
      console.log(`${index + 1}. [${task.slice}] ${task.description}`);
      console.log(`   Score: ${task.compositeScore.toFixed(0)} | Time: ~${task.estimatedHours}h | ${task.recommendation.toUpperCase()}`);
    });
    
    console.log('\n🟡 TASKS AI CAN DO WITH CONTEXT (Guided):');
    console.log('-'.repeat(40));
    guidedAutonomy.slice(0, 5).forEach((task, index) => {
      console.log(`${index + 1}. [${task.slice}] ${task.description}`);
      console.log(`   Score: ${task.compositeScore.toFixed(0)} | Time: ~${task.estimatedHours}h | ${task.recommendation.toUpperCase()}`);
    });
    
    console.log('\n🔴 TASKS REQUIRING CONSULTATION:');
    console.log('-'.repeat(40));
    consultation.slice(0, 3).forEach((task, index) => {
      console.log(`${index + 1}. [${task.slice}] ${task.description}`);
      console.log(`   Score: ${task.compositeScore.toFixed(0)} | Reason: Business logic required`);
    });
    
    // Suggest optimal work session
    console.log('\n' + '='.repeat(80));
    console.log('⚡ RECOMMENDED AI WORK SESSION (Next 8 Hours):');
    console.log('='.repeat(80));
    
    let sessionHours = 0;
    const sessionTasks = [];
    
    for (const task of this.prioritizedTasks) {
      if (sessionHours + task.estimatedHours <= 8 && task.autonomyLevel !== 'consultation') {
        sessionTasks.push(task);
        sessionHours += task.estimatedHours;
      }
      if (sessionHours >= 7) break;
    }
    
    console.log(`\n📅 Optimized for ${sessionHours.toFixed(1)} hours of work:\n`);
    sessionTasks.forEach((task, index) => {
      const emoji = task.autonomyLevel === 'full' ? '🤖' : '👥';
      console.log(`${index + 1}. ${emoji} ${task.description}`);
      console.log(`   Slice: ${task.slice} | Phase: ${task.phase} | Time: ${task.estimatedHours}h`);
      if (task.dependencies.length > 0) {
        console.log(`   ⚠️  Dependencies: ${task.dependencies.join(', ')}`);
      }
      console.log('');
    });
    
    // Save execution plan
    this.saveExecutionPlan(sessionTasks);
  }

  async saveExecutionPlan(sessionTasks) {
    const plan = {
      timestamp: new Date().toISOString(),
      totalTasks: this.tasks.length,
      prioritizedTasks: this.prioritizedTasks.slice(0, 10),
      recommendedSession: sessionTasks,
      statistics: {
        fullAutonomy: this.tasks.filter(t => t.autonomyLevel === 'full').length,
        guidedAutonomy: this.tasks.filter(t => t.autonomyLevel === 'guided').length,
        consultationRequired: this.tasks.filter(t => t.autonomyLevel === 'consultation').length,
        phase1Tasks: this.tasks.filter(t => t.phase === 'Phase 1').length,
        phase2Tasks: this.tasks.filter(t => t.phase === 'Phase 2').length
      }
    };
    
    const planPath = path.join(this.rootDir, 'ai-execution-plan.json');
    await fs.writeFile(planPath, JSON.stringify(plan, null, 2));
    
    console.log('📄 Detailed execution plan saved to: ai-execution-plan.json');
    console.log('\n💡 To start work on the top task, run:');
    console.log('   pnpm ai:implement\n');
  }
}

// Execute if run directly
const prioritizer = new AITaskPrioritizer();
prioritizer.analyze()
  .catch(error => {
    console.error('❌ Prioritization failed:', error.message);
    process.exit(1);
  });

export default AITaskPrioritizer;