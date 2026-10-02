param()

$baseDir = "C:\Tareas del 4-C\Aplicaciones web"
$outputDir1 = "C:\Tareas del 4-C"
$outputDir2 = "C:\Users\santi\Desktop"

Add-Type -AssemblyName System.IO.Compression.FileSystem

# 1. Crear ZIP General del Curso (desde git archive para asegurar limpieza absoluta)
$zipGeneral = Join-Path $outputDir1 "Tarea-Aplicaciones-Web-4C-Oscar-Matos-Santiago-Pech.zip"
$zipGeneralLegacy = Join-Path $outputDir1 "Tarea-Aplicaciones-Web-4C-Santiago-Pech.zip"
if (Test-Path $zipGeneral) { Remove-Item $zipGeneral -Force }
if (Test-Path $zipGeneralLegacy) { Remove-Item $zipGeneralLegacy -Force }
git -C "$baseDir" archive -o "$zipGeneral" HEAD
Copy-Item $zipGeneral $zipGeneralLegacy -Force

# 2. Crear ZIP específico de WebNews + Retos JS + Tester API
$zipWebNews = Join-Path $outputDir1 "WebNews-Portal-Angular-Api-RetosJS.zip"
if (Test-Path $zipWebNews) { Remove-Item $zipWebNews -Force }

$tempDir = Join-Path $env:TEMP ("webnews_export_" + (Get-Random))
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

$srcWebNews = Join-Path $baseDir "03-Proyecto-Angular-WebNews"
$destWebNews = Join-Path $tempDir "03-Proyecto-Angular-WebNews"
New-Item -ItemType Directory -Path $destWebNews -Force | Out-Null

# Copiar backend-api sin node_modules
$backendSrc = Join-Path $srcWebNews "backend-api"
$backendDest = Join-Path $destWebNews "backend-api"
New-Item -ItemType Directory -Path $backendDest -Force | Out-Null
Get-ChildItem -Path $backendSrc -Force | Where-Object { $_.Name -ne 'node_modules' } | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $backendDest -Recurse -Force
}

# Copiar webnews-frontend sin node_modules ni .angular
$frontendSrc = Join-Path $srcWebNews "webnews-frontend"
$frontendDest = Join-Path $destWebNews "webnews-frontend"
New-Item -ItemType Directory -Path $frontendDest -Force | Out-Null
Get-ChildItem -Path $frontendSrc -Force | Where-Object { $_.Name -notin @('node_modules', '.angular') } | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $frontendDest -Recurse -Force
}

# Copiar lanzadores .bat y enlaces a la raíz del zip
Copy-Item (Join-Path $baseDir "PANEL-PORTAL-TESTER-RETOS.bat") $tempDir -Force
Copy-Item (Join-Path $baseDir "ABRIR-PORTAL-WEB.bat") $tempDir -Force
Copy-Item (Join-Path $baseDir "EJECUTAR-TODO-EN-ORDEN.bat") $tempDir -Force
Copy-Item (Join-Path $baseDir "EJECUTAR-PRACTICAS-JAVASCRIPT.bat") $tempDir -Force
Copy-Item (Join-Path $baseDir "README.md") $tempDir -Force

[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $zipWebNews, [System.IO.Compression.CompressionLevel]::Optimal, $false)
Remove-Item -Path $tempDir -Recurse -Force

# Copiar al Escritorio para facilidad del usuario
Copy-Item $zipGeneral (Join-Path $outputDir2 "Tarea-Aplicaciones-Web-4C-Oscar-Matos-Santiago-Pech.zip") -Force
Copy-Item $zipGeneralLegacy (Join-Path $outputDir2 "Tarea-Aplicaciones-Web-4C-Santiago-Pech.zip") -Force
Copy-Item $zipWebNews (Join-Path $outputDir2 "WebNews-Portal-Angular-Api-RetosJS.zip") -Force

Write-Host "=== ARCHIVOS ZIP CREADOS EXITOSAMENTE ==="
Write-Host "1. $zipGeneral ($((Get-Item $zipGeneral).Length) bytes)"
Write-Host "2. $zipWebNews ($((Get-Item $zipWebNews).Length) bytes)"
Write-Host "Tambien copiados en el Escritorio: $outputDir2"
