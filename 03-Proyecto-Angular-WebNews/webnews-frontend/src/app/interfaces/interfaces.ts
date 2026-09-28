export interface Category {
  id?: number;
  nombre: string;
  activo: boolean;
  descripcion: string;
  UserAlta?: string;
  FechaAlta?: string;
  UserBaja?: string;
  FechaBaja?: string;
  FechaMod?: string;
  UserMod?: string;
}

export interface New {
  id?: number;
  titulo: string;
  descripcion: string;
  categoria_id: number;
  categoria?: Category | null;
  fecha_publicacion: string;
  imagen: string;
  UserAlta?: string;
  FechaAlta?: string;
  UserMod?: string;
  FechaMod?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  usuario: {
    email: string;
    nombre: string;
  };
}
