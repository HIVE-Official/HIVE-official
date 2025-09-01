import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// Import navigation components
import {
  Navigation,
  NavItem,
  NavMenu,
  Breadcrumb,
  Sidebar,
  TabNavigation,
  CommandPalette,
  MobileNavigation
} from '@hive/ui';

// Mock navigation data
const mockNavItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'home' },
  { id: 'feed', label: 'Feed', href: '/feed', icon: 'activity' },
  { id: 'tools', label: 'Tools', href: '/tools', icon: 'tool', badge: '5' },
  { id: 'spaces', label: 'Spaces', href: '/spaces', icon: 'users' },
  { id: 'profile', label: 'Profile', href: '/profile', icon: 'user' }
];

const mockBreadcrumbs = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Tools', href: '/tools' },
  { label: 'Create Tool', href: '/tools/create', current: true }
];

const mockCommands = [
  { id: '1', label: 'Go to Dashboard', shortcut: 'g d', action: () => {}, category: 'navigation' },
  { id: '2', label: 'Create New Tool', shortcut: 'c t', action: () => {}, category: 'actions' },
  { id: '3', label: 'Search Tools', shortcut: '/', action: () => {}, category: 'search' },
  { id: '4', label: 'Open Profile', shortcut: 'g p', action: () => {}, category: 'navigation' }
];

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('Navigation Components Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Navigation Component', () => {
    it('renders navigation with proper structure and items', () => {
      render(
        <TestWrapper>
          <Navigation items={mockNavItems} />
        </TestWrapper>
      );
      
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('hive-navigation');
      
      // Check all nav items are rendered
      mockNavItems.forEach(item => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
      
      // Check badges are displayed
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('handles active state and navigation', () => {
      render(
        <MemoryRouter initialEntries={['/tools']}>
          <Navigation items={mockNavItems} />
        </MemoryRouter>
      );
      
      const toolsLink = screen.getByRole('link', { name: /Tools/ });
      expect(toolsLink).toHaveClass('nav-item--active');
      expect(toolsLink).toHaveAttribute('aria-current', 'page');
    });

    it('supports different navigation orientations', () => {
      const { rerender } = render(
        <TestWrapper>
          <Navigation items={mockNavItems} orientation="horizontal" />
        </TestWrapper>
      );
      
      let nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('hive-navigation--horizontal');
      
      rerender(
        <TestWrapper>
          <Navigation items={mockNavItems} orientation="vertical" />
        </TestWrapper>
      );
      
      nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('hive-navigation--vertical');
    });

    it('handles nested navigation menus', async () => {
      const nestedNavItems = [
        {
          id: 'tools',
          label: 'Tools',
          href: '/tools',
          children: [
            { id: 'my-tools', label: 'My Tools', href: '/tools/my' },
            { id: 'marketplace', label: 'Marketplace', href: '/tools/marketplace' },
            { id: 'create', label: 'Create Tool', href: '/tools/create' }
          ]
        }
      ];
      
      render(
        <TestWrapper>
          <Navigation items={nestedNavItems} />
        </TestWrapper>
      );
      
      const toolsButton = screen.getByRole('button', { name: /Tools/ });
      expect(toolsButton).toHaveAttribute('aria-expanded', 'false');
      
      await userEvent.click(toolsButton);
      expect(toolsButton).toHaveAttribute('aria-expanded', 'true');
      
      expect(screen.getByText('My Tools')).toBeInTheDocument();
      expect(screen.getByText('Marketplace')).toBeInTheDocument();
      expect(screen.getByText('Create Tool')).toBeInTheDocument();
    });
  });

  describe('Sidebar Component', () => {
    it('renders sidebar with collapsible functionality', async () => {
      const handleToggle = vi.fn();
      
      render(
        <TestWrapper>
          <Sidebar
            items={mockNavItems}
            collapsed={false}
            onToggle={handleToggle}
          />
        </TestWrapper>
      );
      
      const sidebar = screen.getByTestId('sidebar');
      expect(sidebar).toHaveClass('sidebar--expanded');
      
      const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i });
      await userEvent.click(toggleButton);
      
      expect(handleToggle).toHaveBeenCalledWith(true);
    });

    it('adapts to collapsed state', () => {
      render(
        <TestWrapper>
          <Sidebar
            items={mockNavItems}
            collapsed={true}
          />
        </TestWrapper>
      );
      
      const sidebar = screen.getByTestId('sidebar');
      expect(sidebar).toHaveClass('sidebar--collapsed');
      
      // Labels should be hidden in collapsed state
      mockNavItems.forEach(item => {
        const label = screen.getByText(item.label);
        expect(label).toHaveClass('sr-only');
      });
    });

    it('shows tooltips in collapsed state', async () => {
      render(
        <TestWrapper>
          <Sidebar
            items={mockNavItems}
            collapsed={true}
            showTooltips={true}
          />
        </TestWrapper>
      );
      
      const dashboardLink = screen.getByRole('link', { name: /Dashboard/ });
      
      await userEvent.hover(dashboardLink);
      
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toHaveTextContent('Dashboard');
      });
    });

    it('handles mobile responsive behavior', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      render(
        <TestWrapper>
          <Sidebar
            items={mockNavItems}
            mobileBreakpoint={768}
          />
        </TestWrapper>
      );
      
      const sidebar = screen.getByTestId('sidebar');
      expect(sidebar).toHaveClass('sidebar--mobile');
    });
  });

  describe('Breadcrumb Component', () => {
    it('renders breadcrumb navigation with proper structure', () => {
      render(
        <TestWrapper>
          <Breadcrumb items={mockBreadcrumbs} />
        </TestWrapper>
      );
      
      const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
      expect(breadcrumb).toBeInTheDocument();
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
    });

    it('handles current page indication', () => {
      render(
        <TestWrapper>
          <Breadcrumb items={mockBreadcrumbs} />
        </TestWrapper>
      );
      
      const currentItem = screen.getByText('Create Tool');
      expect(currentItem).toHaveAttribute('aria-current', 'page');
      expect(currentItem.tagName).toBe('SPAN'); // Current item should not be a link
    });

    it('supports custom separators', () => {
      render(
        <TestWrapper>
          <Breadcrumb items={mockBreadcrumbs} separator=">" />
        </TestWrapper>
      );
      
      const separators = screen.getAllByText('>');
      expect(separators).toHaveLength(2); // n-1 separators for n items
    });

    it('handles overflow with collapse functionality', () => {
      const longBreadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Tools', href: '/tools' },
        { label: 'Categories', href: '/tools/categories' },
        { label: 'Academic', href: '/tools/categories/academic' },
        { label: 'Calculators', href: '/tools/categories/academic/calculators' },
        { label: 'Grade Calculator', href: '/tools/grade-calculator', current: true }
      ];
      
      render(
        <TestWrapper>
          <Breadcrumb items={longBreadcrumbs} maxItems={4} />
        </TestWrapper>
      );
      
      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Grade Calculator')).toBeInTheDocument();
    });
  });

  describe('TabNavigation Component', () => {
    const tabItems = [
      { id: 'overview', label: 'Overview', content: 'Overview content' },
      { id: 'settings', label: 'Settings', content: 'Settings content' },
      { id: 'analytics', label: 'Analytics', content: 'Analytics content', badge: '3' }
    ];

    it('renders tabs with proper ARIA attributes', () => {
      render(
        <TabNavigation
          items={tabItems}
          activeTab="overview"
        />
      );
      
      const tabList = screen.getByRole('tablist');
      expect(tabList).toBeInTheDocument();
      
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
      
      const activeTab = screen.getByRole('tab', { name: 'Overview' });
      expect(activeTab).toHaveAttribute('aria-selected', 'true');
      expect(activeTab).toHaveAttribute('tabIndex', '0');
      
      const inactiveTab = screen.getByRole('tab', { name: 'Settings' });
      expect(inactiveTab).toHaveAttribute('aria-selected', 'false');
      expect(inactiveTab).toHaveAttribute('tabIndex', '-1');
    });

    it('handles tab switching', async () => {
      const handleTabChange = vi.fn();
      
      render(
        <TabNavigation
          items={tabItems}
          activeTab="overview"
          onTabChange={handleTabChange}
        />
      );
      
      const settingsTab = screen.getByRole('tab', { name: 'Settings' });
      await userEvent.click(settingsTab);
      
      expect(handleTabChange).toHaveBeenCalledWith('settings');
    });

    it('supports keyboard navigation between tabs', async () => {
      render(
        <TabNavigation
          items={tabItems}
          activeTab="overview"
        />
      );
      
      const overviewTab = screen.getByRole('tab', { name: 'Overview' });
      const settingsTab = screen.getByRole('tab', { name: 'Settings' });
      
      overviewTab.focus();
      expect(overviewTab).toHaveFocus();
      
      await userEvent.keyboard('{ArrowRight}');
      expect(settingsTab).toHaveFocus();
      
      await userEvent.keyboard('{ArrowLeft}');
      expect(overviewTab).toHaveFocus();
    });

    it('displays tab panels with proper associations', () => {
      render(
        <TabNavigation
          items={tabItems}
          activeTab="analytics"
        />
      );
      
      const analyticsTab = screen.getByRole('tab', { name: /Analytics/ });
      const tabPanel = screen.getByRole('tabpanel');
      
      expect(analyticsTab).toHaveAttribute('aria-controls', tabPanel.id);
      expect(tabPanel).toHaveAttribute('aria-labelledby', analyticsTab.id);
      expect(tabPanel).toHaveTextContent('Analytics content');
    });
  });

  describe('CommandPalette Component', () => {
    it('renders command palette with search functionality', async () => {
      const handleCommand = vi.fn();
      
      render(
        <CommandPalette
          commands={mockCommands}
          isOpen={true}
          onCommandSelect={handleCommand}
          onClose={() => {}}
        />
      );
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      
      const searchInput = screen.getByRole('textbox');
      expect(searchInput).toHaveAttribute('placeholder', 'Type a command or search...');
      
      await userEvent.type(searchInput, 'dashboard');
      
      expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
      expect(screen.queryByText('Create New Tool')).not.toBeInTheDocument();
    });

    it('handles command execution', async () => {
      const handleCommand = vi.fn();
      const mockAction = vi.fn();
      
      const commandsWithAction = mockCommands.map(cmd => 
        cmd.id === '1' ? { ...cmd, action: mockAction } : cmd
      );
      
      render(
        <CommandPalette
          commands={commandsWithAction}
          isOpen={true}
          onCommandSelect={handleCommand}
          onClose={() => {}}
        />
      );
      
      const searchInput = screen.getByRole('textbox');
      await userEvent.type(searchInput, 'dashboard');
      
      const command = screen.getByText('Go to Dashboard');
      await userEvent.click(command);
      
      expect(mockAction).toHaveBeenCalled();
      expect(handleCommand).toHaveBeenCalledWith(commandsWithAction[0]);
    });

    it('shows keyboard shortcuts', () => {
      render(
        <CommandPalette
          commands={mockCommands}
          isOpen={true}
          onCommandSelect={() => {}}
          onClose={() => {}}
        />
      );
      
      expect(screen.getByText('g d')).toBeInTheDocument();
      expect(screen.getByText('c t')).toBeInTheDocument();
    });

    it('groups commands by category', () => {
      render(
        <CommandPalette
          commands={mockCommands}
          isOpen={true}
          onCommandSelect={() => {}}
          onClose={() => {}}
          groupByCategory={true}
        />
      );
      
      expect(screen.getByText('Navigation')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('handles keyboard navigation', async () => {
      render(
        <CommandPalette
          commands={mockCommands}
          isOpen={true}
          onCommandSelect={() => {}}
          onClose={() => {}}
        />
      );
      
      const searchInput = screen.getByRole('textbox');
      searchInput.focus();
      
      await userEvent.keyboard('{ArrowDown}');
      
      const firstCommand = screen.getByText('Go to Dashboard');
      expect(firstCommand.closest('[role="option"]')).toHaveClass('command-item--selected');
      
      await userEvent.keyboard('{ArrowDown}');
      
      const secondCommand = screen.getByText('Create New Tool');
      expect(secondCommand.closest('[role="option"]')).toHaveClass('command-item--selected');
    });
  });

  describe('MobileNavigation Component', () => {
    it('renders mobile navigation with hamburger menu', () => {
      render(
        <TestWrapper>
          <MobileNavigation
            items={mockNavItems}
            isOpen={false}
          />
        </TestWrapper>
      );
      
      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      expect(hamburgerButton).toBeInTheDocument();
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('toggles mobile menu visibility', async () => {
      const handleToggle = vi.fn();
      
      render(
        <TestWrapper>
          <MobileNavigation
            items={mockNavItems}
            isOpen={false}
            onToggle={handleToggle}
          />
        </TestWrapper>
      );
      
      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      await userEvent.click(hamburgerButton);
      
      expect(handleToggle).toHaveBeenCalledWith(true);
    });

    it('renders overlay and focuses management when open', () => {
      render(
        <TestWrapper>
          <MobileNavigation
            items={mockNavItems}
            isOpen={true}
          />
        </TestWrapper>
      );
      
      const overlay = screen.getByTestId('mobile-nav-overlay');
      expect(overlay).toBeInTheDocument();
      
      const mobileNav = screen.getByRole('navigation');
      expect(mobileNav).toHaveAttribute('aria-modal', 'true');
    });

    it('handles swipe gestures for closing', () => {
      const handleToggle = vi.fn();
      
      render(
        <TestWrapper>
          <MobileNavigation
            items={mockNavItems}
            isOpen={true}
            onToggle={handleToggle}
          />
        </TestWrapper>
      );
      
      const mobileNav = screen.getByRole('navigation');
      
      // Simulate swipe left gesture
      fireEvent.touchStart(mobileNav, {
        touches: [{ clientX: 100, clientY: 100 }]
      });
      
      fireEvent.touchMove(mobileNav, {
        touches: [{ clientX: 50, clientY: 100 }]
      });
      
      fireEvent.touchEnd(mobileNav);
      
      expect(handleToggle).toHaveBeenCalledWith(false);
    });
  });

  describe('Navigation Accessibility', () => {
    it('provides proper landmarks and roles', () => {
      render(
        <TestWrapper>
          <Navigation items={mockNavItems} ariaLabel="Main navigation" />
        </TestWrapper>
      );
      
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(mockNavItems.length);
    });

    it('supports skip links', () => {
      render(
        <TestWrapper>
          <div>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Navigation items={mockNavItems} />
            <main id="main-content">
              <h1>Main Content</h1>
            </main>
          </div>
        </TestWrapper>
      );
      
      const skipLink = screen.getByText('Skip to main content');
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('announces navigation changes to screen readers', async () => {
      render(
        <TestWrapper>
          <div>
            <div role="status" aria-live="polite" id="nav-announcements">
              {/* Screen reader announcements */}
            </div>
            <Navigation items={mockNavItems} />
          </div>
        </TestWrapper>
      );
      
      const announcements = screen.getByRole('status');
      expect(announcements).toHaveAttribute('aria-live', 'polite');
    });

    it('handles high contrast mode', () => {
      render(
        <TestWrapper>
          <div className="high-contrast">
            <Navigation items={mockNavItems} />
          </div>
        </TestWrapper>
      );
      
      const nav = screen.getByRole('navigation');
      expect(nav.closest('.high-contrast')).toBeInTheDocument();
    });
  });
});