# UI Tooling Scripts

This directory contains utility scripts that support the campus web UI.

## Directory Structure Cleanup

The directory structure cleanup scripts help implement the plan outlined in `docs/directory_structure_cleanup_plan.md`.

### For Unix/Linux/macOS:

```bash
# Make the script executable
chmod +x scripts/directory_cleanup.sh

# Run the script from the project root
./scripts/directory_cleanup.sh
```

### For Windows:

```powershell
# Run the script from the project root
.\scripts\directory_cleanup.ps1
```

## What These Scripts Do

1. Create a timestamped backup directory
2. Back up and remove the template_feature directory
3. Back up and remove the features/debug directory
4. Back up profiles and clubs directories for manual consolidation

## After Running the Script

After running the script, you should:

1. Verify the application still builds and runs correctly
2. Complete the manual consolidation of profile/profiles and clubs/spaces directories
3. Update import statements throughout the codebase
4. Run tests to ensure everything works as expected
5. Remove the consolidated directories once integration is complete

## Feature Consolidation Analysis

The consolidation analysis scripts help analyze the directories to be consolidated and generate reports to guide the consolidation process.

### For Unix/Linux/macOS:

```bash
# Make the script executable
chmod +x scripts/consolidation_analysis.sh

# Run the script from the project root
./scripts/consolidation_analysis.sh
```

### For Windows:

```powershell
# Run the script from the project root
.\scripts\consolidation_analysis.ps1
```

## What the Consolidation Analysis Scripts Do

1. Analyze profile/profiles directories
   - Count files in each directory
   - Find import references to profiles directory
   - Extract class names for comparison

2. Analyze spaces/clubs directories
   - Count files in each directory
   - Find import references to clubs directory
   - Extract class names for comparison

3. Generate consolidation reports
   - Create markdown reports with findings
   - List classes in each directory for comparison
   - Document import references that need to be updated

## After Running the Analysis

The analysis will generate reports in:
- `migration/profile_consolidation/report.md`
- `migration/clubs_consolidation/report.md`

These reports will help you:
1. Identify classes and files that need to be migrated
2. Document import references that need to be updated
3. Create a detailed migration plan

## Other Scripts

(List and document other scripts in this directory) 
