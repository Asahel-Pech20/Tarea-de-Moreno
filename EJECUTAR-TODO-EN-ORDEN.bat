@echo off
chcp 65001 > nul
title Portafolio Completo de las 24 Actividades - Aplicaciones Web (4-C)

:menu
cls
echo ========================================================================
echo        PORTAFOLIO DE LAS 24 ACTIVIDADES - APLICACIONES WEB (4-C)
echo        Profesor: Moreno ^| Alumnos: Oscar Michel Matos May ^& Santiago Asahel Pech
echo ========================================================================
echo.
echo   [P] MODO PRESENTACION CONTINUA: RECORRER LAS 24 ACTIVIDADES (CON ENTER)
echo.
echo   --- UNIDAD I: INTRODUCCION Y ENTORNO ---
echo   [1]  Actividad 01: Conceptos Generales de la Web (Teoria)
echo   [2]  Actividad 02: Entornos de Desarrollo (Verificador Node/Git)
echo.
echo   --- UNIDAD II: MAQUETACION Y DISENO FRONTEND ---
echo   [3]  Actividad 03: HTML5 Semantico (Estructura pura en Navegador)
echo   [4]  Actividad 04: CSS3 Estilos, Flexbox y Responsivo (Navegador)
echo.
echo   --- CURSO BASICO DE JAVASCRIPT (NOTION - 11 PRACTICAS) ---
echo   [5]  Actividad 05: JS 01 - Variables y Tipos de Datos
echo   [6]  Actividad 06: JS 02 - Funciones Declarativas y Flecha
echo   [7]  Actividad 07: JS 03 - Scope Global, Local y Hoisting
echo   [8]  Actividad 08: JS 04 - Coercion, Truthy/Falsy y Operadores
echo   [9]  Actividad 09: JS 05 - Condicionales (if / else if / else)
echo   [10] Actividad 10: JS 06 - Reto 1: Piedra, Papel o Tijera (con IF)
echo   [11] Actividad 11: JS 07 - Reto 2: Piedra, Papel o Tijera (con SWITCH)
echo   [12] Actividad 12: JS 08 - Arrays y Metodos Mutadores (push, pop)
echo   [13] Actividad 13: JS 09 - Bucles (for, for..of, while, do..while)
echo   [14] Actividad 14: JS 10 - Reto 3: 30 Autos con Constructor
echo   [15] Actividad 15: JS 11 - Metodos Modernos de Array (map, filter)
echo.
echo   --- CURSO ANGULAR MATERIAL + API REST (WEBNEWS - 9 MODULOS) ---
echo   [16] Actividad 16: WebNews 01 - Backend REST API y Base de Datos JSON
echo   [17] Actividad 17: WebNews 02 - Arquitectura de Componentes Angular
echo   [18] Actividad 18: WebNews 03 - Enrutamiento y Navegacion SPA
echo   [19] Actividad 19: WebNews 04 - Servicios y Consumo HTTP API REST
echo   [20] Actividad 20: WebNews 05 - Formularios Reactivos y Validaciones
echo   [21] Actividad 21: WebNews 06 - Componentes Angular Material UI
echo   [22] Actividad 22: WebNews 07 - Autenticacion JWT y Auth Guard
echo   [23] Actividad 23: WebNews 08 - Dialogos Modales y Operaciones CRUD
echo   [24] Actividad 24: WebNews 09 - Iniciar Proyecto WebNews (Backend+Front)
echo.
echo   ----------------------------------------------------------------------
echo   [E] EDITAR CODIGO FUENTE (Abrir cualquier actividad en VS Code o Bloc de Notas)
echo   [W] Abrir Carpeta con los 6 Documentos Word para Entregar
echo   [0] Salir
echo ========================================================================
set /p opc="Elige una actividad (1-24), P para presentar, o E para editar: "

if /i "%opc%"=="p" goto pres_1
if /i "%opc%"=="e" goto edit_code
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
if "%opc%"=="18" goto act18
if "%opc%"=="19" goto act19
if "%opc%"=="20" goto act20
if "%opc%"=="21" goto act21
if "%opc%"=="22" goto act22
if "%opc%"=="23" goto act23
if "%opc%"=="24" goto act24
if /i "%opc%"=="w" goto open_words
if "%opc%"=="0" exit
goto menu

