# Phase 1: Critical Fixes Implementation Plan
## Week 1 Sprint - Unblock Development & Fix Security
*Estimated Time: 5-7 days*
*Priority: CRITICAL - Nothing else can proceed until these are complete*

---

## 🎯 Objectives

1. **Restore build pipeline** - Get the platform compiling again
2. **Fix security vulnerabilities** - Enable admin access and CSRF protection  
3. **Replace mock data** - Connect to real Firebase
4. **Establish working baseline** - Create stable foundation for Phase 2

---

## Day 1-2: Fix Workspace Configuration & Build System

### 🔧 Task 1.1: Fix pnpm Workspace Configuration
**Time Estimate**: 2-4 hours
**Blocker for**: Everything

#### Problem
```yaml
# Current .npmrc breaking workspace linking
node-linker=hoisted  # This prevents TypeScript from finding workspace packages
shamefully-hoist=true
```

#### Solution Steps
```bash
# Step 1: Backup current state
git add .
git commit -m "backup: before workspace fix"

# Step 2: Remove problematic configuration
rm .npmrc

# Step 3: Create correct configuration
cat > .npmrc << EOF
auto-install-peers=true
strict-peer-dependencies=false
EOF

# Step 4: Clean everything
rm -rf node_modules
rm -rf packages/*/node_modules
rm -rf apps/*/node_modules
rm pnpm-lock.yaml

# Step 5: Reinstall with correct settings
pnpm install

# Step 6: Verify workspace linking
ls -la packages/hooks/node_modules/@hive/  # Should show symlinks
```

