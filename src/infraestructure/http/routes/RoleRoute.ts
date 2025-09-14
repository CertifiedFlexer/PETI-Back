import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { RoleController } from '../../controllers/RoleController';

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    isAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export async function roleRoutes(app: FastifyInstance) {
  const controller = container.resolve<RoleController>('RoleController');

  app.post('/role', controller.create.bind(controller));
  app.get('/allRoles', controller.getAll.bind(controller));
  app.post('/updateRole', controller.update.bind(controller));
}