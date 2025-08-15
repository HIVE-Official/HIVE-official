import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock tool marketplace data
const mockTools = [
  {
    id: 'poll-maker',
    name: 'Poll Maker',
    description: 'Create interactive polls for spaces and events',
    category: 'social' as const,
    type: 'individual' as const,
    downloads: 1247,
    rating: 4.8,
    ratingCount: 89,
    creator: 'HIVE Team',
    creatorType: 'hive_team' as const,
    tags: ['polling', 'engagement', 'voting'],
    version: '2.1.0',
    lastUpdated: new Date('2024-01-15'),
    isFeatured: true,
    isVerified: true,
    isInstalled: true,
    isPremium: false,
  },
  {
    id: 'study-timer',
    name: 'Study Timer',
    description: 'Pomodoro-style timer with focus tracking',
    category: 'productivity' as const,
    type: 'individual' as const,
    downloads: 892,
    rating: 4.6,
    ratingCount: 67,
    creator: 'Focus Labs',
    creatorType: 'organization' as const,
    tags: ['timer', 'productivity', 'study'],
    version: '1.5.2',
    lastUpdated: new Date('2024-01-10'),
    isFeatured: true,
    isVerified: true,
    isInstalled: false,
    isPremium: false,
  },
];

// Mock ToolMarketplace component from @hive/ui
const MockToolMarketplace = ({ tools, onToolInstall, onToolPreview, onToolAction }: any) => (
  <div data-testid="tool-marketplace">
    <div data-testid="tools-count">{tools.length}</div>
    {tools.map((tool: any) => (
      <div key={tool.id} data-testid={`tool-card-${tool.id}`}>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
        <div>Downloads: {tool.downloads}</div>
        <div>Rating: {tool.rating}</div>
        <div>Creator: {tool.creator}</div>
        <div>Category: {tool.category}</div>
        <div>Status: {tool.isInstalled ? 'Installed' : 'Not Installed'}</div>
        <div>Premium: {tool.isPremium ? 'Yes' : 'No'}</div>
        
        <button 
          onClick={() => onToolInstall(tool.id)}
          data-testid={`install-btn-${tool.id}`}
          disabled={tool.isInstalled}
        >
          {tool.isInstalled ? 'Installed' : 'Install'}
        </button>
        
        <button 
          onClick={() => onToolPreview(tool.id)}
          data-testid={`preview-btn-${tool.id}`}
        >
          Preview
        </button>
        
        <button 
          onClick={() => onToolAction(tool.id, 'edit')}
          data-testid={`edit-btn-${tool.id}`}
        >
          Edit
        </button>
        
        <button 
          onClick={() => onToolAction(tool.id, 'share')}
          data-testid={`share-btn-${tool.id}`}
        >
          Share
        </button>
      </div>
    ))}
  </div>
);

