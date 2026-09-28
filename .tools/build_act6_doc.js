const path = require('path');
const { createWordDocument } = require('../.tools/generate_docx');

async function buildActividad6Doc() {
  const docData = {
    title: "Proyecto WebNews: Aplicación Web y Consumo de API REST con Angular Material",
    subtitle: "Unidad III: Desarrollo con Frameworks Front-End | Documentación Completa del Proyecto",
    subject: "Aplicaciones Web - Grupo 4-C",
    sections: [
      {
        title: "1. Introducción al Proyecto WebNews",
        content: [
          "El proyecto WebNews es una aplicación web moderna de tipo SPA (Single Page Application) diseñada para la publicación, consulta y administración de noticias clasificadas por categorías.",
          "La aplicación integra las tecnologías más demandadas del mercado: un Front-End desarrollado con Angular y Angular Material, y un Back-End que provee una API REST para la persistencia y autenticación con tokens JWT.",
          {
            type: "tip",
            text: "Una Single Page Application (SPA) se siente tan rápida y fluida como una app de celular: nunca verás la pantalla parpadear en blanco al navegar entre secciones, ya que solo cambia el contenido necesario mediante componentes dinámicos."
          }
        ]
      },
      {
        title: "2. Arquitectura General del Sistema",
        content: [
          "El sistema se divide limpiamente en dos componentes comunicados por HTTP:",
          {
            type: "bullet",
            bold: "Back-End (ApiNews)",
            text: "Servidor REST construido sobre Node.js y Express en el puerto 3000. Gestiona los recursos de noticias y categorías, permitiendo operaciones CRUD (Crear, Leer, Actualizar y Eliminar), además de emitir tokens de seguridad JWT en la ruta /api/login."
          },
          {
            type: "bullet",
            bold: "Front-End (WebNews App)",
            text: "Aplicación desarrollada en Angular v21 bajo la arquitectura Standalone (sin NgModules obsoletos), estilizada con la librería oficial Angular Material (diseño Material Design de Google)."
          }
        ]
      },
      {
        title: "3. Componentes y Flujo de Control en Angular",
        content: [
          "La aplicación se diseñó modularmente en componentes independientes y reutilizables:",
          {
            type: "bullet",
            bold: "NavbarComponent",
            text: "Barra de navegación principal que consulta las categorías disponibles en la API y las muestra dinámicamente como botones de acceso directo, adaptando los accesos si el usuario ha iniciado sesión."
          },
          {
            type: "bullet",
            bold: "CardNewComponent",
            text: "Componente reutilizable de presentación que recibe datos por medio de @Input() (título, descripción, fecha, categoría e imagen) y los renderiza dentro de tarjetas visuales de Angular Material (mat-card)."
          },
          {
            type: "bullet",
            bold: "HomeComponent",
            text: "Página de inicio que consume el servicio de noticias y las organiza en una cuadrícula responsiva utilizando el nuevo flujo de control declarativo de Angular (@for y @if)."
          },
          {
            type: "bullet",
            bold: "CategoryComponent",
            text: "Vista parametrizada (/categoria/:id). Utiliza 'ActivatedRoute' para capturar el identificador enviado en la URL, solicita la información de la categoría y filtra en tiempo real las noticias asociadas."
          }
        ]
      },
      {
        title: "4. Consumo de Servicios y Programación Reactiva",
        content: [
          "Para la comunicación con el servidor se utilizaron servicios inyectables ('providedIn: root'):",
          {
            type: "bullet",
            bold: "CategoryService y NewService",
            text: "Hacen uso del cliente HTTP nativo configurado mediante 'provideHttpClient()'. Toda respuesta se gestiona a través de Observables (RxJS), lo que permite manejar asincronía, estados de carga y errores de manera eficiente."
          },
          {
            type: "bullet",
            bold: "Interfaces TypeScript",
            text: "Se definieron modelos formales (New, Category, AuthResponse) garantizando tipado estricto y autocompletado en todo el código."
          }
        ]
      },
      {
        title: "5. Seguridad: Autenticación JWT y Protección con Guards",
        content: [
          "Para proteger las áreas administrativas de accesos no autorizados se implementaron medidas de seguridad:",
          {
            type: "bullet",
            bold: "AuthService",
            text: "Gestiona el inicio de sesión enviando usuario y contraseña a la API. Al recibir la respuesta exitosa, resguarda el token en el almacenamiento local (localStorage) y notifica el cambio de estado a toda la app mediante Signals."
          },
          {
            type: "bullet",
            bold: "authGuard (Guardia de Ruta)",
            text: "Función de seguridad tipo 'CanActivateFn' vinculada a la ruta '/admin'. Si un usuario no autenticado intenta ingresar manualmente a dicha dirección, el guard intercepta la petición y lo redirige automáticamente a la pantalla de login."
          }
        ]
      },
      {
        title: "6. Formularios Reactivos y Diálogos Modales (MatDialog)",
        content: [
          "La gestión de contenidos se realiza de manera elegante e intuitiva:",
          {
            type: "bullet",
            bold: "AdminPanelComponent",
            text: "Vista privada que presenta todas las noticias en una tabla interactiva de Angular Material (mat-table), con botones de acción para editar y eliminar."
          },
          {
            type: "bullet",
            bold: "NewsDialogComponent",
            text: "Ventana emergente (modal) implementada con MatDialog. Contiene un formulario reactivo (ReactiveFormsModule) con validaciones síncronas que permite dar de alta una nueva noticia o modificar una existente sin salir de la vista actual."
          }
        ]
      },
      {
        title: "7. Guía Rápida para Ejecutar el Proyecto",
        content: [
          "Para comodidad del usuario o evaluador, se incluyó el archivo 'iniciar-proyecto.bat' que realiza todo con un solo clic:",
          {
            type: "bullet",
            bold: "Paso 1",
            text: "Abrir la carpeta '03-Proyecto-Angular-WebNews' y hacer doble clic en 'iniciar-proyecto.bat'."
          },
          {
            type: "bullet",
            bold: "Paso 2",
            text: "Se abrirán dos consolas automáticamente: una ejecutando la API REST en http://localhost:3000 y otra con el servidor de desarrollo de Angular en http://localhost:4200."
          },
          {
            type: "bullet",
            bold: "Paso 3",
            text: "Abre tu navegador en http://localhost:4200 para navegar el portal. Para ingresar al panel de administración utiliza: admin@webnews.com con contraseña admin123."
          }
        ]
      },
      {
        title: "8. Conclusiones Generales del Curso",
        content: [
          "A lo largo de las tres unidades se transitó desde los fundamentos de la web y la arquitectura cliente-servidor, pasando por la maquetación semántica en HTML5, el diseño responsivo en CSS3 y la lógica de programación en JavaScript, hasta culminar con el desarrollo de una solución profesional completa en Angular Material consumiendo una API REST.",
          "El proyecto WebNews refleja la integración armoniosa de todas las competencias requeridas en la materia 'Aplicaciones Web', cumpliendo con los más altos estándares de calidad, diseño y organización."
        ]
      }
    ]
  };

  const outputPath = path.resolve('C:/Tareas del 4-C/Aplicaciones web/03-Proyecto-Angular-WebNews/Documentacion-Proyecto-WebNews.docx');
  await createWordDocument(outputPath, docData);
}

buildActividad6Doc().catch(console.error);
