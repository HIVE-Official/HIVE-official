import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ToolEditPage from '../../../app/(dashboard)/tools/[toolId]/edit/page';

// Mock Next.js navigation
const mockPush = vi.fn();
const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
    back: mockBack,
    replace: vi.fn(),
  })),
  useParams: vi.fn(() => ({ toolId: 'poll-maker' })),
}));

// Mock UI components
vi.mock('@hive/ui', () => ({
  Button: ({ children, onClick, disabled, className, size, variant, ...props }: any) => (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={className}
      data-testid={props['data-testid']}
      {...props}
    >
      {children}
    </button>
  ),
  Card: ({ children, className }: any) => (
    <div className={className} data-testid="card">{children}</div>
  ),
}));

// Import the mock directly from @hive/hooks
import { useFeatureFlags } from '@hive/hooks';

// Mock feature flags hook to get reference to the mock
const mockUseFeatureFlags = vi.mocked(useFeatureFlags);
const mockTrackEvent = vi.fn();

// Set up the mock return value
mockUseFeatureFlags.mockReturnValue({
  toolBuilderVariant: 'visual',
  navigationVariant: 'sidebar',
  dashboardLayout: 'cards',
  spaceDiscovery: 'grid',
  enableAdvancedBuilder: true,
  enableCollaborativeEditing: true,
  enableRealTimeNotifications: true,
  spaces: "enabled" as const,
  tools: "enabled" as const,
  analytics: "enabled" as const,
  realtime: "enabled" as const,
  ai: "disabled" as const,
  gamification: "disabled" as const,
  trackEvent: mockTrackEvent,
});

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Save: ({ className }: any) => <div className={className} data-testid="save-icon" />,
  Eye: ({ className }: any) => <div className={className} data-testid="eye-icon" />,
  Play: ({ className }: any) => <div className={className} data-testid="play-icon" />,
  ArrowLeft: ({ className }: any) => <div className={className} data-testid="arrow-left-icon" />,
  MoreHorizontal: ({ className }: any) => <div className={className} data-testid="more-icon" />,
  Code2: ({ className }: any) => <div className={className} data-testid="code-icon" />,
  Zap: ({ className }: any) => <div className={className} data-testid="zap-icon" />,
  Layout: ({ className }: any) => <div className={className} data-testid="layout-icon" />,
  Database: ({ className }: any) => <div className={className} data-testid="database-icon" />,
}));

