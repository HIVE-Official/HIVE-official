# AI WORKFLOW ENFORCER - MANDATORY SYSTEM

**CRITICAL**: This document ensures Claude ALWAYS recognizes and enforces workflow integration.

---

## 🤖 **AI MANDATORY BEHAVIOR PATTERNS**

### **BEFORE ANY TASK - AI MUST:**

1. **ALWAYS read these 3 files first**:
   - `todo.md` - Current phase and feature slice priorities
   - `CLAUDE.md` - Collaboration rules and design system requirements  
   - `rules.md` - Clean code standards (not infrastructure blockers)

2. **FEATURE SLICE TASK-GUIDED DEVELOPMENT**:
   - Use comprehensive task breakdowns in `todo.md` as development reference
   - When Jacob requests slice work, leverage detailed task context for strategic questions
   - Ask business logic questions informed by task phases ("Phase 1 foundation or Phase 2 enhancements?")
   - Present development options using task framework structure

3. **QUALITY GATES** (embedded in tasks):
   - No duplicate components (tasks specify using existing @hive/ui)
   - Use design tokens, not hardcoded values (built into task requirements)
   - Proper error handling (specified in task details)
   - TypeScript compliance (task standard across all slices)

4. **PROCEED WITH TASK-INFORMED DEVELOPMENT** - Use todo.md slice tasks as comprehensive context

---

## 🚨 **AI DECISION TREE - MANDATORY PROCESS**

```
NEW TASK RECEIVED
│
├── Step 1: Read todo.md, CLAUDE.md, rules.md
│   │
│   ├── ❌ Files not read → STOP: Read files first
│   └── ✅ Files read → Continue
│
├── Step 2: Run pnpm workflow-check
│   │
│   ├── ❌ Infrastructure failures → STOP: Fix infrastructure
│   ├── ❌ Phase restrictions → STOP: Follow todo.md phase
│   └── ✅ All gates pass → Continue
│
├── Step 3: Check task type
│   │
│   ├── UI/Component work → Run pnpm design-check
│   │   ├── ❌ Design violations → STOP: Fix design issues
│   │   └── ✅ Design compliant → Continue
│   │
│   └── Non-UI work → Continue
│
└── Step 4: Execute task with workflow compliance
```

---

## ⚡ **AI ENFORCEMENT TRIGGERS**

### **Infrastructure Detection Keywords**:
When task contains these words → MUST run workflow-check first:
- "build", "fix", "error", "lint", "typecheck", "test", "setup", "config"

### **Design System Detection Keywords**:
When task contains these words → MUST run design-check first:
- "component", "button", "form", "modal", "card", "ui", "style", "design", "brand"

### **Feature Work Detection Keywords**:
When task contains these words → MUST verify todo.md phase allows feature work:
- "implement", "add", "create", "build", "develop", "feature", "page", "route"

---

## 🔒 **AI WORKFLOW INTEGRATION COMMANDS**

### **Pre-Task Validation (MANDATORY)**:
```bash
# 1. Always start with this
pnpm workflow-check "describe what you're about to do"

# 2. For UI work, also run this  
pnpm design-check ComponentName

# 3. Only proceed if both pass
```

### **During Task Execution**:
```bash
# Follow todo.md current phase priorities
# Follow CLAUDE.md collaboration rules (ask business questions)
# Follow rules.md technical standards (no hardcoding, proper error handling)
```

### **Post-Task Validation**:
```bash
# Ensure infrastructure still stable
pnpm lint && pnpm typecheck && pnpm build
```

---

## 🧠 **AI DECISION-MAKING INTEGRATION**

### **Feature Slice Development Question Framework (MANDATORY)**:

#### **When Jacob Requests Slice Work**:
- "Looking at the [SLICE] tasks in todo.md, should we focus on Phase 1 foundation or Phase 2 enhancements?"
- "Which specific tasks within this slice align with your current business priorities?"
- "Should we complete these core tasks before moving to advanced features?"

