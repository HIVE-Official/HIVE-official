// Bounded Context Owner: Spaces Domain Guild
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/atoms/card";
import { Button } from "@/atoms/button";
import { Badge } from "@/atoms/badge";

export interface MediaApprovalItem {
  id: string;
  postId: string;
  author: string;
  thumbnailUrl?: string;
  submittedAt: Date;
}

export interface MediaApprovalQueueProps {
  items: MediaApprovalItem[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  isLeader?: boolean;
}

export const MediaApprovalQueue: React.FC<MediaApprovalQueueProps> = ({ items, onApprove, onReject, isLeader = true }) => (
  <Card className="bg-card/90 border-border/70">
    <CardHeader>
      <CardTitle className="text-body font-semibold flex items-center gap-2">
        Media approvals
        <Badge variant="outline">{items.length}</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      {items.length === 0 ? (
        <p className="text-caption text-muted-foreground">No pending media. Safe-scans still apply.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 rounded-md border border-border/60 p-2">
            <div className="flex items-center gap-3 min-w-0">
              {item.thumbnailUrl ? (
                <img src={item.thumbnailUrl} alt="Pending media" className="h-10 w-10 rounded object-cover" />
              ) : (
                <div className="h-10 w-10 rounded bg-muted" />
              )}
              <div className="min-w-0">
                <div className="text-body-sm truncate">Post {item.postId}</div>
                <div className="text-caption text-muted-foreground truncate">by {item.author} · {item.submittedAt.toLocaleString()}</div>
              </div>
            </div>
            {isLeader && (
              <div className="flex items-center gap-2 flex-none">
                <Button size="sm" variant="secondary" onClick={() => onApprove?.(item.id)}>Approve</Button>
                <Button size="sm" variant="outline" onClick={() => onReject?.(item.id)}>Reject</Button>
              </div>
            )}
          </div>
        ))
      )}
    </CardContent>
  </Card>
);
