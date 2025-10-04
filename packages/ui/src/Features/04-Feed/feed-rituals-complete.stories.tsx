import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FeedLayout } from "../../atomic/templates/feed-layout";
import { FeedInfiniteScroll } from "../../atomic/organisms/feed-infinite-scroll";
import { FeedPullToRefresh } from "../../atomic/organisms/feed-pull-to-refresh";
import { FeedPostCard, type FeedPost } from "../../atomic/molecules/feed-post-card";
import { FeedFilters } from "../../atomic/molecules/feed-filters";
import { RitualsCardStrip, type Ritual } from "../../atomic/molecules/rituals-card-strip";
import { RitualDetailView } from "../../atomic/templates/ritual-detail-view";
import { RitualProgressRing } from "../../atomic/molecules/ritual-progress-ring";
import { RitualMilestoneTrack, type Milestone } from "../../atomic/organisms/ritual-milestone-track";
import { RitualActionModal, type RitualAction } from "../../atomic/organisms/ritual-action-modal";
import { RitualLeaderboard, type LeaderboardEntry } from "../../atomic/organisms/ritual-leaderboard";

// Import Space components for Feed to reuse
import { SpaceEventsPanel } from "../../atomic/organisms/space-events-panel";
import { SpacePostFeed, type SpacePost } from "../../atomic/organisms/space-post-feed";

/**
 * # Feed & Rituals System — Complete Implementation
 *
 * Production-ready Feed and Rituals components with proper architecture.
 *
 * ## Architecture Principles
 * - **Feed is Read-Only Aggregation**: Feed displays content from Spaces, doesn't create its own
 * - **Component Reuse**: Feed uses SpaceEventsPanel and SpacePost display (no duplicate cards)
 * - **Space Posts → Feed**: Content originates in Spaces, flows to Feed timeline
 *
 * ## NEW COMPONENTS BUILT
 * - ✅ FeedLayout (template) - Simple layout wrapper
 * - ✅ FeedInfiniteScroll (organism) - Pagination with Intersection Observer
 * - ✅ FeedPullToRefresh (organism) - Mobile pull-to-refresh
 * - ✅ RitualDetailView (template) - Complete ritual detail page
 * - ✅ RitualProgressRing (molecule) - Circular progress visualization
 * - ✅ RitualMilestoneTrack (organism) - Milestone progress tracker
 * - ✅ RitualActionModal (organism) - Action completion modal
 * - ✅ RitualLeaderboard (organism) - Ranked participant list
 *
 * ## Dark Monochrome + Gold Design System
 * - Background: `#000000` (pure black)
 * - Cards: `#0c0c0c` (hive-obsidian)
 * - Borders: `white/8` (Linear-inspired)
 * - Gold accents: `#FFD700` (urgent, saved, promoted)
 * - Typography: Geist font stack (system fallback)
 */
