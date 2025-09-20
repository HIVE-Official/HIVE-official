import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

/**
 * Space Data Seeding API for University Pre-population
 * Creates realistic campus spaces across all 5 space types to reach 360+ total spaces
 * POST /api/spaces/seed
 */

interface SpaceTemplate {
  name: string;
  description: string;
  tags: string[];
  memberCount?: number;
  isPrivate?: boolean;
}

// Space templates for each type
const SPACE_TEMPLATES = {
  campus_living: [
    {
      name: "Richmond Quad",
      description: "Connect with residents of Richmond Quad for events, study groups, and community building.",
      tags: ["Social", "Community", "Housing"],
      memberCount: 45
    },
    {
      name: "Ellicott Complex",
      description: "The largest residential complex on campus with diverse programming and activities.",
      tags: ["Large Community", "Events", "Housing"],
      memberCount: 180
    },
    {
      name: "South Campus Apartments",
      description: "Upper-class apartment-style living with independent community programs.",
      tags: ["Apartments", "Upper-class", "Independent"],
      memberCount: 75
    },
    {
      name: "Governors Complex",
      description: "Suite-style residence halls fostering close-knit floor communities.",
      tags: ["Suites", "Community", "Housing"],
      memberCount: 95
    },
    {
      name: "Flickinger Court",
      description: "Graduate and upper-class housing with professional development focus.",
      tags: ["Graduate", "Professional", "Upper-class"],
      memberCount: 35
    }
  ],
  
  fraternity_and_sorority: [
    {
      name: "Alpha Phi Alpha",
      description: "A historically Black Greek-letter organization focused on scholarship and service.",
      tags: ["NPHC", "Service", "Brotherhood"],
      memberCount: 25
    },
    {
      name: "Kappa Alpha Psi",
      description: "Achievement in every field of human endeavor through brotherhood and scholarship.",
      tags: ["NPHC", "Achievement", "Brotherhood"],
      memberCount: 30
    },
    {
      name: "Delta Sigma Theta",
      description: "A private, not-for-profit organization focused on sisterhood and community service.",
      tags: ["NPHC", "Sisterhood", "Service"],
      memberCount: 35
    },
    {
      name: "Alpha Kappa Alpha",
      description: "Service to all mankind through scholarship, fellowship, and sisterhood.",
      tags: ["NPHC", "Service", "Sisterhood"],
      memberCount: 40
    },
    {
      name: "Phi Beta Sigma",
      description: "Brotherhood, scholarship, and service to the university and community.",
      tags: ["NPHC", "Brotherhood", "Service"],
      memberCount: 20
    }
  ],
  
  hive_exclusive: [
    {
      name: "UB Innovators",
      description: "Elite community of student entrepreneurs and tech innovators building the future.",
      tags: ["Innovation", "Tech", "Entrepreneurship"],
      memberCount: 15,
      isPrivate: true
    },
    {
      name: "Research Fellows",
      description: "Undergraduate researchers working on cutting-edge projects with faculty mentors.",
      tags: ["Research", "Faculty", "Academic"],
      memberCount: 25,
      isPrivate: true
    },
    {
      name: "Leadership Council",
      description: "Student leaders from across campus working on university-wide initiatives.",
      tags: ["Leadership", "University", "Initiative"],
      memberCount: 12,
      isPrivate: true
    },
    {
      name: "Dean's Scholars",
      description: "Top academic performers with exclusive networking and development opportunities.",
      tags: ["Academic", "Networking", "Excellence"],
      memberCount: 30,
      isPrivate: true
    },
    {
      name: "Innovation Lab",
      description: "Exclusive maker space access for advanced prototyping and product development.",
      tags: ["Making", "Prototyping", "Innovation"],
      memberCount: 18,
      isPrivate: true
    }
  ],
  
  student_organizations: [
    {
      name: "Pre-Med Society",
      description: "Support and resources for students pursuing careers in medicine and healthcare.",
      tags: ["Pre-Med", "Healthcare", "Academic"],
      memberCount: 120
    },
    {
      name: "Computer Science Association",
      description: "Programming competitions, tech talks, and networking for CS students.",
      tags: ["Computer Science", "Programming", "Tech"],
      memberCount: 200
    },
    {
      name: "Business Student Association",
      description: "Professional development and networking for business school students.",
      tags: ["Business", "Professional", "Networking"],
      memberCount: 150
    },
    {
      name: "Environmental Action",
      description: "Campus sustainability initiatives and environmental awareness campaigns.",
      tags: ["Environment", "Sustainability", "Action"],
      memberCount: 80
    },
    {
      name: "International Student Organization",
      description: "Cultural exchange and support for international students at UB.",
      tags: ["International", "Culture", "Support"],
      memberCount: 95
    }
  ],
  
  university_organizations: [
    {
      name: "Student Government",
      description: "Official student representation and advocacy for university policies.",
      tags: ["Government", "Advocacy", "Official"],
      memberCount: 45
    },
    {
      name: "Campus Programming Board",
      description: "Organizing major campus events, concerts, and entertainment programming.",
      tags: ["Events", "Programming", "Entertainment"],
      memberCount: 35
    },
    {
      name: "Orientation Leaders",
      description: "Welcoming new students and helping them transition to university life.",
      tags: ["Orientation", "Welcome", "Transition"],
      memberCount: 60
    },
    {
      name: "Campus Safety Committee",
      description: "Student input on campus safety policies and emergency preparedness.",
      tags: ["Safety", "Policy", "Emergency"],
      memberCount: 25
    },
    {
      name: "Academic Standards Board",
      description: "Student representation in academic policy and curriculum development.",
      tags: ["Academic", "Policy", "Curriculum"],
      memberCount: 20
    }
  ],
  
  cohort: [
    {
      name: "Computer Science",
      description: "Connect with all Computer Science students across graduation years for academic support and networking.",
      tags: ["Major", "Computer Science", "Academic"],
      memberCount: 245
    },
    {
      name: "Class of '25",
      description: "Connect with your graduating class across all majors for events and networking.",
      tags: ["Graduation Year", "Class", "Networking"],
      memberCount: 1250
    },
    {
      name: "CS '25",
      description: "Computer Science students graduating in 2025 - your core academic cohort.",
      tags: ["Major", "Year", "CS"],
      memberCount: 35
    },
    {
      name: "Business Administration",
      description: "Business Administration students connecting for internships, projects, and career networking.",
      tags: ["Major", "Business", "Professional"],
      memberCount: 180
    },
    {
      name: "Class of '26",
      description: "Students graduating in 2026 - connect with your class for academic and social activities.",
      tags: ["Graduation Year", "Class", "Activities"],
      memberCount: 1100
    }
  ]
};

