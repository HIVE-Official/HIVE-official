import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from '../../atomic/atoms/avatar';

const meta: Meta<typeof Avatar> = {
  title: '01-Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE avatar component for displaying user profile images with fallbacks.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="User" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const CampusAvatars: Story = {
  render: () => (
    <div className="flex gap-4 p-6">
      <div className="text-center">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Student" />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
        <p className="mt-2 text-sm text-hive-text-mutedLight">Student</p>
      </div>
      <div className="text-center">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face" alt="Builder" />
          <AvatarFallback>BD</AvatarFallback>
        </Avatar>
        <p className="mt-2 text-sm text-hive-text-mutedLight">Builder</p>
      </div>
      <div className="text-center">
        <Avatar>
          <AvatarImage src="" alt="Faculty" />
          <AvatarFallback>FC</AvatarFallback>
        </Avatar>
        <p className="mt-2 text-sm text-hive-text-mutedLight">Faculty</p>
      </div>
    </div>
  ),
};