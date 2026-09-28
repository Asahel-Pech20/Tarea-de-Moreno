# 📚 Portafolio de Actividades y Prácticas - Aplicaciones Web (4-C)
### Materia: Aplicaciones Web | Profesor: Moreno | Alumno: Santiago Asahel Pech

Este repositorio contiene la entrega completa de las **24 actividades y prácticas** de la materia, incluyendo código fuente ejecutable, scripts interactivos, proyecto completo en Angular + Node.js y los documentos oficiales en formato Word (`.docx`) para cada entrega.

---

## 📊 Estructura General del Portafolio

```text
📁 Aplicaciones web/
├── 📁 01-Introduccion-al-Desarrollo-Web/
│   ├── 📁 Actividad-1-Conceptos-Generales/
│   │   ├── 📄 Documentacion-Actividad-1.docx
│   │   └── 📄 README.md
│   └── 📁 Actividad-2-Entorno-y-Herramientas/
│       ├── 📜 verificar-entorno.js
│       ├── 📄 Documentacion-Actividad-2.docx
│       └── 📄 README.md
│
├── 📁 02-Desarrollo-Frontend-Fundamentos/
│   ├── 📁 Actividad-3-HTML5-Estructura/
│   │   ├── 🌐 index.html
│   │   ├── 📄 Documentacion-Actividad-3.docx
│   │   └── 📄 README.md
│   ├── 📁 Actividad-4-CSS3-Estilos-y-Layout/
│   │   ├── 🎨 styles.css
│   │   ├── 🌐 index.html
│   │   ├── 📄 Documentacion-Actividad-4.docx
│   │   └── 📄 README.md
│   └── 📁 Actividad-5-JavaScript-Basico-Notion/ (10 Prácticas de JS)
│       ├── 📜 practica-01-variables.js
│       ├── 📜 practica-02-funciones.js
│       ├── 📜 practica-03-scope-y-hoisting.js
│       ├── 📜 practica-04-coercion-y-operadores.js
│       ├── 📜 practica-05-condicionales.js
│       ├── 📜 practica-06-juego-piedra-papel-tijera-if.js
│       ├── 📜 practica-07-juego-piedra-papel-tijera-switch.js
│       ├── 📜 practica-08-arrays-y-metodos.js
│       ├── 📜 practica-09-bucles-for-y-while.js
│       ├── 📜 practica-10-objetos-y-reto-constructores.js
│       ├── 📜 practica-11-metodos-recorrido-arrays.js
│       ├── ⚡ ejecutar-todos-los-ejercicios.js
│       ├── 📄 Documentacion-Actividad-5.docx
│       └── 📄 README.md
│
├── 📁 03-Proyecto-Angular-WebNews/ (10 Módulos de Angular + API)
│   ├── 📁 backend-api/ (Servidor REST Express)
│   ├── 📁 webnews-frontend/ (Angular CLI + Angular Material)
│   ├── 🚀 iniciar-proyecto.bat (Arranque en un clic)
│   ├── 📄 Documentacion-Proyecto-WebNews.docx
│   └── 📄 README.md
│
├── 📄 ESTADO_DEL_CURSO.md
└── 📄 REGISTRO_PROGRESO.json
```

---

## 📝 Resumen de las 24 Prácticas

### 🔹 Unidad 1: Introducción al Desarrollo Web (2 Actividades)
1. **Actividad 1:** Conceptos generales de la web (Arquitectura cliente-servidor, HTTP/HTTPS, DNS, IP, Hosting, Frontend vs Backend con analogías).
2. **Actividad 2:** Configuración del entorno de desarrollo (Instalación y verificación de navegadores, VS Code, Node.js, Git y script automatizado).

### 🔹 Unidad 2: Desarrollo Frontend Fundamentos (12 Prácticas)
3. **Actividad 3:** Maquetación semántica y estructura con HTML5.
4. **Actividad 4:** Estilos, modelo de caja, Flexbox y diseño responsivo con CSS3.
5. **Actividad 5 (10 Prácticas de JavaScript del Curso Notion):**
   - *Práctica 1:* Variables y tipos de datos primitivos.
   - *Práctica 2:* Funciones declarativas vs expresivas.
   - *Práctica 3:* Scope global/local y Hoisting.
   - *Práctica 4:* Coerción implícita/explícita y operadores.
   - *Práctica 5:* Estructuras condicionales (`if`, `else if`, `else`).
   - *Práctica 6:* Reto Juego Piedra, Papel o Tijera (implementación con `if`).
   - *Práctica 7:* Reto Juego Piedra, Papel o Tijera (implementación con `switch`).
   - *Práctica 8:* Arreglos y métodos mutadores (`push`, `pop`, `unshift`, `shift`).
   - *Práctica 9:* Bucles de repetición (`for`, `for...of`, `while`).
   - *Práctica 10:* Objetos literales, funciones constructoras y reto de 30 autos aleatorios.
   - *Práctica Extra:* Métodos avanzados de recorrido (`find`, `forEach`, `some`, `map`, `filter`).

### 🔹 Unidad 3: Proyecto Aplicado WebNews (10 Módulos)
6. **Actividad 6 (Proyecto WebNews en Angular + Node.js):**
   - *Módulo 1:* Arquitectura y estructura de componentes en Angular.
   - *Módulo 2:* Diseño de interfaz con Angular Material (Toolbar, Sidenav, Cards).
   - *Módulo 3:* Enrutamiento (`RouterModule`) y navegación SPA.
   - *Módulo 4:* Servicios e inyección de dependencias (`HttpClient`).
   - *Módulo 5:* Consumo de API REST Backend con datos de noticias.
   - *Módulo 6:* Formularios reactivos con validaciones en tiempo real.
   - *Módulo 7:* Diálogos modales interactivos (`MatDialog`).
   - *Módulo 8:* Notificaciones y retroalimentación con `MatSnackBar`.
   - *Módulo 9:* Manejo de estados de carga y animaciones.
   - *Módulo 10:* Compilación de producción (`ng build`) y empaquetado para despliegue.

---

## ⚡ ¿Cómo ejecutar las prácticas?

### Prácticas de JavaScript (Actividad 5):
Para ejecutar los 10 ejercicios de JavaScript en consola:
```bash
cd "02-Desarrollo-Frontend-Fundamentos/Actividad-5-JavaScript-Basico-Notion"
node ejecutar-todos-los-ejercicios.js
```

### Proyecto WebNews (Actividad 6):
Haz doble clic sobre el archivo:
👉 **`03-Proyecto-Angular-WebNews/iniciar-proyecto.bat`**  
Se iniciará automáticamente el Backend API en el puerto 3000 y la aplicación Angular en `http://localhost:4200`.

---
*Estado: 100% Completado y Verificado para entrega al Profesor Moreno.*
