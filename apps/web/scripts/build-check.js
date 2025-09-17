#!/usr/bin/env node

/**
 * HIVE Build Environment Check & Setup
 * 
 * This script ensures the environment is properly configured before building.
 * It validates environment variables, sets up safe build configurations,
 * and handles different deployment scenarios.
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env files
function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    const envContent = fs.readFileSync(filePath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').replace(/^["'](.*)["']$/, '$1');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
}

// Load environment files in order of precedence
loadEnvFile(path.join(__dirname, '../.env.local'));
loadEnvFile(path.join(__dirname, '../.env.development'));
loadEnvFile(path.join(__dirname, '../../../.env.development'));
loadEnvFile(path.join(__dirname, '../../../.env.build'));

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

const checks = {
  envSecurity: false,
  envVariables: false,
  tsConfig: false,
  nextConfig: false,
  gitignore: false,
  firebaseConfig: false
};

log('🔧 HIVE Build Environment Check', 'cyan');
log('=====================================', 'cyan');

// Determine environment
const environment = process.env.NODE_ENV || 'development';
const vercelEnv = process.env.VERCEL_ENV;
const forceUnsafeBuild = process.env.FORCE_BUILD === 'true';

let targetEnv = 'development';
if (vercelEnv === 'production') targetEnv = 'production';
else if (vercelEnv === 'preview') targetEnv = 'staging';
else if (environment === 'production') targetEnv = 'production';

log(`Environment: ${environment}`, 'blue');
log(`Target Environment: ${targetEnv}`, 'blue');

// Check 1: Environment Variables
log('\n🔐 Checking environment variables:', 'yellow');
const requiredPublicVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

const missingVars = [];
requiredPublicVars.forEach(varName => {
  if (process.env[varName]) {
    log(`✅ ${varName}`, 'green');
  } else {
    log(`❌ ${varName} missing`, 'red');
    missingVars.push(varName);
  }
});

if (missingVars.length === 0) {
  checks.envVariables = true;
  log('✅ Environment variables check passed', 'green');
} else if (targetEnv === 'production' && !forceUnsafeBuild) {
  log('❌ Production builds require all environment variables', 'red');
  process.exit(1);
} else {
  log('⚠️  Some environment variables missing (development fallbacks will be used)', 'yellow');
  checks.envVariables = true;
}

// Set build-safe defaults
if (!process.env.NEXT_PUBLIC_APP_URL) {
  const defaultUrl = targetEnv === 'production' 
    ? 'https://hive-ui.vercel.app' 
    : 'http://localhost:3000';
  process.env.NEXT_PUBLIC_APP_URL = defaultUrl;
  log(`📱 Set NEXT_PUBLIC_APP_URL: ${defaultUrl}`, 'green');
}

// Firebase Admin safe defaults for build
if (!process.env.FIREBASE_PROJECT_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  process.env.FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
}

// Set build optimization flags
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.SKIP_ENV_VALIDATION = 'true';

// Check 2: Environment file security
try {
  const envLocalPath = path.join(__dirname, '../.env.local');
  if (fs.existsSync(envLocalPath)) {
    log('⚠️  .env.local file detected', 'yellow');
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    if (envContent.includes('BEGIN PRIVATE KEY') && targetEnv === 'production') {
      log('🚨 WARNING: Private keys in .env.local for production build', 'red');
      if (!forceUnsafeBuild) {
        log('Use environment variables for production deployment', 'red');
        process.exit(1);
      }
    }
  }
  checks.envSecurity = true;
  log('✅ Environment security check passed', 'green');
} catch (error) {
  log(`❌ Environment security check failed: ${error.message}`, 'red');
}

// Check 2: TypeScript configuration
try {
  const tsConfigPath = path.join(__dirname, '../tsconfig.json');
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
  
  if (tsConfig.compilerOptions.strict !== true) {
    console.log('❌ TypeScript strict mode is not enabled');
  } else if (tsConfig.compilerOptions.noEmitOnError !== true) {
    console.log('❌ TypeScript noEmitOnError is not enabled');
  } else {
    checks.tsConfig = true;
    console.log('✅ TypeScript configuration check passed');
  }
} catch (error) {
  console.log('❌ TypeScript configuration check failed:', error.message);
}

// Check 3: Next.js configuration
try {
  const nextConfigPath = path.join(__dirname, '../next.config.mjs');
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  if (nextConfigContent.includes('ignoreBuildErrors: true')) {
    console.log('❌ Next.js is ignoring build errors');
  } else if (nextConfigContent.includes('ignoreDuringBuilds: true')) {
    console.log('❌ Next.js is ignoring ESLint during builds');
  } else {
    checks.nextConfig = true;
    console.log('✅ Next.js configuration check passed');
  }
} catch (error) {
  console.log('❌ Next.js configuration check failed:', error.message);
}

// Check 4: Gitignore security
try {
  const gitignorePath = path.join(__dirname, '../../.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    if (!gitignoreContent.includes('.env.local') || !gitignoreContent.includes('*.key')) {
      console.log('⚠️  Gitignore may not be protecting sensitive files');
    } else {
      checks.gitignore = true;
      console.log('✅ Gitignore security check passed');
    }
  }
} catch (error) {
  console.log('❌ Gitignore check failed:', error.message);
}

// Summary
log('\n📊 Build Environment Summary:', 'cyan');
const passedChecks = Object.values(checks).filter(Boolean).length;
const totalChecks = Object.keys(checks).length;

log(`✅ Passed: ${passedChecks}/${totalChecks} checks`, 'green');

if (passedChecks === totalChecks) {
  log('🎉 All environment checks passed!', 'green');
  log('Proceeding with Next.js build...', 'cyan');
  log('=====================================\n', 'cyan');
  process.exit(0);
} else {
  log('⚠️  Some checks failed.', 'yellow');
  if (targetEnv === 'production' && !forceUnsafeBuild) {
    log('❌ Production builds require all checks to pass.', 'red');
    log('Use FORCE_BUILD=true to override (not recommended)', 'yellow');
    process.exit(1);
  } else {
    log('Continuing with development build...', 'yellow');
    log('=====================================\n', 'cyan');
    process.exit(0);
  }
}