import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Landing/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Landing page header with HIVE branding and optional login functionality.',
      },
    },
  },
  argTypes: {
    onLogin: { action: 'login-clicked' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <Header {...args} />
    </div>
  ),
};

export const WithLogin: Story = {
  args: {
    onLogin: () => console.log('Login clicked!'),
  },
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <Header {...args} />
    </div>
  ),
};

export const Playground: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-background text-foreground">
      <Header {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different header configurations.',
      },
    },
  },
};