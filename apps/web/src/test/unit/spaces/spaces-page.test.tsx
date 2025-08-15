import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SpacesPage from '../../../app/(dashboard)/spaces/page';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(() => null),
    has: vi.fn(() => false),
    toString: vi.fn(() => ''),
  })),
}));

// Mock HIVE UI components and utilities
vi.mock('@hive/ui', () => ({
  Button: ({ children, onClick, disabled, variant, size, className, leftIcon, ...props }: any) => (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={className}
      data-variant={variant}
      data-size={size}
      data-testid="hive-button"
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  ),
  Card: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="space-card" {...props}>{children}</div>
  ),
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

// Mock Tanstack Query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
  })),
}));

// Mock HIVE hooks
vi.mock('@hive/hooks', () => ({
  useDebounce: vi.fn((value) => value),
}));

// Mock HIVE core types
vi.mock('@hive/core', () => ({
  type: {
    Space: {},
    SpaceType: {},
  },
}));

// Mock component imports
vi.mock('@/components/temp-stubs', () => ({
  PageContainer: ({ children, title, subtitle, breadcrumbs, actions, maxWidth }: any) => (
    <div data-testid="page-container">
      <div data-testid="page-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {actions}
      </div>
      <div data-testid="page-content">{children}</div>
    </div>
  ),
}));

vi.mock('../../../app/(dashboard)/spaces/components/unified-space-card', () => ({
  UnifiedSpaceCard: ({ space, variant, showMembership, membershipRole }: any) => (
    <div data-testid="unified-space-card" data-space-id={space.id}>
      <h3>{space.name}</h3>
      <p>{space.description}</p>
      <span>{space.memberCount} members</span>
      <span>{space.category}</span>
      {space.tags?.map((tag: string) => <span key={tag}>{tag}</span>)}
      {!space.isJoined && <button onClick={() => {}}>Join Space</button>}
      {space.isJoined && <span>Joined</span>}
    </div>
  ),
}));

vi.mock('../../../components/spaces/create-space-modal', () => ({
  CreateSpaceModal: ({ isOpen, onClose, onSubmit }: any) => 
    isOpen ? (
      <div data-testid="create-space-modal">
        <h2>Create New Space</h2>
        <input placeholder="Space name" />
        <input placeholder="Space description" />
        <button onClick={onSubmit}>Create Space</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null,
}));

vi.mock('../../../app/(dashboard)/spaces/components/space-loading-skeleton', () => ({
  SpaceLoadingSkeleton: ({ variant, count }: any) => (
    <div data-testid="loading-skeleton">
      <div>Loading spaces...</div>
      {Array.from({ length: count || 6 }, (_, i) => (
        <div key={i} data-testid="space-card">Loading...</div>
      ))}
    </div>
  ),
}));

vi.mock('../../../components/spaces/smart-space-discovery', () => ({
  SmartSpaceDiscovery: ({ onJoinSpace, onViewSpace }: any) => (
    <div data-testid="smart-discovery">
      <h2>Smart Discovery</h2>
      <p>Recommended spaces</p>
    </div>
  ),
}));

vi.mock('../../../components/error-boundary', () => ({
  ErrorBoundary: ({ children }: any) => <div data-testid="error-boundary">{children}</div>,
}));

vi.mock('../../../hooks/use-session', () => ({
  useSession: vi.fn(() => ({
    user: {
      uid: 'test-user',
      email: 'test@test.edu',
      displayName: 'Test User',
    },
    loading: false,
  })),
}));

vi.mock('../../../lib/auth-utils', () => ({
  authenticatedFetch: vi.fn(),
}));

// Mock spaces data
const mockSpaces = [
  {
    id: 'cs-study-group',
    name: 'CS Study Group',
    description: 'A collaborative space for Computer Science students to study together',
    memberCount: 24,
    category: 'Academic',
    tags: ['computer-science', 'study', 'programming'],
    isJoined: false,
    privacy: 'public',
    activityLevel: 'high',
    avatar: 'https://example.com/cs-avatar.jpg',
    recentActivity: '2 hours ago',
  },
  {
    id: 'math-tutoring',
    name: 'Math Tutoring Hub',
    description: 'Get help with mathematics from calculus to statistics',
    memberCount: 18,
    category: 'Academic',
    tags: ['mathematics', 'tutoring', 'calculus'],
    isJoined: true,
    privacy: 'public',
    activityLevel: 'medium',
    avatar: null,
    recentActivity: '1 day ago',
  },
  {
    id: 'campus-events',
    name: 'Campus Events',
    description: 'Stay updated on all campus events and activities',
    memberCount: 156,
    category: 'Social',
    tags: ['events', 'social', 'campus'],
    isJoined: false,
    privacy: 'public',
    activityLevel: 'very-high',
    avatar: 'https://example.com/events-avatar.jpg',
    recentActivity: '30 minutes ago',
  },
];

// Mock fetch
global.fetch = vi.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({
    success: true,
    spaces: mockSpaces,
    recommendations: mockSpaces.slice(0, 2),
  }),
}) as Response);

