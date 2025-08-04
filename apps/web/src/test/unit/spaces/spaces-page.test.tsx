import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SpacesPage from '../../../app/(dashboard)/spaces/page';

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

// Mock HIVE UI components
vi.mock('@hive/ui', () => ({
  HiveCard: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="space-card" {...props}>{children}</div>
  ),
  HiveButton: ({ children, onClick, disabled, variant, size, className, leftIcon, ...props }: any) => (
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
  HiveInput: ({ value, onChange, placeholder, className, ...props }: any) => (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      data-testid="search-input"
      {...props}
    />
  ),
  HiveBadge: ({ children, variant, className, ...props }: any) => (
    <span className={className} data-variant={variant} {...props}>{children}</span>
  ),
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
global.fetch = vi.fn();

describe('SpacesPage', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
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
        expect(screen.getByText('Discover Spaces')).toBeInTheDocument();
        expect(screen.getByText('CS Study Group')).toBeInTheDocument();
        expect(screen.getByText('Math Tutoring Hub')).toBeInTheDocument();
        expect(screen.getByText('Campus Events')).toBeInTheDocument();
      });
    });

    it('displays space information correctly', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('24 members')).toBeInTheDocument();
        expect(screen.getByText('Academic')).toBeInTheDocument();
        expect(screen.getByText('computer-science')).toBeInTheDocument();
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
      render(<SpacesPage />);

      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'math' } });

      await waitFor(() => {
        expect(screen.getByText('Math Tutoring Hub')).toBeInTheDocument();
        expect(screen.queryByText('CS Study Group')).not.toBeInTheDocument();
      });
    });

    it('filters spaces by category', async () => {
      render(<SpacesPage />);

      const academicFilter = screen.getByText('Academic');
      fireEvent.click(academicFilter);

      await waitFor(() => {
        expect(screen.getByText('CS Study Group')).toBeInTheDocument();
        expect(screen.getByText('Math Tutoring Hub')).toBeInTheDocument();
        expect(screen.queryByText('Campus Events')).not.toBeInTheDocument();
      });
    });

    it('filters spaces by tags', async () => {
      render(<SpacesPage />);

      const programmingTag = screen.getByText('programming');
      fireEvent.click(programmingTag);

      await waitFor(() => {
        expect(screen.getByText('CS Study Group')).toBeInTheDocument();
        expect(screen.queryByText('Math Tutoring Hub')).not.toBeInTheDocument();
      });
    });

    it('shows recommendations section', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('Recommended for You')).toBeInTheDocument();
        expect(screen.getByText('Based on your interests and activity')).toBeInTheDocument();
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

      await waitFor(() => {
        const joinButton = screen.getByText('Join Space');
        fireEvent.click(joinButton);
      });

      expect(fetch).toHaveBeenCalledWith('/api/spaces/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId: 'cs-study-group' }),
      });
    });

    it('navigates to space page when clicked', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        const spaceCard = screen.getByText('CS Study Group');
        fireEvent.click(spaceCard);
      });

      expect(mockPush).toHaveBeenCalledWith('/spaces/cs-study-group');
    });

    it('handles space joining errors', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Space is full' }),
      } as Response);

      render(<SpacesPage />);

      await waitFor(() => {
        const joinButton = screen.getByText('Join Space');
        fireEvent.click(joinButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Space is full')).toBeInTheDocument();
      });
    });
  });

  describe('Space Creation', () => {
    it('shows create space button', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('Create Space')).toBeInTheDocument();
      });
    });

    it('opens create space modal', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        const createButton = screen.getByText('Create Space');
        fireEvent.click(createButton);
      });

      expect(screen.getByText('Create New Space')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Space name')).toBeInTheDocument();
    });

    it('handles space creation', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ 
          success: true, 
          spaceId: 'new-space-123',
          message: 'Space created successfully' 
        }),
      } as Response);

      render(<SpacesPage />);

      await waitFor(() => {
        const createButton = screen.getByText('Create Space');
        fireEvent.click(createButton);
      });

      const nameInput = screen.getByPlaceholderText('Space name');
      const descriptionInput = screen.getByPlaceholderText('Space description');
      const submitButton = screen.getByText('Create Space');

      fireEvent.change(nameInput, { target: { value: 'New Study Group' } });
      fireEvent.change(descriptionInput, { target: { value: 'A new study group for chemistry' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/spaces', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'New Study Group',
            description: 'A new study group for chemistry',
          }),
        });
      });
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
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Failed to load spaces' }),
      } as Response);

      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('Failed to load spaces')).toBeInTheDocument();
        expect(screen.getByText('Try Again')).toBeInTheDocument();
      });
    });

    it('allows retry when loading fails', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'Network error' }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, spaces: mockSpaces }),
        } as Response);

      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });

      const retryButton = screen.getByText('Try Again');
      fireEvent.click(retryButton);

      await waitFor(() => {
        expect(screen.getByText('CS Study Group')).toBeInTheDocument();
      });
    });
  });

  describe('Empty States', () => {
    it('shows empty state when no spaces found', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, spaces: [] }),
      } as Response);

      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('No spaces found')).toBeInTheDocument();
        expect(screen.getByText('Be the first to create a space for your community')).toBeInTheDocument();
      });
    });

    it('shows no results for search', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      });

      await waitFor(() => {
        expect(screen.getByText('No spaces match your search')).toBeInTheDocument();
        expect(screen.getByText('Try different keywords or browse all spaces')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labels and roles', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(screen.getByLabelText('Search spaces')).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(4); // Join buttons + Create button
      });
    });

    it('supports keyboard navigation', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        const searchInput = screen.getByTestId('search-input');
        const createButton = screen.getByText('Create Space');
        
        searchInput.focus();
        expect(searchInput).toHaveFocus();

        createButton.focus();
        expect(createButton).toHaveFocus();
      });
    });
  });

  describe('Performance', () => {
    it('renders efficiently with many spaces', async () => {
      const manySpaces = Array.from({ length: 100 }, (_, i) => ({
        ...mockSpaces[0],
        id: `space-${i}`,
        name: `Space ${i}`,
      }));

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, spaces: manySpaces }),
      } as Response);

      const startTime = performance.now();
      render(<SpacesPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Space 0')).toBeInTheDocument();
      });
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(200);
    });

    it('implements virtual scrolling for large lists', async () => {
      const manySpaces = Array.from({ length: 1000 }, (_, i) => ({
        ...mockSpaces[0],
        id: `space-${i}`,
        name: `Space ${i}`,
      }));

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, spaces: manySpaces }),
      } as Response);

      render(<SpacesPage />);

      await waitFor(() => {
        // Should only render visible items initially
        const renderedSpaces = screen.getAllByTestId('space-card');
        expect(renderedSpaces.length).toBeLessThan(50);
      });
    });
  });

  describe('Social Proof', () => {
    it('displays social proof information', async () => {
      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('24 members')).toBeInTheDocument();
        expect(screen.getByText('Active 2 hours ago')).toBeInTheDocument();
        expect(screen.getByText('High activity')).toBeInTheDocument();
      });
    });

    it('shows mutual connections in spaces', async () => {
      const spacesWithMutuals = mockSpaces.map(space => ({
        ...space,
        mutualMembers: [
          { name: 'Alice Johnson', avatar: 'https://example.com/alice.jpg' },
          { name: 'Bob Smith', avatar: null },
        ],
      }));

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, spaces: spacesWithMutuals }),
      } as Response);

      render(<SpacesPage />);

      await waitFor(() => {
        expect(screen.getByText('Alice Johnson and Bob Smith are members')).toBeInTheDocument();
      });
    });
  });
});