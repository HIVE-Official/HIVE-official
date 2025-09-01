import type { Meta, StoryObj } from '@storybook/react';
import { FeaturesSection } from './features-section';

const meta: Meta<typeof FeaturesSection> = {
  title: 'Landing/FeaturesSection',
  component: FeaturesSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Features section showcasing the key capabilities and benefits of the HIVE platform.',
      },
    },
  },
  argTypes: {
    features: { control: 'object' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FeaturesSection>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <FeaturesSection {...args} />
    </div>
  ),
};

export const CustomFeatures: Story = {
  args: {
    features: [
      {
        icon: "🎓",
        title: "Academic Focus",
        description: "Built specifically for academic communities with features that support learning and collaboration.",
        highlight: true,
      },
      {
        icon: "🔒",
        title: "Privacy First",
        description: "Your data is yours. We use minimal tracking and prioritize student privacy above all else.",
      },
      {
        icon: "⚡",
        title: "Lightning Fast",
        description: "Optimized for speed and performance, ensuring seamless real-time interactions.",
      },
    ],
  },
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <FeaturesSection {...args} />
    </div>
  ),
};

export const SingleColumn: Story = {
  args: {
    features: [
      {
        icon: "🚀",
        title: "Launch Ready",
        description: "Everything you need to get started with campus community building, right out of the box.",
        highlight: true,
      },
    ],
  },
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <FeaturesSection {...args} />
    </div>
  ),
};

export const Playground: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <FeaturesSection {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different feature configurations and layouts.',
      },
    },
  },
};