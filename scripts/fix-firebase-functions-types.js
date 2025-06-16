#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Common pattern replacements for Firebase Functions
const REPLACEMENTS = [
  // Replace unsafe firebase imports
  {
    pattern: /import \* as logger from ['"]firebase-functions\/logger['"];?/g,
    replacement: `import { logger } from './types/firebase';`,
  },
  {
    pattern: /import \* as admin from ['"]firebase-admin['"];?/g,
    replacement: `import * as admin from 'firebase-admin';\nimport { firestore, getDocumentData, assertAuthenticated, type FunctionContext } from './types/firebase';`,
  },

  // Replace unsafe context usage
  {
    pattern: /const uid = context\.auth\.uid;/g,
    replacement: `assertAuthenticated(context);\n  const uid = context.auth.uid;`,
  },
  {
    pattern: /const userId = context\.auth\.uid;/g,
    replacement: `assertAuthenticated(context);\n  const userId = context.auth.uid;`,
  },

  // Replace unsafe data access
  {
    pattern: /const (\w+) = (\w+)\.data\(\);/g,
    replacement: `const $1 = getDocumentData($2);`,
  },
  {
    pattern: /(\w+)\.data\(\)/g,
    replacement: `getDocumentData($1)`,
  },

  // Replace unsafe firestore calls
  {
    pattern: /admin\.firestore\(\)/g,
    replacement: `firestore()`,
  },
  {
    pattern: /db = admin\.firestore\(\);/g,
    replacement: `db = firestore();`,
  },

  // Replace unsafe logger calls
  {
    pattern: /console\.log\(/g,
    replacement: `logger.info(`,
  },
  {
    pattern: /console\.error\(/g,
    replacement: `logger.error(`,
  },
  {
    pattern: /console\.warn\(/g,
    replacement: `logger.warn(`,
  },
  {
    pattern: /functions\.logger\.info\(/g,
    replacement: `logger.info(`,
  },
  {
    pattern: /functions\.logger\.error\(/g,
    replacement: `logger.error(`,
  },
  {
    pattern: /functions\.logger\.warn\(/g,
    replacement: `logger.warn(`,
  },

  // Replace unsafe auth checks
  {
    pattern: /if \(!context\.auth\) \{[\s\S]*?\}/g,
    replacement: `assertAuthenticated(context);`,
  },

  // Replace unsafe parameter access
  {
    pattern: /const (\w+) = (\w+)\.params\.(\w+);/g,
    replacement: `const $1 = $2.params.$3 as string;`,
  },
  {
    pattern: /(\w+)\.params\.(\w+)/g,
    replacement: `$1.params.$2 as string`,
  },
];

// Function to apply replacements to a file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;

    // Apply each replacement pattern
    for (const { pattern, replacement } of REPLACEMENTS) {
      const originalContent = content;
      content = content.replace(pattern, replacement);
      if (content !== originalContent) {
        modified = true;
      }
    }

    // Add type imports if not present and file was modified
    if (modified && !content.includes("./types/firebase")) {
      // Add import at the top after existing imports
      const importLines = content
        .split("\n")
        .filter((line) => line.startsWith("import"));
      const nonImportLines = content
        .split("\n")
        .filter((line) => !line.startsWith("import"));

      if (importLines.length > 0) {
        importLines.push(
          `import { logger, firestore, getDocumentData, assertAuthenticated, type FunctionContext } from './types/firebase';`
        );
        content = [...importLines, "", ...nonImportLines].join("\n");
      }
    }

    // Write back to file if modified
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
function main() {
  const functionsDir = path.join(__dirname, "../functions/src");

  if (!fs.existsSync(functionsDir)) {
    console.error("❌ Functions directory not found:", functionsDir);
    process.exit(1);
  }

  // Find all TypeScript files in functions/src
  const pattern = path.join(functionsDir, "**/*.ts");
  const files = glob.sync(pattern);

  console.log(`🔍 Found ${files.length} TypeScript files in functions/src`);

  let fixedCount = 0;
  let errorCount = 0;

  for (const file of files) {
    // Skip type definition files
    if (file.includes("/types/") || file.endsWith(".d.ts")) {
      continue;
    }

    const fixed = fixFile(file);
    if (fixed) {
      fixedCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Fixed: ${fixedCount} files`);
  console.log(`   Total: ${files.length} files processed`);

  if (fixedCount > 0) {
    console.log(`\n⚠️  Remember to:`);
    console.log(`   1. Run 'npm install glob' if not already installed`);
    console.log(
      `   2. Verify the changes with 'npx eslint functions/src --max-warnings 50'`
    );
    console.log(`   3. Test your functions before deployment`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixFile, REPLACEMENTS };
