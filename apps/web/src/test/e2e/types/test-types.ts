// Global window extensions for test mocking
declare global {
  interface Window {
    __mockFirebaseUser?: any;
    __mockHiveUser?: any;
    __mockFirebaseAuth?: any;
    __testSetup?: {
      mockMagicLinks: Map<string, any>;
      mockUsers: Map<string, any>;
      mockHandles: Set<string>;
    };
    firebase?: {
      auth: () => any;
    };
  }
}

// Mock user interface for testing
export interface MockUser {
  id: string;
  email: string;
  fullName?: string;
  handle?: string;
  major?: string;
  majors?: string[];
  avatarUrl?: string;
  schoolId?: string;
  onboardingCompleted: boolean;
}

// Test configuration
export interface TestConfig {
  baseURL: string;
  timeout: number;
  slowMotion?: number;
  mockApis: boolean;
}

export {}; // Make this file a module