"use client";
// Bounded Context Owner: Spaces Domain Guild
/**
 * CommentsSheet - Thread/replies view for a post
 *
 * Spec: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md §2.4
 * - Sheet showing replies list
 * - Pagination ("Show 5 more")
 * - Mentions support
 * - Empty state
 * - Error/retry state
 */

import React, { useState } from "react";
import { cn } from "../../utils/cn";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../molecules/sheet";
import { Button } from "../../atoms/button";
import { Textarea } from "../../atoms/textarea";
import { Avatar } from "../../atoms/avatar";
import { Badge } from "../../atoms/badge";
import { MessageCircle, Send, AlertCircle, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  authorRole?: "member" | "moderator" | "leader";
  content: string;
  createdAt: Date;
  reactionCount?: number;
}

export interface CommentsSheetProps {
  /** Is sheet open */
  open: boolean;

  /** Close handler */
  onOpenChange: (open: boolean) => void;

  /** Post ID */
  postId: string;

  /** Post author name (for context) */
  postAuthorName?: string;

  /** Comments list */
  comments: Comment[];

  /** Total comment count */
  totalCount: number;

  /** Has more comments to load */
  hasMore?: boolean;

  /** Loading state */
  isLoading?: boolean;

  /** Error state */
  error?: string;

  /** Load more handler */
  onLoadMore?: () => void;

  /** Submit comment handler */
  onSubmitComment?: (content: string) => void;

  /** Retry handler (on error) */
  onRetry?: () => void;

  /** Custom class */
  className?: string;

  /** Visual density */
  density?: "comfortable" | "compact";
}

export const CommentsSheet = React.forwardRef<
  HTMLDivElement,
  CommentsSheetProps
>(
  (
    {
      open,
      onOpenChange,
      postId: _postId,
      postAuthorName,
      comments,
      totalCount,
      hasMore = false,
      isLoading = false,
      error,
      onLoadMore,
      onSubmitComment,
      onRetry,
      className,
      density = "compact",
    },
    ref
  ) => {
    const [commentText, setCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
      if (commentText.trim().length === 0) return;
      setIsSubmitting(true);
      await onSubmitComment?.(commentText);
      setCommentText("");
      setIsSubmitting(false);
    };

    const getRoleBadge = (role?: string) => {
      switch (role) {
        case "leader":
          return (
            <Badge variant="gold" className="text-[10px] px-1.5 py-0">
              Leader
            </Badge>
          );
        case "moderator":
          return (
            <Badge variant="warning" className="text-[10px] px-1.5 py-0">
              Mod
            </Badge>
          );
        default:
          return null;
      }
    };

    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          ref={ref}
          side="bottom"
          className={cn(
            "h-[85vh] flex flex-col rounded-t-2xl",
            density === "compact" ? "" : "",
            className
          )}
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Comments</span>
              {totalCount > 0 && (
                <Badge variant="outline" className="text-xs">
                  {totalCount}
                </Badge>
              )}
            </SheetTitle>
            {postAuthorName && (
              <SheetDescription>On {postAuthorName}'s post</SheetDescription>
            )}
          </SheetHeader>

          <div className={cn(
            "flex-1 overflow-y-auto",
            density === "compact" ? "px-4 py-3 space-y-3" : "px-6 py-4 space-y-4"
          )}>
            {/* Error state */}
            {error && (
              <div className="flex flex-col items-center justify-center py-8 gap-3">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <p className="text-body text-muted-foreground text-center">
                  {error}
                </p>
                {onRetry && (
                  <Button variant="outline" size="sm" onClick={onRetry}>
                    Retry
                  </Button>
                )}
              </div>
            )}

            {/* Loading state */}
            {isLoading && comments.length === 0 && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && comments.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 gap-2">
                <MessageCircle className="h-12 w-12 text-muted-foreground/30" />
                <p className="text-body text-muted-foreground">
                  No replies yet—be first.
                </p>
              </div>
            )}

            {/* Comments list */}
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar
                  src={comment.authorAvatar}
                  alt={comment.authorName}
                  fallback={comment.authorName.charAt(0)}
                  className="h-8 w-8 flex-none"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-body-sm font-semibold text-foreground">
                      {comment.authorName}
                    </span>
                    <span className="text-caption text-muted-foreground">
                      @{comment.authorHandle}
                    </span>
                    {getRoleBadge(comment.authorRole)}
                    <span className="text-caption text-muted-foreground">
                      ·{" "}
                      {formatDistanceToNow(comment.createdAt, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-body text-foreground whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                  {comment.reactionCount && comment.reactionCount > 0 && (
                    <button className="text-caption text-muted-foreground hover:text-primary mt-1">
                      ❤️ {comment.reactionCount}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Load more */}
            {hasMore && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Show 5 more"
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Composer (fixed bottom) */}
          <div className={cn(
            "flex-none border-t border-border bg-background",
            density === "compact" ? "px-4 py-3" : "px-6 py-4"
          )}>
            <div className="flex items-end gap-3">
              <Textarea
                placeholder="Add a reply…"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleSubmit();
                  }
                }}
                className={cn(
                  "max-h-[120px] resize-none rounded-xl border bg-muted/50 text-body",
                  density === "compact" ? "min-h-[40px] px-3 py-2" : "min-h-[44px] px-4 py-2"
                )}
                rows={1}
                disabled={isSubmitting}
              />
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={isSubmitting || commentText.trim().length === 0}
                className="h-10 w-10"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-caption text-muted-foreground mt-2">
              Cmd/Ctrl+Enter to send · @ to mention
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
);

CommentsSheet.displayName = "CommentsSheet";



