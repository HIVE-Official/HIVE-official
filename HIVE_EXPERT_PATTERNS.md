# HIVE Expert Patterns Reference

## Core HIVE Patterns

### Next.js 15 Server Component Pattern
```typescript
// Server component with data fetching
export default async function SpacePage({ params }: { params: { spaceId: string } }) {
  const space = await getSpaceData(params.spaceId);
  
  return (
    <div>
      <SpaceHeader space={space} />
      <SpaceContentClient initialData={space} />
    </div>
  );
}

// Client component for interactivity
'use client';
export function SpaceContentClient({ initialData }: { initialData: Space }) {
  const [space, setSpace] = useState(initialData);
  // Interactive logic here
}
```

### Firebase Real-time Listener Pattern
```typescript
'use client';
export function useSpaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  
  useEffect(() => {
    const q = query(
      collection(db, 'spaces'), 
      where('campusId', '==', 'ub-buffalo'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSpaces(snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Space)));
    });
    
    return () => unsubscribe(); // Cleanup
  }, []);
  
  return spaces;
}
```

### SpaceSurface Interface Pattern
```typescript
interface SpaceSurface {
  space: Space;
  mode?: 'view' | 'edit';
  leaderMode?: 'configure' | 'moderate' | 'insights' | 'manage';
  canPost?: boolean;
  canModerate?: boolean;
  maxItems?: number;
}

export function HivePostsSurface({ 
  space, 
  mode = 'view',
  canPost = false,
  maxItems = 10 
}: SpaceSurface) {
  // Surface implementation
}
```

### AuthenticatedFetch Pattern
```typescript
export async function authenticatedFetch(url: string, options?: RequestInit) {
  const session = await getSession();
  
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  });
}

// Usage
const response = await authenticatedFetch(`/api/spaces/${spaceId}/join`, {
  method: 'POST',
  body: JSON.stringify({ role: 'member' })
});
```

### API Route Pattern (Next.js 15)
```typescript
// apps/web/src/app/api/spaces/[spaceId]/route.ts
import { NextRequest } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(
  req: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  const session = await getServerSession();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const space = await adminDb
    .collection('spaces')
    .doc(params.spaceId)
    .get();
    
  if (!space.exists) {
    return new Response('Not found', { status: 404 });
  }
  
  return Response.json(space.data());
}

export async function POST(
  req: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  const session = await getServerSession();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const data = await req.json();
  
  await adminDb
    .collection('spaces')
    .doc(params.spaceId)
    .collection('members')
    .add({
      userId: session.user.id,
      ...data,
      joinedAt: FieldValue.serverTimestamp()
    });
    
  return Response.json({ success: true });
}
```

### Mobile-First Responsive Pattern
```tsx
// TailwindCSS mobile-first breakpoints
<div className="
  grid grid-cols-1 gap-4
  md:grid-cols-2 md:gap-6
  lg:grid-cols-3 lg:gap-8
  p-4 md:p-6 lg:p-8
">
  {spaces.map(space => (
    <SpaceCard 
      key={space.id} 
      space={space}
      className="
        min-h-[200px] 
        touch-manipulation
        active:scale-[0.98]
        transition-transform
      " 
    />
  ))}
</div>
```

### Error Boundary Pattern
```typescript
'use client';

export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}
```

### UB Campus Validation Pattern
```typescript
export function validateUBEmail(email: string): boolean {
  return email.endsWith('@buffalo.edu');
}

export async function verifyUBStudent(email: string) {
  if (!validateUBEmail(email)) {
    throw new Error('Must use @buffalo.edu email');
  }
  
  // Additional verification logic
  const domain = email.split('@')[1];
  const isValid = domain === 'buffalo.edu';
  
  return {
    valid: isValid,
    campus: 'ub-buffalo',
    emailDomain: domain
  };
}
```

### Atomic Component Pattern
```typescript
// Atom
export function HiveButton({ children, onClick, variant = 'primary' }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-lg transition-colors',
        variant === 'primary' && 'bg-hive-brand-primary text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-800'
      )}
    >
      {children}
    </button>
  );
}

// Molecule
export function HiveFormField({ label, error, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

// Organism
export function HiveSpaceCard({ space, onJoin }) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-bold">{space.name}</h3>
      <p className="text-gray-600">{space.description}</p>
      <HiveButton onClick={() => onJoin(space.id)}>
        Join Space
      </HiveButton>
    </div>
  );
}
```

### Performance Optimization Patterns
```typescript
// Dynamic imports for code splitting
const HiveToolBuilder = dynamic(
  () => import('@/components/tool-builder'),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: false 
  }
);

// Image optimization
import Image from 'next/image';

<Image
  src={space.coverImage}
  alt={space.name}
  width={1200}
  height={400}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL={space.coverImageBlur}
/>

// Memo for expensive computations
const expensiveData = useMemo(() => {
  return processComplexData(rawData);
}, [rawData]);

// Debounced search
const debouncedSearch = useMemo(
  () => debounce((term: string) => {
    searchSpaces(term);
  }, 300),
  []
);
```

## Testing Patterns

### E2E Test Pattern
```typescript
// apps/web/src/test/e2e/spaces.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Space Management', () => {
  test('should create a new space', async ({ page }) => {
    await page.goto('/spaces/new');
    
    await page.fill('[name="name"]', 'Test Space');
    await page.fill('[name="description"]', 'Test Description');
    await page.selectOption('[name="category"]', 'academic');
    
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/\/spaces\/[a-zA-Z0-9]+/);
    await expect(page.locator('h1')).toContainText('Test Space');
  });
});
```

## Common HIVE Commands

```bash
# Development
pnpm dev                 # Start dev server
pnpm build              # Build for production (currently failing)
pnpm typecheck          # TypeScript validation
pnpm lint               # ESLint check

# Firebase
firebase emulators:start # Local Firebase
firebase deploy         # Deploy to production

# Testing
pnpm test:e2e           # Run E2E tests
pnpm storybook          # Component development
```

## File Structure Patterns

```
packages/ui/src/atomic/
├── atoms/              # Basic elements
│   ├── button.tsx
│   ├── input.tsx
│   └── badge.tsx
├── molecules/          # Compound components  
│   ├── form-field.tsx
│   ├── card.tsx
│   └── modal.tsx
└── organisms/          # Complex features
    ├── hive-posts-surface.tsx
    ├── hive-events-surface.tsx
    └── hive-members-surface.tsx
```

## Key Performance Metrics

- Initial Load: <3 seconds
- Route Transition: <1 second  
- Firebase Query: <500ms
- Animation: 60fps
- Bundle Size: <500KB per route
- Touch Targets: Minimum 44px
- Lighthouse Score: >90