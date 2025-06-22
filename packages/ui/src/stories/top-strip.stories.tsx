import type { Meta, StoryObj } from "@storybook/react";
import {
  TopStrip,
  createSampleTopStripItems,
  TopStripItem,
} from "../components/feed/top-strip";
import { useState, useEffect } from "react";

const meta: Meta<typeof TopStrip> = {
  title: "Feed/Top Strip V2 (Brand Aligned)",
  component: TopStrip,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Top Strip - Phase 2 (Brand Aligned)

This component is the primary engagement surface for time-sensitive rituals and campus moments. 
It has been refactored to align with HIVE's brand system:

- **Color Palette**: Uses semantic tokens (\`surface-01\`, \`accent-gold\`, etc.) for consistency.
- **Typography**: Employs \`font-display\` and \`font-body\` for clear hierarchy.
- **Motion**: Implements brand-approved timings (\`90ms\`, \`ease-out\`) for a polished feel.
- **Layout**: Responsive grid system that adapts from mobile to desktop.
        `,
      },
    },
  },
  argTypes: {
    onItemClick: { action: "item clicked" },
    onItemLongPress: { action: "item long pressed" },
  },
  decorators: [
    (Story) => (
      <div className="bg-bg-root min-h-screen p-4 md:p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TopStrip>;

// ============================================================================
// STORIES
// ============================================================================

export const Default: Story = {
  args: {
    items: createSampleTopStripItems(),
  },
  name: "Default State",
  parameters: {
    docs: {
      storyDescription: "The default view with a mix of urgent rituals, new spaces, and other events.",
    },
  },
};

export const NoUrgentRitual: Story = {
  args: {
    items: createSampleTopStripItems().map(item => ({...item, isUrgent: false})),
  },
  name: "No Urgent Ritual",
  parameters: {
    docs: {
      storyDescription: "When no rituals are marked as 'urgent', the layout adapts to a standard grid.",
    },
  },
};

export const MultipleRituals: Story = {
  args: {
    items: [
      ...createSampleTopStripItems(),
      {
        id: "ritual-2",
        type: "ritual",
        title: "Midnight Library Access",
        subtitle: "Unlock 24/7 study access for finals week.",
        timestamp: new Date(new Date().getTime() + 4 * 60 * 60 * 1000), // 4 hours from now
        isUrgent: true,
        participants: 312,
        maxParticipants: 500,
        priority: 1,
      },
    ],
  },
  name: "Multiple Rituals",
  parameters: {
    docs: {
      storyDescription: "Demonstrates how the strip prioritizes the most urgent ritual, even when multiple are active.",
    },
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
  },
  name: "Empty State",
  parameters: {
    docs: {
      storyDescription: "The component remains gracefully hidden when there are no items to display.",
    },
  },
};

const InteractiveStory = () => {
  const [items, setItems] = useState<TopStripItem[]>(createSampleTopStripItems());

  useEffect(() => {
    const interval = setInterval(() => {
      // Create a new item to simulate a real-time update
      const newItem: TopStripItem = {
        id: `space-unlock-${Date.now()}`,
        type: "space-unlock",
        title: "New Study Group",
        timestamp: new Date(),
        priority: 2,
      };
      setItems(prevItems => [newItem, ...prevItems].slice(0, 5));
    }, 5000); // Add a new item every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return <TopStrip items={items} onItemClick={(item) => alert(`Clicked: ${item.title}`)} />;
};

export const LiveUpdating: Story = {
  render: () => <InteractiveStory />,
  name: "Live Updating",
  parameters: {
    docs: {
      storyDescription: "This story demonstrates how the Top Strip handles real-time updates, with new items being added dynamically.",
    },
  },
};
