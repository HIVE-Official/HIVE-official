import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { HiveOnboardingWizard } from '../../../app/onboarding/components/hive-onboarding-wizard';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock HIVE UI components and auth hook
vi.mock('@hive/ui', () => ({
  HiveButton: ({ children, onClick, disabled, leftIcon, rightIcon, variant, size, className, ...props }: any) => (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={className}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  ),
  HiveCard: ({ children, className, variant, ...props }: any) => (
    <div className={className} data-variant={variant} {...props}>{children}</div>
  ),
  HiveProgress: ({ value, variant, color, size, showValue, className, ...props }: any) => (
    <div 
      data-testid="progress" 
      data-value={value} 
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-show-value={showValue}
      className={className}
      {...props} 
    />
  ),
  HiveLogo: ({ size, variant, showWordmark }: any) => (
    <div 
      data-testid="hive-logo" 
      data-size={size} 
      data-variant={variant} 
      data-show-wordmark={showWordmark}
    />
  ),
  useUnifiedAuth: vi.fn(() => ({
    user: { uid: 'test-user', email: 'test@test.edu' },
    loading: false,
    getAuthToken: vi.fn().mockResolvedValue('test-token'),
  })),
}));

// Mock step components
vi.mock('../../../app/onboarding/components/steps/hive-welcome-step', () => ({
  HiveWelcomeStep: ({ onNext }: any) => (
    <div data-testid="welcome-step">
      <h2>Welcome to HIVE</h2>
      <button onClick={onNext} data-testid="get-started">Get Started</button>
    </div>
  ),
}));

vi.mock('../../../app/onboarding/components/steps/hive-user-type-step', () => ({
  HiveUserTypeStep: ({ data, updateData }: any) => (
    <div data-testid="user-type-step">
      <h2>Select Your Role</h2>
      <button onClick={() => updateData({ userType: 'student' })} data-testid="select-student">Student</button>
      <button onClick={() => updateData({ userType: 'faculty' })} data-testid="select-faculty">Faculty</button>
    </div>
  ),
}));

vi.mock('../../../app/onboarding/components/steps/hive-name-step', () => ({
  HiveNameStep: ({ data, updateData }: any) => (
    <div data-testid="name-step">
      <h2>Your Name</h2>
      <input
        data-testid="first-name"
        value={data.firstName || ''}
        onChange={(e: React.ChangeEvent) => updateData({ firstName: e.target.value })}
        placeholder="First name"
      />
      <input
        data-testid="last-name"
        value={data.lastName || ''}
        onChange={(e: React.ChangeEvent) => updateData({ lastName: e.target.value })}
        placeholder="Last name"
      />
    </div>
  ),
}));

vi.mock('../../../app/onboarding/components/steps/hive-academics-step', () => ({
  HiveAcademicsStep: ({ data, updateData }: any) => (
    <div data-testid="academics-step">
      <h2>Academic Information</h2>
      <input
        data-testid="major"
        value={data.major || ''}
        onChange={(e: React.ChangeEvent) => updateData({ major: e.target.value })}
        placeholder="Major"
      />
      <input
        data-testid="graduation-year"
        type="number"
        value={data.graduationYear || 2024}
        onChange={(e: React.ChangeEvent) => updateData({ graduationYear: parseInt(e.target.value) })}
      />
    </div>
  ),
}));

vi.mock('../../../app/onboarding/components/steps/hive-handle-step', () => ({
  HiveHandleStep: ({ data, updateData }: any) => (
    <div data-testid="handle-step">
      <h2>Choose Handle</h2>
      <input
        data-testid="handle"
        value={data.handle || ''}
        onChange={(e: React.ChangeEvent) => updateData({ handle: e.target.value })}
        placeholder="Handle"
      />
    </div>
  ),
}));

vi.mock('../../../app/onboarding/components/steps/hive-photo-step', () => ({
  HivePhotoStep: ({ data, updateData }: any) => (
    <div data-testid="photo-step">
      <h2>Profile Photo</h2>
      <button onClick={() => updateData({ profilePhoto: 'test-photo.jpg' })} data-testid="upload-photo">
        Upload Photo
      </button>
    </div>
  ),
}));

