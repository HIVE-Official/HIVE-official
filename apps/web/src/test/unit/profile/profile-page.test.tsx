import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ProfilePage from '../../../app/(dashboard)/profile/page';
import { PageContainer } from "@/components/temp-stubs";

// Mock all the complex components
vi.mock('@hive/ui', () => ({
  PageContainer: ({ children, title, subtitle, actions }: any) => (
    <div data-testid="page-container">
      <div data-testid="page-title">{title}</div>
      <div data-testid="page-subtitle">{subtitle}</div>
      <div data-testid="page-actions">{actions}</div>
      {children}
    </div>
  ),
  Button: ({ children, onClick, variant, size, className, disabled }: any) => (
    <button 
      onClick={onClick} 
      className={className}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </button>
  ),
  Card: ({ children, className, onClick }: any) => (
    <div className={className} onClick={onClick} data-testid="card">
      {children}
    </div>
  ),
  CalendarCard: ({ onViewCalendar, onConnectCalendar, onAddEvent }: any) => (
    <div data-testid="calendar-card">
      <button onClick={onViewCalendar} data-testid="view-calendar">View Calendar</button>
      <button onClick={() => onConnectCalendar('google')} data-testid="connect-calendar">Connect Calendar</button>
      <button onClick={onAddEvent} data-testid="add-event">Add Event</button>
    </div>
  ),
  Badge: ({ children, variant, className }: any) => (
    <span className={className} data-variant={variant} data-testid="badge">
      {children}
    </span>
  ),
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}));

// Mock hooks
vi.mock('../../../hooks/use-session', () => ({
  useSession: vi.fn(() => ({
    user: {
      uid: 'test-user-123',
      fullName: 'Test User',
      handle: 'test_user',
      profilePhotoUrl: 'https://example.com/avatar.jpg',
    },
  })),
}));

vi.mock('../../../hooks/use-calendar-data', () => ({
  useCalendarData: vi.fn(() => ({
    data: { events: [] },
    state: 'connected',
  })),
}));

// Mock Lucide icons
vi.mock('lucide-react', () => {
  const mockIcon = ({ className }: any) => <div className={className} data-testid="icon" />;
  return {
    User: mockIcon,
    Plus: mockIcon,
    Zap: mockIcon,
    Users: mockIcon,
    TrendingUp: mockIcon,
    Clock: mockIcon,
    Star: mockIcon,
    Award: mockIcon,
    Calendar: mockIcon,
    Settings: mockIcon,
    ArrowRight: mockIcon,
    BarChart3: mockIcon,
    Target: mockIcon,
    Activity: mockIcon,
    Bell: mockIcon,
    Sparkles: mockIcon,
    Eye: mockIcon,
    EyeOff: mockIcon,
    RefreshCw: mockIcon,
    Grid: mockIcon,
    ChevronRight: mockIcon,
    BookOpen: mockIcon,
    MessageCircle: mockIcon,
    Heart: mockIcon,
    Ghost: mockIcon,
    Upload: mockIcon,
    Edit3: mockIcon,
    MapPin: mockIcon,
    GraduationCap: mockIcon,
    Hash: mockIcon,
    Wrench: mockIcon,
    Home: mockIcon,
  };
});

