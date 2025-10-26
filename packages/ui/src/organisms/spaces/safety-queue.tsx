// Bounded Context Owner: Spaces Domain Guild
/**
 * SafetyQueue - Media approval system for spaces
 *
 * Spec: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md §2.6
 * - Media approval placeholder for non-leaders
 * - Leader queue view with approve/deny actions
 * - Auto-hide on report threshold
 * - Ghost state for leaders
 */

import React from "react";
import { cn } from "../../utils/cn";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import { Avatar } from "../../atoms/avatar";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Flag,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface PendingMedia {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  uploadedAt: Date;
  status: "pending" | "approved" | "denied";
}

export interface MediaApprovalPlaceholderProps {
  /** Number of items awaiting approval */
  pendingCount: number;

  /** Custom class */
  className?: string;
}

/**
 * Placeholder shown to non-leaders when media is pending approval
 */
export const MediaApprovalPlaceholder: React.FC<
  MediaApprovalPlaceholderProps
> = ({ pendingCount, className }) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/60 bg-muted/30 p-4 flex items-center gap-3",
        className
      )}
    >
      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground flex-none" />
      <div className="flex-1 min-w-0">
        <p className="text-body-sm font-semibold text-foreground">
          Awaiting approval
        </p>
        <p className="text-caption text-muted-foreground">
          {pendingCount} {pendingCount === 1 ? "item" : "items"} pending leader
          review
        </p>
      </div>
    </div>
  );
};

export interface SafetyQueueProps {
  /** Pending media items */
  pendingMedia: PendingMedia[];

  /** Is user a leader/moderator */
  isLeaderOrMod: boolean;

  /** Approve media handler */
  onApprove?: (mediaId: string) => void;

  /** Deny media handler */
  onDeny?: (mediaId: string) => void;

  /** Loading state for specific media */
  loadingMediaIds?: string[];

  /** Custom class */
  className?: string;
}

/**
 * Leader view of media approval queue
 */
export const SafetyQueue = React.forwardRef<HTMLDivElement, SafetyQueueProps>(
  (
    {
      pendingMedia,
      isLeaderOrMod,
      onApprove,
      onDeny,
      loadingMediaIds = [],
      className,
    },
    ref
  ) => {
    if (!isLeaderOrMod) {
      return pendingMedia.length > 0 ? (
        <MediaApprovalPlaceholder
          pendingCount={pendingMedia.length}
          className={className}
        />
      ) : null;
    }

    if (pendingMedia.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg border border-border/60 bg-card/30 p-6 text-center",
            className
          )}
        >
          <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
          <p className="text-body-sm text-muted-foreground">
            No pending approvals — all clear!
          </p>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <h3 className="text-body-sm font-semibold text-foreground">
              Media Approval Queue
            </h3>
            <Badge
              variant="outline"
              className="bg-warning/10 text-warning border-warning/30"
            >
              {pendingMedia.length}
            </Badge>
          </div>
          <p className="text-caption text-muted-foreground">
            Review before publishing
          </p>
        </div>

        <div className="space-y-3">
          {pendingMedia.map((item) => {
            const isLoading = loadingMediaIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="rounded-lg border border-warning/30 bg-warning/5 p-4"
              >
                <div className="flex gap-3">
                  {/* Author info */}
                  <Avatar
                    src={item.authorAvatar}
                    alt={item.authorName}
                    fallback={item.authorName.charAt(0)}
                    className="h-10 w-10 flex-none"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-body-sm font-semibold text-foreground">
                        {item.authorName}
                      </span>
                      <span className="text-caption text-muted-foreground">
                        @{item.authorHandle}
                      </span>
                      <span className="text-caption text-muted-foreground">
                        ·{" "}
                        {formatDistanceToNow(item.uploadedAt, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>

                    {/* Media preview */}
                    <div className="mb-3">
                      {item.mediaType === "image" ? (
                        <img
                          src={item.mediaUrl}
                          alt="Pending media"
                          className="rounded-md max-h-48 object-cover"
                        />
                      ) : (
                        <video
                          src={item.mediaUrl}
                          className="rounded-md max-h-48 w-full"
                          controls
                        />
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => onApprove?.(item.id)}
                        disabled={isLoading}
                        className="bg-success hover:bg-success/90 text-white"
                      >
                        {isLoading ? (
                          <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                        ) : (
                          <CheckCircle className="h-3 w-3 mr-1.5" />
                        )}
                        Approve
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDeny?.(item.id)}
                        disabled={isLoading}
                        className="border-destructive/30 text-destructive hover:bg-destructive/10"
                      >
                        {isLoading ? (
                          <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1.5" />
                        )}
                        Deny
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

SafetyQueue.displayName = "SafetyQueue";

export interface GhostPostProps {
  /** Post ID */
  postId: string;

  /** Why it's hidden */
  reason: "auto_hidden" | "manual_hidden" | "removed";

  /** Report count (if auto-hidden) */
  reportCount?: number;

  /** Is user a leader/moderator */
  isLeaderOrMod: boolean;

  /** Unhide handler */
  onUnhide?: () => void;

  /** Remove permanently handler */
  onRemove?: () => void;

  /** Escalate to campus admin */
  onEscalate?: () => void;

  /** Custom class */
  className?: string;

  /** Post preview content */
  children?: React.ReactNode;
}

/**
 * Ghost state shown to leaders for hidden/flagged posts
 */
export const GhostPost: React.FC<GhostPostProps> = ({
  postId: _postId,
  reason,
  reportCount,
  isLeaderOrMod,
  onUnhide,
  onRemove,
  onEscalate,
  className,
  children,
}) => {
  if (!isLeaderOrMod) {
    return null;
  }

  const getReasonText = () => {
    switch (reason) {
      case "auto_hidden":
        return `Auto-hidden (${reportCount} reports)`;
      case "manual_hidden":
        return "Hidden by moderator";
      case "removed":
        return "Removed";
      default:
        return "Hidden";
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/5 p-4",
        className
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <EyeOff className="h-5 w-5 text-destructive flex-none mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="destructive" className="text-xs">
              {getReasonText()}
            </Badge>
            {reportCount && reportCount > 0 && (
              <span className="text-caption text-muted-foreground flex items-center gap-1">
                <Flag className="h-3 w-3" />
                {reportCount} {reportCount === 1 ? "report" : "reports"}
              </span>
            )}
          </div>
          <p className="text-caption text-muted-foreground">
            Only visible to leaders and moderators
          </p>
        </div>
      </div>

      {/* Post preview */}
      {children && (
        <div className="opacity-60 mb-3 pointer-events-none">{children}</div>
      )}

      {/* Leader actions */}
      <div className="flex items-center gap-2 flex-wrap">
        {reason !== "removed" && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={onUnhide}
              className="gap-1.5"
            >
              <Eye className="h-3 w-3" />
              Unhide
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onRemove}
              className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <XCircle className="h-3 w-3" />
              Remove
            </Button>
          </>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={onEscalate}
          className="gap-1.5"
        >
          <Flag className="h-3 w-3" />
          Escalate to Campus
        </Button>
      </div>
    </div>
  );
};




