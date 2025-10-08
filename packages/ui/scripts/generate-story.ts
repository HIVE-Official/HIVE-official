#!/usr/bin/env tsx

/**
 * HIVE Story Generator
 *
 * Generates Storybook stories for components with enforced HIVE standards
 *
 * Usage:
 *   tsx scripts/generate-story.ts atoms/button
 *   tsx scripts/generate-story.ts --all
 */

import * as fs from 'fs';
import * as path from 'path';

interface ComponentInfo {
  name: string;
  fileName: string;
  filePath: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'templates';
  hasForwardRef: boolean;
  exportedName: string;
}

function analyzeComponent(filePath: string): ComponentInfo | null {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.tsx');

  // Determine category from path
  const category = filePath.includes('/atoms/') ? 'atoms' :
                   filePath.includes('/molecules/') ? 'molecules' :
                   filePath.includes('/organisms/') ? 'organisms' :
                   filePath.includes('/templates/') ? 'templates' :
                   null;

  if (!category) return null;

  // Find exported component name - handle multiple patterns
  let exportedName: string | null = null;

  // Pattern 1: export const ComponentName = React.forwardRef
  let match = content.match(/export\s+const\s+(\w+)\s*=\s*React\.forwardRef/);
  if (match) exportedName = match[1];

  // Pattern 2: export const ComponentName: React.FC
  if (!exportedName) {
    match = content.match(/export\s+const\s+(\w+)\s*:\s*React\.FC/);
    if (match) exportedName = match[1];
  }

  // Pattern 3: export const ComponentName =
  if (!exportedName) {
    match = content.match(/export\s+const\s+(\w+)\s*=/);
    if (match) exportedName = match[1];
  }

  // Pattern 4: const ComponentName = ... ; export { ComponentName }
  if (!exportedName) {
    match = content.match(/const\s+(\w+)\s*=[\s\S]*?export\s*\{\s*\1\s*\}/);
    if (match) exportedName = match[1];
  }

  // If no export found, derive from filename
  if (!exportedName) {
    exportedName = fileName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  const hasForwardRef = content.includes('React.forwardRef');

  // Convert kebab-case to PascalCase
  const componentName = fileName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return {
    name: componentName,
    fileName,
    filePath,
    category,
    hasForwardRef,
    exportedName,
  };
}

function generateStory(info: ComponentInfo): string {
  const template = fs.readFileSync(
    path.join(__dirname, '../templates/story.template.tsx'),
    'utf-8'
  );

  // Replace placeholders
  const story = template
    .replace(/{{ComponentName}}/g, info.exportedName)
    .replace(/{{component-name}}/g, info.fileName)
    .replace(/{{Category}}/g, info.category.charAt(0).toUpperCase() + info.category.slice(1))
    .replace(/{{COMPONENT_DESCRIPTION}}/g, `${info.exportedName} component from HIVE design system`);

  return story;
}

function writeStory(info: ComponentInfo, content: string): void {
  const storyPath = info.filePath.replace('.tsx', '.stories.tsx');
  fs.writeFileSync(storyPath, content, 'utf-8');
  console.log(`✅ Generated story: ${storyPath}`);
}

function findAllComponents(baseDir: string): ComponentInfo[] {
  const components: ComponentInfo[] = [];

  function scan(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.name.endsWith('.tsx') && !entry.name.includes('.stories.')) {
        const info = analyzeComponent(fullPath);
        if (info) {
          components.push(info);
        }
      }
    }
  }

  scan(baseDir);
  return components;
}

// Main execution
const args = process.argv.slice(2);

if (args.includes('--all')) {
  // Generate stories for all components
  const baseDir = path.join(__dirname, '../src/atomic');
  const components = findAllComponents(baseDir);

  console.log(`\n🎨 Found ${components.length} components\n`);

  let generated = 0;
  let skipped = 0;

  for (const component of components) {
    const storyPath = component.filePath.replace('.tsx', '.stories.tsx');

    // Skip if story already exists
    if (fs.existsSync(storyPath)) {
      console.log(`⏭️  Skipped (exists): ${component.exportedName}`);
      skipped++;
      continue;
    }

    const storyContent = generateStory(component);
    writeStory(component, storyContent);
    generated++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Generated: ${generated} stories`);
  console.log(`   Skipped: ${skipped} existing stories`);
  console.log(`   Total components: ${components.length}\n`);

} else if (args.length > 0) {
  // Generate story for specific component
  const componentPath = args[0];
  const fullPath = path.join(__dirname, '../src/atomic', componentPath + '.tsx');

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Component not found: ${fullPath}`);
    process.exit(1);
  }

  const info = analyzeComponent(fullPath);
  if (!info) {
    console.error(`❌ Could not analyze component: ${fullPath}`);
    process.exit(1);
  }

  const storyContent = generateStory(info);
  writeStory(info, storyContent);

} else {
  console.log(`
HIVE Story Generator

Usage:
  tsx scripts/generate-story.ts atoms/button       # Generate story for specific component
  tsx scripts/generate-story.ts --all              # Generate stories for all components

Examples:
  tsx scripts/generate-story.ts atoms/input
  tsx scripts/generate-story.ts molecules/form-field
  tsx scripts/generate-story.ts organisms/navigation-shell
  `);
}
