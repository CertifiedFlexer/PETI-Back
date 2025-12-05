import { Cita } from "../entities/Appointment";

export interface IAppointmentRepository {
    create(cita: Cita): Promise<Cita>;
    getById(id: string): Promise<Cita | null>;
    getByUser(userId: string): Promise<Cita[]>;
    getByProvider(providerId: string): Promise<Cita[]>;
    updateStatus(id: string, status: string): Promise<void>;
}