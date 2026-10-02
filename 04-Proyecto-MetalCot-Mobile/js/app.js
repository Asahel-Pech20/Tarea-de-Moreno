/**
 * MetalCot Pro - Lógica de Interfaz y Controladores de Vistas (Mobile Alpha)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de la aplicación
  App.init();
});

const App = {
  activeView: 'dashboard',
  currentCotizacionEdit: null,
  activeCotizacionItems: [],

  init() {
    this.bindEvents();
    this.renderKPIs();
    this.renderCotizacionesRecientes();
    this.renderCotizacionesList();
    this.renderClientesList();
    this.renderMaterialesList();
    this.renderReportes();
    this.loadWorkshopConfig();
    this.updateClock();
    setInterval(() => this.updateClock(), 60000);
  },

  updateClock() {
    const clockEl = document.getElementById('phone-clock');
    if (clockEl) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      clockEl.textContent = `${hours}:${minutes}`;
    }
  },

  bindEvents() {
    // Navegación Inferior
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const viewName = btn.dataset.view;
        if (viewName) {
          this.navigateTo(viewName);
        }
      });
    });

    // Módulos del Figma en el Dashboard
    document.querySelectorAll('[data-module]').forEach(card => {
      card.addEventListener('click', () => {
        const mod = card.dataset.module;
        this.navigateTo(mod);
      });
    });

    // Toggle de Modo Escritorio / Pantalla Completa
    const toggleFrameBtn = document.getElementById('btn-toggle-frame');
    if (toggleFrameBtn) {
      toggleFrameBtn.addEventListener('click', () => {
        document.body.classList.toggle('fullscreen-mode');
        const isFull = document.body.classList.contains('fullscreen-mode');
        toggleFrameBtn.textContent = isFull ? '📱 Ver con Marco Móvil' : '🖥️ Pantalla Completa';
      });
    }

    // Formulario de Nueva Cotización
    const addMaterialBtn = document.getElementById('btn-add-item-cotizacion');
    if (addMaterialBtn) {
      addMaterialBtn.addEventListener('click', () => this.addItemToCotizacionForm());
    }

    const formCotizacion = document.getElementById('form-nueva-cotizacion');
    if (formCotizacion) {
      formCotizacion.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveCotizacion();
      });
    }

    // Inputs que recalculan en vivo
    ['input-mano-obra', 'input-margen-porc', 'check-aplica-iva', 'input-iva-porc'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.calculateCotizacionTotals());
        el.addEventListener('change', () => this.calculateCotizacionTotals());
      }
    });

    // Filtros de estado de cotizaciones
    document.querySelectorAll('.filter-cot-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-cot-pill').forEach(p => p.classList.remove('active-filter'));
        pill.classList.add('active-filter');
        this.renderCotizacionesList(pill.dataset.filter);
      });
    });

    // Búsqueda de cotizaciones
    const searchCot = document.getElementById('search-cotizaciones');
    if (searchCot) {
      searchCot.addEventListener('input', (e) => {
        this.renderCotizacionesList(null, e.target.value.toLowerCase());
      });
    }

    // Formulario de Nuevo Cliente
    const formCliente = document.getElementById('form-nuevo-cliente');
    if (formCliente) {
      formCliente.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveCliente();
      });
    }

    // Formulario de Nuevo Material
    const formMaterial = document.getElementById('form-nuevo-material');
    if (formMaterial) {
      formMaterial.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveMaterial();
      });
    }

    // Formulario de Configuración
    const formConfig = document.getElementById('form-configuracion');
    if (formConfig) {
      formConfig.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveConfig();
      });
    }

    // Botón de restablecer datos
    const btnResetData = document.getElementById('btn-reset-demo-data');
    if (btnResetData) {
      btnResetData.addEventListener('click', () => {
        if (confirm('¿Deseas restablecer los datos de demostración iniciales de MetalCot Pro?')) {
          window.storage.resetDefaults();
          this.init();
          this.showToast('Datos de demostración restablecidos con éxito');
        }
      });
    }
  },

  navigateTo(viewId) {
    this.activeView = viewId;
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active-view'));
    
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.add('active-view');
    }

    // Actualizar barra inferior
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.dataset.view === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Scroll arriba
    const mainContent = document.getElementById('main-content-scroll');
    if (mainContent) mainContent.scrollTop = 0;

    // Actualizaciones específicas por vista
    if (viewId === 'dashboard') {
      this.renderKPIs();
      this.renderCotizacionesRecientes();
    } else if (viewId === 'nueva-cotizacion') {
      this.populateClientesSelect();
      if (this.activeCotizacionItems.length === 0) {
        this.addItemToCotizacionForm(); // Iniciar con al menos 1 renglón
      }
      this.calculateCotizacionTotals();
    } else if (viewId === 'cotizaciones') {
      this.renderCotizacionesList();
    } else if (viewId === 'clientes') {
      this.renderClientesList();
    } else if (viewId === 'materiales') {
      this.renderMaterialesList();
    } else if (viewId === 'reportes') {
      this.renderReportes();
    }
  },

  showToast(message, type = 'success') {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `fixed top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xl z-50 transition-all duration-300 ${
      type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
    }`;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  },

  // RENDER: KPIs
  renderKPIs() {
    const cots = window.storage.getCotizaciones();
    const clientes = window.storage.getClientes();
    const config = window.storage.getConfig();

    const activas = cots.filter(c => c.estado === 'Aprobada' || c.estado === 'Pendiente').length;
    const pendientes = cots.filter(c => c.estado === 'Pendiente').length;
    const totalMonto = cots.filter(c => c.estado === 'Aprobada').reduce((sum, c) => sum + (c.total || 0), 0);

    const elActivas = document.getElementById('kpi-activas');
    const elPendientes = document.getElementById('kpi-pendientes');
    const elClientes = document.getElementById('kpi-clientes');
    const elTotal = document.getElementById('kpi-total');

    if (elActivas) elActivas.textContent = activas;
    if (elPendientes) elPendientes.textContent = pendientes;
    if (elClientes) elClientes.textContent = clientes.length;
    if (elTotal) elTotal.textContent = `${config.simboloMoneda}${Math.round(totalMonto).toLocaleString()}`;
  },

  // RENDER: Cotizaciones Recientes (Dashboard)
  renderCotizacionesRecientes() {
    const listContainer = document.getElementById('dashboard-recent-quotes');
    if (!listContainer) return;

    const cots = window.storage.getCotizaciones().slice(0, 3);
    const config = window.storage.getConfig();

    if (cots.length === 0) {
      listContainer.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">No hay cotizaciones aún. Crea tu primera cotización.</p>';
      return;
    }

    listContainer.innerHTML = cots.map(c => `
      <div onclick="App.openCotizacionModal('${c.id}')" class="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-300 transition-colors">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
            c.categoria === 'aluminio' ? 'bg-blue-50 text-blue-600' :
            c.categoria === 'herreria' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
          }">
            ${c.categoria === 'aluminio' ? '🪟' : c.categoria === 'herreria' ? '🚪' : '🪵'}
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-800 line-clamp-1">${c.titulo}</h4>
            <p class="text-[11px] text-slate-500">${c.clienteNombre}</p>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xs font-bold text-slate-900 block">${config.simboloMoneda}${Number(c.total).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold ${this.getEstadoBadgeClass(c.estado)}">${c.estado}</span>
        </div>
      </div>
    `).join('');
  },

  getEstadoBadgeClass(estado) {
    switch (estado) {
      case 'Aprobada': return 'bg-emerald-100 text-emerald-700';
      case 'Pendiente': return 'bg-amber-100 text-amber-700';
      case 'Borrador': return 'bg-slate-100 text-slate-600';
      case 'Rechazada': return 'bg-red-100 text-red-600';
      default: return 'bg-slate-100 text-slate-700';
    }
  },

  // RENDER: Lista Completa de Cotizaciones con Filtro
  renderCotizacionesList(filter = 'Todas', query = '') {
    const container = document.getElementById('list-all-cotizaciones');
    if (!container) return;

    let cots = window.storage.getCotizaciones();
    const config = window.storage.getConfig();

    if (filter && filter !== 'Todas') {
      cots = cots.filter(c => c.estado === filter);
    }

    if (query) {
      cots = cots.filter(c => 
        c.titulo.toLowerCase().includes(query) || 
        c.clienteNombre.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query)
      );
    }

    if (cots.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8">
          <div class="text-3xl mb-2">📁</div>
          <p class="text-xs text-slate-500 font-medium">No se encontraron cotizaciones con ese criterio.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = cots.map(c => `
      <div class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div class="flex items-start justify-between mb-2">
          <div>
            <span class="text-[10px] font-bold text-slate-400 tracking-wider uppercase">${c.id} • ${c.fecha}</span>
            <h3 class="text-sm font-bold text-slate-800 line-clamp-1 mt-0.5">${c.titulo}</h3>
            <p class="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <span>👤</span> ${c.clienteNombre}
            </p>
          </div>
          <span class="text-[11px] px-2.5 py-1 rounded-full font-bold ${this.getEstadoBadgeClass(c.estado)}">${c.estado}</span>
        </div>

        <div class="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
          <div>
            <span class="text-[10px] text-slate-400 block uppercase">Total Presupuestado</span>
            <span class="text-base font-extrabold text-slate-900">${config.simboloMoneda}${Number(c.total).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="flex gap-2">
            <button onclick="App.openCotizacionModal('${c.id}')" class="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition">
              Ver Detalle
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  // FORMULARIO: Nueva Cotización
  populateClientesSelect() {
    const select = document.getElementById('select-cotizacion-cliente');
    if (!select) return;

    const clientes = window.storage.getClientes();
    select.innerHTML = `
      <option value="">-- Seleccionar cliente registrado --</option>
      ${clientes.map(cli => `<option value="${cli.id}">${cli.nombre} (${cli.telefono})</option>`).join('')}
    `;
  },

  addItemToCotizacionForm(materialId = '', cantidad = 1) {
    const container = document.getElementById('cotizacion-items-container');
    if (!container) return;

    const materiales = window.storage.getMateriales();
    const itemId = 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cot-item-row p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
      <div class="flex items-center justify-between">
        <label class="text-[11px] font-bold text-slate-700">Material o Concepto</label>
        <button type="button" onclick="App.removeItemFromCotizacion('${itemId}')" class="text-xs text-red-500 hover:text-red-700 font-bold">✕ Quitar</button>
      </div>
      <select class="item-mat-select w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium" onchange="App.onItemMaterialChange('${itemId}')">
        <option value="">-- Selecciona material del catálogo --</option>
        ${materiales.map(m => `
          <option value="${m.id}" data-precio="${m.precio}" data-unidad="${m.unidad}" ${m.id === materialId ? 'selected' : ''}>
            ${m.nombre} - $${m.precio} / ${m.unidad}
          </option>
        `).join('')}
      </select>
      <div class="grid grid-cols-3 gap-2">
        <div>
          <label class="text-[10px] text-slate-500 block">Cantidad</label>
          <input type="number" min="1" step="any" value="${cantidad}" class="item-qty-input w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold" oninput="App.calculateCotizacionTotals()" />
        </div>
        <div>
          <label class="text-[10px] text-slate-500 block">Precio Unit.</label>
          <input type="number" step="any" value="0" class="item-price-input w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold" oninput="App.calculateCotizacionTotals()" />
        </div>
        <div>
          <label class="text-[10px] text-slate-500 block">Importe</label>
          <input type="text" readonly value="$0.00" class="item-subtotal-display w-full bg-slate-100 border border-slate-200 rounded-lg p-1.5 text-xs font-bold text-slate-800" />
        </div>
      </div>
    `;

    container.appendChild(itemDiv);
    this.activeCotizacionItems.push(itemId);
    this.onItemMaterialChange(itemId);
  },

  removeItemFromCotizacion(itemId) {
    const el = document.getElementById(itemId);
    if (el) el.remove();
    this.activeCotizacionItems = this.activeCotizacionItems.filter(id => id !== itemId);
    this.calculateCotizacionTotals();
  },

  onItemMaterialChange(itemId) {
    const row = document.getElementById(itemId);
    if (!row) return;

    const select = row.querySelector('.item-mat-select');
    const priceInput = row.querySelector('.item-price-input');
    const selectedOption = select.options[select.selectedIndex];

    if (selectedOption && selectedOption.dataset.precio) {
      priceInput.value = selectedOption.dataset.precio;
    }
    this.calculateCotizacionTotals();
  },

  calculateCotizacionTotals() {
    let costoMateriales = 0;

    document.querySelectorAll('.cot-item-row').forEach(row => {
      const qty = parseFloat(row.querySelector('.item-qty-input').value) || 0;
      const price = parseFloat(row.querySelector('.item-price-input').value) || 0;
      const sub = qty * price;
      row.querySelector('.item-subtotal-display').value = `$${sub.toFixed(2)}`;
      costoMateriales += sub;
    });

    const manoObra = parseFloat(document.getElementById('input-mano-obra').value) || 0;
    const margenPorc = parseFloat(document.getElementById('input-margen-porc').value) || 0;
    const aplicaIva = document.getElementById('check-aplica-iva').checked;
    const ivaPorc = aplicaIva ? (parseFloat(document.getElementById('input-iva-porc').value) || 16) : 0;

    const costoBase = costoMateriales + manoObra;
    const utilidadMonto = costoBase * (margenPorc / 100);
    const subtotal = costoBase + utilidadMonto;
    const ivaMonto = subtotal * (ivaPorc / 100);
    const total = subtotal + ivaMonto;

    document.getElementById('display-costo-materiales').textContent = `$${costoMateriales.toFixed(2)}`;
    document.getElementById('display-costo-mano-obra').textContent = `$${manoObra.toFixed(2)}`;
    document.getElementById('display-utilidad-monto').textContent = `$${utilidadMonto.toFixed(2)}`;
    document.getElementById('display-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('display-iva-monto').textContent = `$${ivaMonto.toFixed(2)}`;
    document.getElementById('display-total-final').textContent = `$${total.toFixed(2)}`;

    return { costoMateriales, manoObra, margenPorc, utilidadMonto, subtotal, aplicaIva, ivaPorc, ivaMonto, total };
  },

  handleSaveCotizacion() {
    const clienteId = document.getElementById('select-cotizacion-cliente').value;
    const clienteNombreCustom = document.getElementById('input-cliente-rapido').value.trim();

    let clienteNombre = '';
    if (clienteId) {
      const cli = window.storage.getClientes().find(c => c.id === clienteId);
      clienteNombre = cli ? cli.nombre : 'Cliente General';
    } else if (clienteNombreCustom) {
      clienteNombre = clienteNombreCustom;
      // Registrar cliente automático
      window.storage.saveCliente({
        nombre: clienteNombreCustom,
        telefono: 'N/A',
        correo: 'N/A',
        direccion: 'N/A'
      });
    } else {
      alert('Por favor selecciona o escribe el nombre del cliente');
      return;
    }

    const titulo = document.getElementById('input-titulo-proyecto').value.trim();
    if (!titulo) {
      alert('Ingresa el título o descripción del proyecto');
      return;
    }

    const items = [];
    document.querySelectorAll('.cot-item-row').forEach(row => {
      const select = row.querySelector('.item-mat-select');
      const selectedOption = select.options[select.selectedIndex];
      const desc = selectedOption.value ? selectedOption.text.split(' - ')[0] : 'Concepto Personalizado';
      const qty = parseFloat(row.querySelector('.item-qty-input').value) || 1;
      const price = parseFloat(row.querySelector('.item-price-input').value) || 0;
      items.push({
        materialId: select.value,
        descripcion: desc,
        cantidad: qty,
        precioUnitario: price,
        subtotal: qty * price
      });
    });

    const totals = this.calculateCotizacionTotals();

    const cotizacion = {
      clienteId: clienteId || 'cli-rapido',
      clienteNombre: clienteNombre,
      categoria: document.getElementById('select-categoria-trabajo').value,
      titulo: titulo,
      estado: document.getElementById('select-estado-inicial').value,
      tiempoEntrega: document.getElementById('input-tiempo-entrega').value || '7 días hábiles',
      items: items,
      costoMateriales: totals.costoMateriales,
      costoManoObra: totals.manoObra,
      margenUtilidadPorc: totals.margenPorc,
      utilidadMonto: totals.utilidadMonto,
      subtotal: totals.subtotal,
      aplicaIva: totals.aplicaIva,
      ivaPorc: totals.ivaPorc,
      ivaMonto: totals.ivaMonto,
      total: totals.total,
      notas: document.getElementById('input-notas-cotizacion').value.trim()
    };

    window.storage.saveCotizacion(cotizacion);
    this.showToast('¡Cotización guardada exitosamente!');
    this.resetCotizacionForm();
    this.navigateTo('cotizaciones');
  },

  resetCotizacionForm() {
    document.getElementById('form-nueva-cotizacion').reset();
    document.getElementById('cotizacion-items-container').innerHTML = '';
    this.activeCotizacionItems = [];
    this.calculateCotizacionTotals();
  },

  // MODAL: Detalle de Cotización
  openCotizacionModal(cotId) {
    const cot = window.storage.getCotizacionById(cotId);
    if (!cot) return;

    this.currentCotizacionEdit = cot;
    const modal = document.getElementById('modal-detalle-cotizacion');
    const config = window.storage.getConfig();

    document.getElementById('modal-cot-folio').textContent = cot.id;
    document.getElementById('modal-cot-fecha').textContent = cot.fecha;
    document.getElementById('modal-cot-titulo').textContent = cot.titulo;
    document.getElementById('modal-cot-cliente').textContent = cot.clienteNombre;
    document.getElementById('modal-cot-tiempo').textContent = cot.tiempoEntrega;
    document.getElementById('modal-cot-notas').textContent = cot.notas || 'Sin observaciones adicionales.';

    const estadoBadge = document.getElementById('modal-cot-estado-badge');
    estadoBadge.textContent = cot.estado;
    estadoBadge.className = `text-xs px-2.5 py-1 rounded-full font-bold ${this.getEstadoBadgeClass(cot.estado)}`;

    const selectEstado = document.getElementById('modal-select-cambiar-estado');
    if (selectEstado) selectEstado.value = cot.estado;

    // Tabla de ítems
    const itemsTbody = document.getElementById('modal-cot-items-table');
    itemsTbody.innerHTML = cot.items.map(it => `
      <tr class="border-b border-slate-100 text-xs">
        <td class="py-2 text-slate-800 font-medium">${it.descripcion}</td>
        <td class="py-2 text-center text-slate-600">${it.cantidad}</td>
        <td class="py-2 text-right text-slate-600">${config.simboloMoneda}${Number(it.precioUnitario).toFixed(2)}</td>
        <td class="py-2 text-right text-slate-900 font-bold">${config.simboloMoneda}${Number(it.subtotal).toFixed(2)}</td>
      </tr>
    `).join('');

    // Totales
    document.getElementById('modal-cot-subtotal').textContent = `${config.simboloMoneda}${Number(cot.subtotal).toFixed(2)}`;
    document.getElementById('modal-cot-iva').textContent = `${config.simboloMoneda}${Number(cot.ivaMonto).toFixed(2)}`;
    document.getElementById('modal-cot-total').textContent = `${config.simboloMoneda}${Number(cot.total).toFixed(2)}`;

    modal.classList.remove('hidden');
  },

  closeCotizacionModal() {
    const modal = document.getElementById('modal-detalle-cotizacion');
    if (modal) modal.classList.add('hidden');
    this.currentCotizacionEdit = null;
  },

  actualizarEstadoDesdeModal() {
    if (!this.currentCotizacionEdit) return;
    const nuevoEstado = document.getElementById('modal-select-cambiar-estado').value;
    window.storage.updateEstadoCotizacion(this.currentCotizacionEdit.id, nuevoEstado);
    this.showToast(`Estado actualizado a: ${nuevoEstado}`);
    this.closeCotizacionModal();
    this.renderCotizacionesList();
    this.renderKPIs();
    this.renderCotizacionesRecientes();
  },

  imprimirCotizacion() {
    window.print();
  },

  compartirWhatsApp() {
    if (!this.currentCotizacionEdit) return;
    const cot = this.currentCotizacionEdit;
    const config = window.storage.getConfig();

    const msg = `*Cotización MetalCot Pro - ${config.nombreTaller}*\n` +
      `Folio: ${cot.id}\n` +
      `Cliente: ${cot.clienteNombre}\n` +
      `Proyecto: ${cot.titulo}\n` +
      `Total: ${config.simboloMoneda}${Number(cot.total).toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n` +
      `Tiempo de entrega: ${cot.tiempoEntrega}\n\n` +
      `Gracias por su confianza.`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  eliminarCotizacionActual() {
    if (!this.currentCotizacionEdit) return;
    if (confirm(`¿Estás seguro de eliminar la cotización ${this.currentCotizacionEdit.id}?`)) {
      window.storage.deleteCotizacion(this.currentCotizacionEdit.id);
      this.showToast('Cotización eliminada');
      this.closeCotizacionModal();
      this.renderCotizacionesList();
      this.renderKPIs();
      this.renderCotizacionesRecientes();
    }
  },

  // RENDER: Clientes
  renderClientesList() {
    const container = document.getElementById('list-all-clientes');
    if (!container) return;

    const clientes = window.storage.getClientes();
    const config = window.storage.getConfig();

    container.innerHTML = clientes.map(cli => `
      <div class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm">
              ${cli.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-800">${cli.nombre}</h3>
              <p class="text-xs text-slate-500">${cli.telefono}</p>
            </div>
          </div>
        </div>
        <p class="text-xs text-slate-600 mb-3">📍 ${cli.direccion || 'Sin dirección'}</p>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span class="text-slate-400">Proyectos: <strong class="text-slate-700">${cli.proyectosCount || 1}</strong></span>
          <div class="flex gap-2">
            <a href="tel:${cli.telefono}" class="p-2 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200">📞</a>
            <a href="https://wa.me/${cli.telefono.replace(/[^0-9]/g, '')}" target="_blank" class="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    `).join('');
  },

  handleSaveCliente() {
    const nombre = document.getElementById('cli-nombre').value.trim();
    const tel = document.getElementById('cli-tel').value.trim();
    const email = document.getElementById('cli-email').value.trim();
    const dir = document.getElementById('cli-dir').value.trim();

    if (!nombre) {
      alert('Ingresa el nombre del cliente');
      return;
    }

    window.storage.saveCliente({
      nombre,
      telefono: tel || 'N/A',
      correo: email || 'N/A',
      direccion: dir || 'N/A'
    });

    this.showToast('Cliente guardado correctamente');
    document.getElementById('modal-nuevo-cliente').classList.add('hidden');
    document.getElementById('form-nuevo-cliente').reset();
    this.renderClientesList();
    this.renderKPIs();
  },

  // RENDER: Materiales
  renderMaterialesList() {
    const container = document.getElementById('list-all-materiales');
    if (!container) return;

    const materiales = window.storage.getMateriales();
    const config = window.storage.getConfig();

    container.innerHTML = materiales.map(m => `
      <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded tracking-wider ${
            m.categoria === 'aluminio' ? 'bg-blue-100 text-blue-700' :
            m.categoria === 'herreria' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
          }">${m.categoria}</span>
          <h4 class="text-xs font-bold text-slate-800 mt-1">${m.nombre}</h4>
          <span class="text-[11px] text-slate-500">Unidad: ${m.unidad}</span>
        </div>
        <div class="text-right">
          <span class="text-sm font-extrabold text-slate-900 block">${config.simboloMoneda}${Number(m.precio).toFixed(2)}</span>
          <span class="text-[10px] text-slate-400">por ${m.unidad}</span>
        </div>
      </div>
    `).join('');
  },

  handleSaveMaterial() {
    const cat = document.getElementById('mat-categoria').value;
    const nombre = document.getElementById('mat-nombre').value.trim();
    const unidad = document.getElementById('mat-unidad').value.trim();
    const precio = parseFloat(document.getElementById('mat-precio').value) || 0;

    if (!nombre || precio <= 0) {
      alert('Ingresa el nombre del material y un precio válido');
      return;
    }

    window.storage.saveMaterial({
      categoria: cat,
      nombre,
      unidad: unidad || 'pieza',
      precio
    });

    this.showToast('Material agregado al catálogo');
    document.getElementById('modal-nuevo-material').classList.add('hidden');
    document.getElementById('form-nuevo-material').reset();
    this.renderMaterialesList();
  },

  // RENDER: Reportes
  renderReportes() {
    const cots = window.storage.getCotizaciones();
    const config = window.storage.getConfig();

    const aprobadas = cots.filter(c => c.estado === 'Aprobada');
    const pendientes = cots.filter(c => c.estado === 'Pendiente');
    const borradores = cots.filter(c => c.estado === 'Borrador');
    const rechazadas = cots.filter(c => c.estado === 'Rechazada');

    const totalAprobado = aprobadas.reduce((acc, c) => acc + c.total, 0);
    const totalPendiente = pendientes.reduce((acc, c) => acc + c.total, 0);

    const totalCots = cots.length || 1;
    const tasaAprobacion = Math.round((aprobadas.length / totalCots) * 100);

    const elTasa = document.getElementById('rep-tasa-aprobacion');
    const elTotalAprob = document.getElementById('rep-total-aprobado');
    const elTotalPend = document.getElementById('rep-total-pendiente');

    if (elTasa) elTasa.textContent = `${tasaAprobacion}%`;
    if (elTotalAprob) elTotalAprob.textContent = `${config.simboloMoneda}${Math.round(totalAprobado).toLocaleString()}`;
    if (elTotalPend) elTotalPend.textContent = `${config.simboloMoneda}${Math.round(totalPendiente).toLocaleString()}`;

    // Barras visuales simples
    const barAprob = document.getElementById('bar-aprobadas');
    const barPend = document.getElementById('bar-pendientes');
    const barBorr = document.getElementById('bar-borradores');

    if (barAprob) barAprob.style.width = `${(aprobadas.length / totalCots) * 100}%`;
    if (barPend) barPend.style.width = `${(pendientes.length / totalCots) * 100}%`;
    if (barBorr) barBorr.style.width = `${(borradores.length / totalCots) * 100}%`;
  },

  // CONFIGURACIÓN
  loadWorkshopConfig() {
    const config = window.storage.getConfig();
    const elNombre = document.getElementById('cfg-taller');
    const elProp = document.getElementById('cfg-propietario');
    const elTel = document.getElementById('cfg-telefono');
    const elMargen = document.getElementById('cfg-margen');
    const elIva = document.getElementById('cfg-iva');

    if (elNombre) elNombre.value = config.nombreTaller;
    if (elProp) elProp.value = config.propietario;
    if (elTel) elTel.value = config.telefono;
    if (elMargen) elMargen.value = config.margenDefecto;
    if (elIva) elIva.value = config.ivaDefecto;
  },

  handleSaveConfig() {
    const newConfig = {
      nombreTaller: document.getElementById('cfg-taller').value.trim(),
      propietario: document.getElementById('cfg-propietario').value.trim(),
      telefono: document.getElementById('cfg-telefono').value.trim(),
      margenDefecto: parseFloat(document.getElementById('cfg-margen').value) || 35,
      ivaDefecto: parseFloat(document.getElementById('cfg-iva').value) || 16
    };

    window.storage.saveConfig(newConfig);
    this.showToast('Configuración guardada correctamente');
    this.renderKPIs();
  }
};
