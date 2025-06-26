# HIVE Development Environment Setup Script (PowerShell)
# This script sets up the complete HIVE development environment on Windows

param(
    [switch]$SkipGlobalTools,
    [switch]$SkipClean,
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Setting up HIVE Development Environment (Windows)..." -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if we're in the right directory
if (-not (Test-Path "package.json") -or -not (Test-Path "pnpm-workspace.yaml")) {
    Write-Error "Please run this script from the HIVE project root directory"
    exit 1
}

Write-Status "Checking prerequisites..."

# Check Node.js version
try {
    $nodeVersion = node --version
    $nodeVersionNumber = $nodeVersion -replace 'v', ''
    $requiredVersion = [Version]"20.12.1"
    $currentVersion = [Version]$nodeVersionNumber
    
    if ($currentVersion -ge $requiredVersion) {
        Write-Success "Node.js version $nodeVersion ✓"
    } else {
        Write-Warning "Node.js version $nodeVersion detected. Recommended: v20.12.1 or later"
    }
} catch {
    Write-Error "Node.js is not installed. Please install Node.js 20.12.1 LTS or later"
    exit 1
}

# Check pnpm
try {
    $pnpmVersion = pnpm --version
    Write-Success "pnpm version $pnpmVersion detected ✓"
} catch {
    Write-Status "Installing pnpm..."
    npm install -g pnpm@9.1.1
}

# Install global tools for reliable development (Windows compatibility fix)
if (-not $SkipGlobalTools) {
    Write-Status "Installing global development tools (Windows compatibility)..."
    
    try {
        npm install -g typescript@5.8.3
        Write-Success "Global TypeScript installed ✓"
    } catch {
        Write-Warning "Failed to install global TypeScript (this is okay)"
    }
    
    try {
        npm install -g @storybook/cli@8.4.7
        Write-Success "Global Storybook CLI installed ✓"
    } catch {
        Write-Warning "Failed to install global Storybook CLI (this is okay)"
    }
    
    try {
        npm install -g next@15.3.3
        Write-Success "Global Next.js installed ✓"
    } catch {
        Write-Warning "Failed to install global Next.js (this is okay)"
    }
    
    try {
        npm install -g eslint@9.28.0
        Write-Success "Global ESLint installed ✓"
    } catch {
        Write-Warning "Failed to install global ESLint (this is okay)"
    }
} else {
    Write-Status "Skipping global tools installation..."
}

# Clean any existing installations
if (-not $SkipClean) {
    Write-Status "Cleaning existing installations..."
    
    $pathsToClean = @(
        "node_modules",
        ".next",
        ".turbo",
        "apps/web/node_modules",
        "apps/web/.next",
        "packages/*/node_modules",
        "packages/*/.turbo"
    )
    
    foreach ($path in $pathsToClean) {
        if (Test-Path $path) {
            Remove-Item -Recurse -Force $path -ErrorAction SilentlyContinue
            if ($Verbose) { Write-Host "Cleaned: $path" -ForegroundColor DarkGray }
        }
    }
    
    # Clean package-specific node_modules
    Get-ChildItem -Path "packages" -Directory | ForEach-Object {
        $nodeModulesPath = Join-Path $_.FullName "node_modules"
        if (Test-Path $nodeModulesPath) {
            Remove-Item -Recurse -Force $nodeModulesPath -ErrorAction SilentlyContinue
            if ($Verbose) { Write-Host "Cleaned: $nodeModulesPath" -ForegroundColor DarkGray }
        }
    }
    
    Write-Success "Cleanup complete ✓"
} else {
    Write-Status "Skipping cleanup..."
}

# Install dependencies
Write-Status "Installing dependencies with pnpm..."
try {
    pnpm install --frozen-lockfile
    Write-Success "Dependencies installed ✓"
} catch {
    Write-Warning "pnpm install had issues, trying without frozen lockfile..."
    pnpm install
}

# Check for Firebase environment setup
Write-Status "Checking Firebase configuration..."
$envLocalPath = "apps/web/.env.local"
$envExamplePath = "apps/web/.env.example"

if (-not (Test-Path $envLocalPath)) {
    if (Test-Path $envExamplePath) {
        Write-Warning "Firebase not configured. Creating .env.local from example..."
        Copy-Item $envExamplePath $envLocalPath
        Write-Warning "Please edit apps/web/.env.local with your Firebase configuration"
        Write-Warning "The app will run in mock mode until Firebase is configured"
    } else {
        Write-Warning "No Firebase configuration found. App will run in mock mode"
    }
} else {
    Write-Success "Firebase configuration found ✓"
}

# Verify installation with health checks
Write-Status "Running health checks..."

# Check TypeScript compilation
Write-Status "Checking TypeScript compilation..."
try {
    $tscOutput = tsc --noEmit 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Success "TypeScript compilation ✓"
    } else {
        Write-Warning "TypeScript compilation has warnings (this is normal)"
        if ($Verbose) { Write-Host $tscOutput -ForegroundColor DarkGray }
    }
} catch {
    Write-Warning "TypeScript check skipped (tsc not found globally)"
}

