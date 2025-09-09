# HIVE Development Patterns

*Operational patterns and best practices for HIVE development*

## 🔥 Firebase Patterns

### Real-time Listener Pattern
```typescript
// ✅ CORRECT: Cleanup and error handling
useEffect(() => {
  let unsubscribe: (() => void) | undefined;
  
  const setupListener = async () => {
    try {
      const q = query(
        collection(db, 'spaces', spaceId, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      
      unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setPosts(posts);
          setError(null);
        },
        (error) => {
          console.error('Firestore listener error:', error);
          setError('Failed to load posts');
        }
      );
    } catch (error) {
      setError('Failed to setup listener');
    }
  };
  
  setupListener();
  
  return () => {
    if (unsubscribe) unsubscribe();
  };
}, [spaceId]);
```

### Offline Handling Pattern
```typescript
// Enable offline persistence
enableNetwork(db).catch(() => {
  // Already offline
});

// Check connection status
const handleConnectionChange = () => {
  if (!navigator.onLine) {
    showToast('You are offline. Changes will sync when reconnected.');
  }
};

window.addEventListener('online', handleConnectionChange);
window.addEventListener('offline', handleConnectionChange);
```

### Transaction Pattern
```typescript
// Atomic operations across collections
const joinSpace = async (userId: string, spaceId: string) => {
  try {
    await runTransaction(db, async (transaction) => {
      // Read operations first
      const spaceRef = doc(db, 'spaces', spaceId);
      const spaceDoc = await transaction.get(spaceRef);
      
      if (!spaceDoc.exists()) {
        throw new Error('Space not found');
      }
      
      const memberCount = spaceDoc.data().memberCount || 0;
      
      // Write operations
      const memberRef = doc(db, 'spaces', spaceId, 'members', userId);
      transaction.set(memberRef, {
        userId,
        joinedAt: serverTimestamp(),
        role: 'member'
      });
      
      transaction.update(spaceRef, {
        memberCount: memberCount + 1
      });
    });
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
};
```

### Query Optimization Pattern
```typescript
// Use composite indexes and pagination
const loadPosts = async (lastVisible?: DocumentSnapshot) => {
  let q = query(
    collection(db, 'spaces', spaceId, 'posts'),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(20)
  );
  
  if (lastVisible) {
    q = query(q, startAfter(lastVisible));
  }
  
  const snapshot = await getDocs(q);
  return {
    posts: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    lastVisible: snapshot.docs[snapshot.docs.length - 1]
  };
};
```

## 🎨 UI/UX Patterns

### Loading State Pattern
```typescript
// Consistent loading states across platform
const SpaceSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-48 bg-white/5 rounded-xl" />
    <div className="h-4 bg-white/5 rounded w-3/4" />
    <div className="h-4 bg-white/5 rounded w-1/2" />
  </div>
);

// Usage
if (isLoading) return <SpaceSkeleton />;
if (error) return <ErrorBoundary error={error} />;
return <SpaceContent data={data} />;
```

### Error Boundary Pattern
```typescript
class SpaceErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to error reporting service
    console.error('Space error boundary:', error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

### Form Validation Pattern
```typescript
// Consistent validation with Zod
const SpaceCreationSchema = z.object({
  name: z.string()
    .min(3, 'Space name must be at least 3 characters')
    .max(50, 'Space name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Only letters, numbers, spaces, and hyphens'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  type: z.enum(['academic', 'social', 'residential', 'organization']),
  privacy: z.enum(['public', 'private', 'invite-only'])
});

// Usage with React Hook Form
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(SpaceCreationSchema)
});
```

## 📱 Mobile-First Patterns

### Touch Interaction Pattern
```typescript
// Swipeable cards with gesture handling
const SwipeableCard = ({ onSwipe, children }: Props) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) onSwipe('left');
    if (isRightSwipe) onSwipe('right');
  };
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="min-h-[44px] touch-pan-x select-none"
    >
      {children}
    </div>
  );
};
```

### Responsive Image Pattern
```typescript
// Optimized image loading for mobile
const ResponsiveImage = ({ src, alt }: Props) => (
  <picture>
    <source 
      media="(max-width: 640px)" 
      srcSet={`${src}?w=640&q=75`}
    />
    <source 
      media="(max-width: 1024px)" 
      srcSet={`${src}?w=1024&q=80`}
    />
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      loading="lazy"
      placeholder="blur"
      blurDataURL={shimmer}
    />
  </picture>
);
```

## 🔄 State Management Patterns

### When to Use What
```typescript
// Local State - UI-only state
const [isOpen, setIsOpen] = useState(false);

