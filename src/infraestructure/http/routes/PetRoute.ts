import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { PetController } from '../../controllers/PetController';

export default async (fastify: FastifyInstance) => {
  const petController = container.resolve(PetController);

  fastify.post('/pets', {
  }, petController.create.bind(petController));
  fastify.put('/pets', {
  }, petController.update.bind(petController));
  fastify.delete('/pets/:id', {
  }, petController.delete.bind(petController));
  fastify.get('/pets', {
  }, petController.getAll.bind(petController));
  fastify.get('/pets/:id', {
  }, petController.getById.bind(petController));
  fastify.get('/pets/user/:id_usuario', {
  }, petController.getByUser.bind(petController));
}
