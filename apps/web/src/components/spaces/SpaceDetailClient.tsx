// Bounded Context Owner: Community Guild
"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { SpaceType } from "@core";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  Input
} from "@hive/ui";
import { ComposerActions, PinnedCluster, CommentsSheet } from "@hive/ui";
import { EventsWidget } from "@hive/ui";
import { ToolsWidget, type Tool as UiTool } from "@hive/ui";
import { CommunityWidget } from "@hive/ui";
import { ResourcesWidget } from "@hive/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { adaptSpacePost, adaptSpacePosts, type AdaptedSpacePost, type SerializedSpacePost } from "./post-adapter";
import { SpaceDetailApiSchema } from "./space-schemas";

export interface SpaceMemberRecord {
  readonly profileId: string;
  readonly role: string;
  readonly joinedAt: string;
  readonly presence: {
    readonly status: "online" | "recent" | "offline";
    readonly lastActive: string;
  };
}

export type SpacePostViewModel = AdaptedSpacePost;

export interface SpaceDetailViewModel {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly type: string;
  readonly visibility: string;
  readonly tags: readonly string[];
  readonly leaderId: string;
  readonly memberCount: number;
  readonly members: readonly SpaceMemberRecord[];
  readonly membership: { readonly role: string | null } | null;
  readonly tagline: string | null;
  readonly accentIcon: string | null;
  readonly pattern: string | null;
  readonly onlineNow: number;
  readonly activityScore: number;
  readonly urgency: string;
  readonly helperIds: readonly string[];
  readonly recentPosts: readonly {
    id: string;
    title: string;
    author: string;
    excerpt: string;
    timestamp: string;
  }[];
  readonly upcomingEvents: readonly {
    id: string;
    title: string;
    startAt: string;
    location: string;
    description: string;
  }[];
  readonly guidelines: readonly string[];
  readonly posts: readonly SpacePostViewModel[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly postingPolicy?: string;
  readonly shareToCampusAllowed?: boolean;
}

interface SpaceDetailClientProps {
  readonly viewerId: string;
  readonly campusId: string;
  readonly initialSpace: SpaceDetailViewModel;
  readonly useSheetDetail?: boolean;
}

const SPACE_TYPE_LABELS: Record<SpaceType, string> = {
  student_organization: "Student Organization",
  university_organization: "University Organization",
  greek_life: "Greek Life",
  residential: "Residential Community"
};

const formatSpaceType = (type: string): string =>
  SPACE_TYPE_LABELS[type as SpaceType] ?? type.replace(/_/g, " ");

const mapApiToDetail = (payload: unknown): SpaceDetailViewModel => {
  const p = SpaceDetailApiSchema.parse(payload);
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    type: p.type,
    visibility: p.visibility,
    tags: p.tags,
    leaderId: p.leaderId,
    memberCount: p.memberCount,
    members: p.members.map((member) => ({
      profileId: member.profileId,
      role: member.role,
      joinedAt: member.joinedAt,
      presence: {
        status: member.presence.status,
        lastActive: member.presence.lastActive
      }
    })),
    membership: p.membership,
    tagline: p.tagline,
    accentIcon: p.accentIcon,
    pattern: p.pattern,
    onlineNow: p.onlineNow,
    activityScore: p.activityScore,
    urgency: p.urgency,
    helperIds: p.helperIds,
    recentPosts: p.recentPosts,
    upcomingEvents: p.upcomingEvents,
    guidelines: p.guidelines,
    posts: adaptSpacePosts((p.posts as unknown as SerializedSpacePost[])),
    postingPolicy: p.postingPolicy,
    shareToCampusAllowed: p.shareToCampusAllowed ?? false,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  };
};

