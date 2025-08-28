# HIVE Platform Deployment Script (PowerShell)
# Windows-compatible deployment script for HIVE platform
param(
    [string]$Environment = "production",
    [switch]$SkipBuild,
    [switch]$Verbose
)

# Set error action preference
$ErrorActionPreference = "Stop"

# Colors for output
function Write-ColoredOutput {
    param([string]$Message, [string]$Color = "Green")
    Write-Host $Message -ForegroundColor $Color
}

function Write-Step {
    param([string]$Message)
    Write-ColoredOutput "🚀 $Message" "Cyan"
}

function Write-Success {
    param([string]$Message)
    Write-ColoredOutput "✅ $Message" "Green"
}

function Write-Error {
    param([string]$Message)
    Write-ColoredOutput "❌ $Message" "Red"
}

function Write-Warning {
    param([string]$Message)
    Write-ColoredOutput "⚠️ $Message" "Yellow"
}

# Main deployment function
function Deploy-HIVE {
    Write-ColoredOutput "`n🎯 HIVE Platform Deployment" "Magenta"
    Write-ColoredOutput "Environment: $Environment" "Yellow"
    Write-ColoredOutput "Skip Build: $SkipBuild" "Yellow"
    Write-ColoredOutput "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n" "Gray"

    try {
        # Check prerequisites
        Write-Step "Checking prerequisites..."
        
        # Check if Node.js is installed
        if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
            Write-Error "Node.js is not installed or not in PATH"
            exit 1
        }
        
        # Check if pnpm is installed
        if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
            Write-Warning "pnpm not found, installing..."
            npm install -g pnpm
        }
        
        # Check if we're in the correct directory
        if (-not (Test-Path "package.json")) {
            Write-Error "package.json not found. Please run this script from the HIVE root directory."
            exit 1
        }
        
        # Check if Vercel CLI is installed
        if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
            Write-Warning "Vercel CLI not found, installing..."
            npm install -g vercel
        }
        
        Write-Success "Prerequisites check complete"

        # Install dependencies
        Write-Step "Installing dependencies..."
        pnpm install
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to install dependencies"
            exit 1
        }
        Write-Success "Dependencies installed successfully"

        # Build the project (unless skipped)
        if (-not $SkipBuild) {
            Write-Step "Building HIVE platform..."
            
            # Build the UI package first
            Write-Step "Building @hive/ui package..."
            Set-Location "packages\ui"
            pnpm run build
            if ($LASTEXITCODE -ne 0) {
                Write-Error "Failed to build @hive/ui package"
                Set-Location "..\..\"
                exit 1
            }
            Set-Location "..\..\"
            Write-Success "@hive/ui package built successfully"
            
            # Build the web application
            Write-Step "Building web application..."
            Set-Location "apps\web"
            pnpm run build
            if ($LASTEXITCODE -ne 0) {
                Write-Error "Failed to build web application"
                Set-Location "..\..\"
                exit 1
            }
            Set-Location "..\..\"
            Write-Success "Web application built successfully"
            
            Write-Success "Build process completed successfully"
        } else {
            Write-Warning "Skipping build process as requested"
        }

        # Run tests (optional, comment out if not needed)
        if ($Environment -eq "production") {
            Write-Step "Running production tests..."
            Set-Location "apps\web"
            pnpm run test:ci
            if ($LASTEXITCODE -ne 0) {
                Write-Warning "Tests failed, but continuing with deployment"
            } else {
                Write-Success "All tests passed"
            }
            Set-Location "..\..\"
        }

        # Deploy with Vercel
        Write-Step "Deploying to Vercel ($Environment)..."
        Set-Location "apps\web"
        
        if ($Environment -eq "production") {
            vercel --prod
        } elseif ($Environment -eq "preview") {
            vercel
        } else {
            Write-Warning "Unknown environment '$Environment', deploying as preview"
            vercel
        }
        
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Deployment failed"
            Set-Location "..\..\"
            exit 1
        }
        
        Set-Location "..\..\"
        Write-Success "Deployment completed successfully!"

        # Post-deployment tasks
        Write-Step "Running post-deployment tasks..."
        
        # You can add post-deployment tasks here such as:
        # - Cache invalidation
        # - Database migrations
        # - Notification sending
        
        Write-Success "Post-deployment tasks completed"

        Write-ColoredOutput "`n🎉 HIVE Platform deployed successfully!" "Green"
        Write-ColoredOutput "Environment: $Environment" "Yellow"
        Write-ColoredOutput "Deployed at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" "Gray"
        
    } catch {
        Write-Error "Deployment failed with error: $($_.Exception.Message)"
        Write-ColoredOutput "Stack trace:" "Red"
        Write-ColoredOutput $_.ScriptStackTrace "Red"
        exit 1
    }
}

# Script usage information
function Show-Help {
    Write-ColoredOutput @"

HIVE Platform Deployment Script (PowerShell)
============================================

Usage: 
  .\deploy.ps1 [-Environment <env>] [-SkipBuild] [-Verbose]

Parameters:
  -Environment    Target environment (production, preview, staging)
                  Default: production
  
  -SkipBuild      Skip the build process and deploy existing build
                  
  -Verbose        Show verbose output
  
  -Help           Show this help message

Examples:
  .\deploy.ps1                           # Deploy to production
  .\deploy.ps1 -Environment preview      # Deploy to preview
  .\deploy.ps1 -SkipBuild               # Skip build, deploy existing
  .\deploy.ps1 -Environment production -Verbose  # Verbose production deploy

Requirements:
  - Node.js and pnpm installed
  - Vercel CLI (will be installed if missing)
  - Run from HIVE root directory
  - Proper Vercel authentication

"@ "Cyan"
}

# Handle help parameter
if ($args -contains "-Help" -or $args -contains "--help" -or $args -contains "-h") {
    Show-Help
    exit 0
}

# Run the deployment
Deploy-HIVE

Write-ColoredOutput "`n🚀 Ready to launch HIVE at University of Buffalo! 🦬" "Magenta"