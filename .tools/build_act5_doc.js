const path = require('path');
const { createWordDocument } = require('../.tools/generate_docx');

async function buildActividad5Doc() {
  const docData = {
    title: "Compendio de las 10 Prácticas de JavaScript (Curso Notion)",
    subtitle: "Unidad II: Desarrollo del Front End | Algoritmos, Lógica, Arrays y Retos de Programación",
    subject: "Aplicaciones Web - Grupo 4-C",
    sections: [
      {
        title: "1. Introducción al Compendio de JavaScript",
        content: [
          "Este documento reúne y documenta formalmente las 10 prácticas individuales derivadas del Curso Básico de JavaScript de Notion, cubriendo desde los conceptos primitivos del lenguaje hasta la resolución de los retos algorítmicos planteados.",
          {
            type: "tip",
            text: "Cada práctica se encuentra programada en su propio archivo ejecutable dentro de la carpeta del proyecto, lista para correrse individualmente con Node.js."
          }
        ]
      },
      {
        title: "Práctica 1: Variables y Tipos de Datos Primitivos",
        content: [
          "Archivo: practica-01-variables.js",
          {
            type: "bullet",
            bold: "Propósito",
            text: "Comprender la diferencia entre variables modificables ('let'), constantes ('const') y tipos primitivos (string, number, boolean, null, undefined)."
          },
          {
            type: "tip",
            text: "Una variable con 'let' es como una libreta donde puedes borrar y volver a escribir; una constante con 'const' es como un documento sellado que nunca cambia."
          }
        ]
      },
      {
        title: "Práctica 2: Funciones Declarativas y de Expresión",
        content: [
          "Archivo: practica-02-funciones.js",
          {
            type: "bullet",
            bold: "Propósito",
            text: "Implementar funciones declarativas tradicionales, funciones de expresión guardadas en variables y funciones flecha modernas (Arrow Functions)."
          },
          {
            type: "bullet",
            bold: "Resultado",
            text: "Se crearon funciones para saludar y calcular el promedio de calificaciones, validando si el estudiante acreditó la materia."
          }
        ]
      },
      {
        title: "Práctica 3: Scope (Alcance) y Hoisting (Elevación)",
        content: [
          "Archivo: practica-03-scope-y-hoisting.js",
          {
            type: "bullet",
            bold: "Scope Global vs. Local",
            text: "Demuestra que las variables creadas dentro de una función o bloque {} no son accesibles desde el exterior."
          },
          {
            type: "bullet",
            bold: "Hoisting",
            text: "Comportamiento del motor de JavaScript que eleva la declaración de funciones a la parte superior, permitiendo invocarlas incluso antes de escribirlas."
          }
        ]
      },
      {
        title: "Práctica 4: Coerción, Valores Truthy/Falsy y Operadores",
        content: [
          "Archivo: practica-04-coercion-y-operadores.js",
          {
            type: "bullet",
            bold: "Coerción de Tipos",
            text: "Demuestra la coerción implícita (ej. 4 + '7' = '47') frente a la conversión explícita con Number() y String()."
          },
          {
            type: "bullet",
            bold: "Operadores Estrictos",
            text: "Diferencia entre igualdad débil (==) que ignora tipos y la igualdad estricta (===) que compara valor y tipo de dato."
          }
        ]
      },
      {
        title: "Práctica 5: Estructuras Condicionales (If, Else If, Else)",
        content: [
          "Archivo: practica-05-condicionales.js",
          {
            type: "bullet",
            bold: "Propósito",
            text: "Tomar decisiones lógicas en el flujo del programa clasificando calificaciones escolares (Sobresaliente, Muy Bien, Aprobado o No Acreditado) y uso del operador ternario."
          }
        ]
      },
      {
        title: "Práctica 6: Reto 1 - Juego Piedra, Papel o Tijera (con If / Else)",
        content: [
          "Archivo: practica-06-juego-piedra-papel-tijera-if.js",
          {
            type: "bullet",
            bold: "Lógica del Reto",
            text: "Algoritmo que compara la elección del usuario contra la computadora mediante if/else, validando empates y las 3 condiciones de triunfo (piedra vence tijera, papel vence piedra, tijera vence papel)."
          },
          {
            type: "tip",
            text: "El programa incluye una simulación automática de partidas aleatorias contra la computadora en tiempo real."
          }
        ]
      },
      {
        title: "Práctica 7: Reto 2 - Juego Piedra, Papel o Tijera (con Switch)",
        content: [
          "Archivo: practica-07-juego-piedra-papel-tijera-switch.js",
          {
            type: "bullet",
            bold: "Lógica del Reto",
            text: "Resolución de la misma mecánica de juego pero estructurada limpiamente a través de una sentencia 'switch (true)', demostrando una sintaxis alternativa y elegante."
          }
        ]
      },
      {
        title: "Práctica 8: Arrays, Índices y Métodos de Manipulación",
        content: [
          "Archivo: practica-08-arrays-y-metodos.js",
          {
            type: "bullet",
            bold: "Métodos Implementados",
            text: ".push() (añadir al final), .unshift() (añadir al inicio), .pop() (quitar del final), .shift() (quitar del inicio) e .indexOf() (localizar posición)."
          }
        ]
      },
      {
        title: "Práctica 9: Bucles y Ciclos de Repetición (For y While)",
        content: [
          "Archivo: practica-09-bucles-for-y-while.js",
          {
            type: "bullet",
            bold: "Ciclos Implementados",
            text: "Bucle 'for' tradicional con contador numérico, bucle 'for...of' para recorrer colecciones directamente, y bucles 'while' y 'do...while' para repeticiones basadas en condiciones."
          }
        ]
      },
      {
        title: "Práctica 10: Objetos y el Reto de Constructores con Ciclo",
        content: [
          "Archivo: practica-10-objetos-y-reto-constructores.js",
          {
            type: "bullet",
            bold: "Objetos Literales",
            text: "Definición de propiedades y métodos utilizando 'this' para acceder al propio objeto."
          },
          {
            type: "bullet",
            bold: "Resolución del Reto de Notion",
            text: "Creación de una función constructora 'function Auto(marca, modelo, annio)' y un ciclo 'for' que instancia de forma 100% automatizada una lista de 30 automóviles en memoria, combinando marcas, modelos y años aleatorios."
          }
        ]
      },
      {
        title: "Práctica 11 (Bonus): Métodos Modernos de Recorrido de Arrays",
        content: [
          "Archivo: practica-11-metodos-recorrido-arrays.js",
          {
            type: "bullet",
            bold: "Métodos ES6+",
            text: "Uso de .filter() (filtrar elementos), .map() (transformar arrays), .find() (buscar el primer elemento), .some() (validar existencia booleana) y .forEach() (iteración limpia)."
          }
        ]
      },
      {
        title: "Conclusión",
        content: [
          "Las 10 prácticas individuales cubren la totalidad de los temas del curso básico de JavaScript, proporcionando una sólida base algorítmica para el desarrollo de componentes modernos en TypeScript y Angular."
        ]
      }
    ]
  };

  const outputPath = path.resolve('C:/Tareas del 4-C/Aplicaciones web/02-Desarrollo-Frontend-Fundamentos/Actividad-5-JavaScript-Basico-Notion/Documentacion-Actividad-5.docx');
  await createWordDocument(outputPath, docData);
}

buildActividad5Doc().catch(console.error);
