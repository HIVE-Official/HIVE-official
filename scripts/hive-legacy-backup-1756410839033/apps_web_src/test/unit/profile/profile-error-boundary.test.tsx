import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProfileErrorBoundary, type ErrorFallbackProps } from '../../../components/profile/profile-error-boundary';

// Mock HiveUI components
vi.mock('@hive/ui', () => ({
  Button: ({ children, onClick, className }: any) => (
    <button 
      onClick={onClick} 
      className={className}
      data-testid="button"
    >
      {children}
    </button>
  ),
  Card: ({ children, className }: any) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  ),
  CardContent: ({ children, className }: any) => (
    <div className={className} data-testid="card-content">
      {children}
    </div>
  ),
}));

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  AlertTriangle: ({ className }: any) => (
    <div className={className} data-testid="alert-triangle" />
  ),
  RefreshCw: ({ className }: any) => (
    <div className={className} data-testid="refresh-icon" />
  ),
}));

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div data-testid="working-component">Component is working</div>;
};

// Component that throws error with stack trace
const ThrowErrorWithStack = () => {
  const error = new Error('Detailed error message');
  error.stack = 'Error: Detailed error message\n    at ThrowErrorWithStack\n    at test.tsx:123:45';
  throw error;
};

describe('ProfileErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('Normal Operation', () => {
    it('renders children when no error occurs', () => {
      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByTestId('working-component')).toBeInTheDocument();
      expect(screen.getByText('Component is working')).toBeInTheDocument();
    });

    it('does not show error UI when component works correctly', () => {
      render(
        <ProfileErrorBoundary>
          <div data-testid="normal-component">Normal content</div>
        </ProfileErrorBoundary>
      );

      expect(screen.getByTestId('normal-component')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(screen.queryByTestId('alert-triangle')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('catches errors and shows default fallback UI', () => {
      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText("We encountered an error while loading your profile. This has been logged and we'll look into it.")).toBeInTheDocument();
      expect(screen.getByTestId('alert-triangle')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('logs error to console when error occurs', () => {
      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Profile Error Boundary caught an error:',
        expect.any(Error),
        expect.any(Object)
      );
    });

    it('calls getDerivedStateFromError correctly', () => {
      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      // Error boundary should be in error state
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.queryByTestId('working-component')).not.toBeInTheDocument();
    });
  });

  describe('Default Error Fallback', () => {
    it('displays correct error UI structure', () => {
      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      expect(screen.getByTestId('alert-triangle')).toBeInTheDocument();
      expect(screen.getByTestId('refresh-icon')).toBeInTheDocument();
    });

    it('applies correct CSS classes to error UI', () => {
      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('w-full', 'max-w-md', 'bg-hive-surface-elevated', 'border-hive-border-subtle');

      const cardContent = screen.getByTestId('card-content');
      expect(cardContent).toHaveClass('p-6', 'text-center');

      const alertIcon = screen.getByTestId('alert-triangle');
      expect(alertIcon).toHaveClass('h-12', 'w-12', 'text-red-400', 'mx-auto', 'mb-4');

      const button = screen.getByTestId('button');
      expect(button).toHaveClass('w-full', 'bg-hive-gold', 'text-hive-obsidian', 'hover:bg-hive-champagne');
    });

    it('displays correct error messages', () => {
      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Something went wrong');
      expect(screen.getByText("We encountered an error while loading your profile. This has been logged and we'll look into it.")).toBeInTheDocument();
    });

    it('includes refresh icon in try again button', () => {
      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      const button = screen.getByTestId('button');
      const refreshIcon = screen.getByTestId('refresh-icon');
      
      expect(button).toContainElement(refreshIcon);
      expect(refreshIcon).toHaveClass('h-4', 'w-4', 'mr-2');
    });
  });

  describe('Development Mode Features', () => {
    it('shows error details in development mode', () => {
      process.env.NODE_ENV = 'development';

      render(
        <ProfileErrorBoundary>
          <ThrowErrorWithStack />
        </ProfileErrorBoundary>
      );

      expect(screen.getByText('Error Details (Development)')).toBeInTheDocument();
      
      const details = screen.getByRole('group'); // details element has group role
      expect(details).toBeInTheDocument();
    });

    it('displays error message and stack trace in development', () => {
      process.env.NODE_ENV = 'development';

      render(
        <ProfileErrorBoundary>
          <ThrowErrorWithStack />
        </ProfileErrorBoundary>
      );

      const errorPre = screen.getByText((content) => 
        content.includes('Detailed error message') && content.includes('ThrowErrorWithStack')
      );
      expect(errorPre).toBeInTheDocument();
      expect(errorPre).toHaveClass('mt-2', 'text-xs', 'bg-hive-background-primary', 'p-2', 'rounded', 'overflow-auto', 'text-red-400');
    });

    it('hides error details in production mode', () => {
      process.env.NODE_ENV = 'production';

      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      expect(screen.queryByText('Error Details (Development)')).not.toBeInTheDocument();
      expect(screen.queryByRole('group')).not.toBeInTheDocument();
    });

    it('handles missing stack trace gracefully', () => {
      process.env.NODE_ENV = 'development';
      
      const error = new Error('Error without stack');
      error.stack = undefined;

      const ThrowErrorNoStack = () => {
        throw error;
      };

      render(
        <ProfileErrorBoundary>
          <ThrowErrorNoStack />
        </ProfileErrorBoundary>
      );

      expect(screen.getByText('Error Details (Development)')).toBeInTheDocument();
      expect(screen.getByText('Error without stack')).toBeInTheDocument();
    });
  });

  describe('Error Recovery', () => {
    it('handles try again button click', () => {
      const { rerender } = render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      // Should show error UI
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Click try again
      const tryAgainButton = screen.getByText('Try Again');
      fireEvent.click(tryAgainButton);

      // Re-render with working component
      rerender(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ProfileErrorBoundary>
      );

      // Should show working component
      expect(screen.getByTestId('working-component')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });

    it('resets error boundary state when resetErrorBoundary is called', () => {
      let errorBoundaryRef: ProfileErrorBoundary | null = null;

      render(
        <ProfileErrorBoundary ref={(ref) => { errorBoundaryRef = ref; }}>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Manually reset (simulates internal reset)
      if (errorBoundaryRef) {
        errorBoundaryRef.resetErrorBoundary();
      }

      // Component should attempt to render children again
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });
  });

  describe('Custom Fallback Component', () => {
    it('uses custom fallback when provided', () => {
      const CustomFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => (
        <div data-testid="custom-fallback">
          <h1>Custom Error: {error.message}</h1>
          <button onClick={resetErrorBoundary} data-testid="custom-reset">
            Reset
          </button>
        </div>
      );

      render(
        <ProfileErrorBoundary fallback={CustomFallback}>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('Custom Error: Test error message')).toBeInTheDocument();
      expect(screen.getByTestId('custom-reset')).toBeInTheDocument();

      // Should not show default fallback
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(screen.queryByTestId('alert-triangle')).not.toBeInTheDocument();
    });

    it('passes correct props to custom fallback', () => {
      const CustomFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => (
        <div data-testid="custom-fallback">
          <span data-testid="error-message">{error.message}</span>
          <button 
            onClick={resetErrorBoundary} 
            data-testid="custom-reset-button"
          >
            Custom Reset
          </button>
        </div>
      );

      render(
        <ProfileErrorBoundary fallback={CustomFallback}>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByTestId('error-message')).toHaveTextContent('Test error message');

      const resetButton = screen.getByTestId('custom-reset-button');
      expect(resetButton).toBeInTheDocument();
      
      // Click should trigger reset function
      fireEvent.click(resetButton);
    });
  });

  describe('Multiple Children', () => {
    it('handles multiple children correctly', () => {
      render(
        <ProfileErrorBoundary>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <ThrowError shouldThrow={false} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('working-component')).toBeInTheDocument();
    });

    it('catches error from any child component', () => {
      render(
        <ProfileErrorBoundary>
          <div data-testid="child-1">Child 1</div>
          <ThrowError shouldThrow={true} />
          <div data-testid="child-2">Child 2</div>
        </ProfileErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.queryByTestId('child-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('child-2')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides proper heading structure', () => {
      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Something went wrong');
    });

    it('provides proper button role', () => {
      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Try Again');
    });

    it('provides expandable details in development', () => {
      process.env.NODE_ENV = 'development';

      render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      const details = screen.getByRole('group');
      expect(details).toBeInTheDocument();
      
      const summary = screen.getByText('Error Details (Development)');
      expect(summary).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles errors with empty messages', () => {
      const ThrowEmptyError = () => {
        throw new Error('');
      };

      render(
        <ProfileErrorBoundary>
          <ThrowEmptyError />
        </ProfileErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('handles non-Error objects thrown', () => {
      const ThrowString = () => {
        throw 'String error';
      };

      render(
        <ProfileErrorBoundary>
          <ThrowString />
        </ProfileErrorBoundary>
      );

      // Should still catch and show error UI
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('handles null error gracefully', () => {
      const ThrowNull = () => {
        throw null;
      };

      render(
        <ProfileErrorBoundary>
          <ThrowNull />
        </ProfileErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('resets state properly on multiple errors', () => {
      const { rerender } = render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      // First error
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Reset
      fireEvent.click(screen.getByText('Try Again'));

      // New error
      rerender(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('maintains error boundary behavior across re-renders', () => {
      const { rerender } = render(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByTestId('working-component')).toBeInTheDocument();

      rerender(
        <ProfileErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ProfileErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});