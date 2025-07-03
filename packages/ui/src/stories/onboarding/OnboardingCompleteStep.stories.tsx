import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingCompleteStep } from '../../components/onboarding/onboarding-complete-step';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof OnboardingCompleteStep> = {
  title: 'Onboarding/OnboardingCompleteStep',
  component: OnboardingCompleteStep,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onGoToFeed: action('onGoToFeed triggered'),
  }
};

export default meta;

export const Default: StoryObj<typeof OnboardingCompleteStep> = {}; 