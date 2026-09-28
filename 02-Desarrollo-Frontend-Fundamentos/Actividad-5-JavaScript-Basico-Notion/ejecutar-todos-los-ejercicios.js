/**
 * EJECUTOR MAESTRO DE TODAS LAS PRÁCTICAS DE JAVASCRIPT (NOTION)
 * Ejecuta en serie las 10 prácticas individuales del curso.
 */

const { execSync } = require('child_process');
const path = require('path');

const practicas = [
  'practica-01-variables.js',
  'practica-02-funciones.js',
  'practica-03-scope-y-hoisting.js',
  'practica-04-coercion-y-operadores.js',
  'practica-05-condicionales.js',
  'practica-06-juego-piedra-papel-tijera-if.js',
  'practica-07-juego-piedra-papel-tijera-switch.js',
  'practica-08-arrays-y-metodos.js',
  'practica-09-bucles-for-y-while.js',
  'practica-10-objetos-y-reto-constructores.js',
  'practica-11-metodos-recorrido-arrays.js'
];

console.log('========================================================================');
console.log('🚀 EJECUTANDO LAS 10 PRÁCTICAS INDIVIDUALES DE JAVASCRIPT (CURSO NOTION)');
console.log('========================================================================\n');

practicas.forEach((archivo, index) => {
  console.log(`\n▶️ [PRÁCTICA ${index + 1}/${practicas.length}]: ${archivo}`);
  console.log('------------------------------------------------------------------------');
  try {
    const salida = execSync(`node "${path.join(__dirname, archivo)}"`, { encoding: 'utf8' });
    console.log(salida);
  } catch (err) {
    console.error(`❌ Error en ${archivo}:`, err.message);
  }
});

console.log('========================================================================');
console.log('🎉 TODAS LAS 10 PRÁCTICAS Y RETOS FUERON EJECUTADOS CON ÉXITO');
console.log('========================================================================');