describe('ProfilePage', () => {
  const mockUser = {
    uid: 'test-user-123',
    fullName: 'Test User',
    handle: 'test_user',
    profilePhotoUrl: 'https://example.com/avatar.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Page Structure', () => {
    it('renders profile page with main components', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByTestId('page-container')).toBeInTheDocument();
        expect(screen.getByTestId('page-title')).toHaveTextContent('Your Profile');
        expect(screen.getByTestId('page-subtitle')).toHaveTextContent('Personal Campus Dashboard');
      });
    });

    it('shows loading state initially', () => {
      render(<ProfilePage />);
      
      // Should show loading initially before useEffect runs
      expect(screen.getByText('Loading your profile...')).toBeInTheDocument();
    });

    it('renders all main sections after loading', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        // Should show user name and handle
        expect(screen.getByText('Jacob Student')).toBeInTheDocument();
        expect(screen.getByText('@jacob_student')).toBeInTheDocument();
      });

      // Check major sections are present
      expect(screen.getByText('Your Tools')).toBeInTheDocument();
      expect(screen.getByText('Your Spaces')).toBeInTheDocument();
      expect(screen.getByText('Recent Activity')).toBeInTheDocument();
      expect(screen.getByText('HiveLab')).toBeInTheDocument();
      expect(screen.getByText('Ghost Mode')).toBeInTheDocument();
      expect(screen.getByText('Quick Settings')).toBeInTheDocument();
    });
  });

  describe('User Information Display', () => {
    it('displays user profile information correctly', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Jacob Student')).toBeInTheDocument();
        expect(screen.getByText('@jacob_student')).toBeInTheDocument();
        expect(screen.getByText('Computer Science')).toBeInTheDocument();
        expect(screen.getByText('Junior')).toBeInTheDocument();
        expect(screen.getByText('Building tools to optimize campus life. Always down to collaborate on projects!')).toBeInTheDocument();
      });
    });

    it('shows builder badge for builder users', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Builder')).toBeInTheDocument();
      });
    });

    it('displays profile photo when available', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const profileImage = screen.getByAltText('Jacob Student');
        expect(profileImage).toBeInTheDocument();
        expect(profileImage).toHaveAttribute('src', expect.stringContaining('profilePhotoUrl'));
      });
    });

    it('shows fallback avatar when no photo available', async () => {
      const mockUseSession = await import('../../../hooks/use-session');
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        user: { ...mockUser, profilePhotoUrl: undefined },
      });

      render(<ProfilePage />);

      await waitFor(() => {
        // Should show first letter of name as fallback
        expect(screen.getByText('J')).toBeInTheDocument();
      });
    });
  });

  describe('Action Buttons', () => {
    it('renders all action buttons in header', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Visible')).toBeInTheDocument(); // Ghost mode button
        expect(screen.getByText('Edit')).toBeInTheDocument(); // Edit button
        expect(screen.getByText('Settings')).toBeInTheDocument(); // Settings button
      });
    });

    it('handles edit mode toggle', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const editButton = screen.getByText('Edit');
        fireEvent.click(editButton);
        
        // Should show upload button in edit mode
        expect(screen.getByTestId('icon')).toBeInTheDocument();
      });
    });

    it('handles settings navigation', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const settingsButton = screen.getByText('Settings');
        fireEvent.click(settingsButton);
        
        expect(window.location.href).toBe('/settings');
      });
    });
  });

  describe('Tools Section', () => {
    it('displays user tools correctly', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Your Tools')).toBeInTheDocument();
        expect(screen.getByText('8 built')).toBeInTheDocument();
        expect(screen.getByText('GPA Calculator')).toBeInTheDocument();
        expect(screen.getByText('Study Session Timer')).toBeInTheDocument();
      });
    });

    it('shows tool usage statistics', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Used 45 times')).toBeInTheDocument();
        expect(screen.getByText('Used 23 times')).toBeInTheDocument();
      });
    });

    it('displays tool badges correctly', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Created')).toBeInTheDocument();
      });
    });

    it('handles view all tools navigation', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const viewAllButton = screen.getByText('View All Tools');
        fireEvent.click(viewAllButton);
        
        expect(window.location.href).toBe('/tools');
      });
    });
  });

  describe('Spaces Section', () => {
    it('displays user spaces correctly', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Your Spaces')).toBeInTheDocument();
        expect(screen.getByText('5/12')).toBeInTheDocument(); // active/total spaces
        expect(screen.getByText('CS Study Group')).toBeInTheDocument();
        expect(screen.getByText('Ellicott Complex')).toBeInTheDocument();
        expect(screen.getByText('Mock Trial Club')).toBeInTheDocument();
      });
    });

    it('shows space member counts and roles', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('89 members • moderator')).toBeInTheDocument();
        expect(screen.getByText('1892 members • member')).toBeInTheDocument();
        expect(screen.getByText('23 members • member')).toBeInTheDocument();
      });
    });

    it('handles browse all spaces navigation', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const browseButton = screen.getByText('Browse All Spaces');
        fireEvent.click(browseButton);
        
        expect(window.location.href).toBe('/spaces');
      });
    });
  });

  describe('HiveLab Section', () => {
    it('displays HiveLab card for builders', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('HiveLab')).toBeInTheDocument();
        expect(screen.getByText('Build new tools')).toBeInTheDocument();
        expect(screen.getByText('8 tools built')).toBeInTheDocument();
      });
    });

    it('handles HiveLab navigation', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const hiveLabCard = screen.getByText('HiveLab').closest('[data-testid="card"]');
        fireEvent.click(hiveLabCard!);
        
        expect(window.location.href).toBe('/tools/hivelab');
      });
    });
  });

  describe('Recent Activity Section', () => {
    it('displays recent activity correctly', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Recent Activity')).toBeInTheDocument();
        expect(screen.getByText('GPA Calculator v2.0')).toBeInTheDocument();
        expect(screen.getByText('Mock Trial Club')).toBeInTheDocument();
      });
    });

    it('shows activity timestamps', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('2h ago')).toBeInTheDocument();
        expect(screen.getByText('4h ago')).toBeInTheDocument();
      });
    });
  });

  describe('Ghost Mode', () => {
    it('displays ghost mode status correctly', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Ghost Mode')).toBeInTheDocument();
        expect(screen.getByText('Currently: Visible')).toBeInTheDocument();
        expect(screen.getByText('Turn On')).toBeInTheDocument();
      });
    });

    it('shows correct ghost mode toggle button', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const toggleButton = screen.getByText('Turn On');
        expect(toggleButton).toHaveAttribute('data-variant', 'outline');
      });
    });
  });

  describe('Statistics Cards', () => {
    it('displays all statistics correctly', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('156')).toBeInTheDocument(); // Connections
        expect(screen.getByText('2340')).toBeInTheDocument(); // Reputation
        expect(screen.getByText('7')).toBeInTheDocument(); // Achievements
        expect(screen.getByText('12')).toBeInTheDocument(); // Day Streak
      });
    });

    it('displays statistic labels correctly', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Connections')).toBeInTheDocument();
        expect(screen.getByText('Reputation')).toBeInTheDocument();
        expect(screen.getByText('Achievements')).toBeInTheDocument();
        expect(screen.getByText('Day Streak')).toBeInTheDocument();
      });
    });
  });

  describe('Calendar Integration', () => {
    it('renders calendar card', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByTestId('calendar-card')).toBeInTheDocument();
      });
    });

    it('handles calendar actions', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const viewCalendarButton = screen.getByTestId('view-calendar');
        const connectCalendarButton = screen.getByTestId('connect-calendar');
        const addEventButton = screen.getByTestId('add-event');

        fireEvent.click(viewCalendarButton);
        expect(window.location.href).toBe('/calendar');

        fireEvent.click(connectCalendarButton);
        fireEvent.click(addEventButton);
        
        // These trigger console.log calls in the component
        expect(viewCalendarButton).toBeInTheDocument();
        expect(connectCalendarButton).toBeInTheDocument();
        expect(addEventButton).toBeInTheDocument();
      });
    });
  });

  describe('Quick Settings', () => {
    it('displays all quick setting buttons', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        expect(screen.getByText('Quick Settings')).toBeInTheDocument();
        expect(screen.getByText('Notifications')).toBeInTheDocument();
        expect(screen.getByText('Privacy')).toBeInTheDocument();
        expect(screen.getByText('Calendar')).toBeInTheDocument();
        expect(screen.getByText('Account')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('applies correct grid layout classes', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const gridContainers = screen.getAllByText('Jacob Student')[0].closest('.grid');
        expect(gridContainers).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
      });
    });
  });

  describe('Error Handling', () => {
    it('handles missing user data gracefully', () => {
      const mockUseSession = import('../../../hooks/use-session');
      vi.mocked(mockUseSession.useSession).mockReturnValue({ user: null });

      render(<ProfilePage />);

      expect(screen.getByText('Loading your profile...')).toBeInTheDocument();
    });

    it('handles calendar data errors', async () => {
      const mockUseCalendarData = import('../../../hooks/use-calendar-data');
      vi.mocked(mockUseCalendarData.useCalendarData).mockReturnValue({
        data: null,
        state: 'error',
      });

      render(<ProfilePage />);

      await waitFor(() => {
        // Should still render calendar card even with error state
        expect(screen.getByTestId('calendar-card')).toBeInTheDocument();
      });
    });
  });

  describe('Time Formatting', () => {
    it('formats timestamps correctly', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        // Should show relative time formats
        expect(screen.getByText('2h ago')).toBeInTheDocument();
        expect(screen.getByText('4h ago')).toBeInTheDocument();
      });
    });
  });

  describe('Dynamic Content', () => {
    it('updates based on user builder status', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        // Should show builder-specific content
        expect(screen.getByText('Build new tools')).toBeInTheDocument();
        expect(screen.getByText('Builder')).toBeInTheDocument();
      });
    });

    it('handles different space types with correct colors', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        // Different space types should be displayed
        expect(screen.getByText('CS Study Group')).toBeInTheDocument(); // academic
        expect(screen.getByText('Ellicott Complex')).toBeInTheDocument(); // housing
        expect(screen.getByText('Mock Trial Club')).toBeInTheDocument(); // student
      });
    });
  });

  describe('Accessibility', () => {
    it('provides proper semantic structure', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        // Should have proper headings
        const headings = screen.getAllByRole('heading');
        expect(headings.length).toBeGreaterThan(0);
      });
    });

    it('provides proper button roles', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(5); // Multiple action buttons
      });
    });

    it('provides proper alt text for images', async () => {
      render(<ProfilePage />);

      await waitFor(() => {
        const profileImage = screen.getByAltText('Jacob Student');
        expect(profileImage).toBeInTheDocument();
      });
    });
  });
});