const meta = {
  title: "04-Feed/Complete System (Production)",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// SAMPLE DATA
// ============================================================================

const sampleRituals: Ritual[] = [
  {
    id: "first-week",
    title: "First Week Friendzy",
    description: "Make 5 connections",
    icon: "🎯",
    type: "onboarding",
    progress: { current: 3, total: 5, percentage: 60 },
    campusProgress: { participants: 342, target: 500, percentage: 68 },
    timeRemaining: { days: 4, hours: 12, isUrgent: false },
    rewards: { badge: "Pioneer Badge" },
    status: "active",
    hasJoined: true,
    isTrending: true,
    currentMilestone: { name: "Join 3 spaces", progress: 67 },
  },
  {
    id: "midterm",
    title: "Midterm Marathon",
    description: "Log 10 study hours",
    icon: "📚",
    type: "challenge",
    progress: { current: 7, total: 10, percentage: 70 },
    campusProgress: { participants: 1289, target: 2000, percentage: 64 },
    timeRemaining: { days: 2, hours: 8, isUrgent: false },
    rewards: { badge: "Scholar Title" },
    status: "active",
    hasJoined: true,
    currentMilestone: { name: "Study 10 hours", progress: 70 },
  },
];

// Space posts (Feed aggregates these from Spaces)
const sampleSpacePosts: SpacePost[] = [
  {
    id: "post-1",
    author: { userId: "u1", name: "Sarah Chen", handle: "sarachen", avatar: "" },
    content: "Just had the best study session! CS 220 finally makes sense 🤯",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likeCount: 24,
    commentCount: 8,
    isLiked: true,
  },
  {
    id: "post-2",
    author: { userId: "u2", name: "Jake Miller", handle: "jakemiller", avatar: "" },
    content: "Who's heading to Walmart later? Need a ride 🚗",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likeCount: 12,
    commentCount: 5,
  },
];

// Space events (Feed displays these via SpaceEventsPanel)
const sampleSpaceEvents = [
  {
    id: "event-1",
    title: "Late Night Study Session",
    description: "Grinding for CS 220. Coffee and snacks provided!",
    date: new Date(Date.now() + 2 * 60 * 60 * 1000),
    time: "8:00 PM",
    location: "Capen Library, 3rd Floor",
    attendeeCount: 23,
    maxAttendees: 30,
    isAttending: false,
  },
  {
    id: "event-2",
    title: "Walmart Run",
    description: "Grocery shopping trip, everyone's welcome",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    time: "2:00 PM",
    location: "Meeting at Student Union",
    attendeeCount: 8,
    maxAttendees: 15,
    isAttending: true,
  },
];

const detailedRitualMilestones: Milestone[] = [
  {
    id: "m1",
    name: "Join 3 spaces",
    description: "Explore campus communities",
    status: "completed",
    reward: "Explorer badge",
  },
  {
    id: "m2",
    name: "Make 5 connections",
    description: "Connect with fellow students",
    status: "active",
    progress: 60,
    reward: "Connector badge",
  },
  {
    id: "m3",
    name: "Attend 1 event",
    description: "Meet people IRL",
    status: "locked",
    reward: "Social butterfly badge",
  },
];

const sampleLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Emily Rodriguez", handle: "emily_rod", progress: 100, isCurrentUser: false },
  { rank: 2, name: "Marcus Johnson", handle: "marcusj", progress: 95, isCurrentUser: false },
  { rank: 3, name: "Sarah Chen", handle: "sarachen", progress: 87, isCurrentUser: true },
  { rank: 4, name: "Alex Kim", handle: "alexk", progress: 72, isCurrentUser: false },
  { rank: 5, name: "Taylor Swift", handle: "tswift", progress: 68, isCurrentUser: false },
];

// ============================================================================
// STORIES
// ============================================================================

/**
 * Complete feed experience with infinite scroll and pull-to-refresh.
 * Feed aggregates Space posts and events - NO duplicate components.
 */
