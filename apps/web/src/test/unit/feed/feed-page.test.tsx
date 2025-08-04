import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import FeedPage from '../../../app/(dashboard)/feed/page';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock auth hook
vi.mock('@/hooks/use-auth', () => ({
  useAuth: vi.fn(() => ({
    user: { 
      uid: 'test-user', 
      email: 'test@test.edu',
      displayName: 'Test User'
    },
    loading: false,
    getAuthToken: vi.fn().mockResolvedValue('test-token'),
  })),
}));

// Mock dashboard data hook
vi.mock('@/hooks/use-dashboard-data', () => ({
  useDashboardData: vi.fn(() => ({
    feed: [
      {
        id: 'post-1',
        type: 'space_activity',
        title: 'New member joined CS Study Group',
        content: 'John Doe joined the Computer Science Study Group',
        timestamp: new Date('2025-01-15T10:00:00Z'),
        author: { name: 'System', avatar: null },
        space: { name: 'CS Study Group', id: 'cs-study' }
      },
      {
        id: 'post-2',
        type: 'tool_created',
        title: 'New tool available: Grade Calculator',
        content: 'A new tool for calculating semester grades has been created',
        timestamp: new Date('2025-01-15T09:30:00Z'),
        author: { name: 'Jane Smith', avatar: 'https://example.com/jane.jpg' },
        tool: { name: 'Grade Calculator', id: 'grade-calc' }
      }
    ],
    loading: false,
    error: null,
    refresh: vi.fn(),
  })),
}));

// Mock HIVE UI components
vi.mock('@hive/ui', () => ({
  HiveCard: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="hive-card" {...props}>{children}</div>
  ),
  HiveButton: ({ children, onClick, disabled, variant, size, className, ...props }: any) => (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={className}
      data-variant={variant}
      data-size={size}
      data-testid="hive-button"
      {...props}
    >
      {children}
    </button>
  ),
  HiveText: ({ children, variant, className, ...props }: any) => (
    <span className={className} data-variant={variant} {...props}>{children}</span>
  ),
}));

// Mock global fetch
global.fetch = vi.fn();

