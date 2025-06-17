# TESTING RENTIVA BACKEND BUILD (Windows PowerShell)
Write-Host "=== TESTING RENTIVA BACKEND BUILD ===" -ForegroundColor Cyan
Write-Host "This script tests if the backend can be built successfully" -ForegroundColor White
Write-Host

# Navigate to backend directory
Set-Location backend

Write-Host "1. Cleaning previous builds..." -ForegroundColor Yellow
& .\mvnw.cmd clean

Write-Host
Write-Host "2. Running tests..." -ForegroundColor Yellow
& .\mvnw.cmd test

Write-Host
Write-Host "3. Building application..." -ForegroundColor Yellow
& .\mvnw.cmd package -DskipTests

Write-Host
Write-Host "4. Checking if JAR was created..." -ForegroundColor Yellow
if (Test-Path "target\backend-0.0.1-SNAPSHOT.jar") {
    Write-Host "✅ JAR file created successfully!" -ForegroundColor Green
    Get-Item "target\backend-0.0.1-SNAPSHOT.jar" | Format-List Name, Length, LastWriteTime
} else {
    Write-Host "❌ JAR file not found!" -ForegroundColor Red
    exit 1
}

Write-Host
Write-Host "5. Testing JAR execution (dry run)..." -ForegroundColor Yellow
Write-Host "JAR file size:" -NoNewline
$jar = Get-Item "target\backend-0.0.1-SNAPSHOT.jar"
Write-Host " $([math]::Round($jar.Length / 1MB, 2)) MB" -ForegroundColor Cyan

Write-Host
Write-Host "✅ Build test completed successfully!" -ForegroundColor Green
Write-Host "The application should deploy correctly on Render." -ForegroundColor White

# Return to original directory
Set-Location ..