:edit_code
cls
echo ========================================================================
echo     MODO EDICION: ABRIR CODIGO FUENTE EN VS CODE / BLOC DE NOTAS
echo ========================================================================
echo   Escribe el numero de la actividad que deseas editar (1 a 24),
echo   o escribe 'TODO' para abrir todo el proyecto completo en VS Code:
echo.
set /p numedit="Numero de actividad a editar (1-24 o TODO): "

if /i "%numedit%"=="todo" (
  where code >nul 2>nul
  if %errorlevel% equ 0 (
    start "" code "%~dp0"
    echo Proyecto abierto en VS Code.
  ) else (
    explorer "%~dp0"
    echo Carpeta abierta en Explorador de Windows.
  )
  pause
  goto menu
)

set "file_to_edit="
if "%numedit%"=="1" set "file_to_edit=%~dp001-Introduccion-al-Desarrollo-Web\Actividad-1-Conceptos-Generales\README.md"
if "%numedit%"=="2" set "file_to_edit=%~dp001-Introduccion-al-Desarrollo-Web\Actividad-2-Entorno-y-Herramientas\verificar-entorno.js"
if "%numedit%"=="3" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-3-HTML5-Estructura\index.html"
if "%numedit%"=="4" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-4-CSS3-Estilos-y-Layout\styles.css"
if "%numedit%"=="5" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-01-variables.js"
if "%numedit%"=="6" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-02-funciones.js"
if "%numedit%"=="7" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-03-scope-y-hoisting.js"
if "%numedit%"=="8" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-04-coercion-y-operadores.js"
if "%numedit%"=="9" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-05-condicionales.js"
if "%numedit%"=="10" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-06-juego-piedra-papel-tijera-if.js"
if "%numedit%"=="11" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-07-juego-piedra-papel-tijera-switch.js"
if "%numedit%"=="12" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-08-arrays-y-metodos.js"
if "%numedit%"=="13" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-09-bucles-for-y-while.js"
if "%numedit%"=="14" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-10-objetos-y-reto-constructores.js"
if "%numedit%"=="15" set "file_to_edit=%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion\practica-11-metodos-recorrido-arrays.js"
if "%numedit%"=="16" set "file_to_edit=%~dp003-Proyecto-Angular-WebNews\backend-api\server.js"
if "%numedit%"=="17" set "file_to_edit=%~dp003-Proyecto-Angular-WebNews\webnews-frontend\src\app\components\home\home.component.ts"
if "%numedit%"=="18" set "file_to_edit=%~dp003-Proyecto-Angular-WebNews\webnews-frontend\src\app\app.routes.ts"
if "%numedit%"=="19" set "file_to_edit=%~dp003-Proyecto-Angular-WebNews\webnews-frontend\src\app\services\new.service.ts"
if "%numedit%"=="20" set "file_to_edit=%~dp003-Proyecto-Angular-WebNews\webnews-frontend\src\app\components\login\login.component.ts"
if "%numedit%"=="21" set "file_to_edit=%~dp003-Proyecto-Angular-WebNews\webnews-frontend\src\app\components\navbar\navbar.component.ts"
if "%numedit%"=="22" set "file_to_edit=%~dp003-Proyecto-Angular-WebNews\webnews-frontend\src\app\guards\auth.guard.ts"
if "%numedit%"=="23" set "file_to_edit=%~dp003-Proyecto-Angular-WebNews\webnews-frontend\src\app\components\news-dialog\news-dialog.component.ts"
if "%numedit%"=="24" set "file_to_edit=%~dp003-Proyecto-Angular-WebNews\backend-api\database.json"

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
echo y al volver a ejecutar la actividad veras tus cambios reflejados.
echo.
pause
goto menu

:: ----------------------------------------------------
:: RUTINAS INDIVIDUALES (1 A 24)
:: ----------------------------------------------------
:act1
cls
echo ========================================================================
echo   ACTIVIDAD 01: CONCEPTOS GENERALES DEL DESARROLLO WEB
echo ========================================================================
echo Teoria: Arquitectura Cliente-Servidor, DNS, HTTP/HTTPS, URLs e IP.
start "" "%~dp001-Introduccion-al-Desarrollo-Web\Actividad-1-Conceptos-Generales\Documentacion-Actividad-1.docx"
echo Documentacion abierta en Word.
pause
goto menu

