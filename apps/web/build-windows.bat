@echo off
echo Starting Windows-optimized build...

REM Set environment variables for Windows
set NODE_OPTIONS=--max-old-space-size=4096
set NEXT_TELEMETRY_DISABLED=1
set SKIP_ENV_VALIDATION=1
set DISABLE_ESLINT_PLUGIN=true

REM Clean previous build artifacts
echo Cleaning build artifacts...
if exist .next (
    powershell -Command "Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue" 2>nul
)
if exist "node_modules\.cache" (
    powershell -Command "Remove-Item -Path 'node_modules/.cache' -Recurse -Force -ErrorAction SilentlyContinue" 2>nul
)

REM Create .next directory with proper permissions
mkdir .next 2>nul

REM Run the build
echo Running Next.js build...
call npx next build --no-lint

echo Build complete!