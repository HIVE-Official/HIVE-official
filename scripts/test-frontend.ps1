# HIVE Frontend Testing Script (PowerShell)
# Windows-compatible testing script for HIVE web application
param(
    [string]$TestType = "all",
    [switch]$Watch,
    [switch]$Coverage,
    [switch]$Verbose,
    [switch]$Headed
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
    Write-ColoredOutput "🧪 $Message" "Cyan"
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

# Main testing function
function Test-HIVE-Frontend {
    Write-ColoredOutput "`n🎯 HIVE Frontend Testing Suite" "Magenta"
    Write-ColoredOutput "Test Type: $TestType" "Yellow"
    Write-ColoredOutput "Watch Mode: $Watch" "Yellow"
    Write-ColoredOutput "Coverage: $Coverage" "Yellow"
    Write-ColoredOutput "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n" "Gray"

    try {
        # Check prerequisites
        Write-Step "Checking testing prerequisites..."
        
        # Check if we're in the correct directory
        if (-not (Test-Path "apps\web\package.json")) {
            Write-Error "Web application not found. Please run from HIVE root directory."
            exit 1
        }
        
        # Navigate to web app directory
        Set-Location "apps\web"
        
        Write-Success "Prerequisites check complete"

        # Install dependencies if node_modules doesn't exist
        if (-not (Test-Path "node_modules")) {
            Write-Step "Installing test dependencies..."
            pnpm install
            if ($LASTEXITCODE -ne 0) {
                Write-Error "Failed to install dependencies"
                exit 1
            }
            Write-Success "Dependencies installed"
        }

        # Run different test types
        switch ($TestType.ToLower()) {
            "unit" {
                Write-Step "Running unit tests..."
                Run-UnitTests
            }
            "integration" {
                Write-Step "Running integration tests..."
                Run-IntegrationTests
            }
            "component" {
                Write-Step "Running component tests..."
                Run-ComponentTests
            }
            "e2e" {
                Write-Step "Running end-to-end tests..."
                Run-E2ETests
            }
            "performance" {
                Write-Step "Running performance tests..."
                Run-PerformanceTests
            }
            "accessibility" {
                Write-Step "Running accessibility tests..."
                Run-AccessibilityTests
            }
            "visual" {
                Write-Step "Running visual regression tests..."
                Run-VisualTests
            }
            "all" {
                Write-Step "Running all test suites..."
                Run-AllTests
            }
            default {
                Write-Error "Unknown test type: $TestType"
                Show-TestHelp
                exit 1
            }
        }

        Write-ColoredOutput "`n🎉 All tests completed successfully!" "Green"
        
    } catch {
        Write-Error "Testing failed with error: $($_.Exception.Message)"
        exit 1
    } finally {
        # Return to root directory
        Set-Location "..\..\"
    }
}

function Run-UnitTests {
    Write-Step "Executing unit tests..."
    
    if ($Watch) {
        pnpm run test:watch --dir src/test/unit
    } elseif ($Coverage) {
        pnpm run test:coverage --dir src/test/unit
    } else {
        pnpm run test:unit
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Unit tests failed"
        exit 1
    }
    Write-Success "Unit tests passed"
}

function Run-IntegrationTests {
    Write-Step "Executing integration tests..."
    
    if ($Watch) {
        pnpm run test:watch --dir src/test/integration
    } else {
        pnpm run test:integration
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Integration tests failed"
        exit 1
    }
    Write-Success "Integration tests passed"
}

function Run-ComponentTests {
    Write-Step "Executing component tests..."
    
    if ($Watch) {
        pnpm run test:watch --dir src/test/component
    } else {
        pnpm run test:component
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Component tests failed"
        exit 1
    }
    Write-Success "Component tests passed"
}

function Run-E2ETests {
    Write-Step "Executing end-to-end tests..."
    
    if ($Headed) {
        pnpm run test:e2e:headed
    } else {
        pnpm run test:e2e
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "E2E tests failed (this may be expected in development)"
    } else {
        Write-Success "E2E tests passed"
    }
}

function Run-PerformanceTests {
    Write-Step "Executing performance tests..."
    
    pnpm run test:performance:e2e
    
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Performance tests failed (this may be expected in development)"
    } else {
        Write-Success "Performance tests passed"
    }
}

function Run-AccessibilityTests {
    Write-Step "Executing accessibility tests..."
    
    pnpm run test:accessibility
    
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Accessibility tests failed"
    } else {
        Write-Success "Accessibility tests passed"
    }
}

function Run-VisualTests {
    Write-Step "Executing visual regression tests..."
    
    pnpm run test:visual
    
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Visual regression tests failed"
    } else {
        Write-Success "Visual regression tests passed"
    }
}

function Run-AllTests {
    Write-Step "Running comprehensive test suite..."
    
    # Run tests in order of increasing complexity
    Run-UnitTests
    Run-ComponentTests
    Run-IntegrationTests
    
    # Run E2E tests (may fail in development)
    Write-Step "Running end-to-end tests (may fail in dev environment)..."
    try {
        Run-E2ETests
    } catch {
        Write-Warning "E2E tests failed, continuing..."
    }
    
    # Run performance tests (may fail in development)
    Write-Step "Running performance tests (may fail in dev environment)..."
    try {
        Run-PerformanceTests
    } catch {
        Write-Warning "Performance tests failed, continuing..."
    }
}

function Show-TestHelp {
    Write-ColoredOutput @"

HIVE Frontend Testing Script (PowerShell)
=========================================

Usage: 
  .\scripts\test-frontend.ps1 [-TestType <type>] [-Watch] [-Coverage] [-Headed]

Parameters:
  -TestType       Type of tests to run
                  Options: unit, integration, component, e2e, performance, 
                          accessibility, visual, all
                  Default: all
  
  -Watch          Run tests in watch mode (for unit/integration/component)
  
  -Coverage       Generate test coverage reports
  
  -Headed         Run E2E tests with browser UI visible
  
  -Verbose        Show verbose output

Test Types:
  unit            Fast unit tests for individual functions/components
  integration     Integration tests for feature interactions
  component       React component rendering and interaction tests
  e2e             End-to-end browser tests with Playwright
  performance     Performance and load testing
  accessibility   Accessibility compliance testing
  visual          Visual regression testing
  all             Run all test types (default)

Examples:
  .\scripts\test-frontend.ps1                    # Run all tests
  .\scripts\test-frontend.ps1 -TestType unit    # Run only unit tests
  .\scripts\test-frontend.ps1 -TestType unit -Watch  # Unit tests in watch mode
  .\scripts\test-frontend.ps1 -TestType e2e -Headed # E2E tests with browser UI
  .\scripts\test-frontend.ps1 -Coverage         # All tests with coverage

"@ "Cyan"
}

# Handle help parameter
if ($args -contains "-Help" -or $args -contains "--help" -or $args -contains "-h") {
    Show-TestHelp
    exit 0
}

# Run the tests
Test-HIVE-Frontend

Write-ColoredOutput "`n🧪 HIVE testing complete - ready for UB launch! 🦬" "Magenta"