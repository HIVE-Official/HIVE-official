import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { EventsCalendar, CalendarEvent } from "../../atomic/organisms/events-calendar";

/**
 * # Events Calendar - Campus Context
 *
 * **Demonstrating HIVE-native calendar vs generic event calendar**
 *
 * The key to avoiding "generic calendar app" (Google Calendar, Outlook):
 * - Not just "events on dates" → **Friend activity visible on calendar grid**
 * - Not just "5 attendees" → **"Sarah (CS '26) +2 are going"**
 * - Not just "event list" → **Campus cohort context in previews**
 * - Visual priority: **Gold for "you're going", primary for "friends going"**
 *
 * ## Visual Hierarchy
 * 1. **Calendar Grid**: Date indicators (gold = you're going, primary = friends going, muted = other)
 * 2. **Event Previews**: Friends going highlighted first, then attendees
 * 3. **Campus Context**: Major/year shown in friend names
 *
 * ## Campus-Native Patterns
 * - ✅ Calendar dots show friend activity (not just "event exists")
 * - ✅ Event previews prioritize "Sarah +2 going" over total count
 * - ✅ Gold accent for user's RSVPs (campus behavioral signal)
 * - ✅ Academic calendar integration potential (exam weeks, breaks)
 */
const meta = {
  title: "04-Feed/EventsCalendar/Campus Context",
  component: EventsCalendar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EventsCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to create dates relative to today
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const inTwoDays = new Date(today);
inTwoDays.setDate(today.getDate() + 2);

/**
 * **Generic Event Calendar** (what NOT to do)
 *
 * Looks like Google Calendar or Outlook:
 * - Just shows events exist (no friend context)
 * - Generic attendee counts
 * - No campus-specific signals
 */
export const GenericEventCalendar: Story = {
  args: {
    events: [
      {
        id: "1",
        title: "Study Group",
        dateTime: {
          start: new Date(today.setHours(19, 0, 0, 0)),
          display: "7pm - 9pm",
        },
        location: {
          name: "Library",
          type: "on-campus",
        },
        space: {
          name: "CS Study Group",
          id: "cs-1",
        },
        attendees: {
          count: 23,
        },
        rsvp: {
          status: null,
        },
        category: "academic",
        // NO campus context - looks generic
      },
      {
        id: "2",
        title: "Campus Concert",
        dateTime: {
          start: tomorrow,
          display: "8pm - 11pm",
        },
        location: {
          name: "Student Union",
          type: "on-campus",
        },
        space: {
          name: "Campus Events",
          id: "events-1",
        },
        attendees: {
          count: 234,
        },
        rsvp: {
          status: null,
        },
        category: "social",
      },
    ],
  },
};

/**
 * **HIVE Campus-Native Calendar** (correct approach)
 *
 * Shows campus-specific context:
 * - Calendar dots indicate friend activity
 * - Gold dots for events you're attending
 * - Friend names + cohort in event previews
 * - Campus context throughout
 */
export const HiveCampusNativeCalendar: Story = {
  args: {
    events: [
      // TODAY: Event you're going to (gold indicator)
      {
        id: "1",
        title: "CS Study Group",
        dateTime: {
          start: new Date(today.setHours(19, 0, 0, 0)),
          display: "7pm - 9pm",
        },
        location: {
          name: "Capen Library, 3rd Floor",
          type: "on-campus",
        },
        space: {
          name: "CS Study Group",
          id: "cs-1",
        },
        attendees: {
          count: 23,
        },
        rsvp: {
          status: "going",
        },
        category: "academic",
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
          ],
          attendeeCohorts: {
            majorGroups: [{ major: "CS", count: 18 }],
          },
        },
      },
      // TOMORROW: Friends going (primary indicator)
      {
        id: "2",
        title: "Campus Concert",
        dateTime: {
          start: new Date(tomorrow.setHours(20, 0, 0, 0)),
          display: "8pm - 11pm",
        },
        location: {
          name: "Student Union, Main Hall",
          type: "on-campus",
        },
        space: {
          name: "Campus Events",
          id: "events-1",
        },
        attendees: {
          count: 456,
        },
        rsvp: {
          status: null,
        },
        category: "social",
        campusContext: {
          friendsGoing: [
            {
              id: "3",
              name: "Alex",
              avatar: "https://github.com/shadcn.png",
              year: "26",
            },
            {
              id: "4",
              name: "Jordan",
              year: "27",
            },
            {
              id: "5",
              name: "Casey",
            },
          ],
          isTrending: true,
          trendingCategory: "campus-wide",
          recentRsvps: 45,
        },
      },
      // IN 2 DAYS: Residential event
      {
        id: "3",
        title: "Ellicott Floor Party",
        dateTime: {
          start: new Date(inTwoDays.setHours(21, 0, 0, 0)),
          display: "9pm - 1am",
        },
        location: {
          name: "Ellicott Complex, Floor 3 Lounge",
          type: "on-campus",
        },
        space: {
          name: "Ellicott Community",
          id: "ellicott-1",
        },
        attendees: {
          count: 45,
        },
        rsvp: {
          status: "interested",
        },
        category: "social",
        campusContext: {
          friendsGoing: [
            {
              id: "6",
              name: "Morgan",
              avatar: "https://github.com/vercel.png",
            },
          ],
          spaceType: "residential",
          attendeeCohorts: {
            residentialGroups: [{ building: "Ellicott", count: 45 }],
          },
        },
      },
      // NEXT WEEK: Academic event
      {
        id: "4",
        title: "CSE 220 Midterm Review",
        dateTime: {
          start: new Date(nextWeek.setHours(18, 0, 0, 0)),
          display: "6pm - 8pm",
        },
        location: {
          name: "Capen Library, Study Room A",
          type: "on-campus",
        },
        space: {
          name: "CS Study Group",
          id: "cs-1",
        },
        attendees: {
          count: 34,
        },
        rsvp: {
          status: "going",
        },
        category: "academic",
        campusContext: {
          friendsGoing: [
            {
              id: "1",
              name: "Sarah",
              avatar: "https://github.com/shadcn.png",
              major: "CS",
              year: "26",
            },
          ],
          isTrending: true,
          trendingCategory: "CS students",
          attendeeCohorts: {
            majorGroups: [{ major: "CS", count: 34 }],
          },
        },
      },
    ],
  },
};

