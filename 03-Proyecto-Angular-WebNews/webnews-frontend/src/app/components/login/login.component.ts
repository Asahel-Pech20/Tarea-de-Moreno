import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="login-wrapper">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-icon mat-card-avatar color="primary" class="login-avatar">lock</mat-icon>
          <mat-card-title>Acceso al Panel WebNews</mat-card-title>
          <mat-card-subtitle>Ingresa tus credenciales de administrador</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Correo Electrónico</mat-label>
              <input matInput type="email" formControlName="email" placeholder="admin@webnews.com" />
              <mat-icon matSuffix>email</mat-icon>
              @if (loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched) {
                <mat-error>El correo es obligatorio</mat-error>
              }
              @if (loginForm.get('email')?.hasError('email')) {
                <mat-error>Formato de correo no válido</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput [type]="ocultarPassword ? 'password' : 'text'" formControlName="password" />
              <button mat-icon-button matSuffix type="button" (click)="ocultarPassword = !ocultarPassword">
                <mat-icon>{{ ocultarPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (loginForm.get('password')?.hasError('required') && loginForm.get('password')?.touched) {
                <mat-error>La contraseña es obligatoria</mat-error>
              }
            </mat-form-field>

            @if (mensajeError) {
              <div class="error-banner">
                {{ mensajeError }}
              </div>
            }

            <div class="demo-hints">
              <small>🔑 <strong>Credenciales demo:</strong> admin&#64;webnews.com / admin123</small>
            </div>

            <button mat-raised-button color="primary" type="submit" class="full-width submit-btn" [disabled]="loginForm.invalid || enviando">
              {{ enviando ? 'Autenticando...' : 'Iniciar Sesión' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px 16px;
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    }
    .login-avatar {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 16px;
    }
    .full-width {
      width: 100%;
    }
    .submit-btn {
      margin-top: 8px;
      padding: 12px;
      font-size: 1rem;
    }
    .demo-hints {
      background-color: #f1f5f9;
      padding: 8px 12px;
      border-radius: 6px;
      color: #475569;
    }
    .error-banner {
      background-color: #fee2e2;
      color: #b91c1c;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.9rem;
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ocultarPassword = true;
  enviando = false;
  mensajeError = '';

  loginForm: FormGroup = this.fb.group({
    email: ['admin@webnews.com', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.enviando = true;
    this.mensajeError = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.enviando = false;
        if (res.success) {
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => {
        this.enviando = false;
        this.mensajeError = err.error?.mensaje || 'Error al conectar con el servidor de autenticación.';
      }
    });
  }
}
