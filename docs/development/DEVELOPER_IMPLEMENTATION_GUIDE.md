# 🛠️ DEVELOPER IMPLEMENTATION GUIDE
**Converting Storybook Stories to Production Code**

---

## 📋 **OVERVIEW**

This guide shows exactly how to implement each Storybook story as working Next.js pages and components. Each story represents a complete system that needs to be converted from design documentation to functioning code.

---

## 🏗️ **IMPLEMENTATION STRATEGY**

### **Step 1: Component-First Approach**
For each story, extract components in this order:
1. **Atoms** (buttons, inputs, badges)
2. **Molecules** (cards, form fields, navigation items)
3. **Organisms** (complete sections, dashboards, forms)
4. **Pages** (full page layouts)

### **Step 2: State Management Pattern**
```typescript
// Use this pattern for all interactive components
const useComponentState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const handleAction = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Firebase operation here
      const result = await firebaseAction();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, handleAction };
};
```

---

## 📱 **STORY-BY-STORY IMPLEMENTATION**

### **01. Foundation Design Tokens → CSS Variables**
```css
/* styles/globals.css */
:root {
  --color-hive-gold: #FFD700;
  --color-gray-900: #111827;
  --color-gray-800: #1F2937;
  
  --font-primary: 'Inter', sans-serif;
  --font-display: 'Inter', sans-serif;
  
  --spacing-unit: 0.25rem;
  --border-radius: 0.375rem;
}
```

### **02. Atoms → UI Component Library**
**Location:** `packages/ui/src/components/ui/`

```typescript
// packages/ui/src/atomic/atoms/button.tsx
<Button
  variant="brand"
  size="lg"
  leftIcon={<Sparkles className="h-4 w-4" />}
  loading={isSubmitting}
>
  Continue
</Button>;
```

### **03. Authentication System → Next.js Pages**
**Story:** `10-Live-Frontend-Authentication-Onboarding-System.stories.tsx`

#### **Pages to Create:**
```bash
apps/web/src/app/auth/login/page.tsx
apps/web/src/app/auth/signup/page.tsx
apps/web/src/app/auth/verify/page.tsx
apps/web/src/app/onboarding/page.tsx
```

#### **Implementation:**
```typescript
// apps/web/src/app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@hive/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.endsWith('@buffalo.edu')) {
      setError('Please use your UB email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to feed
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Welcome to HIVE</CardTitle>
          <CardDescription className="text-gray-400">
            Connect with your UB community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              label="UB Email"
              placeholder="your.name@buffalo.edu"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="Keep it secure"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {error ? (
              <div className="text-sm text-red-400">{error}</div>
            ) : null}

            <Button
              type="submit"
              variant="brand"
              className="w-full"
              loading={loading}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

### **04. Profile System → Dashboard Pages**
**Story:** `05-Live-Frontend-Profile-System.stories.tsx`

```typescript
// apps/web/src/app/profile/page.tsx
import { ProfileDashboard } from '@/components/profile/profile-dashboard';
import { getCurrentUser } from '@/lib/auth-server';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-black">
      <ProfileDashboard user={user} />
    </div>
  );
}
```

```typescript
// apps/web/src/components/profile/profile-dashboard.tsx
'use client';

import { useProfileData } from '@/hooks/use-profile-data';
import { ProfileCard, StatsCard, ToolsCard } from '@hive/ui';

export function ProfileDashboard({ user }: { user: User }) {
  const { profile, stats, tools, loading } = useProfileData(user.uid);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Bento Grid Layout from Story */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProfileCard 
            user={profile}
            editable
            onEdit={() => router.push('/profile/edit')}
          />
        </div>
        
        <div className="space-y-4">
          <StatsCard stats={stats} />
          <ToolsCard tools={tools} />
        </div>
      </div>
    </div>
  );
}
```

### **05. Spaces System → Community Pages**
**Story:** `06-Live-Frontend-Spaces-System.stories.tsx`

```typescript
// apps/web/src/app/spaces/page.tsx
import { SpaceDiscovery } from '@/components/spaces/space-discovery';
import { getPublicSpaces } from '@/lib/spaces-server';

