import type { Meta, StoryObj } from '@storybook/react';
import { SchoolPledgeStep } from '../../components/onboarding/school-pledge-step';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SchoolPledgeStep> = {
  title: 'Onboarding/SchoolPledgeStep',
  component: SchoolPledgeStep,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onNext: action('onNext triggered'),
  }
};

export default meta;

export const Default: StoryObj<typeof SchoolPledgeStep> = {
  args: {
    schoolName: 'University at Buffalo',
  },
}; 