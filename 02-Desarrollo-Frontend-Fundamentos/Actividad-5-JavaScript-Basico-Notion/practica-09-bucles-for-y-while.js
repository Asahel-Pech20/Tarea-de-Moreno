/**
 * =========================================================================
 * PRÁCTICA 9 DE JAVASCRIPT: BUCLES (FOR, FOR...OF, WHILE Y DO...WHILE)
 * Curso Notion: Módulo 5 - Loops: For y for...of, While y do while
 * =========================================================================
 */

console.log("================================================================");
console.log("PRÁCTICA 9: BUCLES Y CICLOS DE REPETICIÓN");
console.log("================================================================\n");

const estudiantes = ["María", "Jorge", "Lucía", "Ricardo", "Elena"];

// 1. Bucle FOR tradicional
console.log("--- 1. Bucle For Tradicional (con índice numérico) ---");
for (let i = 0; i < estudiantes.length; i++) {
  console.log(`Puesto #${i + 1}: ${estudiantes[i]}`);
}

// 2. Bucle FOR...OF (recorrido directo de elementos)
console.log("\n--- 2. Bucle For...of (recorriendo cada elemento) ---");
for (const estudiante of estudiantes) {
  console.log(`¡Bienvenido al laboratorio, ${estudiante}!`);
}

// 3. Bucle WHILE (se ejecuta mientras la condición sea verdadera)
console.log("\n--- 3. Bucle While (cuenta regresiva) ---");
let contador = 5;
while (contador > 0) {
  console.log(`Iniciando compilación en ${contador}...`);
  contador--;
}
console.log("¡Compilación iniciada con éxito!");

// 4. Bucle DO...WHILE (se ejecuta al menos una vez garantizado)
console.log("\n--- 4. Bucle Do...While ---");
let intentos = 1;
do {
  console.log(`Intento número: ${intentos} ejecutado.`);
  intentos++;
} while (intentos <= 2);

console.log("\n[OK] Práctica 9 completada con éxito.");
