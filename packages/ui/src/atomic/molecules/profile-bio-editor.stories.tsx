import type { Meta, StoryObj } from '@storybook/react';
import { ProfileBioEditor } from './profile-bio-editor';

const meta = {
  title: '02-Profile/ProfileBioEditor',
  component: ProfileBioEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Editable bio field. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileBioEditor>;

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
        <ProfileBioEditor />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <ProfileBioEditor isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <ProfileBioEditor error="Error message" />
      </div>
    </div>
  ),
};
