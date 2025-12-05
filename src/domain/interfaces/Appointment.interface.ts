import { Cita } from "../entities/Appointment";

export interface IAppointmentRepository {
  createAppointment(appointment: Cita): Promise<Cita>;
  getAppointmentById(id_cita: string): Promise<Cita | null>;
  updateAppointment(appointment: Cita): Promise<Cita>;
  deleteAppointment(id_cita: string): Promise<void>;
  listAppointmentsByUser(id_usuario: string): Promise<Cita[]>;
  listAppointmentsByProvider(id_proveedor: string): Promise<Cita[]>;
}