export function SpaceDetailClient({ viewerId, campusId, initialSpace, useSheetDetail = false }: SpaceDetailClientProps): JSX.Element {
  const isApiSuccess = (val: unknown): val is { success: true; data: unknown } =>
    typeof val === "object" && val !== null && (val as { success?: unknown }).success === true;
  const [space, setSpace] = useState<SpaceDetailViewModel>(initialSpace);
  const [posts, setPosts] = useState<SpacePostViewModel[]>([...initialSpace.posts]);
  const [isPending, startTransition] = useTransition();
  const [queuedAttachments, setQueuedAttachments] = useState<
    Array<{ type: "image" | "video" | "file" | "link"; url: string; title?: string; description?: string }>
  >([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(initialSpace.name);
  const [editDescription, setEditDescription] = useState(initialSpace.description);
  const [editTags, setEditTags] = useState(initialSpace.tags.join(", "));
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const composerRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setEditName(space.name);
    setEditDescription(space.description);
    setEditTags(space.tags.join(", "));
  }, [space]);

  const isMember = Boolean(space.membership);
  const isLeader = space.leaderId === viewerId;

  const viewerRole: "leader" | "moderator" | "member" | "follower" =
    space.membership?.role === "admin"
      ? "leader"
      : space.membership?.role === "moderator"
        ? "moderator"
        : space.membership?.role
          ? "member"
          : "member";

  const pinnedPosts = useMemo<SpacePostViewModel[]>(() => posts.filter((p) => p.pin.isPinned), [posts]);
  const regularPosts = useMemo<SpacePostViewModel[]>(() => posts.filter((p) => !p.pin.isPinned), [posts]);
  type LiveTool = {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly placement: { readonly start: boolean; readonly live: boolean; readonly board: string; readonly calendar: boolean };
    readonly status: string;
    readonly limitedRunDaysRemaining: number | null;
  };
  const spaceTools = useMemo((): ReadonlyArray<LiveTool> => {
    const raw = (initialSpace as unknown as { tools?: Array<Record<string, unknown>> }).tools ?? [];
    return raw.map((t) => {
      const placement = (t as any).placement ?? {};
      const limitedRunDaysRemaining = (t as any).limitedRunDaysRemaining ?? (t as any).limitedRunCountdown ?? null;
      const status = String((t as any).status ?? "");
      return {
        id: String((t as any).id ?? ""),
        name: String((t as any).name ?? "Tool"),
        description: typeof (t as any).description === "string" ? String((t as any).description) : undefined,
        placement: {
          start: Boolean(placement.start),
          live: Boolean(placement.live),
          board: (placement.board as string) ?? "off",
          calendar: Boolean(placement.calendar)
        },
        status,
        limitedRunDaysRemaining: typeof limitedRunDaysRemaining === "number" ? limitedRunDaysRemaining : null
      } as const;
    });
  }, [initialSpace]);
  const hasCalendarExtensions = useMemo<boolean>(() => spaceTools.some((t) => t.placement.calendar), [spaceTools]);

  const currentPostId = searchParams?.get("postId");
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(Boolean(currentPostId));
  const sheetPost = useMemo(() => posts.find((p) => p.id === currentPostId) ?? null, [currentPostId, posts]);

  useEffect(() => {
    setIsSheetOpen(Boolean(currentPostId));
  }, [currentPostId]);

  const openPost = (postId: string): void => {
    if (!useSheetDetail) return;
    const url = new URL(window.location.href);
    url.searchParams.set("postId", postId);
    router.push(`${pathname}?${url.searchParams.toString()}`, { scroll: false });
  };

  const closeSheet = (): void => {
    const url = new URL(window.location.href);
    url.searchParams.delete("postId");
    router.replace(`${pathname}${url.searchParams.size ? `?${url.searchParams.toString()}` : ""}`, { scroll: false });
  };

  // Access server-serialized settings safely without over-constraining client type
  //

  const handleJoin = (): void => {
    startTransition(async () => {
      const response = await fetch("/api/spaces/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spaceId: space.id, profileId: viewerId, campusId })
      });

      if (!response.ok) {
        return;
      }

      const json: unknown = await response.json();
      if (!isApiSuccess(json)) {
        return;
      }

      const nextSpace = mapApiToDetail(json.data);
      setSpace(nextSpace);
      if ((json.data as { posts?: unknown }).posts) {
        setPosts([...nextSpace.posts]);
      }
    });
  };

  const handleLeave = (): void => {
    startTransition(async () => {
      const response = await fetch("/api/spaces/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spaceId: space.id, profileId: viewerId })
      });

      if (!response.ok) {
        return;
      }

      const json: unknown = await response.json();
      if (!isApiSuccess(json)) {
        return;
      }

      const nextSpace = mapApiToDetail(json.data);
      setSpace(nextSpace);
      if ((json.data as { posts?: unknown }).posts) {
        setPosts([...nextSpace.posts]);
      }
    });
  };

  const helperLookup = new Set(space.helperIds);

  const renderPresence = (record: SpaceMemberRecord): JSX.Element => {
    const status = record.presence.status;
    const color = status === "online" ? "bg-emerald-500" : status === "recent" ? "bg-amber-400" : "bg-muted-foreground/40";
    const label = status === "online" ? "Online now" : status === "recent" ? "Active recently" : "Offline";

    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} aria-hidden />
        <span>{label}</span>
      </div>
    );
  };

  const handleDetailsSubmit = (): void => {
    startTransition(async () => {
      const response = await fetch(`/api/spaces/${space.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          description: editDescription,
          tags: editTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          viewerId
        })
      });

      if (!response.ok) {
        return;
      }

      const json: unknown = await response.json();
      if (!isApiSuccess(json)) {
        return;
      }

      const nextSpace = mapApiToDetail(json.data);
      setSpace(nextSpace);
      if ((json.data as { posts?: unknown }).posts) {
        setPosts([...nextSpace.posts]);
      }
      setIsEditing(false);
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/70 bg-card/90 overflow-hidden">
        <div
          className="h-2 w-full"
          style={{ background: space.pattern ?? "linear-gradient(90deg, rgba(148,163,184,0.4) 0%, rgba(100,116,139,0.4) 100%)" }}
        />
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {space.accentIcon ? <span className="text-3xl">{space.accentIcon}</span> : null}
              <CardTitle className="text-3xl font-semibold leading-tight">
                {space.name}
              </CardTitle>
            </div>
            {space.tagline ? <Text variant="muted">{space.tagline}</Text> : null}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="uppercase tracking-[0.12em]">
                {formatSpaceType(space.type)}
              </Badge>
              <Badge variant="outline">{space.visibility}</Badge>
              <Badge variant="outline" className="bg-muted/40">Online {space.onlineNow}</Badge>
              <Badge variant="outline" className="bg-muted/40 capitalize">{space.urgency} urgency</Badge>
              <span>{space.memberCount} members</span>
              <span>Leader: {space.leaderId}</span>
            </div>
          </div>
          <div className="flex gap-3">
            {isMember ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLeave}
                disabled={isPending || isLeader}
              >
                Leave Space
              </Button>
            ) : (
              <Button size="sm" onClick={handleJoin} disabled={isPending}>
                Join Space
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Text variant="muted">{space.description}</Text>
          {space.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {space.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-4">
          <Tabs defaultValue="posts">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <Card className="border-border/70 bg-card/90">
                <CardHeader>
                  <CardTitle>Space posts</CardTitle>
                  <Text variant="muted" className="text-sm">
                    Posts stay inside this space and power the campus feed.
                  </Text>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Filter:</span>
                    <div className="inline-flex rounded-md border border-border/60 bg-muted/30 p-1">
                      <button
                        type="button"
                        className="px-2 py-1 text-xs rounded-sm hover:bg-muted/50"
                        onClick={() => {
                          const url = new URL(window.location.href);
                          url.searchParams.delete("f");
                          window.history.replaceState(null, "", `${url.pathname}${url.searchParams.size ? `?${url.searchParams.toString()}` : ""}`);
                        }}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        className="px-2 py-1 text-xs rounded-sm hover:bg-muted/50"
                        onClick={() => {
                          const url = new URL(window.location.href);
                          url.searchParams.set("f", "events");
                          window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}`);
                        }}
                      >
                        Events
                      </button>
                      <button
                        type="button"
                        className="px-2 py-1 text-xs rounded-sm hover:bg-muted/50"
                        onClick={() => {
                          const url = new URL(window.location.href);
                          url.searchParams.set("f", "tools");
                          window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}`);
                        }}
                      >
                        Tools
                      </button>
                    </div>
                  </div>
                  <ComposerActions
                    userName={viewerId}
                    userRole={viewerRole}
                    postingPolicy={space.postingPolicy === "leaders_only" ? "leaders_only" : "members"}
                    onCreatePost={() => composerRef.current?.focus()}
                    className="border-border/60"
                  />
                  {spaceTools.length > 0 ? (
                    <div className="mt-3 rounded-lg border border-border/60 bg-muted/5 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Live tools</div>
                        {isLeader ? (
                          <a href={`/lab/${space.id}`} className="text-xs text-primary hover:text-primary/80">Manage in Lab →</a>
                        ) : null}
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {spaceTools.map((tool) => (
                          <div key={tool.id} className="rounded-md border border-border/60 bg-background/60 p-3">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <div className="text-sm font-semibold text-foreground">{tool.name}</div>
                                {tool.limitedRunDaysRemaining !== null && (tool.status === "limited_run" || tool.status === "live") ? (
                                  <div className="text-xs text-muted-foreground">⏳ {tool.limitedRunDaysRemaining} days left</div>
                                ) : null}
                              </div>
                              <div className="flex items-center gap-1">
                                {tool.placement.start ? (
                                  <a
                                    href={isLeader ? `/lab/${space.id}?toolId=${encodeURIComponent(tool.id)}` : `#`}
                                    className="rounded border border-border/50 px-2 py-1 text-xs hover:border-primary/40"
                                    onClick={(e) => { if (!isLeader) { e.preventDefault(); composerRef.current?.focus(); } }}
                                  >
                                    Start
                                  </a>
                                ) : null}
                                {tool.placement.live ? (
                                  <a
                                    href={isLeader ? `/lab/${space.id}?toolId=${encodeURIComponent(tool.id)}` : `#`}
                                    className="rounded border border-border/50 px-2 py-1 text-xs hover:border-primary/40"
                                    onClick={(e) => { if (!isLeader) { e.preventDefault(); /* runtime stub */ } }}
                                  >
                                    Open
                                  </a>
                                ) : null}
                                {tool.placement.board === "on_input" ? (
                                  <button
                                    type="button"
                                    className="rounded border border-border/50 px-2 py-1 text-xs hover:border-primary/40"
                                    onClick={() => {
                                      void (async () => {
                                        const res = await fetch(`/api/spaces/${space.id}/tools/${encodeURIComponent(tool.id)}/board`, {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify({ variant: "input", authorId: viewerId, authorHandle: "@you" })
                                        }).catch(() => null);
                                        if (res && res.ok) {
                                          window.location.reload();
                                        }
                                      })();
                                    }}
                                  >
                                    Ask input
                                  </button>
                                ) : tool.placement.board === "recap_only" ? (
                                  <button
                                    type="button"
                                    className="rounded border border-border/50 px-2 py-1 text-xs hover:border-primary/40"
                                    onClick={() => {
                                      void (async () => {
                                        const res = await fetch(`/api/spaces/${space.id}/tools/${encodeURIComponent(tool.id)}/board`, {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify({ variant: "recap", authorId: viewerId, authorHandle: "@you" })
                                        }).catch(() => null);
                                        if (res && res.ok) {
                                          window.location.reload();
                                        }
                                      })();
                                    }}
                                  >
                                    Share recap
                                  </button>
                                ) : null}
                              </div>
                            </div>
                            {tool.description ? (
                              <div className="mt-1 text-xs text-muted-foreground">{tool.description}</div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <form
                    className="space-y-2 rounded-lg border border-border/60 bg-muted/5 p-4"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (!isMember) {
                        return;
                      }
                      const formData = new FormData(event.currentTarget);
                      const entry = formData.get("content");
                      const content = typeof entry === "string" ? entry.trim() : "";
                      if (content.length === 0) {
                        return;
                      }

                      startTransition(async () => {
                        const response = await fetch(`/api/spaces/${space.id}/posts`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            authorId: viewerId,
                            authorHandle: "@you",
                            content,
                            attachments: queuedAttachments
                          })
                        });

                        if (!response.ok) {
                          return;
                        }

                        const json: unknown = await response.json();
                        if (!isApiSuccess(json)) {
                          return;
                        }

                        const newPost = adaptSpacePost(json.data as SerializedSpacePost);
                        setPosts((prev) => [newPost, ...prev]);
                        event.currentTarget.reset();
                        setQueuedAttachments([]);
                      });
                    }}
                  >
                    <Textarea
                      name="content"
                      placeholder={isMember ? "Share an update, ask for help, or coordinate." : "Join this space to start posting."}
                      disabled={!isMember || isPending}
                      rows={3}
                      ref={composerRef}
                    />
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <input
                          id="media-upload"
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];
                            e.currentTarget.value = ""; // allow reselect
                            if (!file || !isMember) return;
                            startTransition(async () => {
                              const fd = new FormData();
                              fd.append("file", file);
                              fd.append("actorId", viewerId);
                              const res = await fetch(`/api/spaces/${space.id}/uploads/pending`, { method: "POST", body: fd });
                              if (!res.ok) return;
                              const j = await res.json();
                              const url = String(j?.data?.url || "");
                              if (!url) return;
                              const t = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "file" as const;
                              setQueuedAttachments((prev) => [...prev, { type: t, url, title: file.name }]);
                            });
                          }}
                        />
                        <label htmlFor="media-upload" className="cursor-pointer rounded border border-border/60 px-2 py-1 hover:border-primary/40">
                          Add media
                        </label>
                        {queuedAttachments.length > 0 && (
                          <span className="text-muted-foreground">{queuedAttachments.length} attachment(s) queued</span>
                        )}
                      </div>
                      <Button type="submit" size="sm" disabled={!isMember || isPending}>
                        Post
                      </Button>
                    </div>
                    {isMember ? (
                      <p className="mt-1 text-caption text-muted-foreground">
                        Heads‑up: media from non‑leaders goes to approvals before it appears.
                      </p>
                    ) : null}
                  </form>

                  <PinnedCluster totalPostsCount={posts.length}>
                    {pinnedPosts
                      .filter((p) => {
                        const f = searchParams?.get("f");
                        if (f === "events") return p.kind === "event";
                        if (f === "tools") return Boolean(p.toolContext);
                        return true;
                      })
                      .map((post) => (
                      <a
                        key={post.id}
                        href={`/spaces/${space.id}/post/${post.id}`}
                        onClick={(e) => { if (useSheetDetail) { e.preventDefault(); openPost(post.id); } }}
                        className="block rounded-lg border border-border/50 bg-muted/10 p-3 space-y-2 hover:bg-muted/20 transition"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-foreground">{post.author.displayName}</span>
                            <span>{post.author.handle}</span>
                            <span>• {post.createdAt.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="text-sm text-foreground whitespace-pre-wrap">{post.content}</div>
                      </a>
                    ))}
                  </PinnedCluster>

                  <div className="space-y-3">
                    {regularPosts.filter((p) => {
                      const f = searchParams?.get("f");
                      if (f === "events") return p.kind === "event";
                      if (f === "tools") return Boolean(p.toolContext);
                      return true;
                    }).length === 0 && pinnedPosts.filter((p) => {
                      const f = searchParams?.get("f");
                      if (f === "events") return p.kind === "event";
                      if (f === "tools") return Boolean(p.toolContext);
                      return true;
                    }).length === 0 ? (
                      <Text variant="muted">No posts yet. Be the first to share an update.</Text>
                    ) : (
                      regularPosts
                        .filter((post) => {
                          const f = searchParams?.get("f");
                          if (f === "events") return post.kind === "event";
                          if (f === "tools") return Boolean(post.toolContext);
                          return true;
                        })
                        .map((post) => {
                        const handle = post.author.handle.startsWith("@")
                          ? post.author.handle
                          : `@${post.author.handle}`;
                        const createdLabel = post.createdAt.toLocaleString();
                        const isHidden = post.moderation.isHidden;

                        return (
                          <a
                            key={post.id}
                            href={`/spaces/${space.id}/post/${post.id}`}
                            onClick={(e) => { if (useSheetDetail) { e.preventDefault(); openPost(post.id); } }}
                            className="block rounded-lg border border-border/50 bg-muted/10 p-3 space-y-2 hover:bg-muted/20 transition"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-foreground">{post.author.displayName}</span>
                                <span>{handle}</span>
                                {post.visibility === "public" ? (
                                  <Badge variant="outline" className="uppercase">Public</Badge>
                                ) : null}
                                {post.pin.isPinned ? (
                                  <Badge variant="outline" className="gap-1">📌 Pinned</Badge>
                                ) : null}
                                {post.toolContext ? (
                                  <Badge variant="muted" className="gap-1">🛠 Tool</Badge>
                                ) : null}
                              </div>
                              <span>{createdLabel}</span>
                            </div>

                            {isHidden ? (
                              <Text variant="muted" className="text-xs text-destructive">
                                Hidden pending moderation.
                              </Text>
                            ) : (
                              <Text className="text-sm text-foreground whitespace-pre-wrap">{post.content}</Text>
                            )}

                            {post.attachments.length > 0 ? (
                              <div className="space-y-1">
                                {post.attachments.map((attachment) => (
                                  <a
                                    key={`${post.id}-${attachment.url}`}
                                    href={attachment.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block text-xs text-primary underline decoration-dotted hover:decoration-solid"
                                  >
                                    {attachment.title ?? attachment.url}
                                  </a>
                                ))}
                              </div>
                            ) : null}

                            {post.tags.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="outline">#{tag}</Badge>
                                ))}
                              </div>
                            ) : null}

                            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                              <span>
                                ❤️ {post.counts.reactions} · 💬 {post.counts.comments}
                              </span>
                              {post.moderation.status !== "active" ? (
                                <span>status: {post.moderation.status}</span>
                              ) : null}
                            </div>
                          </a>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about">
              <Card className="border-border/70 bg-card/90">
                <CardHeader>
                  <CardTitle>About this space</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Text variant="muted">{space.description}</Text>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Guidelines
                    </h3>
                    <ul className="list-disc space-y-1 pl-6 text-sm text-muted-foreground">
                      {space.guidelines.map((guideline) => (
                        <li key={guideline}>{guideline}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members">
              <Card className="border-border/70 bg-card/90">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Members</span>
                    <a
                      href={`/spaces/${space.id}/members`}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      View full roster →
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {space.members.length === 0 ? (
                    <Text variant="muted">No members yet.</Text>
                  ) : (
                    space.members.map((member) => (
                      <div
                        key={member.profileId}
                        className="flex items-center justify-between gap-4 rounded-md border border-border/60 bg-muted/10 px-3 py-2 text-sm"
                      >
                        <div>
                          <span className="font-medium text-foreground block">{member.profileId}</span>
                          {renderPresence(member)}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {helperLookup.has(member.profileId) ? (
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
                              Helper
                            </Badge>
                          ) : null}
                          {isLeader && member.profileId !== space.leaderId ? (
                            <select
                              className="rounded-md border border-border/60 bg-background px-2 py-1 text-xs capitalize"
                              value={member.role}
                              onChange={(event) => {
                                const nextRole = event.target.value;
                                startTransition(async () => {
                                  const response = await fetch(`/api/spaces/${space.id}/members/role`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                      profileId: member.profileId,
                                      role: nextRole,
                                      viewerId
                                    })
                                  });

                                  if (!response.ok) {
                                    return;
                                  }

                                  const json: unknown = await response.json();
                                  if (!isApiSuccess(json)) {
                                    return;
                                  }

                                  const nextSpace = mapApiToDetail(json.data);
                                  setSpace(nextSpace);
                                  if ((json.data as { posts?: unknown }).posts) {
                                    setPosts([...nextSpace.posts]);
                                  }
                                });
                              }}
                            >
                              <option value="member">Member</option>
                              <option value="moderator">Moderator</option>
                              <option value="admin">Admin</option>
                            </select>
                          ) : (
                            <span className="capitalize">{member.role}</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card className="border-border/70 bg-card/90">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Upcoming events</span>
                    <a
                      href={`/spaces/${space.id}/calendar`}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      View full calendar →
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {space.upcomingEvents.length === 0 ? (
                    <Text variant="muted">No events scheduled yet.</Text>
                  ) : (
                    space.upcomingEvents.map((event) => (
                      <div key={event.id} className="rounded-lg border border-border/50 bg-muted/10 p-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{new Date(event.startAt).toLocaleString()}</span>
                          <span>{event.location}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>
                        <Text variant="muted" className="text-sm">
                          {event.description}
                        </Text>
                        {hasCalendarExtensions ? (
                          <div className="mt-1">
                            <span className="rounded border border-border/40 bg-muted/20 px-2 py-0.5 text-xs text-muted-foreground">Extensions available</span>
                          </div>
                        ) : null}
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-4 lg:w-80">
          {isLeader ? (
            <Card className="border-border/70 bg-card/90">
              <CardHeader>
                <CardTitle>Leader tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input value={editName} onChange={(event) => setEditName(event.target.value)} placeholder="Space name" />
                    <Textarea
                      value={editDescription}
                      onChange={(event) => setEditDescription(event.target.value)}
                      rows={3}
                    />
                    <Input
                      value={editTags}
                      onChange={(event) => setEditTags(event.target.value)}
                      placeholder="Tags (comma separated)"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleDetailsSubmit} isLoading={isPending}>
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} disabled={isPending}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Name</div>
                      <div className="text-foreground">{space.name}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Tags</div>
                      <div className="text-foreground">{space.tags.join(", ") || "None"}</div>
                    </div>
                    <Button size="sm" variant="secondary" onClick={() => setIsEditing(true)}>
                      Edit details
                    </Button>
                    <div className="pt-2">
                      <a
                        href={`/spaces/${space.id}/media-approvals`}
                        className="inline-flex items-center text-primary hover:text-primary/80 text-xs"
                      >
                        Review media approvals →
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}
          <CommunityWidget
            onlineMembers={space.members
              .filter((m) => m.presence.status === "online")
              .map((m) => ({
                userId: String(m.profileId),
                spaceId: String(space.id),
                role: m.role === "admin" ? "leader" : m.role === "moderator" ? "moderator" : "member",
                joinedAt: new Date(String(m.joinedAt)),
                fullName: String(m.profileId),
                handle: String(m.profileId),
              }))}
            totalMembers={space.memberCount}
            onViewRoster={() => { window.location.href = `/spaces/${space.id}/members`; }}
          />
          <ResourcesWidget
            resources={(() => {
              const settings = (initialSpace as unknown as { settings?: { featuredLinks?: Array<{ label?: string; url?: string }> } }).settings;
              const featured = settings?.featuredLinks ?? [];
              return featured.map((link, idx) => ({
                id: String(idx),
                title: String(link.label ?? "Resource"),
                url: String(link.url ?? "#"),
                type: "link" as const
              }));
            })()}
            canManage={isLeader}
            onViewAll={() => { window.location.href = `/spaces/${space.id}/about`; }}
          />
          <EventsWidget
            upcomingEvents={(space.upcomingEvents ?? []).map((e) => {
              const start = new Date(String(e.startAt));
              const end = new Date(start.getTime() + 60 * 60 * 1000);
              return {
                id: String(e.id),
                spaceId: String(space.id),
                title: String(e.title),
                description: String(e.description ?? ""),
                location: String(e.location ?? ""),
                startTime: start,
                endTime: end,
                enableWaitlist: false,
                goingCount: 0,
                maybeCount: 0,
                waitlistCount: 0,
                checkInEnabled: false,
                checkedInCount: 0,
                coHostIds: [],
                coHostNames: [],
                isRssImported: false,
                createdAt: start,
                updatedAt: start
              };
            })}
            onViewAllEvents={() => { window.location.href = `/spaces/${space.id}/calendar`; }}
          />
          <ToolsWidget
            tools={(() => {
              const tools = (initialSpace as unknown as { tools?: Array<Record<string, unknown>> }).tools ?? [];
              return tools.map((t) => ({
                id: typeof t.id === "string" ? t.id : "tool",
                name: String((t.name as string | undefined) ?? "Tool"),
                type: "form" as UiTool["type"],
                description: typeof t.description === "string" ? t.description : undefined,
                status: typeof t.status === "string" && (t.status === "active" || t.status === "paused" || t.status === "draft") ? t.status : undefined,
                lastRunAt: t && (t as { lastTest?: { lastRunAt?: string } }).lastTest?.lastRunAt ? new Date(String((t as { lastTest?: { lastRunAt?: string } }).lastTest?.lastRunAt)) : undefined,
                responseCount: undefined,
                progress: undefined,
                voteCount: undefined,
                href: undefined
              }));
            })()}
            canManage={isLeader}
          />
          <Card className="border-border/70 bg-card/90">
            <CardHeader>
              <CardTitle>Quick stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Active members</span>
                <span>{space.onlineNow}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Activity score</span>
                <span>{space.activityScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Urgency</span>
                <span className="capitalize">{space.urgency}</span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
      {useSheetDetail && sheetPost ? (
        <CommentsSheet
          open={isSheetOpen}
          onOpenChange={(open) => { if (!open) { setIsSheetOpen(false); closeSheet(); } }}
          postId={sheetPost.id}
          postAuthorName={sheetPost.author.displayName}
          comments={[]}
          totalCount={sheetPost.counts.comments}
          hasMore={false}
          isLoading={false}
          onSubmitComment={(content) => {
            void (async () => {
              await fetch(`/spaces/${space.id}/post/${sheetPost.id}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ authorId: viewerId, authorName: "You", authorHandle: "@you", content })
              }).catch(() => void 0);
            })();
          }}
        />
      ) : null}
    </div>
  );
}
