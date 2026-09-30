@echo off
chcp 65001 > nul
title Verificador de Herramientas de Apoyo - Ecosistema Web (4-C)
cd /d "%~dp001-Introduccion-al-Desarrollo-Web\Actividad-2-Entorno-y-Herramientas"
node verificar-entorno.js
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
