import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';

interface ProfileCompletionCheck {
  isComplete: boolean;
  completionPercentage: number;
  missingFields: string[];
  completedFields: string[];
  requiredFields: string[];
  optionalFields: string[];
  nextSteps: string[];
}

// Required fields for basic profile completion
const REQUIRED_FIELDS = [
  'fullName',
  'handle', 
  'email',
  'major',
  'schoolId',
  'consentGiven'
];

// Optional fields that improve profile completeness
const OPTIONAL_FIELDS = [
  'avatarUrl',
  'bio',
  'graduationYear',
  'isPublic',
  'builderOptIn'
];

/**
 * Check profile completion status
 * GET /api/profile/completion
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Handle development mode tokens
    if (token.startsWith('dev_token_')) {
      const userId = token.replace('dev_token_', '');
      
      const mockCompletion: ProfileCompletionCheck = {
        isComplete: true,
        completionPercentage: 100,
        missingFields: [],
        completedFields: [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS],
        requiredFields: REQUIRED_FIELDS,
        optionalFields: OPTIONAL_FIELDS,
        nextSteps: ['Your profile is complete!']
      };

      return NextResponse.json({
        success: true,
        completion: mockCompletion,
        developmentMode: true,
      });
    }
    
    // Verify the token
    const auth = getAuth();
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (authError) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;

    // Get user document from Firestore
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    
    // Check completion status
    const completion = checkProfileCompletion(userData, decodedToken.email);

    return NextResponse.json({
      success: true,
      completion,
    });

  } catch (error) {
    console.error('Profile completion check error:', error);
    return NextResponse.json(
      { error: 'Failed to check profile completion' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to check profile completion
 */
function checkProfileCompletion(userData: any, userEmail?: string): ProfileCompletionCheck {
  const completedFields: string[] = [];
  const missingFields: string[] = [];
  
  // Check required fields
  REQUIRED_FIELDS.forEach(field => {
    let value: any;
    
    // Special handling for email - can come from auth token
    if (field === 'email') {
      value = userData?.email || userEmail;
    } else {
      value = userData?.[field];
    }
    
    // Check if field has a meaningful value
    const isCompleted = checkFieldCompletion(field, value);
    
    if (isCompleted) {
      completedFields.push(field);
    } else {
      missingFields.push(field);
    }
  });

  // Check optional fields
  const completedOptionalFields: string[] = [];
  OPTIONAL_FIELDS.forEach(field => {
    const value = userData?.[field];
    const isCompleted = checkFieldCompletion(field, value);
    
    if (isCompleted) {
      completedFields.push(field);
      completedOptionalFields.push(field);
    }
  });

  // Calculate completion percentage
  const totalFields = REQUIRED_FIELDS.length + OPTIONAL_FIELDS.length;
  const completionPercentage = Math.round((completedFields.length / totalFields) * 100);
  
  // Profile is complete if all required fields are filled
  const isComplete = missingFields.length === 0;
  
  // Generate next steps
  const nextSteps = generateNextSteps(missingFields, completedOptionalFields);

  return {
    isComplete,
    completionPercentage,
    missingFields,
    completedFields,
    requiredFields: REQUIRED_FIELDS,
    optionalFields: OPTIONAL_FIELDS,
    nextSteps,
  };
}

/**
 * Check if a specific field is completed
 */
function checkFieldCompletion(field: string, value: any): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  
  // String fields
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  
  // Boolean fields (considered complete if explicitly set)
  if (typeof value === 'boolean') {
    return true; // Both true and false are valid completion states
  }
  
  // Number fields
  if (typeof value === 'number') {
    return !isNaN(value) && value > 0;
  }
  
  return false;
}

/**
 * Generate helpful next steps for profile completion
 */
function generateNextSteps(missingFields: string[], completedOptionalFields: string[]): string[] {
  const steps: string[] = [];
  
  if (missingFields.length === 0) {
    steps.push('Your profile is complete!');
    
    // Suggest additional improvements
    if (!completedOptionalFields.includes('avatarUrl')) {
      steps.push('Consider adding a profile photo to personalize your account');
    }
    if (!completedOptionalFields.includes('bio')) {
      steps.push('Add a bio to tell others about yourself');
    }
    if (!completedOptionalFields.includes('builderOptIn')) {
      steps.push('Consider joining the HIVE Builder Program');
    }
    
    return steps;
  }

  // Prioritize missing required fields
  const fieldLabels: Record<string, string> = {
    fullName: 'Add your full name',
    handle: 'Choose a unique handle',
    email: 'Verify your email address',
    major: 'Select your major',
    schoolId: 'Confirm your school',
    consentGiven: 'Accept the terms and privacy policy',
    avatarUrl: 'Upload a profile photo',
    bio: 'Write a brief bio',
    graduationYear: 'Add your graduation year',
    isPublic: 'Set your profile visibility',
    builderOptIn: 'Consider joining the Builder Program'
  };

  // Add steps for missing required fields first
  missingFields.forEach(field => {
    if (fieldLabels[field]) {
      steps.push(fieldLabels[field]);
    }
  });

  // Add encouragement
  if (missingFields.length <= 2) {
    steps.push('You\'re almost done! Just a few more steps to complete your profile.');
  } else {
    steps.push('Complete these steps to unlock all HIVE features.');
  }

  return steps;
}