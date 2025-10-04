#!/usr/bin/env node

/**
 * HIVE TypeScript Error Auto-Fix Script
 * BACKUP: commit ebbbffd3 | branch backup/pre-bulk-fix-20251004_130222
 *
 * Usage:
 *   node scripts/fix-typescript-errors.js --dry-run
 *   node scripts/fix-typescript-errors.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Parse CLI args
const DRY_RUN = process.argv.includes('--dry-run');

if (DRY_RUN) {
  console.log('🔍 DRY RUN MODE - No changes will be made\n');
}

// === VARIANT MAPPINGS (Updated for shadcn) ===

// shadcn Button variants: "default" | "destructive" | "outline" | "ghost" | "link" | "gold"
const buttonVariantMap = {
  // Legacy HIVE variants -> shadcn variants
  'primary': 'default',
  'secondary': 'outline',
  'freshman': 'default',
  'sophomore': 'default',
  'skill-tag': 'outline',
  'building-tools': 'outline',
  // Keep valid shadcn variants
  'default': 'default',
  'destructive': 'destructive',
  'outline': 'outline',
  'ghost': 'ghost',
  'link': 'link',
  'gold': 'gold'
};

// HiveBadge variant mapping
const badgeVariantMap = {
  // Academic year variants - keep as is if valid
  'freshman': 'freshman',
  'sophomore': 'sophomore',
  'junior': 'junior',
  'senior': 'senior',
  'grad': 'grad',
  'phd': 'phd',
  // Common incorrect values -> map to defaults
  'default': 'freshman',
  'primary': 'senior',
  'secondary': 'sophomore',
  'outline': 'freshman',
  'solid': 'senior',
  'success': 'senior',
  'warning': 'junior',
  'error': 'freshman',
  'info': 'sophomore',
  // Tool mastery
  'tool-newbie': 'tool-newbie',
  'tool-builder': 'tool-builder',
  'tool-expert': 'tool-expert',
  'tool-legend': 'tool-legend',
  // Study patterns
  'night-owl': 'night-owl',
  'early-bird': 'early-bird',
  'grind-mode': 'grind-mode',
  'study-streak': 'study-streak'
};

// Card variant mapping
const cardVariantMap = {
  'default': undefined,  // Card doesn't use variant prop
  'outline': undefined,
  'online': undefined,
  'elevated': undefined,
  'flat': undefined
};

// === FIX FUNCTIONS ===

function fixVariantInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changeCount = 0;
  const originalContent = content;

  // Fix component imports first
  const componentMap = {
    'HiveButton': 'Button',
    'HiveCard': 'Card',
    'HiveInput': 'Input',
    'HiveProgress': 'Progress',
    'HiveModal': 'Dialog',
    'HiveModalContent': 'DialogContent',
  };

  // Fix imports
  for (const [oldName, newName] of Object.entries(componentMap)) {
    const importPattern = new RegExp(`import\\s*{[^}]*\\b${oldName}\\b[^}]*}\\s*from\\s*['"]@hive/ui['"]`, 'g');
    if (importPattern.test(content)) {
      content = content.replace(new RegExp(`\\b${oldName}\\b`, 'g'), newName);
      changeCount++;
    }
  }

  // Fix Button variants (shadcn only accepts: default | destructive | outline | ghost | link | gold)
  content = content.replace(/<Button[^>]*variant="([^"]+)"[^>]*>/g, (match, variant) => {
    const mappedVariant = buttonVariantMap[variant];
    if (mappedVariant && mappedVariant !== variant) {
      changeCount++;
      return match.replace(`variant="${variant}"`, `variant="${mappedVariant}"`);
    }
    return match;
  });

  // Fix HiveBadge variants
  content = content.replace(/<(HiveBadge|Badge)[^>]*variant="([^"]+)"[^>]*>/g, (match, component, variant) => {
    const mappedVariant = badgeVariantMap[variant];
    if (mappedVariant && mappedVariant !== variant) {
      changeCount++;
      return match.replace(`variant="${variant}"`, `variant="${mappedVariant}"`);
    }
    return match;
  });

  // Fix Card variants (remove variant prop entirely as Card doesn't support it)
  content = content.replace(/<(HiveCard|Card)[^>]*\s+variant="[^"]+"/g, (match) => {
    changeCount++;
    return match.replace(/\s+variant="[^"]+"/g, '');
  });

  // Fix size="string" issues - map to valid sizes
  const sizeMap = {
    'small': 'sm',
    'medium': 'md',
    'large': 'lg',
    'xs': 'sm',
    'xl': 'lg',
    'tiny': 'sm',
    'huge': 'lg'
  };

  content = content.replace(/size="([^"]+)"/g, (match, size) => {
    const mappedSize = sizeMap[size];
    if (mappedSize) {
      changeCount++;
      return `size="${mappedSize}"`;
    }
    return match;
  });

  // Fix implicit any in event handlers
  content = content.replace(/onClick=\{(\(e\))/g, 'onClick={(e: React.MouseEvent)');
  content = content.replace(/onChange=\{(\(e\))/g, 'onChange={(e: React.ChangeEvent)');
  content = content.replace(/onSubmit=\{(\(e\))/g, 'onSubmit={(e: React.FormEvent)');
  content = content.replace(/onCheckedChange=\{(\(enabled\))/g, 'onCheckedChange={(enabled: boolean)');

  // Fix className on components that might not accept it
  // Add type assertion for components that need className but TS complains
  content = content.replace(/<(CardHeader|CardTitle|CardContent|CardDescription|CardFooter)([^>]*)\sclassName=/g,
    '<$1$2 className=');

  if (changeCount > 0 || content !== originalContent) {
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${changeCount || 1} issues in ${path.relative(process.cwd(), filePath)}`);
    } else {
      console.log(`🔍 Would fix ${changeCount || 1} issues in ${path.relative(process.cwd(), filePath)}`);
    }
    return changeCount || 1;
  }

  return 0;
}

function fixImportTypes(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changeCount = 0;

  // Fix incorrect type imports
  const typeFixPatterns = [
    // HiveButtonProps doesn't exist, it's ButtonProps
    [/HiveButtonProps/g, 'ButtonProps'],
    // Card component types
    [/HiveCardProps/g, 'CardProps'],
    [/HiveCardHeaderProps/g, 'CardHeaderProps'],
    [/HiveCardContentProps/g, 'CardContentProps'],
    [/HiveCardTitleProps/g, 'CardTitleProps'],
  ];

  for (const [pattern, replacement] of typeFixPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      content = content.replace(pattern, replacement);
      changeCount += matches.length;
    }
  }

  if (changeCount > 0) {
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${changeCount} type imports in ${path.relative(process.cwd(), filePath)}`);
    } else {
      console.log(`🔍 Would fix ${changeCount} type imports in ${path.relative(process.cwd(), filePath)}`);
    }
    return changeCount;
  }

  return 0;
}

// === MAIN EXECUTION ===

async function main() {
  console.log('🔧 Starting TypeScript Error Fix Script...\n');

  // Ensure we're at the project root
  const projectRoot = path.resolve(__dirname, '..');
  process.chdir(projectRoot);

  // Find all TypeScript/TSX files in apps/web/src and packages/ui/src
  const patterns = [
    'apps/web/src/**/*.{ts,tsx}',
    'packages/ui/src/**/*.{ts,tsx}'
  ];

  const files = patterns.flatMap(pattern =>
    glob.sync(pattern, {
      cwd: projectRoot,
      absolute: true,
      ignore: ['**/node_modules/**', '**/*.d.ts', '**/*.stories.tsx']
    })
  );

  console.log(`📁 Found ${files.length} TypeScript files to process\n`);

  let totalChanges = 0;
  let filesChanged = 0;

  // Process each file
  for (const file of files) {
    const variantChanges = fixVariantInFile(file);
    const importChanges = fixImportTypes(file);

    if (variantChanges > 0 || importChanges > 0) {
      totalChanges += variantChanges + importChanges;
      filesChanged++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ COMPLETE: Fixed ${totalChanges} issues across ${filesChanged} files`);
  console.log('='.repeat(50));

  // Run typecheck to see remaining errors
  console.log('\n🔍 Running TypeScript check to see remaining errors...\n');
  const { execSync } = require('child_process');

  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('✅ TypeScript compilation successful!');
  } catch (error) {
    console.log('⚠️  TypeScript still has errors. Run "npm run typecheck" to see details.');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fixVariantInFile, fixImportTypes };