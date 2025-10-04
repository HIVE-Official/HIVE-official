import type { Meta, StoryObj } from "@storybook/react";
import { SpaceEventsPanel, SpaceEvent } from "../../atomic/organisms/space-events-panel";

/**
 * # SpaceEventsPanel
 *
 * Organism component displaying upcoming events in a space (40% sidebar component).
 * Shows event details, RSVP counts, and allows leaders to create new events.
 *
 * ## HIVE Motion System
 * - Smooth hover effects on event cards
 * - Border color transition on hover
 * - RSVP button state transitions
 *
 * ## Features
 * - **Event Cards**: Compact event display with date, time, location
 * - **RSVP System**: Going/Not going toggle with attendee count
 * - **Event Types**: Badge indicators (academic, social, workshop, meeting)
 * - **Empty States**: Helpful prompts when no events exist
 * - **Leader Actions**: Create event button for space leaders
 * - **Smart Filtering**: Automatic upcoming vs past event filtering
 * - **Date Formatting**: Intelligent date/time display (same day vs multi-day)
 *
 * ## Usage
 * ```tsx
 * <SpaceEventsPanel
 *   events={upcomingEvents}
 *   canCreateEvents={isLeader}
 *   onCreateEvent={() => openEventModal()}
 *   onEventClick={(event) => navigate(`/events/${event.id}`)}
 *   onRSVP={(eventId, attending) => handleRSVP(eventId, attending)}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpaceEventsPanel",
  component: SpaceEventsPanel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceEventsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample event data
const upcomingEvents: SpaceEvent[] = [
  {
    id: "1",
    title: "Midterm Study Session",
    description: "Group study session to prepare for upcoming CS midterms. Bring your laptops and questions!",
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // +3 hours
    location: "Lockwood Library, 3rd Floor",
    organizer: {
      name: "Sarah Chen",
      handle: "@sarahc",
      avatar: "https://github.com/shadcn.png",
    },
    rsvpCount: 12,
    isAttending: true,
    type: "academic",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Pizza Social",
    description: "End of semester celebration! Free pizza and drinks for all CS Study Group members.",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // +2 hours
    location: "Student Union, Room 201",
    organizer: {
      name: "Alex Morgan",
      handle: "@alex",
      avatar: "https://github.com/vercel.png",
    },
    rsvpCount: 28,
    isAttending: false,
    type: "social",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Career Workshop: Tech Interviews",
    description: "Learn strategies for acing technical interviews with industry professionals.",
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000), // +90 minutes
    location: "Davis Hall 101",
    organizer: {
      name: "Jordan Lee",
      handle: "@jordan",
    },
    rsvpCount: 45,
    isAttending: true,
    type: "workshop",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Hackathon Prep Meetup",
    description: "Form teams and brainstorm ideas for the upcoming UB Hacks.",
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // +1 hour
    location: "Capen Hall, Tech Commons",
    rsvpCount: 18,
    isAttending: false,
    type: "meeting",
    status: "upcoming",
  },
];

const pastEvent: SpaceEvent = {
  id: "5",
  title: "Welcome Back Meeting",
  description: "Kickoff meeting for the spring semester.",
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // +1 hour
  location: "NSC 225",
  rsvpCount: 34,
  type: "meeting",
  status: "completed",
};

/**
 * Default events panel with upcoming events
 */
export const Default: Story = {
  args: {
    events: upcomingEvents.slice(0, 3),
    onEventClick: (event) => console.log("Event clicked:", event),
    onRSVP: (eventId, attending) => console.log("RSVP:", eventId, attending),
  },
};

/**
 * As space leader - can create new events
 */
export const AsSpaceLeader: Story = {
  args: {
    events: upcomingEvents,
    canCreateEvents: true,
    onCreateEvent: () => console.log("Create new event"),
    onEventClick: (event) => console.log("Event clicked:", event),
    onRSVP: (eventId, attending) => console.log("RSVP:", eventId, attending),
  },
};

/**
 * Empty state - no upcoming events
 */
export const EmptyState: Story = {
  args: {
    events: [],
    emptyStateMessage: "No upcoming events scheduled",
  },
};

/**
 * Empty state as leader - can create first event
 */
export const EmptyStateAsLeader: Story = {
  args: {
    events: [],
    canCreateEvents: true,
    emptyStateMessage: "No events yet - create your first event!",
    onCreateEvent: () => console.log("Create first event"),
  },
};

