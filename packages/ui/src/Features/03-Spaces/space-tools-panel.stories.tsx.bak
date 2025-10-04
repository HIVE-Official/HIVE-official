import type { Meta, StoryObj } from "@storybook/react";
import { SpaceToolsPanel, type Tool } from "../../atomic/organisms/space-tools-panel";

/**
 * # SpaceToolsPanel
 *
 * Sidebar widget displaying default tools + custom HiveLab tools for spaces.
 * Essential part of the 40% sidebar in the Spaces 60/40 layout.
 *
 * ## HIVE Tools System
 * - **Default Tools**: Event, Poll, Task, Resource (every space)
 * - **Custom Tools**: Built in HiveLab by space leaders
 * - **Permissions**: All members vs leaders-only access
 *
 * ## Features
 * - **Default Tools Grid**: 2x2 grid of primary tools
 * - **Custom Tools List**: HiveLab-created tools with usage stats
 * - **Create Tool CTA**: Leaders can build new tools
 * - **Tool Management**: Access HiveLab builder
 * - **Usage Analytics**: Display tool usage counts
 * - **Permission Badges**: Visual indicators for access levels
 *
 * ## Integration with Spaces
 * This component appears in the 40% sidebar alongside:
 * - About Section
 * - Events Panel
 * - Resources Panel
 * - Members Panel
 *
 * ## Usage
 * ```tsx
 * <SpaceToolsPanel
 *   defaultTools={defaultTools}
 *   customTools={customHiveLabTools}
 *   isLeader={isSpaceLeader}
 *   onToolClick={(tool) => openToolModal(tool)}
 *   onCreateTool={() => navigate('/hivelab/builder')}
 *   onManageTools={() => navigate('/hivelab/analytics')}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpaceToolsPanel",
  component: SpaceToolsPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceToolsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCustomTools: Tool[] = [
  {
    id: "signup-sheet",
    name: "Event Sign-up",
    icon: "✍️",
    color: "#3b82f6",
    description: "Sign up for upcoming events",
    isCustom: true,
    createdBy: "Sarah Chen",
    usageCount: 87,
    permissions: "all",
  },
  {
    id: "budget-request",
    name: "Budget Request",
    icon: "💰",
    color: "#10b981",
    description: "Submit budget requests",
    isCustom: true,
    createdBy: "Alex Morgan",
    usageCount: 23,
    permissions: "leaders",
  },
  {
    id: "anonymous-feedback",
    name: "Feedback Form",
    icon: "💬",
    color: "#8b5cf6",
    description: "Anonymous feedback",
    isCustom: true,
    createdBy: "Jordan Lee",
    usageCount: 156,
    permissions: "all",
  },
];

/**
 * Default tools only (no custom HiveLab tools added yet)
 */
export const DefaultToolsOnly: Story = {
  args: {
    onToolClick: (tool) => console.log("Tool clicked:", tool),
    onManageTools: () => console.log("Manage tools"),
    onCreateTool: () => console.log("Create tool in HiveLab"),
  },
};

/**
 * Member view (not a space leader)
 */
export const MemberView: Story = {
  args: {
    isLeader: false,
    onToolClick: (tool) => console.log("Tool clicked:", tool),
  },
};

/**
 * Leader view with create tool option
 */
export const LeaderView: Story = {
  args: {
    isLeader: true,
    onToolClick: (tool) => console.log("Tool clicked:", tool),
    onManageTools: () => console.log("Manage tools"),
    onCreateTool: () => console.log("Create tool in HiveLab"),
  },
};

/**
 * With custom HiveLab tools
 */
export const WithCustomTools: Story = {
  args: {
    customTools: sampleCustomTools,
    isLeader: true,
    onToolClick: (tool) => console.log("Tool clicked:", tool),
    onManageTools: () => console.log("Manage tools"),
    onCreateTool: () => console.log("Create tool in HiveLab"),
  },
};

/**
 * Active space with many custom tools
 */
export const ActiveSpaceTools: Story = {
  args: {
    customTools: [
      ...sampleCustomTools,
      {
        id: "study-group-finder",
        name: "Study Group Finder",
        icon: "📖",
        color: "#f59e0b",
        isCustom: true,
        usageCount: 45,
        permissions: "all",
      },
      {
        id: "note-share",
        name: "Note Sharing",
        icon: "📝",
        color: "#ec4899",
        isCustom: true,
        usageCount: 92,
        permissions: "all",
      },
    ],
    isLeader: true,
    onToolClick: (tool) => console.log("Tool clicked:", tool),
    onManageTools: () => console.log("Manage tools"),
    onCreateTool: () => console.log("Create tool in HiveLab"),
  },
};

