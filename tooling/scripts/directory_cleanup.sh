#!/bin/bash

# HIVE UI - Directory Structure Cleanup Script
# This script implements the cleanup plan from docs/directory_structure_cleanup_plan.md

echo "Starting HIVE UI directory structure cleanup..."

# Make sure we're in the project root
if [ ! -d "lib" ]; then
  echo "Error: Run this script from the project root directory"
  exit 1
fi

# Create backup directory
BACKUP_DIR="lib/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "Created backup directory: $BACKUP_DIR"

# 1. Template Feature Removal
echo "1. Backing up and removing template_feature directory..."
if [ -d "lib/features/template_feature" ]; then
  cp -r lib/features/template_feature "$BACKUP_DIR/"
  npx rimraf lib/features/template_feature
  echo "✅ template_feature backed up and removed"
else
  echo "⚠️ template_feature directory not found"
fi

# 2. Debug Directory Cleanup
echo "2. Backing up and removing features/debug directory..."
if [ -d "lib/features/debug" ]; then
  cp -r lib/features/debug "$BACKUP_DIR/"
  npx rimraf lib/features/debug
  echo "✅ features/debug backed up and removed"
else
  echo "⚠️ features/debug directory not found"
fi

# 3. Profile/Profiles Consolidation (first part - backup)
echo "3. Starting profile/profiles consolidation..."
if [ -d "lib/features/profiles" ]; then
  cp -r lib/features/profiles "$BACKUP_DIR/"
  echo "✅ profiles directory backed up"
else
  echo "⚠️ profiles directory not found"
fi

# 4. Clubs/Spaces Consolidation (first part - backup)
echo "4. Starting clubs/spaces consolidation..."
if [ -d "lib/features/clubs" ]; then
  cp -r lib/features/clubs "$BACKUP_DIR/"
  echo "✅ clubs directory backed up"
else
  echo "⚠️ clubs directory not found"
fi

echo "All directories backed up to $BACKUP_DIR"
echo "Manual consolidation steps should now be performed for profiles and clubs"
echo "This includes moving unique functionality and updating import references"
echo ""
echo "❗ Important: After testing that the application works without these directories,"
echo "❗ you can remove them completely with:"
echo "npx rimraf lib/features/profiles"
echo "npx rimraf lib/features/clubs"
echo ""
echo "Directory structure cleanup completed 🎉" 