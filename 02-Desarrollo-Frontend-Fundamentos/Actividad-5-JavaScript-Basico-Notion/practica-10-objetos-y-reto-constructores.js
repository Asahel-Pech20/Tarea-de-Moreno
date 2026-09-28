/**
 * =========================================================================
 * PRÁCTICA 10 DE JAVASCRIPT: OBJETOS Y RETO DE FUNCIÓN CONSTRUCTORA CON CICLO
 * Curso Notion: Módulo 6 - Objects, Función constructora y Reto con Ciclo
 * =========================================================================
 */

console.log("================================================================");
console.log("📌 PRÁCTICA 10: OBJETOS LITERALES Y RETO DE CONSTRUCTORES CON CICLO");
console.log("================================================================\n");

// 1. Objeto Literal
const alumno = {
  nombre: "Carlos Gómez",
  matricula: "2026-4C-042",
  semestre: 4,
  materias: ["Aplicaciones Web", "Bases de Datos", "Redes"],
  obtenerFicha: function () {
    return `${this.nombre} | Matrícula: ${this.matricula} (Semestre: ${this.semestre}°)`;
  }
};

console.log("1. Objeto literal creado:");
console.log(alumno.obtenerFicha());

// 2. Función Constructora (Plantilla para crear múltiples instancias con 'new')
function Auto(marca, modelo, annio) {
  this.marca = marca;
  this.modelo = modelo;
  this.annio = annio;
  this.describir = function () {
    return `Auto: ${this.marca} ${this.modelo} (${this.annio})`;
  };
}

console.log("\n2. Creando una instancia individual con 'new Auto()':");
const autoDemo = new Auto("Mazda", "CX-5", 2025);
console.log(autoDemo.describir());

// 3. EL GRAN RETO DE NOTION:
// Generar una lista de 30 autos automáticamente combinando un ciclo for y la función constructora.
console.log("\n================================================================");
console.log("🚗 RETO NOTION: GENERACIÓN AUTOMÁTICA DE 30 AUTOS CON CICLO FOR");
console.log("================================================================\n");

const marcas = ["Toyota", "Nissan", "Ford", "Chevrolet", "Honda", "BMW", "Audi", "Volkswagen"];
const modelos = ["Sedán", "SUV", "Coupe", "Camioneta", "Hatchback", "Deportivo"];

const listaDe30Autos = [];

for (let i = 1; i <= 30; i++) {
  // Selección pseudo-aleatoria de marca, modelo y año
  const marcaElegida = marcas[Math.floor(Math.random() * marcas.length)];
  const modeloElegido = modelos[Math.floor(Math.random() * modelos.length)];
  const annioElegido = 2016 + Math.floor(Math.random() * 11); // Años entre 2016 y 2026

  // Instanciamos el objeto con new y lo agregamos a la lista
  const nuevoAuto = new Auto(marcaElegida, `${modeloElegido} Serie-${i}`, annioElegido);
  listaDe30Autos.push(nuevoAuto);
}

// Imprimimos la lista de los 30 autos generados
listaDe30Autos.forEach((auto, index) => {
  console.log(`[${(index + 1).toString().padStart(2, '0')}/30] ${auto.describir()}`);
});

console.log(`\n🎉 Total de autos instanciados en memoria: ${listaDe30Autos.length}`);
console.log("✅ Práctica 10 y Reto de Notion completados con éxito.");
