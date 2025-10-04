import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FeedEventCard, FeedEvent } from "../../atomic/molecules/feed-event-card";

/**
 * # Feed Event Card
 *
 * Campus event card with RSVP capabilities. Critical for IRL connection—30% of feed content.
 * Color-coded urgency indicators drive immediate action.
 *
 * ## Features
 * - Urgency indicators (gold accent + pulse for critical, opacity hierarchy for timing)
 * - One-tap RSVP (Going/Interested)
 * - Capacity tracking with "filling fast" alerts
 * - Friend attendee avatars
 * - Cover image with overlay badges
 * - Category badges (social, academic, sports, greek, wellness)
 * - Virtual/on-campus location
 *
 * ## HIVE Motion System
 * - `hover:shadow-lg` for elevated hover
 * - Color-coded left borders (`border-l-4`)
 * - Smooth RSVP state transitions with `transition-smooth ease-liquid`
 * - Friend avatar staggered entrance
 *
 * ## Usage
 * ```tsx
 * <FeedEventCard
 *   event={event}
 *   onRsvp={(id, status) => handleRsvp(id, status)}
 *   onShare={(id) => handleShare(id)}
 * />
 * ```
 */
const meta = {
  title: "04-Feed/FeedEventCard",
  component: FeedEventCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeedEventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseEvent: FeedEvent = {
  id: "1",
  title: "Open Mic Night",
  description: "Come show your talent or just enjoy the vibes. Free snacks and drinks!",
  space: {
    name: "Campus Events",
    id: "events-1",
    icon: "",
  },
  dateTime: {
    raw: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    display: "Tonight 8pm",
    isUrgent: false,
    isToday: true,
    isSoon: true,
  },
  location: {
    name: "Student Union, Main Hall",
    type: "on-campus",
  },
  attendees: {
    count: 34,
    friends: [
      { name: "Jake", avatar: "https://github.com/shadcn.png" },
      { name: "Sarah", avatar: "https://github.com/vercel.png" },
      { name: "Mike" },
    ],
    preview: ["Jake", "Sarah"],
  },
  rsvp: {
    status: null,
    canRsvp: true,
  },
  category: "social",
};

/**
 * Default event card with basic information
 */
export const Default: Story = {
  args: {
    event: baseEvent,
    className: "max-w-md",
  },
};

/**
 * Event with cover image
 */
export const WithCoverImage: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "2",
      title: "UB Football Game vs Syracuse",
      description: "Show your Bulls pride! Student section tickets available.",
      coverImage: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800",
      category: "sports",
      attendees: {
        count: 234,
        friends: [
          { name: "Alex", avatar: "https://github.com/shadcn.png" },
          { name: "Jordan" },
        ],
        preview: ["Alex", "Jordan"],
      },
    },
    className: "max-w-md",
  },
};

/**
 * Urgent event (starting very soon)
 */
export const UrgentEvent: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "3",
      title: "Free Pizza at Capen Hall!",
      description: "First come first served - hurry!",
      dateTime: {
        raw: new Date(Date.now() + 45 * 60 * 1000), // 45 min from now
        display: "Starting in 45min",
        isUrgent: true,
        isToday: true,
        isSoon: true,
      },
      location: {
        name: "Capen Hall, 2nd Floor",
        type: "on-campus",
      },
      attendees: {
        count: 12,
        friends: [],
        preview: [],
      },
    },
    className: "max-w-md",
  },
};

/**
 * Event at capacity (filling fast)
 */
export const FillingFast: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "4",
      title: "CS Career Fair Prep Workshop",
      description: "Practice your pitch with real recruiters. Limited spots!",
      category: "academic",
      capacity: {
        current: 42,
        max: 50,
        isFillingFast: true,
      },
      dateTime: {
        raw: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
        display: "Tomorrow 3pm",
        isUrgent: false,
        isToday: false,
        isSoon: true,
      },
    },
    className: "max-w-md",
  },
};

/**
 * Virtual event
 */
