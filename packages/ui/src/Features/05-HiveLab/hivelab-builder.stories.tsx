import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { HiveLabElementLibrary, type Element } from "../../atomic/organisms/hivelab-element-library";
import { HiveLabBuilderCanvas, type CanvasElement } from "../../atomic/organisms/hivelab-builder-canvas";
import { HiveLabPropertiesPanel } from "../../atomic/organisms/hivelab-properties-panel";

/**
 * # HiveLab Builder - Visual Tool Creator
 *
 * **The Power Platform for Space Leaders**
 *
 * HiveLab is where space leaders build custom tools for their communities.
 * Think "digital LEGO blocks" - drag elements onto a canvas, wire them together,
 * and deploy instantly to your space.
 *
 * ## The Philosophy
 * - No assumptions about what gets built (could be utility, game, prank, art)
 * - Elements are creative atoms, not prescriptions
 * - ~30 launch elements = unlimited combinations
 * - Success = students build things we never imagined
 *
 * ## Core Components
 * 1. **Element Library** (Left): Categorized building blocks
 * 2. **Builder Canvas** (Center): Drag-drop visual programming
 * 3. **Properties Panel** (Right): Configure selected elements
 *
 * ## Element Categories
 * - 🎮 **Interaction**: How users interact (buttons, inputs, pickers)
 * - 🧠 **Logic**: Make it smart (if/then, random, math)
 * - 👁️ **Display**: Show results (charts, leaderboards, feeds)
 * - 💾 **Data**: Store & remember (variables, lists, database)
 * - 🚀 **Action**: Make things happen (post, notify, export)
 * - 🔌 **Connect**: Link to world (webhooks, APIs, OAuth)
 *
 * ## Real Examples (What Students Build)
 * - "Hot or Not: Dining Hall Edition" - [Camera] → [AI] → [Slider] → [Leaderboard]
 * - "Anonymous Confession Booth" - [Text Input] → [Filter] → [Post] → [Feed]
 * - "Who's Down to Party?" - [Button] → [Member Picker] → [Timer] → [Notify]
 * - "Professor Bingo" - [Grid] → [Button] → [Counter] → [Leaderboard]
 *
 * ## User Flow
 * 1. Leader opens HiveLab from space admin
 * 2. Chooses template OR starts from scratch
 * 3. Drags elements onto canvas
 * 4. Wires elements together (data flow)
 * 5. Configures properties
 * 6. Tests with real space data
 * 7. Deploys to space Tools Widget
 * 8. Members use tool, data flows to analytics
 */
