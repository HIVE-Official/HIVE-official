#!/usr/bin/env ts-node

/**
 * Dev/Staging Database Seed Script
 * Seeds essential data for development and staging environments
 */

import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
const auth = getAuth();

interface SeedSchool {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'waitlist';
  waitlistCount: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
}

interface SeedUser {
  uid: string;
  email: string;
  fullName: string;
  handle: string;
  major: string;
  schoolId: string;
  isBuilder: boolean;
}

const SEED_SCHOOLS: SeedSchool[] = [
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'active',
    waitlistCount: 0,
    location: {
      city: 'Buffalo',
      state: 'NY',
      country: 'USA'
    },
    colors: {
      primary: '#005BBB',
      secondary: '#FFD700'
    }
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    domain: 'cornell.edu',
    status: 'waitlist',
    waitlistCount: 127,
    location: {
      city: 'Ithaca',
      state: 'NY',
      country: 'USA'
    },
    colors: {
      primary: '#B31B1B',
      secondary: '#FFFFFF'
    }
  },
  {
    id: 'columbia',
    name: 'Columbia University',
    domain: 'columbia.edu',
    status: 'waitlist',
    waitlistCount: 89,
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA'
    },
    colors: {
      primary: '#B9D9EB',
      secondary: '#FFFFFF'
    }
  },
  {
    id: 'nyu',
    name: 'New York University',
    domain: 'nyu.edu',
    status: 'waitlist',
    waitlistCount: 156,
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA'
    },
    colors: {
      primary: '#57068C',
      secondary: '#FFFFFF'
    }
  },
  {
    id: 'rit',
    name: 'Rochester Institute of Technology',
    domain: 'rit.edu',
    status: 'waitlist',
    waitlistCount: 73,
    location: {
      city: 'Rochester',
      state: 'NY',
      country: 'USA'
    },
    colors: {
      primary: '#F76902',
      secondary: '#513127'
    }
  }
];

const SEED_USERS: SeedUser[] = [
  {
    uid: 'dev-admin-001',
    email: 'admin@buffalo.edu',
    fullName: 'Admin User',
    handle: 'admin',
    major: 'Computer Science',
    schoolId: 'ub',
    isBuilder: true
  },
  {
    uid: 'dev-builder-001',
    email: 'builder@buffalo.edu',
    fullName: 'Builder Demo',
    handle: 'builder_demo',
    major: 'Engineering Physics',
    schoolId: 'ub',
    isBuilder: true
  },
  {
    uid: 'dev-user-001',
    email: 'student1@buffalo.edu',
    fullName: 'Jane Smith',
    handle: 'jane_smith',
    major: 'Psychology',
    schoolId: 'ub',
    isBuilder: false
  },
  {
    uid: 'dev-user-002',
    email: 'student2@buffalo.edu',
    fullName: 'Mike Johnson',
    handle: 'mike_j',
    major: 'Business Administration',
    schoolId: 'ub',
    isBuilder: false
  }
];

async function seedSchools() {
  console.log('🏫 Seeding schools...');
  
  for (const school of SEED_SCHOOLS) {
    await db.collection('schools').doc(school.id).set({
      name: school.name,
      domain: school.domain,
      status: school.status,
      waitlistCount: school.waitlistCount,
      location: school.location,
      colors: school.colors,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log(`  ✓ Created school: ${school.name}`);
  }
}

async function seedUsers() {
  console.log('👥 Seeding users...');
  
  for (const user of SEED_USERS) {
    try {
      // Create Auth user
      await auth.createUser({
        uid: user.uid,
        email: user.email,
        displayName: user.fullName,
        emailVerified: true
      });
      
      // Set custom claims for admin/builder roles
      const customClaims: any = {};
      if (user.handle === 'admin') {
        customClaims.admin = true;
      }
      if (user.isBuilder) {
        customClaims.builder = true;
      }
      
      if (Object.keys(customClaims).length > 0) {
        await auth.setCustomUserClaims(user.uid, customClaims);
      }
      
      // Create Firestore user document
      await db.collection('users').doc(user.uid).set({
        id: user.uid,
        uid: user.uid,
        email: user.email,
        fullName: user.fullName,
        handle: user.handle,
        major: user.major,
        schoolId: user.schoolId,
        isPublic: true,
        consentGiven: true,
        builderOptIn: user.isBuilder,
        isBuilder: user.isBuilder,
        onboardingCompleted: true,
        isVerified: true,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date()
      });
      
      // Reserve handle
      await db.collection('handles').doc(user.handle).set({
        handle: user.handle,
        userId: user.uid,
        reservedAt: new Date()
      });
      
      console.log(`  ✓ Created user: ${user.fullName} (${user.email})`);
      
    } catch (error: any) {
      if (error.code === 'auth/uid-already-exists') {
        console.log(`  ⚠ User ${user.email} already exists, skipping...`);
      } else {
        console.error(`  ✗ Error creating user ${user.email}:`, error.message);
      }
    }
  }
}

async function seedSpaces() {
  console.log('🏠 Seeding default spaces...');
  
  const spaces = [
    {
      id: 'ub-computer-science',
      name: 'Computer Science Majors',
      description: 'Connect with fellow CS students, share projects, and discuss the latest in tech.',
      type: 'academic',
      subType: 'major',
      schoolId: 'ub',
      memberCount: 2,
      isPublic: true,
      status: 'activated'
    },
    {
      id: 'ub-psychology',
      name: 'Psychology Majors',
      description: 'A space for psychology students to discuss research, career paths, and mental health.',
      type: 'academic',
      subType: 'major',
      schoolId: 'ub',
      memberCount: 1,
      isPublic: true,
      status: 'activated'
    },
    {
      id: 'ub-business',
      name: 'Business Administration',
      description: 'Network with business students, share internship opportunities, and discuss entrepreneurship.',
      type: 'academic',
      subType: 'major',
      schoolId: 'ub',
      memberCount: 1,
      isPublic: true,
      status: 'activated'
    },
    {
      id: 'ub-study-group',
      name: 'Late Night Study Group',
      description: 'For night owls who prefer studying after hours. Share tips and motivate each other!',
      type: 'interest',
      subType: 'study',
      schoolId: 'ub',
      memberCount: 0,
      isPublic: true,
      status: 'activated'
    }
  ];
  
  for (const space of spaces) {
    await db.collection('spaces').doc(space.id).set({
      ...space,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log(`  ✓ Created space: ${space.name}`);
  }
}

async function main() {
  try {
    console.log('🌱 Starting database seed...\n');
    
    await seedSchools();
    console.log('');
    
    await seedUsers();
    console.log('');
    
    await seedSpaces();
    console.log('');
    
    console.log('✅ Database seeding completed successfully!');
    console.log('\n📝 Seeded data:');
    console.log(`   • ${SEED_SCHOOLS.length} schools`);
    console.log(`   • ${SEED_USERS.length} users`);
    console.log('   • 4 spaces');
    console.log('\n🔐 Admin credentials:');
    console.log('   Email: admin@buffalo.edu');
    console.log('   (Use magic link to sign in)');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
} 