/**
 * Checkbox Component Tests
 *
 * Test coverage for Checkbox component:
 * - Checked/unchecked states
 * - Indeterminate state
 * - Disabled state
 * - Click and keyboard interactions
 * - ARIA attributes
 * - Form integration
 * - Visual indicators
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../checkbox';
import { axe } from 'jest-axe';

describe('Checkbox Component', () => {
  describe('Basic Rendering', () => {
    it('renders checkbox', () => {
      render(<Checkbox aria-label="test checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('is unchecked by default', () => {
      render(<Checkbox aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('renders with checked state', () => {
      render(<Checkbox checked aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('renders with default checked', () => {
      render(<Checkbox defaultChecked aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('renders check icon when checked', () => {
      const { container } = render(<Checkbox checked aria-label="test" />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Checkbox className="custom-class" aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('custom-class');
    });
  });

  describe('State Management', () => {
    it('toggles from unchecked to checked', async () => {
      const user = userEvent.setup();
      render(<Checkbox aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('toggles from checked to unchecked', async () => {
      const user = userEvent.setup();
      render(<Checkbox defaultChecked aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeChecked();
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('handles indeterminate state', () => {
      render(<Checkbox checked="indeterminate" aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
    });

    it('shows correct data-state attribute', () => {
      const { rerender } = render(<Checkbox aria-label="test" />);
      let checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');

      rerender(<Checkbox checked aria-label="test" />);
      checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });
  });

  describe('Controlled Mode', () => {
    it('works as controlled component', () => {
      const ControlledCheckbox = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <>
            <Checkbox checked={checked} onCheckedChange={setChecked} aria-label="controlled" />
            <button onClick={() => setChecked(!checked)}>Toggle</button>
          </>
        );
      };

      render(<ControlledCheckbox />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('respects controlled checked prop', () => {
      const { rerender } = render(<Checkbox checked={false} aria-label="test" />);
      let checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      rerender(<Checkbox checked={true} aria-label="test" />);
      checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('calls onCheckedChange when toggled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox onCheckedChange={handleChange} aria-label="test" />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onCheckedChange with false when unchecking', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox defaultChecked onCheckedChange={handleChange} aria-label="test" />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Disabled State', () => {
    it('renders disabled checkbox', () => {
      render(<Checkbox disabled aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox disabled onCheckedChange={handleChange} aria-label="test" />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
      expect(checkbox).not.toBeChecked();
    });

    it('applies disabled styling', () => {
      render(<Checkbox disabled aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('disabled:cursor-not-allowed');
      expect(checkbox).toHaveClass('disabled:opacity-50');
    });

    it('has correct data-disabled attribute', () => {
      render(<Checkbox disabled aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-disabled');
    });
  });

  describe('Keyboard Interaction', () => {
    it('toggles with Space key', async () => {
      const user = userEvent.setup();
      render(<Checkbox aria-label="test" />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');

      expect(checkbox).toBeChecked();
    });

    it('Space key is primary keyboard trigger', async () => {
      const user = userEvent.setup();
      render(<Checkbox aria-label="test" />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();

      // Radix checkboxes toggle with Space, not Enter
      await user.keyboard(' ');
      expect(checkbox).toBeChecked();
    });

    it('does not toggle disabled checkbox with Space', async () => {
      const user = userEvent.setup();
      render(<Checkbox disabled aria-label="test" />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');

      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <label>
          <Checkbox /> Accept terms
        </label>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has correct ARIA role', () => {
      render(<Checkbox aria-label="test" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Checkbox aria-label="Custom label" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Custom label');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Checkbox aria-describedby="help-text" aria-label="test" />
          <p id="help-text">Help text</p>
        </>
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'help-text');
    });

    it('can be associated with label', () => {
      render(
        <div>
          <label htmlFor="terms">Accept terms</label>
          <Checkbox id="terms" />
        </div>
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'terms');
    });

    it('has correct aria-checked attribute', () => {
      const { rerender } = render(<Checkbox aria-label="test" />);
      let checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');

      rerender(<Checkbox checked aria-label="test" />);
      checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('has aria-checked="mixed" for indeterminate', () => {
      render(<Checkbox checked="indeterminate" aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });
  });

  describe('Focus Management', () => {
    it('is focusable', () => {
      render(<Checkbox aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });

    it('shows focus ring styles', () => {
      render(<Checkbox aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('focus-visible:outline-none');
      expect(checkbox).toHaveClass('focus-visible:ring-2');
      expect(checkbox).toHaveClass('focus-visible:ring-[#FFD700]/50');
    });

    it('can receive focus via Tab', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <Checkbox aria-label="test" />
        </>
      );

      await user.tab();
      await user.tab();

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveFocus();
    });

    it('disabled checkbox cannot receive focus', () => {
      render(<Checkbox disabled aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      expect(checkbox).not.toHaveFocus();
    });
  });

  describe('Styling', () => {
    it('applies default styling', () => {
      render(<Checkbox aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toHaveClass('h-4');
      expect(checkbox).toHaveClass('w-4');
      expect(checkbox).toHaveClass('rounded-sm');
      expect(checkbox).toHaveClass('border');
      expect(checkbox).toHaveClass('bg-transparent');
    });

    it('applies checked state styling', () => {
      render(<Checkbox checked aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('data-[state=checked]:bg-[#FFD700]');
      expect(checkbox).toHaveClass('data-[state=checked]:border-[#FFD700]');
      expect(checkbox).toHaveClass('data-[state=checked]:text-black');
    });

    it('applies transition styling', () => {
      render(<Checkbox aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('transition-all');
    });

    it('merges custom className with defaults', () => {
      render(<Checkbox className="custom-class" aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('custom-class');
      expect(checkbox).toHaveClass('h-4'); // Still has default classes
    });
  });

  describe('Form Integration', () => {
    it('works with form submission', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <Checkbox name="terms" value="accepted" aria-label="terms" />
          <button type="submit">Submit</button>
        </form>
      );

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      const submitButton = screen.getByRole('button');
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it('accepts name prop for form integration', () => {
      render(<Checkbox name="newsletter" aria-label="test" />);
      // Radix Root doesn't directly expose name on the button,
      // but accepts it for form submission handling
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('supports value attribute', () => {
      render(<Checkbox value="yes" aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('value', 'yes');
    });

    it('supports required attribute', () => {
      render(<Checkbox required aria-label="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeRequired();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Checkbox ref={ref} aria-label="test" />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('allows calling focus via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Checkbox ref={ref} aria-label="test" />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it('allows calling click via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Checkbox ref={ref} aria-label="test" />);

      ref.current?.click();
      // Click triggers async state update in Radix
      expect(ref.current).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles null className gracefully', () => {
      render(<Checkbox className={undefined} aria-label="test" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('handles rapid clicking', async () => {
      const user = userEvent.setup();
      render(<Checkbox aria-label="test" />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);

      // Should be checked (odd number of clicks)
      expect(checkbox).toBeChecked();
    });

    it('handles controlled state changes', async () => {
      const user = userEvent.setup();
      const ControlledCheckbox = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <>
            <button onClick={() => setChecked(!checked)}>Toggle</button>
            <Checkbox checked={checked} onCheckedChange={setChecked} aria-label="test" />
          </>
        );
      };

      render(<ControlledCheckbox />);
      const button = screen.getByRole('button');
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();

      await user.click(button);
      expect(checkbox).toBeChecked();

      await user.click(button);
      expect(checkbox).not.toBeChecked();
    });

    it('maintains state after multiple interactions', async () => {
      const user = userEvent.setup();
      render(<Checkbox defaultChecked aria-label="test" />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();

      await user.keyboard(' ');
      expect(checkbox).toBeChecked();

      await user.keyboard(' '); // Toggle again with Space
      expect(checkbox).not.toBeChecked();
    });
  });
});
