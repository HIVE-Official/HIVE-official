import { logger, type School } from "@hive/core";
import { dbAdmin } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

// Mock schools data for development when Firebase is not configured
const mockSchools: any[] = [
  {
    id: "ub",
    name: "University at Buffalo",
    domain: "buffalo.edu",
    status: "open",
    studentsUntilOpen: 0,
    waitlistCount: 0,
    city: "Buffalo",
    state: "New York",
    country: "US",
    timezone: "America/New_York",
    majors: [],
    academicCalendar: "semester",
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: ["Ellicott Complex", "South Campus", "Governors Complex"],
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: "binghamton",
    name: "Binghamton University",
    domain: "binghamton.edu",
    status: "waitlist",
    studentsUntilOpen: 350,
    waitlistCount: 89,
    city: "Binghamton",
    state: "New York",
    country: "US",
    timezone: "America/New_York",
    majors: [],
    academicCalendar: "semester",
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: ["College-in-the-Woods", "Mountainview", "Susquehanna"],
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: "stony-brook",
    name: "Stony Brook University",
    domain: "stonybrook.edu",
    status: "waitlist",
    studentsUntilOpen: 350,
    waitlistCount: 156,
    city: "Stony Brook",
    state: "New York",
    country: "US",
    timezone: "America/New_York",
    majors: [],
    academicCalendar: "semester",
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: ["Roosevelt Quad", "Mendelsohn Quad", "Roth Quad"],
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: "st-bonaventure",
    name: "St. Bonaventure University",
    domain: "sbu.edu",
    status: "waitlist",
    studentsUntilOpen: 350,
    waitlistCount: 73,
    city: "St. Bonaventure",
    state: "New York",
    country: "US",
    timezone: "America/New_York",
    majors: [],
    academicCalendar: "semester",
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: ["Francis Hall", "Robinson Hall", "Shay-Loughlen Hall"],
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: "buffalo-state",
    name: "Buffalo State University",
    domain: "buffalostate.edu",
    status: "waitlist",
    studentsUntilOpen: 350,
    waitlistCount: 45,
    city: "Buffalo",
    state: "New York",
    country: "US",
    timezone: "America/New_York",
    majors: [],
    academicCalendar: "semester",
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: ["Moore Complex", "Neumann Hall", "Porter Hall"],
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: "syracuse",
    name: "Syracuse University",
    domain: "syr.edu",
    status: "waitlist",
    studentsUntilOpen: 350,
    waitlistCount: 127,
    city: "Syracuse",
    state: "New York",
    country: "US",
    timezone: "America/New_York",
    majors: [],
    academicCalendar: "semester",
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: ["Ernie Davis Hall", "Lawrinson Hall", "Sadler Hall"],
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  }
];

export async function GET() {
  try {
    // Try to connect to Firebase first
    if (dbAdmin) {
      const schoolsSnapshot = await dbAdmin.collection("schools").get();
      const schools = schoolsSnapshot.docs.map(
        (doc: any) => ({ id: doc.id, ...doc.data() }) as School
      );
      
      // If no schools in database, return mock data
      if (schools.length === 0) {
        logger.info("No schools found in database, using mock data");
        return NextResponse.json(mockSchools);
      }
      
      return NextResponse.json(schools);
    } else {
      logger.info("Firebase not configured, using mock data");
      return NextResponse.json(mockSchools);
    }
  } catch (error) {
    logger.error("Firebase connection failed, using mock data:", error);
    try {
      return NextResponse.json(mockSchools);
    } catch (jsonError) {
      logger.error("Failed to serialize mock data:", jsonError);
      return NextResponse.json({ error: "Failed to load schools data" }, { status: 500 });
    }
  }
}