// Additional space name generators for variety
const SPACE_GENERATORS = {
  campus_living: {
    prefixes: ["North", "South", "East", "West", "Central", "Upper", "Lower"],
    bases: ["Hall", "Commons", "Towers", "Village", "Court", "Plaza", "Gardens"],
    suffixes: ["Community", "Residents", "Living", "Complex"]
  },
  
  student_organizations: {
    academic: ["Engineering Society", "Physics Club", "Chemistry Association", "Mathematics Society", "Biology Students"],
    cultural: ["Latino Student Union", "African Student Association", "Asian Cultural Society", "European Heritage Club"],
    hobby: ["Photography Club", "Gaming Society", "Outdoors Club", "Art Collective", "Music Ensemble"],
    professional: ["Marketing Association", "Finance Society", "Accounting Club", "HR Students", "Consulting Group"]
  },
  
  university_organizations: {
    services: ["Campus Tours", "Academic Support", "Career Services", "Library Associates", "IT Student Help"],
    committees: ["Sustainability Committee", "Diversity Council", "Athletics Board", "Publications Committee"],
    programs: ["Peer Mentoring", "Study Abroad Ambassadors", "Research Showcase", "Honor Society"]
  },
  
  cohort: {
    majors: ["Engineering", "Psychology", "Biology", "Chemistry", "English", "Mathematics", "History", "Political Science", "Economics", "Art"],
    years: ["'24", "'25", "'26", "'27", "'28"],
    combined: ["Bio '25", "Eng '26", "Psych '24", "Math '27", "Art '25"]
  }
};

/**
 * Generate additional spaces for a given type
 */