#### Verification
- [ ] All @hive/* packages have symlinks in node_modules
- [ ] TypeScript can resolve workspace imports
- [ ] No "module not found" errors for workspace packages

### 🔧 Task 1.2: Define Build Order in turbo.json
**Time Estimate**: 1 hour
**Blocker for**: Reliable builds

#### Implementation
```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "@hive/core#build": {
      "dependsOn": [],  // Builds first, no dependencies
      "outputs": ["dist/**"]
    },
    "@hive/auth-logic#build": {
      "dependsOn": ["@hive/core#build"],
      "outputs": ["dist/**"]
    },
    "@hive/api-client#build": {
      "dependsOn": ["@hive/core#build"],
      "outputs": ["dist/**"]
    },
    "@hive/hooks#build": {
      "dependsOn": ["@hive/core#build", "@hive/auth-logic#build"],
      "outputs": ["dist/**"]
    },
    "@hive/ui#build": {
      "dependsOn": ["@hive/core#build", "@hive/hooks#build"],
      "outputs": ["dist/**"]
    },
    "web#build": {
      "dependsOn": ["@hive/ui#build", "@hive/hooks#build"],
      "outputs": [".next/**"]
    }
  }
}
```

#### Test Build Order
```bash
# Build in correct sequence
pnpm build --filter=@hive/core
pnpm build --filter=@hive/auth-logic  
pnpm build --filter=@hive/api-client
pnpm build --filter=@hive/hooks
pnpm build --filter=@hive/ui
pnpm build --filter=web
```

### 🔧 Task 1.3: Fix Missing Dependencies
**Time Estimate**: 1-2 hours
**Blocker for**: Next.js build

#### Add Missing Packages
```bash
# Core dependencies missing from web app
cd apps/web
pnpm add lucide-react styled-jsx

# Missing peer dependencies
pnpm add -D @types/node@20

# Workspace-wide dependencies
cd ../..
pnpm add -w tailwindcss postcss autoprefixer
```

#### Fix TypeScript Paths
```json
// packages/api-client/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@hive/core": ["../core/src"],
      "@hive/core/*": ["../core/src/*"]
    }
  }
}
```

---

## Day 2-3: Fix Critical Security Issues

### 🔒 Task 2.1: Fix Admin Authentication
**Time Estimate**: 2-3 hours
**Blocker for**: Admin panel access
**Security Level**: CRITICAL

#### Current Problem
```typescript
// lib/api-auth-middleware.ts - ALWAYS RETURNS FALSE!
async function isAdminUser(userId: string): Promise<boolean> {
  return false; // This breaks everything
}
```

#### Implementation
```typescript
// lib/api-auth-middleware.ts
import { adminDb } from '@/lib/firebase-admin';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function isAdminUser(userId: string): Promise<boolean> {
  try {
    // Check Firebase user document
    const userDoc = await adminDb
      .collection('users')
      .doc(userId)
      .get();
    
    if (!userDoc.exists) {
      console.error(`User ${userId} not found`);
      return false;
    }
    
    const userData = userDoc.data();
    
    // Check multiple fields for backwards compatibility
    const isAdmin = 
      userData?.role === 'admin' || 
      userData?.isAdmin === true ||
      userData?.roles?.includes('admin');
    
    // Log admin access attempts for security
    if (isAdmin) {
      await adminDb.collection('admin_access_logs').add({
        userId,
        timestamp: new Date().toISOString(),
        granted: true
      });
    }
    
    return isAdmin;
  } catch (error) {
    console.error('Admin check failed:', error);
    // Security: Default to false on error
    return false;
  }
}

// Wrapper for admin routes with proper error handling
export function withAdmin(
  handler: (req: NextRequest, context: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: any) => {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session?.user?.id) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      
      const isAdmin = await isAdminUser(session.user.id);
      
      if (!isAdmin) {
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        );
      }
      
      // Add admin context
      context.isAdmin = true;
      context.adminUserId = session.user.id;
      
      return handler(req, context);
    } catch (error) {
      console.error('Admin middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}
```

#### Create Admin User Script
```javascript
// scripts/create-admin-user.js
const admin = require('firebase-admin');
const { initializeApp } = require('./lib/firebase-admin');

async function createAdminUser(email) {
  const app = initializeApp();
  const db = admin.firestore();
  
  try {
    // Get user by email
    const userRecord = await admin.auth().getUserByEmail(email);
    
    // Update Firestore document
    await db.collection('users').doc(userRecord.uid).update({
      role: 'admin',
      isAdmin: true,
      roles: admin.firestore.FieldValue.arrayUnion('admin'),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Set custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      admin: true
    });
    
    console.log(`✅ Admin access granted to ${email}`);
  } catch (error) {
    console.error('Failed to create admin:', error);
  }
}

// Usage: node scripts/create-admin-user.js user@example.com
const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address');
  process.exit(1);
}

createAdminUser(email);
```

### 🔒 Task 2.2: Enable CSRF Protection
**Time Estimate**: 3-4 hours
**Security Level**: HIGH

#### Implementation
```typescript
// lib/csrf-protection.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CSRF_HEADER = 'X-CSRF-Token';
const CSRF_COOKIE = 'csrf-token';
const TOKEN_LENGTH = 32;

export function generateCSRFToken(): string {
  return crypto.randomBytes(TOKEN_LENGTH).toString('hex');
}

export function validateCSRFToken(
  req: NextRequest,
  token: string | null
): boolean {
  // Skip for safe methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return true;
  }
  
  // Get token from header or body
  const providedToken = 
    req.headers.get(CSRF_HEADER) ||
    req.nextUrl.searchParams.get('_csrf');
  
  if (!providedToken || !token) {
    return false;
  }
  
  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(providedToken),
    Buffer.from(token)
  );
}

export function withCSRF(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    // Get stored token from cookie
    const storedToken = req.cookies.get(CSRF_COOKIE)?.value;
    
    // Validate token for state-changing requests
    if (!validateCSRFToken(req, storedToken)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
    
    const response = await handler(req);
    
    // Generate new token for GET requests
    if (req.method === 'GET' && !storedToken) {
      const newToken = generateCSRFToken();
      response.cookies.set(CSRF_COOKIE, newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });
    }
    
    return response;
  };
}
```

#### Frontend Integration
```typescript
// hooks/use-csrf.ts
export function useCSRF() {
  const [csrfToken, setCSRFToken] = useState<string>('');
  
  useEffect(() => {
    // Get CSRF token from meta tag or cookie
    const token = 
      document.querySelector('meta[name="csrf-token"]')?.content ||
      document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf-token='))
        ?.split('=')[1];
    
    if (token) {
      setCSRFToken(token);
    }
  }, []);
  
  const secureFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);
    
    if (csrfToken && !['GET', 'HEAD'].includes(options.method || 'GET')) {
      headers.set('X-CSRF-Token', csrfToken);
    }
    
    return fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });
  }, [csrfToken]);
  
  return { csrfToken, secureFetch };
}
```

---

## Day 3-4: Replace Mock Data with Firebase

### 📊 Task 3.1: Audit Mock Data Usage
**Time Estimate**: 2-3 hours

#### Find All Mock Data
```bash
# Search for mock data patterns
grep -r "mockData\|fakeData\|dummyData\|TODO.*mock\|TODO.*real" apps/web/src --include="*.ts" --include="*.tsx"

# Common mock patterns
grep -r "return \[{" apps/web/src --include="*.tsx" | grep -v node_modules
grep -r "useState(\[{" apps/web/src --include="*.tsx"
```

#### Document Mock Data Locations
```markdown
# Mock Data Inventory

## Feed System
- [ ] /components/feed/feed-display.tsx:84 - Returns hardcoded posts
- [ ] /app/(dashboard)/feed/page.tsx:122 - Mock feed items

## Space System  
- [ ] /components/spaces/space-discovery.tsx:45 - Fake spaces array
- [ ] /hooks/use-spaces.ts:23 - Returns static space data

## Profile System
- [ ] /components/profile/activity-timeline.tsx:67 - Mock activities
- [ ] /app/profile/[handle]/page.tsx:90 - Hardcoded profile data
```

### 📊 Task 3.2: Create Firebase Service Layer
**Time Estimate**: 4-6 hours

#### Implementation
```typescript
// lib/services/space-service.ts
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Space } from '@hive/core';

export class SpaceService {
  private readonly COLLECTION = 'spaces';
  
  async getSpaces(options: {
    limit?: number;
    orderBy?: string;
    userId?: string;
  } = {}): Promise<Space[]> {
    try {
      let q = query(collection(db, this.COLLECTION));
      
      // Add user filter if provided
      if (options.userId) {
        q = query(q, where('members', 'array-contains', options.userId));
      }
      
      // Add ordering
      q = query(q, orderBy(options.orderBy || 'createdAt', 'desc'));
      
      // Add limit
      if (options.limit) {
        q = query(q, limit(options.limit));
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Space));
    } catch (error) {
      console.error('Failed to fetch spaces:', error);
      throw new Error('Failed to load spaces');
    }
  }
  
  async getSpaceById(spaceId: string): Promise<Space | null> {
    try {
      const docRef = doc(db, this.COLLECTION, spaceId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Space;
    } catch (error) {
      console.error('Failed to fetch space:', error);
      throw new Error('Failed to load space');
    }
  }
  
  subscribeToSpace(
    spaceId: string, 
    callback: (space: Space | null) => void
  ): () => void {
    const docRef = doc(db, this.COLLECTION, spaceId);
    
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({
          id: doc.id,
          ...doc.data()
        } as Space);
      } else {
        callback(null);
      }
    }, (error) => {
      console.error('Space subscription error:', error);
      callback(null);
    });
  }
  
  async createSpace(data: Partial<Space>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.COLLECTION), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Failed to create space:', error);
      throw new Error('Failed to create space');
    }
  }
  
  async updateSpace(spaceId: string, data: Partial<Space>): Promise<void> {
    try {
      const docRef = doc(db, this.COLLECTION, spaceId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Failed to update space:', error);
      throw new Error('Failed to update space');
    }
  }
}

// Export singleton instance
export const spaceService = new SpaceService();
```

### 📊 Task 3.3: Replace Mock Data in Components
**Time Estimate**: 4-6 hours

#### Example Migration
```typescript
// BEFORE: components/spaces/space-discovery.tsx
export function SpaceDiscovery() {
  const [spaces, setSpaces] = useState([
    { id: '1', name: 'Mock Space 1', members: 100 },
    { id: '2', name: 'Mock Space 2', members: 50 }
  ]);
  
  return (
    <div>
      {spaces.map(space => <SpaceCard key={space.id} space={space} />)}
    </div>
  );
}

// AFTER: Using real Firebase data
import { spaceService } from '@/lib/services/space-service';

export function SpaceDiscovery() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadSpaces() {
      try {
        setLoading(true);
        setError(null);
        const data = await spaceService.getSpaces({ limit: 20 });
        setSpaces(data);
      } catch (err) {
        setError('Failed to load spaces');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadSpaces();
  }, []);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (spaces.length === 0) {
    return <EmptyState message="No spaces found" />;
  }
  
  return (
    <div>
      {spaces.map(space => <SpaceCard key={space.id} space={space} />)}
    </div>
  );
}
```

---

## Day 5: Verification & Testing

### ✅ Task 4.1: Build Verification
**Time Estimate**: 2-3 hours

#### Full Build Test
```bash
# Clean build from scratch
rm -rf node_modules **/node_modules
rm -rf **/dist **/.next
pnpm install
pnpm build