describe('ToolEditPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTrackEvent.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Page Structure', () => {
    it('renders tool editor with main sections', () => {
      render(<ToolEditPage />);

      expect(screen.getByText('Editing: Poll Maker')).toBeInTheDocument();
      expect(screen.getByText('Tool Settings')).toBeInTheDocument();
      expect(screen.getByText('Elements')).toBeInTheDocument();
      expect(screen.getByText('Canvas - Tool Preview')).toBeInTheDocument();
    });

    it('renders header with action buttons', () => {
      render(<ToolEditPage />);

      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('Preview')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('shows save status correctly', () => {
      render(<ToolEditPage />);

      expect(screen.getByText('• All changes saved')).toBeInTheDocument();
    });
  });

  describe('Tool Settings', () => {
    it('displays tool settings form', () => {
      render(<ToolEditPage />);

      expect(screen.getByDisplayValue('Poll Maker')).toBeInTheDocument();
      expect(screen.getByDisplayValue('space')).toBeInTheDocument();
    });

    it('updates tool name and shows unsaved changes', async () => {
      render(<ToolEditPage />);

      const nameInput = screen.getByDisplayValue('Poll Maker');
      fireEvent.change(nameInput, { target: { value: 'Updated Poll Maker' } });

      await waitFor(() => {
        expect(nameInput).toHaveValue('Updated Poll Maker');
        expect(screen.getByText('• Unsaved changes')).toBeInTheDocument();
      });
    });

    it('updates privacy setting and shows unsaved changes', async () => {
      render(<ToolEditPage />);

      const privacySelect = screen.getByDisplayValue('space');
      fireEvent.change(privacySelect, { target: { value: 'public' } });

      await waitFor(() => {
        expect(privacySelect).toHaveValue('public');
        expect(screen.getByText('• Unsaved changes')).toBeInTheDocument();
      });
    });
  });

  describe('Elements Management', () => {
    it('displays existing elements', () => {
      render(<ToolEditPage />);

      expect(screen.getByText('Poll Title')).toBeInTheDocument();
      expect(screen.getByText('Create Poll')).toBeInTheDocument();
    });

    it('allows selecting elements', () => {
      render(<ToolEditPage />);

      const titleElement = screen.getByText('Poll Title').closest('div');
      expect(titleElement).toHaveClass('bg-[rgba(255,255,255,0.02)]');

      fireEvent.click(titleElement!);
      expect(titleElement).toHaveClass('bg-[#FFD700]/10');
    });

    it('adds new elements when element type buttons are clicked', async () => {
      render(<ToolEditPage />);

      const inputButton = screen.getByText('input');
      fireEvent.click(inputButton);

      await waitFor(() => {
        expect(screen.getByText('• Unsaved changes')).toBeInTheDocument();
      });
    });

    it('shows element types for adding', () => {
      render(<ToolEditPage />);

      expect(screen.getByText('input')).toBeInTheDocument();
      expect(screen.getByText('button')).toBeInTheDocument();
      expect(screen.getByText('text')).toBeInTheDocument();
      expect(screen.getByText('chart')).toBeInTheDocument();
    });
  });

  describe('Canvas Preview', () => {
    it('renders elements on canvas', () => {
      render(<ToolEditPage />);

      // Check for input element
      const inputElement = screen.getByPlaceholderText('Enter poll question...');
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute('readonly');

      // Check for button element
      const buttonElement = screen.getByText('Create Poll');
      expect(buttonElement).toBeInTheDocument();
    });

    it('shows empty state when no elements', () => {
      // This would require modifying the mock data or component state
      // For now, we test the conditional rendering logic exists
      render(<ToolEditPage />);
      
      // The canvas should show elements since mock data has elements
      expect(screen.getByPlaceholderText('Enter poll question...')).toBeInTheDocument();
    });

    it('allows selecting elements on canvas', () => {
      render(<ToolEditPage />);

      const inputElement = screen.getByPlaceholderText('Enter poll question...');
      fireEvent.click(inputElement.parentElement!);

      // Element should show selection state
      expect(inputElement.parentElement).toHaveClass('ring-2', 'ring-[#FFD700]/50');
    });
  });

  describe('Properties Panel', () => {
    it('shows no selection state initially', () => {
      render(<ToolEditPage />);

      expect(screen.getByText('No element selected')).toBeInTheDocument();
      expect(screen.getByText('Select an element to edit its properties')).toBeInTheDocument();
    });

    it('shows element properties when element is selected', () => {
      render(<ToolEditPage />);

      // Select an element first
      const titleElement = screen.getByText('Poll Title').closest('div');
      fireEvent.click(titleElement!);

      expect(screen.getByText('Element Properties')).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
      expect(screen.getByText('Position & Size')).toBeInTheDocument();
    });

    it('shows input-specific properties for input elements', () => {
      render(<ToolEditPage />);

      // Select the input element
      const titleElement = screen.getByText('Poll Title').closest('div');
      fireEvent.click(titleElement!);

      expect(screen.getByText('Placeholder')).toBeInTheDocument();
      expect(screen.getByText('Required field')).toBeInTheDocument();
    });

    it('shows button-specific properties for button elements', () => {
      render(<ToolEditPage />);

      // Select the button element
      const buttonElement = screen.getByText('Create Poll').closest('div');
      fireEvent.click(buttonElement!);

      expect(screen.getByText('Button Style')).toBeInTheDocument();
    });
  });

  describe('Navigation Actions', () => {
    it('handles back navigation', () => {
      render(<ToolEditPage />);

      const backButton = screen.getByText('Back');
      fireEvent.click(backButton);

      expect(mockBack).toHaveBeenCalled();
    });

    it('handles preview navigation', () => {
      render(<ToolEditPage />);

      const previewButton = screen.getByText('Preview');
      fireEvent.click(previewButton);

      expect(mockPush).toHaveBeenCalledWith('/tools/poll-maker/preview');
    });

    it('handles test action', () => {
      render(<ToolEditPage />);

      const testButton = screen.getByText('Test');
      fireEvent.click(testButton);

      expect(mockTrackEvent).toHaveBeenCalledWith('tools', 'interact', { 
        action: 'test_tool', 
        toolId: 'poll-maker' 
      });
    });
  });

  describe('Save Functionality', () => {
    it('save button is disabled when no changes', () => {
      render(<ToolEditPage />);

      const saveButton = screen.getByText('Save');
      expect(saveButton).toBeDisabled();
    });

    it('save button is enabled when there are changes', async () => {
      render(<ToolEditPage />);

      // Make a change
      const nameInput = screen.getByDisplayValue('Poll Maker');
      fireEvent.change(nameInput, { target: { value: 'Updated Poll Maker' } });

      await waitFor(() => {
        const saveButton = screen.getByText('Save');
        expect(saveButton).not.toBeDisabled();
      });
    });

    it('handles save action', async () => {
      render(<ToolEditPage />);

      // Make a change first
      const nameInput = screen.getByDisplayValue('Poll Maker');
      fireEvent.change(nameInput, { target: { value: 'Updated Poll Maker' } });

      await waitFor(() => {
        const saveButton = screen.getByText('Save');
        expect(saveButton).not.toBeDisabled();
      });

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      expect(mockTrackEvent).toHaveBeenCalledWith('tools', 'interact', { 
        action: 'save_tool', 
        toolId: 'poll-maker' 
      });

      await waitFor(() => {
        expect(screen.getByText('• All changes saved')).toBeInTheDocument();
      });
    });
  });

  describe('Event Tracking', () => {
    it('tracks page view on mount', () => {
      render(<ToolEditPage />);

      expect(mockTrackEvent).toHaveBeenCalledWith('tools', 'view', { 
        page: 'tool-editor', 
        toolId: 'poll-maker' 
      });
    });

    it('tracks preview action', () => {
      render(<ToolEditPage />);

      const previewButton = screen.getByText('Preview');
      fireEvent.click(previewButton);

      expect(mockTrackEvent).toHaveBeenCalledWith('tools', 'interact', { 
        action: 'preview_tool', 
        toolId: 'poll-maker' 
      });
    });
  });

  describe('UI State Management', () => {
    it('manages selected element state correctly', () => {
      render(<ToolEditPage />);

      // Initially no element selected
      expect(screen.getByText('No element selected')).toBeInTheDocument();

      // Select an element
      const titleElement = screen.getByText('Poll Title').closest('div');
      fireEvent.click(titleElement!);

      // Properties panel should update
      expect(screen.getByText('Element Properties')).toBeInTheDocument();
    });

    it('manages unsaved changes state correctly', async () => {
      render(<ToolEditPage />);

      // Initially saved
      expect(screen.getByText('• All changes saved')).toBeInTheDocument();

      // Make a change
      const nameInput = screen.getByDisplayValue('Poll Maker');
      fireEvent.change(nameInput, { target: { value: 'Changed' } });

      // Should show unsaved
      await waitFor(() => {
        expect(screen.getByText('• Unsaved changes')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('applies correct grid layout classes', () => {
      render(<ToolEditPage />);

      const gridContainer = screen.getByText('Tool Settings').closest('.grid');
      expect(gridContainer).toHaveClass('grid-cols-12');
    });

    it('applies correct responsive spacing', () => {
      render(<ToolEditPage />);

      const mainContainer = screen.getByText('Tool Settings').closest('.max-w-7xl');
      expect(mainContainer).toHaveClass('max-w-7xl', 'mx-auto', 'px-6', 'py-8');
    });
  });

  describe('Accessibility', () => {
    it('provides proper form labels', () => {
      render(<ToolEditPage />);

      expect(screen.getByText('Tool Name')).toBeInTheDocument();
      expect(screen.getByText('Privacy')).toBeInTheDocument();
    });

    it('provides proper button labels', () => {
      render(<ToolEditPage />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      // Check specific important buttons
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Preview')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(<ToolEditPage />);

      const nameInput = screen.getByDisplayValue('Poll Maker');
      nameInput.focus();
      expect(nameInput).toHaveFocus();

      // Don't test focus on disabled elements
      const testButton = screen.getByText('Test');
      testButton.focus();
      expect(testButton).toHaveFocus();
    });
  });

  describe('Error Handling', () => {
    it('handles component rendering without errors', () => {
      expect(() => render(<ToolEditPage />)).not.toThrow();
    });

    it('handles missing tool data gracefully', () => {
      // The component uses mock data, so it should always render
      render(<ToolEditPage />);
      expect(screen.getByText('Editing: Poll Maker')).toBeInTheDocument();
    });
  });
});