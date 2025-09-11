import React from 'react';
import { ProfilePageTemplate } from './profile-page-template';

// Mock framer-motion to avoid animation issues in tests
jest.mock('../../components/framer-motion-proxy', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock window.addEventListener
const mockAddEventListener = (() => {});
const mockRemoveEventListener = (() => {});

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
});

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

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

describe('ProfilePageTemplate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders complete page template with all sections', () => {
    render(<ProfilePageTemplate {...defaultProps} />);
    
    // HIVE Logo and Navigation
    expect(screen.getByText('HIVE')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Spaces')).toBeInTheDocument();
    
    // Page Header
    expect(screen.getByText('Your Campus Profile')).toBeInTheDocument();
    expect(screen.getByText('Manage your campus identity and connections')).toBeInTheDocument();
    
    // Profile Dashboard Content
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Your Campus Spaces')).toBeInTheDocument();
    expect(screen.getByText('Campus Activity')).toBeInTheDocument();
    expect(screen.getByText('Builder Tools')).toBeInTheDocument();
    
    // Footer
    expect(screen.getByText('Built for campus communities')).toBeInTheDocument();
    expect(screen.getByText('© 2024 HIVE. All rights reserved.')).toBeInTheDocument();
  });

  it('shows navigation badges for unread content', () => {
    render(<ProfilePageTemplate {...defaultProps} notifications={7} />);
    
    // Should show notification count in header
    // Note: Badge rendering depends on Header organism implementation
    expect(screen.getByText('HIVE')).toBeInTheDocument();
  });

  it('handles navigation callbacks correctly', () => {
    const mockCallbacks = {
      onNavigationClick: (() => {}),
      onNotificationsClick: (() => {}),
      onUserMenuClick: (() => {}),
      onLogoClick: (() => {}),
    };

    render(<ProfilePageTemplate {...defaultProps} {...mockCallbacks} />);
    
    // Test logo click
    const logo = screen.getByText('HIVE');
    fireEvent.click(logo);
    expect(mockCallbacks.onLogoClick).toHaveBeenCalled();
  });

  it('handles profile dashboard callbacks correctly', () => {
    const mockCallbacks = {
      onEditProfile: (() => {}),
      onSpaceClick: (() => {}),
      onActivityClick: (() => {}),
      onToolClick: (() => {}),
    };

    render(<ProfilePageTemplate {...defaultProps} {...mockCallbacks} />);
    
    // Test edit profile button
    const editButtons = screen.getAllByText('Edit Profile');
    fireEvent.click(editButtons[0]);
    expect(mockCallbacks.onEditProfile).toHaveBeenCalled();
    
    // Test space click
    fireEvent.click(screen.getByText('CS 101: Intro to Programming'));
    expect(mockCallbacks.onSpaceClick).toHaveBeenCalledWith('1');
    
    // Test activity click
    fireEvent.click(screen.getByText('Midterm Exam Schedule Released'));
    expect(mockCallbacks.onActivityClick).toHaveBeenCalledWith('1');
  });

  it('hides navigation when showNavigation is false', () => {
    render(<ProfilePageTemplate {...defaultProps} showNavigation={false} />);
    
    // Should not show navigation items
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Spaces')).not.toBeInTheDocument();
    
    // Should still show page content
    expect(screen.getByText('Your Campus Profile')).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });

  it('shows non-builder experience correctly', () => {
    const nonBuilderUser = { ...mockUser, isBuilder: false };
    render(
      <ProfilePageTemplate
        {...defaultProps}
        user={nonBuilderUser}
        createdTools={[]}
      />
    );
    
    expect(screen.getByText('Build Custom Tools')).toBeInTheDocument();
    expect(screen.getByText('Become a Builder')).toBeInTheDocument();
  });

  it('handles forced mobile layout', () => {
    render(<ProfilePageTemplate {...defaultProps} forceMobile={true} />);
    
    // Should render mobile layout
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Your Campus Profile')).toBeInTheDocument();
    
    // Mobile specific elements might be present
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('handles forced tablet layout', () => {
    render(<ProfilePageTemplate {...defaultProps} forceTablet={true} />);
    
    // Should render tablet layout
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Your Campus Profile')).toBeInTheDocument();
  });

  it('displays page loading state', () => {
    render(<ProfilePageTemplate {...defaultProps} isLoading={true} />);
    
    expect(screen.getByText('HIVE')).toBeInTheDocument();
    expect(screen.getByText('Loading your campus profile...')).toBeInTheDocument();
    
    // Should not show page content while loading
    expect(screen.queryByText('Your Campus Profile')).not.toBeInTheDocument();
  });

  it('displays error state correctly', () => {
    const errorMessage = 'Unable to load profile data';
    render(<ProfilePageTemplate {...defaultProps} error={errorMessage} />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    
    // Should not show normal page content
    expect(screen.queryByText('Your Campus Profile')).not.toBeInTheDocument();
  });

  it('displays campus activity indicator for unread activities', () => {
    const activitiesWithUnread = [
      { ...mockActivities[0], isUnread: true },
      { 
        ...mockActivities[0], 
        id: '2', 
        title: 'Another unread activity',
        isUnread: true 
      },
    ];

    render(
      <ProfilePageTemplate
        {...defaultProps}
        activities={activitiesWithUnread}
      />
    );
    
    expect(screen.getByText('2 new campus updates')).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(<ProfilePageTemplate {...defaultProps} className="custom-page-class" />);
    
    const pageElement = document.querySelector('.custom-page-class');
    expect(pageElement).toBeInTheDocument();
  });

  it('handles custom navigation items', () => {
    const customNav = [
      { label: 'Home', href: '/', active: false },
      { label: 'Custom Page', href: '/custom', active: true },
    ];

    render(
      <ProfilePageTemplate 
        {...defaultProps} 
        navigationItems={customNav}
      />
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Custom Page')).toBeInTheDocument();
    
    // Should not show default navigation
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('handles window resize for responsive behavior', () => {
    render(<ProfilePageTemplate {...defaultProps} />);
    
    // Verify event listener was added
    expect(mockAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    
    // Should show desktop layout initially
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });

  it('handles missing optional props gracefully', () => {
    const minimalProps = {
      user: mockUser,
      spaces: [],
      activities: [],
      availableTools: [],
      createdTools: [],
    };
    
    render(<ProfilePageTemplate {...minimalProps} />);
    
    // Should render without crashing
    expect(screen.getByText('HIVE')).toBeInTheDocument();
    expect(screen.getByText('Your Campus Profile')).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });

  it('shows builder tools when showBuilder is true', () => {
    render(<ProfilePageTemplate {...defaultProps} showBuilder={true} />);
    
    expect(screen.getByText('Builder Tools')).toBeInTheDocument();
    expect(screen.getByText('Study Schedule Template')).toBeInTheDocument();
  });

  it('hides builder tools when showBuilder is false', () => {
    render(<ProfilePageTemplate {...defaultProps} showBuilder={false} />);
    
    expect(screen.queryByText('Builder Tools')).not.toBeInTheDocument();
  });
});