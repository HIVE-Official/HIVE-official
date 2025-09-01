import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProfileIdentityModal } from '../../../components/profile/profile-identity-modal';

// Mock all the UI components
vi.mock('@hive/ui', () => ({
  HiveInput: ({ value, onChange, placeholder, type, className }: any) => (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={className}
      data-testid="hive-input"
    />
  ),
  HiveButton: ({ children, onClick, disabled, variant, className }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-variant={variant}
      data-testid="hive-button"
    >
      {children}
    </button>
  ),
  HiveFileUpload: ({ onFilesSelected, accept, maxSize, multiple, className }: any) => (
    <div
      className={className}
      data-testid="hive-file-upload"
      onClick={() => {
        // Simulate file selection
        const mockFile = new File(['mock'], 'test.jpg', { type: 'image/jpeg' });
        onFilesSelected([mockFile]);
      }}
    >
      Upload File Component
    </div>
  ),
  Textarea: ({ value, onChange, placeholder, rows, maxLength, className }: any) => (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      className={className}
      data-testid="textarea"
    />
  ),
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}));

// Mock useSession hook
vi.mock('../../../hooks/use-session', () => ({
  useSession: vi.fn(() => ({
    updateProfile: vi.fn().mockResolvedValue({}),
    uploadPhoto: vi.fn().mockResolvedValue({ avatarUrl: 'https://example.com/avatar.jpg' }),
    isUpdating: false,
    error: null,
    clearError: vi.fn(),
  })),
}));

// Mock browser APIs that don't exist in JSDOM
const createMockMediaDevices = () => ({
  getUserMedia: vi.fn().mockResolvedValue({
    getTracks: () => [{ stop: vi.fn() }],
  }),
});

const createMockNavigator = () => ({
  mediaDevices: createMockMediaDevices(),
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
});

const createMockLocalStorage = () => ({
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});

// Setup global mocks
Object.defineProperty(global, 'navigator', {
  value: createMockNavigator(),
  writable: true,
});

Object.defineProperty(global, 'localStorage', {
  value: createMockLocalStorage(),
});

// Mock fetch
global.fetch = vi.fn();

