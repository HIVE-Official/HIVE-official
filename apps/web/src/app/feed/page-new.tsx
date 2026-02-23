'use client';

/**
 * Feed Page - Campus Discovery Stream
 *
 * HIVE's main feed aggregates promoted content from spaces across campus.
 * Feed is READ-ONLY - posts are created in spaces, then promoted here.
 *
 * Architecture:
 * - Uses @hive/ui FeedPageLayout template (139 lines)
 * - Replaces old 669-line custom implementation
 * - Integrates FeedVirtualizedList for 60fps scroll with 10,000+ posts
 * - Uses FeedCard organisms (post, event, tool, system variants)
 *
 * Performance Targets:
 * - < 1s cold load, < 500ms warm load
 * - 60fps scroll with virtualization
 * - < 16ms interaction latency (optimistic updates)
 */

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@hive/auth-logic';
import { useToast } from '@/hooks/use-toast';
import { useFeed, type Post, type Attachment } from '@/hooks/use-feed';
import { formatDistanceToNow } from 'date-fns';
import { secureApiFetch } from '@/lib/secure-auth-utils';

// Import new @hive/ui components
import {
  FeedPageLayout,
  FeedCardPost,
  FeedCardEvent,
  FeedCardTool,
  FeedCardSystem,
  RitualStrip,
  KeyboardShortcutsOverlay,
  AriaLiveRegion,
  type FeedItem,
  type FeedCardPostData,
  type FeedCardEventData,
  type FeedCardToolData,
  type FeedCardSystemData,
  Button,
} from '@hive/ui';

/**
 * Transform useFeed Post → FeedItem for FeedVirtualizedList
 */
function transformPostToFeedItem(post: Post): FeedItem {
  return {
    id: post.id,
    type: post.type === 'text' || post.type === 'image' || post.type === 'video' || post.type === 'link'
      ? 'post'
      : post.type === 'event'
      ? 'event'
      : post.type === 'tool'
      ? 'tool'
      : post.type === 'announcement'
      ? 'system'
      : 'post',
    data: post,
  };
}

/**
 * Transform useFeed Post → FeedCardPostData for FeedCardPost
 */
function transformPostToCardData(post: Post): FeedCardPostData {
  return {
    id: post.id,
    author: {
      id: post.author.id,
      name: post.author.name || 'Anonymous',
      avatarUrl: post.author.avatarUrl,
      role: post.author.badges?.[0],
      verified: post.author.isVerified,
    },
    space: post.spaceId
      ? {
          id: post.spaceId,
          name: post.spaceName || 'Space',
          color: 'var(--hive-brand-primary)', // TODO: Get from space data
        }
      : {
          id: 'campus',
          name: 'Campus',
          color: 'var(--hive-brand-primary)',
        },
    content: {
      headline: post.type === 'link' ? post.content.split('\n')[0] : undefined,
      body: post.content,
      media: post.attachments?.map((attachment: Attachment) => ({
        id: attachment.id,
        type: attachment.type,
        url: attachment.url,
        thumbnailUrl: attachment.thumbnailUrl,
        alt: attachment.alt,
      })),
      tags: post.tags,
    },
    stats: {
      upvotes: post.engagement.likes,
      comments: post.engagement.comments,
      isUpvoted: post.engagement.hasLiked,
      isBookmarked: post.engagement.hasBookmarked,
    },
    meta: {
      timeAgo: formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
      isPinned: post.isPinned,
      isEdited: post.isEdited,
    },
  };
}

