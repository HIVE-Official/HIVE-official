// Bounded Context Owner: Identity & Access Management Guild
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileLayout, type ProfileLayoutProps } from "../organisms/profile/profile-layout";

const meta: Meta<typeof ProfileLayout> = {
  title: "Organisms/Profile/Layout",
  component: ProfileLayout,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "dark" }
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-6xl space-y-6 bg-background p-6 sm:p-8 text-foreground">
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof ProfileLayout>;

const baseProps: ProfileLayoutProps = {
  header: {
    fullName: "Ada Lovelace",
    handle: "adalove",
    pronouns: "she/her",
    bio: "Builder of HiveLab automations and campus rituals. Leading cross-club coordination for research fellows.",
    campus: "State University",
    userType: "Faculty Advisor",
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop",
    tags: ["Coordination", "Robotics guild lead", "HiveLab operator"]
  },
  stats: [
    { label: "Profile completion", value: "92%", helperText: "Add your leadership note to reach 100%." },
    { label: "Spaces joined", value: "14", helperText: "Momentum trending upward this month." },
    { label: "Signals shipped", value: "8", helperText: "Keep publishing rituals for your teams." },
    { label: "HiveLab streak", value: "6 days", accent: "success", helperText: "Campus ops loves your cadence." }
  ],
  activity: [
    {
      id: "activity-1",
      type: "tool_published",
      occurredAt: "Today · 10:12 AM",
      description: "Published the HiveLab onboarding ritual",
      metadata: "Now visible to Robotics Society and Campus Coordinators."
    },
    {
      id: "activity-2",
      type: "connection_made",
      occurredAt: "Yesterday · 5:02 PM",
      description: "Connected with Priya Desai",
      metadata: "Mutual projects: Sustainability Coalition, Campus Ops"
    },
    {
      id: "activity-3",
      type: "space_joined",
      occurredAt: "Mon · 3:45 PM",
      description: "Joined the Systems Thinking Studio space"
    }
  ],
  connections: [
    {
      id: "connection-1",
      name: "Miles Carter",
      handle: "@miles",
      mutualSpaces: 6,
      mutualConnections: 12,
      lastActive: "2h ago",
      avatarUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop"
    },
    {
      id: "connection-2",
      name: "Priya Desai",
      handle: "@priya",
      mutualSpaces: 3,
      mutualConnections: 7,
      lastActive: "1d ago",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop"
    },
    {
      id: "connection-3",
      name: "Jonah Reed",
      handle: "@jreed",
      mutualSpaces: 5,
      mutualConnections: 9,
      lastActive: "3d ago"
    }
  ],
  recommendations: [
    {
      id: "rec-1",
      name: "Systems Thinking Studio",
      reason: "Matches your coordination track and robotics interest.",
      joinUrl: "#",
      signal: "interest_match",
      previewImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop",
      previewAlt: "Collaborative studio with whiteboards"
    },
    {
      id: "rec-2",
      name: "Campus Community Ops",
      reason: "4 mutual connections already collaborating here.",
      joinUrl: "#",
      memberCount: 980,
      signal: "mutual_connection",
      previewImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&auto=format&fit=crop",
      previewAlt: "Team syncing around laptops with campus skyline"
    },
    {
      id: "rec-3",
      name: "HiveLab Beta Cohort",
      reason: "Trending for student-led automation pilots.",
      joinUrl: "#",
      signal: "trending"
    }
  ],
  spaces: {
    explore: [
      {
        id: "explore-1",
        name: "Design Systems Guild",
        description: "Shared tokens, kit reviews, and component audits.",
        joinUrl: "#",
        memberCount: 420,
        badge: "Curated",
        previewImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop",
        previewAlt: "Designers collaborating over laptops"
      },
      {
        id: "explore-2",
        name: "Ops Leads Collective",
        description: "High-signal rituals across campus programs.",
        joinUrl: "#",
        memberCount: 312,
        badge: "Trending",
        previewImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=900&auto=format&fit=crop",
        previewAlt: "Team in discussion with sticky notes"
      },
      {
        id: "explore-3",
        name: "Community Ambassadors",
        description: "Storytelling, tabling, and launch playbooks.",
        joinUrl: "#",
        memberCount: 158
      }
    ],
    mine: [
      {
        id: "mine-1",
        name: "Robotics Society",
        description: "Sprint sync Mondays · 7:00 PM",
        joinUrl: "#",
        memberCount: 96,
        badge: "Active"
      },
      {
        id: "mine-2",
        name: "HiveLab Beta Cohort",
        description: "Automation pilots, weekly retros, launch prep.",
        joinUrl: "#",
        memberCount: 54,
        badge: "In Progress"
      },
      {
        id: "mine-3",
        name: "Campus Ops Council",
        description: "Ops rotation, campus rituals, harmonised launches.",
        joinUrl: "#",
        memberCount: 128,
        badge: "Core team"
      }
    ]
  },
  visibility: "campus"
};

export const Default: Story = {
  args: baseProps
};

export const GhostMode: Story = {
  args: {
    ...baseProps,
    ghostMode: true,
    visibility: "connections",
    header: {
      ...baseProps.header,
      ghostMode: true,
      tags: ["Private coordination", "Limited visibility"],
      bio: "Ghosting campus while spinning up private launch teams. Ping for limited seats."
    }
  }
};

export const Empty: Story = {
  args: {
    ...baseProps,
    stats: [
      { label: "Profile completion", value: "0", helperText: "Add your campus affiliation to start." },
      { label: "Spaces joined", value: "0", helperText: "Join three recommended spaces to unlock recs." },
      { label: "Signals shipped", value: "0" },
      { label: "HiveLab streak", value: "0" }
    ],
    activity: [],
    connections: [],
    recommendations: [],
    spaces: {
      explore: [],
      mine: []
    },
    visibility: "public",
    ghostMode: false
  }
};
