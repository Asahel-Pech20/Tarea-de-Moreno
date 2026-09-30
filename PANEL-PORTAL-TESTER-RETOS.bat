@echo off
chcp 65001 > nul
title Panel Integrado: Portal Noticias ^| Tester API ^| Retos JavaScript (4-C)
set "BASE_DIR=%~dp0"

:menu
cls
echo ========================================================================
echo   PANEL INTEGRADO: PORTAL NOTICIAS ^| TESTER API ^| RETOS JAVASCRIPT
echo   Materia: Aplicaciones Web (4-C) ^| Alumno: Santiago Asahel Pech
echo ========================================================================
echo.
echo   ======================================================================
echo   [1] PORTAL DE NOTICIAS (WEBNEWS: ANGULAR MATERIAL + REST API)
echo   ======================================================================
echo       1A. Iniciar Portal Completo (Backend :3000 + Frontend Angular :4200)
echo       1B. Abrir Portal en Navegador (http://localhost:4200)
echo       1C. Ver Documentacion Oficial de WebNews (.docx)
echo.
echo   ======================================================================
echo   [2] TESTER API (PROBADOR DE ENDPOINTS REST SIN FRONTEND)
echo   ======================================================================
echo       2A. Ejecutar Tester API en Consola (Login, News, Categories, CRUD)
echo       2B. Abrir Aplicacion Oficial de Postman (Escritorio)
echo.
echo   ======================================================================
echo   [3] RETOS Y PRACTICAS DE JAVASCRIPT (CURSO NOTION)
echo   ======================================================================
echo       3A. Ejecutar Reto 1: Piedra, Papel o Tijera (con IF / ELSE)
echo       3B. Ejecutar Reto 2: Piedra, Papel o Tijera (con SWITCH)
echo       3C. Ejecutar Reto 3: Generador de 30 Autos con Constructor
echo       3D. Ejecutar TODAS las 11 Practicas de JavaScript en Serie
echo       3E. Modo Presentacion 1 por 1 de JavaScript (con ENTER)
echo       3F. Abrir Documentacion Oficial de JavaScript (.docx)
echo.
echo   ======================================================================
echo   [4] ENLACES OFICIALES DE NOTION (MATERIAL DE LOS TXT)
echo   ======================================================================
echo       4A. Abrir Curso Basico de JavaScript (Notion)
echo       4B. Abrir Curso Creacion de App Web + API Rest con Angular (Notion)
echo.
echo   ----------------------------------------------------------------------
echo   [0] Salir
echo ========================================================================
set /p opc="Elige una opcion (ej. 1A, 2A, 3A, 4A o 0): "

if /i "%opc%"=="1a" goto portal_start
if /i "%opc%"=="1b" goto portal_browser
if /i "%opc%"=="1c" goto portal_doc
if /i "%opc%"=="2a" goto tester_cli
if /i "%opc%"=="2b" goto tester_postman
if /i "%opc%"=="3a" goto reto_1
if /i "%opc%"=="3b" goto reto_2
if /i "%opc%"=="3c" goto reto_3
if /i "%opc%"=="3d" goto js_all
if /i "%opc%"=="3e" goto js_pres
if /i "%opc%"=="3f" goto js_doc
if /i "%opc%"=="4a" goto link_js
if /i "%opc%"=="4b" goto link_angular
if "%opc%"=="0" exit
goto menu

:portal_start
cls
echo Iniciando Servidor Backend API y Frontend Angular...
cd /d "%BASE_DIR%03-Proyecto-Angular-WebNews"
call iniciar-proyecto.bat
cd /d "%BASE_DIR%"
goto menu

:portal_browser
cls
echo Abriendo Portal de Noticias WebNews en el navegador...
start http://localhost:4200
goto menu

:portal_doc
cls
echo Abriendo Documentacion del Portal WebNews en Word...
start "" "%BASE_DIR%03-Proyecto-Angular-WebNews\Documentacion-Proyecto-WebNews.docx"
pause
goto menu

:tester_cli
cls
echo ========================================================================
echo   EJECUTANDO TESTER API (PRUEBA DE ENDPOINTS HTTP REST)
echo ========================================================================
echo Verificando si el backend esta activo...
cd /d "%BASE_DIR%03-Proyecto-Angular-WebNews"
node tester-api.js
echo.
pause
cd /d "%BASE_DIR%"
goto menu

:tester_postman
cls
echo Abriendo aplicacion Postman instalada en tu sistema...
set "POSTMAN_EXE=%LOCALAPPDATA%\Postman\Postman.exe"
if exist "%POSTMAN_EXE%" (
  start "" "%POSTMAN_EXE%"
  echo Postman iniciado correctamente.
) else (
  start postman
)
pause
goto menu

:reto_1
cls
cd /d "%BASE_DIR%02-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-06-juego-piedra-papel-tijera-if.js
echo.
pause
cd /d "%BASE_DIR%"
goto menu

:reto_2
cls
cd /d "%BASE_DIR%02-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-07-juego-piedra-papel-tijera-switch.js
echo.
pause
cd /d "%BASE_DIR%"
goto menu

:reto_3
cls
cd /d "%BASE_DIR%02-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-10-objetos-y-reto-constructores.js
echo.
pause
cd /d "%BASE_DIR%"
goto menu

:js_all
cls
cd /d "%BASE_DIR%02-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node ejecutar-todos-los-ejercicios.js
echo.
pause
cd /d "%BASE_DIR%"
goto menu

:js_pres
cls
call "%BASE_DIR%EJECUTAR-PRACTICAS-JAVASCRIPT.bat"
goto menu

:js_doc
cls
echo Abriendo Documentacion oficial de JavaScript en Word...
start "" "%BASE_DIR%02-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\Documentacion-Actividad-5.docx"
pause
goto menu

:link_js
cls
echo Abriendo Curso Basico de JavaScript en Notion...
start https://stupendous-trampoline-679.notion.site/Curso-B-sico-de-JavaScript-b0e19a030134478eb47f2f3cc477cdcd
goto menu

:link_angular
cls
echo Abriendo Curso de Aplicaciones Web y Consumo API Rest con Angular en Notion...
start https://verbose-vole-299.notion.site/Curso-de-Aprendizaje-Creaci-n-de-Aplicaciones-Web-y-consumo-a-una-API-Rest-con-Angular-Material-b47047f82b144ff19c3f328050208e52
goto menu
