import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface AutoModel {
  marca: string;
  modelo: string;
  annio: number;
}

@Component({
  selector: 'app-retos-js',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <div class="retos-container">
      <div class="header-card">
        <h2><mat-icon>sports_esports</mat-icon> Compendio Completo: 11 Prácticas de JavaScript (Curso Notion)</h2>
        <p>Demostración interactiva de todos los módulos, retos y ejercicios del curso oficial de Notion.</p>
        
        <!-- BARRA DE ACCESO RÁPIDO -->
        <div class="filter-pills">
          <button mat-flat-button [color]="filtroSeleccionado === 0 ? 'accent' : ''" (click)="filtroSeleccionado = 0">
            Ver Todas (11)
          </button>
          @for (p of listaPracticas; track p.id) {
            <button mat-stroked-button [class.active-pill]="filtroSeleccionado === p.id" (click)="filtroSeleccionado = p.id">
              {{ p.numero }}. {{ p.titulo }}
            </button>
          }
        </div>
      </div>

      <div class="retos-grid">

        <!-- ============================================== -->
        <!-- PRÁCTICA 01: VARIABLES Y TIPOS DE DATOS -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 1) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">data_object</mat-icon>
              <mat-card-title>01. Variables y Tipos de Datos</mat-card-title>
              <mat-card-subtitle>Valores primitivos, objetos y operador typeof</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 8px;">
                Escribe cualquier valor para inspeccionar su tipo dinámico:
              </p>
              <div class="action-row">
                <mat-form-field appearance="outline" style="flex: 1;">
                  <mat-label>Ingresa un valor</mat-label>
                  <input matInput [(ngModel)]="p1Input" placeholder="Ej. 42, Hola mundo, true">
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="evaluarTipo()">Analizar Typeof</button>
              </div>
              <div class="code-box">
                <pre>{{ p1Resultado }}</pre>
              </div>
            </mat-card-content>
          </mat-card>
        }

        <!-- ============================================== -->
        <!-- PRÁCTICA 02: FUNCIONES DECLARATIVAS VS FLECHA -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 2) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">functions</mat-icon>
              <mat-card-title>02. Funciones: Declarativas y Flecha</mat-card-title>
              <mat-card-subtitle>Comparación de sintaxis y ejecución de funciones</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="action-row">
                <mat-form-field appearance="outline" style="width: 100px;">
                  <mat-label>Num A</mat-label>
                  <input matInput type="number" [(ngModel)]="p2NumA">
                </mat-form-field>
                <mat-form-field appearance="outline" style="width: 100px;">
                  <mat-label>Num B</mat-label>
                  <input matInput type="number" [(ngModel)]="p2NumB">
                </mat-form-field>
                <button mat-stroked-button (click)="ejecutarFuncion('declarativa')">Suma (Declarativa)</button>
                <button mat-stroked-button (click)="ejecutarFuncion('flecha')">Mult (Flecha =>)</button>
              </div>
              <div class="code-box">
                <pre>{{ p2Resultado }}</pre>
              </div>
            </mat-card-content>
          </mat-card>
        }

        <!-- ============================================== -->
        <!-- PRÁCTICA 03: SCOPE Y HOISTING -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 3) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">account_tree</mat-icon>
              <mat-card-title>03. Scope Global, Local y Hoisting</mat-card-title>
              <mat-card-subtitle>Alcance de variables y elevación en memoria</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="action-row">
                <button mat-raised-button color="accent" (click)="demostrarScope()">Simular Ámbitos de Scope</button>
                <button mat-stroked-button (click)="demostrarHoisting()">Demostrar Hoisting</button>
              </div>
              <div class="code-box">
                <pre>{{ p3Resultado }}</pre>
              </div>
            </mat-card-content>
          </mat-card>
        }

        <!-- ============================================== -->
        <!-- PRÁCTICA 04: COERCIÓN Y TRUTHY / FALSY -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 4) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">compare_arrows</mat-icon>
              <mat-card-title>04. Coerción y Valores Truthy / Falsy</mat-card-title>
              <mat-card-subtitle>Conversión implícita, explícita y operador ===</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="action-row">
                <button mat-stroked-button (click)="probarTruthy(0)">Boolean(0)</button>
                <button mat-stroked-button (click)="probarTruthy('')">Boolean("")</button>
                <button mat-stroked-button (click)="probarTruthy('Hola')">Boolean("Hola")</button>
                <button mat-stroked-button (click)="probarTruthy([])">Boolean([])</button>
                <button mat-raised-button color="primary" (click)="demostrarCoercion()">Coerción 4 + "7"</button>
              </div>
              <div class="code-box">
                <pre>{{ p4Resultado }}</pre>
              </div>
            </mat-card-content>
          </mat-card>
        }

        <!-- ============================================== -->
        <!-- PRÁCTICA 05: CONDICIONALES Y TERNARIO -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 5) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">rule</mat-icon>
              <mat-card-title>05. Condicionales: If / Else y Ternario</mat-card-title>
              <mat-card-subtitle>Control de flujo evaluando rangos de calificaciones</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="action-row">
                <mat-form-field appearance="outline" style="width: 140px;">
                  <mat-label>Nota (0-100)</mat-label>
                  <input matInput type="number" [(ngModel)]="calificacionInput">
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="evaluarNota()">Evaluar Nota</button>
                <button mat-stroked-button (click)="evaluarTernario()">Probar Ternario Edad (19)</button>
              </div>
              <div class="code-box">
                <pre>{{ dictamenNota }}</pre>
              </div>
            </mat-card-content>
          </mat-card>
        }

        <!-- ============================================== -->
        <!-- PRÁCTICA 06: RETO 1 - PIEDRA PAPEL TIJERA (IF) -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 6) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">sports_esports</mat-icon>
              <mat-card-title>06. Reto 1: Piedra, Papel o Tijera (con IF)</mat-card-title>
              <mat-card-subtitle>Algoritmo de juego resuelto con if / else anidados</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="action-row">
                <button mat-raised-button color="accent" (click)="jugarIf('piedra')">Piedra</button>
                <button mat-raised-button color="accent" (click)="jugarIf('papel')">Papel</button>
                <button mat-raised-button color="accent" (click)="jugarIf('tijera')">Tijera</button>
              </div>
              <div class="code-box">
                <pre>{{ p6Resultado }}</pre>
              </div>
            </mat-card-content>
          </mat-card>
        }

        <!-- ============================================== -->
        <!-- PRÁCTICA 07: RETO 2 - PIEDRA PAPEL TIJERA (SWITCH) -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 7) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">tune</mat-icon>
              <mat-card-title>07. Reto 2: Piedra, Papel o Tijera (con SWITCH)</mat-card-title>
              <mat-card-subtitle>Misma lógica optimizada con switch (true)</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="action-row">
                <button mat-stroked-button (click)="jugarSwitch('piedra')">Piedra</button>
                <button mat-stroked-button (click)="jugarSwitch('papel')">Papel</button>
                <button mat-stroked-button (click)="jugarSwitch('tijera')">Tijera</button>
              </div>
              <div class="code-box">
                <pre>{{ p7Resultado }}</pre>
              </div>
            </mat-card-content>
          </mat-card>
        }

        <!-- ============================================== -->
        <!-- PRÁCTICA 08: ARRAYS Y MÉTODOS MUTADORES -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 8) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">view_list</mat-icon>
              <mat-card-title>08. Arrays y Métodos de Mutación</mat-card-title>
              <mat-card-subtitle>Operaciones push, pop, shift, unshift e indexOf</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="action-row">
                <mat-form-field appearance="outline" style="width: 140px;">
                  <mat-label>Elemento</mat-label>
                  <input matInput [(ngModel)]="p8NuevaFruta" placeholder="Ej. Kiwi">
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="p8Push()">.push()</button>
                <button mat-stroked-button (click)="p8Unshift()">.unshift()</button>
                <button mat-stroked-button color="warn" (click)="p8Pop()">.pop()</button>
                <button mat-stroked-button color="warn" (click)="p8Shift()">.shift()</button>
              </div>
              <div class="code-box">
                <pre>{{ p8Resultado }}</pre>
              </div>
            </mat-card-content>
          </mat-card>
        }

        <!-- ============================================== -->
        <!-- PRÁCTICA 09: BUCLES (FOR, FOR...OF, WHILE) -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 9) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">repeat</mat-icon>
              <mat-card-title>09. Bucles: For, For..of, While y Do..While</mat-card-title>
              <mat-card-subtitle>Estructuras de repetición e iteración</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="action-row">
                <button mat-stroked-button (click)="ejecutarBucle('for')">Bucle For Clásico</button>
                <button mat-stroked-button (click)="ejecutarBucle('forof')">Bucle For...of</button>
                <button mat-stroked-button (click)="ejecutarBucle('while')">Cuenta While (5 a 1)</button>
              </div>
              <div class="code-box">
                <pre>{{ p9Resultado }}</pre>
              </div>
            </mat-card-content>
          </mat-card>
        }

        <!-- ============================================== -->
        <!-- PRÁCTICA 10: RETO 3 - 30 AUTOS CON CONSTRUCTOR -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 10) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">directions_car</mat-icon>
              <mat-card-title>10. Reto 3: Objetos y Constructor de 30 Autos</mat-card-title>
              <mat-card-subtitle>Función constructora new Auto() combinada con bucle for</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="action-row">
                <mat-form-field appearance="outline" style="width: 140px;">
                  <mat-label>Cantidad</mat-label>
                  <input matInput type="number" [(ngModel)]="cantidadAutos" min="1" max="50">
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="fabricarAutos()">Fabricar Autos</button>
              </div>
              <div class="cars-list">
                @for (auto of autosGenerados; track $index) {
                  <div class="car-item">
                    <span>#{{ $index + 1 }}</span>
                    <strong>{{ auto.marca }} {{ auto.modelo }}</strong>
                    <span class="year-badge">{{ auto.annio }}</span>
                  </div>
                }
              </div>
            </mat-card-content>
          </mat-card>
        }

        <!-- ============================================== -->
        <!-- PRÁCTICA 11: MÉTODOS MODERNOS DE ARRAY (ES6+) -->
        <!-- ============================================== -->
        @if (filtroSeleccionado === 0 || filtroSeleccionado === 11) {
          <mat-card class="reto-card">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">filter_alt</mat-icon>
              <mat-card-title>11. Métodos Modernos de Array (ES6+)</mat-card-title>
              <mat-card-subtitle>Programación funcional con .filter(), .map(), .find(), .some()</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="action-row">
                <button mat-stroked-button (click)="ejecutarMetodoArray('filter')">.filter() Accesorios</button>
                <button mat-stroked-button (click)="ejecutarMetodoArray('map')">.map() Precios MXN</button>
                <button mat-stroked-button (click)="ejecutarMetodoArray('find')">.find() Menor $300</button>
                <button mat-stroked-button (click)="ejecutarMetodoArray('some')">.some() Mayor $15k</button>
              </div>
              <div class="code-box">
                <pre>{{ arrayResultado }}</pre>
              </div>
            </mat-card-content>
          </mat-card>
        }

      </div>
    </div>
  `,
  styles: [`
    .retos-container {
      padding: 24px 0;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header-card {
      background: linear-gradient(135deg, #1e293b, #0f172a);
      color: white;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 24px;
    }
    .header-card h2 {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0 0 8px 0;
    }
    .filter-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 16px;
    }
    .filter-pills button {
      font-size: 0.8rem;
      border-radius: 20px;
      color: #e2e8f0;
    }
    .active-pill {
      background: #3b82f6 !important;
      color: white !important;
    }
    .retos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(520px, 1fr));
      gap: 24px;
    }
    .reto-card {
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
    }
    .action-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin: 12px 0;
    }
    .code-box {
      background: #0f172a;
      color: #38bdf8;
      padding: 12px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 0.85rem;
      min-height: 60px;
      max-height: 180px;
      overflow-y: auto;
    }
    .code-box pre {
      margin: 0;
      white-space: pre-wrap;
    }
    .cars-list {
      max-height: 180px;
      overflow-y: auto;
      background: #f8fafc;
      padding: 8px;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 8px;
    }
    .car-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 12px;
      background: white;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      font-size: 0.85rem;
    }
    .year-badge {
      background: #e0f2fe;
      color: #0369a1;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 600;
    }
  `]
})
export class RetosJsComponent {
  filtroSeleccionado = 0; // 0 = Ver todas

  listaPracticas = [
    { id: 1, numero: '01', titulo: 'Variables' },
    { id: 2, numero: '02', titulo: 'Funciones' },
    { id: 3, numero: '03', titulo: 'Scope' },
    { id: 4, numero: '04', titulo: 'Coerción' },
    { id: 5, numero: '05', titulo: 'Condicionales' },
    { id: 6, numero: '06', titulo: 'Reto 1 (IF)' },
    { id: 7, numero: '07', titulo: 'Reto 2 (Switch)' },
    { id: 8, numero: '08', titulo: 'Arrays' },
    { id: 9, numero: '09', titulo: 'Bucles' },
    { id: 10, numero: '10', titulo: 'Reto 3 (Autos)' },
    { id: 11, numero: '11', titulo: 'Métodos Array' }
  ];

  // P1: Variables
  p1Input = 'Hola Mundo';
  p1Resultado = 'Escribe un valor y presiona "Analizar Typeof".';
  evaluarTipo() {
    const val = this.p1Input;
    let tipo: string = typeof val;
    if (!isNaN(Number(val)) && val.trim() !== '') tipo = 'number (parseado)';
    if (val === 'true' || val === 'false') tipo = 'boolean';
    this.p1Resultado = `Valor: "${val}"\nTipo detectado: typeof = [ ${tipo} ]\nClasificación: ${tipo === 'object' ? 'Tipo Objeto / Estructura' : 'Tipo Primitivo'}`;
  }

  // P2: Funciones
  p2NumA = 15;
  p2NumB = 4;
  p2Resultado = 'Selecciona una función arriba.';
  ejecutarFuncion(tipo: string) {
    if (tipo === 'declarativa') {
      const suma = (a: number, b: number) => a + b;
      this.p2Resultado = `// Función Declarativa:\nfunction sumar(a, b) { return a + b; }\nsumar(${this.p2NumA}, ${this.p2NumB}) = ${suma(this.p2NumA, this.p2NumB)}`;
    } else {
      const mult = (a: number, b: number) => a * b;
      this.p2Resultado = `// Función Flecha (Arrow Function):\nconst multiplicar = (a, b) => a * b;\nmultiplicar(${this.p2NumA}, ${this.p2NumB}) = ${mult(this.p2NumA, this.p2NumB)}`;
    }
  }

  // P3: Scope
  p3Resultado = 'Presiona un botón para ver la simulación de Scope o Hoisting.';
  demostrarScope() {
    this.p3Resultado = `// Demostración de Ámbitos (Scope):\n[Global] variableGlobal = "Visible en todo el archivo"\n  └── [Función/Local] variableLocal = "Solo visible dentro de su función"\n       └── [Bloque] let variableBloque = "Solo vive dentro del bloque { if }"`;
  }
  demostrarHoisting() {
    this.p3Resultado = `// Hoisting en JavaScript:\nsaludar(); // Funciona gracias a que la declaración se eleva a la cima\nfunction saludar() {\n  return "Función declarada antes de ser ejecutada";\n}`;
  }

  // P4: Coerción
  p4Resultado = 'Presiona un valor para evaluar su naturaleza Truthy o Falsy.';
  probarTruthy(val: any) {
    const bool = Boolean(val);
    this.p4Resultado = `Evaluando: Boolean(${JSON.stringify(val)})\nResultado: [ ${bool ? 'Truthy (Verdadero)' : 'Falsy (Falso)'} ]`;
  }
  demostrarCoercion() {
    const impl = 4 + "7";
    const expl = Number("42");
    this.p4Resultado = `// Coerción Implícita:  4 + "7"  = "${impl}" (tipo ${typeof impl})\n// Coerción Explícita: Number("42") = ${expl} (tipo ${typeof expl})\n// Igualdad Estricta: 4 === "4" -> false (compara tipo y valor)`;
  }

  // P5: Condicionales
  calificacionInput = 85;
  dictamenNota = 'Nota: 85 - Muy Bien (Desempeño destacado)';
  evaluarNota() {
    const n = this.calificacionInput;
    if (n < 0 || n > 100) {
      this.dictamenNota = '[ERROR] La calificación debe ser entre 0 y 100.';
    } else if (n >= 90) {
      this.dictamenNota = `Nota: ${n} - Sobresaliente (Excelente desempeño)`;
    } else if (n >= 80) {
      this.dictamenNota = `Nota: ${n} - Muy Bien (Desempeño destacado)`;
    } else if (n >= 70) {
      this.dictamenNota = `Nota: ${n} - Aprobado (Cumple los objetivos)`;
    } else {
      this.dictamenNota = `Nota: ${n} - No Acreditado (Requiere regularización)`;
    }
  }
  evaluarTernario() {
    const edad = 19;
    const res = edad >= 18 ? "Mayor de edad (Acceso concedido)" : "Menor de edad";
    this.dictamenNota = `// Operador Ternario: const res = edad >= 18 ? "Mayor" : "Menor"\nEdad 19 años -> Resultado: ${res}`;
  }

  // P6: Reto IF
  p6Resultado = 'Elige Piedra, Papel o Tijera arriba para jugar con IF.';
  jugarIf(jugador: string) {
    const opciones = ['piedra', 'papel', 'tijera'];
    const cpu = opciones[Math.floor(Math.random() * opciones.length)];
    let res = '';
    if (jugador === cpu) {
      res = `EMPATE: Ambos eligieron [${jugador}].`;
    } else if (
      (jugador === 'piedra' && cpu === 'tijera') ||
      (jugador === 'papel' && cpu === 'piedra') ||
      (jugador === 'tijera' && cpu === 'papel')
    ) {
      res = `GANASTE: Tu [${jugador}] vence a la máquina [${cpu}].`;
    } else {
      res = `PERDISTE: La máquina [${cpu}] vence a tu [${jugador}].`;
    }
    this.p6Resultado = `[IF/ELSE] Tú: [${jugador}] vs CPU: [${cpu}]\nDictamen: ${res}`;
  }

  // P7: Reto SWITCH
  p7Resultado = 'Elige una opción arriba para jugar con SWITCH.';
  jugarSwitch(jugador: string) {
    const opciones = ['piedra', 'papel', 'tijera'];
    const cpu = opciones[Math.floor(Math.random() * opciones.length)];
    let res = '';
    switch (true) {
      case jugador === cpu:
        res = `EMPATE: Ambos sacaron [${jugador}].`;
        break;
      case (jugador === 'piedra' && cpu === 'tijera') ||
           (jugador === 'papel' && cpu === 'piedra') ||
           (jugador === 'tijera' && cpu === 'papel'):
        res = `GANASTE: [${jugador}] derrota a [${cpu}].`;
        break;
      default:
        res = `PERDISTE: [${cpu}] derrota a [${jugador}].`;
        break;
    }
    this.p7Resultado = `[SWITCH (TRUE)] Tú: [${jugador}] vs CPU: [${cpu}]\nDictamen: ${res}`;
  }

  // P8: Arrays
  p8Frutas = ['Manzana', 'Plátano', 'Cereza', 'Fresa'];
  p8NuevaFruta = 'Uva';
  p8Resultado = `Array inicial: [ "Manzana", "Plátano", "Cereza", "Fresa" ]\nLongitud (.length): 4`;

  p8Push() {
    this.p8Frutas.push(this.p8NuevaFruta || 'Fruta');
    this.p8Resultado = `frutas.push("${this.p8NuevaFruta}")\nArray actualizado: ${JSON.stringify(this.p8Frutas)}\nLongitud: ${this.p8Frutas.length}`;
  }
  p8Unshift() {
    this.p8Frutas.unshift(this.p8NuevaFruta || 'Fruta');
    this.p8Resultado = `frutas.unshift("${this.p8NuevaFruta}")\nArray actualizado: ${JSON.stringify(this.p8Frutas)}\nLongitud: ${this.p8Frutas.length}`;
  }
  p8Pop() {
    const rem = this.p8Frutas.pop();
    this.p8Resultado = `frutas.pop() eliminó '${rem}'\nArray actualizado: ${JSON.stringify(this.p8Frutas)}\nLongitud: ${this.p8Frutas.length}`;
  }
  p8Shift() {
    const rem = this.p8Frutas.shift();
    this.p8Resultado = `frutas.shift() eliminó '${rem}'\nArray actualizado: ${JSON.stringify(this.p8Frutas)}\nLongitud: ${this.p8Frutas.length}`;
  }

  // P9: Bucles
  p9Resultado = 'Selecciona un bucle para ejecutar la iteración.';
  ejecutarBucle(tipo: string) {
    if (tipo === 'for') {
      const items = ['María', 'Jorge', 'Lucía', 'Ricardo'];
      const logs = items.map((it, idx) => `Puesto #${idx + 1}: ${it}`);
      this.p9Resultado = `// Bucle For Clásico:\n` + logs.join('\n');
    } else if (tipo === 'forof') {
      const items = ['María', 'Jorge', 'Lucía', 'Ricardo'];
      const logs = items.map(it => `Bienvenido al laboratorio, ${it}!`);
      this.p9Resultado = `// Bucle For...of:\n` + logs.join('\n');
    } else {
      let cuenta = 5;
      const logs = [];
      while (cuenta > 0) {
        logs.push(`Iniciando compilación en ${cuenta}...`);
        cuenta--;
      }
      logs.push('Compilación iniciada con éxito!');
      this.p9Resultado = `// Bucle While:\n` + logs.join('\n');
    }
  }

  // P10: Reto Autos
  cantidadAutos = 10;
  autosGenerados: AutoModel[] = [];
  fabricarAutos() {
    const marcas = ["Toyota", "Nissan", "Ford", "Chevrolet", "Honda", "BMW", "Audi", "Volkswagen"];
    const modelos = ["Sedan", "SUV", "Coupe", "Camioneta", "Hatchback", "Deportivo"];
    this.autosGenerados = [];

    const total = this.cantidadAutos || 10;
    for (let i = 1; i <= total; i++) {
      this.autosGenerados.push({
        marca: marcas[Math.floor(Math.random() * marcas.length)],
        modelo: `${modelos[Math.floor(Math.random() * modelos.length)]} Serie-${i}`,
        annio: 2016 + Math.floor(Math.random() * 11)
      });
    }
  }

  // P11: Métodos de Array
  arrayResultado = 'Presiona un botón para ejecutar la operación funcional sobre el array.';
  ejecutarMetodoArray(metodo: string) {
    const productos = [
      { nombre: 'Laptop', categoria: 'Computo', precio: 18500 },
      { nombre: 'Mouse', categoria: 'Accesorios', precio: 350 },
      { nombre: 'Teclado Mecanico', categoria: 'Accesorios', precio: 1200 },
      { nombre: 'Monitor 27 Pulgadas', categoria: 'Pantallas', precio: 4500 },
      { nombre: 'Memoria USB 64GB', categoria: 'Accesorios', precio: 220 }
    ];

    if (metodo === 'filter') {
      const res = productos.filter(p => p.categoria === 'Accesorios');
      this.arrayResultado = `// .filter(p => p.categoria === 'Accesorios')\n` + JSON.stringify(res, null, 2);
    } else if (metodo === 'map') {
      const res = productos.map(p => `${p.nombre} -> $${p.precio} MXN`);
      this.arrayResultado = `// .map(p => \`\${p.nombre} -> \$\${p.precio} MXN\`)\n` + JSON.stringify(res, null, 2);
    } else if (metodo === 'find') {
      const res = productos.find(p => p.precio < 300);
      this.arrayResultado = `// .find(p => p.precio < 300)\n` + JSON.stringify(res, null, 2);
    } else if (metodo === 'some') {
      const res = productos.some(p => p.precio > 15000);
      this.arrayResultado = `// .some(p => p.precio > 15000)\n¿Existe algún producto mayor a $15,000?: ${res ? 'SÍ' : 'NO'}`;
    }
  }

  ngOnInit() {
    this.fabricarAutos();
  }
}
