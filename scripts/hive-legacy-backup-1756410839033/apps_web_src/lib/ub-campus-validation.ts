/**
 * University at Buffalo Campus Validation
 * 
 * Enforces UB-only constraints for vBeta launch
 * - Email domain validation (@buffalo.edu only)
 * - Campus context enforcement
 * - UB-specific data validation
 */

import { logger } from './logger';

// UB-specific configuration
export const UB_CONFIG = {
  CAMPUS_ID: 'ub-buffalo',
  DOMAIN: 'buffalo.edu',
  NAME: 'University at Buffalo',
  ACRONYM: 'UB',
  STATE: 'NY',
  CITY: 'Buffalo',
  ZIP_CODE: '14260'
} as const;

// Valid UB email patterns
const VALID_UB_EMAIL_PATTERNS = [
  /@buffalo\.edu$/i,           // Standard student/faculty email
  /@ubalt\.buffalo\.edu$/i,    // Alternative domain (if exists)
  /@mail\.buffalo\.edu$/i      // Mail subdomain (if exists)
];

// UB residence halls for validation
export const UB_RESIDENCE_HALLS = [
  'Ellicott Complex',
  'Governors Complex', 
  'South Campus Apartments',
  'Flint Loop',
  'Creekside Village',
  'Hadley Village',
  'Goodyear Complex',
  'Richmond Quad',
  'Wilkeson Quad'
] as const;

// UB academic departments
export const UB_ACADEMIC_DEPARTMENTS = [
  'School of Engineering and Applied Sciences',
  'School of Management', 
  'College of Arts and Sciences',
  'School of Medicine and Biomedical Sciences',
  'School of Law',
  'Graduate School of Education',
  'School of Nursing',
  'School of Pharmacy and Pharmaceutical Sciences',
  'School of Public Health and Health Professions',
  'School of Social Work',
  'Honors College'
] as const;

// UB majors/programs
export const UB_PROGRAMS = [
  'Computer Science',
  'Computer Engineering', 
  'Business Administration',
  'Engineering',
  'Biology',
  'Psychology',
  'Economics',
  'Political Science',
  'English',
  'Mathematics',
  'Pre-Med',
  'Pre-Law',
  'Architecture',
  'Nursing',
  'Pharmacy',
  'Medicine',
  'Other'
] as const;

/**
 * Validates if an email belongs to UB domain
 */
export function isValidUBEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const normalizedEmail = email.toLowerCase().trim();
  
  // Check against all valid UB email patterns
  return VALID_UB_EMAIL_PATTERNS.some(pattern => 
    pattern.test(normalizedEmail)
  );
}

/**
 * Validates UB residence hall
 */
export function isValidUBResidenceHall(hall: string): boolean {
  return UB_RESIDENCE_HALLS.some(validHall => 
    validHall.toLowerCase() === hall.toLowerCase()
  );
}

/**
 * Validates UB academic department
 */
export function isValidUBAcademicDepartment(department: string): boolean {
  return UB_ACADEMIC_DEPARTMENTS.some(validDept => 
    validDept.toLowerCase() === department.toLowerCase()
  );
}

/**
 * Validates UB academic program/major
 */
export function isValidUBProgram(program: string): boolean {
  return UB_PROGRAMS.some(validProgram => 
    validProgram.toLowerCase() === program.toLowerCase()
  );
}

/**
 * Extract department/school from email prefix
 */
export function extractDepartmentFromEmail(email: string): string | null {
  const match = email.match(/^([a-zA-Z]+)\d*@buffalo\.edu$/);
  if (!match) return null;
  
  const prefix = match[1].toLowerCase();
  
  // Map common email prefixes to departments
  const prefixMapping: Record<string, string> = {
    'cs': 'Computer Science',
    'eng': 'Engineering',
    'med': 'Medicine',
    'law': 'Law',
    'mgmt': 'Management',
    'nurs': 'Nursing',
    'pharm': 'Pharmacy'
  };
  
  return prefixMapping[prefix] || null;
}

/**
 * Validates that user data contains UB context
 */
