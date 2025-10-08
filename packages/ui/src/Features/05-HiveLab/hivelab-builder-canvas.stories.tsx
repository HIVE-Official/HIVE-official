import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { HiveLabBuilderCanvas, CanvasElement } from "../../atomic/organisms/hivelab-builder-canvas";

/**
 * # HiveLabBuilderCanvas
 *
 * Visual no-code builder canvas for creating HiveLab tools. Allows drag-and-drop
 * of elements, connections between components, and real-time tool testing.
 *
 * ## Features
 * - Drag and drop from element library
 * - Element positioning and movement on canvas
 * - Zoom controls (zoom in/out)
 * - Element selection and highlighting
 * - Delete and duplicate elements
 * - Test mode to preview tool
 * - Clear canvas action
 * - Connection lines between elements (future)
 *
 * ## HIVE Motion System
 * - Smooth drag interactions
 * - Scale transitions on zoom
 * - Element selection ring animation
 * - Grid snapping (optional)
 *
 * ## Usage
 * ```tsx
 * <HiveLabBuilderCanvas
 *   elements={canvasElements}
 *   onElementAdd={(el) => console.log("Added:", el)}
 *   onElementMove={(id, x, y) => console.log("Moved:", id)}
 *   selectedElementId={selected}
 *   onElementSelect={setSelected}
 * />
 * ```
 */
const meta = {
  title: "05-HiveLab/HiveLabBuilderCanvas",
  component: HiveLabBuilderCanvas,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HiveLabBuilderCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleElements: CanvasElement[] = [
  {
    id: "poll-1",
    name: "Poll Component",
    category: "interactive",
    icon: "",
    description: "Create a multi-choice poll",
    x: 100,
    y: 100,
    canvasId: "poll-1-canvas",
  },
  {
    id: "text-1",
    name: "Text Display",
    category: "display",
    icon: "",
    description: "Show formatted text",
    x: 350,
    y: 150,
    canvasId: "text-1-canvas",
  },
];

/**
 * Empty canvas (ready for elements)
 */
export const Empty: Story = {
  args: {
    elements: [],
    toolName: "New Tool",
  },
};

/**
 * With elements placed
 */
export const WithElements: Story = {
  args: {
    elements: sampleElements,
    toolName: "Poll Tool",
  },
};

/**
 * With selected element
 */
export const ElementSelected: Story = {
  args: {
    elements: sampleElements,
    selectedElementId: "poll-1-canvas",
    toolName: "Poll Tool",
  },
};

/**
 * Interactive canvas with full functionality
 */
export const Interactive: Story = {
  render: () => {
    const [elements, setElements] = useState<CanvasElement[]>(sampleElements);
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="h-screen">
        <HiveLabBuilderCanvas
          elements={elements}
          selectedElementId={selected}
          onElementSelect={setSelected}
          onElementAdd={(element) => setElements([...elements, element])}
          onElementRemove={(canvasId) =>
            setElements(elements.filter((el) => el.canvasId !== canvasId))
          }
          onElementMove={(canvasId, x, y) =>
            setElements(
              elements.map((el) =>
                el.canvasId === canvasId ? { ...el, x, y } : el
              )
            )
          }
          onTestTool={() => console.log("Testing tool...")}
          onClearCanvas={() => setElements([])}
          toolName="Interactive Poll Tool"
        />
      </div>
    );
  },
};

/**
 * Complex layout (many elements)
 */
export const ComplexLayout: Story = {
  args: {
    elements: [
      {
        id: "title-1",
        name: "Title",
        category: "display",
        icon: "",
        description: "Tool title",
        x: 50,
        y: 50,
        canvasId: "title-1-canvas",
      },
      {
        id: "poll-1",
        name: "Poll",
        category: "interactive",
        icon: "",
        description: "Multi-choice poll",
        x: 100,
        y: 150,
        canvasId: "poll-1-canvas",
      },
      {
        id: "result-1",
        name: "Results Display",
        category: "display",
        icon: "",
        description: "Show poll results",
        x: 400,
        y: 150,
        canvasId: "result-1-canvas",
      },
      {
        id: "button-1",
        name: "Submit Button",
        category: "interactive",
        icon: "",
        description: "Action button",
        x: 250,
        y: 300,
        canvasId: "button-1-canvas",
      },
      {
        id: "text-1",
        name: "Description",
        category: "display",
        icon: "",
        description: "Tool description",
        x: 550,
        y: 100,
        canvasId: "text-1-canvas",
      },
    ],
    toolName: "Advanced Poll Tool",
  },
};

/**
 * HIVE Pattern: Builder interface context
 */
export const InBuilderContext: Story = {
  render: () => {
    const [elements, setElements] = useState<CanvasElement[]>([]);
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex h-screen">
        {/* Left Sidebar (Element Library) */}
        <div className="w-64 border-r border-border p-4 bg-card">
          <h3 className="text-sm font-semibold mb-3">Elements</h3>
          <div className="space-y-2">
            <div
              className="p-3 bg-background border border-border rounded cursor-move hover:border-primary transition-colors"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/json",
                  JSON.stringify({
                    id: `poll-${Date.now()}`,
                    name: "Poll",
                    category: "interactive",
                    icon: "",
                    description: "Multi-choice poll",
                  })
                );
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl"></span>
                <span className="text-sm font-medium">Poll</span>
              </div>
            </div>
            <div
              className="p-3 bg-background border border-border rounded cursor-move hover:border-primary transition-colors"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/json",
                  JSON.stringify({
                    id: `text-${Date.now()}`,
                    name: "Text",
                    category: "display",
                    icon: "",
                    description: "Text display",
                  })
                );
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl"></span>
                <span className="text-sm font-medium">Text</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Canvas */}
        <div className="flex-1">
          <HiveLabBuilderCanvas
            elements={elements}
            selectedElementId={selected}
            onElementSelect={setSelected}
            onElementAdd={(element) => setElements([...elements, element])}
            onElementRemove={(canvasId) =>
              setElements(elements.filter((el) => el.canvasId !== canvasId))
            }
            onElementMove={(canvasId, x, y) =>
              setElements(
                elements.map((el) =>
                  el.canvasId === canvasId ? { ...el, x, y } : el
                )
              )
            }
            toolName="My Custom Tool"
          />
        </div>

        {/* Right Sidebar (Properties) */}
        <div className="w-64 border-l border-border p-4 bg-card">
          <h3 className="text-sm font-semibold mb-3">Properties</h3>
          {selected ? (
            <div className="text-sm">
              <p className="text-muted-foreground">
                Configure element properties here
              </p>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Select an element to edit
            </div>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Mobile view (not ideal - show warning)
 */
export const MobileWarning: Story = {
  render: () => (
    <div className="p-4 max-w-sm">
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
          Desktop Only
        </h3>
        <p className="text-xs text-yellow-700 dark:text-yellow-300">
          The HiveLab Builder Canvas is optimized for desktop use. Please use a larger screen for the best experience.
        </p>
      </div>
    </div>
  ),
};
