import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-tester-api',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="tester-container">
      <div class="header-card">
        <h2><mat-icon>api</mat-icon> Tester API REST (Simulador Postman Integrado)</h2>
        <p>Prueba los endpoints del servidor Express en tiempo real sin necesidad de salir de la aplicación.</p>
        <small class="tester-credits">Materia: Aplicaciones Web (4-C) | Integrantes: <strong>Oscar Michel Matos May</strong> & <strong>Santiago Asahel Pech Aké</strong></small>
      </div>

      <div class="actions-bar">
        <button mat-raised-button color="primary" (click)="testEndpoint('GET', '/api/news')">
          <mat-icon>download</mat-icon> GET /api/news
        </button>
        <button mat-raised-button color="primary" (click)="testEndpoint('GET', '/api/categories')">
          <mat-icon>category</mat-icon> GET /api/categories
        </button>
        <button mat-raised-button color="accent" (click)="testEndpoint('POST', '/api/login')">
          <mat-icon>lock</mat-icon> POST /api/login (JWT)
        </button>
        <button mat-raised-button style="background: #10b981; color: white;" (click)="testEndpoint('POST', '/api/news')">
          <mat-icon>add_circle</mat-icon> POST Nueva Noticia Demo
        </button>
      </div>

      <mat-card class="console-card">
        <mat-card-header>
          <mat-card-title>
            Respuesta del Servidor HTTP
            @if (ultimoStatus) {
              <span class="status-badge" [class.badge-ok]="ultimoStatus === 200 || ultimoStatus === 201">
                Status {{ ultimoStatus }} {{ ultimoStatus === 200 ? 'OK' : 'Created' }}
              </span>
            }
          </mat-card-title>
          <mat-card-subtitle>{{ endpointActual || 'Selecciona un endpoint para enviar la solicitud' }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <pre class="json-viewer">{{ respuestaJson }}</pre>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .tester-container {
      padding: 24px 0;
      max-width: 1000px;
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
    .actions-bar {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .console-card {
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.08);
    }
    .status-badge {
      font-size: 0.8rem;
      padding: 4px 8px;
      border-radius: 4px;
      margin-left: 12px;
      font-weight: 700;
      background: #e2e8f0;
      color: #334155;
    }
    .badge-ok {
      background: #dcfce7;
      color: #15803d;
    }
    .json-viewer {
      background: #0f172a;
      color: #38bdf8;
      padding: 16px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 0.9rem;
      max-height: 400px;
      overflow-y: auto;
      white-space: pre-wrap;
    }
  `]
})
export class TesterApiComponent {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  respuestaJson: string = '// Haz clic en cualquiera de los botones para enviar una peticion HTTP al Backend...';
  ultimoStatus: number | null = null;
  endpointActual: string = '';

  testEndpoint(method: string, endpoint: string) {
    this.endpointActual = `${method} ${this.baseUrl}${endpoint}`;
    this.respuestaJson = `Enviando ${this.endpointActual}...`;
    this.ultimoStatus = null;

    if (method === 'GET') {
      this.http.get(`${this.baseUrl}${endpoint}`, { observe: 'response' }).subscribe({
        next: (res) => {
          this.ultimoStatus = res.status;
          this.respuestaJson = JSON.stringify(res.body, null, 2);
        },
        error: (err) => {
          this.ultimoStatus = err.status || 500;
          this.respuestaJson = JSON.stringify(err.error || { error: 'No se pudo conectar al servidor :3000' }, null, 2);
        }
      });
    } else if (method === 'POST' && endpoint === '/api/login') {
      this.http.post(`${this.baseUrl}/api/login`, {
        email: 'admin@webnews.com',
        password: 'admin123'
      }, { observe: 'response' }).subscribe({
        next: (res) => {
          this.ultimoStatus = res.status;
          this.respuestaJson = JSON.stringify(res.body, null, 2);
        },
        error: (err) => {
          this.ultimoStatus = err.status || 500;
          this.respuestaJson = JSON.stringify(err.error, null, 2);
        }
      });
    } else if (method === 'POST' && endpoint === '/api/news') {
      this.http.post(`${this.baseUrl}/api/news`, {
        titulo: 'Nueva Noticia desde Tester API WebNews',
        descripcion: 'Demostración de inserción HTTP POST en tiempo real hacia la base de datos.',
        categoria_id: 1,
        UserAlta: 'WebNewsTester'
      }, { observe: 'response' }).subscribe({
        next: (res) => {
          this.ultimoStatus = res.status;
          this.respuestaJson = JSON.stringify(res.body, null, 2);
        },
        error: (err) => {
          this.ultimoStatus = err.status || 500;
          this.respuestaJson = JSON.stringify(err.error, null, 2);
        }
      });
    }
  }
}
