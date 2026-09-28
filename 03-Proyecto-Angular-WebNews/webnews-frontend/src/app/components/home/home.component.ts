import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewService } from '../../services/new.service';
import { New } from '../../interfaces/interfaces';
import { CardNewComponent } from '../card-new/card-new.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardNewComponent, MatProgressSpinnerModule],
  template: `
    <div class="home-container">
      <div class="hero-banner">
        <h2>Últimas Noticias Globales</h2>
        <p>Mantente al día con lo más relevante en tecnología, desarrollo y ciencia.</p>
      </div>

      @if (cargando) {
        <div class="loading-state">
          <mat-spinner diameter="48"></mat-spinner>
          <p>Cargando noticias desde la API...</p>
        </div>
      } @else if (noticias.length === 0) {
        <div class="empty-state">
          <p>No hay noticias disponibles en este momento.</p>
        </div>
      } @else {
        <div class="news-grid">
          @for (noticia of noticias; track noticia.id) {
            <div class="grid-item">
              <app-card-new
                [inputTitulo]="noticia.titulo"
                [inputDescripcion]="noticia.descripcion"
                [inputCategoria]="noticia.categoria?.nombre"
                [inputFecha]="noticia.fecha_publicacion.slice(0, 10)"
                [inputImagen]="noticia.imagen"
              ></app-card-new>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .home-container {
      padding: 16px 0;
    }
    .hero-banner {
      background: linear-gradient(135deg, #1e293b, #0f172a);
      color: white;
      padding: 32px 24px;
      border-radius: 12px;
      margin-bottom: 32px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    }
    .hero-banner h2 {
      margin: 0 0 8px 0;
      font-size: 1.8rem;
    }
    .hero-banner p {
      margin: 0;
      opacity: 0.85;
      font-size: 1rem;
    }
    .loading-state, .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
      color: #64748b;
    }
    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    .grid-item {
      display: flex;
    }
  `]
})
export class HomeComponent implements OnInit {
  newService = inject(NewService);

  noticias: New[] = [];
  cargando: boolean = true;

  ngOnInit() {
    this.newService.getNews().subscribe({
      next: (data) => {
        this.noticias = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener noticias:', err);
        this.cargando = false;
      }
    });
  }
}
