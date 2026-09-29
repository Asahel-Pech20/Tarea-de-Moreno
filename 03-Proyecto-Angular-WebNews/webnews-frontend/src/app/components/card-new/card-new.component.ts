import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-card-new',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule],
  template: `
    <mat-card class="news-card">
      <img mat-card-image [src]="inputImagen" [alt]="inputTitulo" class="card-img" />
      <mat-card-header>
        <div class="category-badge">{{ inputCategoria || 'General' }}</div>
        <mat-card-title class="card-title">{{ inputTitulo }}</mat-card-title>
        <mat-card-subtitle class="card-date">Publicado: {{ inputFecha }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p class="card-desc">{{ inputDescripcion }}</p>
      </mat-card-content>
      <mat-card-actions align="end">
        <button mat-button color="primary">Leer noticia completa</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .news-card {
      margin-bottom: 24px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .news-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 24px rgba(0,0,0,0.12);
    }
    .card-img {
      height: 200px;
      object-fit: cover;
      width: 100%;
    }
    .category-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #1976d2;
      background-color: #e3f2fd;
      padding: 4px 10px;
      border-radius: 16px;
      margin-bottom: 8px;
    }
    .card-title {
      font-size: 1.15rem;
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 4px;
    }
    .card-date {
      font-size: 0.82rem;
      color: #64748b;
      margin-bottom: 12px;
    }
    .card-desc {
      font-size: 0.95rem;
      color: #334155;
      line-height: 1.5;
      flex-grow: 1;
    }
  `]
})
export class CardNewComponent {
  @Input() inputTitulo: string = '';
  @Input() inputDescripcion: string = '';
  @Input() inputCategoria?: string = '';
  @Input() inputFecha: string = '';
  @Input() inputImagen: string = '';
}