const meta = {
  title: "05-HiveLab/Builder",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample elements for the library
const sampleElements: Element[] = [
  // Interaction elements
  {
    id: "text-input",
    name: "Text Input",
    icon: "📝",
    category: "interaction",
    description: "Let users type anything",
    complexity: "simple",
  },
  {
    id: "button",
    name: "Button",
    icon: "🔘",
    category: "interaction",
    description: "Click to make things happen",
    complexity: "simple",
  },
  {
    id: "slider",
    name: "Slider",
    icon: "🎚️",
    category: "interaction",
    description: "Rate things (1-10)",
    complexity: "simple",
  },
  {
    id: "member-picker",
    name: "Member Picker",
    icon: "👥",
    category: "interaction",
    description: "Select people from space",
    complexity: "medium",
  },
  {
    id: "file-upload",
    name: "File Upload",
    icon: "📁",
    category: "interaction",
    description: "Share pics, docs, memes",
    complexity: "medium",
  },
  {
    id: "date-time",
    name: "Date/Time",
    icon: "📅",
    category: "interaction",
    description: "When stuff happens",
    complexity: "simple",
  },

  // Logic elements
  {
    id: "if-then",
    name: "If/Then",
    icon: "🔀",
    category: "logic",
    description: "Branch based on conditions",
    complexity: "medium",
  },
  {
    id: "random",
    name: "Random Picker",
    icon: "🎲",
    category: "logic",
    description: "Pick randomly (fair or weighted)",
    complexity: "simple",
  },
  {
    id: "counter",
    name: "Counter",
    icon: "🔢",
    category: "logic",
    description: "Track numbers, scores",
    complexity: "simple",
  },
  {
    id: "timer",
    name: "Timer",
    icon: "⏰",
    category: "logic",
    description: "Countdowns, delays",
    complexity: "simple",
  },
  {
    id: "math",
    name: "Math",
    icon: "➗",
    category: "logic",
    description: "Calculate stuff",
    complexity: "simple",
  },
  {
    id: "filter",
    name: "Filter",
    icon: "🔍",
    category: "logic",
    description: "Only show matches",
    complexity: "medium",
  },

  // Display elements
  {
    id: "text-display",
    name: "Text/Numbers",
    icon: "📊",
    category: "display",
    description: "Show results",
    complexity: "simple",
  },
  {
    id: "progress",
    name: "Progress Bar",
    icon: "📈",
    category: "display",
    description: "How far along?",
    complexity: "simple",
  },
  {
    id: "chart",
    name: "Chart",
    icon: "📉",
    category: "display",
    description: "Visualize data",
    complexity: "medium",
    isNew: true,
  },
  {
    id: "leaderboard",
    name: "Leaderboard",
    icon: "🏆",
    category: "display",
    description: "Who's winning?",
    complexity: "simple",
  },
  {
    id: "feed",
    name: "Feed",
    icon: "📰",
    category: "display",
    description: "Scrollable list",
    complexity: "medium",
  },
  {
    id: "grid",
    name: "Grid",
    icon: "⊞",
    category: "display",
    description: "Card layout",
    complexity: "simple",
  },

  // Data elements
  {
    id: "variable",
    name: "Variable",
    icon: "💾",
    category: "data",
    description: "Hold values",
    complexity: "simple",
  },
  {
    id: "list",
    name: "List",
    icon: "📋",
    category: "data",
    description: "Collections of things",
    complexity: "simple",
  },
  {
    id: "database",
    name: "Database",
    icon: "🗄️",
    category: "data",
    description: "Save permanently",
    complexity: "advanced",
  },
  {
    id: "file-storage",
    name: "File Storage",
    icon: "💿",
    category: "data",
    description: "Upload/download",
    complexity: "medium",
  },

  // Action elements
  {
    id: "post-to-feed",
    name: "Post",
    icon: "📢",
    category: "action",
    description: "Share to space feed",
    complexity: "simple",
  },
  {
    id: "notify",
    name: "Notify",
    icon: "🔔",
    category: "action",
    description: "Alert members",
    complexity: "simple",
  },
  {
    id: "email",
    name: "Email",
    icon: "📧",
    category: "action",
    description: "Send messages",
    complexity: "medium",
  },
  {
    id: "calendar",
    name: "Calendar Event",
    icon: "🗓️",
    category: "action",
    description: "Create events",
    complexity: "simple",
  },
  {
    id: "export",
    name: "Export Data",
    icon: "💾",
    category: "action",
    description: "Download CSV",
    complexity: "simple",
  },

  // Connect elements
  {
    id: "webhook",
    name: "Webhook",
    icon: "🔗",
    category: "connect",
    description: "External triggers",
    complexity: "advanced",
    isNew: true,
  },
  {
    id: "api",
    name: "API",
    icon: "⚡",
    category: "connect",
    description: "Get external data",
    complexity: "advanced",
  },
];

/**
 * Complete HiveLab Builder Interface
 */
export const CompleteBuilder: Story = {
  render: () => {
    const [elements, setElements] = React.useState<CanvasElement[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<Element["category"] | "all">("all");
    const [selectedElementId, setSelectedElementId] = React.useState<string | null>(null);
    const [favorites, setFavorites] = React.useState<string[]>([]);

    const selectedElement = elements.find((el) => el.canvasId === selectedElementId);

    const elementsWithFavorites = sampleElements.map((el) => ({
      ...el,
      isFavorite: favorites.includes(el.id),
    }));

    const handleElementAdd = (element: CanvasElement) => {
      setElements([...elements, element]);
      setSelectedElementId(element.canvasId);
    };

    const handleElementRemove = (canvasId: string) => {
      setElements(elements.filter((el) => el.canvasId !== canvasId));
      if (selectedElementId === canvasId) {
        setSelectedElementId(null);
      }
    };

    const handleElementMove = (canvasId: string, x: number, y: number) => {
      setElements(
        elements.map((el) =>
          el.canvasId === canvasId ? { ...el, x, y } : el
        )
      );
    };

    const handleToggleFavorite = (elementId: string) => {
      setFavorites(
        favorites.includes(elementId)
          ? favorites.filter((id) => id !== elementId)
          : [...favorites, elementId]
      );
    };

    return (
      <div className="h-screen bg-background flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-border bg-card p-4">
          <div className="max-w-full mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold">HiveLab Builder</h1>
                <p className="text-xs text-muted-foreground">
                  Visual tool creator for space leaders
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">CS Study Group</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Builder Interface - 3-Column Layout */}
        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          {/* Left: Element Library (25%) */}
          <div className="w-80 shrink-0">
            <HiveLabElementLibrary
              elements={elementsWithFavorites}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onElementSelect={(element) => console.log("Element clicked:", element)}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          {/* Center: Builder Canvas (50%) */}
          <div className="flex-1 min-w-0">
            <HiveLabBuilderCanvas
              elements={elements}
              onElementAdd={handleElementAdd}
              onElementRemove={(id) => handleElementRemove(id)}
              onElementMove={handleElementMove}
              onElementSelect={setSelectedElementId}
              selectedElementId={selectedElementId}
              onTestTool={() =>
                alert("Testing tool...\n\nThis would open a preview with your space's real data.")
              }
              onClearCanvas={() => {
                if (confirm("Clear all elements from canvas?")) {
                  setElements([]);
                  setSelectedElementId(null);
                }
              }}
              toolName="Anonymous Feedback Tool"
            />
          </div>

          {/* Right: Properties Panel (25%) */}
          <div className="w-80 shrink-0">
            <HiveLabPropertiesPanel
              selectedElement={selectedElement}
              onPropertyChange={(property, value) =>
                console.log("Property changed:", property, value)
              }
              onDeleteElement={() => {
                if (selectedElementId) {
                  handleElementRemove(selectedElementId);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Element Library showcase
 */
export const ElementLibraryShowcase: Story = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = React.useState<Element["category"] | "all">("all");
    const [favorites, setFavorites] = React.useState<string[]>(["text-input", "button", "leaderboard"]);

    const elementsWithFavorites = sampleElements.map((el) => ({
      ...el,
      isFavorite: favorites.includes(el.id),
    }));

    return (
      <div className="h-screen bg-background p-8">
        <div className="max-w-md mx-auto h-full">
          <HiveLabElementLibrary
            elements={elementsWithFavorites}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onElementSelect={(element) =>
              alert(`Selected: ${element.name}\n\n${element.description}`)
            }
            onToggleFavorite={(id) => {
              setFavorites(
                favorites.includes(id)
                  ? favorites.filter((fid) => fid !== id)
                  : [...favorites, id]
              );
            }}
          />
        </div>
      </div>
    );
  },
};

/**
 * Pre-built tool example: Anonymous Feedback
 */
export const PrebuiltAnonymousFeedback: Story = {
  render: () => {
    const prebuiltElements: CanvasElement[] = [
      {
        id: "text-input",
        name: "Feedback Text",
        icon: "📝",
        category: "interaction",
        description: "Enter your feedback",
        canvasId: "input-1",
        x: 100,
        y: 100,
      },
      {
        id: "slider",
        name: "Rating (1-5)",
        icon: "🎚️",
        category: "interaction",
        description: "Rate your experience",
        canvasId: "slider-1",
        x: 100,
        y: 220,
      },
      {
        id: "if-then",
        name: "If rating < 3",
        icon: "🔀",
        category: "logic",
        description: "Ask why if low rating",
        canvasId: "logic-1",
        x: 400,
        y: 160,
      },
      {
        id: "database",
        name: "Store Anonymously",
        icon: "🗄️",
        category: "data",
        description: "Save without user ID",
        canvasId: "data-1",
        x: 700,
        y: 100,
      },
      {
        id: "chart",
        name: "Rating Chart",
        icon: "📊",
        category: "display",
        description: "Show distribution",
        canvasId: "display-1",
        x: 700,
        y: 220,
      },
    ];

    const [selectedElementId, setSelectedElementId] = React.useState<string | null>(null);

    return (
      <div className="h-screen bg-background p-8">
        <div className="h-full">
          <HiveLabBuilderCanvas
            elements={prebuiltElements}
            selectedElementId={selectedElementId}
            onElementSelect={setSelectedElementId}
            toolName="Anonymous Feedback Tool"
            onTestTool={() => alert("Testing feedback tool...")}
          />
        </div>
      </div>
    );
  },
};

/**
 * Example: "Who's Down to Party?" tool
 */
export const PartytoolExample: Story = {
  render: () => {
    const partyElements: CanvasElement[] = [
      {
        id: "button",
        name: "I'm Down! 🎉",
        icon: "🔘",
        category: "interaction",
        description: "Click to join",
        canvasId: "btn-1",
        x: 100,
        y: 150,
      },
      {
        id: "member-picker",
        name: "Tag Friends",
        icon: "👥",
        category: "interaction",
        description: "Who's coming?",
        canvasId: "picker-1",
        x: 400,
        y: 100,
      },
      {
        id: "timer",
        name: "30min countdown",
        icon: "⏰",
        category: "logic",
        description: "Auto-close RSVP",
        canvasId: "timer-1",
        x: 400,
        y: 220,
      },
      {
        id: "notify",
        name: "Notify tagged",
        icon: "🔔",
        category: "action",
        description: "Alert friends",
        canvasId: "action-1",
        x: 700,
        y: 150,
      },
    ];

    return (
      <div className="h-screen bg-background p-8">
        <HiveLabBuilderCanvas
          elements={partyElements}
          toolName="Who's Down to Party?"
          onTestTool={() => alert("Testing party tool...")}
        />
      </div>
    );
  },
};