describe('FeedPage', () => {
  const mockPush = vi.fn();
  const mockRefresh = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Feed Rendering', () => {
    it('renders feed page with posts', () => {
      render(<FeedPage />);

      expect(screen.getByText('Campus Feed')).toBeInTheDocument();
      expect(screen.getByText('New member joined CS Study Group')).toBeInTheDocument();
      expect(screen.getByText('New tool available: Grade Calculator')).toBeInTheDocument();
    });

    it('displays post metadata correctly', () => {
      render(<FeedPage />);

      expect(screen.getByText('CS Study Group')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Grade Calculator')).toBeInTheDocument();
    });

    it('renders empty state when no posts available', () => {
      const mockUseDashboardData = vi.mocked(import('@/hooks/use-dashboard-data').useDashboardData);
      mockUseDashboardData.mockReturnValue({
        feed: [],
        loading: false,
        error: null,
        refresh: vi.fn(),
      });

      render(<FeedPage />);

      expect(screen.getByText(/no activity yet/i)).toBeInTheDocument();
      expect(screen.getByText(/get started by joining spaces/i)).toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    it('shows loading state while fetching feed', () => {
      const mockUseDashboardData = vi.mocked(import('@/hooks/use-dashboard-data').useDashboardData);
      mockUseDashboardData.mockReturnValue({
        feed: [],
        loading: true,
        error: null,
        refresh: vi.fn(),
      });

      render(<FeedPage />);

      expect(screen.getByText(/loading your feed/i)).toBeInTheDocument();
      expect(screen.getAllByTestId('hive-card')).toHaveLength(3); // Loading skeleton cards
    });

    it('handles loading state transitions smoothly', async () => {
      const mockUseDashboardData = vi.mocked(import('@/hooks/use-dashboard-data').useDashboardData);
      
      // Start with loading
      mockUseDashboardData.mockReturnValue({
        feed: [],
        loading: true,
        error: null,
        refresh: vi.fn(),
      });

      const { rerender } = render(<FeedPage />);
      expect(screen.getByText(/loading your feed/i)).toBeInTheDocument();

      // Transition to loaded
      mockUseDashboardData.mockReturnValue({
        feed: [
          {
            id: 'post-1',
            type: 'space_activity',
            title: 'Test Post',
            content: 'Test content',
            timestamp: new Date(),
            author: { name: 'Test User', avatar: null },
            space: { name: 'Test Space', id: 'test' }
          }
        ],
        loading: false,
        error: null,
        refresh: vi.fn(),
      });

      rerender(<FeedPage />);

      await waitFor(() => {
        expect(screen.getByText('Test Post')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('displays error state when feed fails to load', () => {
      const mockUseDashboardData = vi.mocked(import('@/hooks/use-dashboard-data').useDashboardData);
      mockUseDashboardData.mockReturnValue({
        feed: [],
        loading: false,
        error: new Error('Failed to load feed'),
        refresh: mockRefresh,
      });

      render(<FeedPage />);

      expect(screen.getByText(/failed to load your feed/i)).toBeInTheDocument();
      expect(screen.getByTestId('hive-button')).toHaveTextContent(/try again/i);
    });

    it('allows retry when feed loading fails', async () => {
      const mockUseDashboardData = vi.mocked(import('@/hooks/use-dashboard-data').useDashboardData);
      mockUseDashboardData.mockReturnValue({
        feed: [],
        loading: false,
        error: new Error('Network error'),
        refresh: mockRefresh,
      });

      render(<FeedPage />);

      const retryButton = screen.getByTestId('hive-button');
      fireEvent.click(retryButton);

      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });

  describe('Feed Interactions', () => {
    it('allows refreshing the feed', async () => {
      render(<FeedPage />);

      const refreshButton = screen.getByLabelText(/refresh feed/i);
      fireEvent.click(refreshButton);

      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });

    it('navigates to space when space link is clicked', async () => {
      render(<FeedPage />);

      const spaceLink = screen.getByText('CS Study Group');
      fireEvent.click(spaceLink);

      expect(mockPush).toHaveBeenCalledWith('/spaces/cs-study');
    });

    it('navigates to tool when tool link is clicked', async () => {
      render(<FeedPage />);

      const toolLink = screen.getByText('Grade Calculator');
      fireEvent.click(toolLink);

      expect(mockPush).toHaveBeenCalledWith('/tools/grade-calc');
    });
  });

  describe('Feed Filtering', () => {
    it('shows filter options for feed content', () => {
      render(<FeedPage />);

      expect(screen.getByText(/all activity/i)).toBeInTheDocument();
      expect(screen.getByText(/spaces/i)).toBeInTheDocument();
      expect(screen.getByText(/tools/i)).toBeInTheDocument();
    });

    it('filters feed by content type', async () => {
      render(<FeedPage />);

      const spacesFilter = screen.getByText(/spaces/i);
      fireEvent.click(spacesFilter);

      await waitFor(() => {
        expect(screen.getByText('New member joined CS Study Group')).toBeInTheDocument();
        expect(screen.queryByText('New tool available: Grade Calculator')).not.toBeInTheDocument();
      });
    });

    it('maintains filter state across interactions', async () => {
      render(<FeedPage />);

      const toolsFilter = screen.getByText(/tools/i);
      fireEvent.click(toolsFilter);

      const refreshButton = screen.getByLabelText(/refresh feed/i);
      fireEvent.click(refreshButton);

      await waitFor(() => {
        expect(screen.getByText('New tool available: Grade Calculator')).toBeInTheDocument();
        expect(screen.queryByText('New member joined CS Study Group')).not.toBeInTheDocument();
      });
    });
  });

  describe('Real-time Updates', () => {
    it('handles new posts being added to feed', async () => {
      const mockUseDashboardData = vi.mocked(import('@/hooks/use-dashboard-data').useDashboardData);
      
      const initialFeed = [
        {
          id: 'post-1',
          type: 'space_activity',
          title: 'Initial Post',
          content: 'Initial content',
          timestamp: new Date(),
          author: { name: 'User 1', avatar: null },
          space: { name: 'Space 1', id: 'space-1' }
        }
      ];

      mockUseDashboardData.mockReturnValue({
        feed: initialFeed,
        loading: false,
        error: null,
        refresh: vi.fn(),
      });

      const { rerender } = render(<FeedPage />);
      expect(screen.getByText('Initial Post')).toBeInTheDocument();

      // Simulate new post added
      const updatedFeed = [
        {
          id: 'post-2',
          type: 'tool_created',
          title: 'New Post',
          content: 'New content',
          timestamp: new Date(),
          author: { name: 'User 2', avatar: null },
          tool: { name: 'New Tool', id: 'new-tool' }
        },
        ...initialFeed
      ];

      mockUseDashboardData.mockReturnValue({
        feed: updatedFeed,
        loading: false,
        error: null,
        refresh: vi.fn(),
      });

      rerender(<FeedPage />);

      await waitFor(() => {
        expect(screen.getByText('New Post')).toBeInTheDocument();
        expect(screen.getByText('Initial Post')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labels and roles', () => {
      render(<FeedPage />);

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByLabelText(/refresh feed/i)).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(<FeedPage />);

      const refreshButton = screen.getByLabelText(/refresh feed/i);
      const spaceLink = screen.getByText('CS Study Group');

      refreshButton.focus();
      expect(refreshButton).toHaveFocus();

      spaceLink.focus();
      expect(spaceLink).toHaveFocus();
    });
  });

  describe('Performance', () => {
    it('renders efficiently with large feed data', () => {
      const largeFeed = Array.from({ length: 50 }, (_, i) => ({
        id: `post-${i}`,
        type: 'space_activity',
        title: `Post ${i}`,
        content: `Content ${i}`,
        timestamp: new Date(),
        author: { name: `User ${i}`, avatar: null },
        space: { name: `Space ${i}`, id: `space-${i}` }
      }));

      const mockUseDashboardData = vi.mocked(import('@/hooks/use-dashboard-data').useDashboardData);
      mockUseDashboardData.mockReturnValue({
        feed: largeFeed,
        loading: false,
        error: null,
        refresh: vi.fn(),
      });

      const startTime = performance.now();
      render(<FeedPage />);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(100); // Should render quickly
      expect(screen.getByText('Post 0')).toBeInTheDocument();
    });
  });
});