import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { InlineToolMenu } from "../../atomic/molecules/inline-tool-menu";
import { SpaceComposerWithTools } from "../../atomic/molecules/space-composer-with-tools";
import { Button } from "../../atomic/atoms/button";
import { Plus } from "lucide-react";
import {
  PollModal,
  EventModal,
  TaskModal,
  ResourceModal,
} from "../../atomic/organisms/tool-action-modals";

/**
 * # Inline Tools System
 *
 * Quick access to default tools (Poll, Event, Task, Resource) directly from the composer.
 * This is the "Inline Creation" method mentioned in the spec, separate from the sidebar Tools Widget.
 *
 * ## Key Distinction
 * - **Inline Tools**: Quick creation FROM composer (+ button, slash commands)
 * - **Widget Tools**: Accessed from sidebar Tools Panel
 * - **Same Tools**: Both methods create the same Poll/Event/Task/Resource
 * - **Different Access Points**: Composer (inline) vs Sidebar (widget)
 *
 * ## Activation Methods
 * 1. **Plus Button**: Click + in composer to see tool menu
 * 2. **Slash Commands**: Type `/poll`, `/event`, `/task`, or `/resource`
 * 3. **Mobile**: Tool tray above keyboard (same menu)
 *
 * ## User Flow
 * 1. User typing in composer
 * 2. Clicks + button OR types /poll
 * 3. Tool modal opens
 * 4. User fills form and submits
 * 5. Result posts to feed
 *
 * ## This is THE Inline Creation Pattern
 * Complements the sidebar widget approach shown in `space-tools-panel.stories.tsx`.
 * Both are valid ways to access the same tools.
 */
const meta = {
  title: "05-HiveLab/InlineTools",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Inline tool menu component
 */
export const InlineToolMenuBasic: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="w-96 h-96 flex items-center justify-center bg-background border border-border rounded-lg p-4">
        <InlineToolMenu
          open={open}
          onOpenChange={setOpen}
          onToolSelect={(tool) => {
            console.log("Tool selected:", tool);
            alert(`Tool selected: ${tool}`);
          }}
          position="above"
          trigger={
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Quick Tools
            </Button>
          }
        />
      </div>
    );
  },
};

/**
 * Full composer with inline tools + slash commands
 */
export const ComposerWithInlineTools: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [pollOpen, setPollOpen] = React.useState(false);
    const [eventOpen, setEventOpen] = React.useState(false);
    const [taskOpen, setTaskOpen] = React.useState(false);
    const [resourceOpen, setResourceOpen] = React.useState(false);

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

    return (
      <div className="w-full max-w-3xl bg-background">
        <div className="border border-border rounded-lg overflow-hidden">
          {/* Mock Feed Messages */}
          <div className="p-4 space-y-3 min-h-[400px] bg-card">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">
                  Hey everyone! Try using the + button or typing /poll to create quick tools
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-500/10" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Alex Morgan</p>
                <p className="text-sm text-muted-foreground">
                  Slash commands are super fast! Just type /event and hit space
                </p>
              </div>
            </div>
          </div>

          {/* Composer with Inline Tools */}
          <SpaceComposerWithTools
            value={value}
            onValueChange={setValue}
            onCreatePost={(content) => {
              console.log("Creating post:", content);
              alert(`Post created: ${content}`);
              setValue("");
            }}
            onToolSelect={handleToolSelect}
            placeholder="Message #space... (try /poll or click +)"
            showInlineTools={true}
          />
        </div>

        {/* Tool Modals */}
        <PollModal
          open={pollOpen}
          onOpenChange={setPollOpen}
          onSubmit={(data) => {
            console.log("Poll created:", data);
            alert(`Poll Created!\n\n${data.question}\nOptions: ${data.options.join(", ")}`);
          }}
        />

        <EventModal
          open={eventOpen}
          onOpenChange={setEventOpen}
          onSubmit={(data) => {
            console.log("Event created:", data);
            alert(`Event Created!\n\n${data.title}\nStart: ${data.startTime}`);
          }}
        />

        <TaskModal
          open={taskOpen}
          onOpenChange={setTaskOpen}
          onSubmit={(data) => {
            console.log("Task created:", data);
            alert(`Task Created!\n\n${data.title}\nDue: ${data.dueDate}`);
          }}
        />

        <ResourceModal
          open={resourceOpen}
          onOpenChange={setResourceOpen}
          onSubmit={(data) => {
            console.log("Resource added:", data);
            alert(`Resource Added!\n\n${data.title}\nType: ${data.type}`);
          }}
        />
      </div>
    );
  },
};

