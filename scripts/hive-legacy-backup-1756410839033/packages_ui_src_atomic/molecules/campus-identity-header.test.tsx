import React from 'react';
import { render, screen } from '@testing-library/react';
import { CampusIdentityHeader } from './campus-identity-header';

const mockUser = {
  name: 'Sarah Chen',
  handle: 'sarahc_cs',
  year: '2026',
  major: 'Computer Science',
  dorm: 'West Campus',
  isOnline: true,
  isBuilder: false,
  completionPercentage: 85,
};

describe('CampusIdentityHeader', () => {
  it('renders user information correctly', () => {
    render(<CampusIdentityHeader user={mockUser} />);
    
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('@sarahc_cs')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText("'26")).toBeInTheDocument();
    expect(screen.getByText('West Campus')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('displays initials when no avatar is provided', () => {
    const userWithoutAvatar = { ...mockUser, avatar: undefined };
    render(<CampusIdentityHeader user={userWithoutAvatar} />);
    
    expect(screen.getByText('SC')).toBeInTheDocument();
  });

  it('shows builder badge for builder users', () => {
    const builderUser = { ...mockUser, isBuilder: true };
    render(<CampusIdentityHeader user={builderUser} />);
    
    expect(screen.getByText('Builder')).toBeInTheDocument();
  });

  it('formats handle correctly with @ prefix', () => {
    const userWithoutAt = { ...mockUser, handle: 'sarahc_cs' };
    render(<CampusIdentityHeader user={userWithoutAt} />);
    
    expect(screen.getByText('@sarahc_cs')).toBeInTheDocument();
  });

  it('handles completion percentage display', () => {
    render(<CampusIdentityHeader user={mockUser} />);
    
    // Progress ring should be rendered with correct percentage
    const progressRing = document.querySelector('circle[stroke-dasharray]');
    expect(progressRing).toBeInTheDocument();
  });
});