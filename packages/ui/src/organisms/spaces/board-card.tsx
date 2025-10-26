// Bounded Context Owner: Spaces Domain Guild
/**
 * FeedCard - Base card component for all feed posts
 *
 * Provides consistent layout and behavior for all post types:
 * - Standard posts (text/media/links)
 * - Event posts (RSVP/check-in)
 * - Poll posts (voting)
 * - Form posts (submissions)
 * - Announcements (acknowledgment)
 * - Tracker posts (counters)
 * - Check-in posts
 * - Digest posts (bundled)
 *
 * Card anatomy:
 * 1. Top bar: author info, timestamp, visibility
 * 2. Body: type-specific content (delegated to variants)
 * 3. Action bar: inline actions (comment/react), overflow menu
 * 4. Pin indicator (if pinned)
 */

import React from "react";
import { Avatar } from "../../atoms/avatar";
import { Badge } from "../../atoms/badge";
import { Button } from "../../atoms/button";
import { cn } from "../../utils/cn";
import type { Post, MemberRole } from "./types";
import {
  Pin,
  Globe,
  Lock,
  MessageCircle,
  Heart,
  MoreHorizontal,
  AlertCircle,
  Link as LinkIcon,
  Bookmark,
  EyeOff,
  Flag,
  Edit2,
  Copy,
  Trash2,
  Share2,
  Unlock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../atoms/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../../molecules/dropdown-menu";
import { PinTimer } from "./pinned-cluster";

export interface FeedCardProps {
  /** Post data */
  post: Post;

  /** Whether current user is a leader/mod (shows additional actions) */
  isLeaderOrMod?: boolean;

  /** Card content - delegated to variant components */
  children: React.ReactNode;

  /** Comment click handler */
  onComment?: () => void;

  /** React/like click handler */
  onReact?: () => void;

  /** Overflow menu click handler */
  onOverflow?: () => void;

  /** Pin/unpin click handler (leaders only) */
  onPin?: () => void;

  /** Whether current user authored this post */
  isAuthor?: boolean;

  /** Overflow actions */
  onCopyLink?: () => void;
  onCopyText?: () => void;
  onBookmark?: () => void;
  onMarkUnread?: () => void;
  onHide?: () => void;
  onReport?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShareToCampus?: () => void;
  onLockComments?: () => void;
  onMoveToModeration?: () => void;
  onUnhide?: () => void;

  /** Policy toggles for menu */
  allowPublicPosts?: boolean;
  commentsLocked?: boolean;

  /** Show kebab overflow button in header (hidden in PostDetail) */
  showOverflow?: boolean;

  /** Convert this post into another type (leaders only) */
  onConvertTo?: (type: "event" | "poll" | "form") => void;

  /** Called when the card surface is activated (click/Enter/Space) */
  onOpen?: () => void;

  /** If true, the card renders as an interactive surface with focus/hover */
  interactive?: boolean;

  /** Show author header row (avatar/name/handle/visibility) */
  showAuthor?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Role badge styling
 */
const ROLE_BADGE_CONFIG: Record<
  MemberRole,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
    show: boolean;
  }
> = {
  leader: { label: "Leader", variant: "outline", show: false },
  moderator: { label: "Mod", variant: "outline", show: true },
  member: { label: "Member", variant: "outline", show: false },
  follower: { label: "Follower", variant: "outline", show: false },
};

export const FeedCard = React.forwardRef<HTMLDivElement, FeedCardProps>(
  (
    {
      post,
      isLeaderOrMod = false,
      children,
      onComment,
      onReact,
      onOverflow,
      onPin,
      isAuthor = false,
      onCopyLink,
      onCopyText,
      onBookmark,
      onMarkUnread,
      onHide,
      onReport,
      onEdit,
      onDelete,
      onShareToCampus,
      onLockComments,
      onMoveToModeration,
      onUnhide,
      allowPublicPosts = false,
      commentsLocked = false,
      showOverflow = true,
      onConvertTo,
      onOpen,
      interactive = true,
      showAuthor = true,
      className,
    },
    ref
  ) => {
    const roleConfig = ROLE_BADGE_CONFIG[post.authorRole];
    const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
      addSuffix: true,
    });
    const authorId = React.useId();
    const timeId = React.useId();

    const isFromInteractive = (target: EventTarget | null, root: HTMLElement): boolean => {
      if (!(target instanceof Element)) return false;
      const el = target as Element;
      const nearest = el.closest("button, a, input, textarea, select, [role='button']");
      return !!nearest && nearest !== root && root.contains(nearest);
    };

    const handleSurfaceClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
      if (!onOpen) return;
      if (e.defaultPrevented) return;
      const root = e.currentTarget;
      if (isFromInteractive(e.target, root)) return;
      onOpen();
    };

    const handleSurfaceKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (!onOpen) return;
      if (e.defaultPrevented) return;
      const root = e.currentTarget;
      if (isFromInteractive(e.target, root)) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg border border-border/25 bg-card transition-colors",
          interactive && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          interactive && "hover:border-primary/15",
          post.isHidden && "opacity-70",
          className
        )}
        role={interactive && onOpen ? "button" : undefined}
        tabIndex={interactive && onOpen ? 0 : undefined}
        aria-label={interactive && onOpen ? `Open post by ${post.authorName}` : undefined}
        aria-describedby={interactive && onOpen ? `${authorId} ${timeId}` : undefined}
        onClick={handleSurfaceClick}
        onKeyDown={handleSurfaceKeyDown}
        data-feed-card
      >
        {/* Pinned rail removed per design direction */}
        <div className="p-3 space-y-2.5">
          {/* Top bar: Author info */}
          {showAuthor && (
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Avatar
                src={post.authorAvatar}
                alt={post.authorName}
                fallback={post.authorName[0]?.toUpperCase()}
                className="h-9 w-9 rounded-full border border-border/20"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <span id={authorId} className="font-semibold text-foreground truncate">
                    {post.authorName}
                  </span>
                  <span className="text-muted-foreground truncate">
                    @{post.authorHandle}
                  </span>
                  {roleConfig.show && (
                    <Badge variant={roleConfig.variant} className="text-[10px] uppercase tracking-wider">
                      {roleConfig.label}
                    </Badge>
                  )}
                  {post.toolContext?.toolSlug && (
                    <Badge variant="outline" className="text-[10px]">Via tool • {post.toolContext.toolSlug}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-caption text-muted-foreground">
                  <span id={timeId}>{timeAgo}</span>
                  <span>·</span>
                  {post.visibility === "public" ? (
                    <span className="inline-flex items-center gap-1">
                      <Globe className="h-3 w-3" /> Public
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Members
                    </span>
                  )}
                  {post.isPinned && (
                    <span className="inline-flex items-center gap-1 text-primary">
                      <Pin className="h-3 w-3" /> Pinned
                      {("pinnedUntil" in post && (post as any).pinnedUntil) ? (
                        <>
                          <span>·</span>
                          <PinTimer className="ml-0.5" compact ariaLive expiresAt={(post as any).pinnedUntil as Date} />
                        </>
                      ) : null}
                    </span>
                  )}
                  {commentsLocked && (
                    <span className="inline-flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Comments locked
                    </span>
                  )}
                </div>
              </div>
            </div>
            {showOverflow && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  onClick={onOverflow}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 md:h-8 md:w-8 text-muted-foreground hover:text-foreground"
                  aria-label="More options"
                  aria-haspopup="menu"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={4} className="min-w-44">
                <DropdownMenuLabel>Post</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/spaces/${post.spaceId}/posts/${post.id}`;
                    try {
                      (navigator as any)?.clipboard?.writeText?.(url);
                    } catch (error) {
                      console.warn("spaces.board_card.copy_link_failed", error);
                    }
                    onCopyLink?.();
                  }}
                >
                  <LinkIcon className="h-4 w-4 mr-2" /> Copy link
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const text = (post as any).content || (post as any).title || "";
                    if (text) {
                      try {
                        (navigator as any)?.clipboard?.writeText?.(text);
                      } catch (error) {
                        console.warn("spaces.board_card.copy_text_failed", error);
                      }
                    }
                    onCopyText?.();
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy text
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBookmark?.()}>
                  <Bookmark className="h-4 w-4 mr-2" /> Save
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMarkUnread?.()}>
                  <EyeOff className="h-4 w-4 mr-2" /> Mark unread here
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onHide?.()}>
                  <EyeOff className="h-4 w-4 mr-2" /> Hide for me
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onReport?.()}>
                  <Flag className="h-4 w-4 mr-2" /> Report
                </DropdownMenuItem>

                {(isAuthor || isLeaderOrMod) && <DropdownMenuSeparator />}

                {isAuthor && (
                  <>
                    <DropdownMenuLabel>Author</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEdit?.()}>
                      <Edit2 className="h-4 w-4 mr-2" /> Edit post
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete?.()}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete…
                    </DropdownMenuItem>
                  </>
                )}

                {isLeaderOrMod && (
                  <>
                    <DropdownMenuLabel>Moderation</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onPin?.()}>
                      <Pin className="h-4 w-4 mr-2" /> {post.isPinned ? "Unpin" : "Pin"}
                    </DropdownMenuItem>
                    {allowPublicPosts && (
                      <DropdownMenuItem onClick={() => onShareToCampus?.()}>
                        <Share2 className="h-4 w-4 mr-2" /> Share to campus
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onLockComments?.()}>
                      {commentsLocked ? (
                        <Unlock className="h-4 w-4 mr-2" />
                      ) : (
                        <Lock className="h-4 w-4 mr-2" />
                      )}
                      {commentsLocked ? "Unlock comments" : "Lock comments"}
                    </DropdownMenuItem>
                    {post.isHidden ? (
                      <DropdownMenuItem onClick={() => onUnhide?.()}>
                        <EyeOff className="h-4 w-4 mr-2" /> Unhide (restore)
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onMoveToModeration?.()}>
                        <Flag className="h-4 w-4 mr-2" /> Move to moderation queue
                      </DropdownMenuItem>
                    )}
                    {onConvertTo && (
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <span className="inline-flex items-center gap-2">
                            <Copy className="h-4 w-4 rotate-90 opacity-60" /> Convert to…
                          </span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => onConvertTo("event")}>Event</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onConvertTo("poll")}>Poll</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onConvertTo("form")}>Form</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    )}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            )}
          </div>
          )}

          {/* Hidden post notice */}
          {post.isHidden && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
              <p className="text-body-sm font-body-sm text-destructive">
                This post has been hidden due to reports and is pending
                moderation.
              </p>
            </div>
          )}

          {/* Body: Type-specific content (delegated to children) */}
          {!post.isHidden && <div className="space-y-2.5">{children}</div>}

          {/* Action bar */}
          {!post.isHidden && (
            <div className="flex items-center justify-between pt-2 border-t border-border/20 text-caption text-muted-foreground">
              <div className="flex items-center gap-2">
                {commentsLocked ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <button
                          type="button"
                          className={cn("inline-flex items-center gap-1 rounded-md px-2 py-1",
                            "opacity-60 cursor-not-allowed")}
                          disabled
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>Comments locked</span>
                        </button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Leaders locked comments</TooltipContent>
                  </Tooltip>
                ) : (
                  <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onComment?.();
                      }}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted/60"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>{post.commentCount > 0 ? `${post.commentCount} Comments` : "Comment"}</span>
                    </button>
                )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReact?.();
                    }}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted/60"
                  >
                    <Heart className="h-3.5 w-3.5" />
                    <span>{post.reactionCount > 0 ? post.reactionCount : "React"}</span>
                  </button>
                </div>

                {isLeaderOrMod && onPin && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPin();
                    }}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted/60"
                  >
                    <Pin className="h-3.5 w-3.5" />
                    <span>{post.isPinned ? "Unpin" : "Pin"}</span>
                  </button>
                )}
              </div>
            )}
        </div>
      </div>
    );
  }
);

FeedCard.displayName = "FeedCard";

// Export both names for backwards compatibility during transition
export const BoardCard = FeedCard;
export type BoardCardProps = FeedCardProps;
