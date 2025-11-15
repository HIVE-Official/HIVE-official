# Firebase Emulator Verification Checklist

✅ **Migration Complete** - E2E app deleted, Firebase Emulator configured

---

## ✅ Configuration Verified

### Firebase Emulator Config ([firebase.json](firebase.json))
- ✅ Auth emulator: port 9099
- ✅ Firestore emulator: port 8080
- ✅ Storage emulator: port 9199
- ✅ Emulator UI: port 4000 (enabled)
- ✅ Single project mode: enabled

### Client Auto-Detection ([apps/web/src/lib/firebase.ts](apps/web/src/lib/firebase.ts:41-59))
- ✅ Automatically connects to emulator in development
- ✅ Auth emulator: `http://localhost:9099`
- ✅ Firestore emulator: `localhost:8080`
- ✅ Graceful fallback if emulator not running

### Seed Script ([scripts/seed-emulator.ts](scripts/seed-emulator.ts))
- ✅ Executable TypeScript script (runs via `pnpm tsx`)
- ✅ Seeds 1 test user (test@buffalo.edu)
- ✅ Seeds 5 spaces (CS Study Buddies, Club Soccer, Makers Lab, Greek Alpha, Quiet Reading)
- ✅ Seeds 5 posts distributed across spaces
- ✅ Seeds 9 rituals (5 active, 2 upcoming, 2 completed)
- ✅ Seeds space leaders and pinned posts

### Playwright E2E Tests ([apps/web/playwright.config.ts](apps/web/playwright.config.ts))
- ✅ Base URL: `http://localhost:3003` (not old e2e port 3100)
- ✅ Web server: `PORT=3003 npm run dev`
- ✅ No references to localhost:3100 found in test files
- ✅ Tests ready for emulator data

---

## 🧪 Testing Workflow (Ready to Use)

### 1. Start Firebase Emulator
```bash
firebase emulators:start
```
**Expected Output:**
```
✔ All emulators ready!
┌─────────────┬────────────────┐
│ Emulator    │ Host:Port      │
├─────────────┼────────────────┤
│ Auth        │ localhost:9099 │
│ Firestore   │ localhost:8080 │
│ Storage     │ localhost:9199 │
│ Emulator UI │ localhost:4000 │
└─────────────┴────────────────┘
```

### 2. Seed Test Data
```bash
pnpm tsx scripts/seed-emulator.ts
```
**Expected Output:**
```
🔌 Connected to Firebase Emulator
   Firestore: localhost:8080
   Auth: localhost:9099

👤 Creating test user...
   ✅ Created user: test@buffalo.edu
   ✅ Created profile document

🏢 Creating spaces...
   ✅ Created: CS Study Buddies
   ✅ Created: Club Soccer
   ✅ Created: Makers Lab
   ✅ Created: Greek Alpha
   ✅ Created: Quiet Reading

📝 Creating posts...
   ✅ Created post in space [spaceId]
   (5 posts total)

🎯 Creating rituals...
   ✅ Created: 7-Day Study Streak (active)
   ✅ Created: Morning Workout Challenge (active)
   (9 rituals total)

👥 Adding space leaders...
   ✅ Added test user as leader to CS Study Buddies

📌 Creating pinned posts...
   ✅ Added pinned post to CS Study Buddies

✅ Seeding complete!

📊 Summary:
   Users: 1 (test@buffalo.edu)
   Spaces: 5
   Posts: 5
   Rituals: 9

🎯 Next steps:
   1. Start app: pnpm dev
   2. Login with: test@buffalo.edu / password123
   3. View Emulator UI: http://localhost:4000
```

### 3. Start Development Server
```bash
pnpm dev
```
**Expected Output:**
```
> turbo run dev
...
web:dev: ▲ Next.js 15.3.3
web:dev: - Local:        http://localhost:3000
web:dev: ✓ Ready in [time]
```

### 4. Test the Application

**Manual Testing Checklist:**
- [ ] Navigate to http://localhost:3000
- [ ] Verify emulator connection message in console: `"Firestore emulator detected: localhost:8080"`
- [ ] Login with `test@buffalo.edu` / `password123`
- [ ] Check Feed page (`/feed`) - Should show 5 posts
- [ ] Check Rituals page (`/rituals`) - Should show 9 rituals with tabs
- [ ] Check Spaces page (`/spaces`) - Should show 5 spaces
- [ ] Check Space detail (`/spaces/[spaceId]`) - Should show posts, leaders, pinned posts
- [ ] Verify Emulator UI at http://localhost:4000 shows all data

