"use client";

import { useEffect, useState } from "react";
import { PostDetail, Skeleton } from "@hive/ui";

type UiPost = Parameters<typeof PostDetail>[0]["post"];

export default function PostDetailPage({ params }: { params: { id: string; postId: string } }) {
  const { id, postId } = params;
  const [post, setPost] = useState<UiPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/spaces/${id}/posts`, { cache: "no-store" });
        const data = await res.json();
        const posts = (data.posts as any[]).map((it) => ({
          ...it,
          createdAt: new Date(it.createdAt),
          updatedAt: new Date(it.updatedAt),
          lastActivityAt: new Date(it.lastActivityAt)
        })) as UiPost[];
        const match = posts.find((p) => p.id === postId) || null;
        setPost(match);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id, postId]);

  if (loading) {
    return (
      <main className="page px-page py-section">
        <div className="container-page max-w-3xl space-y-4">
          <Skeleton className="h-80 w-full" />
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="page px-page py-section">
        <div className="container-page max-w-3xl space-y-4">
          <p className="text-muted-foreground">Post not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page px-page py-section">
      <div className="container-page max-w-3xl space-y-4">
        <PostDetail post={post} open onOpenChange={() => { /* page-level, ignore close */ }} mode="page" />
      </div>
    </main>
  );
}
