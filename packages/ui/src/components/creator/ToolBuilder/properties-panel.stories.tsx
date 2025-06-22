import type { Meta, StoryObj } from "@storybook/react";
import { PropertiesPanel } from "./PropertiesPanel";

// Simple mock data for the story
const mockElementInstance = {
  id: "element-1",
  elementId: "textBlock-v1",
  position: { x: 50, y: 50 },
  config: {
    text: "Sample text content",
    style: {
      fontSize: "base",
      fontWeight: "normal",
      textAlign: "left",
      padding: 16,
      borderRadius: 8,
      backgroundColor: "#000000",
      textColor: "#ffffff",
    },
    isVisible: true,
    isLocked: false,
    zIndex: 1,
  },
};

const mockElementDefinition = {
  id: "textBlock-v1",
  name: "Text Block",
  type: "textBlock",
  category: "Display & Layout",
  icon: "Type",
  description: "Display formatted text content",
  usageCount: 1250,
};

const meta: Meta<typeof PropertiesPanel> = {
  title: "Creator/HiveLAB/PropertiesPanel",
  component: PropertiesPanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Properties panel for configuring selected elements in the HiveLAB tool builder.",
      },
    },
  },
  argTypes: {
    onElementUpdate: { action: "element updated" },
    onElementDelete: { action: "element deleted" },
    onElementDuplicate: { action: "element duplicated" },
  },
};

export default meta;
type Story = StoryObj<typeof PropertiesPanel>;

export const TextBlockSelected: Story = {
  args: {
    selectedElement: mockElementInstance as any,
    elementDefinition: mockElementDefinition as any,
    onElementUpdate: (elementId: string, updates: any) => {
      console.log("Element updated:", elementId, updates);
    },
    onElementDelete: (elementId: string) => {
      console.log("Element deleted:", elementId);
    },
    onElementDuplicate: (elementId: string) => {
      console.log("Element duplicated:", elementId);
    },
  },
};

export const ButtonSelected: Story = {
  args: {
    selectedElement: {
      id: "element-2",
      elementId: "button-v1",
      position: { x: 100, y: 100 },
      config: {
        text: "Click me",
        variant: "primary",
        style: {
          padding: 12,
          borderRadius: 6,
          backgroundColor: "#fbbf24",
          textColor: "#000000",
        },
        isVisible: true,
        isLocked: false,
        zIndex: 2,
      },
    } as any,
    elementDefinition: {
      id: "button-v1",
      name: "Button",
      type: "button",
      category: "Inputs & Choices",
      icon: "MousePointer",
      description: "Interactive button element",
    } as any,
    onElementUpdate: (elementId: string, updates: any) => {
      console.log("Element updated:", elementId, updates);
    },
    onElementDelete: (elementId: string) => {
      console.log("Element deleted:", elementId);
    },
    onElementDuplicate: (elementId: string) => {
      console.log("Element duplicated:", elementId);
    },
  },
};

export const ChoiceSelectSelected: Story = {
  args: {
    selectedElement: {
      id: "element-3",
      elementId: "choiceSelect-v1",
      position: { x: 150, y: 150 },
      config: {
        label: "Choose your favorite",
        options: [
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" },
        ],
        multiple: false,
        style: {
          padding: 16,
          borderRadius: 8,
          backgroundColor: "#1f2937",
          textColor: "#f9fafb",
        },
        isVisible: true,
        isLocked: false,
        zIndex: 1,
      },
    } as any,
    elementDefinition: {
      id: "choiceSelect-v1",
      name: "Choice Select",
      type: "choiceSelect",
      category: "Inputs & Choices",
      icon: "CheckSquare",
      description: "Multiple choice selection",
    } as any,
    onElementUpdate: (elementId: string, updates: any) => {
      console.log("Element updated:", elementId, updates);
    },
    onElementDelete: (elementId: string) => {
      console.log("Element deleted:", elementId);
    },
    onElementDuplicate: (elementId: string) => {
      console.log("Element duplicated:", elementId);
    },
  },
};

export const NoSelection: Story = {
  args: {
    selectedElement: null,
    elementDefinition: null,
    onElementUpdate: (elementId: string, updates: any) => {
      console.log("Element updated:", elementId, updates);
    },
    onElementDelete: (elementId: string) => {
      console.log("Element deleted:", elementId);
    },
    onElementDuplicate: (elementId: string) => {
      console.log("Element duplicated:", elementId);
    },
  },
};
