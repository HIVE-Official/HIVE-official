/**
 * Accordion Component Tests
 *
 * Test coverage for Accordion component system:
 * - Single and multiple item expansion
 * - Keyboard navigation (arrows, Home, End, Space, Enter)
 * - Click interactions to expand/collapse
 * - Collapsible behavior
 * - Custom className and styling
 * - Ref forwarding
 * - ARIA attributes
 * - Disabled state
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion';
import { axe } from 'jest-axe';

describe('Accordion Component', () => {
  const TestAccordion = ({
    type = 'single',
    collapsible = false,
    defaultValue,
    value,
    onValueChange,
  }: {
    type?: 'single' | 'multiple';
    collapsible?: boolean;
    defaultValue?: any;
    value?: any;
    onValueChange?: (value: any) => void;
  } = {}) => (
    <Accordion
      type={type}
      collapsible={collapsible}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>Content 3</AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  describe('Basic Rendering', () => {
    it('renders accordion', () => {
      const { container } = render(<TestAccordion />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders all accordion items', () => {
      render(<TestAccordion />);
      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
      expect(screen.getByText('Section 3')).toBeInTheDocument();
    });

    it('renders triggers as buttons', () => {
      render(<TestAccordion />);
      const triggers = screen.getAllByRole('button');
      expect(triggers).toHaveLength(3);
    });

    it('initially hides content', () => {
      render(<TestAccordion />);
      // Radix Accordion content is in DOM but uses data-state=closed
      const trigger1 = screen.getByText('Section 1');
      expect(trigger1).toHaveAttribute('data-state', 'closed');
    });

    it('renders with default expanded item', () => {
      render(<TestAccordion defaultValue="item-1" />);
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('applies custom className to item', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" className="custom-item">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      const item = screen.getByText('Test').closest('[class*="custom-item"]');
      expect(item).toBeInTheDocument();
    });
  });

  describe('Single Type Accordion', () => {
    it('expands item on click', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" collapsible />);

      const trigger = screen.getByText('Section 1');
      await user.click(trigger);

      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('collapses other items when expanding one', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" defaultValue="item-1" collapsible />);

      expect(screen.getByText('Content 1')).toBeVisible();
      const trigger1 = screen.getByText('Section 1');
      expect(trigger1).toHaveAttribute('data-state', 'open');

      const trigger2 = screen.getByText('Section 2');
      await user.click(trigger2);

      expect(trigger1).toHaveAttribute('data-state', 'closed');
      expect(trigger2).toHaveAttribute('data-state', 'open');
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('supports collapsible behavior', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" collapsible />);

      const trigger = screen.getByText('Section 1');
      await user.click(trigger);
      expect(screen.getByText('Content 1')).toBeVisible();
      expect(trigger).toHaveAttribute('data-state', 'open');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('calls onValueChange when item expands', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TestAccordion type="single" collapsible onValueChange={handleChange} />);

      const trigger = screen.getByText('Section 1');
      await user.click(trigger);

      expect(handleChange).toHaveBeenCalledWith('item-1');
    });

    it('calls onValueChange with empty when collapsing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TestAccordion type="single" collapsible defaultValue="item-1" onValueChange={handleChange} />);

      const trigger = screen.getByText('Section 1');
      await user.click(trigger);

      expect(handleChange).toHaveBeenCalledWith('');
    });
  });

  describe('Multiple Type Accordion', () => {
    it('allows multiple items to be expanded', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="multiple" />);

      await user.click(screen.getByText('Section 1'));
      await user.click(screen.getByText('Section 2'));

      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('collapses individual items independently', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="multiple" defaultValue={['item-1', 'item-2']} />);

      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.getByText('Content 2')).toBeVisible();

      const trigger1 = screen.getByText('Section 1');
      await user.click(trigger1);

      expect(trigger1).toHaveAttribute('data-state', 'closed');
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('calls onValueChange with array of values', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TestAccordion type="multiple" onValueChange={handleChange} />);

      await user.click(screen.getByText('Section 1'));
      expect(handleChange).toHaveBeenCalledWith(['item-1']);

      await user.click(screen.getByText('Section 2'));
      expect(handleChange).toHaveBeenCalledWith(['item-1', 'item-2']);
    });
  });

  describe('Controlled Mode', () => {
    it('works as controlled component (single)', () => {
      const ControlledAccordion = () => {
        const [value, setValue] = React.useState('');
        return (
          <>
            <button onClick={() => setValue('item-2')}>Expand 2</button>
            <TestAccordion type="single" collapsible value={value} onValueChange={setValue} />
          </>
        );
      };

      render(<ControlledAccordion />);
      const trigger2 = screen.getByText('Section 2');
      expect(trigger2).toHaveAttribute('data-state', 'closed');
    });

    it('works as controlled component (multiple)', async () => {
      const user = userEvent.setup();
      const ControlledAccordion = () => {
        const [value, setValue] = React.useState<string[]>([]);
        return (
          <>
            <button onClick={() => setValue(['item-1', 'item-3'])}>Expand 1 and 3</button>
            <TestAccordion type="multiple" value={value} onValueChange={setValue} />
          </>
        );
      };

      render(<ControlledAccordion />);

      const button = screen.getByText('Expand 1 and 3');
      await user.click(button);

      expect(screen.getByText('Content 1')).toBeVisible();
      const trigger2 = screen.getByText('Section 2');
      expect(trigger2).toHaveAttribute('data-state', 'closed');
      expect(screen.getByText('Content 3')).toBeVisible();
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates between triggers with ArrowDown', async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      const trigger1 = screen.getByText('Section 1');
      trigger1.focus();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByText('Section 2')).toHaveFocus();
    });

    it('navigates between triggers with ArrowUp', async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      const trigger2 = screen.getByText('Section 2');
      trigger2.focus();

      await user.keyboard('{ArrowUp}');
      expect(screen.getByText('Section 1')).toHaveFocus();
    });

    it('jumps to first trigger with Home', async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      const trigger3 = screen.getByText('Section 3');
      trigger3.focus();

      await user.keyboard('{Home}');
      expect(screen.getByText('Section 1')).toHaveFocus();
    });

    it('jumps to last trigger with End', async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      const trigger1 = screen.getByText('Section 1');
      trigger1.focus();

      await user.keyboard('{End}');
      expect(screen.getByText('Section 3')).toHaveFocus();
    });

    it('toggles item with Space key', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" collapsible />);

      const trigger = screen.getByText('Section 1');
      trigger.focus();

      await user.keyboard(' ');
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('toggles item with Enter key', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" collapsible />);

      const trigger = screen.getByText('Section 1');
      trigger.focus();

      await user.keyboard('{Enter}');
      expect(screen.getByText('Content 1')).toBeVisible();
    });
  });

  describe('Disabled State', () => {
    it('renders disabled item', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Disabled</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Disabled');
      expect(trigger).toBeDisabled();
    });

    it('does not expand disabled item on click', async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Disabled</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Disabled');
      await user.click(trigger);

      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('has data-disabled attribute', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Disabled</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Disabled');
      expect(trigger).toHaveAttribute('data-disabled');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<TestAccordion type="single" collapsible />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('triggers have button role', () => {
      render(<TestAccordion />);
      const triggers = screen.getAllByRole('button');
      expect(triggers).toHaveLength(3);
    });

    it('has correct aria-expanded on trigger', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" collapsible />);

      const trigger = screen.getByText('Section 1');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('has data-state attributes', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" collapsible />);

      const trigger = screen.getByText('Section 1');
      expect(trigger).toHaveAttribute('data-state', 'closed');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('data-state', 'open');
    });

    it('content has proper region role', () => {
      render(<TestAccordion type="single" defaultValue="item-1" />);
      const content = screen.getByText('Content 1').closest('[role="region"]');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('triggers are focusable', () => {
      render(<TestAccordion />);
      const trigger = screen.getByText('Section 1');
      trigger.focus();
      expect(trigger).toHaveFocus();
    });

    it('can receive focus via Tab', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <TestAccordion />
        </>
      );

      await user.tab();
      await user.tab();

      const trigger = screen.getByText('Section 1');
      expect(trigger).toHaveFocus();
    });

    it('disabled trigger cannot receive focus', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Disabled</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Disabled');
      trigger.focus();
      expect(trigger).not.toHaveFocus();
    });
  });

  describe('Styling', () => {
    it('applies default item styling', () => {
      render(<TestAccordion />);
      const item = screen.getByText('Section 1').closest('[class*="border-b"]');
      expect(item).toBeInTheDocument();
    });

    it('applies trigger styling', () => {
      render(<TestAccordion />);
      const trigger = screen.getByText('Section 1');
      expect(trigger).toHaveClass('flex');
      expect(trigger).toHaveClass('items-center');
      expect(trigger).toHaveClass('justify-between');
    });

    it('rotates chevron when open', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" collapsible />);

      const trigger = screen.getByText('Section 1');
      await user.click(trigger);

      // Chevron rotates when data-state=open
      expect(trigger).toHaveAttribute('data-state', 'open');
    });

    it('applies content animation classes', () => {
      render(<TestAccordion type="single" defaultValue="item-1" />);
      const content = screen.getByText('Content 1').parentElement;
      expect(content).toHaveClass('data-[state=closed]:animate-accordion-up');
      expect(content).toHaveClass('data-[state=open]:animate-accordion-down');
    });

    it('merges custom className with defaults', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" className="custom-class">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      const item = screen.getByText('Test').closest('[class*="custom-class"]');
      expect(item).toHaveClass('border-b'); // Still has default
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref for AccordionItem', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" ref={ref}>
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref for AccordionTrigger', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger ref={ref}>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('forwards ref for AccordionContent', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent ref={ref}>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Edge Cases', () => {
    it('handles null className gracefully', () => {
      const { container } = render(
        <Accordion type="single">
          <AccordionItem value="item-1" className={undefined}>
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('works with single item', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Single</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByText('Single')).toBeInTheDocument();
    });

    it('handles rapid clicking', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" collapsible />);

      const trigger = screen.getByText('Section 1');
      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);

      // Should be expanded (odd number of clicks)
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('works without content', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>No Content</AccordionTrigger>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByText('No Content')).toBeInTheDocument();
    });
  });
});
