/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthFlow, type AuthFlowProps } from '../../components/auth/auth-flow';
import type { School } from '@hive/core';
import { ToastProvider } from '../../components/toast-provider';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof AuthFlow> = {
  title: 'Auth/AuthFlow',
  component: AuthFlow,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The complete, animated authentication flow with toast notifications.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AuthFlowProps>;

const mockSchools: School[] = [
  { id: '1', name: 'University at Buffalo', domain: 'buffalo.edu', status: 'open', studentsUntilOpen: 0, waitlistCount: 0 },
  { id: '2', name: 'Rochester Institute of Technology', domain: 'rit.edu', status: 'waitlist', studentsUntilOpen: 73, waitlistCount: 23 },
  { id: '3', name: 'Syracuse University', domain: 'syr.edu', status: 'waitlist', studentsUntilOpen: 156, waitlistCount: 45 },
  { id: '4', name: 'Cornell University', domain: 'cornell.edu', status: 'waitlist', studentsUntilOpen: 127, waitlistCount: 67 },
];

const mockOnEmailSubmit = async (email: string) => {
  action('email-submitted')({ email });
  console.warn('Submitting email:', email);
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const success = Math.random() > 0.3;
  if (!success) {
    throw new Error('Network timeout');
  }
};

const mockOnSchoolCreate = async (data: { name: string; domain: string }) => {
  action('school-created')(data);
  console.warn('Creating school:', data);
  await new Promise(resolve => setTimeout(resolve, 1000));
};

const baseArgs: AuthFlowProps = {
  schools: mockSchools,
  onSchoolSelect: action('school-selected'),
  onEmailSubmit: mockOnEmailSubmit,
  onCreateSchool: mockOnSchoolCreate,
};

export const Default: Story = {
  args: {
    ...baseArgs,
  },
  parameters: {
    docs: {
      description: {
        story: 'The complete authentication flow starting from school selection.',
      },
    },
  },
};

export const ErrorHandling: Story = {
  args: {
    ...baseArgs,
    onEmailSubmit: async (email: string) => {
      action('email-error')({ email });
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Rate limit exceeded. Please try again in 1 minute.');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates error handling with toast notifications when email submission fails.',
      },
    },
  },
}; 