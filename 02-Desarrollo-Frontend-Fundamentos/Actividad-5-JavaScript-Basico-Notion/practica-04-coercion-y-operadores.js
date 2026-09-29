/**
 * =========================================================================
 * PRÁCTICA 4 DE JAVASCRIPT: COERCIÓN, TRUTHY/FALSY Y OPERADORES
 * Curso Notion: Módulo 2 - Coerción, Truthy & Falsy y Operadores
 * =========================================================================
 */

console.log("=================================================");
console.log("PRÁCTICA 4: COERCIÓN, TRUTHY/FALSY Y OPERADORES");
console.log("=================================================\n");

// 1. COERCIÓN IMPLÍCITA (Automática)
console.log("--- Coerción Implícita ---");
let sumaConTexto = 4 + "7"; // El 4 se convierte a texto "4" -> "47"
console.log('4 + "7" =', sumaConTexto, `(Tipo resultante: ${typeof sumaConTexto})`);

let restaConTexto = "20" - 5; // El texto "20" se convierte a número -> 15
console.log('"20" - 5 =', restaConTexto, `(Tipo resultante: ${typeof restaConTexto})`);

// 2. COERCIÓN EXPLÍCITA (Manual con funciones de conversión)
console.log("\n--- Coerción Explícita ---");
let numeroForzado = Number("100");
let textoForzado = String(500);
console.log('Number("100"):', numeroForzado, `(Tipo: ${typeof numeroForzado})`);
console.log('String(500)  :', textoForzado, `(Tipo: ${typeof textoForzado})`);

// 3. VALORES TRUTHY Y FALSY
console.log("\n--- Evaluación de Truthy y Falsy con Boolean() ---");
console.log("Falsy -> Boolean(0)        :", Boolean(0));
console.log("Falsy -> Boolean('')       :", Boolean(""));
console.log("Falsy -> Boolean(null)     :", Boolean(null));
console.log("Falsy -> Boolean(undefined):", Boolean(undefined));
console.log("Falsy -> Boolean(NaN)      :", Boolean(NaN));
console.log("Truthy -> Boolean('Hola')  :", Boolean("Hola"));
console.log("Truthy -> Boolean(42)      :", Boolean(42));
console.log("Truthy -> Boolean([])      :", Boolean([]));

// 4. OPERADORES DE COMPARACIÓN (Igualdad débil vs. Igualdad estricta)
console.log("\n--- Comparación Débil (==) vs. Estricta (===) ---");
console.log('5 == "5"   ->', 5 == "5", "  (Débil: convierte tipos y solo compara valor)");
console.log('5 === "5"  ->', 5 === "5", " (Estricta: compara valor Y tipo de dato, recomendada)");

console.log("\n[OK] Práctica 4 completada con éxito.");
