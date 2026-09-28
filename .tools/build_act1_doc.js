const path = require('path');
const { createWordDocument } = require('../.tools/generate_docx');

async function buildActividad1Doc() {
  const docData = {
    title: "Actividad 1: Conceptos Generales del Desarrollo Web",
    subtitle: "Unidad I: Introducción al Desarrollo Web | Explicación Clara y Práctica",
    subject: "Aplicaciones Web - Grupo 4-C",
    sections: [
      {
        title: "1. Introducción al Desarrollo Web",
        content: [
          "El desarrollo web es el proceso de diseñar, construir y mantener sitios y aplicaciones que funcionan a través de Internet o de una red local. Todo lo que consultamos en el navegador (desde una búsqueda en Google hasta ver videos en YouTube o comprar en línea) es producto del desarrollo web.",
          {
            type: "tip",
            text: "Imagina que una página web es como una casa: HTML son los cimientos y paredes (la estructura), CSS es la pintura y la decoración (el aspecto visual), y JavaScript es el sistema eléctrico y las puertas automáticas (la interactividad)."
          }
        ]
      },
      {
        title: "2. ¿Cómo funciona Internet en la vida real?",
        content: [
          "Para que una página aparezca en la pantalla de nuestro dispositivo, intervienen varios elementos que trabajan en milisegundos:",
          {
            type: "bullet",
            bold: "Dirección IP",
            text: "Es un número único que identifica a cada computadora o servidor conectado a Internet (como si fuera el número telefónico o la dirección postal de una casa)."
          },
          {
            type: "bullet",
            bold: "DNS (Sistema de Nombres de Dominio)",
            text: "Como a las personas se nos hace difícil memorizar números como 142.250.190.46, el DNS traduce nombres fáciles como 'google.com' al número IP correspondiente. Es la libreta de contactos de Internet."
          },
          {
            type: "bullet",
            bold: "HTTP y HTTPS",
            text: "Es el idioma con el que la computadora pide la página al servidor. La 'S' final significa Seguro (datos cifrados para que nadie pueda interceptar contraseñas o datos personales)."
          }
        ]
      },
      {
        title: "3. La Arquitectura Cliente - Servidor",
        content: [
          "Toda la web moderna se basa en un esquema de preguntas y respuestas llamado Cliente - Servidor:",
          {
            type: "bullet",
            bold: "El Cliente",
            text: "Es el dispositivo y la aplicación que usamos para navegar (tu computadora, celular, y el navegador como Google Chrome, Edge o Firefox). Es quien hace las solicitudes ('Quiero ver la página principal')."
          },
          {
            type: "bullet",
            bold: "El Servidor",
            text: "Es una computadora potente encendida 24/7 en algún centro de datos. Recibe la petición del cliente, busca los archivos o consulta la base de datos, y le responde enviando el resultado."
          },
          {
            type: "tip",
            text: "Analogía del restaurante: Tú como cliente te sientas a la mesa y pides una hamburguesa (solicitud o request). El mesero lleva la orden a la cocina (servidor), los cocineros preparan la comida y el mesero te la trae de vuelta lista para comer (respuesta o response)."
          }
        ]
      },
      {
        title: "4. ¿Qué es Front-End y qué es Back-End?",
        content: [
          "En el desarrollo de software separamos el trabajo en dos grandes mundos:",
          {
            type: "bullet",
            bold: "Front-End (Lado del Cliente)",
            text: "Es todo lo que el usuario puede ver y con lo que interactúa de forma directa en su pantalla: botones, menús, colores, tipografías, formularios y animaciones. Se construye con HTML, CSS y JavaScript (o frameworks como Angular)."
          },
          {
            type: "bullet",
            bold: "Back-End (Lado del Servidor)",
            text: "Es todo lo que ocurre 'detrás de escena' y que el usuario no ve. Se encarga de guardar información en bases de datos (SQL Server, MySQL), autenticar usuarios con contraseñas seguras y ejecutar la lógica de negocio."
          },
          {
            type: "bullet",
            bold: "Full-Stack",
            text: "Se le llama así al desarrollador o proyecto que abarca tanto el Front-End como el Back-End de forma integrada."
          }
        ]
      },
      {
        title: "5. Páginas Estáticas vs. Aplicaciones Web Dinámicas (SPA)",
        content: [
          "Con el paso de los años, las páginas web han evolucionado:",
          {
            type: "bullet",
            bold: "Páginas Estáticas",
            text: "Muestran exactamente la misma información a todos los usuarios. Para cambiar de sección, el navegador tiene que recargar toda la página desde cero."
          },
          {
            type: "bullet",
            bold: "Aplicaciones Web Dinámicas (SPA - Single Page Applications)",
            text: "Son aplicaciones como Gmail, Spotify o Netflix. Cargan una sola vez y van cambiando el contenido al instante sin que la pantalla parpadee ni se recargue toda la página. Angular es uno de los frameworks líderes para crear este tipo de aplicaciones."
          }
        ]
      },
      {
        title: "6. Conclusión y Resumen de la Actividad",
        content: [
          "El desarrollo web moderno combina una interfaz amigable (Front-End) con servidores seguros y eficientes (Back-End), comunicándose a través de protocolos estandarizados (HTTP/HTTPS) para ofrecer experiencias interactivas y rápidas a los usuarios.",
          "Comprender estos principios es el primer escalón fundamental antes de adentrarse en la codificación de interfaces y el uso de tecnologías avanzadas como Angular."
        ]
      }
    ]
  };

  const outputPath = path.resolve('C:/Tareas del 4-C/Aplicaciones web/01-Introduccion-al-Desarrollo-Web/Actividad-1-Conceptos-Generales/Documentacion-Actividad-1.docx');
  await createWordDocument(outputPath, docData);
}

buildActividad1Doc().catch(console.error);
