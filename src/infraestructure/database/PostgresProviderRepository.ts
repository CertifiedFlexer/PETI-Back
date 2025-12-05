import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { Pool } from "pg";
import { injectable, inject } from "tsyringe";

@injectable()
export class PostgresProviderRepository implements IProviderRepository {
    constructor(@inject("Pool") private pool: Pool) {}
  async create(data: Partial<Provider>): Promise<Provider> {
    const result = await this.pool.query("INSERT INTO peti_bd.proveedor (nombre_negocio, tipo_servicio, telefono, email, verificado, activo, fecha_registro, created_at, updated_at, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", [data.nombre_negocio, data.tipo_servicio, data.telefono, data.email, data.verificado, data.activo, data.fecha_registro, data.created_at, data.updated_at, data.descripcion]);
    const newProvider = result.rows[0];
    return newProvider;
  }

  async update(data: Provider): Promise<Provider> {
    const result = await this.pool.query("UPDATE peti_bd.proveedor SET (nombre_negocio, tipo_servicio, telefono, email, verificado, activo, fecha_registro, created_at, updated_at, descripcion) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) WHERE id = $11 RETURNING *", [data.nombre_negocio, data.tipo_servicio, data.telefono, data.email, data.verificado, data.activo, data.fecha_registro, data.created_at, data.updated_at, data.descripcion, data.id_proveedor]);
    const updatedProvider = result.rows[0];
    return updatedProvider;
  }

  async findById(id: string): Promise<Provider | null> {
    const result = await this.pool.query("SELECT * FROM peti_bd.proveedor WHERE id = $1", [id]);
    const provider = result.rows[0];
    return provider;
  }

  async findAll(): Promise<Provider[]> {
    const result = await this.pool.query("SELECT * FROM peti_bd.proveedor");
    return result.rows;
  }

  async findByUserId(userId: string): Promise<Provider[]> {
    console.log("Fetching providers for user ID:", userId);
    const result = await this.pool.query("SELECT * FROM peti_bd.proveedor WHERE id_usuario = $1", [userId]);
    return result.rows;
  }

  async delete(id: string): Promise<void> {
    await this.pool.query("DELETE FROM peti_bd.proveedor WHERE id = $1", [id]);
  }

  async getByService(serviceType: string): Promise<Provider[]> {
    console.log("Fetching providers for service type:", serviceType);
    const result = await this.pool.query("SELECT * FROM peti_bd.proveedor WHERE tipo_servicio = $1", [serviceType]);
    return result.rows;
  }
}