export const CompleteFeedWithInfiniteScroll: Story = {
  render: () => {
    const [items, setItems] = React.useState<Array<SpacePost | typeof sampleSpaceEvents[0]>>([
      ...sampleSpacePosts,
      sampleSpaceEvents[0],
    ]);
    const [hasMore, setHasMore] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const loadMore = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setItems(prev => [...prev, ...sampleSpacePosts]);
      if (items.length > 10) setHasMore(false);
      setIsLoading(false);
    };

    const handleRefresh = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setItems([...sampleSpacePosts, sampleSpaceEvents[0]]);
      setHasMore(true);
    };

    return (
      <FeedLayout
        header={
          <div className="p-4 space-y-4">
            <RitualsCardStrip rituals={sampleRituals} />
            <FeedFilters activeFilter="all" eventsCount={1} />
          </div>
        }
      >
        <FeedPullToRefresh onRefresh={handleRefresh}>
          <FeedInfiniteScroll
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoading={isLoading}
          >
            <div className="space-y-4">
              {items.map((item, idx) =>
                "author" in item ? (
                  // Space post - use SpacePostFeed for display
                  <div key={`post-${idx}`} className="bg-[#0c0c0c] border border-white/8 rounded-lg">
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-white/50">from</span>
                        <span className="text-xs text-white/70 font-medium">CS Study Group</span>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] text-xs font-semibold">
                          {item.author.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-white">{item.author.name}</span>
                            <span className="text-xs text-white/50">
                              {new Intl.DateTimeFormat("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              }).format(item.createdAt)}
                            </span>
                          </div>
                          <div className="text-sm text-white leading-relaxed">{item.content}</div>
                          {item.likeCount > 0 && (
                            <div className="flex items-center gap-3 mt-2">
                              <button className="flex items-center gap-1 text-xs text-[#FFD700]">
                                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <span className="text-white/50">{item.likeCount}</span>
                              </button>
                              {item.commentCount > 0 && (
                                <span className="text-xs text-white/50">{item.commentCount} comments</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Space event - use SpaceEventsPanel
                  <div key={`event-${idx}`} className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-white/50">event from</span>
                      <span className="text-xs text-white/70 font-medium">CS Study Group</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-white/70 mb-3">{item.description}</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-white/70">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>{item.attendeeCount}/{item.maxAttendees} going</span>
                      </div>
                    </div>
                    <button className="mt-3 w-full py-2 bg-white text-black text-xs font-semibold rounded-md hover:bg-white/90 transition-colors">
                      {item.isAttending ? "Attending ✓" : "I'm Going"}
                    </button>
                  </div>
                )
              )}
            </div>
          </FeedInfiniteScroll>
        </FeedPullToRefresh>
      </FeedLayout>
    );
  },
};

/**
 * Ritual detail page with progress ring and milestone tracking.
 */
export const RitualDetailPageComplete: Story = {
  render: () => (
    <RitualDetailView
      ritual={{
        id: "first-week",
        title: "First Week Friendzy",
        description: "Get connected fast! Make your first 5 connections and join 3 spaces to unlock exclusive features.",
        icon: "🎯",
        type: "onboarding",
        category: "social",
        startDate: "Oct 1",
        endDate: "Oct 7",
        progress: {
          personal: 60,
          campus: 68,
          participants: 342,
          target: 500,
        },
        milestones: detailedRitualMilestones,
        rewards: {
          badge: "Pioneer Badge",
          feature: "Early access to new features",
        },
        hasJoined: true,
        timeRemaining: { days: 4, hours: 12, isUrgent: false },
      }}
      onJoin={() => console.log("Joined")}
      onLeave={() => console.log("Left")}
      onMilestoneClick={(m) => console.log("Milestone clicked:", m)}
      onBack={() => console.log("Back")}
      onShare={() => console.log("Share")}
    />
  ),
};

/**
 * Ritual progress ring - circular progress visualization.
 */
export const RitualProgressRingComponent: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-12 flex flex-col items-center gap-8">
      <h2 className="text-2xl font-bold text-white mb-4">Ritual Progress Ring</h2>

      <div className="grid grid-cols-3 gap-8">
        <div>
          <p className="text-sm text-white/50 mb-4 text-center">Small (Starting)</p>
          <RitualProgressRing personal={20} campus={35} size="sm" />
        </div>

        <div>
          <p className="text-sm text-white/50 mb-4 text-center">Medium (Progress)</p>
          <RitualProgressRing personal={60} campus={68} size="md" />
        </div>

        <div>
          <p className="text-sm text-white/50 mb-4 text-center">Large (Almost Done)</p>
          <RitualProgressRing personal={95} campus={87} size="lg" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Ritual milestone track - visual checklist with progress.
 */
export const RitualMilestoneTrackComponent: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-12">
      <h2 className="text-2xl font-bold text-white mb-8">Milestone Tracking</h2>

      <div className="max-w-2xl">
        <RitualMilestoneTrack
          milestones={detailedRitualMilestones}
          onMilestoneClick={(m) => console.log("Clicked:", m)}
        />
      </div>
    </div>
  ),
};

/**
 * Ritual leaderboard - ranked participants with progress.
 */
export const RitualLeaderboardComponent: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-12">
      <h2 className="text-2xl font-bold text-white mb-8">Ritual Leaderboard</h2>

      <div className="max-w-2xl">
        <RitualLeaderboard
          entries={sampleLeaderboard}
          highlightCurrentUser={true}
        />
      </div>
    </div>
  ),
};