export default async function SpacesPage() {
  const spaces = await getPublicSpaces('ub-buffalo');

  return (
    <div className="min-h-screen bg-black">
      <SpaceDiscovery initialSpaces={spaces} />
    </div>
  );
}
```

### **06. Feed System → Social Content**
**Story:** `07-Live-Frontend-Feed-Rituals-System.stories.tsx`

```typescript
// apps/web/src/app/page.tsx (main feed)
import { FeedInterface } from '@/components/feed/feed-interface';
import { getFeedData } from '@/lib/feed-server';

export default async function FeedPage() {
  const feedData = await getFeedData();

  return (
    <div className="min-h-screen bg-black">
      <FeedInterface initialData={feedData} />
    </div>
  );
}
```

---

## 🔥 **FIREBASE INTEGRATION**

### **Authentication Setup**
```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Development emulators
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

### **Data Hooks Pattern**
```typescript
// hooks/use-profile-data.ts
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useProfileData(userId: string) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'users', userId),
      (doc) => {
        if (doc.exists()) {
          setProfile({ id: doc.id, ...doc.data() });
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [userId]);

  return { profile, loading, error };
}
```

---

## 📱 **MOBILE OPTIMIZATION**

### **Responsive Design Pattern**
```typescript
// Every component should use this pattern
<div className="
  px-4 md:px-6 lg:px-8
  py-2 md:py-4 lg:py-6
  text-sm md:text-base lg:text-lg
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  {/* Mobile-first, then tablet, then desktop */}
</div>
```

### **Touch Optimization**
```css
/* All interactive elements */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  touch-action: manipulation;
}

/* Prevent zoom on input focus (iOS) */
input, select, textarea {
  font-size: 16px;
}
```

---

## 🚀 **DEPLOYMENT CHECKLIST**

### **Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hive-ub
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key
DATABASE_URL=your_firestore_url
```

### **Build & Deploy Commands**
```bash
# Development
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### **Performance Checklist**
- [ ] Images optimized with Next.js Image component
- [ ] Components lazy-loaded with React.lazy()
- [ ] Firebase queries have limits and indexes
- [ ] Page load times under 2 seconds
- [ ] Mobile performance score >90 on Lighthouse

---

## 🧪 **TESTING STRATEGY**

### **Component Tests**
```typescript
// __tests__/components/profile-card.test.tsx
import { render, screen } from '@testing-library/react';
import { ProfileCard } from '@/components/profile/profile-card';

test('renders user name and major', () => {
  const mockUser = {
    name: 'John Doe',
    major: 'Computer Science',
    year: '2025'
  };

  render(<ProfileCard user={mockUser} />);
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Computer Science')).toBeInTheDocument();
});
```

### **Integration Tests**
```typescript
// __tests__/pages/auth/login.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/app/auth/login/page';

test('shows error for non-UB email', async () => {
  render(<LoginPage />);
  
  const emailInput = screen.getByPlaceholderText('your.name@buffalo.edu');
  const submitButton = screen.getByRole('button', { name: 'Sign In' });
  
  fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(screen.getByText('Please use your UB email address')).toBeInTheDocument();
  });
});
```

---

## 📊 **MONITORING & ANALYTICS**

### **Error Tracking**
```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

// Use in components
try {
  await riskyFirebaseOperation();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
```

### **User Analytics**
```typescript
// lib/analytics.ts
import { gtag } from 'ga-gtag';

export const trackEvent = (eventName: string, parameters: any) => {
  gtag('event', eventName, parameters);
};

// Usage
trackEvent('space_joined', {
  space_id: spaceId,
  space_type: 'academic',
  user_year: user.graduationYear
});
```

---

This guide provides the exact implementation pattern for converting each Storybook story into working production code. Each story becomes a combination of components, pages, hooks, and API routes that work together to create the complete HIVE platform.
