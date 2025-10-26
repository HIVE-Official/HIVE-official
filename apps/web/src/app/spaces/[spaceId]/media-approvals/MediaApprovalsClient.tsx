"use client";
// Bounded Context Owner: Community Guild
import { useState, useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@hive/ui";

export interface MediaApprovalItem {
  id: string;
  postId: string;
  author: string;
  thumbnailUrl?: string;
  submittedAt: Date;
}

export function MediaApprovalsClient(props: {
  spaceId: string;
  viewerId: string;
  initialItems: MediaApprovalItem[];
}): JSX.Element {
  const { spaceId, viewerId, initialItems } = props;
  const [items, setItems] = useState<MediaApprovalItem[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  const handleApprove = (id: string) => {
    startTransition(async () => {
      const res = await fetch(`/api/spaces/${spaceId}/media-approvals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approvalId: id, actorId: viewerId, action: "approve" })
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    });
  };

  const handleReject = (id: string) => {
    startTransition(async () => {
      const res = await fetch(`/api/spaces/${spaceId}/media-approvals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approvalId: id, actorId: viewerId, action: "reject" })
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    });
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 space-y-4">
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
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.thumbnailUrl} alt="Pending media" className="h-10 w-10 rounded object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded bg-muted" />
                  )}
                  <div className="min-w-0">
                    <div className="text-body-sm truncate">Post {item.postId}</div>
                    <div className="text-caption text-muted-foreground truncate">by {item.author} · {item.submittedAt.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-none">
                  <Button size="sm" variant="secondary" onClick={() => handleApprove(item.id)} disabled={isPending}>Approve</Button>
                  <Button size="sm" variant="outline" onClick={() => handleReject(item.id)} disabled={isPending}>Reject</Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
