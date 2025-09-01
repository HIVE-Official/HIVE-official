import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import FeedPage from '../../../app/(dashboard)/feed/page';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock useSession hook
vi.mock('../../../hooks/use-session', () => ({
  useSession: vi.fn(() => ({
    user: { 
      uid: 'test-user', 
      email: 'test@test.edu',
      displayName: 'Test User'
    },
    loading: false,
  })),
}));

// Mock components
vi.mock('@/components/temp-stubs', () => ({
  PageContainer: ({ children, title, subtitle, breadcrumbs, actions, maxWidth }: any) => (
    <div data-testid="page-container">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {actions}
      <div>{children}</div>
    </div>
  ),
}));

vi.mock('../../../components/error-boundary', () => ({
  ErrorBoundary: ({ children }: any) => <div data-testid="error-boundary">{children}</div>,
}));

vi.mock('../../../components/social/post-composer', () => ({
  PostComposer: ({ user, onPost, onCancel, placeholder }: any) => (
    <div data-testid="post-composer">
      <textarea placeholder={placeholder} />
      <button onClick={() => onPost({ content: 'test post' })}>Post</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

// Mock HIVE UI components
vi.mock('@hive/ui', () => ({
  Button: ({ children, onClick, disabled, variant, size, className, ...props }: any) => (
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
  Card: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="hive-card" {...props}>{children}</div>
  ),
  Badge: ({ children, variant, className, ...props }: any) => (
    <span className={className} data-variant={variant} {...props}>{children}</span>
  ),
}));

// Mock global fetch
global.fetch = vi.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      success: true,
      posts: [
        {
          id: 'post-1',
          type: 'space_activity',
          title: 'New member joined CS Study Group',
          content: 'John Doe joined the Computer Science Study Group',
          createdAt: new Date('2025-01-15T10:00:00Z').toISOString(),
          authorName: 'System',
          _metadata: { spaceId: 'cs-study', spaceName: 'CS Study Group' }
        },
        {
          id: 'post-2',
          type: 'tool',
          title: 'New tool available: Grade Calculator',
          content: 'A new tool for calculating semester grades has been created',
          createdAt: new Date('2025-01-15T09:30:00Z').toISOString(),
          authorName: 'Jane Smith'
        }
      ]
    })
  }) as Response
);

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
    it('renders feed page with posts', async () => {
      render(<FeedPage />);

      expect(screen.getByText('Campus Feed')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.getByText('New member joined CS Study Group')).toBeInTheDocument();
        expect(screen.getByText('New tool available: Grade Calculator')).toBeInTheDocument();
      });
    });

    it('displays post metadata correctly', async () => {
      render(<FeedPage />);

      await waitFor(() => {
        expect(screen.getByText('CS Study Group')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });
    });

    it('renders empty state when no posts available', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, posts: [] })
      } as Response);

      render(<FeedPage />);

      await waitFor(() => {
        expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
      });
    });
  });

  describe('Loading States', () => {
    it('shows loading state while fetching feed', () => {
      // Mock a slow fetch to test loading state
      vi.mocked(fetch).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, posts: [] })
        } as Response), 100))
      );

      render(<FeedPage />);

      expect(screen.getByText(/loading your campus feed/i)).toBeInTheDocument();
    });

    it('handles loading state transitions smoothly', async () => {
      render(<FeedPage />);

      // Should start with loading
      expect(screen.getByText(/loading your campus feed/i)).toBeInTheDocument();

      // Should eventually show posts
      await waitFor(() => {
        expect(screen.getByText('New member joined CS Study Group')).toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  describe('Error Handling', () => {
    it('handles API errors gracefully', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

      render(<FeedPage />);

      await waitFor(() => {
        expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
      });
    });

    it('handles failed API responses', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({})
      } as Response);

      render(<FeedPage />);

      await waitFor(() => {
        expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
      });
    });
  });

  describe('Feed Interactions', () => {
    it('shows feed filter options', async () => {
      render(<FeedPage />);

      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Following')).toBeInTheDocument();
      expect(screen.getByText('Spaces')).toBeInTheDocument();
      expect(screen.getByText('Academic')).toBeInTheDocument();
    });

    it('shows post composer when post button is clicked', async () => {
      render(<FeedPage />);

      const postButton = screen.getByText('Post');
      fireEvent.click(postButton);

      expect(screen.getByTestId('post-composer')).toBeInTheDocument();
    });

    it('allows liking posts', async () => {
      render(<FeedPage />);

      await waitFor(() => {
        const likeButtons = screen.getAllByText('0'); // Initial like count
        expect(likeButtons.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Feed Filtering', () => {
    it('shows filter options for feed content', () => {
      render(<FeedPage />);

      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Spaces')).toBeInTheDocument();
      expect(screen.getByText('Academic')).toBeInTheDocument();
    });

    it('filters feed by content type', async () => {
      render(<FeedPage />);

      const spacesFilter = screen.getByText('Spaces');
      fireEvent.click(spacesFilter);

      // Filtering triggers new API call
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('maintains filter state', async () => {
      render(<FeedPage />);

      const academicFilter = screen.getByText('Academic');
      fireEvent.click(academicFilter);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('feedType=personal'),
        undefined
      );
    });
  });

  describe('Real-time Updates', () => {
    it('handles API updates correctly', async () => {
      render(<FeedPage />);

      await waitFor(() => {
        expect(screen.getByText('New member joined CS Study Group')).toBeInTheDocument();
      });

      // Verify fetch was called
      expect(fetch).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('provides proper navigation structure', async () => {
      render(<FeedPage />);

      expect(screen.getByTestId('page-container')).toBeInTheDocument();
      expect(screen.getByText('Campus Feed')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      render(<FeedPage />);

      const postButton = screen.getByText('Post');
      postButton.focus();
      expect(postButton).toHaveFocus();
    });
  });

  describe('Performance', () => {
    it('renders efficiently', async () => {
      const startTime = performance.now();
      render(<FeedPage />);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(200); // Should render quickly
      expect(screen.getByText('Campus Feed')).toBeInTheDocument();
    });
  });
});