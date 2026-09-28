const path = require('path');
const { createWordDocument } = require('../.tools/generate_docx');

async function buildActividad2Doc() {
  const docData = {
    title: "Actividad 2: Entornos de Desarrollo Web y Configuración",
    subtitle: "Unidad I: Introducción al Desarrollo Web | Herramientas y Preparación del Espacio de Trabajo",
    subject: "Aplicaciones Web - Grupo 4-C",
    sections: [
      {
        title: "1. ¿Qué es un Entorno de Desarrollo Web?",
        content: [
          "Un entorno de desarrollo es el conjunto de programas, herramientas y configuraciones que un programador instala y prepara en su computadora para poder escribir, probar y depurar código de manera eficiente.",
          {
            type: "tip",
            text: "Así como un carpintero necesita un banco de trabajo con sierras, martillos y reglas antes de empezar a construir muebles, un programador web necesita su editor, navegador y herramientas de consola antes de crear aplicaciones."
          }
        ]
      },
      {
        title: "2. Herramientas Fundamentales de Trabajo",
        content: [
          {
            type: "bullet",
            bold: "Editor de Código (Visual Studio Code)",
            text: "Es el bloc de notas avanzado donde escribimos el código. Nos ayuda coloreando las palabras clave, completando código automáticamente y detectando errores de sintaxis al instante."
          },
          {
            type: "bullet",
            bold: "Navegador Web y DevTools (Herramientas de Desarrollador)",
            text: "Permiten ver el resultado de nuestro trabajo. Al presionar F12 en Chrome o Edge se abren las DevTools, donde podemos inspeccionar los elementos HTML, ver errores en la consola y monitorear las peticiones de red."
          },
          {
            type: "bullet",
            bold: "Node.js y NPM",
            text: "Node.js nos permite ejecutar código JavaScript directamente en la computadora sin necesidad del navegador. NPM (Node Package Manager) es como una tienda de aplicaciones gratuita donde descargamos librerías, como Angular o paquetes de diseño."
          },
          {
            type: "bullet",
            bold: "Git",
            text: "Es una máquina del tiempo para nuestro código. Registra cada cambio que hacemos, permitiéndonos volver a una versión anterior si algo falla y trabajar en equipo."
          },
          {
            type: "bullet",
            bold: "Terminal / Consola de Comandos (PowerShell / Bash)",
            text: "Ventana de texto donde le damos órdenes directas a la computadora para crear proyectos, instalar paquetes y levantar servidores de prueba."
          }
        ]
      },
      {
        title: "3. Comandos de Verificación en Windows",
        content: [
          "Para verificar que el equipo cuenta con todo lo necesario, se abren PowerShell o la consola y se ejecutan los siguientes comandos:",
          {
            type: "code",
            code: "node -v           --> Muestra la versión instalada de Node.js (ej. v24.12.0)"
          },
          {
            type: "code",
            code: "npm -v            --> Muestra la versión instalada del gestor NPM (ej. 11.6.2)"
          },
          {
            type: "code",
            code: "git --version     --> Muestra la versión instalada de Git (ej. 2.52.0)"
          }
        ]
      },
      {
        title: "4. Solución al problema común de PowerShell en Windows",
        content: [
          "En Windows es muy frecuente que al intentar ejecutar comandos como 'ng' o 'npx' aparezca un error rojo que dice: 'la ejecución de scripts está deshabilitada en este sistema'.",
          "Esto se debe a las políticas de seguridad por defecto de Windows. La solución rápida y segura recomendada en el material de estudio es:",
          {
            type: "code",
            code: "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser"
          },
          {
            type: "tip",
            text: "Este comando solo autoriza a tu usuario actual a ejecutar herramientas de desarrollo sin comprometer la seguridad del resto de la máquina."
          }
        ]
      },
      {
        title: "5. Script de Verificación Automática Desarrollado",
        content: [
          "Como parte práctica de esta actividad, se desarrolló el script 'verificar-entorno.js'. Este programa analiza los comandos del sistema y confirma en pantalla el estado de cada herramienta de forma automatizada y amigable.",
          "Resultado de la prueba en nuestro equipo:",
          {
            type: "bullet",
            bold: "Node.js",
            text: "v24.12.0 detectado correctamente."
          },
          {
            type: "bullet",
            bold: "NPM",
            text: "11.6.2 listo para instalar dependencias."
          },
          {
            type: "bullet",
            bold: "Git",
            text: "2.52.0.windows.1 listo para control de versiones."
          }
        ]
      },
      {
        title: "6. Conclusión",
        content: [
          "El espacio de trabajo ha quedado formalmente configurado y verificado. Con las herramientas básicas en su lugar, el entorno se encuentra completamente preparado para avanzar a la codificación de interfaces en HTML, estilos con CSS y lógica con JavaScript y Angular."
        ]
      }
    ]
  };

  const outputPath = path.resolve('C:/Tareas del 4-C/Aplicaciones web/01-Introduccion-al-Desarrollo-Web/Actividad-2-Entorno-y-Herramientas/Documentacion-Actividad-2.docx');
  await createWordDocument(outputPath, docData);
}

buildActividad2Doc().catch(console.error);
