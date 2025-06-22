import type { Meta, StoryObj } from "@storybook/react";
import { ElementRenderer } from "./ElementRenderer";

const meta: Meta<typeof ElementRenderer> = {
  title: "Creator/HiveLAB/ElementRenderer",
  component: ElementRenderer,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Renders individual element instances on the design canvas with proper styling and behavior.",
      },
    },
  },
  argTypes: {
    onSelect: { action: "element selected" },
    onUpdate: { action: "element updated" },
    isSelected: { control: "boolean" },
    isPreview: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ElementRenderer>;

export const TextBlock: Story = {
  args: {
    elementInstance: {
      id: "text-1",
      elementId: "textBlock-v1",
      position: { x: 0, y: 0 },
      config: {
        text: "This is a sample text block with some content.",
        style: {
          fontSize: "lg",
          fontWeight: "semibold",
          textAlign: "center",
          padding: 16,
          borderRadius: 8,
          backgroundColor: "#1f2937",
          textColor: "#f9fafb",
        },
      },
    } as any,
    elementDefinition: {
      id: "textBlock-v1",
      name: "Text Block",
      type: "textBlock",
      category: "Display & Layout",
    } as any,
    isSelected: false,
    isPreview: false,
    onSelect: () => console.log("Selected text block"),
  },
};

export const TextBlockSelected: Story = {
  args: {
    ...TextBlock.args,
    isSelected: true,
  },
};

export const Button: Story = {
  args: {
    elementInstance: {
      id: "button-1",
      elementId: "button-v1",
      position: { x: 0, y: 0 },
      config: {
        text: "Submit Form",
        variant: "primary",
        style: {
          padding: 12,
          borderRadius: 6,
          backgroundColor: "#fbbf24",
          textColor: "#000000",
        },
      },
    } as any,
    elementDefinition: {
      id: "button-v1",
      name: "Button",
      type: "button",
      category: "Inputs & Choices",
    } as any,
    isSelected: false,
    isPreview: false,
    onSelect: () => console.log("Selected button"),
  },
};

export const ChoiceSelect: Story = {
  args: {
    elementInstance: {
      id: "choice-1",
      elementId: "choiceSelect-v1",
      position: { x: 0, y: 0 },
      config: {
        label: "What is your favorite color?",
        options: [
          { label: "Red", value: "red" },
          { label: "Blue", value: "blue" },
          { label: "Green", value: "green" },
          { label: "Yellow", value: "yellow" },
        ],
        multiple: false,
        style: {
          padding: 16,
          borderRadius: 8,
          backgroundColor: "#374151",
          textColor: "#f9fafb",
        },
      },
    } as any,
    elementDefinition: {
      id: "choiceSelect-v1",
      name: "Choice Select",
      type: "choiceSelect",
      category: "Inputs & Choices",
    } as any,
    isSelected: false,
    isPreview: false,
    onSelect: () => console.log("Selected choice"),
  },
};

export const CountdownTimer: Story = {
  args: {
    elementInstance: {
      id: "timer-1",
      elementId: "countdownTimer-v1",
      position: { x: 0, y: 0 },
      config: {
        duration: 300,
        showLabels: true,
        style: {
          padding: 20,
          borderRadius: 12,
          backgroundColor: "#065f46",
          textColor: "#ecfdf5",
        },
      },
    } as any,
    elementDefinition: {
      id: "countdownTimer-v1",
      name: "Countdown Timer",
      type: "countdownTimer",
      category: "Logic & Dynamics",
    } as any,
    isSelected: false,
    isPreview: false,
    onSelect: () => console.log("Selected timer"),
  },
};

export const ImageBlock: Story = {
  args: {
    elementInstance: {
      id: "image-1",
      elementId: "imageBlock-v1",
      position: { x: 0, y: 0 },
      config: {
        src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop",
        alt: "Sample image",
        style: {
          borderRadius: 8,
          padding: 0,
        },
      },
    } as any,
    elementDefinition: {
      id: "imageBlock-v1",
      name: "Image Block",
      type: "imageBlock",
      category: "Display & Layout",
    } as any,
    isSelected: false,
    isPreview: false,
    onSelect: () => console.log("Selected image"),
  },
};

export const Divider: Story = {
  args: {
    elementInstance: {
      id: "divider-1",
      elementId: "divider-v1",
      position: { x: 0, y: 0 },
      config: {
        thickness: "medium",
        color: "#6b7280",
        style: {
          margin: 16,
        },
      },
    } as any,
    elementDefinition: {
      id: "divider-v1",
      name: "Divider",
      type: "divider",
      category: "Display & Layout",
    } as any,
    isSelected: false,
    isPreview: false,
    onSelect: () => console.log("Selected divider"),
  },
};

export const PreviewMode: Story = {
  args: {
    ...TextBlock.args,
    isPreview: true,
  },
};

export const LockedElement: Story = {
  args: {
    elementInstance: {
      ...TextBlock.args?.elementInstance,
      config: {
        ...TextBlock.args?.elementInstance?.config,
        isLocked: true,
      },
    } as any,
    elementDefinition: TextBlock.args?.elementDefinition,
    isSelected: true,
    isPreview: false,
    onSelect: () => console.log("Selected locked element"),
  },
};

export const HiddenElement: Story = {
  args: {
    elementInstance: {
      ...TextBlock.args?.elementInstance,
      config: {
        ...TextBlock.args?.elementInstance?.config,
        isVisible: false,
      },
    } as any,
    elementDefinition: TextBlock.args?.elementDefinition,
    isSelected: false,
    isPreview: false,
    onSelect: () => console.log("Selected hidden element"),
  },
};
