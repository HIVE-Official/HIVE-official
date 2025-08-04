import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { HiveProgress } from '../../components/hive-progress';

const meta: Meta<typeof HiveProgress> = {
  title: '04-Hive/Progress System',
  component: HiveProgress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**HIVE Progress System - Campus Achievement Tracking**

Visual progress indicators built with HIVE's foundation systems for accessibility, mobile optimization, and semantic design tokens.

## When to Use
- Academic semester and course completion tracking
- Tool creation and building progress
- Study session and productivity timers
- Campus engagement and achievement systems
- File uploads and data processing workflows

## Foundation Features
- **Mobile-First Design**: Touch-friendly progress bars optimized for all screen sizes
- **Accessibility Built-In**: WCAG 2.1 AA compliance with screen reader announcements
- **HIVE Motion System**: Smooth progress animations with liquid metal transitions
- **Semantic Design Tokens**: Consistent with HIVE brand system and status colors

## Progress Types
- **Linear**: Standard progress bars for file uploads and loading states
- **Circular**: Compact progress indicators for dashboards and cards
- **Steps**: Multi-stage progress for onboarding and complex workflows
- **Animated**: Dynamic progress with smooth transitions and micro-interactions

## Campus Context
All progress indicators are optimized for university workflows, academic timelines, and student productivity patterns.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value percentage (0-100)'
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'premium'],
      description: 'Progress variant with semantic design tokens'
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Progress bar size for different contexts'
    },
    type: {
      control: 'select',
      options: ['linear', 'circular', 'stepped'],
      description: 'Progress indicator type'
    },
    animated: {
      control: 'boolean',
      description: 'Enable smooth progress animations'
    },
    showValue: {
      control: 'boolean',
      description: 'Display percentage value text'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Show indeterminate loading animation'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
    variant: 'default',
    size: 'default',
    type: 'linear'
  }
};

export const Playground: Story = {
  args: {
    value: 42,
    variant: 'default',
    size: 'default',
    type: 'linear',
    animated: true,
    showValue: true,
    label: 'Course Progress'
  }
};

export const AcademicProgress: Story = {
  args: {
    value: 78,
    variant: 'success',
    size: 'default',
    type: 'linear',
    animated: true,
    showValue: true,
    label: 'CS 101: Data Structures',
    description: '12 of 15 assignments completed'
  }
};

export const StudySession: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress(prev => prev >= 100 ? 0 : prev + 1);
      }, 100);
      
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div className="space-y-4">
        <HiveProgress
          value={progress}
          variant="premium"
          size="lg"
          type="linear"
          animated
          showValue
          label="Pomodoro Study Session"
          description={`${Math.round(progress * 0.25)} minutes elapsed`}
        />
        <div className="text-center">
          <div className="text-sm text-[var(--hive-text-secondary)]">
            Focus time: {progress < 100 ? 'Active' : 'Break Time!'}
          </div>
        </div>
      </div>
    );
  }
};

export const ToolBuilding: Story = {
  args: {
    value: 45,
    variant: 'premium',
    size: 'default',
    type: 'stepped',
    animated: true,
    steps: [
      { label: 'Design', completed: true },
      { label: 'Build', active: true, progress: 45 },
      { label: 'Test', completed: false },
      { label: 'Publish', completed: false }
    ],
    label: 'Grade Calculator Tool',
    description: 'Step 2 of 4: Building interface'
  }
};

export const FileUpload: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    
    const startUpload = () => {
      setIsUploading(true);
      setProgress(0);
      
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setIsUploading(false), 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    };
    
    return (
      <div className="space-y-4">
        <button
          onClick={startUpload}
          disabled={isUploading}
          className="px-4 py-2 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-lg disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Upload Lecture Notes'}
        </button>
        
        {isUploading && (
          <HiveProgress
            value={progress}
            variant={progress === 100 ? 'success' : 'default'}
            size="default"
            type="linear"
            animated
            showValue
            label="lecture-notes-cs101.pdf"
            description={progress === 100 ? 'Upload complete!' : 'Uploading to campus cloud...'}
          />
        )}
      </div>
    );
  }
};

