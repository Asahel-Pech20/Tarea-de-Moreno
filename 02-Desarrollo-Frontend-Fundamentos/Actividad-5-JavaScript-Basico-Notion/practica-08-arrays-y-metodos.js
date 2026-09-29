/**
 * =========================================================================
 * PRÁCTICA 8 DE JAVASCRIPT: ARRAYS, ÍNDICES Y MÉTODOS DE MUTACIÓN
 * Curso Notion: Módulo 4 - Array // Índice y Métodos & Eliminando elementos
 * =========================================================================
 */

console.log("================================================================");
console.log("PRÁCTICA 8: ARRAYS, ÍNDICES Y MÉTODOS DE MANIPULACIÓN");
console.log("================================================================\n");

// 1. Creación de un array y acceso por índice
let frutas = ["Manzana", "Plátano", "Cereza", "Fresa"];
console.log("Array inicial:", frutas);
console.log(`Elemento en índice 0 (primero): ${frutas[0]}`);
console.log(`Elemento en índice 3 (cuarto) : ${frutas[3]}`);
console.log(`Longitud total (.length)      : ${frutas.length}`);

// 2. Método .push(): Agregar elementos al FINAL
frutas.push("Uva");
console.log("\n1. frutas.push('Uva')            ->", frutas);

// 3. Método .unshift(): Agregar elementos al INICIO
frutas.unshift("Mango");
console.log("2. frutas.unshift('Mango')       ->", frutas);

// 4. Método .pop(): Eliminar el ÚLTIMO elemento
let eliminadoFinal = frutas.pop();
console.log(`3. frutas.pop() eliminó '${eliminadoFinal}' ->`, frutas);

// 5. Método .shift(): Eliminar el PRIMER elemento
let eliminadoInicio = frutas.shift();
console.log(`4. frutas.shift() eliminó '${eliminadoInicio}' ->`, frutas);

// 6. Método .indexOf(): Encontrar la posición de un elemento
let posicionCereza = frutas.indexOf("Cereza");
console.log(`5. frutas.indexOf('Cereza')      -> Posición: ${posicionCereza}`);

console.log("\n[OK] Práctica 8 completada con éxito.");
