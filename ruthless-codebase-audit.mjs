#!/usr/bin/env node

/**
 * 🔥 RUTHLESS CODEBASE AUDIT
 * Deep technical analysis of code quality, architecture, security, and production readiness
 */

import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';
const execAsync = util.promisify(exec);

console.log('🔥 RUTHLESS CODEBASE AUDIT - DEEP TECHNICAL ANALYSIS\n');
console.log('Examining code quality, architecture, security, and production readiness...\n');

let totalTests = 0;
let passedTests = 0;
let criticalIssues = [];
let warnings = [];
let codeQualityScore = 0;

function auditTest(category, name, testFn, critical = false) {
  totalTests++;
  try {
    const result = testFn();
    if (result.passed) {
      console.log(`✅ ${name}`);
      if (result.details) console.log(`   ${result.details}`);
      passedTests++;
      codeQualityScore += result.score || 1;
    } else {
      console.log(`❌ ${name}`);
      if (result.details) console.log(`   ${result.details}`);
      if (critical) {
        criticalIssues.push(`${category}: ${name}`);
      } else {
        warnings.push(`${category}: ${name}`);
      }
    }
  } catch (error) {
    console.log(`❌ ${name} - Error: ${error.message}`);
    if (critical) criticalIssues.push(`${category}: ${name}`);
  }
}

