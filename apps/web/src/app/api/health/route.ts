import { NextResponse } from "next/server";
import { currentEnvironment, isFirebaseAdminConfigured } from "@/lib/env";
import { environmentInfo } from "@/lib/firebase-admin";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: currentEnvironment,
    firebaseConfigured: isFirebaseAdminConfigured,
    environmentInfo,
    version: process.env.npm_package_version || "1.0.0",
    nodeVersion: process.version,
    platform: process.platform,
  });
}
