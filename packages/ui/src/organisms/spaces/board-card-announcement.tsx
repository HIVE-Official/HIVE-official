// Bounded Context Owner: Spaces Domain Guild
/**
 * BoardCardAnnouncement - Leader announcement with acknowledgment
 */

import React from "react";
import { BoardCard, type BoardCardProps } from "./board-card";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import type { AnnouncementPost } from "./types";
import { Megaphone, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { cn } from "../../utils/cn";

export interface BoardCardAnnouncementProps
  extends Omit<BoardCardProps, "post" | "children"> {
  post: AnnouncementPost;
  onAcknowledge?: () => void;
  isLoading?: boolean;
}

const PRIORITY_CONFIG: Record<
  AnnouncementPost["priority"],
  {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
    badge: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  low: {
    icon: Info,
    color: "text-muted-foreground",
    badge: "outline",
  },
  normal: { icon: Megaphone, color: "text-primary", badge: "default" },
  high: {
    icon: AlertTriangle,
    color: "text-warning",
    badge: "destructive",
  },
};

export const BoardCardAnnouncement = React.forwardRef<
  HTMLDivElement,
  BoardCardAnnouncementProps
>(({ post, onAcknowledge, isLoading = false, ...boardCardProps }, ref) => {
  const config = PRIORITY_CONFIG[post.priority];
  const Icon = config.icon;

  return (
    <BoardCard ref={ref} post={post} {...boardCardProps}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Icon className={cn("h-5 w-5", config.color)} />
          <Badge variant={config.badge}>Announcement</Badge>
        </div>

        {/* Title */}
        <h2 className="text-h4 font-h4">{post.title}</h2>

        {/* Content */}
        <div className="text-body font-body whitespace-pre-wrap">
          {post.content}
        </div>

        {/* Acknowledgment */}
        {post.requiresAcknowledgment && (
          <div className="pt-3 border-t border-border/30 space-y-3">
            <p className="text-body-sm font-body-sm text-muted-foreground">
              {post.acknowledgmentCount} member
              {post.acknowledgmentCount !== 1 ? "s" : ""} acknowledged
            </p>

            {post.userAcknowledged ? (
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-body-sm font-body-sm font-medium">
                  You acknowledged this
                </span>
              </div>
            ) : (
              <Button
                onClick={onAcknowledge}
                variant="default"
                size="default"
                disabled={isLoading}
                className="w-full brand-cta"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {isLoading ? "Acknowledging..." : "Acknowledge"}
              </Button>
            )}
          </div>
        )}
      </div>
    </BoardCard>
  );
});

BoardCardAnnouncement.displayName = "BoardCardAnnouncement";
