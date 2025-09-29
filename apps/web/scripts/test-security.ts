#!/usr/bin/env tsx
/**
 * Security Implementation Test Script
 * Verifies all security measures are working correctly
 */

import { config } from 'dotenv';
import { logger } from '../src/lib/logger';

// Load environment variables
config({ path: '.env.local' });

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

function addResult(name: string, passed: boolean, message: string) {
  results.push({ name, passed, message });
  const emoji = passed ? '✅' : '❌';
  console.log(`${emoji} ${name}: ${message}`);
}

async function testEnvironmentVariables() {
  console.log('\n📋 Testing Environment Variables...\n');

  // Check for dev bypass variables in production
  const dangerousVars = [
    'NEXT_PUBLIC_BYPASS_AUTH',
    'NEXT_PUBLIC_USE_EMULATOR',
    'BYPASS_RATE_LIMIT',
    'SKIP_AUTH_CHECK',
    'DEV_MODE'
  ];

  for (const varName of dangerousVars) {
    const value = process.env[varName];
    if (process.env.NODE_ENV === 'production' && (value === 'true' || value === '1')) {
      addResult(
        `Check ${varName}`,
        false,
        `CRITICAL: ${varName} is enabled in production!`
      );
    } else {
      addResult(
        `Check ${varName}`,
        true,
        `${varName} is not enabled (value: ${value || 'undefined'})`
      );
    }
  }

  // Check required security variables
  const requiredVars = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'NEXTAUTH_SECRET',
    'JWT_SECRET'
  ];

  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value) {
      addResult(
        `Check ${varName}`,
        false,
        `${varName} is missing!`
      );
    } else {
      addResult(
        `Check ${varName}`,
        true,
        `${varName} is set (length: ${value.length})`
      );
    }
  }
}

async function testFirebaseConnection() {
  console.log('\n🔥 Testing Firebase Connection...\n');

  try {
    const { authAdmin } = await import('../src/lib/firebase-admin');
    const adminAuth = authAdmin;

    // Try to list users (will fail if not properly configured)
    const listUsersResult = await adminAuth.listUsers(1);

    addResult(
      'Firebase Admin SDK',
      true,
      'Successfully connected to Firebase Admin SDK'
    );

    // Check if Firebase project ID matches expected
    const projectId = process.env.FIREBASE_PROJECT_ID;
    if (projectId && projectId.includes('demo')) {
      addResult(
        'Firebase Project ID',
        false,
        `Using demo project: ${projectId}`
      );
    } else {
      addResult(
        'Firebase Project ID',
        true,
        `Using production project: ${projectId}`
      );
    }
  } catch (error: any) {
    addResult(
      'Firebase Admin SDK',
      false,
      `Failed to connect: ${error.message}`
    );
  }
}

async function testRateLimiting() {
  console.log('\n⏱️ Testing Rate Limiting...\n');

  try {
    // Import rate limiter
    const { checkRedisRateLimit } = await import('../src/lib/rate-limiter-redis');

    // Test Redis connection
    const testResult = await checkRedisRateLimit('api', 'test-identifier');

    if (testResult.success) {
      addResult(
        'Redis Rate Limiting',
        true,
        `Rate limiter connected (remaining: ${testResult.remaining}/${testResult.limit})`
      );
    } else {
      addResult(
        'Redis Rate Limiting',
        false,
        'Rate limit exceeded on test'
      );
    }

    // Check if Redis URL is configured
    const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL;
    if (!redisUrl) {
      addResult(
        'Redis Configuration',
        false,
        'No Redis URL configured - using in-memory fallback'
      );
    } else {
      addResult(
        'Redis Configuration',
        true,
        'Redis URL is configured'
      );
    }
  } catch (error: any) {
    addResult(
      'Rate Limiting',
      false,
      `Rate limiter error: ${error.message}`
    );
  }
}

