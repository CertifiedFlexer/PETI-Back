import { IAppointmentRepository } from "../../domain/interfaces/Appointment.interface";
import { Cita } from "../../domain/entities/Appointment";
import { injectable, inject } from "tsyringe";
import { Pool } from "pg";

@injectable()
export class PostgresAppointmentRepository implements IAppointmentRepository {
  constructor(@inject("Pool") private pool: Pool) {}
    async create(cita: Cita): Promise<Cita> {
    const result = await this.pool.query(
      `INSERT INTO peti_bd.cita (provider_id, provider_name, provider_category, user_id, user_name, date, time, duration, status, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING id, provider_id, provider_name, provider_category, user_id, user_name, date, time, duration, status, created_at`,
      [
        cita.providerId,
        cita.providerName,
        cita.providerCategory,
        cita.userId,
        cita.userName,
        cita.date,
        cita.time,
        cita.duration,
        cita.status,
        cita.createdAt || new Date().toISOString(),
      ]
    );

    const row = result.rows[0];
    return new Cita(
      row.id,
      row.provider_id,
      row.provider_name,
      row.provider_category,
      row.user_id,
      row.user_name,
      row.date,
      row.time,
      row.duration,
      row.status,
      row.created_at
    );
  }

  async getById(id: string): Promise<Cita | null> {
    const result = await this.pool.query(
      `SELECT id, provider_id, provider_name, provider_category, user_id, user_name, date, time, duration, status, created_at 
       FROM peti_bd.cita WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) return null;
    const row = result.rows[0];

    return new Cita(
      row.id,
      row.provider_id,
      row.provider_name,
      row.provider_category,
      row.user_id,
      row.user_name,
      row.date,
      row.time,
      row.duration,
      row.status,
      row.created_at
    );
  }

  async getByUser(userId: string): Promise<Cita[]> {
    const result = await this.pool.query(
      `SELECT id, provider_id, provider_name, provider_category, user_id, user_name, date, time, duration, status, created_at 
       FROM peti_bd.cita WHERE user_id = $1 ORDER BY date DESC, time DESC`,
      [userId]
    );

    return result.rows.map(
      (row) =>
        new Cita(
          row.id,
          row.provider_id,
          row.provider_name,
          row.provider_category,
          row.user_id,
          row.user_name,
          row.date,
          row.time,
          row.duration,
          row.status,
          row.created_at
        )
    );
  }

  async getByProvider(providerId: string): Promise<Cita[]> {
    const result = await this.pool.query(
      `SELECT id, provider_id, provider_name, provider_category, user_id, user_name, date, time, duration, status, created_at 
       FROM peti_bd.cita WHERE provider_id = $1 ORDER BY date DESC, time DESC`,
      [providerId]
    );

    return result.rows.map(
      (row) =>
        new Cita(
          row.id,
          row.provider_id,
          row.provider_name,
          row.provider_category,
          row.user_id,
          row.user_name,
          row.date,
          row.time,
          row.duration,
          row.status,
          row.created_at
        )
    );
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.pool.query(
      `UPDATE peti_bd.cita SET status = $1 WHERE id = $2`,
      [status, id]
    );
  }
}