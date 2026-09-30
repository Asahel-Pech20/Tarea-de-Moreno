@echo off
chcp 65001 > nul
title Presentador de Actividades 1 por 1 - Aplicaciones Web (4-C)

:menu
cls
echo ========================================================================
echo       PRESENTADOR DE ACTIVIDADES 1 POR 1 - APLICACIONES WEB (4-C)
echo       Profesor: Moreno ^| Alumno: Santiago Asahel Pech
echo ========================================================================
echo.
echo   [P] MODO PRESENTACION CONTINUA (Recorrer del 1 al 24 con ENTER)
echo.
echo   --- UNIDAD I: INTRODUCCION Y ENTORNO ---
echo   [1]  Actividad 01: Conceptos Generales de la Web (Documentacion)
echo   [2]  Actividad 02: Entorno y Herramientas (Ejecutar verificador Node/Git)
echo.
echo   --- UNIDAD II: MAQUETACION Y DISENO FRONTEND ---
echo   [3]  Actividad 03: HTML5 Semantico (Abrir en Navegador)
echo   [4]  Actividad 04: CSS3 Estilos, Flexbox y Responsivo (Abrir en Navegador)
echo.
echo   --- CURSO BASICO DE JAVASCRIPT (NOTION) ---
echo   [5]  Actividad 05: JS - Variables y Tipos de Datos
echo   [6]  Actividad 06: JS - Funciones Declarativas y de Expresion
echo   [7]  Actividad 07: JS - Scope Global, Local y Hoisting
echo   [8]  Actividad 08: JS - Coercion, Truthy/Falsy y Operadores
echo   [9]  Actividad 09: JS - Condicionales (if, else if, else)
echo   [10] Actividad 10: JS - Reto 1: Piedra, Papel o Tijera (con IF)
echo   [11] Actividad 11: JS - Reto 2: Piedra, Papel o Tijera (con SWITCH)
echo   [12] Actividad 12: JS - Arrays y Metodos Mutadores (push, pop, etc)
echo   [13] Actividad 13: JS - Bucles y Ciclos (for, while, do..while)
echo   [14] Actividad 14: JS - Reto 3: Objetos y Constructor de 30 Autos
echo   [15] Actividad 15: JS - Metodos Modernos de Array (map, filter, find)
echo.
echo   --- CURSO ANGULAR MATERIAL + API REST (PROYECTO WEBNEWS) ---
echo   [16] Iniciar Proyecto WebNews (Backend :3000 + Frontend Angular :4200)
echo   [17] Abrir Documentacion Word Oficial de WebNews
echo.
echo   ----------------------------------------------------------------------
echo   [W] Abrir Carpeta con los 6 Documentos Word para Entregar
echo   [0] Salir
echo ========================================================================
set /p opc="Elige una actividad o escribe P para ir una por una: "

if /i "%opc%"=="p" goto pres_1
if "%opc%"=="1" goto act1
if "%opc%"=="2" goto act2
if "%opc%"=="3" goto act3
if "%opc%"=="4" goto act4
if "%opc%"=="5" goto act5
if "%opc%"=="6" goto act6
if "%opc%"=="7" goto act7
if "%opc%"=="8" goto act8
if "%opc%"=="9" goto act9
if "%opc%"=="10" goto act10
if "%opc%"=="11" goto act11
if "%opc%"=="12" goto act12
if "%opc%"=="13" goto act13
if "%opc%"=="14" goto act14
if "%opc%"=="15" goto act15
if "%opc%"=="16" goto act16
if "%opc%"=="17" goto act17
if /i "%opc%"=="w" goto open_words
if "%opc%"=="0" exit
goto menu

:: ----------------------------------------------------
:: RUTINAS INDIVIDUALES
:: ----------------------------------------------------
:act1
cls
echo ========================================================================
echo   ACTIVIDAD 01: CONCEPTOS GENERALES DEL DESARROLLO WEB
echo ========================================================================
echo Que explicar: Arquitectura Cliente-Servidor, DNS, HTTP/HTTPS, URLs e IP.
echo.
start "" "%~dp001-Introduccion-al-Desarrollo-Web\Actividad-1-Conceptos-Generales\Documentacion-Actividad-1.docx"
pause
goto menu

