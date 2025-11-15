# Firebase Emulator Guide - Local Testing & Development

**The correct way to test HIVE locally**

---

## 🎯 Why Emulator > E2E App

### What We Used to Have (DELETED ❌)
- `apps/e2e` - Fake in-memory database
- Duplicated types between fake-db and @hive/core
- Tests passed in e2e but failed in production
- 3 codebases to maintain (Storybook, e2e, production)

### What We Use Now (CORRECT ✅)
- **Firebase Emulator Suite** - Real Firestore, Auth, Functions
- Same code as production, just local
- No type duplication, no transformation duplication
- Tests represent actual user experience

---

## 🚀 Quick Start

### 1. Install Firebase Tools (One Time)

```bash
npm install -g firebase-tools
```

### 2. Start Emulator

```bash
cd /Users/laneyfraass/hive_ui
firebase emulators:start
```

**What starts:**
- Firestore Emulator (port 8080)
- Auth Emulator (port 9099)
- Functions Emulator (port 5001)
- Emulator UI (port 4000)

### 3. Start Main App (Connects Automatically)

```bash
# In a new terminal
pnpm dev
```

App runs on http://localhost:3000 and automatically connects to emulator.

---

## 📋 Emulator UI Dashboard

**http://localhost:4000**

See:
- 🗄️ Firestore data (collections, documents)
- 👤 Auth users
- ⚡ Functions logs
- 📊 Request history

---

## 🌱 Seeding Test Data

### Option 1: Manual via Emulator UI

1. Open http://localhost:4000
2. Go to Firestore tab
3. Click "Start Collection"
4. Add documents manually

### Option 2: Seed Script (Recommended)

Create `scripts/seed-emulator.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Connect to emulator
const app = initializeApp({
  projectId: 'hive-official',
});

const db = getFirestore(app);
const auth = getAuth(app);

// Use emulator
if (process.env.NODE_ENV !== 'production') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

async function seedData() {
  console.log('🌱 Seeding emulator with test data...');

  // Create test user
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    'test@buffalo.edu',
    'password123'
  );
  const userId = userCredential.user.uid;

  // Create profile
  await setDoc(doc(db, 'profiles', userId), {
    id: userId,
    email: 'test@buffalo.edu',
    campusId: 'ub-buffalo',
    handle: 'testuser',
    name: 'Test User',
    major: 'Computer Science',
    createdAt: new Date().toISOString(),
  });

  // Create spaces
  const spaceIds = [];
  for (const space of seedSpaces) {
    const docRef = await addDoc(collection(db, 'spaces'), space);
    spaceIds.push(docRef.id);
  }

  // Create posts
  for (const post of seedPosts) {
    await addDoc(collection(db, 'posts'), {
      ...post,
      campusId: 'ub-buffalo',
      authorId: userId,
      createdAt: new Date().toISOString(),
    });
  }

  // Create rituals
  for (const ritual of seedRituals) {
    await addDoc(collection(db, 'rituals'), {
      ...ritual,
      campusId: 'ub-buffalo',
      createdAt: new Date().toISOString(),
    });
  }

  console.log('✅ Seeding complete!');
  process.exit(0);
}

// Seed data definitions
const seedSpaces = [
  {
    name: 'CS Study Buddies',
    slug: 'cs-study-buddies',
    campusId: 'ub-buffalo',
    category: 'student_org',
    tags: ['study', 'computer science'],
    visibility: 'public',
    joinPolicy: 'open',
    activityLevel: 'very_active',
    memberCount: 120,
    isActive: true,
    description: 'Find partners, pass exams.',
  },
  {
    name: 'Club Soccer',
    slug: 'club-soccer',
    campusId: 'ub-buffalo',
    category: 'sports',
    tags: ['soccer', 'fitness'],
    visibility: 'public',
    joinPolicy: 'approval',
    activityLevel: 'active',
    memberCount: 58,
    isActive: true,
    description: 'Play weekly, compete regionally.',
  },
  {
    name: 'Makers Lab',
    slug: 'makers-lab',
    campusId: 'ub-buffalo',
    category: 'builders',
    tags: ['hardware', 'ai', 'robotics'],
    visibility: 'public',
    joinPolicy: 'open',
    activityLevel: 'active',
    memberCount: 77,
    isActive: true,
  },
];

const seedPosts = [
  {
    content: 'Exam prep session 7pm @ Capen 201',
  },
  {
    content: 'Laser cutter training tomorrow',
  },
  {
    content: 'Pickup game Saturday 10am',
  },
];

const seedRituals = [
  {
    name: '7-Day Study Streak',
    description: 'Study for at least 30 minutes every day for a week. Build a consistent study habit.',
    icon: '📚',
    progress: 42,
    participantCount: 347,
    duration: '7 days',
    endDate: 'Nov 7',
    frequency: 'Daily',
    status: 'active',
  },
  {
    name: 'Morning Workout Challenge',
    description: 'Complete a 20-minute workout before 9am every day.',
    icon: '💪',
    progress: 67,
    participantCount: 589,
    duration: '14 days',
    endDate: 'Nov 14',
    frequency: 'Daily',
    status: 'active',
  },
  // Add more rituals...
];

seedData().catch(console.error);
```

**Run it:**
```bash
pnpm tsx scripts/seed-emulator.ts
```

---

## 🧪 Testing Workflow

### Daily Development

```bash
# Terminal 1: Start emulator
firebase emulators:start

# Terminal 2: Seed data (first time or when you want fresh data)
pnpm tsx scripts/seed-emulator.ts

# Terminal 3: Start app
pnpm dev

# Open browser
open http://localhost:3000
```

