import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InlineToolMenu } from "../../atomic/molecules/inline-tool-menu";
import { Button } from "../../atomic/atoms/button";
import { Zap } from "lucide-react";

/**
 * # InlineToolMenu
 *
 * Quick access menu for HiveLab tools within posts and spaces. Allows users to
 * create polls, events, tasks, and resources without leaving the feed.
 *
 * ## Features
 * - 2x2 grid of quick tools
 * - Animated dropdown with position control
 * - Outside click to close
 * - Keyboard shortcut hints (/poll, /event)
 * - Hover scale effects on tool icons
 *
 * ## HIVE Motion System
 * - `animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2` for dropdown
 * - Icon scale on hover (`group-hover:scale-110`)
 * - Smooth border transitions
 *
 * ## Usage
 * ```tsx
 * <InlineToolMenu
 *   trigger={<Button>Add Tool</Button>}
 *   onToolSelect={(toolId) => console.log(toolId)}
 * />
 * ```
 */
const meta = {
  title: "05-HiveLab/InlineToolMenu",
  component: InlineToolMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InlineToolMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tool menu with button trigger
 */
export const Default: Story = {
  args: {
    trigger: (
      <Button variant="outline" size="sm">
        <Zap className="h-4 w-4 mr-2" />
        Add Tool
      </Button>
    ),
  },
};

/**
 * Menu positioned above trigger (for bottom of screen)
 */
export const PositionAbove: Story = {
  args: {
    trigger: <Button>Quick Tools</Button>,
    position: "above",
  },
};

/**
 * Menu positioned below trigger (default)
 */
export const PositionBelow: Story = {
  args: {
    trigger: <Button>Quick Tools</Button>,
    position: "below",
  },
};

/**
 * Interactive with state management
 */
export const Interactive: Story = {
  render: () => {
    const [selectedTool, setSelectedTool] = useState<string | null>(null);

    return (
      <div className="space-y-4">
        <InlineToolMenu
          trigger={
            <Button variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              Add Tool
            </Button>
          }
          onToolSelect={(toolId) => setSelectedTool(toolId)}
        />

        {selectedTool && (
          <div className="p-3 bg-muted rounded-lg text-sm">
            Selected: <span className="font-semibold">{selectedTool}</span>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Controlled open state
 */
export const ControlledState: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <Button onClick={() => setOpen(!open)}>
          Toggle Menu {open ? "↑" : "↓"}
        </Button>

        <InlineToolMenu
          trigger={<Button>Quick Tools</Button>}
          open={open}
          onOpenChange={setOpen}
          onToolSelect={(toolId) => {
            console.log("Selected:", toolId);
            setOpen(false);
          }}
        />
      </div>
    );
  },
};

/**
 * HIVE Pattern: In post composer
 */
export const InComposerContext: Story = {
  render: () => (
    <div className="max-w-xl p-4 bg-card border border-border rounded-lg">
      <textarea
        className="w-full p-2 bg-background border border-border rounded mb-3 resize-none"
        placeholder="What's happening at UB?"
        rows={3}
      />

      <div className="flex items-center justify-between">
        <InlineToolMenu
          trigger={
            <Button variant="ghost" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Add Tool
            </Button>
          }
        />

        <Button>Post</Button>
      </div>
    </div>
  ),
};

/**
 * HIVE Pattern: In space post toolbar
 */
export const InSpaceToolbar: Story = {
  render: () => (
    <div className="max-w-2xl">
      <div className="p-4 bg-card border border-border rounded-lg mb-3">
        <h3 className="text-sm font-semibold mb-2">CS Study Group</h3>
        <p className="text-xs text-muted-foreground mb-3">234 members</p>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">New Post</Button>
          <InlineToolMenu
            trigger={
              <Button variant="outline" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Add Tool
              </Button>
            }
          />
          <Button variant="ghost" size="sm">Settings</Button>
        </div>
      </div>
    </div>
  ),
};

/**
 * Custom trigger styles
 */
export const CustomTrigger: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
         Magic Tools
      </button>
    ),
  },
};

/**
 * Icon-only trigger (compact)
 */
export const IconOnlyTrigger: Story = {
  args: {
    trigger: (
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <Zap className="h-4 w-4" />
      </Button>
    ),
  },
};

/**
 * Mobile context (narrow viewport)
 */
export const MobileView: Story = {
  render: () => (
    <div className="max-w-sm p-4 bg-card border border-border rounded-lg">
      <p className="text-sm mb-3">Create a new post with tools</p>
      <InlineToolMenu
        trigger={
          <Button className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Add Tool
          </Button>
        }
      />
    </div>
  ),
};
