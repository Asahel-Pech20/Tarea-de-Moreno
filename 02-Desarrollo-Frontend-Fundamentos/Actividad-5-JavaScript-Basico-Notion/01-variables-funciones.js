/**
 * MÓDULO 1: INTRODUCCIÓN A JAVASCRIPT
 * Temas: Variables, Tipos de datos y Funciones (Declarativas vs. Expresión)
 */

console.log("=== MÓDULO 1: VARIABLES Y FUNCIONES ===\n");

// 1. TIPOS DE DATOS PRIMITIVOS
let texto = "Hola mundo";               // String (Texto)
let numero = 42;                        // Number (Número entero o decimal)
let esEstudiante = true;                // Boolean (Verdadero o Falso)
let valorNulo = null;                   // Null (Valor intencionalmente vacío)
let noDefinido = undefined;             // Undefined (Variable sin inicializar)

console.log("Tipos de datos detectados:");
console.log("- texto:", typeof texto, `("${texto}")`);
console.log("- numero:", typeof numero, `(${numero})`);
console.log("- esEstudiante:", typeof esEstudiante, `(${esEstudiante})`);
console.log("- valorNulo:", typeof valorNulo);
console.log("- noDefinido:", typeof noDefinido);

// 2. DECLARACIÓN DE VARIABLES (let vs. const)
let contador = 1;
contador = contador + 1; // let permite reasignar
const PI = 3.14159;      // const no permite reasignar su valor

console.log(`\nVariables modificables (contador = ${contador}) y constantes (PI = ${PI})`);

// 3. FUNCIONES DECLARATIVAS
function saludar(nombre) {
  return `¡Hola, ${nombre}! Bienvenido a la programación en JavaScript.`;
}

// 4. FUNCIONES DE EXPRESIÓN (ARROW FUNCTIONS / FUNCIONES FLECHA)
const sumar = (a, b) => a + b;

console.log("\nProbando funciones:");
console.log(saludar("Alumno de 4-C"));
console.log(`Suma de 15 + 27 = ${sumar(15, 27)}`);
