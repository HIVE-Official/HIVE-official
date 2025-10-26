"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@auth";
import { SpaceLayout, PostDetail, EventSheet, toast, Skeleton } from "@hive/ui";

type JsonDate<T> = { [K in keyof T]: T[K] extends Date ? string : T[K] };

type UiSpace = Parameters<typeof SpaceLayout>[0]["space"];
type UiPost = Parameters<typeof SpaceLayout>[0]["posts"][number];
type UiEvent = Parameters<typeof SpaceLayout>[0]["upcomingEvents"][number];
type UiMember = Parameters<typeof SpaceLayout>[0]["onlineMembers"][number];
type UiTool = Parameters<typeof SpaceLayout>[0]["tools"][number];
type UiResource = Parameters<typeof SpaceLayout>[0]["resources"][number];

export default function SpaceDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const { state } = useAuth();
  const router = useRouter();
  const search = useSearchParams();

  const [space, setSpace] = useState<UiSpace | null>(null);
  const [posts, setPosts] = useState<UiPost[]>([]);
  const [events, setEvents] = useState<UiEvent[]>([]);
  const [members, setMembers] = useState<UiMember[]>([]);
  const [tools, setTools] = useState<UiTool[]>([]);
  const [resources, setResources] = useState<UiResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [openPostId, setOpenPostId] = useState<string | null>(null);
  const [openEventId, setOpenEventId] = useState<string | null>(null);
  const [isMember, setIsMember] = useState<boolean>(false);

  const base = "/api";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const profileId = state.profileId ?? "demo";
        const [s, p, e, m] = await Promise.all([
          fetch(`${base}/spaces/${id}?profileId=${encodeURIComponent(profileId)}`, { cache: "no-store" }).then((r) => r.json()),
          fetch(`${base}/spaces/${id}/posts`, { cache: "no-store" }).then((r) => r.json()),
          fetch(`${base}/spaces/${id}/events`, { cache: "no-store" }).then((r) => r.json()),
          fetch(`${base}/spaces/${id}/members`, { cache: "no-store" }).then((r) => r.json()),
        ]);
        const castDate = <T,>(obj: JsonDate<T>): T => {
          const out: any = Array.isArray(obj) ? [] : {};
          for (const [k, v] of Object.entries(obj as any)) {
            if (v && typeof v === "object") {
              out[k] = castDate(v as any);
            } else if (typeof v === "string" && /\d{4}-\d{2}-\d{2}T/.test(v)) {
              const d = new Date(v);
              out[k] = isNaN(d.getTime()) ? v : d;
            } else {
              out[k] = v;
            }
          }
          return out as T;
        };
        setSpace(castDate(s.space));
        setPosts((p.posts as any[]).map((it) => castDate<UiPost>(it)));
        setEvents((e.events as any[]).map((it) => castDate<UiEvent>(it)));
        setMembers((m.members as any[]).map((it) => castDate<UiMember>(it)));
        // Tools and resources are top-level in the API response for convenience
        setTools((s.tools ?? []) as UiTool[]);
        setResources((s.resources ?? []) as UiResource[]);
        setIsMember(s.joinState === "member");
      } catch {
        toast({ title: "Something went wrong", description: "Failed to load space. Try again.", variant: "destructive" as any });
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  // Sync sheet state to URL (?post=...)
  useEffect(() => {
    const pid = search?.get("post") || null;
    setOpenPostId(pid);
  }, [search]);

  // Sync event sheet to URL (?event=...)
  useEffect(() => {
    const eid = search?.get("event") || null;
    setOpenEventId(eid);
  }, [search]);

  const isMemberMemo = useMemo(() => isMember, [isMember]);
  const isLeader = useMemo(() => {
    const pid = state.profileId ?? "demo";
    return members.some((m) => m.userId === pid && (m.role === "leader" || m.role === "moderator"));
  }, [members, state.profileId]);

  const onCreatePost = async (type: "standard" | "event" | "poll" | "announcement") => {
    if (type !== "standard") return; // Only standard post in e2e
    const content = window.prompt("Post content?")?.trim();
    if (!content) return;
    await fetch(`${base}/spaces/${id}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, profileId: state.profileId ?? "demo" })
    });
    const res = await fetch(`${base}/spaces/${id}/posts`, { cache: "no-store" });
    const data = await res.json();
    setPosts((data.posts as any[]).map((it) => ({ ...it, createdAt: new Date(it.createdAt), updatedAt: new Date(it.updatedAt), lastActivityAt: new Date(it.lastActivityAt) })));
    toast({ title: "Posted", description: "Your update is live in the space." });
  };

  const onRsvp = async (eventId: string, status: "going" | "maybe") => {
    await fetch(`${base}/spaces/${id}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, status, profileId: state.profileId ?? "demo" })
    });
    const res = await fetch(`${base}/spaces/${id}/events`, { cache: "no-store" });
    const data = await res.json();
    setEvents((data.events as any[]).map((it) => ({ ...it, startTime: new Date(it.startTime), endTime: new Date(it.endTime), createdAt: new Date(it.createdAt), updatedAt: new Date(it.updatedAt) })));
    toast({ title: status === "going" ? "Going" : "Maybe", description: "RSVP saved. You can change it anytime." });
  };

  const onJoinSpace = async () => {
    await fetch(`/api/spaces/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spaceId: id, profileId: state.profileId ?? "demo" })
    });
    setIsMember(true);
    toast({ title: "Joined", description: "You can now post and use tools." });
  };

  const onLeaveSpace = async () => {
    await fetch(`/api/spaces/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spaceId: id, profileId: state.profileId ?? "demo" })
    });
    setIsMember(false);
    toast({ title: "Left space", description: "You can rejoin anytime." });
  };

  if (loading || !space) {
    return (
      <main className="page px-page py-section">
        <div className="container-page max-w-[var(--shell-max-w)] space-y-4">
          <div className="grid grid-cols-[minmax(0,1fr)_var(--dock-w)] gap-4">
            <div className="space-y-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-[92%]" />
              <Skeleton className="h-24 w-[88%]" />
            </div>
            <div className="hidden md:block space-y-3">
              <Skeleton className="h-52 w-full" />
              <Skeleton className="h-52 w-full" />
              <Skeleton className="h-52 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page px-page py-section">
      <div className="container-page max-w-[var(--shell-max-w)]">
        <SpaceLayout
          space={space}
          isMember={isMemberMemo}
          isLeader={isLeader}
          posts={posts}
          upcomingEvents={events}
          onlineMembers={members}
          recentMembers={members}
          resources={resources}
          tools={tools}
          onCreatePost={onCreatePost}
          onJoinSpace={onJoinSpace}
          onLeaveSpace={onLeaveSpace}
          onEventClick={(eventId) => router.push(`?event=${encodeURIComponent(eventId)}`)}
          onPostClick={(postId) => router.push(`?post=${encodeURIComponent(postId)}`)}
          onRsvp={(eventId, status) => onRsvp(eventId, status as any)}
          onViewAllEvents={() => {
            window.location.assign(`/spaces/${id}/calendar`);
          }}
          onViewRoster={() => {
            window.location.assign(`/spaces/${id}/members`);
          }}
          onViewAllResources={() => {
            window.location.assign(`/spaces/${id}/about`);
          }}
          density="compact"
          focusMode={false}
        />

        {/* Overlays */}
        {openPostId ? (
          <PostDetail
            post={posts.find((p) => p.id === openPostId)!}
            open={true}
            onOpenChange={(open) => { if (!open) router.back(); }}
            mode="sheet"
          />
        ) : null}
        {openEventId ? (
          <EventSheet
            event={events.find((e) => e.id === openEventId)!}
            open={true}
            onOpenChange={(open) => { if (!open) router.back(); }}
            onRSVP={(status) => onRsvp(openEventId, (status === "going" ? "going" : "maybe"))}
          />
        ) : null}
      </div>
    </main>
  );
}
