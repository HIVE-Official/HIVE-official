import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

// Import layout components
import AppLayout from '../../components/app-layout';
import TopNavLayout from '../../components/navigation/top-nav-layout';
import CommandNavLayout from '../../components/navigation/command-nav-layout';

// Mock dependencies
vi.mock('../../lib/auth', () => ({
  useAuth: () => ({
    user: {
      uid: 'user-123',
      displayName: 'Test User',
      email: 'test@university.edu',
      avatar: 'https://example.com/avatar.jpg'
    },
    loading: false,
    signOut: vi.fn()
  })
}));

vi.mock('../../hooks/use-enhanced-command-palette', () => ({
  useEnhancedCommandPalette: () => ({
    isOpen: false,
    openPalette: vi.fn(),
    closePalette: vi.fn(),
    searchQuery: '',
    setSearchQuery: vi.fn(),
    filteredCommands: []
  })
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn()
  }),
  usePathname: () => '/dashboard'
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('Layout Components Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('AppLayout Component', () => {
    it('renders main layout structure correctly', () => {
      render(
        <TestWrapper>
          <AppLayout>
            <div>Test Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('app-layout')).toBeInTheDocument();
      expect(screen.getByTestId('app-header')).toBeInTheDocument();
      expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('app-main')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('handles sidebar toggle functionality', async () => {
      render(
        <TestWrapper>
          <AppLayout>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle sidebar' });
      const sidebar = screen.getByTestId('app-sidebar');
      
      expect(sidebar).toHaveClass('sidebar--expanded');
      
      await userEvent.click(toggleButton);
      expect(sidebar).toHaveClass('sidebar--collapsed');
      
      await userEvent.click(toggleButton);
      expect(sidebar).toHaveClass('sidebar--expanded');
    });

    it('adapts layout for mobile devices', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      render(
        <TestWrapper>
          <AppLayout>
            <div>Mobile Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      const layout = screen.getByTestId('app-layout');
      expect(layout).toHaveClass('app-layout--mobile');
      
      const sidebar = screen.getByTestId('app-sidebar');
      expect(sidebar).toHaveClass('sidebar--mobile');
    });

    it('handles loading states correctly', () => {
      render(
        <TestWrapper>
          <AppLayout loading>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('app-loading')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('displays error states appropriately', () => {
      const error = new Error('Test error message');
      
      render(
        <TestWrapper>
          <AppLayout error={error}>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('app-error')).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });

    it('provides keyboard navigation support', async () => {
      render(
        <TestWrapper>
          <AppLayout>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      // Test skip to main content
      const skipLink = screen.getByText('Skip to main content');
      expect(skipLink).toBeInTheDocument();
      
      await userEvent.click(skipLink);
      const mainContent = screen.getByTestId('app-main');
      expect(mainContent).toHaveFocus();
    });

    it('manages focus trap in sidebar when open on mobile', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      render(
        <TestWrapper>
          <AppLayout>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle sidebar' });
      await userEvent.click(toggleButton);
      
      const sidebar = screen.getByTestId('app-sidebar');
      expect(sidebar).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('TopNavLayout Component', () => {
    it('renders navigation header with user info', () => {
      render(
        <TestWrapper>
          <TopNavLayout>
            <div>Page Content</div>
          </TopNavLayout>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('top-nav')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'User avatar' })).toBeInTheDocument();
      expect(screen.getByText('Page Content')).toBeInTheDocument();
    });

    it('handles navigation menu interactions', async () => {
      render(
        <TestWrapper>
          <TopNavLayout>
            <div>Content</div>
          </TopNavLayout>
        </TestWrapper>
      );
      
      const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });
      await userEvent.click(menuButton);
      
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('displays notifications indicator', () => {
      render(
        <TestWrapper>
          <TopNavLayout hasNotifications notificationCount={3}>
            <div>Content</div>
          </TopNavLayout>
        </TestWrapper>
      );
      
      const notificationButton = screen.getByRole('button', { name: 'Notifications' });
      expect(notificationButton).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('handles user profile dropdown', async () => {
      render(
        <TestWrapper>
          <TopNavLayout>
            <div>Content</div>
          </TopNavLayout>
        </TestWrapper>
      );
      
      const profileButton = screen.getByRole('button', { name: 'User menu' });
      await userEvent.click(profileButton);
      
      expect(screen.getByText('View Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });

    it('supports breadcrumb navigation', () => {
      const breadcrumbs = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/profile/settings' }
      ];
      
      render(
        <TestWrapper>
          <TopNavLayout breadcrumbs={breadcrumbs}>
            <div>Content</div>
          </TopNavLayout>
        </TestWrapper>
      );
      
      expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('handles search functionality', async () => {
      const handleSearch = vi.fn();
      
      render(
        <TestWrapper>
          <TopNavLayout onSearch={handleSearch}>
            <div>Content</div>
          </TopNavLayout>
        </TestWrapper>
      );
      
      const searchInput = screen.getByPlaceholderText('Search HIVE...');
      await userEvent.type(searchInput, 'test query');
      await userEvent.keyboard('{Enter}');
      
      expect(handleSearch).toHaveBeenCalledWith('test query');
    });
  });

  describe('CommandNavLayout Component', () => {
    it('renders command palette interface', () => {
      render(
        <TestWrapper>
          <CommandNavLayout>
            <div>Command Content</div>
          </CommandNavLayout>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('command-nav')).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Command input' })).toBeInTheDocument();
      expect(screen.getByText('Command Content')).toBeInTheDocument();
    });

    it('handles command palette activation via keyboard shortcut', async () => {
      render(
        <TestWrapper>
          <CommandNavLayout>
            <div>Content</div>
          </CommandNavLayout>
        </TestWrapper>
      );
      
      // Simulate Cmd+K (or Ctrl+K)
      await userEvent.keyboard('{Meta>}k{/Meta}');
      
      const commandInput = screen.getByRole('textbox', { name: 'Command input' });
      expect(commandInput).toHaveFocus();
    });

    it('displays command suggestions and filtering', async () => {
      const mockCommands = [
        { id: '1', label: 'Go to Dashboard', action: 'navigate', target: '/dashboard' },
        { id: '2', label: 'Create New Space', action: 'create', target: 'space' },
        { id: '3', label: 'Search Tools', action: 'search', target: 'tools' }
      ];
      
      render(
        <TestWrapper>
          <CommandNavLayout commands={mockCommands}>
            <div>Content</div>
          </CommandNavLayout>
        </TestWrapper>
      );
      
      const commandInput = screen.getByRole('textbox', { name: 'Command input' });
      await userEvent.type(commandInput, 'dash');
      
      expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
      expect(screen.queryByText('Create New Space')).not.toBeInTheDocument();
    });

    it('handles command execution', async () => {
      const handleCommand = vi.fn();
      const mockCommands = [
        { id: '1', label: 'Test Command', action: 'test', handler: handleCommand }
      ];
      
      render(
        <TestWrapper>
          <CommandNavLayout commands={mockCommands}>
            <div>Content</div>
          </CommandNavLayout>
        </TestWrapper>
      );
      
      const commandInput = screen.getByRole('textbox', { name: 'Command input' });
      await userEvent.type(commandInput, 'Test Command');
      await userEvent.keyboard('{Enter}');
      
      expect(handleCommand).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard navigation in command list', async () => {
      const mockCommands = [
        { id: '1', label: 'Command 1', action: 'test1' },
        { id: '2', label: 'Command 2', action: 'test2' },
        { id: '3', label: 'Command 3', action: 'test3' }
      ];
      
      render(
        <TestWrapper>
          <CommandNavLayout commands={mockCommands}>
            <div>Content</div>
          </CommandNavLayout>
        </TestWrapper>
      );
      
      const commandInput = screen.getByRole('textbox', { name: 'Command input' });
      commandInput.focus();
      
      await userEvent.keyboard('{ArrowDown}');
      expect(screen.getByText('Command 1')).toHaveClass('command-item--selected');
      
      await userEvent.keyboard('{ArrowDown}');
      expect(screen.getByText('Command 2')).toHaveClass('command-item--selected');
      
      await userEvent.keyboard('{ArrowUp}');
      expect(screen.getByText('Command 1')).toHaveClass('command-item--selected');
    });

    it('displays recent commands and shortcuts', () => {
      const recentCommands = [
        { id: '1', label: 'Recently Used Command', timestamp: Date.now() - 1000 }
      ];
      
      render(
        <TestWrapper>
          <CommandNavLayout recentCommands={recentCommands}>
            <div>Content</div>
          </CommandNavLayout>
        </TestWrapper>
      );
      
      expect(screen.getByText('Recent')).toBeInTheDocument();
      expect(screen.getByText('Recently Used Command')).toBeInTheDocument();
    });
  });

  describe('Layout Responsiveness', () => {
    it('adapts to different screen sizes', () => {
      const { rerender } = render(
        <TestWrapper>
          <AppLayout>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      // Desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      fireEvent(window, new Event('resize'));
      
      expect(screen.getByTestId('app-layout')).toHaveClass('app-layout--desktop');
      
      // Tablet
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
      fireEvent(window, new Event('resize'));
      
      expect(screen.getByTestId('app-layout')).toHaveClass('app-layout--tablet');
      
      // Mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      fireEvent(window, new Event('resize'));
      
      expect(screen.getByTestId('app-layout')).toHaveClass('app-layout--mobile');
    });

    it('handles orientation changes on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      render(
        <TestWrapper>
          <AppLayout>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      // Simulate orientation change to landscape
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 667,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      fireEvent(window, new Event('orientationchange'));
      
      expect(screen.getByTestId('app-layout')).toHaveClass('app-layout--landscape');
    });
  });

  describe('Layout Accessibility', () => {
    it('provides proper ARIA landmarks', () => {
      render(
        <TestWrapper>
          <AppLayout>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('navigation')).toBeInTheDocument(); // sidebar nav
      expect(screen.getByRole('main')).toBeInTheDocument(); // main content
    });

    it('supports screen reader announcements', async () => {
      render(
        <TestWrapper>
          <AppLayout>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      const announcement = screen.getByRole('status', { hidden: true });
      expect(announcement).toBeInTheDocument();
      expect(announcement).toHaveAttribute('aria-live', 'polite');
    });

    it('manages focus correctly during navigation', async () => {
      render(
        <TestWrapper>
          <AppLayout>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      const mainContent = screen.getByRole('main');
      const skipLink = screen.getByText('Skip to main content');
      
      await userEvent.click(skipLink);
      expect(mainContent).toHaveFocus();
    });

    it('provides keyboard navigation for all interactive elements', async () => {
      render(
        <TestWrapper>
          <TopNavLayout>
            <div>Content</div>
          </TopNavLayout>
        </TestWrapper>
      );
      
      const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });
      menuButton.focus();
      
      await userEvent.keyboard('{Enter}');
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Layout Performance', () => {
    it('implements lazy loading for sidebar components', async () => {
      render(
        <TestWrapper>
          <AppLayout>
            <div>Content</div>
          </AppLayout>
        </TestWrapper>
      );
      
      const sidebar = screen.getByTestId('app-sidebar');
      expect(sidebar).toHaveAttribute('data-lazy-loaded', 'false');
      
      // Simulate user interaction that triggers lazy loading
      const toggleButton = screen.getByRole('button', { name: 'Toggle sidebar' });
      await userEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(sidebar).toHaveAttribute('data-lazy-loaded', 'true');
      });
    });

    it('memoizes layout components correctly', () => {
      const { rerender } = render(
        <TestWrapper>
          <AppLayout>
            <div>Content 1</div>
          </AppLayout>
        </TestWrapper>
      );
      
      const initialSidebar = screen.getByTestId('app-sidebar');
      
      rerender(
        <TestWrapper>
          <AppLayout>
            <div>Content 2</div>
          </AppLayout>
        </TestWrapper>
      );
      
      const updatedSidebar = screen.getByTestId('app-sidebar');
      expect(initialSidebar).toBe(updatedSidebar); // Should be memoized
    });
  });
});