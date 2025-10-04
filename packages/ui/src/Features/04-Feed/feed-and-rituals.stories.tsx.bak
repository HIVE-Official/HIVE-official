import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FeedPostCard, type FeedPost } from "../../atomic/molecules/feed-post-card";
import { FeedEventCard, type FeedEvent } from "../../atomic/molecules/feed-event-card";
import { FeedFilters } from "../../atomic/molecules/feed-filters";
import { RitualsCardStrip, type Ritual } from "../../atomic/molecules/rituals-card-strip";

/**
 * # Feed and Rituals — Complete User Flow
 *
 * The campus discovery engine where students find what's happening. This story file focuses on
 * **complete user flows** and **integration patterns** across all feed components.
 *
 * ## The Core Loop
 * Open app → See feed → Maybe engage → Come back
 *
 * This must be < 3 seconds end-to-end.
 *
 * ## Feed Architecture
 * - **Read-only** aggregation from Spaces
 * - **Algorithmic mix**: 40% posts, 30% events, 15% promoted, 10% amplified, 5% rituals
 * - **Real-time** updates via SSE
 * - **Campus-isolated**: All content tagged with campusId
 *
 * ## Rituals
 * - Campus-wide behavioral campaigns (5% of feed)
 * - Drive collective achievement and habit formation
 * - Progress tracking: Personal + Campus participation
 * - Rewards: Badges, titles, feature access
 *
 * ## HIVE Motion System
 * - Pull-to-refresh with spring physics
 * - Staggered card entrance (100ms delay per card)
 * - Smooth filter transitions (`duration-smooth ease-liquid`)
 * - Horizontal scroll momentum on rituals strip
 * - Buttery RSVP/reaction animations
 *
 * ## For individual component variations, see:
 * - FeedPostCard stories (reactions, media, trending, etc.)
 * - FeedEventCard stories (urgency, RSVP states, capacity)
 * - RitualsCardStrip stories (progress, milestones, types)
 * - FeedFilters stories (filter states, time ranges)
 */
const meta = {
  title: "04-Feed/Complete User Flow",
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
    id: "first-week-friendzy",
    title: "First Week Friendzy",
    description: "Make your first 5 connections and join 3 spaces",
    icon: "🎯",
    type: "onboarding",
    progress: { current: 3, total: 5, percentage: 60 },
    campusProgress: { participants: 342, target: 500, percentage: 68 },
    timeRemaining: { days: 4, hours: 12, isUrgent: false },
    rewards: { badge: "Pioneer Badge", feature: "Early access to features" },
    status: "active",
    hasJoined: true,
    isTrending: true,
    currentMilestone: { name: "Join 3 spaces", progress: 67 },
  },
  {
    id: "midterm-marathon",
    title: "Midterm Marathon",
    description: "Log 10 study hours and help 3 students",
    icon: "📚",
    type: "challenge",
    progress: { current: 7, total: 10, percentage: 70 },
    campusProgress: { participants: 1289, target: 2000, percentage: 64 },
    timeRemaining: { days: 2, hours: 8, isUrgent: false },
    rewards: { badge: "Scholar Title", title: "Coffee shop credits" },
    status: "active",
    hasJoined: true,
    currentMilestone: { name: "Study 10 hours", progress: 70 },
  },
  {
    id: "spring-fever",
    title: "Spring Fever",
    description: "Attend 3 outdoor events this week",
    icon: "🌸",
    type: "seasonal",
    progress: { current: 1, total: 3, percentage: 33 },
    campusProgress: { participants: 567, target: 1000, percentage: 57 },
    timeRemaining: { days: 5, hours: 3, isUrgent: false },
    rewards: { badge: "Spring Explorer" },
    status: "active",
    hasJoined: false,
  },
];