function generateSpaces(spaceType: string, currentCount: number, targetCount: number): SpaceTemplate[] {
  const additionalSpaces: SpaceTemplate[] = [];
  const needed = Math.max(0, targetCount - currentCount);
  
  if (needed === 0) return [];
  
  const templates = SPACE_TEMPLATES[spaceType as keyof typeof SPACE_TEMPLATES] || [];
  
  // Start with base templates
  for (let i = 0; i < Math.min(needed, templates.length); i++) {
    additionalSpaces.push({ ...templates[i] });
  }
  
  // Generate additional spaces if needed
  let generated = templates.length;
  while (generated < needed) {
    const space = generateSpaceVariation(spaceType, generated);
    if (space) {
      additionalSpaces.push(space);
    }
    generated++;
  }
  
  return additionalSpaces.slice(0, needed);
}

/**
 * Generate space variations for additional spaces
 */
function generateSpaceVariation(spaceType: string, index: number): SpaceTemplate | null {
  const generators = SPACE_GENERATORS[spaceType as keyof typeof SPACE_GENERATORS];
  
  switch (spaceType) {
    case 'campus_living': {
      const housing = generators as typeof SPACE_GENERATORS.campus_living;
      const prefix = housing.prefixes[index % housing.prefixes.length];
      const base = housing.bases[Math.floor(index / housing.prefixes.length) % housing.bases.length];
      const suffix = housing.suffixes[index % housing.suffixes.length];
      
      return {
        name: `${prefix} ${base}`,
        description: `${suffix} space for residents of ${prefix} ${base} with community programming and events.`,
        tags: ["Housing", "Community", suffix],
        memberCount: Math.floor(Math.random() * 100) + 20
      };
    }
      
    case 'student_organizations': {
      const orgs = generators as typeof SPACE_GENERATORS.student_organizations;
      const categories = Object.keys(orgs);
      const category = categories[index % categories.length];
      const categoryOrgs = orgs[category as keyof typeof orgs];
      const orgName = categoryOrgs[Math.floor(index / categories.length) % categoryOrgs.length];
      
      return {
        name: orgName,
        description: `Student organization focused on ${category} interests and development.`,
        tags: [category, "Student", "Organization"],
        memberCount: Math.floor(Math.random() * 150) + 25
      };
    }
      
    case 'university_organizations': {
      const uni = generators as typeof SPACE_GENERATORS.university_organizations;
      const uniCategories = Object.keys(uni);
      const uniCategory = uniCategories[index % uniCategories.length];
      const uniOrgs = uni[uniCategory as keyof typeof uni];
      const uniOrgName = uniOrgs[Math.floor(index / uniCategories.length) % uniOrgs.length];
      
      return {
        name: uniOrgName,
        description: `University ${uniCategory} focused on campus-wide initiatives and support.`,
        tags: ["University", uniCategory, "Official"],
        memberCount: Math.floor(Math.random() * 80) + 15
      };
    }
      
    case 'cohort': {
      const cohort = generators as typeof SPACE_GENERATORS.cohort;
      const cohortCategories = Object.keys(cohort);
      const cohortCategory = cohortCategories[index % cohortCategories.length];
      const cohortItems = cohort[cohortCategory as keyof typeof cohort];
      const cohortName = cohortItems[Math.floor(index / cohortCategories.length) % cohortItems.length];
      
      let description: string;
      let tags: string[];
      let memberCount: number;
      
      if (cohortCategory === 'majors') {
        description = `Connect with all ${cohortName} students across graduation years for academic support and career networking.`;
        tags = ["Major", cohortName, "Academic"];
        memberCount = Math.floor(Math.random() * 200) + 50; // 50-250 members
      } else if (cohortCategory === 'years') {
        description = `Students graduating in 20${cohortName.slice(1)} - connect with your class for academic and social activities.`;
        tags = ["Graduation Year", "Class", cohortName];
        memberCount = Math.floor(Math.random() * 800) + 400; // 400-1200 members
      } else {
        description = `${cohortName} cohort - your specific academic peer group for study sessions and networking.`;
        tags = ["Major", "Year", "Cohort"];
        memberCount = Math.floor(Math.random() * 50) + 15; // 15-65 members
      }
      
      return {
        name: cohortName,
        description,
        tags,
        memberCount
      };
    }
      
    default:
      return null;
  }
}

/**
 * Calculate target distribution for 360+ spaces
 */
