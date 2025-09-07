/**
 * Development bypass configuration
 * ONLY active when NEXT_PUBLIC_DEV_BYPASS=true in development
 */

export const MOCK_USER = {
  uid: 'dev-user-001',
  email: 'jwhrineh@buffalo.edu',
  emailVerified: true,
  displayName: 'Dev User',
  photoURL: null,
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString(),
  },
};

export const MOCK_PROFILE = {
  uid: 'dev-user-001',
  email: 'jwhrineh@buffalo.edu',
  firstName: 'John',
  lastName: 'Developer',
  handle: 'jwhrineh',
  role: 'student',
  year: 2025,
  major: 'Computer Science',
  school: {
    id: 'ub-buffalo',
    name: 'University at Buffalo',
    email: 'buffalo.edu'
  },
  interests: ['coding', 'hive', 'development'],
  bio: 'Development account for testing HIVE',
  profilePictureUrl: '',
  campusId: 'ub-buffalo',
  onboardingCompleted: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_SESSION = {
  user: MOCK_USER,
  profile: MOCK_PROFILE,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
};