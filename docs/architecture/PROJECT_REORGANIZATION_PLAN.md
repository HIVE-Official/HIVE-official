# HIVE Project Reorganization Plan

## 🎯 Current Issues

### 1. Excessive Deleted Files (9,257 files)
- Old documentation files cluttering root
- Storybook build outputs not in .gitignore
- Duplicate/redundant documentation
- Test artifacts in version control

### 2. Poor Project Structure
- Documentation scattered in root directory
- No clear organization for docs
- Missing .gitignore entries
- Build artifacts committed to git

### 3. Configuration Issues
- ESLint misconfigured
- TypeScript errors in packages
- Missing dependencies

## 📁 Proposed Structure

```
C:\hive\
├── apps/                    # Applications
│   ├── web/                # Main Next.js app
│   └── admin/              # Admin dashboard
├── packages/               # Shared packages
│   ├── ui/                # Component library
│   ├── core/              # Business logic
│   ├── hooks/             # React hooks
│   └── ...                # Other packages
├── docs/                   # All documentation
│   ├── architecture/      # Architecture decisions
│   ├── guides/           # Developer guides
│   ├── api/              # API documentation
│   └── standards/        # Code standards
├── scripts/               # Build and utility scripts
├── .github/              # GitHub configs
├── README.md             # Main readme
├── package.json          # Root package
└── turbo.json           # Turbo config
```

## 🧹 Cleanup Actions

### Phase 1: Handle Deleted Files
1. **Remove all deleted documentation files from git**
   - Old launch plans
   - Duplicate audit reports
   - Temporary completion reports

2. **Remove Storybook build artifacts**
   - COMPLETE-SPACES-INTEGRATION-SUCCESS/
   - FINAL-SPACES-INTEGRATION-SUCCESS/
   - ULTIMATE-SPACES-SUCCESS/
   - all-imports-fix-test/
   - all-paths-fixed-test/

3. **Clean up test/temporary files**
   - .next-temp/
   - playwright-report/
   - Various .disabled files

### Phase 2: Reorganize Documentation
Move to `docs/` directory:
- **Architecture**: HIVE_PLATFORM_AUDIT.md, PLATFORM_ARCHITECTURE.md
- **Guides**: DEVELOPER_GUIDE.md, CODE_STANDARDS.md
- **Standards**: CODE_QUALITY_REPORT.md, TYPESCRIPT_FIX_SUMMARY.md
- **Project**: README.md, CLAUDE.md (keep in root)

### Phase 3: Update Configuration
1. **Update .gitignore**
```gitignore
# Build outputs
dist/
.next/
out/
build/
*.tsbuildinfo

# Storybook
storybook-static/
*-SUCCESS/

# Test artifacts
playwright-report/
coverage/
.nyc_output/

# Temp files
*.tmp
*.temp
.next-temp/

# Documentation builds
docs/.vitepress/dist/
```

2. **Fix ESLint configuration**
- Create root .eslintrc.js
- Ensure all packages use consistent config
- Fix peer dependency warnings

## 📋 Implementation Steps

### Step 1: Clean Git Status
```bash
# Remove all deleted files from git
git rm $(git ls-files --deleted)

# Or selectively remove categories
git rm *.md  # Remove deleted MD files
git rm -r *-SUCCESS/  # Remove Storybook builds
```

### Step 2: Create Documentation Structure
```bash
# Create docs directory structure
mkdir -p docs/architecture
mkdir -p docs/guides
mkdir -p docs/api
mkdir -p docs/standards

# Move existing docs
mv CODE_STANDARDS.md docs/standards/
mv DEVELOPER_GUIDE.md docs/guides/
mv CODE_QUALITY_REPORT.md docs/standards/
mv TYPESCRIPT_FIX_SUMMARY.md docs/guides/
mv IMPORT_CLEANUP_SUMMARY.md docs/guides/
```

### Step 3: Update .gitignore
- Add all build artifacts
- Add test outputs
- Add temporary files

### Step 4: Fix Configuration Files
- Update ESLint config
- Fix package.json scripts
- Update turbo.json if needed

## 🎯 Expected Outcomes

### Clean Repository
- ✅ No unnecessary files in git
- ✅ Clear project structure
- ✅ Organized documentation
- ✅ Proper .gitignore

### Better Developer Experience
- ✅ Easy to find documentation
- ✅ Clean git status
- ✅ Faster git operations
- ✅ Clear project organization

### Improved Maintainability
- ✅ Consistent structure
- ✅ No duplicate files
- ✅ Clear separation of concerns
- ✅ Easy onboarding for new developers

## ⚠️ Important Considerations

1. **Backup First**: Create a branch before major changes
2. **Verify Deletions**: Ensure no important files are removed
3. **Update References**: Fix any broken links to moved docs
4. **Team Communication**: Inform team of structure changes

## 📊 Success Metrics

- Git status shows < 100 modified files
- All commands (build, lint, test) work
- Documentation is findable and organized
- No broken imports or references
- Clean, professional repository structure