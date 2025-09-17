#!/usr/bin/env node

/**
 * Production Safety Check Script
 * Run this before building for production to ensure no dev features are exposed
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 Running Production Safety Checks...\n');

let hasErrors = false;
const warnings = [];

// Check 1: Ensure environment variables don't have dev flags
function checkEnvVars() {
  console.log('Checking environment variables...');
  
  if (process.env.NEXT_PUBLIC_ENABLE_DEV_AUTO_LOGIN === 'true') {
    console.error('❌ ERROR: NEXT_PUBLIC_ENABLE_DEV_AUTO_LOGIN is set to true!');
    console.error('   This MUST be removed or set to false for production builds.');
    hasErrors = true;
  }
  
  if (process.env.NODE_ENV === 'development' && process.env.VERCEL) {
    warnings.push('NODE_ENV is set to development but VERCEL env var is present');
  }
  
  console.log('✅ Environment variables check complete\n');
}

// Check 2: Scan code for dangerous patterns
function scanForDangerousPatterns() {
  console.log('Scanning code for dangerous patterns...');
  
  const dangerousPatterns = [
    { pattern: /signInAnonymously/g, message: 'Anonymous sign-in found' },
    { pattern: /skipAuth/gi, message: 'Auth skipping code found' },
    { pattern: /DEV_MODE.*=.*true/g, message: 'DEV_MODE flag found' },
    { pattern: /process\.env\.NODE_ENV\s*===\s*['"]development['"]/g, message: 'Direct NODE_ENV check found' },
    { pattern: /localStorage\.setItem\(['"]dev_/g, message: 'Dev localStorage usage found' },
  ];
  
  const filesToCheck = [
    'src/app',
    'src/components',
    'src/lib'
  ];
  
  function scanFile(filePath) {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    dangerousPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(content)) {
        // Only warn if it's not wrapped in isLocalDevelopment check
        if (!content.includes('isLocalDevelopment()')) {
          warnings.push(`${message} in ${filePath}`);
        }
      }
    });
  }
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else {
        scanFile(fullPath);
      }
    });
  }
  
  filesToCheck.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      scanDirectory(fullPath);
    }
  });
  
  console.log('✅ Code scan complete\n');
}

// Check 3: Verify build configuration
function checkBuildConfig() {
  console.log('Checking build configuration...');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Check if build script has safety checks
  if (!packageJson.scripts.build || !packageJson.scripts.build.includes('NODE_ENV=production')) {
    warnings.push('Build script should explicitly set NODE_ENV=production');
  }
  
  // Check next.config.mjs for dangerous settings
  const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
  if (fs.existsSync(nextConfigPath)) {
    const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
    
    if (nextConfig.includes('reactStrictMode: false')) {
      warnings.push('React strict mode is disabled in next.config.mjs');
    }
  }
  
  console.log('✅ Build configuration check complete\n');
}

// Run all checks
checkEnvVars();
scanForDangerousPatterns();
checkBuildConfig();

// Report results
console.log('='.repeat(50));
console.log('\n📊 PRODUCTION SAFETY CHECK RESULTS:\n');

if (hasErrors) {
  console.error('❌ CRITICAL ERRORS FOUND!');
  console.error('   The build MUST NOT proceed to production with these issues.\n');
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn('⚠️  Warnings found:');
  warnings.forEach(warning => {
    console.warn(`   - ${warning}`);
  });
  console.warn('\n   Please review these warnings before deploying to production.\n');
} else {
  console.log('✅ All production safety checks passed!');
  console.log('   The build is safe to deploy to production.\n');
}

console.log('='.repeat(50));