# Clean and build script for Windows
Write-Host "Starting clean build process..." -ForegroundColor Green

# Kill Node processes
Write-Host "Stopping Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Clean build directories
$directories = @(".next", ".next-build")
foreach ($dir in $directories) {
    if (Test-Path $dir) {
        Write-Host "Removing $dir directory..." -ForegroundColor Yellow
        try {
            # First try normal removal
            Remove-Item -Path $dir -Recurse -Force -ErrorAction Stop
            Write-Host "$dir removed successfully" -ForegroundColor Green
        }
        catch {
            Write-Host "Standard removal failed, trying alternative method..." -ForegroundColor Yellow
            # Use robocopy to mirror an empty directory (effectively deleting)
            $emptyDir = New-Item -ItemType Directory -Path "$env:TEMP\empty_$(Get-Random)" -Force
            robocopy $emptyDir.FullName $dir /MIR /R:1 /W:1 | Out-Null
            Remove-Item $emptyDir -Force
            Remove-Item $dir -Force -ErrorAction SilentlyContinue
        }
    }
}

# Set environment variables
Write-Host "Setting environment variables..." -ForegroundColor Yellow
$env:NEXT_TELEMETRY_DISABLED = "1"
$env:NEXT_SKIP_TRACE = "1"
$env:NODE_OPTIONS = "--max-old-space-size=4096"

# Run build
Write-Host "Starting build..." -ForegroundColor Green
& pnpm build

Write-Host "Build process complete!" -ForegroundColor Green