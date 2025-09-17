#!/usr/bin/env node

/**
 * Custom production build script for HIVE web app
 * Handles Windows permission issues and optimizes build process
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 HIVE Web App Production Build\n');

// Clean up problematic files
function cleanupFiles() {
  console.log('🧹 Cleaning up build files...');
  
  const filesToRemove = [
    '.next/trace',
    '.next/cache',
  ];
  
  filesToRemove.forEach(file => {
    const fullPath = path.join(__dirname, file);
    try {
      if (fs.existsSync(fullPath)) {
        if (fs.lstatSync(fullPath).isDirectory()) {
          fs.rmSync(fullPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(fullPath);
        }
        console.log(`✅ Removed ${file}`);
      }
    } catch (error) {
      console.log(`⚠️  Could not remove ${file}: ${error.message}`);
    }
  });
}

// Create .next directory safely
function ensureBuildDir() {
  const nextDir = path.join(__dirname, '.next');
  if (!fs.existsSync(nextDir)) {
    fs.mkdirSync(nextDir, { recursive: true });
    console.log('✅ Created .next directory');
  }
}

// Run the build
function runBuild() {
  return new Promise((resolve, reject) => {
    console.log('🔨 Starting Next.js build...');
    
    const env = {
      ...process.env,
      NODE_ENV: 'production',
      NEXT_TELEMETRY_DISABLED: '1',
      SKIP_ENV_VALIDATION: 'true',
    };
    
    const buildProcess = spawn('npx', ['next', 'build'], {
      env,
      stdio: 'inherit',
      shell: true,
      cwd: __dirname
    });
    
    buildProcess.on('error', (error) => {
      console.error('❌ Build error:', error);
      reject(error);
    });
    
    buildProcess.on('exit', (code) => {
      if (code === 0) {
        console.log('✅ Build completed successfully!');
        resolve();
      } else {
        console.error(`❌ Build failed with code ${code}`);
        reject(new Error(`Build failed with code ${code}`));
      }
    });
  });
}

// Run build process
async function main() {
  try {
    cleanupFiles();
    ensureBuildDir();
    await runBuild();
    
    console.log('\n🎉 Production build completed successfully!');
    console.log('📦 Build artifacts are in .next directory');
    console.log('🚀 Ready for deployment');
    
  } catch (error) {
    console.error('\n💥 Build failed:', error.message);
    process.exit(1);
  }
}

main();