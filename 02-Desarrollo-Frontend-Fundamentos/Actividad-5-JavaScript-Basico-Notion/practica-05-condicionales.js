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
    return "⭐ Muy Bien (Desempeño destacado)";
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

console.log("\n[OK] Práctica 5 completada con éxito.");
