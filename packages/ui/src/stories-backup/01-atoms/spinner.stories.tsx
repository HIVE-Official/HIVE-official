import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../../atomic/atoms/spinner';
import { useState } from 'react';

const meta: Meta<typeof Spinner> = {
  title: '01-Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE spinner component for loading states and processing indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spinner size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'gold', 'white'],
      description: 'Spinner color',
    },
    variant: {
      control: 'select',
      options: ['spin', 'pulse', 'bounce'],
      description: 'Animation variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    size: 'lg',
    color: 'gold',
  },
};

export const Pulse: Story = {
  args: {
    variant: 'pulse',
    size: 'lg',
  },
};

export const Bounce: Story = {
  args: {
    variant: 'bounce',
    size: 'md',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6">
      <div className="text-center">
        <Spinner size="xs" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">XS</p>
      </div>
      <div className="text-center">
        <Spinner size="sm" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">SM</p>
      </div>
      <div className="text-center">
        <Spinner size="md" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">MD</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">LG</p>
      </div>
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">XL</p>
      </div>
    </div>
  ),
};

// All colors
export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6">
      <div className="text-center">
        <Spinner color="primary" size="lg" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Primary</p>
      </div>
      <div className="text-center">
        <Spinner color="secondary" size="lg" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Secondary</p>
      </div>
      <div className="text-center">
        <Spinner color="gold" size="lg" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">Gold</p>
      </div>
      <div className="text-center bg-hive-text-primary rounded-lg p-4">
        <Spinner color="white" size="lg" />
        <p className="mt-2 text-xs text-white">White</p>
      </div>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-6">
      <div className="text-center">
        <Spinner variant="spin" size="lg" />
        <p className="mt-4 text-sm text-hive-text-secondary">Spin</p>
        <p className="text-xs text-hive-text-mutedLight">Classic rotating spinner</p>
      </div>
      <div className="text-center">
        <Spinner variant="pulse" size="lg" />
        <p className="mt-4 text-sm text-hive-text-secondary">Pulse</p>
        <p className="text-xs text-hive-text-mutedLight">Breathing animation</p>
      </div>
      <div className="text-center">
        <Spinner variant="bounce" size="lg" />
        <p className="mt-4 text-sm text-hive-text-secondary">Bounce</p>
        <p className="text-xs text-hive-text-mutedLight">Three bouncing dots</p>
      </div>
    </div>
  ),
};

// Campus loading scenarios
export const CampusLoadingScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Authentication Flow</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
            <Spinner size="md" color="gold" />
            <p className="mt-3 text-sm font-medium text-hive-text-primary">Logging in...</p>
            <p className="text-xs text-hive-text-mutedLight">Verifying your credentials</p>
          </div>
          <div className="text-center p-6 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
            <Spinner variant="pulse" size="md" color="gold" />
            <p className="mt-3 text-sm font-medium text-hive-text-primary">Setting up profile...</p>
            <p className="text-xs text-hive-text-mutedLight">Preparing your campus experience</p>
          </div>
          <div className="text-center p-6 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
            <Spinner variant="bounce" size="md" color="gold" />
            <p className="mt-3 text-sm font-medium text-hive-text-primary">Loading spaces...</p>
            <p className="text-xs text-hive-text-mutedLight">Finding your communities</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="flex items-center space-x-3">
              <Spinner size="sm" color="primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-hive-text-primary">Building your tool...</p>
                <p className="text-xs text-hive-text-mutedLight">Compiling components and assets</p>
              </div>
            </div>
          </div>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="flex items-center space-x-3">
              <Spinner variant="pulse" size="sm" color="secondary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-hive-text-primary">Publishing to community...</p>
                <p className="text-xs text-hive-text-mutedLight">Making your tool discoverable</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Data Synchronization</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
            <div className="flex items-center space-x-3">
              <Spinner size="xs" color="gold" />
              <span className="text-sm text-hive-text-primary">Syncing calendar events</span>
            </div>
            <span className="text-xs text-hive-text-mutedLight">2 of 5 complete</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
            <div className="flex items-center space-x-3">
              <Spinner variant="bounce" size="xs" color="primary" />
              <span className="text-sm text-hive-text-primary">Updating grade information</span>
            </div>
            <span className="text-xs text-hive-text-mutedLight">In progress</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
            <div className="flex items-center space-x-3">
              <Spinner variant="pulse" size="xs" color="secondary" />
              <span className="text-sm text-hive-text-primary">Loading course materials</span>
            </div>
            <span className="text-xs text-hive-text-mutedLight">Starting...</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibent text-hive-text-primary mb-6">Campus Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
            <Spinner size="lg" color="gold" />
            <p className="mt-3 text-sm font-medium text-hive-text-primary">Dining</p>
            <p className="text-xs text-hive-text-mutedLight">Loading menus</p>
          </div>
          <div className="text-center p-4 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
            <Spinner variant="pulse" size="lg" color="primary" />
            <p className="mt-3 text-sm font-medium text-hive-text-primary">Library</p>
            <p className="text-xs text-hive-text-mutedLight">Checking availability</p>
          </div>
          <div className="text-center p-4 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
            <Spinner variant="bounce" size="lg" color="secondary" />
            <p className="mt-3 text-sm font-medium text-hive-text-primary">Transit</p>
            <p className="text-xs text-hive-text-mutedLight">Getting bus times</p>
          </div>
          <div className="text-center p-4 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
            <Spinner size="lg" color="gold" />
            <p className="mt-3 text-sm font-medium text-hive-text-primary">Events</p>
            <p className="text-xs text-hive-text-mutedLight">Finding activities</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Button integration examples
