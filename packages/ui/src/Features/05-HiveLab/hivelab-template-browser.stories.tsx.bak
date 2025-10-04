import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { HiveLabTemplateBrowser, Template } from "../../atomic/organisms/hivelab-template-browser";

/**
 * # HiveLabTemplateBrowser
 *
 * Browse and deploy pre-built tool templates for HiveLab. Space leaders can fork successful
 * tools from other spaces and adapt them to their needs.
 *
 * ## Features
 * - Category filtering (academic, social, greek-life, etc.)
 * - Search templates by name/description
 * - Template popularity metrics (deploys, forks, success rate)
 * - Trending/new badges
 * - Quick deploy or fork actions
 * - Template complexity indicators
 * - Creator attribution
 * - Preview of element composition
 *
 * ## HIVE Motion System
 * - Card hover elevation
 * - Category tab transitions
 * - Badge animations
 * - Smooth search filtering
 *
 * ## Usage
 * ```tsx
 * <HiveLabTemplateBrowser
 *   templates={availableTemplates}
 *   onTemplateSelect={(template) => console.log(template)}
 *   onDeployTemplate={(id) => deployTool(id)}
 *   onForkTemplate={(id) => forkTool(id)}
 * />
 * ```
 */
const meta = {
  title: "05-HiveLab/HiveLabTemplateBrowser",
  component: HiveLabTemplateBrowser,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HiveLabTemplateBrowser>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTemplates: Template[] = [
  {
    id: "poll-1",
    name: "Midterm Study Topics Poll",
    description: "Let your members vote on what topics to focus on for exam prep",
    icon: "",
    category: "academic",
    elementCount: 5,
    complexity: "simple",
    deploysCount: 234,
    forksCount: 67,
    successRate: 92.3,
    responseRate: 87.5,
    creatorName: "Sarah Chen",
    creatorHandle: "@sarahc",
    isTrending: true,
    tags: ["poll", "study", "exam-prep"],
  },
  {
    id: "event-1",
    name: "Social Event RSVP",
    description: "Track attendance for parties, mixers, and social gatherings",
    icon: "",
    category: "social",
    elementCount: 8,
    complexity: "medium",
    deploysCount: 892,
    forksCount: 234,
    successRate: 94.7,
    responseRate: 91.2,
    creatorName: "Mike Rodriguez",
    creatorHandle: "@mike",
    isTrending: true,
    tags: ["event", "rsvp", "attendance"],
  },
  {
    id: "wellness-1",
    name: "Mental Health Check-in",
    description: "Anonymous wellness surveys for your space members",
    icon: "",
    category: "wellness",
    elementCount: 12,
    complexity: "medium",
    deploysCount: 567,
    forksCount: 123,
    successRate: 88.1,
    responseRate: 76.3,
    creatorName: "Alex Kim",
    creatorHandle: "@alex",
    isNew: true,
    tags: ["wellness", "survey", "anonymous"],
  },
  {
    id: "career-1",
    name: "Resume Review Signup",
    description: "Schedule one-on-one resume review sessions",
    icon: "",
    category: "career",
    elementCount: 15,
    complexity: "complex",
    deploysCount: 145,
    forksCount: 34,
    successRate: 95.2,
    responseRate: 82.4,
    creatorName: "Jordan Lee",
    creatorHandle: "@jordan",
    tags: ["career", "resume", "scheduling"],
  },
  {
    id: "residential-1",
    name: "Roommate Chore Tracker",
    description: "Fair chore distribution and completion tracking",
    icon: "",
    category: "residential",
    elementCount: 10,
    complexity: "medium",
    deploysCount: 423,
    forksCount: 98,
    successRate: 79.5,
    responseRate: 68.9,
    creatorName: "Casey Park",
    creatorHandle: "@casey",
    tags: ["chores", "roommates", "tasks"],
  },
];

/**
 * Default browser with all templates
 */
export const Default: Story = {
  args: {
    templates: sampleTemplates,
  },
};

/**
 * Academic category
 */
export const AcademicCategory: Story = {
  args: {
    templates: sampleTemplates.filter((t) => t.category === "academic"),
  },
};

/**
 * Social category
 */
export const SocialCategory: Story = {
  args: {
    templates: sampleTemplates.filter((t) => t.category === "social"),
  },
};

/**
 * Trending templates
 */
export const TrendingOnly: Story = {
  args: {
    templates: sampleTemplates.filter((t) => t.isTrending),
  },
};

/**
 * New templates
 */
export const NewOnly: Story = {
  args: {
    templates: sampleTemplates.filter((t) => t.isNew),
  },
};

/**
 * Simple complexity only
 */
export const SimpleOnly: Story = {
  args: {
    templates: sampleTemplates.filter((t) => t.complexity === "simple"),
  },
};

/**
 * With search query
 */
export const WithSearch: Story = {
  args: {
    templates: sampleTemplates,
    searchQuery: "poll",
  },
};

/**
 * Interactive with state
 */
export const Interactive: Story = {
  render: () => {
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [action, setAction] = useState<string>("");

    return (
      <div className="space-y-4">
        <HiveLabTemplateBrowser
          templates={sampleTemplates}
          onTemplateSelect={(template) => {
            setSelectedTemplate(template);
            setAction(`Selected: ${template.name}`);
          }}
          onDeployTemplate={(id) => {
            const template = sampleTemplates.find((t) => t.id === id);
            setAction(`Deployed: ${template?.name}`);
          }}
          onForkTemplate={(id) => {
            const template = sampleTemplates.find((t) => t.id === id);
            setAction(`Forked: ${template?.name}`);
          }}
        />

        {action && (
          <div className="p-3 bg-muted rounded-lg text-sm">
            Last action: <span className="font-semibold">{action}</span>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Space leader view (can deploy directly)
 */
export const LeaderView: Story = {
  args: {
    templates: sampleTemplates,
    isLeader: true,
  },
};

/**
 * High success rate templates
 */
export const HighSuccessRate: Story = {
  args: {
    templates: sampleTemplates.filter((t) => t.successRate > 90),
  },
};

/**
 * High deployment count (popular)
 */
export const Popular: Story = {
  args: {
    templates: sampleTemplates.sort((a, b) => b.deploysCount - a.deploysCount),
  },
};

/**
 * HIVE Pattern: Template selection workflow
 */
export const SelectionWorkflow: Story = {
  render: () => (
    <div className="max-w-6xl space-y-4">
      {/* Header */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h2 className="text-lg font-bold mb-1">Browse Templates</h2>
        <p className="text-sm text-muted-foreground">
          Start with a proven template and customize it for your space
        </p>
      </div>

      {/* Browser */}
      <HiveLabTemplateBrowser
        templates={sampleTemplates}
        onTemplateSelect={(template) => console.log("Selected:", template)}
        isLeader
      />

      {/* Tips */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Pro Tip
        </h3>
        <p className="text-xs text-blue-800 dark:text-blue-200">
          Templates with 90%+ success rates have been proven to work well. Start with these and customize as needed!
        </p>
      </div>
    </div>
  ),
};

/**
 * Mobile view (responsive)
 */
export const MobileView: Story = {
  render: () => (
    <div className="max-w-sm">
      <HiveLabTemplateBrowser templates={sampleTemplates.slice(0, 3)} />
    </div>
  ),
};

/**
 * Empty search results
 */
export const EmptySearch: Story = {
  args: {
    templates: sampleTemplates,
    searchQuery: "nonexistent",
  },
};

/**
 * All categories expanded
 */
export const AllCategories: Story = {
  render: () => (
    <div className="space-y-6">
      {["academic", "social", "career", "wellness", "residential"].map((cat) => {
        const filtered = sampleTemplates.filter((t) => t.category === cat);
        if (filtered.length === 0) return null;
        return (
          <div key={cat}>
            <h3 className="text-sm font-semibold mb-3 capitalize">{cat}</h3>
            <HiveLabTemplateBrowser templates={filtered} />
          </div>
        );
      })}
    </div>
  ),
};