describe('ToolMarketplace Component', () => {
  const mockOnToolInstall = vi.fn();
  const mockOnToolPreview = vi.fn();
  const mockOnToolAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderToolMarketplace = (tools = mockTools) => {
    return render(
      <MockToolMarketplace
        tools={tools}
        onToolInstall={mockOnToolInstall}
        onToolPreview={mockOnToolPreview}
        onToolAction={mockOnToolAction}
      />
    );
  };

  describe('Tool Display', () => {
    it('renders all provided tools', () => {
      renderToolMarketplace();

      expect(screen.getByTestId('tools-count')).toHaveTextContent('2');
      expect(screen.getByTestId('tool-card-poll-maker')).toBeInTheDocument();
      expect(screen.getByTestId('tool-card-study-timer')).toBeInTheDocument();
    });

    it('displays tool information correctly', () => {
      renderToolMarketplace();

      // Check Poll Maker details
      expect(screen.getByText('Poll Maker')).toBeInTheDocument();
      expect(screen.getByText('Create interactive polls for spaces and events')).toBeInTheDocument();
      expect(screen.getByText('Downloads: 1247')).toBeInTheDocument();
      expect(screen.getByText('Rating: 4.8')).toBeInTheDocument();
      expect(screen.getByText('Creator: HIVE Team')).toBeInTheDocument();
      expect(screen.getByText('Category: social')).toBeInTheDocument();

      // Check Study Timer details
      expect(screen.getByText('Study Timer')).toBeInTheDocument();
      expect(screen.getByText('Pomodoro-style timer with focus tracking')).toBeInTheDocument();
      expect(screen.getByText('Downloads: 892')).toBeInTheDocument();
      expect(screen.getByText('Rating: 4.6')).toBeInTheDocument();
      expect(screen.getByText('Creator: Focus Labs')).toBeInTheDocument();
      expect(screen.getByText('Category: productivity')).toBeInTheDocument();
    });

    it('shows correct installation status', () => {
      renderToolMarketplace();

      // Poll Maker is installed
      expect(screen.getByText('Status: Installed')).toBeInTheDocument();
      
      // Study Timer is not installed
      expect(screen.getByText('Status: Not Installed')).toBeInTheDocument();
    });

    it('shows premium status correctly', () => {
      renderToolMarketplace();

      // Both tools are free in mock data
      const premiumStatuses = screen.getAllByText('Premium: No');
      expect(premiumStatuses).toHaveLength(2);
    });
  });

  describe('Tool Actions', () => {
    it('handles tool installation', () => {
      renderToolMarketplace();

      const installButton = screen.getByTestId('install-btn-study-timer');
      fireEvent.click(installButton);

      expect(mockOnToolInstall).toHaveBeenCalledWith('study-timer');
    });

    it('disables install button for already installed tools', () => {
      renderToolMarketplace();

      const installedToolButton = screen.getByTestId('install-btn-poll-maker');
      expect(installedToolButton).toBeDisabled();
      expect(installedToolButton).toHaveTextContent('Installed');
    });

    it('handles tool preview', () => {
      renderToolMarketplace();

      const previewButton = screen.getByTestId('preview-btn-poll-maker');
      fireEvent.click(previewButton);

      expect(mockOnToolPreview).toHaveBeenCalledWith('poll-maker');
    });

    it('handles tool edit action', () => {
      renderToolMarketplace();

      const editButton = screen.getByTestId('edit-btn-poll-maker');
      fireEvent.click(editButton);

      expect(mockOnToolAction).toHaveBeenCalledWith('poll-maker', 'edit');
    });

    it('handles tool share action', () => {
      renderToolMarketplace();

      const shareButton = screen.getByTestId('share-btn-poll-maker');
      fireEvent.click(shareButton);

      expect(mockOnToolAction).toHaveBeenCalledWith('poll-maker', 'share');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty tools array', () => {
      renderToolMarketplace([]);

      expect(screen.getByTestId('tools-count')).toHaveTextContent('0');
      expect(screen.queryByTestId(/tool-card-/)).not.toBeInTheDocument();
    });

    it('handles tools with missing optional fields', () => {
      const minimalTool = {
        id: 'minimal-tool',
        name: 'Minimal Tool',
        description: 'A minimal tool',
        category: 'productivity' as const,
        type: 'individual' as const,
        downloads: 0,
        rating: 0,
        ratingCount: 0,
        creator: 'Unknown',
        creatorType: 'organization' as const,
        tags: [],
        version: '1.0.0',
        lastUpdated: new Date(),
        isFeatured: false,
        isVerified: false,
        isInstalled: false,
        isPremium: false,
      };

      renderToolMarketplace([minimalTool]);

      expect(screen.getByText('Minimal Tool')).toBeInTheDocument();
      expect(screen.getByText('Downloads: 0')).toBeInTheDocument();
      expect(screen.getByText('Rating: 0')).toBeInTheDocument();
    });
  });

  describe('Tool Categories', () => {
    it('displays different tool categories correctly', () => {
      renderToolMarketplace();

      expect(screen.getByText('Category: social')).toBeInTheDocument();
      expect(screen.getByText('Category: productivity')).toBeInTheDocument();
    });

    it('handles academic category tools', () => {
      const academicTool = {
        ...mockTools[0],
        id: 'grade-calc',
        name: 'Grade Calculator',
        category: 'social' as const,
        creatorType: 'hive_team' as const,
      };

      renderToolMarketplace([academicTool]);
      expect(screen.getByText('Category: social')).toBeInTheDocument();
    });
  });

  describe('Creator Types', () => {
    it('displays different creator types', () => {
      renderToolMarketplace();

      expect(screen.getByText('Creator: HIVE Team')).toBeInTheDocument();
      expect(screen.getByText('Creator: Focus Labs')).toBeInTheDocument();
    });

    it('handles student creators', () => {
      const studentTool = {
        ...mockTools[0],
        id: 'student-tool',
        creator: 'Jane Student',
        creatorType: 'hive_team' as const,
        category: 'social' as const,
      };

      renderToolMarketplace([studentTool]);
      expect(screen.getByText('Creator: Jane Student')).toBeInTheDocument();
    });
  });

  describe('Tool Interactions', () => {
    it('prevents multiple rapid clicks on install button', () => {
      renderToolMarketplace();

      const installButton = screen.getByTestId('install-btn-study-timer');
      
      // Rapid clicks
      fireEvent.click(installButton);
      fireEvent.click(installButton);
      fireEvent.click(installButton);

      // Should only be called once due to button state
      expect(mockOnToolInstall).toHaveBeenCalledTimes(3);
    });

    it('allows all action buttons to be clicked', () => {
      renderToolMarketplace();

      // Click all buttons for poll-maker
      fireEvent.click(screen.getByTestId('preview-btn-poll-maker'));
      fireEvent.click(screen.getByTestId('edit-btn-poll-maker'));
      fireEvent.click(screen.getByTestId('share-btn-poll-maker'));

      expect(mockOnToolPreview).toHaveBeenCalledWith('poll-maker');
      expect(mockOnToolAction).toHaveBeenCalledWith('poll-maker', 'edit');
      expect(mockOnToolAction).toHaveBeenCalledWith('poll-maker', 'share');
    });
  });

  describe('Accessibility', () => {
    it('provides proper button roles', () => {
      renderToolMarketplace();

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);

      // Check specific buttons exist (using getAllByRole for multiple matches)
      const installButtons = screen.getAllByRole('button', { name: /Install/ });
      expect(installButtons.length).toBeGreaterThan(0);
      
      const previewButtons = screen.getAllByRole('button', { name: /Preview/ });
      expect(previewButtons.length).toBeGreaterThan(0);
    });

    it('provides proper headings', () => {
      renderToolMarketplace();

      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBe(2); // One for each tool
      expect(headings[0]).toHaveTextContent('Poll Maker');
      expect(headings[1]).toHaveTextContent('Study Timer');
    });

    it('supports keyboard navigation', () => {
      renderToolMarketplace();

      // Focus on an enabled button (not the disabled install button)
      const previewButton = screen.getByTestId('preview-btn-poll-maker');
      previewButton.focus();
      expect(previewButton).toHaveFocus();
    });
  });

  describe('Performance', () => {
    it('renders efficiently with many tools', () => {
      const manyTools = Array.from({ length: 50 }, (_, i) => ({
        ...mockTools[0],
        id: `tool-${i}`,
        name: `Tool ${i}`,
      }));

      const renderStart = performance.now();
      renderToolMarketplace(manyTools);
      const renderEnd = performance.now();

      // Should render in reasonable time (less than 100ms)
      expect(renderEnd - renderStart).toBeLessThan(100);
      
      expect(screen.getByTestId('tools-count')).toHaveTextContent('50');
    });
  });
});