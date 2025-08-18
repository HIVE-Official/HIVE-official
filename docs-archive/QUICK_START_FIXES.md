# HIVE Quick Start: Emergency Fixes

## 🚀 **IMMEDIATE ACTION PLAN** (Next 30 Minutes)

**Status**: Ready to execute critical fixes  
**AI Role**: Build System Specialist (Team Alpha)  
**Current Task**: C1-01 - Import Path Crisis Resolution

---

## **⚡ EXECUTE NOW: Phase 0A**

### **Step 1: Diagnostic Scan (2 minutes)**
```bash
# Run these commands immediately
grep -r "@hive/ui/components/" apps/web/src --include="*.tsx" --include="*.ts"
find packages -name "tsconfig.json"
pnpm build 2>&1 | head -20
```

### **Step 2: Import Path Mass Fix (15 minutes)**

**Files to Fix** (based on previous scan):
- `apps/web/src/app/onboarding/components/onboarding-wizard.tsx`
- `apps/web/src/app/onboarding/components/steps/*.tsx`
- `apps/web/src/app/spaces/page.tsx`
- `apps/web/src/app/spaces/[spaceId]/page.tsx`
- `apps/web/src/app/welcome/page.tsx`
- And ~10 more files

**Fix Pattern**:
```typescript
// WRONG (current)
import { Button } from '@hive/ui/components/Button';
import { Card } from '@hive/ui/components/Card';
import { Input } from '@hive/ui/components/Input';

// CORRECT (target)
import { Button, Card, Input } from '@hive/ui';
```

### **Step 3: TypeScript Config Fix (10 minutes)**

**Missing File**: `packages/hooks/tsconfig.json`

**Template** (copy from `packages/core/tsconfig.json`):
```json
{
  "extends": "@hive/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### **Step 4: Verification (3 minutes)**
```bash
pnpm build
pnpm turbo lint
```

**Expected Result**: Both commands succeed without errors.

---

## **🎯 CRITICAL FIXES CHECKLIST**

### **Import Path Fixes** ✅
- [ ] `apps/web/src/app/onboarding/components/onboarding-wizard.tsx`
  - Line 5: `import { Button } from '@hive/ui/components/Button';` → `import { Button } from '@hive/ui';`
  - Line 6: `import { Card } from '@hive/ui/components/Card';` → `import { Card } from '@hive/ui';`

- [ ] `apps/web/src/app/onboarding/components/steps/name-step.tsx`
  - Line 2: `import { Input } from '@hive/ui/components/Input';` → `import { Input } from '@hive/ui';`

- [ ] `apps/web/src/app/onboarding/components/steps/handle-step.tsx`
  - Line 3: `import { Input } from '@hive/ui/components/input';` → `import { Input } from '@hive/ui';`

- [ ] `apps/web/src/app/onboarding/components/steps/academics-step.tsx`
  - Line 3: `import { Input } from '@hive/ui/components/Input';` → `import { Input } from '@hive/ui';`

- [ ] `apps/web/src/app/onboarding/components/steps/photo-step.tsx`
  - Line 3: `import { Button } from '@hive/ui/components/Button';` → `import { Button } from '@hive/ui';`

- [ ] `apps/web/src/app/spaces/page.tsx`
  - Line 4: `import { Input } from '@hive/ui/components/Input';` → `import { Input } from '@hive/ui';`
  - Line 10: `import { Button } from '@hive/ui/components/Button';` → `import { Button } from '@hive/ui';`

- [ ] `apps/web/src/app/spaces/[spaceId]/page.tsx`
  - Line 3: `import { Button } from '@hive/ui/components/Button';` → `import { Button } from '@hive/ui';`
  - Line 4: `import { Badge } from '@hive/ui/components/Badge';` → `import { Badge } from '@hive/ui';`

- [ ] `apps/web/src/app/spaces/components/space-filter-pills.tsx`
  - Line 3: `import { Button } from '@hive/ui/components/Button';` → `import { Button } from '@hive/ui';`

- [ ] `apps/web/src/app/welcome/page.tsx`
  - Line 6: Fix card import to match exports

- [ ] `apps/web/src/app/welcome/components/school-search.tsx`
  - Line 2: `import { Input } from "@hive/ui/components/input";` → `import { Input } from "@hive/ui";`

- [ ] `apps/web/src/app/waitlist/[schoolId]/page.tsx`
  - Line 7: Fix card import to match exports

### **TypeScript Config Fixes** ✅
- [ ] Create `packages/hooks/tsconfig.json`
- [ ] Verify all packages have proper TypeScript setup
- [ ] Test `pnpm turbo lint` passes

### **Build Verification** ✅
- [ ] `pnpm build` succeeds in root
- [ ] `pnpm --filter web build` succeeds
- [ ] `pnpm --filter @hive/ui build` succeeds

---

## **🔧 EXECUTION COMMANDS**

### **Mass Import Fix Script**
```bash
# Fix Button imports
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@hive/ui/components/Button|@hive/ui|g'

# Fix Input imports (case sensitive)
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@hive/ui/components/Input|@hive/ui|g'
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@hive/ui/components/input|@hive/ui|g'

# Fix Card imports
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@hive/ui/components/Card|@hive/ui|g'
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@hive/ui/components/card|@hive/ui|g'

# Fix Badge imports
find apps/web/src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@hive/ui/components/Badge|@hive/ui|g'
```

### **PowerShell Version** (for Windows)
```powershell
# Fix imports in PowerShell
Get-ChildItem -Path "apps/web/src" -Recurse -Include "*.tsx","*.ts" | ForEach-Object {
    (Get-Content $_.FullName) -replace '@hive/ui/components/Button', '@hive/ui' | Set-Content $_.FullName
    (Get-Content $_.FullName) -replace '@hive/ui/components/Input', '@hive/ui' | Set-Content $_.FullName
    (Get-Content $_.FullName) -replace '@hive/ui/components/input', '@hive/ui' | Set-Content $_.FullName
    (Get-Content $_.FullName) -replace '@hive/ui/components/Card', '@hive/ui' | Set-Content $_.FullName
    (Get-Content $_.FullName) -replace '@hive/ui/components/card', '@hive/ui' | Set-Content $_.FullName
    (Get-Content $_.FullName) -replace '@hive/ui/components/Badge', '@hive/ui' | Set-Content $_.FullName
}
```

---

## **✅ SUCCESS VALIDATION**

After each fix, run:
```bash
pnpm build
```

**Expected Output**: 
```
✓ Compiled successfully
```

**If Still Failing**: 
1. Check the specific error message
2. Look for remaining import issues
3. Verify component exports in `packages/ui/index.ts`

---

## **🚨 EMERGENCY CONTACTS**

**If Stuck**: 
- Document exact error message
- Note which step failed
- Provide terminal output
- Escalate to human intervention

**Time Limit**: If any single fix takes >15 minutes, escalate immediately.

---

**GO! Execute Phase 0A now. The platform needs to build before we can do anything else.** 