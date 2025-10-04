#!/usr/bin/env ts-node

/**
 * TypeScript Error Fixing Script
 * Systematically fixes common TypeScript errors in the apps/web directory
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// Pattern 1: Fix event target types
function fixEventTargetTypes(content: string): string {
  // Fix React.ChangeEvent without generics for input elements
  content = content.replace(
    /onChange=\{?\(e: React\.ChangeEvent\)/g,
    'onChange={(e: React.ChangeEvent<HTMLInputElement>)'
  );

  // Fix React.ChangeEvent for textarea elements
  content = content.replace(
    /(<textarea[\s\S]*?)onChange=\{?\(e: React\.ChangeEvent\)([\s\S]*?)\}/g,
    '$1onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)$2}'
  );

  // Fix React.ChangeEvent for select elements
  content = content.replace(
    /(<select[\s\S]*?)onChange=\{?\(e: React\.ChangeEvent\)([\s\S]*?)\}/g,
    '$1onChange={(e: React.ChangeEvent<HTMLSelectElement>)$2}'
  );

  // Fix e.target.value type assertions
  content = content.replace(
    /\be\.target\.value\b/g,
    '(e.target as HTMLInputElement).value'
  );

  // Fix e.target.checked type assertions
  content = content.replace(
    /\be\.target\.checked\b/g,
    '(e.target as HTMLInputElement).checked'
  );

  return content;
}

// Pattern 2: Fix Firebase Admin SDK property names
function fixFirebaseAdminSDK(content: string): string {
  // Fix admin.auth() to getAuth()
  content = content.replace(
    /admin\.auth\(\)/g,
    'getAuth()'
  );

  // Fix admin.firestore to getFirestore
  content = content.replace(
    /admin\.firestore\(\)/g,
    'getFirestore()'
  );

  // Fix property access patterns
  content = content.replace(
    /\.auth\.Auth/g,
    '.Auth'
  );

  content = content.replace(
    /\.firestore\.Firestore/g,
    '.Firestore'
  );

  return content;
}

// Pattern 3: Fix response formatter errors
function fixResponseFormatterErrors(content: string): string {
  // Fix status code type errors
  content = content.replace(
    /respond\.error\((\d{3})\)/g,
    'respond.error({ status: $1 })'
  );

  content = content.replace(
    /respond\.success\((\d{3})\)/g,
    'respond.success({ status: $1 })'
  );

  return content;
}

// Pattern 4: Fix missing type exports
function fixMissingExports(content: string): string {
  // Add LiveToolRuntime if missing
  if (content.includes("'LiveToolRuntime'") && !content.includes('export.*LiveToolRuntime')) {
    // This would need to be fixed in the UI package
    console.log('Note: LiveToolRuntime needs to be exported from @hive/ui');
  }

  return content;
}

// Process a single file
function processFile(filePath: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // Apply all fix patterns
    content = fixEventTargetTypes(content);
    content = fixFirebaseAdminSDK(content);
    content = fixResponseFormatterErrors(content);
    content = fixMissingExports(content);

    // Only write if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✓ Fixed: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function
function main() {
  const webDir = path.join(__dirname, 'apps', 'web', 'src');

  // Get all TypeScript files
  const files = execSync(`find ${webDir} -name "*.tsx" -o -name "*.ts"`, { encoding: 'utf-8' })
    .split('\n')
    .filter(Boolean);

  console.log(`Found ${files.length} TypeScript files to process...`);

  let fixedCount = 0;
  for (const file of files) {
    if (processFile(file)) {
      fixedCount++;
    }
  }

  console.log(`\n✓ Fixed ${fixedCount} files`);

  // Run TypeScript check to see remaining errors
  console.log('\nRunning TypeScript check...');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('✓ No TypeScript errors!');
  } catch {
    const errorCount = execSync('npx tsc --noEmit 2>&1 | grep "error TS" | wc -l', { encoding: 'utf-8' }).trim();
    console.log(`⚠ ${errorCount} TypeScript errors remaining`);
  }
}

// Run the script
if (require.main === module) {
  main();
}

export { fixEventTargetTypes, fixFirebaseAdminSDK, fixResponseFormatterErrors };