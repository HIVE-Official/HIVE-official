// Bounded Context Owner: Spaces Domain Guild
/**
 * BoardCardStandard - Standard text/media/link post card
 *
 * Displays:
 * - Text content with formatting
 * - Media attachments (images/videos)
 * - Link previews
 */

import React from "react";
import { BoardCard, type BoardCardProps } from "./board-card";
import type { StandardPost } from "./types";
import { ExternalLink } from "lucide-react";
import { cn } from "../../utils/cn";

export interface BoardCardStandardProps
  extends Omit<BoardCardProps, "post" | "children"> {
  /** Standard post data */
  post: StandardPost;
}

export const BoardCardStandard = React.forwardRef<
  HTMLDivElement,
  BoardCardStandardProps
>(({ post, ...boardCardProps }, ref) => {
  const [expanded, setExpanded] = React.useState(false);
  const shouldClamp = post.content && post.content.length > 280;
  return (
    <BoardCard ref={ref} post={post} {...boardCardProps}>
      {/* Content */}
      {post.content && (
        <div className={cn("text-body font-body whitespace-pre-wrap", !expanded && shouldClamp && "line-clamp-6")}
             id={`post-content-${post.id}`}>
          {post.content}
        </div>
      )}
      {shouldClamp && !expanded && (
        <button type="button" className="text-sm text-primary hover:underline" onClick={(e) => { e.stopPropagation(); setExpanded(true); }}>
          Show more
        </button>
      )}
      {shouldClamp && expanded && (
        <button type="button" className="text-sm text-primary hover:underline" onClick={(e) => { e.stopPropagation(); setExpanded(false); }}>
          Show less
        </button>
      )}

      {/* Media attachments */}
      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <div
          className={cn(
            "grid gap-2 rounded-lg overflow-hidden",
            post.mediaUrls.length === 1 && "grid-cols-1",
            post.mediaUrls.length === 2 && "grid-cols-2",
            post.mediaUrls.length >= 3 && "grid-cols-2 md:grid-cols-3"
          )}
        >
          {post.mediaUrls.slice(0, 6).map((url: string, index: number) => (
            <div
              key={index}
              className="relative aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={url}
                alt={`Attachment ${index + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {post.mediaUrls && post.mediaUrls.length > 6 && index === 5 && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <span className="text-h3 font-h3 text-foreground">
                    +{post.mediaUrls.length - 6}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Link preview */}
      {post.linkPreview && (
        <a
          href={post.linkPreview.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg border border-border/50 overflow-hidden hover:bg-muted/30 transition-colors"
        >
          {/* Preview image */}
          {post.linkPreview.imageUrl && (
            <div className="relative aspect-video bg-muted">
              <img
                src={post.linkPreview.imageUrl}
                alt={post.linkPreview.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* Preview content */}
          <div className="p-4 space-y-2">
            {post.linkPreview.siteName && (
              <div className="flex items-center gap-2 text-caption text-muted-foreground">
                <ExternalLink className="h-3 w-3" />
                <span>{post.linkPreview.siteName}</span>
              </div>
            )}

            <h3 className="text-body font-body font-semibold line-clamp-2">
              {post.linkPreview.title}
            </h3>

            {post.linkPreview.description && (
              <p className="text-body-sm font-body-sm text-muted-foreground line-clamp-2">
                {post.linkPreview.description}
              </p>
            )}

            <p className="text-caption font-caption text-muted-foreground truncate">
              {new URL(post.linkPreview.url).hostname}
            </p>
          </div>
        </a>
      )}
    </BoardCard>
  );
});

BoardCardStandard.displayName = "BoardCardStandard";
