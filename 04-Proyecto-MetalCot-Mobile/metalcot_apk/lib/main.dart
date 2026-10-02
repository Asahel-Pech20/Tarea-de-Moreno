import 'package:flutter/material.dart';

void main() {
  runApp(const CotyFTApp());
}

class CotyFTApp extends StatelessWidget {
  const CotyFTApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CotyFT',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0F172A),
          primary: const Color(0xFF0F172A),
          secondary: const Color(0xFFF59E0B),
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF0F172A),
          foregroundColor: Colors.white,
          elevation: 0,
        ),
      ),
      home: const MainNavigationScreen(),
    );
  }
}

// Modelos
class CotizacionItem {
  String descripcion;
  double cantidad;
  double precioUnitario;

  CotizacionItem({
    required this.descripcion,
    required this.cantidad,
    required this.precioUnitario,
  });

  double get subtotal => cantidad * precioUnitario;
}

class Cotizacion {
  String id;
  String fecha;
  String clienteNombre;
  String categoria; // aluminio, herreria, carpinteria
  String titulo;
  String estado; // Aprobada, Pendiente, Borrador, Rechazada
  String tiempoEntrega;
  List<CotizacionItem> items;
  double costoManoObra;
  double margenPorc;
  bool aplicaIva;
  String notas;

  Cotizacion({
    required this.id,
    required this.fecha,
    required this.clienteNombre,
    required this.categoria,
    required this.titulo,
    required this.estado,
    required this.tiempoEntrega,
    required this.items,
    required this.costoManoObra,
    required this.margenPorc,
    required this.aplicaIva,
    this.notas = '',
  });

  double get costoMateriales =>
      items.fold(0.0, (sum, it) => sum + it.subtotal);

  double get subtotalBase => costoMateriales + costoManoObra;

  double get utilidadMonto => subtotalBase * (margenPorc / 100);

  double get subtotalConUtilidad => subtotalBase + utilidadMonto;

  double get ivaMonto => aplicaIva ? subtotalConUtilidad * 0.16 : 0.0;

  double get total => subtotalConUtilidad + ivaMonto;
}

class Cliente {
  String nombre;
  String telefono;
  String direccion;
  int proyectos;

  Cliente({
    required this.nombre,
    required this.telefono,
    required this.direccion,
    this.proyectos = 1,
  });
}

class MaterialItem {
  String categoria;
  String nombre;
  String unidad;
  double precio;

  MaterialItem({
    required this.categoria,
    required this.nombre,
    required this.unidad,
    required this.precio,
  });
}

