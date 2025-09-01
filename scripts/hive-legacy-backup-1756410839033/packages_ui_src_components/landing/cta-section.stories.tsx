import type { Meta, StoryObj } from '@storybook/react';
import { CTASection } from './cta-section';

const meta: Meta<typeof CTASection> = {
  title: 'Landing/CTASection',
  component: CTASection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Call-to-action section designed to convert visitors into users with compelling messaging and clear actions.',
      },
    },
  },
  argTypes: {
    onGetStarted: { action: 'get-started-clicked' },
    onLearnMore: { action: 'learn-more-clicked' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CTASection>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <CTASection {...args} />
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    onGetStarted: () => console.log('Starting the journey!'),
    onLearnMore: () => console.log('Learning more about HIVE!'),
  },
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <CTASection {...args} />
    </div>
  ),
};

export const Playground: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <CTASection {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different CTA configurations and interactions.',
      },
    },
  },
};