import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { PetController } from '../../controllers/PetController';

export default async (fastify: FastifyInstance) => {
  const petController = container.resolve(PetController);

  fastify.post('/pets', {
  }, petController.create.bind(petController));
};
