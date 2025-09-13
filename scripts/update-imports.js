#!/usr/bin/env node

/**
 * Script to update all bridge imports to direct atomic component paths
 * This ensures consistency and removes unnecessary indirection
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Import mappings from bridge files to direct paths
const importMappings = {
  // components/ui mappings
  "'../../components/ui/alert'": "'../../atomic/molecules/alert-toast-system'",
  "'../../../components/ui/alert'": "'../../../atomic/molecules/alert-toast-system'",
  "'../../components/ui/avatar'": "'../../atomic/atoms/avatar'",
  "'../../../components/ui/avatar'": "'../../../atomic/atoms/avatar'",
  "'../../components/ui/badge'": "'../../atomic/atoms/badge'",
  "'../../../components/ui/badge'": "'../../../atomic/atoms/badge'",
  "'../../components/ui/button'": "'../../atomic/atoms/button-enhanced'",
  "'../../../components/ui/button'": "'../../../atomic/atoms/button-enhanced'",
  "'../../components/ui/card'": "'../../atomic/ui/card'",
  "'../../../components/ui/card'": "'../../../atomic/ui/card'",
  "'../components/ui/card'": "'../atomic/ui/card'",
  "'../../components/ui/input'": "'../../atomic/atoms/input-enhanced'",
  "'../../../components/ui/input'": "'../../../atomic/atoms/input-enhanced'",
  "'../../components/ui/switch'": "'../../atomic/atoms/switch-enhanced'",
  "'../../../components/ui/switch'": "'../../../atomic/atoms/switch-enhanced'",
  "'../../components/ui/tabs'": "'../../atomic/ui/tabs'",
  "'../../../components/ui/tabs'": "'../../../atomic/ui/tabs'",
  "'../../components/ui/textarea'": "'../../atomic/atoms/textarea-enhanced'",
  "'../../../components/ui/textarea'": "'../../../atomic/atoms/textarea-enhanced'",
  "'../../components/ui/typography'": "'../../atomic/atoms/typography'",
  "'../../../components/ui/typography'": "'../../../atomic/atoms/typography'",
  
  // components/hive- bridge mappings (only true bridges)
  "'../components/hive-card'": "'../atomic/ui/card'",
  "'../../components/hive-card'": "'../../atomic/ui/card'",
  "'../../../components/hive-card'": "'../../../atomic/ui/card'",
  "'../components/hive-button'": "'../atomic/atoms/button-enhanced'",
  "'../../components/hive-button'": "'../../atomic/atoms/button-enhanced'",
  "'../../../components/hive-button'": "'../../../atomic/atoms/button-enhanced'",
  
  // Also handle double quotes
  '"../../components/ui/alert"': '"../../atomic/molecules/alert-toast-system"',
  '"../../../components/ui/alert"': '"../../../atomic/molecules/alert-toast-system"',
  '"../../components/ui/avatar"': '"../../atomic/atoms/avatar"',
  '"../../../components/ui/avatar"': '"../../../atomic/atoms/avatar"',
  '"../../components/ui/badge"': '"../../atomic/atoms/badge"',
  '"../../../components/ui/badge"': '"../../../atomic/atoms/badge"',
  '"../../components/ui/button"': '"../../atomic/atoms/button-enhanced"',
  '"../../../components/ui/button"': '"../../../atomic/atoms/button-enhanced"',
  '"../../components/ui/card"': '"../../atomic/ui/card"',
  '"../../../components/ui/card"': '"../../../atomic/ui/card"',
  '"../components/ui/card"': '"../atomic/ui/card"',
  '"../../components/ui/input"': '"../../atomic/atoms/input-enhanced"',
  '"../../../components/ui/input"': '"../../../atomic/atoms/input-enhanced"',
  '"../../components/ui/switch"': '"../../atomic/atoms/switch-enhanced"',
  '"../../../components/ui/switch"': '"../../../atomic/atoms/switch-enhanced"',
  '"../../components/ui/tabs"': '"../../atomic/ui/tabs"',
  '"../../../components/ui/tabs"': '"../../../atomic/ui/tabs"',
  '"../../components/ui/textarea"': '"../../atomic/atoms/textarea-enhanced"',
  '"../../../components/ui/textarea"': '"../../../atomic/atoms/textarea-enhanced"',
  '"../../components/ui/typography"': '"../../atomic/atoms/typography"',
  '"../../../components/ui/typography"': '"../../../atomic/atoms/typography"',
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  for (const [oldImport, newImport] of Object.entries(importMappings)) {
    if (content.includes(oldImport)) {
      content = content.replace(new RegExp(oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newImport);
      updated = true;
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
    return true;
  }
  
  return false;
}

function main() {
  console.log('🔍 Finding all TypeScript/TSX files in packages/ui/src...');
  
  const files = glob.sync('packages/ui/src/**/*.{ts,tsx}', {
    cwd: 'C:/hive',
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**']
  });
  
  console.log(`📁 Found ${files.length} files to check`);
  
  let updatedCount = 0;
  for (const file of files) {
    if (updateFile(file)) {
      updatedCount++;
    }
  }
  
  console.log(`\n✨ Updated ${updatedCount} files with direct import paths`);
  
  // Also update any files in apps/web that might import from @hive/ui components
  console.log('\n🔍 Checking apps/web for @hive/ui imports...');
  
  const webFiles = glob.sync('apps/web/src/**/*.{ts,tsx}', {
    cwd: 'C:/hive',
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**']
  });
  
  let webUpdatedCount = 0;
  for (const file of webFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let updated = false;
    
    // Update @hive/ui imports
    if (content.includes('@hive/ui/components/ui/')) {
      content = content.replace(/@hive\/ui\/components\/ui\/button/g, '@hive/ui');
      content = content.replace(/@hive\/ui\/components\/ui\/card/g, '@hive/ui');
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Updated web file: ${file}`);
      webUpdatedCount++;
    }
  }
  
  console.log(`\n✨ Updated ${webUpdatedCount} files in apps/web`);
  console.log('\n🎉 Import update complete!');
}

// Check if glob is installed
try {
  require.resolve('glob');
  main();
} catch(e) {
  console.log('Installing glob package...');
  require('child_process').execSync('npm install glob', { stdio: 'inherit' });
  main();
}