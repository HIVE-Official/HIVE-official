import { dbAdmin } from "@hive/core/firebase-admin";
import { School } from "@hive/core/domain/school";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const schoolsSnapshot = await dbAdmin.collection("schools").get();
    const schools = schoolsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as School)
    );
    return NextResponse.json(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 