/**
 * Greek life space with rush-specific tools
 */
export const GreekLifeTools: Story = {
  args: {
    customTools: [
      {
        id: "rush-interest",
        name: "Rush Interest Form",
        icon: "🎓",
        color: "#ef4444",
        isCustom: true,
        usageCount: 234,
        permissions: "all",
      },
      {
        id: "social-mixer",
        name: "Social Mixer RSVP",
        icon: "🎉",
        color: "#06b6d4",
        isCustom: true,
        usageCount: 87,
        permissions: "all",
      },
      {
        id: "anonymous-voting",
        name: "Anonymous Voting",
        icon: "🗳️",
        color: "#8b5cf6",
        isCustom: true,
        usageCount: 156,
        permissions: "leaders",
      },
    ],
    isLeader: true,
    onToolClick: (tool) => console.log("Tool clicked:", tool),
    onManageTools: () => console.log("Manage tools"),
    onCreateTool: () => console.log("Create tool in HiveLab"),
  },
};

/**
 * Residential space with dorm-specific tools
 */
export const ResidentialTools: Story = {
  args: {
    customTools: [
      {
        id: "roommate-finder",
        name: "Roommate Finder",
        icon: "🏠",
        color: "#10b981",
        isCustom: true,
        usageCount: 67,
        permissions: "all",
      },
      {
        id: "noise-complaint",
        name: "Noise Report",
        icon: "🔇",
        color: "#f59e0b",
        isCustom: true,
        usageCount: 12,
        permissions: "all",
      },
      {
        id: "floor-meeting-poll",
        name: "Meeting Time Poll",
        icon: "⏰",
        color: "#3b82f6",
        isCustom: true,
        usageCount: 89,
        permissions: "leaders",
      },
    ],
    isLeader: true,
    onToolClick: (tool) => console.log("Tool clicked:", tool),
    onManageTools: () => console.log("Manage tools"),
    onCreateTool: () => console.log("Create tool in HiveLab"),
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    isLeader: true,
  },
};

/**
 * New space (no custom tools, leader prompt to create)
 */
export const NewSpaceLeaderPrompt: Story = {
  args: {
    isLeader: true,
    customTools: [],
    onToolClick: (tool) => console.log("Tool clicked:", tool),
    onManageTools: () => console.log("Manage tools"),
    onCreateTool: () => alert("Navigate to HiveLab to create your first custom tool!"),
  },
};

/**
 * Interactive demo with alerts
 */
export const InteractiveDemo: Story = {
  args: {
    customTools: sampleCustomTools,
    isLeader: true,
    onToolClick: (tool) =>
      alert(`Clicked tool: ${tool.name}\nDescription: ${tool.description || "N/A"}\nUsage: ${tool.usageCount || 0} times`),
    onManageTools: () =>
      alert("Opening HiveLab Analytics Dashboard...\n\nView tool usage, edit permissions, and update configurations."),
    onCreateTool: () =>
      alert("Opening HiveLab Builder...\n\nDrag and drop elements to create custom tools for your space!"),
  },
};

/**
 * In 40% sidebar context (with other panels)
 */
export const InSidebarContext: Story = {
  render: () => (
    <div className="w-[400px] space-y-4 bg-background p-4">
      {/* About Panel Placeholder */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-semibold text-foreground mb-2">About</h4>
        <p className="text-xs text-muted-foreground">
          CS Study Group - Weekly study sessions
        </p>
      </div>

      {/* Tools Panel */}
      <SpaceToolsPanel
        customTools={sampleCustomTools}
        isLeader={true}
        onToolClick={(tool) => console.log("Tool clicked:", tool)}
        onManageTools={() => console.log("Manage tools")}
        onCreateTool={() => console.log("Create tool")}
      />

      {/* Events Panel Placeholder */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          Upcoming Events
        </h4>
        <p className="text-xs text-muted-foreground">
          Midterm Study Session - Friday 6pm
        </p>
      </div>

      {/* Resources Panel Placeholder */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-semibold text-foreground mb-2">Resources</h4>
        <p className="text-xs text-muted-foreground">
          Study guides, code repos
        </p>
      </div>

      {/* Members Panel Placeholder */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-semibold text-foreground mb-2">Members</h4>
        <p className="text-xs text-muted-foreground">523 active members</p>
      </div>
    </div>
  ),
};
