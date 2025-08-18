import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersonalToolsCard } from '../../../components/profile/personal-tools-card';

// Mock HiveUI components
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
  HiveButton: ({ children, onClick, variant, size, className, disabled }: any) => (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
      data-testid="hive-button"
    >
      {children}
    </button>
  ),
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
});

// Mock fetch
global.fetch = vi.fn();

// Mock console methods
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
};

// Mock location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

describe('PersonalToolsCard', () => {
  let queryClient: QueryClient;

  const mockTools = [
    {
      id: 'study-timer',
      name: 'Study Timer',
      icon: '⏱️',
      category: 'productivity' as const,
      isInstalled: true,
      lastUsed: '2024-01-20T10:30:00Z',
      usageCount: 45,
      quickLaunch: true,
    },
    {
      id: 'task-tracker',
      name: 'Task Tracker',
      icon: '✅',
      category: 'productivity' as const,
      isInstalled: true,
      lastUsed: '2024-01-20T09:15:00Z',
      usageCount: 32,
      quickLaunch: true,
    },
    {
      id: 'grade-calc',
      name: 'Grade Calculator',
      icon: '📊',
      category: 'study' as const,
      isInstalled: true,
      lastUsed: '2024-01-19T16:45:00Z',
      usageCount: 28,
      quickLaunch: true,
    },
  ];

  const mockStats = {
    totalTools: 6,
    weeklyUsage: 24,
    lastUsed: 'Study Timer • 2 hours ago',
    mostUsedTool: 'Note Keeper',
  };

  const mockOnToolClick = vi.fn();
  const mockOnManageTools = vi.fn();
  const mockOnAddTools = vi.fn();

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: 0,
          staleTime: 0,
        },
      },
    });

    vi.clearAllMocks();
    consoleSpy.log.mockClear();
    consoleSpy.warn.mockClear();

    // Mock successful API responses
    vi.mocked(fetch).mockImplementation((url) => {
      if (url === '/api/tools/personal') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ tools: mockTools }),
        } as Response);
      }
      if (url === '/api/tools/usage-stats') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ stats: mockStats }),
        } as Response);
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
      userId: 'test-user-123',
      token: 'test-token',
    }));
  });

  afterEach(() => {
    queryClient.clear();
    vi.resetAllMocks();
  });

  const renderCard = (props = {}) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <PersonalToolsCard {...props} />
      </QueryClientProvider>
    );
  };

  describe('Loading State', () => {
    it('shows loading state while fetching data', () => {
      // Mock pending fetch
      vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));

      renderCard();

      expect(screen.getByText('🔄 Syncing tool configurations and data...')).toBeInTheDocument();
      expect(screen.getByTestId('hive-card')).toHaveClass('animate-pulse');
    });

    it('renders loading skeleton with correct structure', () => {
      vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));

      renderCard();

      // Should have skeleton elements
      const skeletonElements = screen.getByTestId('hive-card').querySelectorAll('.bg-hive-text-muted\\/20');
      expect(skeletonElements.length).toBeGreaterThan(10);
    });
  });

  describe('Empty State', () => {
    it('shows empty state when no tools are installed', async () => {
      vi.mocked(fetch).mockImplementation((url) => {
        if (url === '/api/tools/personal') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ tools: [] }),
          } as Response);
        }
        if (url === '/api/tools/usage-stats') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ stats: mockStats }),
          } as Response);
        }
        return Promise.reject(new Error('Unknown URL'));
      });

      renderCard();

      await waitFor(() => {
        expect(screen.getByText('Build Your Personal Toolkit')).toBeInTheDocument();
        expect(screen.getByText('Tools are personal utilities that help you stay organized and productive.')).toBeInTheDocument();
        expect(screen.getByText('+ Install Your First Tool')).toBeInTheDocument();
      });
    });

    it('shows getting started instructions in empty state', async () => {
      vi.mocked(fetch).mockImplementation((url) => {
        if (url === '/api/tools/personal') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ tools: [] }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ stats: mockStats }),
        } as Response);
      });

      renderCard();

      await waitFor(() => {
        expect(screen.getByText('💡 GETTING STARTED:')).toBeInTheDocument();
        expect(screen.getByText('• Browse the tool marketplace')).toBeInTheDocument();
        expect(screen.getByText('• Install tools that fit your needs')).toBeInTheDocument();
        expect(screen.getByText('• Launch tools directly from your Profile')).toBeInTheDocument();
        expect(screen.getByText('• Track your productivity and usage')).toBeInTheDocument();
      });
    });

    it('handles clicks in empty state', async () => {
      vi.mocked(fetch).mockImplementation((url) => {
        if (url === '/api/tools/personal') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ tools: [] }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ stats: mockStats }),
        } as Response);
      });

      renderCard({ onAddTools: mockOnAddTools });

      await waitFor(() => {
        const installButton = screen.getByText('+ Install Your First Tool');
        fireEvent.click(installButton);
        expect(mockOnAddTools).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Tools Display', () => {
    it('displays tools in grid layout', async () => {
      renderCard();

      await waitFor(() => {
        expect(screen.getByText('🚀 INSTALLED TOOLS')).toBeInTheDocument();
        expect(screen.getByText('⏱️')).toBeInTheDocument(); // Study Timer icon
        expect(screen.getByText('✅')).toBeInTheDocument(); // Task Tracker icon
        expect(screen.getByText('📊')).toBeInTheDocument(); // Grade Calculator icon
      });
    });

    it('shows correct number of slots for desktop variant', async () => {
      renderCard({ variant: 'desktop' });

      await waitFor(() => {
        const toolGrid = screen.getByText('⏱️').closest('.grid');
        expect(toolGrid).toHaveClass('grid-cols-6');
        
        // Should have 12 slots (3 tools + 9 empty slots)
        const buttons = toolGrid?.querySelectorAll('button');
        expect(buttons?.length).toBe(12);
      });
    });

    it('shows correct number of slots for mobile variant', async () => {
      renderCard({ variant: 'mobile' });

      await waitFor(() => {
        const toolGrid = screen.getByText('⏱️').closest('.grid');
        expect(toolGrid).toHaveClass('grid-cols-4');
        
        // Should have 8 slots (3 tools + 5 empty slots)
        const buttons = toolGrid?.querySelectorAll('button');
        expect(buttons?.length).toBe(8);
      });
    });

    it('shows empty slots with add buttons', async () => {
      renderCard();

      await waitFor(() => {
        const addButtons = screen.getAllByText('+').filter(btn => 
          btn.closest('button')?.className.includes('border-dashed')
        );
        expect(addButtons.length).toBeGreaterThan(0);
      });
    });

    it('displays tool tooltips', async () => {
      renderCard();

      await waitFor(() => {
        const studyTimerButton = screen.getByText('⏱️').closest('button');
        expect(studyTimerButton).toHaveAttribute('title', 'Study Timer');
      });
    });
  });

  describe('Tool Interactions', () => {
    it('handles tool click with custom handler', async () => {
      renderCard({ onToolClick: mockOnToolClick });

      await waitFor(() => {
        const studyTimerButton = screen.getByText('⏱️');
        fireEvent.click(studyTimerButton);
        
        expect(mockOnToolClick).toHaveBeenCalledWith('study-timer');
        expect(consoleSpy.log).toHaveBeenCalledWith('Launching tool: study-timer');
      });
    });

    it('handles tool click with default navigation', async () => {
      renderCard();

      await waitFor(() => {
        const studyTimerButton = screen.getByText('⏱️');
        fireEvent.click(studyTimerButton);
        
        expect(window.location.href).toBe('/tools/study-timer/run');
      });
    });

    it('prevents event propagation on tool clicks', async () => {
      const cardClickSpy = vi.fn();
      renderCard({ onManageTools: cardClickSpy });

      await waitFor(() => {
        const studyTimerButton = screen.getByText('⏱️');
        fireEvent.click(studyTimerButton);
        
        // Card click handler should not be called
        expect(cardClickSpy).not.toHaveBeenCalled();
      });
    });

    it('handles empty slot clicks', async () => {
      renderCard({ onAddTools: mockOnAddTools });

      await waitFor(() => {
        const addButton = screen.getAllByText('+').find(btn => 
          btn.closest('button')?.className.includes('border-dashed')
        );
        fireEvent.click(addButton!);
        
        expect(mockOnAddTools).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Action Buttons', () => {
    it('renders all action buttons', async () => {
      renderCard();

      await waitFor(() => {
        expect(screen.getByText('+ Add')).toBeInTheDocument();
        expect(screen.getByText('⚙️ Manage')).toBeInTheDocument();
        expect(screen.getByText('Manage All Tools ↗')).toBeInTheDocument();
      });
    });

    it('handles add tools button click', async () => {
      renderCard({ onAddTools: mockOnAddTools });

      await waitFor(() => {
        const addButton = screen.getByText('+ Add');
        fireEvent.click(addButton);
        
        expect(mockOnAddTools).toHaveBeenCalledTimes(1);
        expect(consoleSpy.log).toHaveBeenCalledWith('Opening tool marketplace');
      });
    });

    it('handles manage tools button click', async () => {
      renderCard({ onManageTools: mockOnManageTools });

      await waitFor(() => {
        const manageButton = screen.getByText('⚙️ Manage');
        fireEvent.click(manageButton);
        
        expect(mockOnManageTools).toHaveBeenCalledTimes(1);
        expect(consoleSpy.log).toHaveBeenCalledWith('Opening tool management interface');
      });
    });

    it('handles default navigation for add tools', async () => {
      renderCard();

      await waitFor(() => {
        const addButton = screen.getByText('+ Add');
        fireEvent.click(addButton);
        
        expect(window.location.href).toBe('/tools/browse');
      });
    });

    it('handles default navigation for manage tools', async () => {
      renderCard();

      await waitFor(() => {
        const manageButton = screen.getByText('⚙️ Manage');
        fireEvent.click(manageButton);
        
        expect(window.location.href).toBe('/tools');
      });
    });

    it('prevents event propagation on action buttons', async () => {
      const cardClickSpy = vi.fn();
      renderCard({ onManageTools: cardClickSpy });

      await waitFor(() => {
        const addButton = screen.getByText('+ Add');
        fireEvent.click(addButton);
        
        // Card click handler should not be called when clicking action buttons
        expect(cardClickSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Statistics Display', () => {
    it('displays tool activity statistics', async () => {
      renderCard();

      await waitFor(() => {
        expect(screen.getByText('📊 TOOL ACTIVITY')).toBeInTheDocument();
        expect(screen.getByText('• 6 tools installed and configured')).toBeInTheDocument();
        expect(screen.getByText('• Used 24 times this week')).toBeInTheDocument();
        expect(screen.getByText('• Last used: Study Timer • 2 hours ago')).toBeInTheDocument();
      });
    });

    it('handles missing statistics gracefully', async () => {
      vi.mocked(fetch).mockImplementation((url) => {
        if (url === '/api/tools/personal') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ tools: mockTools }),
          } as Response);
        }
        if (url === '/api/tools/usage-stats') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ stats: null }),
          } as Response);
        }
        return Promise.reject(new Error('Unknown URL'));
      });

      renderCard();

      await waitFor(() => {
        expect(screen.getByText('• 0 tools installed and configured')).toBeInTheDocument();
        expect(screen.getByText('• Used 0 times this week')).toBeInTheDocument();
        expect(screen.getByText('• Last used: No recent activity')).toBeInTheDocument();
      });
    });
  });

  describe('V1 Features Preview', () => {
    it('displays locked V1 features', async () => {
      renderCard();

      await waitFor(() => {
        expect(screen.getByText('🎯 TOOL IMPACT (Available in v1)')).toBeInTheDocument();
        expect(screen.getByText('Tool usage analytics and sharing')).toBeInTheDocument();
        expect(screen.getByText('Community impact metrics')).toBeInTheDocument();
        expect(screen.getByText('Tool recommendations and discovery')).toBeInTheDocument();
        
        const lockedLabels = screen.getAllByText('[LOCKED] ↗');
        expect(lockedLabels).toHaveLength(3);
      });
    });
  });

  describe('Hover Effects', () => {
    it('applies hover effects to card', async () => {
      renderCard();

      await waitFor(() => {
        const card = screen.getByTestId('hive-card');
        
        fireEvent.mouseEnter(card);
        // Hover state changes would be reflected in component state
        
        fireEvent.mouseLeave(card);
        // Component should return to normal state
        
        expect(card).toBeInTheDocument();
      });
    });

    it('shows bottom action button on hover', async () => {
      renderCard();

      await waitFor(() => {
        const card = screen.getByTestId('hive-card');
        const bottomButton = screen.getByText('Manage All Tools ↗');
        
        fireEvent.mouseEnter(card);
        // Button should become more visible (opacity changes tested via class)
        expect(bottomButton).toBeInTheDocument();
      });
    });
  });

  describe('API Integration', () => {
    it('fetches tools from personal tools API', async () => {
      renderCard();

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/tools/personal', {
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer dev_token_test-user-123',
          }),
        });
      });
    });

    it('fetches usage stats from usage stats API', async () => {
      renderCard();

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/tools/usage-stats', {
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer dev_token_test-user-123',
          }),
        });
      });
    });

    it('handles API errors gracefully', async () => {
      vi.mocked(fetch).mockImplementation(() => 
        Promise.resolve({
          ok: false,
          statusText: 'Internal Server Error',
        } as Response)
      );

      renderCard();

      // Should show loading initially, then handle error
      expect(screen.getByText('🔄 Syncing tool configurations and data...')).toBeInTheDocument();
    });

    it('uses dev token when no session available', async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      renderCard();

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/tools/personal', {
          headers: expect.objectContaining({
            Authorization: 'Bearer dev_token_123',
          }),
        });
      });
    });

    it('handles localStorage errors gracefully', async () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      renderCard();

      await waitFor(() => {
        expect(consoleSpy.warn).toHaveBeenCalledWith('Could not get auth token for tools, using dev token');
        expect(fetch).toHaveBeenCalledWith('/api/tools/personal', {
          headers: expect.objectContaining({
            Authorization: 'Bearer dev_token_123',
          }),
        });
      });
    });
  });

  describe('Card Click Behavior', () => {
    it('handles card body click for management', async () => {
      renderCard({ onManageTools: mockOnManageTools });

      await waitFor(() => {
        const card = screen.getByTestId('hive-card');
        fireEvent.click(card);
        
        expect(mockOnManageTools).toHaveBeenCalledTimes(1);
      });
    });

    it('shows click hint', async () => {
      renderCard();

      await waitFor(() => {
        expect(screen.getByText('Click card body to open tool interface ↗')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('provides proper button titles', async () => {
      renderCard();

      await waitFor(() => {
        const studyTimerButton = screen.getByText('⏱️').closest('button');
        expect(studyTimerButton).toHaveAttribute('title', 'Study Timer');
      });
    });

    it('provides proper button roles', async () => {
      renderCard();

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(10); // Tools + action buttons + empty slots
      });
    });

    it('uses proper semantic headings', async () => {
      renderCard();

      await waitFor(() => {
        const headings = screen.getAllByRole('heading');
        expect(headings.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles tools without quick launch enabled', async () => {
      const toolsWithoutQuickLaunch = [
        {
          ...mockTools[0],
          quickLaunch: false,
        },
        ...mockTools.slice(1),
      ];

      vi.mocked(fetch).mockImplementation((url) => {
        if (url === '/api/tools/personal') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ tools: toolsWithoutQuickLaunch }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ stats: mockStats }),
        } as Response);
      });

      renderCard();

      await waitFor(() => {
        // Study Timer should not appear (quickLaunch: false)
        expect(screen.queryByText('⏱️')).not.toBeInTheDocument();
        // Other tools should still appear
        expect(screen.getByText('✅')).toBeInTheDocument();
        expect(screen.getByText('📊')).toBeInTheDocument();
      });
    });

    it('handles empty tools array', async () => {
      vi.mocked(fetch).mockImplementation((url) => {
        if (url === '/api/tools/personal') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ tools: [] }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ stats: mockStats }),
        } as Response);
      });

      renderCard();

      await waitFor(() => {
        expect(screen.getByText('Build Your Personal Toolkit')).toBeInTheDocument();
      });
    });

    it('handles null tools response', async () => {
      vi.mocked(fetch).mockImplementation((url) => {
        if (url === '/api/tools/personal') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ tools: null }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ stats: mockStats }),
        } as Response);
      });

      renderCard();

      await waitFor(() => {
        expect(screen.getByText('Build Your Personal Toolkit')).toBeInTheDocument();
      });
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', async () => {
      renderCard({ className: 'custom-class' });

      await waitFor(() => {
        const card = screen.getByTestId('hive-card');
        expect(card).toHaveClass('custom-class');
      });
    });

    it('handles variant prop correctly', async () => {
      renderCard({ variant: 'mobile' });

      await waitFor(() => {
        const toolGrid = screen.getByText('✅').closest('.grid');
        expect(toolGrid).toHaveClass('grid-cols-4');
      });
    });
  });
});