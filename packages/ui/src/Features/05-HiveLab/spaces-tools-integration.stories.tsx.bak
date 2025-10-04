import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SpacePostFeed, SpacePost } from "../../atomic/organisms/space-post-feed";
import { SpaceAboutSection } from "../../atomic/organisms/space-about-section";
import { SpaceEventsPanel, SpaceEvent } from "../../atomic/organisms/space-events-panel";
import { SpaceResourcesPanel, SpaceResource } from "../../atomic/organisms/space-resources-panel";
import { SpaceMembersPanel, SpaceMemberPreview } from "../../atomic/organisms/space-members-panel";
import { SpaceToolsPanel, Tool } from "../../atomic/organisms/space-tools-panel";
import { SpaceComposerWithTools } from "../../atomic/molecules/space-composer-with-tools";
import {
  PollModal,
  EventModal,
  TaskModal,
  ResourceModal,
} from "../../atomic/organisms/tool-action-modals";

/**
 * # Spaces + HiveLab Tools Integration
 *
 * Complete demonstration of how HiveLab tools integrate into the Spaces 60/40 layout.
 * Shows the full workflow: Tools Panel → Tool Modals → Feed Results
 *
 * ## Integration Points
 * 1. **SpaceToolsPanel** in 40% sidebar (between Events and Resources)
 * 2. **Tool Modals** appear when clicking tool buttons
 * 3. **Tool Results** post to the 60% main feed
 * 4. **Analytics** flow back to HiveLab
 *
 * ## User Flow
 * 1. User clicks tool in sidebar (Poll, Event, Task, Resource, or Custom)
 * 2. Modal opens with tool-specific form
 * 3. User fills form and submits
 * 4. Result appears in feed + relevant sidebar panel
 * 5. Space members can interact with result
 *
 * ## This is THE Core Integration Story
 * This demonstrates how the entire HIVE tools ecosystem works together:
 * - Default tools (built-in)
 * - Custom HiveLab tools (leader-created)
 * - Spaces layout (60/40 split)
 * - Feed integration (tool results as posts)
 */