const samplePosts: FeedPost[] = [
  {
    id: "post-1",
    content: "Just had the best study session ever! CS 220 data structures finally make sense 🤯\n\nShoutout to the study group - you all are legends. We got this! 💪",
    author: {
      name: "Sarah Chen",
      handle: "sarachen",
      avatar: undefined,
    },
    space: {
      name: "CS Majors",
      id: "cs-majors",
      memberCount: 234,
    },
    timestamp: "2h ago",
    reactions: { count: 24, hasReacted: true, topEmoji: "🔥" },
    comments: { count: 8, preview: [
      { author: "Mike J.", text: "Same! That linked list explanation was 👌" },
    ]},
    reposts: { count: 3, hasReposted: false },
    requotes: { count: 1 },
    saves: { count: 12, hasSaved: true },
    isTrending: true,
    friendActivity: {
      names: ["Jake", "Emma", "Alex"],
      action: "reacted",
    },
  },
  {
    id: "post-2",
    content: "Anonymous feedback results are in! 🎤\n\nTop request: More weekend study sessions ✅\nWe're launching Saturday study groups starting next week.\n\nThank you all for being honest - this is YOUR space.",
    author: {
      name: "CS Club",
      handle: "csclub",
    },
    space: {
      name: "CS Study Group",
      id: "cs-study",
      memberCount: 156,
    },
    timestamp: "4h ago",
    reactions: { count: 67, hasReacted: false, topEmoji: "👏" },
    comments: { count: 23 },
    reposts: { count: 12, hasReposted: false },
    requotes: { count: 5 },
    saves: { count: 34, hasSaved: false },
    isPromoted: true,
  },
];

const sampleEvents: FeedEvent[] = [
  {
    id: "event-1",
    title: "Late Night Study Session",
    description: "Grinding for that CS 220 exam tomorrow. Coffee, snacks, and good vibes provided!",
    space: {
      name: "CS Study Group",
      id: "cs-study",
      icon: "💻",
    },
    dateTime: {
      raw: new Date(Date.now() + 2 * 60 * 60 * 1000),
      display: "Tonight 8pm",
      isUrgent: false,
      isToday: true,
      isSoon: true,
    },
    location: {
      name: "Capen Library, 3rd Floor",
      type: "on-campus",
    },
    capacity: {
      current: 23,
      max: 30,
      isFillingFast: true,
    },
    attendees: {
      count: 23,
      friends: [
        { name: "Sarah", avatar: undefined },
        { name: "Mike", avatar: undefined },
        { name: "Emma", avatar: undefined },
      ],
      preview: ["Sarah", "Mike", "Emma"],
    },
    rsvp: {
      status: null,
      canRsvp: true,
    },
    category: "academic",
    isTrending: true,
  },
  {
    id: "event-2",
    title: "Friday Night Mixer",
    description: "End of the week celebration! Music, games, and new friends.",
    space: {
      name: "Greek Life",
      id: "greek-life",
      icon: "🎉",
    },
    dateTime: {
      raw: new Date(Date.now() + 24 * 60 * 60 * 1000),
      display: "Tomorrow 9pm",
      isUrgent: false,
      isToday: false,
      isSoon: true,
    },
    location: {
      name: "Sigma House",
      type: "off-campus",
    },
    attendees: {
      count: 67,
      friends: [
        { name: "Alex", avatar: undefined },
        { name: "Jordan", avatar: undefined },
      ],
      preview: ["Alex", "Jordan"],
    },
    rsvp: {
      status: "going",
      canRsvp: true,
    },
    coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    category: "social",
  },
];

// ============================================================================
// USER FLOW STORIES
// ============================================================================

/**
 * **FLOW 1: Empty State**
 *
 * New user just completed onboarding. No joined spaces yet, so feed is empty.
 * Shows clear call-to-action to explore spaces.
 */
export const EmptyState: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <FeedFilters activeFilter="all" eventsCount={0} />
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Your feed is empty
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Join some spaces to start seeing content from your campus community
          </p>
          <button className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90">
            Explore Spaces
          </button>
        </div>
      </div>
    </div>
  ),
};

/**
 * **FLOW 2: First Content Experience**
 *
 * User joined their first spaces. Feed shows:
 * - Onboarding ritual (First Week Friendzy)
 * - Mixed content from joined spaces
 * - Filters for discovery
 */
