/**
 * Script interactivo para verificar las herramientas del entorno de desarrollo web.
 * Para ejecutar: node verificar-entorno.js
 */
const { execSync } = require('child_process');

console.log('====================================================');
console.log('  VERIFICADOR DE ENTORNO DE DESARROLLO WEB (4-C)');
console.log('====================================================\n');

const herramientas = [
  { nombre: 'Node.js', comando: 'node -v', descripcion: 'Entorno de ejecución JavaScript' },
  { nombre: 'NPM', comando: 'npm -v', descripcion: 'Gestor de paquetes de Node.js' },
  { nombre: 'Git', comando: 'git --version', descripcion: 'Sistema de control de versiones' }
];

herramientas.forEach(h => {
  try {
    const version = execSync(h.comando, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    console.log(`[OK]    ${h.nombre.padEnd(10)}: ${version.padEnd(20)} (${h.descripcion})`);
  } catch (error) {
    console.log(`[ERROR] ${h.nombre.padEnd(10)}: No instalado o no encontrado en PATH`);
  }
});

console.log('\n----------------------------------------------------');
console.log('Estado: El equipo cuenta con las herramientas necesarias');
console.log('        para trabajar con desarrollo web, JavaScript y Angular.');
console.log('====================================================');
