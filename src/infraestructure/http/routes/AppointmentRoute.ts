import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { CitaController } from "../../controllers/AppointmentController";

export async function appointmentRoutes(app: FastifyInstance) {
    const citaController = container.resolve(CitaController);
    app.post('/appointments', {}, citaController.create.bind(citaController));
    app.get('/appointments/:id', {}, citaController.getById.bind(citaController));
    app.get('/appointments/user/:userId', {}, citaController.getByUser.bind(citaController));
    app.get('/appointments/provider/:providerId', {}, citaController.getByProvider.bind(citaController));
    app.put('/appointments/:id/status', {}, citaController.updateStatus.bind(citaController));
}
