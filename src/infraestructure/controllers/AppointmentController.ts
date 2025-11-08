import { FastifyRequest, FastifyReply } from "fastify";
import { injectable, inject } from "tsyringe";
import { Cita } from "../../domain/entities/Appointment";
import { CitaService } from "../../application/appointment/Appointment.service";

@injectable()
export class CitaController {
  constructor(@inject("AppointmentService") private appointmentService: CitaService) {}

  async createAppointment(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data: Cita = <Cita>req.body;
    const cita = await this.appointmentService.create(data);
    reply.status(201).send(cita);
  }
    async getAppointmentById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id_cita } = req.params as any;
    const cita = await this.appointmentService.getById(id_cita);
    if (cita) {
      reply.send(cita);
    } else {
      reply.status(404).send({ message: "Cita not found" });
    }
    }
    async updateAppointment(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data: Cita = <Cita>req.body;
    const cita = await this.appointmentService.update(data);
    reply.send(cita);
    }
    async deleteAppointment(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id_cita } = req.params as any;
    await this.appointmentService.delete(id_cita);
    reply.status(204).send();
    }
    async listAppointmentsByUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id_usuario } = req.params as any;
    const citas = await this.appointmentService.listByUser(id_usuario);
    reply.send(citas);
  }
  async listAppointmentsByProvider(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id_proveedor } = req.params as any;
    const citas = await this.appointmentService.listByProvider(id_proveedor);
    reply.send(citas);
  }
}