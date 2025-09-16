@echo off
echo Starting HIVE Web App Build Process

echo Cleaning up previous build files...
if exist .next (
    echo Taking ownership of .next directory...
    takeown /F .next /R /D Y >nul 2>&1
    icacls .next /grant Everyone:F /T >nul 2>&1
    rmdir /S /Q .next >nul 2>&1
    echo .next directory removed
)

echo Creating fresh .next directory with proper permissions...
mkdir .next
icacls .next /grant Everyone:F /T >nul 2>&1

echo Setting environment variables...
set NEXT_TELEMETRY_DISABLED=1
set NODE_ENV=production

echo Starting Next.js production build...
npx next build

echo Build process complete!
pause