export const VirtualEvent: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "5",
      title: "Alumni Panel: Tech Careers",
      description: "Hear from UB grads at Google, Microsoft, and Amazon",
      location: {
        name: "Zoom (link in event details)",
        type: "virtual",
      },
      category: "academic",
      attendees: {
        count: 156,
        friends: [
          { name: "Sarah", avatar: "https://github.com/vercel.png" },
        ],
        preview: ["Sarah", "Mike", "Alex"],
      },
    },
    className: "max-w-md",
  },
};

/**
 * Event user is "Going" to
 */
export const UserGoing: Story = {
  args: {
    event: {
      ...baseEvent,
      rsvp: {
        status: "going",
        canRsvp: true,
      },
    },
    className: "max-w-md",
  },
};

/**
 * Event user is "Interested" in
 */
export const UserInterested: Story = {
  args: {
    event: {
      ...baseEvent,
      rsvp: {
        status: "interested",
        canRsvp: true,
      },
    },
    className: "max-w-md",
  },
};

/**
 * Trending event (popular on campus)
 */
export const Trending: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "6",
      title: "Spring Concert: Big Name Artist",
      description: "Don't miss the biggest event of the semester!",
      coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
      isTrending: true,
      category: "social",
      attendees: {
        count: 1247,
        friends: [
          { name: "Jake", avatar: "https://github.com/shadcn.png" },
          { name: "Sarah", avatar: "https://github.com/vercel.png" },
          { name: "Mike" },
        ],
        preview: ["Jake", "Sarah", "Mike"],
      },
      capacity: {
        current: 1247,
        max: 2000,
        isFillingFast: false,
      },
    },
    className: "max-w-md",
  },
};

/**
 * Greek life event
 */
export const GreekEvent: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "7",
      title: "Greek Week Kickoff",
      description: "Join us for games, food, and fun!",
      space: {
        name: "Greek Life",
        id: "greek-1",
        icon: "",
      },
      category: "greek",
      dateTime: {
        raw: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        display: "Friday 6pm",
        isUrgent: false,
        isToday: false,
        isSoon: false,
      },
    },
    className: "max-w-md",
  },
};

/**
 * Wellness event
 */
export const WellnessEvent: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "8",
      title: "Mindfulness Meditation Session",
      description: "De-stress before finals. All levels welcome.",
      space: {
        name: "Wellness Center",
        id: "wellness-1",
        icon: "",
      },
      category: "wellness",
      location: {
        name: "Recreation Center, Studio B",
        type: "on-campus",
      },
      attendees: {
        count: 18,
        friends: [],
        preview: [],
      },
    },
    className: "max-w-md",
  },
};

/**
 * Compact mode (for dense lists)
 */
export const Compact: Story = {
  args: {
    event: baseEvent,
    compact: true,
    className: "max-w-md",
  },
};

/**
 * HIVE Pattern: Event feed with mixed urgency
 */
export const EventFeed: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <FeedEventCard
        event={{
          ...baseEvent,
          dateTime: {
            raw: new Date(Date.now() + 30 * 60 * 1000),
            display: "Starting in 30min",
            isUrgent: true,
            isToday: true,
            isSoon: true,
          },
          title: "Free Pizza at Capen!",
        }}
      />
      <FeedEventCard
        event={{
          ...baseEvent,
          id: "10",
          title: "Open Mic Night",
          dateTime: {
            raw: new Date(Date.now() + 6 * 60 * 60 * 1000),
            display: "Tonight 8pm",
            isUrgent: false,
            isToday: true,
            isSoon: true,
          },
        }}
      />
      <FeedEventCard
        event={{
          ...baseEvent,
          id: "11",
          title: "Career Fair",
          category: "academic",
          dateTime: {
            raw: new Date(Date.now() + 24 * 60 * 60 * 1000),
            display: "Tomorrow 2pm",
            isUrgent: false,
            isToday: false,
            isSoon: true,
          },
        }}
      />
    </div>
  ),
};

/**
 * Full capacity event (no RSVP available)
 */
