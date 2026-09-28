import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NewService } from '../../services/new.service';
import { New } from '../../interfaces/interfaces';
import { NewsDialogComponent } from '../news-dialog/news-dialog.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  template: `
    <div class="admin-container">
      <div class="admin-header">
        <div>
          <h2>Panel de Administración - WebNews</h2>
          <p class="subtitle">Gestión centralizada de contenidos, noticias y categorías</p>
        </div>
        <button mat-raised-button color="primary" (click)="abrirDialogoCrear()">
          <mat-icon>add</mat-icon> Crear Noticia
        </button>
      </div>

      <div class="table-card">
        <table mat-table [dataSource]="noticias" class="mat-elevation-z2 full-table">
          <!-- Columna ID -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> ID </th>
            <td mat-cell *matCellDef="let n"> #{{ n.id }} </td>
          </ng-container>

          <!-- Columna Imagen -->
          <ng-container matColumnDef="imagen">
            <th mat-header-cell *matHeaderCellDef> Portada </th>
            <td mat-cell *matCellDef="let n">
              <img [src]="n.imagen" alt="Foto" class="thumb-img" />
            </td>
          </ng-container>

          <!-- Columna Título -->
          <ng-container matColumnDef="titulo">
            <th mat-header-cell *matHeaderCellDef> Título </th>
            <td mat-cell *matCellDef="let n" class="title-cell"> {{ n.titulo }} </td>
          </ng-container>

          <!-- Columna Categoría -->
          <ng-container matColumnDef="categoria">
            <th mat-header-cell *matHeaderCellDef> Categoría </th>
            <td mat-cell *matCellDef="let n">
              <span class="cat-pill">{{ n.categoria?.nombre || 'General' }}</span>
            </td>
          </ng-container>

          <!-- Columna Fecha -->
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef> Fecha </th>
            <td mat-cell *matCellDef="let n"> {{ n.fecha_publicacion.slice(0, 10) }} </td>
          </ng-container>

          <!-- Columna Acciones -->
          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef> Acciones </th>
            <td mat-cell *matCellDef="let n">
              <button mat-icon-button color="primary" (click)="abrirDialogoEditar(n)" title="Editar">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="eliminarNoticia(n.id)" title="Eliminar">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columnas"></tr>
          <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 16px 0;
    }
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .admin-header h2 {
      margin: 0;
      color: #0f172a;
    }
    .subtitle {
      margin: 4px 0 0 0;
      color: #64748b;
    }
    .table-card {
      border-radius: 12px;
      overflow: hidden;
      background: white;
    }
    .full-table {
      width: 100%;
    }
    .thumb-img {
      width: 50px;
      height: 38px;
      object-fit: cover;
      border-radius: 4px;
      vertical-align: middle;
    }
    .title-cell {
      font-weight: 500;
      max-width: 300px;
    }
    .cat-pill {
      background: #eff6ff;
      color: #1d4ed8;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  `]
})
export class AdminPanelComponent implements OnInit {
  private newService = inject(NewService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  columnas: string[] = ['id', 'imagen', 'titulo', 'categoria', 'fecha', 'acciones'];
  noticias: New[] = [];

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.newService.getNews().subscribe({
      next: (data) => (this.noticias = data),
      error: (err) => console.error('Error al cargar noticias:', err)
    });
  }

  abrirDialogoCrear() {
    const ref = this.dialog.open(NewsDialogComponent, {
      width: '550px',
      data: {}
    });

    ref.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.newService.createNews(resultado).subscribe({
          next: () => {
            this.snackBar.open('Noticia creada con éxito', 'Cerrar', { duration: 3000 });
            this.cargarNoticias();
          },
          error: (err) => console.error('Error al crear:', err)
        });
      }
    });
  }

  abrirDialogoEditar(noticia: New) {
    const ref = this.dialog.open(NewsDialogComponent, {
      width: '550px',
      data: { noticia }
    });

    ref.afterClosed().subscribe((resultado) => {
      if (resultado && noticia.id) {
        this.newService.updateNews(noticia.id, resultado).subscribe({
          next: () => {
            this.snackBar.open('Noticia actualizada con éxito', 'Cerrar', { duration: 3000 });
            this.cargarNoticias();
          },
          error: (err) => console.error('Error al actualizar:', err)
        });
      }
    });
  }

  eliminarNoticia(id?: number) {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.newService.deleteNews(id).subscribe({
        next: () => {
          this.snackBar.open('Noticia eliminada', 'Cerrar', { duration: 3000 });
          this.cargarNoticias();
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}