:act2
cls
echo ========================================================================
echo   ACTIVIDAD 02: ENTORNO DE DESARROLLO Y HERRAMIENTAS
echo ========================================================================
cd /d "%~dp001-Introduccion-al-Desarrollo-Web\Actividad-2-Entorno-y-Herramientas"
node verificar-entorno.js
echo.
pause
cd /d "%~dp0"
goto menu

:act3
cls
echo ========================================================================
echo   ACTIVIDAD 03: MAQUETACION ESTRUCTURAL CON HTML5 SEMANTICO
echo ========================================================================
echo Que explicar: Estructura pura con header, nav, main, section, article, table y form.
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-3-HTML5-Estructura\index.html"
pause
goto menu

:act4
cls
echo ========================================================================
echo   ACTIVIDAD 04: HOJAS DE ESTILO CSS3, FLEXBOX Y DISENO RESPONSIVO
echo ========================================================================
echo Que explicar: Diseno visual, tarjetas con Flexbox, media queries y box model.
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-4-CSS3-Estilos-y-Layout\index.html"
pause
goto menu

:act5
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-01-variables.js
echo.
pause
cd /d "%~dp0"
goto menu

:act6
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-02-funciones.js
echo.
pause
cd /d "%~dp0"
goto menu

:act7
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-03-scope-y-hoisting.js
echo.
pause
cd /d "%~dp0"
goto menu

:act8
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-04-coercion-y-operadores.js
echo.
pause
cd /d "%~dp0"
goto menu

:act9
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-05-condicionales.js
echo.
pause
cd /d "%~dp0"
goto menu

:act10
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-06-juego-piedra-papel-tijera-if.js
echo.
pause
cd /d "%~dp0"
goto menu

:act11
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-07-juego-piedra-papel-tijera-switch.js
echo.
pause
cd /d "%~dp0"
goto menu

:act12
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-08-arrays-y-metodos.js
echo.
pause
cd /d "%~dp0"
goto menu

:act13
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-09-bucles-for-y-while.js
echo.
pause
cd /d "%~dp0"
goto menu

:act14
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-10-objetos-y-reto-constructores.js
echo.
pause
cd /d "%~dp0"
goto menu

:act15
cls
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-11-metodos-recorrido-arrays.js
echo.
pause
cd /d "%~dp0"
goto menu

:act16
cls
echo ========================================================================
echo   PROYECTO WEBNEWS: INICIANDO BACKEND API Y FRONTEND ANGULAR
echo ========================================================================
cd /d "%~dp003-Proyecto-Angular-WebNews"
call iniciar-proyecto.bat
cd /d "%~dp0"
goto menu

:act17
cls
echo Abriendo Documentacion del Proyecto WebNews...
start "" "%~dp003-Proyecto-Angular-WebNews\Documentacion-Proyecto-WebNews.docx"
pause
goto menu

:open_words
cls
echo Abriendo carpeta de actividades...
explorer "%~dp0"
goto menu

:: ----------------------------------------------------
:: MODO PRESENTACION CONTINUA (1 POR 1)
:: ----------------------------------------------------
:pres_1
cls
echo ========================================================================
echo   [PASO 1/16] ACTIVIDAD 01: CONCEPTOS GENERALES DE LA WEB
echo ========================================================================
echo Explicacion: Arquitectura Cliente-Servidor, DNS, HTTP/HTTPS y URLs.
echo Documento disponible: Documentacion-Actividad-1.docx
echo.
echo Presiona cualquier tecla para continuar al PASO 2...
pause > nul

:pres_2
cls
echo ========================================================================
echo   [PASO 2/16] ACTIVIDAD 02: VERIFICACION DE ENTORNO DE DESARROLLO
echo ========================================================================
cd /d "%~dp001-Introduccion-al-Desarrollo-Web\Actividad-2-Entorno-y-Herramientas"
node verificar-entorno.js
echo.
echo Presiona cualquier tecla para continuar al PASO 3...
pause > nul

:pres_3
cls
echo ========================================================================
echo   [PASO 3/16] ACTIVIDAD 03: MAQUETACION CON HTML5 SEMANTICO
echo ========================================================================
echo Abriendo index.html en tu navegador (estructura pura sin CSS)...
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-3-HTML5-Estructura\index.html"
echo.
echo Presiona cualquier tecla para continuar al PASO 4...
pause > nul

