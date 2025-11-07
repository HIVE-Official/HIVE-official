/**
 * Auto Space Creation Service
 *
 * Automatically creates and joins users to relevant spaces based on
 * their academic information (year, major, school) during onboarding.
 */

// Define OnboardingData locally since the package export doesn't exist
export interface OnboardingData {
  schoolId: string;
  graduationYear: number;
  major: string;
  year: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'other';
  userType: 'student' | 'faculty' | 'staff' | 'alumni';
  housing?: string; // Optional housing field
  [key: string]: any;
}

export interface AutoSpaceConfig {
  schoolId: string;
  graduationYear: number;
  major: string;
  year: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'other';
  userType: 'student' | 'faculty' | 'staff' | 'alumni';
  housing?: string; // Optional housing field
}

export interface SpaceTemplate {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'social' | 'career' | 'general';
  category: string;
  autoJoin: boolean;
  isRecommended: boolean;
  membershipType: 'open' | 'invite-only' | 'application';
}

/**
 * Generate space templates based on user's academic information
 */
export function generateAutoSpaces(config: AutoSpaceConfig): SpaceTemplate[] {
  const { schoolId, graduationYear, major, year, userType, housing } = config;
  const spaces: SpaceTemplate[] = [];

  // 1. Class Year Space (Social/Networking)
  if (userType === 'student' && graduationYear) {
    spaces.push({
      id: `${schoolId}-class-${graduationYear}`,
      name: `Class of ${graduationYear}`,
      description: `Connect with your graduating class! Share experiences, coordinate events, and build lasting connections with fellow ${graduationYear} graduates.`,
      type: 'social',
      category: 'Class Year',
      autoJoin: true,
      isRecommended: true,
      membershipType: 'open'
    });
  }

  // 2. Major/Department Space (Academic)
  if (major && major !== 'Other') {
    const majorKey = major.toLowerCase().replace(/\s+/g, '-');
    spaces.push({
      id: `${schoolId}-${majorKey}`,
      name: `${major} Students`,
      description: `The hub for ${major} students to share resources, discuss coursework, form study groups, and connect with peers in your field.`,
      type: 'academic',
      category: 'Major',
      autoJoin: true,
      isRecommended: true,
      membershipType: 'open'
    });

    // 3. Major + Year Combination (Study Groups)
    if (userType === 'student' && year !== 'other') {
      const yearLabel = year.charAt(0).toUpperCase() + year.slice(1);
      spaces.push({
        id: `${schoolId}-${majorKey}-${year}`,
        name: `${yearLabel} ${major}`,
        description: `Study groups and peer support for ${yearLabel} ${major} students. Perfect for course-specific discussions and collaborative learning.`,
        type: 'academic',
        category: 'Study Groups',
        autoJoin: false,
        isRecommended: true,
        membershipType: 'open'
      });
    }
  }

  // 4. School-wide New Student Space
  if (userType === 'student' && (year === 'freshman' || year === 'other')) {
    spaces.push({
      id: `${schoolId}-new-students`,
      name: 'New Student Welcome',
      description: 'Welcome to campus! Connect with other new students, get orientation info, and find your community.',
      type: 'social',
      category: 'Campus Life',
      autoJoin: true,
      isRecommended: true,
      membershipType: 'open'
    });
  }

  // 5. Housing/Dorm-based Spaces (UB-specific for launch)
  if (userType === 'student' && housing) {
    const housingKey = housing.toLowerCase().replace(/\s+/g, '-');

    // Map UB housing areas to spaces
    const housingMappings: Record<string, { name: string; description: string }> = {
      'ellicott': {
        name: 'Ellicott Complex',
        description: 'Connect with fellow Ellicott residents! Share dining tips, coordinate study sessions, and build your dorm community.'
      },
      'governors': {
        name: 'Governors Complex',
        description: 'The Governors community hub! Meet neighbors, plan activities, and share campus life experiences.'
      },
      'south-campus': {
        name: 'South Campus',
        description: 'South Campus residents unite! Connect with neighbors, share transportation tips, and build community.'
      },
      'creekside': {
        name: 'Creekside Village',
        description: 'Creekside Village community! Perfect for apartment-style living discussions and resident meetups.'
      },
      'university-apartments': {
        name: 'University Apartments',
        description: 'University Apartments network! Connect with fellow apartment residents and share living tips.'
      },
      'off-campus': {
        name: 'Off-Campus Housing',
        description: 'Off-campus students connect here! Share housing tips, coordinate commutes, and stay connected to campus.'
      }
    };

    // Check if housing matches a known area
    const matchedHousing = Object.entries(housingMappings).find(([key, _]) =>
      housingKey.includes(key) || key.includes(housingKey)
    );

    if (matchedHousing) {
      const [key, info] = matchedHousing;
      spaces.push({
        id: `${schoolId}-housing-${key}`,
        name: info.name,
        description: info.description,
        type: 'social',
        category: 'Housing',
        autoJoin: true, // Auto-join students to their housing space
        isRecommended: true,
        membershipType: 'open'
      });
    } else if (housing.trim()) {
      // Generic housing space for unrecognized housing
      spaces.push({
        id: `${schoolId}-housing-${housingKey}`,
        name: `${housing} Residents`,
        description: `Connect with fellow ${housing} residents and build your living community!`,
        type: 'social',
        category: 'Housing',
        autoJoin: true,
        isRecommended: true,
        membershipType: 'open'
      });
    }
  }

  // 6. Graduate Student Space
  if (userType === 'student' && year === 'graduate') {
    spaces.push({
      id: `${schoolId}-graduate-students`,
      name: 'Graduate Students',
      description: 'Graduate student community for research collaboration, academic support, and professional development.',
      type: 'academic',
      category: 'Graduate Studies',
      autoJoin: true,
      isRecommended: true,
      membershipType: 'open'
    });
  }

  // 7. Faculty Spaces
  if (userType === 'faculty') {
    spaces.push({
      id: `${schoolId}-faculty`,
      name: 'Faculty Community',
      description: 'Faculty collaboration space for sharing resources, coordinating research, and campus discussions.',
      type: 'general',
      category: 'Faculty',
      autoJoin: false,
      isRecommended: true,
      membershipType: 'invite-only'
    });

    if (major && major !== 'Other') {
      const majorKey = major.toLowerCase().replace(/\s+/g, '-');
      spaces.push({
        id: `${schoolId}-faculty-${majorKey}`,
        name: `${major} Faculty`,
        description: `${major} department faculty space for collaboration, curriculum discussions, and student support coordination.`,
        type: 'academic',
        category: 'Department',
        autoJoin: false,
        isRecommended: true,
        membershipType: 'invite-only'
      });
    }
  }

  // 8. Career Development Spaces
  const careerYear = graduationYear ? graduationYear - 1 : new Date().getFullYear();
  if (userType === 'student' && (year === 'junior' || year === 'senior')) {
    spaces.push({
      id: `${schoolId}-career-${careerYear}`,
      name: `${careerYear} Job Search`,
      description: 'Career preparation, job search support, and networking for students entering the job market.',
      type: 'career',
      category: 'Career Development',
      autoJoin: false,
      isRecommended: true,
      membershipType: 'open'
    });
  }

  return spaces;
}