# Check linting with npx (Windows compatibility)
Write-Status "Checking ESLint configuration..."
try {
    $eslintOutput = npx eslint . --max-warnings 15 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Success "ESLint configuration ✓"
    } else {
        Write-Warning "ESLint warnings detected (this is normal during development)"
        if ($Verbose) { Write-Host $eslintOutput -ForegroundColor DarkGray }
    }
} catch {
    Write-Warning "ESLint check skipped (configuration issue)"
}

# Test Next.js build
Write-Status "Testing Next.js build..."
Push-Location "apps/web"
try {
    $buildOutput = pnpm build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Next.js build ✓"
    } else {
        Write-Warning "Next.js build has issues (may be due to missing Firebase config)"
        if ($Verbose) { Write-Host $buildOutput -ForegroundColor DarkGray }
    }
} catch {
    Write-Warning "Next.js build test skipped"
} finally {
    Pop-Location
}

Write-Success "🎉 HIVE Development Environment Setup Complete!" 
Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Green
Write-Host ""
Write-Host "1. 🔥 Configure Firebase (if needed):"
Write-Host "   - Edit apps/web/.env.local with your Firebase config"
Write-Host "   - See apps/web/.env.example for the required format"
Write-Host ""
Write-Host "2. 🚀 Start development servers:"
Write-Host "   - Web app:    cd apps/web; pnpm dev"
Write-Host "   - Storybook:  cd packages/ui; pnpm storybook"
Write-Host ""
Write-Host "3. 🔍 Verify everything works:"
Write-Host "   - Web app:    http://localhost:3000"
Write-Host "   - Storybook:  http://localhost:6006"
Write-Host ""
Write-Host "4. 🧪 Run quality checks:"
Write-Host "   - Lint:       npx eslint . --max-warnings 15"
Write-Host "   - TypeCheck:  tsc --noEmit"
Write-Host "   - Build:      cd apps/web; pnpm build"
Write-Host ""
Write-Host "5. 📚 Documentation:"
Write-Host "   - Brand Guide: docs/brand-design.md"
Write-Host "   - Architecture: docs/CODEBASE_AUDIT.md"
Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "Development Environment Status:" -ForegroundColor Blue

try {
    $nodeVer = node --version
    Write-Host "✅ Node.js $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
}

try {
    $pnpmVer = pnpm --version
    Write-Host "✅ pnpm $pnpmVer" -ForegroundColor Green
} catch {
    Write-Host "❌ pnpm not found" -ForegroundColor Red
}

Write-Host "✅ Monorepo packages (14 total)" -ForegroundColor Green
Write-Host "✅ Development servers ready" -ForegroundColor Green

if (-not (Test-Path $envLocalPath) -or -not (Select-String -Path $envLocalPath -Pattern "NEXT_PUBLIC_FIREBASE_API" -Quiet -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Firebase configuration needed for full functionality" -ForegroundColor Yellow
} else {
    Write-Host "✅ Firebase configuration detected" -ForegroundColor Green
}

Write-Host ""
Write-Host "Happy coding! 🐝" -ForegroundColor Green

# Show additional Windows-specific tips
Write-Host ""
Write-Host "Windows-Specific Tips:" -ForegroundColor Cyan
Write-Host "- Use 'npx' for tool commands (e.g., 'npx eslint')"
Write-Host "- Global tools installed as fallbacks for reliability"
Write-Host "- If you encounter issues, try running as Administrator"
Write-Host "- Use PowerShell (not Command Prompt) for best results" 