/**
 * **Week View with Dense Event Schedule**
 *
 * Shows multiple events across a week with varying campus contexts
 */
export const WeekViewDenseSchedule: Story = {
  args: {
    events: generateWeekEvents(),
  },
};

/**
 * **User's Personal Schedule** (events they're attending)
 *
 * Filtered to show only events user has RSVP'd to
 */
export const UserPersonalSchedule: Story = {
  args: {
    events: generateWeekEvents().filter((e) => e.rsvp.status === "going"),
    showOnlyUserEvents: true,
  },
};

/**
 * **Comparison: Side by Side**
 *
 * Direct comparison of generic vs HIVE-native
 */
export const Comparison: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          ❌ Generic Event Calendar (Google Calendar style)
        </h3>
        <EventsCalendar
          events={[
            {
              id: "1",
              title: "Study Group",
              dateTime: {
                start: today,
                display: "7pm - 9pm",
              },
              location: {
                name: "Library",
                type: "on-campus",
              },
              space: {
                name: "CS Study Group",
                id: "cs-1",
              },
              attendees: {
                count: 23,
              },
              rsvp: {
                status: null,
              },
              category: "academic",
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          ✅ HIVE Campus-Native (friend activity + cohort context)
        </h3>
        <EventsCalendar
          events={[
            {
              id: "1",
              title: "CS Study Group",
              dateTime: {
                start: today,
                display: "7pm - 9pm",
              },
              location: {
                name: "Capen Library, 3rd Floor",
                type: "on-campus",
              },
              space: {
                name: "CS Study Group",
                id: "cs-1",
              },
              attendees: {
                count: 23,
              },
              rsvp: {
                status: "going",
              },
              category: "academic",
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
                ],
                attendeeCohorts: {
                  majorGroups: [{ major: "CS", count: 18 }],
                },
              },
            },
          ]}
        />
      </div>
    </div>
  ),
};

// Helper function to generate realistic week of events
function generateWeekEvents(): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const baseDate = new Date();

  // Loop through next 7 days
  for (let i = 0; i < 7; i++) {
    const eventDate = new Date(baseDate);
    eventDate.setDate(baseDate.getDate() + i);

    // 1-3 events per day
    const eventsPerDay = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < eventsPerDay; j++) {
      const hour = 18 + j * 2; // 6pm, 8pm, 10pm
      eventDate.setHours(hour, 0, 0, 0);

      const isUserGoing = Math.random() > 0.6;
      const hasFriends = Math.random() > 0.4;

      events.push({
        id: `event-${i}-${j}`,
        title: getRandomEventTitle(),
        dateTime: {
          start: new Date(eventDate),
          display: `${hour > 12 ? hour - 12 : hour}pm - ${hour + 2 > 12 ? hour : hour + 2}pm`,
        },
        location: {
          name: getRandomLocation(),
          type: "on-campus",
        },
        space: {
          name: getRandomSpace(),
          id: `space-${i}`,
        },
        attendees: {
          count: Math.floor(Math.random() * 100) + 10,
        },
        rsvp: {
          status: isUserGoing ? "going" : Math.random() > 0.7 ? "interested" : null,
        },
        category: getRandomCategory(),
        campusContext: hasFriends ? {
          friendsGoing: [
            {
              id: "1",
              name: "Sarah",
              avatar: "https://github.com/shadcn.png",
              major: "CS",
              year: "26",
            },
            ...(Math.random() > 0.5 ? [{
              id: "2",
              name: "Jake",
              avatar: "https://github.com/vercel.png",
              major: "Engineering",
              year: "27",
            }] : []),
          ],
        } : undefined,
      });
    }
  }

  return events;
}

function getRandomEventTitle(): string {
  const titles = [
    "CS Study Group",
    "Open Mic Night",
    "Yoga Session",
    "Career Fair",
    "Greek Week Kickoff",
    "Campus Concert",
    "Mindfulness Meditation",
    "Game Night",
    "Movie Screening",
    "Pizza Party",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomLocation(): string {
  const locations = [
    "Capen Library, 3rd Floor",
    "Student Union, Main Hall",
    "Recreation Center",
    "Ellicott Complex",
    "Governors Residence Hall",
    "Alumni Arena",
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomSpace(): string {
  const spaces = [
    "CS Study Group",
    "Campus Events",
    "Greek Life",
    "Wellness Center",
    "Ellicott Community",
  ];
  return spaces[Math.floor(Math.random() * spaces.length)];
}

function getRandomCategory(): CalendarEvent["category"] {
  const categories: CalendarEvent["category"][] = ["social", "academic", "sports", "greek", "wellness"];
  return categories[Math.floor(Math.random() * categories.length)];
}
