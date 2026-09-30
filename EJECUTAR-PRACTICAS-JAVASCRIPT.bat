@echo off
chcp 65001 > nul
title Practicas de JavaScript (Curso Notion) - Grupo 4-C
set "JS_DIR=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
if not exist "%JS_DIR%" set "JS_DIR=%~dp0"

:menu
cls
echo ========================================================================
echo       PRACTICAS DE JAVASCRIPT - CURSO BASICO DE NOTION (GRUPO 4-C)
echo       Profesor: Moreno ^| Alumno: Santiago Asahel Pech
echo ========================================================================
echo.
echo   [T]  EJECUTAR TODAS LAS 11 PRACTICAS DE CORRIDO
echo   [P]  MODO PRESENTACION: RECORRER UNA POR UNA (CON ENTER)
echo.
echo   --- SELECCIONAR PRACTICA INDIVIDUAL ---
echo   [1]  Practica 01: Variables y Tipos de Datos Primitivos
echo   [2]  Practica 02: Funciones Declarativas y de Expresion (Flecha)
echo   [3]  Practica 03: Scope Global, Local y Hoisting
echo   [4]  Practica 04: Coercion, Truthy/Falsy y Operadores
echo   [5]  Practica 05: Condicionales (Prueba de Calificaciones Interactiva)
echo   [6]  Practica 06: Reto 1 - Juego Piedra, Papel o Tijera (con IF)
echo   [7]  Practica 07: Reto 2 - Juego Piedra, Papel o Tijera (con SWITCH)
echo   [8]  Practica 08: Arrays y Metodos Mutadores (push, pop, etc)
echo   [9]  Practica 09: Bucles y Ciclos (for, for..of, while, do..while)
echo   [10] Practica 10: Reto 3 - Objetos y Constructor de 30 Autos
echo   [11] Practica 11: Metodos Modernos de Array (map, filter, find)
echo.
echo   ----------------------------------------------------------------------
echo   [E]  EDITAR CODIGO FUENTE (Abrir archivo en VS Code o Bloc de Notas)
echo   [W]  Abrir Documentacion Oficial en Word (.docx)
echo   [0]  Salir
echo ========================================================================
set /p opc="Elige una opcion (1-11, T, P, E, W o 0): "

if /i "%opc%"=="t" goto run_all
if /i "%opc%"=="p" goto pres_1
if /i "%opc%"=="e" goto edit_code
if /i "%opc%"=="w" goto open_word
if "%opc%"=="1" goto p1
if "%opc%"=="2" goto p2
if "%opc%"=="3" goto p3
if "%opc%"=="4" goto p4
if "%opc%"=="5" goto p5
if "%opc%"=="6" goto p6
if "%opc%"=="7" goto p7
if "%opc%"=="8" goto p8
if "%opc%"=="9" goto p9
if "%opc%"=="10" goto p10
if "%opc%"=="11" goto p11
if "%opc%"=="0" exit
goto menu

:run_all
cls
echo ========================================================================
echo   EJECUTANDO TODAS LAS 11 PRACTICAS DE JAVASCRIPT EN SERIE
echo ========================================================================
echo.
cd /d "%JS_DIR%"
node ejecutar-todos-los-ejercicios.js
echo.
pause
goto menu

:open_word
cls
echo Abriendo Documentacion oficial en Word...
start "" "%JS_DIR%\Documentacion-Actividad-5.docx"
pause
goto menu

:p1
cls
cd /d "%JS_DIR%"
node practica-01-variables.js
echo.
pause
goto menu

:p2
cls
cd /d "%JS_DIR%"
node practica-02-funciones.js
echo.
pause
goto menu

:p3
cls
cd /d "%JS_DIR%"
node practica-03-scope-y-hoisting.js
echo.
pause
goto menu

:p4
cls
cd /d "%JS_DIR%"
node practica-04-coercion-y-operadores.js
echo.
pause
goto menu

:p5
cls
cd /d "%JS_DIR%"
node practica-05-condicionales.js
echo.
pause
goto menu

:p6
cls
cd /d "%JS_DIR%"
node practica-06-juego-piedra-papel-tijera-if.js
echo.
pause
goto menu

:p7
cls
cd /d "%JS_DIR%"
node practica-07-juego-piedra-papel-tijera-switch.js
echo.
pause
goto menu

:p8
cls
cd /d "%JS_DIR%"
node practica-08-arrays-y-metodos.js
echo.
pause
goto menu

:p9
cls
cd /d "%JS_DIR%"
node practica-09-bucles-for-y-while.js
echo.
pause
goto menu

:p10
cls
cd /d "%JS_DIR%"
node practica-10-objetos-y-reto-constructores.js
echo.
pause
goto menu

:p11
cls
cd /d "%JS_DIR%"
node practica-11-metodos-recorrido-arrays.js
echo.
pause
goto menu

:edit_code
cls
echo ========================================================================
echo   MODO EDICION: ABRIR PRACTICA DE JAVASCRIPT EN EDITOR
echo ========================================================================
echo   Escribe el numero de la practica que deseas editar (1 a 11),
echo   o escribe 'CARPETA' para abrir la carpeta completa en VS Code:
echo.
set /p numedit="Numero de practica a editar (1-11 o CARPETA): "

if /i "%numedit%"=="carpeta" (
  where code >nul 2>nul
  if %errorlevel% equ 0 (
    start "" code "%JS_DIR%"
    echo Carpeta abierta en VS Code.
  ) else (
    explorer "%JS_DIR%"
    echo Carpeta abierta en Explorador de Windows.
  )
  pause
  goto menu
)

