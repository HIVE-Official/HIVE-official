#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get all .tsx files in packages/ui
function getAllTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllTsxFiles(fullPath));
    } else if (item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }

  return files;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pattern 1: Fix unterminated regex literals (common issue with template literals)
  const regexPattern = /`[^`]*\/[^`\/\n]*$/gm;
  if (regexPattern.test(content)) {
    console.log(`Potential regex issue in: ${path.relative(process.cwd(), filePath)}`);
  }

  // Pattern 2: Fix })} in object literal contexts where it should be }}
  // Look for specific object property patterns that should end with }}
  const objectPropPattern = /(style|className|animate|initial|exit|transition|whileHover|whileTap)\s*=\s*\{[^}]*\{[^}]*\}\)\}/g;
  content = content.replace(objectPropPattern, (match) => {
    if (match.endsWith('})}}')) {
      return match.slice(0, -3) + '}}';
    }
    return match.slice(0, -3) + '}}';
  });

  // Pattern 3: Fix array method callbacks that should end with })}
  const arrayMethodPattern = /\.(map|filter|forEach|reduce)\s*\([^}]*=>\s*\{[^}]*\}\s*\)/g;
  content = content.replace(arrayMethodPattern, (match) => {
    if (!match.endsWith('})}')) {
      return match.slice(0, -1) + ')}';
    }
    return match;
  });

  // Pattern 4: Fix specific } vs )} issues in JSX
  // Look for lines that have incorrect closing in JSX context
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for style props with incorrect closing
    if (line.includes('style={{') && line.includes('})')) {
      const corrected = line.replace(/\}\)\}/g, '}}');
      if (corrected !== line) {
        lines[i] = corrected;
        modified = true;
      }
    }

    // Check for className with cn() function calls
    if (line.includes('className={cn(') && line.includes('})')) {
      // Only replace if it's not inside a map/filter/forEach
      if (!line.includes('.map(') && !line.includes('.filter(') && !line.includes('.forEach(')) {
        const corrected = line.replace(/\}\)\}/g, '}}');
        if (corrected !== line) {
          lines[i] = corrected;
          modified = true;
        }
      }
    }
  }

  if (modified) {
    content = lines.join('\n');
  }

  // Pattern 5: Check for template literal issues that cause "unterminated regexp"
  const templateLiteralPattern = /`[^`]*\/[^`]*`/g;
  const matches = content.match(templateLiteralPattern);
  if (matches) {
    for (const match of matches) {
      // Look for potential regex-like patterns in template literals
      if (match.includes('/') && !match.includes('//') && !match.includes('/*')) {
        console.log(`Potential template literal regex issue: ${match} in ${path.relative(process.cwd(), filePath)}`);
      }
    }
  }

  // Pattern 6: Fix semicolon issues (Expected ',', got ';')
  content = content.replace(/;(\s*\})/g, '$1');

  if (content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }

  return false;
}

// Main execution
const packagesUiDir = path.join(__dirname, 'packages', 'ui', 'src');
if (!fs.existsSync(packagesUiDir)) {
  console.error('packages/ui/src directory not found');
  process.exit(1);
}

const tsxFiles = getAllTsxFiles(packagesUiDir);
console.log(`Found ${tsxFiles.length} .tsx files`);

let fixedCount = 0;
for (const file of tsxFiles) {
  if (fixFile(file)) {
    fixedCount++;
  }
}

console.log(`\nFixed ${fixedCount} files`);
console.log('Done!');