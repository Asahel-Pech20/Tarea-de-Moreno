# 📱 MetalCot Pro - Versión Móvil Alpha (Sistema de Cotizaciones)

Aplicación móvil/PWA desarrollada con base en el prototipo interactivo de Figma de **MetalCot Pro**. Diseñada con arquitectura **Mobile-First** para talleres de oficios (**aluminio/cancelería, herrería/metalmecánica y carpintería**).

---

## 🚀 Cómo Ejecutar e Instalar la Aplicación

### Opción 1: Instalar en Celular Android (.APK Nativo) 📱 ⭐
Pasa el archivo **[`MetalCot-Pro.apk`](file:///c:/Tareas%20del%204-C/Aplicaciones%20web/04-Proyecto-MetalCot-Mobile/MetalCot-Pro.apk)** a tu teléfono Android:
1. Envíatelo a tu celular por WhatsApp Web, Telegram, cable USB o Google Drive.
2. En tu teléfono, abre el archivo `MetalCot-Pro.apk`.
3. Si el sistema te lo pide, activa el permiso *"Permitir instalar aplicaciones de orígenes desconocidos"*.
4. Pulsa **Instalar** y ¡listo! Tendrás la app de MetalCot Pro instalada como aplicación nativa en tu teléfono.

### Opción 2: Ejecutable de Windows para PC (.EXE) 🖥️
Haz doble clic sobre el archivo **[`MetalCot-Pro.exe`](file:///c:/Tareas%20del%204-C/Aplicaciones%20web/04-Proyecto-MetalCot-Mobile/MetalCot-Pro.exe)**.
* Se abrirá automáticamente como una aplicación de escritorio independiente con ventana dedicada (sin barras de navegador ni pestañas), con el tamaño exacto de un dispositivo móvil.

### Opción 3: Versión Web / PWA
* Ejecuta **`iniciar-app.bat`** o abre **`index.html`** directamente en tu navegador.
* Si abres desde tu celular `http://192.168.1.98:3000` (conectado a la misma red Wi-Fi), puedes pulsar en el menú del navegador: *"Instalar aplicación"* o *"Agregar a pantalla principal"*.

---

## 🎨 Características Implementadas (Versión Alpha)

### 1. Panel Principal (Dashboard - Copia fiel del Figma)
* **Barra superior:** Logotipo `MC` en naranja y azul oscuro, notificaciones y perfil de usuario.
* **Banner Hero:** Bienvenida con diseño azul marino oscuro, descripción y botón directo **`+ Nueva Cotización`**.
* **4 KPIs en Tiempo Real:** 
  * Cotizaciones Activas
  * Pendientes de Envío
  * Total de Clientes en Cartera
  * Facturado Total Estimado
* **Matriz de los 6 Módulos del Figma:**
  1. *Nueva Cotización* (Azul)
  2. *Mis Cotizaciones* (Pizarra)
  3. *Clientes* (Verde Esmeralda)
  4. *Catálogo de Materiales* (Naranja)
  5. *Reportes* (Morado)
  6. *Configuración* (Gris)
* **Lista de Cotizaciones Recientes:** Accesos directos con estados en badges de color.

### 2. Cotizador Interactivo (Nueva Cotización)
* Selección de clientes existentes o registro de cliente rápido.
* Selección de oficio: **Aluminio**, **Herrería** o **Carpintería**.
* Agregar y quitar dinámicamente renglones de materiales vinculados al catálogo con cálculo automático de importe ($Cantidad \times Precio$).
* Cálculo de mano de obra, porcentaje de utilidad (%) y desglose de IVA (16%).
* Resumen financiero en vivo que se actualiza en tiempo real al tipear.
* Guardado inmediato en `localStorage`.

### 3. Historial y Estados (Mis Cotizaciones)
* Buscador por folio, cliente o descripción.
* Filtros por píldoras: *Todas, Pendientes, Aprobadas, Borrador, Rechazadas*.
* Modal de detalle completo con:
  * Cambio de estado rápido (*Borrador*, *Pendiente*, *Aprobada*, *Rechazada*).
  * Envío directo por **WhatsApp** con texto pre-formateado.
  * Botón para **Imprimir / Guardar en PDF** con hoja membretada.
  * Opción de eliminar cotización.

### 4. Directorio de Clientes
* Registro de nuevos clientes (nombre, teléfono, correo, dirección).
* Botones de llamada rápida y WhatsApp directo.

### 5. Catálogo de Materiales y Precios
* Precios base por tramo de 6m, m², litro o pieza.
* Modal para agregar nuevos perfiles o accesorios al catálogo.

### 6. Reportes y Configuración del Taller
* Tasa de aprobación porcentual y gráficas de proporción.
* Personalización de nombre de taller, teléfono, IVA y margen por defecto.
* Botón para restablecer los datos de demostración si se desea.

---

## 📲 Experiencia Móvil
* **En Computadora:** Dispone de un marco estilizado de teléfono con barra de estado y bocina, y un botón en la esquina superior para alternar a pantalla completa si se desea.
* **En Celular / PWA:** Ocupa el 100% de la pantalla, con barra inferior fija tipo app nativa y soporte para "Añadir a la pantalla de inicio".
