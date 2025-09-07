#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all warnings from eslint
function getWarnings() {
  try {
    const output = execSync('NODE_OPTIONS="--max-old-space-size=4096" npx eslint . --format=json', {
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024 * 50, // 50MB buffer
      stdio: ['pipe', 'pipe', 'ignore'] // Ignore stderr
    });
    return JSON.parse(output);
  } catch (error) {
    if (error.stdout) {
      try {
        return JSON.parse(error.stdout);
      } catch {
        console.log('Could not parse ESLint output');
        return [];
      }
    }
    return [];
  }
}

// Fix unused variables by prefixing with underscore
function fixUnusedVars(filePath, messages) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  const unusedVars = messages.filter(m => 
    m.ruleId === '@typescript-eslint/no-unused-vars' && 
    m.message.includes('Allowed unused')
  );
  
  // Sort by line/column in reverse to avoid position shifts
  unusedVars.sort((a, b) => {
    if (b.line !== a.line) return b.line - a.line;
    return b.column - a.column;
  });
  
  for (const warning of unusedVars) {
    const varMatch = warning.message.match(/'([^']+)'/);
    if (!varMatch) continue;
    
    const varName = varMatch[1];
    if (varName.startsWith('_')) continue; // Already prefixed
    
    // Handle different patterns
    const patterns = [
      // Destructuring assignments
      new RegExp(`(\\{[^}]*?)\\b${varName}\\b([^}]*?\\})`, 'g'),
      // Function parameters
      new RegExp(`(\\([^)]*?)\\b${varName}\\b([^)]*?\\))`, 'g'),
      // Variable declarations
      new RegExp(`(const|let|var)\\s+${varName}\\b`, 'g'),
      // Import statements
      new RegExp(`import\\s*\\{([^}]*?)\\b${varName}\\b([^}]*?)\\}`, 'g'),
      // Array destructuring
      new RegExp(`(\\[[^\\]]*?)\\b${varName}\\b([^\\]]*?\\])`, 'g'),
    ];
    
    let replaced = false;
    for (const pattern of patterns) {
      const newContent = content.replace(pattern, (match, ...args) => {
        // Special handling for imports - remove instead of prefix
        if (match.includes('import')) {
          const parts = match.match(/\{([^}]*)\}/);
          if (parts) {
            const imports = parts[1].split(',').map(s => s.trim()).filter(s => s !== varName);
            if (imports.length === 0) {
              return ''; // Remove entire import if empty
            }
            return match.replace(parts[0], `{${imports.join(', ')}}`);
          }
        }
        
        // For other cases, prefix with underscore
        return match.replace(new RegExp(`\\b${varName}\\b`), `_${varName}`);
      });
      
      if (newContent !== content) {
        content = newContent;
        replaced = true;
        modified = true;
        break;
      }
    }
    
    if (!replaced) {
      // Fallback: Simple replacement
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      const newContent = content.replace(regex, `_${varName}`);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return unusedVars.length;
  }
  
  return 0;
}

// Remove completely unused imports
function removeUnusedImports(filePath, messages) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  const unusedImports = messages.filter(m => 
    m.ruleId === '@typescript-eslint/no-unused-vars' && 
    m.message.includes('is defined but never used') &&
    m.message.includes('Allowed unused vars')
  );
  
  for (const warning of unusedImports) {
    const varMatch = warning.message.match(/'([^']+)'/);
    if (!varMatch) continue;
    
    const varName = varMatch[1];
    
    // Check if it's an import
    const importRegex = new RegExp(`import\\s*\\{([^}]*?)\\b${varName}\\b([^}]*?)\\}\\s*from\\s*['"][^'"]+['"];?`, 'g');
    content = content.replace(importRegex, (match, before, after) => {
      const otherImports = (before + after).split(',').map(s => s.trim()).filter(s => s && s !== varName);
      if (otherImports.length === 0) {
        return ''; // Remove entire import
      }
      return match.replace(/\{[^}]*\}/, `{${otherImports.join(', ')}}`);
    });
    
    // Single default import
    const defaultImportRegex = new RegExp(`import\\s+${varName}\\s+from\\s+['"][^'"]+['"];?\\n?`, 'g');
    content = content.replace(defaultImportRegex, '');
    
    modified = true;
  }
  
  if (modified) {
    // Clean up multiple blank lines
    content = content.replace(/\n\n\n+/g, '\n\n');
    fs.writeFileSync(filePath, content, 'utf-8');
    return unusedImports.length;
  }
  
  return 0;
}

// Main execution
async function main() {
  console.log('🔍 Analyzing ESLint warnings...');
  
  const results = getWarnings();
  let totalFixed = 0;
  let filesProcessed = 0;
  
  for (const file of results) {
    if (file.warningCount === 0) continue;
    
    const filePath = file.filePath;
    
    // Skip node_modules and build directories
    if (filePath.includes('node_modules') || 
        filePath.includes('.next') || 
        filePath.includes('dist') ||
        filePath.includes('.turbo')) {
      continue;
    }
    
    console.log(`📝 Processing: ${path.relative(process.cwd(), filePath)}`);
    
    // First remove unused imports
    const importsFixed = removeUnusedImports(filePath, file.messages);
    
    // Then fix remaining unused vars
    const varsFixed = fixUnusedVars(filePath, file.messages);
    
    if (importsFixed > 0 || varsFixed > 0) {
      console.log(`  ✅ Fixed ${importsFixed} imports, ${varsFixed} variables`);
      totalFixed += importsFixed + varsFixed;
      filesProcessed++;
    }
  }
  
  console.log(`\n✨ Complete! Fixed ${totalFixed} warnings in ${filesProcessed} files`);
  
  // Run lint again to show new count
  console.log('\n📊 Running lint to verify...');
  try {
    execSync('NODE_OPTIONS="--max-old-space-size=4096" pnpm lint', { stdio: 'inherit' });
  } catch {
    // Lint will "fail" if there are still warnings, but that's ok
  }
}

main().catch(console.error);