**Automated Testing:**
```bash
# Run E2E tests with emulator
pnpm test:e2e
```

---

## 📋 Next Steps

### Immediate (Required)
- [ ] **Test the workflow manually** - Verify all pages work with emulator data
- [ ] **Run Playwright tests** - Ensure automated tests pass with emulator
- [ ] **Document known issues** - Track any problems discovered

### Short-term (This Week)
- [ ] **Update CI/CD pipeline** - Add emulator startup before tests
- [ ] **Team onboarding** - Share TESTING_QUICK_REFERENCE.md with team
- [ ] **Create additional seed scenarios** - Export common test states

### Long-term (Optional)
- [ ] **Emulator data snapshots** - Save/restore common test scenarios
- [ ] **Automated seeding** - Run seed script automatically on emulator start
- [ ] **Performance benchmarks** - Measure app performance with emulator data

---

## 🐛 Troubleshooting

### Issue: Emulator won't start
**Solution:**
```bash
# Kill processes on ports
lsof -ti:8080 | xargs kill -9
lsof -ti:9099 | xargs kill -9
lsof -ti:4000 | xargs kill -9

# Restart
firebase emulators:start
```

### Issue: Seed script fails
**Check:**
1. Is emulator running? `curl http://localhost:8080` should return "Ok"
2. Are ports available? `lsof -ti:8080` should return a process ID
3. Check emulator UI at http://localhost:4000

**Common Error:**
```
Error: Failed to fetch
```
**Cause:** Emulator not running
**Solution:** Start emulator first, then run seed script

### Issue: App not connecting to emulator
**Check console logs:**
```
✅ Should see: "Firestore emulator detected: localhost:8080"
❌ If missing: Clear cache, restart app
```

**Verify [firebase.ts](apps/web/src/lib/firebase.ts) config:**
- Lines 41-59: Emulator connection logic
- Should auto-connect in development mode

### Issue: No data showing in app
**Check Emulator UI:**
1. Open http://localhost:4000
2. Click "Firestore" tab
3. Verify collections exist: `profiles`, `spaces`, `posts`, `rituals`
4. Check document counts match seed script output

---

## 📊 Benefits Achieved

### Code Reduction
- **Before:** 96 files in `apps/e2e` directory
- **After:** 1 seed script (`scripts/seed-emulator.ts`)
- **Reduction:** 99% less test infrastructure code

### Single Source of Truth
- **Before:** Separate `FeedItem` type in `fake-db.ts`
- **After:** Uses real types from `@hive/core`
- **Result:** No type duplication

### Production-Representative Tests
- **Before:** In-memory fake database with map/array storage
- **After:** Real Firebase SDK with actual Firestore operations
- **Result:** Tests match production behavior

### Developer Tools
- **Before:** No visual inspection of test data
- **After:** Emulator UI at http://localhost:4000
- **Result:** Easy debugging of data issues

---

## 📚 Documentation

**Quick Reference:**
- [TESTING_QUICK_REFERENCE.md](TESTING_QUICK_REFERENCE.md) - One-page daily guide

**Complete Guides:**
- [FIREBASE_EMULATOR_GUIDE.md](FIREBASE_EMULATOR_GUIDE.md) - Full setup & usage
- [E2E_TO_EMULATOR_MIGRATION.md](E2E_TO_EMULATOR_MIGRATION.md) - Why we switched
- [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) - What changed

**Official Docs:**
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)

---

## ✅ Migration Status

**Completed:**
- ✅ Deleted `apps/e2e` directory (96 files)
- ✅ Removed e2e references from `package.json`
- ✅ Created seed script with comprehensive test data
- ✅ Verified Firebase Emulator configuration
- ✅ Verified client auto-detection of emulator
- ✅ Verified Playwright tests use correct port (3003)
- ✅ Created 4 comprehensive migration guides

**Ready for Testing:**
- ✅ All configuration in place
- ✅ Seed script ready to use
- ✅ Documentation complete

**Next Action:**
Run the 3-command workflow to verify everything works:
```bash
# Terminal 1
firebase emulators:start

# Terminal 2
pnpm tsx scripts/seed-emulator.ts

# Terminal 3
pnpm dev
```

Then login at http://localhost:3000 with `test@buffalo.edu` / `password123`.

---

**Status:** ✅ Migration Complete - Ready for Testing
**Date:** November 2, 2025
