// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../components/input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
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
    type: {
      control: { type: 'text' },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    type: 'text',
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    type: 'password',
    placeholder: 'Enter password',
  },
};
