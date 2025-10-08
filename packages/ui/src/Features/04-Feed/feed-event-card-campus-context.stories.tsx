import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FeedEventCard, FeedEvent } from "../../atomic/molecules/feed-event-card";

/**
 * # Feed Event Card - Campus Context
 *
 * **Demonstrating HIVE-native "who's going" vs generic event presentation**
 *
 * The key to avoiding "generic event platform" is in the **details**:
 * - Not "5 friends going" → "Sarah (CS '26), Jake (Engineering '27) +3 are going"
 * - Not "234 attendees" → "23 CS students · 12 from Ellicott"
 * - Not "Trending" → "Trending with CS students"
 * - Not "Popular event" → "You went to 3 similar events"
 *
 * ## Visual Hierarchy for "Who's Going"
 * 1. **Friends Going** (top priority): Names + avatars + major/year
 * 2. **Campus Cohort Breakdown**: "23 CS · 12 from Ellicott" (not generic demographics)
 * 3. **Total Attendees** (de-emphasized): Count only, if friends shown
 * 4. **Personal Context**: "You went to 3 similar events"
 *
 * ## Campus-Native Language
 * - ✅ "Sarah (CS '26)" (academic cohort, not generic)
 * - ✅ "12 from Ellicott" (residential proximity)
 * - ✅ "Trending with CS students" (campus-specific, not generic "Trending")
 * - ✅ "7 RSVPs in last hour" (urgency signal)
 */
const meta = {
  title: "04-Feed/FeedEventCard/Campus Context",
  component: FeedEventCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeedEventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseEvent: FeedEvent = {
  id: "campus-1",
  title: "CS Study Group Meetup",
  description: "Weekly study session for CSE 220. Bring your questions!",
  space: {
    name: "CS Study Group",
    id: "cs-study-1",
    icon: "📚",
  },
  dateTime: {
    raw: new Date(Date.now() + 6 * 60 * 60 * 1000),
    display: "Tonight 7pm",
    isUrgent: false,
    isToday: true,
    isSoon: true,
  },
  location: {
    name: "Capen Library, 3rd Floor",
    type: "on-campus",
  },
  attendees: {
    count: 23,
    friends: [],
    preview: [],
  },
  rsvp: {
    status: null,
    canRsvp: true,
  },
  category: "academic",
};

/**
 * **Generic Event Platform** (what NOT to do)
 *
 * Shows generic social proof without campus context:
 * - Just "23 attendees" (could be any platform)
 * - No friend names or cohort context
 * - Generic "Trending"
 */
export const GenericEventPlatform: Story = {
  args: {
    event: {
      ...baseEvent,
      isTrending: true,
      // NO campus context - looks generic
    },
    className: "max-w-md",
  },
};

/**
 * **HIVE Campus-Native** (correct approach)
 *
 * Shows campus-specific context:
 * - Friend names with major/year: "Sarah (CS '26)"
 * - Campus cohort breakdown: "12 CS students · 8 from Ellicott"
 * - Campus-specific trending: "Trending with CS students"
 * - Activity signals: "7 RSVPs in last hour"
 */
export const HiveCampusNative: Story = {
  args: {
    event: {
      ...baseEvent,
      attendees: {
        count: 23,
        friends: [],
        preview: [],
      },
      campusContext: {
        // PRIORITY 1: Friends going (with campus cohort context)
        friendsGoing: [
          {
            id: "1",
            name: "Sarah",
            avatar: "https://github.com/shadcn.png",
            major: "CS",
            year: "26",
          },
          {
            id: "2",
            name: "Jake",
            avatar: "https://github.com/vercel.png",
            major: "Engineering",
            year: "27",
          },
          {
            id: "3",
            name: "Morgan",
            major: "CS",
            year: "26",
          },
        ],
        // PRIORITY 2: Campus cohort breakdown
        attendeeCohorts: {
          majorGroups: [
            { major: "CS", count: 12 },
            { major: "Engineering", count: 8 },
          ],
          residentialGroups: [{ building: "Ellicott", count: 8 }],
        },
        // PRIORITY 3: Activity signals
        recentRsvps: 7,
        similarEventAttendance: 3,
      },
    },
    className: "max-w-md",
  },
};

/**
 * **Just Friends Going** (no cohort breakdown)
 *
 * Simplest campus context: Friend names only
 * - Shows 1 friend with major/year
 * - No cohort breakdown (small event)
 */
export const JustFriendsGoing: Story = {
  args: {
    event: {
      ...baseEvent,
      title: "Coffee Study Session",
      description: "Casual study time at Starbucks",
      attendees: {
        count: 5,
        friends: [],
        preview: [],
      },
      campusContext: {
        friendsGoing: [
          {
            id: "1",
            name: "Taylor",
            avatar: "https://github.com/shadcn.png",
            major: "CS",
            year: "26",
          },
        ],
      },
    },
    className: "max-w-md",
  },
};

/**
 * **Large Event with Cohort Breakdown**
 *
 * Shows campus-native demographics for large events:
 * - Multiple friends going
 * - Rich cohort breakdown: majors + residential + years
 * - Recent activity: "23 RSVPs in last hour"
 */
export const LargeEventCohortBreakdown: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "large-1",
      title: "UB Homecoming Concert",
      description: "Free concert featuring local bands and student performers!",
      coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
      category: "social",
      attendees: {
        count: 847,
        friends: [],
        preview: [],
      },
      capacity: {
        current: 847,
        max: 1000,
        isFillingFast: true,
      },
      campusContext: {
        friendsGoing: [
          {
            id: "1",
            name: "Alex",
            avatar: "https://github.com/shadcn.png",
            major: "CS",
            year: "26",
          },
          {
            id: "2",
            name: "Jordan",
            avatar: "https://github.com/vercel.png",
            major: "Business",
            year: "27",
          },
          {
            id: "3",
            name: "Casey",
            major: "Engineering",
            year: "26",
          },
          {
            id: "4",
            name: "Morgan",
            major: "CS",
            year: "27",
          },
          {
            id: "5",
            name: "Riley",
            year: "26",
          },
        ],
        attendeeCohorts: {
          majorGroups: [
            { major: "CS", count: 234 },
            { major: "Engineering", count: 187 },
            { major: "Business", count: 156 },
          ],
          residentialGroups: [
            { building: "Ellicott", count: 312 },
            { building: "Governors", count: 203 },
          ],
          yearGroups: [
            { year: "'26", count: 312 },
            { year: "'27", count: 289 },
          ],
        },
        recentRsvps: 23,
      },
    },
    className: "max-w-md",
  },
};