# Expected output: All packages build successfully
```

#### Component Testing Script
```javascript
// scripts/verify-build.js
const { execSync } = require('child_process');
const fs = require('fs');

const packages = [
  '@hive/core',
  '@hive/auth-logic',
  '@hive/api-client',
  '@hive/hooks',
  '@hive/ui',
  'web',
  'admin'
];

const results = [];

for (const pkg of packages) {
  try {
    console.log(`Building ${pkg}...`);
    execSync(`pnpm build --filter=${pkg}`, { stdio: 'inherit' });
    results.push({ package: pkg, status: '✅' });
  } catch (error) {
    results.push({ package: pkg, status: '❌', error: error.message });
  }
}

console.table(results);

const failed = results.filter(r => r.status === '❌');
if (failed.length > 0) {
  console.error('Build verification failed!');
  process.exit(1);
} else {
  console.log('✅ All packages built successfully!');
}
```

### ✅ Task 4.2: Security Verification
**Time Estimate**: 2-3 hours

#### Admin Access Test
```typescript
// scripts/test-admin-access.ts
async function testAdminAccess() {
  const tests = [
    {
      name: 'Admin can access admin panel',
      endpoint: '/api/admin/dashboard',
      expectedStatus: 200
    },
    {
      name: 'Non-admin gets 403',
      endpoint: '/api/admin/dashboard',
      expectedStatus: 403,
      asUser: 'regular-user'
    },
    {
      name: 'Unauthenticated gets 401',
      endpoint: '/api/admin/dashboard',
      expectedStatus: 401,
      noAuth: true
    }
  ];
  
  for (const test of tests) {
    const result = await runTest(test);
    console.log(`${result.passed ? '✅' : '❌'} ${test.name}`);
  }
}
```

#### CSRF Protection Test
```typescript
// scripts/test-csrf.ts
async function testCSRF() {
  // Test 1: GET request sets CSRF token
  const getResponse = await fetch('/api/profile');
  const csrfToken = getResponse.headers.get('X-CSRF-Token');
  assert(csrfToken, 'CSRF token should be set');
  
  // Test 2: POST without token fails
  const badResponse = await fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify({ name: 'Test' })
  });
  assert(badResponse.status === 403, 'Should reject without CSRF token');
  
  // Test 3: POST with token succeeds
  const goodResponse = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ name: 'Test' })
  });
  assert(goodResponse.ok, 'Should accept with valid CSRF token');
  
  console.log('✅ CSRF protection working');
}
```

### ✅ Task 4.3: Data Migration Verification
**Time Estimate**: 2-3 hours

#### Mock Data Replacement Checklist
```markdown
# Mock Data Replacement Verification

