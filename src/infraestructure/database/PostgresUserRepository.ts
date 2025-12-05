import { Pool } from "pg";
import { IUserRepository } from "../../domain/interfaces/User.interface";
import { User } from "../../domain/entities/User";
import { injectable, inject } from "tsyringe";

@injectable()
export class PostgresUserRepository implements IUserRepository {
  constructor(@inject('Pool') private pool: Pool) {}

  async createUser(user: User): Promise<User> {
    const roleIdQuery = `Select id_rol from peti_bd.rol where nombre = $1`
    const roleId = await this.pool.query(roleIdQuery, [user.idRol]);
    const query = `
      INSERT INTO peti_bd.usuario 
      (nombre, email, contrasena, telefono, fecha_registro, activo, id_rol, created_at, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
    `;
    const values = [
      user.nombre,
      user.email,
      user.contraseña,
      user.telefono,
      user.fechaRegistro,
      user.activo,
      roleId.rows[0].id_rol,
      user.createdAt,
      user.updatedAt,
    ];
    const res = await this.pool.query(query, values);
    return this.mapToUser(res.rows[0])
  }

  async login(email: string): Promise<Partial<User> | null> {
    const query = `SELECT id_usuario, nombre, email, activo, id_rol, contrasena FROM peti_bd.usuario WHERE email = $1`;
    const res = await this.pool.query(query, [email]);
    if (res.rowCount === 0) return null;
    return {
        idUsuario:res.rows[0].id_usuario,
        nombre:res.rows[0].nombre,
        email:res.rows[0].email,
        activo:res.rows[0].activo,
        idRol:res.rows[0].id_rol,
        contraseña:res.rows[0].contrasena,
    };
  }

  async updateUser(user: Partial<User>): Promise<User> {
    try {
    if (!user.idUsuario) throw new Error("Se requiere el idUsuario para actualizar");

    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(user)) {
      if (key === 'idUsuario') continue; // saltar el idUsuario
      if (value === undefined) continue; // saltar valores undefined
      fields.push(`${this.toSnakeCase(key)} = $${index}`);
      values.push(value);
      index++;
    }
    values.push(user.idUsuario);
    const query = `
      UPDATE peti_bd.usuario
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id_usuario = $${index}
      RETURNING *;
    `;
    console.log ("Update Query:", query);
    const res = await this.pool.query(query, values);
    return this.mapToUser(res.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

  async getUserById(id: string): Promise<Partial<User> | null> {
    const query = `SELECT id_usuario, nombre, email, activo, id_rol FROM peti_bd.usuario WHERE id_usuario = $1`;
    const res = await this.pool.query(query, [id]);
    if (res.rowCount === 0) return null;
    return res.rows[0];
  }

  async getAllUsers(): Promise<Partial<User[]> | null> {
    const query = `SELECT id_usuario, nombre, email, activo, id_rol FROM peti_bd.usuario`;
    const res = await this.pool.query(query);
    return res.rows;
  }

  async toogleActive(id: string): Promise<User> {
    const query = `
      UPDATE peti_bd.usuario
      SET activo = NOT activo, updated_at = NOW()
      WHERE id_usuario = $1
      RETURNING *;
    `;
    const res = await this.pool.query(query, [id]);
    return this.mapToUser(res.rows[0]);
  }

  async changePassword(id: string, newPassword: string): Promise<User> {
    const query = `
      UPDATE peti_bd.usuario
      SET contrasena = $1, updated_at = NOW()
      WHERE id_usuario = $2
      RETURNING *;
    `;
    const res = await this.pool.query(query, [newPassword, id]);
    return this.mapToUser(res.rows[0]);
  }

  // Helpers
  private mapToUser(row: any): User {
    return new User(
      row.id_usuario,
      row.nombre,
      row.email,
      row.contraseña,
      row.telefono,
      row.fecha_registro,
      row.activo,
      row.id_rol,
      row.created_at,
      row.updated_at
    );
  }

  private toSnakeCase(key: string): string {
    return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
}