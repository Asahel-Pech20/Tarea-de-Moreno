/**
 * =========================================================================
 * PRÁCTICA 2 DE JAVASCRIPT: FUNCIONES DECLARATIVAS Y DE EXPRESIÓN
 * Curso Notion: Módulo 1 - Funciones
 * =========================================================================
 */

console.log("=================================================");
console.log("📌 PRÁCTICA 2: FUNCIONES DECLARATIVAS Y DE EXPRESIÓN");
console.log("=================================================\n");

// 1. Función Declarativa (se procesa antes de ejecutar el código)
function saludarEstudiante(nombre, curso) {
  return `¡Hola ${nombre}! Bienvenido al curso de ${curso}.`;
}

// 2. Función de Expresión (función anónima guardada en variable)
const calcularPromedio = function (calif1, calif2, calif3) {
  return (calif1 + calif2 + calif3) / 3;
};

// 3. Función Flecha (Arrow Function moderna de ES6)
const esAprobado = (promedio) => promedio >= 7.0;

// 4. Pruebas y llamadas a las funciones
const saludo = saludarEstudiante("Alumno del 4-C", "Aplicaciones Web");
console.log(saludo);

const prom = calcularPromedio(8.5, 9.0, 7.5);
console.log(`\nPromedio obtenido: ${prom.toFixed(2)}`);
console.log(`¿El alumno acreditó la materia?: ${esAprobado(prom) ? "SÍ (Aprobado)" : "NO (Reprobado)"}`);

console.log("\n✅ Práctica 2 completada con éxito.");
