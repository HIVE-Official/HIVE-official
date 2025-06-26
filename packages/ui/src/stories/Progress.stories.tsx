import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../components/progress';
import * as React from 'react';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1A1A1A' },
        { name: 'light', value: '#F8F8F8' },
      ],
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 33,
    className: 'w-[300px]'
  },
};

export const Loading: Story = {
    render: (args: React.ComponentProps<typeof Progress>) => {
        const [progress, setProgress] = React.useState(13);

        React.useEffect(() => {
            const timer = setTimeout(() => setProgress(66), 500);
            return () => clearTimeout(timer);
        }, []);

        return <Progress {...args} value={progress} className="w-[300px]" />;
    }
} 