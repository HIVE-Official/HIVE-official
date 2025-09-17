# HIVE Developer Quick Reference

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Build for production
pnpm build
```

## 📁 Where Things Live

### Creating a New Feature? Here's Where Files Go:

```
Feature: Space Management
├── apps/web/src/app/(dashboard)/spaces/        # Pages
├── apps/web/src/app/api/spaces/                # API routes
├── apps/web/src/components/spaces/             # Feature components
├── packages/ui/src/atomic/organisms/hive-space-* # Reusable UI
├── packages/core/src/domain/space.ts           # Domain types
└── apps/web/src/lib/firebase/spaces.ts         # Firebase logic
```

## 🎯 Common Tasks

### 1. Creating a New Page

```typescript
// apps/web/src/app/(dashboard)/myfeature/page.tsx
"use client";

import { PageContainer } from "@/components/layouts";
import { useSession } from "@/hooks/use-session";

export default function MyFeaturePage() {
  const { user } = useSession();
  
  return (
    <PageContainer
      title="My Feature"
      description="Feature description"
    >
      {/* Your content */}
    </PageContainer>
  );
}
```

### 2. Creating an API Route

```typescript
// apps/web/src/app/api/myfeature/route.ts
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1)
});

export const POST = withAuth(async (req: NextRequest, context) => {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    
    // Your logic here
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
});
```

### 3. Creating a Component

```typescript
// packages/ui/src/atomic/molecules/hive-feature-card.tsx
import { FC, memo } from "react";
import { cn } from "@/lib/utils";

interface HiveFeatureCardProps {
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
}

export const HiveFeatureCard: FC<HiveFeatureCardProps> = memo(({
  title,
  description,
  onClick,
  className
}) => {
  return (
    <div 
      className={cn(
        "p-4 bg-white rounded-lg shadow-sm",
        "hover:shadow-md transition-shadow",
        className
      )}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-gray-600 mt-2">{description}</p>
      )}
    </div>
  );
});

HiveFeatureCard.displayName = "HiveFeatureCard";
```

### 4. Using Firebase

```typescript
// Reading data
import { dbAdmin } from "@/lib/firebase-admin";

const spaces = await dbAdmin
  .collection("spaces")
  .where("isActive", "==", true)
  .limit(10)
  .get();

// Writing data
await dbAdmin.collection("spaces").add({
  name: "New Space",
  createdAt: FieldValue.serverTimestamp()
});

// Real-time listener (client-side)
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "spaces"),
    (snapshot) => {
      const spaces = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSpaces(spaces);
    }
  );
  
  return () => unsubscribe();
}, []);
```

### 5. Authentication Patterns

```typescript
// Client-side auth check
import { useSession } from "@/hooks/use-session";

function MyComponent() {
  const { user, isLoading } = useSession();
  
  if (isLoading) return <Loading />;
  if (!user) return <SignIn />;
  
  return <AuthenticatedContent />;
}

// API route auth
export const GET = withAuth(async (req, context) => {
  const userId = context.user.id;
  // User is authenticated
});

// Protected page (server component)
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/login");
  
  return <div>Protected content</div>;
}
```

## 🏗️ Architecture Patterns

### Component Hierarchy
```
Atoms      → Button, Input, Badge
Molecules  → FormField, Card, Avatar
Organisms  → SpaceDashboard, FeedContainer
Templates  → DashboardLayout, AuthLayout
Pages      → Full page components
```

### State Management Flow
```
User Action → Component → API Call → Firebase → Response → Update UI
                ↓
            Local State / React Query Cache
```

### Import Order (Always Follow)
```typescript
// 1. External packages
import { useState } from "react";
import { useRouter } from "next/navigation";

// 2. Internal packages
import { Button } from "@hive/ui";
import { useDebounce } from "@hive/hooks";

// 3. Absolute imports
import { authenticatedFetch } from "@/lib/auth";
import { PageContainer } from "@/components/layouts";

// 4. Relative imports (only within same feature)
import { LocalHelper } from "./helpers";

// 5. Type imports
import type { Space, User } from "@hive/core";
```

## 🔧 Common Utilities

### API Fetching
```typescript
// With authentication
import { authenticatedFetch } from "@/lib/auth";

