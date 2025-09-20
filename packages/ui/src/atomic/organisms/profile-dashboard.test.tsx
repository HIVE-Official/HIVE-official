import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileDashboard } from './profile-dashboard';

// Mock framer-motion to avoid animation issues in tests
jest.mock('../../components/framer-motion-proxy', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockUser = {
  name: 'Sarah Chen',
  handle: 'sarahc_cs',
  avatar: 'https://example.com/avatar.jpg',
  year: '2026',
  major: 'Computer Science',
  dorm: 'West Campus',
  isOnline: true,
  isBuilder: true,
  completionPercentage: 85,
};

const mockSpaces = [
  {
    id: '1',
    name: 'CS 101: Intro to Programming',
    type: 'course' as const,
    memberCount: 847,
    unreadCount: 3,
    lastActivity: '2024-01-15T10:30:00Z',
    isPinned: true,
  },
  {
    id: '2',
    name: 'West Campus Residents',
    type: 'housing' as const,
    memberCount: 234,
    unreadCount: 12,
    lastActivity: '2024-01-15T09:15:00Z',
  },
];

const mockActivities = [
  {
    id: '1',
    type: 'announcement' as const,
    title: 'Midterm Exam Schedule Released',
    content: 'Your Computer Science 101 midterm has been scheduled for Friday.',
    author: {
      name: 'Prof. Sarah Chen',
      handle: 'prof_chen'
    },
    space: {
      id: 'cs101',
      name: 'CS 101: Intro to Programming',
      type: 'course' as const
    },
    timestamp: '2024-01-15T14:30:00Z',
    priority: 'high' as const,
    isUnread: true,
    metadata: {
      likes: 12,
      replyCount: 8
    }
  },
  {
    id: '2',
    type: 'message' as const,
    title: 'Study Group Formation',
    content: 'Looking to form a study group for the upcoming midterm.',
    timestamp: '2024-01-15T13:45:00Z',
    priority: 'medium' as const,
  },
];

const mockAvailableTools = [
  {
    id: '1',
    name: 'Study Schedule Template',
    type: 'template' as const,
    category: 'productivity' as const,
    description: 'Create personalized study schedules',
    difficulty: 'beginner' as const,
    timeToCreate: '5 min',
    popularity: 5,
    usageCount: 1247
  },
  {
    id: '2',
    name: 'Grade Tracker Widget',
    type: 'widget' as const,
    category: 'academic' as const,
    description: 'Track your grades and GPA',
    difficulty: 'intermediate' as const,
    timeToCreate: '10 min',
    popularity: 4,
    usageCount: 892
  },
];

const mockCreatedTools = [
  {
    id: 'c1',
    name: 'My Study Planner',
    type: 'template' as const,
    category: 'productivity' as const,
    description: 'Personalized study schedule',
    icon: '📚',
    createdAt: '2024-01-10T14:30:00Z',
    usageCount: 45,
    isPublic: true,
    likes: 12,
    isStarred: true
  },
];

const defaultProps = {
  user: mockUser,
  spaces: mockSpaces,
  activities: mockActivities,
  availableTools: mockAvailableTools,
  createdTools: mockCreatedTools,
};

describe('ProfileDashboard', () => {
  it('renders all main sections correctly', () => {
    render(<ProfileDashboard {...defaultProps} />);
    
    // Campus Identity Header
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('@sarahc_cs')).toBeInTheDocument();
    
    // Campus Spaces
    expect(screen.getByText('Your Campus Spaces')).toBeInTheDocument();
    expect(screen.getByText('CS 101: Intro to Programming')).toBeInTheDocument();
    expect(screen.getByText('West Campus Residents')).toBeInTheDocument();
    
    // Campus Activity Feed
    expect(screen.getByText('Campus Activity')).toBeInTheDocument();
    expect(screen.getByText('Midterm Exam Schedule Released')).toBeInTheDocument();
    expect(screen.getByText('Study Group Formation')).toBeInTheDocument();
    
    // Builder Tools (for builder user)
    expect(screen.getByText('Builder Tools')).toBeInTheDocument();
    expect(screen.getByText('Study Schedule Template')).toBeInTheDocument();
  });

  it('shows builder invitation for non-builder users', () => {
    const nonBuilderUser = { ...mockUser, isBuilder: false };
    render(
      <ProfileDashboard
        {...defaultProps}
        user={nonBuilderUser}
        createdTools={[]}
      />
    );
    
    expect(screen.getByText('Build Custom Tools')).toBeInTheDocument();
    expect(screen.getByText('Become a Builder')).toBeInTheDocument();
  });

  it('hides builder tools when showBuilder is false', () => {
    render(<ProfileDashboard {...defaultProps} showBuilder={false} />);
    
    expect(screen.queryByText('Builder Tools')).not.toBeInTheDocument();
    expect(screen.queryByText('Study Schedule Template')).not.toBeInTheDocument();
  });

  it('calls appropriate callbacks when interactive elements are clicked', () => {
    const mockCallbacks = {
      onAvatarClick: jest.fn(),
      onEditProfile: jest.fn(),
      onSpaceClick: jest.fn(),
      onActivityClick: jest.fn(),
      onToolClick: jest.fn(),
      onCreateTool: jest.fn(),
      onBecomeBuilder: jest.fn(),
    };

    render(<ProfileDashboard {...defaultProps} {...mockCallbacks} />);
    
    // Test space click
    fireEvent.click(screen.getByText('CS 101: Intro to Programming'));
    expect(mockCallbacks.onSpaceClick).toHaveBeenCalledWith('1');
    
    // Test activity click
    fireEvent.click(screen.getByText('Midterm Exam Schedule Released'));
    expect(mockCallbacks.onActivityClick).toHaveBeenCalledWith('1');
    
    // Test tool click
    fireEvent.click(screen.getByText('Study Schedule Template'));
    expect(mockCallbacks.onToolClick).toHaveBeenCalledWith('1');
  });

  it('renders different layouts correctly', () => {
    const { rerender } = render(<ProfileDashboard {...defaultProps} layout="desktop" />);
    
    // Desktop layout should show sidebar structure
    let dashboard = document.querySelector('.lg\\:col-span-3');
    expect(dashboard).toBeInTheDocument();
    
    // Tablet layout
    rerender(<ProfileDashboard {...defaultProps} layout="tablet" />);
    dashboard = document.querySelector('.md\\:grid-cols-2');
    expect(dashboard).toBeInTheDocument();
    
    // Mobile layout - single column
    rerender(<ProfileDashboard {...defaultProps} layout="mobile" />);
    // Mobile should not have multi-column grid classes
    dashboard = document.querySelector('.lg\\:col-span-3');
    expect(dashboard).not.toBeInTheDocument();
  });

  it('displays loading states correctly', () => {
    render(
      <ProfileDashboard
        {...defaultProps}
        isLoading={{
          spaces: true,
          activities: true,
          tools: true,
        }}
      />
    );
    
    // Should show loading indicator
    expect(screen.getByText('Loading campus data...')).toBeInTheDocument();
    
    // Should show skeleton loaders in components
    const loadingElements = document.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('renders compact variant correctly', () => {
    render(<ProfileDashboard {...defaultProps} variant="compact" />);
    
    // Should still show all main content
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Your Campus Spaces')).toBeInTheDocument();
    expect(screen.getByText('Campus Activity')).toBeInTheDocument();
  });

  it('renders focused variant without builder tools', () => {
    render(<ProfileDashboard {...defaultProps} variant="focused" />);
    
    // Should show main content
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Your Campus Spaces')).toBeInTheDocument();
    expect(screen.getByText('Campus Activity')).toBeInTheDocument();
    
    // Should not show builder tools even if user is a builder
    expect(screen.queryByText('Builder Tools')).not.toBeInTheDocument();
  });

  it('handles empty states gracefully', () => {
    render(
      <ProfileDashboard
        {...defaultProps}
        spaces={[]}
        activities={[]}
        createdTools={[]}
      />
    );
    
    // Should show empty state messages
    expect(screen.getByText('No Spaces Yet')).toBeInTheDocument();
    expect(screen.getByText('No Recent Activity')).toBeInTheDocument();
  });

  it('displays user completion percentage correctly', () => {
    const userWithLowCompletion = { ...mockUser, completionPercentage: 25 };
    render(<ProfileDashboard {...defaultProps} user={userWithLowCompletion} />);
    
    // Should show profile completion section
    expect(screen.getByText('Profile Completion')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('shows unread indicators correctly', () => {
    render(<ProfileDashboard {...defaultProps} />);
    
    // Should show unread counts in spaces
    expect(screen.getByText('3')).toBeInTheDocument(); // CS 101 unread
    expect(screen.getByText('12')).toBeInTheDocument(); // West Campus unread
    
    // Should show unread indicator in activities (golden dot)
    const unreadIndicators = document.querySelectorAll('.bg-gold');
    expect(unreadIndicators.length).toBeGreaterThan(0);
  });

  it('applies custom className correctly', () => {
    render(<ProfileDashboard {...defaultProps} className="custom-class" />);
    
    const dashboard = document.querySelector('.custom-class');
    expect(dashboard).toBeInTheDocument();
  });

  it('shows success toast when sections are loaded', async () => {
    render(<ProfileDashboard {...defaultProps} />);
    
    // Wait for success toast to appear
    await waitFor(() => {
      expect(screen.getByText('Profile loaded successfully')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('handles missing optional props gracefully', () => {
    const minimalProps = {
      user: mockUser,
      spaces: [],
      activities: [],
      availableTools: [],
      createdTools: [],
    };
    
    render(<ProfileDashboard {...minimalProps} />);
    
    // Should render without crashing
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });
});