import { Pet } from "../../domain/entities/Pet";
import { IPetRepository } from "../../domain/interfaces/Pet.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetAllPets {
  constructor(@inject("PetRepository") private petRepository: IPetRepository) {}

  async execute(): Promise<Pet[]> {
    const pets = await this.petRepository.findAll();
    return pets;
  }
}