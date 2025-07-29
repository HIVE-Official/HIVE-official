import { dbAdmin } from "@/lib/firebase-admin";
import type { School } from "@hive/core";
import { NextResponse } from "next/server";
import { currentEnvironment } from "@/lib/env";

export async function GET() {
  try {
    // PRODUCTION: Always use Firebase database
    const schoolsSnapshot = await dbAdmin.collection("schools").get();
    const schools = schoolsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as School
    );
    
    // In development, always include test university at the top
    if (currentEnvironment === 'development') {
      const testUniversity: School = {
        id: "test-university",
        name: "Test University (Development)",
        domain: "test.edu",
        status: "active",
        type: "university",
        location: "Development, NY",
        signupCount: 999,
        activationThreshold: 350,
      };
      
      // Remove any existing test university and add it at the beginning
      const filteredSchools = schools.filter(school => school.id !== 'test-university');
      return NextResponse.json([testUniversity, ...filteredSchools]);
    }
    
    return NextResponse.json(schools);
  } catch (error) {
    console.error("Firebase connection failed:", error);
    
    // SECURITY: Never return mock data in production
    if (currentEnvironment === 'production') {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    // Development fallback only
    const devSchools: School[] = [
      {
        id: "test-university",
        name: "Test University (Development)",
        domain: "test.edu",
        status: "active",
        type: "university",
        location: "Development, NY",
        signupCount: 999,
        activationThreshold: 350,
      }
    ];
    
    return NextResponse.json(devSchools);
  }
}
