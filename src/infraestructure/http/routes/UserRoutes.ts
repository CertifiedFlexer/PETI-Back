import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { UserController } from '../../controllers/UserController';


declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    isAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export async function userRoutes(app: FastifyInstance) {
  const controller = container.resolve<UserController>('UserController');
  app.post('/users', controller.createUser.bind(controller));
  app.get('/users', controller.getAllUsers.bind(controller));
  app.post('/login', controller.login.bind(controller));
  app.patch('/update-user', controller.updateUser.bind(controller));
  app.get('/users/:id', controller.getUserById.bind(controller));
  app.patch('/users/:id/toggle-active', controller.toogleActive.bind(controller));
  app.patch('/users/:id/change-password', controller.changePassword.bind(controller));
}