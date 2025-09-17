#!/usr/bin/env node

/**
 * AI Workflow Prompt Generator
 * 
 * Creates dynamic prompts that force AI to follow workflow integration
 * This ensures AI ALWAYS recognizes and enforces the 3 workflow files
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

class AIWorkflowPromptGenerator {
  constructor() {
    this.rootDir = process.cwd();
  }

  generateWorkflowPrompt(taskDescription = '') {
    const prompt = `
🤖 AI WORKFLOW ENFORCEMENT - MANDATORY PROCESS

BEFORE PROCEEDING WITH ANY TASK, I MUST:

1. 📋 READ WORKFLOW FILES:
   ${this.generateFileStatusChecklist()}

2. 🔧 RUN WORKFLOW VALIDATION:
   COMMAND: pnpm workflow-check "${taskDescription}"
   STATUS: ⚠️ MUST RUN BEFORE PROCEEDING

3. 🎨 CHECK DESIGN SYSTEM (if UI task):
   COMMAND: pnpm design-check [ComponentName]
   STATUS: ⚠️ REQUIRED FOR UI COMPONENTS

4. 📊 VALIDATE CURRENT CONTEXT:
   ${this.generateContextChecklist(taskDescription)}

TASK DESCRIPTION: "${taskDescription}"
WORKFLOW STATUS: ⚠️ VALIDATION REQUIRED

---

AI DECISION MATRIX:
${this.generateDecisionMatrix(taskDescription)}

---

MANDATORY AI RESPONSE PATTERN:
"I need to run workflow validation before proceeding. Let me check:"
1. [Run workflow-check command]
2. [Run design-check if UI work]
3. [Analyze results and proceed only if all gates pass]
`;

    return prompt;
  }

  generateFileStatusChecklist() {
    const files = [
      { name: 'todo.md', purpose: 'Current phase and priorities' },
      { name: 'CLAUDE.md', purpose: 'Collaboration rules and design system' },
      { name: 'rules.md', purpose: 'Technical standards and infrastructure' },
      { name: 'AI_WORKFLOW_ENFORCER.md', purpose: 'AI behavior patterns' }
    ];

    return files.map(file => {
      const exists = existsSync(join(this.rootDir, file.name));
      const status = exists ? '✅ EXISTS' : '❌ MISSING';
      return `   • ${file.name}: ${status} - ${file.purpose}`;
    }).join('\n');
  }

  generateContextChecklist(taskDescription) {
    const checks = [
      'Current todo.md phase allows this work',
      'Infrastructure is stable (lint/typecheck/build passing)', 
      'Design system compliance verified (for UI work)',
      'Business logic questions identified (per CLAUDE.md)'
    ];

    return checks.map(check => `   • ${check}: ⚠️ PENDING VALIDATION`).join('\n');
  }

  generateDecisionMatrix(taskDescription) {
    const keywords = {
      infrastructure: ['build', 'lint', 'error', 'config', 'fix', 'setup'],
      ui: ['component', 'button', 'modal', 'form', 'card', 'style', 'design'],
      feature: ['implement', 'create', 'add', 'develop', 'build', 'feature']
    };

    let taskType = 'general';
    let requirements = [];

    // Detect task type based on keywords
    const desc = taskDescription.toLowerCase();
    
    if (keywords.infrastructure.some(word => desc.includes(word))) {
      taskType = 'infrastructure';
      requirements = [
        'MUST run workflow-check first',
        'MUST fix any infrastructure failures before proceeding',
        'MUST follow rules.md infrastructure-first policy'
      ];
    }
    
    if (keywords.ui.some(word => desc.includes(word))) {
      taskType = 'ui';
      requirements = [
        'MUST run workflow-check first',
        'MUST run design-check for component validation',
        'MUST ask "Should this update the brand system?"',
        'MUST audit existing components before creating new ones'
      ];
    }
    
    if (keywords.feature.some(word => desc.includes(word))) {
      if (taskType === 'general') taskType = 'feature';
      requirements.push(
        'MUST verify todo.md phase allows feature work',
        'MUST ask business logic questions per CLAUDE.md'
      );
    }

    return `
DETECTED TASK TYPE: ${taskType.toUpperCase()}
MANDATORY REQUIREMENTS:
${requirements.map(req => `   • ${req}`).join('\n')}

WORKFLOW GATES:
   • Infrastructure Gate: ⚠️ MUST VALIDATE
   • Phase Gate: ⚠️ MUST CHECK TODO.MD  
   • Design Gate: ⚠️ MUST CHECK (IF UI)
   • Quality Gate: ⚠️ MUST VALIDATE`;
  }

  generateReminder() {
    return `
🚨 CRITICAL AI REMINDER:

I am the developer AND the workflow enforcer. 
These files are MANDATORY operating procedures:
• todo.md - Current phase gates
• CLAUDE.md - Collaboration and design system rules  
• rules.md - Technical standards and quality gates
• AI_WORKFLOW_ENFORCER.md - AI behavior patterns

I MUST follow these on EVERY task, no exceptions.
I MUST run validation commands BEFORE proceeding.
I MUST fix infrastructure issues BEFORE feature work.
`;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const taskDescription = process.argv.slice(2).join(' ');
  const generator = new AIWorkflowPromptGenerator();
  
  console.log(generator.generateWorkflowPrompt(taskDescription));
  console.log(generator.generateReminder());
}

export { AIWorkflowPromptGenerator };