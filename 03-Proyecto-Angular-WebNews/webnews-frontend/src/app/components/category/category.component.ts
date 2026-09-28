import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Category, New } from '../../interfaces/interfaces';
import { CategroyService } from '../../services/category.service';
import { NewService } from '../../services/new.service';
import { CardNewComponent } from '../card-new/card-new.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, CardNewComponent, MatProgressSpinnerModule],
  template: `
    <div class="category-container">
      <div class="category-header">
        <h2 class="cat-title">{{ category.nombre }}</h2>
        <p class="cat-desc">{{ category.descripcion }}</p>
      </div>

      @if (cargando) {
        <div class="loading-state">
          <mat-spinner diameter="40"></mat-spinner>
          <p>Cargando noticias de la categoría...</p>
        </div>
      } @else if (newsByCategory.length === 0) {
        <div class="empty-state">
          <p>No se encontraron noticias registradas en esta categoría.</p>
        </div>
      } @else {
        <div class="news-grid">
          @for (noticia of newsByCategory; track noticia.id) {
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
    .category-container {
      padding: 16px 0;
    }
    .category-header {
      text-align: center;
      margin-bottom: 32px;
      padding: 24px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    .cat-title {
      font-size: 2rem;
      color: #1976d2;
      margin-bottom: 8px;
    }
    .cat-desc {
      color: #64748b;
      font-size: 1.05rem;
      max-width: 600px;
      margin: 0 auto;
    }
    .loading-state, .empty-state {
      text-align: center;
      padding: 40px;
      color: #94a3b8;
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
export class CategoryComponent implements OnInit {
  // Declaración de propiedades (siguiendo especificación de Notion)
  newsByCategory: New[] = [];
  category: Category = {
    nombre: '',
    activo: true,
    descripcion: '',
    UserAlta: '',
    FechaAlta: '',
    UserBaja: '',
    FechaBaja: '',
    FechaMod: '',
    UserMod: ''
  };
  id: number = 0;
  cargando: boolean = true;

  // Inyección de dependencias
  private categoryService = inject(CategroyService);
  private newService = inject(NewService);
  private activatedRoute = inject(ActivatedRoute);

  // Función al momento de inicializar el componente
  ngOnInit() {
    // Buscar los parámetros que se enviaron a través de la ruta
    this.activatedRoute.params.subscribe((params) => {
      this.cargando = true;
      this.id = Number(params['id']);

      // Buscar una categoría por el ID
      this.categoryService.getCategory(this.id).subscribe({
        next: (response) => {
          this.category = response;

          // Obtener todas las noticias y filtrar por la categoría
          this.newService.getNews().subscribe({
            next: (response_news) => {
              this.newsByCategory = response_news.filter(
                (noticia) => noticia.categoria_id === this.id
              );
              this.cargando = false;
            },
            error: () => (this.cargando = false)
          });
        },
        error: () => (this.cargando = false)
      });
    });
  }
}