:act2
cls
echo ========================================================================
echo   ACTIVIDAD 02: VERIFICACION DE ENTORNO DE DESARROLLO
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
echo Abriendo estructura HTML5 pura en el navegador...
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-3-HTML5-Estructura\index.html"
pause
goto menu

:act4
cls
echo ========================================================================
echo   ACTIVIDAD 04: HOJAS DE ESTILO CSS3, FLEXBOX Y DISENO RESPONSIVO
echo ========================================================================
echo Abriendo diseno estilizado con CSS3 en el navegador...
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
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 16
echo.
pause
goto menu

:act17
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 17
echo.
pause
goto menu

:act18
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 18
echo.
pause
goto menu

:act19
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 19
echo.
pause
goto menu

:act20
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 20
echo.
pause
goto menu

:act21
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 21
echo.
pause
goto menu

:act22
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 22
echo.
pause
goto menu

:act23
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 23
echo.
pause
goto menu

:act24
cls
echo ========================================================================
echo   ACTIVIDAD 24: INICIAR PROYECTO WEBNEWS (BACKEND + FRONTEND ANGULAR)
echo ========================================================================
cd /d "%~dp003-Proyecto-Angular-WebNews"
call iniciar-proyecto.bat
cd /d "%~dp0"
goto menu

:open_words
cls
echo Abriendo carpeta con los 6 documentos Word oficiales...
explorer "%~dp0"
goto menu

:: ----------------------------------------------------
:: MODO PRESENTACION CONTINUA (DEL 1 AL 24 CON ENTER)
:: ----------------------------------------------------
:pres_1
cls
echo ========================================================================
echo   [PASO 01/24] ACTIVIDAD 01: CONCEPTOS GENERALES DE LA WEB
echo ========================================================================
echo Explicacion: Arquitectura Cliente-Servidor, DNS, HTTP/HTTPS y URLs.
echo Documento disponible: Documentacion-Actividad-1.docx
echo.
echo Presiona ENTER para ir al PASO 02...
pause > nul

:pres_2
cls
echo ========================================================================
echo   [PASO 02/24] ACTIVIDAD 02: VERIFICACION DE ENTORNO DE DESARROLLO
echo ========================================================================
cd /d "%~dp001-Introduccion-al-Desarrollo-Web\Actividad-2-Entorno-y-Herramientas"
node verificar-entorno.js
echo.
echo Presiona ENTER para ir al PASO 03...
pause > nul

:pres_3
cls
echo ========================================================================
echo   [PASO 03/24] ACTIVIDAD 03: MAQUETACION CON HTML5 SEMANTICO
echo ========================================================================
echo Abriendo index.html en navegador (estructura sin CSS)...
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-3-HTML5-Estructura\index.html"
echo.
echo Presiona ENTER para ir al PASO 04...
pause > nul

:pres_4
cls
echo ========================================================================
echo   [PASO 04/24] ACTIVIDAD 04: DISENO CON CSS3, FLEXBOX Y RESPONSIVO
echo ========================================================================
echo Abriendo index.html con CSS3 en navegador...
start "" "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-4-CSS3-Estilos-y-Layout\index.html"
echo.
echo Presiona ENTER para ir al PASO 05...
pause > nul

:pres_5
cls
echo ========================================================================
echo   [PASO 05/24] ACTIVIDAD 05: JS - VARIABLES Y TIPOS DE DATOS
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-01-variables.js
echo.
echo Presiona ENTER para ir al PASO 06...
pause > nul

:pres_6
cls
echo ========================================================================
echo   [PASO 06/24] ACTIVIDAD 06: JS - FUNCIONES DECLARATIVAS Y FLECHA
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-02-funciones.js
echo.
echo Presiona ENTER para ir al PASO 07...
pause > nul

:pres_7
cls
echo ========================================================================
echo   [PASO 07/24] ACTIVIDAD 07: JS - SCOPE GLOBAL, LOCAL Y HOISTING
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-03-scope-y-hoisting.js
echo.
echo Presiona ENTER para ir al PASO 08...
pause > nul