/**
 * **Trending with Campus Category**
 *
 * Shows campus-specific trending:
 * - "Trending with CS students" (not generic "Trending")
 * - Friends going from that cohort
 * - High recent activity
 */
export const TrendingCampusSpecific: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "trending-1",
      title: "CSE 220 Midterm Study Session",
      description: "Final study session before the CSE 220 midterm on Friday. Covering data structures, algorithms, and practice problems.",
      attendees: {
        count: 67,
        friends: [],
        preview: [],
      },
      campusContext: {
        isTrending: true,
        trendingCategory: "CS students",
        friendsGoing: [
          {
            id: "1",
            name: "Sarah",
            avatar: "https://github.com/shadcn.png",
            major: "CS",
            year: "26",
          },
          {
            id: "2",
            name: "Jake",
            avatar: "https://github.com/vercel.png",
            major: "CS",
            year: "26",
          },
        ],
        attendeeCohorts: {
          majorGroups: [{ major: "CS", count: 67 }],
        },
        recentRsvps: 18,
      },
    },
    className: "max-w-md",
  },
};

/**
 * **Residential Event** (dorm-specific)
 *
 * Campus context for residential events:
 * - Friends from the dorm
 * - Residential cohort breakdown
 * - "45 from Ellicott"
 */
export const ResidentialEvent: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "res-1",
      title: "Ellicott Floor Pizza Party",
      description: "Floor 3 pizza night! Come hang out and meet your neighbors.",
      category: "social",
      location: {
        name: "Ellicott Complex, Floor 3 Lounge",
        type: "on-campus",
      },
      attendees: {
        count: 45,
        friends: [],
        preview: [],
      },
      campusContext: {
        friendsGoing: [
          {
            id: "1",
            name: "Alex",
            avatar: "https://github.com/shadcn.png",
          },
          {
            id: "2",
            name: "Taylor",
          },
        ],
        spaceType: "residential",
        attendeeCohorts: {
          residentialGroups: [
            { building: "Ellicott", count: 45 },
          ],
        },
      },
    },
    className: "max-w-md",
  },
};

