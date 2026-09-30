@echo off
chcp 65001 > nul
title Portafolio de Aplicaciones Web - Grupo 4-C

:menu
cls
echo ========================================================================
echo       PORTAFOLIO DE ACTIVIDADES - APLICACIONES WEB (GRUPO 4-C)
echo       Profesor: Moreno ^| Alumno: Santiago Asahel Pech
echo ========================================================================
echo.
echo   --- CURSO 1: UNIDAD I - INTRODUCCION Y ENTORNO ---
echo   [1] Ejecutar Verificacion de Entorno (Node.js, NPM, Git)
echo   [2] Abrir Documento Word - Actividad 1 y 2
echo.
echo   --- CURSO 2: UNIDAD II - MAQUETACION Y DISENO FRONTEND ---
echo   [3] Abrir Practica HTML5 Semantica (Navegador)
echo   [4] Abrir Practica CSS3 Estilos y Flexbox (Navegador)
echo   [5] Abrir Documento Word - HTML5 y CSS3
echo.
echo   --- CURSO 3: CURSO BASICO DE JAVASCRIPT (NOTION) ---
echo   [6] Ejecutar TODAS las 11 Practicas de JavaScript en Serie
echo   [7] Seleccionar y Ejecutar una Practica de JavaScript Especifica
echo   [8] Abrir Documento Word - Practicas de JavaScript
echo.
echo   --- CURSO 4: APLICACIONES WEB CON ANGULAR MATERIAL Y API REST ---
echo   [9] Iniciar Proyecto WebNews Completo (Backend :3000 + Frontend :4200)
echo   [10] Abrir Documento Word - Proyecto WebNews
echo.
echo   ----------------------------------------------------------------------
echo   [0] Salir
echo ========================================================================
set /p opcion="Selecciona una opcion (0-10): "

if "%opcion%"=="1" goto opc1
if "%opcion%"=="2" goto opc2
if "%opcion%"=="3" goto opc3
if "%opcion%"=="4" goto opc4
if "%opcion%"=="5" goto opc5
if "%opcion%"=="6" goto opc6
if "%opcion%"=="7" goto opc7
if "%opcion%"=="8" goto opc8
if "%opcion%"=="9" goto opc9
if "%opcion%"=="10" goto opc10
if "%opcion%"=="0" exit
goto menu

:opc1
cls
echo ========================================================================
echo   CURSO 1: VERIFICACION DE ENTORNO DE DESARROLLO
echo ========================================================================
echo.
cd /d "%~dp001-Introduccion-al-Desarrollo-Web\Actividad-2-Entorno-y-Herramientas"
node verificar-entorno.js
echo.
pause
cd /d "%~dp0"
goto menu

:opc2
cls
echo Abriendo Documentacion de la Unidad 1...
start "" "%~dp001-Introduccion-al-Desarrollo-Web\Actividad-1-Conceptos-Generales\Documentacion-Actividad-1.docx"
start "" "%~dp001-Introduccion-al-Desarrollo-Web\Actividad-2-Entorno-y-Herramientas\Documentacion-Actividad-2.docx"
goto menu

:opc3
cls
echo Abriendo Practica de HTML5 Semantico en el navegador...
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-3-HTML5-Estructura\index.html"
goto menu

:opc4
cls
echo Abriendo Practica de CSS3 y Flexbox en el navegador...
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-4-CSS3-Estilos-y-Layout\index.html"
goto menu

:opc5
cls
echo Abriendo Documentacion de HTML5 y CSS3...
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-3-HTML5-Estructura\Documentacion-Actividad-3.docx"
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-4-CSS3-Estilos-y-Layout\Documentacion-Actividad-4.docx"
goto menu

:opc6
cls
echo ========================================================================
echo   CURSO 3: EJECUTANDO LAS 11 PRACTICAS DE JAVASCRIPT EN SERIE
echo ========================================================================
echo.
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node ejecutar-todos-los-ejercicios.js
echo.
pause
cd /d "%~dp0"
goto menu

:opc7
cls
echo ========================================================================
echo   SUB-MENU: SELECCIONA LA PRACTICA DE JAVASCRIPT A EJECUTAR
echo ========================================================================
echo   [1]  Practica 01: Variables y Tipos de Datos
echo   [2]  Practica 02: Funciones Declarativas y de Expresion
echo   [3]  Practica 03: Scope Global, Local y Hoisting
echo   [4]  Practica 04: Coercion, Truthy/Falsy y Operadores
echo   [5]  Practica 05: Condicionales (if, else if, else)
echo   [6]  Practica 06: Reto Juego Piedra, Papel o Tijera (con IF)
echo   [7]  Practica 07: Reto Juego Piedra, Papel o Tijera (con SWITCH)
echo   [8]  Practica 08: Arrays y Metodos Mutadores (push, pop, etc)
echo   [9]  Practica 09: Bucles y Ciclos (for, for..of, while, do..while)
echo   [10] Practica 10: Objetos y Reto de 30 Autos con Constructor
echo   [11] Practica 11: Metodos Modernos de Array (map, filter, find, reduce)
echo   [0]  Volver al menu principal
echo ========================================================================
set /p opcjs="Elige una practica (0-11): "

cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
if "%opcjs%"=="1" node practica-01-variables.js & pause & goto opc7
if "%opcjs%"=="2" node practica-02-funciones.js & pause & goto opc7
if "%opcjs%"=="3" node practica-03-scope-y-hoisting.js & pause & goto opc7
if "%opcjs%"=="4" node practica-04-coercion-y-operadores.js & pause & goto opc7
if "%opcjs%"=="5" node practica-05-condicionales.js & pause & goto opc7
if "%opcjs%"=="6" node practica-06-juego-piedra-papel-tijera-if.js & pause & goto opc7
if "%opcjs%"=="7" node practica-07-juego-piedra-papel-tijera-switch.js & pause & goto opc7
if "%opcjs%"=="8" node practica-08-arrays-y-metodos.js & pause & goto opc7
if "%opcjs%"=="9" node practica-09-bucles-for-y-while.js & pause & goto opc7
if "%opcjs%"=="10" node practica-10-objetos-y-reto-constructores.js & pause & goto opc7
if "%opcjs%"=="11" node practica-11-metodos-recorrido-arrays.js & pause & goto opc7
if "%opcjs%"=="0" cd /d "%~dp0" & goto menu
goto opc7

:opc8
cls
echo Abriendo Documentacion de JavaScript (Notion)...
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\Documentacion-Actividad-5.docx"
goto menu

:opc9
cls
echo ========================================================================
echo   CURSO 4: INICIANDO PROYECTO WEBNEWS (BACKEND + FRONTEND)
echo ========================================================================
echo.
cd /d "%~dp003-Proyecto-Angular-WebNews"
call iniciar-proyecto.bat
cd /d "%~dp0"
goto menu

:opc10
cls
echo Abriendo Documentacion del Proyecto WebNews...
start "" "%~dp003-Proyecto-Angular-WebNews\Documentacion-Proyecto-WebNews.docx"
goto menu
