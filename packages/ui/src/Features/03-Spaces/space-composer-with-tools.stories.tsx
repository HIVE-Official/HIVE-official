import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SpaceComposerWithTools } from "../../atomic/molecules/space-composer-with-tools";

/**
 * # SpaceComposerWithTools
 *
 * Enhanced post composer for spaces with integrated HiveLab tool menu.
 * Combines text input with slash commands (/poll, /event) and file attachments.
 *
 * ## Features
 * - Auto-resizing textarea
 * - Slash command detection (/poll, /event, /task, /resource)
 * - Inline tools menu dropdown
 * - File and image attachment buttons
 * - Enter to send, Shift+Enter for newline
 * - Slash command helper overlay
 *
 * ## HIVE Motion System
 * - Smooth textarea resize transitions
 * - Tool menu fade-in animation
 * - Button hover states with HIVE motion tokens
 *
 * ## Usage
 * ```tsx
 * <SpaceComposerWithTools
 *   value={text}
 *   onValueChange={setText}
 *   onCreatePost={(content) => console.log(content)}
 *   onToolSelect={(toolId) => console.log(toolId)}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpaceComposerWithTools",
  component: SpaceComposerWithTools,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceComposerWithTools>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default composer with all features
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="max-w-2xl">
        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => {
            console.log("Post:", content);
            setValue("");
          }}
          onToolSelect={(toolId) => console.log("Tool:", toolId)}
        />
      </div>
    );
  },
};

/**
 * With custom placeholder
 */
export const CustomPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="max-w-2xl">
        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => setValue("")}
          placeholder="Share updates with CS Study Group..."
        />
      </div>
    );
  },
};

/**
 * Without inline tools (text only)
 */
export const TextOnly: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="max-w-2xl">
        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => setValue("")}
          showInlineTools={false}
        />
      </div>
    );
  },
};

/**
 * Without file attachments
 */
export const NoAttachments: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="max-w-2xl">
        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => setValue("")}
          canAttach={false}
        />
      </div>
    );
  },
};

/**
 * With slash command typed
 */
export const WithSlashCommand: Story = {
  render: () => {
    const [value, setValue] = useState("/");

    return (
      <div className="max-w-2xl">
        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => setValue("")}
          onToolSelect={(toolId) => {
            console.log("Selected tool:", toolId);
            setValue("");
          }}
        />
        <p className="mt-4 text-sm text-muted-foreground">
          Type /poll, /event, /task, or /resource
        </p>
      </div>
    );
  },
};

/**
 * With pre-filled text
 */
export const PrefilledText: Story = {
  render: () => {
    const [value, setValue] = useState("Check out this awesome resource I found!");

    return (
      <div className="max-w-2xl">
        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => setValue("")}
        />
      </div>
    );
  },
};

/**
 * HIVE Pattern: In space feed context
 */
export const InSpaceFeed: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="max-w-2xl space-y-4">
        {/* Space Header */}
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">CS Study Group</h2>
              <p className="text-sm text-muted-foreground">234 members</p>
            </div>
            <div className="text-xs text-muted-foreground">
              Last active: 2m ago
            </div>
          </div>
        </div>

        {/* Composer */}
        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => {
            console.log("Posted:", content);
            setValue("");
          }}
          onToolSelect={(toolId) => console.log("Tool:", toolId)}
          placeholder="Share with CS Study Group..."
        />

        {/* Recent Posts Preview */}
        <div className="space-y-2">
          <div className="p-3 bg-card border border-border rounded text-sm">
            <p className="font-medium mb-1">Sarah Chen</p>
            <p className="text-muted-foreground">Study session tonight at 7pm!</p>
          </div>
          <div className="p-3 bg-card border border-border rounded text-sm">
            <p className="font-medium mb-1">Mike Rodriguez</p>
            <p className="text-muted-foreground">Anyone have notes from last lecture?</p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Mobile view (narrow)
 */
export const MobileView: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="max-w-sm">
        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => setValue("")}
        />
      </div>
    );
  },
};

/**
 * Interactive demo with all handlers
 */
export const InteractiveDemo: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [lastAction, setLastAction] = useState<string>("");

    return (
      <div className="max-w-2xl space-y-4">
        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => {
            setLastAction(`Posted: "${content}"`);
            setValue("");
          }}
          onToolSelect={(toolId) => {
            setLastAction(`Selected tool: ${toolId}`);
          }}
          onAttachFile={() => setLastAction("Attach file clicked")}
          onAttachImage={() => setLastAction("Attach image clicked")}
        />

        {lastAction && (
          <div className="p-3 bg-muted rounded-lg text-sm">
            Last action: <span className="font-semibold">{lastAction}</span>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Long message (multi-line auto-resize)
 */
export const LongMessage: Story = {
  render: () => {
    const [value, setValue] = useState(
      "Hey everyone! Just wanted to share that I found this amazing resource for CSE 250. It has tons of practice problems and detailed explanations.\n\nHighly recommend checking it out before the midterm next week!"
    );

    return (
      <div className="max-w-2xl">
        <SpaceComposerWithTools
          value={value}
          onValueChange={setValue}
          onCreatePost={(content) => setValue("")}
        />
      </div>
    );
  },
};