function calculateTargetDistribution(totalTarget: number = 360) {
  return {
    campus_living: Math.floor(totalTarget * 0.20), // 20% - ~72 spaces
    student_organizations: Math.floor(totalTarget * 0.35), // 35% - ~126 spaces  
    university_organizations: Math.floor(totalTarget * 0.15), // 15% - ~54 spaces
    fraternity_and_sorority: Math.floor(totalTarget * 0.10), // 10% - ~36 spaces
    hive_exclusive: Math.floor(totalTarget * 0.10), // 10% - ~36 spaces
    cohort: Math.floor(totalTarget * 0.10) // 10% - ~36 spaces
  };
}

export async function POST(request: NextRequest) {
  try {
    // PRODUCTION SAFETY: Only allow seeding in development/staging environments
    if (process.env.NODE_ENV === 'production' && !process.env.ALLOW_DATA_SEEDING) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Data seeding is not allowed in production',
          message: 'This endpoint is restricted to development and staging environments for security reasons.' 
        },
        { status: HttpStatus.FORBIDDEN }
      );
    }

    const { dryRun = false, targetTotal = 360 } = await request.json().catch(() => ({}));
    
    logger.info('🌱 Starting space seeding analysis (target: spaces)...', { targetTotal, endpoint: '/api/spaces/seed' });
    
    // Calculate target distribution
    const targetDistribution = calculateTargetDistribution(targetTotal);
    
    // Analyze current space distribution
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations', 'cohort'];
    const currentDistribution: Record<string, number> = {};
    const spacesToCreate: Record<string, SpaceTemplate[]> = {};
    
    let totalCurrent = 0;
    
    for (const spaceType of spaceTypes) {
      try {
        const spacesSnapshot = await dbAdmin
          .collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .get();
          
        const currentCount = spacesSnapshot.size;
        currentDistribution[spaceType] = currentCount;
        totalCurrent += currentCount;
        
        const targetCount = targetDistribution[spaceType as keyof typeof targetDistribution];
        
        // Only create additional spaces if current count is below target
        if (currentCount < targetCount) {
          const additional = generateSpaces(spaceType, currentCount, targetCount);
          spacesToCreate[spaceType] = additional;
        } else {
          spacesToCreate[spaceType] = [];
          logger.info('⚡ :(already above target of )', {  currentCount, targetCount, endpoint: '/api/spaces/seed'  });
        }
        
        const additional = spacesToCreate[spaceType];
        logger.info('📊 : →( to create)', { spaceType, targetCount, count: additional.length, endpoint: '/api/spaces/seed'   });
      } catch (error) {
        logger.error('❌ Error analyzing', { spaceType, error: error, endpoint: '/api/spaces/seed' });
        currentDistribution[spaceType] = 0;
        spacesToCreate[spaceType] = [];
      }
    }
    
    const totalToCreate = Object.values(spacesToCreate).reduce((sum, spaces) => sum + spaces.length, 0);
    const finalTotal = totalCurrent + totalToCreate;
    
    logger.info('📈 Summary: current →final ( to create)', {  finalTotal, totalToCreate, endpoint: '/api/spaces/seed'  });
    
    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        analysis: {
          currentTotal: totalCurrent,
          targetTotal: targetTotal,
          finalTotal: finalTotal,
          totalToCreate: totalToCreate,
          currentDistribution,
          targetDistribution,
          spacesToCreate: Object.keys(spacesToCreate).reduce((acc, type) => {
            acc[type] = spacesToCreate[type].length;
            return acc;
          }, {} as Record<string, number>)
        }
      });
    }
    
    // Create spaces in Firebase
    let created = 0;
    const results: Record<string, any> = {};
    
    for (const [spaceType, spaces] of Object.entries(spacesToCreate)) {
      if (spaces.length === 0) continue;
      
      try {
        const batch = dbAdmin.batch();
        const spaceIds: string[] = [];
        
        for (const space of spaces) {
          const spaceRef = dbAdmin
            .collection('spaces')
            .doc(spaceType)
            .collection('spaces')
            .doc();
            
          const spaceData = {
            name: space.name,
            description: space.description,
            tags: space.tags,
            memberCount: space.memberCount || 0,
            isPrivate: space.isPrivate || false,
            status: 'activated',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            type: spaceType,
            name_lowercase: space.name.toLowerCase(),
            // UB-specific identification
            schoolId: 'university-at-buffalo',
            university: 'University at Buffalo',
            universityShort: 'UB',
            // Auto-generated metadata
            isAutoGenerated: true,
            seedingVersion: '2.0-ub',
            seedingDate: admin.firestore.FieldValue.serverTimestamp()
          };
          
          batch.set(spaceRef, spaceData);
          spaceIds.push(spaceRef.id);
        }
        
        await batch.commit();
        created += spaces.length;
        results[spaceType] = {
          created: spaces.length,
          spaceIds: spaceIds.slice(0, 3), // Show first 3 IDs as sample
          sample: spaces.slice(0, 2) // Show first 2 spaces as sample
        };
        
        logger.info('✅ Createdspaces', { spaces, spaceType, endpoint: '/api/spaces/seed' });
      } catch (error) {
        logger.error('❌ Error creating spaces', { spaceType, error: error, endpoint: '/api/spaces/seed' });
        results[spaceType] = {
          error: `Failed to create spaces: ${error}`,
          attempted: spaces.length
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      created: created,
      targetReached: finalTotal >= targetTotal,
      summary: {
        previousTotal: totalCurrent,
        finalTotal: totalCurrent + created,
        created: created,
        targetTotal: targetTotal
      },
      results: results
    });
    
  } catch (error) {
    logger.error('❌ Space seeding error', { error: error, endpoint: '/api/spaces/seed' });
    return NextResponse.json(
      { 
        success: false,
        error: 'Space seeding failed',
        message: `${error}` 
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    info: 'Space Data Seeding API',
    usage: 'POST with { dryRun: true } to analyze, POST with { dryRun: false } to execute',
    targetDistribution: calculateTargetDistribution(),
    note: 'Creates realistic campus spaces across all 5 space types to reach 360+ total'
  });
}

