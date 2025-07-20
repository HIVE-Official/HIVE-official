import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HiveProgress } from '../../components/hive-progress';
import { HiveButton } from '../../components/hive-button';

const meta: Meta<typeof HiveProgress> = {
  title: '04-Hive/Progress System',
  component: HiveProgress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Progress System - Comprehensive progress indicators with multiple variants, animations, and states. Perfect for loading states, file uploads, and process tracking.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['bar', 'circular', 'step', 'spinner', 'skeleton'],
      description: 'Progress indicator type',
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress value (0-100)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Progress indicator size',
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Progress status/color',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show progress label',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage value',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressBar: Story = {
  args: {
    variant: 'bar',
    value: 65,
    size: 'md',
    status: 'default',
    showLabel: true,
    showPercentage: true,
    animated: true,
  },
};

export const CircularProgress: Story = {
  args: {
    variant: 'circular',
    value: 75,
    size: 'lg',
    status: 'default',
    showPercentage: true,
    animated: true,
  },
};

export const StepProgress: Story = {
  args: {
    variant: 'step',
    value: 60,
    steps: ['Profile', 'Preferences', 'Verification', 'Complete'],
    size: 'md',
    status: 'default',
    showLabel: true,
  },
};

export const LoadingSpinner: Story = {
  args: {
    variant: 'spinner',
    size: 'md',
    status: 'default',
    animated: true,
  },
};

export const SkeletonLoader: Story = {
  args: {
    variant: 'skeleton',
    size: 'md',
    animated: true,
  },
};

// Progress Status Variants
export const SuccessProgress: Story = {
  args: {
    variant: 'bar',
    value: 100,
    size: 'md',
    status: 'success',
    showLabel: true,
    showPercentage: true,
    label: 'Upload Complete',
  },
};

export const WarningProgress: Story = {
  args: {
    variant: 'circular',
    value: 85,
    size: 'lg',
    status: 'warning',
    showPercentage: true,
    label: 'Storage Almost Full',
  },
};

export const ErrorProgress: Story = {
  args: {
    variant: 'bar',
    value: 45,
    size: 'md',
    status: 'error',
    showLabel: true,
    showPercentage: true,
    label: 'Upload Failed',
  },
};

// Size Variants
export const ProgressSizes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <div className="text-sm text-gray-400">Small</div>
        <HiveProgress variant="bar" value={40} size="sm" showPercentage />
      </div>
      <div className="space-y-2">
        <div className="text-sm text-gray-400">Medium</div>
        <HiveProgress variant="bar" value={65} size="md" showPercentage />
      </div>
      <div className="space-y-2">
        <div className="text-sm text-gray-400">Large</div>
        <HiveProgress variant="bar" value={80} size="lg" showPercentage />
      </div>
      <div className="space-y-2">
        <div className="text-sm text-gray-400">Extra Large</div>
        <HiveProgress variant="bar" value={95} size="xl" showPercentage />
      </div>
    </div>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'default' | 'success' | 'warning' | 'error'>('default');
    
    const startProgress = () => {
      setIsLoading(true);
      setProgress(0);
      setStatus('default');
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            setStatus('success');
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    };
    
    const simulateError = () => {
      setStatus('error');
      setProgress(45);
      setIsLoading(false);
    };
    
    const simulateWarning = () => {
      setStatus('warning');
      setProgress(85);
      setIsLoading(false);
    };
    
    const reset = () => {
      setProgress(0);
      setStatus('default');
      setIsLoading(false);
    };
    
    return (
      <div className="space-y-6 w-full max-w-lg">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-white">File Upload Progress</h3>
          
          <div className="space-y-4">
            <HiveProgress 
              variant="bar" 
              value={progress} 
              size="lg" 
              status={status}
              showLabel 
              showPercentage
              label={
                status === 'success' ? 'Upload Complete!' :
                status === 'error' ? 'Upload Failed' :
                status === 'warning' ? 'Storage Warning' :
                isLoading ? 'Uploading...' : 'Ready to Upload'
              }
              animated
            />
            
            <div className="flex justify-center">
              <HiveProgress 
                variant="circular" 
                value={progress} 
                size="lg" 
                status={status}
                showPercentage
                animated
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <HiveButton 
              onClick={startProgress} 
              disabled={isLoading}
              variant="primary"
            >
              {isLoading ? 'Uploading...' : 'Start Upload'}
            </HiveButton>
            <HiveButton onClick={reset} variant="outline">
              Reset
            </HiveButton>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <HiveButton onClick={simulateError} variant="destructive" size="sm">
              Simulate Error
            </HiveButton>
            <HiveButton onClick={simulateWarning} size="sm">
              Simulate Warning
            </HiveButton>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive progress demo with different states and animations. Test various scenarios including success, error, and warning states.',
      },
    },
  },
};

