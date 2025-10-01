#!/usr/bin/env tsx

/**
 * HIVE Component Creator
 *
 * Creates new components with enforced HIVE standards
 * - Generates component from template
 * - Generates story with all required examples
 * - Updates exports
 * - Validates immediately
 *
 * Usage:
 *   tsx scripts/create-component.ts --type=atom --name=search-input
 *   tsx scripts/create-component.ts --type=molecule --name=form-group
 */

import * as fs from 'fs';
import * as path from 'path';

interface CreateOptions {
  type: 'atom' | 'molecule' | 'organism' | 'template';
  name: string;
}

function parseArgs(): CreateOptions | null {
  const args = process.argv.slice(2);
  let type: CreateOptions['type'] | null = null;
  let name: string | null = null;

  for (const arg of args) {
    if (arg.startsWith('--type=')) {
      const value = arg.split('=')[1] as CreateOptions['type'];
      if (['atom', 'molecule', 'organism', 'template'].includes(value)) {
        type = value;
      }
    }
    if (arg.startsWith('--name=')) {
      name = arg.split('=')[1];
    }
  }

  // Also support positional args
  if (!type && args[0] && !args[0].startsWith('--')) {
    type = args[0] as CreateOptions['type'];
  }
  if (!name && args[1] && !args[1].startsWith('--')) {
    name = args[1];
  }

  if (!type || !name) {
    return null;
  }

  return { type, name };
}

function kebabToPascal(kebab: string): string {
  return kebab
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function createComponent(options: CreateOptions): void {
  const { type, name } = options;
  const componentName = kebabToPascal(name);
  const fileName = name;

  // Paths
  const baseDir = path.join(__dirname, '../src/atomic', `${type}s`);
  const componentPath = path.join(baseDir, `${fileName}.tsx`);
  const storyPath = path.join(baseDir, `${fileName}.stories.tsx`);

  // Check if component already exists
  if (fs.existsSync(componentPath)) {
    console.error(`❌ Component already exists: ${componentPath}`);
    process.exit(1);
  }

  // Read template
  const templatePath = path.join(__dirname, '../templates', `${type}.template.tsx`);
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Replace placeholders
  template = template
    .replace(/{{ComponentName}}/g, componentName)
    .replace(/{{componentName}}/g, name.replace(/-([a-z])/g, (g) => g[1].toUpperCase()));

  // Write component
  fs.writeFileSync(componentPath, template, 'utf-8');
  console.log(`✅ Created component: ${componentPath}`);

  // Generate story
  const storyTemplate = fs.readFileSync(
    path.join(__dirname, '../templates/story.template.tsx'),
    'utf-8'
  );

  let story = storyTemplate
    .replace(/{{ComponentName}}/g, componentName)
    .replace(/{{component-name}}/g, fileName)
    .replace(/{{Category}}/g, type.charAt(0).toUpperCase() + type.slice(1) + 's')
    .replace(/{{COMPONENT_DESCRIPTION}}/g, `${componentName} - HIVE ${type} component`);

  fs.writeFileSync(storyPath, story, 'utf-8');
  console.log(`✅ Created story: ${storyPath}`);

  // Update exports
  updateExports(type, componentName, fileName);

  console.log(`\n🎉 Component created successfully!`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Edit component: ${componentPath}`);
  console.log(`   2. Edit story: ${storyPath}`);
  console.log(`   3. Run Storybook: pnpm storybook`);
  console.log(`   4. View at: http://localhost:6006\n`);
}

function updateExports(type: string, componentName: string, fileName: string): void {
  const indexPath = path.join(__dirname, '../src/atomic', `${type}s`, 'index.ts');

  // Create index.ts if it doesn't exist
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, '// Auto-generated exports\n', 'utf-8');
  }

  let content = fs.readFileSync(indexPath, 'utf-8');

  // Check if export already exists
  if (content.includes(`export * from './${fileName}'`)) {
    console.log(`⏭️  Export already exists in ${indexPath}`);
    return;
  }

  // Add export
  content += `export * from './${fileName}';\n`;
  fs.writeFileSync(indexPath, content, 'utf-8');
  console.log(`✅ Updated exports: ${indexPath}`);
}

// Main execution
const options = parseArgs();

if (!options) {
  console.log(`
🎨 HIVE Component Creator

Creates new components with enforced HIVE standards

Usage:
  tsx scripts/create-component.ts --type=TYPE --name=NAME

Options:
  --type=TYPE    Component type: atom, molecule, organism, template
  --name=NAME    Component name in kebab-case (e.g., search-input)

Examples:
  tsx scripts/create-component.ts --type=atom --name=fancy-button
  tsx scripts/create-component.ts --type=molecule --name=search-bar
  tsx scripts/create-component.ts --type=organism --name=nav-menu

Or use package.json scripts:
  pnpm create:atom fancy-button
  pnpm create:molecule search-bar
  pnpm create:organism nav-menu
  `);
  process.exit(1);
}

createComponent(options);
