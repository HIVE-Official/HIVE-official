# 🤖 AI Developer Workflow Prevention System

## CRITICAL BASELINE ESTABLISHED

**Date**: September 5, 2025  
**Current Error State**: 🚨 **CRITICAL - 851 errors**
- TypeScript Errors: 179
- ESLint Errors: 672  
- ESLint Warnings: 1,036
- **Status**: DEPLOYMENT BLOCKED

---

## 🛡️ MANDATORY AI BEHAVIOR PATTERNS

### BEFORE Every AI Task
```bash
✅ REQUIRED: Run `pnpm error-count` to establish session baseline
✅ REQUIRED: Create safety backup with `git stash push -m "Pre-AI backup $(date)"`
✅ REQUIRED: Check if errors > 100 → STOP and fix critical issues first
```

### DURING AI Development
```bash
✅ REQUIRED: After every 3 file changes → Run quick error check
✅ REQUIRED: Before importing any React hooks → Check for existing imports
✅ REQUIRED: Before adding new variables → Verify naming consistency (_userId vs userId)
✅ REQUIRED: After JSX modifications → Validate syntax immediately
```

### AFTER Every AI Session
```bash
✅ REQUIRED: Run `pnpm error-count` to compare against baseline
✅ REQUIRED: If errors INCREASED → Fix new errors before commit
✅ REQUIRED: Update error log with session impact
```

---

## 🚨 CRITICAL ERROR PATTERNS TO PREVENT

### Pattern 1: Duplicate Import Corruption
**Current Impact**: 40+ TypeScript errors in hooks package
```javascript
// ❌ WRONG - AI keeps doing this
import { useCallback } from "react";import { useCallback } from 'react';

// ✅ CORRECT - Check existing imports first
import { useCallback } from 'react';
```

### Pattern 2: Variable Name Inconsistency
**Current Impact**: 20+ TypeScript errors across packages
```javascript
// ❌ WRONG - Mixing naming patterns
function trackEvent(_userId: string) {
  analytics.track(userId, data); // userId is undefined!
}

// ✅ CORRECT - Consistent naming
function trackEvent(userId: string) {
  analytics.track(userId, data);
}
```

### Pattern 3: JSX Syntax Corruption
**Current Impact**: 500+ parsing errors in web app
```javascript
// ❌ WRONG - Missing closing tags
<div className="container"
  <span>Content</span>

// ✅ CORRECT - Complete JSX structure
<div className="container">
  <span>Content</span>
</div>
```

---

## 📊 ERROR THRESHOLD MANAGEMENT

### Session Rules by Current Error Count
```bash
If baseline errors > 500: 🚨 EMERGENCY MODE
- Only fix existing errors, NO new features
- Maximum 1 file change at a time
- Validate after every change

If baseline errors > 100: ⚠️ HIGH RISK MODE  
- Fix 10 errors for every 1 new feature
- Create detailed change log
- Test frequently

If baseline errors > 50: 📝 MEDIUM RISK MODE
- Fix 5 errors for every new feature
- Document all changes
- Regular validation

If baseline errors < 10: ✅ HEALTHY MODE
- Normal development pace
- Standard error prevention practices
```

---

## 🔧 AUTOMATED PREVENTION TOOLS

### Pre-Commit Hook (Recommended)
```bash
#!/bin/bash
# .git/hooks/pre-commit

# Get current error count
current_errors=$(pnpm error-count 2>/dev/null | grep "Total Critical:" | grep -o '[0-9]*' || echo "999")

if [ "$current_errors" -gt 100 ]; then
    echo "🚨 COMMIT BLOCKED: $current_errors critical errors detected"
    echo "Run 'pnpm error-count' to see details"
    echo "Fix critical errors before committing"
    exit 1
fi
```

### AI Session Guard Script
```bash
#!/bin/bash
# scripts/ai-session-start.sh

echo "🤖 Starting AI Development Session"
echo "Checking codebase health..."

# Get baseline
pnpm error-count > .ai-session-baseline.txt
errors=$(grep "Total Critical:" .ai-session-baseline.txt | grep -o '[0-9]*')

if [ "$errors" -gt 500 ]; then
    echo "🚨 EMERGENCY: $errors critical errors"
    echo "RECOMMENDATION: Only fix existing errors this session"
    echo "Continue? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Session started with $errors baseline errors"
```

---

## 🎯 SPECIFIC FIX STRATEGIES

### Immediate Priority (This Session)
1. **Fix Hooks Package** (54 TypeScript errors)
   - Remove duplicate React imports
   - Fix _userId/userId naming inconsistencies
   - Validate all function signatures

2. **Fix Web App Parsing Errors** (562 ESLint errors)  
   - Focus on JSX syntax first
   - Fix import statements
   - Restore missing closing braces

3. **Fix UI Package** (65 TypeScript + 104 ESLint errors)
   - Component interface mismatches
   - Missing prop types
   - Import/export issues

### Medium Term (This Week)
1. Implement automated import deduplication
2. Add TypeScript strict mode gradually
3. Create component interface validation

### Long Term (This Month)
1. Comprehensive code quality audit
2. Establish coding standards documentation  
3. Implement automated testing for common patterns

---

## 📝 AI SESSION LOG TEMPLATE

```markdown
## AI Session: [DATE] [TIME]
**Baseline Errors**: XXX critical errors
**Session Goal**: [Describe intended changes]
**Files Modified**: [List files]
**New Errors Introduced**: XXX
**Errors Fixed**: XXX  
**Net Change**: +/- XXX
**Session Status**: ✅ IMPROVED | ⚠️ STABLE | ❌ DEGRADED
**Notes**: [Any issues or patterns noticed]
```

---

## ⚡ EMERGENCY RESPONSE

### When Error Count Explodes (> 200 new errors)
1. **IMMEDIATE**: Stop all work
2. **ASSESS**: `git log --oneline -5` to find problematic commits
3. **DECIDE**: Revert vs. targeted fixes
4. **ACT**: `git revert [commit]` or surgical fixes only
5. **VERIFY**: `pnpm error-count` until under control

### When Build Breaks
1. **IDENTIFY**: Which package failed
2. **ISOLATE**: `pnpm --filter [package] typecheck`
3. **PRIORITIZE**: Fix build blockers before anything else
4. **TEST**: Verify build passes before continuing

---

## 🤝 CO-FOUNDER COLLABORATION

### For Jacob (Product):
- **Daily Error Dashboard**: Current health status
- **Risk Assessment**: Impact on sprint goals
- **Resource Planning**: Time allocation for fixes vs. features

### For Claude (AI):
- **Pattern Recognition**: Learn from recurring mistakes
- **Context Preservation**: Remember project-specific patterns  
- **Quality Gates**: Never compromise on error prevention

---

**REMEMBER**: The goal is not zero errors immediately, but ZERO NEW ERRORS per session and systematic reduction of existing technical debt.