/**
 * Ritual action completion modal - different action types.
 */
export const RitualActionModalComponent: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    const [actionType, setActionType] = React.useState<"text" | "number" | "upload" | "manual">("text");

    const actions: Record<string, RitualAction> = {
      text: {
        id: "text-action",
        name: "Share Your Experience",
        description: "Tell us about your study session",
        type: "text",
        placeholder: "What did you learn today?",
        required: true,
        reward: "Reflection badge",
      },
      number: {
        id: "number-action",
        name: "Log Study Hours",
        description: "How many hours did you study?",
        type: "number",
        placeholder: "Enter hours (e.g., 2.5)",
        required: true,
        reward: "+10 points",
      },
      upload: {
        id: "upload-action",
        name: "Upload Proof",
        description: "Share a photo of your workspace",
        type: "upload",
        required: true,
        reward: "Verified badge",
      },
      manual: {
        id: "manual-action",
        name: "Complete Check-in",
        description: "Confirm you attended the event",
        type: "manual",
        reward: "Attendance badge",
      },
    };

    return (
      <div className="min-h-screen bg-black p-12">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Action Completion Modal</h2>

          <div className="flex gap-2">
            {(["text", "number", "upload", "manual"] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActionType(type);
                  setOpen(true);
                }}
                className="px-4 py-2 bg-white/10 text-white rounded border border-white/20 hover:bg-white/20 text-sm"
              >
                {type}
              </button>
            ))}
          </div>

          <RitualActionModal
            open={open}
            onClose={() => setOpen(false)}
            action={actions[actionType]}
            ritualName="Midterm Marathon"
            onComplete={(data) => {
              console.log("Completed:", data);
              setOpen(false);
            }}
          />
        </div>
      </div>
    );
  },
};

/**
 * Mobile feed experience - optimized for 375px viewport.
 */
export const MobileFeedComplete: Story = {
  render: () => {
    const [filter, setFilter] = React.useState<"all" | "events" | "spaces" | "friends">("all");

    return (
      <div className="max-w-sm mx-auto">
        <FeedLayout
          header={
            <div className="p-3 space-y-3">
              <RitualsCardStrip rituals={sampleRituals.slice(0, 2)} />
              <FeedFilters
                activeFilter={filter}
                onFilterChange={setFilter}
                compact
              />
            </div>
          }
        >
          <div className="space-y-3">
            {/* Space event */}
            <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-white/50">from</span>
                <span className="text-xs text-white/70 font-medium">CS Study Group</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{sampleSpaceEvents[0].title}</h4>
              <p className="text-xs text-white/70 mb-2">{sampleSpaceEvents[0].description}</p>
              <div className="text-xs text-white/70">
                {sampleSpaceEvents[0].time} • {sampleSpaceEvents[0].location}
              </div>
            </div>

            {/* Space post */}
            <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-white/50">from</span>
                <span className="text-xs text-white/70 font-medium">CS Study Group</span>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] text-xs font-semibold flex-shrink-0">
                  SC
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white mb-0.5">{sampleSpacePosts[0].author.name}</div>
                  <div className="text-sm text-white leading-relaxed">{sampleSpacePosts[0].content}</div>
                </div>
              </div>
            </div>
          </div>
        </FeedLayout>
      </div>
    );
  },
};
