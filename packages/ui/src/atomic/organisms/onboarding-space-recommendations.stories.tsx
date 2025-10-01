import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingSpaceRecommendations } from './onboarding-space-recommendations';

const meta = {
  title: '01-Onboarding/OnboardingSpaceRecommendations',
  component: OnboardingSpaceRecommendations,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Space recommendations step. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OnboardingSpaceRecommendations>;

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
        <OnboardingSpaceRecommendations />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <OnboardingSpaceRecommendations isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <OnboardingSpaceRecommendations error="Error message" />
      </div>
    </div>
  ),
};
