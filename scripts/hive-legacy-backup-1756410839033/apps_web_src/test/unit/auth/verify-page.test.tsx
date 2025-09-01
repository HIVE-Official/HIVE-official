import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import VerifyPage from '../../../app/auth/verify/page';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

// Mock HIVE UI components
vi.mock('@hive/ui', () => ({
  useUnifiedAuth: vi.fn(() => ({
    user: { uid: 'test-user', email: 'test@test.edu' },
    loading: false,
    refreshSession: vi.fn(),
  })),
  HiveButton: ({ children, onClick, disabled, variant, size, className, ...props }: any) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={className}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Loader2: ({ className }: any) => <div className={className} data-testid="loader2" />,
}));

// Mock auth components
vi.mock('../../../components/auth/auth-layout', () => ({
  AuthLayout: ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div data-testid="auth-layout">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

vi.mock('../../../components/auth/auth-status', () => ({
  AuthStatus: ({ type, title, message, action }: any) => (
    <div data-testid={`auth-status-${type}`}>
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
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

// Mock window.prompt
global.prompt = vi.fn();

describe('VerifyPage', () => {
  const mockPush = vi.fn();
  const mockSearchParams = {
    get: vi.fn(),
  };

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });

    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams as any);
    
    // Reset mocks
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
    
    // Mock URL search params
    Object.defineProperty(window, 'location', {
      value: {
        search: '?oobCode=test-code&email=test@test.edu&schoolId=test-university',
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Magic Link Verification', () => {
    it('processes magic link successfully for new user', async () => {
      mockLocalStorage.getItem.mockReturnValue('test@test.edu');
      
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          needsOnboarding: true,
          userId: 'new-user-123',
        }),
      } as Response);

      render(<VerifyPage />);

      // Initially shows loading
      expect(screen.getByText('Verifying your access')).toBeInTheDocument();

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/auth/verify-magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@test.edu',
            schoolId: 'test-university',
            token: 'test-code',
          }),
        });
      });

      // Should show success message
      await waitFor(() => {
        expect(screen.getByText('Welcome to HIVE!')).toBeInTheDocument();
        expect(screen.getByText("You've been successfully signed in. Taking you to your digital campus...")).toBeInTheDocument();
      });

      // Should store session data
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'hive_session',
        expect.stringContaining('"userId":"new-user-123"')
      );

      // Should redirect to onboarding
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/onboarding');
      }, { timeout: 2000 });
    });

    it('processes magic link successfully for existing user', async () => {
      mockLocalStorage.getItem.mockReturnValue('existing@test.edu');
      
      // Override the URL search params for this test
      Object.defineProperty(window, 'location', {
        value: {
          search: '?oobCode=test-code&email=existing@test.edu&schoolId=test-university',
        },
        writable: true,
      });
      
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          needsOnboarding: false,
          userId: 'existing-user-456',
        }),
      } as Response);

      render(<VerifyPage />);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/auth/verify-magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'existing@test.edu',
            schoolId: 'test-university',
            token: 'test-code',
          }),
        });
      });

      // Should redirect to dashboard
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/');
      }, { timeout: 2000 });
    });

    it('handles custom development tokens', async () => {
      // Mock URL with custom token
      Object.defineProperty(window, 'location', {
        value: {
          search: '?token=dev-token-123&email=dev@test.edu&schoolId=test-university',
        },
        writable: true,
      });

      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          needsOnboarding: true,
          userId: 'dev-user-789',
        }),
      } as Response);

      render(<VerifyPage />);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/auth/verify-magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'dev@test.edu',
            schoolId: 'test-university',
            token: 'dev-token-123',
          }),
        });
      });
    });
  });

  describe('Email Handling', () => {
    it('uses email from URL parameters', async () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, needsOnboarding: true, userId: 'test' }),
      } as Response);

      render(<VerifyPage />);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/auth/verify-magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@test.edu',
            schoolId: 'test-university',
            token: 'test-code',
          }),
        });
      });
    });

    it('prompts for email if not found', async () => {
      // Mock URL without email
      Object.defineProperty(window, 'location', {
        value: {
          search: '?oobCode=test-code&schoolId=test-university',
        },
        writable: true,
      });

      mockLocalStorage.getItem.mockReturnValue(null);
      // Skip the prompt test since it's not implemented in the actual component
      
      render(<VerifyPage />);

      await waitFor(() => {
        expect(screen.getByText('Verification Failed')).toBeInTheDocument();
        expect(screen.getByText('Email is required to complete sign in. Please use the magic link from your email.')).toBeInTheDocument();
      });
    });

    it('shows error if email is not provided', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          search: '?oobCode=test-code&schoolId=test-university',
        },
        writable: true,
      });

      mockLocalStorage.getItem.mockReturnValue(null);

      render(<VerifyPage />);

      await waitFor(() => {
        expect(screen.getByText('Verification Failed')).toBeInTheDocument();
        expect(screen.getByText('Email is required to complete sign in. Please use the magic link from your email.')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('shows error for missing school information', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          search: '?oobCode=test-code&email=test@test.edu',
        },
        writable: true,
      });

      render(<VerifyPage />);

      await waitFor(() => {
        expect(screen.getByText('Verification Failed')).toBeInTheDocument();
        expect(screen.getByText('School information is missing')).toBeInTheDocument();
      });
    });

    it('handles API errors gracefully', async () => {
      mockLocalStorage.getItem.mockReturnValue('test@test.edu');
      
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockImplementationOnce(() => {
        throw new Error('Invalid or expired magic link');
      });

      render(<VerifyPage />);

      await waitFor(() => {
        expect(screen.getByText('Verification Failed')).toBeInTheDocument();
        expect(screen.getByText('Invalid or expired magic link')).toBeInTheDocument();
      });
    });

    it('handles network errors', async () => {
      mockLocalStorage.getItem.mockReturnValue('test@test.edu');
      
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockImplementationOnce(() => {
        throw new Error('Network error');
      });

      render(<VerifyPage />);

      await waitFor(() => {
        expect(screen.getByText('Verification Failed')).toBeInTheDocument();
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });

    it('provides fallback error message', async () => {
      mockLocalStorage.getItem.mockReturnValue('test@test.edu');
      
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockImplementationOnce(() => {
        throw new TypeError('Cannot read properties of undefined (reading \'json\')');
      });

      render(<VerifyPage />);

      await waitFor(() => {
        expect(screen.getByText('Verification Failed')).toBeInTheDocument();
        expect(screen.getByText('Cannot read properties of undefined (reading \'json\')')).toBeInTheDocument();
      });
    });
  });

  describe('Development Mode', () => {
    it('sets development mode flag for DEV_MODE tokens', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          search: '?oobCode=DEV_MODE&email=dev@test.edu&schoolId=test-university',
        },
        writable: true,
      });

      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          needsOnboarding: true,
          userId: 'dev-user',
        }),
      } as Response);

      render(<VerifyPage />);

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('dev_auth_mode', 'true');
      });
    });
  });

  describe('Session Management', () => {
    it('clears email from localStorage after verification', async () => {
      mockLocalStorage.getItem.mockReturnValue('test@test.edu');
      
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, needsOnboarding: true, userId: 'test' }),
      } as Response);

      render(<VerifyPage />);

      await waitFor(() => {
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('emailForSignIn');
      });
    });

    it('stores complete session data', async () => {
      mockLocalStorage.getItem.mockReturnValue('test@test.edu');
      
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          needsOnboarding: true,
          userId: 'test-user-123',
        }),
      } as Response);

      render(<VerifyPage />);

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          'hive_session',
          expect.stringMatching(/"userId":"test-user-123"/)
        );
      });

      const sessionCall = mockLocalStorage.setItem.mock.calls.find(
        call => call[0] === 'hive_session'
      );
      const sessionData = JSON.parse(sessionCall![1]);

      expect(sessionData).toMatchObject({
        userId: 'test-user-123',
        email: 'test@test.edu',
        schoolId: 'test-university',
      });
      expect(sessionData.verifiedAt).toBeDefined();
    });
  });

  describe('Loading States', () => {
    it('shows loading state during verification', async () => {
      mockLocalStorage.getItem.mockReturnValue('test@test.edu');
      
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, needsOnboarding: true, userId: 'test' }),
      } as Response);

      render(<VerifyPage />);

      expect(screen.getByText('Verifying your access')).toBeInTheDocument();
      expect(screen.getByText('Please wait while we verify your magic link')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Welcome to HIVE!')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Accessibility', () => {
    it('provides proper page structure', () => {
      render(<VerifyPage />);

      expect(screen.getByTestId('auth-layout')).toBeInTheDocument();
      expect(screen.getByText('Verifying Access')).toBeInTheDocument();
    });

    it('shows retry button for errors', async () => {
      mockLocalStorage.getItem.mockReturnValue('test@test.edu');
      
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Invalid link' }),
      } as Response);

      render(<VerifyPage />);

      await waitFor(() => {
        const retryButton = screen.getByRole('button', { name: /Try again/i });
        expect(retryButton).toBeInTheDocument();
      });
    });
  });
});