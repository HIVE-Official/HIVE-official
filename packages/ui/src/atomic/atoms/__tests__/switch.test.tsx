/**
 * Switch Component Tests
 *
 * Test coverage for Switch component:
 * - On/off states
 * - Toggle interactions
 * - Disabled state
 * - Keyboard interactions
 * - ARIA attributes
 * - Thumb animation
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../switch';
import { axe } from 'jest-axe';

describe('Switch Component', () => {
  describe('Basic Rendering', () => {
    it('renders switch', () => {
      render(<Switch aria-label="test switch" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('is unchecked by default', () => {
      render(<Switch aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    });

    it('renders with checked state', () => {
      render(<Switch checked aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('data-state', 'checked');
    });

    it('renders with default checked', () => {
      render(<Switch defaultChecked aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('data-state', 'checked');
    });

    it('applies custom className', () => {
      render(<Switch className="custom-class" aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveClass('custom-class');
    });

    it('has button type', () => {
      render(<Switch aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl.tagName).toBe('BUTTON');
    });
  });

  describe('State Management', () => {
    it('toggles from unchecked to checked', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="test" />);
      const switchEl = screen.getByRole('switch');

      expect(switchEl).toHaveAttribute('data-state', 'unchecked');
      await user.click(switchEl);
      expect(switchEl).toHaveAttribute('data-state', 'checked');
    });

    it('toggles from checked to unchecked', async () => {
      const user = userEvent.setup();
      render(<Switch defaultChecked aria-label="test" />);
      const switchEl = screen.getByRole('switch');

      expect(switchEl).toHaveAttribute('data-state', 'checked');
      await user.click(switchEl);
      expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    });

    it('shows correct data-state attribute', () => {
      const { rerender } = render(<Switch aria-label="test" />);
      let switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('data-state', 'unchecked');

      rerender(<Switch checked aria-label="test" />);
      switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('data-state', 'checked');
    });
  });

  describe('Controlled Mode', () => {
    it('works as controlled component', () => {
      const ControlledSwitch = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <>
            <Switch checked={checked} onCheckedChange={setChecked} aria-label="controlled" />
            <button onClick={() => setChecked(!checked)}>Toggle</button>
          </>
        );
      };

      render(<ControlledSwitch />);
      expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked');
    });

    it('respects controlled checked prop', () => {
      const { rerender } = render(<Switch checked={false} aria-label="test" />);
      let switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('data-state', 'unchecked');

      rerender(<Switch checked={true} aria-label="test" />);
      switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('data-state', 'checked');
    });

    it('calls onCheckedChange when toggled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} aria-label="test" />);

      const switchEl = screen.getByRole('switch');
      await user.click(switchEl);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onCheckedChange with false when turning off', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch defaultChecked onCheckedChange={handleChange} aria-label="test" />);

      const switchEl = screen.getByRole('switch');
      await user.click(switchEl);

      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Disabled State', () => {
    it('renders disabled switch', () => {
      render(<Switch disabled aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toBeDisabled();
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch disabled onCheckedChange={handleChange} aria-label="test" />);

      const switchEl = screen.getByRole('switch');
      await user.click(switchEl);

      expect(handleChange).not.toHaveBeenCalled();
      expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    });

    it('applies disabled styling', () => {
      render(<Switch disabled aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveClass('disabled:cursor-not-allowed');
      expect(switchEl).toHaveClass('disabled:opacity-50');
    });

    it('has correct data-disabled attribute', () => {
      render(<Switch disabled aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('data-disabled');
    });
  });

  describe('Keyboard Interaction', () => {
    it('toggles with Space key', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="test" />);

      const switchEl = screen.getByRole('switch');
      switchEl.focus();
      await user.keyboard(' ');

      expect(switchEl).toHaveAttribute('data-state', 'checked');
    });

    it('does not toggle disabled switch with Space', async () => {
      const user = userEvent.setup();
      render(<Switch disabled aria-label="test" />);

      const switchEl = screen.getByRole('switch');
      switchEl.focus();
      await user.keyboard(' ');

      expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    });

    it('toggles multiple times with Space', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="test" />);

      const switchEl = screen.getByRole('switch');
      switchEl.focus();

      await user.keyboard(' ');
      expect(switchEl).toHaveAttribute('data-state', 'checked');

      await user.keyboard(' ');
      expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <label>
          <Switch /> Enable notifications
        </label>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has correct ARIA role', () => {
      render(<Switch aria-label="test" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Switch aria-label="Enable feature" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-label', 'Enable feature');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Switch aria-describedby="help-text" aria-label="test" />
          <p id="help-text">Help text</p>
        </>
      );
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-describedby', 'help-text');
    });

    it('can be associated with label', () => {
      render(
        <div>
          <label htmlFor="notifications">Enable notifications</label>
          <Switch id="notifications" />
        </div>
      );
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('id', 'notifications');
    });

    it('has correct aria-checked attribute', () => {
      const { rerender } = render(<Switch aria-label="test" />);
      let switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch checked aria-label="test" />);
      switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Focus Management', () => {
    it('is focusable', () => {
      render(<Switch aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      switchEl.focus();
      expect(switchEl).toHaveFocus();
    });

    it('shows focus ring styles', () => {
      render(<Switch aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveClass('focus-visible:outline-none');
      expect(switchEl).toHaveClass('focus-visible:ring-2');
      expect(switchEl).toHaveClass('focus-visible:ring-[#FFD700]/50');
    });

    it('can receive focus via Tab', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <Switch aria-label="test" />
        </>
      );

      await user.tab();
      await user.tab();

      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveFocus();
    });

    it('disabled switch cannot receive focus', () => {
      render(<Switch disabled aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      switchEl.focus();
      expect(switchEl).not.toHaveFocus();
    });
  });

  describe('Styling', () => {
    it('applies default styling', () => {
      render(<Switch aria-label="test" />);
      const switchEl = screen.getByRole('switch');

      expect(switchEl).toHaveClass('inline-flex');
      expect(switchEl).toHaveClass('h-5');
      expect(switchEl).toHaveClass('w-9');
      expect(switchEl).toHaveClass('rounded-full');
      expect(switchEl).toHaveClass('cursor-pointer');
    });

    it('applies unchecked state styling', () => {
      render(<Switch aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveClass('data-[state=unchecked]:bg-white/20');
    });

    it('applies checked state styling', () => {
      render(<Switch checked aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveClass('data-[state=checked]:bg-[#FFD700]');
    });

    it('applies transition styling', () => {
      render(<Switch aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveClass('transition-colors');
    });

    it('merges custom className with defaults', () => {
      render(<Switch className="custom-class" aria-label="test" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveClass('custom-class');
      expect(switchEl).toHaveClass('h-5'); // Still has default classes
    });

    it('renders thumb element', () => {
      const { container } = render(<Switch aria-label="test" />);
      const thumb = container.querySelector('[data-state]')?.firstChild;
      expect(thumb).toBeInTheDocument();
    });
  });

  describe('Form Integration', () => {
    it('works with form submission', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <Switch name="notifications" value="enabled" aria-label="notifications" />
          <button type="submit">Submit</button>
        </form>
      );

      const switchEl = screen.getByRole('switch');
      await user.click(switchEl);

      const submitButton = screen.getByRole('button');
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it('accepts name prop', () => {
      render(<Switch name="darkMode" aria-label="test" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('accepts value prop', () => {
      render(<Switch value="on" aria-label="test" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('accepts required prop', () => {
      render(<Switch required aria-label="test" />);
      // Radix Switch accepts required prop for form validation
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Switch ref={ref} aria-label="test" />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('allows calling focus via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Switch ref={ref} aria-label="test" />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it('allows calling methods via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Switch ref={ref} aria-label="test" />);

      expect(ref.current?.click).toBeDefined();
      expect(ref.current?.focus).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('handles null className gracefully', () => {
      render(<Switch className={undefined} aria-label="test" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('handles rapid clicking', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="test" />);

      const switchEl = screen.getByRole('switch');
      await user.click(switchEl);
      await user.click(switchEl);
      await user.click(switchEl);

      // Should be checked (odd number of clicks)
      expect(switchEl).toHaveAttribute('data-state', 'checked');
    });

    it('handles controlled state changes', async () => {
      const user = userEvent.setup();
      const ControlledSwitch = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <>
            <button onClick={() => setChecked(!checked)}>Toggle</button>
            <Switch checked={checked} onCheckedChange={setChecked} aria-label="test" />
          </>
        );
      };

      render(<ControlledSwitch />);
      const button = screen.getByRole('button');
      const switchEl = screen.getByRole('switch');

      expect(switchEl).toHaveAttribute('data-state', 'unchecked');

      await user.click(button);
      expect(switchEl).toHaveAttribute('data-state', 'checked');

      await user.click(button);
      expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    });

    it('maintains state after multiple interactions', async () => {
      const user = userEvent.setup();
      render(<Switch defaultChecked aria-label="test" />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('data-state', 'checked');

      await user.click(switchEl);
      expect(switchEl).toHaveAttribute('data-state', 'unchecked');

      await user.keyboard(' ');
      expect(switchEl).toHaveAttribute('data-state', 'checked');

      await user.keyboard(' ');
      expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    });
  });
});