#### **Before Building Components**:
- "The task specifies using @hive/ui - should we extend existing components or create new ones for the design system?"
- "Based on the task requirements, what business logic decisions do you want to make before I implement?"
- "Should this component update our brand system as outlined in the task?"

#### **During Task Implementation**:
- "I see multiple approaches for this task - which aligns better with your user experience goals?"
- "The task has dependencies on other slices - should we build those integrations now or stub them?"
- "What success criteria should we use to know this task is complete?"

---

## 📋 **AI RESPONSE PATTERNS**

### **When Infrastructure Fails**:
```
❌ WORKFLOW BLOCKED: Infrastructure issues detected

I cannot proceed with [task] because:
- ESLint configuration has errors
- TypeScript strict mode disabled  
- Build system failing

Per rules.md "Infrastructure First Policy", these must be fixed before any feature work.

Would you like me to fix these infrastructure issues first?
```

### **When Design System Check Fails**:
```
⚠️ DESIGN SYSTEM COMPLIANCE REQUIRED

I found:
- Similar existing components: [list]
- Hardcoded values detected: [list] 
- Missing Storybook integration

Per CLAUDE.md "Design System Evolution Rule", should I:
1. Extend existing components instead of creating new ones?
2. Update the brand system with these changes?
3. Add proper design tokens?
```

### **When Phase Restrictions Apply**:
```
🚨 PHASE RESTRICTION: Feature work currently blocked

todo.md shows current phase: "Critical Infrastructure Fixes"
This task involves: [feature development]

Per todo.md priorities, infrastructure must be completed first.
Should I work on infrastructure tasks instead?
```

---

## 🎯 **AI WORKFLOW SUCCESS INDICATORS**

### **Green Light - Proceed**:
- ✅ All infrastructure gates pass
- ✅ Current todo.md phase allows the work
- ✅ Design system compliance verified (for UI work)
- ✅ Business logic questions asked (per CLAUDE.md)

### **Red Light - STOP**:
- ❌ Infrastructure failures detected
- ❌ Phase restrictions in effect
- ❌ Design system violations found
- ❌ Duplicate implementations detected

---

## 🤖 **AI MEMORY INTEGRATION**

### **At Start of EVERY Conversation**:
1. Read todo.md for current development phase
2. Read CLAUDE.md for collaboration requirements
3. Read rules.md for technical standards
4. Run workflow-check before first task

### **For EVERY Task Request**:
1. Check task against workflow requirements
2. Validate infrastructure stability
3. Verify design system compliance (if applicable)
4. Ask business logic questions (per CLAUDE.md)
5. Only proceed when all gates pass

### **For EVERY Code Change**:
1. Use @hive/ui components only
2. Use semantic design tokens
3. Implement proper error handling
4. Follow existing patterns and conventions
5. Maintain production quality standards

---

## 🚨 **CRITICAL AI REMINDERS**

### **NEVER DO**:
- Skip workflow validation
- Create duplicate components
- Hardcode design values
- Bypass infrastructure fixes
- Work outside current todo.md phase
- Build without asking business questions first

### **ALWAYS DO**:
- Read todo.md, CLAUDE.md, rules.md first
- Run workflow-check before tasks
- Ask "Should this update the brand system?"
- Use design tokens over hardcoded values
- Fix infrastructure before features
- Collaborate on business logic decisions

---

## 🔄 **AI SELF-CORRECTION PROTOCOL**

### **If I Catch Myself Bypassing Workflow**:
1. **STOP immediately**
2. **Run workflow validation**
3. **Fix any issues found**
4. **Ask for guidance if uncertain**
5. **Restart task with proper workflow compliance**

### **If Jacob Notices Workflow Bypass**:
1. **Acknowledge the violation**
2. **Re-read the workflow files**
3. **Run the appropriate validation commands**
4. **Fix the underlying issue**
5. **Implement proper workflow from that point**

---

**BOTTOM LINE**: The AI is the developer AND the workflow enforcer. These workflow files are not suggestions - they are MANDATORY operating procedures that must be followed on every single task, no exceptions.**