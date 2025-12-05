import { FastifyRequest, FastifyReply } from "fastify";
import { injectable, inject } from "tsyringe";
import { Cita } from "../../domain/entities/Appointment";
import { CitaService } from "../../application/appointment/Appointment.service";

@injectable()
export class CitaController {
  constructor(@inject("AppointmentService") private appointmentService: CitaService) {}

  async create(req: FastifyRequest, reply: FastifyReply) {
    const citaData = req.body as Cita;
    try {
      const newCita = await this.appointmentService.create(citaData);
      reply.status(201).send(newCita);
    } catch (error) {
      reply.status(500).send(error);
    }
  }

  async getById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    try {
      const cita = await this.appointmentService.getById(id);
      reply.send(cita);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async getByUser(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as any;
    try {
      const citas = await this.appointmentService.getByUser(userId);
      reply.send(citas);
    } catch (error) {
      reply.status(500).send(error);
    }
  }

  async getByProvider(req: FastifyRequest, reply: FastifyReply) {
    const { providerId } = req.params as any;
    try {
      const citas = await this.appointmentService.getByProvider(providerId);
      reply.send(citas);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async updateStatus(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const { status } = req.body as any;
    try {
      await this.appointmentService.updateStatus(id, status);
      reply.status(204).send();
    } catch (error) {
      reply.status(500).send(error);
    }
  }
}