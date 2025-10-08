import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { HiveLabPropertiesPanel } from "../../atomic/organisms/hivelab-properties-panel";
import type { CanvasElement } from "../../atomic/organisms/hivelab-builder-canvas";

/**
 * # HiveLabPropertiesPanel
 *
 * Properties editor panel for configuring selected canvas elements in HiveLab builder.
 * Shows context-specific settings based on element type.
 *
 * ## Features
 * - Element-specific property editors
 * - Real-time property updates
 * - Delete element action
 * - Empty state for no selection
 * - Form inputs (text, textarea, switch, select)
 * - Validation feedback
 *
 * ## HIVE Motion System
 * - Smooth property panel transitions
 * - Input focus animations
 * - Delete button hover state
 *
 * ## Usage
 * ```tsx
 * <HiveLabPropertiesPanel
 *   selectedElement={element}
 *   onPropertyChange={(prop, value) => console.log(prop, value)}
 *   onDeleteElement={() => console.log("delete")}
 * />
 * ```
 */
const meta = {
  title: "05-HiveLab/HiveLabPropertiesPanel",
  component: HiveLabPropertiesPanel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HiveLabPropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleElement: CanvasElement = {
  id: "poll-1",
  name: "Poll Component",
  icon: "",
  category: "interaction",
  description: "Create a multi-choice poll",
  x: 100,
  y: 100,
  canvasId: "poll-1-canvas",
};

/**
 * Empty state (no element selected)
 */
export const Empty: Story = {
  args: {
    selectedElement: null,
  },
};

/**
 * With element selected
 */
export const WithElement: Story = {
  args: {
    selectedElement: sampleElement,
  },
};

/**
 * Poll element properties
 */
export const PollElement: Story = {
  args: {
    selectedElement: {
      ...sampleElement,
      name: "Midterm Topics Poll",
      category: "interaction",
    },
  },
};

/**
 * Text display element
 */
export const TextElement: Story = {
  args: {
    selectedElement: {
      ...sampleElement,
      id: "text-1",
      name: "Welcome Text",
      icon: "",
      category: "display",
      description: "Display formatted text",
      canvasId: "text-1-canvas",
    },
  },
};

/**
 * Button element
 */
export const ButtonElement: Story = {
  args: {
    selectedElement: {
      ...sampleElement,
      id: "button-1",
      name: "Submit Button",
      icon: "",
      category: "interaction",
      description: "Action button",
      canvasId: "button-1-canvas",
    },
  },
};

/**
 * Interactive with state
 */
export const Interactive: Story = {
  render: () => {
    const [element, setElement] = useState<CanvasElement | null>(sampleElement);
    const [deletedMessage, setDeletedMessage] = useState("");

    return (
      <div className="space-y-4">
        <HiveLabPropertiesPanel
          selectedElement={element}
          onPropertyChange={(property, value) => {
            console.log("Property changed:", property, value);
            if (element) {
              setElement({ ...element, [property]: value });
            }
          }}
          onDeleteElement={() => {
            setDeletedMessage(`Deleted: ${element?.name}`);
            setElement(null);
          }}
        />

        {deletedMessage && (
          <div className="p-3 bg-muted rounded-lg text-sm">
            {deletedMessage}
          </div>
        )}
      </div>
    );
  },
};

/**
 * HIVE Pattern: In builder right sidebar
 */
export const InBuilderSidebar: Story = {
  render: () => (
    <div className="h-screen flex">
      {/* Left: Element Library */}
      <div className="w-64 border-r border-border p-4 bg-card">
        <h3 className="text-sm font-semibold mb-3">Elements</h3>
        <div className="space-y-2">
          <div className="p-3 bg-background border border-border rounded">
            <div className="flex items-center gap-2">
              <span className="text-xl"></span>
              <span className="text-sm">Poll</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Canvas */}
      <div className="flex-1 p-4 bg-muted/20">
        <div className="flex items-center justify-center h-full">
          <div className="p-8 bg-card border-2 border-primary rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl"></span>
              <div>
                <p className="font-semibold">Poll Component</p>
                <p className="text-xs text-muted-foreground">Selected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Properties Panel */}
      <div className="w-80 border-l border-border">
        <HiveLabPropertiesPanel selectedElement={sampleElement} />
      </div>
    </div>
  ),
};

/**
 * All element types
 */
export const AllElementTypes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">Poll</h3>
        <HiveLabPropertiesPanel selectedElement={sampleElement} />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Text Display</h3>
        <HiveLabPropertiesPanel
          selectedElement={{
            ...sampleElement,
            id: "text-1",
            name: "Text Display",
            icon: "",
            category: "display",
            canvasId: "text-1-canvas",
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Button</h3>
        <HiveLabPropertiesPanel
          selectedElement={{
            ...sampleElement,
            id: "button-1",
            name: "Button",
            icon: "",
            category: "interaction",
            canvasId: "button-1-canvas",
          }}
        />
      </div>
    </div>
  ),
};

/**
 * Mobile view (narrow)
 */
export const MobileView: Story = {
  render: () => (
    <div className="max-w-sm">
      <HiveLabPropertiesPanel selectedElement={sampleElement} />
    </div>
  ),
};

/**
 * With complex element (many properties)
 */
export const ComplexElement: Story = {
  args: {
    selectedElement: {
      ...sampleElement,
      name: "Advanced Poll with Multiple Options",
      category: "interaction",
    },
  },
};
