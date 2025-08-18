#!/usr/bin/env node

/**
 * Standardize API response formats across all routes
 * Fixes the highest priority inconsistencies identified in the analysis
 */

const fs = require('fs');
const path = require('path');

function standardizeApiRoute(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // 1. Add import for standardized response types (if not already present)
    if (!content.includes('ApiResponseHelper') && !content.includes('HttpStatus')) {
      const imports = content.match(/^import.*from.*$/gm) || [];
      if (imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        const importToAdd = `import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";`;
        content = content.replace(lastImport, lastImport + '\n' + importToAdd);
        hasChanges = true;
      }
    }
    
    // 2. Standardize error responses - Replace inconsistent error formats
    const errorPatterns = [
      // Pattern: { error: "message" } -> ApiResponseHelper.error()
      {
        pattern: /return NextResponse\.json\(\s*\{\s*error:\s*["']([^"']+)["']\s*\},\s*\{\s*status:\s*(\d+)\s*\}\s*\);/g,
        replacement: (match, errorMsg, statusCode) => {
          const errorCode = getErrorCodeForStatus(statusCode);
          return `return NextResponse.json(ApiResponseHelper.error("${errorMsg}", "${errorCode}"), { status: ${statusCode} });`;
        }
      },
      // Pattern: { valid: false, error: "message" } -> ApiResponseHelper.error()
      {
        pattern: /return NextResponse\.json\(\s*\{\s*valid:\s*false,\s*error:\s*["']([^"']+)["']\s*\},\s*\{\s*status:\s*(\d+)\s*\}\s*\);/g,
        replacement: (match, errorMsg, statusCode) => {
          const errorCode = getErrorCodeForStatus(statusCode);
          return `return NextResponse.json(ApiResponseHelper.error("${errorMsg}", "${errorCode}"), { status: ${statusCode} });`;
        }
      }
    ];
    
    errorPatterns.forEach(({ pattern, replacement }) => {
      if (typeof replacement === 'function') {
        content = content.replace(pattern, replacement);
      } else {
        content = content.replace(pattern, replacement);
      }
      hasChanges = true;
    });
    
    // 3. Standardize success responses for arrays
    const successArrayPattern = /return NextResponse\.json\(([^,\)]+),\s*\{\s*status:\s*200\s*\}\);/g;
    content = content.replace(successArrayPattern, (match, dataVar) => {
      // Only replace if it's likely an array or simple data response
      if (dataVar.trim().match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/) || dataVar.includes('[]')) {
        hasChanges = true;
        return `return NextResponse.json(ApiResponseHelper.success(${dataVar}), { status: HttpStatus.OK });`;
      }
      return match;
    });
    
    // 4. Standardize auth header checking patterns
    const authPatterns = [
      // Standardize single quotes to double quotes
      {
        pattern: /authHeader\?\.startsWith\('Bearer '\)/g,
        replacement: 'authHeader?.startsWith("Bearer ")'
      },
      // Standardize token extraction method
      {
        pattern: /authHeader\.split\("Bearer "\)\[1\]/g,
        replacement: 'authHeader.substring(7)'
      },
      {
        pattern: /authHeader\.split\('Bearer '\)\[1\]/g,
        replacement: 'authHeader.substring(7)'
      }
    ];
    
    authPatterns.forEach(({ pattern, replacement }) => {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        hasChanges = true;
      }
    });
    
    // 5. Standardize status code constants
    const statusCodeReplacements = [
      { pattern: /status:\s*400/g, replacement: 'status: HttpStatus.BAD_REQUEST' },
      { pattern: /status:\s*401/g, replacement: 'status: HttpStatus.UNAUTHORIZED' },
      { pattern: /status:\s*403/g, replacement: 'status: HttpStatus.FORBIDDEN' },
      { pattern: /status:\s*404/g, replacement: 'status: HttpStatus.NOT_FOUND' },
      { pattern: /status:\s*422/g, replacement: 'status: HttpStatus.UNPROCESSABLE_ENTITY' },
      { pattern: /status:\s*500/g, replacement: 'status: HttpStatus.INTERNAL_SERVER_ERROR' },
      { pattern: /status:\s*200/g, replacement: 'status: HttpStatus.OK' },
      { pattern: /status:\s*201/g, replacement: 'status: HttpStatus.CREATED' }
    ];
    
    statusCodeReplacements.forEach(({ pattern, replacement }) => {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        hasChanges = true;
      }
    });
    
    // Check if any changes were made
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Standardized: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error standardizing ${filePath}:`, error.message);
    return false;
  }
}

// Helper function to get appropriate error code for status
function getErrorCodeForStatus(status) {
  switch (status) {
    case '400': return 'INVALID_INPUT';
    case '401': return 'UNAUTHORIZED';
    case '403': return 'FORBIDDEN';
    case '404': return 'RESOURCE_NOT_FOUND';
    case '422': return 'VALIDATION_ERROR';
    case '500': return 'INTERNAL_ERROR';
    default: return 'UNKNOWN_ERROR';
  }
}

function getAllApiRoutes(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllApiRoutes(fullPath, arrayOfFiles);
    } else if (file === 'route.ts') {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function main() {
  console.log('🔧 Standardizing API Response Formats');
  console.log('=====================================\n');
  
  const apiDir = 'apps/web/src/app/api';
  let totalStandardized = 0;
  let totalFiles = 0;
  
  if (!fs.existsSync(apiDir)) {
    console.error(`❌ API directory not found: ${apiDir}`);
    return;
  }
  
  const allApiRoutes = getAllApiRoutes(apiDir);
  
  console.log(`Found ${allApiRoutes.length} API route files to standardize\n`);
  
  allApiRoutes.forEach(filePath => {
    totalFiles++;
    if (standardizeApiRoute(filePath)) {
      totalStandardized++;
    }
  });
  
  console.log(`\n🎯 Summary: Standardized ${totalStandardized} out of ${totalFiles} API route files`);
  
  if (totalStandardized > 0) {
    console.log('\n📋 Next steps:');
    console.log('1. Test the build to ensure no breaking changes');
    console.log('2. Run type checking to verify TypeScript compatibility');
    console.log('3. Update frontend code to handle new standardized response formats');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { standardizeApiRoute };