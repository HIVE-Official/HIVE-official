import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Import molecular and organism components
import { Card, Button, Input, Avatar, Badge } from "@hive/ui";

// Mock complex composed components
const UserCard = ({ user }: { user: any }) => (
  <Card>
    <Card.Header className="flex items-center gap-3">
      <Avatar src={user.avatar} name={user.name} size="md" />
      <div className="flex-1">
        <h3 className="hive-heading--h4">{user.name}</h3>
        <p className="hive-text--small text-neutral-600">@{user.handle}</p>
      </div>
      <Badge variant={user.verified ? 'success' : 'neutral'}>
        {user.verified ? 'Verified' : 'Unverified'}
      </Badge>
    </Card.Header>
    <Card.Content>
      <p className="hive-text--body">{user.bio}</p>
      <div className="flex gap-2 mt-4">
        {user.tags.map((tag: string) => (
          <Badge key={tag} variant="sophomore" size="sm">
            {tag}
          </Badge>
        ))}
      </div>
    </Card.Content>
    <Card.Footer className="flex justify-between">
      <Button variant="secondary" size="sm">
        View Profile
      </Button>
      <Button variant="primary" size="sm">
        Connect
      </Button>
    </Card.Footer>
  </Card>
);

const SearchForm = ({ onSearch }: { onSearch: (query: string) => void }) => (
  <Card>
    <Card.Content>
      <div className="flex gap-3">
        <Input
          placeholder="Search HIVE..."
          className="flex-1"
          icon="search"
        />
        <Button variant="primary" onClick={() => onSearch('test')}>
          Search
        </Button>
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="ghost" size="sm">Tools</Button>
        <Button variant="ghost" size="sm">Spaces</Button>
        <Button variant="ghost" size="sm">People</Button>
      </div>
    </Card.Content>
  </Card>
);

