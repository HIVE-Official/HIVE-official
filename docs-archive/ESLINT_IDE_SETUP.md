# ESLint IDE Setup Guide

## Current Configuration Status

✅ **ESLint 9.28.0** with flat config (`eslint.config.mjs`)  
✅ **VS Code settings** configured for flat config support  
✅ **Package-level configs** properly scoped  
✅ **Storybook rules** only apply to `.stories.*` files

## What Was Fixed

### 1. VS Code Settings (.vscode/settings.json)

- Changed `eslint.workingDirectories` to use `{ "mode": "auto" }` instead of explicit paths
- Added `eslint.experimental.useFlatConfig: true` for better compatibility
- Added `eslint.run: "onType"` for real-time linting
- Added file-specific formatter settings for TypeScript

### 2. Package-level ESLint Config (packages/ui/eslint.config.mjs)

- Fixed file patterns to only target `src/**/*.{js,jsx,ts,tsx}`
- Added proper `ignores` to exclude story files from regular component rules
- Explicitly disabled Storybook rules for non-story files
- Scoped Storybook rules to only `**/*.stories.*` files

### 3. Root ESLint Config (eslint.config.mjs)

- Fixed Next.js pages directory configuration to point to `apps/web/src/app`

### 4. VS Code Tasks (.vscode/tasks.json)

- Added tasks for restarting ESLint server and linting current file

## How to Enable Lint Errors in IDE

### VS Code

1. **Install ESLint Extension**: Make sure you have the official ESLint extension installed
2. **Restart ESLint Server**: Use Command Palette (`Ctrl+Shift+P`) → "ESLint: Restart ESLint Server"
3. **Check Output**: View → Output → Select "ESLint" from dropdown to see debug info
4. **Manual Task**: Use Command Palette → "Tasks: Run Task" → "ESLint: Lint Current File"

### Troubleshooting

#### ESLint Not Working

1. Check ESLint output panel in VS Code
2. Restart ESLint server via Command Palette
3. Reload VS Code window (`Ctrl+Shift+P` → "Developer: Reload Window")
4. Verify ESLint version: `npx eslint --version` (should be 9.x)

#### Incorrect Rules Applied

- Make sure you're editing files in the correct workspace context
- Check if file patterns in config match your file location
- Verify the config file being used with: `npx eslint --print-config <filename>`

#### Performance Issues

- Disable `eslint.trace.server` in settings (set to "off")
- Use `eslint.run: "onSave"` instead of "onType" if needed

## Testing the Setup

Run these commands to verify everything works:

```bash
# Test linting a specific file
npx eslint packages/ui/src/components/alert.tsx

# Test linting all UI components
npx eslint packages/ui/src/

# Run full project lint
pnpm lint
```

## File Patterns

| File Type        | ESLint Config                 | Rules Applied              |
| ---------------- | ----------------------------- | -------------------------- |
| `.stories.tsx`   | packages/ui/eslint.config.mjs | Storybook rules            |
| Component `.tsx` | packages/ui/eslint.config.mjs | TypeScript + React rules   |
| App Router files | Root eslint.config.mjs        | Next.js + TypeScript rules |
| Config files     | Ignored                       | None                       |

## Common Issues

1. **"Multiple configs detected"**: Make sure only one flat config exists per directory level
2. **"Parser not found"**: Ensure TypeScript parser is properly configured in languageOptions
3. **"Project not found"**: Check tsconfig.json paths in parser options
4. **Rules not applying**: Verify file patterns match your file structure
