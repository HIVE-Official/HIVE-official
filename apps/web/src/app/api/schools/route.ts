import { dbAdmin } from "@/lib/firebase-admin";
import type { School } from "@hive/core";
import { NextResponse } from "next/server";
import { logger } from "@hive/core";

// Mock schools data for development when Firebase is not configured
const mockSchools: School[] = [
  {
    id: "ub",
    name: "University at Buffalo",
    domain: "buffalo.edu",
    status: "active",
    waitlistCount: 0,
  },
  {
    id: "cornell",
    name: "Cornell University",
    domain: "cornell.edu",
    status: "active",
    waitlistCount: 0,
  },
  {
    id: "columbia",
    name: "Columbia University",
    domain: "columbia.edu",
    status: "waitlist",
    waitlistCount: 156,
  },
  {
    id: "nyu",
    name: "New York University",
    domain: "nyu.edu",
    status: "waitlist",
    waitlistCount: 203,
  },
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

    // Return mock data for development
    return NextResponse.json(mockSchools);
  }
}