describe('ProfileIdentityModal', () => {
  let queryClient: QueryClient;
  let mockLocalStorage: ReturnType<typeof createMockLocalStorage>;

  const mockProfile = {
    fullName: 'John Doe',
    preferredName: 'Johnny',
    academicYear: 'junior' as const,
    major: 'Computer Science',
    housing: 'Smith Hall',
    pronouns: 'he/him',
    statusMessage: 'Building cool stuff!',
    age: 21,
    isBuilder: true,
    profilePhoto: 'https://example.com/photo.jpg',
  };

  const mockProps = {
    profile: mockProfile,
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
    
    // Reset localStorage mock
    mockLocalStorage = createMockLocalStorage();
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ token: 'test-token' }));
  });

  afterEach(() => {
    queryClient.clear();
    vi.resetAllMocks();
  });

  const renderModal = (props = mockProps) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ProfileIdentityModal {...props} />
      </QueryClientProvider>
    );
  };

  describe('Modal Visibility', () => {
    it('renders when isOpen is true', () => {
      renderModal();

      expect(screen.getByText('Your Profile')).toBeInTheDocument();
      expect(screen.getByText('Profile Photo')).toBeInTheDocument();
      expect(screen.getByText('Identity & Info')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      renderModal({ ...mockProps, isOpen: false });

      expect(screen.queryByText('Your Profile')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
      renderModal();

      const closeButton = screen.getByText('✕');
      fireEvent.click(closeButton);

      expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Form Fields', () => {
    it('displays all form fields with current profile data', () => {
      renderModal();

      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Johnny')).toBeInTheDocument();
      expect(screen.getByDisplayValue('21')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Computer Science')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Smith Hall')).toBeInTheDocument();
      expect(screen.getByDisplayValue('he/him')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Building cool stuff!')).toBeInTheDocument();
    });

    it('updates form data when inputs change', () => {
      renderModal();

      const nameInput = screen.getByDisplayValue('John Doe');
      fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

      expect(nameInput).toHaveValue('Jane Doe');
    });

    it('updates academic year when dropdown changes', () => {
      renderModal();

      const academicYearSelect = screen.getByDisplayValue('Junior');
      fireEvent.change(academicYearSelect, { target: { value: 'senior' } });

      expect(academicYearSelect).toHaveValue('senior');
    });

    it('displays character count for bio/status', () => {
      renderModal();

      expect(screen.getByText('20/200 characters')).toBeInTheDocument();
    });

    it('updates character count when bio changes', () => {
      renderModal();

      const bioTextarea = screen.getByDisplayValue('Building cool stuff!');
      fireEvent.change(bioTextarea, { target: { value: 'New bio text' } });

      expect(screen.getByText('12/200 characters')).toBeInTheDocument();
    });
  });

  describe('Photo Upload', () => {
    it('displays current profile photo', () => {
      renderModal();

      const profileImage = screen.getByAltText('Profile preview');
      expect(profileImage).toHaveAttribute('src', 'https://example.com/photo.jpg');
    });

    it('displays initials when no photo available', () => {
      const profileWithoutPhoto = { ...mockProfile, profilePhoto: undefined };
      renderModal({ ...mockProps, profile: profileWithoutPhoto });

      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.getByText('No photo yet')).toBeInTheDocument();
    });

    it('handles file upload through HiveFileUpload component', async () => {
      const mockUseSession = await import('../../../hooks/use-session');
      const mockUploadPhoto = vi.fn().mockResolvedValue({ avatarUrl: 'https://example.com/new-avatar.jpg' });
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        updateProfile: vi.fn(),
        uploadPhoto: mockUploadPhoto,
        isUpdating: false,
        error: null,
        clearError: vi.fn(),
      });

      renderModal();

      const fileUploadComponent = screen.getByTestId('hive-file-upload');
      fireEvent.click(fileUploadComponent);

      await waitFor(() => {
        expect(mockUploadPhoto).toHaveBeenCalled();
      });
    });

    it('shows upload error when file upload fails', async () => {
      const mockUseSession = await import('../../../hooks/use-session');
      const mockUploadPhoto = vi.fn().mockRejectedValue(new Error('Upload failed'));
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        updateProfile: vi.fn(),
        uploadPhoto: mockUploadPhoto,
        isUpdating: false,
        error: null,
        clearError: vi.fn(),
      });

      renderModal();

      const uploadButton = screen.getByText('📁 Upload Photo');
      fireEvent.click(uploadButton);

      // Create and attach a hidden file input for testing
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(fileInput, 'files', { value: [file], writable: false });
      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(screen.getByText('Upload failed')).toBeInTheDocument();
      });

      document.body.removeChild(fileInput);
    });

    it('validates file type on upload', async () => {
      renderModal();

      // Create and attach a hidden file input for testing
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);

      const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      Object.defineProperty(fileInput, 'files', { value: [invalidFile], writable: false });
      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(screen.getByText('Invalid file type. Only JPEG, PNG, and WebP are allowed.')).toBeInTheDocument();
      });

      document.body.removeChild(fileInput);
    });

    it('validates file size on upload', async () => {
      renderModal();

      // Create and attach a hidden file input for testing
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);

      // Create a mock file that's too large (over 5MB)
      const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
      Object.defineProperty(fileInput, 'files', { value: [largeFile], writable: false });
      fireEvent.change(fileInput);

      await waitFor(() => {
        expect(screen.getByText('File too large. Maximum size is 5MB.')).toBeInTheDocument();
      });

      document.body.removeChild(fileInput);
    });

    it('shows remove photo button when photo exists', () => {
      renderModal();

      expect(screen.getByText('🗑️ Remove Photo')).toBeInTheDocument();
    });

    it('removes photo when remove button is clicked', () => {
      renderModal();

      const removeButton = screen.getByText('🗑️ Remove Photo');
      fireEvent.click(removeButton);

      expect(screen.getByText('JD')).toBeInTheDocument(); // Should show initials
      expect(screen.getByText('No photo yet')).toBeInTheDocument();
    });
  });

  describe('Camera Functionality', () => {
    it('shows take photo button when camera is supported', () => {
      renderModal();

      expect(screen.getByText('📱 Take Photo')).toBeInTheDocument();
    });

    it('starts camera when take photo button is clicked', async () => {
      renderModal();

      const takePhotoButton = screen.getByText('📱 Take Photo');
      fireEvent.click(takePhotoButton);

      await waitFor(() => {
        expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
          video: { facingMode: 'user' },
          audio: false,
        });
      });
    });

    it('handles camera access errors', async () => {
      vi.mocked(navigator.mediaDevices.getUserMedia).mockRejectedValue(new Error('Permission denied'));

      renderModal();

      const takePhotoButton = screen.getByText('📱 Take Photo');
      fireEvent.click(takePhotoButton);

      await waitFor(() => {
        expect(screen.getByText('Camera access denied. Please allow camera permissions.')).toBeInTheDocument();
      });
    });
  });

  describe('Avatar Generation', () => {
    it('shows generate avatar button', () => {
      renderModal();

      expect(screen.getByText('🎨 Generate Avatar')).toBeInTheDocument();
    });

    it('calls generate avatar API when button is clicked', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ avatarUrl: 'https://example.com/generated-avatar.jpg' }),
      } as Response);

      renderModal();

      const generateButton = screen.getByText('🎨 Generate Avatar');
      fireEvent.click(generateButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/profile/generate-avatar', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer test-token',
          },
        });
      });
    });

    it('shows generating state when avatar generation is pending', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

      renderModal();

      const generateButton = screen.getByText('🎨 Generate Avatar');
      fireEvent.click(generateButton);

      await waitFor(() => {
        expect(screen.getByText('Generating...')).toBeInTheDocument();
      });
    });
  });

  describe('Builder Status', () => {
    it('shows builder status section for builders', () => {
      renderModal();

      expect(screen.getByText('Builder Status')).toBeInTheDocument();
      expect(screen.getByText("You're a recognized student leader and builder in the HIVE community.")).toBeInTheDocument();
    });

    it('hides builder status section for non-builders', () => {
      const nonBuilderProfile = { ...mockProfile, isBuilder: false };
      renderModal({ ...mockProps, profile: nonBuilderProfile });

      expect(screen.queryByText('Builder Status')).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('calls updateProfile when save button is clicked', async () => {
      const mockUseSession = await import('../../../hooks/use-session');
      const mockUpdateProfile = vi.fn().mockResolvedValue({});
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        updateProfile: mockUpdateProfile,
        uploadPhoto: vi.fn(),
        isUpdating: false,
        error: null,
        clearError: vi.fn(),
      });

      renderModal();

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateProfile).toHaveBeenCalledWith({
          fullName: 'John Doe',
          preferredName: 'Johnny',
          age: 21,
          academicYear: 'junior',
          major: 'Computer Science',
          housing: 'Smith Hall',
          pronouns: 'he/him',
          statusMessage: 'Building cool stuff!',
        });
      });
    });

    it('closes modal after successful save', async () => {
      const mockUseSession = await import('../../../hooks/use-session');
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        updateProfile: vi.fn().mockResolvedValue({}),
        uploadPhoto: vi.fn(),
        isUpdating: false,
        error: null,
        clearError: vi.fn(),
      });

      renderModal();

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockProps.onClose).toHaveBeenCalled();
      });
    });

    it('shows loading state while saving', async () => {
      const mockUseSession = await import('../../../hooks/use-session');
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        updateProfile: vi.fn(),
        uploadPhoto: vi.fn(),
        isUpdating: true,
        error: null,
        clearError: vi.fn(),
      });

      renderModal();

      // When isUpdating is true, button shows "Saving..." text
      expect(screen.getByText('Saving...')).toBeInTheDocument();
      // The button itself should be disabled
      const saveButton = screen.getByRole('button', { name: /saving/i });
      expect(saveButton).toBeDisabled();
    });

    it('handles save errors', async () => {
      const mockUseSession = await import('../../../hooks/use-session');
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        updateProfile: vi.fn().mockRejectedValue(new Error('Save failed')),
        uploadPhoto: vi.fn(),
        isUpdating: false,
        error: null,
        clearError: vi.fn(),
      });

      renderModal();

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText('Save failed')).toBeInTheDocument();
      });
    });

    it('filters out empty form fields before saving', async () => {
      const profileWithEmptyFields = {
        ...mockProfile,
        preferredName: '',
        pronouns: '',
        statusMessage: '',
      };

      const mockUseSession = await import('../../../hooks/use-session');
      const mockUpdateProfile = vi.fn().mockResolvedValue({});
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        updateProfile: mockUpdateProfile,
        uploadPhoto: vi.fn(),
        isUpdating: false,
        error: null,
        clearError: vi.fn(),
      });

      renderModal({ ...mockProps, profile: profileWithEmptyFields });

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateProfile).toHaveBeenCalledWith({
          fullName: 'John Doe',
          age: 21,
          academicYear: 'junior',
          major: 'Computer Science',
          housing: 'Smith Hall',
        });
      });
    });
  });

  describe('Local Storage Integration', () => {
    it('updates localStorage on successful profile update', async () => {
      const mockUseSession = await import('../../../hooks/use-session');
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        updateProfile: vi.fn().mockResolvedValue({}),
        uploadPhoto: vi.fn(),
        isUpdating: false,
        error: null,
        clearError: vi.fn(),
      });

      renderModal();

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalled();
      });
    });

    it('handles localStorage errors gracefully', async () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const mockUseSession = await import('../../../hooks/use-session');
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        updateProfile: vi.fn().mockResolvedValue({}),
        uploadPhoto: vi.fn(),
        isUpdating: false,
        error: null,
        clearError: vi.fn(),
      });

      renderModal();

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      // Should not throw error, just continue
      await waitFor(() => {
        expect(mockProps.onClose).toHaveBeenCalled();
      });
    });
  });

  describe('Accessibility', () => {
    it('provides proper form labels', () => {
      renderModal();

      expect(screen.getByText('Display Name')).toBeInTheDocument();
      expect(screen.getByText('Preferred Name (Optional)')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      expect(screen.getByText('Academic Year')).toBeInTheDocument();
      expect(screen.getByText('Major')).toBeInTheDocument();
      expect(screen.getByText('Dorm/Housing')).toBeInTheDocument();
      expect(screen.getByText('Pronouns (Optional)')).toBeInTheDocument();
      expect(screen.getByText('Bio/Status (Optional)')).toBeInTheDocument();
    });

    it('provides proper button roles', () => {
      renderModal();

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(5);
    });
  });

  describe('Mobile Responsiveness', () => {
    it('applies mobile-specific classes', () => {
      renderModal();

      // The modal should have responsive grid classes
      const modal = document.querySelector('.grid.grid-cols-1');
      expect(modal).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing profile data gracefully', () => {
      const emptyProfile = {
        fullName: '',
        academicYear: 'freshman' as const,
        major: '',
        housing: '',
      };

      renderModal({ ...mockProps, profile: emptyProfile });

      // Should not crash and should show empty form
      expect(screen.getByText('Your Profile')).toBeInTheDocument();
      expect(screen.getByText('U')).toBeInTheDocument(); // Default initials
    });

    it('converts age to number when saving', async () => {
      const mockUseSession = await import('../../../hooks/use-session');
      const mockUpdateProfile = vi.fn().mockResolvedValue({});
      vi.mocked(mockUseSession.useSession).mockReturnValue({
        updateProfile: mockUpdateProfile,
        uploadPhoto: vi.fn(),
        isUpdating: false,
        error: null,
        clearError: vi.fn(),
      });

      renderModal();

      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);

      await waitFor(() => {
        const callArgs = mockUpdateProfile.mock.calls[0][0];
        expect(typeof callArgs.age).toBe('number');
        expect(callArgs.age).toBe(21);
      });
    });
  });
});