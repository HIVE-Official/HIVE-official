import type { Meta, StoryObj } from '@storybook/react';
import { SpaceActivationRequestForm } from '../../components/spaces/space-activation-request-form';

const meta: Meta<typeof SpaceActivationRequestForm> = {
  title: '03-Features/Space Activation Form',
  component: SpaceActivationRequestForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form for requesting to lead a preview mode space, with connection validation and tool selection.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceActivationRequestForm>;

export const AcademicSpace: Story = {
  args: {
    space: {
      id: 'math-dept-preview',
      name: 'Mathematics Department',
      category: 'academic',
      description: 'Connect with math students, get help with problem sets, and discuss advanced topics.',
      potentialMembers: 892,
      rssEvents: [
        {
          title: 'Linear Algebra Study Session',
          date: '2024-01-15T14:00:00Z',
          source: 'Math Department'
        },
        {
          title: 'Calculus Tutoring Hours',
          date: '2024-01-16T16:00:00Z',
          source: 'Math Department'
        },
        {
          title: 'Math Club Meeting',
          date: '2024-01-18T19:00:00Z',
          source: 'Student Organizations'
        }
      ]
    },
    onSubmit: async (data: unknown) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
    onCancel: () => console.log('Form cancelled'),
  },
};

export const StudentOrganization: Story = {
  args: {
    space: {
      id: 'robotics-club-preview',
      name: 'Robotics Club',
      category: 'social',
      description: 'Build robots, compete in competitions, and learn about automation and AI.',
      potentialMembers: 156,
      rssEvents: [
        {
          title: 'FIRST Robotics Competition Info Session',
          date: '2024-01-20T18:00:00Z',
          source: 'Engineering Department'
        },
        {
          title: 'Arduino Workshop',
          date: '2024-01-22T15:00:00Z',
          source: 'Maker Space'
        }
      ]
    },
    onSubmit: async (data: unknown) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
    onCancel: () => console.log('Form cancelled'),
  },
};

export const ResidentialSpace: Story = {
  args: {
    space: {
      id: 'south-campus-preview',
      name: 'South Campus Community',
      category: 'residential',
      description: 'Connect graduate students and upperclassmen living in South Campus.',
      potentialMembers: 567,
      rssEvents: [
        {
          title: 'Graduate Student Mixer',
          date: '2024-01-19T19:00:00Z',
          source: 'Residential Life'
        },
        {
          title: 'Study Space Open House',
          date: '2024-01-21T14:00:00Z',
          source: 'Residential Life'
        }
      ]
    },
    onSubmit: async (data: unknown) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
    onCancel: () => console.log('Form cancelled'),
  },
};

export const GreekLife: Story = {
  args: {
    space: {
      id: 'gamma-phi-beta-preview',
      name: 'Gamma Phi Beta',
      category: 'professional',
      description: 'Building strong, confident women through sisterhood and philanthropy.',
      potentialMembers: 89,
      rssEvents: [
        {
          title: 'Philanthropy Planning Meeting',
          date: '2024-01-17T20:00:00Z',
          source: 'Greek Life Office'
        },
        {
          title: 'Leadership Workshop',
          date: '2024-01-24T18:30:00Z',
          source: 'Greek Life Office'
        }
      ]
    },
    onSubmit: async (data: unknown) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
    onCancel: () => console.log('Form cancelled'),
  },
};