export default function FeedPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  // Feed state
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'my_spaces' | 'events'>('all');
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [commentingPostId, setCommentingPostId] = React.useState<string | null>(null);
  const [commentText, setCommentText] = React.useState('');
  const [featuredRitual, setFeaturedRitual] = React.useState<{
    id: string;
    name: string;
    description: string;
    icon?: string;
    progress: number;
    participantCount: number;
    timeRemaining?: string;
    isParticipating: boolean;
  } | null>(null);

  // Accessibility state
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = React.useState(false);
  const [ariaAnnouncement, setAriaAnnouncement] = React.useState('');

  // Fetch feed data
  const {
    posts,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMore,
    refresh,
    likePost,
    bookmarkPost,
    commentOnPost,
    sharePost,
  } = useFeed({
    limit: 20,
    sortBy: 'recent',
    types: activeFilter === 'all' ? undefined : [activeFilter],
  });

  // Transform posts → feed items
  const feedItems = React.useMemo(
    () => posts.map(transformPostToFeedItem),
    [posts]
  );

  // Load a featured ritual for strip (active-only)
  React.useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await secureApiFetch('/api/rituals?activeOnly=true&format=raw');
        if (!res.ok) return;
        const payload = await res.json();
        const rituals = Array.isArray(payload?.data) ? payload.data : [];
        const r = rituals[0];
        if (r) {
          const ends = new Date(r.endsAt).getTime();
          const now = Date.now();
          const minutesLeft = Math.max(0, Math.round((ends - now) / (1000 * 60)));
          const hours = Math.floor(minutesLeft / 60);
          const minutes = minutesLeft % 60;
          const timeRemaining = minutesLeft <= 0 ? undefined : hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

          setFeaturedRitual({
            id: r.id,
            name: r.title || 'Campus Ritual',
            description: r.description || 'Join this campus ritual to participate together.',
            progress: Math.min(100, Math.max(0, Math.round(r.metrics?.completionRate ?? 0))),
            participantCount: r.metrics?.participants ?? 0,
            timeRemaining,
            isParticipating: Boolean(r.metrics?.participants && r.metrics.participants > 0),
          });
        }
      } catch {}
    };
    loadFeatured();
  }, []);

  // Global keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if typing in input/textarea or modifier keys are pressed
      const target = event.target as HTMLElement;
      const isTyping = ['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable;
      if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

      // ? - Toggle keyboard shortcuts overlay
      if (event.key === '?') {
        event.preventDefault();
        setShowKeyboardShortcuts((prev) => !prev);
        setAriaAnnouncement(showKeyboardShortcuts ? 'Keyboard shortcuts hidden' : 'Keyboard shortcuts shown');
        return;
      }

      // Don't handle other keys if shortcuts overlay is open
      if (showKeyboardShortcuts) return;

      // J - Next post
      if (event.key === 'j' || event.key === 'J') {
        event.preventDefault();
        setSelectedIndex((prev) => {
          const nextIndex = Math.min(prev + 1, posts.length - 1);
          const element = document.getElementById(`feed-item-${nextIndex}`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element?.focus();
          setAriaAnnouncement(`Navigated to post ${nextIndex + 1} of ${posts.length}`);
          return nextIndex;
        });
      }

      // K - Previous post
      if (event.key === 'k' || event.key === 'K') {
        event.preventDefault();
        setSelectedIndex((prev) => {
          const nextIndex = Math.max(prev - 1, 0);
          const element = document.getElementById(`feed-item-${nextIndex}`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element?.focus();
          setAriaAnnouncement(`Navigated to post ${nextIndex + 1} of ${posts.length}`);
          return nextIndex;
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [posts.length, showKeyboardShortcuts]);

  // Handle authentication
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--hive-background-primary)] p-6">
        <div className="max-w-md space-y-4 text-center">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            Sign in to view Feed
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Your campus discovery stream awaits.
          </p>
          <Button
            variant="brand"
            onClick={() => router.push('/auth/login')}
            className="mx-auto"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  // Interaction handlers
  const handleCardOpen = React.useCallback((postId: string) => {
    router.push(`/events/${postId}`);
  }, [router]);

  const handleSpaceClick = React.useCallback((spaceId: string) => {
    router.push(`/spaces/${spaceId}`);
  }, [router]);

  const handleUpvote = React.useCallback(async (postId: string) => {
    try {
      await likePost(postId);
      setAriaAnnouncement('Post upvoted');
    } catch (error) {
      toast({
        title: 'Failed to upvote',
        description: error instanceof Error ? error.message : 'Please try again',
        type: 'error',
      });
      setAriaAnnouncement('Failed to upvote post');
    }
  }, [likePost, toast]);

  const handleComment = React.useCallback(async (postId: string) => {
    setCommentingPostId(postId);
  }, []);

  const handleBookmark = React.useCallback(async (postId: string) => {
    try {
      await bookmarkPost(postId);
      toast({
        title: 'Bookmarked',
        description: 'Post saved to your bookmarks',
        type: 'success',
      });
      setAriaAnnouncement('Post bookmarked');
    } catch (error) {
      toast({
        title: 'Failed to bookmark',
        description: error instanceof Error ? error.message : 'Please try again',
        type: 'error',
      });
      setAriaAnnouncement('Failed to bookmark post');
    }
  }, [bookmarkPost, toast]);

  const handleShare = React.useCallback(async (postId: string) => {
    try {
      await sharePost(postId);
      toast({
        title: 'Shared',
        description: 'Post shared successfully',
        type: 'success',
      });
    } catch (error) {
      toast({
        title: 'Failed to share',
        description: error instanceof Error ? error.message : 'Please try again',
        type: 'error',
      });
    }
  }, [sharePost, toast]);

  const handleCompose = React.useCallback(() => {
    // Feed is READ-ONLY - redirect to spaces
    toast({
      title: 'Create in Spaces',
      description: 'Posts are created within spaces, then promoted to feed',
      type: 'info',
    });
    router.push('/spaces');
  }, [router, toast]);

  // Keyboard shortcuts: j/k navigate, l open, c compose, b bookmark
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'j') {
        setSelectedIndex((i) => Math.min(i + 1, feedItems.length - 1));
      } else if (e.key === 'k') {
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key.toLowerCase() === 'l') {
        const item = feedItems[selectedIndex];
        if (item) handleCardOpen((item.data as Post).id);
      } else if (e.key.toLowerCase() === 'c') {
        handleCompose();
      } else if (e.key.toLowerCase() === 'b') {
        const item = feedItems[selectedIndex];
        if (item) handleBookmark((item.data as Post).id);
      }
      // Scroll to selected
      const target = document.getElementById(`feed-item-${selectedIndex}`);
      if (target) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [feedItems, selectedIndex, handleCardOpen, handleCompose, handleBookmark]);

  // Mappers for Event/Tool/System cards
  const toSpace = (post: Post) => ({
    id: post.spaceId || 'campus',
    name: post.spaceName || 'Campus',
    color: 'var(--hive-brand-primary)',
  });

  const transformEvent = (post: Post): FeedCardEventData => {
    const start = post.event?.startTime ? new Date(post.event.startTime) : undefined;
    const end = post.event?.endTime ? new Date(post.event.endTime) : undefined;
    const now = new Date();
    let status: 'upcoming' | 'today' | 'sold_out' | 'past' = 'upcoming';
    if (end && end < now) status = 'past';
    else if (start && start.toDateString() === now.toDateString()) status = 'today';
    if (post.event?.isSoldOut) status = 'sold_out';
    return {
      id: post.id,
      title: post.event?.title || post.content.split('\n')[0] || 'Event',
      description: post.event?.description || post.content,
      space: toSpace(post),
      coverImage: post.attachments?.find((a: Attachment) => a.type === 'image')
        ? {
            id: post.attachments[0].id || post.id,
            type: 'image',
            url: post.attachments[0].url,
          }
        : undefined,
      meta: {
        scheduleLabel: start ? formatDistanceToNow(start, { addSuffix: true }) : 'Scheduled',
        locationLabel: post.location?.name || post.event?.location,
        status,
      },
      stats: {
        attendingCount: post.event?.attendingCount || 0,
        capacity: post.event?.capacity,
        isAttending: !!post.event?.isAttending,
      },
    };
  };

  const transformTool = (post: Post): FeedCardToolData => {
    return {
      id: post.id,
      title: post.tool?.name || post.content.split('\n')[0] || 'Tool',
      summary: post.tool?.summary,
      previewDescription: post.tool?.description,
      authorLabel: post.author?.name ? `By ${post.author.name}` : 'Tool',
      space: toSpace(post),
      meta: {
        featured: post.tool?.featured || false,
        categoryLabel: post.tool?.category,
        lastUpdatedLabel: post.tool?.updatedAt
          ? formatDistanceToNow(new Date(post.tool.updatedAt), { addSuffix: true })
          : undefined,
      },
      stats: {
        installs: post.tool?.installs,
        activeUsers: post.tool?.activeUsers,
        ratingLabel: post.tool?.ratingLabel,
      },
      tags: post.tool?.tags,
    };
  };

  const transformSystem = (post: Post): FeedCardSystemData => {
    const variant: 'ritual' | 'announcement' | 'urgent' =
      post.announcement?.variant || 'announcement';
    return {
      id: post.id,
      title: post.announcement?.title || 'Announcement',
      description: post.content,
      meta: {
        variant,
        timeAgo: formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
      },
      actionLabel: post.announcement?.actionLabel,
      isDismissible: true,
    };
  };

  // Render individual feed items
  const renderFeedItem = React.useCallback((item: FeedItem, _index: number) => {
    const post = item.data as Post;

    // Render based on card type
    switch (item.type) {
      case 'post': {
        const cardData = transformPostToCardData(post);
        return (
          <FeedCardPost
            post={cardData}
            onOpen={handleCardOpen}
            onSpaceClick={handleSpaceClick}
            onUpvote={handleUpvote}
            onComment={handleComment}
            onBookmark={handleBookmark}
            onShare={handleShare}
          />
        );
      }

      case 'event': {
        const eventData = transformEvent(post);
        return (
          <FeedCardEvent
            event={eventData}
            onViewDetails={() => handleCardOpen(post.id)}
            onToggleRsvp={() => toast({ title: 'RSVP updated', type: 'success' })}
            onSpaceClick={handleSpaceClick}
          />
        );
      }

      case 'tool': {
        const toolData = transformTool(post);
        return (
          <FeedCardTool
            tool={toolData}
            onOpenTool={() => handleCardOpen(post.id)}
            onPreview={() => handleCardOpen(post.id)}
            onSpaceClick={handleSpaceClick}
          />
        );
      }

      case 'system': {
        const card = transformSystem(post);
        return (
          <FeedCardSystem
            card={card}
            onAction={() => handleCardOpen(post.id)}
            onDismiss={() => {}}
          />
        );
      }

      default:
        return null;
    }
  }, [handleCardOpen, handleSpaceClick, handleUpvote, handleComment, handleBookmark, handleShare]);

  return (
    <>
      {/* Accessibility Components */}
      <KeyboardShortcutsOverlay
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
      <AriaLiveRegion
        message={ariaAnnouncement}
        onClear={() => setAriaAnnouncement('')}
      />

      {/* Featured Ritual Banner */}
      {featuredRitual && (
        <div className="mx-auto max-w-5xl px-4 pt-4">
          <RitualStrip
            ritual={featuredRitual}
            onJoin={async () => {
              // Optimistic update: Update UI immediately
              const previousRitual = featuredRitual;
              setFeaturedRitual((prev) =>
                prev ? { ...prev, isParticipating: true, participantCount: prev.participantCount + 1 } : prev
              );

              try {
                const res = await secureApiFetch('/api/rituals/join', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ritualId: featuredRitual.id }),
                });

                if (res.ok) {
                  toast({ title: 'Joined ritual', type: 'success' });
                  // State already updated optimistically
                } else {
                  throw new Error('Failed to join ritual');
                }
              } catch (error) {
                // Rollback on error
                setFeaturedRitual(previousRitual);
                toast({
                  title: 'Failed to join ritual',
                  description: error instanceof Error ? error.message : 'Please try again',
                  type: 'error'
                });
              }
            }}
            onViewDetails={() => router.push(`/rituals?focus=${featuredRitual.id}`)}
            showProgress
          />
        </div>
      )}
      <FeedPageLayout
        title="Campus Feed"
        showComposer={true}
        onCompose={handleCompose}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        feedItems={feedItems}
        renderFeedItem={(item, index) => (
          <div id={`feed-item-${index}`}>{renderFeedItem(item, index)}</div>
        )}
        onLoadMore={loadMore}
        hasMore={hasMore}
        isLoading={isLoadingMore}
        isInitialLoad={isLoading && posts.length === 0}
        error={error ? new Error(error) : null}
        onRetry={refresh}
      />
      {/* Comment Modal */}
      {commentingPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[var(--hive-background-secondary)] p-4">
            <h3 className="mb-2 text-lg font-semibold text-[var(--hive-text-primary)]">Add a comment</h3>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
              placeholder="Write something helpful..."
              className="w-full resize-none rounded-lg border border-white/10 bg-black/30 p-3 text-[var(--hive-text-primary)] outline-none"
            />
            <div className="mt-3 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => { setCommentingPostId(null); setCommentText(''); }}>Cancel</Button>
              <Button
                variant="brand"
                onClick={async () => {
                  try {
                    await commentOnPost(commentingPostId, commentText);
                    setCommentingPostId(null);
                    setCommentText('');
                    toast({ title: 'Comment added', type: 'success' });
                  } catch (e) {
                    toast({ title: 'Failed to comment', description: e instanceof Error ? e.message : 'Please try again', type: 'error' });
                  }
                }}
                disabled={!commentText.trim()}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
