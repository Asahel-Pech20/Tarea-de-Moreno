@echo off
title WebNews - Lanzador del Proyecto Completo (4-C)
echo ===================================================================
echo 🚀 INICIANDO PROYECTO WEBNEWS: ANGULAR MATERIAL + REST API
echo ===================================================================
echo.
echo 1. Iniciando Servidor Backend API en el puerto 3000...
start "WebNews Backend API" cmd /k "cd backend-api && node server.js"

echo 2. Iniciando Aplicacion Frontend Angular en el puerto 4200...
start "WebNews Frontend" cmd /k "cd webnews-frontend && npm start"

echo.
echo ===================================================================
echo ✅ Ambos servicios se estan iniciando en ventanas independientes:
echo    - Backend API: http://localhost:3000/api
echo    - Frontend Web: http://localhost:4200
echo ===================================================================
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
