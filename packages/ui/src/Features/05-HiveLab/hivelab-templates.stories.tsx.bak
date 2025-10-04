import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { HiveLabTemplateBrowser, type Template } from "../../atomic/organisms/hivelab-template-browser";

/**
 * # HiveLab Templates - 60-Second Deploy
 *
 * **The Quick Start Experience**
 *
 * Templates are pre-wired element combinations that let space leaders deploy
 * working tools in 60 seconds. Think "WordPress themes" but for community tools.
 *
 * ## Philosophy
 * - **Not Fixed**: All templates are fully customizable
 * - **Fork & Modify**: Make it your own, then share back
 * - **Learn by Example**: See how successful tools are built
 * - **Social Proof**: Real usage stats guide decisions
 *
 * ## Discovery Methods
 * 1. **Trending This Week**: What's working on campus now
 * 2. **5-Minute Builds**: Simple tools, big impact
 * 3. **Most Forked**: Community-validated favorites
 * 4. **Problem-First**: Browse by what you need to solve
 *
 * ## Template Intelligence
 * - **Smart Defaults**: Pre-filled with likely values ("Thursday 7pm")
 * - **Context-Aware**: Knows your space's patterns
 * - **Success Metrics**: "80% response rate" displayed prominently
 * - **Creator Attribution**: Build reputation as tool creator
 *
 * ## Real Examples
 * - "Meeting Scheduler" - [Button] → [Date Picker] → [Notify] → [Calendar]
 * - "Anonymous Feedback" - [Text Input] → [Filter] → [Database] → [Chart]
 * - "Task Roulette" - [Button] → [Random Picker] → [Member Select] → [Notify]
 * - "RSVP Tracker" - [Button] → [Counter] → [Leaderboard] → [Post]
 *
 * ## User Flow
 * 1. Leader opens template marketplace
 * 2. Browses by problem or category
 * 3. Sees success stats and social proof
 * 4. Clicks "Quick Deploy" → tool goes live
 * 5. OR forks to customize first
 * 6. Members start using immediately
 */
