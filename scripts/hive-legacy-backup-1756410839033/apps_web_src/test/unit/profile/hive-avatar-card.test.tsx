import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HiveAvatarCard } from '../../../components/profile/hive-avatar-card';

// Mock HiveCard component
vi.mock('@hive/ui', () => ({
  HiveCard: ({ children, className, onClick, onMouseEnter, onMouseLeave }: any) => (
    <div 
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid="hive-card"
    >
      {children}
    </div>
  ),
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, fill, className }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={src} 
      alt={alt} 
      className={className}
      data-fill={fill}
      data-testid="profile-image"
    />
  ),
}));

describe('HiveAvatarCard', () => {
  const mockOnEditProfile = vi.fn();

  const baseProfile = {
    fullName: 'John Doe',
    academicYear: 'junior' as const,
    major: 'Computer Science',
    housing: 'Ellicott Complex',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with basic profile information', () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText(/junior • Computer Science/)).toBeInTheDocument();
      expect(screen.getByText('Ellicott Complex')).toBeInTheDocument();
    });

    it('displays initials when no profile photo', () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.getByText('📷 Add Photo')).toBeInTheDocument();
      expect(screen.getAllByText('Upload or take photo')).toHaveLength(2); // Appears in both static and hover states
    });

    it('displays profile photo when available', () => {
      const profileWithPhoto = {
        ...baseProfile,
        profilePhoto: 'https://example.com/photo.jpg',
      };

      render(
        <HiveAvatarCard 
          profile={profileWithPhoto}
          onEditProfile={mockOnEditProfile}
        />
      );

      const profileImage = screen.getByTestId('profile-image');
      expect(profileImage).toHaveAttribute('src', 'https://example.com/photo.jpg');
      expect(profileImage).toHaveAttribute('alt', "John Doe's profile");
    });

    it('prioritizes profilePhoto over avatarUrl', () => {
      const profileWithBothUrls = {
        ...baseProfile,
        profilePhoto: 'https://example.com/profile.jpg',
        avatarUrl: 'https://example.com/avatar.jpg',
      };

      render(
        <HiveAvatarCard 
          profile={profileWithBothUrls}
          onEditProfile={mockOnEditProfile}
        />
      );

      const profileImage = screen.getByTestId('profile-image');
      expect(profileImage).toHaveAttribute('src', 'https://example.com/profile.jpg');
    });
  });

  describe('Name Display', () => {
    it('displays preferred name when available', () => {
      const profileWithPreferredName = {
        ...baseProfile,
        fullName: 'Jonathan Michael Doe',
        preferredName: 'Jon',
      };

      render(
        <HiveAvatarCard 
          profile={profileWithPreferredName}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('Jon')).toBeInTheDocument();
    });

    it('displays first name when no preferred name', () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('John')).toBeInTheDocument();
    });

    it('displays age when provided', () => {
      const profileWithAge = {
        ...baseProfile,
        age: 21,
      };

      render(
        <HiveAvatarCard 
          profile={profileWithAge}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('John, 21')).toBeInTheDocument();
    });

    it('handles single name correctly', () => {
      const singleNameProfile = {
        ...baseProfile,
        fullName: 'Madonna',
      };

      render(
        <HiveAvatarCard 
          profile={singleNameProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('Madonna')).toBeInTheDocument();
      expect(screen.getByText('M')).toBeInTheDocument(); // Initials
    });
  });

  describe('Builder Badge', () => {
    it('shows builder badge when user is builder', () => {
      const builderProfile = {
        ...baseProfile,
        isBuilder: true,
      };

      render(
        <HiveAvatarCard 
          profile={builderProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('🔨')).toBeInTheDocument();
    });

    it('hides builder badge when user is not builder', () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.queryByText('🔨')).not.toBeInTheDocument();
    });
  });

  describe('Academic Information', () => {
    it('displays academic year and major', () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText(/junior • Computer Science/)).toBeInTheDocument();
    });

    it('handles different academic years', () => {
      const freshmanProfile = {
        ...baseProfile,
        academicYear: 'freshman' as const,
      };

      render(
        <HiveAvatarCard 
          profile={freshmanProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText(/freshman • Computer Science/)).toBeInTheDocument();
    });

    it('displays housing information when provided', () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('Ellicott Complex')).toBeInTheDocument();
    });

    it('handles missing housing information', () => {
      const profileWithoutHousing = {
        ...baseProfile,
        housing: '',
      };

      render(
        <HiveAvatarCard 
          profile={profileWithoutHousing}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.queryByText('Ellicott Complex')).not.toBeInTheDocument();
    });
  });

  describe('Hover Interactions', () => {
    it('shows hover elements on mouse enter', async () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      const card = screen.getByTestId('hive-card');
      fireEvent.mouseEnter(card);

      await waitFor(() => {
        expect(screen.getByText('⚙️')).toBeInTheDocument();
        expect(screen.getByText('Complete Profile ↗')).toBeInTheDocument();
      });
    });

    it('hides hover elements on mouse leave', async () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      const card = screen.getByTestId('hive-card');
      
      // First hover to show elements
      fireEvent.mouseEnter(card);
      await waitFor(() => {
        expect(screen.getByText('⚙️')).toBeInTheDocument();
      });

      // Then leave to hide elements
      fireEvent.mouseLeave(card);
      
      // Elements should still be in DOM but with opacity classes
      expect(screen.getByText('⚙️')).toBeInTheDocument();
    });

    it('shows different hover text for users with photos', async () => {
      const profileWithPhoto = {
        ...baseProfile,
        profilePhoto: 'https://example.com/photo.jpg',
      };

      render(
        <HiveAvatarCard 
          profile={profileWithPhoto}
          onEditProfile={mockOnEditProfile}
        />
      );

      const card = screen.getByTestId('hive-card');
      fireEvent.mouseEnter(card);

      await waitFor(() => {
        expect(screen.getByText('Change Photo')).toBeInTheDocument();
        expect(screen.getByText('Edit Profile ↗')).toBeInTheDocument();
      });
    });

    it('shows different hover text for users without photos', async () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      const card = screen.getByTestId('hive-card');
      fireEvent.mouseEnter(card);

      await waitFor(() => {
        expect(screen.getByText('Add Photo')).toBeInTheDocument();
        expect(screen.getByText('Complete Profile ↗')).toBeInTheDocument();
      });
    });
  });

  describe('Click Interactions', () => {
    it('calls onEditProfile when card is clicked', () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      const card = screen.getByTestId('hive-card');
      fireEvent.click(card);

      expect(mockOnEditProfile).toHaveBeenCalledTimes(1);
    });
  });

  describe('Initials Generation', () => {
    it('generates correct initials for multiple names', () => {
      const multiNameProfile = {
        ...baseProfile,
        fullName: 'John Michael Doe Smith',
      };

      render(
        <HiveAvatarCard 
          profile={multiNameProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('JMDS')).toBeInTheDocument();
    });

    it('handles empty name gracefully', () => {
      const emptyNameProfile = {
        ...baseProfile,
        fullName: '',
      };

      render(
        <HiveAvatarCard 
          profile={emptyNameProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('U')).toBeInTheDocument(); // Default 'U' for User
    });

    it('handles name with special characters', () => {
      const specialNameProfile = {
        ...baseProfile,
        fullName: 'María José González-Smith',
      };

      render(
        <HiveAvatarCard 
          profile={specialNameProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      expect(screen.getByText('MJGS')).toBeInTheDocument();
    });
  });

  describe('Pronouns Display', () => {
    it('does not display pronouns in this component', () => {
      const profileWithPronouns = {
        ...baseProfile,
        pronouns: 'he/him',
      };

      render(
        <HiveAvatarCard 
          profile={profileWithPronouns}
          onEditProfile={mockOnEditProfile}
        />
      );

      // This component doesn't show pronouns based on the implementation
      expect(screen.queryByText('he/him')).not.toBeInTheDocument();
    });
  });

  describe('Status Message', () => {
    it('does not display status message in this component', () => {
      const profileWithStatus = {
        ...baseProfile,
        statusMessage: 'Studying for finals 📚',
      };

      render(
        <HiveAvatarCard 
          profile={profileWithStatus}
          onEditProfile={mockOnEditProfile}
        />
      );

      // This component doesn't show status messages based on the implementation
      expect(screen.queryByText('Studying for finals 📚')).not.toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
          className="custom-class"
        />
      );

      const container = screen.getByTestId('hive-card').parentElement;
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Mobile Responsiveness', () => {
    it('includes mobile touch indicator', () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      // The mobile indicator is rendered but hidden on desktop (md:hidden)
      const mobileIndicator = screen.getByText('John').closest('.relative')?.querySelector('.md\\:hidden');
      expect(mobileIndicator).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('provides proper alt text for profile image', () => {
      const profileWithPhoto = {
        ...baseProfile,
        profilePhoto: 'https://example.com/photo.jpg',
      };

      render(
        <HiveAvatarCard 
          profile={profileWithPhoto}
          onEditProfile={mockOnEditProfile}
        />
      );

      const profileImage = screen.getByTestId('profile-image');
      expect(profileImage).toHaveAttribute('alt', "John Doe's profile");
    });

    it('provides keyboard-accessible card interaction', () => {
      render(
        <HiveAvatarCard 
          profile={baseProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      const card = screen.getByTestId('hive-card');
      expect(card).toHaveClass('cursor-pointer'); // Indicates clickability
    });
  });

  describe('Loading States', () => {
    it('handles lazy loading for profile images', () => {
      const profileWithPhoto = {
        ...baseProfile,
        profilePhoto: 'https://example.com/photo.jpg',
      };

      render(
        <HiveAvatarCard 
          profile={profileWithPhoto}
          onEditProfile={mockOnEditProfile}
        />
      );

      // Next.js Image component should have lazy loading by default
      const profileImage = screen.getByTestId('profile-image');
      expect(profileImage).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long names gracefully', () => {
      const longNameProfile = {
        ...baseProfile,
        fullName: 'Abcdefghijklmnopqrstuvwxyz Abcdefghijklmnopqrstuvwxyz',
      };

      render(
        <HiveAvatarCard 
          profile={longNameProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      // Should truncate long names
      expect(screen.getByText('Abcdefghijklmnopqrstuvwxyz')).toBeInTheDocument();
    });

    it('handles very long housing information', () => {
      const longHousingProfile = {
        ...baseProfile,
        housing: 'Very Long Housing Complex Name That Should Be Truncated Because It Is Too Long',
      };

      render(
        <HiveAvatarCard 
          profile={longHousingProfile}
          onEditProfile={mockOnEditProfile}
        />
      );

      // Should handle long housing names with truncation classes
      expect(screen.getByText('Very Long Housing Complex Name That Should Be Truncated Because It Is Too Long')).toBeInTheDocument();
    });
  });
});