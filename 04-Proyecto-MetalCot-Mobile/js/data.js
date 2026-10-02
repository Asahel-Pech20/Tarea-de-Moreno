/**
 * MetalCot Pro - Datos Iniciales y Manejador de Almacenamiento (LocalStorage)
 * Versión Alpha
 */

const DEFAULT_DATA = {
  config: {
    nombreTaller: "Herrería y Aluminio 'El Maestro'",
    propietario: "Santiago P.",
    telefono: "999-123-4567",
    moneda: "MXN",
    simboloMoneda: "$",
    margenDefecto: 35, // %
    ivaDefecto: 16 // %
  },
  
  kpis: {
    cotizacionesActivas: 8,
    pendientesEnvio: 3,
    clientesActivos: 14,
    totalFacturado: 142500
  },

  categorias: [
    { id: "aluminio", nombre: "Cancelería y Aluminio", icono: "🪟", color: "from-sky-500 to-blue-600" },
    { id: "herreria", nombre: "Herrería y Metalmecánica", icono: "🚪", color: "from-amber-500 to-orange-600" },
    { id: "carpinteria", nombre: "Carpintería y Madera", icono: "🪵", color: "from-emerald-500 to-teal-700" }
  ],

  materiales: [
    { id: "mat-1", categoria: "aluminio", nombre: "Perfil de Aluminio Línea 3\" Blanco (Tramo 6m)", unidad: "tramo", precio: 485.00 },
    { id: "mat-2", categoria: "aluminio", nombre: "Vidrio Claro 6mm (m²)", unidad: "m²", precio: 320.00 },
    { id: "mat-3", categoria: "aluminio", nombre: "Carretillas y Herrajes para Ventana Corrediza", unidad: "juego", precio: 145.00 },
    { id: "mat-4", categoria: "herreria", nombre: "Perfil Tubular Cuadrado (PTR) 1.5\" Cal. 14 (6m)", unidad: "tramo", precio: 395.00 },
    { id: "mat-5", categoria: "herreria", nombre: "Varilla Cuadrada de 1/2\" (6m)", unidad: "tramo", precio: 160.00 },
    { id: "mat-6", categoria: "herreria", nombre: "Chapa de Seguridad para Portón Residencial", unidad: "pza", precio: 580.00 },
    { id: "mat-7", categoria: "herreria", nombre: "Pintura Anticorrosiva Automotriz Negro Mate (L)", unidad: "litro", precio: 220.00 },
    { id: "mat-8", categoria: "carpinteria", nombre: "Tablón de Madera de Pino Tratada (2.5m)", unidad: "pieza", precio: 280.00 },
    { id: "mat-9", categoria: "carpinteria", nombre: "Barniz Poliuretano Alto Brillo (L)", unidad: "litro", precio: 195.00 }
  ],

  clientes: [
    {
      id: "cli-1",
      nombre: "Arq. Roberto Méndez",
      telefono: "999-555-0142",
      correo: "roberto.mendez@constructora.com",
      direccion: "Col. San Antonio, Calle 42 #180",
      proyectosCount: 4,
      totalGastado: 64200
    },
    {
      id: "cli-2",
      nombre: "María Fernanda López",
      telefono: "999-333-8911",
      correo: "mafer.lopez@gmail.com",
      direccion: "Fracc. Las Américas, Av. 53 #320",
      proyectosCount: 2,
      totalGastado: 28500
    },
    {
      id: "cli-3",
      nombre: "Ing. Carlos Dzib",
      telefono: "999-888-2104",
      correo: "carlos.dzib@desarrollos.mx",
      direccion: "Residencial Montecristo #45",
      proyectosCount: 3,
      totalGastado: 49800
    }
  ],

  cotizaciones: [
    {
      id: "COT-2026-001",
      folio: 101,
      fecha: "2026-09-28",
      clienteId: "cli-1",
      clienteNombre: "Arq. Roberto Méndez",
      categoria: "aluminio",
      titulo: "Cancelería de aluminio y ventanas panorámicas",
      estado: "Aprobada", // 'Borrador', 'Pendiente', 'Aprobada', 'Rechazada'
      tiempoEntrega: "10 días hábiles",
      items: [
        { materialId: "mat-1", descripcion: "Perfil Aluminio 3\" Blanco", cantidad: 6, precioUnitario: 485, subtotal: 2910 },
        { materialId: "mat-2", descripcion: "Vidrio Claro 6mm", cantidad: 12, precioUnitario: 320, subtotal: 3840 },
        { materialId: "mat-3", descripcion: "Juego de carretillas y jaladeras", cantidad: 3, precioUnitario: 145, subtotal: 435 }
      ],
      costoMateriales: 7185,
      costoManoObra: 4500,
      margenUtilidadPorc: 35,
      utilidadMonto: 4089.75,
      subtotal: 15774.75,
      aplicaIva: true,
      ivaPorc: 16,
      ivaMonto: 2523.96,
      total: 18298.71,
      notas: "Incluye sellado con silicón perimetral e instalación en obra."
    },
    {
      id: "COT-2026-002",
      folio: 102,
      fecha: "2026-09-29",
      clienteId: "cli-2",
      clienteNombre: "María Fernanda López",
      categoria: "herreria",
      titulo: "Protector de herrería para portón de acceso y puerta",
      estado: "Pendiente",
      tiempoEntrega: "7 días hábiles",
      items: [
        { materialId: "mat-4", descripcion: "PTR Cuadrado 1.5\" Cal 14", cantidad: 8, precioUnitario: 395, subtotal: 3160 },
        { materialId: "mat-5", descripcion: "Varilla cuadrada 1/2\"", cantidad: 10, precioUnitario: 160, subtotal: 1600 },
        { materialId: "mat-6", descripcion: "Chapa de seguridad", cantidad: 1, precioUnitario: 580, subtotal: 580 },
        { materialId: "mat-7", descripcion: "Pintura anticorrosiva negro mate", cantidad: 3, precioUnitario: 220, subtotal: 660 }
      ],
      costoMateriales: 6000,
      costoManoObra: 3800,
      margenUtilidadPorc: 30,
      utilidadMonto: 2940,
      subtotal: 12740,
      aplicaIva: false,
      ivaPorc: 0,
      ivaMonto: 0,
      total: 12740,
      notas: "Incluye anclaje con taquetes expansivos y pintura anticorrosiva de fondo."
    },
    {
      id: "COT-2026-003",
      folio: 103,
      fecha: "2026-09-29",
      clienteId: "cli-3",
      clienteNombre: "Ing. Carlos Dzib",
      categoria: "carpinteria",
      titulo: "Mesa rústica de parota para terraza",
      estado: "Borrador",
      tiempoEntrega: "15 días hábiles",
      items: [
        { materialId: "mat-8", descripcion: "Tablón de madera tratada", cantidad: 5, precioUnitario: 280, subtotal: 1400 },
        { materialId: "mat-9", descripcion: "Barniz poliuretano brillo", cantidad: 2, precioUnitario: 195, subtotal: 390 }
      ],
      costoMateriales: 1790,
      costoManoObra: 2200,
      margenUtilidadPorc: 40,
      utilidadMonto: 1596,
      subtotal: 5586,
      aplicaIva: true,
      ivaPorc: 16,
      ivaMonto: 893.76,
      total: 6479.76,
      notas: "Diseño con cantos vivos naturales y patas metálicas en forma de U."
    }
  ]
};

