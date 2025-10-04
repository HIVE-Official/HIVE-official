import type { Meta, StoryObj } from "@storybook/react";
import { SpaceResourcesPanel, SpaceResource } from "../../atomic/organisms/space-resources-panel";

/**
 * # SpaceResourcesPanel
 *
 * Organism component displaying curated resources and links in a space (40% sidebar component).
 * Shows pinned and regular resources with type indicators and click tracking.
 *
 * ## HIVE Motion System
 * - Smooth hover effects on resource cards
 * - Icon color transitions on hover
 * - Border color transitions
 *
 * ## Features
 * - **Resource Types**: Link, Document, Video, GitHub, Other with unique icons
 * - **Pinned Resources**: Separate section for important resources at top
 * - **Click Tracking**: Shows popularity via click counts
 * - **Smart URL Display**: Shows clean domain names (removes www, protocol)
 * - **External Link Indicators**: Clear visual cue for external navigation
 * - **Leader Actions**: Add resource button for space leaders
 * - **Empty States**: Helpful prompts when no resources exist
 * - **Responsive Cards**: Truncated text with hover states
 *
 * ## Usage
 * ```tsx
 * <SpaceResourcesPanel
 *   resources={resourceLinks}
 *   canAddResources={isLeader}
 *   onAddResource={() => openResourceModal()}
 *   onResourceClick={(resource) => trackClick(resource)}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpaceResourcesPanel",
  component: SpaceResourcesPanel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceResourcesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample resource data
const sampleResources: SpaceResource[] = [
  {
    id: "1",
    title: "CS Course Schedule",
    description: "Complete course offerings for Computer Science department with prerequisites and scheduling info.",
    url: "https://engineering.buffalo.edu/computer-science-engineering/undergrad/courses.html",
    type: "link",
    addedBy: {
      name: "Sarah Chen",
      handle: "@sarahc",
      avatar: "https://github.com/shadcn.png",
    },
    addedAt: new Date("2024-01-15"),
    isPinned: true,
    clicks: 234,
  },
  {
    id: "2",
    title: "Data Structures Study Guide",
    description: "Comprehensive PDF guide covering all major data structures and algorithms.",
    url: "https://docs.google.com/document/d/abc123/edit",
    type: "document",
    addedBy: {
      name: "Alex Morgan",
      handle: "@alex",
    },
    addedAt: new Date("2024-02-01"),
    isPinned: true,
    clicks: 187,
  },
  {
    id: "3",
    title: "Group Project Repository",
    description: "Our shared GitHub repo for the CSE220 group project.",
    url: "https://github.com/ub-cs/cse220-project",
    type: "github",
    addedAt: new Date("2024-03-01"),
    clicks: 56,
  },
  {
    id: "4",
    title: "Recursion Tutorial Video",
    description: "Excellent explanation of recursion concepts with examples.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    type: "video",
    addedAt: new Date("2024-03-05"),
    clicks: 92,
  },
  {
    id: "5",
    title: "Practice Problems",
    description: "LeetCode-style problems for interview prep.",
    url: "https://leetcode.com/problemset/all/",
    type: "link",
    addedAt: new Date("2024-03-10"),
    clicks: 145,
  },
  {
    id: "6",
    title: "Office Hours Calendar",
    description: "TA and professor office hours schedule for CSE courses.",
    url: "https://calendar.google.com/calendar/xyz",
    type: "link",
    addedAt: new Date("2024-03-12"),
    clicks: 78,
  },
  {
    id: "7",
    title: "C++ Reference Guide",
    url: "https://cppreference.com",
    type: "document",
    addedAt: new Date("2024-03-15"),
    clicks: 43,
  },
];

/**
 * Default resources panel with mixed resource types
 */
export const Default: Story = {
  args: {
    resources: sampleResources.slice(0, 4),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
  },
};

/**
 * As space leader - can add new resources
 */
export const AsSpaceLeader: Story = {
  args: {
    resources: sampleResources,
    canAddResources: true,
    alwaysShowAddButton: true,
    onAddResource: () => console.log("Add new resource"),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
  },
};

/**
 * Empty state - no resources yet
 */
export const EmptyState: Story = {
  args: {
    resources: [],
    emptyStateMessage: "No resources have been added yet",
  },
};

/**
 * Empty state as leader - can add first resource
 */