## Feed System
- [x] Feed posts load from Firestore
- [x] Comments are persisted
- [x] Likes update in real-time
- [ ] Share functionality works

## Space System
- [x] Spaces load from database
- [x] Member counts are accurate
- [x] Join/leave updates database
- [ ] Space creation works

## Profile System  
- [x] Profile data from Firebase Auth
- [x] Activity history persisted
- [ ] Settings save to database
- [ ] Analytics track real events
```

---

## 📊 Success Metrics

### Build Success
- [ ] `pnpm build` completes without errors
- [ ] All packages have dist/ folders
- [ ] No TypeScript errors
- [ ] No missing dependency warnings

### Security Success
- [ ] Admin user can access /admin routes
- [ ] Regular users get 403 on admin routes
- [ ] CSRF tokens validate on POST requests
- [ ] All auth checks use centralized middleware

### Data Success
- [ ] No hardcoded data arrays in components
- [ ] All lists show "loading" state
- [ ] Error states handle Firebase failures
- [ ] Real-time updates work (where applicable)

### Performance Baseline
- [ ] Build time < 5 minutes
- [ ] Page load time < 3 seconds
- [ ] Firebase queries < 500ms
- [ ] No memory leaks in subscriptions

---

## 🚨 Rollback Plan

If critical issues arise:

```bash
# Quick rollback
git checkout main
git checkout -b phase-1-fixes
git cherry-pick [specific-fix-commits]

# Partial rollback (keep security fixes)
git revert [workspace-config-commits]
git cherry-pick [security-fix-commits]
```

---

## 📝 Documentation Updates

### Update README.md
```markdown
## Build Instructions

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Development
pnpm dev
```

## Admin Access

To grant admin access:
```bash
node scripts/create-admin-user.js user@example.com
```

## Security

- CSRF protection enabled on all state-changing requests
- Admin routes require authenticated admin user
- All data fetched from Firebase (no mock data)
```

---

## 🎯 Phase 1 Complete Checklist

- [ ] **Day 1-2**: Workspace & Build Fixed
  - [ ] pnpm workspace configuration corrected
  - [ ] Build order defined in turbo.json
  - [ ] All missing dependencies installed
  - [ ] Full build passes

- [ ] **Day 2-3**: Security Fixed
  - [ ] Admin authentication implemented
  - [ ] CSRF protection enabled
  - [ ] Security middleware centralized
  - [ ] Admin user created and tested

- [ ] **Day 3-4**: Mock Data Replaced
  - [ ] Firebase service layer created
  - [ ] All mock data identified
  - [ ] Components use real Firebase data
  - [ ] Error handling implemented

- [ ] **Day 5**: Verification Complete
  - [ ] Build verification script passes
  - [ ] Security tests pass
  - [ ] Data loads from Firebase
  - [ ] Performance baseline established

---

## Next: Phase 2 Preview

With Phase 1 complete, the platform will have:
- ✅ Working build system
- ✅ Secure admin access
- ✅ Real data persistence
- ✅ Stable foundation

Phase 2 will focus on:
- Testing implementation (target 80% coverage)
- API standardization
- Documentation
- Performance optimization

---

*Phase 1 Success = Platform can be developed and deployed*
*Estimated Completion: 5-7 days with focused effort*