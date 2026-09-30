/**
 * =========================================================================
 * PRÁCTICA 10 DE JAVASCRIPT: OBJETOS Y RETO DE FUNCIÓN CONSTRUCTORA CON CICLO
 * Curso Notion: Módulo 6 - Objects, Función constructora y Reto con Ciclo
 * =========================================================================
 */

console.log("================================================================");
console.log("PRÁCTICA 10: OBJETOS LITERALES Y RETO DE CONSTRUCTORES CON CICLO");
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
console.log("RETO NOTION: GENERACIÓN AUTOMÁTICA DE 30 AUTOS CON CICLO FOR");
console.log("================================================================\n");

const marcas = ["Toyota", "Nissan", "Ford", "Chevrolet", "Honda", "BMW", "Audi", "Volkswagen"];
const modelos = ["Sedán", "SUV", "Coupe", "Camioneta", "Hatchback", "Deportivo"];

function fabricarAutos(cantidad) {
  const autos = [];
  for (let i = 1; i <= cantidad; i++) {
    const marcaElegida = marcas[Math.floor(Math.random() * marcas.length)];
    const modeloElegido = modelos[Math.floor(Math.random() * modelos.length)];
    const annioElegido = 2016 + Math.floor(Math.random() * 11);
    const nuevoAuto = new Auto(marcaElegida, `${modeloElegido} Serie-${i}`, annioElegido);
    autos.push(nuevoAuto);
  }
  return autos;
}

const listaDe30Autos = fabricarAutos(30);

listaDe30Autos.forEach((auto, index) => {
  console.log(`[${(index + 1).toString().padStart(2, '0')}/30] ${auto.describir()}`);
});

console.log(`\nTotal de autos instanciados en memoria: ${listaDe30Autos.length}`);

// Modo interactivo en terminal
const readline = require('readline');
if (process.stdin.isTTY) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question("\n¿Deseas fabricar una cantidad personalizada de autos con el constructor? (ej. 5, 15 o Enter para terminar): ", (resp) => {
    rl.close();
    resp = (resp || "").trim();
    if (resp !== "") {
      const cant = parseInt(resp);
      if (!isNaN(cant) && cant > 0) {
        console.log(`\nFabricando ${cant} autos personalizados con 'new Auto()':`);
        const listaCustom = fabricarAutos(cant);
        listaCustom.forEach((a, idx) => console.log(`   [#${idx + 1}] ${a.describir()}`));
      } else {
        console.log("[ERROR] Cantidad no valida.");
      }
    }
    console.log("\n[OK] Practica 10 y Reto de Notion completados con exito.");
  });
} else {
  console.log("[OK] Practica 10 y Reto de Notion completados con exito.");
}
