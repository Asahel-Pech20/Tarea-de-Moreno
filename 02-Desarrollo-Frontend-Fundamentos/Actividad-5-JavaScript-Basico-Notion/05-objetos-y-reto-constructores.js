/**
 * MÓDULO 6: OBJETOS Y RETO DE FUNCIÓN CONSTRUCTORA CON CICLO
 * Reto Notion: Función constructora y generación automática de una lista de 30 autos.
 */

console.log("=== MÓDULO 6: OBJETOS Y RETO DE CONSTRUCTORES ===\n");

// 1. OBJETO LITERAL
const miAuto = {
  marca: "Toyota",
  modelo: "Corolla",
  annio: 2024,
  detalleDelAuto: function () {
    return `Auto: ${this.marca} ${this.modelo} (Año: ${this.annio})`;
  }
};

console.log("Objeto literal creado:");
console.log(miAuto.detalleDelAuto());

// 2. FUNCIÓN CONSTRUCTORA
function Auto(marca, modelo, annio) {
  this.marca = marca;
  this.modelo = modelo;
  this.annio = annio;
  this.describir = function () {
    return `${this.marca} ${this.modelo} - ${this.annio}`;
  };
}

console.log("\nInstanciando un auto con función constructora:");
const autoNuevo = new Auto("Tesla", "Model 3", 2025);
console.log("Auto individual:", autoNuevo.describir());

// 3. RETO NOTION: GENERAR 30 AUTOS AUTOMÁTICAMENTE CON UN CICLO
console.log("\n=======================================================");
console.log("RETO: GENERACIÓN AUTOMÁTICA DE 30 AUTOS CON CICLO");
console.log("=======================================================\n");

const marcasDisponibles = ["Ford", "Chevrolet", "Toyota", "Nissan", "Honda", "BMW", "Audi", "Volkswagen"];
const modelosDisponibles = ["Sedán", "SUV", "Camioneta", "Hatchback", "Deportivo", "Compacto"];

const garajeDe30Autos = [];

for (let i = 1; i <= 30; i++) {
  const marcaAleatoria = marcasDisponibles[Math.floor(Math.random() * marcasDisponibles.length)];
  const modeloAleatorio = modelosDisponibles[Math.floor(Math.random() * modelosDisponibles.length)];
  const annioAleatorio = 2015 + Math.floor(Math.random() * 12); // Años entre 2015 y 2026

  const autoCreado = new Auto(marcaAleatoria, `${modeloAleatorio} V${i}`, annioAleatorio);
  garajeDe30Autos.push(autoCreado);
}

// Imprimir los 30 autos generados
garajeDe30Autos.forEach((auto, indice) => {
  console.log(`Auto #${(indice + 1).toString().padStart(2, '0')}: ${auto.describir()}`);
});

console.log(`\n[OK] Reto completado con éxito: Se instanciaron ${garajeDe30Autos.length} objetos Auto en memoria.`);
