import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FirebaseErrorBoundary as ErrorBoundary } from '../../components/error-boundary';
import { Button } from '../../components/ui/button';

const meta: Meta<typeof ErrorBoundary> = {
  title: '14-Utilities/Error Boundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Elegant error handling for the HIVE ecosystem**

React error boundary with HIVE-branded fallback UI and recovery mechanisms. Maintains the premium feel even during error states.

## When to Use
- Wrapping entire page components
- Protecting critical Builder workflows
- Tool composition error handling
- Space activation error recovery

## Design Principles
- **Infrastructure Reliability**: Errors handled gracefully with clear recovery paths
- **Premium Error Experience**: Even errors maintain HIVE's obsidian glass aesthetic
- **Builder-Focused Recovery**: Error states designed for creator workflows
- **Campus Context**: Error messages relevant to university platform usage

## Error Types
- **Component Errors**: React component crashes and render errors
- **Tool Errors**: Issues with student-created Tools and Elements
- **Space Errors**: Problems loading or accessing Spaces
- **Builder Errors**: HiveLAB workflow interruptions

## Accessibility
- WCAG 2.1 AA compliant error messaging
- Screen reader friendly error descriptions
- Keyboard accessible recovery actions
- Clear focus management during error states
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    fallbackVariant: {
      control: 'select',
      options: ['default', 'minimal', 'detailed', 'builder'],
      description: 'Error UI variant optimized for different contexts'
    },
    showErrorDetails: {
      control: 'boolean',
      description: 'Show technical error details (development mode)'
    },
    enableRetry: {
      control: 'boolean',
      description: 'Show retry button for recoverable errors'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Component that throws an error for demonstration
const ErrorThrowingComponent = ({ shouldError }: { shouldError: boolean }) => {
  if (shouldError) {
    throw new Error('Simulated component error for Storybook demonstration');
  }
  return (
    <div className="p-6 rounded-lg bg-hive-background-card border border-hive-border">
      <h3 className="text-lg font-semibold text-hive-foreground mb-2">Working Component</h3>
      <p className="text-hive-foreground-muted">This component is working correctly and won't trigger the error boundary.</p>
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <ErrorBoundary {...args}>
      <ErrorThrowingComponent shouldError={true} />
    </ErrorBoundary>
  ),
  args: {
    fallbackVariant: 'default'
  }
};

export const BuilderContext: Story = {
  render: (args) => (
    <ErrorBoundary {...args}>
      <ErrorThrowingComponent shouldError={true} />
    </ErrorBoundary>
  ),
  args: {
    fallbackVariant: 'builder',
    context: 'HiveLAB Tool Builder',
    onRetry: () => {
      console.log('Retrying Builder operation...');
    }
  }
};

export const MinimalFallback: Story = {
  render: (args) => (
    <ErrorBoundary {...args}>
      <ErrorThrowingComponent shouldError={true} />
    </ErrorBoundary>
  ),
  args: {
    fallbackVariant: 'minimal',
    message: 'Unable to load Space content'
  }
};

export const DetailedError: Story = {
  render: (args) => (
    <ErrorBoundary {...args}>
      <ErrorThrowingComponent shouldError={true} />
    </ErrorBoundary>
  ),
  args: {
    fallbackVariant: 'detailed',
    showErrorDetails: true,
    enableRetry: true,
    onRetry: () => console.log('Retry clicked'),
    onReport: () => console.log('Report error clicked')
  }
};

export const WorkingComponent: Story = {
  render: (args) => (
    <ErrorBoundary {...args}>
      <ErrorThrowingComponent shouldError={false} />
    </ErrorBoundary>
  ),
  args: {
    fallbackVariant: 'default'
  }
};

export const ToolCompositionError: Story = {
  render: (args) => (
    <ErrorBoundary {...args}>
      <ErrorThrowingComponent shouldError={true} />
    </ErrorBoundary>
  ),
  args: {
    fallbackVariant: 'builder',
    context: 'Tool Composition',
    errorTitle: 'Element Assembly Failed',
    errorMessage: 'Unable to combine selected Elements. Please check Element compatibility and try again.',
    actions: [
      { label: 'Restart Builder', variant: 'accent', onClick: () => console.log('Restart Builder') },
      { label: 'Report Issue', variant: 'outline', onClick: () => console.log('Report Issue') },
      { label: 'Get Help', variant: 'ghost', onClick: () => console.log('Get Help') }
    ]
  }
};

export const SpaceLoadingError: Story = {
  render: (args) => (
    <ErrorBoundary {...args}>
      <ErrorThrowingComponent shouldError={true} />
    </ErrorBoundary>
  ),
  args: {
    fallbackVariant: 'default',
    errorTitle: 'Space Unavailable',
    errorMessage: 'This Space may be private or temporarily unavailable. Contact your Space Builder for access.',
    actions: [
      { label: 'Browse Other Spaces', variant: 'accent', onClick: () => console.log('Browse Spaces') },
      { label: 'Request Access', variant: 'outline', onClick: () => console.log('Request Access') }
    ]
  }
};

export const NetworkError: Story = {
  render: (args) => (
    <ErrorBoundary {...args}>
      <ErrorThrowingComponent shouldError={true} />
    </ErrorBoundary>
  ),
  args: {
    fallbackVariant: 'default',
    errorTitle: 'Connection Lost',
    errorMessage: 'Unable to connect to HIVE servers. Please check your internet connection and try again.',
    showRetryCountdown: true,
    autoRetry: true,
    retryDelay: 5000,
    onRetry: () => console.log('Auto-retry triggered')
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const [shouldError, setShouldError] = React.useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button 
            onClick={() => setShouldError(false)}
            variant={!shouldError ? 'default' : 'outline'}
          >
            Show Working Component
          </Button>
          <Button 
            onClick={() => setShouldError(true)}
            variant={shouldError ? 'destructive' : 'outline'}
          >
            Trigger Error
          </Button>
        </div>
        
        <ErrorBoundary
          fallbackVariant="default"
          enableRetry={true}
          onRetry={() => {
            setShouldError(false);
            console.log('Error boundary retry triggered');
          }}
        >
          <ErrorThrowingComponent shouldError={shouldError} />
        </ErrorBoundary>
      </div>
    );
  }
};