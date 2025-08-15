import type { Meta, StoryObj } from '@storybook/react';
import { Progress, CircularProgress, LoadingProgress, SuccessProgress, ErrorProgress, CircularSpinner } from '../../atomic/atoms/progress';
import { useState, useEffect } from 'react';

const meta: Meta<typeof Progress> = {
  title: '01-Atoms/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE progress components for showing completion status, loading states, and campus activity progress.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value',
    },
    max: {
      control: { type: 'number', min: 1, max: 1000 },
      description: 'Maximum value',
    },
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'striped', 'circular'],
      description: 'Progress variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Progress size',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'gold', 'emerald', 'sapphire'],
      description: 'Progress color',
    },
    showValue: {
      control: 'boolean',
      description: 'Show percentage value',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    value: 65,
    label: 'Progress',
    showValue: true,
  },
};

export const Gradient: Story = {
  args: {
    value: 75,
    variant: 'gradient',
    label: 'Gradient Progress',
    showValue: true,
  },
};

export const Striped: Story = {
  args: {
    value: 50,
    variant: 'striped',
    animated: true,
    label: 'Striped Progress',
    showValue: true,
  },
};

export const Circular: Story = {
  args: {
    value: 80,
    variant: 'circular',
    showValue: true,
    label: 'Circular',
  },
};

// Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-primary mb-4">Linear Progress Sizes</h3>
        <div className="space-y-4">
          <Progress value={40} size="sm" label="Small" showValue />
          <Progress value={60} size="md" label="Medium" showValue />
          <Progress value={80} size="lg" label="Large" showValue />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-primary mb-4">Circular Progress Sizes</h3>
        <div className="flex gap-6 justify-center">
          <CircularProgress value={40} size="sm" showValue label="Small" />
          <CircularProgress value={60} size="md" showValue label="Medium" />
          <CircularProgress value={80} size="lg" showValue label="Large" />
        </div>
      </div>
    </div>
  ),
};

// Colors
export const AllColors: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-primary mb-4">Progress Colors</h3>
        <div className="space-y-3">
          <Progress value={70} color="primary" label="Primary (HIVE Gold)" showValue />
          <Progress value={85} color="success" label="Success (Emerald)" showValue />
          <Progress value={45} color="warning" label="Warning (Gold)" showValue />
          <Progress value={25} color="error" label="Error (Ruby)" showValue />
          <Progress value={90} color="gold" label="Gold" showValue />
          <Progress value={60} color="emerald" label="Emerald" showValue />
          <Progress value={75} color="sapphire" label="Sapphire" showValue />
        </div>
      </div>
    </div>
  ),
};

// Campus scenarios
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Academic Progress</h3>
        <div className="space-y-4">
          <Progress 
            value={85} 
            color="success" 
            variant="gradient"
            label="CS 101 - Data Structures" 
            showValue 
            size="md"
          />
          <Progress 
            value={72} 
            color="primary" 
            variant="gradient"
            label="MATH 205 - Linear Algebra" 
            showValue 
            size="md"
          />
          <Progress 
            value={45} 
            color="warning" 
            variant="gradient"
            label="PHYS 301 - Quantum Mechanics" 
            showValue 
            size="md"
          />
          <Progress 
            value={92} 
            color="emerald" 
            variant="gradient"
            label="ENG 102 - Technical Writing" 
            showValue 
            size="md"
          />
        </div>
        <p className="text-sm text-hive-text-mutedLight mt-4">
          Overall GPA Progress: 3.2/4.0
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Development</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <CircularProgress 
              value={65} 
              color="primary" 
              size="lg" 
              showValue 
              label="GPA Calculator"
            />
            <p className="text-xs text-hive-text-mutedLight mt-2">3 tasks remaining</p>
          </div>
          <div className="text-center">
            <CircularProgress 
              value={90} 
              color="success" 
              size="lg" 
              showValue 
              label="Study Scheduler"
            />
            <p className="text-xs text-hive-text-mutedLight mt-2">Ready to deploy</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Space Activities</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-hive-text-primary">Study Group Goal</p>
              <p className="text-sm text-hive-text-mutedLight">12/15 sessions completed</p>
            </div>
            <CircularProgress value={80} color="emerald" size="md" showValue />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-hive-text-primary">Floor Events</p>
              <p className="text-sm text-hive-text-mutedLight">6/10 events attended</p>
            </div>
            <CircularProgress value={60} color="sapphire" size="md" showValue />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-hive-text-primary">Tool Usage</p>
              <p className="text-sm text-hive-text-mutedLight">45/50 daily goal</p>
            </div>
            <CircularProgress value={90} color="primary" size="md" showValue />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-primary mb-4">Indeterminate Loading</h3>
        <div className="space-y-4">
          <LoadingProgress label="Syncing with Canvas..." />
          <LoadingProgress variant="striped" animated label="Processing grades..." />
          <div className="flex justify-center">
            <CircularSpinner color="primary" size="md" label="Loading..." />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-primary mb-4">File Upload Progress</h3>
        <div className="space-y-3">
          <Progress value={25} color="primary" label="assignment.pdf" showValue />
          <Progress value={80} color="success" label="notes.docx" showValue />
          <LoadingProgress label="homework.zip" />
        </div>
      </div>
    </div>
  ),
};