// Pantalla Principal con BottomNavigationBar
class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Cliente> _clientes = [
    Cliente(nombre: "Arq. Roberto Méndez", telefono: "999-555-0142", direccion: "Col. San Antonio #180", proyectos: 4),
    Cliente(nombre: "María Fernanda López", telefono: "999-333-8911", direccion: "Fracc. Las Américas #320", proyectos: 2),
    Cliente(nombre: "Ing. Carlos Dzib", telefono: "999-888-2104", direccion: "Residencial Montecristo #45", proyectos: 3),
  ];

  final List<MaterialItem> _materiales = [
    MaterialItem(categoria: "aluminio", nombre: "Perfil de Aluminio 3\" Blanco (6m)", unidad: "tramo", precio: 485.0),
    MaterialItem(categoria: "aluminio", nombre: "Vidrio Claro 6mm (m²)", unidad: "m²", precio: 320.0),
    MaterialItem(categoria: "herreria", nombre: "PTR Cuadrado 1.5\" Cal 14 (6m)", unidad: "tramo", precio: 395.0),
    MaterialItem(categoria: "herreria", nombre: "Varilla Cuadrada 1/2\" (6m)", unidad: "tramo", precio: 160.0),
    MaterialItem(categoria: "carpinteria", nombre: "Tablón Madera de Pino Tratada (2.5m)", unidad: "pieza", precio: 280.0),
  ];

  late List<Cotizacion> _cotizaciones;

  @override
  void initState() {
    super.initState();
    _cotizaciones = [
      Cotizacion(
        id: "COT-2026-001",
        fecha: "2026-09-28",
        clienteNombre: "Arq. Roberto Méndez",
        categoria: "aluminio",
        titulo: "Cancelería de aluminio y ventanas panorámicas",
        estado: "Aprobada",
        tiempoEntrega: "10 días hábiles",
        costoManoObra: 4500,
        margenPorc: 35,
        aplicaIva: true,
        notas: "Incluye sellado perimetral con silicón de alta durabilidad.",
        items: [
          CotizacionItem(descripcion: "Perfil Aluminio 3\" Blanco (6m)", cantidad: 6, precioUnitario: 485),
          CotizacionItem(descripcion: "Vidrio Claro 6mm (m²)", cantidad: 12, precioUnitario: 320),
        ],
      ),
      Cotizacion(
        id: "COT-2026-002",
        fecha: "2026-09-29",
        clienteNombre: "María Fernanda López",
        categoria: "herreria",
        titulo: "Protector de herrería para portón de acceso",
        estado: "Pendiente",
        tiempoEntrega: "7 días hábiles",
        costoManoObra: 3800,
        margenPorc: 30,
        aplicaIva: false,
        notas: "Anclaje con taquetes expansivos y pintura anticorrosiva.",
        items: [
          CotizacionItem(descripcion: "PTR Cuadrado 1.5\" Cal 14", cantidad: 8, precioUnitario: 395),
          CotizacionItem(descripcion: "Varilla Cuadrada 1/2\"", cantidad: 10, precioUnitario: 160),
        ],
      ),
      Cotizacion(
        id: "COT-2026-003",
        fecha: "2026-09-29",
        clienteNombre: "Ing. Carlos Dzib",
        categoria: "carpinteria",
        titulo: "Mesa rústica de parota para terraza",
        estado: "Borrador",
        tiempoEntrega: "15 días hábiles",
        costoManoObra: 2200,
        margenPorc: 40,
        aplicaIva: true,
        notas: "Acabado en poliuretano semi-mate con patas metálicas en U.",
        items: [
          CotizacionItem(descripcion: "Tablón Madera de Pino Tratada", cantidad: 5, precioUnitario: 280),
        ],
      ),
    ];
  }

  void _agregarCotizacion(Cotizacion nueva) {
    setState(() {
      _cotizaciones.insert(0, nueva);
      _currentIndex = 1; // ir a lista de cotizaciones
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("¡Cotización guardada exitosamente!"),
        backgroundColor: Colors.green,
      ),
    );
  }

  void _agregarCliente(Cliente c) {
    setState(() {
      _clientes.add(c);
    });
  }

  void _agregarMaterial(MaterialItem m) {
    setState(() {
      _materiales.add(m);
    });
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> pages = [
      DashboardPage(
        cotizaciones: _cotizaciones,
        clientes: _clientes,
        onNavigateTab: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
      ),
      CotizacionesPage(
        cotizaciones: _cotizaciones,
        onUpdateEstado: (cot, nuevoEstado) {
          setState(() {
            cot.estado = nuevoEstado;
          });
        },
      ),
      NuevaCotizacionPage(
        clientes: _clientes,
        materiales: _materiales,
        onSave: _agregarCotizacion,
      ),
      ClientesPage(
        clientes: _clientes,
        onAddCliente: _agregarCliente,
      ),
      MaterialesPage(
        materiales: _materiales,
        onAddMaterial: _agregarMaterial,
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            // Logo del Martillo
            Container(
              padding: const EdgeInsets.all(7),
              decoration: BoxDecoration(
                color: const Color(0xFFF59E0B),
                borderRadius: BorderRadius.circular(10),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFFF59E0B).withValues(alpha: 0.35),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: const Icon(
                Icons.hardware, // Icono de martillo
                color: Color(0xFF0F172A),
                size: 20,
              ),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'CotyFT',
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.w900, letterSpacing: 0.3),
                ),
                Text(
                  'Sistema de Cotizaciones',
                  style: TextStyle(fontSize: 10, color: Colors.white70),
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none, color: Color(0xFFF59E0B)),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("No hay notificaciones pendientes")),
              );
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFFD97706),
        unselectedItemColor: const Color(0xFF64748B),
        backgroundColor: Colors.white,
        selectedFontSize: 11,
        unselectedFontSize: 11,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined), label: "Inicio"),
          BottomNavigationBarItem(icon: Icon(Icons.description_outlined), label: "Cotizaciones"),
          BottomNavigationBarItem(icon: Icon(Icons.add_circle, color: Color(0xFFF59E0B), size: 28), label: "Cotizar"),
          BottomNavigationBarItem(icon: Icon(Icons.people_outline), label: "Clientes"),
          BottomNavigationBarItem(icon: Icon(Icons.inventory_2_outlined), label: "Catálogo"),
        ],
      ),
    );
  }
}

