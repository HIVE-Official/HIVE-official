# Example: Adding Loading States to Feed Page

**Goal**: Replace blank screen with skeleton while feed loads
**Time**: 30 minutes
**Impact**: High (first thing users see)

---

## Before (Current Code)

The feed page likely shows a blank screen while loading:

```tsx
// apps/web/src/app/feed/page.tsx
export default function FeedPage() {
  const { posts, loading, error } = useFeed();

  if (loading) return null; // ❌ Blank screen

  if (error) return <div>Error loading feed</div>; // ❌ Not helpful

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <FeedPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

**Problems**:
1. Blank screen while loading (looks broken)
2. Generic error message (no recovery)
3. No empty state (for new users)

---

## After (Polished Code)

```tsx
// apps/web/src/app/feed/page.tsx
import { Skeleton } from '@hive/ui';
import { AlertCircle, Users } from 'lucide-react';

export default function FeedPage() {
  const { posts, loading, error, refetch } = useFeed();

  // Loading state - show skeleton
  if (loading) {
    return <FeedSkeleton />;
  }

  // Error state - show message with retry
  if (error) {
    return (
      <ErrorState
        title="Failed to load feed"
        message="We couldn't load your feed. Check your connection and try again."
        retry={refetch}
      />
    );
  }

  // Empty state - for new users
  if (posts.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Welcome to HIVE!"
        description="Your feed will show posts from spaces you join. Browse spaces to get started."
        action={
          <Button onClick={() => router.push('/spaces/browse')}>
            Browse Spaces
          </Button>
        }
      />
    );
  }

  // Success state - show posts
  return (
    <div className="space-y-4 p-4">
      {posts.map((post, index) => (
        <FeedPostCard
          key={post.id}
          post={post}
          index={index} // For stagger animation
        />
      ))}
    </div>
  );
}

// Skeleton component - matches real content structure
function FeedSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-4 space-y-3">
          {/* Header - user info */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Content - text */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Actions - upvote, comment */}
          <div className="flex gap-4 pt-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Error state component - reusable
function ErrorState({ title, message, retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        {message}
      </p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}

// Empty state component - reusable
function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
      {Icon && <Icon className="h-12 w-12 text-muted-foreground mb-4" />}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        {description}
      </p>
      {action}
    </div>
  );
}
```

---

## Component Variants (Reusable)

Move these to `@hive/ui` so they can be used everywhere:

```tsx
// packages/ui/src/atomic/molecules/feed-skeleton.tsx
export function FeedSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-4 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

```tsx
// packages/ui/src/atomic/molecules/error-state.tsx
import { AlertCircle } from 'lucide-react';
import { Button } from '../atoms/button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
  variant?: 'inline' | 'section' | 'page';
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  retry,
  variant = 'section'
}: ErrorStateProps) {
  const containerClass = {
    inline: 'p-2',
    section: 'p-8 min-h-[200px]',
    page: 'p-12 min-h-[400px]'
  }[variant];

  return (
    <div className={`flex flex-col items-center justify-center text-center ${containerClass}`}>
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        {message}
      </p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}
```

```tsx
// packages/ui/src/atomic/molecules/empty-state.tsx
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
      {Icon && <Icon className="h-12 w-12 text-muted-foreground mb-4" />}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        {description}
      </p>
      {action}
    </div>
  );
}
```

---

## Testing Checklist

After implementing:

1. **Loading State**
   - [ ] Open feed → See skeleton immediately (not blank screen)
   - [ ] Skeleton matches real content structure (avatar, text, buttons)
   - [ ] Skeleton disappears when posts load

2. **Error State**
   - [ ] Turn on airplane mode → See error with retry button
   - [ ] Click retry → Attempts to reload
   - [ ] Error message is helpful (not "Error 500")

3. **Empty State**
   - [ ] Create new account → See empty state (not blank)
   - [ ] Empty state has CTA ("Browse Spaces")
   - [ ] CTA navigates to correct page

4. **Success State**
   - [ ] Feed loads with posts
   - [ ] No flicker/jump when loading completes
   - [ ] Scroll is smooth (60fps)

---

## Performance Check

```bash
# Measure time to interactive
1. Open DevTools → Performance tab
2. Start recording
3. Refresh feed page
4. Stop when you see posts
5. Check "Time to Interactive" metric

Target: < 1s on 3G network
```

---

## Next Steps

Once feed loading state is done, apply the same pattern to:

1. **Space Detail** ([apps/web/src/app/spaces/[spaceId]/page.tsx](apps/web/src/app/spaces/[spaceId]/page.tsx))
2. **Profile Page** ([apps/web/src/app/profile/[id]/ProfilePageContent.tsx](apps/web/src/app/profile/[id]/ProfilePageContent.tsx))
3. **HiveLab** ([apps/web/src/app/hivelab/page.tsx](apps/web/src/app/hivelab/page.tsx))
4. **Spaces Browse** ([apps/web/src/app/spaces/browse/page.tsx](apps/web/src/app/spaces/browse/page.tsx))

**Estimated time**: 2 hours per page (8 hours total for Week 2)

---

## Common Mistakes to Avoid

❌ **Don't**: Use a single generic "Loading..." spinner
✅ **Do**: Show skeleton that matches content structure

❌ **Don't**: Show blank error messages ("Error")
✅ **Do**: Explain what happened and offer recovery

❌ **Don't**: Leave empty states blank
✅ **Do**: Guide users with helpful CTAs

❌ **Don't**: Make skeleton too complex (slows render)
✅ **Do**: Keep it simple (boxes and circles)

---

**You're ready!** Start with this feed example and you'll quickly see the difference polish makes. 🚀
