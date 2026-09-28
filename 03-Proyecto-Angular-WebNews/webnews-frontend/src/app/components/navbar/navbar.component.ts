import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CategroyService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../interfaces/interfaces';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary" class="main-toolbar">
      <div class="brand" routerLink="/">
        <mat-icon class="brand-icon">newspaper</mat-icon>
        <span class="brand-name">WebNews</span>
      </div>

      <span class="spacer"></span>

      <!-- Categorías dinámicas -->
      <nav class="nav-links">
        <button mat-button routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
          <mat-icon>home</mat-icon> Inicio
        </button>

        @for (cat of categories; track cat.id) {
          <button mat-button [routerLink]="['/categoria', cat.id]" routerLinkActive="active-link">
            {{ cat.nombre }}
          </button>
        }
      </nav>

      <span class="spacer"></span>

      <!-- Zona de autenticación / administración -->
      <div class="auth-actions">
        @if (authService.isLoggedInSignal()) {
          <button mat-raised-button color="accent" routerLink="/admin">
            <mat-icon>dashboard</mat-icon> Panel Admin
          </button>
          <button mat-stroked-button color="warn" (click)="logout()">
            <mat-icon>logout</mat-icon> Salir
          </button>
        } @else {
          <button mat-flat-button color="accent" routerLink="/login">
            <mat-icon>login</mat-icon> Ingresar
          </button>
        }
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .main-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .brand {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: 700;
      font-size: 1.3rem;
      letter-spacing: 0.5px;
    }
    .brand-icon {
      margin-right: 8px;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .nav-links {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
    .active-link {
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: bold;
      border-radius: 4px;
    }
    .auth-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  `]
})
export class NavbarComponent implements OnInit {
  categoryService = inject(CategroyService);
  authService = inject(AuthService);

  categories: Category[] = [];

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  logout() {
    this.authService.logout();
  }
}
