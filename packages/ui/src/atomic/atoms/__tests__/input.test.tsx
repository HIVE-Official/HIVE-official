/**
 * Input Component Tests
 *
 * Comprehensive test suite for the Input component covering:
 * - Rendering with different types
 * - Event handling (change, focus, blur, keypress)
 * - Accessibility requirements (labels, ARIA attributes)
 * - Keyboard navigation
 * - Prop forwarding
 * - Disabled/readonly states
 * - Placeholder behavior
 * - File input handling
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../input';
import { axe } from 'jest-axe';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders an input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with default type="text"', () => {
      render(<Input />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      // type="text" is the default, so it may not be explicitly set in the DOM
      expect(input.type).toBe('text');
    });

    it('forwards className to the input element', () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });

    it('applies default styling classes', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveClass('flex', 'h-9', 'w-full');
      expect(input).toHaveClass('rounded-md', 'border');
      expect(input).toHaveClass('bg-[#0c0c0c]', 'text-white');
    });

    it('renders with placeholder text', () => {
      render(<Input placeholder="Enter your name" />);
      const input = screen.getByPlaceholderText('Enter your name');
      expect(input).toBeInTheDocument();
    });

    it('renders with default value', () => {
      render(<Input defaultValue="Hello World" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Hello World');
    });

    it('renders with controlled value', () => {
      const { rerender } = render(<Input value="Initial" onChange={() => {}} />);
      let input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Initial');

      rerender(<Input value="Updated" onChange={() => {}} />);
      input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Updated');
    });
  });

  describe('Input Types', () => {
    const inputTypes = [
      'text',
      'email',
      'password',
      'number',
      'tel',
      'url',
      'search',
      'date',
      'time',
      'datetime-local',
    ] as const;

    inputTypes.forEach(type => {
      it(`renders ${type} input correctly`, () => {
        render(<Input type={type} aria-label={`${type} input`} />);
        const input = screen.getByLabelText(`${type} input`);
        expect(input).toHaveAttribute('type', type);
      });
    });

    it('renders file input with special attributes', () => {
      render(<Input type="file" aria-label="file input" />);
      const input = screen.getByLabelText('file input');
      expect(input).toHaveAttribute('type', 'file');
      // File input has file-specific classes
      expect(input).toHaveClass('file:border-0', 'file:bg-transparent');
    });

    it('renders hidden input', () => {
      const { container } = render(<Input type="hidden" />);
      const input = container.querySelector('input[type="hidden"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('calls onChange when user types', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello');

      expect(handleChange).toHaveBeenCalledTimes(5); // One per character
    });

    it('calls onFocus when input is focused', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole('textbox');

      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when input loses focus', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(
        <div>
          <Input onBlur={handleBlur} />
          <button>Other element</button>
        </div>
      );
      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');

      await user.click(input);
      await user.click(button);

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('calls onKeyDown when key is pressed', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(<Input onKeyDown={handleKeyDown} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'a');

      expect(handleKeyDown).toHaveBeenCalled();
    });

    it('handles Enter key press', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(<Input onKeyDown={handleKeyDown} />);
      const input = screen.getByRole('textbox');

      await user.type(input, '{Enter}');

      expect(handleKeyDown).toHaveBeenCalled();
      const event = handleKeyDown.mock.calls[0][0];
      expect(event.key).toBe('Enter');
    });

    it('handles Escape key press', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(<Input onKeyDown={handleKeyDown} />);
      const input = screen.getByRole('textbox');

      await user.type(input, '{Escape}');

      expect(handleKeyDown).toHaveBeenCalled();
      const event = handleKeyDown.mock.calls[0][0];
      expect(event.key).toBe('Escape');
    });
  });

  describe('States', () => {
    it('renders disabled input', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');

      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input disabled onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('renders readonly input', () => {
      render(<Input readOnly value="Read only text" onChange={() => {}} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input).toHaveAttribute('readonly');
      expect(input.value).toBe('Read only text');
    });

    it('does not allow changes when readonly', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input readOnly value="readonly" onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('renders required input', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');

      expect(input).toBeRequired();
    });
  });

  describe('Validation', () => {
    it('applies minLength validation', () => {
      render(<Input minLength={5} />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('minlength', '5');
    });

    it('applies maxLength validation', () => {
      render(<Input maxLength={10} />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('maxlength', '10');
    });

    it('applies pattern validation', () => {
      render(<Input pattern="[0-9]*" />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('pattern', '[0-9]*');
    });

    it('applies min and max for number inputs', () => {
      render(<Input type="number" min={0} max={100} aria-label="number input" />);
      const input = screen.getByLabelText('number input');

      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <label>
          Username
          <Input />
        </label>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-label', () => {
      render(<Input aria-label="Search query" />);
      const input = screen.getByLabelText('Search query');
      expect(input).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Input aria-describedby="helper-text" />
          <p id="helper-text">Helper text</p>
        </>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'helper-text');
    });

    it('supports aria-invalid for error states', () => {
      render(<Input aria-invalid="true" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('can be associated with a label', () => {
      render(
        <div>
          <label htmlFor="test-input">Label</label>
          <Input id="test-input" />
        </div>
      );
      const input = screen.getByLabelText('Label');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('can receive focus', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');

      input.focus();

      expect(input).toHaveFocus();
    });

    it('shows focus ring styles', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');

      // Check for focus-visible styles
      expect(input).toHaveClass('focus-visible:outline-none');
      expect(input).toHaveClass('focus-visible:ring-2');
      expect(input).toHaveClass('focus-visible:ring-[#FFD700]/50');
    });

    it('can be programmatically focused via ref', () => {
      const TestComponent = () => {
        const ref = React.useRef<HTMLInputElement>(null);

        React.useEffect(() => {
          ref.current?.focus();
        }, []);

        return <Input ref={ref} />;
      };

      render(<TestComponent />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveFocus();
    });
  });

  describe('Prop Forwarding', () => {
    it('forwards all standard HTML input attributes', () => {
      render(
        <Input
          name="username"
          id="username-input"
          autoComplete="username"
          autoFocus
          data-testid="custom-input"
        />
      );
      const input = screen.getByTestId('custom-input');

      expect(input).toHaveAttribute('name', 'username');
      expect(input).toHaveAttribute('id', 'username-input');
      expect(input).toHaveAttribute('autocomplete', 'username');
      // autoFocus is handled by React, not rendered as HTML attribute
      expect(input).toHaveFocus();
    });

    it('forwards data attributes', () => {
      render(<Input data-custom="value" />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('data-custom', 'value');
    });

    it('forwards aria attributes', () => {
      render(
        <Input
          aria-label="Input label"
          aria-required="true"
          aria-invalid="false"
        />
      );
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('aria-label', 'Input label');
      expect(input).toHaveAttribute('aria-required', 'true');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>();

      render(<Input ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });

    it('allows calling input methods via ref', () => {
      const ref = React.createRef<HTMLInputElement>();

      render(<Input ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();

      ref.current?.blur();
      expect(ref.current).not.toHaveFocus();
    });

    it('allows reading input value via ref', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<HTMLInputElement>();

      render(<Input ref={ref} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test value');

      expect(ref.current?.value).toBe('test value');
    });
  });

  describe('File Input Specific', () => {
    it('renders file input with correct classes', () => {
      render(<Input type="file" aria-label="file upload" />);
      const input = screen.getByLabelText('file upload');

      expect(input).toHaveClass('file:border-0');
      expect(input).toHaveClass('file:bg-transparent');
      expect(input).toHaveClass('file:text-sm');
      expect(input).toHaveClass('file:font-medium');
      expect(input).toHaveClass('file:text-white');
    });

    it('accepts accept attribute for file types', () => {
      render(<Input type="file" accept="image/*" aria-label="image upload" />);
      const input = screen.getByLabelText('image upload');

      expect(input).toHaveAttribute('accept', 'image/*');
    });

    it('supports multiple file selection', () => {
      render(<Input type="file" multiple aria-label="multiple files" />);
      const input = screen.getByLabelText('multiple files');

      expect(input).toHaveAttribute('multiple');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string value', () => {
      render(<Input value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('');
    });

    it('handles null className gracefully', () => {
      render(<Input className={undefined} />);
      const input = screen.getByRole('textbox');

      expect(input).toBeInTheDocument();
    });

    it('handles very long text input', async () => {
      const user = userEvent.setup();
      const longText = 'a'.repeat(1000);

      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, longText);

      expect(input).toHaveValue(longText);
    });

    it('handles special characters', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      // Use paste instead of type for special characters that have keyboard shortcuts
      await user.click(input);
      await user.paste('!@#$%^&*()_+-=');

      expect(input.value).toContain('!@#$%^&*()_+-=');
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
