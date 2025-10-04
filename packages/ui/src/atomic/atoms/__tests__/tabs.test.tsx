/**
 * Tabs Component Tests
 *
 * Comprehensive test suite for the Tabs component covering:
 * - Tab rendering and structure
 * - Tab selection (controlled and uncontrolled)
 * - Keyboard navigation (arrows, Home, End)
 * - ARIA attributes and roles
 * - Active/inactive states
 * - Disabled tabs
 * - Focus management
 * - Accessibility requirements
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';
import { axe } from 'jest-axe';

describe('Tabs Component', () => {
  // Helper component for tests
  const TestTabs = ({
    defaultValue = 'tab1',
    onValueChange,
    value,
  }: {
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    value?: string;
  }) => (
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange} value={value}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  );

  describe('Basic Rendering', () => {
    it('renders tabs structure correctly', () => {
      render(<TestTabs />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /tab 3/i })).toBeInTheDocument();
    });

    it('renders with default selected tab', () => {
      render(<TestTabs defaultValue="tab1" />);

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      expect(tab1).toHaveAttribute('data-state', 'active');
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('shows content for the selected tab only', () => {
      render(<TestTabs defaultValue="tab2" />);

      const content2 = screen.getByText('Content 2');
      expect(content2).toBeVisible();

      // Inactive content panels have hidden attribute
      const allPanels = screen.getAllByRole('tabpanel', { hidden: true });
      const inactivePanels = allPanels.filter(panel => panel.hasAttribute('hidden'));
      expect(inactivePanels).toHaveLength(2); // Content 1 and 3 are hidden
    });

    it('applies custom className to TabsList', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveClass('custom-list');
    });

    it('applies custom className to TabsTrigger', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" className="custom-trigger">
              Tab 1
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      );

      const tab = screen.getByRole('tab', { name: /tab 1/i });
      expect(tab).toHaveClass('custom-trigger');
    });

    it('applies custom className to TabsContent', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="custom-content">
            Content
          </TabsContent>
        </Tabs>
      );

      const content = screen.getByText('Content');
      expect(content).toHaveClass('custom-content');
    });
  });

  describe('Tab Selection', () => {
    it('switches tabs when clicked', async () => {
      const user = userEvent.setup();
      render(<TestTabs />);

      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      await user.click(tab2);

      await waitFor(() => {
        expect(tab2).toHaveAttribute('data-state', 'active');
        expect(screen.getByText('Content 2')).toBeVisible();
      });
    });

    it('calls onValueChange when tab is selected', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TestTabs onValueChange={handleChange} />);

      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      await user.click(tab2);

      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('updates active state when tab changes', async () => {
      const user = userEvent.setup();
      render(<TestTabs />);

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      const tab2 = screen.getByRole('tab', { name: /tab 2/i });

      expect(tab1).toHaveAttribute('data-state', 'active');
      expect(tab2).toHaveAttribute('data-state', 'inactive');

      await user.click(tab2);

      await waitFor(() => {
        expect(tab1).toHaveAttribute('data-state', 'inactive');
        expect(tab2).toHaveAttribute('data-state', 'active');
      });
    });

    it('marks disabled tab correctly', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>
              Tab 2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      expect(tab2).toBeDisabled();
      expect(tab2).toHaveAttribute('data-disabled');
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates to next tab with ArrowRight', async () => {
      const user = userEvent.setup();
      render(<TestTabs />);

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      tab1.focus();

      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        const tab2 = screen.getByRole('tab', { name: /tab 2/i });
        expect(tab2).toHaveFocus();
      });
    });

    it('navigates to previous tab with ArrowLeft', async () => {
      const user = userEvent.setup();
      render(<TestTabs defaultValue="tab2" />);

      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      tab2.focus();

      await user.keyboard('{ArrowLeft}');

      await waitFor(() => {
        const tab1 = screen.getByRole('tab', { name: /tab 1/i });
        expect(tab1).toHaveFocus();
      });
    });

    it('keeps focus on current tab with ArrowDown (horizontal orientation)', async () => {
      const user = userEvent.setup();
      render(<TestTabs />);

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      tab1.focus();

      await user.keyboard('{ArrowDown}');

      // In horizontal orientation, ArrowDown/ArrowUp don't navigate
      expect(tab1).toHaveFocus();
    });

    it('keeps focus on current tab with ArrowUp (horizontal orientation)', async () => {
      const user = userEvent.setup();
      render(<TestTabs defaultValue="tab2" />);

      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      tab2.focus();

      await user.keyboard('{ArrowUp}');

      // In horizontal orientation, ArrowDown/ArrowUp don't navigate
      expect(tab2).toHaveFocus();
    });

    it('navigates to first tab with Home key', async () => {
      const user = userEvent.setup();
      render(<TestTabs defaultValue="tab3" />);

      const tab3 = screen.getByRole('tab', { name: /tab 3/i });
      tab3.focus();

      await user.keyboard('{Home}');

      await waitFor(() => {
        const tab1 = screen.getByRole('tab', { name: /tab 1/i });
        expect(tab1).toHaveFocus();
      });
    });

    it('navigates to last tab with End key', async () => {
      const user = userEvent.setup();
      render(<TestTabs />);

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      tab1.focus();

      await user.keyboard('{End}');

      await waitFor(() => {
        const tab3 = screen.getByRole('tab', { name: /tab 3/i });
        expect(tab3).toHaveFocus();
      });
    });

    it('wraps around to first tab when pressing ArrowRight on last tab', async () => {
      const user = userEvent.setup();
      render(<TestTabs defaultValue="tab3" />);

      const tab3 = screen.getByRole('tab', { name: /tab 3/i });
      tab3.focus();

      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        const tab1 = screen.getByRole('tab', { name: /tab 1/i });
        expect(tab1).toHaveFocus();
      });
    });

    it('wraps around to last tab when pressing ArrowLeft on first tab', async () => {
      const user = userEvent.setup();
      render(<TestTabs />);

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      tab1.focus();

      await user.keyboard('{ArrowLeft}');

      await waitFor(() => {
        const tab3 = screen.getByRole('tab', { name: /tab 3/i });
        expect(tab3).toHaveFocus();
      });
    });

    it('skips disabled tabs during keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>
              Tab 2
            </TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
          <TabsContent value="tab3">Content 3</TabsContent>
        </Tabs>
      );

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      tab1.focus();

      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        const tab3 = screen.getByRole('tab', { name: /tab 3/i });
        expect(tab3).toHaveFocus();
      });
    });
  });

  describe('Controlled Mode', () => {
    it('respects controlled value prop', () => {
      const { rerender } = render(<TestTabs value="tab1" />);

      expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute(
        'data-state',
        'active'
      );
      expect(screen.getByText('Content 1')).toBeVisible();

      rerender(<TestTabs value="tab2" />);

      expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveAttribute(
        'data-state',
        'active'
      );
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('maintains controlled value when provided', () => {
      render(<TestTabs value="tab1" />);

      // Controlled tabs show the value provided via props
      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      expect(tab1).toHaveAttribute('data-state', 'active');
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('requires onValueChange to update controlled tabs', async () => {
      const user = userEvent.setup();
      const ControlledTabs = () => {
        const [value, setValue] = React.useState('tab1');
        return (
          <Tabs value={value} onValueChange={setValue}>
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content 1</TabsContent>
            <TabsContent value="tab2">Content 2</TabsContent>
          </Tabs>
        );
      };

      render(<ControlledTabs />);

      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      await user.click(tab2);

      await waitFor(() => {
        expect(tab2).toHaveAttribute('data-state', 'active');
        expect(screen.getByText('Content 2')).toBeVisible();
      });
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<TestTabs />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('uses correct ARIA role for tablist', () => {
      render(<TestTabs />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('uses correct ARIA role for tabs', () => {
      render(<TestTabs />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
    });

    it('sets aria-selected on active tab', () => {
      render(<TestTabs defaultValue="tab1" />);
      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
    });

    it('sets aria-selected to false on inactive tabs', () => {
      render(<TestTabs defaultValue="tab1" />);
      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      expect(tab2).toHaveAttribute('aria-selected', 'false');
    });

    it('associates tabs with their panels via aria-controls', () => {
      render(<TestTabs />);
      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      const controlsId = tab1.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
    });

    it('handles disabled state correctly', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>
              Tab 2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      // Radix UI uses data-disabled and sets disabled attribute
      expect(tab2).toBeDisabled();
      expect(tab2).toHaveAttribute('data-disabled');
    });

    it('uses tabpanel role for content', () => {
      render(<TestTabs />);
      const panel = screen.getByRole('tabpanel');
      expect(panel).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('allows tabbing to the active tab', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <TestTabs />
          <button>After</button>
        </>
      );

      const beforeButton = screen.getByRole('button', { name: /before/i });
      beforeButton.focus();

      await user.keyboard('{Tab}');

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      expect(tab1).toHaveFocus();
    });

    it('shows focus ring on focused tab', () => {
      render(<TestTabs />);
      const tab1 = screen.getByRole('tab', { name: /tab 1/i });

      expect(tab1).toHaveClass('focus-visible:outline-none');
      expect(tab1).toHaveClass('focus-visible:ring-2');
      expect(tab1).toHaveClass('focus-visible:ring-[#FFD700]/50');
    });

    it('allows focusing tab content', () => {
      render(<TestTabs />);
      const content = screen.getByRole('tabpanel');

      expect(content).toHaveClass('focus-visible:outline-none');
      expect(content).toHaveClass('focus-visible:ring-2');
    });
  });

  describe('Styling', () => {
    it('applies active state styling to selected tab', () => {
      render(<TestTabs defaultValue="tab1" />);
      const tab1 = screen.getByRole('tab', { name: /tab 1/i });

      expect(tab1).toHaveAttribute('data-state', 'active');
      expect(tab1).toHaveClass('data-[state=active]:bg-white');
      expect(tab1).toHaveClass('data-[state=active]:text-black');
    });

    it('applies inactive state styling to unselected tabs', () => {
      render(<TestTabs defaultValue="tab1" />);
      const tab2 = screen.getByRole('tab', { name: /tab 2/i });

      expect(tab2).toHaveAttribute('data-state', 'inactive');
      expect(tab2).toHaveClass('data-[state=inactive]:hover:bg-white/10');
      expect(tab2).toHaveClass('data-[state=inactive]:hover:text-white');
    });

    it('applies disabled styling to disabled tabs', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>
              Tab 2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );

      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      expect(tab2).toHaveClass('disabled:pointer-events-none');
      expect(tab2).toHaveClass('disabled:opacity-50');
    });

    it('applies default TabsList styling', () => {
      render(<TestTabs />);
      const tablist = screen.getByRole('tablist');

      expect(tablist).toHaveClass('inline-flex');
      expect(tablist).toHaveClass('h-9');
      expect(tablist).toHaveClass('rounded-lg');
      expect(tablist).toHaveClass('bg-white/5');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to TabsList', () => {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <Tabs defaultValue="tab1">
          <TabsList ref={ref}>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to TabsTrigger', () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" ref={ref}>
              Tab 1
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('forwards ref to TabsContent', () => {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" ref={ref}>
            Content
          </TabsContent>
        </Tabs>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Edge Cases', () => {
    it('handles tabs with no content', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1"></TabsContent>
        </Tabs>
      );

      const panel = screen.getByRole('tabpanel');
      expect(panel).toBeInTheDocument();
      expect(panel).toBeEmptyDOMElement();
    });

    it('handles single tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Only Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Only Content</TabsContent>
        </Tabs>
      );

      const tab = screen.getByRole('tab', { name: /only tab/i });
      expect(tab).toHaveAttribute('data-state', 'active');
      expect(screen.getByText('Only Content')).toBeVisible();
    });

    it('handles many tabs', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            {Array.from({ length: 10 }, (_, i) => (
              <TabsTrigger key={i} value={`tab${i + 1}`}>
                Tab {i + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          {Array.from({ length: 10 }, (_, i) => (
            <TabsContent key={i} value={`tab${i + 1}`}>
              Content {i + 1}
            </TabsContent>
          ))}
        </Tabs>
      );

      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(10);
    });

    it('handles null className gracefully', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className={undefined}>
            <TabsTrigger value="tab1" className={undefined}>
              Tab 1
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className={undefined}>
            Content
          </TabsContent>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('handles rapid tab switching', async () => {
      const user = userEvent.setup();
      render(<TestTabs />);

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      const tab2 = screen.getByRole('tab', { name: /tab 2/i });
      const tab3 = screen.getByRole('tab', { name: /tab 3/i });

      // Rapidly switch tabs
      await user.click(tab2);
      await user.click(tab3);
      await user.click(tab1);
      await user.click(tab2);

      await waitFor(() => {
        expect(tab2).toHaveAttribute('data-state', 'active');
        expect(screen.getByText('Content 2')).toBeVisible();
      });
    });
  });
});
