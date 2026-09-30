/**
 * =========================================================================
 * PRÁCTICA 7 DE JAVASCRIPT: RETO 2 - JUEGO PIEDRA, PAPEL O TIJERA (SWITCH)
 * Curso Notion: Módulo 3.2 - Juego de piedra, papel o tijera con switch
 * =========================================================================
 */

console.log("================================================================");
console.log("PRÁCTICA 7: RETO 2 - PIEDRA, PAPEL O TIJERA (CON SWITCH)");
console.log("================================================================\n");

const OPCIONES = ["piedra", "papel", "tijera"];

/**
 * Función que determina el resultado de una partida usando la sentencia switch.
 */
function jugarPiedraPapelTijeraSwitch(jugador, cpu) {
  jugador = jugador.toLowerCase();
  cpu = cpu.toLowerCase();

  switch (true) {
    case jugador === cpu:
      return `[SWITCH] ¡EMPATE! Ambos eligieron [${jugador}].`;

    case jugador === "piedra" && cpu === "tijera":
    case jugador === "papel" && cpu === "piedra":
    case jugador === "tijera" && cpu === "papel":
      return `[SWITCH] ¡GANASTE! [${jugador}] vence a [${cpu}].`;

    default:
      return `[SWITCH] PERDISTE. [${cpu}] vence a [${jugador}].`;
  }
}

// Pruebas controladas
console.log("--- Pruebas de Partidas con Switch ---");
console.log("Partida 1 (Tijera vs Papel) :", jugarPiedraPapelTijeraSwitch("tijera", "papel"));
console.log("Partida 2 (Piedra vs Papel) :", jugarPiedraPapelTijeraSwitch("piedra", "papel"));
console.log("Partida 3 (Piedra vs Piedra):", jugarPiedraPapelTijeraSwitch("piedra", "piedra"));

// Simulación de 3 partidas aleatorias
console.log("\n--- Simulación de 3 Partidas Aleatorias vs Computadora ---");
for (let i = 1; i <= 3; i++) {
  const tiroJugador = OPCIONES[Math.floor(Math.random() * OPCIONES.length)];
  const tiroCpu = OPCIONES[Math.floor(Math.random() * OPCIONES.length)];
  console.log(`Ronda ${i}: Jugador=[${tiroJugador}] vs CPU=[${tiroCpu}] -> ${jugarPiedraPapelTijeraSwitch(tiroJugador, tiroCpu)}`);
}

// Modo interactivo en terminal
const readline = require('readline');
if (process.stdin.isTTY) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question("\n¿Quieres retar a la maquina con switch? Elige (1: piedra, 2: papel, 3: tijera, o Enter para omitir): ", (tiro) => {
    rl.close();
    tiro = (tiro || "").trim().toLowerCase();
    let eleccion = "";
    if (tiro === "1" || tiro === "piedra") eleccion = "piedra";
    else if (tiro === "2" || tiro === "papel") eleccion = "papel";
    else if (tiro === "3" || tiro === "tijera") eleccion = "tijera";

    if (eleccion) {
      const tiroCpu = OPCIONES[Math.floor(Math.random() * OPCIONES.length)];
      console.log(`\n[SWITCH] Tu eleccion: [${eleccion}] vs Computadora: [${tiroCpu}]`);
      console.log(`Resultado: ${jugarPiedraPapelTijeraSwitch(eleccion, tiroCpu)}`);
    }
    console.log("\n[OK] Practica 7 completada con exito.");
  });
} else {
  console.log("\n[OK] Practica 7 completada con exito.");
}
