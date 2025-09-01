import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToolsPage from '../../../app/(dashboard)/tools/page';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    back: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  })),
  useParams: vi.fn(() => ({})),
}));

// Mock UI components
vi.mock('@hive/ui', () => ({
  CompleteHIVEToolsSystem: ({ 
    activeTab, 
    onTabChange, 
    onToolInstall, 
    onToolPreview, 
    onToolAction, 
    onCreateTool, 
    marketplaceTools 
  }: any) => (
    <div data-testid="complete-hive-tools-system">
      <div>
        <h1>Tools</h1>
        <p>Solutions & building</p>
        <div>
          <button onClick={() => onCreateTool('template')}>Use Template</button>
          <button onClick={() => onCreateTool('wizard')}>Quick Builder</button>
          <button onClick={() => onCreateTool('visual')}>Create Tool</button>
        </div>
      </div>
      
      <div>
        <button 
          onClick={() => onTabChange('marketplace')}
          className={activeTab === 'marketplace' ? 'bg-[var(--hive-brand-secondary)]' : ''}
        >
          Marketplace
        </button>
        <button 
          onClick={() => onTabChange('personal')}
          className={activeTab === 'personal' ? 'bg-[var(--hive-brand-secondary)]' : ''}
        >
          Personal Tools
        </button>
        <button 
          onClick={() => onTabChange('hivelab')}
          className={activeTab === 'hivelab' ? 'bg-[var(--hive-brand-secondary)]' : ''}
        >
          HiveLab
        </button>
      </div>

      {activeTab === 'marketplace' && (
        <div data-testid="tool-marketplace">
          <div data-testid="marketplace-tools-count">{marketplaceTools?.length || 0}</div>
          {marketplaceTools?.map((tool: any) => (
            <div key={tool.id} data-testid={`tool-${tool.id}`}>
              <span>{tool.name}</span>
              <button 
                onClick={() => onToolInstall(tool.id)}
                data-testid={`install-${tool.id}`}
              >
                Install
              </button>
              <button 
                onClick={() => onToolPreview(tool.id)}
                data-testid={`preview-${tool.id}`}
              >
                Preview
              </button>
              <button 
                onClick={() => onToolAction(tool.id, 'edit')}
                data-testid={`edit-${tool.id}`}
              >
                Edit
              </button>
              <button 
                onClick={() => onToolAction(tool.id, 'share')}
                data-testid={`share-${tool.id}`}
              >
                Share
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'personal' && (
        <div>
          <p>Your installed tools and personal productivity suite</p>
        </div>
      )}

      {activeTab === 'hivelab' && (
        <div>
          <p>Build and deploy custom campus tools with visual creation interface</p>
          <button onClick={() => onCreateTool('visual')}>Start Building</button>
          <button onClick={() => onCreateTool('template')}>Use Template</button>
        </div>
      )}
    </div>
  ),
  useUnifiedAuth: vi.fn(() => ({
    user: { uid: 'test-user', email: 'test@test.edu' },
    getAuthToken: vi.fn().mockResolvedValue('test-token'),
  })),
}));

// Import the mock directly from @hive/hooks
import { useFeatureFlags } from '@hive/hooks';

// Mock feature flags hook to get reference to the mock
const mockUseFeatureFlags = vi.mocked(useFeatureFlags);
const mockTrackEvent = vi.fn();

// Set up the mock return value
mockUseFeatureFlags.mockReturnValue({
  // Core feature flags
  spaces: "enabled" as const,
  tools: "enabled" as const,
  analytics: "enabled" as const,
  realtime: "enabled" as const,
  ai: "disabled" as const,
  gamification: "disabled" as const,
  
  // UI Variants
  toolBuilderVariant: "visual" as const,
  navigationVariant: "sidebar" as const,
  dashboardLayout: "cards" as const,
  spaceDiscovery: "grid" as const,
  
  // Feature Toggles
  enableAdvancedBuilder: true,
  enableCollaborativeEditing: false,
  enableRealTimeNotifications: true,
  
  trackEvent: mockTrackEvent,
});

// Mock auth hook - add to existing @hive/ui mock

// Mock tool navigation
const mockToolNavigation = {
  toPreview: vi.fn(),
  editTool: vi.fn(),
  duplicateTool: vi.fn(),
  shareTool: vi.fn().mockResolvedValue(true),
  toDeploy: vi.fn(),
  toBuild: vi.fn(),
};

vi.mock('@/lib/tool-navigation', () => ({
  ToolNavigation: mockToolNavigation,
  default: mockToolNavigation,
}));

// Mock fetch for API calls
global.fetch = vi.fn();

describe('ToolsPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
    mockTrackEvent.mockClear();
  });

  afterEach(() => {
    queryClient.clear();
    vi.resetAllMocks();
  });

  const renderToolsPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ToolsPage />
      </QueryClientProvider>
    );
  };

  describe('Page Structure', () => {
    it('renders tools page with main sections', () => {
      renderToolsPage();

      expect(screen.getByText('Tools')).toBeInTheDocument();
      expect(screen.getByText(/Solutions & building/)).toBeInTheDocument();
      expect(screen.getByText('Marketplace')).toBeInTheDocument();
      expect(screen.getByText('Personal Tools')).toBeInTheDocument();
      expect(screen.getByText('HiveLab')).toBeInTheDocument();
    });

    it('renders creation buttons in header', () => {
      renderToolsPage();

      expect(screen.getByText('Use Template')).toBeInTheDocument();
      expect(screen.getByText('Quick Builder')).toBeInTheDocument();
      expect(screen.getByText('Create Tool')).toBeInTheDocument();
    });

    it('shows marketplace by default', () => {
      renderToolsPage();

      expect(screen.getByTestId('tool-marketplace')).toBeInTheDocument();
      expect(screen.getByTestId('marketplace-tools-count')).toHaveTextContent('4');
    });
  });

  describe('Tab Navigation', () => {
    it('switches between tabs correctly', async () => {
      renderToolsPage();

      // Start on marketplace
      expect(screen.getByTestId('tool-marketplace')).toBeInTheDocument();

      // Switch to personal tools
      fireEvent.click(screen.getByText('Personal Tools'));
      await waitFor(() => {
        expect(screen.getByText('Your installed tools and personal productivity suite')).toBeInTheDocument();
      });

      // Switch to HiveLab
      fireEvent.click(screen.getByText('HiveLab'));
      await waitFor(() => {
        expect(screen.getByText('Build and deploy custom campus tools with visual creation interface')).toBeInTheDocument();
      });

      // Switch back to marketplace
      fireEvent.click(screen.getByText('Marketplace'));
      await waitFor(() => {
        expect(screen.getByTestId('tool-marketplace')).toBeInTheDocument();
      });
    });

    it('highlights active tab correctly', () => {  
      renderToolsPage();

      const marketplaceTab = screen.getByText('Marketplace');
      const personalTab = screen.getByText('Personal Tools');

      // Marketplace should be active by default
      expect(marketplaceTab).toHaveClass('bg-[var(--hive-brand-secondary)]');
      expect(personalTab).not.toHaveClass('bg-[var(--hive-brand-secondary)]');

      // Switch to personal tools
      fireEvent.click(personalTab);
      expect(personalTab).toHaveClass('bg-[var(--hive-brand-secondary)]');
      expect(marketplaceTab).not.toHaveClass('bg-[var(--hive-brand-secondary)]');
    });
  });

  describe('Tool Installation', () => {
    it('handles tool installation successfully', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response);

      // Mock window.location.reload
      Object.defineProperty(window, 'location', {
        value: { reload: vi.fn() },
        writable: true,
      });

      renderToolsPage();

      const installButton = screen.getByTestId('install-poll-maker');
      fireEvent.click(installButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/tools/install', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify({ toolId: 'poll-maker' }),
        });
      });

      expect(window.location.reload).toHaveBeenCalled();
    });

    it('handles tool installation failure', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      // Mock alert
      window.alert = vi.fn();

      renderToolsPage();

      const installButton = screen.getByTestId('install-poll-maker');
      fireEvent.click(installButton);

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Failed to install tool. Please try again.');
      });
    });
  });

  describe('Tool Actions', () => {
    it('handles tool preview action', () => {
      renderToolsPage();

      const previewButton = screen.getByTestId('preview-poll-maker');
      fireEvent.click(previewButton);

      expect(mockToolNavigation.toPreview).toHaveBeenCalledWith('poll-maker', true);
    });

    it('handles tool edit action', () => {
      renderToolsPage();

      const editButton = screen.getByTestId('edit-poll-maker');
      fireEvent.click(editButton);

      expect(mockToolNavigation.editTool).toHaveBeenCalledWith('poll-maker');
    });

    it('handles tool share action', async () => {
      window.alert = vi.fn();
      
      renderToolsPage();

      const shareButton = screen.getByTestId('share-poll-maker');
      fireEvent.click(shareButton);

      await waitFor(() => {
        expect(mockToolNavigation.shareTool).toHaveBeenCalledWith('poll-maker', 'Poll Maker');
        expect(window.alert).toHaveBeenCalledWith('Tool link copied to clipboard!');
      });
    });
  });

  describe('Tool Creation', () => {
    it('handles create tool with different modes', () => {
      renderToolsPage();

      // Test main create button
      fireEvent.click(screen.getByText('Create Tool'));
      expect(mockToolNavigation.toBuild).toHaveBeenCalledWith({ mode: 'visual' });

      // Test template button
      fireEvent.click(screen.getByText('Use Template'));
      expect(mockToolNavigation.toBuild).toHaveBeenCalledWith({ mode: 'template' });

      // Test quick builder
      fireEvent.click(screen.getByText('Quick Builder'));
      expect(mockToolNavigation.toBuild).toHaveBeenCalledWith({ mode: 'wizard' });
    });

    it('shows create options in HiveLab tab', () => {
      renderToolsPage();

      fireEvent.click(screen.getByText('HiveLab'));

      expect(screen.getByText('Start Building')).toBeInTheDocument();
      expect(screen.getAllByText('Use Template')).toHaveLength(2); // Header + HiveLab
    });
  });

  describe('Tool Data', () => {
    it('displays correct tool information', () => {
      renderToolsPage();

      // Check that tools are rendered with correct data
      expect(screen.getByTestId('tool-poll-maker')).toBeInTheDocument();
      expect(screen.getByTestId('tool-study-timer')).toBeInTheDocument();
      expect(screen.getByTestId('tool-grade-calculator')).toBeInTheDocument();
      expect(screen.getByTestId('tool-analytics-dashboard')).toBeInTheDocument();

      expect(screen.getByText('Poll Maker')).toBeInTheDocument();
      expect(screen.getByText('Study Timer')).toBeInTheDocument();
      expect(screen.getByText('Grade Calculator')).toBeInTheDocument();
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    });
  });

  describe('Event Tracking', () => {
    it('tracks page view event on mount', () => {
      renderToolsPage();

      expect(mockTrackEvent).toHaveBeenCalledWith('tools', 'view', { 
        page: 'tools-marketplace' 
      });
    });

    it('tracks tool installation events', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response);

      Object.defineProperty(window, 'location', {
        value: { reload: vi.fn() },
        writable: true,
      });

      renderToolsPage();

      const installButton = screen.getByTestId('install-poll-maker');
      fireEvent.click(installButton);

      await waitFor(() => {
        expect(mockTrackEvent).toHaveBeenCalledWith('tools', 'install', { 
          toolId: 'poll-maker' 
        });
      });
    });

    it('tracks tool action events', () => {
      renderToolsPage();

      const previewButton = screen.getByTestId('preview-poll-maker');
      fireEvent.click(previewButton);

      expect(mockTrackEvent).toHaveBeenCalledWith('tools', 'preview', { 
        toolId: 'poll-maker' 
      });

      const editButton = screen.getByTestId('edit-poll-maker');
      fireEvent.click(editButton);

      expect(mockTrackEvent).toHaveBeenCalledWith('tools', 'action', { 
        toolId: 'poll-maker', 
        action: 'edit' 
      });
    });

    it('tracks create tool events', () => {
      renderToolsPage();

      fireEvent.click(screen.getByText('Create Tool'));

      expect(mockTrackEvent).toHaveBeenCalledWith('tools', 'create_start', { 
        mode: 'visual' 
      });
    });
  });

  describe('Error Handling', () => {
    it('handles network errors gracefully', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      window.alert = vi.fn();
      renderToolsPage();

      const installButton = screen.getByTestId('install-poll-maker');
      fireEvent.click(installButton);

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Failed to install tool. Please try again.');
      });
    });

    it('handles authentication errors', async () => {
      const { useUnifiedAuth } = await import('@hive/ui');
      (useUnifiedAuth as any).mockReturnValueOnce({
        user: null,
        getAuthToken: vi.fn().mockRejectedValue(new Error('Not authenticated')),
      });

      window.alert = vi.fn();
      renderToolsPage();

      const installButton = screen.getByTestId('install-poll-maker');
      fireEvent.click(installButton);

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Failed to install tool. Please try again.');
      });
    });
  });

  describe('Responsive Design', () => {
    it('renders correctly on different screen sizes', () => {
      renderToolsPage();

      // Test that the main container structure exists
      const heading = screen.getByText('Tools');
      expect(heading).toBeInTheDocument();

      // Test button layout
      const createButton = screen.getByText('Create Tool');
      expect(createButton).toHaveClass('px-6', 'py-2');
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labels and roles', () => {
      renderToolsPage();

      const heading = screen.getByRole('heading', { name: 'Tools' });
      expect(heading).toBeInTheDocument();

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);

      // Tab buttons are actual buttons, so they have implicit role
      const marketplaceTab = screen.getByText('Marketplace');
      expect(marketplaceTab.tagName).toBe('BUTTON');
    });

    it('supports keyboard navigation', () => {
      renderToolsPage();

      const createButton = screen.getByText('Create Tool');
      createButton.focus();
      expect(createButton).toHaveFocus();

      // Tab navigation
      const marketplaceTab = screen.getByText('Marketplace');
      marketplaceTab.focus();
      expect(marketplaceTab).toHaveFocus();
    });
  });
});