class MetalCotStorage {
  constructor() {
    this.STORAGE_KEY = 'metalcot_pro_alpha_data_v1';
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      this.saveAll(DEFAULT_DATA);
    }
  }

  getAll() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : DEFAULT_DATA;
    } catch (e) {
      console.error("Error reading localStorage", e);
      return DEFAULT_DATA;
    }
  }

  saveAll(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Error writing to localStorage", e);
      return false;
    }
  }

  resetDefaults() {
    this.saveAll(DEFAULT_DATA);
    return DEFAULT_DATA;
  }

  // Cotizaciones
  getCotizaciones() {
    return this.getAll().cotizaciones || [];
  }

  getCotizacionById(id) {
    return this.getCotizaciones().find(c => c.id === id);
  }

  saveCotizacion(cot) {
    const data = this.getAll();
    if (!cot.id) {
      const folio = (data.cotizaciones.length > 0 ? Math.max(...data.cotizaciones.map(c => c.folio || 100)) + 1 : 101);
      cot.id = `COT-${new Date().getFullYear()}-${String(folio).padStart(3, '0')}`;
      cot.folio = folio;
      cot.fecha = new Date().toISOString().split('T')[0];
      data.cotizaciones.unshift(cot);
    } else {
      const index = data.cotizaciones.findIndex(c => c.id === cot.id);
      if (index !== -1) {
        data.cotizaciones[index] = cot;
      } else {
        data.cotizaciones.unshift(cot);
      }
    }
    this.saveAll(data);
    return cot;
  }

  updateEstadoCotizacion(id, nuevoEstado) {
    const data = this.getAll();
    const cot = data.cotizaciones.find(c => c.id === id);
    if (cot) {
      cot.estado = nuevoEstado;
      this.saveAll(data);
      return cot;
    }
    return null;
  }

  deleteCotizacion(id) {
    const data = this.getAll();
    data.cotizaciones = data.cotizaciones.filter(c => c.id !== id);
    this.saveAll(data);
    return true;
  }

  // Clientes
  getClientes() {
    return this.getAll().clientes || [];
  }

  saveCliente(cliente) {
    const data = this.getAll();
    if (!cliente.id) {
      cliente.id = 'cli-' + Date.now();
      cliente.proyectosCount = 0;
      cliente.totalGastado = 0;
      data.clientes.unshift(cliente);
    } else {
      const idx = data.clientes.findIndex(c => c.id === cliente.id);
      if (idx !== -1) {
        data.clientes[idx] = { ...data.clientes[idx], ...cliente };
      } else {
        data.clientes.unshift(cliente);
      }
    }
    this.saveAll(data);
    return cliente;
  }

  // Materiales
  getMateriales() {
    return this.getAll().materiales || [];
  }

  saveMaterial(mat) {
    const data = this.getAll();
    if (!mat.id) {
      mat.id = 'mat-' + Date.now();
      data.materiales.push(mat);
    } else {
      const idx = data.materiales.findIndex(m => m.id === mat.id);
      if (idx !== -1) {
        data.materiales[idx] = mat;
      } else {
        data.materiales.push(mat);
      }
    }
    this.saveAll(data);
    return mat;
  }

  // Configuración
  getConfig() {
    return this.getAll().config || DEFAULT_DATA.config;
  }

  saveConfig(newConfig) {
    const data = this.getAll();
    data.config = { ...data.config, ...newConfig };
    this.saveAll(data);
    return data.config;
  }
}

window.storage = new MetalCotStorage();
