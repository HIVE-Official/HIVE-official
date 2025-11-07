# E2E App → Firebase Emulator Migration

**Why we deleted the e2e app and what to use instead**

---

## 📋 What Happened

### Deleted ❌
- **`apps/e2e/`** - Entire Next.js mini-app with fake database
- **96 source files** - Pages, components, fake-db logic
- **`dev:e2e` script** - Package.json script to run e2e app
- **E2E integration docs** - 5 documentation files

### Why? 🤔

The e2e app created **architectural duplication**:

1. **Type Duplication**
   - `apps/e2e/src/server/fake-db.ts` defined types
   - `packages/core/src/domain/` defined same types
   - Had to transform between them

2. **Code Duplication**
   - Transformation layer: fake-db → components
   - Main app had: Firebase → components
   - Same logic, two places

3. **False Confidence**
   - Tests passed in e2e app
   - Failed in production with real Firebase
   - Not representative of actual user experience

4. **Maintenance Burden**
   - 3 codebases: Storybook, e2e, main app
   - Changes required updates in all 3
   - Sync issues inevitable

---

## ✅ What to Use Instead

### **Firebase Emulator Suite**

**One command:**
```bash
firebase emulators:start
```

**Then start main app:**
```bash
pnpm dev
```

App automatically connects to emulator (not production Firebase).

---

## 🎯 Benefits of Emulator

### 1. Real Firebase Patterns
- ✅ Actual Firestore queries (not fake in-memory)
- ✅ Real-time listeners work
- ✅ Cloud Functions execute locally
- ✅ Auth flows test correctly

### 2. No Duplication
- ✅ Uses `@hive/core` types directly
- ✅ Same code as production
- ✅ One transformation layer (Firebase → components)

### 3. Production-Representative
- ✅ Tests match real user experience
- ✅ Catches Firebase-specific bugs
- ✅ Security rules test locally