const meta = {
  title: "05-HiveLab/SpacesToolsIntegration",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const samplePosts: SpacePost[] = [
  {
    id: "poll-result-1",
    author: {
      userId: "1",
      name: "Sarah Chen",
      handle: "@sarahc",
      avatar: "https://github.com/shadcn.png",
    },
    content: "📊 Poll: What time works best for our study session?",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    likeCount: 12,
    commentCount: 3,
    isLiked: false,
  },
  {
    id: "event-announce-1",
    author: {
      userId: "2",
      name: "Alex Morgan",
      handle: "@alex",
      avatar: "https://github.com/vercel.png",
    },
    content: "📅 New Event: Midterm Study Session\n\nFriday at 6pm in Lockwood Library. Bring your notes!",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likeCount: 24,
    commentCount: 8,
    isLiked: true,
  },
];

const customTools: Tool[] = [
  {
    id: "signup-sheet",
    name: "Event Sign-up",
    icon: "✍️",
    color: "#3b82f6",
    isCustom: true,
    usageCount: 87,
    permissions: "all",
  },
  {
    id: "budget-request",
    name: "Budget Request",
    icon: "💰",
    color: "#10b981",
    isCustom: true,
    usageCount: 23,
    permissions: "leaders",
  },
];

const sampleEvents: SpaceEvent[] = [
  {
    id: "event-1",
    title: "Midterm Study Session",
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    location: "Lockwood Library, 3rd Floor",
    description: "Group study session to prepare for upcoming CS midterms.",
    attendeeCount: 12,
    isAttending: true,
    category: "academic",
  },
];

const sampleResources: SpaceResource[] = [
  {
    id: "res-1",
    title: "Data Structures Study Guide",
    url: "https://docs.google.com/document/d/abc123",
    type: "document",
    isPinned: true,
    domain: "docs.google.com",
    clickCount: 187,
  },
];

const sampleMembers: SpaceMemberPreview[] = [
  {
    id: "1",
    name: "Sarah",
    avatar: "https://github.com/shadcn.png",
    role: "founder",
  },
  {
    id: "2",
    name: "Alex",
    avatar: "https://github.com/vercel.png",
    role: "leader",
  },
  {
    id: "3",
    name: "Jordan",
    initials: "JL",
    role: "moderator",
  },
];

/**
 * Complete 60/40 layout with Tools Panel integration
 */
export const CompleteIntegration: Story = {
  render: () => {
    const [pollOpen, setPollOpen] = React.useState(false);
    const [eventOpen, setEventOpen] = React.useState(false);
    const [taskOpen, setTaskOpen] = React.useState(false);
    const [resourceOpen, setResourceOpen] = React.useState(false);

    const handleToolClick = (tool: Tool) => {
      console.log("Tool clicked:", tool);
      // Map default tools to their modals
      switch (tool.id) {
        case "poll":
          setPollOpen(true);
          break;
        case "event":
          setEventOpen(true);
          break;
        case "task":
          setTaskOpen(true);
          break;
        case "resource":
          setResourceOpen(true);
          break;
        default:
          alert(`Custom tool clicked: ${tool.name}\n\nThis would open the HiveLab-created tool interface.`);
      }
    };

    return (
      <div className="min-h-screen bg-background">
        {/* Space Header would go here */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold">CS Study Group</h1>
            <p className="text-sm text-muted-foreground">523 members</p>
          </div>
        </div>

        {/* 60/40 Layout */}
        <div className="flex gap-6 w-full max-w-7xl mx-auto p-4 flex-col lg:flex-row">
          {/* 60% Main Content - Feed */}
          <div className="flex-[6] min-w-0">
            <SpacePostFeed
              posts={samplePosts}
              canPost={true}
              showComposer={true}
              onCreatePost={(content) => alert(`Creating post:\n${content}`)}
              onPostClick={(post) => console.log("Post clicked:", post)}
              onLike={(postId) => console.log("Like:", postId)}
              onComment={(postId) => console.log("Comment:", postId)}
              onShare={(postId) => console.log("Share:", postId)}
            />
          </div>

          {/* 40% Sidebar */}
          <div className="flex-[4] space-y-4 min-w-0 lg:sticky lg:top-4 lg:self-start">
            {/* About Section */}
            <SpaceAboutSection
              description="Weekly study sessions for Computer Science students. Join us to collaborate on assignments, prepare for exams, and build lasting connections with fellow CS majors."
              tags={["computer-science", "study-group", "academic"]}
              category="Academic"
              type="academic"
              memberCount={523}
              postCount={1847}
              eventCount={38}
              createdAt={new Date("2024-01-14")}
              createdBy={{
                name: "Sarah Chen",
                handle: "@sarahc",
                avatar: "https://github.com/shadcn.png",
              }}
              rules={[
                "Be respectful and kind to all members",
                "No spam or self-promotion",
                "Keep discussions on-topic and relevant",
                "Help others when you can",
              ]}
              isLeader={true}
            />

            {/* Events Panel */}
            <SpaceEventsPanel
              events={sampleEvents}
              canCreateEvents={true}
              onCreateEvent={() => setEventOpen(true)}
              onEventClick={(event) => console.log("Event clicked:", event)}
              onRSVP={(eventId, attending) =>
                console.log("RSVP:", eventId, attending)
              }
            />

            {/* 🔥 TOOLS PANEL - THE KEY INTEGRATION POINT 🔥 */}
            <SpaceToolsPanel
              customTools={customTools}
              isLeader={true}
              onToolClick={handleToolClick}
              onManageTools={() =>
                alert("Opening HiveLab Analytics...\n\nView tool usage, edit permissions, deploy to other spaces.")
              }
              onCreateTool={() =>
                alert("Opening HiveLab Builder...\n\nDrag elements to create custom tools!")
              }
            />

            {/* Resources Panel */}
            <SpaceResourcesPanel
              resources={sampleResources}
              canAddResources={true}
              alwaysShowAddButton={true}
              onAddResource={() => setResourceOpen(true)}
              onResourceClick={(resource) => console.log("Resource:", resource)}
            />

            {/* Members Panel */}
            <SpaceMembersPanel
              members={sampleMembers}
              totalMemberCount={523}
              canInvite={true}
              onInvite={() => alert("Opening invite modal...")}
              onViewAll={() => alert("Viewing all 523 members...")}
              onMemberClick={(member) => console.log("Member:", member)}
            />
          </div>
        </div>

        {/* Tool Modals */}
        <PollModal
          open={pollOpen}
          onOpenChange={setPollOpen}
          onSubmit={(data) => {
            console.log("Poll created:", data);
            alert(`Poll Created!\n\nQuestion: ${data.question}\nOptions: ${data.options.join(", ")}\n\nThis would now:\n1. Post to the feed\n2. Track analytics in HiveLab\n3. Show live results`);
          }}
        />

        <EventModal
          open={eventOpen}
          onOpenChange={setEventOpen}
          onSubmit={(data) => {
            console.log("Event created:", data);
            alert(`Event Created!\n\nTitle: ${data.title}\nStart: ${data.startTime}\n\nThis would now:\n1. Post to feed\n2. Add to Events Panel\n3. Send notifications to members`);
          }}
        />

        <TaskModal
          open={taskOpen}
          onOpenChange={setTaskOpen}
          onSubmit={(data) => {
            console.log("Task created:", data);
            alert(`Task Created!\n\nTitle: ${data.title}\nDue: ${data.dueDate}\nPriority: ${data.priority}\n\nThis would now:\n1. Post to feed\n2. Assign to members\n3. Track completion`);
          }}
        />

        <ResourceModal
          open={resourceOpen}
          onOpenChange={setResourceOpen}
          onSubmit={(data) => {
            console.log("Resource added:", data);
            alert(`Resource Added!\n\nTitle: ${data.title}\nType: ${data.type}\n\nThis would now:\n1. Add to Resources Panel\n2. ${data.postAnnouncement ? "Post announcement to feed" : "Silently add"}\n3. Track clicks/downloads`);
          }}
        />
      </div>
    );
  },
};

/**
 * Member view (non-leader, limited tools access)
 */
export const MemberViewIntegration: Story = {
  render: () => {
    const [pollOpen, setPollOpen] = React.useState(false);
    const [resourceOpen, setResourceOpen] = React.useState(false);

    const handleToolClick = (tool: Tool) => {
      // Members can only access Poll and Resource (after 7 days)
      if (tool.id === "poll") {
        setPollOpen(true);
      } else if (tool.id === "resource") {
        resourceOpen(true);
      } else if (tool.permissions === "leaders") {
        alert("This tool is only available to space leaders.");
      } else {
        alert(`Tool: ${tool.name}\n\nThis custom tool is accessible to all members.`);
      }
    };

    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold">CS Study Group</h1>
            <p className="text-sm text-muted-foreground">Member View</p>
          </div>
        </div>

        <div className="flex gap-6 w-full max-w-7xl mx-auto p-4 flex-col lg:flex-row">
          <div className="flex-[6] min-w-0">
            <SpacePostFeed
              posts={samplePosts}
              canPost={true}
              showComposer={true}
              onCreatePost={(content) => alert(`Posting: ${content}`)}
              onPostClick={(post) => console.log(post)}
              onLike={(id) => console.log("Like:", id)}
              onComment={(id) => console.log("Comment:", id)}
              onShare={(id) => console.log("Share:", id)}
            />
          </div>

          <div className="flex-[4] space-y-4 min-w-0 lg:sticky lg:top-4 lg:self-start">
            <SpaceAboutSection
              description="Weekly study sessions for Computer Science students."
              tags={["computer-science", "study-group"]}
              memberCount={523}
            />

            <SpaceEventsPanel events={sampleEvents} canCreateEvents={false} />

            {/* Member view - no "Create Tool" CTA, limited tool access */}
            <SpaceToolsPanel
              customTools={customTools}
              isLeader={false}
              onToolClick={handleToolClick}
            />

            <SpaceResourcesPanel resources={sampleResources} />

            <SpaceMembersPanel members={sampleMembers} totalMemberCount={523} />
          </div>
        </div>

        <PollModal
          open={pollOpen}
          onOpenChange={setPollOpen}
          onSubmit={(data) => alert(`Poll: ${data.question}`)}
        />
        <ResourceModal
          open={resourceOpen}
          onOpenChange={setResourceOpen}
          onSubmit={(data) => alert(`Resource: ${data.title}`)}
        />
      </div>
    );
  },
};

/**
 * Mobile responsive view
 */
export const MobileIntegration: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card p-4">
          <h1 className="text-xl font-bold">CS Study Group</h1>
        </div>

        <div className="space-y-4 p-4">
          {/* On mobile, Tools Panel appears in sidebar which stacks above feed */}
          <SpaceToolsPanel
            customTools={customTools}
            isLeader={true}
            onToolClick={(tool) => alert(`Tool: ${tool.name}`)}
            onManageTools={() => alert("Manage Tools")}
            onCreateTool={() => alert("Create Tool")}
          />

          <SpacePostFeed
            posts={samplePosts}
            canPost={true}
            showComposer={true}
            onCreatePost={(content) => alert(content)}
            onPostClick={(post) => console.log(post)}
            onLike={(id) => console.log(id)}
            onComment={(id) => console.log(id)}
            onShare={(id) => console.log(id)}
          />
        </div>
      </div>
    );
  },
};

