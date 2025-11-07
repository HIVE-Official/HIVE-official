import * as React from "react";

import { Badge } from "../../atomic/00-Global/atoms/badge";
import { Button } from "../../atomic/00-Global/atoms/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../atomic/00-Global/atoms/avatar";
import { Surface } from "../../layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../atomic/00-Global/atoms/tabs";
import { cn } from "../../lib/utils";

export interface FeedPostAuthor {
  name: string;
  handle: string;
  campusRole: string;
  avatarInitials?: string;
  avatarUrl?: string;
  badges?: string[];
}

export interface FeedPostMedia {
  type: "image" | "gallery";
  url: string;
  alt?: string;
}

export interface FeedPostStats {
  applause: number;
  replies: number;
  reposts?: number;
  saves?: number;
}

export interface FeedPost {
  id: string;
  author: FeedPostAuthor;
  title?: string;
  content: string;
  postedAt: string;
  campusLocation?: string;
  tags?: string[];
  media?: FeedPostMedia[];
  stats: FeedPostStats;
  pinned?: boolean;
}

export interface FeedRitual {
  id: string;
  title: string;
  time: string;
  location: string;
  status?: "live" | "up-next" | "prep";
}

export interface FeedTrendingSpace {
  id: string;
  name: string;
  category: string;
  members: number;
  status?: "live" | "calm" | "growing";
}

export interface FeedPageProps {
  campusName?: string;
  userName?: string;
  activeTab?: string;
  posts?: FeedPost[];
  rituals?: FeedRitual[];
  trendingSpaces?: FeedTrendingSpace[];
  announcements?: string[];
  quickActions?: Array<{ id: string; label: string; description: string }>;
  onTabChange?: (tab: string) => void;
}

const DEFAULT_POSTS: FeedPost[] = [
  {
    id: "ritual-prep",
    author: {
      name: "Laney Fraass",
      handle: "laney",
      campusRole: "Student Lead · HiveLab",
      badges: ["Host", "Verified"],
      avatarInitials: "LF",
    },
    title: "Tonight at UB · Ritual Launch",
    content:
      "We’re unlocking a late-night maker lab for Robotics + Design. RSVP to secure your badge and bring a friend—spaces are capped at 45 seats.",
    postedAt: "6 minutes ago",
    campusLocation: "UB Foundry · Innovation Wing",
    tags: ["Ritual", "Maker Lab", "Late Night"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80",
        alt: "Students collaborating in a robotics lab",
      },
    ],
    stats: {
      applause: 128,
      replies: 14,
      reposts: 8,
      saves: 36,
    },
    pinned: true,
  },
  {
    id: "campus-mural",
    author: {
      name: "Ava Patel",
      handle: "ava.patel",
      campusRole: "Arts Council · UB Student",
      avatarInitials: "AP",
      badges: ["Arts & Culture"],
    },
    content:
      "We finished the campus mural! Drop by the Student Union east wall to sign your name. Open until 10PM, paint and drop cloths ready.",
    postedAt: "45 minutes ago",
    tags: ["Arts", "Campus Pride"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
        alt: "Colorful campus mural with students painting",
      },
    ],
    stats: {
      applause: 86,
      replies: 9,
      saves: 21,
    },
  },
  {
    id: "cs-hack",
    author: {
      name: "UB Hackers",
      handle: "ubhackers",
      campusRole: "Student Org",
      avatarInitials: "UB",
    },
    content:
      "CS Hacknight is live in Baldy 21. Bring a project, join a crew, or test a new HiveLab tool. Pizza arrives at 9:15pm.",
    postedAt: "1 hour ago",
    tags: ["Hacknight", "Open Lab"],
    stats: {
      applause: 52,
      replies: 4,
      saves: 19,
    },
  },
];

const DEFAULT_RITUALS: FeedRitual[] = [
  {
    id: "ritual-1",
    title: "Campus Film Festival Pitch Review",
    time: "7:30 PM · Tonight",
    location: "Student Union Theater",
    status: "live",
  },
  {
    id: "ritual-2",
    title: "Robotics Lab · After Hours",
    time: "9:00 PM · Tonight",
    location: "Innovation Wing · Foundry",
    status: "up-next",
  },
  {
    id: "ritual-3",
    title: "Sunrise Trail Run",
    time: "6:15 AM · Tomorrow",
    location: "Lake LaSalle Trailhead",
    status: "prep",
  },
];

const DEFAULT_SPACES: FeedTrendingSpace[] = [
  {
    id: "space-robotics",
    name: "UB Robotics Collective",
    category: "STEM Builders",
    members: 842,
    status: "live",
  },
  {
    id: "space-cultural",
    name: "Cultural Mosaic",
    category: "Community & Culture",
    members: 623,
    status: "growing",
  },
  {
    id: "space-sustain",
    name: "Sustainability Studio",
    category: "Campus Impact",
    members: 506,
    status: "calm",
  },
];

