import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { CitaController } from "../../controllers/AppointmentController";

export async function appointmentRoutes(app: FastifyInstance) {
    const citaController = container.resolve(CitaController);
    app.post("/appointments", {}, citaController.createAppointment.bind(citaController));
    app.get("/appointments/:id_cita", {}, citaController.getAppointmentById.bind(citaController));
    app.put("/appointments", {}, citaController.updateAppointment.bind(citaController));
    app.delete("/appointments/:id_cita", {}, citaController.deleteAppointment.bind(citaController));
    app.get("/appointments/user/:id_usuario", {}, citaController.listAppointmentsByUser.bind(citaController));
    app.get("/appointments/provider/:id_proveedor", {}, citaController.listAppointmentsByProvider.bind(citaController));
}