export const CircularDashboard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center space-y-2">
        <HiveProgress
          value={85}
          variant="success"
          type="circular"
          size="lg"
          animated
          showValue
        />
        <div className="text-sm font-medium text-[var(--hive-text-primary)]">
          Semester Progress
        </div>
        <div className="text-xs text-[var(--hive-text-secondary)]">
          Week 13 of 15
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <HiveProgress
          value={64}
          variant="premium"
          type="circular"
          size="lg"
          animated
          showValue
        />
        <div className="text-sm font-medium text-[var(--hive-text-primary)]">
          Tool Mastery
        </div>
        <div className="text-xs text-[var(--hive-text-secondary)]">
          12 tools created
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <HiveProgress
          value={92}
          variant="success"
          type="circular"
          size="lg"
          animated
          showValue
        />
        <div className="text-sm font-medium text-[var(--hive-text-primary)]">
          Study Streak
        </div>
        <div className="text-xs text-[var(--hive-text-secondary)]">
          23 consecutive days
        </div>
      </div>
    </div>
  )
};

export const OnboardingSteps: Story = {
  args: {
    value: 60,
    variant: 'premium',
    type: 'stepped',
    size: 'default',
    animated: true,
    steps: [
      { label: 'Account', completed: true },
      { label: 'Campus', completed: true },
      { label: 'Profile', active: true, progress: 60 },
      { label: 'Spaces', completed: false },
      { label: 'Tools', completed: false }
    ],
    label: 'HIVE Onboarding',
    description: 'Complete your profile to unlock campus features'
  }
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">
          Indeterminate Loading
        </h3>
        <HiveProgress
          indeterminate
          variant="default"
          size="default"
          type="linear"
          label="Loading campus data..."
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">
          Processing States
        </h3>
        <div className="space-y-3">
          <HiveProgress
            value={100}
            variant="success"
            size="sm"
            type="linear"
            showValue
            label="Syncing calendar"
            description="Complete"
          />
          <HiveProgress
            value={45}
            variant="warning"
            size="sm"
            type="linear"
            animated
            showValue
            label="Building tool"
            description="In progress..."
          />
          <HiveProgress
            value={15}
            variant="error"
            size="sm"
            type="linear"
            showValue
            label="Upload failed"
            description="Connection error"
          />
        </div>
      </div>
    </div>
  )
};

export const MobileOptimized: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-base font-medium text-[var(--hive-text-primary)] mb-4">
          Mobile Progress Experience
        </h3>
        <HiveProgress
          value={73}
          variant="premium"
          size="lg"
          type="linear"
          animated
          showValue
          label="Assignment: Data Structures Project"
          description="Due in 3 days • 7 of 10 requirements met"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <HiveProgress
            value={68}
            variant="success"
            type="circular"
            size="default"
            animated
            showValue
          />
          <div className="text-sm font-medium text-[var(--hive-text-primary)] mt-2">
            GPA Progress
          </div>
        </div>
        
        <div className="text-center">
          <HiveProgress
            value={84}
            variant="premium"
            type="circular"
            size="default"
            animated
            showValue
          />
          <div className="text-sm font-medium text-[var(--hive-text-primary)] mt-2">
            Study Goals
          </div>
        </div>
      </div>
    </div>
  )
};

export const AccessibilityDemo: Story = {
  args: {
    value: 75,
    variant: 'success',
    size: 'default',
    type: 'linear',
    animated: true,
    showValue: true,
    label: 'Accessibility-First Progress',
    description: 'Full screen reader support and keyboard navigation',
    ariaLabel: 'Course completion progress: 75 percent complete',
    ariaDescription: 'You have completed 3 of 4 required assignments'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
          Linear Progress Variants
        </h3>
        <div className="space-y-4">
          {['default', 'success', 'warning', 'error', 'premium'].map(variant => (
            <HiveProgress
              key={variant}
              value={65}
              variant={variant as any}
              type="linear"
              size="default"
              animated
              showValue
              label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Progress`}
              description={`Progress bar with ${variant} styling`}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
          Circular Progress Variants
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {['default', 'success', 'warning', 'error', 'premium'].map(variant => (
            <div key={variant} className="text-center">
              <HiveProgress
                value={75}
                variant={variant as any}
                type="circular"
                size="default"
                animated
                showValue
              />
              <div className="text-xs text-[var(--hive-text-secondary)] mt-2 capitalize">
                {variant}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};