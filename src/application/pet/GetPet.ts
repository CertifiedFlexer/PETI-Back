import { Pet } from "../../domain/entities/Pet";
import { IPetRepository } from "../../domain/interfaces/Pet.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetPet {
  constructor(@inject("PetRepository") private petRepository: IPetRepository) {}

  async execute(id: string): Promise<Pet> {
    const pet = await this.petRepository.findById(id);
    return pet;
  }
}