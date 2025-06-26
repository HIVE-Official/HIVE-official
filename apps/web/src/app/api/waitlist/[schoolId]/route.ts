import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import type { School } from "@hive/core";
import { logger } from "@hive/core";

async function getSchool(schoolId: string): Promise<School | null> {
  try {
    const db = getFirestore();
    const schoolDoc = await db.collection("schools").doc(schoolId).get();
    if (!schoolDoc.exists) {
      return null;
    }
    return { id: schoolDoc.id, ...schoolDoc.data() } as School;
  } catch (error) {
    logger.error(`Failed to fetch school ${schoolId}`, error);
    // Important: Don't expose internal errors to the client
    return null;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const { schoolId } = await params;
  if (!schoolId) {
    return NextResponse.json({ error: "School ID is required" }, { status: 400 });
  }

  const school = await getSchool(schoolId);

  if (!school) {
    return NextResponse.json({ error: "School not found" }, { status: 404 });
  }

  return NextResponse.json(school);
} 