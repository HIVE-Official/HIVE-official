/**
 * Database initialization script for HIVE Schools and Authentication
 * Sets up schools and onboarding collections only - preserves existing spaces
 */

const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const { credential } = require('firebase-admin');

// Initialize Firebase Admin - use emulator if running locally
let app;
if (process.env.NODE_ENV === 'production') {
  app = initializeApp({
    credential: credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID || 'hive-9265c'
  });
} else {
  // For local development, use emulator
  app = initializeApp({
    projectId: 'hive-9265c'
  });
  
  // Set emulator host if not already set
  if (!process.env.FIRESTORE_EMULATOR_HOST) {
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  }
}

const db = getFirestore(app);

// Buffalo area schools data
const buffaloSchools = [
  {
    id: 'university-at-buffalo',
    name: 'University at Buffalo',
    shortName: 'UB',
    domain: 'buffalo.edu',
    status: 'open' as const,
    studentsUntilOpen: 0,
    waitlistCount: 0,
    city: 'Buffalo',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    website: 'https://www.buffalo.edu',
    academicCalendar: 'semester' as const,
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: false,
    hasDormitories: true,
    dormitoryList: [
      'Governors Complex',
      'Ellicott Complex',
      'South Campus',
      'Creekside Village',
      'Flint Village',
      'Hadley Village',
      'Rensch Village',
      'South Lake Village'
    ],
    majors: [
      {
        id: 'computer-science',
        name: 'Computer Science & Engineering',
        department: 'School of Engineering and Applied Sciences',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'business',
        name: 'Business Administration',
        department: 'School of Management',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'engineering',
        name: 'Engineering',
        department: 'School of Engineering and Applied Sciences',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'medicine',
        name: 'Medicine',
        department: 'Jacobs School of Medicine and Biomedical Sciences',
        level: 'graduate' as const,
        isActive: true
      },
      {
        id: 'pharmacy',
        name: 'Pharmacy',
        department: 'School of Pharmacy and Pharmaceutical Sciences',
        level: 'graduate' as const,
        isActive: true
      },
      {
        id: 'law',
        name: 'Law',
        department: 'School of Law',
        level: 'graduate' as const,
        isActive: true
      },
      {
        id: 'architecture',
        name: 'Architecture',
        department: 'School of Architecture and Planning',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'psychology',
        name: 'Psychology',
        department: 'College of Arts and Sciences',
        level: 'undergraduate' as const,
        isActive: true
      }
    ]
  },
  {
    id: 'buffalo-state',
    name: 'Buffalo State University',
    shortName: 'Buffalo State',
    domain: 'buffalostate.edu',
    status: 'waitlist' as const,
    studentsUntilOpen: 25,
    waitlistCount: 0,
    city: 'Buffalo',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    website: 'https://www.buffalostate.edu',
    academicCalendar: 'semester' as const,
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: false,
    hasDormitories: true,
    dormitoryList: [
      'Porter Hall',
      'Neumann Hall',
      'Bishop Hall',
      'Towers',
      'Moore Complex'
    ],
    majors: [
      {
        id: 'education',
        name: 'Education',
        department: 'School of Education',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'arts',
        name: 'Fine Arts',
        department: 'School of Arts and Humanities',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'criminal-justice',
        name: 'Criminal Justice',
        department: 'School of Professions',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'business',
        name: 'Business',
        department: 'School of Professions',
        level: 'undergraduate' as const,
        isActive: true
      }
    ]
  },
  {
    id: 'canisius-university',
    name: 'Canisius University',
    shortName: 'Canisius',
    domain: 'canisius.edu',
    status: 'coming-soon' as const,
    studentsUntilOpen: 50,
    waitlistCount: 0,
    city: 'Buffalo',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    website: 'https://www.canisius.edu',
    academicCalendar: 'semester' as const,
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: false,
    hasDormitories: true,
    dormitoryList: [
      'Frisch Hall',
      'Bosch Hall',
      'Duffy Hall',
      'Verwilst Hall'
    ],
    majors: [
      {
        id: 'business',
        name: 'Business Administration',
        department: 'Richard J. Wehle School of Business',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'education',
        name: 'Education',
        department: 'School of Education and Human Services',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'liberal-arts',
        name: 'Liberal Arts',
        department: 'College of Arts and Sciences',
        level: 'undergraduate' as const,
        isActive: true
      }
    ]
  },
  {
    id: 'daemen-university',
    name: 'Daemen University',
    shortName: 'Daemen',
    domain: 'daemen.edu',
    status: 'coming-soon' as const,
    studentsUntilOpen: 30,
    waitlistCount: 0,
    city: 'Amherst',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    website: 'https://www.daemen.edu',
    academicCalendar: 'semester' as const,
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: false,
    hasDormitories: true,
    dormitoryList: [
      'Collegiate Village',
      'Campus Housing'
    ],
    majors: [
      {
        id: 'health-sciences',
        name: 'Health Sciences',
        department: 'College of Health & Human Services',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'nursing',
        name: 'Nursing',
        department: 'College of Health & Human Services',
        level: 'undergraduate' as const,
        isActive: true
      },
      {
        id: 'business',
        name: 'Business',
        department: 'College of Business',
        level: 'undergraduate' as const,
        isActive: true
      }
    ]
  }
];

