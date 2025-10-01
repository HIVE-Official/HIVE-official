import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingConnectionSuggestions } from './onboarding-connection-suggestions';

const meta = {
  title: '01-Onboarding/OnboardingConnectionSuggestions',
  component: OnboardingConnectionSuggestions,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - Connection suggestions step. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OnboardingConnectionSuggestions>;

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
        <OnboardingConnectionSuggestions />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <OnboardingConnectionSuggestions isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <OnboardingConnectionSuggestions error="Error message" />
      </div>
    </div>
  ),
};
