#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

console.log('🔧 HIVE HTML Entity Fixer');
console.log('=====================================');

// HTML entities to fix
const htmlEntities = {
  '&apos;': "'",
  '&quot;': '"',
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
  '&#39;': "'",
  '&#34;': '"',
};

function fixHtmlEntities(content) {
  let fixed = content;
  let changesMade = false;
  
  for (const [entity, replacement] of Object.entries(htmlEntities)) {
    if (fixed.includes(entity)) {
      fixed = fixed.replaceAll(entity, replacement);
      changesMade = true;
    }
  }
  
  return { content: fixed, changed: changesMade };
}

async function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: fixedContent, changed } = fixHtmlEntities(content);
    
    if (changed) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  const patterns = [
    'apps/web/src/**/*.{ts,tsx,js,jsx}',
    'apps/admin/src/**/*.{ts,tsx,js,jsx}',
    'packages/*/src/**/*.{ts,tsx,js,jsx}'
  ];
  
  let totalFiles = 0;
  let fixedFiles = 0;
  
  for (const pattern of patterns) {
    console.log(`\n🔍 Processing: ${pattern}`);
    
    try {
      const files = await glob(pattern, { cwd: process.cwd() });
      
      for (const file of files) {
        totalFiles++;
        const wasFixed = await processFile(file);
        if (wasFixed) {
          fixedFiles++;
        }
      }
      
    } catch (error) {
      console.error(`Error processing pattern ${pattern}:`, error.message);
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`• Total files processed: ${totalFiles}`);
  console.log(`• Files fixed: ${fixedFiles}`);
  console.log(`• Files unchanged: ${totalFiles - fixedFiles}`);
  
  if (fixedFiles > 0) {
    console.log('\n✅ HTML entity fixes completed successfully!');
    console.log('💡 Next: Run pnpm lint to check for remaining issues');
  } else {
    console.log('\n🎉 No HTML entity issues found!');
  }
}

main().catch(console.error);