const path = require('path');
const { createWordDocument } = require('../.tools/generate_docx');

async function buildActividad3Doc() {
  const docData = {
    title: "Actividad 3: Estructura del Lenguaje de Marcado (HTML5)",
    subtitle: "Unidad II: Desarrollo del Front End | Maquetación Semántica y Formularios",
    subject: "Aplicaciones Web - Grupo 4-C",
    sections: [
      {
        title: "1. ¿Qué es HTML y para qué sirve?",
        content: [
          "HTML (HyperText Markup Language o Lenguaje de Marcado de Hipertexto) es el estándar universal que define la estructura y el contenido de cualquier página web. No es un lenguaje de programación porque no realiza cálculos lógicos; es un lenguaje de etiquetas que le dice al navegador qué es cada elemento (un título, un párrafo, una imagen o un botón).",
          {
            type: "tip",
            text: "Piensa en HTML como el esqueleto humano. Sin los huesos, el cuerpo no tendría forma ni soporte. HTML sostiene todos los textos, imágenes y formularios de una web."
          }
        ]
      },
      {
        title: "2. La importancia de la Semántica en HTML5",
        content: [
          "En versiones anteriores de HTML se utilizaba la etiqueta genérica <div> para prácticamente todo. Con HTML5 nacieron las etiquetas semánticas, que tienen un significado claro tanto para los desarrolladores como para los navegadores:",
          {
            type: "bullet",
            bold: "<header>",
            text: "Define la cabecera del sitio o de una sección (logotipos, títulos y navegación)."
          },
          {
            type: "bullet",
            bold: "<nav>",
            text: "Agrupa los enlaces de navegación principales del sitio."
          },
          {
            type: "bullet",
            bold: "<main>",
            text: "Contiene el bloque temático central y único de la página."
          },
          {
            type: "bullet",
            bold: "<section> y <article>",
            text: "<section> agrupa contenidos relacionados, mientras que <article> representa una pieza independiente de información (como una noticia o post)."
          },
          {
            type: "bullet",
            bold: "<footer>",
            text: "El pie de página con derechos de autor, enlaces legales e información de contacto."
          },
          {
            type: "tip",
            text: "Usar etiquetas semánticas ayuda a que personas ciegas que usan lectores de pantalla puedan entender la página, y permite que Google posicione mejor el sitio en los resultados de búsqueda (SEO)."
          }
        ]
      },
      {
        title: "3. Componentes Implementados en la Práctica",
        content: [
          "En el archivo 'index.html' desarrollado para esta actividad se implementaron los siguientes bloques:",
          {
            type: "bullet",
            bold: "Estructura Base",
            text: "Declaración <!DOCTYPE html>, etiquetas meta para compatibilidad móvil (viewport) y juego de caracteres UTF-8."
          },
          {
            type: "bullet",
            bold: "Tablas de Datos",
            text: "Uso de <table>, <thead> para encabezados de columna y <tbody> para las filas de datos del curso."
          },
          {
            type: "bullet",
            bold: "Formulario Interactivo",
            text: "Campos de texto con validación requerida (required), selector desplegable (<select>), área de comentarios (<textarea>) y botones de envío y reinicio."
          }
        ]
      },
      {
        title: "4. Conclusión",
        content: [
          "HTML5 proporciona una base sólida, accesible y organizada para cualquier proyecto web. Con la estructura lista, el siguiente paso natural es aplicar hojas de estilo en cascada (CSS3) para transformar este esqueleto en una interfaz visual atractiva y moderna."
        ]
      }
    ]
  };

  const outputPath = path.resolve('C:/Tareas del 4-C/Aplicaciones web/02-Desarrollo-Frontend-Fundamentos/Actividad-3-HTML5-Estructura/Documentacion-Actividad-3.docx');
  await createWordDocument(outputPath, docData);
}

buildActividad3Doc().catch(console.error);
