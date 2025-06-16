#!/usr/bin/env node

/**
 * HIVE Deployment Verification Script
 * Tests all three environments and verifies Firebase connectivity
 */

const https = require("https");
const http = require("http");

// Environment URLs to test
const environments = {
  development: "http://localhost:3000",
  staging: process.env.STAGING_URL || "https://your-staging-url.vercel.app",
  production:
    process.env.PRODUCTION_URL || "https://your-production-domain.com",
};

// Test endpoints
const testEndpoints = ["/api/health", "/api/schools", "/api/auth/check-handle"];

async function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;

    lib
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers,
          });
        });
      })
      .on("error", reject);
  });
}

async function testEnvironment(envName, baseUrl) {
  console.log(`\n🧪 Testing ${envName.toUpperCase()} environment: ${baseUrl}`);
  console.log("─".repeat(60));

  const results = [];

  for (const endpoint of testEndpoints) {
    const url = `${baseUrl}${endpoint}`;

    try {
      const response = await makeRequest(url);
      const status = response.status === 200 ? "✅" : "❌";

      console.log(`${status} ${endpoint} - Status: ${response.status}`);

      // Try to parse JSON response
      try {
        const jsonData = JSON.parse(response.data);
        if (jsonData.environment) {
          console.log(`   Environment: ${jsonData.environment}`);
        }
        if (jsonData.firebaseConfigured !== undefined) {
          console.log(
            `   Firebase: ${jsonData.firebaseConfigured ? "✅" : "❌"}`
          );
        }
      } catch (e) {
        // Not JSON, that's ok
      }

      results.push({
        endpoint,
        status: response.status,
        success: response.status === 200,
      });
    } catch (error) {
      console.log(`❌ ${endpoint} - Error: ${error.message}`);
      results.push({
        endpoint,
        status: "ERROR",
        success: false,
        error: error.message,
      });
    }
  }

  const successCount = results.filter((r) => r.success).length;
  console.log(
    `\n📊 Results: ${successCount}/${results.length} endpoints working`
  );

  return results;
}

async function verifyAllEnvironments() {
  console.log("🚀 HIVE Deployment Verification");
  console.log("=".repeat(60));

  const allResults = {};

  for (const [envName, baseUrl] of Object.entries(environments)) {
    try {
      allResults[envName] = await testEnvironment(envName, baseUrl);
    } catch (error) {
      console.log(`❌ Failed to test ${envName}: ${error.message}`);
      allResults[envName] = [{ error: error.message }];
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📋 DEPLOYMENT VERIFICATION SUMMARY");
  console.log("=".repeat(60));

  for (const [envName, results] of Object.entries(allResults)) {
    const successCount = results.filter((r) => r.success).length;
    const totalCount = results.length;
    const status = successCount === totalCount ? "✅" : "⚠️";

    console.log(
      `${status} ${envName.toUpperCase()}: ${successCount}/${totalCount} endpoints working`
    );

    // Show any errors
    const errors = results.filter((r) => r.error);
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(`   ❌ ${error.endpoint || "General"}: ${error.error}`);
      });
    }
  }

  console.log("\n🔧 Next steps:");
  console.log(
    "1. Add Firebase service account credentials to Vercel environment variables"
  );
  console.log("2. Update staging and production URLs in this script");
  console.log("3. Test API endpoints manually in each environment");
  console.log("4. Verify authentication flows work correctly");

  return allResults;
}

// Health check endpoint for testing
function createHealthEndpoint() {
  return `
// Add this to apps/web/src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { currentEnvironment, isFirebaseAdminConfigured } from '@/lib/env';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: currentEnvironment,
    firebaseConfigured: isFirebaseAdminConfigured,
    version: process.env.npm_package_version || '1.0.0'
  });
}
`;
}

// Run verification if called directly
if (require.main === module) {
  verifyAllEnvironments().catch(console.error);
}

module.exports = { verifyAllEnvironments, testEnvironment };