export function validateUBUserData(userData: {
  email?: string;
  schoolId?: string;
  campusId?: string;
  major?: string;
  residenceHall?: string;
}): { 
  valid: boolean; 
  errors: string[]; 
  warnings: string[] 
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required: UB email
  if (!userData.email || !isValidUBEmail(userData.email)) {
    errors.push('Must use a valid @buffalo.edu email address');
  }

  // Required: UB campus context
  if (userData.schoolId && userData.schoolId !== 'buffalo') {
    errors.push('Only University at Buffalo students are allowed during vBeta');
  }

  if (userData.campusId && userData.campusId !== UB_CONFIG.CAMPUS_ID) {
    errors.push('Invalid campus identifier for UB');
  }

  // Optional but validated if provided
  if (userData.major && !isValidUBProgram(userData.major)) {
    warnings.push(`"${userData.major}" is not a recognized UB program`);
  }

  if (userData.residenceHall && !isValidUBResidenceHall(userData.residenceHall)) {
    warnings.push(`"${userData.residenceHall}" is not a recognized UB residence hall`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Enforces UB-only constraints on space creation
 */
export function validateUBSpaceData(spaceData: {
  name?: string;
  type?: string;
  tags?: string[];
  description?: string;
}): { 
  valid: boolean; 
  errors: string[] 
} {
  const errors: string[] = [];

  // Ensure space types are UB-appropriate
  const validSpaceTypes = [
    'studentorganizations',
    'university_organizations', 
    'greek_life',
    'campus_living',
    'hive_exclusive'
  ];

  if (spaceData.type && !validSpaceTypes.includes(spaceData.type)) {
    errors.push('Invalid space type for UB campus');
  }

  // Check for UB context in space names/descriptions
  if (spaceData.name) {
    const ubContextPattern = /(buffalo|ub\b|bulls)/i;
    if (!ubContextPattern.test(spaceData.name) && 
        spaceData.type === 'university_organizations') {
      // Warning: University organizations should reference UB context
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Middleware to enforce UB-only constraints
 */
export function enforceUBOnly(userData: {
  email?: string;
  schoolId?: string;
  campusId?: string;
}): { allowed: boolean; reason?: string } {
  // Check email domain
  if (!userData.email || !isValidUBEmail(userData.email)) {
    return {
      allowed: false,
      reason: 'Only @buffalo.edu email addresses are allowed during vBeta launch'
    };
  }

  // Check school/campus context
  if (userData.schoolId && userData.schoolId !== 'buffalo') {
    return {
      allowed: false,
      reason: 'Only University at Buffalo students can access HIVE during vBeta'
    };
  }

  if (userData.campusId && userData.campusId !== UB_CONFIG.CAMPUS_ID) {
    return {
      allowed: false,
      reason: 'Invalid campus access - UB students only'
    };
  }

  logger.info('UB access validation passed', { 
    email: userData.email?.replace(/@.*$/, '@***'),
    schoolId: userData.schoolId,
    campusId: userData.campusId
  });

  return { allowed: true };
}

/**
 * Get UB-specific onboarding data
 */
export function getUBOnboardingData() {
  return {
    campus: UB_CONFIG,
    residenceHalls: UB_RESIDENCE_HALLS,
    academicDepartments: UB_ACADEMIC_DEPARTMENTS,
    programs: UB_PROGRAMS,
    welcomeMessage: `Welcome to HIVE at ${UB_CONFIG.NAME}!`,
    campusSpecificSpaces: [
      {
        name: 'UB Computer Science',
        type: 'university_organizations',
        description: 'Connect with CS majors and share coding resources'
      },
      {
        name: 'UB Bulls Basketball',
        type: 'studentorganizations', 
        description: 'Official fan group for UB Bulls basketball'
      },
      {
        name: 'Ellicott Complex',
        type: 'campus_living',
        description: 'Residence hall community for Ellicott residents'
      }
    ]
  };
}

/**
 * Validate and normalize UB email
 */
export function normalizeUBEmail(email: string): string | null {
  if (!isValidUBEmail(email)) {
    return null;
  }
  
  return email.toLowerCase().trim();
}

/**
 * Check if current environment should enforce UB constraints
 */
export function shouldEnforceUBConstraints(): boolean {
  // Always enforce in production
  if (process.env.NODE_ENV === 'production') {
    return true;
  }
  
  // Check for explicit override in development
  if (process.env.SKIP_UB_VALIDATION === 'true') {
    return false;
  }
  
  // Default: enforce in all environments for vBeta
  return true;
}