:pres_4
cls
echo ========================================================================
echo   [PASO 4/16] ACTIVIDAD 04: DISENO CON CSS3, FLEXBOX Y RESPONSIVO
echo ========================================================================
echo Abriendo index.html estilizado con styles.css en tu navegador...
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-4-CSS3-Estilos-y-Layout\index.html"
echo.
echo Presiona cualquier tecla para continuar al PASO 5...
pause > nul

:pres_5
cls
echo ========================================================================
echo   [PASO 5/16] JS PRACTICA 01: VARIABLES Y TIPOS DE DATOS
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-01-variables.js
echo.
echo Presiona cualquier tecla para continuar al PASO 6...
pause > nul

:pres_6
cls
echo ========================================================================
echo   [PASO 6/16] JS PRACTICA 02: FUNCIONES DECLARATIVAS Y FLECHA
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-02-funciones.js
echo.
echo Presiona cualquier tecla para continuar al PASO 7...
pause > nul

:pres_7
cls
echo ========================================================================
echo   [PASO 7/16] JS PRACTICA 03: SCOPE GLOBAL, LOCAL Y HOISTING
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-03-scope-y-hoisting.js
echo.
echo Presiona cualquier tecla para continuar al PASO 8...
pause > nul

:pres_8
cls
echo ========================================================================
echo   [PASO 8/16] JS PRACTICA 04: COERCION Y OPERADORES
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-04-coercion-y-operadores.js
echo.
echo Presiona cualquier tecla para continuar al PASO 9...
pause > nul

:pres_9
cls
echo ========================================================================
echo   [PASO 9/16] JS PRACTICA 05: CONDICIONALES IF / ELSE IF / ELSE
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-05-condicionales.js
echo.
echo Presiona cualquier tecla para continuar al PASO 10...
pause > nul

:pres_10
cls
echo ========================================================================
echo   [PASO 10/16] JS PRACTICA 06: RETO 1 - PIEDRA, PAPEL O TIJERA (IF)
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-06-juego-piedra-papel-tijera-if.js
echo.
echo Presiona cualquier tecla para continuar al PASO 11...
pause > nul

:pres_11
cls
echo ========================================================================
echo   [PASO 11/16] JS PRACTICA 07: RETO 2 - PIEDRA, PAPEL O TIJERA (SWITCH)
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-07-juego-piedra-papel-tijera-switch.js
echo.
echo Presiona cualquier tecla para continuar al PASO 12...
pause > nul

:pres_12
cls
echo ========================================================================
echo   [PASO 12/16] JS PRACTICA 08: ARRAYS Y METODOS (PUSH, POP, SHIFT)
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-08-arrays-y-metodos.js
echo.
echo Presiona cualquier tecla para continuar al PASO 13...
pause > nul

:pres_13
cls
echo ========================================================================
echo   [PASO 13/16] JS PRACTICA 09: BUCLES (FOR, WHILE, DO..WHILE)
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-09-bucles-for-y-while.js
echo.
echo Presiona cualquier tecla para continuar al PASO 14...
pause > nul

:pres_14
cls
echo ========================================================================
echo   [PASO 14/16] JS PRACTICA 10: RETO 3 - OBJETOS Y 30 AUTOS CON CICLO
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-10-objetos-y-reto-constructores.js
echo.
echo Presiona cualquier tecla para continuar al PASO 15...
pause > nul

:pres_15
cls
echo ========================================================================
echo   [PASO 15/16] JS PRACTICA 11: METODOS MODERNOS DE ARRAY (ES6+)
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-11-metodos-recorrido-arrays.js
echo.
echo Presiona cualquier tecla para continuar al PASO 16...
pause > nul

:pres_16
cls
echo ========================================================================
echo   [PASO 16/16] PROYECTO WEBNEWS: ANGULAR MATERIAL + REST API
echo ========================================================================
echo Iniciando Backend API (:3000) y Frontend Angular (:4200)...
cd /d "%~dp003-Proyecto-Angular-WebNews"
call iniciar-proyecto.bat
echo.
echo ========================================================================
echo   PRESENTACION COMPLETA FINALIZADA CON EXITO
echo ========================================================================
pause
cd /d "%~dp0"
goto menu