async function testSecurityMiddleware() {
  console.log('\n🔒 Testing Security Middleware...\n');

  try {
    const {
      blockDevBypassesInProduction,
      validateOrigin,
      validateEmailDomain,
      sanitizeInput
    } = await import('../src/lib/security-middleware');

    // Test dev bypass blocking
    try {
      blockDevBypassesInProduction();
      addResult(
        'Dev Bypass Blocking',
        true,
        'Dev bypasses are properly blocked'
      );
    } catch (error: any) {
      addResult(
        'Dev Bypass Blocking',
        false,
        `Dev bypass detected: ${error.message}`
      );
    }

    // Test email domain validation
    const validEmail = validateEmailDomain('student@buffalo.edu', 'buffalo.edu');
    const invalidEmail = validateEmailDomain('hacker@evil.com', 'buffalo.edu');

    if (validEmail && !invalidEmail) {
      addResult(
        'Email Domain Validation',
        true,
        'Email domain validation working correctly'
      );
    } else {
      addResult(
        'Email Domain Validation',
        false,
        'Email domain validation not working properly'
      );
    }

    // Test input sanitization
    const maliciousInput = {
      name: 'Normal Name',
      bio: '<script>alert("XSS")</script>',
      website: 'javascript:alert("XSS")'
    };

    const sanitized = sanitizeInput(maliciousInput, ['name', 'bio', 'website']);

    if (!sanitized.bio?.includes('<script>') && !sanitized.website?.includes('javascript:')) {
      addResult(
        'Input Sanitization',
        true,
        'XSS attempts are properly sanitized'
      );
    } else {
      addResult(
        'Input Sanitization',
        false,
        'XSS attempts not properly sanitized'
      );
    }
  } catch (error: any) {
    addResult(
      'Security Middleware',
      false,
      `Security middleware error: ${error.message}`
    );
  }
}

async function testCampusIsolation() {
  console.log('\n🏫 Testing Campus Isolation...\n');

  try {
    const { validateCampusAccess } = await import('../src/lib/firebase');

    // Test same campus access
    const sameAccess = validateCampusAccess('ub-buffalo', 'ub-buffalo');
    if (sameAccess) {
      addResult(
        'Same Campus Access',
        true,
        'Same campus access is allowed'
      );
    } else {
      addResult(
        'Same Campus Access',
        false,
        'Same campus access was blocked incorrectly'
      );
    }

    // Test cross-campus access
    const crossAccess = validateCampusAccess('ub-buffalo', 'harvard');
    if (!crossAccess) {
      addResult(
        'Cross-Campus Block',
        true,
        'Cross-campus access is properly blocked'
      );
    } else {
      addResult(
        'Cross-Campus Block',
        false,
        'Cross-campus access was not blocked!'
      );
    }
  } catch (error: any) {
    addResult(
      'Campus Isolation',
      false,
      `Campus isolation error: ${error.message}`
    );
  }
}

async function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('SECURITY TEST SUMMARY');
  console.log('='.repeat(60) + '\n');

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;
  const passRate = Math.round((passed / total) * 100);

  console.log(`Total Tests: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Pass Rate: ${passRate}%\n`);

  if (failed > 0) {
    console.log('Failed Tests:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`  ❌ ${r.name}: ${r.message}`);
    });
    console.log('');
  }

  // Determine security status
  if (failed === 0) {
    console.log('🎉 ALL SECURITY TESTS PASSED! Platform is secure.');
  } else if (failed <= 2) {
    console.log('⚠️ MINOR SECURITY ISSUES detected. Please review and fix.');
  } else {
    console.log('🚨 CRITICAL SECURITY ISSUES detected! Do not deploy to production!');
  }
}

// Run all tests
async function runSecurityTests() {
  console.log('🔐 HIVE Platform Security Test Suite');
  console.log('=====================================\n');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Timestamp: ${new Date().toISOString()}\n`);

  await testEnvironmentVariables();
  await testFirebaseConnection();
  await testRateLimiting();
  await testSecurityMiddleware();
  await testCampusIsolation();
  await printSummary();

  // Exit with appropriate code
  const failed = results.filter(r => !r.passed).length;
  process.exit(failed > 0 ? 1 : 0);
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection in security test:', error);
  process.exit(1);
});

// Run tests
runSecurityTests().catch((error) => {
  console.error('Security test suite failed:', error);
  process.exit(1);
});