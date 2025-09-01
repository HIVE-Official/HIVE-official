# HIVE Workflow Integration System

**Version**: 1.0  
**Created**: August 30, 2025  
**Purpose**: Prevent recurring issues by enforcing todo.md + CLAUDE.md + rules.md integration

---

## 🔒 **AUTOMATED WORKFLOW ENFORCEMENT**

This system prevents the recurring pattern of:
1. Fix infrastructure → Work on features → Infrastructure breaks again
2. Create components → Skip design system → Inconsistent UI
3. Build features → Skip tests → Production instability

### **Core Integration Scripts**

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `pnpm workflow-check` | Full workflow validation | Before starting any development work |
| `pnpm design-check <Component>` | Design system compliance | Before creating/modifying UI components |
| `pnpm pre-work` | Quick validation | Start of each coding session |
| `pnpm safe-start` | Validated development start | Beginning of development sessions |

---

## 📋 **WORKFLOW CHECKPOINTS**

### **CHECKPOINT 1: Infrastructure Gate**
```bash
pnpm workflow-check
```

**What it validates**:
- ✅ ESLint configuration working (rules.md Rule 1)
- ✅ TypeScript strict mode enabled (rules.md Rule 1) 
- ✅ All packages build successfully (rules.md Rule 1)
- ✅ Core tests passing (rules.md Rule 10)

**If it fails**: **STOP** - Fix infrastructure before any feature work

### **CHECKPOINT 2: Phase Gate** 
**What it validates**:
- ✅ Current todo.md phase allows development work
- ✅ Critical blockers resolved (todo.md enforcement)
- ✅ No phase restrictions in effect

**If it fails**: Check todo.md for current phase requirements

### **CHECKPOINT 3: Design System Gate**
```bash
pnpm design-check ComponentName [file-path]
```

**What it validates**:
- ✅ No duplicate component implementations (CLAUDE.md + rules.md Rule 2)
- ✅ Design tokens used instead of hardcoded values (CLAUDE.md)
- ✅ Similar components audited before creating new ones (CLAUDE.md)
- ✅ Storybook integration in place (rules.md Rule 17)

**If it fails**: Follow CLAUDE.md design system evolution rules

### **CHECKPOINT 4: Production Quality Gate**
**What it validates**:
- ✅ No TODO/FIXME comments (rules.md Rule 3)
- ✅ No hardcoded styles (rules.md Rule 7)
- ✅ Proper error handling patterns (rules.md Rule 3)

---

## 🔄 **ENFORCED WORKFLOW PROCESS**

### **Before ANY Development Work**:
```bash
# 1. Validate current state
pnpm workflow-check

# 2. If working on UI components
pnpm design-check ComponentName

# 3. Start development with validation
pnpm safe-start
```

### **During Development**:
1. **Follow CLAUDE.md collaboration rules**: Ask business questions first
2. **Follow rules.md quality standards**: No hardcoding, proper error handling
3. **Follow todo.md phase priorities**: Stay within current phase scope

### **Before Committing**:
- Pre-commit hook automatically runs workflow checks
- Commits blocked if infrastructure/quality gates fail
- Forces fix of issues before code submission

---

## 🚨 **VIOLATION PREVENTION**

### **Infrastructure Regression Prevention**:
- ❌ **OLD**: Fix ESLint → forget about it → breaks again
- ✅ **NEW**: Pre-commit hook enforces ESLint passing always

### **Design System Bypass Prevention**:
- ❌ **OLD**: "Quick hardcoded solution" → never refactor
- ✅ **NEW**: design-check script catches hardcoded values automatically

### **Context Switching Prevention**:
- ❌ **OLD**: Jump between infrastructure and features randomly
- ✅ **NEW**: workflow-check enforces phase-appropriate work

---

## 💡 **WORKFLOW INTEGRATION EXAMPLES**

### **Example 1: Creating New Component**
```bash
# 1. Check if infrastructure is stable
pnpm workflow-check
# ✅ All gates pass

# 2. Check design system compliance
pnpm design-check ProfileCard
# ⚠️ Found similar components: UserCard, MemberCard
# 📝 REQUIRED: Consider extending existing components

# 3. Decision point (CLAUDE.md collaboration rule)
# Ask Jacob: "Should we extend UserCard or create ProfileCard?"

# 4. Proceed with decision
# If new component: ensure Storybook story created
# If extending: modify existing component with design tokens
```

### **Example 2: Infrastructure Issue Discovered**
```bash
# 1. Start development session  
pnpm safe-start
# ❌ WORKFLOW BLOCKED: TypeScript errors detected
# Fix these critical issues before proceeding

# 2. Must fix TypeScript errors first (rules.md Rule 1)
pnpm typecheck
# Fix all errors

# 3. Try again
pnpm safe-start
# ✅ All gates pass - development can proceed
```

### **Example 3: Feature Work in Wrong Phase**
```bash
# 1. Attempt feature work
pnpm workflow-check "building user dashboard"
# ❌ WORKFLOW BLOCKED: Current phase restrictions
# Reason: Infrastructure blockers remain in todo.md

# 2. Check todo.md current phase
# Current Phase: Critical Infrastructure Fixes
# Must complete infrastructure tasks before feature work

# 3. Work on infrastructure tasks instead
# Complete ESLint config, TypeScript strict mode, etc.
```

---

## 🎯 **SUCCESS METRICS**

### **Workflow Compliance Tracking**:
- **Infrastructure Stability**: Zero build failures in commits
- **Design System Consistency**: Zero hardcoded values in new components  
- **Phase Discipline**: Work aligns with todo.md current phase
- **Quality Standards**: All production quality gates pass

### **Preventing Recurring Issues**:
- **ESLint Regressions**: Pre-commit hook prevents ESLint-failing commits
- **TypeScript Bypasses**: Workflow check enforces strict mode always
- **Design System Bypasses**: Design check catches hardcoded values
- **Context Switching**: Phase gates prevent inappropriate work

---

## 📚 **QUICK REFERENCE**

### **Daily Workflow Commands**:
```bash
# Start coding session
pnpm pre-work

# Before creating UI component
pnpm design-check ComponentName

# Start development with full validation  
pnpm safe-start

# Manual workflow validation anytime
pnpm workflow-check "describe what you're working on"
```

### **Document Integration Map**:
- **todo.md** → Current phase gates (what work is allowed)
- **CLAUDE.md** → Design system integration requirements
- **rules.md** → Infrastructure and quality gates
- **WORKFLOW_INTEGRATION.md** → How they all work together

---

## 🚀 **IMPLEMENTATION STATUS**

- [x] **Workflow enforcement script** - `scripts/workflow-check.js`
- [x] **Design system checker** - `scripts/design-system-check.js`  
- [x] **Package.json integration** - All workflow commands available
- [x] **Pre-commit hooks** - Automatic validation on commits
- [x] **Rules.md AI collaboration** - Technical co-founder guidelines
- [ ] **Initial validation run** - Test system on current codebase
- [ ] **Team training** - Ensure Jacob familiar with workflow commands

---

**The goal**: Never again lose time fixing the same infrastructure issues or creating inconsistent components. The workflow enforcement system makes our documented standards actually enforceable.**