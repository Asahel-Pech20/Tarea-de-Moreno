import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { New } from '../../interfaces/interfaces';

export interface ViewNewsDialogData {
  noticia: New;
}

@Component({
  selector: 'app-view-news-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="reader-container">
      <!-- Barra superior con categoría y botón cerrar -->
      <div class="reader-topbar">
        <span class="category-pill">{{ data.noticia.categoria?.nombre || 'Actualidad' }}</span>
        <button mat-icon-button (click)="cerrar()" aria-label="Cerrar lectura" class="close-btn">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- Título de la noticia -->
      <h1 class="reader-title">{{ data.noticia.titulo }}</h1>

      <!-- Metadatos de publicación -->
      <div class="reader-meta">
        <div class="meta-item">
          <mat-icon class="meta-icon">person</mat-icon>
          <span>Por <strong>{{ data.noticia.UserAlta || 'Redacción WebNews' }}</strong></span>
        </div>
        <span class="meta-separator">•</span>
        <div class="meta-item">
          <mat-icon class="meta-icon">calendar_today</mat-icon>
          <span>{{ formatearFecha(data.noticia.fecha_publicacion) }}</span>
        </div>
        <span class="meta-separator">•</span>
        <div class="meta-item">
          <mat-icon class="meta-icon">schedule</mat-icon>
          <span>Lectura de 3 min</span>
        </div>
      </div>

      <!-- Imagen principal destacada -->
      <div class="image-wrapper">
        <img
          [src]="data.noticia.imagen"
          [alt]="data.noticia.titulo"
          class="reader-hero-image"
          (error)="fallbackImagen($event)"
        />
      </div>

      <!-- Contenido del artículo -->
      <div class="reader-content">
        <!-- Bajada / Lead de la noticia -->
        <p class="reader-lead">{{ data.noticia.descripcion }}</p>

        <!-- Párrafos completos del cuerpo -->
        @for (parrafo of parrafos; track $index) {
          <p class="reader-paragraph">{{ parrafo }}</p>
        }
      </div>

      <!-- Pie de página con acciones -->
      <div class="reader-footer">
        <button mat-stroked-button color="primary" (click)="copiarEnlace()">
          <mat-icon>share</mat-icon> Compartir noticia
        </button>
        <button mat-flat-button color="primary" (click)="cerrar()">
          Cerrar lectura
        </button>
      </div>
    </div>
  `,
  styles: [`
    .reader-container {
      padding: 24px;
      max-width: 720px;
      margin: 0 auto;
      background: #ffffff;
      color: #1e293b;
      box-sizing: border-box;
      max-height: 85vh;
      overflow-y: auto;
    }
    .reader-topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .category-pill {
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #1565c0;
      background-color: #e3f2fd;
      padding: 6px 14px;
      border-radius: 20px;
    }
    .close-btn {
      color: #64748b;
    }
    .reader-title {
      font-size: 1.85rem;
      font-weight: 700;
      line-height: 1.3;
      margin: 0 0 16px 0;
      color: #0f172a;
    }
    .reader-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      font-size: 0.88rem;
      color: #64748b;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f1f5f9;
    }
    .meta-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .meta-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #94a3b8;
    }
    .meta-separator {
      color: #cbd5e1;
    }
    .image-wrapper {
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 24px;
      background-color: #f8fafc;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
    .reader-hero-image {
      width: 100%;
      max-height: 380px;
      object-fit: cover;
      display: block;
    }
    .reader-content {
      margin-bottom: 28px;
    }
    .reader-lead {
      font-size: 1.15rem;
      font-weight: 500;
      line-height: 1.6;
      color: #334155;
      margin-bottom: 20px;
      padding-left: 16px;
      border-left: 4px solid #1976d2;
      background: #f8fafc;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 0 8px 8px 0;
    }
    .reader-paragraph {
      font-size: 1.05rem;
      line-height: 1.8;
      color: #334155;
      margin-bottom: 18px;
      text-align: justify;
    }
    .reader-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      gap: 12px;
      flex-wrap: wrap;
    }
  `]
})
export class ViewNewsDialogComponent {
  private snackBar = inject(MatSnackBar);
  public dialogRef = inject(MatDialogRef<ViewNewsDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: ViewNewsDialogData) {}

  get parrafos(): string[] {
    const raw = this.data.noticia.contenido || this.generarContenidoPorDefecto();
    return raw.split('\n\n').filter(p => p.trim().length > 0);
  }

  private generarContenidoPorDefecto(): string {
    const desc = this.data.noticia.descripcion || '';
    return `${desc}\n\nLos especialistas y equipos de desarrollo han destacado que este suceso marca un precedente relevante para el sector, impulsando nuevas metodologías de trabajo e innovación continua en el ecosistema digital.\n\nPara más actualizaciones y seguimiento de esta noticia, mantente conectado a las próximas emisiones del portal WebNews.`;
  }

  formatearFecha(fechaStr?: string): string {
    if (!fechaStr) return 'Reciente';
    try {
      const f = new Date(fechaStr);
      return f.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return fechaStr.slice(0, 10);
    }
  }

  fallbackImagen(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=60';
  }

  copiarEnlace() {
    const texto = `WebNews - ${this.data.noticia.titulo}\n${window.location.origin}`;
    navigator.clipboard?.writeText(texto).then(() => {
      this.snackBar.open('¡Enlace de la noticia copiado al portapapeles!', 'Aceptar', {
        duration: 3000
      });
    }).catch(() => {
      this.snackBar.open('Título: ' + this.data.noticia.titulo, 'Cerrar', {
        duration: 3000
      });
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
