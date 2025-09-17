# HIVE Web App Development Guidelines

## Next.js 15 App Router

### File Structure
- **App Router**: Use `app/` directory for all routes
- **Server Components**: Default to RSC, only use `'use client'` when necessary  
- **Route Groups**: Use `(dashboard)` for layout organization
- **Dynamic Routes**: Use `[id]` for dynamic segments

### Component Patterns

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

## Firebase Integration

### Authentication
```typescript
// Server-side auth check
import { cookies } from 'next/headers';

export default async function ProtectedPage() {
  const session = await verifySession(cookies());
  if (!session) redirect('/auth/login');
  
  return <DashboardContent user={session.user} />;
}

// Client-side auth state
'use client';
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);
  
  return user;
}
```

### Firestore Patterns
```typescript
// Server-side for SSR
export async function getSpaces() {
  const spacesRef = collection(db, 'spaces');
  const q = query(spacesRef, where('campusId', '==', 'ub-buffalo'));
  return await getDocs(q);
}

// Client-side real-time
'use client';
export function useSpaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  
  useEffect(() => {
    const q = query(collection(db, 'spaces'), where('campusId', '==', 'ub-buffalo'));
    return onSnapshot(q, (snapshot) => {
      setSpaces(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);
  
  return spaces;
}
```

## Performance Optimization

### Bundle Optimization
- **Dynamic Imports**: Lazy load non-critical components
- **Image Optimization**: Use Next.js Image component
- **Bundle Analysis**: Monitor with `@next/bundle-analyzer`

### Caching Strategy
```typescript
// Static generation
export async function generateStaticParams() {
  const spaces = await getPublicSpaces();
  return spaces.map((space) => ({ spaceId: space.id }));
}

// Revalidation
export const revalidate = 300; // 5 minutes

// Client caching with SWR
const { data } = useSWR('/api/spaces', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000
});
```

## Mobile-First Development

### Responsive Design
```tsx
// Tailwind mobile-first breakpoints
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {spaces.map(space => <SpaceCard key={space.id} space={space} />)}
</div>
```

### Touch Optimization
- Minimum touch target: 44px
- Use `touch-pan-x` for swipe gestures
- Implement pull-to-refresh where appropriate

## UB Campus Integration

### Campus Features
- Email validation: `@buffalo.edu` domain only
- Campus locations: North Campus, South Campus, Downtown
- Academic calendar: Fall/Spring semesters
- Dormitories: Ellicott, Governors, South Campus

```typescript
export function validateUBEmail(email: string): boolean {
  return email.endsWith('@buffalo.edu');
}
```

## Environment Configuration

### Required Variables
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_SERVICE_ACCOUNT_KEY=
RESEND_API_KEY=
```

### Next.js Config
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};
```

## Development Workflow

### Commands
```bash
pnpm dev          # Start development
pnpm build        # Build production
pnpm typecheck    # TypeScript checks
pnpm lint         # ESLint
pnpm test:e2e     # End-to-end tests
```

### Git Workflow
- **main**: Production-ready code
- **staging**: Pre-production testing
- **feature/***: Individual features

## Quality Standards
- TypeScript strict mode
- No `any` types
- Complete error boundaries
- Accessibility (ARIA labels, keyboard nav)
- Mobile-first responsive design
- Real Firebase data only (no mocks in production)

---

**Related Documentation**: 
- `../../CLAUDE.md` - Main project guidelines
- `../../AI_DEVELOPMENT_RULES.md` - AI collaboration rules