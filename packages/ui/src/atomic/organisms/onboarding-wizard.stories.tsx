import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingWizard } from './onboarding-wizard';

const meta = {
  title: '01-Onboarding/OnboardingWizard',
  component: OnboardingWizard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Multi-step onboarding wizard. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OnboardingWizard>;

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
        <OnboardingWizard />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <OnboardingWizard isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <OnboardingWizard error="Error message" />
      </div>
    </div>
  ),
};
