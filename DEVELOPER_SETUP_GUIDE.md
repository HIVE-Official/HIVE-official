# 🚨 DEVELOPER SETUP GUIDE - Fix "HTML Only" Issue

**Issue**: Developers cloning from GitHub see raw HTML instead of the React application

## Root Cause Analysis

The "HTML only" issue occurs when:
1. **Missing environment variables** cause Firebase/client-side JavaScript to fail
2. **Node.js version mismatch** between development environments
3. **Workspace dependencies** aren't built in the correct order
4. **Client-side hydration fails** due to missing JavaScript bundles

## ✅ **SOLUTION: Quick Fix (5 minutes)**

### Step 1: Use Correct Node Version
```bash
# Check current version
node --version

# Should be Node 20 (as specified in .nvmrc)
# If you have nvm:
nvm use 20

# If you have volta:
volta pin node@20
```

### Step 2: Clean Install Dependencies
```bash
# Remove all existing dependencies
rm -rf node_modules
rm -rf apps/web/node_modules  
rm -rf packages/*/node_modules
rm -rf apps/web/.next

# Clean pnpm cache
pnpm store prune

# Fresh install
pnpm install
```

### Step 3: Create Environment File
```bash
# Copy example environment
cp apps/web/.env.example apps/web/.env.local

# Add this line for development mode (bypasses Firebase)
echo "NODE_ENV=development" >> apps/web/.env.local
```

### Step 4: Build Workspace Dependencies  
```bash
# Build core packages first (REQUIRED)
pnpm --filter=@hive/validation build
pnpm --filter=@hive/core build
pnpm --filter=@hive/ui build
```

### Step 5: Start Development Server
```bash
# Start the development server
pnpm dev

# Or specifically the web app:
cd apps/web && pnpm dev
```

---

## 🔍 **Detailed Troubleshooting**

### Issue #1: Environment Variables Missing

**Symptoms**: White screen, console errors about Firebase config
**Solution**: 
```bash
# Check if .env.local exists
ls apps/web/.env.local

# If missing, create it:
cp apps/web/.env.example apps/web/.env.local
echo "NODE_ENV=development" >> apps/web/.env.local
```

### Issue #2: Node Version Mismatch

**Symptoms**: Build errors, module resolution issues
**Solution**:
```bash
# Check required version
cat .nvmrc  # Should show: 20

# Switch to correct version
nvm use 20
# or
volta pin node@20
```

### Issue #3: Workspace Dependencies Not Built

**Symptoms**: "Module not found @hive/core", "Cannot resolve @hive/ui"
**Solution**:
```bash
# Build packages in correct order
pnpm --filter=@hive/validation build
pnpm --filter=@hive/core build  
pnpm --filter=@hive/ui build
```

### Issue #4: Next.js Hydration Failure

**Symptoms**: HTML loads but no JavaScript interactivity
**Solution**:
```bash
# Clear Next.js cache
rm -rf apps/web/.next

# Rebuild
cd apps/web && pnpm build
cd apps/web && pnpm dev
```

---

## 🔧 **Advanced Troubleshooting**

### Check Build Output
```bash
# Verify JavaScript bundles are generated
cd apps/web && pnpm build
ls .next/static/chunks/  # Should show .js files
```

### Verify Environment Detection
```bash
# Check environment parsing
node -e "
const env = require('./packages/core/dist/env.js');
console.log('Environment info:', env.environmentInfo);
"
```

### Debug Client-Side JavaScript
```bash
# Start dev server and check browser console
cd apps/web && pnpm dev
# Open http://localhost:3000
# Check browser dev tools for JavaScript errors
```

---

## 📋 **Development Checklist**

Before starting development, ensure:

- [ ] Node.js version 20 installed (`node --version`)
- [ ] pnpm 9.x installed (`pnpm --version`) 
- [ ] `.env.local` file exists in `apps/web/`
- [ ] Workspace dependencies built (`@hive/core`, `@hive/ui`, etc.)
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] Development server starts without errors (`pnpm dev`)

---

## 🆘 **Still Having Issues?**

### Quick Reset (Nuclear Option)
```bash
# Complete reset
rm -rf node_modules apps/web/node_modules packages/*/node_modules
rm -rf apps/web/.next packages/*/dist
pnpm store prune
pnpm install
echo "NODE_ENV=development" > apps/web/.env.local
pnpm --filter=@hive/core build
pnpm --filter=@hive/ui build  
pnpm dev
```

### Environment Debug
```bash
# Check what Next.js sees
cd apps/web
node -e "console.log('NODE_ENV:', process.env.NODE_ENV)"
node -e "console.log('Firebase Config:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Present' : 'Missing')"
```

### Common Error Messages & Solutions

| Error | Solution |
|-------|----------|
| "Module not found: Can't resolve '@hive/core'" | Build workspace dependencies first |
| "Firebase config missing" | Add `.env.local` with `NODE_ENV=development` |
| "Hydration failed" | Clear `.next` folder and restart |
| "Port 3000 in use" | Next.js will auto-select available port |

---

## 💡 **Tips for Contributors**

1. **Always run `pnpm install` first** - monorepo dependencies are complex
2. **Use development mode** - bypasses Firebase for quick local testing
3. **Check the browser console** - client-side errors will show hydration issues
4. **Use the correct Node version** - version mismatches cause build issues
5. **Build workspace packages** - they must be built before the web app

---

*Last Updated: July 11, 2025*
*If this guide doesn't solve your issue, please create a GitHub issue with your error details.*