/**
 * 🔥 COMPLETE: Inline + Widget Tools Integration
 *
 * This story demonstrates the FULL tools system with both access methods:
 * 1. **Inline Tools**: + button and slash commands in composer
 * 2. **Widget Tools**: Sidebar Tools Panel with default + custom tools
 *
 * Both methods create the same tools, just different access points.
 */
export const InlineAndWidgetIntegration: Story = {
  render: () => {
    const [pollOpen, setPollOpen] = React.useState(false);
    const [eventOpen, setEventOpen] = React.useState(false);
    const [taskOpen, setTaskOpen] = React.useState(false);
    const [resourceOpen, setResourceOpen] = React.useState(false);
    const [composerValue, setComposerValue] = React.useState("");
    const [posts, setPosts] = React.useState<SpacePost[]>(samplePosts);

    const handleToolSelect = (toolId: "poll" | "event" | "task" | "resource") => {
      console.log("Tool selected:", toolId);
      switch (toolId) {
        case "poll":
          setPollOpen(true);
          break;
        case "event":
          setEventOpen(true);
          break;
        case "task":
          setTaskOpen(true);
          break;
        case "resource":
          setResourceOpen(true);
          break;
      }
    };

    const handleToolClick = (tool: Tool) => {
      console.log("Widget tool clicked:", tool);
      if (tool.id === "poll" || tool.id === "event" || tool.id === "task" || tool.id === "resource") {
        handleToolSelect(tool.id);
      } else {
        alert(`Custom HiveLab tool: ${tool.name}\n\nThis would open the HiveLab-created tool interface.`);
      }
    };

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold">CS Study Group</h1>
            <p className="text-sm text-muted-foreground">523 members</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/10 border-b border-primary/20">
          <div className="max-w-7xl mx-auto p-3 text-sm">
            <p className="font-semibold text-primary mb-1">
              🎯 Tools Demo: Try Both Access Methods
            </p>
            <div className="text-muted-foreground space-y-1">
              <p>
                <strong>Inline:</strong> Click + button in composer OR type /poll, /event, /task, /resource
              </p>
              <p>
                <strong>Widget:</strong> Click tools in the sidebar panel (default + custom HiveLab tools)
              </p>
            </div>
          </div>
        </div>

        {/* 60/40 Layout */}
        <div className="flex gap-6 w-full max-w-7xl mx-auto p-4 flex-col lg:flex-row">
          {/* 60% Main Content */}
          <div className="flex-[6] min-w-0">
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              {/* Messages */}
              <div className="p-4 space-y-3 min-h-[500px]">
                {posts.map((post) => (
                  <div key={post.id} className="flex gap-3 group">
                    <div className="h-10 w-10 rounded-full bg-primary/10 shrink-0 overflow-hidden">
                      {post.author.avatar ? (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-primary">
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-sm font-semibold">{post.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Composer with Inline Tools */}
              <SpaceComposerWithTools
                value={composerValue}
                onValueChange={setComposerValue}
                onCreatePost={(content) => {
                  const newPost: SpacePost = {
                    id: `post-${Date.now()}`,
                    author: {
                      userId: "current-user",
                      name: "You",
                      handle: "@you",
                    },
                    content,
                    createdAt: new Date(),
                  };
                  setPosts([...posts, newPost]);
                }}
                onToolSelect={handleToolSelect}
                placeholder="Message #cs-study-group... (try /poll or click +)"
                showInlineTools={true}
              />
            </div>
          </div>

          {/* 40% Sidebar */}
          <div className="flex-[4] space-y-4 min-w-0 lg:sticky lg:top-4 lg:self-start">
            {/* About */}
            <SpaceAboutSection
              description="Weekly study sessions for Computer Science students. Join us to collaborate on assignments, prepare for exams, and build lasting connections."
              tags={["computer-science", "study-group", "academic"]}
              memberCount={523}
            />

            {/* Events */}
            <SpaceEventsPanel
              events={sampleEvents}
              canCreateEvents={true}
              onCreateEvent={() => setEventOpen(true)}
              onEventClick={(event) => console.log("Event:", event)}
              onRSVP={(eventId, attending) => console.log("RSVP:", eventId, attending)}
            />

            {/* 🔥 TOOLS PANEL - Widget Access Method */}
            <SpaceToolsPanel
              customTools={customTools}
              isLeader={true}
              onToolClick={handleToolClick}
              onManageTools={() =>
                alert("Opening HiveLab Analytics...\n\nView usage stats, manage permissions, deploy tools to other spaces.")
              }
              onCreateTool={() =>
                alert("Opening HiveLab Builder...\n\nDrag and drop elements to create custom tools!")
              }
            />

            {/* Resources */}
            <SpaceResourcesPanel
              resources={sampleResources}
              canAddResources={true}
              alwaysShowAddButton={true}
              onAddResource={() => setResourceOpen(true)}
              onResourceClick={(resource) => console.log("Resource:", resource)}
            />

            {/* Members */}
            <SpaceMembersPanel
              members={sampleMembers}
              totalMemberCount={523}
              canInvite={true}
              onInvite={() => alert("Invite modal...")}
              onViewAll={() => alert("View all members...")}
              onMemberClick={(member) => console.log("Member:", member)}
            />
          </div>
        </div>

        {/* Tool Modals */}
        <PollModal
          open={pollOpen}
          onOpenChange={setPollOpen}
          onSubmit={(data) => {
            console.log("Poll created:", data);
            const pollPost: SpacePost = {
              id: `poll-${Date.now()}`,
              author: {
                userId: "current-user",
                name: "You",
                handle: "@you",
              },
              content: `📊 Poll: ${data.question}\n\nOptions: ${data.options.join(", ")}\n${data.settings.anonymous ? "Anonymous voting" : "Public voting"}`,
              createdAt: new Date(),
            };
            setPosts([...posts, pollPost]);
            setPollOpen(false);
          }}
        />

        <EventModal
          open={eventOpen}
          onOpenChange={setEventOpen}
          onSubmit={(data) => {
            console.log("Event created:", data);
            const eventPost: SpacePost = {
              id: `event-${Date.now()}`,
              author: {
                userId: "current-user",
                name: "You",
                handle: "@you",
              },
              content: `📅 Event: ${data.title}\n\nStart: ${data.startTime}\nLocation: ${data.location || "TBD"}`,
              createdAt: new Date(),
            };
            setPosts([...posts, eventPost]);
            setEventOpen(false);
          }}
        />

        <TaskModal
          open={taskOpen}
          onOpenChange={setTaskOpen}
          onSubmit={(data) => {
            console.log("Task created:", data);
            const taskPost: SpacePost = {
              id: `task-${Date.now()}`,
              author: {
                userId: "current-user",
                name: "You",
                handle: "@you",
              },
              content: `📋 Task: ${data.title}\n\nDue: ${data.dueDate}\nPriority: ${data.priority.toUpperCase()}`,
              createdAt: new Date(),
            };
            setPosts([...posts, taskPost]);
            setTaskOpen(false);
          }}
        />

        <ResourceModal
          open={resourceOpen}
          onOpenChange={setResourceOpen}
          onSubmit={(data) => {
            console.log("Resource added:", data);
            if (data.postAnnouncement) {
              const resourcePost: SpacePost = {
                id: `resource-${Date.now()}`,
                author: {
                  userId: "current-user",
                  name: "You",
                  handle: "@you",
                },
                content: `📚 New Resource: ${data.title}\n\nType: ${data.type}\n${data.description || ""}`,
                createdAt: new Date(),
              };
              setPosts([...posts, resourcePost]);
            }
            setResourceOpen(false);
          }}
        />
      </div>
    );
  },
};
