import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingStepIndicator } from './onboarding-step-indicator';

const meta = {
  title: '01-Onboarding/OnboardingStepIndicator',
  component: OnboardingStepIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Progress indicator for onboarding. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OnboardingStepIndicator>;

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
        <OnboardingStepIndicator />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <OnboardingStepIndicator isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <OnboardingStepIndicator error="Error message" />
      </div>
    </div>
  ),
};