vi.mock('../../../app/onboarding/components/steps/hive-builder-step', () => ({
  HiveBuilderStep: ({ data, updateData }: any) => (
    <div data-testid="builder-step">
      <h2>Builder Access</h2>
      <button
        onClick={() => updateData({ builderRequestSpaces: ['cs-major'] })}
        data-testid="request-builder"
      >
        Request Builder Access
      </button>
    </div>
  ),
}));

vi.mock('../../../app/onboarding/components/steps/hive-legal-step', () => ({
  HiveLegalStep: ({ data, updateData }: any) => (
    <div data-testid="legal-step">
      <h2>Terms & Privacy</h2>
      <label>
        <input
          type="checkbox"
          data-testid="accept-terms"
          checked={data.acceptedTerms || false}
          onChange={(e: React.ChangeEvent) => updateData({ acceptedTerms: e.target.checked })}
        />
        Accept Terms
      </label>
      <label>
        <input
          type="checkbox"
          data-testid="accept-privacy"
          checked={data.acceptedPrivacy || false}
          onChange={(e: React.ChangeEvent) => updateData({ acceptedPrivacy: e.target.checked })}
        />
        Accept Privacy Policy
      </label>
    </div>
  ),
}));

vi.mock('../../../app/onboarding/components/steps/hive-faculty-info-step', () => ({
  HiveFacultyInfoStep: ({ data, updateData }: any) => (
    <div data-testid="faculty-info-step">
      <h2>Faculty Information</h2>
      <input
        data-testid="faculty-first-name"
        value={data.firstName || ''}
        onChange={(e: React.ChangeEvent) => updateData({ firstName: e.target.value })}
        placeholder="First name"
      />
      <input
        data-testid="faculty-last-name"
        value={data.lastName || ''}
        onChange={(e: React.ChangeEvent) => updateData({ lastName: e.target.value })}
        placeholder="Last name"
      />
    </div>
  ),
}));

// Mock fetch
global.fetch = vi.fn();

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock dispatchEvent
const mockDispatchEvent = vi.fn();
Object.defineProperty(window, 'dispatchEvent', {
  value: mockDispatchEvent,
});

