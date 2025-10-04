import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { ProviderController } from '../../controllers/ProviderController';

// declare module "fastify" {
//   interface FastifyInstance {
//     authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
//     isAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
//   }
// }

export default async (fastify: FastifyInstance) => {
  const providerController = container.resolve(ProviderController);

  fastify.post('/providers', {
  }, providerController.create.bind(providerController));
};
