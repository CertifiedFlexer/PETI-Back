import { IAppointmentRepository } from "../../domain/interfaces/Appointment.interface";
import { Cita } from "../../domain/entities/Appointment";
import { injectable, inject } from "tsyringe";
import { Pool } from "pg";

@injectable()
export class PostgresAppointmentRepository implements IAppointmentRepository {
  constructor(@inject("Pool") private pool: Pool) {}
    async createAppointment(appointment: Cita): Promise<Cita> {
        console.log(appointment)
        const result = await this.pool.query("INSERT INTO peti_bd.cita (fecha_hora, notas, id_estado, id_usuario, id_mascota, id_servicio, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [appointment.fecha_hora, appointment.notas, appointment.id_estado, appointment.id_usuario, appointment.id_mascota, appointment.id_servicio, appointment.created_at || new Date(), appointment.updated_at || new Date()]);
        return result.rows[0];
    }
    async getAppointmentById(id_cita: string): Promise<Cita | null> {
        const result = await this.pool.query("SELECT * FROM peti_bd.cita WHERE id_cita = $1", [id_cita]);
        return result.rows[0] || null;
    }
    async updateAppointment(appointment: Cita): Promise<Cita> {
        const result = await this.pool.query("UPDATE peti_bd.cita SET fecha_hora = $1, notas = $2, id_estado = $3, id_usuario = $4, id_mascota = $5, id_servicio = $6 WHERE id_cita = $7 RETURNING *", [appointment.fecha_hora, appointment.notas, appointment.id_estado, appointment.id_usuario, appointment.id_mascota, appointment.id_servicio, appointment.id_cita]);
        return result.rows[0];
    }
    async deleteAppointment(id_cita: string): Promise<void> {
        await this.pool.query("DELETE FROM peti_bd.cita WHERE id_cita = $1", [id_cita]);
    }
    async listAppointmentsByUser(id_usuario: string): Promise<Cita[]> {
        const result = await this.pool.query("SELECT * FROM peti_bd.cita WHERE id_usuario = $1", [id_usuario]);
        return result.rows;
    }
    async listAppointmentsByProvider(id_proveedor: string): Promise<Cita[]> {
        const result = await this.pool.query("SELECT c.* FROM peti_bd.cita c JOIN peti_bd.servicio s ON c.id_servicio = s.id_servicio WHERE s.id_proveedor = $1", [id_proveedor]);
        return result.rows;
    }
}