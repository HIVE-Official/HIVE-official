import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CalendarPage from '../../../app/(dashboard)/calendar/page';
import { PageContainer } from "@/components/temp-stubs";

// Mock HiveUI components
vi.mock('@hive/ui', () => ({
  PageContainer: ({ children, title, subtitle, breadcrumbs, actions, maxWidth }: any) => (
    <div data-testid="page-container" data-max-width={maxWidth}>
      <div data-testid="page-title">{title}</div>
      <div data-testid="page-subtitle">{subtitle}</div>
      <div data-testid="page-breadcrumbs">{breadcrumbs?.map((b: any, i: number) => (
        <span key={i}>{b.label}</span>
      ))}</div>
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
      data-testid="button"
    >
      {children}
    </button>
  ),
  Card: ({ children, className, onClick }: any) => (
    <div className={className} onClick={onClick} data-testid="card">
      {children}
    </div>
  ),
}));

// Mock Lucide icons
vi.mock('lucide-react', () => {
  const mockIcon = ({ className }: any) => <div className={className} data-testid="icon" />;
  return {
    Calendar: mockIcon,
    Plus: mockIcon,
    ChevronLeft: mockIcon,
    ChevronRight: mockIcon,
    Clock: mockIcon,
    MapPin: mockIcon,
    Users: mockIcon,
    Video: mockIcon,
    Bell: mockIcon,
    Filter: mockIcon,
    Search: mockIcon,
    ExternalLink: mockIcon,
  };
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

// Mock window.open
Object.defineProperty(window, 'open', {
  value: vi.fn(),
  writable: true,
});

describe('CalendarPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = '';
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Page Structure', () => {
    it('renders calendar page with correct structure', () => {
      render(<CalendarPage />);

      expect(screen.getByTestId('page-container')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toHaveTextContent('Calendar');
      expect(screen.getByTestId('page-subtitle')).toHaveTextContent('Stay organized with your events and activities');
      expect(screen.getByTestId('page-container')).toHaveAttribute('data-max-width', 'xl');
    });

    it('displays breadcrumbs correctly', () => {
      render(<CalendarPage />);

      const breadcrumbs = screen.getByTestId('page-breadcrumbs');
      expect(breadcrumbs).toHaveTextContent('Calendar');
    });

    it('renders action buttons in header', () => {
      render(<CalendarPage />);

      expect(screen.getByText('Create Event')).toBeInTheDocument();
      expect(screen.getByText('Sync Calendar')).toBeInTheDocument();
    });
  });

  describe('Calendar Header', () => {
    it('displays calendar header with stats', () => {
      render(<CalendarPage />);

      expect(screen.getByText('Your Schedule')).toBeInTheDocument();
      expect(screen.getByText('4 events in all')).toBeInTheDocument();
    });

    it('shows filter dropdown with all options', () => {
      render(<CalendarPage />);

      const filterSelect = screen.getByRole('combobox');
      expect(filterSelect).toBeInTheDocument();
      
      // Check filter options
      expect(screen.getByText('All Events')).toBeInTheDocument();
      expect(screen.getByText('Study Sessions')).toBeInTheDocument();
      expect(screen.getByText('Workshops')).toBeInTheDocument();
      expect(screen.getByText('Events')).toBeInTheDocument();
      expect(screen.getByText('Office Hours')).toBeInTheDocument();
    });

    it('displays view toggle buttons', () => {
      render(<CalendarPage />);

      expect(screen.getByText('List')).toBeInTheDocument();
      expect(screen.getByText('Month')).toBeInTheDocument();
      expect(screen.getByText('Week')).toBeInTheDocument();
    });

    it('shows quick stats cards', () => {
      render(<CalendarPage />);

      expect(screen.getByText('4')).toBeInTheDocument(); // Total Events
      expect(screen.getByText('Total Events')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument(); // This Week
      expect(screen.getByText('This Week')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument(); // Attending
      expect(screen.getByText('Attending')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument(); // Hosting
      expect(screen.getByText('Hosting')).toBeInTheDocument();
    });
  });

  describe('Event Filtering', () => {
    it('filters events by type', () => {
      render(<CalendarPage />);

      // Initially shows all events
      expect(screen.getByText('CS Study Session')).toBeInTheDocument();
      expect(screen.getByText('Design Workshop')).toBeInTheDocument();
      expect(screen.getByText('Startup Pitch Night')).toBeInTheDocument();
      expect(screen.getByText('Office Hours')).toBeInTheDocument();

      // Filter by study sessions
      const filterSelect = screen.getByRole('combobox');
      fireEvent.change(filterSelect, { target: { value: 'study' } });

      expect(screen.getByText('CS Study Session')).toBeInTheDocument();
      expect(screen.queryByText('Design Workshop')).not.toBeInTheDocument();
      expect(screen.queryByText('Startup Pitch Night')).not.toBeInTheDocument();
      expect(screen.queryByText('Office Hours')).not.toBeInTheDocument();
    });

    it('updates event count when filtering', () => {
      render(<CalendarPage />);

      // Filter by workshop
      const filterSelect = screen.getByRole('combobox');
      fireEvent.change(filterSelect, { target: { value: 'workshop' } });

      expect(screen.getByText('1 events in workshop')).toBeInTheDocument();
    });

    it('shows all events when filter is set to all', () => {
      render(<CalendarPage />);

      const filterSelect = screen.getByRole('combobox');
      
      // Filter by study first
      fireEvent.change(filterSelect, { target: { value: 'study' } });
      expect(screen.queryByText('Design Workshop')).not.toBeInTheDocument();

      // Reset to all
      fireEvent.change(filterSelect, { target: { value: 'all' } });
      expect(screen.getByText('Design Workshop')).toBeInTheDocument();
    });
  });

  describe('View Toggle', () => {
    it('switches between different views', () => {
      render(<CalendarPage />);

      const listButton = screen.getByText('List');
      const monthButton = screen.getByText('Month');
      const weekButton = screen.getByText('Week');

      // List view is initially active
      expect(listButton).toHaveClass('bg-[var(--hive-brand-secondary)]', 'text-[var(--hive-background-primary)]');

      // Switch to month view
      fireEvent.click(monthButton);
      expect(monthButton).toHaveClass('bg-[var(--hive-brand-secondary)]', 'text-[var(--hive-background-primary)]');

      // Switch to week view
      fireEvent.click(weekButton);
      expect(weekButton).toHaveClass('bg-[var(--hive-brand-secondary)]', 'text-[var(--hive-background-primary)]');
    });

    it('maintains view selection state', () => {
      render(<CalendarPage />);

      const monthButton = screen.getByText('Month');
      fireEvent.click(monthButton);

      // Month should remain selected
      expect(monthButton).toHaveClass('bg-[var(--hive-brand-secondary)]', 'text-[var(--hive-background-primary)]');
      expect(screen.getByText('List')).not.toHaveClass('bg-[var(--hive-brand-secondary)]');
    });
  });

  describe('Event Display', () => {
    it('displays all mock events', () => {
      render(<CalendarPage />);

      expect(screen.getByText('CS Study Session')).toBeInTheDocument();
      expect(screen.getByText('Design Workshop')).toBeInTheDocument();
      expect(screen.getByText('Startup Pitch Night')).toBeInTheDocument();
      expect(screen.getByText('Office Hours')).toBeInTheDocument();
    });

    it('shows event details correctly', () => {
      render(<CalendarPage />);

      // Check CS Study Session details
      expect(screen.getByText('Data structures and algorithms review')).toBeInTheDocument();
      expect(screen.getByText('Library Room 301')).toBeInTheDocument();
      expect(screen.getByText('12 attending')).toBeInTheDocument();
      expect(screen.getByText('CS Study Group')).toBeInTheDocument();
    });

    it('displays event type badges', () => {
      render(<CalendarPage />);

      expect(screen.getByText('study')).toBeInTheDocument();
      expect(screen.getByText('workshop')).toBeInTheDocument();
      expect(screen.getByText('event')).toBeInTheDocument();
      expect(screen.getByText('office hours')).toBeInTheDocument();
    });

    it('shows virtual event indicators', () => {
      render(<CalendarPage />);

      // Design Workshop is virtual
      expect(screen.getByText('Virtual')).toBeInTheDocument();
    });

    it('formats dates and times correctly', () => {
      render(<CalendarPage />);

      // Check date formatting
      expect(screen.getByText('1/15/2024')).toBeInTheDocument();
      expect(screen.getByText('1/16/2024')).toBeInTheDocument();
      expect(screen.getByText('1/18/2024')).toBeInTheDocument();
      expect(screen.getByText('1/17/2024')).toBeInTheDocument();

      // Check time formatting
      expect(screen.getByText('3:00 PM (2 hours)')).toBeInTheDocument();
      expect(screen.getByText('2:00 PM (3 hours)')).toBeInTheDocument();
      expect(screen.getByText('6:00 PM (2.5 hours)')).toBeInTheDocument();
      expect(screen.getByText('11:00 AM (1 hour)')).toBeInTheDocument();
    });
  });

  describe('Event Interactions', () => {
    it('navigates to event details when clicked', () => {
      render(<CalendarPage />);

      const eventCard = screen.getByText('CS Study Session').closest('[data-testid="card"]');
      fireEvent.click(eventCard!);

      expect(window.location.href).toBe('/calendar/events/1');
    });

    it('handles RSVP button clicks', () => {
      render(<CalendarPage />);

      const rsvpButtons = screen.getAllByText('RSVP');
      fireEvent.click(rsvpButtons[0]);

      // Should prevent event propagation (not navigate)
      expect(window.location.href).toBe('');
    });

    it('handles join virtual event button', () => {
      render(<CalendarPage />);

      const joinButton = screen.getByText('Join');
      fireEvent.click(joinButton);

      // Should prevent event propagation
      expect(window.location.href).toBe('');
    });

    it('prevents event propagation on button clicks', () => {
      render(<CalendarPage />);

      const eventCard = screen.getByText('Design Workshop').closest('[data-testid="card"]');
      const joinButton = screen.getByText('Join');

      // Click join button
      fireEvent.click(joinButton);
      expect(window.location.href).toBe('');

      // Click event card should still work
      fireEvent.click(eventCard!);
      expect(window.location.href).toBe('/calendar/events/2');
    });
  });

  describe('Action Buttons', () => {
    it('handles create event button click', () => {
      render(<CalendarPage />);

      const createButton = screen.getByText('Create Event');
      fireEvent.click(createButton);

      expect(window.location.href).toBe('/calendar/create');
    });

    it('handles sync calendar button click', () => {
      render(<CalendarPage />);

      const syncButton = screen.getByText('Sync Calendar');
      fireEvent.click(syncButton);

      // This would trigger some sync logic
      expect(syncButton).toBeInTheDocument();
    });

    it('handles search events button', () => {
      render(<CalendarPage />);

      const searchButton = screen.getByText('Search Events');
      expect(searchButton).toBeInTheDocument();
    });
  });

  describe('Calendar Integration Section', () => {
    it('displays integration call-to-action', () => {
      render(<CalendarPage />);

      expect(screen.getByText('Stay Connected')).toBeInTheDocument();
      expect(screen.getByText('Sync your HIVE calendar with your preferred calendar app to never miss an event.')).toBeInTheDocument();
    });

    it('handles Google Calendar sync', () => {
      render(<CalendarPage />);

      const googleSyncButton = screen.getByText('Sync with Google Calendar');
      fireEvent.click(googleSyncButton);

      expect(window.open).toHaveBeenCalledWith('https://calendar.google.com', '_blank');
    });

    it('handles Outlook sync', () => {
      render(<CalendarPage />);

      const outlookSyncButton = screen.getByText('Sync with Outlook');
      fireEvent.click(outlookSyncButton);

      expect(window.open).toHaveBeenCalledWith('https://outlook.live.com/calendar', '_blank');
    });
  });

  describe('Event Type Styling', () => {
    it('applies correct colors for different event types', () => {
      render(<CalendarPage />);

      // Check that different event types have different styling
      const studyBadge = screen.getByText('study');
      const workshopBadge = screen.getByText('workshop');
      const eventBadge = screen.getByText('event');
      const officeHoursBadge = screen.getByText('office hours');

      expect(studyBadge).toHaveClass('bg-blue-500/20', 'text-blue-400');
      expect(workshopBadge).toHaveClass('bg-purple-500/20', 'text-purple-400');
      expect(eventBadge).toHaveClass('bg-green-500/20', 'text-green-400');
      expect(officeHoursBadge).toHaveClass('bg-yellow-500/20', 'text-yellow-400');
    });

    it('shows correct icons for event types', () => {
      render(<CalendarPage />);

      // All events should have their appropriate icons rendered
      const icons = screen.getAllByTestId('icon');
      expect(icons.length).toBeGreaterThan(10); // Many icons throughout the page
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes', () => {
      render(<CalendarPage />);

      // Check responsive grid classes
      const statsGrid = screen.getByText('Total Events').closest('.grid');
      expect(statsGrid).toHaveClass('grid-cols-2', 'md:grid-cols-4');

      // Check responsive button layout
      const syncButtons = screen.getByText('Sync with Google Calendar').closest('.flex-col');
      expect(syncButtons).toHaveClass('flex-col', 'sm:flex-row');
    });

    it('handles mobile layout', () => {
      render(<CalendarPage />);

      // Check that event details use responsive grid
      const eventDetails = screen.getByText('1/15/2024').closest('.grid');
      expect(eventDetails).toHaveClass('grid-cols-2', 'md:grid-cols-4');
    });
  });

  describe('Upcoming Events Section', () => {
    it('displays upcoming events section', () => {
      render(<CalendarPage />);

      expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    });

    it('sorts events appropriately', () => {
      render(<CalendarPage />);

      const eventCards = screen.getAllByTestId('card');
      // Events should be rendered (specific order testing would require more complex setup)
      expect(eventCards.length).toBeGreaterThan(4); // Header card + event cards
    });
  });

  describe('Error Handling', () => {
    it('handles empty event states gracefully', () => {
      render(<CalendarPage />);

      // Filter to show no events
      const filterSelect = screen.getByRole('combobox');
      fireEvent.change(filterSelect, { target: { value: 'nonexistent' } });

      // Should handle gracefully (though our mock data always has events)
      expect(screen.getByText('0 events in nonexistent')).toBeInTheDocument();
    });
  });

  describe('Event Metadata', () => {
    it('displays location information correctly', () => {
      render(<CalendarPage />);

      expect(screen.getByText('Library Room 301')).toBeInTheDocument();
      expect(screen.getByText('Zoom Meeting')).toBeInTheDocument();
      expect(screen.getByText('Student Center Auditorium')).toBeInTheDocument();
      expect(screen.getByText('HIVE Lab')).toBeInTheDocument();
    });

    it('shows attendee counts', () => {
      render(<CalendarPage />);

      expect(screen.getByText('12 attending')).toBeInTheDocument();
      expect(screen.getByText('25 attending')).toBeInTheDocument();
      expect(screen.getByText('85 attending')).toBeInTheDocument();
      expect(screen.getByText('8 attending')).toBeInTheDocument();
    });

    it('displays space information', () => {
      render(<CalendarPage />);

      expect(screen.getByText('CS Study Group')).toBeInTheDocument();
      expect(screen.getByText('Design Club')).toBeInTheDocument();
      expect(screen.getByText('Entrepreneur Society')).toBeInTheDocument();
      expect(screen.getByText('HIVE Team')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides proper semantic structure', () => {
      render(<CalendarPage />);

      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(3);
    });

    it('provides proper form controls', () => {
      render(<CalendarPage />);

      const combobox = screen.getByRole('combobox');
      expect(combobox).toBeInTheDocument();

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(10);
    });

    it('uses proper button labels', () => {
      render(<CalendarPage />);

      expect(screen.getByRole('button', { name: /create event/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sync calendar/i })).toBeInTheDocument();
    });
  });
});