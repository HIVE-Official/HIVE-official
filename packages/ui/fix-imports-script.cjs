#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Import mappings from old UI components to new atomic enhanced
const importMappings = {
  // ToolBuilder level (../../ui/)
  "from '../../ui/button'": "from '../../../index'",
  "from '../../ui/input'": "from '../../../index'",
  "from '../../ui/textarea'": "from '../../../index'",
  "from '../../ui/switch'": "from '../../../index'",
  "from '../../ui/checkbox'": "from '../../../index'",
  "from '../../ui/select'": "from '../../../index'",
  "from '../../ui/separator'": "from '../../../index'",
  // Component level (../ui/)
  "from '../ui/button'": "from '../../index'",
  "from '../ui/input'": "from '../../index'",
  "from '../ui/textarea'": "from '../../index'",
  "from '../ui/switch'": "from '../../index'",
  "from '../ui/checkbox'": "from '../../index'",
  "from '../ui/select'": "from '../../index'",
  "from '../ui/separator'": "from '../../index'",
  // Direct ui imports
  'from "./ui/button"': 'from "../index"',
  'from "./ui/input"': 'from "../index"',
  'from "./ui/textarea"': 'from "../index"',
  'from "./ui/switch"': 'from "../index"',
  'from "./ui/checkbox"': 'from "../index"',
  'from "./ui/select"': 'from "../index"',
  'from "./ui/separator"': 'from "../index"',
};

// Find all TypeScript files
const files = glob.sync('src/**/*.tsx', { cwd: process.cwd() });

let updatedFiles = 0;

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  // Apply import mappings
  Object.entries(importMappings).forEach(([oldImport, newImport]) => {
    if (content.includes(oldImport)) {
      content = content.replace(new RegExp(oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newImport);
      hasChanges = true;
    }
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in: ${file}`);
    updatedFiles++;
  }
});

console.log(`\nUpdated ${updatedFiles} files with new import paths`);