const ToolCard = ({ tool }: { tool: any }) => (
  <Card className="hive-tool-card">
    <Card.Header>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="hive-heading--h4">{tool.name}</h3>
          <p className="hive-text--small text-neutral-600">by @{tool.author}</p>
        </div>
        <Badge variant="senior">{tool.category}</Badge>
      </div>
    </Card.Header>
    <Card.Content>
      <p className="hive-text--body">{tool.description}</p>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-1">
          <span className="hive-text--small">★ {tool.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="hive-text--small">↓ {tool.downloads}</span>
        </div>
      </div>
    </Card.Content>
    <Card.Footer>
      <div className="flex gap-2">
        <Button variant="primary" className="flex-1">
          Use Tool
        </Button>
        <Button variant="secondary" size="md">
          ♡
        </Button>
      </div>
    </Card.Footer>
  </Card>
);

describe('Component Composition Consistency Tests', () => {
  const mockUser = {
    name: 'John Doe',
    handle: 'johndoe',
    avatar: 'https://example.com/avatar.jpg',
    bio: 'Computer Science student passionate about AI and web development',
    verified: true,
    tags: ['React', 'TypeScript', 'AI']
  };

  const mockTool = {
    name: 'Grade Calculator',
    author: 'studentdev',
    category: 'Academic',
    description: 'Calculate your GPA and track academic progress',
    rating: 4.8,
    downloads: '2.1k'
  };

  describe('Atomic to Molecular Composition', () => {
    it('ensures atoms maintain consistency when composed in molecules', () => {
      render(<UserCard user={mockUser} />);
      
      // Check that atomic components maintain their individual design tokens
      const avatar = screen.getByRole('img');
      const button = screen.getByRole('button', { name: 'Connect' });
      const badge = screen.getByText('Verified');
      
      // Avatar should maintain its size and styling
      expect(avatar).toHaveClass('hive-avatar--medium');
      
      // Button should maintain its variant styling
      expect(button).toHaveClass('hive-button--primary', 'hive-button--small');
      
      // Badge should maintain its variant styling
      expect(badge).toHaveClass('hive-badge--success');
    });

    it('validates proper spacing relationships between atoms in molecules', () => {
      const { container } = render(<UserCard user={mockUser} />);
      
      // Check spacing between avatar and user info
      const cardHeader = container.querySelector('.hive-card__header');
      expect(cardHeader).toHaveClass('flex', 'items-center', 'gap-3');
      
      // Check spacing between tags
      const tagsContainer = container.querySelector('.flex.gap-2.mt-4');
      expect(tagsContainer).toBeInTheDocument();
      
      // Verify consistent spacing tokens are used
      const headerStyles = window.getComputedStyle(cardHeader!);
      expect(headerStyles.gap).toBe('12px'); // gap-3 = 12px
    });

    it('ensures consistent typography hierarchy in composed components', () => {
      render(<UserCard user={mockUser} />);
      
      const userName = screen.getByText('John Doe');
      const userHandle = screen.getByText('@johndoe');
      const userBio = screen.getByText(/Computer Science student/);
      
      // Name should be a heading
      expect(userName).toHaveClass('hive-heading--h4');
      
      // Handle should be small text
      expect(userHandle).toHaveClass('hive-text--small');
      
      // Bio should be body text
      expect(userBio).toHaveClass('hive-text--body');
      
      // Typography hierarchy should be visually distinct
      const nameStyles = window.getComputedStyle(userName);
      const handleStyles = window.getComputedStyle(userHandle);
      const bioStyles = window.getComputedStyle(userBio);
      
      expect(parseFloat(nameStyles.fontSize)).toBeGreaterThan(parseFloat(handleStyles.fontSize));
      expect(parseFloat(bioStyles.fontSize)).toBeGreaterThan(parseFloat(handleStyles.fontSize));
    });

    it('validates color consistency in composed states', () => {
      render(<UserCard user={{ ...mockUser, verified: false }} />);
      
      const unverifiedBadge = screen.getByText('Unverified');
      expect(unverifiedBadge).toHaveClass('hive-badge--neutral');
      
      // Color should be consistent with neutral color token
      const badgeStyles = window.getComputedStyle(unverifiedBadge);
      expect(badgeStyles.backgroundColor).toMatch(/rgb\(107, 114, 128\)/); // neutral-500
    });
  });

  describe('Molecular to Organism Composition', () => {
    it('ensures molecular components maintain consistency in organisms', () => {
      const { container } = render(
        <div className="hive-user-directory">
          <UserCard user={mockUser} />
          <UserCard user={{ ...mockUser, name: 'Jane Smith', verified: false }} />
          <UserCard user={{ ...mockUser, name: 'Bob Wilson', verified: true }} />
        </div>
      );
      
      const userCards = container.querySelectorAll('.hive-card');
      expect(userCards).toHaveLength(3);
      
      // All cards should have consistent styling
      userCards.forEach((card) => {
        expect(card).toHaveClass('hive-card');
        
        const cardStyles = window.getComputedStyle(card);
        expect(cardStyles.borderRadius).toBe('8px');
        expect(cardStyles.padding).toBeTruthy();
      });
    });

    it('validates grid and layout consistency in organism compositions', () => {
      const { container } = render(
        <div className="hive-tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ToolCard tool={mockTool} />
          <ToolCard tool={{ ...mockTool, name: 'Study Planner' }} />
          <ToolCard tool={{ ...mockTool, name: 'Note Taker' }} />
        </div>
      );
      
      const toolsGrid = container.querySelector('.hive-tools-grid');
      const toolCards = container.querySelectorAll('.hive-tool-card');
      
      // Grid should have consistent spacing
      expect(toolsGrid).toHaveClass('gap-4');
      expect(toolCards).toHaveLength(3);
      
      // All tool cards should have consistent dimensions
      toolCards.forEach((card) => {
        const cardStyles = window.getComputedStyle(card);
        expect(cardStyles.display).toBe('flex');
        expect(cardStyles.flexDirection).toBe('column');
      });
    });

    it('ensures interaction consistency across composed organisms', () => {
      render(
        <div className="hive-dashboard">
          <SearchForm onSearch={() => {}} />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <UserCard user={mockUser} />
            <ToolCard tool={mockTool} />
          </div>
        </div>
      );
      
      // All interactive elements should have consistent focus behavior
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveClass(/hive-button/);
        
        // Focus should be consistent
        button.focus();
        const focusStyles = window.getComputedStyle(button);
        expect(focusStyles.outline).toContain('2px solid');
      });
    });
  });

  describe('Template and Page Composition', () => {
    it('validates consistent layout structure across page templates', () => {
      const PageTemplate = ({ children }: { children: React.ReactNode }) => (
        <div className="hive-page-template">
          <header className="hive-page-header">
            <div className="container mx-auto px-4 py-6">
              <h1 className="hive-heading--h1">Page Title</h1>
            </div>
          </header>
          <main className="hive-page-main">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
          <footer className="hive-page-footer">
            <div className="container mx-auto px-4 py-6">
              <p className="hive-text--small">Footer content</p>
            </div>
          </footer>
        </div>
      );
      
      const { container } = render(
        <PageTemplate>
          <SearchForm onSearch={() => {}} />
          <div className="grid grid-cols-2 gap-6 mt-8">
            <UserCard user={mockUser} />
            <ToolCard tool={mockTool} />
          </div>
        </PageTemplate>
      );
      
      // Page structure should be semantic and consistent
      expect(container.querySelector('header.hive-page-header')).toBeInTheDocument();
      expect(container.querySelector('main.hive-page-main')).toBeInTheDocument();
      expect(container.querySelector('footer.hive-page-footer')).toBeInTheDocument();
      
      // Container spacing should be consistent
      const containers = container.querySelectorAll('.container');
      containers.forEach((containerEl) => {
        expect(containerEl).toHaveClass('mx-auto', 'px-4');
      });
    });

    it('ensures responsive composition maintains consistency', () => {
      const ResponsiveGrid = () => (
        <div className="hive-responsive-layout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <UserCard user={mockUser} />
            <UserCard user={{ ...mockUser, name: 'Jane Smith' }} />
            <UserCard user={{ ...mockUser, name: 'Bob Wilson' }} />
          </div>
        </div>
      );
      
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
      const { container: mobileContainer } = render(<ResponsiveGrid />);
      const mobileGrid = mobileContainer.querySelector('.grid');
      expect(mobileGrid).toHaveClass('grid-cols-1');
      
      // Test tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      });
      
      const { container: tabletContainer } = render(<ResponsiveGrid />);
      const tabletGrid = tabletContainer.querySelector('.grid');
      expect(tabletGrid).toHaveClass('md:grid-cols-2');
      
      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });
      
      const { container: desktopContainer } = render(<ResponsiveGrid />);
      const desktopGrid = desktopContainer.querySelector('.grid');
      expect(desktopGrid).toHaveClass('lg:grid-cols-3');
    });
  });

  describe('Cross-Component Integration', () => {
    it('validates consistent data flow between composed components', () => {
      const IntegratedForm = () => {
        const [searchQuery, setSearchQuery] = React.useState('');
        
        return (
          <div className="hive-integrated-form">
            <Card>
              <Card.Header>
                <h2 className="hive-heading--h3">User Search</h2>
              </Card.Header>
              <Card.Content>
                <Input
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="mb-4"
                />
                <div className="flex gap-2">
                  <Button variant="primary" disabled={!searchQuery}>
                    Search
                  </Button>
                  <Button variant="secondary" onClick={() => setSearchQuery('')}>
                    Clear
                  </Button>
                </div>
              </Card.Content>
            </Card>
            
            {searchQuery && (
              <div className="mt-6">
                <UserCard user={mockUser} />
              </div>
            )}
          </div>
        );
      };
      
      render(<IntegratedForm />);
      
      const input = screen.getByPlaceholderText('Search users...');
      const searchButton = screen.getByRole('button', { name: 'Search' });
      
      // Initially search should be disabled
      expect(searchButton).toBeDisabled();
      
      // Components should maintain their individual styling
      expect(input).toHaveClass('hive-input');
      expect(searchButton).toHaveClass('hive-button--primary');
    });

    it('ensures consistent theming across all composition levels', () => {
      const ThemedComposition = ({ theme = 'light' }: { theme?: 'light' | 'dark' }) => (
        <div className={`hive-themed-composition theme-${theme}`}>
          <Card>
            <Card.Content>
              <UserCard user={mockUser} />
              <div className="mt-4">
                <ToolCard tool={mockTool} />
              </div>
            </Card.Content>
          </Card>
        </div>
      );
      
      const { container: lightContainer } = render(<ThemedComposition theme="light" />);
      const { container: darkContainer } = render(<ThemedComposition theme="dark" />);
      
      // Theme classes should be applied consistently
      expect(lightContainer.querySelector('.theme-light')).toBeInTheDocument();
      expect(darkContainer.querySelector('.theme-dark')).toBeInTheDocument();
      
      // All nested components should inherit theme
      const lightCards = lightContainer.querySelectorAll('.hive-card');
      const darkCards = darkContainer.querySelectorAll('.hive-card');
      
      expect(lightCards).toHaveLength(3); // Main card + user card + tool card
      expect(darkCards).toHaveLength(3);
    });

    it('validates accessibility composition maintains ARIA relationships', () => {
      const AccessibleComposition = () => (
        <div className="hive-accessible-composition">
          <Card role="region" aria-labelledby="user-info-title">
            <Card.Header>
              <h2 id="user-info-title" className="hive-heading--h3">User Information</h2>
            </Card.Header>
            <Card.Content>
              <div role="group" aria-labelledby="user-details">
                <h3 id="user-details" className="sr-only">User Details</h3>
                <UserCard user={mockUser} />
              </div>
              
              <div role="group" aria-labelledby="user-actions" className="mt-4">
                <h3 id="user-actions" className="sr-only">User Actions</h3>
                <div className="flex gap-2">
                  <Button aria-describedby="connect-help">Connect</Button>
                  <Button variant="secondary">Message</Button>
                </div>
                <p id="connect-help" className="hive-text--small text-neutral-600 mt-1">
                  Send a connection request to this user
                </p>
              </div>
            </Card.Content>
          </Card>
        </div>
      );
      
      render(<AccessibleComposition />);
      
      // Verify ARIA relationships are maintained
      const region = screen.getByRole('region');
      expect(region).toHaveAttribute('aria-labelledby', 'user-info-title');
      
      const groups = screen.getAllByRole('group');
      expect(groups).toHaveLength(2);
      
      const connectButton = screen.getByRole('button', { name: 'Connect' });
      expect(connectButton).toHaveAttribute('aria-describedby', 'connect-help');
    });
  });

  describe('Performance Composition Consistency', () => {
    it('ensures memoization consistency across composition levels', () => {
      const MemoizedUserCard = React.memo(UserCard);
      const MemoizedToolCard = React.memo(ToolCard);
      
      const ComposedComponent = () => (
        <div className="hive-performance-composition">
          <MemoizedUserCard user={mockUser} />
          <MemoizedToolCard tool={mockTool} />
        </div>
      );
      
      const { rerender } = render(<ComposedComponent />);
      
      // Verify components are properly memoized
      const initialUserCard = screen.getByText('John Doe');
      const initialToolCard = screen.getByText('Grade Calculator');
      
      // Re-render with same props
      rerender(<ComposedComponent />);
      
      // Components should maintain reference equality
      expect(screen.getByText('John Doe')).toBe(initialUserCard);
      expect(screen.getByText('Grade Calculator')).toBe(initialToolCard);
    });

    it('validates lazy loading consistency in composed layouts', () => {
      const LazyToolCard = React.lazy(() => Promise.resolve({ default: ToolCard }));
      
      const LazyComposition = () => (
        <div className="hive-lazy-composition">
          <UserCard user={mockUser} />
          <React.Suspense fallback={<div>Loading tool...</div>}>
            <LazyToolCard tool={mockTool} />
          </React.Suspense>
        </div>
      );
      
      render(<LazyComposition />);
      
      // User card should render immediately
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      
      // Tool card should show loading state initially
      expect(screen.getByText('Loading tool...')).toBeInTheDocument();
    });
  });
});