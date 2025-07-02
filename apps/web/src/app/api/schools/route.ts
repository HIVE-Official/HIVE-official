import { dbAdmin, logger, type School } from "@hive/core";
import { NextResponse } from "next/server";

// Mock schools data for development when Firebase is not configured
const mockSchools: School[] = [
  {
    id: "ub",
    name: "University at Buffalo",
    domain: "buffalo.edu",
    status: "open",
    studentsUntilOpen: 0,
    waitlistCount: 0,
  },
  {
    id: "binghamton",
    name: "Binghamton University",
    domain: "binghamton.edu",
    status: "waitlist",
    studentsUntilOpen: 350,
    waitlistCount: 89,
  },
  {
    id: "stony-brook",
    name: "Stony Brook University",
    domain: "stonybrook.edu",
    status: "waitlist",
    studentsUntilOpen: 350,
    waitlistCount: 156,
  },
  {
    id: "st-bonaventure",
    name: "St. Bonaventure University",
    domain: "sbu.edu",
    status: "waitlist",
    studentsUntilOpen: 350,
    waitlistCount: 73,
  },
  {
    id: "buffalo-state",
    name: "Buffalo State University",
    domain: "buffalostate.edu",
    status: "waitlist",
    studentsUntilOpen: 350,
    waitlistCount: 45,
  },
  {
    id: "syracuse",
    name: "Syracuse University",
    domain: "syr.edu",
    status: "waitlist",
    studentsUntilOpen: 350,
    waitlistCount: 127,
  }
];

export async function GET() {
  try {
    // Try to connect to Firebase first
    const schoolsSnapshot = await dbAdmin.collection("schools").get();
    const schools = schoolsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as School
    );
    return NextResponse.json(schools);
  } catch (error) {
    logger.error("Firebase connection failed, using mock data:", error);
    return NextResponse.json(mockSchools);
  }
}
