# HIVE State Management Implementation Plan

## Current State Analysis
- **1,149 useState/useEffect calls** across 194 files
- **No global state management** - everything is local
- **Massive prop drilling** - data passed through 8+ component levels
- **No caching strategy** - data re-fetched on every mount
- **29 direct fetch calls** - inconsistent data fetching patterns

## Architecture Decision

### Technology Stack
```typescript
// Client State: Zustand
- User preferences, UI state, temporary data
- Simple API, TypeScript-first, 8kb bundle

// Server State: TanStack React Query
- API data, caching, synchronization
- Automatic background refetching
- Optimistic updates support

// Form State: React Hook Form (existing)
- Complex form handling
- Already implemented in onboarding
```

## Implementation Phases

### Phase 1: Foundation Setup (2-3 days)
**Goal:** Install infrastructure without breaking existing code

#### 1.1 Install Dependencies
```bash
pnpm add zustand @tanstack/react-query --filter @hive/hooks
pnpm add @tanstack/react-query-devtools --filter web -D
```

#### 1.2 Create Store Structure
```typescript
// packages/hooks/src/stores/index.ts
export { useHiveStore } from './hive-store';
export { useAuthStore } from './auth-store';
export { useUIStore } from './ui-store';

// packages/hooks/src/queries/index.ts
export * from './space-queries';
export * from './profile-queries';
export * from './tool-queries';
```

#### 1.3 Setup Providers
```typescript
// apps/web/src/app/providers.tsx
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
```

### Phase 2: Critical Path Migration (3-4 days)
**Goal:** Migrate highest-impact areas for immediate benefits

#### 2.1 Authentication State (Day 1)
```typescript
// Current: Props passed through 50+ components
// New: Global auth store accessible anywhere

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: async (email: string) => {
    // Magic link flow
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  updateProfile: (updates: Partial<User>) => {
    set((state) => ({ 
      user: { ...state.user, ...updates } 
    }));
  },
}));

// Usage: No more prop drilling!
function AnyComponent() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
}
```

#### 2.2 Space Management (Day 2)
```typescript
// Current: Data fetched on every component mount
// New: Cached and shared across components

export function useSpaces() {
  return useQuery({
    queryKey: ['spaces'],
    queryFn: fetchSpaces,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });
}

export function useJoinSpace() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: joinSpace,
    onMutate: async (spaceId) => {
      // Optimistic update - instant UI feedback
      await queryClient.cancelQueries(['spaces']);
      const previous = queryClient.getQueryData(['spaces']);
      
      queryClient.setQueryData(['spaces'], (old) =>
        old.map(s => s.id === spaceId 
          ? { ...s, isMember: true, memberCount: s.memberCount + 1 }
          : s
        )
      );
      
      return { previous };
    },
    onError: (err, spaceId, context) => {
      // Rollback on error
      queryClient.setQueryData(['spaces'], context.previous);
    },
  });
}
```

#### 2.3 Profile Data (Day 3)
```typescript
// Current: Profile data fetched 10+ times per session
// New: Fetched once, cached, updated optimistically

export function useProfile(userId?: string) {
  const currentUserId = useAuthStore((state) => state.user?.id);
  const id = userId || currentUserId;
  
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => fetchProfile(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);
  
  return useMutation({
    mutationFn: updateProfile,
    onMutate: async (updates) => {
      // Optimistic update
      await queryClient.cancelQueries(['profile', userId]);
      const previous = queryClient.getQueryData(['profile', userId]);
      
      queryClient.setQueryData(['profile', userId], (old) => ({
        ...old,
        ...updates,
      }));
      
      return { previous };
    },
    onSuccess: () => {
      // Also update auth store
      useAuthStore.getState().updateProfile(updates);
    },
  });
}
```

### Phase 3: Feature Enhancement (1 week)
**Goal:** Add capabilities not possible with current architecture

#### 3.1 Real-time Subscriptions
```typescript
// Connect Firebase listeners to React Query
export function useRealtimeSpace(spaceId: string) {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'spaces', spaceId),
      (doc) => {
        queryClient.setQueryData(['spaces', spaceId], doc.data());
      }
    );
    
    return unsubscribe;
  }, [spaceId]);
  
  return useQuery({
    queryKey: ['spaces', spaceId],
    queryFn: () => fetchSpace(spaceId),
  });
}
```

