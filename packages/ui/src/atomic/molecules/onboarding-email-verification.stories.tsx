import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingEmailVerification } from './onboarding-email-verification';

const meta = {
  title: '01-Onboarding/OnboardingEmailVerification',
  component: OnboardingEmailVerification,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Email verification step. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OnboardingEmailVerification>;

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
        <OnboardingEmailVerification />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <OnboardingEmailVerification isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <OnboardingEmailVerification error="Error message" />
      </div>
    </div>
  ),
};