:pres_8
cls
echo ========================================================================
echo   [PASO 08/24] ACTIVIDAD 08: JS - COERCION Y OPERADORES
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-04-coercion-y-operadores.js
echo.
echo Presiona ENTER para ir al PASO 09...
pause > nul

:pres_9
cls
echo ========================================================================
echo   [PASO 09/24] ACTIVIDAD 09: JS - CONDICIONALES IF / ELSE IF / ELSE
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-05-condicionales.js
echo.
echo Presiona ENTER para ir al PASO 10...
pause > nul

:pres_10
cls
echo ========================================================================
echo   [PASO 10/24] ACTIVIDAD 10: JS - RETO 1: PIEDRA, PAPEL O TIJERA (IF)
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-06-juego-piedra-papel-tijera-if.js
echo.
echo Presiona ENTER para ir al PASO 11...
pause > nul

:pres_11
cls
echo ========================================================================
echo   [PASO 11/24] ACTIVIDAD 11: JS - RETO 2: PIEDRA, PAPEL O TIJERA (SWITCH)
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-07-juego-piedra-papel-tijera-switch.js
echo.
echo Presiona ENTER para ir al PASO 12...
pause > nul

:pres_12
cls
echo ========================================================================
echo   [PASO 12/24] ACTIVIDAD 12: JS - ARRAYS Y METODOS (PUSH, POP, SHIFT)
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-08-arrays-y-metodos.js
echo.
echo Presiona ENTER para ir al PASO 13...
pause > nul

:pres_13
cls
echo ========================================================================
echo   [PASO 13/24] ACTIVIDAD 13: JS - BUCLES (FOR, WHILE, DO..WHILE)
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-09-bucles-for-y-while.js
echo.
echo Presiona ENTER para ir al PASO 14...
pause > nul

:pres_14
cls
echo ========================================================================
echo   [PASO 14/24] ACTIVIDAD 14: JS - RETO 3: 30 AUTOS CON CONSTRUCTOR
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-10-objetos-y-reto-constructores.js
echo.
echo Presiona ENTER para ir al PASO 15...
pause > nul

:pres_15
cls
echo ========================================================================
echo   [PASO 15/24] ACTIVIDAD 15: JS - METODOS MODERNOS DE ARRAY (ES6+)
echo ========================================================================
cd /d "%~dp002-Desarrollo-Frontend-Fundamentos\Actividad-5-JavaScript-Basico-Notion"
node practica-11-metodos-recorrido-arrays.js
echo.
echo Presiona ENTER para ir al PASO 16...
pause > nul

:pres_16
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 16
echo.
echo Presiona ENTER para ir al PASO 17...
pause > nul

:pres_17
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 17
echo.
echo Presiona ENTER para ir al PASO 18...
pause > nul

:pres_18
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 18
echo.
echo Presiona ENTER para ir al PASO 19...
pause > nul

:pres_19
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 19
echo.
echo Presiona ENTER para ir al PASO 20...
pause > nul

:pres_20
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 20
echo.
echo Presiona ENTER para ir al PASO 21...
pause > nul

:pres_21
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 21
echo.
echo Presiona ENTER para ir al PASO 22...
pause > nul

:pres_22
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 22
echo.
echo Presiona ENTER para ir al PASO 23...
pause > nul

:pres_23
cls
node "%~dp003-Proyecto-Angular-WebNews\probar-modulo.js" 23
echo.
echo Presiona ENTER para ir al PASO 24...
pause > nul

:pres_24
cls
echo ========================================================================
echo   [PASO 24/24] ACTIVIDAD 24: INICIAR PROYECTO WEBNEWS COMPLETO
echo ========================================================================
echo Iniciando Backend API (:3000) y Frontend Angular (:4200)...
cd /d "%~dp003-Proyecto-Angular-WebNews"
call iniciar-proyecto.bat
echo.
echo ========================================================================
echo   FELICIDADES: RECORRISTE LAS 24 ACTIVIDADES EXITOSAMENTE
echo ========================================================================
pause
cd /d "%~dp0"
goto menu
