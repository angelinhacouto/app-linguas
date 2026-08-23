# Setup automatico completo: GitHub + deploy Vercel
# Duplo-clique em INSTALAR-GITHUB.bat para executar

$ErrorActionPreference = "Continue"
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Linguas Kids - Setup Automatico" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Abrir paginas uteis
Start-Process "https://github.com/login/device"
Start-Process "https://vercel.com/angelinhacoutos-projects/app-linguas"

# Verificar gh
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "ERRO: Instale GitHub CLI em https://cli.github.com/" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Login GitHub (conta angelinhacouto)
Write-Host "[1/4] Login no GitHub..." -ForegroundColor Yellow
$null = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "  >>> Uma janela do navegador vai abrir." -ForegroundColor White
    Write-Host "  >>> Faca login com: angelinhacouto@gmail.com" -ForegroundColor White
    Write-Host "  >>> Copie o codigo que aparecer no terminal" -ForegroundColor White
    Write-Host ""
    gh auth login --web --git-protocol https --hostname github.com
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Login nao concluido. Tente novamente." -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "  OK - Logado no GitHub!" -ForegroundColor Green

# Configurar git para usar gh
Write-Host "[2/4] Configurando Git..." -ForegroundColor Yellow
gh auth setup-git 2>$null

# Criar repo se nao existir
Write-Host "[3/4] Verificando repositorio..." -ForegroundColor Yellow
$null = gh repo view angelinhacouto/app-linguas 2>&1
if ($LASTEXITCODE -ne 0) {
    gh repo create app-linguas --public --source=. --remote=origin --description "App de linguas para criancas"
} else {
    git remote remove origin 2>$null
    git remote add origin https://github.com/angelinhacouto/app-linguas.git
}

# Enviar codigo
Write-Host "[4/4] Enviando codigo (deploy automatico na Vercel)..." -ForegroundColor Yellow
git branch -M main
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  SUCESSO!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "  GitHub:  https://github.com/angelinhacouto/app-linguas" -ForegroundColor Cyan
    Write-Host "  Vercel:  https://app-linguas.vercel.app" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  A Vercel vai fazer deploy em ~2 minutos." -ForegroundColor Yellow
    Write-Host "  Atualize a pagina da Vercel para ver o progresso." -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "ERRO no push. Verifique se usou a conta angelinhacouto." -ForegroundColor Red
    Write-Host ""
}

Read-Host "Pressione Enter para fechar"
