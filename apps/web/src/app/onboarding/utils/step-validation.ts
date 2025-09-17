import type { OnboardingProfile } from '../types';

export const validateStep = (stepIndex: number, profile: OnboardingProfile): boolean => {
  switch (stepIndex) {
    case 0: return true; // Welcome step
    
    case 1: // User Type step
      return profile.userType && profile.userType !== '';
    
    case 2: // Identity step
      return profile.firstName.length >= 2 && 
             profile.lastName.length >= 2 && 
             profile.handle.length >= 3;
    
    case 3: // Academic step - different validation based on user type
      if (profile.userType === 'student') {
        return !!(profile.graduationYear && profile.major);
      } else if (profile.userType === 'faculty') {
        return !!(profile.department && profile.spaceRequest && profile.spaceRequest.length >= 10);
      } else if (profile.userType === 'alumni') {
        return !!(profile.graduationYear && profile.major);
      }
      return false;
    
    case 4: // Campus Life step
      return !!(profile.livingArrangement && profile.campusGoals.length > 0);
    
    case 5: // Interests step
      return profile.interests.length >= 3;
    
    case 6: // Spaces step
      return profile.selectedSpaces.length >= 1;
    
    case 7: // Completion step
      return profile.consentGiven;
    
    default:
      return false;
  }
};

export const getStepValidationMessage = (stepIndex: number, profile: OnboardingProfile): string | null => {
  if (validateStep(stepIndex, profile)) return null;
  
  switch (stepIndex) {
    case 1:
      return 'Please select your role';
    case 2:
      return 'Please provide your name and create a handle';
    case 3:
      if (profile.userType === 'student' || profile.userType === 'alumni') {
        return 'Please complete your academic information';
      } else if (profile.userType === 'faculty') {
        return 'Please provide your department and space request details';
      }
      return 'Please complete this step';
    case 4:
      return 'Please share your campus life preferences';
    case 5:
      return 'Please select at least 3 interests';
    case 6:
      return 'Please join at least 1 space to get started';
    case 7:
      return 'Please accept the terms and privacy policy';
    default:
      return 'Please complete this step';
  }
};