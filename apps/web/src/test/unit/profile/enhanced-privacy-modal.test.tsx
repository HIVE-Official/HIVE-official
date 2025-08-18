import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EnhancedPrivacyModal } from '../../../components/profile/enhanced-privacy-modal';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, exit, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    button: ({ children, className, onClick, whileHover, whileTap, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock HiveUI components
vi.mock('@hive/ui', () => ({
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
  HiveCard: ({ children, className }: any) => (
    <div className={className} data-testid="hive-card">
      {children}
    </div>
  ),
  HiveBadge: ({ children, variant, className }: any) => (
    <span className={className} data-variant={variant} data-testid="hive-badge">
      {children}
    </span>
  ),
}));

// Mock Lucide icons
vi.mock('lucide-react', () => {
  const mockIcon = ({ className }: any) => <div className={className} data-testid="icon" />;
  return {
    Shield: mockIcon,
    Eye: mockIcon,
    EyeOff: mockIcon,
    Lock: mockIcon,
    Users: mockIcon,
    Globe: mockIcon,
    X: mockIcon,
    Settings: mockIcon,
    Clock: mockIcon,
    AlertTriangle: mockIcon,
    Info: mockIcon,
    CheckCircle: mockIcon,
  };
});

// Mock utils
vi.mock('../../../lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

describe('EnhancedPrivacyModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSave: mockOnSave,
    isLoading: false,
  };

  const mockCurrentSettings = {
    ghostMode: {
      enabled: false,
      level: 'selective' as const,
      scheduledEnd: undefined,
    },
    visibility: {
      profile: 'public' as const,
      activity: 'members' as const,
      spaces: 'public' as const,
      tools: 'public' as const,
    },
    discoverability: {
      searchable: true,
      showInDirectory: true,
      allowSpaceInvites: true,
      allowDirectMessages: true,
    },
    analytics: {
      trackActivity: true,
      shareUsageStats: false,
      allowTargetedSuggestions: true,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockOnSave.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Modal Visibility', () => {
    it('renders when isOpen is true', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      expect(screen.getByText('Privacy & Visibility')).toBeInTheDocument();
      expect(screen.getByText('Control how you appear on HIVE')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<EnhancedPrivacyModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText('Privacy & Visibility')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      const closeButtons = screen.getAllByTestId('hive-button');
      const closeButton = closeButtons.find(button => button.getAttribute('data-variant') === 'ghost');
      
      fireEvent.click(closeButton!);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Tab Navigation', () => {
    it('renders all navigation tabs', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      expect(screen.getByText('Ghost Mode')).toBeInTheDocument();
      expect(screen.getByText('Content Visibility')).toBeInTheDocument();
      expect(screen.getByText('Discoverability')).toBeInTheDocument();
      expect(screen.getByText('Data & Analytics')).toBeInTheDocument();
    });

    it('switches between tabs correctly', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      // Should start on Ghost Mode tab
      expect(screen.getByText('Control your overall visibility and privacy level on HIVE')).toBeInTheDocument();

      // Switch to Visibility tab
      fireEvent.click(screen.getByText('Content Visibility'));
      expect(screen.getByText('Control who can see different parts of your profile and activity')).toBeInTheDocument();

      // Switch to Discovery tab
      fireEvent.click(screen.getByText('Discoverability'));
      expect(screen.getByText('Control how others can find and interact with you on HIVE')).toBeInTheDocument();

      // Switch to Analytics tab
      fireEvent.click(screen.getByText('Data & Analytics'));
      expect(screen.getByText('Control how your data is used to improve your HIVE experience')).toBeInTheDocument();
    });
  });

  describe('Ghost Mode Tab', () => {
    it('displays current ghost mode status', () => {
      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={mockCurrentSettings} />);

      expect(screen.getByText('Fully Visible')).toBeInTheDocument();
      expect(screen.getByText('Normal HIVE visibility')).toBeInTheDocument();
      expect(screen.getByText('VISIBLE')).toBeInTheDocument();
    });

    it('displays ghost mode status when enabled', () => {
      const ghostModeSettings = {
        ...mockCurrentSettings,
        ghostMode: {
          enabled: true,
          level: 'minimal' as const,
          scheduledEnd: undefined,
        },
      };

      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={ghostModeSettings} />);

      expect(screen.getByText('Ghost Mode Active')).toBeInTheDocument();
      expect(screen.getByText('Minimal privacy level')).toBeInTheDocument();
      expect(screen.getByText('HIDDEN')).toBeInTheDocument();
    });

    it('displays all privacy levels', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      expect(screen.getByText('Invisible')).toBeInTheDocument();
      expect(screen.getByText('Minimal')).toBeInTheDocument();
      expect(screen.getByText('Selective')).toBeInTheDocument();
      expect(screen.getByText('Normal')).toBeInTheDocument();
    });

    it('shows privacy level descriptions', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      expect(screen.getByText('Completely hidden from all discovery')).toBeInTheDocument();
      expect(screen.getByText('Basic visibility to space members only')).toBeInTheDocument();
      expect(screen.getByText('Custom visibility rules you control')).toBeInTheDocument();
      expect(screen.getByText('Standard HIVE visibility and sharing')).toBeInTheDocument();
    });

    it('handles privacy level selection', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      const invisibleButton = screen.getByText('Invisible').closest('button');
      fireEvent.click(invisibleButton!);

      // Should show as selected (CheckCircle icon would appear)
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('shows ghost mode scheduler when enabled', () => {
      const ghostModeSettings = {
        ...mockCurrentSettings,
        ghostMode: {
          enabled: true,
          level: 'minimal' as const,
          scheduledEnd: undefined,
        },
      };

      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={ghostModeSettings} />);

      expect(screen.getByText('Schedule Auto-Disable')).toBeInTheDocument();
      expect(screen.getByText('Set Timer')).toBeInTheDocument();
    });

    it('toggles ghost mode scheduler', () => {
      const ghostModeSettings = {
        ...mockCurrentSettings,
        ghostMode: {
          enabled: true,
          level: 'minimal' as const,
          scheduledEnd: undefined,
        },
      };

      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={ghostModeSettings} />);

      const setTimerButton = screen.getByText('Set Timer');
      fireEvent.click(setTimerButton);

      expect(screen.getByText('Hide')).toBeInTheDocument();
      expect(screen.getByText('1h')).toBeInTheDocument();
      expect(screen.getByText('Ghost mode will automatically turn off in 1 hour')).toBeInTheDocument();
    });

    it('handles schedule hours slider', () => {
      const ghostModeSettings = {
        ...mockCurrentSettings,
        ghostMode: {
          enabled: true,
          level: 'minimal' as const,
          scheduledEnd: undefined,
        },
      };

      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={ghostModeSettings} />);

      // Show scheduler
      fireEvent.click(screen.getByText('Set Timer'));

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '5' } });

      expect(screen.getByText('5h')).toBeInTheDocument();
      expect(screen.getByText('Ghost mode will automatically turn off in 5 hours')).toBeInTheDocument();
    });
  });

  describe('Visibility Tab', () => {
    it('displays all visibility categories', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Content Visibility'));

      expect(screen.getByText('Profile Visibility')).toBeInTheDocument();
      expect(screen.getByText('Activity Visibility')).toBeInTheDocument();
      expect(screen.getByText('Spaces Visibility')).toBeInTheDocument();
      expect(screen.getByText('Tools Visibility')).toBeInTheDocument();
    });

    it('shows category descriptions', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Content Visibility'));

      expect(screen.getByText('Your basic profile information and stats')).toBeInTheDocument();
      expect(screen.getByText('Your recent activity and engagement')).toBeInTheDocument();
      expect(screen.getByText("The spaces you're a member of")).toBeInTheDocument();
      expect(screen.getByText("Tools you've created or use frequently")).toBeInTheDocument();
    });

    it('displays all visibility options', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Content Visibility'));

      expect(screen.getAllByText('Public')).toHaveLength(4); // One for each category
      expect(screen.getAllByText('Members')).toHaveLength(4);
      expect(screen.getAllByText('Connections')).toHaveLength(4);
      expect(screen.getAllByText('Private')).toHaveLength(4);
    });

    it('shows option descriptions', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Content Visibility'));

      expect(screen.getAllByText('Visible to everyone on HIVE')).toHaveLength(4);
      expect(screen.getAllByText('Visible to space members only')).toHaveLength(4);
      expect(screen.getAllByText('Visible to your connections only')).toHaveLength(4);
      expect(screen.getAllByText('Visible only to you')).toHaveLength(4);
    });

    it('handles visibility option selection', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Content Visibility'));

      // Find the first "Private" button for profile visibility
      const privateButtons = screen.getAllByText('Private');
      fireEvent.click(privateButtons[0]);

      // The selection should be updated (would show different styling)
      expect(privateButtons[0]).toBeInTheDocument();
    });
  });

  describe('Discoverability Tab', () => {
    it('displays all discoverability settings', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Discoverability'));

      expect(screen.getByText('Searchable Profile')).toBeInTheDocument();
      expect(screen.getByText('Show in Directory')).toBeInTheDocument();
      expect(screen.getByText('Allow Space Invites')).toBeInTheDocument();
      expect(screen.getByText('Allow Direct Messages')).toBeInTheDocument();
    });

    it('shows setting descriptions', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Discoverability'));

      expect(screen.getByText('Allow others to find you through search')).toBeInTheDocument();
      expect(screen.getByText('Appear in campus and space directories')).toBeInTheDocument();
      expect(screen.getByText('Let space leaders invite you to join')).toBeInTheDocument();
      expect(screen.getByText('Allow other users to message you')).toBeInTheDocument();
    });

    it('handles toggle switches', () => {
      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={mockCurrentSettings} />);

      fireEvent.click(screen.getByText('Discoverability'));

      const toggleButtons = screen.getAllByRole('button').filter(button => 
        button.className.includes('rounded-full')
      );

      // Should have 4 toggle switches
      expect(toggleButtons).toHaveLength(4);

      // Click the first toggle (searchable)
      fireEvent.click(toggleButtons[0]);

      // The toggle should change state
      expect(toggleButtons[0]).toBeInTheDocument();
    });
  });

  describe('Analytics Tab', () => {
    it('displays all analytics settings', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Data & Analytics'));

      expect(screen.getByText('Activity Tracking')).toBeInTheDocument();
      expect(screen.getByText('Share Usage Statistics')).toBeInTheDocument();
      expect(screen.getByText('Targeted Suggestions')).toBeInTheDocument();
    });

    it('shows setting descriptions', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Data & Analytics'));

      expect(screen.getByText('Track your activity to provide insights and analytics')).toBeInTheDocument();
      expect(screen.getByText('Share anonymized usage data to help improve HIVE')).toBeInTheDocument();
      expect(screen.getByText('Use your activity to suggest relevant spaces and tools')).toBeInTheDocument();
    });

    it('shows privacy notice for usage stats', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Data & Analytics'));

      expect(screen.getByText('Data is always anonymized and never shared with third parties')).toBeInTheDocument();
    });

    it('handles analytics toggle switches', () => {
      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={mockCurrentSettings} />);

      fireEvent.click(screen.getByText('Data & Analytics'));

      const toggleButtons = screen.getAllByRole('button').filter(button => 
        button.className.includes('rounded-full')
      );

      // Should have 3 toggle switches for analytics
      expect(toggleButtons).toHaveLength(3);

      // Click the first toggle (activity tracking)
      fireEvent.click(toggleButtons[0]);

      // The toggle should change state
      expect(toggleButtons[0]).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('calls onSave with current settings when save button is clicked', async () => {
      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={mockCurrentSettings} />);

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalledTimes(1);
        expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
          ghostMode: expect.objectContaining({
            enabled: false,
            level: 'selective',
          }),
          visibility: expect.objectContaining({
            profile: 'public',
            activity: 'members',
            spaces: 'public',
            tools: 'public',
          }),
          discoverability: expect.objectContaining({
            searchable: true,
            showInDirectory: true,
            allowSpaceInvites: true,
            allowDirectMessages: true,
          }),
          analytics: expect.objectContaining({
            trackActivity: true,
            shareUsageStats: false,
            allowTargetedSuggestions: true,
          }),
        }));
      });
    });

    it('closes modal after successful save', async () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });

    it('shows loading state while saving', () => {
      render(<EnhancedPrivacyModal {...defaultProps} isLoading={true} />);

      expect(screen.getByText('Saving...')).toBeInTheDocument();
      
      const saveButton = screen.getByText('Saving...');
      expect(saveButton).toBeDisabled();
      
      const cancelButton = screen.getByText('Cancel');
      expect(cancelButton).toBeDisabled();
    });

    it('handles save errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockOnSave.mockRejectedValueOnce(new Error('Save failed'));

      render(<EnhancedPrivacyModal {...defaultProps} />);

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to save privacy settings:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });

    it('calls onClose when cancel button is clicked', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Settings Updates', () => {
    it('updates settings when ghost mode is toggled', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      const invisibleButton = screen.getByText('Invisible').closest('button');
      fireEvent.click(invisibleButton!);

      // Save and check the settings
      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          ghostMode: expect.objectContaining({
            enabled: true,
            level: 'invisible',
          }),
        })
      );
    });

    it('updates visibility settings correctly', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Content Visibility'));

      // Click the first "Private" button for profile visibility
      const privateButtons = screen.getAllByText('Private');
      fireEvent.click(privateButtons[0]);

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          visibility: expect.objectContaining({
            profile: 'private',
          }),
        })
      );
    });

    it('updates discoverability settings correctly', () => {
      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={mockCurrentSettings} />);

      fireEvent.click(screen.getByText('Discoverability'));

      const toggleButtons = screen.getAllByRole('button').filter(button => 
        button.className.includes('rounded-full')
      );

      // Toggle the first setting (searchable)
      fireEvent.click(toggleButtons[0]);

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          discoverability: expect.objectContaining({
            searchable: false, // Should be toggled from true to false
          }),
        })
      );
    });

    it('updates analytics settings correctly', () => {
      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={mockCurrentSettings} />);

      fireEvent.click(screen.getByText('Data & Analytics'));

      const toggleButtons = screen.getAllByRole('button').filter(button => 
        button.className.includes('rounded-full')
      );

      // Toggle the first setting (activity tracking)
      fireEvent.click(toggleButtons[0]);

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          analytics: expect.objectContaining({
            trackActivity: false, // Should be toggled from true to false
          }),
        })
      );
    });
  });

  describe('Default Settings', () => {
    it('uses default settings when no currentSettings provided', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          ghostMode: expect.objectContaining({
            enabled: false,
            level: 'selective',
          }),
          visibility: expect.objectContaining({
            profile: 'public',
            activity: 'members',
            spaces: 'public',
            tools: 'public',
          }),
          discoverability: expect.objectContaining({
            searchable: true,
            showInDirectory: true,
            allowSpaceInvites: true,
            allowDirectMessages: true,
          }),
          analytics: expect.objectContaining({
            trackActivity: true,
            shareUsageStats: false,
            allowTargetedSuggestions: true,
          }),
        })
      );
    });

    it('merges currentSettings with defaults', () => {
      const partialSettings = {
        ghostMode: {
          enabled: true,
          level: 'minimal' as const,
        },
      };

      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={partialSettings} />);

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          ghostMode: expect.objectContaining({
            enabled: true,
            level: 'minimal',
          }),
          // Should still have defaults for other categories
          visibility: expect.objectContaining({
            profile: 'public',
          }),
        })
      );
    });
  });

  describe('Accessibility', () => {
    it('provides proper button roles', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(5);
    });

    it('provides proper slider controls', () => {
      const ghostModeSettings = {
        ...mockCurrentSettings,
        ghostMode: {
          enabled: true,
          level: 'minimal' as const,
          scheduledEnd: undefined,
        },
      };

      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={ghostModeSettings} />);

      // Show scheduler
      fireEvent.click(screen.getByText('Set Timer'));

      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
      expect(slider).toHaveAttribute('min', '1');
      expect(slider).toHaveAttribute('max', '24');
    });

    it('provides descriptive text for all settings', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      // Check that each tab has descriptive text
      expect(screen.getByText('Control your overall visibility and privacy level on HIVE')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Content Visibility'));
      expect(screen.getByText('Control who can see different parts of your profile and activity')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Discoverability'));
      expect(screen.getByText('Control how others can find and interact with you on HIVE')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Data & Analytics'));
      expect(screen.getByText('Control how your data is used to improve your HIVE experience')).toBeInTheDocument();
    });
  });

  describe('Footer Information', () => {
    it('displays sync information', () => {
      render(<EnhancedPrivacyModal {...defaultProps} />);

      expect(screen.getByText('Changes take effect immediately and sync across all your devices')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing currentSettings gracefully', () => {
      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={undefined} />);

      // Should render without crashing and use defaults
      expect(screen.getByText('Privacy & Visibility')).toBeInTheDocument();
      expect(screen.getByText('Fully Visible')).toBeInTheDocument();
    });

    it('handles partial currentSettings', () => {
      const partialSettings = {
        ghostMode: {
          enabled: true,
          level: 'invisible' as const,
        },
      };

      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={partialSettings} />);

      expect(screen.getByText('Ghost Mode Active')).toBeInTheDocument();
      expect(screen.getByText('Invisible privacy level')).toBeInTheDocument();
    });

    it('handles invalid schedule hours', () => {
      const ghostModeSettings = {
        ...mockCurrentSettings,
        ghostMode: {
          enabled: true,
          level: 'minimal' as const,
          scheduledEnd: undefined,
        },
      };

      render(<EnhancedPrivacyModal {...defaultProps} currentSettings={ghostModeSettings} />);

      // Show scheduler
      fireEvent.click(screen.getByText('Set Timer'));

      const slider = screen.getByRole('slider');
      
      // Test extreme values
      fireEvent.change(slider, { target: { value: '0' } });
      expect(screen.getByText('1h')).toBeInTheDocument(); // Should default to minimum

      fireEvent.change(slider, { target: { value: '25' } });
      expect(screen.getByText('24h')).toBeInTheDocument(); // Should cap at maximum
    });
  });
});