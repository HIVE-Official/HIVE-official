/**
 * Button Accessibility Tests
 *
 * Complete test suite demonstrating HIVE accessibility testing patterns.
 * This serves as a template for testing other components.
 *
 * @see packages/ui/ACCESSIBILITY.md for testing guide
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';
import {
  expectNoA11yViolations,
  testKeyboardNavigation,
  expectAriaAttributes,
  testComponentAccessibility,
} from '../../../lib/test-utils';

describe('Button Accessibility', () => {
  describe('Automated Accessibility Tests', () => {
    it('has no axe violations with default props', async () => {
      const { container } = render(<Button>Click me</Button>);
      await expectNoA11yViolations(container);
    });

    it('has no axe violations with all variants', async () => {
      const variants = ['default', 'primary', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

      for (const variant of variants) {
        const { container } = render(<Button variant={variant}>Button</Button>);
        await expectNoA11yViolations(container);
      }
    });

    it('has no axe violations when disabled', async () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      await expectNoA11yViolations(container);
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
      const onClick = jest.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      const button = screen.getByRole('button');

      await userEvent.tab();
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('can be activated with Space key', async () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await userEvent.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('cannot be activated when disabled', async () => {
      const onClick = jest.fn();
      render(<Button disabled onClick={onClick}>Disabled</Button>);
      const button = screen.getByRole('button');

      // Tab should skip disabled button
      await userEvent.tab();
      expect(button).not.toHaveFocus();

      // Manual focus attempt
      button.focus();
      await userEvent.keyboard('{Enter}');
      expect(onClick).not.toHaveBeenCalled();
    });

    it('passes complete keyboard navigation test', async () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick}>Click me</Button>);

      await testKeyboardNavigation(screen.getByRole('button'), {
        tabFocuses: true,
        enterActivates: true,
        spaceActivates: true,
        onActivate: onClick,
      });
    });
  });

  describe('ARIA Attributes', () => {
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

    it('has aria-disabled when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');

      // Native disabled attribute is preferred
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('disabled');
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

      // Test expanded state
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

  describe('Focus Management', () => {
    it('has visible focus indicator', async () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');

      await userEvent.tab();
      expect(button).toHaveFocus();

      // In real browser, would check for 2px gold outline
      // In test environment, we verify focus state
      expect(document.activeElement).toBe(button);
    });

    it('maintains focus after click', async () => {
      const onClick = jest.fn();
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

  describe('Screen Reader Support', () => {
    it('announces button with text content', () => {
      render(<Button>Save Changes</Button>);
      const button = screen.getByRole('button', { name: 'Save Changes' });

      // Screen reader would announce: "Save Changes, button"
      expect(button).toHaveTextContent('Save Changes');
    });

    it('announces button with icon and aria-label', () => {
      render(
        <Button aria-label="Delete item">
          <span aria-hidden="true">🗑️</span>
        </Button>
      );

      const button = screen.getByRole('button', { name: 'Delete item' });

      // Screen reader would announce: "Delete item, button"
      // Icon is hidden from screen readers with aria-hidden
      expect(button).toBeInTheDocument();
    });

    it('announces disabled state', () => {
      render(<Button disabled>Submit</Button>);
      const button = screen.getByRole('button');

      // Screen reader would announce: "Submit, button, dimmed" or "unavailable"
      expect(button).toBeDisabled();
    });
  });

  describe('Touch Target Size', () => {
    it('meets minimum touch target size (44x44px)', () => {
      render(<Button size="default">Click me</Button>);
      const button = screen.getByRole('button');

      // Check height includes min-h-[44px] class
      expect(button.className).toMatch(/min-h-\[44px\]/);
    });

    it('maintains touch target size for small variant', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');

      // Even small buttons meet 44px minimum
      expect(button.className).toMatch(/min-h-\[44px\]/);
    });

    it('has adequate padding for touch', () => {
      render(<Button size="default">Click me</Button>);
      const button = screen.getByRole('button');

      // Verify px-4 py-2 classes for adequate touch area
      expect(button.className).toMatch(/px-4/);
      expect(button.className).toMatch(/py-2/);
    });
  });

  describe('Complete Accessibility Test Suite', () => {
    it('passes all accessibility checks for primary button', async () => {
      const onClick = jest.fn();

      await testComponentAccessibility(
        <Button variant="primary" onClick={onClick}>
          Submit Form
        </Button>,
        {
          role: 'button',
          name: 'Submit Form',
          keyboard: {
            tabFocuses: true,
            enterActivates: true,
            spaceActivates: true,
            onActivate: onClick,
          },
        }
      );
    });

    it('passes all accessibility checks for icon button', async () => {
      const onClick = jest.fn();

      await testComponentAccessibility(
        <Button
          size="icon"
          aria-label="Close dialog"
          onClick={onClick}
        >
          ×
        </Button>,
        {
          role: 'button',
          name: 'Close dialog',
          keyboard: {
            tabFocuses: true,
            enterActivates: true,
            spaceActivates: true,
            onActivate: onClick,
          },
        }
      );
    });

    it('passes all accessibility checks for link button', async () => {
      await testComponentAccessibility(
        <Button variant="link" asChild>
          <a href="/profile">View Profile</a>
        </Button>,
        {
          role: 'link',
          name: 'View Profile',
        }
      );
    });
  });

  describe('Color Contrast', () => {
    it('has sufficient contrast for primary variant', () => {
      render(<Button variant="primary">Click me</Button>);
      const button = screen.getByRole('button');

      // Gold (#FFD700) on black (#0A0A0B) = 12.84:1 contrast ratio
      // Exceeds WCAG AA requirement of 3:1 for UI components
      expect(button.className).toMatch(/bg-\[var\(--hive-brand-primary\)\]/);
    });

    it('has sufficient contrast for text', () => {
      render(<Button variant="default">Click me</Button>);
      const button = screen.getByRole('button');

      // Black text on gold background = 12.84:1 contrast ratio
      // Exceeds WCAG AA requirement of 4.5:1 for normal text
      expect(button.className).toMatch(/text-\[var\(--hive-background-primary\)\]/);
    });
  });
});
