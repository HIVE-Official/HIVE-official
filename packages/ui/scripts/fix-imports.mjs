#!/usr/bin/env node
/**
 * Fix import paths in feature stories to point to correct atomic component locations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Map of component names to their actual locations in src/atomic/
const componentLocationMap = {
  // Atoms
  'alert': '../../atomic/atoms/alert',
  'avatar': '../../atomic/atoms/avatar',
  'badge': '../../atomic/atoms/badge',
  'button': '../../atomic/atoms/button',
  'card': '../../atomic/atoms/card',
  'check-icon': '../../atomic/atoms/check-icon',
  'checkbox': '../../atomic/atoms/checkbox',
  'command': '../../atomic/atoms/command',
  'dialog': '../../atomic/atoms/dialog',
  'grid': '../../atomic/atoms/grid',
  'hive-button': '../../atomic/atoms/hive-button',
  'hive-card': '../../atomic/atoms/hive-card',
  'hive-confirm-modal': '../../atomic/atoms/hive-confirm-modal',
  'hive-input': '../../atomic/atoms/hive-input',
  'hive-logo-dynamic': '../../atomic/atoms/hive-logo-dynamic',
  'hive-logo': '../../atomic/atoms/hive-logo',
  'hive-modal': '../../atomic/atoms/hive-modal',
  'hive-progress': '../../atomic/atoms/hive-progress',
  'input-enhanced': '../../atomic/atoms/input-enhanced',
  'input': '../../atomic/atoms/input',
  'label': '../../atomic/atoms/label',
  'notification-bell': '../../atomic/atoms/notification-bell',
  'notification-item': '../../atomic/atoms/notification-item',
  'presence-indicator': '../../atomic/atoms/presence-indicator',
  'progress': '../../atomic/atoms/progress',
  'select': '../../atomic/atoms/select',
  'simple-avatar': '../../atomic/atoms/simple-avatar',
  'skeleton': '../../atomic/atoms/skeleton',
  'skip-nav': '../../atomic/atoms/skip-nav',
  'slider': '../../atomic/atoms/slider',
  'switch': '../../atomic/atoms/switch',
  'tabs': '../../atomic/atoms/tabs',
  'tech-sleek-showcase': '../../atomic/atoms/tech-sleek-showcase',
  'textarea-enhanced': '../../atomic/atoms/textarea-enhanced',
  'textarea': '../../atomic/atoms/textarea',
  'top-bar-nav': '../../atomic/atoms/top-bar-nav',
  'universal-atoms': '../../atomic/atoms/universal-atoms',
  'navigation-preferences': '../../atomic/atoms/navigation-preferences',

  // Molecules
  'completion-psychology-enhancer': '../../atomic/molecules/completion-psychology-enhancer',
  'crisis-relief-interface': '../../atomic/molecules/crisis-relief-interface',
  'form-field': '../../atomic/molecules/form-field',
  'friend-request-manager': '../../atomic/molecules/friend-request-manager',
  'hive-avatar-upload-with-crop': '../../atomic/molecules/hive-avatar-upload-with-crop',
  'interest-selector': '../../atomic/molecules/interest-selector',
  'notification-dropdown': '../../atomic/molecules/notification-dropdown',
  'notification-toast-manager': '../../atomic/molecules/notification-toast-manager',
  'page-container': '../../atomic/molecules/page-container',
  'photo-carousel': '../../atomic/molecules/photo-carousel',
  'privacy-control': '../../atomic/molecules/privacy-control',
  'social-proof-accelerator': '../../atomic/molecules/social-proof-accelerator',

  // Organisms
  'complete-hive-tools-system': '../../atomic/organisms/complete-hive-tools-system',
  'hivelab-widget': '../../atomic/organisms/hivelab-widget',
  'navigation-shell': '../../atomic/organisms/navigation-shell',
  'notification-system': '../../atomic/organisms/notification-system',
  'profile-activity-widget': '../../atomic/organisms/profile-activity-widget',
  'profile-bento-grid': '../../atomic/organisms/profile-bento-grid',
  'profile-completion-card': '../../atomic/organisms/profile-completion-card',
  'profile-connections-widget': '../../atomic/organisms/profile-connections-widget',
  'profile-identity-widget': '../../atomic/organisms/profile-identity-widget',
  'profile-spaces-widget': '../../atomic/organisms/profile-spaces-widget',
  'welcome-mat': '../../atomic/organisms/welcome-mat',

  // Templates
  'profile-view-layout': '../../atomic/templates/profile-view-layout',
};

// Find all story files using find command
const featuresDir = path.join(__dirname, '..', 'src', 'features');
const storyFiles = execSync(`find "${featuresDir}" -name "*.stories.tsx"`, { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean);

console.log(`Found ${storyFiles.length} story files to fix\n`);

let fixedCount = 0;
let errorCount = 0;

for (const storyFile of storyFiles) {
  try {
    let content = fs.readFileSync(storyFile, 'utf-8');
    let modified = false;

    // Find all import statements with relative paths
    const importRegex = /import\s+({[^}]+}|[^{}\s]+)\s+from\s+['"]\.\/([^'"]+)['"]/g;

    content = content.replace(importRegex, (match, importedItems, componentPath) => {
      // Check if this component is in our map
      if (componentLocationMap[componentPath]) {
        modified = true;
        const correctPath = componentLocationMap[componentPath];
        console.log(`  ${path.basename(storyFile)}: ./${componentPath} → ${correctPath}`);
        return `import ${importedItems} from '${correctPath}'`;
      }
      return match;
    });

    if (modified) {
      fs.writeFileSync(storyFile, content, 'utf-8');
      fixedCount++;
    }
  } catch (error) {
    console.error(`Error processing ${storyFile}:`, error);
    errorCount++;
  }
}

console.log(`\n✅ Fixed ${fixedCount} story files`);
if (errorCount > 0) {
  console.log(`❌ Failed to fix ${errorCount} files`);
}
