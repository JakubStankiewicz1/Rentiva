#!/usr/bin/env pwsh
# Test script to verify admin build process

Write-Host "Testing admin build process..." -ForegroundColor Green

# Navigate to admin directory
Set-Location admin

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm ci

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "Building admin app..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build admin app" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Admin build completed successfully!" -ForegroundColor Green

# Check if dist directory was created
if (Test-Path "dist") {
    Write-Host "✅ dist directory created successfully" -ForegroundColor Green
    Write-Host "Contents of dist directory:" -ForegroundColor Cyan
    Get-ChildItem dist -Name
} else {
    Write-Host "❌ dist directory not found" -ForegroundColor Red
    exit 1
}

# Return to root directory
Set-Location ..