#### 3.2 Optimistic UI Everywhere
```typescript
// Tools deployment with instant feedback
export function useDeployTool() {
  return useMutation({
    mutationFn: deployTool,
    onMutate: async (tool) => {
      // Show tool as deployed immediately
      queryClient.setQueryData(['tools', tool.spaceId], (old) => [
        ...old,
        { ...tool, status: 'deploying' }
      ]);
    },
    onSuccess: (data, tool) => {
      // Update with real data
      queryClient.setQueryData(['tools', tool.spaceId], (old) =>
        old.map(t => t.id === tool.id ? data : t)
      );
    },
  });
}
```

#### 3.3 Offline Support
```typescript
// Queue actions when offline
const useOfflineQueue = create((set, get) => ({
  queue: [],
  
  addToQueue: (action) => {
    set((state) => ({
      queue: [...state.queue, action]
    }));
  },
  
  processQueue: async () => {
    const { queue } = get();
    for (const action of queue) {
      await action();
    }
    set({ queue: [] });
  },
}));

// Auto-sync when back online
window.addEventListener('online', () => {
  useOfflineQueue.getState().processQueue();
});
```

### Phase 4: Performance Optimization (3-4 days)
**Goal:** Make the app blazingly fast

#### 4.1 Prefetching Strategy
```typescript
// Prefetch on hover
function SpaceCard({ spaceId }) {
  const queryClient = useQueryClient();
  
  const prefetchSpace = () => {
    queryClient.prefetchQuery({
      queryKey: ['spaces', spaceId],
      queryFn: () => fetchSpaceDetails(spaceId),
    });
  };
  
  return (
    <div onMouseEnter={prefetchSpace}>
      {/* Space card content */}
    </div>
  );
}
```

#### 4.2 Suspense Integration
```typescript
// Parallel data loading with Suspense
function SpacePage({ spaceId }) {
  const space = useSuspenseQuery({
    queryKey: ['spaces', spaceId],
    queryFn: () => fetchSpace(spaceId),
  });
  
  const members = useSuspenseQuery({
    queryKey: ['members', spaceId],
    queryFn: () => fetchMembers(spaceId),
  });
  
  // Both load in parallel!
  return <SpaceView space={space} members={members} />;
}
```

## Migration Strategy

### Component Migration Order
1. **Week 1:** Auth components (50 files)
2. **Week 2:** Space components (40 files)  
3. **Week 3:** Profile components (30 files)
4. **Week 4:** Feed/Tools (remaining files)

### Testing Strategy
- Unit tests for stores
- Integration tests for queries
- E2E tests remain unchanged
- Gradual rollout with feature flags

## Expected Benefits

### Performance Improvements
- **90% reduction** in API calls (caching)
- **60% faster** page transitions (prefetching)
- **Instant** UI updates (optimistic updates)
- **50% smaller** bundle (code splitting)

### Developer Experience
- **No more prop drilling** - access state anywhere
- **Automatic error handling** - built into React Query
- **DevTools** - inspect state and queries
- **Type safety** - full TypeScript support

### User Experience
- **Instant interactions** - optimistic updates
- **Offline support** - queue actions
- **Real-time updates** - Firebase integration
- **Faster navigation** - prefetching

## Success Metrics
- [ ] 0 prop drilling instances
- [ ] <100ms state updates
- [ ] <500ms page transitions
- [ ] 90% cache hit rate
- [ ] 0 unnecessary re-renders

## Timeline
- **Week 1:** Foundation + Auth migration
- **Week 2:** Space + Profile migration
- **Week 3:** Feature enhancements
- **Week 4:** Performance optimization + cleanup

## Risk Mitigation
- **Gradual migration** - no big bang refactor
- **Feature flags** - rollback capability
- **Backward compatibility** - old code works during migration
- **Comprehensive testing** - each phase fully tested

---

*This plan transforms HIVE from a prop-drilling nightmare into a modern, performant application with proper state management.*