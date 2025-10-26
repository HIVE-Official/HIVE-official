"use client";
/**
 * SpaceLayout - V5 Architecture
 *
 * Single consolidated layout for Spaces:
 * - 60/40 split (feed-first for discussions)
 * - Clickable tool widgets (Events, Community, Resources, Tools)
 * - Discussions are PRIMARY content (80%)
 * - Events are SECONDARY/pre-seeded (15%)
 * - Inline polls (5%)
 *
 * Uses shadcn primitives and app shell architecture
 */

import React, { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/atoms/button";
import { Tabs, TabsList, TabsTrigger } from "@/molecules/tabs";
import { Textarea } from "@/atoms/textarea";
import { MessageSquare, Calendar, BarChart3, Plus, Send } from "lucide-react";

// Import widgets
import { EventsWidget } from "./widgets/events-widget";
import { CommunityWidget } from "./widgets/community-widget";
import { ToolsWidget } from "./widgets/tools-widget";
import { ResourcesWidget } from "./widgets/resources-widget";
import { AboutPreview } from "./dock";
import { SpaceHeader } from "./space-header";

// Import types
import type { Space, Post, CalendarEvent, SpaceMember } from "./types";
import { FeedList } from "./feed-list";
import type { Resource } from "./widgets/resources-widget";
import type { Tool } from "./widgets/tools-widget";

type ChatMessage = { id: string; text: string; at: Date };
type ChatGroup = {
  key: string;
  dateLabel?: string;
  authorName?: string;
  authorAvatar?: string;
  authorId?: string;
  messages?: ChatMessage[];
};

export interface SpaceLayoutProps {
  /** Space data */
  space: Space;

  /** Is user a member */
  isMember: boolean;

  /** Is user a leader */
  isLeader?: boolean;

  /** Posts (discussions, events, announcements, polls) */
  posts: Post[];

  /** Upcoming events for widget */
  upcomingEvents: CalendarEvent[];

  /** Online members for widget */
  onlineMembers: SpaceMember[];

  /** Recently active members */
  recentMembers?: SpaceMember[];

  /** Pinned resources */
  resources: Resource[];

  /** Active tools */
  tools: Tool[];

  /** User's RSVPs */
  userRsvps?: Record<string, "going" | "maybe">;

  /** Visual density */
  density?: "comfortable" | "compact";
  /** Focus mode — hides Dock (right-side) and widens feed */
  focusMode?: boolean;
  /** Chat-focused rendering (Discord-like). If true, feed renders as chat messages. */
  chatMode?: boolean;
  /** Layout ratio between primary feed and Dock (right-side) */
  layoutRatio?: "60-40" | "65-35";
  /** Optional override for the Dock contents (right-side) */
  rightRail?: React.ReactNode; // legacy prop name
  /** Preferred alias for right-side Dock content */
  dock?: React.ReactNode;

  /** Handlers */
  onJoinSpace?: () => void;
  onLeaveSpace?: () => void;
  onCreatePost?: (type: "standard" | "event" | "poll" | "announcement") => void;
  onPostClick?: (postId: string) => void;
  onEventClick?: (eventId: string) => void;
  onMemberClick?: (userId: string) => void;
  onToolClick?: (toolId: string) => void;
  onResourceClick?: (resourceId: string) => void;
  onRsvp?: (eventId: string, status: "going" | "maybe") => void;

  /** Navigation (breadcrumb click-through) */
  onViewAllEvents?: () => void;
  onViewRoster?: () => void;
  onViewAllResources?: () => void;
  onViewAllTools?: () => void;

  /** Custom class */
  className?: string;

  /** Children (render custom content instead of default posts) */
  children?: React.ReactNode;
}

const SpaceLayout = React.forwardRef<HTMLDivElement, SpaceLayoutProps>(
  (
    {
      space,
      isMember,
      isLeader = false,
      posts,
      upcomingEvents,
      onlineMembers,
      recentMembers,
      resources,
      tools,
      userRsvps,
      density = "compact",
      focusMode,
      chatMode = false,
      onJoinSpace,
      onLeaveSpace,
      onCreatePost,
      onPostClick,
      onEventClick,
      onMemberClick,
      onToolClick,
      onResourceClick,
      onRsvp,
      onViewAllEvents,
      onViewRoster,
      onViewAllResources,
      onViewAllTools,
      className,
      children,
      layoutRatio = "60-40",
      rightRail,
      dock,
    },
    ref
  ) => {
    // Focus mode controlled/uncontrolled (default true if prop omitted)
    const isFocusControlled = typeof focusMode !== "undefined";
    const [internalFocus, setInternalFocus] = useState<boolean>(focusMode ?? false);
    // Persist Dock toggle (hidden when focus is ON)
    React.useEffect(() => {
      if (isFocusControlled) return;
      try {
        const raw = localStorage.getItem("hive.e2e.dockHidden");
        if (raw === "1") setInternalFocus(true);
      } catch (error) {
        console.warn("spaces.layout.read_focus_storage_failed", error);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(() => {
      if (isFocusControlled) setInternalFocus(focusMode as boolean);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusMode]);
    const focusOn = internalFocus;
    const toggleFocus = () => {
      if (isFocusControlled) return;
      setInternalFocus((v) => {
        const next = !v;
        try {
          localStorage.setItem("hive.e2e.dockHidden", next ? "1" : "0");
        } catch (error) {
          console.warn("spaces.layout.write_focus_storage_failed", error);
        }
        return next;
      });
    };

    const [contentFilter, setContentFilter] = useState<
      "all" | "events" | "tools"
    >("all");
    const [showComposerTools, setShowComposerTools] = useState(false);
    const composerTextareaRef = useRef<HTMLTextAreaElement | null>(null);
    const composerBlurTimeout = useRef<ReturnType<typeof setTimeout> | null>(
      null
    );
    const isCompact = density === "compact";
    const feedScrollRef = useRef<HTMLDivElement | null>(null);
    const [isHeaderCompact, setIsHeaderCompact] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);
    const lastSeenRef = useRef<number>(0);
    React.useEffect(() => {
      const el = feedScrollRef.current;
      if (!el) return;
      const onScroll = () => {
        setIsHeaderCompact(el.scrollTop > 24);
        const distanceFromBottom = el.scrollHeight - (el.scrollTop + el.clientHeight);
        const atBottom = distanceFromBottom < 80; // threshold
        setIsAtBottom(atBottom);
      };
      el.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => el.removeEventListener("scroll", onScroll);
    }, []);

    // (moved) chat auto-scroll effect sits after chatItems definition

    const scrollToBottom = () => {
      const el = feedScrollRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
      setIsAtBottom(true);
      const latestTime = Math.max(0, ...filteredPosts.map((p) => p.createdAt.getTime()));
      lastSeenRef.current = latestTime;
      setUnreadCount(0);
    };

    // Filter posts based on content filter
    const filteredPosts = React.useMemo(() => {
      if (contentFilter === "all") return posts;
      if (contentFilter === "events")
        return posts.filter((p) => p.type === "event");
      if (contentFilter === "tools")
        return posts.filter((p) => Boolean(p.toolContext));
      return posts;
    }, [posts, contentFilter]);

    // Chat rendering groups messages by author within 5 minutes and adds day separators
    const chatItems = React.useMemo<ChatGroup[]>(() => {
      if (!chatMode) return [] as ChatGroup[];
      const items = [...filteredPosts].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      const groups: ChatGroup[] = [];
      let lastDate = "";
      let lastAuthor = "";
      let lastTime = 0;
      for (const it of items) {
        const day = it.createdAt.toDateString();
        if (day !== lastDate) {
          groups.push({ key: `sep-${day}`, dateLabel: day });
          lastDate = day;
          lastAuthor = "";
          lastTime = 0;
        }
        const within5m = Math.abs(it.createdAt.getTime() - lastTime) < 5 * 60 * 1000;
        if (it.authorId === lastAuthor && within5m && groups.length) {
          const g = groups[groups.length - 1];
          (g.messages ??= []).push({ id: it.id, text: (it as any).content ?? it.type, at: it.createdAt });
        } else {
          groups.push({
            key: `grp-${it.id}`,
            authorName: it.authorName,
            authorAvatar: it.authorAvatar,
            authorId: it.authorId,
            messages: [{ id: it.id, text: (it as any).content ?? it.type, at: it.createdAt }]
          });
          lastAuthor = it.authorId;
          lastTime = it.createdAt.getTime();
        }
      }
      return groups;
    }, [filteredPosts, chatMode]);

    // Chat: keep most recent at the bottom by default
    React.useEffect(() => {
      if (!chatMode) return;
      const el = feedScrollRef.current;
      if (!el) return;
      const latestTime = Math.max(0, ...filteredPosts.map((p) => p.createdAt.getTime()));
      if (isAtBottom) {
        lastSeenRef.current = latestTime;
        el.scrollTop = el.scrollHeight;
        setUnreadCount(0);
      } else {
        const unseen = filteredPosts.filter((p) => p.createdAt.getTime() > lastSeenRef.current).length;
        setUnreadCount(unseen);
      }
    }, [chatMode, chatItems, filteredPosts, isAtBottom]);

    const handleComposerFocus = () => {
      if (composerBlurTimeout.current) {
        clearTimeout(composerBlurTimeout.current);
        composerBlurTimeout.current = null;
      }
      setShowComposerTools(true);
    };

    const handleComposerBlur = () => {
      composerBlurTimeout.current = setTimeout(() => {
        setShowComposerTools(false);
      }, 120);
    };

    const handleComposerInput: React.FormEventHandler<HTMLTextAreaElement> = (
      event
    ) => {
      const target = event.currentTarget;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
      setShowComposerTools(true);
    };

    const handleToggleComposerTools = () => {
      const next = !showComposerTools;
      setShowComposerTools(next);
      if (next) {
        composerTextareaRef.current?.focus();
      }
    };

    const handleToolSelect = (
      type: "standard" | "event" | "poll" | "announcement"
    ) => {
      onCreatePost?.(type);
      setShowComposerTools(false);
    };

    // Separate pinned posts
    const pinnedPosts = filteredPosts.filter((p) => p.isPinned);

    return (
      <div
        ref={ref}
        data-density={density}
        data-layout-ratio={layoutRatio}
        className={cn("h-full bg-background grid", className)}
        style={{ gridTemplateRows: "auto 1fr" }}
      >
        {/* Header */}
        <div className="border-b border-primary/10 bg-background sticky top-0 z-10" data-compact={isHeaderCompact || undefined}>
          <div className={cn("mx-auto w-full max-w-[var(--shell-max-w)] px-[var(--shell-gutter)]", isHeaderCompact ? "py-2" : "py-3")}>
            <div className="flex items-start justify-between gap-[var(--section-gap)]">
              <div className="flex-1 min-w-0">
                <SpaceHeader
                  space={space}
                  joinState={isMember ? "member" : "not_member"}
                  isLeaderOrMod={isLeader}
                  onJoin={onJoinSpace}
                  className="mt-2"
                  policy={{ posting: (space.postingPolicy === "leaders_only" ? "leaders_only" : "open") as any }}
                />
              </div>
              {/* Right-side header controls */}
              <div className="flex-none flex items-center gap-2">
                {isMember && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onLeaveSpace}
                    className="text-muted-foreground hover:text-destructive hover:border-destructive"
                  >
                    Leave Space
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={toggleFocus} aria-pressed={!focusOn} aria-controls="space-dock" aria-expanded={!focusOn}>
                  {focusOn ? "Show Dock" : "Hide Dock"}
                </Button>
              </div>
            </div>
            {/* Tabs stay with feed per Spaces IA (calm social) */}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          <div
            className={cn(
              "mx-auto w-full max-w-[var(--shell-max-w)] px-[var(--shell-gutter)]",
              "grid gap-[var(--section-gap)]",
              focusOn ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[minmax(0,1fr)_var(--dock-w)]"
            )}
          >
          {/* Feed Column */}
          <section
            aria-label="Activity feed"
            className={cn("min-w-0 flex flex-col overflow-hidden")}
          >
            {/* Content Filter Tabs (feed-local) */}
            <div className={cn("flex-none border-b border-border", isCompact ? "py-2" : "py-3")}> 
              <Tabs value={contentFilter} onValueChange={(v: string) => setContentFilter(v as "all" | "events" | "tools")}> 
                <TabsList aria-label="Content filter" className="grid w-full max-w-md grid-cols-3"> 
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="tools">Tools</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {/* Feed Content */}
            <div ref={feedScrollRef} className={cn("relative flex-1 overflow-y-auto pb-28 pt-3", isCompact && "pt-1.5")}>  
              {children || (
                chatMode ? (
                  <div className="max-w-3xl">
                    {chatItems.map((g) =>
                      g.dateLabel ? (
                        <div key={g.key} className="relative my-3 text-center">
                          <span className="inline-block px-2 py-0.5 text-caption text-muted-foreground bg-muted/40 rounded-full border border-border/60">
                            {g.dateLabel}
                          </span>
                        </div>
                      ) : (
                        <div key={g.key} className="flex items-start gap-3 py-1.5 px-2 rounded-lg hover:bg-muted/30">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={g.authorAvatar} alt="" className="h-8 w-8 rounded-full border border-border/60 object-cover" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-2">
                              <span className="text-body font-medium text-foreground truncate">{g.authorName}</span>
                            </div>
                            {g.messages?.map((m) => (
                              <p key={m.id} className="text-body-sm text-foreground/95 leading-relaxed break-words">
                                {m.text}
                              </p>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className={cn("max-w-3xl", isCompact && "space-y-1.5")}> 
                    <FeedList
                      posts={filteredPosts as Post[]}
                      pinned={pinnedPosts as Post[]}
                      onOpenPost={(post) => onPostClick?.(post.id)}
                    />
                  </div>
                )
              )}
              {chatMode && !isAtBottom && (
                <div className="absolute bottom-4 right-4">
                  <Button variant="outline" size="sm" onClick={scrollToBottom} className="shadow-md bg-background/90 backdrop-blur">
                    Jump to present{unreadCount > 0 ? ` (${unreadCount})` : ""}
                  </Button>
                </div>
              )}
            </div>

            {isMember ? (
              <div className="flex-none py-4 border-t border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur">
                <div className="flex flex-col gap-3">
                  <div className="flex items-end gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-10 w-10 border border-border/60",
                        showComposerTools && "bg-primary/10 border-primary/50"
                      )}
                      onClick={handleToggleComposerTools}
                      aria-label={
                        showComposerTools ? "Hide composer tools" : "Show composer tools"
                      }
                    >
                      <Plus
                        className={cn(
                          "h-4 w-4 transition-transform",
                          showComposerTools && "rotate-45"
                        )}
                      />
                    </Button>

                    <Textarea
                      ref={composerTextareaRef}
                      placeholder="Share an update…"
                      className="min-h-[44px] max-h-[160px] flex-1 resize-none rounded-xl border border-border bg-muted/50 px-4 py-2 text-body focus:border-primary focus:ring-2 focus:ring-primary/20"
                      onFocus={handleComposerFocus}
                      onBlur={handleComposerBlur}
                      onInput={handleComposerInput}
                      rows={1}
                    />

                    <Button
                      type="button"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => handleToolSelect("standard")}
                      aria-label="Send post"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  {showComposerTools && (
                    <div
                      className="flex flex-wrap gap-2"
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="gap-1 text-xs"
                        onClick={() => handleToolSelect("standard")}
                      >
                        <MessageSquare className="h-3 w-3" />
                        Post
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="gap-1 text-xs"
                        onClick={() => handleToolSelect("event")}
                      >
                        <Calendar className="h-3 w-3" />
                        Event
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="gap-1 text-xs"
                        onClick={() => handleToolSelect("poll")}
                      >
                        <BarChart3 className="h-3 w-3" />
                        Poll
                      </Button>
                      {isLeader && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="gap-1 text-xs text-primary"
                          onClick={() => handleToolSelect("announcement")}
                        >
                          📢 Announcement
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-none py-4 border-t border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-body-sm text-muted-foreground">
                    Join this space to start posting and unlock tools.
                  </p>
                  {onJoinSpace && (
                    <Button size="sm" onClick={onJoinSpace}>
                      Join Space
                    </Button>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Dock (right-side) — Desktop Only */}
          {!focusOn && (
            <aside id="space-dock" aria-label="Dock" className={cn("hidden md:flex flex-col border-l border-border bg-card/30")}> 
              <div className="sticky" style={{ top: "calc(var(--header-h) + 8px)" }}>
                <div className="p-4 space-y-4">
                  {(dock ?? rightRail) ? (
                    (dock ?? rightRail) as React.ReactNode
                  ) : chatMode ? (
                    <>
                      <CommunityWidget
                        onlineMembers={onlineMembers}
                        recentMembers={recentMembers}
                        totalMembers={space.memberCount}
                        onMemberClick={onMemberClick}
                        onViewRoster={onViewRoster}
                      />
                      <ToolsWidget
                        tools={tools}
                        canManage={isLeader}
                        onToolClick={onToolClick}
                        onViewAllTools={onViewAllTools}
                        variant="peek"
                      />
                      <EventsWidget
                        upcomingEvents={upcomingEvents}
                        userRsvps={userRsvps}
                        onEventClick={onEventClick}
                        onViewAllEvents={onViewAllEvents}
                        onRsvp={onRsvp}
                      />
                      <AboutPreview
                        description={space.description}
                        tags={space.tags}
                        featuredLinks={space.featuredLinks}
                        isVerified={space.isVerified}
                        spaceType={space.type.replace("_", " ")}
                        onViewMore={onViewAllResources}
                      />
                      <ResourcesWidget
                        resources={resources}
                        onResourceClick={onResourceClick}
                        onViewAll={onViewAllResources}
                        canManage={isLeader}
                      />
                    </>
                  ) : (
                    <>
                      <EventsWidget
                        upcomingEvents={upcomingEvents}
                        userRsvps={userRsvps}
                        onEventClick={onEventClick}
                        onViewAllEvents={onViewAllEvents}
                        onRsvp={onRsvp}
                      />
                      <CommunityWidget
                        onlineMembers={onlineMembers}
                        recentMembers={recentMembers}
                        totalMembers={space.memberCount}
                        onMemberClick={onMemberClick}
                        onViewRoster={onViewRoster}
                      />
                      <AboutPreview
                        description={space.description}
                        tags={space.tags}
                        featuredLinks={space.featuredLinks}
                        isVerified={space.isVerified}
                        spaceType={space.type.replace("_", " ")}
                        onViewMore={onViewAllResources}
                      />
                      <ResourcesWidget
                        resources={resources}
                        onResourceClick={onResourceClick}
                        onViewAll={onViewAllResources}
                        canManage={isLeader}
                      />
                      <ToolsWidget
                        tools={tools}
                        canManage={isLeader}
                        onToolClick={onToolClick}
                        onViewAllTools={onViewAllTools}
                        variant="peek"
                      />
                    </>
                  )}
                </div>
              </div>
            </aside>
          )}
          </div>
        </div>
      </div>
    );
  }
);

SpaceLayout.displayName = "SpaceLayout";

export { SpaceLayout };
