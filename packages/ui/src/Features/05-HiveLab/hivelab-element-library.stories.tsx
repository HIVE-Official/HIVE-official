import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { HiveLabElementLibrary, Element } from "../../atomic/organisms/hivelab-element-library";

/**
 * # HiveLabElementLibrary
 *
 * Library of draggable no-code elements for building HiveLab tools. Elements are organized
 * by category (interaction, logic, display, data, action, connect) and can be searched/favorited.
 *
 * ## Features
 * - Category filtering (6 categories)
 * - Search by element name/description
 * - Favorites system
 * - Drag-and-drop to canvas
 * - "New" badges for recently added elements
 * - Complexity indicators (simple/medium/advanced)
 * - Element descriptions and use cases
 *
 * ## HIVE Motion System
 * - Smooth category transitions
 * - Element card hover lift effect
 * - Drag preview animation
 * - Favorite star animation
 *
 * ## Usage
 * ```tsx
 * <HiveLabElementLibrary
 *   elements={availableElements}
 *   selectedCategory="interaction"
 *   onElementSelect={(el) => console.log(el)}
 *   onToggleFavorite={(id) => toggleFavorite(id)}
 * />
 * ```
 */
const meta = {
  title: "05-HiveLab/HiveLabElementLibrary",
  component: HiveLabElementLibrary,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HiveLabElementLibrary>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleElements: Element[] = [
  {
    id: "poll-1",
    name: "Poll",
    icon: "",
    category: "interaction",
    description: "Create multi-choice polls",
    complexity: "simple",
  },
  {
    id: "button-1",
    name: "Button",
    icon: "",
    category: "interaction",
    description: "Clickable action button",
    complexity: "simple",
  },
  {
    id: "form-1",
    name: "Form Input",
    icon: "",
    category: "interaction",
    description: "Text input field",
    complexity: "simple",
    isNew: true,
  },
  {
    id: "if-1",
    name: "If/Then",
    icon: "",
    category: "logic",
    description: "Conditional logic branching",
    complexity: "medium",
  },
  {
    id: "filter-1",
    name: "Filter",
    icon: "",
    category: "logic",
    description: "Filter data by criteria",
    complexity: "medium",
  },
  {
    id: "text-1",
    name: "Text Display",
    icon: "",
    category: "display",
    description: "Show formatted text",
    complexity: "simple",
  },
  {
    id: "chart-1",
    name: "Chart",
    icon: "",
    category: "display",
    description: "Visualize data",
    complexity: "medium",
  },
  {
    id: "table-1",
    name: "Table",
    icon: "",
    category: "display",
    description: "Display tabular data",
    complexity: "medium",
  },
  {
    id: "database-1",
    name: "Database",
    icon: "",
    category: "data",
    description: "Store and retrieve data",
    complexity: "advanced",
  },
  {
    id: "list-1",
    name: "List",
    icon: "",
    category: "data",
    description: "Manage lists of items",
    complexity: "simple",
  },
  {
    id: "email-1",
    name: "Send Email",
    icon: "",
    category: "action",
    description: "Send email notifications",
    complexity: "medium",
  },
  {
    id: "webhook-1",
    name: "Webhook",
    icon: "",
    category: "connect",
    description: "Connect to external APIs",
    complexity: "advanced",
    isNew: true,
  },
];

/**
 * Default library with all categories
 */
export const Default: Story = {
  args: {
    elements: sampleElements,
    selectedCategory: "all",
  },
};

/**
 * Interaction category selected
 */
export const InteractionCategory: Story = {
  args: {
    elements: sampleElements,
    selectedCategory: "interaction",
  },
};

/**
 * Logic category selected
 */
export const LogicCategory: Story = {
  args: {
    elements: sampleElements,
    selectedCategory: "logic",
  },
};

/**
 * With search query
 */
export const WithSearch: Story = {
  args: {
    elements: sampleElements,
    searchQuery: "poll",
  },
};

/**
 * With favorites
 */
export const WithFavorites: Story = {
  args: {
    elements: sampleElements.map((el, i) => ({
      ...el,
      isFavorite: i < 3,
    })),
  },
};

/**
 * Favorites only view
 */
export const FavoritesOnly: Story = {
  args: {
    elements: sampleElements.map((el, i) => ({
      ...el,
      isFavorite: i < 3,
    })),
    showFavoritesOnly: true,
  },
};

/**
 * Interactive with state management
 */
export const Interactive: Story = {
  render: () => {
    const [category, setCategory] = useState<Element["category"] | "all">("all");
    const [search, setSearch] = useState("");
    const [elements, setElements] = useState(sampleElements);

    return (
      <div className="space-y-4">
        <HiveLabElementLibrary
          elements={elements}
          selectedCategory={category}
          onCategoryChange={setCategory}
          searchQuery={search}
          onSearchChange={setSearch}
          onToggleFavorite={(id) => {
            setElements(
              elements.map((el) =>
                el.id === id ? { ...el, isFavorite: !el.isFavorite } : el
              )
            );
          }}
        />
      </div>
    );
  },
};

/**
 * Empty search results
 */
export const EmptySearch: Story = {
  args: {
    elements: sampleElements,
    searchQuery: "nonexistent",
  },
};

/**
 * Only simple elements
 */
export const SimpleOnly: Story = {
  args: {
    elements: sampleElements.filter((el) => el.complexity === "simple"),
  },
};

/**
 * Advanced elements
 */
export const AdvancedElements: Story = {
  args: {
    elements: sampleElements.filter((el) => el.complexity === "advanced"),
  },
};

/**
 * HIVE Pattern: In builder sidebar
 */
export const InBuilderSidebar: Story = {
  render: () => (
    <div className="h-screen flex">
      <div className="w-80 border-r border-border">
        <HiveLabElementLibrary elements={sampleElements} />
      </div>
      <div className="flex-1 p-4 bg-muted/20">
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">
            Canvas area (drag elements here)
          </p>
        </div>
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
      <HiveLabElementLibrary elements={sampleElements.slice(0, 6)} />
    </div>
  ),
};

/**
 * With new elements highlighted
 */
export const WithNewElements: Story = {
  args: {
    elements: sampleElements.map((el, i) => ({
      ...el,
      isNew: i < 2,
    })),
  },
};

/**
 * All categories expanded
 */
export const AllCategories: Story = {
  render: () => (
    <div className="space-y-6">
      {["all", "interaction", "logic", "display", "data", "action", "connect"].map((cat) => (
        <div key={cat}>
          <h3 className="text-sm font-semibold mb-2 capitalize">{cat}</h3>
          <HiveLabElementLibrary
            elements={sampleElements}
            selectedCategory={cat as any}
          />
        </div>
      ))}
    </div>
  ),
};
