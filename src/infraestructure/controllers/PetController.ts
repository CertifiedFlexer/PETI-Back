import { FastifyRequest, FastifyReply } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { CreatePet } from '../../application/pet/CreatePet';
import { UpdatePet } from '../../application/pet/UpdatePet';
import { DeletePet } from '../../application/pet/DeletePet';
import { GetAllPets } from '../../application/pet/GetAllPets';
import { GetPet } from '../../application/pet/GetPet';
import { GetPetByUser } from '../../application/pet/GetByUser';

@injectable()
export class PetController {
  constructor(@inject("CreatePet") private createPet: CreatePet
, @inject("UpdatePet") private updatePet: UpdatePet
, @inject("DeletePet") private deletePet: DeletePet
, @inject("GetAllPets") private getAllPets: GetAllPets
, @inject("GetPet") private getPet: GetPet
, @inject("GetPetByUser") private getByUserPet: GetPetByUser
) {}

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
  async update(req: FastifyRequest, reply: FastifyReply) {
    const petData = req.body;
    try {
      const updatedPet = await this.updatePet.execute(petData as any);
      reply.send(updatedPet);
    } catch (error) {
      reply.status(500).send(error);
    }
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    try {
      await this.deletePet.execute(id);
      reply.status(204).send();
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async getAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const pets = await this.getAllPets.execute();
      reply.send(pets);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async getById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    try {
      const pet = await this.getPet.execute(id);
      reply.send(pet);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async getByUser(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as any;
    try {
      const pets = await this.getByUserPet.execute(userId);
      reply.send(pets);
    } catch (error) { 
      reply.status(500).send(error);
    }
  }
}