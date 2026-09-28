const path = require('path');
const { createWordDocument } = require('../.tools/generate_docx');

async function buildActividad4Doc() {
  const docData = {
    title: "Actividad 4: Hojas de Estilos en Cascada (CSS3)",
    subtitle: "Unidad II: Desarrollo del Front End | Box Model, Flexbox y Diseño Responsivo",
    subject: "Aplicaciones Web - Grupo 4-C",
    sections: [
      {
        title: "1. ¿Qué es CSS y cuál es su función?",
        content: [
          "CSS (Cascading Style Sheets u Hojas de Estilo en Cascada) es el lenguaje utilizado para describir la presentación gráfica de un documento estructurado en HTML. Mientras que HTML aporta el contenido y el orden, CSS aporta la estética: colores, tipografías, alineaciones, márgenes, bordes, sombras y adaptabilidad a diferentes pantallas.",
          {
            type: "tip",
            text: "Si HTML es el maniquí o el esqueleto, CSS es la ropa, el peinado, los colores y los accesorios que hacen que luzca presentable y atractivo."
          }
        ]
      },
      {
        title: "2. El Modelo de Caja (CSS Box Model)",
        content: [
          "En CSS, todo elemento en pantalla es considerado una caja rectangular compuesta por 4 capas concéntricas:",
          {
            type: "bullet",
            bold: "Contenido (Content)",
            text: "El área donde realmente se encuentra el texto, la imagen o el video."
          },
          {
            type: "bullet",
            bold: "Relleno interior (Padding)",
            text: "El espacio libre que existe entre el contenido y el borde de la caja. Evita que el texto quede pegado a las orillas."
          },
          {
            type: "bullet",
            bold: "Borde (Border)",
            text: "La línea que rodea al relleno interior y delimita la caja exteriormente."
          },
          {
            type: "bullet",
            bold: "Margen exterior (Margin)",
            text: "El espacio libre que separa esta caja de las demás cajas vecinas."
          },
          {
            type: "tip",
            text: "La propiedad 'box-sizing: border-box;' es una regla moderna indispensable que asegura que el padding y los bordes no ensanchen la caja más allá del ancho especificado."
          }
        ]
      },
      {
        title: "3. Flexbox y Distribución de Elementos",
        content: [
          "Flexbox (Flexible Box Layout) es un modelo de diseño unidimensional que permite organizar, alinear y distribuir el espacio entre los elementos de una página de forma automática y ordenada, sin recurrir a trucos antiguos como los 'floats'.",
          "En la práctica se utilizó Flexbox para:",
          {
            type: "bullet",
            bold: "Barra de navegación",
            text: "Alinear horizontalmente las opciones del menú de forma espaciada y limpia."
          },
          {
            type: "bullet",
            bold: "Cuadrícula de noticias",
            text: "Distribuir las tarjetas de noticias en filas de dos elementos con la misma altura."
          }
        ]
      },
      {
        title: "4. Diseño Responsivo (Responsive Web Design)",
        content: [
          "Hoy en día los usuarios acceden a Internet desde celulares, tablets y computadoras. Un sitio web moderno debe adaptarse sin romperse a cualquier pantalla.",
          "Esto se logra mediante las Media Queries (@media), que aplican reglas específicas según el ancho del dispositivo:",
          {
            type: "code",
            code: "@media (max-width: 768px) { /* Estilos que solo se aplican en celulares y tablets */ }"
          },
          "En nuestra práctica, cuando la pantalla es pequeña, las tarjetas de noticias pasan de ocupar el 50% al 100% del ancho, y los botones del formulario se apilan verticalmente para poder presionarse con comodidad en pantallas táctiles."
        ]
      },
      {
        title: "5. Conclusión",
        content: [
          "CSS3 completa la dupla visual de la web junto a HTML5. Con la estructura y el diseño perfectamente consolidados, el portal web está listo para cobrar vida e interactividad mediante la lógica de programación con JavaScript."
        ]
      }
    ]
  };

  const outputPath = path.resolve('C:/Tareas del 4-C/Aplicaciones web/02-Desarrollo-Frontend-Fundamentos/Actividad-4-CSS3-Estilos-y-Layout/Documentacion-Actividad-4.docx');
  await createWordDocument(outputPath, docData);
}

buildActividad4Doc().catch(console.error);
