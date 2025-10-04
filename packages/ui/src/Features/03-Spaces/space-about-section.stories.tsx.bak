import type { Meta, StoryObj } from "@storybook/react";
import { SpaceAboutSection } from "../../atomic/organisms/space-about-section";

/**
 * # SpaceAboutSection
 *
 * Organism component for displaying space information in the 40% sidebar.
 * Shows description, rules, tags, stats, and creator information.
 *
 * ## HIVE Motion System
 * - Smooth transitions on expand/collapse
 * - Hover effects on edit buttons
 * - Portrait card styling for creator avatar (10×8px)
 *
 * ## Features
 * - **Description**: Rich text space description
 * - **Tags**: Searchable tags with # prefix
 * - **Rules**: Expandable community guidelines (shows 3, expands to all)
 * - **Quick stats**: Member/Post/Event counts in grid
 * - **Creator info**: Portrait card with name, handle, date
 * - **Leader actions**: Edit buttons for description and rules
 *
 * ## Usage
 * ```tsx
 * <SpaceAboutSection
 *   description="Weekly study sessions for Computer Science students"
 *   tags={["computer-science", "study-group"]}
 *   rules={["Be respectful", "No spam", "Help each other"]}
 *   memberCount={87}
 *   postCount={234}
 *   createdBy={{ name: "Sarah Chen", handle: "@sarahc" }}
 *   isLeader={true}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpaceAboutSection",
  component: SpaceAboutSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceAboutSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default about section
 */
export const Default: Story = {
  args: {
    description: "Weekly study sessions for Computer Science students. Join us to collaborate on assignments, prepare for exams, and build lasting connections with fellow CS majors.",
    tags: ["computer-science", "study-group", "academic"],
    category: "Academic",
    type: "academic",
    memberCount: 87,
    postCount: 234,
    eventCount: 12,
    createdAt: new Date("2024-01-15"),
    createdBy: {
      name: "Sarah Chen",
      handle: "@sarahc",
      avatar: "https://github.com/shadcn.png",
    },
    rules: [
      "Be respectful and kind to all members",
      "No spam or self-promotion",
      "Keep discussions on-topic and relevant",
      "Help each other learn and grow",
    ],
  },
};

/**
 * As space leader with edit controls
 */
export const AsLeader: Story = {
  args: {
    description: "Official gaming community for UB students. Organize tournaments, find teammates, and join weekly game nights.",
    tags: ["gaming", "esports", "tournaments", "social"],
    category: "Gaming",
    type: "social",
    memberCount: 143,
    postCount: 567,
    eventCount: 28,
    createdAt: new Date("2024-02-01"),
    createdBy: {
      name: "Alex Morgan",
      handle: "@alex",
      avatar: "https://github.com/vercel.png",
    },
    rules: [
      "Be a good sport - winning isn't everything",
      "No toxic behavior or harassment",
      "Schedule conflicts? Communicate early",
      "Share your gaming setups and tips",
      "Keep memes gaming-related",
    ],
    isLeader: true,
    onEditDescription: () => console.log("Edit description"),
    onEditRules: () => console.log("Edit rules"),
  },
};

/**
 * Minimal about section (no rules or creator)
 */
export const Minimal: Story = {
  args: {
    description: "Stay updated on all campus happenings, festivals, and student activities.",
    tags: ["events", "campus", "social"],
    memberCount: 256,
    postCount: 892,
  },
};

/**
 * With many rules (expandable)
 */
export const ManyRules: Story = {
  args: {
    description: "Private community for engineering students. Share resources, collaborate on projects, and network with peers in your major.",
    tags: ["engineering", "networking", "projects"],
    category: "Engineering",
    type: "academic",
    memberCount: 92,
    postCount: 178,
    eventCount: 15,
    rules: [
      "Respect confidentiality - what's shared here stays here",
      "No cheating or academic dishonesty",
      "Share resources and help each other",
      "Keep discussions professional",
      "No politics or controversial topics",
      "Ask before sharing someone's work",
      "Be mindful of different skill levels",
      "Constructive criticism only",
    ],
    createdAt: new Date("2024-01-20"),
    createdBy: {
      name: "Jordan Lee",
      handle: "@jordan",
    },
  },
};

