import { inject, injectable } from "tsyringe";
import { IAppointmentRepository } from "../../domain/interfaces/Appointment.interface"
import { Cita } from "../../domain/entities/Appointment";

@injectable()
export class CitaService {
  constructor(@inject("AppointmentRepository") private citaRepository: IAppointmentRepository) {}

  async create(data: Cita): Promise<Cita> {
    const nuevaCita = await this.citaRepository.createAppointment(data);
    return nuevaCita;
  }

  async getById(id_cita: string): Promise<Cita | null> {
    const cita = await this.citaRepository.getAppointmentById(id_cita);
    return cita;
  }

  async update(data: Cita): Promise<Cita> {
    const citaActualizada = await this.citaRepository.updateAppointment(data);
    return citaActualizada;
  }

  async delete(id_cita: string): Promise<void> {
    await this.citaRepository.deleteAppointment(id_cita);
  }

  async listByUser(id_usuario: string): Promise<Cita[]> {
    const citas = await this.citaRepository.listAppointmentsByUser(id_usuario);
    return citas;
  }
  async listByProvider(id_proveedor: string): Promise<Cita[]> {
    const citas = await this.citaRepository.listAppointmentsByProvider(id_proveedor);
    return citas;
  }
}