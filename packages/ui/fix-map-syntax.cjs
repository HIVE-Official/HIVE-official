#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Emergency fix script for corrupted .map() syntax
 * Fixes pattern: "        }}" -> "        })"
 * This is a targeted fix for the systematic corruption
 */

function fixMapSyntax(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Pattern 1: Fix map closure with return statement
        // "            );\n        }}" -> "            );\n        })"
        let fixed = content.replace(
            /(\s+\);\s*\n\s+)\}\}/g,
            '$1})'
        );

        // Pattern 2: Fix map closure without return statement
        // "        }}" (at end of map) -> "        })"
        fixed = fixed.replace(
            /(\s+)\}\}(\s*\n\s*[<}])/g,
            '$1})$2'
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

// Main execution
console.log('🔧 EMERGENCY UI SYNTAX FIX');
console.log('Fixing corrupted .map() syntax patterns...\n');

const srcDir = './src';
const files = findTsxFiles(srcDir);

let fixedCount = 0;
let totalFiles = files.length;

for (const file of files) {
    if (fixMapSyntax(file)) {
        fixedCount++;
    }
}

console.log(`\n📊 RESULTS:`);
console.log(`Files processed: ${totalFiles}`);
console.log(`Files fixed: ${fixedCount}`);
console.log(`\n🔍 Testing build...`);

// Test the build
const { execSync } = require('child_process');
try {
    execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'inherit' });
    console.log('\n✅ TypeScript compilation successful!');
} catch (error) {
    console.log('\n❌ Still have TypeScript errors - may need manual fixes');
}