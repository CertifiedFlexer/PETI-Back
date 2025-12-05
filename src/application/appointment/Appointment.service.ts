import { inject, injectable } from "tsyringe";
import { IAppointmentRepository } from "../../domain/interfaces/Appointment.interface"
import { Cita } from "../../domain/entities/Appointment";

@injectable()
export class CitaService {
    constructor(@inject("AppointmentRepository") private appointmentRepository: IAppointmentRepository) {}

    async create(cita: Cita): Promise<Cita> {
        return this.appointmentRepository.create(cita);
    }
    async getById(id: string): Promise<Cita | null> {
        return this.appointmentRepository.getById(id);
    }
    async getByUser(userId: string): Promise<Cita[]> {
        return this.appointmentRepository.getByUser(userId);
    }
    async getByProvider(providerId: string): Promise<Cita[]> {
        return this.appointmentRepository.getByProvider(providerId);
    }
    async updateStatus(id: string, status: string): Promise<void> {
        return this.appointmentRepository.updateStatus(id, status);
    }
}