export const ButtonIntegration: Story = {
  render: () => {
    const [loading, setLoading] = useState({
      primary: false,
      secondary: false,
      upload: false,
      save: false,
    });

    const handleClick = (key: keyof typeof loading) => {
      setLoading(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setLoading(prev => ({ ...prev, [key]: false }));
      }, 2000);
    };

    return (
      <div className="space-y-6 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Loading Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleClick('primary')}
              disabled={loading.primary}
              className="flex items-center space-x-2 px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 disabled:opacity-70 transition-colors"
            >
              {loading.primary && <Spinner size="sm" color="white" />}
              <span>{loading.primary ? 'Joining...' : 'Join Study Group'}</span>
            </button>

            <button
              onClick={() => handleClick('secondary')}
              disabled={loading.secondary}
              className="flex items-center space-x-2 px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover disabled:opacity-70 transition-colors"
            >
              {loading.secondary && <Spinner size="sm" color="primary" />}
              <span>{loading.secondary ? 'Loading...' : 'Browse Tools'}</span>
            </button>

            <button
              onClick={() => handleClick('upload')}
              disabled={loading.upload}
              className="flex items-center space-x-2 px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 disabled:opacity-70 transition-colors"
            >
              {loading.upload && <Spinner variant="pulse" size="sm" color="white" />}
              <span>{loading.upload ? 'Uploading...' : 'Upload File'}</span>
            </button>

            <button
              onClick={() => handleClick('save')}
              disabled={loading.save}
              className="flex items-center space-x-2 px-4 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 disabled:opacity-70 transition-colors"
            >
              {loading.save && <Spinner variant="bounce" size="sm" color="white" />}
              <span>{loading.save ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Inline Loading States</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 border border-hive-border-subtle rounded-lg">
              <Spinner size="xs" color="gold" />
              <span className="text-sm text-hive-text-primary">Calculating GPA...</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-hive-border-subtle rounded-lg">
              <Spinner variant="pulse" size="xs" color="primary" />
              <span className="text-sm text-hive-text-primary">Finding study partners...</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-hive-border-subtle rounded-lg">
              <Spinner variant="bounce" size="xs" color="secondary" />
              <span className="text-sm text-hive-text-primary">Syncing with campus calendar...</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Page loading states
export const PageLoadingStates: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Full Page Loading</h3>
        <div className="border border-hive-border-subtle rounded-lg bg-hive-background-secondary min-h-96 flex flex-col items-center justify-center">
          <Spinner size="xl" color="gold" />
          <p className="mt-6 text-lg font-medium text-hive-text-primary">Loading HIVE</p>
          <p className="text-sm text-hive-text-mutedLight">Setting up your campus experience...</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Section Loading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg bg-hive-background-secondary h-48 flex flex-col items-center justify-center">
            <Spinner variant="pulse" size="lg" color="primary" />
            <p className="mt-4 text-sm font-medium text-hive-text-primary">Your Spaces</p>
            <p className="text-xs text-hive-text-mutedLight">Loading communities...</p>
          </div>
          <div className="border border-hive-border-subtle rounded-lg bg-hive-background-secondary h-48 flex flex-col items-center justify-center">
            <Spinner variant="bounce" size="lg" color="gold" />
            <p className="mt-4 text-sm font-medium text-hive-text-primary">Recent Tools</p>
            <p className="text-xs text-hive-text-mutedLight">Fetching latest builds...</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Overlay Loading</h3>
        <div className="relative border border-hive-border-subtle rounded-lg bg-hive-background-secondary h-64">
          <div className="p-6">
            <h4 className="text-lg font-medium text-hive-text-primary mb-2">Course Schedule</h4>
            <p className="text-sm text-hive-text-secondary">Your weekly class schedule</p>
          </div>
          <div className="absolute inset-0 bg-hive-background-primary/80 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <Spinner size="lg" color="gold" />
              <p className="mt-3 text-sm font-medium text-hive-text-primary">Refreshing schedule...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive loading simulation
export const InteractiveLoadingSimulation: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const steps = [
      { title: 'Connecting to campus network', variant: 'spin' as const, color: 'gold' as const },
      { title: 'Verifying student credentials', variant: 'pulse' as const, color: 'primary' as const },
      { title: 'Loading your spaces', variant: 'bounce' as const, color: 'secondary' as const },
      { title: 'Setting up your dashboard', variant: 'spin' as const, color: 'gold' as const },
    ];

    const startLoading = () => {
      setIsLoading(true);
      setCurrentStep(0);
      
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setIsLoading(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1500);
    };

    return (
      <div className="p-6 bg-hive-background-primary max-w-2xl">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Campus Login Simulation</h3>
            <p className="text-sm text-hive-text-secondary">Experience different loading states in sequence</p>
          </div>

          {!isLoading ? (
            <button
              onClick={startLoading}
              className="px-6 py-3 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors font-medium"
            >
              Start Login Process
            </button>
          ) : (
            <div className="space-y-6">
              <div className="border border-hive-border-subtle rounded-lg p-8 bg-hive-background-secondary">
                <Spinner 
                  variant={steps[currentStep].variant}
                  size="xl" 
                  color={steps[currentStep].color}
                />
                <p className="mt-4 text-lg font-medium text-hive-text-primary">
                  {steps[currentStep].title}
                </p>
                <p className="text-sm text-hive-text-mutedLight mt-1">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>

              <div className="w-full bg-hive-background-tertiary rounded-full h-2">
                <div 
                  className="bg-hive-gold h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    size: 'md',
    color: 'gold',
    variant: 'spin',
  },
};