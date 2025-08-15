import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProfileLoadingSkeleton, ProfileSectionSkeleton } from '../../../components/profile/profile-loading-skeleton';

// Mock HiveUI components
vi.mock('@hive/ui', () => ({
  Card: ({ children, className }: any) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  ),
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">
      {children}
    </div>
  ),
  CardHeader: ({ children }: any) => (
    <div data-testid="card-header">
      {children}
    </div>
  ),
}));

describe('ProfileLoadingSkeleton', () => {
  describe('Component Structure', () => {
    it('renders the main profile loading skeleton', () => {
      render(<ProfileLoadingSkeleton />);

      // Should render the main container with min-h-screen class
      const container = document.querySelector('.min-h-screen');
      expect(container).toBeTruthy();
    });

    it('renders cover image skeleton', () => {
      render(<ProfileLoadingSkeleton />);

      // Should have cover image area with proper height classes
      const coverSkeleton = document.querySelector('.h-48');
      expect(coverSkeleton).toBeTruthy();
    });

    it('renders avatar skeleton', () => {
      render(<ProfileLoadingSkeleton />);

      // Should have avatar skeleton with rounded-full class
      const avatarSkeleton = document.querySelector('.rounded-full');
      expect(avatarSkeleton).toBeTruthy();
    });

    it('renders profile info skeletons', () => {
      render(<ProfileLoadingSkeleton />);

      // Should have multiple skeleton elements for profile information
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(10);
    });

    it('renders action buttons skeletons', () => {
      render(<ProfileLoadingSkeleton />);

      // Should have button-sized skeletons
      const buttonSkeletons = document.querySelectorAll('.h-10');
      expect(buttonSkeletons.length).toBeGreaterThan(0);
    });
  });

  describe('Stats Bar Skeleton', () => {
    it('renders stats bar with correct number of items', () => {
      render(<ProfileLoadingSkeleton />);

      // Should render 7 stat items (based on the Array.from({ length: 7 }))
      const statsGrid = document.querySelector('.grid-cols-2');
      expect(statsGrid).toBeTruthy();
      
      // Should have 7 stat skeleton items within the stats section
      const statItems = document.querySelectorAll('.text-center.space-y-1');
      expect(statItems.length).toBe(7);
    });

    it('applies responsive grid classes to stats', () => {
      render(<ProfileLoadingSkeleton />);

      const statsGrid = document.querySelector('.grid-cols-2');
      expect(statsGrid).toBeTruthy();
    });
  });

  describe('Tabs and Content Skeleton', () => {
    it('renders tabs skeleton', () => {
      render(<ProfileLoadingSkeleton />);

      // Should have tabs area with navigation-like skeleton
      const tabsSkeleton = document.querySelector('.h-10.w-80');
      expect(tabsSkeleton).toBeTruthy();
    });

    it('renders tab controls skeleton', () => {
      render(<ProfileLoadingSkeleton />);

      // Should have tab control buttons (8x8 squares)
      const tabControls = document.querySelectorAll('.h-8.w-8');
      expect(tabControls.length).toBeGreaterThan(0);
    });

    it('renders content cards', () => {
      render(<ProfileLoadingSkeleton />);

      // Should render 3 content cards
      const cards = screen.getAllByTestId('card');
      expect(cards.length).toBe(3);
    });

    it('renders card headers and content', () => {
      render(<ProfileLoadingSkeleton />);

      const cardHeaders = screen.getAllByTestId('card-header');
      const cardContents = screen.getAllByTestId('card-content');
      
      expect(cardHeaders.length).toBe(3);
      expect(cardContents.length).toBe(3);
    });

    it('renders grid items within cards', () => {
      render(<ProfileLoadingSkeleton />);

      // Each card should have 6 grid items (3 cards × 6 items = 18 total)
      const gridItems = document.querySelectorAll('.p-4.bg-hive-background-primary.rounded-lg');
      expect(gridItems.length).toBe(18);
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes for mobile and desktop', () => {
      render(<ProfileLoadingSkeleton />);

      // Check for responsive padding classes
      const responsivePadding = document.querySelector('.px-4');
      expect(responsivePadding).toBeTruthy();

      // Check for responsive avatar size
      const responsiveAvatar = document.querySelector('.w-24.h-24');
      expect(responsiveAvatar).toBeTruthy();

      // Check for responsive flex direction
      const responsiveFlex = document.querySelector('.flex-col');
      expect(responsiveFlex).toBeTruthy();
    });

    it('applies responsive grid layouts', () => {
      render(<ProfileLoadingSkeleton />);

      // Check for responsive content grid
      const responsiveGrid = document.querySelector('.grid-cols-1');
      expect(responsiveGrid).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('applies proper background classes for dark theme', () => {
      render(<ProfileLoadingSkeleton />);

      // Should use hive background classes
      const darkBackground = document.querySelector('.bg-hive-background-primary');
      expect(darkBackground).toBeTruthy();
    });

    it('uses semantic color classes', () => {
      render(<ProfileLoadingSkeleton />);

      // Should use semantic hive color classes
      const semanticColors = document.querySelectorAll('[class*="bg-hive-"]');
      expect(semanticColors.length).toBeGreaterThan(5);
    });
  });

  describe('Animation Classes', () => {
    it('applies pulse animation to skeleton elements', () => {
      render(<ProfileLoadingSkeleton />);

      const animatedElements = document.querySelectorAll('.animate-pulse');
      expect(animatedElements.length).toBeGreaterThan(20);
    });

    it('applies rounded corners to skeleton elements', () => {
      render(<ProfileLoadingSkeleton />);

      const roundedElements = document.querySelectorAll('.rounded-md, .rounded-lg, .rounded-full');
      expect(roundedElements.length).toBeGreaterThan(10);
    });
  });

  describe('Layout Structure', () => {
    it('maintains proper layout hierarchy', () => {
      render(<ProfileLoadingSkeleton />);

      // Should have main container
      const container = document.querySelector('.min-h-screen');
      expect(container).toBeTruthy();

      // Should have relative positioning for header
      const relativeHeader = document.querySelector('.relative');
      expect(relativeHeader).toBeTruthy();

      // Should have proper spacing classes
      const spacingElements = document.querySelectorAll('[class*="mt-"], [class*="mb-"], [class*="gap-"]');
      expect(spacingElements.length).toBeGreaterThan(10);
    });
  });
});

describe('ProfileSectionSkeleton', () => {
  describe('Component Structure', () => {
    it('renders with default props', () => {
      render(<ProfileSectionSkeleton title="Test Section" />);

      const card = screen.getByTestId('card');
      const header = screen.getByTestId('card-header');
      const content = screen.getByTestId('card-content');

      expect(card).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });

    it('renders with custom item count', () => {
      render(<ProfileSectionSkeleton title="Test Section" itemCount={4} />);

      // Should render 4 items instead of default 6 - use simpler selector
      const gridContainer = document.querySelector('.grid.grid-cols-1');
      const gridItems = gridContainer?.querySelectorAll('.p-4') || [];
      expect(gridItems.length).toBe(4);
    });

    it('applies correct CSS classes', () => {
      render(<ProfileSectionSkeleton title="Test Section" />);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-hive-surface-elevated', 'border-hive-border-subtle');
    });
  });

  describe('Header Section', () => {
    it('renders header with title and action skeletons', () => {
      render(<ProfileSectionSkeleton title="Test Section" />);

      const header = screen.getByTestId('card-header');
      
      // Should have title skeleton
      const titleSkeleton = header.querySelector('.h-6.w-32');
      expect(titleSkeleton).toBeTruthy();
      
      // Should have action skeleton
      const actionSkeleton = header.querySelector('.h-8.w-20');
      expect(actionSkeleton).toBeTruthy();
    });

    it('uses proper header layout', () => {
      render(<ProfileSectionSkeleton title="Test Section" />);

      const headerContent = document.querySelector('.flex.items-center.justify-between');
      expect(headerContent).toBeTruthy();
    });
  });

  describe('Content Grid', () => {
    it('renders default number of items', () => {
      render(<ProfileSectionSkeleton title="Test Section" />);

      // Use a simpler selector since CSS classes with slashes are tricky
      const gridContainer = document.querySelector('.grid.grid-cols-1');
      const gridItems = gridContainer?.querySelectorAll('.p-4') || [];
      expect(gridItems.length).toBe(6);
    });

    it('renders custom number of items', () => {
      render(<ProfileSectionSkeleton title="Test Section" itemCount={10} />);

      // Use a simpler selector since CSS classes with slashes are tricky
      const gridContainer = document.querySelector('.grid.grid-cols-1');
      const gridItems = gridContainer?.querySelectorAll('.p-4') || [];
      expect(gridItems.length).toBe(10);
    });

    it('handles zero items', () => {
      render(<ProfileSectionSkeleton title="Test Section" itemCount={0} />);

      // Use a simpler selector since CSS classes with slashes are tricky
      const gridContainer = document.querySelector('.grid.grid-cols-1');
      const gridItems = gridContainer?.querySelectorAll('.p-4') || [];
      expect(gridItems.length).toBe(0);
    });

    it('applies responsive grid layout', () => {
      render(<ProfileSectionSkeleton title="Test Section" />);

      const grid = document.querySelector('.grid.grid-cols-1');
      expect(grid).toBeTruthy();
    });
  });

  describe('Grid Item Structure', () => {
    it('renders proper item structure', () => {
      render(<ProfileSectionSkeleton title="Test Section" itemCount={1} />);

      // Use simpler selector since CSS classes with slashes are tricky
      const gridContainer = document.querySelector('.grid.grid-cols-1');
      const gridItem = gridContainer?.querySelector('.p-4');
      expect(gridItem).toBeTruthy();

      // Should have flex container
      const flexContainer = gridItem?.querySelector('.flex.items-start.gap-3');
      expect(flexContainer).toBeTruthy();

      // Should have icon skeleton
      const iconSkeleton = flexContainer?.querySelector('.w-12.h-12.rounded-lg');
      expect(iconSkeleton).toBeTruthy();

      // Should have content skeletons
      const contentArea = flexContainer?.querySelector('.flex-1.space-y-2');
      expect(contentArea).toBeTruthy();
    });

    it('renders multiple skeleton lines per item', () => {
      render(<ProfileSectionSkeleton title="Test Section" itemCount={1} />);

      const contentArea = document.querySelector('.flex-1.space-y-2');
      const skeletonLines = contentArea?.querySelectorAll('.animate-pulse');
      
      // Should have multiple skeleton lines (title, subtitle, and tag group)
      expect(skeletonLines?.length).toBeGreaterThan(2);
    });

    it('renders tag group skeleton', () => {
      render(<ProfileSectionSkeleton title="Test Section" itemCount={1} />);

      const tagGroup = document.querySelector('.flex.gap-2');
      expect(tagGroup).toBeTruthy();

      const tagSkeletons = tagGroup?.querySelectorAll('.h-3');
      expect(tagSkeletons?.length).toBe(2);
    });
  });

  describe('Styling and Colors', () => {
    it('uses consistent hive color scheme', () => {
      render(<ProfileSectionSkeleton title="Test Section" />);

      const hiveColorElements = document.querySelectorAll('[class*="bg-hive-"]');
      expect(hiveColorElements.length).toBeGreaterThan(5);
    });

    it('applies proper skeleton backgrounds', () => {
      render(<ProfileSectionSkeleton title="Test Section" itemCount={1} />);

      const bgPrimarySkeletons = document.querySelectorAll('.bg-hive-background-primary');
      const bgSurfaceSkeletons = document.querySelectorAll('.bg-hive-surface-elevated');
      
      expect(bgPrimarySkeletons.length).toBeGreaterThan(0);
      expect(bgSurfaceSkeletons.length).toBeGreaterThan(0);
    });

    it('applies animation classes', () => {
      render(<ProfileSectionSkeleton title="Test Section" />);

      const animatedElements = document.querySelectorAll('.animate-pulse');
      expect(animatedElements.length).toBeGreaterThan(3);
    });
  });

  describe('Props Handling', () => {
    it('handles title prop correctly', () => {
      render(<ProfileSectionSkeleton title="Custom Title" />);

      // Title is used for semantic purposes but not displayed in skeleton
      const component = screen.getByTestId('card');
      expect(component).toBeInTheDocument();
    });

    it('handles various itemCount values', () => {
      const testCounts = [0, 1, 3, 6, 12, 20];
      
      testCounts.forEach(count => {
        const { unmount } = render(<ProfileSectionSkeleton title="Test" itemCount={count} />);
        
        // Use simpler selector since CSS classes with slashes are tricky
        const gridContainer = document.querySelector('.grid.grid-cols-1');
        const gridItems = gridContainer?.querySelectorAll('.p-4') || [];
        expect(gridItems.length).toBe(count);
        
        unmount();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles negative itemCount gracefully', () => {
      render(<ProfileSectionSkeleton title="Test" itemCount={-1} />);

      // Use simpler selector since CSS classes with slashes are tricky
      const gridContainer = document.querySelector('.grid.grid-cols-1');
      const gridItems = gridContainer?.querySelectorAll('.p-4') || [];
      expect(gridItems.length).toBe(0);
    });

    it('handles very large itemCount', () => {
      render(<ProfileSectionSkeleton title="Test" itemCount={100} />);

      // Use simpler selector since CSS classes with slashes are tricky
      const gridContainer = document.querySelector('.grid.grid-cols-1');
      const gridItems = gridContainer?.querySelectorAll('.p-4') || [];
      expect(gridItems.length).toBe(100);
    });

    it('handles empty title', () => {
      render(<ProfileSectionSkeleton title="" />);

      const component = screen.getByTestId('card');
      expect(component).toBeInTheDocument();
    });
  });
});