/**
 * Official university space
 */
export const OfficialSpace: Story = {
  args: {
    description: "Official announcements and resources from UB Housing & Residential Life. Stay informed about housing updates, maintenance, and community events.",
    tags: ["official", "housing", "announcements"],
    category: "Official",
    type: "official",
    memberCount: 1847,
    postCount: 423,
    eventCount: 67,
    createdAt: new Date("2023-08-01"),
    createdBy: {
      name: "UB Housing",
      handle: "@ub-housing",
    },
    rules: [
      "This is an official university space",
      "Follow UB student code of conduct",
      "Report maintenance issues through official channels",
      "Respect staff and fellow residents",
    ],
  },
};

/**
 * Long description with formatting
 */
export const LongDescription: Story = {
  args: {
    description: `Welcome to the UB Bulls Basketball Fan Community! 🏀

This is the official fan community for UB Bulls basketball. Whether you're a die-hard fan or just getting into the sport, you'll find game discussions, tailgate planning, and team updates here.

What we do:
• Live game threads during matches
• Tailgate coordination and meetups
• Player stats and analysis
• Season ticket holder discussions
• Road trip planning for away games

Go Bulls! 💙💛`,
    tags: ["basketball", "sports", "ub-bulls", "game-day"],
    category: "Sports",
    type: "interest",
    memberCount: 523,
    postCount: 1847,
    eventCount: 38,
    createdAt: new Date("2023-09-01"),
    createdBy: {
      name: "Marcus Johnson",
      handle: "@marcus",
      avatar: "https://github.com/shadcn.png",
    },
    rules: [
      "Keep it friendly - we're all Bulls fans here",
      "No trash talking other schools (too much)",
      "Game threads stay civil even when refs are blind",
    ],
  },
};

/**
 * New space (recently created)
 */
export const NewSpace: Story = {
  args: {
    description: "Just getting started! Join us to capture moments and improve your photography skills. We'll organize photo walks, workshops, and critiques.",
    tags: ["photography", "art", "creative"],
    category: "Arts",
    type: "interest",
    memberCount: 5,
    postCount: 2,
    eventCount: 0,
    createdAt: new Date(),
    createdBy: {
      name: "Luna Zhang",
      handle: "@luna",
      avatar: "https://github.com/vercel.png",
    },
    rules: [
      "Be constructive with feedback",
      "Give credit when sharing others' work",
      "All skill levels welcome",
    ],
  },
};

/**
 * HIVE Pattern: In 40% sidebar
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
        <SpaceAboutSection
          description="Weekly study sessions for Computer Science students. Join us to collaborate on assignments and prepare for exams."
          tags={["computer-science", "study-group"]}
          category="Academic"
          type="academic"
          memberCount={87}
          postCount={234}
          eventCount={12}
          createdAt={new Date("2024-01-15")}
          createdBy={{
            name: "Sarah Chen",
            handle: "@sarahc",
            avatar: "https://github.com/shadcn.png",
          }}
          rules={[
            "Be respectful and kind",
            "No spam or self-promotion",
            "Help each other learn",
          ]}
          isLeader={true}
          onEditDescription={() => console.log("Edit description")}
          onEditRules={() => console.log("Edit rules")}
        />

        <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
          <p className="text-xs text-muted-foreground">
            Other sidebar panels (Events, Resources, Members) go below
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive demo
 */
export const InteractiveDemo: Story = {
  args: {
    description: "Weekly study sessions for Computer Science students. Join us to collaborate on assignments, prepare for exams, and build lasting connections.",
    tags: ["computer-science", "study-group", "academic"],
    category: "Academic",
    type: "academic",
    memberCount: 87,
    postCount: 234,
    eventCount: 12,
    createdAt: new Date("2024-01-15"),
    createdBy: {
      name: "Sarah Chen",
      handle: "@sarahc",
      avatar: "https://github.com/shadcn.png",
    },
    rules: [
      "Be respectful and kind to all members",
      "No spam or self-promotion",
      "Keep discussions on-topic",
      "Help each other learn and grow",
      "Ask questions - there are no dumb questions",
    ],
    isLeader: true,
    onEditDescription: () => alert("Opening description editor..."),
    onEditRules: () => alert("Opening rules editor..."),
  },
};
