# HIVE Testing - Quick Reference

**One-page guide for daily testing workflows**

---

## 🚀 Start Local Testing (3 commands)

```bash
# Terminal 1: Start Firebase Emulator
firebase emulators:start

# Terminal 2: Seed test data
pnpm tsx scripts/seed-emulator.ts

# Terminal 3: Start app
pnpm dev
```

**Login:** test@buffalo.edu / password123

**URLs:**
- App: http://localhost:3000
- Emulator UI: http://localhost:4000

---

## 📊 What Gets Seeded

| Data Type | Count | Details |
|-----------|-------|---------|
| Users | 1 | test@buffalo.edu |
| Spaces | 5 | CS Study Buddies, Club Soccer, Makers Lab, Greek Alpha, Quiet Reading |
| Posts | 5 | Distributed across spaces |
| Rituals | 9 | 5 active, 2 upcoming, 2 completed |
| Leaders | 1 | Test user is admin of CS Study Buddies |
| Pinned Posts | 1 | In CS Study Buddies |

---

## 🧪 Testing Workflows

### Component Testing (Storybook)
```bash
pnpm storybook
open http://localhost:6006
```
**Use for:** UI components in isolation

### Integration Testing (Emulator)
```bash
firebase emulators:start  # Terminal 1
pnpm tsx scripts/seed-emulator.ts  # Terminal 2
pnpm dev  # Terminal 3
open http://localhost:3000
```
**Use for:** Full user flows with real data

### E2E Testing (Playwright)
```bash
firebase emulators:start  # Terminal 1
pnpm tsx scripts/seed-emulator.ts  # Terminal 2
pnpm test:e2e  # Terminal 3
```
**Use for:** Automated tests

---

## 📍 Key Test Routes

| Page | URL | What to Test |
|------|-----|--------------|
| **Feed** | /feed | Posts from multiple spaces, upvote/comment |
| **Rituals** | /rituals | Featured banner, tabs (Active/Upcoming/Completed) |
| **Space** | /spaces/s1 | Pinned posts, leaders, space-specific feed |
| **Profile** | /profile/[userId] | User info, bento grid, connections |
| **HiveLab** | /hivelab | Tool browser, canvas, analytics |

---

## 🔄 Common Commands

### Fresh Start
```bash
# Kill emulator
pkill -f firebase

# Start fresh
firebase emulators:start
pnpm tsx scripts/seed-emulator.ts
pnpm dev
```

### Export Current State
```bash
firebase emulators:export ./my-test-data
```

### Start with Saved State
```bash
firebase emulators:start --import=./my-test-data
```

### Reseed Without Restart
```bash
# Emulator stays running
pnpm tsx scripts/seed-emulator.ts
```

---

## 🐛 Quick Troubleshooting

### Emulator won't start
```bash
# Kill processes on ports
lsof -ti:8080 | xargs kill -9
lsof -ti:9099 | xargs kill -9
lsof -ti:4000 | xargs kill -9

# Restart
firebase emulators:start
```

### App not connecting to emulator
**Check console logs:**
```
✅ Should see: "Firestore emulator detected: localhost:8080"
❌ If missing: Clear cache, restart app
```

### Seed script fails
```bash
# Verify emulator is running
curl http://localhost:8080

# Should return: "Ok"
```

### No data showing
```bash
# Check emulator UI
open http://localhost:4000

# Look for: profiles, spaces, posts, rituals collections
```

---

## 🎯 Test Checklist (5 minutes)

**Feed Page:**
- [ ] Shows 5 posts
- [ ] Space chips visible
- [ ] Upvote works (console log)
- [ ] Composer opens

**Rituals Page:**
- [ ] Featured banner (Morning Workout)
- [ ] Tabs show counts (5/2/2)
- [ ] Click tab → filters
- [ ] Join button works

**Space Detail:**
- [ ] Shows space name
- [ ] Pinned post has gold border
- [ ] Right rail visible (desktop)
- [ ] Post composer works

**Auth:**
- [ ] Can login with test@buffalo.edu
- [ ] Profile loads
- [ ] Can logout

---

## 📱 Mobile Testing

```bash
# Chrome DevTools
Cmd+Opt+I → Toggle device toolbar

# Test breakpoints:
- 375px (Mobile)
- 768px (Tablet)
- 1440px (Desktop)
```

---

## ⚡ Power User Tips

### 1. One-Command Startup
Create alias in ~/.zshrc:
```bash
alias hive-dev='firebase emulators:start &; sleep 5; pnpm tsx scripts/seed-emulator.ts; pnpm dev'
```

### 2. Auto-Seed on Emulator Start
Add to firebase.json:
```json
"emulators": {
  "firestore": {
    "port": 8080
  }
}
```

### 3. VS Code Tasks
Create .vscode/tasks.json:
```json
{
  "tasks": [
    {
      "label": "Start HIVE Dev",
      "type": "shell",
      "command": "firebase emulators:start",
      "isBackground": true
    }
  ]
}
```

---

## 📚 Full Documentation

**Complete Guides:**
- [FIREBASE_EMULATOR_GUIDE.md](FIREBASE_EMULATOR_GUIDE.md) - Full setup & usage
- [E2E_TO_EMULATOR_MIGRATION.md](E2E_TO_EMULATOR_MIGRATION.md) - Why we switched
- [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) - What changed

**Official Docs:**
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)

---

## 🎯 Remember

✅ **Always use emulator** for local testing
✅ **Seed before testing** to get fresh data
✅ **Check emulator UI** to debug data issues
✅ **Export state** for common test scenarios

❌ **Never test against production** Firebase locally
❌ **Don't commit** emulator-data/ exports
❌ **Don't skip seeding** - you'll have no test data

---

**Quick Start:**
```bash
firebase emulators:start && pnpm tsx scripts/seed-emulator.ts && pnpm dev
```

**That's it!** 🚀
