import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface AutoModel {
  marca: string;
  modelo: string;
  annio: number;
}

@Component({
  selector: 'app-retos-js',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="retos-container">
      <div class="header-card">
        <h2><mat-icon>sports_esports</mat-icon> Retos y Prácticas de JavaScript (Curso Notion)</h2>
        <p>Demostración interactiva de los retos del curso de JavaScript integrados dentro de Angular.</p>
      </div>

      <div class="retos-grid">
        <!-- RETO 1 Y 2: PIEDRA PAPEL O TIJERA -->
        <mat-card class="reto-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">videogame_asset</mat-icon>
            <mat-card-title>Reto 1 y 2: Piedra, Papel o Tijera</mat-card-title>
            <mat-card-subtitle>Lógica condicional (IF vs SWITCH) contra la CPU</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="score-board">
              <span>Victorias: <strong>{{ victorias }}</strong></span>
              <span>Empates: <strong>{{ empates }}</strong></span>
              <span>Derrotas: <strong>{{ derrotas }}</strong></span>
            </div>

            <div class="game-buttons">
              <button mat-stroked-button (click)="jugar('piedra')">Piedra</button>
              <button mat-stroked-button (click)="jugar('papel')">Papel</button>
              <button mat-stroked-button (click)="jugar('tijera')">Tijera</button>
            </div>

            <div class="game-log">
              <p>{{ mensajeJuego }}</p>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- RETO 3: CONSTRUCTOR DE AUTOS -->
        <mat-card class="reto-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">directions_car</mat-icon>
            <mat-card-title>Reto 3: Constructor de 30 Autos</mat-card-title>
            <mat-card-subtitle>Instanciación de objetos con new y ciclo FOR</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="car-controls">
              <mat-form-field appearance="outline" style="width: 140px;">
                <mat-label>Cantidad</mat-label>
                <input matInput type="number" [(ngModel)]="cantidadAutos" min="1" max="50">
              </mat-form-field>
              <button mat-raised-button color="primary" (click)="fabricarAutos()">
                Fabricar Autos
              </button>
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

        <!-- PRÁCTICA 5: CONDICIONALES / CALIFICACIONES -->
        <mat-card class="reto-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">school</mat-icon>
            <mat-card-title>Práctica 5: Evaluador de Notas</mat-card-title>
            <mat-card-subtitle>Clasificación condicional (if / else if / else)</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="car-controls">
              <mat-form-field appearance="outline" style="width: 140px;">
                <mat-label>Nota (0-100)</mat-label>
                <input matInput type="number" [(ngModel)]="calificacionInput">
              </mat-form-field>
              <button mat-raised-button color="accent" (click)="evaluarNota()">
                Evaluar
              </button>
            </div>
            <div class="game-log">
              <p>{{ dictamenNota }}</p>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- PRÁCTICA 11: MÉTODOS DE ARRAY -->
        <mat-card class="reto-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">data_array</mat-icon>
            <mat-card-title>Práctica 11: Métodos de Array</mat-card-title>
            <mat-card-subtitle>Transformación y filtrado con .filter(), .map()</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="game-buttons">
              <button mat-stroked-button (click)="ejecutarMetodoArray('filter')">.filter() Accesorios</button>
              <button mat-stroked-button (click)="ejecutarMetodoArray('map')">.map() Precios</button>
              <button mat-stroked-button (click)="ejecutarMetodoArray('find')">.find() Menor a 300</button>
            </div>
            <div class="game-log">
              <pre>{{ arrayResultado }}</pre>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .retos-container {
      padding: 24px 0;
      max-width: 1100px;
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
    .retos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 24px;
    }
    .reto-card {
      border-radius: 12px;
    }
    .score-board {
      display: flex;
      justify-content: space-around;
      background: #f1f5f9;
      padding: 8px;
      border-radius: 6px;
      margin: 12px 0;
      font-size: 0.9rem;
    }
    .game-buttons {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .game-log {
      background: #0f172a;
      color: #38bdf8;
      padding: 12px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.85rem;
      min-height: 50px;
    }
    .car-controls {
      display: flex;
      align-items: center;
      gap: 12px;
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
  // Juego Piedra Papel Tijera
  victorias = 0;
  empates = 0;
  derrotas = 0;
  mensajeJuego = 'Elige una opcion arriba para iniciar la partida contra la CPU.';

  jugar(jugador: string) {
    const opciones = ['piedra', 'papel', 'tijera'];
    const cpu = opciones[Math.floor(Math.random() * opciones.length)];

    if (jugador === cpu) {
      this.empates++;
      this.mensajeJuego = `EMPATE: Tu elegiste [${jugador}] y la CPU [${cpu}].`;
    } else if (
      (jugador === 'piedra' && cpu === 'tijera') ||
      (jugador === 'papel' && cpu === 'piedra') ||
      (jugador === 'tijera' && cpu === 'papel')
    ) {
      this.victorias++;
      this.mensajeJuego = `GANASTE: Tu [${jugador}] vence a [${cpu}].`;
    } else {
      this.derrotas++;
      this.mensajeJuego = `PERDISTE: La CPU [${cpu}] vence a tu [${jugador}].`;
    }
  }

  // Constructor de Autos
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

  // Calificaciones
  calificacionInput = 85;
  dictamenNota = 'Ingresa una calificacion para evaluar.';

  evaluarNota() {
    const n = this.calificacionInput;
    if (n < 0 || n > 100) {
      this.dictamenNota = 'Error: La nota debe ser entre 0 y 100.';
    } else if (n >= 90) {
      this.dictamenNota = `Nota: ${n} - Sobresaliente (Excelente desempeno academico)`;
    } else if (n >= 80) {
      this.dictamenNota = `Nota: ${n} - Muy Bien (Desempeno destacado)`;
    } else if (n >= 70) {
      this.dictamenNota = `Nota: ${n} - Aprobado (Cumple los objetivos)`;
    } else {
      this.dictamenNota = `Nota: ${n} - No Acreditado (Requiere regularizacion)`;
    }
  }

  // Métodos de Array
  arrayResultado = 'Presiona un boton para ejecutar la operacion de array.';
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
      this.arrayResultado = JSON.stringify(res, null, 2);
    } else if (metodo === 'map') {
      const res = productos.map(p => `${p.nombre} -> $${p.precio} MXN`);
      this.arrayResultado = JSON.stringify(res, null, 2);
    } else if (metodo === 'find') {
      const res = productos.find(p => p.precio < 300);
      this.arrayResultado = JSON.stringify(res, null, 2);
    }
  }
}
