// Bounded Context Owner: Engagement Guild
"use client";
import type { FeedViewItem } from "../../server/feed/service";

export function FeedList({ items }: { items: readonly FeedViewItem[] }): JSX.Element {
  if (items.length === 0) {
    return <div className="text-muted-foreground">No new activity yet.</div>;
  }
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={`${item.kind}:${item.id}`} className="rounded-md border p-4">
          {item.kind === "post" && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">@{item.authorHandle}</div>
              <div className="whitespace-pre-wrap">{item.content}</div>
              <div className="text-xs text-muted-foreground flex gap-3">
                <span>{new Date(item.createdAt).toLocaleString()}</span>
                <span>❤ {item.reactions}</span>
                <span>💬 {item.commentCount}</span>
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