/**
 * DELETE endpoint to remove auto-generated/mock data
 */
export async function DELETE(request: NextRequest) {
  try {
    // PRODUCTION SAFETY: Only allow cleanup in development/staging environments
    if (process.env.NODE_ENV === 'production' && !process.env.ALLOW_DATA_SEEDING) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Data cleanup is not allowed in production',
          message: 'This endpoint is restricted to development and staging environments for security reasons.' 
        },
        { status: HttpStatus.FORBIDDEN }
      );
    }

    const { cleanup = false } = await request.json().catch(() => ({}));
    
    if (!cleanup) {
      return NextResponse.json(ApiResponseHelper.error("Please confirm cleanup by sending { cleanup: true }", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }
    
    logger.info('🧹 Starting cleanup of auto-generated spaces...', { endpoint: '/api/spaces/seed' });
    
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations', 'cohort'];
    let totalDeleted = 0;
    const deletionResults: Record<string, any> = {};
    
    for (const spaceType of spaceTypes) {
      try {
        // Find all auto-generated spaces
        const autoGeneratedSpaces = await dbAdmin
          .collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .where('isAutoGenerated', '==', true)
          .get();
          
        if (autoGeneratedSpaces.size === 0) {
          deletionResults[spaceType] = { deleted: 0, message: 'No auto-generated spaces found' };
          continue;
        }
        
        // Delete in batches
        const batch = dbAdmin.batch();
        const deletedIds: string[] = [];
        
        autoGeneratedSpaces.docs.forEach(doc => {
          batch.delete(doc.ref);
          deletedIds.push(doc.id);
        });
        
        await batch.commit();
        totalDeleted += autoGeneratedSpaces.size;
        deletionResults[spaceType] = {
          deleted: autoGeneratedSpaces.size,
          deletedIds: deletedIds.slice(0, 3), // Show first 3 as sample
          message: `Deleted ${autoGeneratedSpaces.size} auto-generated spaces`
        };
        
        logger.info('✅ Deletedauto-generated spaces from', { autoGeneratedSpaces, spaceType, endpoint: '/api/spaces/seed' });
      } catch (error) {
        logger.error('❌ Error cleaning up', { spaceType, error: error, endpoint: '/api/spaces/seed' });
        deletionResults[spaceType] = {
          error: `Failed to clean up: ${error}`,
          deleted: 0
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Successfully cleaned up ${totalDeleted} auto-generated spaces`,
      totalDeleted,
      results: deletionResults
    });
    
  } catch (error) {
    logger.error('❌ Cleanup error', { error: error, endpoint: '/api/spaces/seed' });
    return NextResponse.json(
      { 
        success: false,
        error: 'Cleanup failed',
        message: `${error}` 
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}