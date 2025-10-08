/**
 * Button Component Tests
 *
 * Comprehensive test suite for the Button component covering:
 * - Rendering with all variants and sizes
 * - Event handling
 * - Accessibility requirements
 * - Keyboard navigation
 * - Prop forwarding
 * - asChild functionality
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, buttonVariants } from '../button';
import { expectNoA11yViolations, testKeyboardNavigation, expectAriaAttributes, renderWithStyles } from '../../../lib/test-utils';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders a button element by default', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with text content', () => {
      render(<Button>Save Changes</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Save Changes');
    });

    it('renders children correctly', () => {
      render(
        <Button>
          <span>Icon</span>
          Text
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('IconText');
    });

    it('forwards className to the button element', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('applies default variant and size classes', () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByRole('button');

      // Check for base classes
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
      // Check for default variant (white background)
      expect(button).toHaveClass('bg-white', 'text-black');
      // Check for default size
      expect(button).toHaveClass('h-9', 'px-4', 'py-2');
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'outline', 'ghost', 'destructive', 'gold', 'link'] as const;

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Button variant={variant}>Button</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        // Verify variant-specific classes
        switch (variant) {
          case 'default':
            expect(button).toHaveClass('bg-white', 'text-black');
            break;
          case 'outline':
            expect(button).toHaveClass('border-white/20', 'text-white');
            break;
          case 'ghost':
            expect(button).toHaveClass('text-white/80');
            break;
          case 'destructive':
            expect(button).toHaveClass('border-red-500', 'text-red-500');
            break;
          case 'gold':
            expect(button).toHaveClass('bg-[#FFD700]', 'text-black');
            break;
          case 'link':
            expect(button).toHaveClass('text-white', 'underline-offset-4');
            break;
        }
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const;

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<Button size={size}>Button</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        // Verify size-specific classes
        switch (size) {
          case 'default':
            expect(button).toHaveClass('h-9', 'px-4', 'py-2');
            break;
          case 'sm':
            expect(button).toHaveClass('h-8', 'px-3', 'text-xs');
            break;
          case 'lg':
            expect(button).toHaveClass('h-10', 'px-8');
            break;
          case 'icon':
            expect(button).toHaveClass('h-9', 'w-9');
            break;
        }
      });
    });
  });

  describe('Event Handling', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick with correct event object', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
      const event = handleClick.mock.calls[0][0];
      expect(event.type).toBe('click');
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles multiple event handlers', async () => {
      const handleClick = vi.fn();
      const handleMouseEnter = vi.fn();

      render(
        <Button onClick={handleClick} onMouseEnter={handleMouseEnter}>
          Button
        </Button>
      );

      const button = screen.getByRole('button');

      // Trigger mouse enter separately
      await userEvent.hover(button);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      // Clear mocks to avoid hover side effects from click
      vi.clearAllMocks();

      // Trigger click
      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Disabled State', () => {
    it('renders disabled button correctly', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('disabled');
    });

    it('applies disabled styles', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
    });

    it('is not focusable when disabled', async () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');

      await userEvent.tab();
      expect(button).not.toHaveFocus();
    });
  });

  describe('asChild Prop', () => {
    it('renders as child component when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveTextContent('Link Button');
    });

    it('applies button styles to child component', () => {
      render(
        <Button asChild variant="gold" size="lg">
          <a href="/test">Styled Link</a>
        </Button>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('bg-[#FFD700]', 'text-black', 'h-10', 'px-8');
    });

    it('merges classNames with child component', () => {
      render(
        <Button asChild className="custom-button">
          <a href="/test" className="custom-link">
            Link
          </a>
        </Button>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-button', 'custom-link');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toBe(screen.getByRole('button'));
    });

    it('forwards ref to child element when asChild is true', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Button asChild ref={ref}>
          <a href="/test">Link</a>
        </Button>
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current).toBe(screen.getByRole('link'));
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML button attributes', () => {
      render(
        <Button
          type="submit"
          form="test-form"
          name="submit-button"
          value="submit"
          data-testid="submit-btn"
        >
          Submit
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'test-form');
      expect(button).toHaveAttribute('name', 'submit-button');
      expect(button).toHaveAttribute('value', 'submit');
      expect(button).toHaveAttribute('data-testid', 'submit-btn');
    });

    it('supports custom data attributes', () => {
      render(
        <Button data-analytics="button-click" data-track-id="cta-1">
          Track Me
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-analytics', 'button-click');
      expect(button).toHaveAttribute('data-track-id', 'cta-1');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(<Button>Click me</Button>);
      await expectNoA11yViolations(container);
    });

    it('has no accessibility violations with all variants', async () => {
      const variants = ['default', 'outline', 'ghost', 'destructive', 'gold', 'link'] as const;

      for (const variant of variants) {
        const { container } = render(<Button variant={variant}>Button</Button>);
        await expectNoA11yViolations(container);
      }
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      await expectNoA11yViolations(container);
    });

    it('has correct role', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has accessible name from text content', () => {
      render(<Button>Submit Form</Button>);
      expect(screen.getByRole('button', { name: 'Submit Form' })).toBeInTheDocument();
    });

    it('uses aria-label when provided', () => {
      render(<Button aria-label="Close dialog">×</Button>);
      expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
    });

    it('supports aria-expanded for dropdown buttons', () => {
      const { rerender } = render(
        <Button aria-expanded={false} aria-controls="dropdown">
          Options
        </Button>
      );

      let button = screen.getByRole('button');
      expectAriaAttributes(button, {
        'aria-expanded': 'false',
        'aria-controls': 'dropdown',
      });

      rerender(
        <Button aria-expanded={true} aria-controls="dropdown">
          Options
        </Button>
      );

      button = screen.getByRole('button');
      expectAriaAttributes(button, {
        'aria-expanded': 'true',
        'aria-controls': 'dropdown',
      });
    });

    it('supports aria-haspopup for menu buttons', () => {
      render(<Button aria-haspopup="menu">Actions</Button>);
      const button = screen.getByRole('button');

      expectAriaAttributes(button, {
        'aria-haspopup': 'menu',
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('can be focused with Tab key', async () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');

      await userEvent.tab();
      expect(button).toHaveFocus();
    });

    it('can be activated with Enter key', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      const button = screen.getByRole('button');

      await userEvent.tab();
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('can be activated with Space key', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await userEvent.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('cannot be activated when disabled', async () => {
      const onClick = vi.fn();
      render(<Button disabled onClick={onClick}>Disabled</Button>);
      const button = screen.getByRole('button');

      // Tab should skip disabled button
      await userEvent.tab();
      expect(button).not.toHaveFocus();

      // Manual focus and keyboard activation should not work
      button.focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      expect(onClick).not.toHaveBeenCalled();
    });

    it('passes complete keyboard navigation test', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);

      await testKeyboardNavigation(screen.getByRole('button'), {
        tabFocuses: true,
        enterActivates: true,
        spaceActivates: true,
        onActivate: onClick,
      });
    });
  });

  describe('Focus Management', () => {
    it('has visible focus indicator', async () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');

      await userEvent.tab();
      expect(button).toHaveFocus();

      // Check for focus-visible classes
      expect(button).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2');
    });

    it('maintains focus after click', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(onClick).toHaveBeenCalled();
      expect(button).toHaveFocus();
    });

    it('can be programmatically focused', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Click me</Button>);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Style Classes', () => {
    it('includes base classes for all buttons', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');

      // Base styling classes
      expect(button).toHaveClass(
        'inline-flex',
        'items-center',
        'justify-center',
        'gap-2',
        'whitespace-nowrap',
        'rounded-md',
        'text-sm',
        'font-medium',
        'transition-all',
        'duration-300',
        'ease-in-out'
      );
    });

    it('includes focus indicator classes', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[#FFD700]/50',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-black'
      );
    });

    it('includes disabled state classes', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(
        'disabled:pointer-events-none',
        'disabled:opacity-50'
      );
    });

    it('includes SVG icon classes', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(
        '[&_svg]:pointer-events-none',
        '[&_svg]:size-4',
        '[&_svg]:shrink-0'
      );
    });
  });

  describe('buttonVariants Utility', () => {
    it('generates correct classes for default variant and size', () => {
      const classes = buttonVariants();
      expect(classes).toContain('bg-white');
      expect(classes).toContain('text-black');
      expect(classes).toContain('h-9');
      expect(classes).toContain('px-4');
    });

    it('generates correct classes for specific variant', () => {
      const classes = buttonVariants({ variant: 'gold' });
      expect(classes).toContain('bg-[#FFD700]');
      expect(classes).toContain('text-black');
    });

    it('generates correct classes for specific size', () => {
      const classes = buttonVariants({ size: 'lg' });
      expect(classes).toContain('h-10');
      expect(classes).toContain('px-8');
    });

    it('merges custom className', () => {
      const classes = buttonVariants({ className: 'custom-class' });
      expect(classes).toContain('custom-class');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<Button></Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toBeEmptyDOMElement();
    });

    it('handles only whitespace children', () => {
      render(<Button>   </Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles mixed content children', () => {
      render(
        <Button>
          Text
          <span>Span</span>
          More text
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('TextSpanMore text');
    });

    it('handles false children gracefully', () => {
      render(
        <Button>
          {false && 'Hidden'}
          Visible
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Visible');
    });
  });

  describe('Integration with Styling', () => {
    it('works with HIVE styling context', () => {
      const { getByRole } = renderWithStyles(<Button>Styled Button</Button>);
      const button = getByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-white', 'text-black');
    });

    it('maintains hover and active states', () => {
      render(<Button variant="default">Hover me</Button>);
      const button = screen.getByRole('button');

      // Check for hover classes
      expect(button).toHaveClass('hover:bg-white/90', 'hover:-translate-y-0.5', 'hover:scale-[1.02]');
    });

    it('applies gold variant hover effects', () => {
      render(<Button variant="gold">Gold Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('hover:bg-[#FFD700]/90', 'hover:-translate-y-0.5', 'hover:scale-[1.02]');
    });
  });
});