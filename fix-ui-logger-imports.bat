@echo off
echo Fixing logger imports in UI package...

REM Use PowerShell to perform the replacement
powershell -Command "Get-ChildItem -Path 'packages\ui\src' -Recurse -Include *.ts,*.tsx | ForEach-Object { $content = Get-Content $_.FullName -Raw; if ($content -match ""import \{ logger \} from '@hive/core/utils/logger';"") { $newPath = (Resolve-Path -Path $_.DirectoryName -Relative -RelativeBasePath 'packages\ui\src').Replace('\', '/'); $levels = ($newPath -split '/').Count; if ($levels -eq 0 -or $newPath -eq '.') { $relativePath = './utils/logger' } else { $relativePath = ('../' * $levels) + 'utils/logger' }; $newContent = $content -replace ""import \{ logger \} from '@hive/core/utils/logger';"", ""import { logger } from '$relativePath';""; Set-Content -Path $_.FullName -Value $newContent -NoNewline; Write-Host ""Fixed: $($_.Name)"" } }"

echo Done!