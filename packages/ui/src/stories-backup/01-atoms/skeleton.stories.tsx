import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from '../../atomic/atoms/skeleton';
import { useState, useEffect } from 'react';

const meta: Meta<typeof Skeleton> = {
  title: '01-Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE skeleton component for loading states, providing visual placeholders while content loads.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Skeleton shape variant',
    },
    width: {
      control: 'text',
      description: 'Width (px, %, rem, etc.)',
    },
    height: {
      control: 'text',
      description: 'Height (px, %, rem, etc.)',
    },
    lines: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Number of lines for text variant',
    },
    animate: {
      control: 'boolean',
      description: 'Enable pulse animation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    width: '100%',
    lines: 3,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 200,
    height: 100,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Text Skeleton</h3>
        <div className="space-y-2">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="85%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Circular Skeleton</h3>
        <div className="flex gap-3">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={48} height={48} />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Rectangular Skeleton</h3>
        <div className="space-y-3">
          <Skeleton variant="rectangular" width="100%" height={20} />
          <Skeleton variant="rectangular" width={200} height={100} />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Rounded Skeleton</h3>
        <div className="space-y-3">
          <Skeleton variant="rounded" width="100%" height={60} />
          <Skeleton variant="rounded" width={150} height={150} />
        </div>
      </div>
    </div>
  ),
};