export const FirstContentExperience: Story = {
  render: () => {
    const [filter, setFilter] = React.useState<"all" | "events" | "spaces" | "friends">("all");

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          {/* Onboarding ritual prominently featured */}
          <RitualsCardStrip
            rituals={[sampleRituals[0]]}
            onRitualClick={(id) => alert(`Opening ritual: ${id}`)}
            onJoinRitual={(id) => alert(`Joining ritual: ${id}`)}
          />

          <FeedFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            eventsCount={2}
            urgentEventsCount={1}
          />

          <div className="space-y-4">
            <FeedEventCard event={sampleEvents[0]} />
            <FeedPostCard post={samplePosts[0]} />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * **FLOW 3: Active User — Default Feed**
 *
 * Established user with multiple joined spaces. Complete feed experience:
 * - Multiple active rituals
 * - Algorithmic mix: Events + Posts + Promoted content
 * - Friend activity and trending indicators
 * - Filter controls
 */
export const ActiveUserFeed: Story = {
  render: () => {
    const [filter, setFilter] = React.useState<"all" | "events" | "spaces" | "friends">("all");
    const [timeFilter, setTimeFilter] = React.useState<"now" | "today" | "week" | null>(null);

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          <RitualsCardStrip
            rituals={sampleRituals}
            onRitualClick={(id) => alert(`Opening ritual: ${id}`)}
            onJoinRitual={(id) => alert(`Joining ritual: ${id}`)}
          />

          <FeedFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            activeTimeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            eventsCount={24}
            urgentEventsCount={3}
            showTimeFilters={filter === "events"}
          />

          <div className="space-y-4">
            {(filter === "all" || filter === "events") && sampleEvents.map((event) => (
              <FeedEventCard
                key={event.id}
                event={event}
                onRsvp={(id, status) => alert(`RSVP ${status} for event ${id}`)}
                onShare={(id) => alert(`Sharing event ${id}`)}
                onSave={(id) => alert(`Saving event ${id}`)}
                onViewDetails={(id) => alert(`View details for ${id}`)}
                onSpaceClick={(id) => alert(`Navigate to space ${id}`)}
              />
            ))}

            {(filter === "all" || filter === "spaces") && samplePosts.map((post) => (
              <FeedPostCard
                key={post.id}
                post={post}
                onReact={(id) => alert(`Reacted to post ${id}`)}
                onComment={(id) => alert(`Comment on post ${id}`)}
                onRepost={(id) => alert(`Repost ${id}`)}
                onRequote={(id) => alert(`Requote ${id}`)}
                onSave={(id) => alert(`Save ${id}`)}
                onSpaceClick={(id) => alert(`Navigate to space ${id}`)}
                onAuthorClick={(handle) => alert(`View profile @${handle}`)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * **FLOW 4: Events Discovery**
 *
 * User taps "Events" filter to find IRL activities.
 * - Events-only view
 * - Time filters (Now, Today, Week)
 * - Urgency indicators prominent
 * - Capacity warnings
 */
export const EventsDiscovery: Story = {
  render: () => {
    const [timeFilter, setTimeFilter] = React.useState<"now" | "today" | "week" | null>(null);

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          <FeedFilters
            activeFilter="events"
            onFilterChange={() => {}}
            activeTimeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            eventsCount={24}
            urgentEventsCount={3}
            showTimeFilters
          />
          <div className="space-y-4">
            {sampleEvents.map((event) => (
              <FeedEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * **FLOW 5: Loading State**
 *
 * Initial feed load or pull-to-refresh in progress.
 * Shows skeleton placeholders with proper spacing.
 */
export const LoadingState: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Rituals skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-64 h-48 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>

        {/* Filters skeleton */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 flex-1 bg-muted animate-pulse rounded-md" />
          ))}
        </div>

        {/* Content skeletons */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * **FLOW 6: Pull-to-Refresh**
 *
 * Demonstrates pull-to-refresh interaction with spring physics.
 * Pull down → Release → Loading → New content appears.
 */
export const PullToRefresh: Story = {
  render: () => {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [pullDistance, setPullDistance] = React.useState(0);
    const startYRef = React.useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
      startYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (window.scrollY === 0) {
        const currentY = e.touches[0].clientY;
        const distance = Math.max(0, currentY - startYRef.current);
        setPullDistance(Math.min(distance, 120));
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 80) {
        setIsRefreshing(true);
        setTimeout(() => {
          setIsRefreshing(false);
          setPullDistance(0);
        }, 2000);
      } else {
        setPullDistance(0);
      }
    };

    return (
      <div
        className="min-h-screen bg-background overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull indicator */}
        <div
          className="transition-all duration-300 ease-out"
          style={{
            height: isRefreshing ? "60px" : `${pullDistance}px`,
            opacity: pullDistance > 0 ? 1 : 0,
          }}
        >
          <div className="flex items-center justify-center h-full">
            <div
              className={`transition-transform duration-300 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            >
              <svg
                className="h-6 w-6 text-muted-foreground"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="max-w-2xl mx-auto p-4 space-y-6 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${pullDistance}px)`,
          }}
        >
          <div className="text-center text-sm text-muted-foreground mb-4">
            {pullDistance === 0 && !isRefreshing && "↓ Pull down to refresh"}
            {pullDistance > 0 && pullDistance < 80 && "↓ Keep pulling..."}
            {pullDistance >= 80 && !isRefreshing && "↑ Release to refresh"}
            {isRefreshing && "Refreshing..."}
          </div>

          <RitualsCardStrip rituals={sampleRituals} />
          <FeedFilters activeFilter="all" eventsCount={2} />
          <div className="space-y-4">
            <FeedEventCard event={sampleEvents[0]} />
            <FeedPostCard post={samplePosts[0]} />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * **FLOW 7: Staggered Card Entrance**
 *
 * Demonstrates the feed entrance animation pattern.
 * Cards fade in and slide up with 100ms delay between each.
 */
export const StaggeredEntrance: Story = {
  render: () => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          {/* Rituals - Slide in from top */}
          <div
            className={`transition-all duration-500 ease-out ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
          >
            <RitualsCardStrip rituals={sampleRituals} />
          </div>

          {/* Filters - Fade in */}
          <div
            className={`transition-all duration-500 delay-100 ease-out ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <FeedFilters activeFilter="all" eventsCount={2} />
          </div>

          {/* Cards - Staggered entrance */}
          <div className="space-y-4">
            {sampleEvents.map((event, i) => (
              <div
                key={event.id}
                className="transition-all duration-500 ease-out"
                style={{
                  transitionDelay: `${200 + i * 100}ms`,
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                  opacity: isLoaded ? 1 : 0,
                }}
              >
                <FeedEventCard event={event} />
              </div>
            ))}
            {samplePosts.map((post, i) => (
              <div
                key={post.id}
                className="transition-all duration-500 ease-out"
                style={{
                  transitionDelay: `${400 + i * 100}ms`,
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                  opacity: isLoaded ? 1 : 0,
                }}
              >
                <FeedPostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * **PRODUCTION SHOWCASE**
 *
 * Complete feed as it would appear in production.
 * - Sticky header with filters
 * - Complete content mix
 * - Load more button
 * - All interactions enabled
 */
export const ProductionShowcase: Story = {
  render: () => {
    const [filter, setFilter] = React.useState<"all" | "events" | "spaces" | "friends">("all");
    const [timeFilter, setTimeFilter] = React.useState<"now" | "today" | "week" | null>(null);

    return (
      <div className="min-h-screen bg-background">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-foreground">Feed</h1>
              <button className="h-9 w-9 rounded-md border border-input bg-background transition-smooth ease-liquid hover:bg-accent hover:text-accent-foreground">
                <svg className="h-4 w-4 mx-auto" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <FeedFilters
              activeFilter={filter}
              onFilterChange={setFilter}
              activeTimeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              eventsCount={24}
              urgentEventsCount={3}
              showTimeFilters={filter === "events"}
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          <RitualsCardStrip
            rituals={sampleRituals}
            onRitualClick={(id) => alert(`Opening ritual: ${id}`)}
            onJoinRitual={(id) => alert(`Joining ritual: ${id}`)}
          />

          <div className="space-y-4">
            {sampleEvents.map((event) => (
              <FeedEventCard
                key={event.id}
                event={event}
                onRsvp={(id, status) => alert(`RSVP ${status}`)}
              />
            ))}
            {samplePosts.map((post) => (
              <FeedPostCard
                key={post.id}
                post={post}
                onReact={(id) => alert(`Reacted`)}
                onComment={(id) => alert(`Comment`)}
                onRepost={(id) => alert(`Repost`)}
                onRequote={(id) => alert(`Requote`)}
                onSave={(id) => alert(`Save`)}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center py-8">
            <button className="rounded-md border border-input bg-background px-6 py-2.5 text-sm font-medium transition-smooth ease-liquid hover:bg-accent hover:text-accent-foreground">
              Load More Posts
            </button>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * **Mobile Feed Experience**
 *
 * Optimized for mobile viewport (375px).
 * - Compact filters
 * - Smaller ritual cards
 * - Touch-optimized interactions
 */
export const MobileFeed: Story = {
  render: () => {
    const [filter, setFilter] = React.useState<"all" | "events" | "spaces" | "friends">("all");

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-sm mx-auto p-3 space-y-4">
          <RitualsCardStrip rituals={sampleRituals.slice(0, 2)} />
          <FeedFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            eventsCount={2}
            compact
          />
          <div className="space-y-3">
            <FeedEventCard event={sampleEvents[0]} compact />
            <FeedPostCard post={samplePosts[0]} compact />
          </div>
        </div>
      </div>
    );
  },
};