export const EmptyStateAsLeader: Story = {
  args: {
    resources: [],
    canAddResources: true,
    emptyStateMessage: "Share helpful links and resources with the community",
    onAddResource: () => console.log("Add first resource"),
  },
};

/**
 * Only pinned resources
 */
export const OnlyPinnedResources: Story = {
  args: {
    resources: sampleResources.filter((r) => r.isPinned),
    canAddResources: true,
    onAddResource: () => console.log("Add resource"),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
  },
};

/**
 * With pinned and regular resources
 */
export const WithPinnedAndRegular: Story = {
  args: {
    resources: sampleResources,
    canAddResources: true,
    onAddResource: () => console.log("Add resource"),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
  },
};

/**
 * Different resource types showcase
 */
export const ResourceTypes: Story = {
  args: {
    resources: [
      {
        id: "1",
        title: "Website Link",
        description: "External website resource",
        url: "https://example.com",
        type: "link",
        addedAt: new Date(),
        clicks: 10,
      },
      {
        id: "2",
        title: "PDF Document",
        description: "Study guide or textbook PDF",
        url: "https://example.com/document.pdf",
        type: "document",
        addedAt: new Date(),
        clicks: 25,
      },
      {
        id: "3",
        title: "Video Tutorial",
        description: "YouTube or Vimeo video",
        url: "https://youtube.com/watch?v=abc123",
        type: "video",
        addedAt: new Date(),
        clicks: 42,
      },
      {
        id: "4",
        title: "GitHub Repository",
        description: "Code repository or project",
        url: "https://github.com/user/repo",
        type: "github",
        addedAt: new Date(),
        clicks: 18,
      },
      {
        id: "5",
        title: "Other Resource",
        description: "Miscellaneous resource type",
        url: "https://example.com/resource",
        type: "other",
        addedAt: new Date(),
        clicks: 5,
      },
    ],
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
  },
};

/**
 * Many resources (scrollable list)
 */
export const ManyResources: Story = {
  args: {
    resources: [
      ...sampleResources,
      {
        id: "8",
        title: "Design Patterns Guide",
        description: "Common software design patterns with examples.",
        url: "https://refactoring.guru/design-patterns",
        type: "link",
        addedAt: new Date("2024-03-18"),
        clicks: 67,
      },
      {
        id: "9",
        title: "SQL Tutorial Series",
        description: "Complete SQL course from beginner to advanced.",
        url: "https://www.youtube.com/playlist?list=xyz",
        type: "video",
        addedAt: new Date("2024-03-20"),
        clicks: 89,
      },
      {
        id: "10",
        title: "Algorithm Visualizer",
        url: "https://visualgo.net",
        type: "link",
        addedAt: new Date("2024-03-22"),
        clicks: 134,
      },
    ],
    canAddResources: true,
    onAddResource: () => console.log("Add resource"),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
  },
};

/**
 * Minimal - single resource
 */
export const SingleResource: Story = {
  args: {
    resources: [sampleResources[0]],
    canAddResources: true,
    alwaysShowAddButton: true,
    onAddResource: () => console.log("Add resource"),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
  },
};

/**
 * Resources without descriptions
 */
export const WithoutDescriptions: Story = {
  args: {
    resources: sampleResources.map((r) => ({ ...r, description: undefined })),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
  },
};

/**
 * HIVE Pattern: In 40% sidebar with other panels
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
        {/* About Panel Placeholder */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">About</h4>
          <p className="text-xs text-muted-foreground">
            Space description and info
          </p>
        </div>

        {/* Events Panel Placeholder */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Upcoming Events</h4>
          <p className="text-xs text-muted-foreground">
            2 events this week
          </p>
        </div>

        {/* Resources Panel */}
        <SpaceResourcesPanel
          resources={sampleResources.slice(0, 5)}
          canAddResources={true}
          alwaysShowAddButton={true}
          onAddResource={() => console.log("Add resource")}
          onResourceClick={(resource) => console.log("Resource clicked:", resource)}
        />

        {/* Members Panel Placeholder */}
        <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
          <p className="text-xs text-muted-foreground">
            Members section will go here
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
    resources: sampleResources,
    canAddResources: true,
    alwaysShowAddButton: true,
    onAddResource: () => alert("Opening resource creation modal..."),
    onResourceClick: (resource) => alert(`Opening resource: ${resource.title}\n${resource.url}`),
    onRemoveResource: (resourceId) => alert(`Removing resource: ${resourceId}`),
  },
};
