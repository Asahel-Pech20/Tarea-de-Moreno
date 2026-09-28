/**
 * MÓDULO 2: BASES DE JAVASCRIPT
 * Temas: Scope, Hoisting, Coerción, Truthy & Falsy, y Operadores
 */

console.log("=== MÓDULO 2: SCOPE, HOISTING, COERCIÓN Y OPERADORES ===\n");

// 1. SCOPE (Alcance Global vs. Local / Bloque)
let mensajeGlobal = "Soy visible en todo el programa (Global)";

function pruebaScope() {
  let mensajeLocal = "Solo existo dentro de esta función (Local)";
  console.log("Dentro de la función:", mensajeGlobal);
  console.log("Dentro de la función:", mensajeLocal);
}

pruebaScope();

// 2. HOISTING (Elevación)
console.log("\nDemostración de Hoisting con funciones:");
console.log("Llamando a miFuncion() antes de declararla:", miFuncion());

function miFuncion() {
  return "JavaScript eleva la declaración de la función a la parte superior.";
}

// 3. COERCIÓN DE TIPOS (Implícita vs. Explícita)
console.log("\nCoerción de tipos:");
let coercionImplicita = 4 + "7"; // El número 4 se convierte en texto "4" -> "47"
console.log('4 + "7" =', coercionImplicita, "(Tipo:", typeof coercionImplicita, ")");

let coercionExplicita = Number("42"); // Conversión manual forzada
console.log('Number("42") =', coercionExplicita, "(Tipo:", typeof coercionExplicita, ")");

// 4. TRUTHY Y FALSY
console.log("\nValores Truthy y Falsy:");
console.log("Boolean(0):", Boolean(0), "--> Falsy");
console.log('Boolean(""):', Boolean(""), "--> Falsy");
console.log("Boolean(null):", Boolean(null), "--> Falsy");
console.log("Boolean(undefined):", Boolean(undefined), "--> Falsy");
console.log('Boolean("Hola"):', Boolean("Hola"), "--> Truthy");
console.log("Boolean(100):", Boolean(100), "--> Truthy");

// 5. OPERADORES
console.log("\nOperadores de igualdad estricta:");
console.log('5 == "5"  -->', 5 == "5", "(Igualdad débil: compara solo valor)");
console.log('5 === "5" -->', 5 === "5", "(Igualdad estricta: compara valor Y tipo de dato)");