### What to Test

**Feed Page** (http://localhost:3000/feed):
- Posts from seeded spaces
- Real-time updates when you create posts
- Upvotes/comments persist
- Space filtering works

**Rituals Page** (http://localhost:3000/rituals):
- Rituals from Firestore
- Join ritual → updates participantCount
- Progress tracking
- Tab filtering

**Space Detail** (http://localhost:3000/spaces/s1):
- Real space data
- Pinned posts from Firestore
- Leader list from space members
- Post composer → creates real Firestore document

---

## 🔄 Emulator Persistence

### Option 1: Export/Import State

**Export current state:**
```bash
firebase emulators:export ./emulator-data
```

**Start with saved state:**
```bash
firebase emulators:start --import=./emulator-data
```

### Option 2: Fresh Start Every Time

```bash
# Always starts with empty database
firebase emulators:start

# Then seed
pnpm tsx scripts/seed-emulator.ts
```

---

## 🎭 Playwright Tests Against Emulator

### Test File Example

```typescript
// apps/web/src/test/e2e/feed.spec.ts
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Assumes emulator is running and seeded
  await page.goto('http://localhost:3000/feed');
});

test('user can view feed', async ({ page }) => {
  // Wait for posts to load
  await expect(page.getByText('Exam prep session')).toBeVisible();

  // Check space chip
  await expect(page.getByText('CS Study Buddies')).toBeVisible();

  // Upvote post
  await page.getByRole('button', { name: /upvote/i }).first().click();

  // Verify optimistic update
  await expect(page.getByText(/43|44/)).toBeVisible(); // Count incremented
});

test('user can create post', async ({ page }) => {
  // Open composer
  await page.getByRole('button', { name: /create post/i }).click();

  // Fill form
  await page.getByPlaceholder('What\'s on your mind?').fill('Test post from Playwright');

  // Submit
  await page.getByRole('button', { name: /post/i }).click();

  // Verify appears in feed
  await expect(page.getByText('Test post from Playwright')).toBeVisible();
});
```

### Run Tests

```bash
# Start emulator (Terminal 1)
firebase emulators:start

# Seed data (Terminal 2)
pnpm tsx scripts/seed-emulator.ts

# Run Playwright tests (Terminal 3)
pnpm test:e2e
```

---

## 📊 Comparison: E2E App vs Emulator

| Feature | E2E App (DELETED) | Firebase Emulator (CURRENT) |
|---------|-------------------|------------------------------|
| **Data Source** | In-memory fake-db | Real Firestore locally |
| **Auth** | Fake/none | Real Firebase Auth locally |
| **Type Safety** | Duplicated types | Uses @hive/core types |
| **Real-time** | Not supported | Full real-time listeners |
| **Functions** | Not tested | Cloud Functions run locally |
| **Persistence** | Lost on restart | Can export/import |
| **Test Validity** | May differ from prod | Matches production |
| **Setup Time** | Fast (1 command) | Medium (seed required) |
| **Maintenance** | High (2 codebases) | Low (1 codebase) |

---

## 🛠️ Firebase Emulator Configuration

**firebase.json** (already configured):
```json
{
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "functions": {
      "port": 5001
    },
    "ui": {
      "enabled": true,
      "port": 4000
    },
    "singleProjectMode": true
  }
}
```

**App auto-detects emulator** in `packages/firebase/src/firebase.ts`:
```typescript
if (process.env.NODE_ENV !== 'production') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}
```

---

## 🐛 Troubleshooting

### Emulator won't start

**Error:** `Port 8080 already in use`

**Fix:**
```bash
# Kill processes on port
lsof -ti:8080 | xargs kill -9
lsof -ti:9099 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

### App not connecting to emulator

**Check:** `console.log` in browser dev tools should show:
```
Firestore emulator detected: localhost:8080
Auth emulator detected: localhost:9099
```

**If not:** Clear browser cache, restart app

### Seed script fails

**Error:** `FirebaseError: Permission denied`

**Fix:** Emulator has no security rules in dev mode. Check that:
1. Emulator is running
2. You're using emulator config (not production)
3. `projectId` matches firebase.json

---

## 📚 Additional Resources

**Official Docs:**
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)
- [Connect to Emulator](https://firebase.google.com/docs/emulator-suite/connect_and_prototype)
- [Seed Data](https://firebase.google.com/docs/emulator-suite/install_and_configure#seed_emulator_data)

**HIVE-Specific:**
- Main app Firebase setup: [packages/firebase/README.md](packages/firebase/README.md)
- DDD types: [packages/core/src/domain/](packages/core/src/domain/)
- API routes: [apps/web/src/app/api/](apps/web/src/app/api/)

---

## ✅ Migration Checklist (E2E App → Emulator)

- [x] Delete `apps/e2e` directory
- [x] Remove `dev:e2e` script from package.json
- [x] Update lint script (remove e2e filter)
- [ ] Create `scripts/seed-emulator.ts`
- [ ] Update Playwright tests to use localhost:3000
- [ ] Document emulator workflow in team onboarding
- [ ] Update CI/CD to use emulator for tests

---

## 🎯 Next Steps

1. **Create seed script** - Populate emulator with test data
2. **Test feed page** - Verify components work with real Firestore
3. **Test rituals** - Verify real-time updates work
4. **Test spaces** - Verify posts, members, leaders integrate
5. **Update Playwright** - Point tests at main app + emulator

---

**Status**: ✅ E2E app deleted, emulator is now the standard

**Benefits**: Real data patterns, no duplication, production-representative tests

**Start testing**: `firebase emulators:start` + `pnpm dev` 🚀
