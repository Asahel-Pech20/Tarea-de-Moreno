/**
 * =========================================================================
 * PRÁCTICA 6 DE JAVASCRIPT: RETO 1 - JUEGO PIEDRA, PAPEL O TIJERA (IF / ELSE)
 * Curso Notion: Módulo 3.1 - Juego de piedra, papel o tijera
 * =========================================================================
 */

console.log("================================================================");
console.log("📌 PRÁCTICA 6: RETO 1 - PIEDRA, PAPEL O TIJERA (CON IF / ELSE)");
console.log("================================================================\n");

const OPCIONES = ["piedra", "papel", "tijera"];

/**
 * Función que determina el resultado de una partida usando if, else if y else.
 */
function jugarPiedraPapelTijeraIf(jugador, cpu) {
  jugador = jugador.toLowerCase();
  cpu = cpu.toLowerCase();

  // Validación de empates
  if (jugador === cpu) {
    return `🤝 ¡EMPATE! Ambos eligieron [${jugador}].`;
  }

  // Validación de las 3 condiciones de victoria para el jugador
  if (
    (jugador === "piedra" && cpu === "tijera") ||
    (jugador === "papel" && cpu === "piedra") ||
    (jugador === "tijera" && cpu === "papel")
  ) {
    return `🎉 ¡GANASTE! [${jugador}] vence a [${cpu}].`;
  } else {
    // Si no es empate ni ganaste, la CPU gana
    return `😢 PERDISTE. [${cpu}] vence a [${jugador}].`;
  }
}

// Pruebas controladas
console.log("--- Pruebas de Partidas Controladas ---");
console.log("Partida 1 (Piedra vs Tijera) :", jugarPiedraPapelTijeraIf("piedra", "tijera"));
console.log("Partida 2 (Papel vs Tijera)  :", jugarPiedraPapelTijeraIf("papel", "tijera"));
console.log("Partida 3 (Papel vs Papel)   :", jugarPiedraPapelTijeraIf("papel", "papel"));

// Simulación de 3 partidas aleatorias
console.log("\n--- Simulación de 3 Partidas Aleatorias vs Computadora ---");
for (let i = 1; i <= 3; i++) {
  const tiroJugador = OPCIONES[Math.floor(Math.random() * OPCIONES.length)];
  const tiroCpu = OPCIONES[Math.floor(Math.random() * OPCIONES.length)];
  console.log(`Ronda ${i}: Jugador=[${tiroJugador}] vs CPU=[${tiroCpu}] -> ${jugarPiedraPapelTijeraIf(tiroJugador, tiroCpu)}`);
}

console.log("\n✅ Práctica 6 completada con éxito.");