// Animated progress
export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 50);
      
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div className="space-y-6 w-80">
        <div>
          <h3 className="text-sm font-semibold text-hive-text-primary mb-4">Animated Progress Demo</h3>
          <div className="space-y-4">
            <Progress 
              value={progress} 
              color="primary" 
              variant="gradient"
              label="Semester Progress" 
              showValue 
            />
            <Progress 
              value={progress} 
              color="success" 
              variant="striped"
              animated
              label="Study Session" 
              showValue 
            />
            <div className="flex justify-center">
              <CircularProgress 
                value={progress} 
                color="emerald" 
                size="lg" 
                showValue 
                label="Overall"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-primary mb-4">Preset Components</h3>
        <div className="space-y-4">
          <LoadingProgress label="Loading Progress" />
          <SuccessProgress value={85} label="Success Progress" showValue />
          <ErrorProgress value={25} label="Error Progress" showValue />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-primary mb-4">Circular Spinners</h3>
        <div className="flex gap-6 justify-center">
          <CircularSpinner color="primary" size="sm" />
          <CircularSpinner color="success" size="md" />
          <CircularSpinner color="warning" size="lg" />
        </div>
      </div>
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
    };
    
    const simulateLoading = () => {
      setIsLoading(true);
      let currentValue = 0;
      const interval = setInterval(() => {
        currentValue += 2;
        setValue(currentValue);
        if (currentValue >= 100) {
          clearInterval(interval);
          setIsLoading(false);
        }
      }, 50);
    };
    
    return (
      <div className="space-y-6 w-80">
        <div>
          <h3 className="text-sm font-semibold text-hive-text-primary mb-4">Interactive Progress</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-hive-text-primary mb-2">
                Progress Value: {value}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleProgressChange}
                className="w-full"
                disabled={isLoading}
              />
            </div>
            
            <Progress 
              value={value} 
              color="primary" 
              variant="gradient"
              label="Interactive Progress" 
              showValue 
            />
            
            <div className="flex justify-center">
              <CircularProgress 
                value={value} 
                color="emerald" 
                size="lg" 
                showValue 
              />
            </div>
            
            <button
              onClick={simulateLoading}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Simulate Loading'}
            </button>
          </div>
        </div>
      </div>
    );
  },
};

// Campus tool examples
export const CampusToolExamples: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Completion Tracker</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-hive-text-primary">Current Semester</h4>
            <Progress value={75} color="emerald" variant="gradient" label="CS 101" showValue />
            <Progress value={60} color="primary" variant="gradient" label="MATH 205" showValue />
            <Progress value={85} color="success" variant="gradient" label="ENG 102" showValue />
            <Progress value={40} color="warning" variant="gradient" label="PHYS 301" showValue />
          </div>
          <div className="text-center">
            <CircularProgress value={65} color="primary" size="xl" showValue label="Overall" />
            <p className="text-sm text-hive-text-mutedLight mt-4">
              65% semester completion
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Space Analytics</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-hive-text-primary">Weekly Study Goals</span>
            <span className="text-sm text-hive-text-secondary">28/40 hours</span>
          </div>
          <Progress value={70} color="emerald" variant="striped" animated />
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-hive-text-primary">Group Participation</span>
            <span className="text-sm text-hive-text-secondary">9/12 sessions</span>
          </div>
          <Progress value={75} color="sapphire" variant="gradient" />
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-hive-text-primary">Assignment Completion</span>
            <span className="text-sm text-hive-text-secondary">15/18 completed</span>
          </div>
          <Progress value={83} color="success" variant="gradient" />
        </div>
      </div>
    </div>
  ),
};