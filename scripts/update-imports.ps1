# PowerShell script to update all bridge imports to direct paths

$importMappings = @{
    # components/ui mappings
    "'../../components/ui/alert'" = "'../../atomic/molecules/alert-toast-system'"
    "'../../../components/ui/alert'" = "'../../../atomic/molecules/alert-toast-system'"
    "'../../components/ui/avatar'" = "'../../atomic/atoms/avatar'"
    "'../../../components/ui/avatar'" = "'../../../atomic/atoms/avatar'"
    "'../../components/ui/badge'" = "'../../atomic/atoms/badge'"
    "'../../../components/ui/badge'" = "'../../../atomic/atoms/badge'"
    "'../../components/ui/button'" = "'../../atomic/atoms/button-enhanced'"
    "'../../../components/ui/button'" = "'../../../atomic/atoms/button-enhanced'"
    "'../../components/ui/card'" = "'../../atomic/ui/card'"
    "'../../../components/ui/card'" = "'../../../atomic/ui/card'"
    "'../components/ui/card'" = "'../atomic/ui/card'"
    "'../../components/ui/input'" = "'../../atomic/atoms/input-enhanced'"
    "'../../../components/ui/input'" = "'../../../atomic/atoms/input-enhanced'"
    "'../../components/ui/switch'" = "'../../atomic/atoms/switch-enhanced'"
    "'../../../components/ui/switch'" = "'../../../atomic/atoms/switch-enhanced'"
    "'../../components/ui/tabs'" = "'../../atomic/ui/tabs'"
    "'../../../components/ui/tabs'" = "'../../../atomic/ui/tabs'"
    "'../../components/ui/textarea'" = "'../../atomic/atoms/textarea-enhanced'"
    "'../../../components/ui/textarea'" = "'../../../atomic/atoms/textarea-enhanced'"
    "'../../components/ui/typography'" = "'../../atomic/atoms/typography'"
    "'../../../components/ui/typography'" = "'../../../atomic/atoms/typography'"
    
    # Double quotes versions
    '"../../components/ui/alert"' = '"../../atomic/molecules/alert-toast-system"'
    '"../../../components/ui/alert"' = '"../../../atomic/molecules/alert-toast-system"'
    '"../../components/ui/avatar"' = '"../../atomic/atoms/avatar"'
    '"../../../components/ui/avatar"' = '"../../../atomic/atoms/avatar"'
    '"../../components/ui/badge"' = '"../../atomic/atoms/badge"'
    '"../../../components/ui/badge"' = '"../../../atomic/atoms/badge"'
    '"../../components/ui/button"' = '"../../atomic/atoms/button-enhanced"'
    '"../../../components/ui/button"' = '"../../../atomic/atoms/button-enhanced"'
    '"../../components/ui/card"' = '"../../atomic/ui/card"'
    '"../../../components/ui/card"' = '"../../../atomic/ui/card"'
    '"../components/ui/card"' = '"../atomic/ui/card"'
    '"../../components/ui/input"' = '"../../atomic/atoms/input-enhanced"'
    '"../../../components/ui/input"' = '"../../../atomic/atoms/input-enhanced"'
    '"../../components/ui/switch"' = '"../../atomic/atoms/switch-enhanced"'
    '"../../../components/ui/switch"' = '"../../../atomic/atoms/switch-enhanced"'
    '"../../components/ui/tabs"' = '"../../atomic/ui/tabs"'
    '"../../../components/ui/tabs"' = '"../../../atomic/ui/tabs"'
    '"../../components/ui/textarea"' = '"../../atomic/atoms/textarea-enhanced"'
    '"../../../components/ui/textarea"' = '"../../../atomic/atoms/textarea-enhanced"'
    '"../../components/ui/typography"' = '"../../atomic/atoms/typography"'
    '"../../../components/ui/typography"' = '"../../../atomic/atoms/typography"'
}

Write-Host "Finding all TypeScript/TSX files..." -ForegroundColor Cyan

$files = Get-ChildItem -Path "C:\hive\packages\ui\src" -Include "*.ts","*.tsx" -Recurse -File

Write-Host "Found $($files.Count) files to check" -ForegroundColor Yellow

$updatedCount = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    foreach ($oldImport in $importMappings.Keys) {
        $newImport = $importMappings[$oldImport]
        $content = $content -replace [regex]::Escape($oldImport), $newImport
    }
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "✅ Updated: $($file.Name)" -ForegroundColor Green
        $updatedCount++
    }
}

Write-Host "`n✨ Updated $updatedCount files with direct import paths" -ForegroundColor Magenta