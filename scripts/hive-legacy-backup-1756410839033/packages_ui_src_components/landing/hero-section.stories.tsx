import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './hero-section';

const meta: Meta<typeof HeroSection> = {
  title: 'Landing/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main hero section for the HIVE landing page, featuring the brand message and primary CTAs.',
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
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col">
        <HeroSection {...args} />
      </div>
    </div>
  ),
};

export const WithCustomActions: Story = {
  args: {
    onGetStarted: () => console.log('Get Started clicked!'),
    onLearnMore: () => console.log('Learn More clicked!'),
  },
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col">
        <HeroSection {...args} />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col">
        <HeroSection {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different states and interactions of the Hero Section.',
      },
    },
  },
};