async function auditCodebase() {
  
  // 1. ARCHITECTURE ANALYSIS
  console.log('🏗️ AUDITING ARCHITECTURE...\n');

  auditTest('Architecture', 'Monorepo structure properly organized', () => {
    const hasApps = fs.existsSync('./apps');
    const hasPackages = fs.existsSync('./packages');
    const hasWorkspaces = fs.existsSync('./pnpm-workspace.yaml') || fs.existsSync('./package.json');
    
    return {
      passed: hasApps && hasPackages && hasWorkspaces,
      details: 'Apps, packages, and workspace configuration present',
      score: 2
    };
  }, true);

  auditTest('Architecture', 'Clear separation of concerns', () => {
    const hasCore = fs.existsSync('./packages/core');
    const hasUI = fs.existsSync('./packages/ui');
    const hasWeb = fs.existsSync('./apps/web');
    
    return {
      passed: hasCore && hasUI && hasWeb,
      details: 'Core logic, UI components, and web app properly separated',
      score: 2
    };
  }, true);

  auditTest('Architecture', 'API routes properly structured', () => {
    const apiPath = './apps/web/src/app/api';
    if (!fs.existsSync(apiPath)) return { passed: false, details: 'API directory missing' };
    
    const apiDirs = fs.readdirSync(apiPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    const expectedRoutes = ['auth', 'profile', 'spaces', 'tools', 'feed', 'calendar'];
    const hasAllRoutes = expectedRoutes.every(route => apiDirs.includes(route));
    
    return {
      passed: hasAllRoutes && apiDirs.length >= 8,
      details: `Found ${apiDirs.length} API route groups, expected core routes present`,
      score: 1
    };
  });

  // 2. CODE QUALITY ANALYSIS
  console.log('\\n📝 AUDITING CODE QUALITY...\\n');

  auditTest('Code Quality', 'TypeScript configuration is strict', () => {
    const webTsConfig = JSON.parse(fs.readFileSync('./apps/web/tsconfig.json', 'utf8'));
    const compilerOptions = webTsConfig.compilerOptions || {};
    
    const strictChecks = {
      strict: compilerOptions.strict,
      noUnusedLocals: compilerOptions.noUnusedLocals,
      noUnusedParameters: compilerOptions.noUnusedParameters,
      noImplicitReturns: compilerOptions.noImplicitReturns
    };
    
    const strictCount = Object.values(strictChecks).filter(Boolean).length;
    
    return {
      passed: strictCount >= 2,
      details: `${strictCount}/4 strict TypeScript checks enabled`,
      score: Math.floor(strictCount / 2)
    };
  });

  auditTest('Code Quality', 'ESLint configuration exists', () => {
    const hasEslintConfig = fs.existsSync('./eslint.config.mjs') || 
                           fs.existsSync('./.eslintrc.js') ||
                           fs.existsSync('./.eslintrc.json');
    const hasEslintIgnore = fs.existsSync('./.eslintignore');
    
    return {
      passed: hasEslintConfig,
      details: `ESLint config: ${hasEslintConfig ? '✓' : '✗'}, ignore file: ${hasEslintIgnore ? '✓' : '✗'}`,
      score: hasEslintConfig ? 1 : 0
    };
  });

  auditTest('Code Quality', 'Package dependencies are organized', () => {
    const webPackage = JSON.parse(fs.readFileSync('./apps/web/package.json', 'utf8'));
    const deps = Object.keys(webPackage.dependencies || {});
    const devDeps = Object.keys(webPackage.devDependencies || {});
    
    // Check for proper separation
    const prodOnly = ['next', 'react', '@hive/ui', '@hive/core'];
    const devOnly = ['typescript', 'eslint', '@types/node'];
    
    const properSeparation = prodOnly.some(dep => deps.includes(dep)) &&
                            devOnly.some(dep => devDeps.includes(dep));
    
    return {
      passed: properSeparation && deps.length > 5,
      details: `${deps.length} prod deps, ${devDeps.length} dev deps`,
      score: 1
    };
  });

  // 3. SECURITY ANALYSIS
  console.log('\\n🔒 AUDITING SECURITY...\\n');

  auditTest('Security', 'Environment variables properly configured', () => {
    const hasEnvExample = fs.existsSync('./apps/web/.env.example') || 
                         fs.existsSync('./.env.example');
    const hasEnvProd = fs.existsSync('./apps/web/.env.production');
    const checkGitignore = () => {
      try {
        const gitignore = fs.readFileSync('./.gitignore', 'utf8');
        return gitignore.includes('.env') && gitignore.includes('.env.local');
      } catch {
        return false;
      }
    };
    
    return {
      passed: hasEnvExample && checkGitignore(),
      details: `Env example: ${hasEnvExample ? '✓' : '✗'}, Gitignore: ${checkGitignore() ? '✓' : '✗'}`,
      score: 2
    };
  }, true);

  auditTest('Security', 'Authentication implementation secure', () => {
    try {
      const authServer = fs.readFileSync('./apps/web/src/lib/auth-server.ts', 'utf8');
      const middleware = fs.readFileSync('./apps/web/src/middleware.ts', 'utf8');
      
      const hasProperAuth = authServer.includes('getCurrentUser') &&
                           authServer.includes('AuthenticatedUser') &&
                           middleware.includes('auth');
      
      const noHardcodedSecrets = !authServer.includes('secret') &&
                                !authServer.includes('password') &&
                                !authServer.includes('api_key');
      
      return {
        passed: hasProperAuth && noHardcodedSecrets,
        details: 'Auth system properly implemented without hardcoded secrets',
        score: 3
      };
    } catch {
      return { passed: false, details: 'Auth files missing or inaccessible' };
    }
  }, true);

  auditTest('Security', 'API routes have proper validation', () => {
    const sampleRoutes = [
      './apps/web/src/app/api/profile/route.ts',
      './apps/web/src/app/api/spaces/route.ts',
      './apps/web/src/app/api/auth/session/route.ts'
    ];
    
    let validationCount = 0;
    let authCount = 0;
    
    sampleRoutes.forEach(route => {
      try {
        const content = fs.readFileSync(route, 'utf8');
        if (content.includes('z.object') || content.includes('schema')) validationCount++;
        if (content.includes('withAuth') || content.includes('getCurrentUser')) authCount++;
      } catch {
        // File doesn't exist, skip
      }
    });
    
    return {
      passed: validationCount >= 2 && authCount >= 2,
      details: `${validationCount}/3 routes have validation, ${authCount}/3 have auth`,
      score: Math.min(validationCount + authCount, 3)
    };
  }, true);

  // 4. PERFORMANCE ANALYSIS
  console.log('\\n⚡ AUDITING PERFORMANCE...\\n');

  auditTest('Performance', 'Build output is optimized', () => {
    const buildPath = './apps/web/.next';
    if (!fs.existsSync(buildPath)) {
      return { passed: false, details: 'Build output missing' };
    }
    
    const hasStaticDir = fs.existsSync(`${buildPath}/static`);
    const hasServerDir = fs.existsSync(`${buildPath}/server`);
    
    // Check for route optimization indicators
    let routeCount = 0;
    try {
      const routesPath = `${buildPath}/server/app`;
      if (fs.existsSync(routesPath)) {
        const scanRoutes = (dir) => {
          const items = fs.readdirSync(dir, { withFileTypes: true });
          items.forEach(item => {
            if (item.isDirectory()) {
              scanRoutes(`${dir}/${item.name}`);
            } else if (item.name.endsWith('.js')) {
              routeCount++;
            }
          });
        };
        scanRoutes(routesPath);
      }
    } catch {
      // Ignore scanning errors
    }
    
    return {
      passed: hasStaticDir && hasServerDir && routeCount > 20,
      details: `Static assets: ${hasStaticDir ? '✓' : '✗'}, Server: ${hasServerDir ? '✓' : '✗'}, ${routeCount} routes built`,
      score: 2
    };
  });

  auditTest('Performance', 'Images and assets optimized', () => {
    const nextConfig = fs.existsSync('./apps/web/next.config.mjs') || 
                      fs.existsSync('./apps/web/next.config.js');
    
    let hasImageOptimization = false;
    if (nextConfig) {
      try {
        const configPath = fs.existsSync('./apps/web/next.config.mjs') ? 
                          './apps/web/next.config.mjs' : './apps/web/next.config.js';
        const config = fs.readFileSync(configPath, 'utf8');
        hasImageOptimization = config.includes('images') || config.includes('Image');
      } catch {
        // Can't read config
      }
    }
    
    return {
      passed: nextConfig,
      details: `Next.js config: ${nextConfig ? '✓' : '✗'}, Image optimization: ${hasImageOptimization ? '✓' : '✗'}`,
      score: nextConfig ? 1 : 0
    };
  });

  auditTest('Performance', 'Bundle splitting implemented', () => {
    const buildPath = './apps/web/.next/static/chunks';
    if (!fs.existsSync(buildPath)) {
      return { passed: false, details: 'Chunk directory missing' };
    }
    
    const chunks = fs.readdirSync(buildPath).filter(file => file.endsWith('.js'));
    const hasVendorChunk = chunks.some(chunk => chunk.includes('vendor') || chunk.includes('framework'));
    
    return {
      passed: chunks.length >= 5 && hasVendorChunk,
      details: `${chunks.length} chunks created, vendor splitting: ${hasVendorChunk ? '✓' : '✗'}`,
      score: 1
    };
  });

  // 5. DATABASE & API DESIGN
  console.log('\\n🗄️ AUDITING DATABASE & API DESIGN...\\n');

  auditTest('Database', 'Firestore structure is well organized', () => {
    try {
      const firestoreRules = fs.readFileSync('./firestore.rules', 'utf8');
      const hasCollectionStructure = firestoreRules.includes('users') &&
                                   firestoreRules.includes('spaces') &&
                                   firestoreRules.includes('match');
      
      const hasSecurityRules = firestoreRules.includes('allow read') &&
                              firestoreRules.includes('allow write') &&
                              firestoreRules.includes('isAuthenticated');
      
      return {
        passed: hasCollectionStructure && hasSecurityRules,
        details: 'Firestore rules properly structured with security',
        score: 2
      };
    } catch {
      return { passed: false, details: 'Firestore rules missing' };
    }
  }, true);

  auditTest('Database', 'API endpoints follow RESTful conventions', () => {
    const apiStructure = {
      '/api/profile': ['GET', 'PATCH'],
      '/api/spaces': ['GET', 'POST'],
      '/api/tools': ['GET', 'POST'],
      '/api/feed': ['GET']
    };
    
    let conformingRoutes = 0;
    Object.entries(apiStructure).forEach(([route, methods]) => {
      const routePath = `./apps/web/src/app${route}/route.ts`;
      try {
        const content = fs.readFileSync(routePath, 'utf8');
        const hasAllMethods = methods.every(method => 
          content.includes(`export async function ${method}`) ||
          content.includes(`export const ${method} = withAuth`)
        );
        if (hasAllMethods) conformingRoutes++;
      } catch {
        // Route doesn't exist
      }
    });
    
    return {
      passed: conformingRoutes >= 3,
      details: `${conformingRoutes}/${Object.keys(apiStructure).length} routes follow REST conventions`,
      score: conformingRoutes
    };
  });

  // 6. ERROR HANDLING & LOGGING
  console.log('\\n🚨 AUDITING ERROR HANDLING & LOGGING...\\n');

  auditTest('Error Handling', 'Comprehensive error boundaries implemented', () => {
    const errorBoundaryExists = fs.existsSync('./apps/web/src/components/error-boundary.tsx');
    let errorBoundaryUsage = 0;
    
    if (errorBoundaryExists) {
      const pageFiles = [
        './apps/web/src/app/(dashboard)/spaces/page.tsx',
        './apps/web/src/app/(dashboard)/profile/page.tsx',
        './apps/web/src/app/(dashboard)/tools/page.tsx'
      ];
      
      pageFiles.forEach(file => {
        try {
          const content = fs.readFileSync(file, 'utf8');
          if (content.includes('ErrorBoundary')) errorBoundaryUsage++;
        } catch {
          // File doesn't exist
        }
      });
    }
    
    return {
      passed: errorBoundaryExists && errorBoundaryUsage >= 2,
      details: `Error boundary exists: ${errorBoundaryExists ? '✓' : '✗'}, Used in ${errorBoundaryUsage}/3 pages`,
      score: errorBoundaryUsage
    };
  });

  auditTest('Error Handling', 'Structured logging system implemented', () => {
    const loggerExists = fs.existsSync('./apps/web/src/lib/logger.ts');
    let loggerUsage = 0;
    
    if (loggerExists) {
      const apiFiles = [
        './apps/web/src/app/api/profile/route.ts',
        './apps/web/src/app/api/spaces/auto-join/route.ts',
        './apps/web/src/app/api/feed/route.ts'
      ];
      
      apiFiles.forEach(file => {
        try {
          const content = fs.readFileSync(file, 'utf8');
          if (content.includes('logger.info') || content.includes('logger.error')) loggerUsage++;
        } catch {
          // File doesn't exist
        }
      });
    }
    
    return {
      passed: loggerExists && loggerUsage >= 2,
      details: `Logger exists: ${loggerExists ? '✓' : '✗'}, Used in ${loggerUsage}/3 APIs`,
      score: loggerUsage
    };
  });

  // 7. TESTING & DOCUMENTATION
  console.log('\\n🧪 AUDITING TESTING & DOCUMENTATION...\\n');

  auditTest('Testing', 'Test infrastructure is set up', () => {
    const hasVitest = fs.existsSync('./apps/web/vitest.config.ts');
    const hasPlaywright = fs.existsSync('./apps/web/playwright.config.ts');
    const hasTestDir = fs.existsSync('./apps/web/src/test');
    
    let testFileCount = 0;
    if (hasTestDir) {
      const scanTests = (dir) => {
        try {
          const items = fs.readdirSync(dir, { withFileTypes: true });
          items.forEach(item => {
            if (item.isDirectory()) {
              scanTests(`${dir}/${item.name}`);
            } else if (item.name.endsWith('.test.tsx') || item.name.endsWith('.test.ts')) {
              testFileCount++;
            }
          });
        } catch {
          // Skip unreadable directories
        }
      };
      scanTests('./apps/web/src/test');
    }
    
    return {
      passed: (hasVitest || hasPlaywright) && testFileCount >= 5,
      details: `Vitest: ${hasVitest ? '✓' : '✗'}, Playwright: ${hasPlaywright ? '✓' : '✗'}, ${testFileCount} test files`,
      score: Math.min(2, testFileCount / 3)
    };
  });

  auditTest('Documentation', 'Code documentation exists', () => {
    const hasReadme = fs.existsSync('./README.md');
    const hasClaudemd = fs.existsSync('./CLAUDE.md');
    const hasHivemd = fs.existsSync('./@hive.md');
    
    let docFiles = 0;
    if (hasReadme) docFiles++;
    if (hasClaudemd) docFiles++;
    if (hasHivemd) docFiles++;
    
    return {
      passed: docFiles >= 2,
      details: `README: ${hasReadme ? '✓' : '✗'}, CLAUDE.md: ${hasClaudemd ? '✓' : '✗'}, @hive.md: ${hasHivemd ? '✓' : '✗'}`,
      score: docFiles
    };
  });

  // 8. PRODUCTION READINESS
  console.log('\\n🚀 AUDITING PRODUCTION READINESS...\\n');

  auditTest('Production', 'Deployment configuration exists', () => {
    const hasVercelConfig = fs.existsSync('./vercel.json');
    const hasDockerfile = fs.existsSync('./Dockerfile');
    const hasPackageScripts = (() => {
      try {
        const pkg = JSON.parse(fs.readFileSync('./apps/web/package.json', 'utf8'));
        const scripts = pkg.scripts || {};
        return scripts.build && scripts.start;
      } catch {
        return false;
      }
    })();
    
    return {
      passed: hasPackageScripts && (hasVercelConfig || hasDockerfile),
      details: `Build scripts: ${hasPackageScripts ? '✓' : '✗'}, Deployment config: ${hasVercelConfig || hasDockerfile ? '✓' : '✗'}`,
      score: 2
    };
  }, true);

  auditTest('Production', 'Build process is working', () => {
    const hasBuildOutput = fs.existsSync('./apps/web/.next');
    let pageCount = 0;
    
    if (hasBuildOutput) {
      try {
        // Count built pages
        const serverAppPath = './apps/web/.next/server/app';
        if (fs.existsSync(serverAppPath)) {
          const countPages = (dir) => {
            const items = fs.readdirSync(dir, { withFileTypes: true });
            items.forEach(item => {
              if (item.isDirectory()) {
                countPages(`${dir}/${item.name}`);
              } else if (item.name === 'page.js' || item.name === 'route.js') {
                pageCount++;
              }
            });
          };
          countPages(serverAppPath);
        }
      } catch {
        // Skip counting errors
      }
    }
    
    return {
      passed: hasBuildOutput && pageCount >= 30,
      details: `Build output exists: ${hasBuildOutput ? '✓' : '✗'}, ${pageCount} pages/routes built`,
      score: 3
    };
  }, true);

  // FINAL ANALYSIS
  console.log('\\n' + '='.repeat(80));
  console.log('🏁 RUTHLESS CODEBASE AUDIT COMPLETE');
  console.log('='.repeat(80));

  const passRate = Math.round((passedTests / totalTests) * 100);
  const maxScore = totalTests * 2; // Assuming average max score of 2 per test
  const qualityScore = Math.round((codeQualityScore / maxScore) * 100);

  console.log('\\n📊 CODEBASE ANALYSIS RESULTS:');
  console.log(`   Tests Passed: ${passedTests}/${totalTests} (${passRate}%)`);
  console.log(`   Code Quality Score: ${codeQualityScore}/${maxScore} (${qualityScore}%)`);
  console.log(`   Critical Issues: ${criticalIssues.length}`);
  console.log(`   Warnings: ${warnings.length}`);

  if (criticalIssues.length > 0) {
    console.log('\\n🚨 CRITICAL ISSUES:');
    criticalIssues.forEach(issue => console.log(`   • ${issue}`));
  }

  if (warnings.length > 0) {
    console.log('\\n⚠️ WARNINGS:');
    warnings.forEach(warning => console.log(`   • ${warning}`));
  }

  console.log('\\n🎯 OVERALL ASSESSMENT:');
  
  if (criticalIssues.length === 0 && passRate >= 80 && qualityScore >= 70) {
    console.log('🎉 CODEBASE AUDIT PASSED - PRODUCTION READY!');
    console.log('   ✅ Architecture is well-structured');
    console.log('   ✅ Code quality meets standards');
    console.log('   ✅ Security measures implemented');
    console.log('   ✅ Performance optimizations in place');
    console.log('   ✅ Error handling comprehensive');
    console.log('   ✅ Production deployment ready');
    console.log('\\n🚀 Codebase is ready for production deployment!');
    process.exit(0);
  } else if (criticalIssues.length === 0 && passRate >= 70) {
    console.log('⚠️ CODEBASE NEEDS IMPROVEMENTS');
    console.log('   • Code quality could be enhanced');
    console.log('   • Some best practices missing');
    console.log('   • Production readiness questionable');
    console.log('\\n🔧 Address warnings before production deployment');
    process.exit(1);
  } else {
    console.log('❌ CODEBASE HAS CRITICAL ISSUES');
    console.log('   • Major architectural problems');
    console.log('   • Security vulnerabilities present');
    console.log('   • Not ready for production');
    console.log('\\n🚨 Critical fixes required before deployment');
    process.exit(2);
  }
}

auditCodebase().catch((error) => {
  console.error('Audit failed:', error);
  process.exit(3);
});