// React Query - Server state
const { data: spaces } = useQuery({
  queryKey: ['spaces'],
  queryFn: fetchSpaces,
  staleTime: 5 * 60 * 1000 // 5 minutes
});

// Zustand - Global client state
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}));

// Context - Component tree state
const ThemeContext = createContext<Theme>('dark');
```

## 🚀 Performance Patterns

### Code Splitting Pattern
```typescript
// Dynamic imports for large components
const HiveLab = dynamic(() => import('@/components/HiveLab'), {
  loading: () => <HiveLabSkeleton />,
  ssr: false
});

// Route-based splitting
const SpaceDetailPage = lazy(() => import('./pages/SpaceDetail'));
```

### Image Optimization Pattern
```typescript
// Next.js Image with optimization
<Image
  src={avatarUrl}
  alt={userName}
  width={40}
  height={40}
  className="rounded-full"
  priority={isAboveFold}
  quality={85}
  placeholder="blur"
  blurDataURL={AVATAR_BLUR_DATA_URL}
/>
```

### Memo Pattern
```typescript
// Expensive computations
const expensiveValue = useMemo(() => {
  return calculateComplexValue(data);
}, [data]);

// Component memoization
const PostCard = memo(({ post }: Props) => {
  return <div>{post.content}</div>;
}, (prevProps, nextProps) => {
  return prevProps.post.id === nextProps.post.id;
});
```

## 🔒 Security Patterns

### Input Sanitization
```typescript
// Sanitize user input
import DOMPurify from 'isomorphic-dompurify';

const sanitizeInput = (input: string) => {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  });
};
```

### API Authentication Pattern
```typescript
// Consistent auth checking in API routes
export async function POST(req: Request) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Validate input
  const body = await req.json();
  const validation = SpaceCreationSchema.safeParse(body);
  if (!validation.success) {
    return Response.json({ 
      error: validation.error.flatten() 
    }, { status: 400 });
  }
  
  // Process request
  try {
    const result = await createSpace(session.user.id, validation.data);
    return Response.json(result);
  } catch (error) {
    console.error('Space creation error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
```

## 🧪 Testing Patterns

### Component Testing
```typescript
// Consistent component tests
describe('SpaceCard', () => {
  it('renders space information', () => {
    const space = mockSpace();
    render(<SpaceCard space={space} />);
    
    expect(screen.getByText(space.name)).toBeInTheDocument();
    expect(screen.getByText(space.memberCount)).toBeInTheDocument();
  });
  
  it('handles join action', async () => {
    const onJoin = jest.fn();
    render(<SpaceCard space={mockSpace()} onJoin={onJoin} />);
    
    await userEvent.click(screen.getByRole('button', { name: /join/i }));
    
    expect(onJoin).toHaveBeenCalledWith(space.id);
  });
});
```

### E2E Testing
```typescript
// User flow testing
test('user can create and join space', async ({ page }) => {
  // Login
  await page.goto('/auth/login');
  await page.fill('[name="email"]', 'test@buffalo.edu');
  await page.click('button:has-text("Send Magic Link")');
  
  // Create space
  await page.goto('/spaces/create');
  await page.fill('[name="name"]', 'Test Study Group');
  await page.fill('[name="description"]', 'CS 220 study group');
  await page.click('button:has-text("Create Space")');
  
  // Verify creation
  await expect(page).toHaveURL(/\/spaces\/[a-z0-9-]+/);
  await expect(page.locator('h1')).toContainText('Test Study Group');
});
```

---

*These patterns ensure consistent, performant, and maintainable code across the HIVE platform.*