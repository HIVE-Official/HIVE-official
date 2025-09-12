@echo off
echo Cleaning build directories...

REM Kill any running Node processes
taskkill /F /IM node.exe 2>nul

REM Clean .next directory
if exist ".next" (
    rmdir /s /q ".next" 2>nul
    if exist ".next" (
        echo Warning: Could not remove .next directory completely
        REM Try to delete individual files
        del /f /s /q ".next\*" 2>nul
    )
)

REM Clean .next-build directory if it exists
if exist ".next-build" (
    rmdir /s /q ".next-build" 2>nul
)

REM Set environment variables to disable telemetry
set NEXT_TELEMETRY_DISABLED=1
set NEXT_SKIP_TRACE=1

echo Build directories cleaned. Starting build...

REM Run the build
call pnpm build

echo Build complete!