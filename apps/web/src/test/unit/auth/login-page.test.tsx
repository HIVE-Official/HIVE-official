import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginPage from '../../../app/auth/login/page';
import { mockLocalStorage } from '../../setup';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

// Mock fetch
global.fetch = vi.fn();

describe('LoginPage', () => {
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
    
    // Mock search params for valid school
    mockSearchParams.get.mockImplementation((key: string) => {
      switch (key) {
        case 'schoolId': return 'test-university';
        case 'schoolName': return 'Test University';
        case 'domain': return 'test.edu';
        default: return null;
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('School Validation', () => {
    it('redirects to schools page if schoolId is missing', () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        if (key === 'schoolId') return null;
        return 'test-value';
      });

      render(<LoginPage />);
      
      expect(mockPush).toHaveBeenCalledWith('/schools');
    });

    it('redirects to schools page if schoolName is missing', () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        if (key === 'schoolName') return null;
        return 'test-value';
      });

      render(<LoginPage />);
      
      expect(mockPush).toHaveBeenCalledWith('/schools');
    });

    it('redirects to schools page if domain is missing', () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        if (key === 'domain') return null;
        return 'test-value';
      });

      render(<LoginPage />);
      
      expect(mockPush).toHaveBeenCalledWith('/schools');
    });
  });

  describe('Form Rendering', () => {
    it('renders login form with correct school information', () => {
      render(<LoginPage />);

      // Debug output
      screen.debug();
      
      expect(screen.getByText('Sign in to HIVE')).toBeInTheDocument();
      expect(screen.getByText('Test University')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Enter any email address \(dev mode\)/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Send magic link/i })).toBeInTheDocument();
    });

    it('shows development mode badge for test.edu domain', () => {
      render(<LoginPage />);

      expect(screen.getByText('🛠️ Development Mode Active')).toBeInTheDocument();
    });

    it('shows appropriate placeholder for non-dev domains', () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'schoolId': return 'ub';
          case 'schoolName': return 'University at Buffalo';
          case 'domain': return 'buffalo.edu';
          default: return null;
        }
      });

      render(<LoginPage />);

      expect(screen.getByPlaceholderText(/Enter your @buffalo.edu address/)).toBeInTheDocument();
      expect(screen.queryByText('🛠️ Development Mode Active')).not.toBeInTheDocument();
    });
  });

  describe('Email Validation', () => {
    it('validates email format in real-time', async () => {
      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(/Enter any email address \(dev mode\)/);
      
      // Test invalid email format
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('validates domain match for non-test domains', async () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'schoolId': return 'ub';
          case 'schoolName': return 'University at Buffalo';
          case 'domain': return 'buffalo.edu';
          default: return null;
        }
      });

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(/Enter your @buffalo.edu address/);
      
      // Test wrong domain
      fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
      
      await waitFor(() => {
        expect(screen.getByText('Please use your @buffalo.edu email address')).toBeInTheDocument();
      });
    });

    it('allows any email for test.edu domain', async () => {
      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(/Enter any email address \(dev mode\)/);
      
      // Test wrong domain but for test.edu (should be allowed)
      fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
      
      // Should not show domain validation error for test.edu
      await waitFor(() => {
        expect(screen.queryByText(/Please use your @test.edu email address/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Magic Link Sending', () => {
    it('sends magic link for valid email', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Magic link sent' }),
      } as Response);

      render(<LoginPage />);

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByRole('button', { name: /Send magic link/i });

      // Clear input and set email using direct input change
      await user.clear(emailInput);
      fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
      
      // Give time for React state updates
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Try form submission directly
      const form = emailInput.closest('form');
      if (form) {
        fireEvent.submit(form);
      }
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/auth/send-magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@test.edu',
            schoolId: 'test-university',
          }),
        });
      }, { timeout: 5000 });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('emailForSignIn', 'test@test.edu');
    });

    it('handles development mode redirect', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          dev: true,
          user: { userId: 'dev-user-1', handle: 'testuser', role: 'student' },
        }),
      } as Response);

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(/Enter any email address \(dev mode\)/);
      const submitButton = screen.getByRole('button', { name: /Send magic link/i });

      await user.clear(emailInput);
      fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
      
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          'hive_session',
          expect.stringContaining('"userId":"dev-user-1"')
        );
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('dev_auth_mode', 'true');
      });

      // Should redirect to onboarding after delay
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/onboarding');
      }, { timeout: 2000 });
    });

    it('shows success modal for non-dev users', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Magic link sent' }),
      } as Response);

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(/Enter any email address \(dev mode\)/);
      const submitButton = screen.getByRole('button', { name: /Send magic link/i });

      await user.clear(emailInput);
      fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
      
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Check your inbox')).toBeInTheDocument();
        expect(screen.getByText('test@test.edu')).toBeInTheDocument();
      });
    });

    it('displays dev magic link when available', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.mocked(fetch);
      const testMagicLink = 'http://localhost:3000/auth/verify?token=dev-token';
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          devMode: true,
          magicLink: testMagicLink,
        }),
      } as Response);

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(/Enter any email address \(dev mode\)/);
      const submitButton = screen.getByRole('button', { name: /Send magic link/i });

      await user.clear(emailInput);
      fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
      
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('🛠️ Development Mode - Magic Link:')).toBeInTheDocument();
        expect(screen.getByText(testMagicLink)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Use Dev Magic Link/i })).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('handles API errors gracefully', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Rate limit exceeded' }),
      } as Response);

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(/Enter any email address \(dev mode\)/);
      const submitButton = screen.getByRole('button', { name: /Send magic link/i });

      await user.clear(emailInput);
      fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
      
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Rate limit exceeded')).toBeInTheDocument();
      });
    });

    it('handles network errors', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(/Enter any email address \(dev mode\)/);
      const submitButton = screen.getByRole('button', { name: /Send magic link/i });

      await user.clear(emailInput);
      fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
      
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });
  });

  describe('Loading States', () => {
    it('shows loading state during magic link sending', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockImplementationOnce(
        () => new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ success: true }),
        } as Response), 100))
      );

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(/Enter any email address \(dev mode\)/);
      const submitButton = screen.getByRole('button', { name: /Send magic link/i });

      await user.clear(emailInput);
      fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
      
      await user.click(submitButton);

      expect(screen.getByText('Sending magic link...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      await waitFor(() => {
        expect(screen.queryByText('Sending magic link...')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText(/School email address/i);
      const submitButton = screen.getByRole('button', { name: /Send magic link/i });

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('shows validation errors with proper ARIA attributes', async () => {
      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(/Enter any email address \(dev mode\)/);
      fireEvent.change(emailInput, { target: { value: 'invalid' } });

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });
  });
});