// 1. DASHBOARD
class DashboardPage extends StatelessWidget {
  final List<Cotizacion> cotizaciones;
  final List<Cliente> clientes;
  final Function(int) onNavigateTab;

  const DashboardPage({
    super.key,
    required this.cotizaciones,
    required this.clientes,
    required this.onNavigateTab,
  });

  @override
  Widget build(BuildContext context) {
    final int activas = cotizaciones.where((c) => c.estado == "Aprobada" || c.estado == "Pendiente").length;
    final int pendientes = cotizaciones.where((c) => c.estado == "Pendiente").length;
    final double totalFacturado = cotizaciones
        .where((c) => c.estado == "Aprobada")
        .fold(0.0, (sum, c) => sum + c.total);

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Hero Card
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.15),
                blurRadius: 15,
                offset: const Offset(0, 5),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: const Color(0xFFF59E0B).withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: const Text(
                  'PANEL PRINCIPAL',
                  style: TextStyle(
                    color: Color(0xFFF59E0B),
                    fontWeight: FontWeight.bold,
                    fontSize: 10,
                    letterSpacing: 1.2,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              RichText(
                text: const TextSpan(
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                  children: [
                    TextSpan(text: "Bienvenido a "),
                    TextSpan(text: "CotyFT", style: TextStyle(color: Color(0xFFF59E0B))),
                  ],
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Plataforma integral para presupuestos de herrería, cancelería de aluminio y carpintería.',
                style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
              ),
              const SizedBox(height: 14),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () => onNavigateTab(2), // tab cotizar
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFF59E0B),
                    foregroundColor: const Color(0xFF0F172A),
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  icon: const Icon(Icons.add, size: 18, fontWeight: FontWeight.bold),
                  label: const Text(
                    'Nueva Cotización',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // 4 KPIs Grid (Aspect ratio optimizado y sin desbordes)
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
          childAspectRatio: 1.45,
          children: [
            _kpiCard("Cotizaciones Activas", "$activas", Colors.blue, "En curso"),
            _kpiCard("Por Enviar", "$pendientes", Colors.orange, "Pendientes"),
            _kpiCard("Clientes", "${clientes.length}", Colors.teal, "Cartera"),
            _kpiCard("Facturado", "\$${totalFacturado.toStringAsFixed(0)}", Colors.green, "MXN"),
          ],
        ),
        const SizedBox(height: 20),

        // Módulos Figma (6 Cards)
        const Text(
          "MÓDULOS DEL SISTEMA",
          style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: Color(0xFF64748B), letterSpacing: 1.1),
        ),
        const SizedBox(height: 10),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 1.25,
          children: [
            _moduleCard("Nueva Cotización", "Crear presupuestos", Icons.note_add, Colors.blue, () => onNavigateTab(2)),
            _moduleCard("Mis Cotizaciones", "Ver historial", Icons.folder, Colors.indigo, () => onNavigateTab(1)),
            _moduleCard("Clientes", "Contactos y obras", Icons.people, Colors.teal, () => onNavigateTab(3)),
            _moduleCard("Catálogo Materiales", "Precios y perfiles", Icons.construction, Colors.amber[800]!, () => onNavigateTab(4)),
            _moduleCard("Reportes", "Métricas y cierre", Icons.bar_chart, Colors.purple, () => onNavigateTab(1)),
            _moduleCard("Ajustes", "Taller y márgenes", Icons.settings, Colors.blueGrey, () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Ajustes de taller predeterminados")),
              );
            }),
          ],
        ),
        const SizedBox(height: 20),

        // Cotizaciones Recientes
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              "ÚLTIMAS COTIZACIONES",
              style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: Color(0xFF64748B), letterSpacing: 1.1),
            ),
            TextButton(
              onPressed: () => onNavigateTab(1),
              child: const Text("Ver todas", style: TextStyle(fontSize: 12, color: Color(0xFFD97706))),
            ),
          ],
        ),
        ...cotizaciones.take(3).map((c) => _cotizacionListItem(context, c)),
      ],
    );
  }

  // Tarjeta de KPI totalmente blindada contra desbordes de texto
  Widget _kpiCard(String title, String val, Color col, String badge) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(
                    fontSize: 10,
                    color: Color(0xFF64748B),
                    fontWeight: FontWeight.w600,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(width: 4),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1.5),
                decoration: BoxDecoration(
                  color: col.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(5),
                ),
                child: Text(
                  badge,
                  style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: col),
                ),
              ),
            ],
          ),
          Text(
            val,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w900,
              color: Color(0xFF0F172A),
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  Widget _moduleCard(String title, String subtitle, IconData icon, Color col, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: const Color(0xFFE2E8F0)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.02),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          children: [
            Container(
              height: 48,
              decoration: BoxDecoration(
                color: col,
                borderRadius: const BorderRadius.vertical(top: Radius.circular(17)),
              ),
              child: Center(child: Icon(icon, color: Colors.white, size: 24)),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    subtitle,
                    style: const TextStyle(fontSize: 9, color: Color(0xFF64748B)),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _cotizacionListItem(BuildContext context, Cotizacion c) {
    Color badgeColor = Colors.grey;
    if (c.estado == "Aprobada") badgeColor = Colors.green;
    if (c.estado == "Pendiente") badgeColor = Colors.orange;
    if (c.estado == "Rechazada") badgeColor = Colors.red;

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  c.titulo,
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                Text(
                  c.clienteNombre,
                  style: const TextStyle(fontSize: 11, color: Colors.grey),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                "\$${c.total.toStringAsFixed(2)}",
                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w900),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: badgeColor.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  c.estado,
                  style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: badgeColor),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// 2. COTIZACIONES (HISTORIAL)
class CotizacionesPage extends StatelessWidget {
  final List<Cotizacion> cotizaciones;
  final Function(Cotizacion, String) onUpdateEstado;

  const CotizacionesPage({
    super.key,
    required this.cotizaciones,
    required this.onUpdateEstado,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: cotizaciones.length,
      itemBuilder: (context, index) {
        final c = cotizaciones[index];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          elevation: 1,
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(c.id, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey)),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: (c.estado == "Aprobada" ? Colors.green : c.estado == "Pendiente" ? Colors.orange : Colors.grey).withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        c.estado,
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: (c.estado == "Aprobada" ? Colors.green : c.estado == "Pendiente" ? Colors.orange : Colors.grey),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(c.titulo, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                Text("Cliente: ${c.clienteNombre}", style: const TextStyle(fontSize: 12, color: Colors.black54)),
                const Divider(height: 18),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Total: \$${c.total.toStringAsFixed(2)}",
                      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
                    ),
                    PopupMenuButton<String>(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(
                          color: const Color(0xFF0F172A),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Text("Estado ▾", style: TextStyle(color: Colors.white, fontSize: 11)),
                      ),
                      onSelected: (val) => onUpdateEstado(c, val),
                      itemBuilder: (context) => [
                        const PopupMenuItem(value: "Pendiente", child: Text("Pendiente")),
                        const PopupMenuItem(value: "Aprobada", child: Text("Aprobada")),
                        const PopupMenuItem(value: "Borrador", child: Text("Borrador")),
                        const PopupMenuItem(value: "Rechazada", child: Text("Rechazada")),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

// 3. NUEVA COTIZACIÓN
class NuevaCotizacionPage extends StatefulWidget {
  final List<Cliente> clientes;
  final List<MaterialItem> materiales;
  final Function(Cotizacion) onSave;

  const NuevaCotizacionPage({
    super.key,
    required this.clientes,
    required this.materiales,
    required this.onSave,
  });

  @override
  State<NuevaCotizacionPage> createState() => _NuevaCotizacionPageState();
}

class _NuevaCotizacionPageState extends State<NuevaCotizacionPage> {
  final _formKey = GlobalKey<FormState>();
  String _clienteNombre = '';
  String _categoria = 'aluminio';
  String _titulo = '';
  double _manoObra = 1500;
  double _margen = 35;
  bool _aplicaIva = true;
  final List<CotizacionItem> _items = [];

  @override
  void initState() {
    super.initState();
    if (widget.materiales.isNotEmpty) {
      _items.add(CotizacionItem(
        descripcion: widget.materiales.first.nombre,
        cantidad: 1,
        precioUnitario: widget.materiales.first.precio,
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    double matSubtotal = _items.fold(0.0, (sum, i) => sum + i.subtotal);
    double base = matSubtotal + _manoObra;
    double utilidad = base * (_margen / 100);
    double sub = base + utilidad;
    double iva = _aplicaIva ? sub * 0.16 : 0;
    double total = sub + iva;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Crear Presupuesto", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),

            // Cliente
            DropdownButtonFormField<String>(
              decoration: const InputDecoration(labelText: "Seleccionar Cliente", border: OutlineInputBorder()),
              items: widget.clientes.map((c) => DropdownMenuItem(value: c.nombre, child: Text(c.nombre))).toList(),
              onChanged: (val) => setState(() => _clienteNombre = val ?? ''),
              validator: (v) => v == null || v.isEmpty ? 'Selecciona un cliente' : null,
            ),
            const SizedBox(height: 12),

            // Categoría
            DropdownButtonFormField<String>(
              initialValue: _categoria,
              decoration: const InputDecoration(labelText: "Especialidad", border: OutlineInputBorder()),
              items: const [
                DropdownMenuItem(value: "aluminio", child: Text("🪟 Cancelería / Aluminio")),
                DropdownMenuItem(value: "herreria", child: Text("🚪 Herrería / Metal")),
                DropdownMenuItem(value: "carpinteria", child: Text("🪵 Carpintería")),
              ],
              onChanged: (val) => setState(() => _categoria = val ?? 'aluminio'),
            ),
            const SizedBox(height: 12),

            // Título
            TextFormField(
              decoration: const InputDecoration(labelText: "Descripción del Proyecto", border: OutlineInputBorder()),
              onChanged: (val) => _titulo = val,
              validator: (v) => v == null || v.isEmpty ? 'Ingresa la descripción' : null,
            ),
            const SizedBox(height: 16),

            // Materiales
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text("Materiales e Insumos", style: TextStyle(fontWeight: FontWeight.bold)),
                TextButton(
                  onPressed: () {
                    setState(() {
                      _items.add(CotizacionItem(
                        descripcion: widget.materiales.first.nombre,
                        cantidad: 1,
                        precioUnitario: widget.materiales.first.precio,
                      ));
                    });
                  },
                  child: const Text("+ Agregar"),
                ),
              ],
            ),
            ..._items.map((item) {
              return Card(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: Text(item.descripcion, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                      ),
                      SizedBox(
                        width: 50,
                        child: TextFormField(
                          initialValue: "${item.cantidad.toInt()}",
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(labelText: "Cant"),
                          onChanged: (v) => setState(() => item.cantidad = double.tryParse(v) ?? 1),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text("\$${item.subtotal.toStringAsFixed(0)}", style: const TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              );
            }),
            const SizedBox(height: 16),

            // Mano de obra y márgenes
            Row(
              children: [
                Expanded(
                  child: TextFormField(
                    initialValue: "$_manoObra",
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(labelText: "Mano de Obra (\$)", border: OutlineInputBorder()),
                    onChanged: (v) => setState(() => _manoObra = double.tryParse(v) ?? 0),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: TextFormField(
                    initialValue: "$_margen",
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(labelText: "Margen (%)", border: OutlineInputBorder()),
                    onChanged: (v) => setState(() => _margen = double.tryParse(v) ?? 30),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            SwitchListTile(
              title: const Text("Aplicar IVA (16%)", style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
              value: _aplicaIva,
              onChanged: (v) => setState(() => _aplicaIva = v),
            ),
            const SizedBox(height: 12),

            // Resumen Total
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text("TOTAL A COTIZAR:", style: TextStyle(color: Colors.white70, fontWeight: FontWeight.bold)),
                  Text(
                    "\$${total.toStringAsFixed(2)}",
                    style: const TextStyle(color: Color(0xFFF59E0B), fontSize: 20, fontWeight: FontWeight.w900),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFF59E0B),
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    final nueva = Cotizacion(
                      id: "COT-${DateTime.now().year}-${DateTime.now().millisecond}",
                      fecha: DateTime.now().toString().split(' ')[0],
                      clienteNombre: _clienteNombre,
                      categoria: _categoria,
                      titulo: _titulo,
                      estado: "Pendiente",
                      tiempoEntrega: "7 días hábiles",
                      items: _items,
                      costoManoObra: _manoObra,
                      margenPorc: _margen,
                      aplicaIva: _aplicaIva,
                    );
                    widget.onSave(nueva);
                  }
                },
                child: const Text("Guardar Cotización", style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// 4. CLIENTES
class ClientesPage extends StatelessWidget {
  final List<Cliente> clientes;
  final Function(Cliente) onAddCliente;

  const ClientesPage({
    super.key,
    required this.clientes,
    required this.onAddCliente,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: clientes.length,
        itemBuilder: (context, i) {
          final c = clientes[i];
          return Card(
            margin: const EdgeInsets.only(bottom: 10),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: const Color(0xFF0F172A),
                child: Text(c.nombre[0], style: const TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold)),
              ),
              title: Text(c.nombre, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              subtitle: Text("${c.telefono}\n${c.direccion}", style: const TextStyle(fontSize: 11)),
              trailing: const Icon(Icons.phone, color: Colors.green, size: 20),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
        child: const Icon(Icons.add),
        onPressed: () {
          _mostrarDialogoNuevoCliente(context);
        },
      ),
    );
  }

  void _mostrarDialogoNuevoCliente(BuildContext context) {
    String nombre = '';
    String tel = '';
    String dir = '';

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text("Nuevo Cliente", style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(decoration: const InputDecoration(labelText: "Nombre"), onChanged: (v) => nombre = v),
            TextField(decoration: const InputDecoration(labelText: "Teléfono"), onChanged: (v) => tel = v),
            TextField(decoration: const InputDecoration(labelText: "Dirección"), onChanged: (v) => dir = v),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text("Cancelar")),
          ElevatedButton(
            onPressed: () {
              if (nombre.isNotEmpty) {
                onAddCliente(Cliente(nombre: nombre, telefono: tel, direccion: dir));
                Navigator.pop(ctx);
              }
            },
            child: const Text("Guardar"),
          ),
        ],
      ),
    );
  }
}

// 5. MATERIALES
class MaterialesPage extends StatelessWidget {
  final List<MaterialItem> materiales;
  final Function(MaterialItem) onAddMaterial;

  const MaterialesPage({
    super.key,
    required this.materiales,
    required this.onAddMaterial,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: materiales.length,
        itemBuilder: (context, i) {
          final m = materiales[i];
          return Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              title: Text(m.nombre, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
              subtitle: Text("Categoría: ${m.categoria} • ${m.unidad}"),
              trailing: Text("\$${m.precio.toStringAsFixed(2)}", style: const TextStyle(fontWeight: FontWeight.bold)),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFFF59E0B),
        foregroundColor: Colors.black,
        child: const Icon(Icons.add),
        onPressed: () {
          _mostrarDialogoNuevoMaterial(context);
        },
      ),
    );
  }

  void _mostrarDialogoNuevoMaterial(BuildContext context) {
    String nombre = '';
    String cat = 'aluminio';
    String unidad = 'tramo';
    double precio = 0;

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text("Nuevo Material", style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(decoration: const InputDecoration(labelText: "Nombre"), onChanged: (v) => nombre = v),
            TextField(decoration: const InputDecoration(labelText: "Unidad (tramo, m2, etc)"), onChanged: (v) => unidad = v),
            TextField(
              decoration: const InputDecoration(labelText: "Precio (\$)"),
              keyboardType: TextInputType.number,
              onChanged: (v) => precio = double.tryParse(v) ?? 0,
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text("Cancelar")),
          ElevatedButton(
            onPressed: () {
              if (nombre.isNotEmpty && precio > 0) {
                onAddMaterial(MaterialItem(categoria: cat, nombre: nombre, unidad: unidad, precio: precio));
                Navigator.pop(ctx);
              }
            },
            child: const Text("Guardar"),
          ),
        ],
      ),
    );
  }
}
