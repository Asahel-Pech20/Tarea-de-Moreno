/**
 * =========================================================================
 * PRÁCTICA 5 DE JAVASCRIPT: ESTRUCTURAS CONDICIONALES (IF, ELSE, ELSE IF)
 * Curso Notion: Módulo 3 - Condicionales
 * =========================================================================
 */

console.log("=================================================");
console.log("PRÁCTICA 5: CONDICIONALES IF, ELSE IF Y ELSE");
console.log("=================================================\n");

function clasificarCalificacion(calificacion) {
  if (calificacion < 0 || calificacion > 100) {
    return "[ERROR] Calificación inválida (debe ser entre 0 y 100)";
  } else if (calificacion >= 90) {
    return "Sobresaliente (Excelente desempeño)";
  } else if (calificacion >= 80) {
    return "Muy Bien (Desempeño destacado)";
  } else if (calificacion >= 70) {
    return "[OK] Aprobado (Cumple los objetivos)";
  } else {
    return "[AVISO] No Acreditado (Requiere regularización)";
  }
}

// Pruebas de la estructura condicional
const calificacionesPrueba = [95, 83, 72, 59, 105];

calificacionesPrueba.forEach(nota => {
  console.log(`Evaluando nota ${nota.toString().padStart(3, ' ')}: ${clasificarCalificacion(nota)}`);
});

// Operador Ternario (Forma compacta de if/else)
let edadUsuario = 19;
let puedeVotar = edadUsuario >= 18 ? "Sí puede votar" : "No puede votar (menor de edad)";
console.log(`\nOperador Ternario -> Edad ${edadUsuario}: ${puedeVotar}`);

// Modo interactivo en terminal
const readline = require('readline');
if (process.stdin.isTTY) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question("\n¿Deseas probar una calificacion personalizada? Ingresa una nota (0-100) o Enter para finalizar: ", (entrada) => {
    rl.close();
    if (entrada.trim() !== "") {
      const notaUser = parseFloat(entrada);
      if (isNaN(notaUser)) {
        console.log("[ERROR] Debes ingresar un numero valido.");
      } else {
        console.log(`Resultado para nota ${notaUser}: ${clasificarCalificacion(notaUser)}`);
      }
    }
    console.log("\n[OK] Practica 5 completada con exito.");
  });
} else {
  console.log("\n[OK] Practica 5 completada con exito.");
}
