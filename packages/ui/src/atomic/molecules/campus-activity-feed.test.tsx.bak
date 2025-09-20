import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampusActivityFeed } from './campus-activity-feed';

const mockActivities = [
  {
    id: '1',
    type: 'announcement' as const,
    title: 'Midterm Exam Schedule Released',
    content: 'Your Computer Science 101 midterm has been scheduled for Friday, January 26th.',
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
    author: {
      name: 'Marcus Thompson',
      handle: 'marcus_builds'
    },
    space: {
      id: 'cs101',
      name: 'CS 101: Intro to Programming',
      type: 'course' as const
    },
    timestamp: '2024-01-15T13:45:00Z',
    priority: 'medium' as const,
    metadata: {
      likes: 5,
      replyCount: 3
    }
  },
  {
    id: '3',
    type: 'assignment' as const,
    title: 'Programming Assignment 3 Posted',
    content: 'New assignment focusing on data structures and algorithms.',
    timestamp: '2024-01-15T11:00:00Z',
    priority: 'high' as const,
    metadata: {
      attachmentCount: 2,
      dueDate: '2024-01-22T23:59:00Z'
    }
  }
];

describe('CampusActivityFeed', () => {
  it('renders activity feed header correctly', () => {
    render(<CampusActivityFeed activities={mockActivities} />);
    
    expect(screen.getByText('Campus Activity')).toBeInTheDocument();
    expect(screen.getByText('Recent campus activity from your spaces')).toBeInTheDocument();
  });

  it('displays activities with correct information', () => {
    render(<CampusActivityFeed activities={mockActivities} />);
    
    expect(screen.getByText('Midterm Exam Schedule Released')).toBeInTheDocument();
    expect(screen.getByText('Study Group Formation')).toBeInTheDocument();
    expect(screen.getByText('Programming Assignment 3 Posted')).toBeInTheDocument();
    
    expect(screen.getByText('Prof. Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Marcus Thompson')).toBeInTheDocument();
  });

  it('shows activity metadata correctly', () => {
    render(<CampusActivityFeed activities={mockActivities} />);
    
    // Check for reply counts
    expect(screen.getByText('8')).toBeInTheDocument(); // replies
    expect(screen.getByText('3')).toBeInTheDocument(); // replies
    
    // Check for attachment count
    expect(screen.getByText('2')).toBeInTheDocument(); // attachments
  });

  it('displays unread indicators for unread activities', () => {
    render(<CampusActivityFeed activities={mockActivities} />);
    
    // Should show unread indicator (golden dot)
    const unreadIndicators = document.querySelectorAll('.bg-gold.shadow-\\[0_0_4px_rgba\\(255\\,215\\,0\\,0\\.5\\)\\]');
    expect(unreadIndicators.length).toBeGreaterThan(0);
  });

  it('calls onActivityClick when activity is clicked', () => {
    const onActivityClick = jest.fn();
    render(<CampusActivityFeed activities={mockActivities} onActivityClick={onActivityClick} />);
    
    fireEvent.click(screen.getByText('Midterm Exam Schedule Released'));
    expect(onActivityClick).toHaveBeenCalledWith('1');
  });

  it('calls onViewAll when view all button is clicked', () => {
    const onViewAll = jest.fn();
    render(<CampusActivityFeed activities={mockActivities} onViewAll={onViewAll} />);
    
    fireEvent.click(screen.getByText('View All'));
    expect(onViewAll).toHaveBeenCalled();
  });

  it('limits displayed activities based on maxItems prop', () => {
    render(<CampusActivityFeed activities={mockActivities} maxItems={2} />);
    
    expect(screen.getByText('Midterm Exam Schedule Released')).toBeInTheDocument();
    expect(screen.getByText('Study Group Formation')).toBeInTheDocument();
    expect(screen.queryByText('Programming Assignment 3 Posted')).not.toBeInTheDocument();
    
    // Should show "more activities" indicator
    expect(screen.getByText('+1 more activities')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    render(<CampusActivityFeed activities={[]} isLoading={true} />);
    
    // Should show loading skeleton
    const loadingElements = document.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('renders empty state correctly', () => {
    render(<CampusActivityFeed activities={[]} />);
    
    expect(screen.getByText('No Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Join more spaces to see campus activity here')).toBeInTheDocument();
  });

  it('formats timestamps correctly', () => {
    const recentActivity = {
      ...mockActivities[0],
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 minutes ago
    };
    
    render(<CampusActivityFeed activities={[recentActivity]} />);
    expect(screen.getByText('30m ago')).toBeInTheDocument();
  });

  it('displays due dates for assignments', () => {
    render(<CampusActivityFeed activities={mockActivities} />);
    
    // Should show due date for assignment
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
  });

  it('shows correct activity type icons', () => {
    render(<CampusActivityFeed activities={mockActivities} />);
    
    // Icons are rendered as text content within the activity type indicators
    // The exact emoji might vary, but we can check that activity type indicators exist
    const activityIcons = document.querySelectorAll('.w-8.h-8.rounded-xl');
    expect(activityIcons.length).toBeGreaterThanOrEqual(3);
  });

  it('handles activities without authors gracefully', () => {
    const activityWithoutAuthor = {
      ...mockActivities[0],
      author: undefined
    };
    
    render(<CampusActivityFeed activities={[activityWithoutAuthor]} />);
    
    expect(screen.getByText('Midterm Exam Schedule Released')).toBeInTheDocument();
    // Should not crash when author is undefined
  });
});