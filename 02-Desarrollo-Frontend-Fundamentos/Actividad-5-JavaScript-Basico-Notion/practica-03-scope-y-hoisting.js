/**
 * =========================================================================
 * PRÁCTICA 3 DE JAVASCRIPT: SCOPE (ALCANCE) Y HOISTING (ELEVACIÓN)
 * Curso Notion: Módulo 2 - Scope y Hoisting
 * =========================================================================
 */

console.log("=================================================");
console.log("📌 PRÁCTICA 3: SCOPE Y HOISTING EN JAVASCRIPT");
console.log("=================================================\n");

// 1. SCOPE GLOBAL VS. LOCAL / BLOQUE
let variableGlobal = "🌍 Soy una variable de Scope Global (visible en todo el programa)";

function demostrarScope() {
  let variableLocal = "🔒 Soy una variable de Scope Local (solo existo dentro de esta función)";
  console.log("Dentro de la función:");
  console.log("-", variableGlobal);
  console.log("-", variableLocal);

  if (true) {
    let variableBloque = "🧱 Scope de Bloque (solo dentro del IF)";
    console.log("-", variableBloque);
  }
}

demostrarScope();
console.log("\nFuera de la función:");
console.log("-", variableGlobal);
// console.log(variableLocal); // Daría ReferenceError porque variableLocal no existe aquí

// 2. HOISTING (Elevación)
console.log("\n--- Demostración de Hoisting ---");
console.log("Llamando a la función ANTES de que aparezca escrita en el código:");
console.log("Resultado:", saludoElevado());

function saludoElevado() {
  return "⚡ La declaración de esta función fue elevada a la cima por JavaScript.";
}

console.log("\n✅ Práctica 3 completada con éxito.");
