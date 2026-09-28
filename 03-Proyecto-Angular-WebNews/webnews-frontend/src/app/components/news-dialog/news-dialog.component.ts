import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Category, New } from '../../interfaces/interfaces';
import { CategroyService } from '../../services/category.service';

@Component({
  selector: 'app-news-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>
      {{ data.noticia ? 'Editar Noticia' : 'Crear Nueva Noticia' }}
    </h2>

    <mat-dialog-content class="dialog-content">
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Título de la Noticia</mat-label>
          <input matInput formControlName="titulo" placeholder="Ej. Lanzamiento de nueva tecnología..." />
          @if (form.get('titulo')?.hasError('required')) {
            <mat-error>El título es requerido</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Categoría</mat-label>
          <mat-select formControlName="categoria_id">
            @for (cat of categories; track cat.id) {
              <mat-option [value]="cat.id">{{ cat.nombre }}</mat-option>
            }
          </mat-select>
          @if (form.get('categoria_id')?.hasError('required')) {
            <mat-error>Debes seleccionar una categoría</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>URL de la Imagen</mat-label>
          <input matInput formControlName="imagen" placeholder="https://..." />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descripción / Contenido</mat-label>
          <textarea matInput rows="4" formControlName="descripcion" placeholder="Escribe el cuerpo de la noticia..."></textarea>
          @if (form.get('descripcion')?.hasError('required')) {
            <mat-error>La descripción es requerida</mat-error>
          }
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="guardar()">
        Guardar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-content {
      min-width: 400px;
      padding-top: 12px;
    }
    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .full-width {
      width: 100%;
    }
  `]
})
export class NewsDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategroyService);
  public dialogRef = inject(MatDialogRef<NewsDialogComponent>);

  categories: Category[] = [];
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { noticia?: New }) {
    this.form = this.fb.group({
      titulo: [data.noticia?.titulo || '', [Validators.required]],
      categoria_id: [data.noticia?.categoria_id || 1, [Validators.required]],
      imagen: [
        data.noticia?.imagen ||
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=60'
      ],
      descripcion: [data.noticia?.descripcion || '', [Validators.required]]
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (cats) => (this.categories = cats),
      error: (err) => console.error('Error al cargar categorías en diálogo:', err)
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
