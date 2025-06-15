"use client";

import React, { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { ElementCard } from "./element-card";
import type { ElementPickerProps } from "./types";
import type { Element } from "@hive/core";

export default {};

// Mock data for now - will be replaced with Firestore hook
const MOCK_ELEMENTS: Element[] = [
  {
    id: "textBlock-v1",
    name: "Text Block",
    type: "textBlock",
    category: "Display & Layout",
    description: "Display formatted text content",
    icon: "Type",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "imageBlock-v1",
    name: "Image Block",
    type: "imageBlock",
    category: "Display & Layout",
    description: "Display images with captions",
    icon: "Image",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "divider-v1",
    name: "Divider",
    type: "divider",
    category: "Display & Layout",
    description: "Visual separator between sections",
    icon: "Minus",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "stack-v1",
    name: "Stack Container",
    type: "stack",
    category: "Display & Layout",
    description: "Organize elements vertically or horizontally",
    icon: "Square",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "button-v1",
    name: "Button",
    type: "button",
    category: "Inputs & Choices",
    description: "Interactive button for user actions",
    icon: "MousePointer",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "choiceSelect-v1",
    name: "Choice Select",
    type: "choiceSelect",
    category: "Inputs & Choices",
    description: "Multiple choice selection input",
    icon: "CheckSquare",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "textInput-v1",
    name: "Text Input",
    type: "textInput",
    category: "Inputs & Choices",
    description: "Single or multi-line text input",
    icon: "TextCursor",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "ratingStars-v1",
    name: "Rating Stars",
    type: "ratingStars",
    category: "Inputs & Choices",
    description: "Star-based rating input",
    icon: "Star",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "countdownTimer-v1",
    name: "Countdown Timer",
    type: "countdownTimer",
    category: "Logic & Dynamics",
    description: "Display time remaining until an event",
    icon: "Clock",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "progressBar-v1",
    name: "Progress Bar",
    type: "progressBar",
    category: "Logic & Dynamics",
    description: "Show completion progress",
    icon: "BarChart3",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "conditionGate-v1",
    name: "Condition Gate",
    type: "conditionGate",
    category: "Logic & Dynamics",
    description: "Conditional content display",
    icon: "GitBranch",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "pingTrigger-v1",
    name: "Ping Trigger",
    type: "pingTrigger",
    category: "Logic & Dynamics",
    description: "Send notifications or signals",
    icon: "Zap",
    version: 1,
    configSchema: "{}",
    defaultConfig: {},
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const CATEGORIES = [
  "Display & Layout",
  "Inputs & Choices",
  "Logic & Dynamics",
] as const;

interface CategorySectionProps {
  category: string;
  elements: Element[];
  isCollapsed: boolean;
  onToggle: () => void;
  onElementSelect: (elementId: string) => void;
}

function CategorySection({
  category,
  elements,
  isCollapsed,
  onToggle,
  onElementSelect,
}: CategorySectionProps) {
  const ChevronIcon = isCollapsed ? ChevronRight : ChevronDown;

  return (
    <div className="border-b border-white/10 last:border-b-0">
      {/* Category Header */}
      <button
        className={cn(
          "flex w-full items-center justify-between px-4 py-3",
          "text-left hover:bg-white/5 transition-colors",
          "focus:outline-none focus:ring-1 focus:ring-yellow-400/50"
        )}
        onClick={onToggle}
        aria-expanded={!isCollapsed}
        aria-controls={`category-${category.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <h3 className="text-sm font-medium text-white">{category}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">{elements.length}</span>
          <ChevronIcon className="h-4 w-4 text-white/60" strokeWidth={1.5} />
        </div>
      </button>

      {/* Category Elements */}
      {!isCollapsed && (
        <div
          id={`category-${category.replace(/\s+/g, "-").toLowerCase()}`}
          className="grid gap-2 p-4 pt-0"
        >
          {elements.map((element) => (
            <ElementCard
              key={element.id}
              element={element}
              onSelect={onElementSelect}
              enableDrag={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ElementPicker({
  onElementSelect,
  className,
  isLoading = false,
}: ElementPickerProps) {
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set()
  );

  // Group elements by category
  const elementsByCategory = useMemo(() => {
    return CATEGORIES.reduce(
      (acc, category) => {
        acc[category] = MOCK_ELEMENTS.filter(
          (element) => element.category === category
        );
        return acc;
      },
      {} as Record<string, Element[]>
    );
  }, []);

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex h-96 w-80 flex-col items-center justify-center",
          "rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm",
          className
        )}
      >
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
        <p className="mt-2 text-sm text-white/60">Loading elements...</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-96 w-80 flex-col overflow-hidden",
        "rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <h2 className="text-lg font-semibold text-white">Elements</h2>
        <p className="text-sm text-white/60">
          Click or drag to add to your tool
        </p>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        {CATEGORIES.map((category) => (
          <CategorySection
            key={category}
            category={category}
            elements={elementsByCategory[category] || []}
            isCollapsed={collapsedCategories.has(category)}
            onToggle={() => toggleCategory(category)}
            onElementSelect={onElementSelect}
          />
        ))}
      </div>
    </div>
  );
}