set "file_to_edit="
if "%numedit%"=="1" set "file_to_edit=%JS_DIR%\practica-01-variables.js"
if "%numedit%"=="2" set "file_to_edit=%JS_DIR%\practica-02-funciones.js"
if "%numedit%"=="3" set "file_to_edit=%JS_DIR%\practica-03-scope-y-hoisting.js"
if "%numedit%"=="4" set "file_to_edit=%JS_DIR%\practica-04-coercion-y-operadores.js"
if "%numedit%"=="5" set "file_to_edit=%JS_DIR%\practica-05-condicionales.js"
if "%numedit%"=="6" set "file_to_edit=%JS_DIR%\practica-06-juego-piedra-papel-tijera-if.js"
if "%numedit%"=="7" set "file_to_edit=%JS_DIR%\practica-07-juego-piedra-papel-tijera-switch.js"
if "%numedit%"=="8" set "file_to_edit=%JS_DIR%\practica-08-arrays-y-metodos.js"
if "%numedit%"=="9" set "file_to_edit=%JS_DIR%\practica-09-bucles-for-y-while.js"
if "%numedit%"=="10" set "file_to_edit=%JS_DIR%\practica-10-objetos-y-reto-constructores.js"
if "%numedit%"=="11" set "file_to_edit=%JS_DIR%\practica-11-metodos-recorrido-arrays.js"

if not defined file_to_edit (
  echo [ERROR] Numero no valido.
  pause
  goto menu
)

where code >nul 2>nul
if %errorlevel% equ 0 (
  start "" code "%file_to_edit%"
  echo Archivo abierto en VS Code: %file_to_edit%
) else (
  start notepad "%file_to_edit%"
  echo Archivo abierto en Bloc de Notas: %file_to_edit%
)
echo.
echo Presiona Guardar (Ctrl + S) en el editor despues de modificarlo,
echo y al volver a ejecutar la practica veras tus cambios reflejados.
echo.
pause
goto menu

:: ----------------------------------------------------
:: MODO PRESENTACION CONTINUA 1 POR 1
:: ----------------------------------------------------
:pres_1
cls
echo ========================================================================
echo   [PRACTICA 01/11] VARIABLES Y TIPOS DE DATOS
echo ========================================================================
cd /d "%JS_DIR%"
node practica-01-variables.js
echo.
echo Presiona ENTER para ir a la PRACTICA 02...
pause > nul

:pres_2
cls
echo ========================================================================
echo   [PRACTICA 02/11] FUNCIONES DECLARATIVAS Y FLECHA
echo ========================================================================
cd /d "%JS_DIR%"
node practica-02-funciones.js
echo.
echo Presiona ENTER para ir a la PRACTICA 03...
pause > nul

:pres_3
cls
echo ========================================================================
echo   [PRACTICA 03/11] SCOPE GLOBAL, LOCAL Y HOISTING
echo ========================================================================
cd /d "%JS_DIR%"
node practica-03-scope-y-hoisting.js
echo.
echo Presiona ENTER para ir a la PRACTICA 04...
pause > nul

:pres_4
cls
echo ========================================================================
echo   [PRACTICA 04/11] COERCION Y OPERADORES
echo ========================================================================
cd /d "%JS_DIR%"
node practica-04-coercion-y-operadores.js
echo.
echo Presiona ENTER para ir a la PRACTICA 05...
pause > nul

:pres_5
cls
echo ========================================================================
echo   [PRACTICA 05/11] CONDICIONALES (IF / ELSE IF / ELSE)
echo ========================================================================
cd /d "%JS_DIR%"
node practica-05-condicionales.js
echo.
echo Presiona ENTER para ir a la PRACTICA 06...
pause > nul

:pres_6
cls
echo ========================================================================
echo   [PRACTICA 06/11] RETO 1: PIEDRA, PAPEL O TIJERA (IF)
echo ========================================================================
cd /d "%JS_DIR%"
node practica-06-juego-piedra-papel-tijera-if.js
echo.
echo Presiona ENTER para ir a la PRACTICA 07...
pause > nul

:pres_7
cls
echo ========================================================================
echo   [PRACTICA 07/11] RETO 2: PIEDRA, PAPEL O TIJERA (SWITCH)
echo ========================================================================
cd /d "%JS_DIR%"
node practica-07-juego-piedra-papel-tijera-switch.js
echo.
echo Presiona ENTER para ir a la PRACTICA 08...
pause > nul

:pres_8
cls
echo ========================================================================
echo   [PRACTICA 08/11] ARRAYS Y METODOS (PUSH, POP, SHIFT)
echo ========================================================================
cd /d "%JS_DIR%"
node practica-08-arrays-y-metodos.js
echo.
echo Presiona ENTER para ir a la PRACTICA 09...
pause > nul

:pres_9
cls
echo ========================================================================
echo   [PRACTICA 09/11] BUCLES (FOR, WHILE, DO..WHILE)
echo ========================================================================
cd /d "%JS_DIR%"
node practica-09-bucles-for-y-while.js
echo.
echo Presiona ENTER para ir a la PRACTICA 10...
pause > nul

:pres_10
cls
echo ========================================================================
echo   [PRACTICA 10/11] RETO 3: 30 AUTOS CON CONSTRUCTOR
echo ========================================================================
cd /d "%JS_DIR%"
node practica-10-objetos-y-reto-constructores.js
echo.
echo Presiona ENTER para ir a la PRACTICA 11...
pause > nul

:pres_11
cls
echo ========================================================================
echo   [PRACTICA 11/11] METODOS MODERNOS DE ARRAY (ES6+)
echo ========================================================================
cd /d "%JS_DIR%"
node practica-11-metodos-recorrido-arrays.js
echo.
echo ========================================================================
echo   TODAS LAS PRACTICAS DE JAVASCRIPT HAN SIDO PRESENTADAS
echo ========================================================================
pause
goto menu
