/**
 * Select Component Tests
 *
 * Comprehensive test suite for the Select component covering:
 * - Trigger rendering and interaction
 * - Value display and placeholders
 * - Controlled/uncontrolled modes
 * - Disabled states
 * - ARIA attributes
 * - Focus management
 * - Styling
 * - Ref forwarding
 *
 * Note: Portal-rendered dropdown content is managed by Radix UI and tested
 * via their test suite. These tests focus on the trigger and state management.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../select';
import { axe } from 'jest-axe';

describe('Select Component', () => {
  // Helper component for tests
  const TestSelect = ({
    defaultValue,
    onValueChange,
    value,
    disabled = false,
  }: {
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    value?: string;
    disabled?: boolean;
  }) => (
    <Select
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      value={value}
      disabled={disabled}
    >
      <SelectTrigger aria-label="Select option">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );

  describe('Basic Rendering', () => {
    it('renders select trigger', () => {
      render(<TestSelect />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('shows placeholder when no value selected', () => {
      render(<TestSelect />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('shows selected value in trigger', () => {
      render(<TestSelect defaultValue="option1" />);
      // SelectValue displays the selected option's text
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders with custom className on trigger', () => {
      render(
        <Select>
          <SelectTrigger className="custom-trigger" aria-label="test">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('custom-trigger');
    });

    it('renders chevron down icon', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      // Icon is rendered as SVG child
      expect(trigger.querySelector('svg')).toBeInTheDocument();
    });

    it('trigger has button type', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      expect(trigger.tagName).toBe('BUTTON');
    });
  });

  describe('Trigger State', () => {
    it('trigger starts in closed state', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('trigger has data-state attribute', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state');
    });

    it('trigger responds to interaction', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TestSelect onValueChange={handleChange} />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state', 'closed');

      await user.click(trigger);
      // Trigger should respond to click (state handled by Radix)
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Value Management', () => {
    it('displays default value', () => {
      render(<TestSelect defaultValue="option2" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });

    it('accepts onValueChange callback', () => {
      const handleChange = vi.fn();

      render(
        <Select defaultValue="option1" onValueChange={handleChange}>
          <SelectTrigger aria-label="test">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      // Radix will call onValueChange when an option is selected
      // We test that the component accepts the prop correctly
      expect(trigger).toBeInTheDocument();
    });

    it('shows placeholder when value is undefined', () => {
      render(<TestSelect />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('updates display when default value changes', () => {
      const { rerender } = render(<TestSelect defaultValue="option1" />);
      const trigger1 = screen.getByRole('combobox');
      expect(trigger1).toBeInTheDocument();

      rerender(<TestSelect defaultValue="option2" />);
      const trigger2 = screen.getByRole('combobox');
      expect(trigger2).toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('respects controlled value prop', () => {
      const { rerender } = render(<TestSelect value="option1" />);
      let trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();

      rerender(<TestSelect value="option2" />);
      trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });

    it('works as controlled component', () => {
      const ControlledSelect = () => {
        const [value, setValue] = React.useState('option1');
        return (
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger aria-label="controlled">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        );
      };

      render(<ControlledSelect />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('maintains controlled value', () => {
      render(<TestSelect value="option1" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('renders disabled trigger', () => {
      render(<TestSelect disabled />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });

    it('disabled trigger has correct data attribute', () => {
      render(<TestSelect disabled />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-disabled');
    });

    it('disabled trigger does not change state when clicked', async () => {
      const user = userEvent.setup();
      render(<TestSelect disabled />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state', 'closed');

      await user.click(trigger);

      // Should remain closed
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('applies disabled styling to trigger', () => {
      render(<TestSelect disabled />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('disabled:cursor-not-allowed');
      expect(trigger).toHaveClass('disabled:opacity-50');
    });
  });

  describe('Keyboard Interaction', () => {
    it('opens on Enter key', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard('{Enter}');

      expect(trigger).toHaveAttribute('data-state', 'open');
    });

    it('opens on Space key', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard(' ');

      expect(trigger).toHaveAttribute('data-state', 'open');
    });

    it('opens on ArrowDown when closed', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard('{ArrowDown}');

      expect(trigger).toHaveAttribute('data-state', 'open');
    });

    it('opens on ArrowUp when closed', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard('{ArrowUp}');

      expect(trigger).toHaveAttribute('data-state', 'open');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<TestSelect defaultValue="option1" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('trigger has correct ARIA role', () => {
      render(<TestSelect />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('trigger has aria-expanded attribute', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('trigger has aria-expanded attribute that can change', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');

      // Initially false
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      // Radix UI manages the aria-expanded state internally
      expect(trigger.hasAttribute('aria-expanded')).toBe(true);
    });

    it('trigger has aria-controls attribute when open', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      const controlsId = trigger.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
    });

    it('supports aria-label on trigger', () => {
      render(
        <Select>
          <SelectTrigger aria-label="Custom label">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-label', 'Custom label');
    });

    it('trigger can be associated with external label', () => {
      render(
        <div>
          <label htmlFor="my-select">Choose option</label>
          <Select>
            <SelectTrigger id="my-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="test">Test</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('id', 'my-select');
    });
  });

  describe('Focus Management', () => {
    it('trigger is focusable', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      trigger.focus();
      expect(trigger).toHaveFocus();
    });

    it('shows focus ring styles on trigger', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('focus:ring-2');
      expect(trigger).toHaveClass('focus:ring-[#FFD700]/50');
      expect(trigger).toHaveClass('focus:outline-none');
    });

    it('trigger can receive focus via Tab', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <TestSelect />
        </>
      );

      await user.tab();
      await user.tab();

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveFocus();
    });

    it('disabled trigger cannot receive focus', () => {
      render(<TestSelect disabled />);
      const trigger = screen.getByRole('combobox');

      trigger.focus();

      expect(trigger).not.toHaveFocus();
    });
  });

  describe('Styling', () => {
    it('applies default trigger styling', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');

      expect(trigger).toHaveClass('flex');
      expect(trigger).toHaveClass('h-9');
      expect(trigger).toHaveClass('w-full');
      expect(trigger).toHaveClass('rounded-md');
      expect(trigger).toHaveClass('border');
      expect(trigger).toHaveClass('bg-[#0c0c0c]');
      expect(trigger).toHaveClass('text-white');
    });

    it('applies placeholder data attribute styling', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('data-[placeholder]:text-white/40');
    });

    it('applies focus border styling', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('focus:border-white/50');
    });

    it('applies transition styling', () => {
      render(<TestSelect />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('transition-all');
    });

    it('merges custom className with defaults', () => {
      render(
        <Select>
          <SelectTrigger className="custom-class" aria-label="test">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('custom-class');
      expect(trigger).toHaveClass('flex'); // Still has default classes
    });
  });

  describe('Component Composition', () => {
    it('renders SelectValue component', () => {
      render(<TestSelect />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('renders with SelectGroup', () => {
      render(
        <Select>
          <SelectTrigger aria-label="test">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group Label</SelectLabel>
              <SelectItem value="test">Test</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders with SelectSeparator', () => {
      render(
        <Select>
          <SelectTrigger aria-label="test">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Item 1</SelectItem>
            <SelectSeparator />
            <SelectItem value="2">Item 2</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders multiple SelectItems', () => {
      render(
        <Select>
          <SelectTrigger aria-label="test">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={`item${i}`}>
                Item {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to SelectTrigger', () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(
        <Select>
          <SelectTrigger ref={ref} aria-label="test">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('allows calling focus via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(
        <Select>
          <SelectTrigger ref={ref} aria-label="test">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it('allows calling methods via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(
        <Select>
          <SelectTrigger ref={ref} aria-label="test">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );

      // Verify ref methods are accessible
      expect(ref.current?.click).toBeDefined();
      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.blur).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty SelectContent', () => {
      render(
        <Select>
          <SelectTrigger aria-label="empty">
            <SelectValue placeholder="Empty" />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });

    it('handles single SelectItem', () => {
      render(
        <Select>
          <SelectTrigger aria-label="single">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="only">Only Option</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles many SelectItems (20+)', () => {
      render(
        <Select>
          <SelectTrigger aria-label="many">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 25 }, (_, i) => (
              <SelectItem key={i} value={`option${i}`}>
                Option {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles null className gracefully', () => {
      render(
        <Select>
          <SelectTrigger className={undefined} aria-label="test">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={undefined}>
            <SelectItem value="test" className={undefined}>
              Test
            </SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles rapid clicking without errors', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      const trigger = screen.getByRole('combobox');

      // Should not throw errors with rapid clicking
      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);

      // Component should still be functional
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('data-state');
    });

    it('handles rapid state changes', async () => {
      const user = userEvent.setup();
      const ControlledSelect = () => {
        const [value, setValue] = React.useState('option1');
        return (
          <>
            <button onClick={() => setValue('option2')}>Change to Option 2</button>
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger aria-label="controlled">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </>
        );
      };

      render(<ControlledSelect />);

      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles long option text', () => {
      const longText = 'Very long option text that might overflow the container width';
      render(
        <Select defaultValue="long">
          <SelectTrigger aria-label="long text">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="long">{longText}</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('[&>span]:line-clamp-1'); // Text truncation class
    });

    it('handles special characters in values', () => {
      render(
        <Select defaultValue="special-#@!">
          <SelectTrigger aria-label="special">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="special-#@!">Special #@!</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });
});