/**
 * Single upcoming event
 */
export const SingleEvent: Story = {
  args: {
    events: [upcomingEvents[0]],
    canCreateEvents: true,
    onCreateEvent: () => console.log("Create event"),
    onEventClick: (event) => console.log("Event clicked:", event),
    onRSVP: (eventId, attending) => console.log("RSVP:", eventId, attending),
  },
};

/**
 * Many upcoming events (busy calendar)
 */
export const BusyCalendar: Story = {
  args: {
    events: [
      ...upcomingEvents,
      {
        id: "6",
        title: "Weekly Office Hours",
        startDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
        location: "Virtual - Zoom",
        rsvpCount: 8,
        type: "meeting",
        status: "upcoming",
      },
      {
        id: "7",
        title: "Alumni Panel Discussion",
        description: "Hear from recent CS grads about their career paths.",
        startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
        location: "Online Event",
        rsvpCount: 67,
        type: "workshop",
        status: "upcoming",
      },
    ],
    canCreateEvents: true,
    onCreateEvent: () => console.log("Create event"),
    onEventClick: (event) => console.log("Event clicked:", event),
    onRSVP: (eventId, attending) => console.log("RSVP:", eventId, attending),
  },
};

/**
 * Different event types
 */
export const EventTypes: Story = {
  args: {
    events: [
      { ...upcomingEvents[0], type: "academic" },
      { ...upcomingEvents[1], type: "social" },
      { ...upcomingEvents[2], type: "workshop" },
      { ...upcomingEvents[3], type: "meeting" },
    ],
    onEventClick: (event) => console.log("Event clicked:", event),
    onRSVP: (eventId, attending) => console.log("RSVP:", eventId, attending),
  },
};

/**
 * All-day events
 */
export const AllDayEvents: Story = {
  args: {
    events: [
      {
        id: "8",
        title: "Campus Career Fair",
        description: "Meet with employers and explore internship opportunities.",
        startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        location: "Student Union Ballroom",
        rsvpCount: 234,
        isAttending: true,
        type: "other",
        isAllDay: true,
        status: "upcoming",
      },
      {
        id: "9",
        title: "Spring Break",
        description: "No classes - enjoy the break!",
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000),
        type: "other",
        isAllDay: true,
        status: "upcoming",
      },
    ],
    onEventClick: (event) => console.log("Event clicked:", event),
  },
};

/**
 * With past events (showPastEvents enabled)
 */
export const WithPastEvents: Story = {
  args: {
    events: [pastEvent, ...upcomingEvents.slice(0, 2)],
    showPastEvents: true,
    onEventClick: (event) => console.log("Event clicked:", event),
    onRSVP: (eventId, attending) => console.log("RSVP:", eventId, attending),
  },
};

/**
 * HIVE Pattern: In 40% sidebar with About section
 */
export const In40Sidebar: Story = {
  render: () => (
    <div className="flex gap-6 w-full max-w-6xl">
      {/* 60% Main Content */}
      <div className="flex-[6] space-y-4">
        <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
          <h3 className="text-lg font-semibold text-foreground">60% Main Feed Area</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Space posts and content go here
          </p>
        </div>
      </div>

      {/* 40% Sidebar */}
      <div className="flex-[4] space-y-4">
        {/* About Section Placeholder */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">About</h4>
          <p className="text-xs text-muted-foreground">
            Space description and info would go here
          </p>
        </div>

        {/* Events Panel */}
        <SpaceEventsPanel
          events={upcomingEvents.slice(0, 3)}
          canCreateEvents={true}
          onCreateEvent={() => console.log("Create event")}
          onEventClick={(event) => console.log("Event clicked:", event)}
          onRSVP={(eventId, attending) => console.log("RSVP:", eventId, attending)}
        />

        {/* Resources Panel Placeholder */}
        <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
          <p className="text-xs text-muted-foreground">
            Resources panel will go here
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive demo with all features
 */
export const InteractiveDemo: Story = {
  args: {
    events: upcomingEvents,
    canCreateEvents: true,
    onCreateEvent: () => alert("Opening event creation modal..."),
    onEventClick: (event) => alert(`Viewing event: ${event.title}`),
    onRSVP: (eventId, attending) =>
      alert(`RSVP ${attending ? "confirmed" : "cancelled"} for event ${eventId}`),
  },
};
