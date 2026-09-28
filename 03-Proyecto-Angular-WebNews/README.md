# Proyecto WebNews: Aplicación Web y Consumo de API REST con Angular Material

**Materia:** Aplicaciones Web  
**Grupo:** 4-C  
**Unidad:** III. Desarrollo con Frameworks Front-End  
**Material de Referencia:** [Curso Angular Material y API Rest en Notion](https://verbose-vole-299.notion.site/Curso-de-Aprendizaje-Creaci-n-de-Aplicaciones-Web-y-consumo-a-una-API-Rest-con-Angular-Material-b47047f82b144ff19c3f328050208e52)  
**Autor Base:** Jonathan Sabido Reynoso  

---

## 📌 Descripción del Proyecto
**WebNews** es una aplicación web SPA (*Single Page Application*) completa construida con **Angular v21** y **Angular Material**, que consume una **API REST** para el despliegue dinámico de noticias, filtrado por categorías, autenticación con tokens JWT y administración de contenidos mediante modales interactivos (`MatDialog`).

---

## 🛠️ Tecnologías y Módulos Utilizados
* **Angular Core & CLI:** Componentes Standalone, inyección de dependencias y señales reactivas (`Signals`).
* **Angular Material:** `MatToolbar`, `MatCard`, `MatButton`, `MatTable`, `MatDialog`, `MatFormField`, `MatInput`, `MatSelect`, `MatIcon`, `MatSnackBar` y `MatProgressSpinner`.
* **Angular Router:** Navegación declarativa, rutas parametrizadas (`/categoria/:id`) y protección con **Guards** (`authGuard`).
* **HttpClient:** Consumo de endpoints REST con Observables de **RxJS**.
* **Formularios Reactivos:** Validaciones síncronas con `ReactiveFormsModule`.
* **Backend API (Node.js + Express):** Servidor local en el puerto 3000 con persistencia en `database.json` y autenticación JWT.

---

## 📂 Estructura del Proyecto
```text
03-Proyecto-Angular-WebNews/
├── backend-api/                    # Servidor REST API (Express + JWT + Base de datos JSON)
│   ├── server.js                   # Endpoints de noticias, categorías y login
│   ├── database.json               # Datos iniciales precargados
│   └── package.json
├── webnews-frontend/               # Aplicación Frontend en Angular
│   ├── src/app/
│   │   ├── components/
│   │   │   ├── navbar/             # Barra de navegación con categorías dinámicas
│   │   │   ├── card-new/           # Tarjeta reutilizable de noticia (mat-card)
│   │   │   ├── home/               # Cuadrícula principal de noticias
│   │   │   ├── category/           # Vista filtrada por ID de categoría (/categoria/:id)
│   │   │   ├── login/              # Formulario reactivo de autenticación
│   │   │   ├── admin-panel/        # Tabla de noticias con acciones CRUD (mat-table)
│   │   │   └── news-dialog/        # Modal emergente para crear/editar noticias (mat-dialog)
│   │   ├── guards/
│   │   │   └── auth.guard.ts       # Protección de la ruta /admin
│   │   ├── services/
│   │   │   ├── new.service.ts      # Peticiones HTTP a noticias
│   │   │   ├── category.service.ts # Peticiones HTTP a categorías
│   │   │   └── auth.service.ts     # Manejo de sesión y tokens JWT
│   │   ├── interfaces/
│   │   │   └── interfaces.ts       # Tipado TypeScript (New, Category, Auth)
│   │   ├── app.routes.ts           # Definición de rutas del sistema
│   │   └── app.config.ts           # Configuración de HttpClient y Animaciones
├── iniciar-proyecto.bat            # Lanzador automático con 1 solo clic
├── Documentacion-Proyecto-WebNews.docx # Documentación formal en Word
└── README.md                       # Este resumen técnico
```

---

## 🚀 ¿Cómo Ejecutar el Proyecto?

### Opción 1: Un solo clic (Recomendado)
Haz doble clic en el archivo `iniciar-proyecto.bat`. Esto abrirá automáticamente:
1. El servidor API en `http://localhost:3000`
2. La aplicación web en `http://localhost:4200`

### Opción 2: Manualmente desde la terminal
**Paso 1: Iniciar la API REST**
```bash
cd backend-api
node server.js
```

**Paso 2: Iniciar Angular en otra terminal**
```bash
cd webnews-frontend
npm start
```

---

## 🔑 Credenciales de Acceso Administrador
* **Correo:** `admin@webnews.com`
* **Contraseña:** `admin123`

---

## 📁 Archivos Entregables
* Código fuente completo del Front-End y Back-End.
* `iniciar-proyecto.bat`: Lanzador en Windows.
* `Documentacion-Proyecto-WebNews.docx`: Documento formal en formato Word.
* `README.md`: Manual técnico del proyecto.