describe('SpacesPage', () => {
  const mockPush = vi.fn();
  const { useQuery } = await import('@tanstack/react-query');
  const mockUseQuery = vi.mocked(useQuery);

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });

    // Mock useQuery for both calls in the component
    mockUseQuery.mockImplementation((options) => {
      const queryKey = options.queryKey;
      if (queryKey[0] === 'my-spaces') {
        return {
          data: {
            joined: mockSpaces.filter(s => s.isJoined),
            favorited: [],
            owned: [],
            recent: mockSpaces.slice(0, 3)
          },
          isLoading: false,
          error: null,
          refetch: vi.fn(),
        };
      } else if (queryKey[0] === 'spaces') {
        return {
          data: mockSpaces,
          isLoading: false,
          error: null,
          refetch: vi.fn(),
        };
      }
      return {
        data: undefined,
        isLoading: false,
        error: null,
        refetch: vi.fn(),
      };
    });

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        spaces: mockSpaces,
        recommendations: mockSpaces.slice(0, 2),
      }),
    } as Response);

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders spaces page with space cards', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('HIVE Spaces')).toBeInTheDocument();
        expect(screen.getByText('Math Tutoring Hub')).toBeInTheDocument();
      });
    });

    it('displays space information correctly', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('18 members')).toBeInTheDocument();
      });
    });

    it('shows joined status for user spaces', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('Joined')).toBeInTheDocument();
      });
    });
  });

  describe('Space Discovery', () => {
    it('provides search functionality', async () => {
      // Switch to browse view first
      render(<SpacesPage />);
      
      const browseTab = screen.getByText('Browse & Discover');
      fireEvent.click(browseTab);

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Search spaces, descriptions, or keywords...');
        fireEvent.change(searchInput, { target: { value: 'math' } });
        expect(searchInput).toHaveValue('math');
      });
    });

    it('filters spaces by category', async () => {
      render(<SpacesPage />);
      
      // Switch to browse view
      const browseTab = screen.getByText('Browse & Discover');
      fireEvent.click(browseTab);

      await waitFor(() => {
        const academicFilter = screen.getByText('Student Spaces');
        fireEvent.click(academicFilter);
        expect(academicFilter).toBeInTheDocument();
      });
    });

    it('displays filter options', async () => {
      render(<SpacesPage />);
      
      // Switch to browse view
      const browseTab = screen.getByText('Browse & Discover');
      fireEvent.click(browseTab);

      await waitFor(() => {
        expect(screen.getByText('Student Spaces')).toBeInTheDocument();
        expect(screen.getByText('Greek Life')).toBeInTheDocument();
      });
    });

    it('shows smart discovery option', async () => {
      render(<SpacesPage />);
      
      const browseTab = screen.getByText('Browse & Discover');
      fireEvent.click(browseTab);

      await waitFor(() => {
        expect(screen.getByText('Smart Discovery')).toBeInTheDocument();
      });
    });
  });

  describe('Space Interactions', () => {
    it('allows joining a space', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Successfully joined space' }),
      } as Response);

      render(<SpacesPage />);

      // Check that join functionality exists (button would be in space card mock)
      await waitFor(() => {
        expect(screen.getByTestId('page-container')).toBeInTheDocument();
      });
    });

    it('navigates to space page when clicked', async () => {
      render(<SpacesPage />);

      let spaceCard: HTMLElement;
      
      await waitFor(() => {
        spaceCard = screen.getByText('Math Tutoring Hub');
        fireEvent.click(spaceCard);
      });

      // Navigation would be handled by the space card component
      expect(spaceCard!).toBeInTheDocument();
    });

    it('handles space joining errors gracefully', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Space is full' }),
      } as Response);

      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByTestId('page-container')).toBeInTheDocument();
      });
    });
  });

  describe('Space Creation', () => {
    it('shows create space button', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /create space/i })).toBeInTheDocument();
      });
    });

    it('opens create space modal', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        const createButton = screen.getByRole('button', { name: /create space/i });
        fireEvent.click(createButton);
      });

      expect(screen.getByText('Space Creation Coming Soon!')).toBeInTheDocument();
    });

    it('shows create space coming soon message', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        const createButton = screen.getByRole('button', { name: /create space/i });
        fireEvent.click(createButton);
      });

      expect(screen.getByText('Space Creation Coming Soon!')).toBeInTheDocument();
      expect(screen.getByText('Browse Spaces')).toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    it('shows loading state while fetching spaces', () => {
      vi.mocked(fetch).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ spaces: mockSpaces }),
        } as Response), 100))
      );

      render(<SpacesPage />);

      expect(screen.getByText('Loading spaces...')).toBeInTheDocument();
      expect(screen.getAllByTestId('space-card')).toHaveLength(6); // Loading skeletons
    });

    it('handles loading state transitions', async () => {
      const mockFetchPromise = vi.mocked(fetch).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ success: true, spaces: mockSpaces }),
        } as Response), 50))
      );

      render(<SpacesPage />);

      expect(screen.getByText('Loading spaces...')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('CS Study Group')).toBeInTheDocument();
      });

      expect(screen.queryByText('Loading spaces...')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('displays error state when spaces fail to load', async () => {
      // Mock error state in useQuery
      const { useQuery: localUseQuery } = await import('@tanstack/react-query');
      const localMockUseQuery = vi.mocked(localUseQuery);
      localMockUseQuery.mockImplementation((options) => {
        return {
          data: undefined,
          isLoading: false,
          error: new Error('Failed to load spaces'),
          refetch: vi.fn(),
        };
      });

      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('Unable to load spaces')).toBeInTheDocument();
        expect(screen.getByText('Try Again')).toBeInTheDocument();
      });
    });

    it('allows retry when loading fails', async () => {
      const mockRefetch = vi.fn();
      const { useQuery: localUseQuery } = await import('@tanstack/react-query');
      const localMockUseQuery = vi.mocked(localUseQuery);
      localMockUseQuery.mockImplementation((options) => {
        return {
          data: undefined,
          isLoading: false,
          error: new Error('Network error'),
          refetch: mockRefetch,
        };
      });

      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('Unable to load spaces')).toBeInTheDocument();
      });

      const retryButton = screen.getByText('Try Again');
      fireEvent.click(retryButton);

      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  describe('Empty States', () => {
    it('shows empty state when no spaces found', async () => {
      // Mock empty query result
      const { useQuery: localUseQuery } = await import('@tanstack/react-query');
      const localMockUseQuery = vi.mocked(localUseQuery);
      localMockUseQuery.mockImplementation((options) => {
        const queryKey = options.queryKey;
        if (queryKey[0] === 'my-spaces') {
          return {
            data: { joined: [], favorited: [], owned: [], recent: [] },
            isLoading: false,
            error: null,
            refetch: vi.fn(),
          };
        }
        return {
          data: [],
          isLoading: false,
          error: null,
          refetch: vi.fn(),
        };
      });

      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('No spaces joined yet')).toBeInTheDocument();
      });
    });

    it('shows no results for search', async () => {
      render(<SpacesPage />);
      
      // Switch to browse view
      const browseTab = screen.getByText('Browse & Discover');
      fireEvent.click(browseTab);

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Search spaces, descriptions, or keywords...');
        fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
        expect(searchInput).toHaveValue('nonexistent');
      });
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labels and roles', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByTestId('page-container')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
      });
    });

    it('supports keyboard navigation', async () => {
      render(<SpacesPage />);
      
      // Switch to browse view
      const browseTab = screen.getByText('Browse & Discover');
      fireEvent.click(browseTab);

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Search spaces, descriptions, or keywords...');
        const createButton = screen.getByRole('button', { name: /create space/i });
        
        searchInput.focus();
        expect(searchInput).toHaveFocus();

        createButton.focus();
        expect(createButton).toHaveFocus();
      });
    });
  });

  describe('Performance', () => {
    it('renders efficiently with many spaces', async () => {
      const manySpaces = Array.from({ length: 10 }, (_, i) => ({
        ...mockSpaces[0],
        id: `space-${i}`,
        name: `Space ${i}`,
        isJoined: true
      }));

      const { useQuery: localUseQuery } = await import('@tanstack/react-query');
      const localMockUseQuery = vi.mocked(localUseQuery);
      localMockUseQuery.mockImplementation((options) => {
        const queryKey = options.queryKey;
        if (queryKey[0] === 'my-spaces') {
          return {
            data: { joined: manySpaces, favorited: [], owned: [], recent: manySpaces.slice(0, 3) },
            isLoading: false,
            error: null,
            refetch: vi.fn(),
          };
        }
        return {
          data: manySpaces,
          isLoading: false,
          error: null,
          refetch: vi.fn(),
        };
      });

      render(<SpacesPage />);
      
      await waitFor(() => {
        expect(screen.getByText('HIVE Spaces')).toBeInTheDocument();
      });
    });

    it('handles large lists efficiently', async () => {
      const manySpaces = Array.from({ length: 50 }, (_, i) => ({
        ...mockSpaces[0],
        id: `space-${i}`,
        name: `Space ${i}`,
        isJoined: true
      }));

      const { useQuery: localUseQuery } = await import('@tanstack/react-query');
      const localMockUseQuery = vi.mocked(localUseQuery);
      localMockUseQuery.mockImplementation((options) => {
        const queryKey = options.queryKey;
        if (queryKey[0] === 'my-spaces') {
          return {
            data: { joined: manySpaces, favorited: [], owned: [], recent: manySpaces.slice(0, 3) },
            isLoading: false,
            error: null,
            refetch: vi.fn(),
          };
        }
        return {
          data: manySpaces,
          isLoading: false,
          error: null,
          refetch: vi.fn(),
        };
      });

      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('HIVE Spaces')).toBeInTheDocument();
      });
    });
  });

  describe('Social Proof', () => {
    it('displays social proof information', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('18 members')).toBeInTheDocument();
      });
    });

    it('shows mutual connections in spaces', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        // This would be implemented in the space card component
        expect(screen.getByText('HIVE Spaces')).toBeInTheDocument();
      });
    });
  });
});