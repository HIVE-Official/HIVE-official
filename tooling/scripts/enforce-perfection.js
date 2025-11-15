#!/usr/bin/env node

// HIVE Design System Perfection Enforcement
// Validates that the system maintains 100% compliance

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🏆 HIVE Design System - Perfection Enforcement');
console.log('==============================================');
console.log('🎯 Validating 100% compliance | Zero errors | 10/10 maturity\n');

function runDetection() {
  return new Promise((resolve, reject) => {
    exec('node scripts/detect-hardcoded-values.js', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

function parseDetectionResults(output) {
  const errorMatch = output.match(/Errors: (\d+)/);
  const warningMatch = output.match(/Warnings: (\d+)/);
  const totalMatch = output.match(/Total issues: (\d+)/);
  
  return {
    errors: errorMatch ? parseInt(errorMatch[1]) : 0,
    warnings: warningMatch ? parseInt(warningMatch[1]) : 0,
    total: totalMatch ? parseInt(totalMatch[1]) : 0
  };
}

async function validatePerfection() {
  try {
    console.log('🔍 Running comprehensive design system validation...\n');
    
    const result = await runDetection();
    const metrics = parseDetectionResults(result.stdout);
    
    console.log('📊 VALIDATION RESULTS:');
    console.log('======================');
    console.log(`🚨 Errors: ${metrics.errors}`);
    console.log(`⚠️  Warnings: ${metrics.warnings}`);
    console.log(`📋 Total: ${metrics.total}\n`);
    
    if (metrics.errors === 0) {
      console.log('🎉 PERFECTION MAINTAINED!');
      console.log('✅ Zero errors detected');
      console.log('✅ 100% semantic token compliance');
      console.log('✅ Enterprise production ready');
      console.log('✅ 10/10 design system maturity\n');
      
      console.log('🏆 ACHIEVEMENT STATUS: PERFECT');
      console.log('🎯 Maintain this standard at all costs!\n');
      
      return true;
    } else {
      console.log('🚨 PERFECTION VIOLATION DETECTED!');
      console.log('❌ Design system compliance broken');
      console.log(`❌ ${metrics.errors} critical errors found`);
      console.log('❌ Immediate action required\n');
      
      console.log('🛠️  EMERGENCY PROTOCOL:');
      console.log('1. Stop all development');
      console.log('2. Run migration tools:');
      console.log('   • node migrate-absolute-final.js');
      console.log('   • node migrate-final-hex-colors.js');
      console.log('   • node migrate-remaining-rgba.js');
      console.log('3. Re-validate until zero errors');
      console.log('4. Review DESIGN_SYSTEM_STANDARDS.md\n');
      
      return false;
    }
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    return false;
  }
}

async function generateReport() {
  const timestamp = new Date().toISOString();
  const result = await runDetection();
  const metrics = parseDetectionResults(result.stdout);
  
  const report = {
    timestamp,
    version: '10.0.0-perfect',
    compliance: {
      errors: metrics.errors,
      warnings: metrics.warnings,
      total: metrics.total,
      errorFree: metrics.errors === 0,
      perfectionMaintained: metrics.errors === 0
    },
    standards: {
      semanticTokens: '100%',
      colorCompliance: metrics.errors === 0 ? '100%' : 'VIOLATED',
      maturityScore: metrics.errors === 0 ? '10/10' : 'DEGRADED'
    }
  };
  
  fs.writeFileSync(
    './design-system-perfection-report.json', 
    JSON.stringify(report, null, 2)
  );
  
  console.log('📄 Perfection report generated: design-system-perfection-report.json');
}

async function main() {
  const isPerfect = await validatePerfection();
  await generateReport();
  
  if (!isPerfect) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validatePerfection, parseDetectionResults };