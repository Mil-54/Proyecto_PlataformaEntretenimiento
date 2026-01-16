# Deploy Script for VisionPlus
Write-Host "Iniciando despliegue de VisionPlus (Cluster + Frontend)..." -ForegroundColor Cyan

# Check dependencies
if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Host "Error: docker-compose no encontrado. Por favor instala Docker Desktop." -ForegroundColor Red
    exit 1
}

# Build and Run
Write-Host "Construyendo e iniciando contenedores..." -ForegroundColor Yellow
docker-compose up --build -d

if ($LASTEXITCODE -eq 0) {
    Write-Host "¡Despliegue Exitoso!" -ForegroundColor Green
    Write-Host "- Frontend: http://localhost:8080"
    Write-Host "- Backend Cluster: http://localhost:3000"
    Write-Host "- Backend 1: http://localhost:3001"
    Write-Host "- Backend 2: http://localhost:3002"
} else {
    Write-Host "Error durante el despliegue. Asegúrate de que Docker Desktop esté corriendo." -ForegroundColor Red
}
