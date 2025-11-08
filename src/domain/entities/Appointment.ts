export interface Cita {
  id_cita: string;
  fecha_hora: Date;
  notas?: string;
  id_estado: string;
  id_usuario: string;
  id_mascota: string;
  id_servicio: string;
  created_at?: Date;
  updated_at?: Date;
}