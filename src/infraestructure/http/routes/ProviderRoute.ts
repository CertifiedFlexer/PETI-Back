import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { ProviderController } from '../../controllers/ProviderController';

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    isAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default async (fastify: FastifyInstance) => {
  const providerController = container.resolve(ProviderController);

  fastify.post('/providers', {
  }, providerController.create.bind(providerController));
  fastify.put('/providers/:id', {
  }, providerController.update.bind(providerController));
  fastify.delete('/providers/:id', {
  }, providerController.delete.bind(providerController));
  fastify.get('/providers', {
  }, providerController.getAll.bind(providerController));
  fastify.get('/providers/:id', {
  }, providerController.getById.bind(providerController));
  fastify.get('/providers/user/:id_usuario', {
  }, providerController.getByUser.bind(providerController));
  fastify.get('/providers/service/:tipo_servicio', {
  }, providerController.getProvidersByService.bind(providerController));
  fastify.post('/providers/:id/image', {
  }, providerController.uploadProviderImage.bind(providerController));
  fastify.put('/providers/:id/image', {
  }, providerController.updateProviderImage.bind(providerController));
  fastify.delete('/providers/:id/image', {
  }, providerController.deleteProviderImage.bind(providerController));
  fastify.put('/providers/:providerId/subscription', {
  }, providerController.updateSubscription.bind(providerController));
};

