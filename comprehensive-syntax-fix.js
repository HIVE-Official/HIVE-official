#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get all TypeScript files in packages/ui
function getAllTsFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !item.startsWith(".") &&
      item !== "node_modules" &&
      item !== "dist"
    ) {
      files.push(...getAllTsFiles(fullPath));
    } else if (item.endsWith(".tsx") || item.endsWith(".ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;
  let originalContent = content;

  try {
    // Pattern 1: Fix missing closing parentheses in onChange handlers
    const onChangePattern = /onChange=\{\(e\) => ([^}]+)\}\}/g;
    content = content.replace(onChangePattern, (match, inner) => {
      if (!inner.trim().endsWith("}")) {
        modified = true;
        return `onChange={(e) => ${inner.trim()}}}`;
      }
      return match;
    });

    // Pattern 2: Fix missing closing parentheses in function calls
    const functionCallPattern = /([a-zA-Z_][a-zA-Z0-9_]*)\(\{([^}]+)\}\}/g;
    content = content.replace(functionCallPattern, (match, funcName, args) => {
      if (!args.trim().endsWith("}")) {
        modified = true;
        return `${funcName}({${args.trim()} })}`;
      }
      return match;
    });

    // Pattern 3: Fix missing commas in object destructuring
    const destructuringPattern = /const \{([^}]+)\} =/g;
    content = content.replace(destructuringPattern, (match, props) => {
      const fixedProps = props.replace(
        /([a-zA-Z_][a-zA-Z0-9_]*)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g,
        "$1, $2"
      );
      if (fixedProps !== props) {
        modified = true;
        return `const {${fixedProps}} =`;
      }
      return match;
    });

    // Pattern 4: Fix malformed try-catch blocks
    const tryCatchPattern =
      /try \{([\s\S]*?)\} catch \(([^)]*)\) \{([\s\S]*?)\}/g;
    content = content.replace(
      tryCatchPattern,
      (match, tryBlock, catchParam, catchBlock) => {
        if (!catchParam.trim()) {
          modified = true;
          return `try {${tryBlock}} catch (error) {${catchBlock}}`;
        }
        return match;
      }
    );

    // Pattern 5: Fix malformed map functions
    const mapPattern = /\.map\(([^)]+)\s*=>\s*\{([^}]*)\}\s*\)/g;
    content = content.replace(mapPattern, (match) => {
      if (!match.endsWith("})}")) {
        modified = true;
        return match.slice(0, -1) + ")}";
      }
      return match;
    });

    // Pattern 6: Fix malformed JSX with missing closing tags
    const jsxPattern = /<([A-Za-z][A-Za-z0-9]*)(\s+[^>]*)?>(.*?)<\/\1>/gs;
    content = content.replace(jsxPattern, (match, tag, attrs, inner) => {
      const openCount = (inner.match(new RegExp(`<${tag}`, "g")) || []).length;
      const closeCount = (inner.match(new RegExp(`</${tag}`, "g")) || [])
        .length;

      if (openCount > closeCount) {
        modified = true;
        return `<${tag}${attrs || ""}>${inner}</${tag}>`;
      }
      return match;
    });

    // Pattern 7: Fix missing export keywords
    const exportPattern = /^(\s*)(const|function|interface|type|enum)/gm;
    content = content.replace(exportPattern, (match, indent, keyword) => {
      if (!match.includes("export") && !match.includes("import")) {
        if (
          keyword === "const" &&
          match.includes("=") &&
          !match.includes("useState") &&
          !match.includes("useEffect")
        ) {
          modified = true;
          return `${indent}export ${match.slice(indent.length)}`;
        }
      }
      return match;
    });

    // Pattern 8: Fix malformed object literals
    const objectPattern = /\{([^}]*)\}\s*\)/g;
    content = content.replace(objectPattern, (match) => {
      if (match.endsWith(")")) {
        const inner = match.slice(1, -2);
        if (inner.trim().endsWith("}")) {
          modified = true;
          return `{${inner.trim()}})`;
        }
      }
      return match;
    });

    // Pattern 9: Fix missing semicolons at end of statements
    const statementPattern = /([a-zA-Z_][a-zA-Z0-9_]*)\s*$/gm;
    content = content.replace(statementPattern, (match, statement) => {
      if (
        !match.includes(";") &&
        !match.includes("{") &&
        !match.includes("}")
      ) {
        modified = true;
        return `${statement};`;
      }
      return match;
    });

    // Pattern 10: Fix missing commas in function parameters
    const paramPattern = /function ([a-zA-Z_][a-zA-Z0-9_]*)\(([^)]*)\)/g;
    content = content.replace(paramPattern, (match, funcName, params) => {
      const fixedParams = params.replace(
        /([a-zA-Z_][a-zA-Z0-9_]*)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g,
        "$1, $2"
      );
      if (fixedParams !== params) {
        modified = true;
        return `function ${funcName}(${fixedParams})`;
      }
      return match;
    });

    // Pattern 11: Fix missing closing braces in arrow functions
    const arrowPattern = /=>\s*\{([^}]*)\}\s*$/gm;
    content = content.replace(arrowPattern, (match) => {
      if (!match.endsWith("}}")) {
        modified = true;
        return match + "}";
      }
      return match;
    });

    // Pattern 12: Fix malformed interface declarations
    const interfacePattern = /interface ([A-Za-z][A-Za-z0-9]*) \{([^}]*)\}/g;
    content = content.replace(
      interfacePattern,
      (match, interfaceName, body) => {
        if (!body.trim().endsWith("}")) {
          modified = true;
          return `interface ${interfaceName} {${body.trim()}}`;
        }
        return match;
      }
    );

    // Pattern 13: Fix malformed type declarations
    const typePattern = /type ([A-Za-z][A-Za-z0-9]*) = \{([^}]*)\}/g;
    content = content.replace(typePattern, (match, typeName, body) => {
      if (!body.trim().endsWith("}")) {
        modified = true;
        return `type ${typeName} = {${body.trim()}}`;
      }
      return match;
    });

    // Pattern 14: Fix malformed enum declarations
    const enumPattern = /enum ([A-Za-z][A-Za-z0-9]*) \{([^}]*)\}/g;
    content = content.replace(enumPattern, (match, enumName, body) => {
      if (!body.trim().endsWith("}")) {
        modified = true;
        return `enum ${enumName} {${body.trim()}}`;
      }
      return match;
    });

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`Fixed: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    if (content !== originalContent) {
      fs.writeFileSync(filePath, originalContent, "utf8");
    }
    return false;
  }
}

// Main execution
const packagesUiDir = path.join(__dirname, "packages", "ui", "src");
if (!fs.existsSync(packagesUiDir)) {
  console.error("packages/ui/src directory not found");
  process.exit(1);
}

const tsFiles = getAllTsFiles(packagesUiDir);
console.log(`Found ${tsFiles.length} TypeScript files to check...`);

let fixedCount = 0;
let errorCount = 0;

// Process files in very small batches to avoid memory issues
const batchSize = 10;
for (let i = 0; i < tsFiles.length; i += batchSize) {
  const batch = tsFiles.slice(i, i + batchSize);
  console.log(
    `Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(
      tsFiles.length / batchSize
    )} (${i + 1}-${Math.min(i + batchSize, tsFiles.length)} files)...`
  );

  for (const file of batch) {
    try {
      if (fixFile(file)) {
        fixedCount++;
      }
    } catch (error) {
      errorCount++;
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Small delay between batches to prevent memory buildup
  if (i + batchSize < tsFiles.length) {
    console.log("Pausing briefly between batches...");
    // Don't use setTimeout as it might cause issues, just continue
  }
}

console.log(`\n✅ Fixed ${fixedCount} files`);
if (errorCount > 0) {
  console.log(`❌ ${errorCount} files had errors during processing`);
}

console.log("\nAttempting to build UI package...");

// Try to build again with memory-efficient settings
try {
  const { execSync } = require("child_process");
  execSync("cd packages/ui && npm run build", {
    stdio: "inherit",
    cwd: __dirname,
    timeout: 300000,
    env: { ...process.env, NODE_OPTIONS: "--max-old-space-size=4096" },
  });
  console.log("\n🎉 Build successful!");
} catch (error) {
  console.log("\n❌ Build still has errors. Manual fixes may be needed.");
  console.log("Check the error output above for remaining issues.");
}

console.log("\nDone!");

