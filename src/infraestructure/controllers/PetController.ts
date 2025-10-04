import { FastifyRequest, FastifyReply } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { CreatePet } from '../../application/pet/CreatePet';

@injectable()
export class PetController {
  constructor(@inject("CreatePet") private createPet: CreatePet) {}

  async create(req: FastifyRequest, reply: FastifyReply) {
    const petData = req.body;
    const mappedPetData = {
      nombre: petData['nombre'],
        especie: petData['especie'],
        raza: petData['raza'] || null,
        fecha_nacimiento: petData['fecha_nacimiento'] || null,
        peso: petData['peso'] || null,
        observaciones: petData['observaciones'] || null,
        activo: petData['activo'],
        id_usuario: petData['id_usuario']
    };
    try {
      const newPet = await this.createPet.execute(mappedPetData);
      reply.status(201).send(newPet);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
}