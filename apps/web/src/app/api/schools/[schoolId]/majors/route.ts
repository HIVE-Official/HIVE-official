import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { logger } from "@hive/core";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const { schoolId } = await params;
  
  try {
    if (!schoolId) {
      return NextResponse.json(
        { error: "School ID is required" },
        { status: 400 }
      );
    }

    const majorsSnapshot = await dbAdmin
      .collection("schools")
      .doc(schoolId)
      .collection("majors")
      .orderBy("name")
      .get();

    if (majorsSnapshot.empty) {
      logger.warn(`No majors found for school: ${schoolId}`);
      return NextResponse.json([]);
    }

    const majors = majorsSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(majors);
  } catch (error) {
    logger.error(
      `Failed to fetch majors for school: ${schoolId}`,
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch majors" },
      { status: 500 }
    );
  }
}