// Campus loading scenarios
export const CampusLoadingScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profile Loading</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-start space-x-4">
            <Skeleton variant="circular" width={64} height={64} />
            <div className="flex-1 space-y-3">
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="text" width="25%" height={16} />
              <Skeleton variant="text" width="60%" height={16} />
              <div className="flex gap-2 mt-4">
                <Skeleton variant="rounded" width={80} height={24} />
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={90} height={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Feed Loading</h3>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
              <div className="flex items-start space-x-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Skeleton variant="text" width="30%" height={16} />
                    <Skeleton variant="rounded" width={50} height={16} />
                  </div>
                  <Skeleton variant="text" width="90%" height={14} />
                  <Skeleton variant="text" width="70%" height={14} />
                  <div className="flex space-x-2 mt-3">
                    <Skeleton variant="rounded" width={60} height={20} />
                    <Skeleton variant="rounded" width={60} height={20} />
                    <Skeleton variant="rounded" width={80} height={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Discovery Loading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
              <Skeleton variant="rounded" width="100%" height={120} className="mb-4" />
              <div className="space-y-2">
                <Skeleton variant="text" width="80%" height={18} />
                <Skeleton variant="text" width="60%" height={14} />
                <Skeleton variant="text" width="90%" height={14} />
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width={60} height={12} />
                </div>
                <Skeleton variant="rounded" width={60} height={24} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Schedule Loading</h3>
        <div className="border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
          <div className="p-4 border-b border-hive-border-subtle">
            <Skeleton variant="text" width="40%" height={20} />
          </div>
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 py-2">
                <Skeleton variant="rounded" width={60} height={40} />
                <div className="flex-1 space-y-1">
                  <Skeleton variant="text" width="70%" height={16} />
                  <Skeleton variant="text" width="50%" height={14} />
                </div>
                <Skeleton variant="text" width="15%" height={14} />
                <Skeleton variant="rounded" width={80} height={14} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Text Skeletons</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-hive-text-secondary mb-2">Single line:</p>
            <SkeletonText lines={1} />
          </div>
          <div>
            <p className="text-sm text-hive-text-secondary mb-2">Paragraph (3 lines):</p>
            <SkeletonText lines={3} />
          </div>
          <div>
            <p className="text-sm text-hive-text-secondary mb-2">Long content (5 lines):</p>
            <SkeletonText lines={5} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Avatar Skeletons</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <SkeletonAvatar size="sm" />
            <p className="text-xs text-hive-text-mutedLight mt-1">Small</p>
          </div>
          <div className="text-center">
            <SkeletonAvatar size="md" />
            <p className="text-xs text-hive-text-mutedLight mt-1">Medium</p>
          </div>
          <div className="text-center">
            <SkeletonAvatar size="lg" />
            <p className="text-xs text-hive-text-mutedLight mt-1">Large</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Card Skeletons</h3>
        <div className="space-y-4">
          <div className="border border-hive-border-subtle rounded-lg">
            <SkeletonCard />
          </div>
          <div className="border border-hive-border-subtle rounded-lg">
            <SkeletonCard />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Animation states
export const AnimationStates: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary max-w-md">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Animation States</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-hive-text-secondary mb-2">With animation (default):</p>
            <Skeleton variant="text" width="100%" animate={true} />
          </div>
          <div>
            <p className="text-sm text-hive-text-secondary mb-2">Without animation:</p>
            <Skeleton variant="text" width="100%" animate={false} />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive loading simulation
export const InteractiveLoadingSimulation: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingStep, setLoadingStep] = useState(0);

    useEffect(() => {
      if (isLoading) {
        const timer = setInterval(() => {
          setLoadingStep(prev => {
            if (prev >= 3) {
              setIsLoading(false);
              return 0;
            }
            return prev + 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      }
    }, [isLoading]);

    const restartLoading = () => {
      setIsLoading(true);
      setLoadingStep(0);
    };

    if (!isLoading) {
      return (
        <div className="p-6 bg-hive-background-primary max-w-2xl">
          <div className="text-center space-y-4">
            <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center">
                  <span className="text-hive-background-primary font-bold">AR</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-hive-text-primary">Alex Rodriguez</h3>
                  <p className="text-hive-text-secondary">Computer Science Junior</p>
                  <p className="text-hive-text-mutedLight text-sm mt-1">
                    Building tools to help students succeed. Currently working on a GPA calculator and 
                    study session coordinator.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 bg-hive-gold text-hive-background-primary text-xs rounded">Builder</span>
                    <span className="px-2 py-1 bg-hive-emerald text-white text-xs rounded">Online</span>
                    <span className="px-2 py-1 bg-hive-surface-elevated text-hive-text-secondary text-xs rounded">CS Major</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={restartLoading}
              className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors"
            >
              Simulate Loading Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 bg-hive-background-primary max-w-2xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-hive-text-primary">Loading Profile...</h3>
            <div className="text-sm text-hive-text-mutedLight">
              Step {loadingStep + 1} of 4
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="flex items-start space-x-4">
              {loadingStep >= 0 ? (
                <Skeleton variant="circular" width={64} height={64} />
              ) : (
                <div className="w-16 h-16 bg-hive-background-tertiary rounded-full" />
              )}
              
              <div className="flex-1 space-y-3">
                {loadingStep >= 1 ? (
                  <>
                    <Skeleton variant="text" width="40%" height={24} />
                    <Skeleton variant="text" width="25%" height={16} />
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="w-2/5 h-6 bg-hive-background-tertiary rounded" />
                    <div className="w-1/4 h-4 bg-hive-background-tertiary rounded" />
                  </div>
                )}
                
                {loadingStep >= 2 ? (
                  <Skeleton variant="text" width="80%" height={16} lines={2} />
                ) : (
                  <div className="space-y-2">
                    <div className="w-4/5 h-4 bg-hive-background-tertiary rounded" />
                    <div className="w-3/5 h-4 bg-hive-background-tertiary rounded" />
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  {loadingStep >= 3 ? (
                    <>
                      <Skeleton variant="rounded" width={60} height={24} />
                      <Skeleton variant="rounded" width={50} height={24} />
                      <Skeleton variant="rounded" width={70} height={24} />
                    </>
                  ) : (
                    <>
                      <div className="w-15 h-6 bg-hive-background-tertiary rounded" />
                      <div className="w-12 h-6 bg-hive-background-tertiary rounded" />
                      <div className="w-18 h-6 bg-hive-background-tertiary rounded" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-hive-background-tertiary rounded-full h-2">
            <div 
              className="bg-hive-gold h-2 rounded-full transition-all duration-300"
              style={{ width: `${((loadingStep + 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Campus data loading patterns
export const CampusDataLoadingPatterns: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Dashboard Loading</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <Skeleton variant="text" width="60%" height={16} className="mb-3" />
            <Skeleton variant="text" width="40%" height={32} className="mb-2" />
            <Skeleton variant="text" width="80%" height={12} />
          </div>
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <Skeleton variant="text" width="70%" height={16} className="mb-3" />
            <Skeleton variant="text" width="30%" height={32} className="mb-2" />
            <Skeleton variant="text" width="90%" height={12} />
          </div>
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <Skeleton variant="text" width="50%" height={16} className="mb-3" />
            <Skeleton variant="text" width="60%" height={32} className="mb-2" />
            <Skeleton variant="text" width="75%" height={12} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Message Thread Loading</h3>
        <div className="border border-hive-border-subtle rounded-lg bg-hive-background-secondary max-w-2xl">
          <div className="p-4 border-b border-hive-border-subtle">
            <div className="flex items-center space-x-3">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width="40%" height={16} />
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Skeleton variant="rounded" width={200} height={40} />
                <Skeleton variant="text" width="30%" height={12} className="mt-1" />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-xs">
                <Skeleton variant="rounded" width={150} height={30} />
                <Skeleton variant="text" width="25%" height={12} className="mt-1 ml-auto" />
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Skeleton variant="rounded" width={180} height={35} />
                <Skeleton variant="text" width="28%" height={12} className="mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 20,
    animate: true,
  },
};