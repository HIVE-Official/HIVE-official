/**
 * Alert Component Tests
 *
 * Comprehensive test suite for the Alert system components covering:
 * - Alert container component (default, success, destructive variants)
 * - AlertTitle component (heading semantics)
 * - AlertDescription component (content layout)
 * - Accessibility compliance (WCAG 2.1 AA) - proper role="alert"
 * - Variant styles and class application
 * - Icon positioning and SVG handling
 * - forwardRef functionality and ref passing
 * - Custom className merging
 * - Real-world usage scenarios (HIVE patterns)
 * - Form validation contexts
 * - Notification patterns
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Alert, AlertTitle, AlertDescription } from '../alert';

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

// Test utilities
const renderAlert = (props: React.ComponentProps<typeof Alert> = {}) => {
  const defaultProps = {
    children: 'Test Alert Content',
    ...props,
  };
  return render(<Alert {...defaultProps} />);
};

const renderFullAlert = (
  alertProps: React.ComponentProps<typeof Alert> = {},
  titleText = 'Test Title',
  descriptionText = 'Test description content'
) => {
  return render(
    <Alert {...alertProps}>
      <AlertTitle>{titleText}</AlertTitle>
      <AlertDescription>{descriptionText}</AlertDescription>
    </Alert>
  );
};

describe('Alert Component System', () => {
  // ==========================================
  // ALERT CONTAINER TESTS
  // ==========================================

  describe('Alert Container', () => {
    it('renders correctly with default props', () => {
      renderAlert();
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent('Test Alert Content');
    });

    it('applies correct role="alert" for accessibility', () => {
      renderAlert();
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('role', 'alert');
    });

    it('renders as a div element', () => {
      renderAlert();
      const alert = screen.getByRole('alert');
      expect(alert.tagName).toBe('DIV');
    });

    it('applies base styling classes', () => {
      renderAlert();
      const alert = screen.getByRole('alert');

      // Base layout classes
      expect(alert).toHaveClass('relative', 'w-full', 'rounded-lg', 'border');
      expect(alert).toHaveClass('px-4', 'py-3', 'text-sm');

      // Icon positioning classes
      expect(alert).toHaveClass('[&>svg+div]:translate-y-[-3px]');
      expect(alert).toHaveClass('[&>svg]:absolute', '[&>svg]:left-4', '[&>svg]:top-4');
      expect(alert).toHaveClass('[&>svg~*]:pl-7');
    });

    it('supports custom children content', () => {
      render(
        <Alert>
          <span data-testid="custom-content">Custom alert content</span>
        </Alert>
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom alert content')).toBeInTheDocument();
    });
  });

  // ==========================================
  // ALERT VARIANTS TESTS
  // ==========================================

  describe('Alert Variants', () => {
    it('applies default variant styles correctly', () => {
      renderAlert({ variant: 'default' });
      const alert = screen.getByRole('alert');

      expect(alert).toHaveClass('bg-[#0c0c0c]', 'border-white/20', 'text-white');
      expect(alert).toHaveClass('[&>svg]:text-white');
    });

    it('applies destructive variant styles correctly', () => {
      renderAlert({ variant: 'destructive' });
      const alert = screen.getByRole('alert');

      expect(alert).toHaveClass('border-red-500/50', 'bg-red-500/10', 'text-red-500');
      expect(alert).toHaveClass('[&>svg]:text-red-500');
    });

    it('applies success variant styles correctly', () => {
      renderAlert({ variant: 'success' });
      const alert = screen.getByRole('alert');

      expect(alert).toHaveClass('border-[#FFD700]/50', 'bg-[#FFD700]/10', 'text-[#FFD700]');
      expect(alert).toHaveClass('[&>svg]:text-[#FFD700]');
    });

    it('defaults to default variant when no variant specified', () => {
      renderAlert();
      const alert = screen.getByRole('alert');

      expect(alert).toHaveClass('bg-[#0c0c0c]', 'border-white/20', 'text-white');
    });

    it('handles undefined variant gracefully', () => {
      renderAlert({ variant: undefined });
      const alert = screen.getByRole('alert');

      expect(alert).toHaveClass('bg-[#0c0c0c]', 'border-white/20', 'text-white');
    });
  });

  // ==========================================
  // ALERT TITLE TESTS
  // ==========================================

  describe('AlertTitle Component', () => {
    it('renders as h5 element for proper semantics', () => {
      render(<AlertTitle>Test Title</AlertTitle>);
      const title = screen.getByRole('heading', { level: 5 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Test Title');
    });

    it('applies correct styling classes', () => {
      render(<AlertTitle>Test Title</AlertTitle>);
      const title = screen.getByRole('heading', { level: 5 });

      expect(title).toHaveClass('mb-1', 'font-medium', 'leading-none');
      expect(title).toHaveClass('tracking-tight', 'text-white');
    });

    it('accepts custom className', () => {
      render(<AlertTitle className="custom-title-class">Test Title</AlertTitle>);
      const title = screen.getByRole('heading', { level: 5 });

      expect(title).toHaveClass('custom-title-class');
      expect(title).toHaveClass('mb-1', 'font-medium'); // Still has base classes
    });

    it('forwards HTML attributes', () => {
      render(
        <AlertTitle id="alert-title" data-testid="custom-title">
          Test Title
        </AlertTitle>
      );

      const title = screen.getByTestId('custom-title');
      expect(title).toHaveAttribute('id', 'alert-title');
    });

    it('supports ref forwarding', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<AlertTitle ref={ref}>Test Title</AlertTitle>);

      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      expect(ref.current?.textContent).toBe('Test Title');
    });
  });

  // ==========================================
  // ALERT DESCRIPTION TESTS
  // ==========================================

  describe('AlertDescription Component', () => {
    it('renders as div element', () => {
      render(<AlertDescription data-testid="desc">Test description</AlertDescription>);
      const description = screen.getByTestId('desc');
      expect(description.tagName).toBe('DIV');
      expect(description).toHaveTextContent('Test description');
    });

    it('applies correct styling classes', () => {
      render(<AlertDescription data-testid="desc">Test description</AlertDescription>);
      const description = screen.getByTestId('desc');

      expect(description).toHaveClass('text-sm', 'text-white/80');
      expect(description).toHaveClass('[&_p]:leading-relaxed');
    });

    it('accepts custom className', () => {
      render(
        <AlertDescription className="custom-desc-class" data-testid="desc">
          Test description
        </AlertDescription>
      );
      const description = screen.getByTestId('desc');

      expect(description).toHaveClass('custom-desc-class');
      expect(description).toHaveClass('text-sm', 'text-white/80'); // Still has base classes
    });

    it('supports complex nested content', () => {
      render(
        <AlertDescription data-testid="complex-desc">
          <p>First paragraph</p>
          <strong>Bold text</strong>
          <span>Regular text</span>
        </AlertDescription>
      );

      const description = screen.getByTestId('complex-desc');
      expect(description).toBeInTheDocument();
      expect(screen.getByText('First paragraph')).toBeInTheDocument();
      expect(screen.getByText('Bold text')).toBeInTheDocument();
      expect(screen.getByText('Regular text')).toBeInTheDocument();
    });

    it('forwards HTML attributes', () => {
      render(
        <AlertDescription id="alert-desc" data-testid="custom-desc">
          Test description
        </AlertDescription>
      );

      const description = screen.getByTestId('custom-desc');
      expect(description).toHaveAttribute('id', 'alert-desc');
    });

    it('supports ref forwarding', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<AlertDescription ref={ref}>Test description</AlertDescription>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.textContent).toBe('Test description');
    });
  });

  // ==========================================
  // COMBINED COMPONENT TESTS
  // ==========================================

  describe('Combined Alert Components', () => {
    it('renders full alert with title and description', () => {
      renderFullAlert();

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('Test Title');
      expect(screen.getByText('Test description content')).toBeInTheDocument();
    });

    it('maintains proper heading hierarchy', () => {
      renderFullAlert({}, 'Alert Title', 'Alert Description');

      const alert = screen.getByRole('alert');
      const title = screen.getByRole('heading', { level: 5 });

      expect(alert).toContainElement(title);
      expect(title).toHaveTextContent('Alert Title');
    });

    it('supports different variant combinations', () => {
      const variants = ['default', 'destructive', 'success'] as const;

      variants.forEach((variant, index) => {
        render(
          <Alert variant={variant} data-testid={`alert-${index}`}>
            <AlertTitle>Title {index}</AlertTitle>
            <AlertDescription>Description {index}</AlertDescription>
          </Alert>
        );

        expect(screen.getByTestId(`alert-${index}`)).toBeInTheDocument();
        expect(screen.getByText(`Title ${index}`)).toBeInTheDocument();
        expect(screen.getByText(`Description ${index}`)).toBeInTheDocument();
      });
    });
  });

  // ==========================================
  // ICON INTEGRATION TESTS
  // ==========================================

  describe('Icon Integration', () => {
    it('handles SVG icons correctly with positioning', () => {
      render(
        <Alert data-testid="icon-alert">
          <svg data-testid="alert-icon" className="h-4 w-4" viewBox="0 0 24 24">
            <path d="M12 9v2m0 4h.01" />
          </svg>
          <AlertTitle>Icon Alert</AlertTitle>
          <AlertDescription>Alert with icon</AlertDescription>
        </Alert>
      );

      const alert = screen.getByTestId('icon-alert');
      const icon = screen.getByTestId('alert-icon');

      expect(alert).toContainElement(icon);
      expect(icon).toBeInTheDocument();
    });

    it('applies icon positioning classes correctly', () => {
      renderAlert();
      const alert = screen.getByRole('alert');

      // Icon positioning classes should be present
      expect(alert).toHaveClass('[&>svg]:absolute');
      expect(alert).toHaveClass('[&>svg]:left-4');
      expect(alert).toHaveClass('[&>svg]:top-4');
      expect(alert).toHaveClass('[&>svg~*]:pl-7');
    });

    it('handles emoji icons in real-world scenarios', () => {
      render(
        <Alert data-testid="emoji-alert">
          <span className="absolute left-4 top-4 text-xl">🔥</span>
          <AlertTitle className="pl-7">Streak Alert</AlertTitle>
          <AlertDescription className="pl-7">Don't lose your streak!</AlertDescription>
        </Alert>
      );

      expect(screen.getByTestId('emoji-alert')).toBeInTheDocument();
      expect(screen.getByText('🔥')).toBeInTheDocument();
      expect(screen.getByText('Streak Alert')).toBeInTheDocument();
    });
  });

  // ==========================================
  // ACCESSIBILITY TESTS
  // ==========================================

  describe('Accessibility', () => {
    it('has no accessibility violations with default variant', async () => {
      const { container } = renderFullAlert();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const variants = ['default', 'destructive', 'success'] as const;

      for (const variant of variants) {
        const { container } = renderFullAlert({ variant });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });

    it('provides proper alert role for screen readers', () => {
      renderAlert();
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('role', 'alert');
    });

    it('maintains semantic heading structure', () => {
      renderFullAlert();

      const heading = screen.getByRole('heading', { level: 5 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Title');
    });

    it('supports additional aria attributes', () => {
      render(
        <Alert aria-describedby="external-desc" aria-live="polite">
          <AlertTitle>Accessible Alert</AlertTitle>
          <AlertDescription>This alert is highly accessible</AlertDescription>
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-describedby', 'external-desc');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('ensures proper focus management for interactive content', () => {
      render(
        <Alert>
          <AlertTitle>Action Required</AlertTitle>
          <AlertDescription>
            Please <button type="button">click here</button> to continue.
          </AlertDescription>
        </Alert>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('click here');
    });
  });

  // ==========================================
  // STYLING AND CUSTOMIZATION TESTS
  // ==========================================

  describe('Styling and Customization', () => {
    it('accepts and merges custom className on Alert', () => {
      renderAlert({ className: 'custom-alert-class border-blue-500' });
      const alert = screen.getByRole('alert');

      expect(alert).toHaveClass('custom-alert-class');
      expect(alert).toHaveClass('border-blue-500');
      expect(alert).toHaveClass('relative', 'w-full'); // Base classes preserved
    });

    it('handles complex custom styling', () => {
      render(
        <Alert className="transition-all duration-300 hover:scale-105">
          <AlertTitle className="text-blue-500">Custom Styled Alert</AlertTitle>
          <AlertDescription className="italic">Custom description styling</AlertDescription>
        </Alert>
      );

      const alert = screen.getByRole('alert');
      const title = screen.getByRole('heading', { level: 5 });
      const description = screen.getByText('Custom description styling');

      expect(alert).toHaveClass('transition-all', 'duration-300', 'hover:scale-105');
      expect(title).toHaveClass('text-blue-500');
      expect(description).toHaveClass('italic');
    });
  });

  // ==========================================
  // REF FORWARDING TESTS
  // ==========================================

  describe('Ref Forwarding', () => {
    it('forwards refs correctly for Alert component', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Alert ref={ref}>Test Alert</Alert>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'alert');
    });

    it('forwards refs correctly for AlertTitle component', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<AlertTitle ref={ref}>Test Title</AlertTitle>);

      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      expect(ref.current?.tagName).toBe('H5');
    });

    it('forwards refs correctly for AlertDescription component', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<AlertDescription ref={ref}>Test Description</AlertDescription>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref access to DOM methods', () => {
      const alertRef = React.createRef<HTMLDivElement>();
      const titleRef = React.createRef<HTMLHeadingElement>();

      render(
        <Alert ref={alertRef}>
          <AlertTitle ref={titleRef}>Ref Test</AlertTitle>
        </Alert>
      );

      expect(alertRef.current?.querySelector('h5')).toBe(titleRef.current);
      expect(titleRef.current?.textContent).toBe('Ref Test');
    });
  });

  // ==========================================
  // REAL-WORLD HIVE PATTERNS TESTS
  // ==========================================

  describe('HIVE Real-world Patterns', () => {
    it('renders email verification alert correctly', () => {
      render(
        <Alert className="border-yellow-500/50 bg-yellow-500/10" data-testid="email-verification">
          <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 24 24">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
          </svg>
          <AlertTitle className="text-yellow-500">Check your email</AlertTitle>
          <AlertDescription>
            We sent a verification link to <strong>sarah@buffalo.edu</strong>
          </AlertDescription>
        </Alert>
      );

      const alert = screen.getByTestId('email-verification');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText('Check your email')).toBeInTheDocument();
      expect(screen.getByText('sarah@buffalo.edu')).toBeInTheDocument();
    });

    it('renders profile completion nudge correctly', () => {
      render(
        <Alert variant="success" data-testid="profile-completion">
          <AlertTitle>Complete your profile</AlertTitle>
          <AlertDescription>
            Your profile is <strong>75% complete</strong>. Add social links to unlock all features.
          </AlertDescription>
        </Alert>
      );

      const alert = screen.getByTestId('profile-completion');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText('Complete your profile')).toBeInTheDocument();
      expect(screen.getByText('75% complete')).toBeInTheDocument();
    });

    it('renders space invitation alert correctly', () => {
      render(
        <Alert variant="success" data-testid="space-invitation">
          <AlertTitle>You've been invited to CS Study Group</AlertTitle>
          <AlertDescription>
            <strong>Alex Morgan</strong> invited you to join. This space has 87 active members.
          </AlertDescription>
        </Alert>
      );

      const alert = screen.getByTestId('space-invitation');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText("You've been invited to CS Study Group")).toBeInTheDocument();
      expect(screen.getByText('Alex Morgan')).toBeInTheDocument();
    });

    it('renders streak warning alert with emoji', () => {
      render(
        <Alert className="border-yellow-500/50 bg-yellow-500/10" data-testid="streak-warning">
          <span className="absolute left-4 top-4 text-xl">🔥</span>
          <AlertTitle className="text-yellow-500 pl-7">Don't lose your streak!</AlertTitle>
          <AlertDescription className="pl-7 text-yellow-500/80">
            Your <strong>12-day gym check-in streak</strong> expires in 6 hours.
          </AlertDescription>
        </Alert>
      );

      const alert = screen.getByTestId('streak-warning');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText('🔥')).toBeInTheDocument();
      expect(screen.getByText("Don't lose your streak!")).toBeInTheDocument();
      expect(screen.getByText('12-day gym check-in streak')).toBeInTheDocument();
    });

    it('renders form validation error correctly', () => {
      render(
        <Alert variant="destructive" data-testid="form-validation">
          <svg className="h-3 w-3" viewBox="0 0 24 24">
            <path d="M12 9v2m0 4h.01" />
          </svg>
          <AlertDescription className="text-xs text-red-500/80">
            Space name must be at least 5 characters long
          </AlertDescription>
        </Alert>
      );

      const alert = screen.getByTestId('form-validation');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText('Space name must be at least 5 characters long')).toBeInTheDocument();
    });
  });

  // ==========================================
  // EDGE CASES AND ERROR HANDLING
  // ==========================================

  describe('Edge Cases', () => {
    it('handles empty content gracefully', () => {
      render(<Alert data-testid="empty-alert" />);
      const alert = screen.getByTestId('empty-alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toBeEmptyDOMElement();
    });

    it('handles null children in title and description', () => {
      render(
        <Alert data-testid="null-children">
          <AlertTitle>{null}</AlertTitle>
          <AlertDescription>{null}</AlertDescription>
        </Alert>
      );

      expect(screen.getByTestId('null-children')).toBeInTheDocument();
    });

    it('handles very long content without breaking layout', () => {
      const longTitle = 'This is an extremely long alert title that might cause layout issues if not handled properly';
      const longDescription = 'This is an extremely long alert description that contains a lot of text and might wrap to multiple lines or cause overflow issues if the component is not designed to handle such scenarios gracefully and appropriately.';

      renderFullAlert({}, longTitle, longDescription);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('handles special characters and markup', () => {
      render(
        <Alert data-testid="special-chars">
          <AlertTitle>Alert with <em>emphasis</em> & "quotes"</AlertTitle>
          <AlertDescription>
            Description with <code>code</code>, &amp; entities, and "smart quotes"
          </AlertDescription>
        </Alert>
      );

      expect(screen.getByTestId('special-chars')).toBeInTheDocument();
      expect(screen.getByText('emphasis')).toBeInTheDocument();
      expect(screen.getByText('code')).toBeInTheDocument();
    });

    it('maintains accessibility with complex nested content', async () => {
      const { container } = render(
        <Alert>
          <AlertTitle>
            Complex Alert with <span className="text-gold">highlighted</span> text
          </AlertTitle>
          <AlertDescription>
            <p>First paragraph with <a href="#">link</a></p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </AlertDescription>
        </Alert>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ==========================================
  // PERFORMANCE TESTS
  // ==========================================

  describe('Performance', () => {
    it('renders multiple alerts efficiently', () => {
      const startTime = performance.now();

      // Render 20 alerts
      const alerts = Array.from({ length: 20 }, (_, i) => (
        <Alert key={i} variant={i % 2 === 0 ? 'default' : 'success'}>
          <AlertTitle>Alert {i}</AlertTitle>
          <AlertDescription>Description {i}</AlertDescription>
        </Alert>
      ));

      render(<div>{alerts}</div>);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 20 alerts in less than 50ms
      expect(renderTime).toBeLessThan(50);

      // Verify all alerts rendered
      expect(screen.getAllByRole('alert')).toHaveLength(20);
    });
  });
});