export const FullCapacity: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "12",
      title: "Sold Out Concert",
      capacity: {
        current: 500,
        max: 500,
        isFillingFast: false,
      },
      rsvp: {
        status: null,
        canRsvp: false,
      },
    },
    className: "max-w-md",
  },
};

/**
 * Multi-day event
 */
export const MultiDayEvent: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "13",
      title: "Homecoming Weekend",
      description: "Three days of celebrations, games, and alumni events!",
      coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      dateTime: {
        raw: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        display: "Next Friday - Sunday",
        isUrgent: false,
        isToday: false,
        isSoon: false,
      },
      attendees: {
        count: 892,
        friends: [
          { name: "Jake", avatar: "https://github.com/shadcn.png" },
          { name: "Sarah", avatar: "https://github.com/vercel.png" },
        ],
        preview: ["Jake", "Sarah"],
      },
    },
    className: "max-w-md",
  },
};

/**
 * PROOF: RSVP button state transitions
 * Demonstrates smooth transitions between null → going → interested states
 */
export const RSVPButtonStates: Story = {
  render: () => {
    const [rsvpStatus, setRsvpStatus] = React.useState<"going" | "interested" | null>(null);
    const [attendeeCount, setAttendeeCount] = React.useState(23);

    const handleRsvp = (status: "going" | "interested" | null) => {
      const wasGoing = rsvpStatus === "going";
      const isNowGoing = status === "going";

      setRsvpStatus(status);

      // Update attendee count based on state change
      if (!wasGoing && isNowGoing) {
        setAttendeeCount(attendeeCount + 1);
      } else if (wasGoing && !isNowGoing) {
        setAttendeeCount(attendeeCount - 1);
      }
    };

    const event: FeedEvent = {
      ...baseEvent,
      rsvp: {
        status: rsvpStatus,
        canRsvp: true,
      },
      attendees: {
        ...baseEvent.attendees,
        count: attendeeCount,
      },
    };

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              RSVP State Transitions
            </h3>
            <p className="text-sm text-muted-foreground">
              Click buttons to cycle through states with smooth animations
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground">Current state:</span>
              <span className="font-mono text-sm font-semibold text-foreground">
                {rsvpStatus || "null"}
              </span>
            </div>
          </div>

          <FeedEventCard
            event={event}
            onRsvp={(id, status) => handleRsvp(status)}
          />

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleRsvp(null)}
              className={`rounded-md border px-3 py-2 text-xs font-medium transition-all duration-300 ${
                rsvpStatus === null
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background hover:bg-accent"
              }`}
            >
              No RSVP
            </button>
            <button
              onClick={() => handleRsvp("interested")}
              className={`rounded-md border px-3 py-2 text-xs font-medium transition-all duration-300 ${
                rsvpStatus === "interested"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background hover:bg-accent"
              }`}
            >
              Interested
            </button>
            <button
              onClick={() => handleRsvp("going")}
              className={`rounded-md border px-3 py-2 text-xs font-medium transition-all duration-300 ${
                rsvpStatus === "going"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background hover:bg-accent"
              }`}
            >
              Going
            </button>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{attendeeCount}</div>
            <div className="text-xs text-muted-foreground">Total Attendees</div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * PROOF: "Filling fast" urgency animation
 * Shows capacity alert when event is near full
 */
export const FillingFastAnimation: Story = {
  render: () => {
    const [currentCapacity, setCurrentCapacity] = React.useState(42);
    const maxCapacity = 50;
    const isFillingFast = currentCapacity >= maxCapacity * 0.8;

    const addAttendee = () => {
      if (currentCapacity < maxCapacity) {
        setCurrentCapacity(currentCapacity + 1);
      }
    };

    const event: FeedEvent = {
      ...baseEvent,
      title: "CS Career Fair Prep Workshop",
      description: "Practice your pitch with real recruiters. Limited spots!",
      category: "academic",
      capacity: {
        current: currentCapacity,
        max: maxCapacity,
        isFillingFast,
      },
    };

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Filling Fast Alert
            </h3>
            <p className="text-sm text-muted-foreground">
              Watch the urgency indicator appear at 80% capacity (40/50)
            </p>
            <div className="text-xs text-muted-foreground">
              Current: <span className="font-mono font-semibold text-foreground">{currentCapacity}/{maxCapacity}</span>
              {isFillingFast && <span className="ml-2 text-hive-gold animate-pulse">⚠️ FILLING FAST</span>}
            </div>
          </div>

          <FeedEventCard event={event} />

          <button
            onClick={addAttendee}
            disabled={currentCapacity >= maxCapacity}
            className="w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90 disabled:opacity-50"
          >
            {currentCapacity >= maxCapacity ? "Event Full!" : "Add Attendee (+1)"}
          </button>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Capacity</span>
              <span>{Math.round((currentCapacity / maxCapacity) * 100)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  isFillingFast ? "bg-hive-gold" : "bg-primary"
                }`}
                style={{ width: `${(currentCapacity / maxCapacity) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * PROOF: Urgency visual hierarchy
 * Monochrome system: Gold accent + opacity + animation for urgency levels
 */
export const UrgencyVisualHierarchy: Story = {
  render: () => {
    const [urgencyLevel, setUrgencyLevel] = React.useState<"urgent" | "today" | "soon" | "default">("urgent");

    const urgencyConfigs = {
      urgent: {
        display: "Starting in 45min",
        hoursFromNow: 0.75,
        isUrgent: true,
        isToday: true,
        isSoon: true,
        label: "Critical",
        description: "Gold accent + pulse animation",
      },
      today: {
        display: "Tonight 8pm",
        hoursFromNow: 6,
        isUrgent: false,
        isToday: true,
        isSoon: true,
        label: "Today",
        description: "Gold accent + solid border",
      },
      soon: {
        display: "Tomorrow 3pm",
        hoursFromNow: 24,
        isUrgent: false,
        isToday: false,
        isSoon: true,
        label: "Soon",
        description: "Muted with elevated foreground",
      },
      default: {
        display: "Friday 6pm",
        hoursFromNow: 72,
        isUrgent: false,
        isToday: false,
        isSoon: false,
        label: "Default",
        description: "Standard muted foreground",
      },
    };

    const config = urgencyConfigs[urgencyLevel];

    const event: FeedEvent = {
      ...baseEvent,
      title: "Free Pizza at Capen Hall!",
      description: "First come first served - hurry!",
      dateTime: {
        raw: new Date(Date.now() + config.hoursFromNow * 60 * 60 * 1000),
        display: config.display,
        isUrgent: config.isUrgent,
        isToday: config.isToday,
        isSoon: config.isSoon,
      },
    };

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Urgency Visual Hierarchy
            </h3>
            <p className="text-sm text-muted-foreground">
              Monochrome + Gold: Using opacity, borders, and animation
            </p>
            <div className="rounded-md bg-card border border-border p-3 text-left">
              <div className="text-xs font-semibold text-foreground">{config.label}</div>
              <div className="text-xs text-muted-foreground">{config.description}</div>
            </div>
          </div>

          <FeedEventCard event={event} />

          <div className="grid grid-cols-4 gap-2">
            {(["urgent", "today", "soon", "default"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setUrgencyLevel(level)}
                className={`rounded-md border px-2 py-2 text-xs font-medium transition-all duration-300 ${
                  urgencyLevel === level
                    ? "border-hive-gold bg-hive-gold/10 text-hive-gold"
                    : "border-input bg-background hover:bg-accent text-foreground"
                }`}
              >
                {urgencyConfigs[level].label}
              </button>
            ))}
          </div>

          {/* Visual hierarchy legend */}
          <div className="space-y-2 rounded-md border border-border p-4">
            <div className="text-xs font-semibold text-foreground mb-3">HIVE Urgency System</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-hive-gold animate-pulse" />
                <span className="text-xs text-muted-foreground">Critical: Gold + pulse</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full border-2 border-hive-gold" />
                <span className="text-xs text-muted-foreground">Today: Gold border</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-foreground" />
                <span className="text-xs text-muted-foreground">Soon: Full opacity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                <span className="text-xs text-muted-foreground">Default: Muted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
