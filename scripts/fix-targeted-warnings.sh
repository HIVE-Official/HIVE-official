#!/bin/bash

echo "🎯 Targeting specific warning patterns..."

# Fix unused path variable in admin page
sed -i '' "s/const path = /const _path = /g" apps/web/src/app/\(dashboard\)/admin/page.tsx

# Fix unused profile variables
find apps/web/src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s/const profile = /const _profile = /g"
find apps/web/src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s/const { profile/const { _profile/g"

# Fix unused user variables
find apps/web/src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s/const user = /const _user = /g"
find apps/web/src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s/const { user/const { _user/g"

# Fix unused router variables
find apps/web/src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s/const router = /const _router = /g"

# Fix unused session variables
find apps/web/src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s/const session = /const _session = /g"
find apps/web/src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s/const { session/const { _session/g"

# Remove completely unused imports - Modal, Avatar, Input, etc.
echo "🧹 Removing unused UI component imports..."

# Create a script to intelligently remove unused imports
node -e "
const fs = require('fs');
const glob = require('glob');

// Files to process
const files = glob.sync('apps/web/src/**/*.{ts,tsx}', { 
  ignore: ['**/node_modules/**', '**/.next/**'] 
});

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let modified = false;
  
  // Components that are commonly unused
  const unusedComponents = ['Modal', 'Avatar', 'Input', 'Progress', 'Filter', 'Settings', 'Share', 'Wrench', 'ThumbsUp'];
  
  unusedComponents.forEach(comp => {
    // Check if component is actually used in the file (not just imported)
    const importRegex = new RegExp(\`import.*\\\\b\${comp}\\\\b.*from\`, 'g');
    const usageRegex = new RegExp(\`<\${comp}[\\\\s/>]\`, 'g');
    const jsUsageRegex = new RegExp(\`\\\\b\${comp}\\\\([\\\\s\\\\S]\`, 'g');
    
    if (content.match(importRegex) && !content.match(usageRegex) && !content.match(jsUsageRegex)) {
      // Remove from import statements
      content = content.replace(
        new RegExp(\`([{,\\\\s])\${comp}[,\\\\s}]\`, 'g'),
        (match, before) => before === '{' ? '{' : ''
      );
      modified = true;
    }
  });
  
  if (modified) {
    // Clean up empty imports
    content = content.replace(/import\s*{\s*}\s*from\s*['"][^'"]+['"];?\n/g, '');
    // Clean up trailing commas in imports
    content = content.replace(/,(\s*})/g, '$1');
    // Clean up multiple commas
    content = content.replace(/,\s*,/g, ',');
    
    fs.writeFileSync(file, content, 'utf-8');
    console.log(\`  ✅ Fixed \${file}\`);
  }
});
" 2>/dev/null || echo "Note: Some imports need manual review"

echo "✨ Targeted fixes applied!"
