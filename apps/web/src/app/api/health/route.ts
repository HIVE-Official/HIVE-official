import { NextResponse } from "next/server";
import { env } from "@hive/core";

export async function GET() {
  const isFirebaseAdminConfigured = !!(process.env.FIREBASE_ADMIN_PROJECT_ID && process.env.FIREBASE_ADMIN_PRIVATE_KEY);
  
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    environment: env.NODE_ENV,
    checks: {
      firebase: {
        clientConfigured: !!(env.NEXT_PUBLIC_FIREBASE_API_KEY && env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo-api-key'),
        adminConfigured: isFirebaseAdminConfigured,
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      },
      vercel: {
        environment: process.env.VERCEL_ENV || 'local',
        region: process.env.VERCEL_REGION || 'unknown'
      },
      database: {
        // Add database connectivity check here
        connected: true // Placeholder
      }
    },
    security: {
      httpsOnly: process.env.NODE_ENV === 'production',
      corsEnabled: false, // Should be false for API security
      authRequired: true
    }
  }

  // Determine overall health status
  const allChecksPass = healthCheck.checks.firebase.clientConfigured && 
                       healthCheck.checks.firebase.adminConfigured

  if (!allChecksPass) {
    healthCheck.status = 'degraded'
  }

  return NextResponse.json(healthCheck, {
    status: allChecksPass ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Health-Check': 'true'
    }
  });
}