const DEFAULT_ACTIONS: Array<{ id: string; label: string; description: string }> = [
  { id: "share", label: "Share ritual photos", description: "Drop highlights from tonight’s events." },
  { id: "start", label: "Start a pop-up space", description: "Host a lightweight campus pop-up." },
  { id: "build", label: "Prototype in HiveLab", description: "Spin up a tool or automation." },
];

const STATUS_TONE: Record<FeedRitual["status"], string> = {
  live: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success-text,#bef0c2)]",
  "up-next": "bg-[var(--hive-brand-primary,#ffd166)]/15 text-[var(--hive-brand-primary,#ffd166)]",
  prep: "bg-[var(--hive-text-muted,#9aa3b6)]/15 text-[var(--hive-text-muted,#9aa3b6)]",
};

function FeedPostCard({ post }: { post: FeedPost }) {
  return (
    <Surface
      elevation="sm"
      padding="lg"
      className={cn(
        "space-y-5 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)]",
        post.pinned && "ring-2 ring-[var(--hive-brand-primary,#ffd166)]/60",
      )}
    >
      <header className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          {post.author.avatarUrl ? (
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
          ) : (
            <AvatarFallback>{post.author.avatarInitials ?? post.author.name.slice(0, 2)}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-[var(--hive-text-primary,#f7f7ff)]">
              {post.author.name}
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--hive-text-muted,#9297a8)]">
              {post.author.campusRole}
            </span>
            {post.pinned ? (
              <Badge tone="contrast" variant="pill">
                Pinned
              </Badge>
            ) : null}
          </div>
          <p className="text-sm text-[var(--hive-text-secondary,#c9cad6)]">@{post.author.handle}</p>
          {post.title ? (
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]">
              {post.title}
            </h3>
          ) : null}
        </div>
        <span className="text-xs text-[var(--hive-text-muted,#9093a0)]">{post.postedAt}</span>
      </header>

      <p className="text-sm leading-6 text-[var(--hive-text-primary,#f5f5ff)]">{post.content}</p>

      {post.media && post.media.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-[var(--hive-border-subtle,#282a3a)]">
          {post.media[0].type === "image" ? (
            <img
              src={post.media[0].url}
              alt={post.media[0].alt ?? ""}
              className="max-h-[420px] w-full object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
      ) : null}

      {post.tags && post.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} tone="muted" variant="pill">
              #{tag.replace(/\s+/g, "").toLowerCase()}
            </Badge>
          ))}
        </div>
      ) : null}

      <footer className="flex flex-wrap items-center gap-4 text-xs text-[var(--hive-text-muted,#8f94a3)]">
        <button type="button" className="flex items-center gap-2 hover:text-[var(--hive-text-primary,#f5f5ff)]">
          <span role="img" aria-hidden>
            🔥
          </span>
          Applause {post.stats.applause.toLocaleString()}
        </button>
        <button type="button" className="flex items-center gap-2 hover:text-[var(--hive-text-primary,#f5f5ff)]">
          <span role="img" aria-hidden>
            💬
          </span>
          Replies {post.stats.replies}
        </button>
        {post.stats.reposts !== undefined ? (
          <button type="button" className="flex items-center gap-2 hover:text-[var(--hive-text-primary,#f5f5ff)]">
            <span role="img" aria-hidden>
              🔁
            </span>
            Boosts {post.stats.reposts}
          </button>
        ) : null}
        {post.stats.saves !== undefined ? (
          <button type="button" className="flex items-center gap-2 hover:text-[var(--hive-text-primary,#f5f5ff)]">
            <span role="img" aria-hidden>
              📌
            </span>
            Saves {post.stats.saves}
          </button>
        ) : null}
      </footer>
    </Surface>
  );
}

function QuickActionList({
  actions,
}: {
  actions: NonNullable<FeedPageProps["quickActions"]>;
}) {
  return (
    <Surface
      elevation="sm"
      padding="lg"
      className="space-y-4 rounded-3xl bg-[var(--hive-background-secondary,#11131f)]"
    >
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">Actions</h3>
          <p className="text-xs text-[var(--hive-text-muted,#9aa1b5)]">Ship something before midnight.</p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs uppercase tracking-[0.2em]">
          View all
        </Button>
      </header>
      <ul className="space-y-3">
        {actions.map((action) => (
          <li key={action.id} className="flex items-start gap-3">
            <span className="mt-1 rounded-full bg-[var(--hive-background-tertiary,#181a26)] px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--hive-text-muted,#8c92a3)]">
              {action.id}
            </span>
            <div>
              <p className="text-sm font-medium text-[var(--hive-text-primary,#f5f5ff)]">{action.label}</p>
              <p className="text-xs text-[var(--hive-text-secondary,#c3c4d5)]">{action.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Surface>
  );
}

function RitualList({ rituals }: { rituals: FeedRitual[] }) {
  return (
    <Surface
      elevation="sm"
      padding="lg"
      className="space-y-5 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)]"
    >
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#fdfdff)]">Ritual Watch</h3>
          <p className="text-xs text-[var(--hive-text-muted,#949ab0)]">Keep UB’s cadence tight.</p>
        </div>
        <Button variant="secondary" size="sm">
          Submit
        </Button>
      </header>
      <ul className="space-y-4">
        {rituals.map((ritual) => (
          <li key={ritual.id} className="flex items-start justify-between gap-3 rounded-2xl bg-[var(--hive-background-tertiary,#171827)] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">{ritual.title}</p>
              <p className="text-xs text-[var(--hive-text-secondary,#c5c6d9)]">{ritual.time} · {ritual.location}</p>
            </div>
            {ritual.status ? (
              <span className={cn("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]", STATUS_TONE[ritual.status])}>
                {ritual.status === "live" ? "Live" : ritual.status === "up-next" ? "Up next" : "Prep"}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </Surface>
  );
}

function TrendingSpaces({ spaces }: { spaces: FeedTrendingSpace[] }) {
  return (
    <Surface
      elevation="sm"
      padding="lg"
      className="space-y-4 rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)]"
    >
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[var(--hive-text-primary,#fdfdff)]">Trending Spaces</h3>
          <p className="text-xs text-[var(--hive-text-muted,#969bb2)]">Campus squads gaining momentum.</p>
        </div>
        <Button variant="ghost" size="sm">
          See all
        </Button>
      </header>
      <ul className="space-y-4">
        {spaces.map((space) => (
          <li key={space.id} className="flex items-center justify-between gap-3 rounded-2xl bg-[var(--hive-background-tertiary,#161822)] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">{space.name}</p>
              <p className="text-xs text-[var(--hive-text-secondary,#c5c7d3)]">
                {space.category} · {space.members.toLocaleString()} members
              </p>
            </div>
            {space.status ? (
              <Badge tone="muted" variant="pill">
                {space.status === "live" ? "Live" : space.status === "growing" ? "Growing" : "Calm"}
              </Badge>
            ) : null}
          </li>
        ))}
      </ul>
    </Surface>
  );
}

export function FeedPage({
  campusName = "UB",
  userName = "Laney",
  activeTab = "all",
  posts = DEFAULT_POSTS,
  rituals = DEFAULT_RITUALS,
  trendingSpaces = DEFAULT_SPACES,
  announcements = ["Feed focus mode is live for UB campus leaders.", "HiveLab prototypes auto-sync with Spaces you've joined."],
  quickActions = DEFAULT_ACTIONS,
  onTabChange,
}: FeedPageProps) {
  return (
    <div className="min-h-screen bg-[var(--hive-background-page,#07080d)] text-[var(--hive-text-primary,#f7f7ff)]">
      <div className="border-b border-[var(--hive-border-subtle,#1d1f2c)] bg-[var(--hive-background-secondary,#10111a)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--hive-text-muted,#949ab8)]">{campusName} Campus Feed</p>
            <h1 className="text-3xl font-semibold text-[var(--hive-text-primary,#fefefe)]">Tonight at {campusName}</h1>
            <p className="text-sm text-[var(--hive-text-secondary,#c9ccda)]">
              {userName}, curate the rituals, spaces, and tools that keep UB moving.
            </p>
          </div>
          <Button size="lg" variant="primary" className="self-start md:self-auto">
            Compose update
          </Button>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Surface className="space-y-5 rounded-3xl bg-[var(--hive-background-secondary,#10111a)] px-6 py-5">
            <Tabs
              defaultValue={activeTab}
              className="w-full"
              onValueChange={onTabChange}
            >
              <TabsList className="bg-[var(--hive-background-tertiary,#171827)] text-[var(--hive-text-muted,#9398af)]" variant="pills">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="rituals">Rituals</TabsTrigger>
                <TabsTrigger value="spaces">Spaces</TabsTrigger>
                <TabsTrigger value="tools">HiveLab</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <p className="text-xs text-[var(--hive-text-muted,#8e94a5)]">
                  Hive curates posts from verified campus hosts plus your subscribed spaces.
                </p>
              </TabsContent>
            </Tabs>

            {announcements.length > 0 ? (
              <div className="grid gap-3 rounded-2xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-tertiary,#181a27)] p-4 md:grid-cols-2">
                {announcements.map((announcement) => (
                  <div key={announcement} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1 text-lg">
                      📣
                    </span>
                    <p className="text-sm text-[var(--hive-text-secondary,#c7c9d8)]">{announcement}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </Surface>

          {posts.map((post) => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </div>

        <aside className="space-y-6">
          <QuickActionList actions={quickActions} />
          <RitualList rituals={rituals} />
          <TrendingSpaces spaces={trendingSpaces} />
        </aside>
      </main>
    </div>
  );
}