/**
 * Slash command demonstration
 */
export const SlashCommandDemo: Story = {
  render: () => {
    const [value, setValue] = React.useState("");

    return (
      <div className="w-full max-w-2xl space-y-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Try Slash Commands</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Type one of the commands below in the composer:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <code className="bg-background px-2 py-1 rounded">/poll</code> - Create a poll
            </li>
            <li>
              <code className="bg-background px-2 py-1 rounded">/event</code> - Create an event
            </li>
            <li>
              <code className="bg-background px-2 py-1 rounded">/task</code> - Create a task
            </li>
            <li>
              <code className="bg-background px-2 py-1 rounded">/resource</code> - Add a resource
            </li>
          </ul>
        </div>

        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => alert(`Post: ${content}`)}
          onToolSelect={(tool) => alert(`Slash command detected: /${tool}`)}
          placeholder="Type a slash command like /poll..."
          showInlineTools={false}
        />
      </div>
    );
  },
};

/**
 * Mobile view with tool tray
 */
export const MobileToolTray: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => {
    const [value, setValue] = React.useState("");
    const [pollOpen, setPollOpen] = React.useState(false);

    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Mock Mobile Header */}
        <div className="border-b border-border bg-card p-4">
          <h1 className="text-lg font-bold">CS Study Group</h1>
        </div>

        {/* Mock Messages */}
        <div className="flex-1 p-4 space-y-3">
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 shrink-0" />
            <div className="flex-1 text-sm">
              <p className="font-semibold">Sarah</p>
              <p className="text-muted-foreground">Mobile users: tap + for tools!</p>
            </div>
          </div>
        </div>

        {/* Mobile Composer (Fixed Bottom) */}
        <div className="sticky bottom-0 w-full">
          <SpaceComposerWithTools
            value={value}
            onValueChange={setValue}
            onCreatePost={(content) => alert(`Post: ${content}`)}
            onToolSelect={(tool) => {
              if (tool === "poll") setPollOpen(true);
            }}
            placeholder="Message..."
            showInlineTools={true}
          />
        </div>

        <PollModal
          open={pollOpen}
          onOpenChange={setPollOpen}
          onSubmit={(data) => alert(`Poll: ${data.question}`)}
        />
      </div>
    );
  },
};

/**
 * Comparison: Inline vs Widget Tools
 */
export const InlineVsWidgetComparison: Story = {
  render: () => {
    return (
      <div className="w-full max-w-4xl space-y-6 bg-background p-6 rounded-lg border border-border">
        <div>
          <h2 className="text-2xl font-bold mb-2">Inline Tools vs Widget Tools</h2>
          <p className="text-sm text-muted-foreground">
            Two ways to access the same tools - both create identical Poll, Event, Task, Resource objects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Inline Tools */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <Plus className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold">Inline Tools</h3>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 space-y-2 text-sm">
              <p className="font-medium">Location:</p>
              <p className="text-muted-foreground">Composer input area (+ button)</p>

              <p className="font-medium mt-3">Access Method:</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Click + button in composer</li>
                <li>• Type /poll, /event, /task, /resource</li>
                <li>• Mobile: Tool tray above keyboard</li>
              </ul>

              <p className="font-medium mt-3">Best For:</p>
              <p className="text-muted-foreground">Quick creation while typing a message</p>

              <p className="font-medium mt-3">Shows:</p>
              <p className="text-muted-foreground">Default tools only (4 tools)</p>
            </div>
          </div>

          {/* Widget Tools */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Widget Tools</h3>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 space-y-2 text-sm">
              <p className="font-medium">Location:</p>
              <p className="text-muted-foreground">40% sidebar (Tools Widget)</p>

              <p className="font-medium mt-3">Access Method:</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Click tool in sidebar widget</li>
                <li>• Leaders: "Manage Tools" button</li>
                <li>• Leaders: "Create Tool" CTA</li>
              </ul>

              <p className="font-medium mt-3">Best For:</p>
              <p className="text-muted-foreground">Browsing available tools, managing custom tools</p>

              <p className="font-medium mt-3">Shows:</p>
              <p className="text-muted-foreground">Default tools + custom HiveLab tools</p>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <p className="text-sm font-semibold text-primary mb-1">Key Takeaway:</p>
          <p className="text-sm text-muted-foreground">
            Both methods create the same tools. Inline is faster for quick actions, Widget shows
            the full toolset including custom HiveLab tools created by space leaders.
          </p>
        </div>
      </div>
    );
  },
};
