# HIVE Web App Development Guidelines

## Next.js 15 App Router Patterns

### File Structure & Routing
- **App Router**: Use `app/` directory for all routes
- **Server Components**: Default to RSC, only use `'use client'` when necessary
- **Route Groups**: Use `(dashboard)` for layout organization without URL segments
- **Dynamic Routes**: Use `[id]` for dynamic segments, `[...slug]` for catch-all routes

### Component Architecture
```typescript
// GOOD: Server component with client interaction
export default function SpacePage({ params }: { params: { spaceId: string } }) {
  const space = await getSpaceData(params.spaceId);
  
  return (
    <div>
      <SpaceHeader space={space} />
      <SpaceContentClient initialData={space} />
    </div>
  );
}

// Use client components only for interactivity
'use client';
export function SpaceContentClient({ initialData }: { initialData: Space }) {
  const [space, setSpace] = useState(initialData);
  // Interactive logic here
}
```

### Data Fetching Patterns
- **Server-side**: Use `await` in server components for initial data
- **Client-side**: Use SWR/React Query for dynamic data updates
- **Firebase Integration**: Server-side for SSR, client-side for real-time updates

## Firebase Integration

### Authentication Flow
```typescript
// Server component - check auth
import { cookies } from 'next/headers';

export default async function ProtectedPage() {
  const session = await verifySession(cookies());
  if (!session) redirect('/auth/login');
  
  return <DashboardContent user={session.user} />;
}

// Client component - handle auth state
'use client';
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);
  
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Firestore Patterns
```typescript
// Server-side queries for SSR
export async function getSpaces() {
  const spacesRef = collection(db, 'spaces');
  const q = query(spacesRef, where('campusId', '==', 'ub-buffalo'));
  return await getDocs(q);
}

// Client-side real-time listeners
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
- **Image Optimization**: Use Next.js Image component with proper sizing
- **Bundle Analysis**: Monitor bundle size with `@next/bundle-analyzer`

### Caching Strategy
```typescript
// Static generation for public content
export async function generateStaticParams() {
  const spaces = await getPublicSpaces();
  return spaces.map((space) => ({ spaceId: space.id }));
}

// Revalidation for dynamic content
export const revalidate = 300; // 5 minutes

// Client-side caching with SWR
const { data: spaces } = useSWR('/api/spaces', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000
});
```

## Mobile-First Development

### Responsive Breakpoints
```typescript
// Tailwind breakpoints (mobile-first)
const breakpoints = {
  sm: '640px',    // Small phones
  md: '768px',    // Tablets
  lg: '1024px',   // Desktop
  xl: '1280px',   // Large desktop
};

// Component responsive patterns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {spaces.map(space => <SpaceCard key={space.id} space={space} />)}
</div>
```

### Touch Interactions
```typescript
// Touch-optimized interactions
export function SwipeableCard({ children, onSwipe }: SwipeableCardProps) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) onSwipe('left');
    if (touchEnd - touchStart > 150) onSwipe('right');
  };
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="min-h-[44px] touch-pan-x"
    >
      {children}
    </div>
  );
}
```

## UB Campus Integration

### Campus-Specific Features
```typescript
interface UBFeatures {
  emailValidation: '@buffalo.edu domain only';
  campusLocations: 'North Campus, South Campus, Downtown';
  academicCalendar: 'Fall/Spring semesters + summer sessions';
  dormitories: 'Ellicott, Governors, South Campus, Flint Loop';
}

// Campus validation
export function validateUBEmail(email: string): boolean {
  return email.endsWith('@buffalo.edu');
}

// Academic year context
export function useAcademicYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  // UB academic year: August to May
  return month >= 7 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
}
```

## Deployment & Environment

### Vercel Configuration
```typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  env: {
    CAMPUS_ID: 'ub-buffalo',
  }
};

export default nextConfig;
```

### Environment Variables
```bash
# Required environment variables
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_SERVICE_ACCOUNT_KEY=
RESEND_API_KEY=
```

## Development Workflow

### Build & Test Commands
```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production  
pnpm typecheck             # Run TypeScript checks
pnpm lint                  # Run ESLint
pnpm lint:fix              # Fix linting issues

# Testing
pnpm test                  # Run tests
pnpm test:e2e             # End-to-end tests
```

### Git Workflow
- **Main branch**: Production-ready code
- **Staging branch**: Pre-production testing
- **Feature branches**: Individual development work

---

## Related Documentation

- **`../../CLAUDE.md`** - Project vision and collaboration approach
- **`../../AI_DEVELOPMENT_RULES.md`** - Comprehensive technical guidelines
- **`../../HIVE_DESIGN_SYSTEM_STATUS.md`** - Design system implementation status

**Last Updated**: August 29, 2025
- When making a change somewhere in tech stack, always consider the impact it will make on front end and back end.
- When adding new code, ALWAYS make sure it is properly integrated and not causing new errors.