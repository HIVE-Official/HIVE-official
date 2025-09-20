#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Phase 2: Fix remaining syntax corruption patterns
 * Based on error analysis, these patterns need fixing:
 * 1. Missing closing braces: "})" -> "}}"
 * 2. Missing semicolons and closing parens
 * 3. Malformed JSX closing tags
 */

function fixRemainingPatterns(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        let fixed = content;

        // Pattern 1: Fix missing closing brace + paren for JSX blocks
        // "          }}\n        </div>" -> "          }})\n        </div>"
        fixed = fixed.replace(
            /(\s+)\}\}(\s*\n\s*<\/)/g,
            '$1}})$2'
        );

        // Pattern 2: Fix object destructuring with missing closing brace
        // "  } }" -> "  })"  (when it's the end of a function parameter)
        fixed = fixed.replace(
            /(\{\s*[^}]+\s*)\s\}(\s*=>)/g,
            '$1}$2'
        );

        // Pattern 3: Fix malformed conditional expressions
        // Fix lines that end with "}}" when they should end with "})"
        fixed = fixed.replace(
            /(\s+className.*?)\}\}(\s*$)/gm,
            '$1})$2'
        );

        // Pattern 4: Fix function calls missing closing paren
        // "someFunction(" -> "someFunction(),"
        // Look for function calls that seem incomplete
        fixed = fixed.replace(
            /(\w+\()\s*(\n\s*[},])/g,
            '$1)$2'
        );

        // Only write if changed
        if (fixed !== content) {
            fs.writeFileSync(filePath, fixed, 'utf8');
            console.log(`✅ Fixed: ${filePath}`);
            return true;
        }

        return false;
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
        return false;
    }
}

function findTsxFiles(dir) {
    const files = [];

    function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                traverse(fullPath);
            } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
                files.push(fullPath);
            }
        }
    }

    traverse(dir);
    return files;
}

// Get files with compilation errors first
function getFilesWithErrors() {
    const { execSync } = require('child_process');
    try {
        const output = execSync('npx tsc --noEmit --skipLibCheck 2>&1', { encoding: 'utf8' });
        const errorFiles = new Set();

        // Extract file paths from TypeScript errors
        const lines = output.split('\n');
        for (const line of lines) {
            const match = line.match(/^([^(]+\.tsx?)\(/);
            if (match) {
                errorFiles.add(match[1]);
            }
        }

        return Array.from(errorFiles);
    } catch (error) {
        // If tsc fails, return all files
        return findTsxFiles('./src');
    }
}

// Main execution
console.log('🔧 PHASE 2: REMAINING SYNTAX FIXES');
console.log('Targeting files with TypeScript compilation errors...\n');

const errorFiles = getFilesWithErrors();
console.log(`Found ${errorFiles.length} files with errors\n`);

let fixedCount = 0;

for (const file of errorFiles) {
    if (fixRemainingPatterns(file)) {
        fixedCount++;
    }
}

console.log(`\n📊 PHASE 2 RESULTS:`);
console.log(`Files with errors: ${errorFiles.length}`);
console.log(`Files fixed: ${fixedCount}`);

if (fixedCount > 0) {
    console.log(`\n🔍 Testing build after fixes...`);

    // Test the build
    try {
        execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'inherit' });
        console.log('\n✅ TypeScript compilation successful!');
    } catch (error) {
        console.log('\n🔄 Still have errors - may need manual fixes or additional patterns');

        // Show remaining error count
        try {
            const output = execSync('npx tsc --noEmit --skipLibCheck 2>&1 | grep "error TS" | wc -l', { encoding: 'utf8' });
            console.log(`Remaining errors: ${output.trim()}`);
        } catch (e) {
            // Ignore
        }
    }
} else {
    console.log('\n⚠️ No additional automatic fixes applied');
    console.log('Remaining errors may require manual intervention');
}