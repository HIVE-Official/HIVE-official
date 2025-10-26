"use client";
// Bounded Context Owner: Community Guild
import { useEffect, useState } from "react";
import { CommentsSheet, type Comment } from "@hive/ui";

export function PostDetailClient(props: {
  postId: string;
  postAuthorName: string;
  initialComments?: Comment[];
  totalCount: number;
  useSheet: boolean;
}) {
  const { postId, postAuthorName, initialComments = [], totalCount, useSheet } = props;
  const [open, setOpen] = useState(true);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchComments = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch(`./comments?limit=50`, { cache: "no-store" });
      const json: unknown = await res.json();
      const isSuccess = (v: unknown): v is { success: true; data: Array<Record<string, unknown>> } =>
        typeof v === "object" && v !== null && (v as { success?: unknown }).success === true && Array.isArray((v as { data?: unknown }).data);
      if (res.ok && isSuccess(json)) {
        const items: Comment[] = json.data.map((c) => ({
          id: typeof c.id === "string" ? c.id : "",
          authorId: typeof c.authorId === "string" ? c.authorId : "",
          authorName: typeof c.authorName === "string" ? c.authorName : "",
          authorHandle: typeof c.authorHandle === "string" ? c.authorHandle : "",
          content: typeof c.content === "string" ? c.content : "",
          createdAt: typeof c.createdAt === "string" ? new Date(c.createdAt) : new Date()
        }));
        setComments(items);
      } else {
        const getMsg = (v: unknown): string | undefined => {
          if (typeof v !== "object" || v === null) return undefined;
          const err = (v as { error?: { message?: unknown } }).error;
          const msg = err?.message;
          return typeof msg === "string" ? msg : undefined;
        };
        setError(getMsg(json) ?? "Unable to load comments");
      }
    } catch {
      setError("Unable to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchComments();
  }, [postId]);

  // If we are in route mode (not sheet), just render the sheet full-screen semantics the same way
  // We preserve the component so the A/B/flag can swap easily without routing changes.
  return (
    <div className="container mx-auto max-w-2xl px-4 py-6">
      <CommentsSheet
        open={open}
        onOpenChange={setOpen}
        postId={postId}
        postAuthorName={postAuthorName}
        comments={comments}
        totalCount={totalCount}
        hasMore={false}
        isLoading={loading}
        error={error}
        onRetry={() => { void fetchComments(); }}
        onSubmitComment={(content) => {
          void (async () => {
            const res = await fetch(`./comments`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                authorId: "profile-jwrhineh",
                authorName: "You",
                authorHandle: "@you",
                content
              })
            });
            const json: unknown = await res.json().catch(() => null);
            const ok = (v: unknown): v is { success: true; data: Record<string, unknown> } =>
              typeof v === "object" && v !== null && (v as { success?: unknown }).success === true && typeof (v as { data?: unknown }).data === "object" && (v as { data: unknown }).data !== null;
            if (res.ok && ok(json)) {
              const d = json.data;
              setComments((prev) => [
                {
                  id: typeof d.id === "string" ? d.id : "",
                  authorId: typeof d.authorId === "string" ? d.authorId : "",
                  authorName: typeof d.authorName === "string" ? d.authorName : "",
                  authorHandle: typeof d.authorHandle === "string" ? d.authorHandle : "",
                  content: typeof d.content === "string" ? d.content : "",
                  createdAt: typeof d.createdAt === "string" ? new Date(d.createdAt) : new Date()
                },
                ...prev
              ]);
            }
          })();
        }}
        density={useSheet ? "compact" : "comfortable"}
      />
    </div>
  );
}
