# HIVE UI - Directory Structure Cleanup Script (PowerShell)
# This script implements the cleanup plan from docs/directory_structure_cleanup_plan.md

Write-Host "Starting HIVE UI directory structure cleanup..." -ForegroundColor Cyan

# Make sure we're in the project root
if (-not (Test-Path "lib")) {
  Write-Host "Error: Run this script from the project root directory" -ForegroundColor Red
  exit 1
}

# Create backup directory
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BACKUP_DIR = "lib\backup_$timestamp"
New-Item -Path $BACKUP_DIR -ItemType Directory -Force | Out-Null
Write-Host "Created backup directory: $BACKUP_DIR" -ForegroundColor Green

# 1. Template Feature Removal
Write-Host "1. Backing up and removing template_feature directory..." -ForegroundColor Cyan
if (Test-Path "lib\features\template_feature") {
  Copy-Item -Path "lib\features\template_feature" -Destination "$BACKUP_DIR\" -Recurse
  Remove-Item -Path "lib\features\template_feature" -Recurse -Force
  Write-Host "✅ template_feature backed up and removed" -ForegroundColor Green
} else {
  Write-Host "⚠️ template_feature directory not found" -ForegroundColor Yellow
}

# 2. Debug Directory Cleanup
Write-Host "2. Backing up and removing features/debug directory..." -ForegroundColor Cyan
if (Test-Path "lib\features\debug") {
  Copy-Item -Path "lib\features\debug" -Destination "$BACKUP_DIR\" -Recurse
  Remove-Item -Path "lib\features\debug" -Recurse -Force
  Write-Host "✅ features\debug backed up and removed" -ForegroundColor Green
} else {
  Write-Host "⚠️ features\debug directory not found" -ForegroundColor Yellow
}

# 3. Profile/Profiles Consolidation (first part - backup)
Write-Host "3. Starting profile/profiles consolidation..." -ForegroundColor Cyan
if (Test-Path "lib\features\profiles") {
  Copy-Item -Path "lib\features\profiles" -Destination "$BACKUP_DIR\" -Recurse
  Write-Host "✅ profiles directory backed up" -ForegroundColor Green
} else {
  Write-Host "⚠️ profiles directory not found" -ForegroundColor Yellow
}

# 4. Clubs/Spaces Consolidation (first part - backup)
Write-Host "4. Starting clubs/spaces consolidation..." -ForegroundColor Cyan
if (Test-Path "lib\features\clubs") {
  Copy-Item -Path "lib\features\clubs" -Destination "$BACKUP_DIR\" -Recurse
  Write-Host "✅ clubs directory backed up" -ForegroundColor Green
} else {
  Write-Host "⚠️ clubs directory not found" -ForegroundColor Yellow
}

Write-Host "All directories backed up to $BACKUP_DIR" -ForegroundColor Green
Write-Host "Manual consolidation steps should now be performed for profiles and clubs" -ForegroundColor Yellow
Write-Host "This includes moving unique functionality and updating import references" -ForegroundColor Yellow
Write-Host ""
Write-Host "❗ Important: After testing that the application works without these directories," -ForegroundColor Red
Write-Host "❗ you can remove them completely with:" -ForegroundColor Red
Write-Host "Remove-Item -Path lib\features\profiles -Recurse -Force" -ForegroundColor Blue
Write-Host "Remove-Item -Path lib\features\clubs -Recurse -Force" -ForegroundColor Blue
Write-Host ""
Write-Host "Directory structure cleanup completed 🎉" -ForegroundColor Green 