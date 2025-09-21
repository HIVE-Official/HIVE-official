import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampusSpacesCard } from './campus-spaces-card';

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
  {
    id: '3',
    name: 'Robotics Club',
    type: 'club' as const,
    memberCount: 156,
    lastActivity: '2024-01-14T16:45:00Z',
  },
];

describe('CampusSpacesCard', () => {
  it('renders space information correctly', () => {
    render(<CampusSpacesCard spaces={mockSpaces} />);
    
    expect(screen.getByText('Your Campus Spaces')).toBeInTheDocument();
    expect(screen.getByText('3 spaces joined')).toBeInTheDocument();
    expect(screen.getByText('CS 101: Intro to Programming')).toBeInTheDocument();
    expect(screen.getByText('West Campus Residents')).toBeInTheDocument();
    expect(screen.getByText('Robotics Club')).toBeInTheDocument()
  });

  it('displays member counts correctly', () => {
    render(<CampusSpacesCard spaces={mockSpaces} />);
    
    expect(screen.getByText('847 members')).toBeInTheDocument();
    expect(screen.getByText('234 members')).toBeInTheDocument();
    expect(screen.getByText('156 members')).toBeInTheDocument()
  });

  it('shows unread counts when present', () => {
    render(<CampusSpacesCard spaces={mockSpaces} />);
    
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument()
  });

  it('formats member counts for large numbers', () => {
    const spacesWithLargeCount = [{
      ...mockSpaces[0],
      memberCount: 1500
    }];
    
    render(<CampusSpacesCard spaces={spacesWithLargeCount} />);
    expect(screen.getByText('1.5k members')).toBeInTheDocument()
  });

  it('calls onSpaceClick when space is clicked', () => {
    const onSpaceClick = jest.fn();
    render(<CampusSpacesCard spaces={mockSpaces} onSpaceClick={onSpaceClick} />);
    
    fireEvent.click(screen.getByText('CS 101: Intro to Programming'));
    expect(onSpaceClick).toHaveBeenCalledWith('1')
  });

  it('calls onJoinSpace when join button is clicked', () => {
    const onJoinSpace = jest.fn();
    render(<CampusSpacesCard spaces={mockSpaces} onJoinSpace={onJoinSpace} />);
    
    fireEvent.click(screen.getByText('Join New Space'));
    expect(onJoinSpace).toHaveBeenCalled()
  });

  it('calls onViewAll when view all is clicked', () => {
    const onViewAll = jest.fn();
    render(<CampusSpacesCard spaces={mockSpaces} onViewAll={onViewAll} />);
    
    fireEvent.click(screen.getByText('View All'));
    expect(onViewAll).toHaveBeenCalled()
  });

  it('renders loading state correctly', () => {
    render(<CampusSpacesCard spaces={[]} isLoading={true} />);
    
    // Should show loading skeleton;
    const loadingElements = document.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0)
  });

  it('renders empty state correctly', () => {
    render(<CampusSpacesCard spaces={[]} />);
    
    expect(screen.getByText('No Spaces Yet')).toBeInTheDocument();
    expect(screen.getByText('Join campus spaces to connect with your community')).toBeInTheDocument()
  });

  it('limits displayed spaces to 6 and shows more indicator', () => {
    const manySpaces = Array.from({ length: 10 }, (_, i) => ({
      ...mockSpaces[0],
      id: `space-${i}`,
      name: `Space ${i}`,
    }));
    
    const onViewAll = jest.fn();
    render(<CampusSpacesCard spaces={manySpaces} onViewAll={onViewAll} />);
    
    // Should show "more spaces" indicator;
    expect(screen.getByText('+4 more spaces')).toBeInTheDocument()
  });

  it('hides quick actions when showQuickActions is false', () => {
    render(<CampusSpacesCard spaces={mockSpaces} showQuickActions={false} />);
    
    expect(screen.queryByText('View All')).not.toBeInTheDocument();
    expect(screen.queryByText('Join New Space')).not.toBeInTheDocument()
  });

  it('displays space type correctly', () => {
    render(<CampusSpacesCard spaces={mockSpaces} />);
    
    expect(screen.getByText('course')).toBeInTheDocument();
    expect(screen.getByText('housing')).toBeInTheDocument();
    expect(screen.getByText('club')).toBeInTheDocument()
  })
});