const response = await authenticatedFetch("/api/spaces", {
  method: "POST",
  body: JSON.stringify(data)
});

// Error handling
try {
  const data = await response.json();
} catch (error) {
  toast.error("Something went wrong");
}
```

### Toast Notifications
```typescript
import toast from "@/hooks/use-toast-notifications";

toast.success("Space created!");
toast.error("Failed to join space");
toast.info("Loading...");
```

### Form Validation
```typescript
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
});

// In component
const handleSubmit = (data: unknown) => {
  try {
    const validated = schema.parse(data);
    // Use validated data
  } catch (error) {
    // Handle validation errors
  }
};
```

### Styling Utilities
```typescript
import { cn } from "@hive/ui";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  isDisabled && "disabled-classes"
)} />
```

## 📝 Code Style Quick Rules

### DO ✅
```typescript
// Use early returns
if (!user) return null;

// Use optional chaining
const name = user?.profile?.name ?? "Anonymous";

// Destructure props
function Card({ title, description }) { }

// Use semantic HTML
<nav>, <main>, <article>, <section>

// Add loading states
if (isLoading) return <Skeleton />;

// Handle errors
try { } catch (error) { /* handle */ }
```

### DON'T ❌
```typescript
// Don't use any
let data: any; // ❌

// Don't use deep nesting
if (x) { if (y) { if (z) { } } } // ❌

// Don't use magic numbers
setTimeout(() => {}, 3000); // ❌
const TIMEOUT_MS = 3000; // ✅

// Don't ignore errors
try { } catch { } // ❌

// Don't use console.log in production
console.log(data); // ❌
logger.debug(data); // ✅
```

## 🐛 Debugging Tips

### Check These First
1. **Build failing?** → Check @hive/ui package imports
2. **Auth not working?** → Check Firebase config & .env
3. **Data not updating?** → Check Firebase rules & indexes
4. **Styles broken?** → Check Tailwind config & CSS imports
5. **Types error?** → Run `pnpm typecheck`

### Useful Commands
```bash
# Clear all caches
rm -rf .next node_modules/.cache

# Check for type errors
pnpm typecheck

# Find unused dependencies
npx depcheck

# Analyze bundle size
npx @next/bundle-analyzer
```

## 🚨 Common Gotchas

1. **Firebase Timestamps**
   ```typescript
   // Server-side
   FieldValue.serverTimestamp()
   
   // Client-side display
   new Date(timestamp?.seconds * 1000)
   ```

2. **Environment Variables**
   - Must start with `NEXT_PUBLIC_` for client-side
   - Restart dev server after changes

3. **Dynamic Imports**
   ```typescript
   // For heavy components
   const Heavy = dynamic(() => import("./Heavy"), {
     ssr: false,
     loading: () => <Skeleton />
   });
   ```

4. **Hydration Errors**
   - Use `"use client"` directive
   - Wrap date/time in `useEffect`
   - Check for browser-only APIs

## 📚 Resources

### Internal Docs
- [Code Standards](./CODE_STANDARDS.md)
- [API Documentation](./docs/API.md)
- [Component Library](http://localhost:6006)

### Key Files
- `apps/web/.env.example` - Environment variables
- `packages/ui/src/index.ts` - UI exports
- `packages/core/src/domain/` - Type definitions

### Testing
```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Run specific test
pnpm test -- SpaceCard
```

## 🔑 Environment Setup

Required `.env` variables:
```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Auth
NEXTAUTH_SECRET=
NEXT_PUBLIC_APP_URL=
```

## 💡 Pro Tips

1. **Use React Query for data fetching** - It handles caching, refetching, and error states
2. **Memoize expensive computations** - Use `useMemo` for derived state
3. **Lazy load routes** - Use dynamic imports for better performance
4. **Check bundle size** - Keep route bundles under 200KB
5. **Use TypeScript strictly** - It catches bugs before runtime
6. **Test critical paths** - Focus on user journeys, not coverage
7. **Document complex logic** - Future you will thank you

---

**Need help?** Check the [main docs](./README.md) or ask in the team chat!