/**
 * MÓDULO 3: CONDICIONALES
 * Reto Notion: Juego de Piedra, Papel o Tijera (con IF/ELSE y con SWITCH)
 */

console.log("=== MÓDULO 3: CONDICIONALES Y JUEGO DE PIEDRA, PAPEL O TIJERA ===\n");

const OPCIONES = ["piedra", "papel", "tijera"];

// --- VERSIÓN 1: JUEGO CON IF / ELSE IF / ELSE ---
function jugarConIf(jugador, cpu) {
  jugador = jugador.toLowerCase();
  cpu = cpu.toLowerCase();

  if (jugador === cpu) {
    return `🤝 ¡Empate! Ambos eligieron ${jugador}.`;
  } else if (
    (jugador === "piedra" && cpu === "tijera") ||
    (jugador === "papel" && cpu === "piedra") ||
    (jugador === "tijera" && cpu === "papel")
  ) {
    return `🎉 ¡Ganaste! ${jugador} vence a ${cpu}.`;
  } else {
    return `😢 Perdiste. ${cpu} vence a ${jugador}.`;
  }
}

// --- VERSIÓN 2: JUEGO CON SWITCH ---
function jugarConSwitch(jugador, cpu) {
  jugador = jugador.toLowerCase();
  cpu = cpu.toLowerCase();

  switch (true) {
    case jugador === cpu:
      return `🤝 [Switch] ¡Empate! Ambos eligieron ${jugador}.`;

    case jugador === "piedra" && cpu === "tijera":
    case jugador === "papel" && cpu === "piedra":
    case jugador === "tijera" && cpu === "papel":
      return `🎉 [Switch] ¡Ganaste! ${jugador} vence a ${cpu}.`;

    default:
      return `😢 [Switch] Perdiste. ${cpu} vence a ${jugador}.`;
  }
}

// --- SIMULACIÓN DE PARTIDAS AUTOMÁTICAS ---
console.log("--- Pruebas de Partidas con IF/ELSE ---");
console.log("1. Jugador: piedra vs CPU: tijera ->", jugarConIf("piedra", "tijera"));
console.log("2. Jugador: papel  vs CPU: tijera ->", jugarConIf("papel", "tijera"));
console.log("3. Jugador: papel  vs CPU: papel  ->", jugarConIf("papel", "papel"));

console.log("\n--- Pruebas de Partidas con SWITCH ---");
console.log("1. Jugador: tijera vs CPU: papel  ->", jugarConSwitch("tijera", "papel"));
console.log("2. Jugador: piedra vs CPU: papel  ->", jugarConSwitch("piedra", "papel"));
console.log("3. Jugador: tijera vs CPU: tijera ->", jugarConSwitch("tijera", "tijera"));

console.log("\n--- Partida Aleatoria en Tiempo Real ---");
const jugadaAleatoriaJugador = OPCIONES[Math.floor(Math.random() * OPCIONES.length)];
const jugadaAleatoriaCpu = OPCIONES[Math.floor(Math.random() * OPCIONES.length)];
console.log(`Jugador eligió: [${jugadaAleatoriaJugador}] | Computadora eligió: [${jugadaAleatoriaCpu}]`);
console.log("Resultado:", jugarConIf(jugadaAleatoriaJugador, jugadaAleatoriaCpu));
