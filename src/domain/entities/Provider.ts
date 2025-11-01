export interface Provider {
  id_proveedor: string;
  nombre_negocio: string;
  tipo_servicio: string;
  telefono?: string;
  email?: string;
  verificado: boolean;
  activo: boolean;
  fecha_registro?: Date;
  created_at: Date;
  updated_at: Date;
  descripcion?: string;
}
