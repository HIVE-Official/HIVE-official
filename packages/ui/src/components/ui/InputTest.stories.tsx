import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input Test',
  component: Input,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const WhiteTextTest: Story = {
  args: {
    placeholder: 'Type here to test white text...',
    defaultValue: 'This should be white text',
  },
  render: (args) => (
    <div className="p-8 bg-background">
      <div className="space-y-4 max-w-md">
        <h3 className="text-foreground text-lg font-semibold">Input White Text Test</h3>
        <Input {...args} />
        <Input placeholder="Another input test" />
        <Input type="email" placeholder="Email input test" />
        <Input type="password" placeholder="Password input test" />
        <div className="text-muted text-sm">
          All input text above should be pure white (#FFFFFF)
        </div>
      </div>
    </div>
  ),
}; 