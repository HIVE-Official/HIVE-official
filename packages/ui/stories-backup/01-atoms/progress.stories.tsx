import type { Meta, StoryObj } from '@storybook/react';
import { 
  Progress, 
  CircularProgress, 
  LoadingProgress, 
  SuccessProgress, 
  ErrorProgress,
  CircularSpinner
} from '../../atomic/atoms/progress';

const meta: Meta<typeof Progress> = {
  title: '01-Atoms/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Progress components for showing completion status, loading states, and user feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Progress bar size',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Progress bar color variant',
    },
    showValue: {
      control: 'boolean',
      description: 'Show percentage value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Progress Bar
export const Default: Story = {
  args: {
    value: 50,
    size: 'md',
    variant: 'default',
  },
};

export const WithValue: Story = {
  args: {
    value: 75,
    size: 'md',
    variant: 'default',
    showValue: true,
  },
};

// Progress States
export const Empty: Story = {
  args: {
    value: 0,
    size: 'md',
    variant: 'default',
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    size: 'md',
    variant: 'success',
    showValue: true,
  },
};

export const NearComplete: Story = {
  args: {
    value: 95,
    size: 'md',
    variant: 'success',
    showValue: true,
  },
};

// Size Variations
export const Small: Story = {
  args: {
    value: 60,
    size: 'sm',
    variant: 'default',
  },
};

export const Large: Story = {
  args: {
    value: 60,
    size: 'lg',
    variant: 'default',
    showValue: true,
  },
};

// Color Variants
export const Success: Story = {
  args: {
    value: 85,
    size: 'md',
    variant: 'success',
    showValue: true,
  },
};

export const Warning: Story = {
  args: {
    value: 45,
    size: 'md',
    variant: 'warning',
    showValue: true,
  },
};

export const Error: Story = {
  args: {
    value: 25,
    size: 'md',
    variant: 'error',
    showValue: true,
  },
};

// Circular Progress
const CircularMeta: Meta<typeof CircularProgress> = {
  title: '01-Atoms/Progress/Circular',
  component: CircularProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const CircularDefault: StoryObj<typeof CircularProgress> = {
  args: {
    value: 60,
    size: 'md',
  },
  parameters: CircularMeta.parameters,
};

export const CircularLarge: StoryObj<typeof CircularProgress> = {
  args: {
    value: 80,
    size: 'lg',
    showValue: true,
  },
  parameters: CircularMeta.parameters,
};

export const CircularSmall: StoryObj<typeof CircularProgress> = {
  args: {
    value: 40,
    size: 'sm',
  },
  parameters: CircularMeta.parameters,
};

// Academic Progress Examples
export const GpaProgress: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-hive-background-primary">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-hive-text-primary">Current GPA</span>
          <span className="text-sm text-hive-text-mutedLight">3.7/4.0</span>
        </div>
        <Progress value={92.5} variant="success" size="md" />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-hive-text-primary">Semester Progress</span>
          <span className="text-sm text-hive-text-mutedLight">Week 8/16</span>
        </div>
        <Progress value={50} variant="default" size="md" />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-hive-text-primary">Credits Completed</span>
          <span className="text-sm text-hive-text-mutedLight">87/120</span>
        </div>
        <Progress value={72.5} variant="default" size="md" />
      </div>
    </div>
  ),
};

export const CourseCompletion: StoryObj<typeof CircularProgress> = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-6 bg-hive-background-primary">
      <div className="text-center">
        <CircularProgress value={95} size="lg" showValue />
        <p className="mt-2 text-sm font-medium text-hive-text-primary">CS 101</p>
        <p className="text-xs text-hive-text-mutedLight">Almost Done!</p>
      </div>
      <div className="text-center">
        <CircularProgress value={60} size="lg" showValue />
        <p className="mt-2 text-sm font-medium text-hive-text-primary">MATH 220</p>
        <p className="text-xs text-hive-text-mutedLight">On Track</p>
      </div>
      <div className="text-center">
        <CircularProgress value={30} size="lg" showValue />
        <p className="mt-2 text-sm font-medium text-hive-text-primary">PHYS 150</p>
        <p className="text-xs text-hive-text-mutedLight">Need Focus</p>
      </div>
    </div>
  ),
  parameters: CircularMeta.parameters,
};

// Loading States
export const LoadingState: StoryObj<typeof LoadingProgress> = {
  render: () => (
    <div className="space-y-4 p-6 bg-hive-background-primary">
      <LoadingProgress message="Loading your profile..." />
      <LoadingProgress message="Syncing calendar events..." />
      <LoadingProgress message="Processing grade data..." />
    </div>
  ),
};

export const SuccessState: StoryObj<typeof SuccessProgress> = {
  render: () => (
    <div className="space-y-4 p-6 bg-hive-background-primary">
      <SuccessProgress message="Profile updated successfully!" />
      <SuccessProgress message="Assignment submitted!" />
      <SuccessProgress message="Grade sync complete!" />
    </div>
  ),
};

export const ErrorState: StoryObj<typeof ErrorProgress> = {
  render: () => (
    <div className="space-y-4 p-6 bg-hive-background-primary">
      <ErrorProgress message="Failed to load grades" />
      <ErrorProgress message="Network connection error" />
      <ErrorProgress message="Unable to sync calendar" />
    </div>
  ),
};

// Spinners
export const Spinner: StoryObj<typeof CircularSpinner> = {
  render: () => (
    <div className="flex items-center space-x-8 p-6 bg-hive-background-primary">
      <div className="text-center">
        <CircularSpinner size="sm" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Small</p>
      </div>
      <div className="text-center">
        <CircularSpinner size="md" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Medium</p>
      </div>
      <div className="text-center">
        <CircularSpinner size="lg" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Large</p>
      </div>
    </div>
  ),
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-hive-text-primary">Progress Bars</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-hive-text-primary">Default (50%)</span>
            </div>
            <Progress value={50} variant="default" size="md" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-hive-text-primary">Success (85%)</span>
            </div>
            <Progress value={85} variant="success" size="md" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-hive-text-primary">Warning (45%)</span>
            </div>
            <Progress value={45} variant="warning" size="md" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-hive-text-primary">Error (25%)</span>
            </div>
            <Progress value={25} variant="error" size="md" />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-hive-text-primary">Circular Progress</h3>
        <div className="flex space-x-6">
          <CircularProgress value={75} size="md" showValue />
          <CircularProgress value={50} size="md" showValue />
          <CircularProgress value={25} size="md" showValue />
        </div>
      </div>
    </div>
  ),
};