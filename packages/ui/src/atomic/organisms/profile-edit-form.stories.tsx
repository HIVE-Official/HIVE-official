import type { Meta, StoryObj } from '@storybook/react';
import { ProfileEditForm } from './profile-edit-form';

const meta = {
  title: '02-Profile/ProfileEditForm',
  component: ProfileEditForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Profile edit form. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileEditForm>;

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
        <ProfileEditForm />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ProfileEditForm isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ProfileEditForm error="Error message" />
      </div>
    </div>
  ),
};
