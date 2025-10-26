// Bounded Context Owner: Spaces Domain Guild
/**
 * BoardCardDigest - Bundled auto-generated posts
 */

import React from "react";
import { BoardCard, type BoardCardProps } from "./board-card";
import { Badge } from "../../atoms/badge";
import type { DigestPost } from "./types";
import { Package, Calendar, FileText, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import type { BundledPostSummary } from "./types";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface BoardCardDigestProps
  extends Omit<BoardCardProps, "post" | "children"> {
  post: DigestPost;
  onPostClick?: (postId: string) => void;
}

const POST_TYPE_ICONS: Record<BundledPostSummary["type"], IconComponent> = {
  event: Calendar,
  poll: BarChart3,
  form: FileText,
  standard: FileText,
  announcement: Package,
  tracker: BarChart3,
  check_in: Package,
  digest: Package,
};

export const BoardCardDigest = React.forwardRef<
  HTMLDivElement,
  BoardCardDigestProps
>(({ post, onPostClick, ...boardCardProps }, ref) => {
  return (
    <BoardCard ref={ref} post={post} {...boardCardProps}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-h4 font-h4">{post.title}</h2>
          <Badge variant="outline">Digest</Badge>
        </div>

        {/* Bundled posts */}
        <div className="space-y-2">
          {post.bundledPosts.map((bundled) => {
            const Icon = POST_TYPE_ICONS[bundled.type] || FileText;

            return (
              <button
                key={bundled.id}
                onClick={() => onPostClick?.(bundled.id)}
                className="w-full flex items-start gap-3 p-3 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors text-left"
              >
                <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-body-sm font-body-sm font-medium line-clamp-2">
                    {bundled.title}
                  </p>
                  <p className="text-caption font-caption text-muted-foreground">
                    {format(new Date(bundled.timestamp), "h:mm a")}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Summary */}
        <p className="text-body-sm font-body-sm text-muted-foreground">
          {post.bundledPosts.length} auto-generated update
          {post.bundledPosts.length !== 1 ? "s" : ""} bundled together
        </p>
      </div>
    </BoardCard>
  );
});

BoardCardDigest.displayName = "BoardCardDigest";