### 4. Better Developer Experience
- ✅ Emulator UI dashboard (http://localhost:4000)
- ✅ Export/import state
- ✅ Fast iteration (no deploys)

---

## 🚀 Quick Start (New Workflow)

### Terminal 1: Start Emulator
```bash
firebase emulators:start
```

### Terminal 2: Seed Test Data
```bash
pnpm tsx scripts/seed-emulator.ts
```

**Creates:**
- 1 test user (test@buffalo.edu)
- 5 spaces (CS Study Buddies, Club Soccer, etc.)
- 5 posts
- 9 rituals
- Space leaders, pinned posts

### Terminal 3: Start App
```bash
pnpm dev
```

### Browser
```bash
open http://localhost:3000
```

Login with: `test@buffalo.edu` / `password123`

---

## 📊 Before & After Comparison

| Aspect | E2E App | Firebase Emulator |
|--------|---------|-------------------|
| **Setup** | `pnpm dev:e2e` | `firebase emulators:start` + `pnpm dev` |
| **Data** | In-memory fake-db | Real Firestore locally |
| **Types** | Duplicated | @hive/core types |
| **Auth** | None/fake | Real Firebase Auth |
| **Real-time** | ❌ Not supported | ✅ Full support |
| **Functions** | ❌ Not tested | ✅ Run locally |
| **Test Validity** | ⚠️ May differ from prod | ✅ Matches production |
| **Persistence** | ❌ Lost on restart | ✅ Export/import |
| **UI Dashboard** | ❌ None | ✅ http://localhost:4000 |

---

## 🛠️ What You Need to Do

### If You Were Using E2E App:

**1. Switch to emulator workflow** (see Quick Start above)

**2. Update Playwright tests** to target main app:
```typescript
// Before (e2e app)
await page.goto('http://localhost:3100/feed');

// After (main app + emulator)
await page.goto('http://localhost:3000/feed');
```

**3. Remove any e2e references** from your scripts

**4. Start using seed script** for test data:
```bash
pnpm tsx scripts/seed-emulator.ts
```

### If You Weren't Using E2E App:

**Nothing!** Just be aware:
- ✅ Use emulator for local testing
- ✅ Use `scripts/seed-emulator.ts` for test data
- ✅ Playwright tests run against main app + emulator

---

## 📚 Documentation

### New Guides
- **[FIREBASE_EMULATOR_GUIDE.md](FIREBASE_EMULATOR_GUIDE.md)** - Complete emulator setup
- **[scripts/seed-emulator.ts](scripts/seed-emulator.ts)** - Test data seeding

### Existing Resources
- [Firebase Emulator Suite Docs](https://firebase.google.com/docs/emulator-suite)
- [packages/firebase/README.md](packages/firebase/README.md) - HIVE Firebase setup

---

## 🧪 Testing Strategy (Updated)

### Component Isolation Testing
**Use: Storybook** (`pnpm storybook`)
- 117+ component stories
- Visual regression testing
- Component API documentation

### Integration Testing
**Use: Main App + Emulator**
- Start emulator: `firebase emulators:start`
- Seed data: `pnpm tsx scripts/seed-emulator.ts`
- Start app: `pnpm dev`
- Test flows manually

### Automated E2E Testing
**Use: Playwright + Emulator**
```bash
# Terminal 1
firebase emulators:start

# Terminal 2
pnpm tsx scripts/seed-emulator.ts

# Terminal 3
pnpm test:e2e
```

### Production Testing
**Use: Vercel Preview Deployments**
- Every PR gets preview URL
- Tests against real Firebase (not prod data)
- Final validation before merge

---

## ⚠️ Breaking Changes

### Scripts Removed
- ❌ `pnpm dev:e2e` - Use `firebase emulators:start` + `pnpm dev`

### Files Deleted
- ❌ `apps/e2e/` directory
- ❌ All e2e integration documentation

### Workflow Changed
**Before:**
```bash
pnpm dev:e2e
open http://localhost:3100
```

**After:**
```bash
firebase emulators:start  # Terminal 1
pnpm tsx scripts/seed-emulator.ts  # Terminal 2
pnpm dev  # Terminal 3
open http://localhost:3000
```

---

## 💡 Why This Is Better

### 1. Single Source of Truth
- **Before:** fake-db types + @hive/core types
- **After:** Only @hive/core types

### 2. Real Data Patterns
- **Before:** In-memory array filtering
- **After:** Real Firestore queries, indexes, real-time

### 3. Catches Production Bugs Early
- **Before:** Tests passed, production broke
- **After:** Tests match production behavior

### 4. Less Maintenance
- **Before:** 96 files to maintain
- **After:** 1 seed script (reuses domain types)

### 5. Better Testing Tools
- **Before:** No visibility into data
- **After:** Emulator UI shows all data, operations, logs

---

## 🎯 Migration Checklist

If you had e2e app references:

- [x] E2E app deleted
- [x] Scripts updated (package.json)
- [x] Firebase emulator guide created
- [x] Seed script created
- [ ] Playwright tests updated (if needed)
- [ ] Team notified of new workflow
- [ ] CI/CD updated (if e2e was in pipeline)

---

## 🚀 Next Steps

1. **Try the new workflow:**
   ```bash
   firebase emulators:start
   pnpm tsx scripts/seed-emulator.ts
   pnpm dev
   ```

2. **Explore emulator UI:**
   http://localhost:4000

3. **Test your features:**
   - Feed page (real posts from Firestore)
   - Rituals (real-time updates)
   - Spaces (real membership logic)

4. **Read the guide:**
   [FIREBASE_EMULATOR_GUIDE.md](FIREBASE_EMULATOR_GUIDE.md)

---

## ❓ FAQ

### Q: Can I still do quick demos?
**A:** Yes! Emulator starts in ~5 seconds, seed takes ~2 seconds.
```bash
firebase emulators:start  # Once
pnpm tsx scripts/seed-emulator.ts  # Fresh data anytime
```

### Q: Do I need internet for testing?
**A:** No! Emulator runs 100% locally. No Firebase connection needed.

### Q: What about Playwright tests?
**A:** Point them at `localhost:3000` instead of `localhost:3100`. Same tests, just different target.

### Q: Can I export/import emulator state?
**A:** Yes!
```bash
# Export
firebase emulators:export ./emulator-data

# Start with saved state
firebase emulators:start --import=./emulator-data
```

### Q: Is this slower than e2e app?
**A:** Slightly (emulator + seed takes ~7 seconds vs ~3 for e2e). But **way more accurate** and **less maintenance**.

---

**Status:** ✅ Migration Complete

**Old Way:** E2E app with fake-db (DELETED)
**New Way:** Firebase Emulator with seed script (PRODUCTION-READY)

Start testing: [FIREBASE_EMULATOR_GUIDE.md](FIREBASE_EMULATOR_GUIDE.md) 🚀
