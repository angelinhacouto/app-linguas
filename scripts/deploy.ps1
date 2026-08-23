# Deploy automatico: build + GitHub + Vercel
param(
    [string]$Message = "Update app"
)

$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "`n=== Deploy automatico ===" -ForegroundColor Cyan

# Node no PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# 1. Validar build
Write-Host "[1/3] Build web..." -ForegroundColor Yellow
npm run build:web
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Build falhou. Deploy cancelado." -ForegroundColor Red
    exit 1
}

# 2. Commit
Write-Host "[2/3] Enviando para GitHub..." -ForegroundColor Yellow
git add -A
git diff --staged --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "Nada para publicar (sem alteracoes)." -ForegroundColor Gray
    exit 0
}

git -c user.email="angelinhacouto@gmail.com" -c user.name="Angela Couto" commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Commit falhou." -ForegroundColor Red
    exit 1
}

# 3. Push (Vercel faz deploy automatico)
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Push falhou. Rode: gh auth login" -ForegroundColor Red
    exit 1
}

Write-Host "`n SUCESSO!" -ForegroundColor Green
Write-Host " Site: https://app-linguas.vercel.app" -ForegroundColor Cyan
Write-Host " Aguarde ~1-2 min e atualize com Ctrl+F5`n" -ForegroundColor Yellow
