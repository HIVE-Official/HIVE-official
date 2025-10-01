/**
 * Update index.ts exports for all new skeleton components
 */

import fs from 'fs';
import path from 'path';

const atomsPath = path.join(__dirname, '../src/atomic/atoms');
const moleculesPath = path.join(__dirname, '../src/atomic/molecules');
const organismsPath = path.join(__dirname, '../src/atomic/organisms');
const templatesPath = path.join(__dirname, '../src/atomic/templates');

// Read existing index.ts and add exports for all .tsx files
const updateIndexFile = (dirPath: string, levelName: string) => {
  const indexPath = path.join(dirPath, 'index.ts');
  const files = fs.readdirSync(dirPath);

  const componentFiles = files
    .filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx') && !f.endsWith('.test.tsx'))
    .map((f) => f.replace('.tsx', ''));

  const exports = componentFiles
    .map((name) => {
      // Convert kebab-case to PascalCase
      const pascalName = name
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join('');
      return `export { ${pascalName} } from './${name}';`;
    })
    .join('\n');

  fs.writeFileSync(indexPath, exports + '\n');
  console.log(`✓ Updated ${levelName}/index.ts with ${componentFiles.length} exports`);
};

console.log('Updating index.ts exports...\n');

if (fs.existsSync(atomsPath)) updateIndexFile(atomsPath, 'atoms');
if (fs.existsSync(moleculesPath)) updateIndexFile(moleculesPath, 'molecules');
if (fs.existsSync(organismsPath)) updateIndexFile(organismsPath, 'organisms');
if (fs.existsSync(templatesPath)) updateIndexFile(templatesPath, 'templates');

console.log('\n✅ All index.ts files updated!');
