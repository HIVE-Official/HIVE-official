import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSocialLinks } from './profile-social-links';

const meta = {
  title: '02-Profile/ProfileSocialLinks',
  component: ProfileSocialLinks,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Social media links display. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileSocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Failed to load component',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Default</h3>
        <ProfileSocialLinks />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ProfileSocialLinks isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ProfileSocialLinks error="Error message" />
      </div>
    </div>
  ),
};
