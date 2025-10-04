export interface Pet {
  id_mascota: string;
  nombre: string;
  especie: string;
  raza?: string;
  fecha_nacimiento?: Date;
  peso?: number;
  observaciones?: string;
  activo: boolean;
  id_usuario: string;
  created_at: Date;
  updated_at: Date;
}
