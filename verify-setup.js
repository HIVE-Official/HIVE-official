#!/usr/bin/env node

/**
 * HIVE Platform Setup Verification Script
 * Checks that everything is properly configured and ready
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.blue}═══ ${msg} ═══${colors.reset}\n`)
};

let errors = 0;
let warnings = 0;

// Check if file exists
function checkFile(filePath, description, required = true) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log.success(`${description}: ${filePath}`);
    return true;
  } else if (required) {
    log.error(`${description} missing: ${filePath}`);
    errors++;
    return false;
  } else {
    log.warning(`${description} optional file missing: ${filePath}`);
    warnings++;
    return false;
  }
}

// Check environment variables
function checkEnvVars() {
  log.section('Environment Variables');
  
  const envFile = path.join(__dirname, 'apps', 'web', '.env.local');
  
  if (!fs.existsSync(envFile)) {
    log.error('No .env.local file found. Copy .env.example to .env.local and configure it.');
    errors++;
    return;
  }
  
  const envContent = fs.readFileSync(envFile, 'utf8');
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'FIREBASE_PROJECT_ID',
    'NEXTAUTH_SECRET'
  ];
  
  requiredVars.forEach(varName => {
    if (envContent.includes(`${varName}=`)) {
      const match = envContent.match(new RegExp(`${varName}=(.+)`));
      if (match && match[1] && match[1].trim()) {
        // Check if it's using hive-9265c
        if (varName.includes('PROJECT_ID') && match[1].includes('hive-9265c')) {
          log.success(`${varName} configured with hive-9265c`);
        } else if (varName.includes('PROJECT_ID')) {
          log.warning(`${varName} not using hive-9265c: ${match[1]}`);
          warnings++;
        } else {
          log.success(`${varName} is set`);
        }
      } else {
        log.error(`${varName} is empty`);
        errors++;
      }
    } else {
      log.error(`${varName} is missing`);
      errors++;
    }
  });
}

// Check Firebase configuration
function checkFirebaseConfig() {
  log.section('Firebase Configuration');
  
  // Check Firebase project ID consistency
  const files = [
    'apps/web/.env.local',
    'apps/web/.env.production',
    '.env.example',
    '.env.production'
  ];
  
  let projectIds = new Set();
  
  files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const match = content.match(/FIREBASE_PROJECT_ID=([^\s\n]+)/);
      if (match && match[1]) {
        projectIds.add(match[1]);
        log.info(`${file}: PROJECT_ID = ${match[1]}`);
      }
    }
  });
  
  if (projectIds.size === 1 && projectIds.has('hive-9265c')) {
    log.success('All files use consistent Firebase project: hive-9265c');
  } else if (projectIds.size > 1) {
    log.warning(`Multiple Firebase projects configured: ${Array.from(projectIds).join(', ')}`);
    warnings++;
  }
}

// Check critical files
function checkCriticalFiles() {
  log.section('Critical Files');
  
  const criticalFiles = [
    ['package.json', 'Root package.json'],
    ['apps/web/package.json', 'Web app package.json'],
    ['apps/web/next.config.mjs', 'Next.js configuration'],
    ['apps/web/src/app/layout.tsx', 'Root layout'],
    ['apps/web/src/lib/firebase.ts', 'Firebase client'],
    ['apps/web/src/lib/firebase-admin.ts', 'Firebase admin'],
    ['packages/ui/src/index.ts', 'UI components exports'],
    ['turbo.json', 'Turborepo configuration']
  ];
  
  criticalFiles.forEach(([file, desc]) => {
    checkFile(path.join(__dirname, file), desc);
  });
}

// Check dependencies
function checkDependencies() {
  log.section('Dependencies');
  
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredDeps = [
    'turbo',
    'next',
    'react',
    'firebase',
    'firebase-admin'
  ];
  
  const allDeps = {
    ...packageJson.dependencies || {},
    ...packageJson.devDependencies || {}
  };
  
  // Check web app deps too
  const webPackageJsonPath = path.join(__dirname, 'apps', 'web', 'package.json');
  if (fs.existsSync(webPackageJsonPath)) {
    const webPackageJson = JSON.parse(fs.readFileSync(webPackageJsonPath, 'utf8'));
    Object.assign(allDeps, webPackageJson.dependencies || {});
  }
  
  requiredDeps.forEach(dep => {
    const found = Object.keys(allDeps).some(key => key.includes(dep));
    if (found) {
      log.success(`${dep} installed`);
    } else {
      log.error(`${dep} not found in dependencies`);
      errors++;
    }
  });
}

// Check API routes
function checkAPIRoutes() {
  log.section('API Routes');
  
  const apiDir = path.join(__dirname, 'apps', 'web', 'src', 'app', 'api');
  
  if (!fs.existsSync(apiDir)) {
    log.error('API directory not found');
    errors++;
    return;
  }
  
  const criticalRoutes = [
    'auth',
    'spaces',
    'posts',
    'events',
    'feed',
    'profile',
    'tools'
  ];
  
  criticalRoutes.forEach(route => {
    const routePath = path.join(apiDir, route);
    if (fs.existsSync(routePath)) {
      log.success(`API route exists: /api/${route}`);
    } else {
      log.warning(`API route missing: /api/${route}`);
      warnings++;
    }
  });
}

// Check UI components
function checkUIComponents() {
  log.section('UI Components');
  
  const uiIndexPath = path.join(__dirname, 'packages', 'ui', 'src', 'index.ts');
  
  if (!fs.existsSync(uiIndexPath)) {
    log.error('UI index file not found');
    errors++;
    return;
  }
  
  const uiIndex = fs.readFileSync(uiIndexPath, 'utf8');
  const requiredExports = [
    'Button',
    'Input',
    'Card',
    'Badge',
    'Alert',
    'SchoolPick',
    'ProfileDashboard'
  ];
  
  requiredExports.forEach(component => {
    if (uiIndex.includes(`export`) && uiIndex.includes(component)) {
      log.success(`${component} component exported`);
    } else {
      log.error(`${component} component not exported`);
      errors++;
    }
  });
}

// Main verification
function main() {
  console.log(`\n${colors.cyan}🔍 HIVE Platform Setup Verification${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  checkEnvVars();
  checkFirebaseConfig();
  checkCriticalFiles();
  checkDependencies();
  checkAPIRoutes();
  checkUIComponents();
  
  // Final report
  log.section('Verification Summary');
  
  if (errors === 0 && warnings === 0) {
    log.success('✨ Perfect! Everything is properly configured!');
    log.info('Run "npm run dev" to start the development server');
  } else if (errors === 0) {
    log.warning(`Setup complete with ${warnings} warning(s)`);
    log.info('The platform should work but review warnings above');
  } else {
    log.error(`Setup incomplete: ${errors} error(s), ${warnings} warning(s)`);
    log.info('Fix the errors above before running the platform');
  }
  
  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  process.exit(errors > 0 ? 1 : 0);
}

// Run verification
main();