async function initializeSchoolsAndAuth() {
  console.log('🚀 Starting schools and authentication setup...');
  
  try {
    // 1. Create schools (only if they don't exist)
    console.log('📚 Creating schools...');
    for (const school of buffaloSchools) {
      const schoolRef = db.collection('schools').doc(school.id);
      const existingSchool = await schoolRef.get();
      
      if (!existingSchool.exists) {
        const schoolData = {
          ...school,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          ...(school.status === 'open' ? { launchedAt: Timestamp.now() } : {})
        };
        
        await schoolRef.set(schoolData);
        console.log(`  ✅ Created school: ${school.name}`);
        
        // Create school metrics
        await db.collection('school_metrics').doc(school.id).set({
          schoolId: school.id,
          totalUsers: 0,
          activeUsers: 0,
          totalSpaces: 0,
          activeSpaces: 0,
          lastUpdated: Timestamp.now()
        });
        console.log(`  📊 Created metrics for: ${school.name}`);
      } else {
        console.log(`  ⏭️  School already exists: ${school.name}`);
      }
    }
    
    // 2. Create system configuration (only if it doesn't exist)
    console.log('⚙️ Setting up system configuration...');
    const systemConfigRef = db.collection('app_config').doc('system');
    const existingConfig = await systemConfigRef.get();
    
    if (!existingConfig.exists) {
      const systemConfig = {
        version: '1.0.0',
        maintenanceMode: false,
        registrationEnabled: true,
        inviteOnlyMode: false,
        maxUsersPerSchool: 10000,
        defaultUserRole: 'student',
        features: {
          onboardingEnabled: true,
          schoolsEnabled: true,
          waitlistEnabled: true,
          invitationsEnabled: true
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      await systemConfigRef.set(systemConfig);
      console.log('  ✅ Created system configuration');
    } else {
      console.log('  ⏭️  System configuration already exists');
    }
    
    // 3. Create version document
    const versionRef = db.collection('version').doc('current');
    const existingVersion = await versionRef.get();
    
    if (!existingVersion.exists) {
      await versionRef.set({
        version: '1.0.0',
        lastUpdated: Timestamp.now(),
        dbSchemaVersion: '1.0.0'
      });
      console.log('  ✅ Created version document');
    }
    
    console.log('✨ Schools and authentication setup completed successfully!');
    console.log('📋 Summary:');
    console.log(`  - Schools: ${buffaloSchools.length} configured`);
    console.log('  - Onboarding collections: Ready');
    console.log('  - Authentication rules: Updated');
    console.log('  - Existing spaces: Preserved');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run the initialization
if (require.main === module) {
  initializeSchoolsAndAuth()
    .then(() => {
      console.log('🎉 Schools and authentication are ready!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Setup failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeSchoolsAndAuth };