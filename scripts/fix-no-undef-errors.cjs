#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all TypeScript/JSX files in the web app
function getAllFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  
  for (const file of fileList) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (!file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
        getAllFiles(filePath, files);
      }
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      files.push(filePath);
    }
  }
  
  return files;
}

// Common import fixes
const importFixes = {
  // React hooks
  'useRouter': "import { useRouter } from 'next/navigation';",
  'useEffect': "import { useEffect } from 'react';",
  'useState': "import { useState } from 'react';",
  'useCallback': "import { useCallback } from 'react';",
  'useMemo': "import { useMemo } from 'react';",
  'useRef': "import { useRef } from 'react';",
  
  // Framer Motion
  'motion': "import { motion } from 'framer-motion';",
  'AnimatePresence': "import { AnimatePresence } from 'framer-motion';",
  
  // Next.js components
  'Image': "import Image from 'next/image';",
  'Link': "import Link from 'next/link';",
  
  // Common components that should be imported from @hive/ui
  'Button': "import { Button } from '@hive/ui';",
  'Card': "import { Card } from '@hive/ui';",
  'Input': "import { Input } from '@hive/ui';",
  'Modal': "import { Modal } from '@hive/ui';",
  
  // Layout components
  'AuthGuard': "import { AuthGuard } from '../components/auth-guard';",
  'AppLayout': "import { AppLayout } from '../components/layout/AppLayout';"
};

// Variable name fixes (underscore prefixed variables)
const variableNameFixes = {
  '__postId': '_postId',
  '__comment': '_comment', 
  '__postData': '_postData',
  'postId': '_postId', // In contexts where it should be prefixed
  'user': '_user' // In contexts where it should be prefixed
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  let requiredImports = new Set();
  
  console.log(`Processing: ${filePath}`);
  
  // Check for undefined variables and collect required imports
  for (const [variable, importStatement] of Object.entries(importFixes)) {
    const regex = new RegExp(`\\b${variable}\\b`, 'g');
    if (regex.test(content)) {
      // Check if already imported
      if (!content.includes(importStatement)) {
        requiredImports.add(importStatement);
      }
    }
  }
  
  // Add missing imports at the top of the file
  if (requiredImports.size > 0) {
    const lines = content.split('\n');
    let insertIndex = 0;
    
    // Find the last import or 'use client' directive
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('import ') || lines[i].includes("'use client'") || lines[i].includes('"use client"')) {
        insertIndex = i + 1;
      } else if (lines[i].trim() === '' && insertIndex > 0) {
        continue;
      } else if (insertIndex > 0 && !lines[i].includes('import ')) {
        break;
      }
    }
    
    const importsToAdd = Array.from(requiredImports).join('\n');
    lines.splice(insertIndex, 0, importsToAdd);
    content = lines.join('\n');
    hasChanges = true;
  }
  
  // Fix variable names (underscore prefixed variables that are undefined)
  for (const [wrongName, correctName] of Object.entries(variableNameFixes)) {
    const regex = new RegExp(`\\b${wrongName}\\b(?!\s*[:=])`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, correctName);
      hasChanges = true;
    }
  }
  
  // Fix specific patterns
  
  // Fix missing router declaration
  if (content.includes('router.') && !content.includes('const router = useRouter()') && content.includes('useRouter')) {
    const lines = content.split('\n');
    let functionStartIndex = -1;
    
    // Find function component start
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('export default function') || lines[i].includes('function ') || lines[i].includes('const ') && lines[i].includes('= (')) {
        functionStartIndex = i;
        break;
      }
    }
    
    if (functionStartIndex !== -1) {
      // Insert router declaration after function start
      let insertIndex = functionStartIndex + 1;
      while (insertIndex < lines.length && lines[insertIndex].trim() === '') {
        insertIndex++;
      }
      
      lines.splice(insertIndex, 0, '  const router = useRouter();');
      content = lines.join('\n');
      hasChanges = true;
    }
  }
  
  // Fix missing user from auth hook
  if (content.includes('user.') && !content.includes('const { user }') && !content.includes('const user')) {
    const lines = content.split('\n');
    let functionStartIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('export default function') || lines[i].includes('function ') || lines[i].includes('const ') && lines[i].includes('= (')) {
        functionStartIndex = i;
        break;
      }
    }
    
    if (functionStartIndex !== -1) {
      let insertIndex = functionStartIndex + 1;
      while (insertIndex < lines.length && lines[insertIndex].trim() === '') {
        insertIndex++;
      }
      
      lines.splice(insertIndex, 0, '  const { user } = useAuth(); // TODO: Import useAuth hook');
      content = lines.join('\n');
      hasChanges = true;
    }
  }
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
  }
}

// Main execution
const webAppDir = path.join(__dirname, '../apps/web/src');
const files = getAllFiles(webAppDir);

console.log(`Found ${files.length} files to process...\n`);

for (const file of files) {
  try {
    fixFile(file);
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
}

console.log('\n✅ Automated fixes complete!');
console.log('\n🔍 Running ESLint to check remaining issues...');

try {
  execSync('pnpm --filter=web lint', { stdio: 'inherit' });
} catch (error) {
  console.log('\n📋 Some issues remain - will need manual fixes');
}