# AI Development Patterns for HIVE

## 🚀 Quick Start for Claude Code

### Pattern 1: Feature Implementation
```typescript
// 1. Start with domain model
// packages/core/src/domain/ritual.ts
export interface Ritual {
  id: string;
  spaceId: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  nextInstance: Date;
}

// 2. Create validation schema
// packages/validation/src/ritual.schema.ts
export const ritualSchema = z.object({
  name: z.string().min(3).max(100),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
});

// 3. Build API route
// apps/web/src/app/api/rituals/route.ts
export async function POST(req: Request) {
  // Auth → Validate → Execute → Response
}

// 4. Create UI component
// packages/ui/src/atomic/organisms/ritual-card.tsx
export const RitualCard: FC<RitualProps> = ({ ritual }) => {
  // Component implementation
};
```

### Pattern 2: Surface Component
```typescript
// packages/ui/src/components/surfaces/HiveRitualsSurface.tsx
export const HiveRitualsSurface: FC<SurfaceProps> = ({
  spaceId,
  mode = 'view',
  canManage = false
}) => {
  // 1. Real-time data hook
  const { rituals, loading } = useRealtimeRituals(spaceId);
  
  // 2. Optimistic updates
  const { execute } = useOptimisticUpdates();
  
  // 3. Render with states
  if (loading) return <Skeleton />;
  if (!rituals.length) return <EmptyState />;
  
  return <RitualGrid rituals={rituals} />;
};
```

### Pattern 3: Real-time Hook
```typescript
// packages/ui/src/hooks/use-realtime-rituals.ts
export const useRealtimeRituals = (spaceId: string) => {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = firestore
      .collection('spaces')
      .doc(spaceId)
      .collection('rituals')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRituals(data);
        setLoading(false);
      });
      
    return () => unsubscribe();
  }, [spaceId]);
  
  return { rituals, loading };
};
```

### Pattern 4: API with Firebase Admin
```typescript
// apps/web/src/app/api/spaces/[spaceId]/rituals/route.ts
import { adminDb } from '@/lib/firebase-admin';

export async function GET(
  req: Request,
  { params }: { params: { spaceId: string } }
) {
  const session = await getServerSession();
  if (!session) return new Response('Unauthorized', { status: 401 });
  
  const rituals = await adminDb
    .collection('spaces')
    .doc(params.spaceId)
    .collection('rituals')
    .get();
    
  return Response.json(
    rituals.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  );
}
```

## 🎯 Context-Efficient Commands

### Instead of reading entire files:
```bash
# ❌ Inefficient
Read: packages/ui/src/atomic/atoms/*.tsx

# ✅ Efficient
Grep: "export.*function.*Button" packages/ui/src/atomic/atoms/
```

### Finding patterns:
```bash
# Find all surfaces
Glob: "**/surfaces/Hive*Surface.tsx"

# Find API routes for spaces
Glob: "apps/web/src/app/api/spaces/**/route.ts"

# Find specific interface
Grep: "interface.*Space.*{" --type ts
```

## 🔨 Common Tasks

### Add New Surface to a Space
1. Check existing surfaces: `packages/ui/src/components/surfaces/`
2. Copy closest pattern (e.g., HivePostsSurface.tsx)
3. Modify for new domain
4. Update exports in `packages/ui/src/index.ts`

### Create New API Endpoint
1. Navigate to: `apps/web/src/app/api/`
2. Create folder structure matching URL
3. Add `route.ts` with GET/POST/PUT/DELETE handlers
4. Use `adminDb` from `@/lib/firebase-admin`

### Add Component to UI Library
1. Determine atomic level (atom/molecule/organism)
2. Create in: `packages/ui/src/atomic/{level}/`
3. Export from: `packages/ui/src/index.ts`
4. Add story: `packages/ui/src/stories/`

## 📊 Performance Patterns

### Lazy Loading
```typescript
const HeavyComponent = dynamic(
  () => import('@hive/ui').then(mod => mod.HeavyComponent),
  { ssr: false, loading: () => <Skeleton /> }
);
```

### Optimistic Updates
```typescript
const handleAction = async (data) => {
  // 1. Update UI immediately
  setLocalState(optimisticValue);
  
  // 2. Send to server
  try {
    await api.update(data);
  } catch (error) {
    // 3. Revert on failure
    setLocalState(previousValue);
    toast.error('Action failed');
  }
};
```

### Virtual Scrolling
```typescript
import { VirtualList } from '@hive/ui';

<VirtualList
  items={largeDataset}
  itemHeight={80}
  renderItem={(item) => <ItemCard {...item} />}
/>
```

## 🛡️ Security Patterns

### Server-side Auth Check
```typescript
// Always at the top of API routes
const session = await getServerSession();
if (!session?.user) {
  return new Response('Unauthorized', { status: 401 });
}
```

### Input Validation
```typescript
// Always validate before processing
const validation = schema.safeParse(body);
if (!validation.success) {
  return Response.json({ error: validation.error }, { status: 400 });
}
```

### Rate Limiting
```typescript
const rateLimiter = new Map();
const ip = req.headers.get('x-forwarded-for');
if (rateLimiter.get(ip) > 10) {
  return new Response('Too Many Requests', { status: 429 });
}
```