// Multi-Step Process
export const MultiStepProcess: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ['Account Setup', 'Profile Info', 'Preferences', 'Verification', 'Complete'];
    
    const nextStep = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    };
    
    const prevStep = () => {
      if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
      }
    };
    
    const progress = ((currentStep + 1) / steps.length) * 100;
    
    return (
      <div className="space-y-6 w-full max-w-lg">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-white">Account Setup</h3>
          
          <HiveProgress 
            variant="step" 
            value={progress}
            steps={steps}
            currentStep={currentStep}
            size="md"
            showLabel
          />
          
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-medium text-white mb-2">Step {currentStep + 1}: {steps[currentStep]}</h4>
            <p className="text-gray-400 text-sm">
              {currentStep === 0 && "Let's start by setting up your account credentials."}
              {currentStep === 1 && "Tell us a bit about yourself and your interests."}
              {currentStep === 2 && "Configure your notification and privacy preferences."}
              {currentStep === 3 && "Verify your email address and phone number."}
              {currentStep === 4 && "All done! Welcome to HIVE community."}
            </p>
          </div>
          
          <div className="flex justify-between">
            <HiveButton 
              onClick={prevStep} 
              disabled={currentStep === 0}
              variant="outline"
            >
              Previous
            </HiveButton>
            <HiveButton 
              onClick={nextStep} 
              disabled={currentStep === steps.length - 1}
              variant="primary"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </HiveButton>
          </div>
        </div>
      </div>
    );
  },
};

// Loading States Showcase
export const LoadingStates: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = useState({
      page: false,
      content: false,
      action: false,
    });
    
    const toggleLoading = (key: keyof typeof loadingStates) => {
      setLoadingStates(prev => ({ ...prev, [key]: !prev[key] }));
    };
    
    return (
      <div className="space-y-8 w-full max-w-2xl">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-white">Loading State Examples</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <HiveButton 
              onClick={() => toggleLoading('page')}
              variant={loadingStates.page ? 'primary' : 'outline'}
            >
              Page Loading
            </HiveButton>
            <HiveButton 
              onClick={() => toggleLoading('content')}
              variant={loadingStates.content ? 'primary' : 'outline'}
            >
              Content Loading
            </HiveButton>
            <HiveButton 
              onClick={() => toggleLoading('action')}
              variant={loadingStates.action ? 'primary' : 'outline'}
            >
              Action Loading
            </HiveButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Page Loading */}
          <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-medium text-white">Page Loading</h4>
            {loadingStates.page ? (
              <div className="space-y-3">
                <HiveProgress variant="skeleton" size="lg" />
                <HiveProgress variant="skeleton" size="md" />
                <HiveProgress variant="skeleton" size="sm" />
              </div>
            ) : (
              <div className="space-y-2 text-sm text-gray-400">
                <div>✓ Header loaded</div>
                <div>✓ Navigation ready</div>
                <div>✓ Content available</div>
              </div>
            )}
          </div>
          
          {/* Content Loading */}
          <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-medium text-white">Content Loading</h4>
            {loadingStates.content ? (
              <div className="flex justify-center">
                <HiveProgress variant="spinner" size="lg" />
              </div>
            ) : (
              <div className="text-sm text-gray-400">
                <div>📝 Article content</div>
                <div>🖼️ Images loaded</div>
                <div>💬 Comments ready</div>
              </div>
            )}
          </div>
          
          {/* Action Loading */}
          <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-medium text-white">Action Progress</h4>
            {loadingStates.action ? (
              <HiveProgress 
                variant="circular" 
                value={65} 
                size="md" 
                showPercentage
                label="Processing..."
              />
            ) : (
              <div className="text-sm text-gray-400">
                <div>⚡ Action completed</div>
                <div>📊 Results ready</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};