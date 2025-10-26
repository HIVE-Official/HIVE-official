// Bounded Context Owner: Spaces Domain Guild
/**
 * FeedList — Renders a list of posts (with optional pinned cluster) and an infinite loader sentinel.
 * - Accepts Post union and chooses the correct BoardCard variant.
 * - Shows optional PinnedCluster above the recent posts.
 * - Emits onLoadMore when the sentinel becomes visible (IntersectionObserver).
 * - Virtualization is optional and can be layered later.
 */
import * as React from "react";
import type { Post } from "./types";
import { BoardCardStandard } from "./board-card-standard";
import { BoardCardAnnouncement } from "./board-card-announcement";
import { BoardCardEvent } from "./board-card-event";
import { BoardCardPoll } from "./board-card-poll";
import { PinnedCluster } from "./pinned-cluster";
import { Skeleton } from "@/atoms/skeleton";

export interface FeedListProps {
  /** All posts in time order (pinned may also appear here) */
  posts: readonly Post[];
  /** Subset of pinned posts to render in the cluster (≤2 recommended) */
  pinned?: readonly Post[];
  /** When provided, cards will call this on surface open */
  onOpenPost?: (post: Post) => void;
  /** Called when the list approaches the end (sentinel visible) */
  onLoadMore?: () => void;
  /** Whether more items are being fetched */
  isLoadingMore?: boolean;
  /** Whether the end of list has been reached */
  isEnd?: boolean;
}

export const FeedList: React.FC<FeedListProps> = ({ posts, pinned, onOpenPost, onLoadMore, isLoadingMore = false, isEnd = false }) => {
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!onLoadMore || isLoadingMore || isEnd) return;
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        onLoadMore?.();
      }
    }, { rootMargin: "400px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [onLoadMore, isLoadingMore, isEnd]);

  const renderCard = (post: Post) => {
    switch (post.type) {
      case "standard":
        return <BoardCardStandard key={post.id} post={post} onOpen={onOpenPost ? () => onOpenPost(post) : undefined} />;
      case "announcement":
        return <BoardCardAnnouncement key={post.id} post={post} onOpen={onOpenPost ? () => onOpenPost(post) : undefined} />;
      case "event":
        return <BoardCardEvent key={post.id} post={post as any} onOpen={onOpenPost ? () => onOpenPost(post) : undefined} />;
      case "poll":
        return <BoardCardPoll key={post.id} post={post as any} onOpen={onOpenPost ? () => onOpenPost(post) : undefined} />;
      default:
        return <BoardCardStandard key={post.id} post={post as any} onOpen={onOpenPost ? () => onOpenPost(post) : undefined} />;
    }
  };

  // Derive pinned if not passed; filter out expired pins (pinnedUntil <= now)
  const now = new Date();
  const derivedPinned: readonly Post[] = pinned ?? posts.filter((p) => p.isPinned && (!('pinnedUntil' in p) || !(p as any).pinnedUntil || ((p as any).pinnedUntil as Date) > now)).slice(0, 2);
  const pinnedIds = new Set(derivedPinned.map((p) => p.id));
  const recent = posts.filter((p) => !pinnedIds.has(p.id));

  return (
    <div ref={containerRef} className="space-y-4" onKeyDown={(e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      const root = containerRef.current;
      if (!root) return;
      const cards = Array.from(root.querySelectorAll('[data-feed-card]')) as HTMLElement[];
      const idx = cards.findIndex((el) => el === document.activeElement);
      if (idx === -1) return;
      e.preventDefault();
      const nextIdx = e.key === 'ArrowDown' ? Math.min(cards.length - 1, idx + 1) : Math.max(0, idx - 1);
      cards[nextIdx]?.focus();
    }}>
      {derivedPinned.length > 0 && (
        <PinnedCluster totalPostsCount={posts.length}>{derivedPinned.map(renderCard)}</PinnedCluster>
      )}

      {recent.map(renderCard)}

      {/* Infinite loader sentinel */}
      <div ref={sentinelRef} aria-hidden className="h-12 flex items-center justify-center">
        {isLoadingMore && (
          <div className="w-full space-y-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-[92%]" />
          </div>
        )}
        {isEnd && <div className="text-center text-muted-foreground text-caption">You’re all caught up</div>}
      </div>
    </div>
  );
};
