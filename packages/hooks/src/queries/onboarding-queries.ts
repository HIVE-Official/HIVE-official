import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './query-client';

// Types
export interface OnboardingData {
  fullName: string;
  userType?: 'student' | 'alumni' | 'faculty';
  firstName?: string;
  lastName?: string;
  facultyEmail?: string;
  majors: string[];
  academicLevel?: string;
  graduationYear: number;
  handle: string;
  profilePhoto?: string;
  builderRequestSpaces?: string[];
  hasConsented: boolean;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  interests?: string[];
}

export interface HandleAvailabilityResult {
  available: boolean;
  suggestions?: string[];
}

// API client functions
async function checkHandleAvailability(handle: string): Promise<HandleAvailabilityResult> {
  const response = await fetch(`/api/onboarding/check-handle?handle=${encodeURIComponent(handle)}`);
  if (!response.ok) {
    throw new Error('Failed to check handle availability');
  }
  return await response.json();
}

async function submitOnboardingData(data: Partial<OnboardingData>): Promise<{ success: boolean; userId?: string }> {
  const response = await fetch('/api/onboarding/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit onboarding data');
  }
  
  return await response.json();
}

async function uploadProfilePhoto(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('photo', file);
  
  const response = await fetch('/api/onboarding/upload-photo', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload photo');
  }
  
  return await response.json();
}

// React Query hooks
export function useHandleAvailability(handle: string) {
  return useQuery({
    queryKey: queryKeys.handleAvailability(handle),
    queryFn: () => checkHandleAvailability(handle),
    enabled: handle.length >= 3, // Only check when handle meets minimum length
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
    retry: 1, // Only retry once on failure
  });
}

export function useSubmitOnboarding() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: submitOnboardingData,
    onSuccess: () => {
      // Invalidate and refetch user profile data
      queryClient.invalidateQueries({ queryKey: queryKeys.profile('me') });
      queryClient.invalidateQueries({ queryKey: queryKeys.userAnalytics('me') });
    },
  });
}

export function useUploadProfilePhoto() {
  return useMutation({
    mutationFn: uploadProfilePhoto,
  });
}

// Query keys (extend the existing query-client.ts)
declare module './query-client' {
  interface QueryKeys {
    handleAvailability: (handle: string) => readonly ['hive', 'onboarding', 'handle-availability', string];
  }
}

export const onboardingQueryKeys = {
  handleAvailability: (handle: string) => ['hive', 'onboarding', 'handle-availability', handle] as const,
};