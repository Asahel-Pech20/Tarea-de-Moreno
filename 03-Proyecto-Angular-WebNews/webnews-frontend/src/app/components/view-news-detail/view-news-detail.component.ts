import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NewService } from '../../services/new.service';
import { New } from '../../interfaces/interfaces';

@Component({
  selector: 'app-view-news-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="article-page-container">
      <div class="navigation-bar">
        <button mat-button (click)="volver()">
          <mat-icon>arrow_back</mat-icon> Volver a las noticias
        </button>
      </div>

      @if (cargando) {
        <div class="loading-state">
          <mat-spinner diameter="48"></mat-spinner>
          <p>Cargando artículo completo...</p>
        </div>
      } @else if (!noticia) {
        <div class="not-found-state">
          <mat-icon class="large-icon">error_outline</mat-icon>
          <h2>Noticia no encontrada</h2>
          <p>La noticia solicitada no existe o fue eliminada.</p>
          <a mat-raised-button color="primary" routerLink="/">Ir al Inicio</a>
        </div>
      } @else {
        <article class="article-card">
          <!-- Categoría -->
          <div class="category-wrapper">
            <span class="category-chip">{{ noticia.categoria?.nombre || 'General' }}</span>
          </div>

          <!-- Título -->
          <h1 class="article-title">{{ noticia.titulo }}</h1>

          <!-- Metadatos -->
          <div class="article-meta">
            <span>Por <strong>{{ noticia.UserAlta || 'Redacción WebNews' }}</strong></span>
            <span class="sep">•</span>
            <span>Publicado: {{ formatearFecha(noticia.fecha_publicacion) }}</span>
            <span class="sep">•</span>
            <span>3 min de lectura</span>
          </div>

          <!-- Imagen Principal -->
          <div class="hero-image-box">
            <img
              [src]="noticia.imagen"
              [alt]="noticia.titulo"
              class="hero-img"
              (error)="fallbackImagen($event)"
            />
          </div>

          <!-- Resumen destacado -->
          <p class="article-lead">{{ noticia.descripcion }}</p>

          <!-- Cuerpo completo del artículo -->
          <div class="article-body">
            @for (p of parrafos; track $index) {
              <p class="article-paragraph">{{ p }}</p>
            }
          </div>

          <!-- Botones de Acción -->
          <div class="article-actions">
            <button mat-stroked-button color="primary" (click)="copiarEnlace()">
              <mat-icon>share</mat-icon> Compartir noticia
            </button>
            <button mat-raised-button color="primary" (click)="volver()">
              <mat-icon>home</mat-icon> Volver al inicio
            </button>
          </div>
        </article>
      }
    </div>
  `,
  styles: [`
    .article-page-container {
      max-width: 820px;
      margin: 0 auto;
      padding: 16px 8px 48px;
    }
    .navigation-bar {
      margin-bottom: 20px;
    }
    .loading-state, .not-found-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      color: #64748b;
      text-align: center;
    }
    .large-icon {
      font-size: 54px;
      width: 54px;
      height: 54px;
      margin-bottom: 12px;
      color: #ef4444;
    }
    .article-card {
      background: #ffffff;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    }
    .category-chip {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #1976d2;
      background-color: #e3f2fd;
      padding: 6px 14px;
      border-radius: 20px;
      margin-bottom: 16px;
    }
    .article-title {
      font-size: 2.2rem;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
      margin: 0 0 16px 0;
    }
    .article-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      color: #64748b;
      font-size: 0.9rem;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f1f5f9;
    }
    .sep {
      color: #cbd5e1;
    }
    .hero-image-box {
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 28px;
      max-height: 420px;
      background: #f1f5f9;
    }
    .hero-img {
      width: 100%;
      height: 100%;
      max-height: 420px;
      object-fit: cover;
      display: block;
    }
    .article-lead {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.7;
      color: #1e293b;
      background: #f8fafc;
      padding: 16px 20px;
      border-left: 4px solid #1976d2;
      border-radius: 0 8px 8px 0;
      margin-bottom: 24px;
    }
    .article-paragraph {
      font-size: 1.08rem;
      line-height: 1.85;
      color: #334155;
      margin-bottom: 20px;
      text-align: justify;
    }
    .article-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-top: 36px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      flex-wrap: wrap;
    }
  `]
})
export class ViewNewsDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newService = inject(NewService);
  private snackBar = inject(MatSnackBar);

  noticia: New | null = null;
  cargando = true;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cargarNoticia(parseInt(id, 10));
      } else {
        this.cargando = false;
      }
    });
  }

  cargarNoticia(id: number) {
    this.cargando = true;
    this.newService.getNew(id).subscribe({
      next: (data) => {
        this.noticia = data;
        this.cargando = false;
      },
      error: () => {
        this.noticia = null;
        this.cargando = false;
      }
    });
  }

  get parrafos(): string[] {
    if (!this.noticia) return [];
    const raw = this.noticia.contenido || this.generarContenidoPorDefecto();
    return raw.split('\n\n').filter(p => p.trim().length > 0);
  }

  private generarContenidoPorDefecto(): string {
    const desc = this.noticia?.descripcion || '';
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
    navigator.clipboard?.writeText(window.location.href).then(() => {
      this.snackBar.open('¡Enlace de la noticia copiado al portapapeles!', 'Aceptar', {
        duration: 3000
      });
    }).catch(() => {
      this.snackBar.open('Enlace listo para compartir', 'Cerrar', { duration: 3000 });
    });
  }

  volver() {
    this.router.navigate(['/']);
  }
}
