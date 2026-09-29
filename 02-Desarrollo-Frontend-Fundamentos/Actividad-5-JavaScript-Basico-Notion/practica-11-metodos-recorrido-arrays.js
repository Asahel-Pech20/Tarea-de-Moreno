/**
 * =========================================================================
 * PRÁCTICA 11 (BONUS): MÉTODOS DE RECORRIDO DE ARRAYS (NOTION MÓDULO 7)
 * Métodos: .filter(), .map(), .find(), .forEach(), .some()
 * =========================================================================
 */

console.log("================================================================");
console.log("PRÁCTICA 11: MÉTODOS MODERNOS DE RECORRIDO DE ARRAYS (ES6+)");
console.log("================================================================\n");

// Array de productos tecnológicos para probar los métodos
const inventario = [
  { nombre: "Laptop", categoria: "Computo", precio: 18500 },
  { nombre: "Mouse", categoria: "Accesorios", precio: 350 },
  { nombre: "Teclado Mecanico", categoria: "Accesorios", precio: 1200 },
  { nombre: "Monitor 27 Pulgadas", categoria: "Pantallas", precio: 4500 },
  { nombre: "Audifonos Bluetooth", categoria: "Audio", precio: 950 },
  { nombre: "Memoria USB 64GB", categoria: "Almacenamiento", precio: 220 }
];

console.log("--- Inventario Base ---");
console.table(inventario);

// 1. .filter(): Devuelve un nuevo array con elementos que cumplan una condición
const accesorios = inventario.filter(item => item.categoria === "Accesorios");
console.log("\n1. .filter() -> Solo accesorios:", accesorios.map(a => a.nombre));

// 2. .map(): Transforma cada elemento retornando un nuevo array
const listaPrecios = inventario.map(item => `${item.nombre} ($${item.precio} MXN)`);
console.log("\n2. .map() -> Lista formateada de precios:", listaPrecios);

// 3. .find(): Encuentra el PRIMER elemento que coincida
const productoBuscado = inventario.find(item => item.precio < 300);
console.log("\n3. .find() -> Primer producto menor a $300:", productoBuscado);

// 4. .some(): Comprueba si AL MENOS UN elemento cumple la condición (true/false)
const hayProductoCaro = inventario.some(item => item.precio > 15000);
console.log(`\n4. .some() -> ¿Existe algún producto mayor a $15,000?: ${hayProductoCaro ? "SÍ" : "NO"}`);

// 5. .forEach(): Ejecuta una acción para cada elemento
console.log("\n5. .forEach() -> Imprimiendo etiquetas de inventario:");
inventario.forEach((prod, i) => {
  console.log(`   [Item ${i + 1}] ${prod.nombre.padEnd(22)} | Categ: ${prod.categoria.padEnd(14)} | $${prod.precio}`);
});

console.log("\n[OK] Práctica 11 (Métodos de Array) completada con éxito.");
