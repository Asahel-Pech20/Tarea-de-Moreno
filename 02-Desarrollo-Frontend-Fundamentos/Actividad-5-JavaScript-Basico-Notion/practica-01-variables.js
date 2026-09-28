/**
 * =========================================================================
 * PRÁCTICA 1 DE JAVASCRIPT: VARIABLES Y TIPOS DE DATOS
 * Curso Notion: Módulo 1 - Variables y Elementos del Lenguaje
 * =========================================================================
 */

console.log("=================================================");
console.log("📌 PRÁCTICA 1: VARIABLES Y TIPOS DE DATOS EN JS");
console.log("=================================================\n");

// 1. Declaración de variables con let y const (estándar moderno)
let nombreEstudiante = "Santiago";
let edad = 20;
let materia = "Aplicaciones Web";
let inscrito = true;
let calificacionPendiente = null;
let observaciones; // undefined por defecto

// 2. Modificación de variables con let
console.log(`Estudiante: ${nombreEstudiante} | Edad inicial: ${edad}`);
edad = edad + 1; // Cumplió años
console.log(`Edad actualizada: ${edad}`);

// 3. Declaración de constantes con const (no se pueden reasignar)
const ESCUELA = "Universidad Tecnológica - Grupo 4-C";
const PI = 3.14159265;
console.log(`Institución: ${ESCUELA} | Constante PI: ${PI}`);

// 4. Verificación de tipos de datos primitivos con typeof
console.log("\n--- Tipos de Datos Primitivos Detectados ---");
console.log("1. nombreEstudiante :", typeof nombreEstudiante, `("${nombreEstudiante}")`);
console.log("2. edad             :", typeof edad, `(${edad})`);
console.log("3. inscrito         :", typeof inscrito, `(${inscrito})`);
console.log("4. calificacion     :", typeof calificacionPendiente, `(${calificacionPendiente})`);
console.log("5. observaciones    :", typeof observaciones, `(${observaciones})`);

console.log("\n✅ Práctica 1 completada con éxito.");