/**
 * **Greek Life Event** (rush week)
 *
 * Campus-specific for Greek organizations:
 * - Trending campus-wide during rush
 * - High engagement from Greek Life students
 */
export const GreekLifeRush: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "greek-1",
      title: "Alpha Epsilon Pi - Meet the Brothers",
      description: "Join us for Spring Rush 2025! Pizza, games, and get to know the brothers.",
      category: "greek",
      coverImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
      attendees: {
        count: 78,
        friends: [],
        preview: [],
      },
      campusContext: {
        isTrending: true,
        trendingCategory: "campus-wide",
        spaceType: "greek",
        friendsGoing: [
          {
            id: "1",
            name: "Jordan",
            avatar: "https://github.com/shadcn.png",
            year: "27",
          },
        ],
        recentRsvps: 12,
      },
    },
    className: "max-w-md",
  },
};

/**
 * **Personal Context: Similar Events**
 *
 * Shows personal event history:
 * - "You went to 3 similar events"
 * - Friends you've attended with before
 */
export const PersonalContext: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "personal-1",
      title: "Weekly Yoga Session",
      description: "Vinyasa flow for all levels. Bring your mat!",
      category: "wellness",
      attendees: {
        count: 18,
        friends: [],
        preview: [],
      },
      campusContext: {
        friendsGoing: [
          {
            id: "1",
            name: "Morgan",
            avatar: "https://github.com/shadcn.png",
          },
        ],
        similarEventAttendance: 3,
      },
    },
    className: "max-w-md",
  },
};

/**
 * **High Activity Signal**
 *
 * Shows recent RSVP urgency:
 * - "15 RSVPs in last hour" (urgency signal)
 * - Multiple friends going
 * - Filling fast indicator
 */
export const HighActivitySignal: Story = {
  args: {
    event: {
      ...baseEvent,
      id: "activity-1",
      title: "Free Chipotle - First 50 People",
      description: "Stop by the Student Union for free Chipotle!",
      category: "social",
      dateTime: {
        raw: new Date(Date.now() + 2 * 60 * 60 * 1000),
        display: "Starting in 2 hours",
        isUrgent: false,
        isToday: true,
        isSoon: true,
      },
      capacity: {
        current: 42,
        max: 50,
        isFillingFast: true,
      },
      attendees: {
        count: 42,
        friends: [],
        preview: [],
      },
      campusContext: {
        friendsGoing: [
          {
            id: "1",
            name: "Sarah",
            avatar: "https://github.com/shadcn.png",
          },
          {
            id: "2",
            name: "Jake",
            avatar: "https://github.com/vercel.png",
          },
        ],
        recentRsvps: 15,
      },
    },
    className: "max-w-md",
  },
};

/**
 * **Comparison: Side by Side**
 *
 * Direct comparison of generic vs HIVE-native
 */
export const Comparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          ❌ Generic Event Platform (Facebook Events style)
        </h3>
        <FeedEventCard
          event={{
            ...baseEvent,
            isTrending: true,
            attendees: {
              count: 23,
              friends: [
                { name: "Sarah", avatar: "https://github.com/shadcn.png" },
                { name: "Jake", avatar: "https://github.com/vercel.png" },
              ],
              preview: ["Sarah", "Jake"],
            },
          }}
          className="max-w-md"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          ✅ HIVE Campus-Native (cohort + proximity + context)
        </h3>
        <FeedEventCard
          event={{
            ...baseEvent,
            attendees: {
              count: 23,
              friends: [],
              preview: [],
            },
            campusContext: {
              friendsGoing: [
                {
                  id: "1",
                  name: "Sarah",
                  avatar: "https://github.com/shadcn.png",
                  major: "CS",
                  year: "26",
                },
                {
                  id: "2",
                  name: "Jake",
                  avatar: "https://github.com/vercel.png",
                  major: "Engineering",
                  year: "27",
                },
                {
                  id: "3",
                  name: "Morgan",
                  major: "CS",
                  year: "26",
                },
              ],
              isTrending: true,
              trendingCategory: "CS students",
              attendeeCohorts: {
                majorGroups: [
                  { major: "CS", count: 12 },
                  { major: "Engineering", count: 8 },
                ],
                residentialGroups: [{ building: "Ellicott", count: 8 }],
              },
              recentRsvps: 7,
              similarEventAttendance: 3,
            },
          }}
          className="max-w-md"
        />
      </div>
    </div>
  ),
};