const meta = {
  title: "05-HiveLab/Templates",
  component: HiveLabTemplateBrowser,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HiveLabTemplateBrowser>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample templates with realistic data
const sampleTemplates: Template[] = [
  // Academic Tools
  {
    id: "study-group-scheduler",
    name: "Study Group Scheduler",
    description: "Coordinate study sessions with automatic time-slot matching and room booking",
    icon: "📚",
    category: "academic",
    elementCount: 8,
    complexity: "medium",
    deploysCount: 127,
    forksCount: 34,
    successRate: 85,
    responseRate: 78,
    creatorName: "Sarah Chen",
    creatorHandle: "@sarachen",
    isTrending: true,
    tags: ["study", "coordination", "scheduling"],
    preview: {
      elements: ["Date Picker", "Member Picker", "If/Then", "Notify"],
      flow: "Pick time → Select members → Auto-match → Send reminders",
    },
  },
  {
    id: "exam-prep-tracker",
    name: "Exam Prep Tracker",
    description: "Track study progress with shared flashcard decks and progress leaderboard",
    icon: "📝",
    category: "academic",
    elementCount: 12,
    complexity: "medium",
    deploysCount: 89,
    forksCount: 22,
    successRate: 82,
    responseRate: 71,
    creatorName: "Mike Johnson",
    creatorHandle: "@mikej",
    tags: ["exam", "study", "tracking"],
  },
  {
    id: "project-team-matcher",
    name: "Project Team Matcher",
    description: "Match students by skills, availability, and project interests",
    icon: "👥",
    category: "academic",
    elementCount: 15,
    complexity: "complex",
    deploysCount: 56,
    forksCount: 18,
    successRate: 88,
    creatorName: "Alex Park",
    creatorHandle: "@alexpark",
    isNew: true,
    tags: ["team", "matching", "skills"],
  },

  // Social Tools
  {
    id: "party-rsvp-system",
    name: "Party RSVP System",
    description: "Track RSVPs with capacity limits, +1s, and automatic waitlist",
    icon: "🎉",
    category: "social",
    elementCount: 10,
    complexity: "medium",
    deploysCount: 234,
    forksCount: 67,
    successRate: 92,
    responseRate: 89,
    creatorName: "Emma Davis",
    creatorHandle: "@emmad",
    isTrending: true,
    tags: ["party", "rsvp", "events"],
  },
  {
    id: "roommate-finder",
    name: "Roommate Compatibility Finder",
    description: "Match roommates by sleep schedule, cleanliness, and lifestyle preferences",
    icon: "🏠",
    category: "social",
    elementCount: 18,
    complexity: "complex",
    deploysCount: 178,
    forksCount: 45,
    successRate: 86,
    responseRate: 82,
    creatorName: "Jordan Lee",
    creatorHandle: "@jordanlee",
    isTrending: true,
    tags: ["housing", "matching", "lifestyle"],
  },
  {
    id: "ride-share-coordinator",
    name: "Ride Share Coordinator",
    description: "Coordinate rides to campus with departure times and split costs",
    icon: "🚗",
    category: "social",
    elementCount: 11,
    complexity: "medium",
    deploysCount: 145,
    forksCount: 38,
    successRate: 84,
    creatorName: "Chris Taylor",
    creatorHandle: "@christ",
    tags: ["rides", "coordination", "money"],
  },

  // Greek Life Tools
  {
    id: "rush-interest-tracker",
    name: "Rush Interest Tracker",
    description: "Track potential new members with automatic follow-ups and ratings",
    icon: "🏛️",
    category: "greek-life",
    elementCount: 14,
    complexity: "medium",
    deploysCount: 92,
    forksCount: 28,
    successRate: 90,
    responseRate: 85,
    creatorName: "Ashley Brown",
    creatorHandle: "@ashleyb",
    tags: ["rush", "recruitment", "tracking"],
  },
  {
    id: "chapter-vote-system",
    name: "Anonymous Chapter Voting",
    description: "Secure voting for chapter decisions with instant results",
    icon: "🗳️",
    category: "greek-life",
    elementCount: 7,
    complexity: "simple",
    deploysCount: 156,
    forksCount: 41,
    successRate: 94,
    responseRate: 91,
    creatorName: "Ryan Martinez",
    creatorHandle: "@ryanm",
    isTrending: true,
    tags: ["voting", "anonymous", "decisions"],
  },
  {
    id: "formal-date-matcher",
    name: "Formal Date Matcher",
    description: "Match members with dates based on preferences and mutual interest",
    icon: "💃",
    category: "greek-life",
    elementCount: 16,
    complexity: "complex",
    deploysCount: 73,
    forksCount: 19,
    successRate: 81,
    creatorName: "Taylor Swift",
    creatorHandle: "@tswift",
    isNew: true,
    tags: ["formal", "dating", "matching"],
  },

  // Residential Tools
  {
    id: "quiet-hours-enforcer",
    name: "Quiet Hours Reminder",
    description: "Automated reminders for quiet hours with violation reporting",
    icon: "🤫",
    category: "residential",
    elementCount: 6,
    complexity: "simple",
    deploysCount: 64,
    forksCount: 15,
    successRate: 76,
    creatorName: "Sam Wilson",
    creatorHandle: "@samw",
    tags: ["quiet", "rules", "reminders"],
  },
  {
    id: "laundry-tracker",
    name: "Laundry Availability Tracker",
    description: "Real-time laundry machine status with notifications when free",
    icon: "👕",
    category: "residential",
    elementCount: 9,
    complexity: "simple",
    deploysCount: 198,
    forksCount: 52,
    successRate: 88,
    responseRate: 83,
    creatorName: "Pat Kim",
    creatorHandle: "@patkim",
    isTrending: true,
    tags: ["laundry", "tracking", "notifications"],
  },

  // Career Tools
  {
    id: "internship-tracker",
    name: "Internship Application Tracker",
    description: "Track applications with deadlines, statuses, and follow-up reminders",
    icon: "💼",
    category: "career",
    elementCount: 13,
    complexity: "medium",
    deploysCount: 112,
    forksCount: 31,
    successRate: 87,
    creatorName: "Jamie Fox",
    creatorHandle: "@jamiefox",
    tags: ["career", "tracking", "applications"],
  },
  {
    id: "mock-interview-scheduler",
    name: "Mock Interview Scheduler",
    description: "Schedule practice interviews with automatic question generation",
    icon: "🎤",
    category: "career",
    elementCount: 11,
    complexity: "medium",
    deploysCount: 78,
    forksCount: 21,
    successRate: 83,
    creatorName: "Morgan Lee",
    creatorHandle: "@morganl",
    isNew: true,
    tags: ["interview", "practice", "career"],
  },

  // Wellness Tools
  {
    id: "mental-health-checkin",
    name: "Daily Wellness Check-In",
    description: "Anonymous mood tracking with resource recommendations",
    icon: "💚",
    category: "wellness",
    elementCount: 8,
    complexity: "simple",
    deploysCount: 143,
    forksCount: 39,
    successRate: 79,
    responseRate: 74,
    creatorName: "Casey Green",
    creatorHandle: "@caseyg",
    tags: ["wellness", "mental-health", "tracking"],
  },
  {
    id: "workout-buddy-finder",
    name: "Workout Buddy Finder",
    description: "Match gym partners by schedule, experience level, and fitness goals",
    icon: "💪",
    category: "wellness",
    elementCount: 12,
    complexity: "medium",
    deploysCount: 167,
    forksCount: 44,
    successRate: 86,
    responseRate: 81,
    creatorName: "Drew Anderson",
    creatorHandle: "@drewa",
    isTrending: true,
    tags: ["fitness", "matching", "workout"],
  },
];

/**
 * Complete Template Marketplace
 */
export const TemplateMarketplace: Story = {
  render: () => {
    return (
      <div className="h-screen bg-background">
        <HiveLabTemplateBrowser
          templates={sampleTemplates}
          onTemplateSelect={(template) =>
            alert(`Viewing: ${template.name}\n\n${template.description}`)
          }
          onForkTemplate={(id) => {
            const template = sampleTemplates.find((t) => t.id === id);
            alert(`Forking: ${template?.name}\n\nYou can now customize this template before deploying.`);
          }}
          onDeployTemplate={(id) => {
            const template = sampleTemplates.find((t) => t.id === id);
            alert(
              `Deploying: ${template?.name}\n\nTool deployed to your space!\nMembers can use it immediately.`
            );
          }}
          isLeader={true}
        />
      </div>
    );
  },
};

/**
 * Trending Templates Only
 */
export const TrendingOnly: Story = {
  render: () => {
    const trending = sampleTemplates.filter((t) => t.isTrending);
    return (
      <div className="h-screen bg-background">
        <HiveLabTemplateBrowser
          templates={trending}
          onTemplateSelect={(template) => console.log("Selected:", template)}
          onForkTemplate={(id) => console.log("Forking:", id)}
          onDeployTemplate={(id) => console.log("Deploying:", id)}
          isLeader={true}
        />
      </div>
    );
  },
};

/**
 * Academic Templates Focus
 */
export const AcademicTemplates: Story = {
  render: () => {
    const academic = sampleTemplates.filter((t) => t.category === "academic");
    return (
      <div className="h-screen bg-background">
        <HiveLabTemplateBrowser
          templates={academic}
          onTemplateSelect={(template) => console.log("Selected:", template)}
          onForkTemplate={(id) => console.log("Forking:", id)}
          onDeployTemplate={(id) => console.log("Deploying:", id)}
          isLeader={true}
        />
      </div>
    );
  },
};

/**
 * Greek Life Templates Focus
 */
export const GreekLifeTemplates: Story = {
  render: () => {
    const greekLife = sampleTemplates.filter((t) => t.category === "greek-life");
    return (
      <div className="h-screen bg-background">
        <HiveLabTemplateBrowser
          templates={greekLife}
          onTemplateSelect={(template) => console.log("Selected:", template)}
          onForkTemplate={(id) => console.log("Forking:", id)}
          onDeployTemplate={(id) => console.log("Deploying:", id)}
          isLeader={true}
        />
      </div>
    );
  },
};

/**
 * Simple Tools Only (5-Minute Builds)
 */
export const QuickBuilds: Story = {
  render: () => {
    const simple = sampleTemplates.filter((t) => t.complexity === "simple");
    return (
      <div className="h-screen bg-background">
        <HiveLabTemplateBrowser
          templates={simple}
          onTemplateSelect={(template) => console.log("Selected:", template)}
          onForkTemplate={(id) => console.log("Forking:", id)}
          onDeployTemplate={(id) => console.log("Deploying:", id)}
          isLeader={true}
        />
      </div>
    );
  },
};

/**
 * With Search Active
 */
export const WithSearch: Story = {
  render: () => {
    const [search, setSearch] = React.useState("schedule");
    return (
      <div className="h-screen bg-background">
        <HiveLabTemplateBrowser
          templates={sampleTemplates}
          searchQuery={search}
          onSearchChange={setSearch}
          onTemplateSelect={(template) => console.log("Selected:", template)}
          onForkTemplate={(id) => console.log("Forking:", id)}
          onDeployTemplate={(id) => console.log("Deploying:", id)}
          isLeader={true}
        />
      </div>
    );
  },
};

/**
 * Empty State (No Templates)
 */
export const EmptyState: Story = {
  render: () => {
    return (
      <div className="h-screen bg-background">
        <HiveLabTemplateBrowser
          templates={[]}
          onTemplateSelect={(template) => console.log("Selected:", template)}
          onForkTemplate={(id) => console.log("Forking:", id)}
          onDeployTemplate={(id) => console.log("Deploying:", id)}
          isLeader={true}
        />
      </div>
    );
  },
};