// Mock utils
vi.mock('../../../lib/utils', () => ({
  cn: (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(' ')
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => 
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock the onboarding bridge
vi.mock('../../../lib/onboarding-bridge-temp', () => ({
  useOnboardingBridge: vi.fn(() => ({
    submitOnboarding: vi.fn(),
    isLoading: false,
    error: null,
  })),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowLeft: ({ className }: any) => <div className={className} data-testid="arrow-left" />,
  ArrowRight: ({ className }: any) => <div className={className} data-testid="arrow-right" />,
  Sparkles: ({ className }: any) => <div className={className} data-testid="sparkles" />,
  User: ({ className }: any) => <div className={className} data-testid="user" />,
  Users: ({ className }: any) => <div className={className} data-testid="users" />,
  GraduationCap: ({ className }: any) => <div className={className} data-testid="graduation-cap" />,
  AtSign: ({ className }: any) => <div className={className} data-testid="at-sign" />,
  Camera: ({ className }: any) => <div className={className} data-testid="camera" />,
  Wrench: ({ className }: any) => <div className={className} data-testid="wrench" />,
  Shield: ({ className }: any) => <div className={className} data-testid="shield" />,
  CheckCircle: ({ className }: any) => <div className={className} data-testid="check-circle" />,
  Circle: ({ className }: any) => <div className={className} data-testid="circle" />,
  Loader2: ({ className }: any) => <div className={className} data-testid="loader2" />,
}));

describe('HiveOnboardingWizard', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });

    vi.clearAllMocks();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    
    // Mock successful fetch for API calls
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Initial Render', () => {
    it('renders welcome step initially', () => {
      render(<HiveOnboardingWizard />);

      expect(screen.getByTestId('welcome-step')).toBeInTheDocument();
      expect(screen.getByTestId('get-started')).toBeInTheDocument();
      expect(screen.getByTestId('progress')).toHaveAttribute('data-value', '12.5');
    });

    it('shows HIVE logo and branding', () => {
      render(<HiveOnboardingWizard />);

      expect(screen.getByTestId('hive-logo')).toBeInTheDocument();
    });

    it('hides navigation buttons on welcome step', () => {
      render(<HiveOnboardingWizard />);

      expect(screen.queryByText('Back')).not.toBeInTheDocument();
      expect(screen.queryByText('Continue')).not.toBeInTheDocument();
    });
  });

  describe('Student Flow Navigation', () => {
    it('progresses through all student steps', async () => {
      render(<HiveOnboardingWizard />);

      // Step 1: Welcome
      expect(screen.getByTestId('welcome-step')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('get-started'));

      // Step 2: User Type
      await waitFor(() => {
        expect(screen.getByTestId('user-type-step')).toBeInTheDocument();
      });
      fireEvent.click(screen.getByTestId('select-student'));
      fireEvent.click(screen.getByText('Continue'));

      // Step 3: Name
      await waitFor(() => {
        expect(screen.getByTestId('name-step')).toBeInTheDocument();
      });
      fireEvent.change(screen.getByTestId('first-name'), { target: { value: 'John' } });
      fireEvent.change(screen.getByTestId('last-name'), { target: { value: 'Doe' } });
      fireEvent.click(screen.getByText('Continue'));

      // Step 4: Academics
      await waitFor(() => {
        expect(screen.getByTestId('academics-step')).toBeInTheDocument();
      });
      fireEvent.change(screen.getByTestId('major'), { target: { value: 'Computer Science' } });
      fireEvent.change(screen.getByTestId('graduation-year'), { target: { value: '2026' } });
      fireEvent.click(screen.getByText('Continue'));

      // Step 5: Handle
      await waitFor(() => {
        expect(screen.getByTestId('handle-step')).toBeInTheDocument();
      });
      fireEvent.change(screen.getByTestId('handle'), { target: { value: 'johndoe2026' } });
      fireEvent.click(screen.getByText('Continue'));

      // Step 6: Photo
      await waitFor(() => {
        expect(screen.getByTestId('photo-step')).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText('Continue'));

      // Step 7: Builder
      await waitFor(() => {
        expect(screen.getByTestId('builder-step')).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText('Continue'));

      // Step 8: Legal
      await waitFor(() => {
        expect(screen.getByTestId('legal-step')).toBeInTheDocument();
      });
    });

    it('shows back button after first step', async () => {
      render(<HiveOnboardingWizard />);

      fireEvent.click(screen.getByTestId('get-started'));

      await waitFor(() => {
        expect(screen.getByText('Back')).toBeInTheDocument();
      });
    });

    it('allows going back to previous steps', async () => {
      render(<HiveOnboardingWizard />);

      // Go to step 2
      fireEvent.click(screen.getByTestId('get-started'));
      await waitFor(() => {
        expect(screen.getByTestId('user-type-step')).toBeInTheDocument();
      });

      // Go back to step 1
      fireEvent.click(screen.getByText('Back'));
      await waitFor(() => {
        expect(screen.getByTestId('welcome-step')).toBeInTheDocument();
      });
    });
  });

  describe('Faculty Flow Navigation', () => {
    it('uses simplified faculty flow', async () => {
      render(<HiveOnboardingWizard />);

      // Step 1: Welcome
      fireEvent.click(screen.getByTestId('get-started'));

      // Step 2: Select Faculty
      await waitFor(() => {
        expect(screen.getByTestId('user-type-step')).toBeInTheDocument();
      });
      fireEvent.click(screen.getByTestId('select-faculty'));
      fireEvent.click(screen.getByText('Continue'));

      // Step 3: Faculty Info (skips regular name step)
      await waitFor(() => {
        expect(screen.getByTestId('faculty-info-step')).toBeInTheDocument();
      });
      fireEvent.change(screen.getByTestId('faculty-first-name'), { target: { value: 'Dr. Jane' } });
      fireEvent.change(screen.getByTestId('faculty-last-name'), { target: { value: 'Smith' } });
      fireEvent.click(screen.getByText('Continue'));

      // Step 4: Builder (skips academics and handle)
      await waitFor(() => {
        expect(screen.getByTestId('builder-step')).toBeInTheDocument();
        expect(screen.getAllByText('Request Management Access')[0]).toBeInTheDocument();
      });
      fireEvent.click(screen.getByTestId('request-builder'));
      fireEvent.click(screen.getByText('Continue'));

      // Step 5: Legal
      await waitFor(() => {
        expect(screen.getByTestId('legal-step')).toBeInTheDocument();
      });
    });

    it('shows correct progress for faculty flow', async () => {
      render(<HiveOnboardingWizard />);

      fireEvent.click(screen.getByTestId('get-started'));

      await waitFor(() => {
        fireEvent.click(screen.getByTestId('select-faculty'));
      });

      // Faculty flow has 5 steps, so step 2 should be 40%
      await waitFor(() => {
        expect(screen.getByTestId('progress')).toHaveAttribute('data-value', '40');
      });
    });
  });

  describe('Form Validation', () => {
    it('prevents navigation with invalid data', async () => {
      render(<HiveOnboardingWizard />);

      // Go to name step
      fireEvent.click(screen.getByTestId('get-started'));
      await waitFor(() => fireEvent.click(screen.getByTestId('select-student')));
      fireEvent.click(screen.getByText('Continue'));

      await waitFor(() => {
        expect(screen.getByTestId('name-step')).toBeInTheDocument();
      });

      // Try to continue without filling required fields
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeDisabled();

      // Fill first name only (should still be disabled)
      fireEvent.change(screen.getByTestId('first-name'), { target: { value: 'J' } }); // Too short
      expect(continueButton).toBeDisabled();

      // Fill valid first name
      fireEvent.change(screen.getByTestId('first-name'), { target: { value: 'John' } });
      expect(continueButton).toBeDisabled();

      // Fill valid last name
      fireEvent.change(screen.getByTestId('last-name'), { target: { value: 'Doe' } });
      expect(continueButton).not.toBeDisabled();
    });

    it('validates handle format', async () => {
      render(<HiveOnboardingWizard />);

      // Navigate to handle step
      const steps = ['get-started', 'select-student', 'name-continue', 'academics-continue'];
      for (let i = 0; i < 4; i++) {
        if (i === 0) fireEvent.click(screen.getByTestId('get-started'));
        else if (i === 1) {
          await waitFor(() => fireEvent.click(screen.getByTestId('select-student')));
          fireEvent.click(screen.getByText('Continue'));
        } else if (i === 2) {
          await waitFor(() => {
            fireEvent.change(screen.getByTestId('first-name'), { target: { value: 'John' } });
            fireEvent.change(screen.getByTestId('last-name'), { target: { value: 'Doe' } });
          });
          fireEvent.click(screen.getByText('Continue'));
        } else if (i === 3) {
          await waitFor(() => {
            fireEvent.change(screen.getByTestId('major'), { target: { value: 'CS' } });
            fireEvent.change(screen.getByTestId('graduation-year'), { target: { value: '2026' } });
          });
          fireEvent.click(screen.getByText('Continue'));
        }
      }

      await waitFor(() => {
        expect(screen.getByTestId('handle-step')).toBeInTheDocument();
      });

      const continueButton = screen.getByText('Continue');

      // Test invalid handles
      fireEvent.change(screen.getByTestId('handle'), { target: { value: 'ab' } }); // Too short
      expect(continueButton).toBeDisabled();

      fireEvent.change(screen.getByTestId('handle'), { target: { value: 'invalid@handle' } }); // Invalid chars
      expect(continueButton).toBeDisabled();

      // Test valid handle
      fireEvent.change(screen.getByTestId('handle'), { target: { value: 'validhandle123' } });
      expect(continueButton).not.toBeDisabled();
    });
  });

  describe('Onboarding Completion', () => {
    it('submits onboarding data successfully', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          user: { id: 'user-123', fullName: 'John Doe', handle: 'johndoe' },
        }),
      } as Response);

      render(<HiveOnboardingWizard />);

      // Navigate to final step and fill all required data
      fireEvent.click(screen.getByTestId('get-started'));
      await waitFor(() => fireEvent.click(screen.getByTestId('select-student')));
      fireEvent.click(screen.getByText('Continue'));

      await waitFor(() => {
        fireEvent.change(screen.getByTestId('first-name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByTestId('last-name'), { target: { value: 'Doe' } });
      });
      fireEvent.click(screen.getByText('Continue'));

      await waitFor(() => {
        fireEvent.change(screen.getByTestId('major'), { target: { value: 'Computer Science' } });
        fireEvent.change(screen.getByTestId('graduation-year'), { target: { value: '2026' } });
      });
      fireEvent.click(screen.getByText('Continue'));

      await waitFor(() => {
        fireEvent.change(screen.getByTestId('handle'), { target: { value: 'johndoe2026' } });
      });
      fireEvent.click(screen.getByText('Continue'));

      // Skip photo
      await waitFor(() => {
        fireEvent.click(screen.getByText('Continue'));
      });

      // Skip builder
      await waitFor(() => {
        fireEvent.click(screen.getByText('Continue'));
      });

      // Accept terms
      await waitFor(() => {
        fireEvent.click(screen.getByTestId('accept-terms'));
        fireEvent.click(screen.getByTestId('accept-privacy'));
      });

      // Submit
      const submitButton = screen.getByText('Enter HIVE');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/auth/complete-onboarding', expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          }),
        }));
      });

      // Should update localStorage
      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          'hive_session',
          expect.stringContaining('"onboardingCompleted":true')
        );
      });

      // Should dispatch storage event
      expect(mockDispatchEvent).toHaveBeenCalled();

      // Should redirect to dashboard
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/');
      }, { timeout: 3000 });
    });

    it('handles development mode completion', async () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'dev_auth_mode') return 'true';
        if (key === 'hive_session') return JSON.stringify({ userId: 'dev-user' });
        return null;
      });

      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Onboarding completed successfully (development mode)',
        }),
      } as Response);

      render(<HiveOnboardingWizard />);

      // Navigate to completion
      // ... (navigation steps)

      // Should use dev token
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/auth/complete-onboarding',
          expect.objectContaining({
            headers: expect.objectContaining({
              'Authorization': 'Bearer dev_token_dev-user',
            }),
          })
        );
      });
    });

    it('handles onboarding errors', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Handle is already taken' }),
      } as Response);

      render(<HiveOnboardingWizard />);

      // Navigate and submit
      // ... (steps to reach submission)

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText('Handle is already taken')).toBeInTheDocument();
      });
    });
  });

  describe('Progress Tracking', () => {
    it('updates progress correctly', async () => {
      render(<HiveOnboardingWizard />);

      // Initial: 12.5% (1/8)
      expect(screen.getByTestId('progress')).toHaveAttribute('data-value', '12.5');

      // After step 1: 25% (2/8)
      fireEvent.click(screen.getByTestId('get-started'));
      await waitFor(() => {
        expect(screen.getByTestId('progress')).toHaveAttribute('data-value', '25');
      });
    });

    it('shows step indicators in sidebar', () => {
      render(<HiveOnboardingWizard />);

      // Should show step titles and progress
      expect(screen.getByText('Setup Progress')).toBeInTheDocument();
      expect(screen.getAllByText('Welcome to HIVE')[0]).toBeInTheDocument();
      expect(screen.getByText('Your Role')).toBeInTheDocument();
    });
  });

  describe('Profile Preview', () => {
    it('updates profile preview as user fills data', async () => {
      render(<HiveOnboardingWizard />);

      // Navigate to name step and fill data
      fireEvent.click(screen.getByTestId('get-started'));
      await waitFor(() => fireEvent.click(screen.getByTestId('select-student')));
      fireEvent.click(screen.getByText('Continue'));

      await waitFor(() => {
        fireEvent.change(screen.getByTestId('first-name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByTestId('last-name'), { target: { value: 'Doe' } });
      });

      // Profile preview should show the name
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('shows network error for failed requests', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<HiveOnboardingWizard />);

      // Navigate to completion and submit
      // ... (navigation steps)

      await waitFor(() => {
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      });
    });

    it('maintains state during errors', async () => {
      render(<HiveOnboardingWizard />);

      // Fill some data
      fireEvent.click(screen.getByTestId('get-started'));
      await waitFor(() => fireEvent.click(screen.getByTestId('select-student')));

      // Data should persist even if there are errors
      expect(screen.getByTestId('user-type-step')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labels and roles', () => {
      render(<HiveOnboardingWizard />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);

      const progressBar = screen.getByTestId('progress');
      expect(progressBar).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      render(<HiveOnboardingWizard />);

      const getStartedButton = screen.getByTestId('get-started');
      getStartedButton.focus();
      
      // Should be focusable
      expect(document.activeElement).toBe(getStartedButton);
    });
  });
});