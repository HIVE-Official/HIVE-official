import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, render, waitFor, fireEvent } from '@/test/utils/test-utils';
import { ToastProvider } from '@/hooks/use-toast';

// Mock @hive/auth-logic useAuth to control auth state in tests
vi.mock('@hive/auth-logic', () => {
  return {
    useAuth: () => ({
      user: {
        uid: 'test-uid-123',
        id: 'test-uid-123',
        email: 'test@buffalo.edu',
        fullName: 'Test User',
        handle: 'testuser',
        isBuilder: false,
        onboardingCompleted: true,
        getIdToken: async () => 'token',
      },
      isLoading: false,
      isAuthenticated: true,
      error: null,
      clearError: () => {},
      refreshUser: async () => {},
    }),
  };
});

// Import after mocks
import { useProfileV2 } from '@/hooks/use-profile-v2';

function HookHarness({ handle, profileId, autoLoad = true }: { handle?: string; profileId?: string; autoLoad?: boolean }) {
  const { profile, loading, error, refresh, updatePrivacy, isOwnProfile } = useProfileV2({ handle, profileId, autoLoad });
  return (
    <div>
      <div data-testid="loading">{loading ? 'true' : 'false'}</div>
      <div data-testid="error">{error ? error.message : ''}</div>
      <div data-testid="isOwnProfile">{isOwnProfile ? 'true' : 'false'}</div>
      <div data-testid="profile">{profile ? JSON.stringify({ id: profile.id, handle: profile.handle, privacy: profile.privacy }) : ''}</div>
      <button onClick={() => refresh()} data-testid="refresh-btn">refresh</button>
      <button onClick={() => updatePrivacy({ visibility: 'private' })} data-testid="privacy-btn">privacy</button>
    </div>
  );
}

describe('useProfileV2', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.useFakeTimers();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
    global.fetch = originalFetch as any;
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<ToastProvider>{ui}</ToastProvider>);
  };

  it('loads profile successfully on mount when autoLoad is true', async () => {
    (global.fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: { id: 'p1', handle: 'testuser', isOwnProfile: true, privacy: { visibility: 'public' } } }),
    });

    renderWithProviders(<HookHarness autoLoad={true} handle="testuser" />);

    await waitFor(() => expect(screen.getByTestId('loading').textContent).toBe('false'));
    expect(screen.getByTestId('error').textContent).toBe('');
    expect(screen.getByTestId('isOwnProfile').textContent).toBe('true');
    expect(screen.getByTestId('profile').textContent).toContain('testuser');

    // Verify API was called with correct query param
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/profile/v2?'),
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('sets error and shows toast when fetch fails', async () => {
    (global.fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to load profile' }),
    });

    renderWithProviders(<HookHarness autoLoad={true} handle="baduser" />);

    await waitFor(() => expect(screen.getByTestId('loading').textContent).toBe('false'));
    expect(screen.getByTestId('error').textContent).toBe('Failed to load profile');
  });

  it('refresh triggers a re-fetch', async () => {
    // First call for initial autoLoad
    (global.fetch as unknown as vi.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: { id: 'p1', handle: 'testuser', isOwnProfile: true, privacy: { visibility: 'public' } } }),
      })
      // Second call for refresh
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: { id: 'p1', handle: 'testuser', isOwnProfile: true, privacy: { visibility: 'public' } } }),
      });

    renderWithProviders(<HookHarness autoLoad={true} handle="testuser" />);

    await waitFor(() => expect(screen.getByTestId('loading').textContent).toBe('false'));
    fireEvent.click(screen.getByTestId('refresh-btn'));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  });

  it('updatePrivacy updates local state on success', async () => {
    // Initial profile load
    (global.fetch as unknown as vi.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: { id: 'p1', handle: 'testuser', isOwnProfile: true, privacy: { visibility: 'public' } } }),
      })
      // PATCH response
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: { fieldsUpdated: 1, privacy: { visibility: 'private' } } }),
      });

    renderWithProviders(<HookHarness autoLoad={true} handle="testuser" />);

    await waitFor(() => expect(screen.getByTestId('loading').textContent).toBe('false'));
    expect(screen.getByTestId('profile').textContent).toContain('public');

    fireEvent.click(screen.getByTestId('privacy-btn'));

    await waitFor(() => expect(screen.getByTestId('profile').textContent).toContain('private'));
  });

  it('updatePrivacy blocks when not own profile', async () => {
    // Initial profile shows not owner
    (global.fetch as unknown as vi.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: { id: 'p1', handle: 'someone', isOwnProfile: false, privacy: { visibility: 'public' } } }),
      });

    renderWithProviders(<HookHarness autoLoad={true} handle="someone" />);

    await waitFor(() => expect(screen.getByTestId('isOwnProfile').textContent).toBe('false'));
    fireEvent.click(screen.getByTestId('privacy-btn'));

    // No PATCH should be attempted
    expect((global.fetch as vi.Mock).mock.calls.length).toBe(1);
  });
});

