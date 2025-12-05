import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { Pool } from "pg";
import { injectable, inject } from "tsyringe";

@injectable()
export class PostgresProviderRepository implements IProviderRepository {
    constructor(@inject("Pool") private pool: Pool) {}
  async create(data: Partial<Provider>): Promise<Provider> {
    const result = await this.pool.query("INSERT INTO peti_bd.proveedor (nombre_negocio, tipo_servicio, telefono, email, verificado, activo, fecha_registro, created_at, updated_at, descripcion, id_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *", [data.nombre_negocio, data.tipo_servicio, data.telefono, data.email, data.verificado, data.activo, data.fecha_registro, data.created_at, data.updated_at, data.descripcion, data.id_usuario]);
    const newProvider = result.rows[0];
    return newProvider;
  }

  async update(data: Provider): Promise<Provider> {
    const result = await this.pool.query("UPDATE peti_bd.proveedor SET (nombre_negocio, tipo_servicio, telefono, email, verificado, activo, fecha_registro, created_at, updated_at, descripcion) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) WHERE id_proveedor = $11 RETURNING *", [data.nombre_negocio, data.tipo_servicio, data.telefono, data.email, data.verificado, data.activo, data.fecha_registro, data.created_at, data.updated_at, data.descripcion, data.id_proveedor]);
    const updatedProvider = result.rows[0];
    return updatedProvider;
  }

  async findById(id: string): Promise<Provider | null> {
    const result = await this.pool.query("SELECT * FROM peti_bd.proveedor WHERE id_proveedor = $1", [id]);
    const provider = result.rows[0];
    if (!provider.image_url)
      provider.image_url = "https://res.cloudinary.com/dncemjtsb/image/upload/v1764625379/pexels-pixabay-65928_qryfq4.jpg";
    console.log("Fetched provider:", provider);
    return provider;
  }

  async findAll(): Promise<Provider[]> {
    const result = await this.pool.query("SELECT * FROM peti_bd.proveedor");
    result.rows.forEach((provider) => {
      if (!provider.image_url) {
        provider.image_url = "https://res.cloudinary.com/dncemjtsb/image/upload/v1764625379/pexels-pixabay-65928_qryfq4.jpg";
      }
    });
    return result.rows;
  }

  async findByUserId(userId: string): Promise<Provider[]> {
    console.log("Fetching providers for user ID:", userId);
    const result = await this.pool.query("SELECT * FROM peti_bd.proveedor WHERE id_usuario = $1", [userId]);
    result.rows.forEach((provider) => {
      if (!provider.image_url) {
        provider.image_url = "https://res.cloudinary.com/dncemjtsb/image/upload/v1764625379/pexels-pixabay-65928_qryfq4.jpg";
      }
    });
    return result.rows;
  }

  async delete(id: string): Promise<void> {
    await this.pool.query("DELETE FROM peti_bd.proveedor WHERE id_proveedor = $1", [id]);
  }

  async getByService(serviceType: string): Promise<Provider[]> {
    console.log("Fetching providers for service type:", serviceType);
    const result = await this.pool.query("SELECT * FROM peti_bd.proveedor WHERE tipo_servicio = $1 ORDER BY  (suscripcion >= CURRENT_DATE) DESC, primero activos o futuros suscripcion ASC;", [serviceType]);
    result.rows.forEach((provider) => {
      if (!provider.image_url) {
        provider.image_url = "https://res.cloudinary.com/dncemjtsb/image/upload/v1764625379/pexels-pixabay-65928_qryfq4.jpg";
      }
    });
    return result.rows;
  }
  async uploadImage(providerId: string, imageUrl: string): Promise<Provider> {
    const result = await this.pool.query("UPDATE peti_bd.proveedor SET image_url = $1 WHERE id_proveedor = $2 RETURNING *", [imageUrl, providerId]);
    return result.rows[0];
  }
  async updateImage(providerId: string, imageUrl: string): Promise<Provider> {
    const result = await this.pool.query("UPDATE peti_bd.proveedor SET image_url = $1 WHERE id_proveedor = $2 RETURNING *", [imageUrl, providerId]);
    return result.rows[0];
  }
  async deleteImage(providerId: string): Promise<Provider> {
    const result = await this.pool.query("UPDATE peti_bd.proveedor SET image_url = NULL WHERE id_proveedor = $1 RETURNING *", [providerId]);
    return result.rows[0];
  }
  async updateSubscription(providerId: string): Promise<Provider> {
    const actualSubcriptionResult = await this.pool.query("SELECT suscripcion FROM peti_bd.proveedor WHERE id_proveedor = $1", [providerId]);
    let newSubscription = new Date();
    if (!actualSubcriptionResult.rows[0]) {
      newSubscription.setMonth(newSubscription.getMonth() + 1);
    } else {
      const currentSubscription = new Date(actualSubcriptionResult.rows[0].suscripcion);
      newSubscription = currentSubscription > new Date() ? currentSubscription : new Date();
      newSubscription.setMonth(newSubscription.getMonth() + 1);
    }
    const result = await this.pool.query("UPDATE peti_bd.proveedor SET suscripcion = $1 WHERE id_proveedor = $2 RETURNING *", [newSubscription, providerId]);
    return result.rows[0];
  }
}