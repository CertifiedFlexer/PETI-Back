import { Pool } from "pg";
import { Role } from "../../domain/entities/Role";
import { injectable, inject } from "tsyringe";

@injectable()
export class PostgresRoleRepository {
  constructor(@inject('Pool') private pool: Pool) {}

  async createRole(role: Role): Promise<Role> {
    const query = `
      INSERT INTO peti_bd.rol (nombre, descripcion, activo, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    console.log(role)
    const result = await this.pool.query(query, [
      role.nombre,
      role.descripcion,
      role.activo,
      role.createdAt,
      role.updatedAt,
    ]);
    const res = result.rows[0];
    return this.mapToRole(res);
  }

  async getRoleById(id: string): Promise<Role | null> {
    const query = `SELECT * FROM peti_bd.rol WHERE id_rol = $1`;
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapToRole(result.rows[0]);
  }

  async getAllRoles(): Promise<Role[]> {
    const query = `SELECT * FROM peti_bd.rol`;
    const result = await this.pool.query(query);
    return result.rows.map((row) => this.mapToRole(row));
  }

  async updateRole(role: Role): Promise<Role> {
    const query = `
      UPDATE peti_bd.rol
      SET nombre = $1, descripcion = $2, updated_at = NOW()
      WHERE id_rol = $3
      RETURNING *;
    `;
    const result = await this.pool.query(query, [
      role.nombre,
      role.descripcion,
      role.idRol,
    ]);
    return this.mapToRole(result.rows[0]);
  }

  async deleteRole(id: string): Promise<void> {
    const query = `DELETE FROM peti_bd.rol WHERE id_rol = $1`;
    await this.pool.query(query, [id]);
  }

  private mapToRole(row: any): Role {
    return new Role(
      row.id_rol,
      row.nombre,
      row.descripcion,
      row.activo,
      row.created_at,
      row.updated_at
    );
  }
}