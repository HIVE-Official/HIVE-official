import { create } from "zustand";
import { logger } from "@hive/core";

// Unified onboarding data interface that matches the main wizard
export interface HiveOnboardingData {
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

interface OnboardingStore {
  // Current step in the wizard
  currentStep: number;
  // Onboarding data
  data: Partial<HiveOnboardingData>;
  // State management
  setCurrentStep: (step: number) => void;
  updateData: (newData: Partial<HiveOnboardingData>) => void;
  reset: () => void;
  // Validation helpers
  canGoNext: () => boolean;
  canGoBack: () => boolean;
  // Legacy compatibility methods
  setStudentLeader: (isLeader: boolean) => void;
  addSpaceClaim: (claim: any) => void;
  setVerificationLevel: (
    level: "verified" | "verified+" | "faculty" | "alumni"
  ) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  // Initialize with default values
  currentStep: 0,
  data: {
    fullName: "",
    userType: undefined,
    firstName: "",
    lastName: "",
    facultyEmail: "",
    majors: [],
    academicLevel: "",
    graduationYear: new Date().getFullYear() + 4,
    handle: "",
    profilePhoto: "",
    builderRequestSpaces: [],
    interests: [],
    hasConsented: false,
    acceptedTerms: false,
    acceptedPrivacy: false,
  },

  // Step management
  setCurrentStep: (step: number) =>
    set(() => {
      logger.info(`Onboarding step changed to: ${step}`);
      return { currentStep: step };
    }),

  // Data management
  updateData: (newData) =>
    set((state: any) => {
      const updatedData = { ...state.data, ...newData };
      logger.info("Updating onboarding data:", newData);
      return { data: updatedData };
    }),

  reset: () => {
    logger.info("Resetting onboarding data");
    set({
      currentStep: 0,
      data: {
        fullName: "",
        userType: undefined,
        firstName: "",
        lastName: "",
        facultyEmail: "",
        majors: [],
        academicLevel: "",
        graduationYear: new Date().getFullYear() + 4,
        handle: "",
        profilePhoto: "",
        builderRequestSpaces: [],
        interests: [],
        hasConsented: false,
        acceptedTerms: false,
        acceptedPrivacy: false,
      }
    });
  },

  // Validation helpers
  canGoNext: () => {
    const state = get();
    const { currentStep, data } = state;
    const currentYear = new Date().getFullYear();
    
    // Special validation for faculty users
    if (data.userType === 'faculty') {
      switch (currentStep) {
        case 0: // Welcome
          return true;
        case 1: // User Type
          return data.userType !== undefined;
        case 2: // Faculty Info
          return !!(data.firstName && data.firstName.trim().length >= 2 && 
                   data.lastName && data.lastName.trim().length >= 2);
        case 6: // Builder
          return !!(data.builderRequestSpaces && data.builderRequestSpaces.length > 0);
        case 7: // Legal
          return !!(data.acceptedTerms && data.acceptedPrivacy);
        default:
          return true;
      }
    }
    
    // Standard validation for students
    switch (currentStep) {
      case 0: // Welcome
        return true;
      case 1: // User Type
        return data.userType !== undefined;
      case 2: // Name
        return !!(data.firstName && data.firstName.trim().length >= 2 && 
                 data.lastName && data.lastName.trim().length >= 2);
      case 3: // Academics
        return !!(data.majors && data.majors.length > 0 && 
                 data.graduationYear >= currentYear && 
                 data.graduationYear <= currentYear + 10);
      case 4: // Handle
        return !!(data.handle && data.handle.length >= 3 && 
                 data.handle.length <= 20 &&
                 /^[a-zA-Z0-9]/.test(data.handle) &&
                 /[a-zA-Z0-9]$/.test(data.handle) &&
                 /^[a-zA-Z0-9._-]+$/.test(data.handle) &&
                 !/[._-]{2,}/.test(data.handle));
      case 5: // Photo
        return true; // Optional
      case 6: // Interests
        return true; // Optional
      case 7: // Builder
        return true; // Optional
      case 8: // Legal
        return !!(data.acceptedTerms && data.acceptedPrivacy);
      default:
        return false;
    }
  },

  canGoBack: () => {
    const state = get();
    return state.currentStep > 0;
  },

  // Legacy compatibility methods (for existing components)
  setStudentLeader: (isLeader) =>
    set((state: any) => {
      const updatedData = {
        ...state.data,
        builderRequestSpaces: isLeader ? ['student-government'] : [],
      };
      logger.info(`Set student leader status: ${isLeader}`);
      return { data: updatedData };
    }),

  addSpaceClaim: (claim) =>
    set((state: any) => {
      const currentSpaces = state.data?.builderRequestSpaces || [];
      const updatedData = {
        ...state.data,
        builderRequestSpaces: [...currentSpaces, claim.spaceId || claim],
      };
      logger.info("Added space claim:", claim);
      return { data: updatedData };
    }),

  setVerificationLevel: (level: any) =>
    set((state: any) => {
      // Map verification level to academic level for compatibility
      const levelMapping = {
        'verified': 'undergraduate',
        'verified+': 'graduate',
        'faculty': 'faculty',
        'alumni': 'alumni'
      };
      
      const updatedData = {
        ...state.data,
        userType: level === 'faculty' ? 'faculty' as const : 
                 level === 'alumni' ? 'alumni' as const : 'student' as const,
        academicLevel: levelMapping[level] || 'undergraduate',
      };
      logger.info(`Set verification level: ${level}`);
      return { data: updatedData };
    }),
}));
