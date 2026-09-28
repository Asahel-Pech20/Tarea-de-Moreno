/**
 * MÓDULOS 4, 5 Y 7: ARRAYS, LOOPS Y MÉTODOS MODERNOS DE RECORRIDO
 * Temas: push, pop, shift, unshift, for, for...of, while, filter, map, find, forEach, some
 */

console.log("=== MÓDULOS 4, 5 Y 7: ARRAYS, BUCLES Y MÉTODOS ITERATIVOS ===\n");

// 1. MÉTODOS BÁSICOS DE ARRAY
let materias = ["HTML5", "CSS3"];
console.log("Array inicial:", materias);

materias.push("JavaScript"); // Añade al final
console.log(".push('JavaScript'):", materias);

materias.unshift("Fundamentos Web"); // Añade al inicio
console.log(".unshift('Fundamentos Web'):", materias);

let elementoEliminadoFinal = materias.pop(); // Elimina del final
console.log(".pop() eliminó:", elementoEliminadoFinal, "| Array actual:", materias);

let elementoEliminadoInicio = materias.shift(); // Elimina del inicio
console.log(".shift() eliminó:", elementoEliminadoInicio, "| Array actual:", materias);

// 2. BUCLES (LOOPS)
console.log("\n--- Bucle For Tradicional ---");
const estudiantes = ["Ana", "Carlos", "Diana", "Esteban"];
for (let i = 0; i < estudiantes.length; i++) {
  console.log(`Estudiante #${i + 1}: ${estudiantes[i]}`);
}

console.log("\n--- Bucle For...of ---");
for (const estudiante of estudiantes) {
  console.log(`Hola, ${estudiante}!`);
}

console.log("\n--- Bucle While ---");
let cuenta = 3;
while (cuenta > 0) {
  console.log(`Despegue en: ${cuenta}...`);
  cuenta--;
}
console.log("¡Despegue!");

// 3. MÉTODOS MODERNOS DE RECORRIDO DE ARRAYS (Módulo 7 de Notion)
const articulos = [
  { nombre: "Bici", costo: 3000 },
  { nombre: "Tv", costo: 2500 },
  { nombre: "Libro", costo: 320 },
  { nombre: "Celular", costo: 10000 },
  { nombre: "Laptop", costo: 20000 },
  { nombre: "Teclado", costo: 500 },
  { nombre: "Audifonos", costo: 1700 }
];

console.log("\n--- Métodos de Recorrido de Arrays ---");

// .filter(): Filtra elementos que cumplen una condición
const articulosBaratos = articulos.filter(art => art.costo <= 1000);
console.log("1. .filter() [Artículos de $1000 o menos]:", articulosBaratos.map(a => a.nombre));

// .map(): Transforma cada elemento retornando un nuevo array
const nombresArticulos = articulos.map(art => art.nombre);
console.log("2. .map() [Solo nombres]:", nombresArticulos);

// .find(): Encuentra el primer elemento que cumpla la condición
const buscarLaptop = articulos.find(art => art.nombre === "Laptop");
console.log("3. .find() [Buscar 'Laptop']:", buscarLaptop);

// .forEach(): Ejecuta una acción para cada elemento
console.log("4. .forEach() [Lista de precios]:");
articulos.forEach(art => {
  console.log(`   - ${art.nombre.padEnd(10)}: $${art.costo}`);
});

// .some(): Retorna true o false si al menos un elemento cumple la condición
const tieneArticuloMuyCaro = articulos.some(art => art.costo > 15000);
console.log("5. .some() [¿Hay artículos de más de $15000?]:", tieneArticuloMuyCaro);
