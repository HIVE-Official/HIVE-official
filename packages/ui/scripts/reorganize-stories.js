#!/usr/bin/env node
/* eslint-env node */
/**
 * Reorganize Storybook stories from atomic design to vertical slices (features)
 *
 * This script:
 * 1. Reads all existing story files
 * 2. Maps them to product features
 * 3. Copies them to feature folders
 * 4. Updates story titles to match feature organization
 */

const fs = require('fs');
const path = require('path');

// Feature mapping based on component names
const FEATURE_MAP = {
  // 01-Onboarding
  'onboarding': '01-Onboarding',
  'welcome': '01-Onboarding',
  'interest-selector': '01-Onboarding',
  'completion-psychology': '01-Onboarding',
  'hive-progress': '01-Onboarding',

  // 02-Profile
  'profile': '02-Profile',
  'avatar': '02-Profile',
  'presence-indicator': '02-Profile',

  // 03-Spaces
  'space': '03-Spaces',
  'photo-carousel': '03-Spaces',
  'privacy-control': '03-Spaces',

  // 04-Feed
  // (to be added)

  // 05-HiveLab
  'hivelab': '05-HiveLab',
  'tool': '05-HiveLab',

  // 06-Rituals
  'ritual': '06-Rituals',

  // 07-Notifications
  'notification': '07-Notifications',

  // 08-Navigation
  'navigation': '08-Navigation',
  'top-bar-nav': '08-Navigation',
  'skip-nav': '08-Navigation',

  // 09-Social
  'friend-request': '09-Social',
  'social-proof': '09-Social',
  'crisis-relief': '09-Social',

  // 10-Forms
  'form-field': '10-Forms',
  'input': '10-Forms',
  'textarea': '10-Forms',
  'checkbox': '10-Forms',
  'select': '10-Forms',
  'slider': '10-Forms',
  'switch': '10-Forms',
  'label': '10-Forms',
  'command': '10-Forms',

  // 11-Shared (everything else)
  'button': '11-Shared',
  'card': '11-Shared',
  'modal': '11-Shared',
  'dialog': '11-Shared',
  'alert': '11-Shared',
  'badge': '11-Shared',
  'progress': '11-Shared',
  'skeleton': '11-Shared',
  'tabs': '11-Shared',
  'grid': '11-Shared',
  'page-container': '11-Shared',
  'hive-logo': '11-Shared',
  'check-icon': '11-Shared',
  'tech-sleek': '11-Shared',
  'universal-atoms': '11-Shared',
};

function getFeatureFolder(filename) {
  const baseName = path.basename(filename, '.stories.tsx').toLowerCase();

  // Check each feature keyword
  for (const [keyword, feature] of Object.entries(FEATURE_MAP)) {
    if (baseName.includes(keyword)) {
      return feature;
    }
  }

  // Default to Shared for unmatched components
  return '11-Shared';
}

function updateStoryTitle(content, filename, feature) {
  const componentName = path.basename(filename, '.stories.tsx')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Update the title to feature-based path
  return content.replace(
    /title:\s*['"]([^'"]+)['"]/,
    `title: '${feature}/${componentName}'`
  );
}

function main() {
  const srcDir = path.join(__dirname, '../src');
  const atomicDir = path.join(srcDir, 'atomic');
  const featuresDir = path.join(srcDir, 'features');

  console.log('🔄 Reorganizing Storybook stories to vertical slices...\n');

  // Find all story files in atomic folder
  const findStories = (dir) => {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files.push(...findStories(fullPath));
      } else if (item.name.endsWith('.stories.tsx')) {
        files.push(fullPath);
      }
    }

    return files;
  };

  const storyFiles = findStories(atomicDir);
  console.log(`Found ${storyFiles.length} story files\n`);

  const stats = {
    copied: 0,
    skipped: 0,
    errors: 0,
  };

  for (const storyFile of storyFiles) {
    try {
      const feature = getFeatureFolder(storyFile);
      const filename = path.basename(storyFile);
      const targetDir = path.join(featuresDir, feature);
      const targetFile = path.join(targetDir, filename);

      // Read and update content
      let content = fs.readFileSync(storyFile, 'utf8');
      content = updateStoryTitle(content, storyFile, feature);

      // Ensure target directory exists
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Write updated story
      fs.writeFileSync(targetFile, content);
      console.log(`✅ ${filename} → ${feature}/`);
      stats.copied++;

    } catch (error) {
      console.error(`❌ Error processing ${path.basename(storyFile)}:`, error.message);
      stats.errors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Copied: ${stats.copied}`);
  console.log(`   Errors: ${stats.errors}`);
  console.log(`\n✅ Reorganization complete!`);
  console.log(`\nNext steps:`);
  console.log(`1. Review stories in src/features/`);
  console.log(`2. Update .storybook/main.ts story patterns`);
  console.log(`3. Restart Storybook to see changes`);
}

main();
