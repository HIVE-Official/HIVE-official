import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { SCHOOLS } from '@hive/core';

export async function POST(request: NextRequest) {
  try {
    const batch = db.batch();
    
    // Add all schools from the constants to Firestore
    for (const school of SCHOOLS) {
      const schoolRef = db.collection('schools').doc(school.id);
      batch.set(schoolRef, {
        id: school.id,
        name: school.name,
        domain: school.domain,
        status: school.status,
        studentsUntilOpen: school.studentsUntilOpen,
        waitlistCount: school.waitlistCount,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    await batch.commit();
    
    return NextResponse.json({
      success: true,
      message: `Successfully added ${SCHOOLS.length} schools to Firestore`,
      schools: SCHOOLS.map(s => ({ id: s.id, name: s.name, domain: s.domain, status: s.status }))
    });
    
  } catch (error) {
    console.error('Error setting up schools:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}