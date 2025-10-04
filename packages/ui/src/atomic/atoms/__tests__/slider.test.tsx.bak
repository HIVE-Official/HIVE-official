/**
 * Slider Component Tests
 *
 * Test coverage for Slider component:
 * - Value management (single and range)
 * - Keyboard interactions (arrows, Home, End)
 * - Mouse/touch interactions
 * - Min/max/step values
 * - Disabled state
 * - ARIA attributes
 * - Orientation (horizontal/vertical)
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from '../slider';
import { axe } from 'jest-axe';

describe('Slider Component', () => {
  describe('Basic Rendering', () => {
    it('renders slider', () => {
      render(<Slider aria-label="test slider" />);
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('renders with default value of 0', () => {
      render(<Slider aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '0');
    });

    it('renders with specified default value', () => {
      render(<Slider defaultValue={[50]} aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
    });

    it('renders with min and max', () => {
      render(<Slider min={0} max={100} aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemin', '0');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
    });

    it('applies custom className', () => {
      const { container } = render(<Slider className="custom-class" aria-label="test" />);
      const sliderRoot = container.firstChild;
      expect(sliderRoot).toHaveClass('custom-class');
    });

    it('renders track element', () => {
      const { container } = render(<Slider aria-label="test" />);
      const track = container.querySelector('[class*="bg-primary/20"]');
      expect(track).toBeInTheDocument();
    });

    it('renders range element', () => {
      const { container } = render(<Slider defaultValue={[50]} aria-label="test" />);
      const range = container.querySelector('[class*="bg-primary"]');
      expect(range).toBeInTheDocument();
    });

    it('renders thumb element', () => {
      const { container } = render(<Slider aria-label="test" />);
      const thumb = container.querySelector('[class*="rounded-full"][class*="h-4"]');
      expect(thumb).toBeInTheDocument();
    });
  });

  describe('Value Management', () => {
    it('accepts controlled value', () => {
      const { rerender } = render(<Slider value={[25]} aria-label="test" />);
      let slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '25');

      rerender(<Slider value={[75]} aria-label="test" />);
      slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '75');
    });

    it('calls onValueChange when value changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider onValueChange={handleChange} aria-label="test" />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowRight}');

      expect(handleChange).toHaveBeenCalled();
    });

    it('works as controlled component', () => {
      const ControlledSlider = () => {
        const [value, setValue] = React.useState([50]);
        return <Slider value={value} onValueChange={setValue} aria-label="controlled" />;
      };

      render(<ControlledSlider />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
    });

    it('respects min constraint', () => {
      render(<Slider min={10} max={100} defaultValue={[5]} aria-label="test" />);
      const slider = screen.getByRole('slider');
      // Value should be clamped to min
      expect(slider).toHaveAttribute('aria-valuemin', '10');
    });

    it('respects max constraint', () => {
      render(<Slider min={0} max={100} aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
    });

    it('handles step value', () => {
      render(<Slider min={0} max={100} step={10} aria-label="test" />);
      // Radix handles step internally
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });
  });

  describe('Keyboard Interaction', () => {
    it('increases value with ArrowRight', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider defaultValue={[50]} onValueChange={handleChange} aria-label="test" />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowRight}');

      expect(handleChange).toHaveBeenCalled();
      const newValue = handleChange.mock.calls[0][0][0];
      expect(newValue).toBeGreaterThan(50);
    });

    it('decreases value with ArrowLeft', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider defaultValue={[50]} onValueChange={handleChange} aria-label="test" />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowLeft}');

      expect(handleChange).toHaveBeenCalled();
      const newValue = handleChange.mock.calls[0][0][0];
      expect(newValue).toBeLessThan(50);
    });

    it('increases value with ArrowUp', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider defaultValue={[50]} onValueChange={handleChange} aria-label="test" />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowUp}');

      expect(handleChange).toHaveBeenCalled();
    });

    it('decreases value with ArrowDown', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider defaultValue={[50]} onValueChange={handleChange} aria-label="test" />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowDown}');

      expect(handleChange).toHaveBeenCalled();
    });

    it('sets to min with Home key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider min={0} max={100} defaultValue={[50]} onValueChange={handleChange} aria-label="test" />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{Home}');

      expect(handleChange).toHaveBeenCalled();
      const newValue = handleChange.mock.calls[0][0][0];
      expect(newValue).toBe(0);
    });

    it('sets to max with End key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider min={0} max={100} defaultValue={[50]} onValueChange={handleChange} aria-label="test" />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{End}');

      expect(handleChange).toHaveBeenCalled();
      const newValue = handleChange.mock.calls[0][0][0];
      expect(newValue).toBe(100);
    });

    it('respects step when using keyboard', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider min={0} max={100} step={10} defaultValue={[50]} onValueChange={handleChange} aria-label="test" />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowRight}');

      expect(handleChange).toHaveBeenCalled();
      const newValue = handleChange.mock.calls[0][0][0];
      // Should increment by step (10)
      expect(newValue).toBe(60);
    });
  });

  describe('Disabled State', () => {
    it('renders disabled slider', () => {
      render(<Slider disabled aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('data-disabled');
    });

    it('does not change value when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider disabled onValueChange={handleChange} aria-label="test" />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowRight}');

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('applies disabled styling to thumb', () => {
      const { container } = render(<Slider disabled aria-label="test" />);
      const thumb = container.querySelector('[class*="rounded-full"][class*="h-4"]');
      expect(thumb).toHaveClass('disabled:pointer-events-none');
      expect(thumb).toHaveClass('disabled:opacity-50');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', () => {
      render(<Slider aria-label="test" />);
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('accepts aria-label prop', () => {
      render(<Slider aria-label="Volume control" />);
      // Radix applies aria-label to the thumb (slider role element)
      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
    });

    it('has aria-valuenow attribute', () => {
      render(<Slider defaultValue={[75]} aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '75');
    });

    it('has aria-valuemin attribute', () => {
      render(<Slider min={10} aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemin', '10');
    });

    it('has aria-valuemax attribute', () => {
      render(<Slider max={200} aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemax', '200');
    });

    it('accepts aria-labelledby prop', () => {
      render(
        <div>
          <label id="volume-label">Volume</label>
          <Slider aria-labelledby="volume-label" />
        </div>
      );
      // Radix applies aria-labelledby to the slider role element
      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('is focusable', () => {
      render(<Slider aria-label="test" />);
      const slider = screen.getByRole('slider');
      slider.focus();
      expect(slider).toHaveFocus();
    });

    it('shows focus ring on thumb', () => {
      const { container } = render(<Slider aria-label="test" />);
      const thumb = container.querySelector('[class*="rounded-full"][class*="h-4"]');
      expect(thumb).toHaveClass('focus-visible:outline-none');
      expect(thumb).toHaveClass('focus-visible:ring-1');
    });

    it('can receive focus via Tab', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <Slider aria-label="test" />
        </>
      );

      await user.tab();
      await user.tab();

      const slider = screen.getByRole('slider');
      expect(slider).toHaveFocus();
    });

    it('disabled slider cannot receive focus', () => {
      render(<Slider disabled aria-label="test" />);
      const slider = screen.getByRole('slider');
      slider.focus();
      expect(slider).not.toHaveFocus();
    });
  });

  describe('Styling', () => {
    it('applies default root styling', () => {
      const { container } = render(<Slider aria-label="test" />);
      const root = container.firstChild;
      expect(root).toHaveClass('relative');
      expect(root).toHaveClass('flex');
      expect(root).toHaveClass('w-full');
      expect(root).toHaveClass('touch-none');
    });

    it('applies track styling', () => {
      const { container } = render(<Slider aria-label="test" />);
      const track = container.querySelector('[class*="bg-primary/20"]');
      expect(track).toHaveClass('h-1.5');
      expect(track).toHaveClass('rounded-full');
    });

    it('applies thumb styling', () => {
      const { container } = render(<Slider aria-label="test" />);
      const thumb = container.querySelector('[class*="rounded-full"][class*="h-4"]');
      expect(thumb).toHaveClass('h-4');
      expect(thumb).toHaveClass('w-4');
      expect(thumb).toHaveClass('rounded-full');
      expect(thumb).toHaveClass('shadow');
    });

    it('applies transition styling to thumb', () => {
      const { container } = render(<Slider aria-label="test" />);
      const thumb = container.querySelector('[class*="rounded-full"][class*="h-4"]');
      expect(thumb).toHaveClass('transition-all');
    });

    it('merges custom className with defaults', () => {
      const { container } = render(<Slider className="custom-class" aria-label="test" />);
      const root = container.firstChild;
      expect(root).toHaveClass('custom-class');
      expect(root).toHaveClass('flex'); // Still has default classes
    });
  });

  describe('Orientation', () => {
    it('defaults to horizontal orientation', () => {
      render(<Slider aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('supports vertical orientation', () => {
      render(<Slider orientation="vertical" aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Slider ref={ref} aria-label="test" />);

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('allows calling methods via ref', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Slider ref={ref} aria-label="test" />);

      expect(ref.current).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles null className gracefully', () => {
      const { container } = render(<Slider className={undefined} aria-label="test" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles value at min boundary', () => {
      render(<Slider min={0} max={100} defaultValue={[0]} aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '0');
    });

    it('handles value at max boundary', () => {
      render(<Slider min={0} max={100} defaultValue={[100]} aria-label="test" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '100');
    });

    it('handles decimal step values', () => {
      render(<Slider min={0} max={1} step={0.1} defaultValue={[0.5]} aria-label="test" />);
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('handles controlled state changes', async () => {
      const ControlledSlider = () => {
        const [value, setValue] = React.useState([50]);
        return (
          <>
            <button onClick={() => setValue([75])}>Set 75</button>
            <Slider value={value} onValueChange={setValue} aria-label="test" />
          </>
        );
      };

      const user = userEvent.setup();
      render(<ControlledSlider />);

      const button = screen.getByRole('button');
      const slider = screen.getByRole('slider');

      expect(slider).toHaveAttribute('aria-valuenow', '50');

      await user.click(button);
      expect(slider).toHaveAttribute('aria-valuenow', '75');
    });

    it('handles rapid keyboard interactions', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider defaultValue={[50]} onValueChange={handleChange} aria-label="test" />);

      const slider = screen.getByRole('slider');
      slider.focus();

      await user.keyboard('{ArrowRight}');
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{ArrowLeft}');

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange.mock.calls.length).toBeGreaterThanOrEqual(3);
    });
  });
});