/**
 * Create spaces via API and auto-join user
 */
export async function createAndJoinSpaces(
  onboardingData: OnboardingData,
  sessionToken: string
): Promise<{ created: string[], joined: string[], errors: string[], recommended: any[] }> {
  const config: AutoSpaceConfig = {
    schoolId: onboardingData.schoolId,
    graduationYear: onboardingData.graduationYear,
    major: onboardingData.major,
    year: onboardingData.year,
    userType: onboardingData.userType,
    housing: onboardingData.housing // Pass housing for space determination
  };

  try {
    const { secureApiFetch } = await import('./secure-auth-utils');
    const response = await secureApiFetch('/api/spaces/auto-create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create auto-spaces');
    }

    const data = await response.json();
    return data.results;

  } catch (error) {
    console.error('Error in createAndJoinSpaces:', error);
    return {
      created: [],
      joined: [],
      errors: [error instanceof Error ? error.message : 'Unknown error'],
      recommended: []
    };
  }
}

/**
 * Get recommended spaces for user (non-auto-join)
 */
export async function getRecommendedSpaces(
  config: AutoSpaceConfig,
  sessionToken: string
): Promise<SpaceTemplate[]> {
  const allSpaces = generateAutoSpaces(config);
  const recommended = allSpaces.filter(space => space.isRecommended && !space.autoJoin);

  // Filter out spaces user is already a member of
  const filteredSpaces = [];
  for (const space of recommended) {
    try {
      const { secureApiFetch } = await import('./secure-auth-utils');
      const membershipResponse = await secureApiFetch(`/api/spaces/${space.id}/membership`);
      
      if (!membershipResponse.ok) {
        // Not a member, include in recommendations
        filteredSpaces.push(space);
      }
    } catch (error) {
      // Include if we can't determine membership
      filteredSpaces.push(space);
    }
  }

  return filteredSpaces;
}
