@echo off
echo ========================================
echo   HIVE Build System Fix - Windows
echo ========================================
echo.

echo [1/6] Setting memory limits...
set NODE_OPTIONS=--max-old-space-size=8192

echo [2/6] Cleaning build artifacts...
echo Cleaning .next directories...
if exist apps\web\.next rmdir /s /q apps\web\.next 2>nul
if exist apps\admin\.next rmdir /s /q apps\admin\.next 2>nul

echo Cleaning TypeScript build info...
del /f /q apps\web\.tsbuildinfo 2>nul
del /f /q apps\admin\.tsbuildinfo 2>nul
del /f /q .tsbuildinfo 2>nul

echo [3/6] Building core packages...
echo Building @hive/tokens...
cd packages\tokens
call npx tsc --skipLibCheck --incremental
cd ..\..

echo Building @hive/utilities...
cd packages\utilities
call npx tsc --skipLibCheck --incremental
cd ..\..

echo Building @hive/validation...
cd packages\validation
call npx tsc --skipLibCheck --incremental
cd ..\..

echo Building @hive/core...
cd packages\core
call npx tsc --skipLibCheck --incremental
cd ..\..

echo [4/6] Running TypeScript check (with errors allowed)...
cd apps\web
call npx tsc --noEmit --skipLibCheck --incremental || echo TypeScript has errors, continuing...
cd ..\..

echo [5/6] Testing Next.js build with optimizations...
cd apps\web
echo Building with ignore errors config...
call npx next build || echo Build had issues, check output
cd ..\..

echo [6/6] Summary...
echo ========================================
echo Build process complete!
echo.
echo Next steps:
echo 1. Fix TypeScript errors shown above
echo 2. Run 'pnpm dev' to test development mode
echo 3. Once errors are fixed, run 'pnpm build' again
echo ========================================
pause